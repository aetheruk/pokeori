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
  calculateStats
} from '@/utilities/pokemon/pokemon-mechanics'
import { calculateReleaseRewards } from '@/utilities/rewards/candy-logic'
import type { NatureName } from '@/data/natures'
import type { Pokemon, User } from '@/payload-types'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import { items } from '@/data/items'
import { rollResearchXp } from '@/utilities/research/research-levels'
import { EVOLUTIONS } from '@/data/evolutions'
import { DEED_POLL_ITEM_ID } from '@/data/items/special-item-ids'
import { getUserInventoryMap } from '@/utilities/user-state'
import { getUser, serializePokemon, type StatName } from './utils'
import { acquireActionLock, checkActionRateLimit, releaseActionLock } from '@/utilities/game-integrity'
import { POKEMON_BOX_POPULATE } from '@/utilities/pokemon/box-query'

export async function identifyPokemon(pokemonId: string, _userLevel?: number) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  if (typeof pokemonId !== 'string' || !/^[a-f0-9]{24}$/i.test(pokemonId)) throw new Error('Invalid Pokemon')
  const rate = await checkActionRateLimit(user.id, 'identify-pokemon', 60, 60)
  if (!rate.allowed) throw new Error('Too many identification attempts')
  const lock = await acquireActionLock(`lock:pokemon:identify:${pokemonId}`, 15)
  if (!lock.acquired) throw new Error('Identification is already in progress')
  try {
    const payload = await getPayload({ config })
    const pokemon = await payload.findByID({ collection: 'pokemon', id: pokemonId, depth: 0 })
    const ownerId = typeof pokemon.user === 'string' ? pokemon.user : pokemon.user.id
    if (ownerId !== user.id) throw new Error('Unauthorized')
    const userLevel = Math.max(1, Math.min(50, user.skills?.catching?.level || 1))
    await identifyPokemonUtil(payload, pokemonId, userLevel)
    revalidatePath('/game/pokemon')
    return payload.findByID({ collection: 'pokemon', id: pokemonId, depth: 1, populate: POKEMON_BOX_POPULATE })
  } finally {
    await releaseActionLock(lock)
  }
}

export async function increaseEV(pokemonId: string, stat: StatName, amount: number) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user?.isAdmin) throw new Error('Unauthorized')

  await increaseEVUtil(payload, pokemonId, stat, amount)
  revalidatePath('/game/pokemon')
}

export async function decreaseEV(pokemonId: string, stat: StatName, amount: number) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user?.isAdmin) throw new Error('Unauthorized')

  await decreaseEVUtil(payload, pokemonId, stat, amount)
  revalidatePath('/game/pokemon')
}

export async function increaseIV(pokemonId: string, stat: StatName, amount: number) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user?.isAdmin) throw new Error('Unauthorized')

  await increaseIVUtil(payload, pokemonId, stat, amount)
  revalidatePath('/game/pokemon')
}

export async function decreaseIV(pokemonId: string, stat: StatName, amount: number) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user?.isAdmin) throw new Error('Unauthorized')

  await decreaseIVUtil(payload, pokemonId, stat, amount)
  revalidatePath('/game/pokemon')
}

export async function levelUp(pokemonId: string, levels: number) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user?.isAdmin) throw new Error('Unauthorized')

  await levelUpUtil(payload, pokemonId, levels)
  revalidatePath('/game/pokemon')
}

export async function changeNature(pokemonId: string, nature: NatureName) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user?.isAdmin) throw new Error('Unauthorized')

  await changeNatureUtil(payload, pokemonId, nature)
  revalidatePath('/game/pokemon')
}

export async function renamePokemon(pokemonId: string, newName: string) {
  const payload = await getPayload({ config })
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const inventory = await getUserInventoryMap(payload as any, user.id)
  if ((inventory[DEED_POLL_ITEM_ID] || 0) <= 0) {
    throw new Error('A Deed Poll is required to rename Pokemon')
  }

  const pokemon = await payload.findByID({ collection: 'pokemon', id: pokemonId })
  const ownerId =
    typeof pokemon.user === 'object' && pokemon.user
      ? pokemon.user.id
      : pokemon.user
  if (String(ownerId) !== String(user.id) && !user.isAdmin) {
    throw new Error('Unauthorized')
  }

  const updatedPokemon = await renamePokemonUtil(payload, pokemonId, newName)
  revalidatePath('/game/pokemon')

  return updatedPokemon
}
