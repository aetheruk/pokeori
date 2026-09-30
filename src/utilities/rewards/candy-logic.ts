import { BattleConfig, LocationReward } from '@/data/types'

const LEVEL_TO_CANDY_MAP = [
  { maxLevel: 20, id: 'rare-candy-xs', wildDropChance: 5 },
  { maxLevel: 40, id: 'rare-candy-m', wildDropChance: 4 },
  { maxLevel: 60, id: 'rare-candy-xl', wildDropChance: 3 },
  { maxLevel: 80, id: 'rare-candy-mega', wildDropChance: 2 },
  { maxLevel: 100, id: 'rare-candy-tera', wildDropChance: 1 },
]

export const WILD_BATTLE_CANDY_DUST_DROP_CHANCE = 35

const LEVEL_TO_POKE_POWDER_MAP = [
  { maxLevel: 20, id: 'poke-powder-xs' },
  { maxLevel: 40, id: 'poke-powder-s' },
  { maxLevel: 60, id: 'poke-powder-m' },
  { maxLevel: 80, id: 'poke-powder-l' },
  { maxLevel: 100, id: 'poke-powder-xl' },
]

export function getCandyIdForLevel(level: number): string {
  const match = LEVEL_TO_CANDY_MAP.find((m) => level <= m.maxLevel)
  return match?.id || 'rare-candy-tera'
}

export function getPokePowderIdForLevel(level: number): string {
  const match = LEVEL_TO_POKE_POWDER_MAP.find((m) => level <= m.maxLevel)
  return match?.id || 'poke-powder-xl'
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
  return match?.wildDropChance ?? 1
}

/**
 * Level-matched PokePowder is a small consolation drop for wild battles.
 * Every wild level tier can drop one to three units.
 */
export function getWildBattleCandyDustQuantity(_level: number): {
  min: number
  max: number
} {
  return { min: 1, max: 3 }
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
    targetId: getPokePowderIdForLevel(maxLevel),
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
