import type { PokemonRarityId } from '@/utilities/pokemon/rarity-effects'
import type { LocationReward } from '@/data/types'
import { FISHING_ITEM_CHANCE } from '@/data/games/fishing/item-pools'

export const FISHING_KEEP_NET_CAPACITY = 10
export const FISHING_KEEP_NET_CRYSTAL_MULTIPLIER_PER_FORM = 0.4

export type FishingKeepNetEntry =
  | {
      id: string
      type: 'pokemon'
      speciesId: number
      formId: string
      isShiny: boolean
      isAlpha: boolean
      rarity?: PokemonRarityId
    }
  | {
      id: string
      type: 'item'
      itemId?: string
      currencyId?: string
      guildId?: string
      quantity: number
    }

export function getFishingCatchCrystalMultiplier(keepNetCount: number): number {
  const matchingForms = Math.max(
    0,
    Math.min(FISHING_KEEP_NET_CAPACITY, keepNetCount),
  )
  return 1 + matchingForms * FISHING_KEEP_NET_CRYSTAL_MULTIPLIER_PER_FORM
}

export function getFishingExplorerXpBonus(
  pokemonLevel: number,
  explorerLevel: number,
  keepNet: FishingKeepNetEntry[],
): number {
  const safePokemonLevel = Math.max(1, Math.min(100, Math.floor(pokemonLevel)))
  const safeExplorerLevel = Math.max(1, Math.min(100, Math.floor(explorerLevel)))
  const pokemonCount = Math.min(
    FISHING_KEEP_NET_CAPACITY,
    keepNet.filter((entry) => entry.type === 'pokemon').length,
  )

  return Math.floor(safePokemonLevel + 1.1 * safeExplorerLevel * pokemonCount)
}

export function applyFishingCatchCrystalMultiplier(
  reward: LocationReward,
  multiplier: number,
): LocationReward {
  if (reward.type !== 'currency' || reward.targetId !== 'crystals') {
    return reward
  }

  const safeMultiplier = Math.max(1, Math.min(5, multiplier))
  const quantity = reward.quantity ?? 1
  return {
    ...reward,
    quantity:
      typeof quantity === 'number'
        ? Math.floor(quantity * safeMultiplier)
        : {
            min: Math.floor(quantity.min * safeMultiplier),
            max: Math.floor(quantity.max * safeMultiplier),
          },
  }
}

export function getFishingItemChance(keepNetCount: number): number {
  const count = Math.max(0, Math.min(FISHING_KEEP_NET_CAPACITY, keepNetCount))
  return FISHING_ITEM_CHANCE + count
}

function getFormCount(count: number): number {
  return Math.max(0, Math.min(FISHING_KEEP_NET_CAPACITY, count))
}

export function getFishingAlphaChanceMultiplier(sameFormCount: number): number {
  return 1 + getFormCount(sameFormCount) / 100
}

export function getFishingShinyChanceMultiplier(sameFormCount: number): number {
  return 1 + getFormCount(sameFormCount) / 100
}

export function getSameFormKeepNetCount(
  keepNet: FishingKeepNetEntry[],
  formId: string,
): number {
  return keepNet.filter(
    (entry) => entry.type === 'pokemon' && entry.formId === formId,
  ).length
}

export function buildFishingKeepNetCaptureRewards(
  entries: FishingKeepNetEntry[],
): LocationReward[] {
  const rewards: LocationReward[] = []

  for (const entry of entries) {
    if (entry.type === 'pokemon') {
      rewards.push({
        type: 'pokemon_research_xp',
        targetId: entry.formId,
        quantity: 1,
        dropChance: 100,
      })
      continue
    }

    if (entry.guildId) {
      rewards.push({
        type: 'guild_xp',
        targetId: entry.guildId,
        quantity: entry.quantity,
        dropChance: 100,
      })
      continue
    }
    if (entry.currencyId) {
      rewards.push({
        type: 'currency',
        targetId: entry.currencyId,
        quantity: entry.quantity,
        dropChance: 100,
      })
      continue
    }
    if (entry.itemId) {
      rewards.push({
        type: 'item',
        targetId: entry.itemId,
        quantity: entry.quantity,
        dropChance: 100,
      })
    }
  }
  return rewards
}
