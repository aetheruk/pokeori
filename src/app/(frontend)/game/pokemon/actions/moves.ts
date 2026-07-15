'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import {
  toAssignedMoveRows,
  validateAssignedMoveIds,
} from '@/utilities/pokemon/pokemon-moves'
import { resolveAssignedMoveFormId } from '@/utilities/pokemon/move-form-swaps'
import {
  getResearcherMoveSlotCount,
  getSkillLevel,
} from '@/utilities/skills/unlocks'
import { getPokemonResearchLevel } from '@/utilities/research/research-levels'
import { getUser, serializePokemon } from './utils'
import { getUserInventoryMap, getUserPokedexMap } from '@/utilities/user-state'

export async function setAssignedMoves(pokemonId: string, moveIds: string[]) {
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

  const form = getPokemonForm(pokemon.formId)
  const [inventory, pokedex] = await Promise.all([
    getUserInventoryMap(payload as any, user.id),
    getUserPokedexMap(payload as any, user.id),
  ])
  const researcherLevel = getSkillLevel(user.skills, 'researching')
  const maxAssignedMoves = getResearcherMoveSlotCount(researcherLevel)

  if (moveIds.length > 0 && maxAssignedMoves <= 0) {
    return {
      success: false,
      message: 'Researcher Level 10 required to assign battle moves',
    }
  }

  if (
    moveIds.length > 0 &&
    getPokemonResearchLevel(pokedex as any, pokemon.speciesId, pokemon.formId) <
      1
  ) {
    return {
      success: false,
      message:
        'Research Level 1 required for this species to assign battle moves',
    }
  }

  const validation = validateAssignedMoveIds({
    moveIds,
    pokemonTypes: form?.types || [],
    pokemonFormId: pokemon.formId,
    pokemonLevel: pokemon.level,
    inventory,
    maxAssignedMoves,
  })

  if (!validation.success) {
    return { success: false, message: validation.error }
  }

  const nextFormId = resolveAssignedMoveFormId({
    speciesId: pokemon.speciesId,
    currentFormId: pokemon.formId,
    assignedMoves: validation.moveIds,
  })

  const updatedPokemon = await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      assignedMoves: toAssignedMoveRows(validation.moveIds),
      formId: nextFormId,
    },
    depth: 0,
  })

  revalidatePath('/game/pokemon')

  return {
    success: true,
    pokemon: serializePokemon(updatedPokemon),
    assignedMoveIds: validation.moveIds,
  }
}
