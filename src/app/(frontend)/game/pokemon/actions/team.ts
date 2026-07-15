'use server'

import { getPayload, Where } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { logger } from '@/utilities/logger'
import {
  identifyPokemon as identifyPokemonUtil,
  increaseEV as increaseEVUtil,
  decreaseEV as decreaseEVUtil,
  increaseIV as increaseIVUtil,
  decreaseIV as decreaseIVUtil,
  levelUp as levelUpUtil,
  changeNature as changeNatureUtil,
  renamePokemon as renamePokemonUtil,
  increaseFriendship as increaseFriendshipUtil,
  calculateStats,
} from '@/utilities/pokemon/pokemon-mechanics'
import { calculateReleaseRewards } from '@/utilities/rewards/candy-logic'
import type { NatureName } from '@/data/natures'
import type { Pokemon, User } from '@/payload-types'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import { items } from '@/data/items'
import { rollResearchXp } from '@/utilities/research/research-levels'
import { EVOLUTIONS } from '@/data/evolutions'
import { getUser, serializePokemon, type StatName } from './utils'

export type PokemonRosterRole = 'box' | 'battle-team' | 'companion'

export async function setPokemonRosterRole(
  pokemonId: string,
  role: PokemonRosterRole,
  targetBoxId?: string | null,
  battleTeamPosition?: number,
) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  const pokemon = await payload.findByID({
    collection: 'pokemon',
    id: pokemonId,
    depth: 0,
  })

  if (
    (typeof pokemon.user === 'object' ? pokemon.user.id : pokemon.user) !==
    user.id
  ) {
    throw new Error('Pokemon not owned by user')
  }

  if (pokemon.fusedIntoPokemonId) {
    throw new Error(
      'Fused Pokemon must be separated before changing roster role',
    )
  }

  if (role === 'box') {
    await payload.update({
      collection: 'pokemon',
      id: pokemonId,
      data: {
        onBattleTeam: false,
        battleTeamPosition: null,
        isCompanion: false,
        boxId: targetBoxId !== undefined ? targetBoxId : (pokemon as any).boxId,
      },
      depth: 0,
    })

    revalidatePath('/game/pokemon')
    return {
      success: true,
      role,
      onBattleTeam: false,
      battleTeamPosition: null,
      isCompanion: false,
      boxId: targetBoxId !== undefined ? targetBoxId : (pokemon as any).boxId,
    }
  }

  if (role === 'companion') {
    const currentCompanions = await payload.find({
      collection: 'pokemon',
      where: {
        and: [
          { user: { equals: user.id } },
          { isCompanion: { equals: true } },
          {
            or: [
              { fusedIntoPokemonId: { exists: false } },
              { fusedIntoPokemonId: { equals: null } },
              { fusedIntoPokemonId: { equals: '' } },
            ],
          },
        ],
      },
      limit: 100,
      depth: 0,
    })

    await Promise.all(
      currentCompanions.docs
        .filter((comp) => comp.id !== pokemonId)
        .map((comp) =>
          payload.update({
            collection: 'pokemon',
            id: comp.id as string,
            data: {
              isCompanion: false,
            },
            depth: 0,
          }),
        ),
    )

    await payload.update({
      collection: 'pokemon',
      id: pokemonId,
      data: {
        isCompanion: true,
        onBattleTeam: false,
        battleTeamPosition: null,
      },
      depth: 0,
    })

    revalidatePath('/game/pokemon')
    return {
      success: true,
      role,
      onBattleTeam: false,
      battleTeamPosition: null,
      isCompanion: true,
    }
  }

  const team = await payload.find({
    collection: 'pokemon',
    where: {
      and: [
        { user: { equals: user.id } },
        { onBattleTeam: { equals: true } },
        {
          or: [
            { fusedIntoPokemonId: { exists: false } },
            { fusedIntoPokemonId: { equals: null } },
            { fusedIntoPokemonId: { equals: '' } },
          ],
        },
      ],
    },
    limit: 6,
    depth: 0,
  })

  const alreadyOnTeam = !!pokemon.onBattleTeam
  if (!alreadyOnTeam && team.totalDocs >= 6) {
    return { success: false, message: 'Battle team is full (max 6)' }
  }

  const requestedPosition =
    typeof battleTeamPosition === 'number' &&
    battleTeamPosition >= 1 &&
    battleTeamPosition <= 6
      ? battleTeamPosition
      : null
  const positions = team.docs
    .filter((p) => p.id !== pokemonId)
    .map((p) => p.battleTeamPosition || 0)
  let newPosition = requestedPosition || 1
  while (positions.includes(newPosition) && !requestedPosition) {
    newPosition++
  }

  await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      onBattleTeam: true,
      battleTeamPosition: newPosition,
      isCompanion: false,
    },
    depth: 0,
  })

  revalidatePath('/game/pokemon')
  return {
    success: true,
    role,
    onBattleTeam: true,
    battleTeamPosition: newPosition,
    isCompanion: false,
  }
}

export async function getPokemonTeamLayout() {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  const [team, companions] = await Promise.all([
    payload.find({
      collection: 'pokemon',
      where: {
        and: [
          { user: { equals: user.id } },
          { onBattleTeam: { equals: true } },
          {
            or: [
              { fusedIntoPokemonId: { exists: false } },
              { fusedIntoPokemonId: { equals: null } },
              { fusedIntoPokemonId: { equals: '' } },
            ],
          },
        ],
      },
      depth: 1,
      limit: 6,
      sort: 'battleTeamPosition',
    }),
    payload.find({
      collection: 'pokemon',
      where: {
        and: [
          { user: { equals: user.id } },
          { isCompanion: { equals: true } },
          {
            or: [
              { fusedIntoPokemonId: { exists: false } },
              { fusedIntoPokemonId: { equals: null } },
              { fusedIntoPokemonId: { equals: '' } },
            ],
          },
        ],
      },
      depth: 1,
      limit: 1,
    }),
  ])

  return {
    battleTeam: team.docs.map(serializePokemon),
    companion: companions.docs[0] ? serializePokemon(companions.docs[0]) : null,
  }
}

export async function toggleLock(pokemonId: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  const pokemon = await payload.findByID({
    collection: 'pokemon',
    id: pokemonId,
    depth: 0,
  })

  if (
    (typeof pokemon.user === 'object' ? pokemon.user.id : pokemon.user) !==
    user.id
  ) {
    throw new Error('Pokemon not owned by user')
  }

  const newLockedState = !pokemon.locked

  await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      locked: newLockedState,
    },
  })

  revalidatePath('/game/pokemon')
  return { success: true, locked: newLockedState }
}

export async function toggleMarking(
  pokemonId: string,
  marking:
    | 'markingSquare'
    | 'markingCircle'
    | 'markingTriangle'
    | 'markingDiamond',
) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  const pokemon = await payload.findByID({
    collection: 'pokemon',
    id: pokemonId,
    depth: 0,
  })

  if (
    (typeof pokemon.user === 'object' ? pokemon.user.id : pokemon.user) !==
    user.id
  ) {
    throw new Error('Pokemon not owned by user')
  }

  const currentMarking = pokemon[marking]
  const newMarkingState = !currentMarking

  await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      [marking]: newMarkingState,
    },
  })

  revalidatePath('/game/pokemon')
  return { success: true, [marking]: newMarkingState }
}

export async function toggleCompanion(
  pokemonId: string,
  targetBoxId?: string | null,
) {
  const payload = await getPayload({ config })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { success: false, message: 'Unauthorized' }
  }

  try {
    // 1. Check if the target Pokemon belongs to the user
    const targetPokemon: any = await payload.findByID({
      collection: 'pokemon',
      id: pokemonId,
    })

    if (
      !targetPokemon ||
      (typeof targetPokemon.user === 'object'
        ? targetPokemon.user.id !== user.id
        : targetPokemon.user !== user.id)
    ) {
      return { success: false, message: 'Pokemon not found or no permission' }
    }

    const isAlreadyCompanion = targetPokemon.isCompanion

    if (isAlreadyCompanion) {
      await setPokemonRosterRole(pokemonId, 'box', targetBoxId)
      return {
        success: true,
        isCompanion: false,
        message: 'Companion disabled',
      }
    } else {
      await setPokemonRosterRole(pokemonId, 'companion')
      return { success: true, isCompanion: true, message: 'Companion updated' }
    }
  } catch (error) {
    return { success: false, message: 'An error occurred' }
  }
}

export async function toggleBattleTeam(
  pokemonId: string,
  targetBoxId?: string | null,
) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  const pokemon = await payload.findByID({
    collection: 'pokemon',
    id: pokemonId,
    depth: 0,
  })

  if (
    (typeof pokemon.user === 'object' ? pokemon.user.id : pokemon.user) !==
    user.id
  ) {
    throw new Error('Pokemon not owned by user')
  }

  // If currently on team, remove it
  if (pokemon.onBattleTeam) {
    await setPokemonRosterRole(pokemonId, 'box', targetBoxId)
    return { success: true, onBattleTeam: false, battleTeamPosition: null }
  }

  // If adding to team, check limit (6)
  const team = await payload.find({
    collection: 'pokemon',
    where: {
      user: { equals: user.id },
      onBattleTeam: { equals: true },
    },
  })

  if (team.totalDocs >= 6) {
    return { success: false, message: 'Battle team is full (max 6)' }
  }

  // Find first available position
  const positions = team.docs.map((p) => p.battleTeamPosition || 0)
  let newPosition = 1
  while (positions.includes(newPosition)) {
    newPosition++
  }

  await setPokemonRosterRole(pokemonId, 'battle-team', undefined, newPosition)
  return { success: true, onBattleTeam: true, battleTeamPosition: newPosition }
}

export async function reorderBattleTeam(orderedPokemonIds: string[]) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  // Verify all pokemon belong to user and are on battle team
  const pokemonDocs = await payload.find({
    collection: 'pokemon',
    where: {
      id: { in: orderedPokemonIds },
      user: { equals: user.id },
      onBattleTeam: { equals: true },
    },
    limit: 100,
  })

  if (pokemonDocs.totalDocs !== orderedPokemonIds.length) {
    return { success: false, message: 'Invalid pokemon list' }
  }

  // Update positions
  await Promise.all(
    orderedPokemonIds.map((id, index) =>
      payload.update({
        collection: 'pokemon',
        id,
        data: {
          battleTeamPosition: index + 1,
        },
      }),
    ),
  )

  revalidatePath('/game/pokemon')
  return { success: true }
}
