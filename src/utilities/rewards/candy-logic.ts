import { BattleConfig, LocationReward } from '@/data/types'

const LEVEL_TO_CANDY_MAP = [
  { maxLevel: 20, id: 'rare-candy-xs' },
  { maxLevel: 40, id: 'rare-candy-m' },
  { maxLevel: 60, id: 'rare-candy-xl' },
  { maxLevel: 80, id: 'rare-candy-mega' },
  { maxLevel: 100, id: 'rare-candy-tera' },
]

// Eligible tiers roll independently; higher-level battles retain lower-tier drops.
const WILD_BATTLE_CANDY_DROPS = [
  { minLevel: 1, id: 'rare-candy-xs', dropChance: 15 },
  { minLevel: 20, id: 'rare-candy-m', dropChance: 9 },
  { minLevel: 40, id: 'rare-candy-xl', dropChance: 5 },
  { minLevel: 60, id: 'rare-candy-mega', dropChance: 3 },
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

  if (!battleConfig.isWildBattle) return []

  const quantity = {
    min: Math.max(1, Math.floor(candyMultiplier)),
    max: Math.max(1, Math.floor(candyMultiplier)),
  }
  const rewards: LocationReward[] = WILD_BATTLE_CANDY_DROPS
    .filter((drop) => maxLevel >= drop.minLevel)
    .map((drop) => ({
      type: 'item',
      targetId: drop.id,
      quantity: { ...quantity },
      dropChance: drop.dropChance,
    }))

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
