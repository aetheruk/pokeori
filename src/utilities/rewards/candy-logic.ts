import { BattleConfig, LocationReward } from '@/data/types'

const LEVEL_TO_CANDY_MAP = [
  { maxLevel: 10, id: 'rare-candy-xs', wildDropChance: 8 },
  { maxLevel: 20, id: 'rare-candy-s', wildDropChance: 8 },
  { maxLevel: 30, id: 'rare-candy-m', wildDropChance: 8 },
  { maxLevel: 40, id: 'rare-candy-l', wildDropChance: 8 },
  { maxLevel: 50, id: 'rare-candy-xl', wildDropChance: 8 },
  { maxLevel: 60, id: 'rare-candy-xxl', wildDropChance: 8 },
  { maxLevel: 70, id: 'rare-candy-mega', wildDropChance: 8 },
  { maxLevel: 80, id: 'rare-candy-giga', wildDropChance: 8 },
  { maxLevel: 90, id: 'rare-candy-tera', wildDropChance: 8 },
  { maxLevel: 100, id: 'rare-candy-max', wildDropChance: 8 },
]

export const WILD_BATTLE_CANDY_DUST_DROP_CHANCE = 30

export function getCandyIdForLevel(level: number): string {
  const match = LEVEL_TO_CANDY_MAP.find((m) => level <= m.maxLevel)
  return match?.id || 'rare-candy-max'
}

export function getCandyIdsUpToLevel(level: number): string[] {
  const normalizedLevel = Number.isFinite(level) ? level : 1
  const matchingIndex = LEVEL_TO_CANDY_MAP.findIndex(
    (m) => normalizedLevel <= m.maxLevel,
  )
  const maxIndex =
    matchingIndex >= 0 ? matchingIndex : LEVEL_TO_CANDY_MAP.length - 1

  return LEVEL_TO_CANDY_MAP.slice(0, maxIndex + 1).map((m) => m.id)
}

export function getWildBattleCandyDropChance(level: number): number {
  const match = LEVEL_TO_CANDY_MAP.find((m) => level <= m.maxLevel)
  return match?.wildDropChance || 8
}

/**
 * Candy Dust is a small consolation drop for wild battles. Higher level
 * encounters increase the quantity without making the drop itself common.
 */
export function getWildBattleCandyDustQuantity(level: number): {
  min: number
  max: number
} {
  const normalizedLevel = Number.isFinite(level)
    ? Math.max(1, Math.min(100, Math.floor(level)))
    : 1
  if (normalizedLevel <= 20) return { min: 1, max: 1 }
  if (normalizedLevel <= 40) return { min: 1, max: 2 }
  if (normalizedLevel <= 60) return { min: 1, max: 3 }
  if (normalizedLevel <= 80) return { min: 2, max: 3 }
  return { min: 3, max: 3 }
}

export function calculateCandyRewards(
  battleConfig: BattleConfig,
  enemyLevels: number[],
  candyMultiplier = 1,
): LocationReward[] {
  if (battleConfig.disableCandyRewards) return []
  if (enemyLevels.length === 0) return []

  const maxLevel = Math.max(...enemyLevels)
  const candyId = getCandyIdForLevel(maxLevel)

  if (!battleConfig.isWildBattle) return []

  const dropRate = getWildBattleCandyDropChance(maxLevel)
  const quantity = {
    min: Math.max(1, Math.floor(candyMultiplier)),
    max: Math.max(1, Math.floor(candyMultiplier)),
  }
  const rewards: LocationReward[] = []

  rewards.push({
    type: 'item',
    targetId: candyId,
    quantity: quantity,
    dropChance: dropRate,
  })

  rewards.push({
    type: 'item',
    targetId: 'candy-dust',
    quantity: getWildBattleCandyDustQuantity(maxLevel),
    dropChance: WILD_BATTLE_CANDY_DUST_DROP_CHANCE,
  })

  return rewards
}

export function calculateReleaseRewards(level: number): {
  itemId: string
  quantity: number
} {
  const candyId = getCandyIdForLevel(level)

  // Random quantity 1-2
  const quantity = Math.floor(Math.random() * 2) + 1

  return {
    itemId: candyId,
    quantity,
  }
}
