import type { PokemonRarityId } from '@/utilities/pokemon/rarity-effects'
import type { LocationReward } from '@/data/types'
import { FISHING_ITEM_CHANCE } from '@/data/games/fishing/item-pools'

export const FISHING_KEEP_NET_CAPACITY = 10
export const FISHING_KEEP_NET_EXPLORER_XP_PER_FORM = 0.4

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

export function getFishingExplorerXpMultiplier(keepNetCount: number): number {
  const matchingForms = Math.max(
    0,
    Math.min(FISHING_KEEP_NET_CAPACITY, keepNetCount),
  )
  return 1 + matchingForms * FISHING_KEEP_NET_EXPLORER_XP_PER_FORM
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

export function applyFishingExplorerXpMultiplier(
  rewards: LocationReward[],
  multiplier: number,
): LocationReward[] {
  const safeMultiplier = Math.max(1, Math.min(5, multiplier))
  if (safeMultiplier === 1) return rewards

  return rewards.map((reward) => {
    if (reward.type !== 'xp' || reward.skill !== 'catching') return reward
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
  })
}

export function buildFishingKeepNetCaptureRewards(
  entries: FishingKeepNetEntry[],
  capturedFormId?: string,
): LocationReward[] {
  const rewards: LocationReward[] = []
  const matchingFormCount = capturedFormId
    ? getSameFormKeepNetCount(entries, capturedFormId)
    : 0
  const crystalMultiplier = getFishingExplorerXpMultiplier(matchingFormCount)

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
      const quantity =
        entry.currencyId === 'crystals'
          ? Math.floor(entry.quantity * crystalMultiplier)
          : entry.quantity
      rewards.push({
        type: 'currency',
        targetId: entry.currencyId,
        quantity,
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
