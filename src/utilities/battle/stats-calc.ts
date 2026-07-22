import type {
  BattlePokemon,
  BattleStance,
  StanceResult,
  StatStages,
} from './types'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import type { Pokemon } from '@/payload-types'
import {
  applyHeldItemStatModifiers,
  getHeldItemDefinition,
} from '@/utilities/pokemon/held-items'
import { getEffectivePokemonIvs } from '@/utilities/skills/unlocks'
import { getPrimaryFormAbilityId } from '@/data/abilities'
import {
  getBattleAbilityEntryFormChange,
  getBattleAbilityStatMultiplier,
  getBattleAbilityHpThresholdFormChange,
  getBattleMaxHpOverride,
  suppressesBattleHeldItemEffectsByAbility,
} from './abilities'
import { resolvePokemonRarity } from '@/utilities/pokemon/rarity-effects'
import { refreshBattleRarityTypes } from './rarity-effects'

export const TYPE_STANCE_PREFERENCES: Record<string, BattleStance> = {
  // Physical types (prefer Power stance)
  fighting: 'power',
  // normal: 'power', // Normal type is neutral regarding stance
  ground: 'power',
  rock: 'power',
  steel: 'power',
  poison: 'power',
  bug: 'power',

  // Speed types (prefer Speed stance)
  electric: 'speed',
  flying: 'speed',
  dark: 'speed',
  ghost: 'speed',
  ice: 'speed',

  // Special types (prefer Tech stance)
  water: 'tech',
  fire: 'tech',
  grass: 'tech',
  psychic: 'tech',
  dragon: 'tech',
  fairy: 'tech',
}

// Default stat stages (no modifiers)
export const DEFAULT_STAT_STAGES: StatStages = {
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
  crit: 0,
  accuracy: 0,
  evasion: 0,
}

// Stat stage multipliers (stages -6 to +6)
const STAT_STAGE_MULTIPLIERS: Record<number, number> = {
  [-6]: 2 / 8,
  [-5]: 2 / 7,
  [-4]: 2 / 6,
  [-3]: 2 / 5,
  [-2]: 2 / 4,
  [-1]: 2 / 3,
  0: 1,
  1: 3 / 2,
  2: 4 / 2,
  3: 5 / 2,
  4: 6 / 2,
  5: 7 / 2,
  6: 8 / 2,
}

// Get the multiplier for a stat stage
export function clampStatStage(
  stage: number,
  stat: keyof StatStages = 'attack',
): number {
  const maxStage = stat === 'crit' ? 3 : 6
  const minStage = stat === 'crit' ? 0 : -6
  return Math.max(minStage, Math.min(maxStage, stage))
}

export function getStatStageMultiplier(stage: number): number {
  const clampedStage = clampStatStage(stage)
  return STAT_STAGE_MULTIPLIERS[clampedStage] || 1
}

export function getAccuracyEvasionStageMultiplier(stage: number): number {
  const clampedStage = clampStatStage(stage)
  if (clampedStage >= 0) return (3 + clampedStage) / 3
  return 3 / (3 - clampedStage)
}

// Crit chance by stage (0-3)
const CRIT_STAGE_CHANCES: Record<number, number> = {
  0: 1 / 24, // ~4.17%
  1: 1 / 8, // 12.5%
  2: 1 / 2, // 50%
  3: 1, // 100%
}

export function getCritChance(critStage: number): number {
  const clampedStage = Math.max(0, Math.min(3, critStage))
  return CRIT_STAGE_CHANCES[clampedStage] || CRIT_STAGE_CHANCES[0]
}

export function getEffectiveBattleSpeed(
  pokemon: BattlePokemon,
  currentTurn?: number,
): number {
  const speed = pokemon.stats?.speed || 0
  const speedStage = pokemon.statStages?.speed ?? DEFAULT_STAT_STAGES.speed
  return Math.floor(
    speed *
      getStatStageMultiplier(speedStage) *
      getBattleAbilityStatMultiplier({
        pokemon,
        stat: 'speed',
        currentTurn,
      }),
  )
}

// Helper for calculating stats from base stats (for transformations like Mega Evolution)
export function calculateStatsFromBase(
  baseStats: {
    hp: number
    attack: number
    defense: number
    'special-attack': number
    'special-defense': number
    speed: number
  },
  level: number,
  ivs: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  },
  evs: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  },
): {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
} {
  const calcStat = (base: number, iv: number, ev: number, isHp: boolean) => {
    if (isHp) {
      return (
        Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) +
        level +
        10
      )
    }
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100 + 5)
  }

  return {
    hp: calcStat(baseStats.hp, ivs.hp, evs.hp, true),
    attack: calcStat(baseStats.attack, ivs.attack, evs.attack, false),
    defense: calcStat(baseStats.defense, ivs.defense, evs.defense, false),
    specialAttack: calcStat(
      baseStats['special-attack'],
      ivs.specialAttack,
      evs.specialAttack,
      false,
    ),
    specialDefense: calcStat(
      baseStats['special-defense'],
      ivs.specialDefense,
      evs.specialDefense,
      false,
    ),
    speed: calcStat(baseStats.speed, ivs.speed, evs.speed, false),
  }
}

// Stat Calculation
export function calculateStats(
  pokemon: Pokemon,
  levelCap?: number,
  forceLevel?: boolean,
  trainerLevel?: number,
): {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
} {
  // If stats are already calculated and stored, use them
  // BUT ONLY IF NO LEVEL CAP IS SET. If level cap is set, we must recalculate.
  if (
    !levelCap &&
    !trainerLevel &&
    pokemon.stats?.hp &&
    pokemon.stats?.attack &&
    pokemon.stats?.defense &&
    pokemon.stats?.specialAttack &&
    pokemon.stats?.specialDefense &&
    pokemon.stats?.speed
  ) {
    return {
      hp: pokemon.stats.hp,
      attack: pokemon.stats.attack,
      defense: pokemon.stats.defense,
      specialAttack: pokemon.stats.specialAttack,
      specialDefense: pokemon.stats.specialDefense,
      speed: pokemon.stats.speed,
    }
  }

  // Otherwise calculate from base stats
  const formData = getPokemonForm(pokemon.formId)
  if (!formData) {
    // Fallback if data missing
    return {
      hp: 20,
      attack: 10,
      defense: 10,
      specialAttack: 10,
      specialDefense: 10,
      speed: 10,
    }
  }

  // Use level cap if provided and lower than current level, or just use current level
  let level = pokemon.level || 5
  if (forceLevel && levelCap) {
    level = levelCap
  } else if (levelCap && level > levelCap) {
    level = levelCap
  }

  const naturalIvs = pokemon.ivs || {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  }
  const ivs = trainerLevel
    ? getEffectivePokemonIvs(naturalIvs, trainerLevel)
    : naturalIvs
  const evs = pokemon.evs || {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  }

  const calcStat = (base: number, iv: number, ev: number, isHp: boolean) => {
    if (isHp) {
      return (
        Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) +
        level +
        10
      )
    }
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100 + 5)
  }

  const stats = {
    hp: calcStat(formData.stats.hp, ivs.hp || 0, evs.hp || 0, true),
    attack: calcStat(
      formData.stats.attack,
      ivs.attack || 0,
      evs.attack || 0,
      false,
    ),
    defense: calcStat(
      formData.stats.defense,
      ivs.defense || 0,
      evs.defense || 0,
      false,
    ),
    specialAttack: calcStat(
      formData.stats['special-attack'],
      ivs.specialAttack || 0,
      evs.specialAttack || 0,
      false,
    ),
    specialDefense: calcStat(
      formData.stats['special-defense'],
      ivs.specialDefense || 0,
      evs.specialDefense || 0,
      false,
    ),
    speed: calcStat(
      formData.stats.speed,
      ivs.speed || 0,
      evs.speed || 0,
      false,
    ),
  }

  // Shadow Pokemon: +20% Stats
  if ((pokemon as any).isShadow) {
    stats.attack = Math.floor(stats.attack * 1.2)
    stats.defense = Math.floor(stats.defense * 1.2)
    stats.specialAttack = Math.floor(stats.specialAttack * 1.2)
    stats.specialDefense = Math.floor(stats.specialDefense * 1.2)
    stats.speed = Math.floor(stats.speed * 1.2)
  }

  const rarity = resolvePokemonRarity(pokemon)
  if (rarity === 'gold' || rarity === 'silver') {
    stats.hp = Math.floor(stats.hp * 1.1)
  }
  if (rarity === 'ancient') {
    stats.defense = Math.floor(stats.defense * 1.15)
  }

  return stats
}

export function initializeBattlePokemon(
  pokemon: Pokemon,
  levelCap?: number,
  forceLevel?: boolean,
  trainerLevel?: number,
  pokemonResearchLevel?: number,
): BattlePokemon {
  if (!pokemon.ability) {
    const primaryAbilityId = getPrimaryFormAbilityId(pokemon.formId)
    if (primaryAbilityId) {
      pokemon = { ...pokemon, ability: primaryAbilityId }
    }
  }
  const heldItem = getHeldItemDefinition((pokemon as any).heldItemId)
  const stats = applyHeldItemStatModifiers(
    calculateStats(pokemon, levelCap, forceLevel, trainerLevel),
    suppressesBattleHeldItemEffectsByAbility(pokemon as BattlePokemon)
      ? undefined
      : heldItem?.id,
  )
  const maxHpOverride = getBattleMaxHpOverride(pokemon as BattlePokemon)
  if (maxHpOverride) {
    stats.hp = maxHpOverride
  }
  const formData = getPokemonForm(pokemon.formId)
  const battleIvs = trainerLevel
    ? getEffectivePokemonIvs(pokemon.ivs, trainerLevel)
    : pokemon.ivs

  // Determine effective level for display
  let level = pokemon.level || 5
  if (forceLevel && levelCap) {
    level = levelCap
  } else if (levelCap && level > levelCap) {
    level = levelCap
  }

  // Helper to safely convert ObjectId to string
  const toStringId = (value: any): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    // Check for direct ID property (Payload/Mongoose docs)
    if (value.id) return String(value.id)
    if (value._id) return String(value._id)
    // Fallback for objects that might wrap the ID
    if (typeof value === 'object') {
      // If toString returns default object tag, we failed to find ID.
      // Return empty or try to find anything looking like an ID?
      // Just returning the stringified value is better than nothing, but [object Object] is useless.
      const s = String(value)
      if (s !== '[object Object]') return s
    }
    return String(value)
  }

  // Helper to safely convert Date to ISO string
  const toISOString = (value: unknown): string => {
    if (typeof value === 'string') return value
    if (value instanceof Date) return value.toISOString()
    if (value) {
      const date = new Date(value as string | number)
      if (!Number.isNaN(date.getTime())) return date.toISOString()
    }
    return new Date().toISOString()
  }

  const initialized: BattlePokemon = {
    ...pokemon,
    // Convert ObjectId/Date fields to strings for Client Component compatibility
    originalTrainer: toStringId(pokemon.originalTrainer),
    user: toStringId(pokemon.user),
    createdAt: toISOString(pokemon.createdAt),
    updatedAt: toISOString(pokemon.updatedAt),
    level, // Override level for battle instance
    name: pokemon.name || 'Unknown',
    ivs: battleIvs,
    stats, // Ensure we use the calculated stats
    currentHp: stats.hp,
    maxHp: stats.hp,
    types: formData?.types || ['normal'],
    statStages: { ...DEFAULT_STAT_STAGES }, // Initialize with no modifiers
    teraTypeOverride: undefined,
    teraTurnsRemaining: undefined,
    teraActivatedTurn: undefined,
    zMoveReady: undefined,
    status: undefined,
    originalHeldItemId: heldItem?.id ?? null,
    heldItem: heldItem ? { id: heldItem.id, name: heldItem.name } : undefined,
    heldItemBattleOnly: undefined,
    itemCharge: pokemon.itemCharge ?? 0,
    pokemonResearchLevel,
    isShadow: (pokemon as any).isShadow,
    isRadiant: (pokemon as any).isRadiant,
  }

  const entryForm = getBattleAbilityEntryFormChange(initialized)
  applyBattleFormChange(initialized, entryForm.formId)
  const hpThresholdForm = getBattleAbilityHpThresholdFormChange(initialized)
  applyBattleFormChange(initialized, hpThresholdForm.formId)

  return initialized
}

export function applyBattleFormChange(
  pokemon: BattlePokemon,
  formId: string | undefined,
): boolean {
  if (!formId || pokemon.formId === formId) return false

  const formData = getPokemonForm(formId)
  if (!formData) return false

  pokemon.formId = formId
  pokemon.name = formData.name || pokemon.name
  pokemon.types = formData.types || pokemon.types
  refreshBattleRarityTypes(pokemon)
  const currentHp = pokemon.currentHp
  const hpRatio = pokemon.maxHp > 0 ? currentHp / pokemon.maxHp : 0
  const stats = applyHeldItemStatModifiers(
    calculateStats(pokemon as unknown as Pokemon),
    suppressesBattleHeldItemEffectsByAbility(pokemon)
      ? undefined
      : pokemon.heldItem?.id,
  )
  const maxHpOverride = getBattleMaxHpOverride(pokemon)
  if (maxHpOverride) {
    stats.hp = maxHpOverride
  }
  pokemon.stats = stats
  pokemon.maxHp = stats.hp
  pokemon.currentHp =
    currentHp <= 0
      ? 0
      : Math.max(
          1,
          Math.min(pokemon.maxHp, Math.round(hpRatio * pokemon.maxHp)),
        )
  return true
}
