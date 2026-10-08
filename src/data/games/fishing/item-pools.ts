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

function currencyEntries(reactionTime: number): FishingItemEntry[] {
  const currencies: Array<{
    currencyId: string
    quantity: number
    weight: number
    symbol: string
  }> = [
    { currencyId: 'pokedollars', quantity: 100, weight: 12, symbol: '$' },
    { currencyId: 'pokedollars', quantity: 250, weight: 4, symbol: '$$' },
    { currencyId: 'pokedollars', quantity: 500, weight: 1, symbol: '$$$' },
    { currencyId: 'crystals', quantity: 5, weight: 5, symbol: '✧' },
    { currencyId: 'crystals', quantity: 15, weight: 2, symbol: '✧✧' },
    { currencyId: 'crystals', quantity: 50, weight: 1, symbol: '✧✧✧' },
  ]

  return currencies.map((entry) => ({
    ...entry,
    reactionTime,
    appearTime: commonAppearTime,
  }))
}

export const globalFishingItemPools: Record<RodType, FishingItemEntry[]> = {
  old: [
    {
      itemId: 'water-gem',
      weight: 54,
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
    ...currencyEntries(900),
    ...goldenScaleEntries(900),
  ],
  good: [
    {
      itemId: 'water-gem',
      weight: 55,
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
    ...currencyEntries(850),
    ...goldenScaleEntries(850),
  ],
  super: [
    {
      itemId: 'water-gem',
      weight: 50,
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
    ...currencyEntries(800),
    ...goldenScaleEntries(800),
  ],
}
