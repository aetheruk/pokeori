import type { BattleAiProfileId } from '@/data/types'

export const VS_SEEKER_DIFFICULTY_SETTINGS = {
  1: {
    label: 'Casual',
    ivTarget: 8,
    evBudget: 128,
    baseStatExponent: 0.35,
    payoutMultiplier: 1,
    aiProfile: 'trainer',
  },
  2: {
    label: 'Skilled',
    ivTarget: 14,
    evBudget: 192,
    baseStatExponent: 0.5,
    payoutMultiplier: 1.5,
    aiProfile: 'trainer',
  },
  3: {
    label: 'Tough',
    ivTarget: 20,
    evBudget: 252,
    baseStatExponent: 0.65,
    payoutMultiplier: 2,
    aiProfile: 'trainer',
  },
  4: {
    label: 'Expert',
    ivTarget: 26,
    evBudget: 384,
    baseStatExponent: 0.8,
    payoutMultiplier: 2.5,
    aiProfile: 'advanced',
  },
  5: {
    label: 'Master',
    ivTarget: 31,
    evBudget: 510,
    baseStatExponent: 0.95,
    payoutMultiplier: 3,
    aiProfile: 'advanced',
  },
} as const satisfies Record<1 | 2 | 3 | 4 | 5, {
  label: string
  ivTarget: number
  evBudget: number
  baseStatExponent: number
  payoutMultiplier: number
  aiProfile: BattleAiProfileId
}>

export type VsSeekerDifficulty = keyof typeof VS_SEEKER_DIFFICULTY_SETTINGS

export function normalizeVsSeekerDifficulty(
  difficulty: number | undefined,
): VsSeekerDifficulty {
  const normalized = Math.min(
    5,
    Math.max(1, Math.floor(Number.isFinite(difficulty) ? difficulty ?? 1 : 1)),
  )

  return normalized as VsSeekerDifficulty
}

export function getVsSeekerDifficultySettings(
  difficulty: number | undefined = 1,
) {
  return VS_SEEKER_DIFFICULTY_SETTINGS[
    normalizeVsSeekerDifficulty(difficulty)
  ]
}
