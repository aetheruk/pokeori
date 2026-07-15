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
import { setPokemonRosterRole } from './team'

export async function getPokemon(
  page: number = 1,
  limit: number = 24,
  boxId?: string | null,
) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  const where: Where = {
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
  }

  if (boxId !== undefined) {
    if (boxId === null) {
      where.boxId = { exists: false }
    } else if (boxId === 'battle-team') {
      where.onBattleTeam = { equals: true }
    } else {
      where.boxId = { equals: boxId }
    }
  }

  const { docs, hasNextPage, nextPage } = await payload.find({
    collection: 'pokemon',
    where,
    depth: 1,
    page,
    limit,
    sort: boxId === 'battle-team' ? 'battleTeamPosition' : '-createdAt',
  })

  return {
    docs: docs.map(serializePokemon),
    hasNextPage,
    nextPage,
  }
}

export async function createBox(name: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  const boxes = user.boxes || []
  const maxBoxes = user.maxBoxes || 5

  if (boxes.length >= maxBoxes) {
    return { success: false, message: 'Max boxes reached' }
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      boxes: [...boxes, { name }],
    },
  })

  revalidatePath('/game/pokemon')
  return { success: true }
}

export async function movePokemonToBox(
  pokemonId: string,
  boxId: string | null,
) {
  return setPokemonRosterRole(pokemonId, 'box', boxId)
}

export async function deleteBox(boxId: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  // Check if box has pokemon
  const pokemonInBox = await payload.find({
    collection: 'pokemon',
    where: {
      user: { equals: user.id },
      boxId: { equals: boxId },
    },
    limit: 1,
  })

  if (pokemonInBox.totalDocs > 0) {
    return { success: false, message: 'Cannot delete box with Pokemon in it' }
  }

  const boxes = user.boxes || []
  const newBoxes = boxes.filter((b: any) => b.id !== boxId)

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      boxes: newBoxes,
    },
  })

  revalidatePath('/game/pokemon')
  return { success: true }
}

export async function renameBox(boxId: string, newName: string) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  const boxes = user.boxes || []
  const newBoxes = boxes.map((b: any) => {
    if (b.id === boxId) {
      return { ...b, name: newName }
    }
    return b
  })

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      boxes: newBoxes,
    },
  })

  revalidatePath('/game/pokemon')
  return { success: true }
}
