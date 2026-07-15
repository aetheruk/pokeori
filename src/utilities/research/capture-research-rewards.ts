import type { LocationReward } from '@/data/types'
import { getFieldObservationHealingBerries } from './berry-drops'

export const CATCH_RESEARCH_XP_REWARD = 3
export const CATCH_COMPANION_RESEARCH_XP_REWARD = 2
export const CATCH_CRYSTAL_RESEARCH_BONUS = 15
export const CATCH_CRYSTAL_RESEARCH_BONUS_LEVEL = 3
export const CATCH_ESCAPE_ROPE_DROP_CHANCE = 8
export const CATCH_REPEL_DROP_CHANCE = 5
export const CATCH_REPEL_UNLOCK_LEVEL = 20
export const CATCH_EXTRA_HEALING_BERRY_DROP_CHANCE = 10

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

function pickRandomItemId(
  pool: readonly string[],
  random: () => number,
): string | null {
  if (pool.length === 0) return null
  const index = Math.min(Math.floor(random() * pool.length), pool.length - 1)
  return pool[Math.max(0, index)] || null
}

export function buildCaptureHealingBerryRewards(
  researchingLevel: number,
  random: () => number = Math.random,
): LocationReward[] {
  const pool = getFieldObservationHealingBerries(researchingLevel)
  const guaranteedBerryId = pickRandomItemId(pool, random)
  if (!guaranteedBerryId) return []

  const rewards: LocationReward[] = [
    {
      type: 'item',
      targetId: guaranteedBerryId,
      quantity: 1,
      dropChance: 100,
    },
  ]

  const extraBerryId = pickRandomItemId(pool, random)
  if (extraBerryId) {
    rewards.push({
      type: 'item',
      targetId: extraBerryId,
      quantity: 1,
      dropChance: CATCH_EXTRA_HEALING_BERRY_DROP_CHANCE,
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
