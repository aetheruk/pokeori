import type { PokemonGrowthRate } from '@/data/pokemon'

export const MAX_POKEMON_LEVEL = 100
export const BASE_POKEMON_LEVEL_CAP = 20
export const POKEMON_BADGE_LEVEL_STEP = 5

export const KANTO_BADGE_IDS = [
  'badge-kanto-boulder',
  'badge-kanto-cascade',
  'badge-kanto-thunder',
  'badge-kanto-rainbow',
  'badge-kanto-soul',
  'badge-kanto-marsh',
  'badge-kanto-volcano',
  'badge-kanto-earth',
] as const

export const JOHTO_BADGE_IDS = [
  'badge-johto-zephyr',
  'badge-johto-hive',
  'badge-johto-plain',
  'badge-johto-fog',
  'badge-johto-storm',
  'badge-johto-mineral',
  'badge-johto-glacier',
  'badge-johto-rising',
] as const

export const ALL_LEVEL_CAP_BADGE_IDS = [
  ...KANTO_BADGE_IDS,
  ...JOHTO_BADGE_IDS,
] as const

/**
 * Return the cumulative experience required to reach a level in the official
 * main-series growth curve. Level one starts at zero experience in the app.
 */
export function getTotalPokemonExperienceForLevel(
  growthRate: PokemonGrowthRate | string | null | undefined,
  level: number,
): number {
  const n = Math.max(1, Math.min(MAX_POKEMON_LEVEL, Math.floor(level || 1)))
  const rate = normalizeGrowthRate(growthRate)

  let experience: number
  switch (rate) {
    case 'slow':
      experience = (5 * n ** 3) / 4
      break
    case 'fast':
      experience = (4 * n ** 3) / 5
      break
    case 'medium-slow':
      experience = (6 * n ** 3) / 5 - 15 * n ** 2 + 100 * n - 140
      break
    case 'slow-then-very-fast':
      experience = getErraticExperience(n)
      break
    case 'fast-then-very-slow':
      experience = getFluctuatingExperience(n)
      break
    default:
      experience = n ** 3
      break
  }

  return Math.max(0, Math.floor(experience))
}

/** Resolve the highest level reached by a cumulative experience total. */
export function getPokemonLevelFromExperience(
  growthRate: PokemonGrowthRate | string | null | undefined,
  experience: number,
): number {
  const totalExperience = Math.max(0, Math.floor(experience || 0))
  let level = 1

  for (let candidate = 2; candidate <= MAX_POKEMON_LEVEL; candidate += 1) {
    if (getTotalPokemonExperienceForLevel(growthRate, candidate) > totalExperience) {
      break
    }
    level = candidate
  }

  return level
}

/** Calculate the battle experience awarded for one opposing Pokémon. */
export function getPokemonBattleExperience(
  baseExperience: number | null | undefined,
  enemyLevel: number,
): number {
  const base = Number.isFinite(baseExperience) ? Math.max(0, Number(baseExperience)) : 0
  const level = Number.isFinite(enemyLevel) ? Math.max(1, Math.floor(enemyLevel)) : 1
  return Math.max(1, Math.floor((base * level) / 7))
}

/** Return the persistent level cap implied by the badges currently owned. */
export function getPokemonLevelCap(inventory: Record<string, number> | null | undefined): number {
  const badgeCount = ALL_LEVEL_CAP_BADGE_IDS.reduce(
    (count, badgeId) => count + ((inventory?.[badgeId] || 0) > 0 ? 1 : 0),
    0,
  )

  return Math.min(
    MAX_POKEMON_LEVEL,
    BASE_POKEMON_LEVEL_CAP + badgeCount * POKEMON_BADGE_LEVEL_STEP,
  )
}

/**
 * The greatest safe stored total while a badge cap is active. Experience
 * earned at the cap is held just below the next threshold so a later badge
 * does not cause an unexpected multi-level jump.
 */
export function getPokemonExperienceCap(
  growthRate: PokemonGrowthRate | string | null | undefined,
  levelCap: number,
): number {
  const cap = Math.max(1, Math.min(MAX_POKEMON_LEVEL, Math.floor(levelCap || 1)))
  if (cap >= MAX_POKEMON_LEVEL) {
    return getTotalPokemonExperienceForLevel(growthRate, MAX_POKEMON_LEVEL)
  }

  return Math.max(
    0,
    getTotalPokemonExperienceForLevel(growthRate, cap + 1) - 1,
  )
}

export function getPokemonExperienceProgress(
  growthRate: PokemonGrowthRate | string | null | undefined,
  level: number,
  experience: number,
  levelCap = MAX_POKEMON_LEVEL,
): { current: number; required: number; percent: number } {
  const currentLevel = Math.max(1, Math.min(MAX_POKEMON_LEVEL, Math.floor(level || 1)))
  const currentThreshold = getTotalPokemonExperienceForLevel(growthRate, currentLevel)
  const cappedExperience = Math.max(0, Math.floor(experience || 0))
  const nextThreshold =
    currentLevel >= levelCap
      ? getPokemonExperienceCap(growthRate, levelCap)
      : getTotalPokemonExperienceForLevel(growthRate, currentLevel + 1)
  const required = Math.max(1, nextThreshold - currentThreshold)
  const current = Math.max(0, Math.min(required, cappedExperience - currentThreshold))

  return {
    current,
    required,
    percent: Math.round((current / required) * 100),
  }
}

function normalizeGrowthRate(
  growthRate: PokemonGrowthRate | string | null | undefined,
): PokemonGrowthRate {
  switch (growthRate) {
    case 'slow':
    case 'medium':
    case 'fast':
    case 'medium-slow':
    case 'slow-then-very-fast':
    case 'fast-then-very-slow':
      return growthRate
    default:
      return 'medium-slow'
  }
}

function getErraticExperience(level: number): number {
  if (level <= 50) return (level ** 3 * (100 - level)) / 50
  if (level <= 68) return (level ** 3 * (150 - level)) / 100
  if (level <= 98) {
    return (level ** 3 * Math.floor((1911 - 10 * level) / 3)) / 500
  }
  return (level ** 3 * (160 - level)) / 100
}

function getFluctuatingExperience(level: number): number {
  if (level <= 15) {
    return (level ** 3 * (Math.floor((level + 1) / 3) + 24)) / 50
  }
  if (level <= 36) return (level ** 3 * (level + 14)) / 50
  return (level ** 3 * (Math.floor(level / 2) + 32)) / 50
}
