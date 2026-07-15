import type { FishingItemEntry, RodType } from './types'

const commonAppearTime = { min: 2000, max: 5000 }

export const FISHING_POKEMON_CHANCE = 80
export const FISHING_ITEM_CHANCE = 20

function goldenScaleEntries(reactionTime: number): FishingItemEntry[] {
  return Array.from({ length: 8 }, (_, index) => ({
    itemId: `golden-scale-${index + 1}`,
    weight: 1,
    symbol: '!!!',
    reactionTime,
    appearTime: commonAppearTime,
    secret: true,
  }))
}

export const globalFishingItemPools: Record<RodType, FishingItemEntry[]> = {
  old: [
    {
      itemId: 'water-gem',
      weight: 79,
      symbol: '!',
      reactionTime: 900,
      appearTime: commonAppearTime,
    },
    {
      itemId: 'aqua-solvent-t1',
      weight: 20,
      symbol: '!',
      reactionTime: 900,
      appearTime: commonAppearTime,
    },
    ...goldenScaleEntries(900),
  ],
  good: [
    {
      itemId: 'water-gem',
      weight: 80,
      symbol: '!',
      reactionTime: 850,
      appearTime: commonAppearTime,
    },
    {
      itemId: 'aqua-solvent-t1',
      weight: 20,
      symbol: '!',
      reactionTime: 850,
      appearTime: commonAppearTime,
    },
    ...goldenScaleEntries(850),
  ],
  super: [
    {
      itemId: 'water-gem',
      weight: 75,
      symbol: '!',
      reactionTime: 800,
      appearTime: commonAppearTime,
    },
    {
      itemId: 'aqua-solvent-t1',
      weight: 25,
      symbol: '!',
      reactionTime: 800,
      appearTime: commonAppearTime,
    },
    ...goldenScaleEntries(800),
  ],
}
