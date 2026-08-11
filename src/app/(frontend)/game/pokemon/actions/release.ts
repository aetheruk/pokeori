'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import type { Pokemon } from '@/payload-types'
import {
  grantRewards,
  type RewardSummary,
} from '@/utilities/rewards/reward-logic'
import { getUser } from './utils'
import { getSkillLevel } from '@/utilities/skills/unlocks'
import { getUserPokedexMap } from '@/utilities/user-state'
import {
  buildPokemonReleaseRewards,
  getPokemonReleaseBlockMessage,
} from '@/utilities/pokemon/release-planning'
import { getActiveEggCount } from '@/utilities/day-care/eggs'
import {
  getEconomyActionErrorMessage,
  runEconomyAction,
} from '@/utilities/economy/transactions'

function formatReleaseRewardItems(summary: RewardSummary): string {
  if (!summary.items.length) return 'nothing'
  return summary.items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(', ')
}

export async function releasePokemon(pokemonId: string, clientActionId: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  if (!clientActionId) return { success: false, message: 'Missing action identifier' }

  try {
    const result = await runEconomyAction(
      { userId: user.id, action: 'release-pokemon', requestId: clientActionId },
      async ({ payload, req }) => {
        const freshUser = await payload.findByID({ collection: 'users', id: user.id, req })

  // 1. Verify Ownership
  const pokemon = await payload.findByID({
    collection: 'pokemon',
    id: pokemonId,
    req,
  })

  if (
    (typeof pokemon.user === 'object' ? pokemon.user.id : pokemon.user) !==
    user.id
  ) {
    throw new Error('Pokemon not owned by user')
  }

  const blockedMessage = getPokemonReleaseBlockMessage(pokemon)
  if (blockedMessage) return { success: false, message: blockedMessage }

  // 2. Check Total Count
  // We need to count how many pokemon the user has
  const countResult = await payload.count({
    collection: 'pokemon',
    where: {
      and: [
        { user: { equals: user.id } },
        {
          or: [
            { fusedIntoPokemonId: { exists: false } },
            { fusedIntoPokemonId: { equals: null } },
            { fusedIntoPokemonId: { equals: '' } },
          ],
        },
      ],
    },
    req,
  })

  if (countResult.totalDocs <= 1) {
    return { success: false, message: 'Cannot release your only Pokemon!' }
  }

  const pokedex = await getUserPokedexMap(payload as any, user.id, { req })
  const researcherLevel = getSkillLevel(freshUser.skills, 'researching')
  const rewardsToGrant = buildPokemonReleaseRewards({
    pokemon,
    pokedex: pokedex as Record<string, any>,
    researchingLevel: researcherLevel,
  })

  const { summary } = await grantRewards(user.id, rewardsToGrant, {
    source: 'pokemon-release',
    payload,
    req,
  })

  // 4. Delete
  await payload.delete({
    collection: 'pokemon',
    id: pokemonId,
    req,
  })

  return {
    success: true,
    summary,
    message: `Goodbye, ${pokemon.name}! You received ${formatReleaseRewardItems(summary)}.`,
  }
      },
    )
    revalidatePath('/game/pokemon')
    revalidatePath('/game/inventory')
    return result
  } catch (error) {
    return { success: false, message: getEconomyActionErrorMessage(error) }
  }
}

export async function releasePokemonBulk(pokemonIds: string[], clientActionId: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  if (!clientActionId) return { success: false, message: 'Missing action identifier' }

  if (!Array.isArray(pokemonIds)) {
    return { success: false, message: 'Invalid Pokemon selection' }
  }

  const requestedIds = Array.from(
    new Set(
      pokemonIds
        .filter(
          (id): id is string => typeof id === 'string' && id.trim().length > 0,
        )
        .map((id) => id.trim()),
    ),
  )

  if (requestedIds.length === 0) {
    return {
      success: false,
      message: 'Select at least one Pokemon to release.',
    }
  }

  try {
    const result = await runEconomyAction(
      { userId: user.id, action: 'release-pokemon-bulk', requestId: clientActionId },
      async ({ payload, req }) => {
        const freshUser = await payload.findByID({ collection: 'users', id: user.id, req })

  const { docs } = await payload.find({
    collection: 'pokemon',
    where: {
      and: [
        { id: { in: requestedIds } },
        { user: { equals: user.id } },
        {
          or: [
            { fusedIntoPokemonId: { exists: false } },
            { fusedIntoPokemonId: { equals: null } },
            { fusedIntoPokemonId: { equals: '' } },
          ],
        },
      ],
    },
    depth: 0,
    limit: requestedIds.length,
    pagination: false,
    req,
  })

  if (docs.length !== requestedIds.length) {
    return { success: false, message: 'Invalid Pokemon selection' }
  }

  const pokemonById = new Map(docs.map((pokemon) => [pokemon.id, pokemon]))
  const pokemonToRelease = requestedIds
    .map((id) => pokemonById.get(id))
    .filter((pokemon): pokemon is Pokemon => !!pokemon)

  const blockedPokemon = pokemonToRelease.find((pokemon) =>
    getPokemonReleaseBlockMessage(pokemon),
  )
  if (blockedPokemon) {
    return {
      success: false,
      message:
        getPokemonReleaseBlockMessage(blockedPokemon) ||
        'Cannot release selected Pokemon.',
    }
  }

  const countResult = await payload.count({
    collection: 'pokemon',
    where: {
      and: [
        { user: { equals: user.id } },
        {
          or: [
            { fusedIntoPokemonId: { exists: false } },
            { fusedIntoPokemonId: { equals: null } },
            { fusedIntoPokemonId: { equals: '' } },
          ],
        },
      ],
    },
    req,
  })

  if (countResult.totalDocs - pokemonToRelease.length < 1) {
    return { success: false, message: 'Cannot release all of your Pokemon!' }
  }

  const pokedex = await getUserPokedexMap(payload as any, user.id, { req })
  const researcherLevel = getSkillLevel(freshUser.skills, 'researching')
  const rewardsToGrant = pokemonToRelease.flatMap((pokemon) =>
    buildPokemonReleaseRewards({
      pokemon,
      pokedex: pokedex as Record<string, any>,
      researchingLevel: researcherLevel,
    }),
  )

  const { summary } = await grantRewards(user.id, rewardsToGrant, {
    source: 'pokemon-release-bulk',
    payload,
    req,
  })

  for (const pokemon of pokemonToRelease) {
    await payload.delete({
      collection: 'pokemon',
      id: pokemon.id,
      req,
    })
  }

  return {
    success: true,
    summary,
    releasedIds: pokemonToRelease.map((pokemon) => pokemon.id),
    message: `Released ${pokemonToRelease.length} Pokemon. You received ${formatReleaseRewardItems(summary)}.`,
  }
      },
    )
    revalidatePath('/game/pokemon')
    revalidatePath('/game/inventory')
    return result
  } catch (error) {
    return { success: false, message: getEconomyActionErrorMessage(error) }
  }
}

export async function getUserPokemonCount() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return 0

  const countResult = await payload.count({
    collection: 'pokemon',
    where: {
      and: [
        { user: { equals: user.id } },
        {
          or: [
            { fusedIntoPokemonId: { exists: false } },
            { fusedIntoPokemonId: { equals: null } },
            { fusedIntoPokemonId: { equals: '' } },
          ],
        },
      ],
    },
  })

  return countResult.totalDocs + await getActiveEggCount(payload as any, user.id)
}
