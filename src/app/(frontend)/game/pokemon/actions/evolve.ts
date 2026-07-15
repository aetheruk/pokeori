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
import {
  getPokemonForm,
  getPokemonSpecies,
  getSpeciesIdForForm,
} from '@/utilities/pokemon/pokedex'
import { items } from '@/data/items'
import { rollResearchXp } from '@/utilities/research/research-levels'
import { EVOLUTIONS, type EvolutionCondition } from '@/data/evolutions'
import { resolveEvolvedAbility } from '@/data/abilities'
import { resolveEvolutionTargetForm } from '@/utilities/pokemon/evolution-targets'
import {
  getEvolutionTimeOfDayLabel,
  getEvolutionTimeRegionLabel,
  matchesEvolutionGender,
  matchesEvolutionTimeOfDayForRegion,
  resolveEvolutionTimeRegion,
} from '@/utilities/pokemon/evolution-conditions'
import { getOwnedPokemonGender } from '@/utilities/pokemon/gender'
import { getUser, serializePokemon, type StatName } from './utils'
import {
  getUserInventoryMap,
  getUserPokedexMap,
  getUserProfileStats,
  setUserInventoryMap,
  setUserPokedexMap,
} from '@/utilities/user-state'

function getRequiredEvolutionItem(
  conditions: EvolutionCondition,
): string | null {
  if (conditions.locationId) return 'evolution-compass'
  if (conditions.knownMoveId) return 'charged-tm'
  if (conditions.heldItem) return conditions.heldItem
  return conditions.itemId || (conditions.trade ? 'link-cable' : null)
}

function matchesSourceForm(
  conditions: EvolutionCondition,
  currentFormName: string,
): boolean {
  return (
    !conditions.requiredSourceForm ||
    conditions.requiredSourceForm === currentFormName
  )
}

function matchesTriggerItem(
  conditions: EvolutionCondition,
  triggerItemId?: string,
): boolean {
  const requiredItem = getRequiredEvolutionItem(conditions)
  if (!triggerItemId) return true
  return requiredItem === triggerItemId
}

export async function evolvePokemon(
  pokemonId: string,
  targetSpeciesId: number,
  triggerItemId?: string,
) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })

  // 1. Fetch Pokemon
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

  // 2. Validate Evolution
  const possibleEvolutions = EVOLUTIONS[pokemon.speciesId] || []
  const currentFormInfo = getPokemonForm(pokemon.formId)
  const currentFormName = currentFormInfo?.form || 'base'
  const pokemonGender = getOwnedPokemonGender(pokemon)
  const evolutionTimeRegion = resolveEvolutionTimeRegion(pokemon)
  const matchingEvolutionCandidates = possibleEvolutions.filter(
    (e) =>
      e.speciesId === targetSpeciesId &&
      matchesSourceForm(e.conditions, currentFormName) &&
      matchesEvolutionGender(e.conditions, pokemonGender) &&
      matchesTriggerItem(e.conditions, triggerItemId),
  )
  const targetEvolution = matchingEvolutionCandidates.find((e) =>
    matchesEvolutionTimeOfDayForRegion(e.conditions, evolutionTimeRegion),
  )

  if (!targetEvolution) {
    const timeGatedEvolution = matchingEvolutionCandidates.find(
      (e) => e.conditions.timeOfDay,
    )

    if (timeGatedEvolution?.conditions.timeOfDay) {
      return {
        success: false,
        message: `This evolution can only happen during ${getEvolutionTimeOfDayLabel(
          timeGatedEvolution.conditions.timeOfDay,
        )} (${getEvolutionTimeRegionLabel(evolutionTimeRegion)})`,
      }
    }

    return {
      success: false,
      message: 'Invalid evolution target',
    }
  }

  // Check Conditions
  const { conditions } = targetEvolution

  // Check Source Form Requirement (Regional variants)
  // Resolve current form name from ID
  if (
    conditions.requiredSourceForm &&
    conditions.requiredSourceForm !== currentFormName
  ) {
    throw new Error(
      `This evolution is only for ${conditions.requiredSourceForm} form`,
    )
  }

  // Level Check
  if (conditions.minLevel && (pokemon.level || 1) < conditions.minLevel) {
    throw new Error(`Pokemon must be level ${conditions.minLevel} to evolve`)
  }

  if (conditions.timeOfDay) {
    if (
      !matchesEvolutionTimeOfDayForRegion(conditions, evolutionTimeRegion)
    ) {
      return {
        success: false,
        message: `This evolution can only happen during ${getEvolutionTimeOfDayLabel(
          conditions.timeOfDay,
        )} (${getEvolutionTimeRegionLabel(evolutionTimeRegion)})`,
      }
    }
  }

  // Item Check Logic (including simplified mechanics)
  const requiredItem = getRequiredEvolutionItem(conditions)

  if (requiredItem) {
    // If specific item triggers it (for multi-path evolutions like Eevee items), verify match
    // Only check trigger match if it was explicitly passed (details dialog usually passes it)
    if (triggerItemId && triggerItemId !== requiredItem) {
      // Allow if trigger is generic "link-cable" check but we swapped to something else?
      // Actually, simplified logic implies we just enforce the requirement.
      // But if the user clicked "Fire Stone" but it requires "Water Stone", we should fail.
      // For Compass/TM, the UI triggers generic "use-item", so we shouldn't block id mismatch if we're autopopulating.
      // Let's rely on inventory check below mostly.
      if (conditions.itemId && triggerItemId !== requiredItem) {
        throw new Error(`Requires ${requiredItem} to evolve`)
      }
    }

    // Check Inventory
    const userInventory = await getUserInventoryMap(payload as any, user.id)
    if ((userInventory[requiredItem] || 0) < 1) {
      // Create readable names for custom items
      let itemName = requiredItem
      const itemDef = items.find((i) => i.id === requiredItem)
      if (itemDef) itemName = itemDef.name

      throw new Error(`You need a ${itemName} to evolve`)
    }

    // Consume Item
    userInventory[requiredItem] -= 1
    await setUserInventoryMap(payload as any, user.id, userInventory)
  }

  // Friendship Check
  if (
    conditions.minHappiness &&
    (pokemon.friendship || 0) < conditions.minHappiness
  ) {
    throw new Error(`Pokemon is not friendly enough to evolve`)
  }

  if (!matchesEvolutionGender(conditions, pokemonGender)) {
    throw new Error('This evolution is not available for this Pokemon gender')
  }

  // 3. Evolve (Update Pokemon)
  // Determine new Form ID based on target specs
  // If targetForm is specified (overrides), use it. Otherwise assume "base" (standard evolution).
  // Note: Some evolutions might preserve form (Shellos East -> Gastrodon East), but our script defaults to standard unless overridden.
  // For now, if no override, we assume "base".
  const targetFormName = resolveEvolutionTargetForm(pokemon, targetEvolution)
  const directTargetForm = getPokemonForm(targetFormName)
  const newSpeciesInfo =
    directTargetForm &&
    getSpeciesIdForForm(targetFormName) === targetEvolution.speciesId
      ? directTargetForm
      : getPokemonSpecies(targetEvolution.speciesId, targetFormName)

  if (!newSpeciesInfo?.id) {
    throw new Error(
      `Failed to resolve target form ID for ${targetEvolution.name} (${targetFormName})`,
    )
  }

  const newFormId = newSpeciesInfo.id
  const newAbilityId = resolveEvolvedAbility(pokemon.formId, pokemon.ability, newFormId)

  await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      speciesId: targetEvolution.speciesId,
      formId: newFormId,
      name:
        targetEvolution.name.charAt(0).toUpperCase() +
        targetEvolution.name.slice(1), // Auto-rename to species name
      ability: newAbilityId || '',
      evolved: true,
    },
  })

  // 3b. Recalculate stats for the new species/form
  // First fetch the updated pokemon to get the new formId/speciesId
  const evolvedPokemon = await payload.findByID({
    collection: 'pokemon',
    id: pokemonId,
  })

  // Calculate new stats based on new species base stats
  const pokemonWithNewStats = calculateStats(evolvedPokemon)

  // Save the recalculated stats
  await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      stats: pokemonWithNewStats.stats,
    },
  })

  // 4. Update User Stats (Pokedex & Count)
  // Fetch fresh user to avoid race conditions/stale data
  const freshUser = await payload.findByID({
    collection: 'users',
    id: user.id,
  })

  // Update Pokedex for new species
  const pokedex = await getUserPokedexMap(payload as any, user.id)
  const speciesKey = targetEvolution.speciesId.toString()
  const formKey = newFormId

  const speciesMap = pokedex[speciesKey] || {}
  const existing = speciesMap[formKey] || {
    caught: false,
    seen: false,
    totalCaught: 0,
    totalSeen: 0,
    shinyCaught: false,
    shinySeen: false,
  }

  pokedex[speciesKey] = {
    ...speciesMap,
    [formKey]: {
      ...existing,
      caught: true,
      seen: true,
      totalCaught: (existing.totalCaught || 0) + 1,
      totalSeen: (existing.totalSeen || 0) + 1,
      shinyCaught: existing.shinyCaught || !!pokemon.shiny,
      shinySeen: existing.shinySeen || !!pokemon.shiny,
    },
  }

  // Update Total Evolutions Count
  const userStats = getUserProfileStats(freshUser)
  const oldTotal = userStats.totalEvolutions || 0
  userStats.totalEvolutions = oldTotal + 1

  logger.debug('Logging Evolution:', {
    id: freshUser.id,
    oldTotal,
    newTotal: userStats.totalEvolutions,
  })

  await Promise.all([
    setUserPokedexMap(payload as any, user.id, pokedex),
    payload.update({
      collection: 'users',
      id: user.id,
      data: {
        stats: userStats,
      },
    }),
  ])

  // Grant Research XP via reward logic to trigger auto-leveling
  const { grantRewards } = await import('@/utilities/rewards/reward-logic')
  const { summary } = await grantRewards(user.id, [
    {
      type: 'pokemon_research_xp',
      targetId: newFormId,
      quantity: rollResearchXp(),
      dropChance: 100,
    },
  ])

  // 5. Fetch Updated Pokemon & Return
  const updatedPokemon = await payload.findByID({
    collection: 'pokemon',
    id: pokemonId,
  })

  revalidatePath('/game/pokemon')
  return {
    success: true,
    message: `Evolved into ${targetEvolution.name}!`,
    newSpeciesId: targetEvolution.speciesId,
    newFormId: newFormId,
    pokemon: serializePokemon(updatedPokemon),
    rewards: summary,
  }
}
