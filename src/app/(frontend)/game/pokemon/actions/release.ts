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

function formatReleaseRewardItems(summary: RewardSummary): string {
  if (!summary.items.length) return 'nothing'
  return summary.items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(', ')
}

export async function releasePokemon(pokemonId: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  // 1. Verify Ownership
  const pokemon = await payload.findByID({
    collection: 'pokemon',
    id: pokemonId,
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
  })

  if (countResult.totalDocs <= 1) {
    return { success: false, message: 'Cannot release your only Pokemon!' }
  }

  const pokedex = await getUserPokedexMap(payload as any, user.id)
  const researcherLevel = getSkillLevel(user.skills, 'researching')
  const rewardsToGrant = buildPokemonReleaseRewards({
    pokemon,
    pokedex: pokedex as Record<string, any>,
    researchingLevel: researcherLevel,
  })

  const { summary } = await grantRewards(user.id, rewardsToGrant, {
    source: 'pokemon-release',
  })

  // 4. Delete
  await payload.delete({
    collection: 'pokemon',
    id: pokemonId,
  })

  revalidatePath('/game/pokemon')
  revalidatePath('/game/inventory')

  return {
    success: true,
    summary,
    message: `Goodbye, ${pokemon.name}! You received ${formatReleaseRewardItems(summary)}.`,
  }
}

export async function releasePokemonBulk(pokemonIds: string[]) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

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

  const payload = await getPayload({ config })

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
  })

  if (countResult.totalDocs - pokemonToRelease.length < 1) {
    return { success: false, message: 'Cannot release all of your Pokemon!' }
  }

  const pokedex = await getUserPokedexMap(payload as any, user.id)
  const researcherLevel = getSkillLevel(user.skills, 'researching')
  const rewardsToGrant = pokemonToRelease.flatMap((pokemon) =>
    buildPokemonReleaseRewards({
      pokemon,
      pokedex: pokedex as Record<string, any>,
      researchingLevel: researcherLevel,
    }),
  )

  const { summary } = await grantRewards(user.id, rewardsToGrant, {
    source: 'pokemon-release-bulk',
  })

  await Promise.all(
    pokemonToRelease.map((pokemon) =>
      payload.delete({
        collection: 'pokemon',
        id: pokemon.id,
      }),
    ),
  )

  revalidatePath('/game/pokemon')
  revalidatePath('/game/inventory')

  return {
    success: true,
    summary,
    releasedIds: pokemonToRelease.map((pokemon) => pokemon.id),
    message: `Released ${pokemonToRelease.length} Pokemon. You received ${formatReleaseRewardItems(summary)}.`,
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

  return countResult.totalDocs
}
