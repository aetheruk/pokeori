import type { BattlePokemon, BattleStance } from './types'
import { calculateStatsFromBase, TYPE_STANCE_PREFERENCES } from './stats-calc'
import { isStanceDisabled } from './stance-disable'
import type { PokemonForm } from '@/data/pokemon'

const NEUTRAL_IVS = {
  hp: 0,
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
}

const NEUTRAL_EVS = {
  hp: 0,
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
}

export const POKEDEX_STANCE_REFERENCE_LEVEL = 50

// For lower level Pokemon, they are more likely to use their type-preferred stance
// AI Logic - returns a weighted random stance based on stats, type preferences, and opponent analysis
export function calculateAiStance(
  pokemon: BattlePokemon,
  opponent?: BattlePokemon,
  random: () => number = Math.random,
): BattleStance {
  const stats = pokemon.stats!
  const level = pokemon.level || 5

  // 1. Self-Optimization: Prefer stances where we have better stats
  let powerWeight = stats.attack!
  let speedWeight = stats.speed!
  let techWeight = stats.specialAttack!

  // 2. Type-based Preference (Legacy/Flavor bias)
  // Stronger bias at lower levels to define "personality"
  if (level < 100) {
    // Iterate over ALL types to accumulate bonuses
    pokemon.types.forEach((type) => {
      const preferredStance = TYPE_STANCE_PREFERENCES[type.toLowerCase()]
      if (preferredStance) {
        // Significanly increased bonus for low levels (was 10)
        // Level 1-15: +20 (Huge influence)
        // Level 16-40: +15
        // Level 41+: +10
        let baseBonus = 10
        if (level <= 15) baseBonus = 20
        else if (level <= 40) baseBonus = 15

        if (preferredStance === 'power') powerWeight += baseBonus
        else if (preferredStance === 'speed') speedWeight += baseBonus
        else if (preferredStance === 'tech') techWeight += baseBonus
      }
    })
  }

  // 3. Counter-Play: Analyze opponent to predict their move and counter it
  // Only apply meaningful counter-play at higher levels (> 15)
  if (opponent?.stats && level > 15) {
    const oStats = opponent.stats
    // Predict opponent stance based on their highest stats
    const oppPowerScore = oStats.attack!
    const oppSpeedScore = oStats.speed!
    const oppTechScore = oStats.specialAttack!

    const counterBonus = 25
    // Scale counter intelligence by level?
    // For now, keep it simple: capable enemies try to counter.

    // If opponent is likely to use POWER, we should use SPEED
    if (oppPowerScore > oppSpeedScore && oppPowerScore > oppTechScore) {
      speedWeight += counterBonus
    }
    // If opponent is likely to use SPEED, we should use TECH
    else if (oppSpeedScore > oppPowerScore && oppSpeedScore > oppTechScore) {
      techWeight += counterBonus
    }
    // If opponent is likely to use TECH, we should use POWER
    else if (oppTechScore > oppPowerScore && oppTechScore > oppSpeedScore) {
      powerWeight += counterBonus
    }
  }

  // 4. Randomness / Base Weight
  // Reduced from 20 to 5 to make stats matter more at low levels
  const baseWeight = 5

  const adjustedPower = isStanceDisabled(pokemon, 'power')
    ? 0
    : Math.max(0, powerWeight + baseWeight)
  const adjustedSpeed = isStanceDisabled(pokemon, 'speed')
    ? 0
    : Math.max(0, speedWeight + baseWeight)
  const adjustedTech = isStanceDisabled(pokemon, 'tech') ? 0 : Math.max(0, techWeight + baseWeight)

  const totalWeight = adjustedPower + adjustedSpeed + adjustedTech
  if (totalWeight <= 0) return 'speed'
  const roll = random() * totalWeight

  if (roll < adjustedPower) return 'power'
  if (roll < adjustedPower + adjustedSpeed) return 'speed'
  return 'tech'
}

// Returns the most likely stance (highest weight) - used by Battle Observer
export function getMostLikelyStance(pokemon: BattlePokemon): {
  stance: BattleStance
  percentage: number
} {
  const stats = pokemon.stats!

  // Start with stat-based weights
  let powerWeight = stats.attack! + 20
  let speedWeight = stats.speed! + 20
  let techWeight = stats.specialAttack! + 20

  // Apply type preferences based on Pokemon level
  const pokemonLevel = pokemon.level || 5
  if (pokemonLevel < 100) {
    const preferredStance = pokemon.types
      .map((type) => TYPE_STANCE_PREFERENCES[type.toLowerCase()])
      .find((stance) => stance)

    if (preferredStance) {
      const levelFactor = Math.max(0, Math.min(1, (100 - pokemonLevel) / 100))
      const baseBonus = 30
      const typeBoost = Math.round(baseBonus * levelFactor)

      if (preferredStance === 'power') powerWeight += typeBoost
      else if (preferredStance === 'speed') speedWeight += typeBoost
      else if (preferredStance === 'tech') techWeight += typeBoost
    }
  }

  const totalWeight = powerWeight + speedWeight + techWeight

  const weights: { stance: BattleStance; weight: number }[] = [
    { stance: 'power', weight: isStanceDisabled(pokemon, 'power') ? 0 : powerWeight },
    { stance: 'speed', weight: isStanceDisabled(pokemon, 'speed') ? 0 : speedWeight },
    { stance: 'tech', weight: isStanceDisabled(pokemon, 'tech') ? 0 : techWeight },
  ]

  // Sort by weight descending to get the most likely
  weights.sort((a, b) => b.weight - a.weight)

  const mostLikely = weights[0]
  const percentage = Math.round((mostLikely.weight / totalWeight) * 100)

  return { stance: mostLikely.stance, percentage }
}

export function getMostLikelyStanceForPokemonForm(
  form: Pick<PokemonForm, 'id' | 'name' | 'types' | 'stats'>,
  level = POKEDEX_STANCE_REFERENCE_LEVEL,
): {
  stance: BattleStance
  percentage: number
} {
  const clampedLevel = Math.max(1, Math.min(100, Math.round(level)))
  const stats = calculateStatsFromBase(form.stats, clampedLevel, NEUTRAL_IVS, NEUTRAL_EVS)

  return getMostLikelyStance({
    id: `pokedex-reference-${form.id}`,
    user: 'pokedex',
    originalTrainer: 'pokedex',
    speciesId: Number(form.id),
    formId: form.id,
    level: clampedLevel,
    name: form.name,
    types: form.types,
    stats,
    currentHp: stats.hp,
    maxHp: stats.hp,
    updatedAt: '',
    createdAt: '',
  })
}
