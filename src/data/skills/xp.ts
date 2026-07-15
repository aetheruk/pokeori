// Runescape-style XP requirements with slower early game and exponential late game
export const SLOW_EXP_TABLE = [
  0, // Level 1
  200, // Level 2
  500, // Level 3
  900, // Level 4
  1400, // Level 5
  2000, // Level 6
  2700, // Level 7
  3500, // Level 8
  4400, // Level 9
  5400, // Level 10
  6500, // Level 11
  7700, // Level 12
  9000, // Level 13
  10400, // Level 14
  11900, // Level 15
  13500, // Level 16
  15200, // Level 17
  17000, // Level 18
  18900, // Level 19
  20900, // Level 20
  23000, // Level 21
  25200, // Level 22
  27500, // Level 23
  29900, // Level 24
  32400, // Level 25
  35000, // Level 26
  37700, // Level 27
  40500, // Level 28
  43400, // Level 29
  46400, // Level 30
  50000, // Level 31
  54000, // Level 32
  58500, // Level 33
  63500, // Level 34
  69000, // Level 35
  75000, // Level 36
  81500, // Level 37
  88500, // Level 38
  96000, // Level 39
  104000, // Level 40
  112500, // Level 41
  121500, // Level 42
  131000, // Level 43
  141000, // Level 44
  151500, // Level 45
  162500, // Level 46
  174000, // Level 47
  186000, // Level 48
  198500, // Level 49
  211500, // Level 50
  225000, // Level 51
  239000, // Level 52
  253500, // Level 53
  268500, // Level 54
  284000, // Level 55
  300000, // Level 56
  316500, // Level 57
  333500, // Level 58
  351000, // Level 59
  369000, // Level 60
  387500, // Level 61
  406500, // Level 62
  426000, // Level 63
  446000, // Level 64
  466500, // Level 65
  487500, // Level 66
  509000, // Level 67
  531000, // Level 68
  553500, // Level 69
  576500, // Level 70
  625000, // Level 71
  680000, // Level 72
  742000, // Level 73
  811000, // Level 74
  887000, // Level 75
  970000, // Level 76
  1060000, // Level 77
  1160000, // Level 78
  1270000, // Level 79
  1390000, // Level 80
  1520000, // Level 81
  1660000, // Level 82
  1810000, // Level 83
  1970000, // Level 84
  2140000, // Level 85
  2320000, // Level 86
  2510000, // Level 87
  2710000, // Level 88
  2920000, // Level 89
  3140000, // Level 90
  3370000, // Level 91
  3610000, // Level 92
  3860000, // Level 93
  4120000, // Level 94
  4390000, // Level 95
  4670000, // Level 96
  4960000, // Level 97
  5260000, // Level 98
  5570000, // Level 99
  10000000, // Level 100
]

// Helper function to get total XP required for a level
export function getTotalExpForLevel(level: number): number {
  // Ensure level is within bounds (1-100)
  const safeLevel = Math.max(1, Math.min(100, level))
  return SLOW_EXP_TABLE[safeLevel - 1]
}

// Helper function to get level from total XP
export function getLevelFromExp(totalExp: number): number {
  for (let i = SLOW_EXP_TABLE.length - 1; i >= 0; i--) {
    if (totalExp >= SLOW_EXP_TABLE[i]) {
      return i + 1
    }
  }
  return 1
}

// Helper function to get XP needed for next level
export function getExpToNextLevel(currentLevel: number, currentExp: number): number {
  if (currentLevel >= 100) return 0
  const nextLevelExp = getTotalExpForLevel(currentLevel + 1)
  return nextLevelExp - currentExp
}

export type CoreSkillId = 'catching' | 'battling' | 'researching' | 'artisan'

export interface SkillXpConfig {
  skill: CoreSkillId
  level: number
}

export const SKILL_XP_MODIFIERS: Record<CoreSkillId, number> = {
  catching: 1.8,
  battling: 1,
  artisan: 1,
  researching: 1.45,
}

export function getContentSkillBaseXp(contentLevel: number): number {
  const safeLevel = Math.max(1, Math.min(100, Math.floor(contentLevel)))
  return 20 + 2 * (safeLevel - 1)
}

function calculateModifiedContentSkillXp(
  skill: CoreSkillId,
  contentLevel: number,
  outcomeModifier: number,
  extraModifier: number,
): number {
  const modifier = SKILL_XP_MODIFIERS[skill]
  return Math.max(
    1,
    Math.round(
      getContentSkillBaseXp(contentLevel) * modifier * outcomeModifier * extraModifier,
    ),
  )
}

export function calculateContentSkillXp(
  skill: CoreSkillId,
  contentLevel: number,
  outcomeModifier = 1,
): number {
  return calculateModifiedContentSkillXp(skill, contentLevel, outcomeModifier, 1)
}

const POKEMON_BASE_EXPERIENCE_XP_BASELINE = 160
const POKEMON_BASE_EXPERIENCE_XP_MAX_SWING = 0.15

export function getPokemonBaseExperienceXpModifier(
  baseExperience: number | null | undefined,
): number {
  if (
    typeof baseExperience !== 'number' ||
    !Number.isFinite(baseExperience) ||
    baseExperience <= 0
  ) {
    return 1
  }

  const normalized = baseExperience / POKEMON_BASE_EXPERIENCE_XP_BASELINE - 1
  const clamped = Math.max(-1, Math.min(1, normalized))
  return 1 + clamped * POKEMON_BASE_EXPERIENCE_XP_MAX_SWING
}

export function getAveragePokemonBaseExperienceXpModifier(
  baseExperiences: Array<number | null | undefined>,
): number {
  const modifiers = baseExperiences.map(getPokemonBaseExperienceXpModifier)
  if (modifiers.length === 0) return 1
  return modifiers.reduce((total, modifier) => total + modifier, 0) / modifiers.length
}

export function calculatePokemonContentSkillXp(
  skill: CoreSkillId,
  contentLevel: number,
  baseExperience: number | null | undefined,
  outcomeModifier = 1,
): number {
  return calculateModifiedContentSkillXp(
    skill,
    contentLevel,
    outcomeModifier,
    getPokemonBaseExperienceXpModifier(baseExperience),
  )
}

export function calculatePokemonContentSkillXpWithModifier(
  skill: CoreSkillId,
  contentLevel: number,
  pokemonBaseExperienceModifier: number,
  outcomeModifier = 1,
): number {
  const safeModifier =
    Number.isFinite(pokemonBaseExperienceModifier) && pokemonBaseExperienceModifier > 0
      ? pokemonBaseExperienceModifier
      : 1
  return calculateModifiedContentSkillXp(skill, contentLevel, outcomeModifier, safeModifier)
}

export function resolveSkillXpConfig(
  fallbackSkill: CoreSkillId,
  fallbackLevel: number,
  config?: SkillXpConfig,
): { skill: CoreSkillId; level: number } {
  return {
    skill: config?.skill || fallbackSkill,
    level: config?.level ?? fallbackLevel,
  }
}
