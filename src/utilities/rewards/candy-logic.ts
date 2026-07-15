import { BattleConfig, LocationReward } from '@/data/types'

const LEVEL_TO_CANDY_MAP = [
  { maxLevel: 10, id: 'rare-candy-xs', wildDropChance: 65 },
  { maxLevel: 20, id: 'rare-candy-s', wildDropChance: 65 },
  { maxLevel: 30, id: 'rare-candy-m', wildDropChance: 45 },
  { maxLevel: 40, id: 'rare-candy-l', wildDropChance: 45 },
  { maxLevel: 50, id: 'rare-candy-xl', wildDropChance: 30 },
  { maxLevel: 60, id: 'rare-candy-xxl', wildDropChance: 30 },
  { maxLevel: 70, id: 'rare-candy-mega', wildDropChance: 25 },
  { maxLevel: 80, id: 'rare-candy-giga', wildDropChance: 25 },
  { maxLevel: 90, id: 'rare-candy-tera', wildDropChance: 15 },
  { maxLevel: 100, id: 'rare-candy-max', wildDropChance: 15 },
]

const BADGE_SUPPORT_CANDY_DROPS = [
  {
    badgeId: 'badge-kanto-cascade',
    minEnemyLevel: 15,
    candyId: 'rare-candy-m',
    dropChance: 20,
  },
  {
    badgeId: 'badge-kanto-rainbow',
    minEnemyLevel: 25,
    candyId: 'rare-candy-l',
    dropChance: 20,
  },
  {
    badgeId: 'badge-kanto-soul',
    minEnemyLevel: 30,
    candyId: 'rare-candy-xl',
    dropChance: 20,
  },
  {
    badgeId: 'badge-kanto-earth',
    minEnemyLevel: 40,
    candyId: 'rare-candy-xxl',
    dropChance: 20,
  },
]

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
  return match?.wildDropChance || 15
}

export function calculateCandyRewards(
  battleConfig: BattleConfig,
  enemyLevels: number[],
): LocationReward[] {
  if (battleConfig.disableCandyRewards) return []
  if (enemyLevels.length === 0) return []

  const maxLevel = Math.max(...enemyLevels)
  const candyId = getCandyIdForLevel(maxLevel)

  if (!battleConfig.isWildBattle) {
    return [
      {
        type: 'item',
        targetId: candyId,
        quantity: 1,
        dropChance: 100,
      },
    ]
  }

  const dropRate = getWildBattleCandyDropChance(maxLevel)
  const quantity = { min: 1, max: 1 }
  const rewards: LocationReward[] = []

  rewards.push({
    type: 'item',
    targetId: candyId,
    quantity: quantity,
    dropChance: dropRate,
  })

  for (const badgeDrop of BADGE_SUPPORT_CANDY_DROPS) {
    if (maxLevel <= badgeDrop.minEnemyLevel) continue

    rewards.push({
      type: 'item',
      targetId: badgeDrop.candyId,
      quantity,
      dropChance: badgeDrop.dropChance,
      requirements: [
        {
          type: 'item_owned',
          targetId: badgeDrop.badgeId,
          count: 1,
        },
      ],
    })
  }

  return rewards
}

export function calculateReleaseRewards(level: number): { itemId: string; quantity: number } {
  const candyId = getCandyIdForLevel(level)

  // Random quantity 1-2
  const quantity = Math.floor(Math.random() * 2) + 1

  return {
    itemId: candyId,
    quantity,
  }
}
