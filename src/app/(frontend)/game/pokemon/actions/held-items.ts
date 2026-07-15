'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { getHeldItemDefinition } from '@/utilities/pokemon/held-items'
import {
  TRAINER_HELD_ITEM_LEVEL,
  canUseTrainerHeldItems,
  getItemSkillLockReason,
  getSkillLevel,
} from '@/utilities/skills/unlocks'
import { getPokemonResearchLevel } from '@/utilities/research/research-levels'
import { getUser, serializePokemon } from './utils'
import {
  getUserInventoryMap,
  getUserPokedexMap,
  setUserInventoryMap,
} from '@/utilities/user-state'
import { resolveHeldItemFormId } from '@/utilities/pokemon/held-item-form-swaps'

export async function setHeldItem(pokemonId: string, itemId: string | null) {
  const user = await getUser()
  if (!user) return { success: false, message: 'Unauthorized' }

  const payload = await getPayload({ config })
  const pokemon = await payload.findByID({
    collection: 'pokemon',
    id: pokemonId,
    depth: 0,
  })

  const ownerId =
    typeof pokemon.user === 'object' ? pokemon.user.id : pokemon.user
  if (ownerId !== user.id) {
    return { success: false, message: 'Pokemon not owned by user' }
  }

  const nextItemId = itemId || null
  const currentHeldItemId = pokemon.heldItemId || null
  const nextFormId = resolveHeldItemFormId({
    speciesId: pokemon.speciesId,
    currentFormId: pokemon.formId,
    nextHeldItemId: nextItemId,
  })

  if (nextItemId) {
    const trainerLevel = getSkillLevel(user.skills, 'battling')
    const pokedex = await getUserPokedexMap(payload as any, user.id)
    if (!canUseTrainerHeldItems(trainerLevel)) {
      return {
        success: false,
        message: `Trainer Level ${TRAINER_HELD_ITEM_LEVEL} required to assign held items`,
      }
    }
    if (
      getPokemonResearchLevel(pokedex as any, pokemon.speciesId, pokemon.formId) < 1
    ) {
      return {
        success: false,
        message: 'Research Level 1 required for this species to assign held items',
      }
    }
  }

  if (currentHeldItemId === nextItemId && pokemon.formId === nextFormId) {
    return {
      success: true,
      pokemon: serializePokemon(pokemon),
      heldItemId: currentHeldItemId,
    }
  }

  if (currentHeldItemId === nextItemId) {
    const updatedPokemon = await payload.update({
      collection: 'pokemon',
      id: pokemonId,
      data: { formId: nextFormId },
      depth: 0,
    })

    revalidatePath('/game/pokemon')

    return {
      success: true,
      pokemon: serializePokemon(updatedPokemon),
      heldItemId: currentHeldItemId,
    }
  }

  const nextItem = getHeldItemDefinition(nextItemId)
  if (nextItemId && !nextItem) {
    return { success: false, message: 'That item cannot be held' }
  }
  if (nextItem) {
    const skillLockReason = getItemSkillLockReason(nextItem, user.skills)
    if (skillLockReason) {
      return { success: false, message: skillLockReason }
    }
  }

  const inventory = await getUserInventoryMap(payload as any, user.id)

  if (currentHeldItemId) {
    inventory[currentHeldItemId] = (inventory[currentHeldItemId] || 0) + 1
  }

  if (nextItemId) {
    const currentQuantity = inventory[nextItemId] || 0
    if (currentQuantity <= 0) {
      return { success: false, message: 'You do not have that item available' }
    }

    const nextQuantity = currentQuantity - 1
    if (nextQuantity > 0) {
      inventory[nextItemId] = nextQuantity
    } else {
      delete inventory[nextItemId]
    }
  }

  await setUserInventoryMap(payload as any, user.id, inventory)

  const updatedPokemon = await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      heldItemId: nextItemId,
      itemCharge: 0,
      formId: nextFormId,
    },
    depth: 0,
  })

  revalidatePath('/game/pokemon')

  return {
    success: true,
    pokemon: serializePokemon(updatedPokemon),
    heldItemId: nextItemId,
  }
}
