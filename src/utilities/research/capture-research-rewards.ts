import type { LocationReward } from '@/data/types'

export const CATCH_RESEARCH_XP_REWARD = 3
export const CATCH_COMPANION_RESEARCH_XP_REWARD = 2
export const CATCH_CRYSTAL_RESEARCH_BONUS = 15
export const CATCH_CRYSTAL_RESEARCH_BONUS_LEVEL = 3
export const CATCH_ESCAPE_ROPE_DROP_CHANCE = 8
export const CATCH_REPEL_DROP_CHANCE = 5
export const CATCH_REPEL_UNLOCK_LEVEL = 20

export function getCaptureCrystalRewardAmount(
  caughtPokemonLevel: number,
  researchLevel: number,
): number {
  const baseAmount = Math.max(1, Math.floor(caughtPokemonLevel))
  return researchLevel >= CATCH_CRYSTAL_RESEARCH_BONUS_LEVEL
    ? baseAmount + CATCH_CRYSTAL_RESEARCH_BONUS
    : baseAmount
}

export function buildCaptureCrystalReward(
  caughtPokemonLevel: number,
  researchLevel: number,
): LocationReward {
  return {
    type: 'currency',
    targetId: 'crystals',
    quantity: getCaptureCrystalRewardAmount(caughtPokemonLevel, researchLevel),
    dropChance: 100,
  }
}

export function buildCaptureResearchXpRewards(
  caughtFormId: string | number | null | undefined,
  companionFormId?: string | number | null,
): LocationReward[] {
  const rewards: LocationReward[] = []

  if (caughtFormId) {
    rewards.push({
      type: 'pokemon_research_xp',
      targetId: caughtFormId,
      quantity: CATCH_RESEARCH_XP_REWARD,
      dropChance: 100,
    })
  }

  if (companionFormId) {
    rewards.push({
      type: 'pokemon_research_xp',
      targetId: companionFormId,
      quantity: CATCH_COMPANION_RESEARCH_XP_REWARD,
      dropChance: 100,
      isCompanion: true,
    })
  }

  return rewards
}

export function buildCaptureEscapeRopeReward(): LocationReward {
  return {
    type: 'item',
    targetId: 'escape-rope',
    quantity: 1,
    dropChance: CATCH_ESCAPE_ROPE_DROP_CHANCE,
  }
}

export function buildCaptureRepelRewards(
  explorerLevel: number,
): LocationReward[] {
  if (explorerLevel < CATCH_REPEL_UNLOCK_LEVEL) return []

  return [
    {
      type: 'item',
      targetId: 'repel',
      quantity: 1,
      dropChance: CATCH_REPEL_DROP_CHANCE,
    },
  ]
}
