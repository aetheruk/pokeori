'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'
import {
  getAvailablePokemonPowerOptions,
  normalizeSelectedPokemonPower,
} from '@/utilities/pokemon/pokemon-powers'
import { getSkillLevel } from '@/utilities/skills/unlocks'
import { getPokemonResearchLevel } from '@/utilities/research/research-levels'
import { getUser, serializePokemon } from './utils'
import { getUserInventoryMap, getUserPokedexMap } from '@/utilities/user-state'

export async function setSelectedPokemonPower(
  pokemonId: string,
  powerId: string | null,
) {
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

  const normalizedPowerId = normalizeSelectedPokemonPower(powerId)
  if (powerId && !normalizedPowerId) {
    return { success: false, message: 'Invalid Pokemon Power' }
  }

  const [inventory, pokedex] = await Promise.all([
    getUserInventoryMap(payload as any, user.id),
    getUserPokedexMap(payload as any, user.id),
  ])
  if (normalizedPowerId) {
    if (
      getPokemonResearchLevel(pokedex as any, pokemon.speciesId, pokemon.formId) < 3
    ) {
      return {
        success: false,
        message: 'Research Level 3 required for this species to select Pokemon Powers',
      }
    }

    const availablePowerIds = new Set(
      getAvailablePokemonPowerOptions({
        pokemonFormId: pokemon.formId,
        inventory,
        trainerLevel: getSkillLevel(user.skills, 'battling'),
      }).map((power) => power.id),
    )

    if (!availablePowerIds.has(normalizedPowerId)) {
      return {
        success: false,
        message: 'That Pokemon Power is not unlocked for this Pokemon',
      }
    }
  }

  const updatedPokemon = await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      selectedPokemonPower: normalizedPowerId,
    },
    depth: 0,
  })

  revalidatePath('/game/pokemon')

  return {
    success: true,
    pokemon: serializePokemon(updatedPokemon),
    selectedPokemonPower: normalizedPowerId,
  }
}
