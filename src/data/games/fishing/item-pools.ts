import type { GlobalFishingItemEntry, RodType } from './types'

const commonAppearTime = { min: 2000, max: 5000 }

export const FISHING_POKEMON_CHANCE = 70
export const FISHING_ITEM_CHANCE = 30

function goldenScaleEntries(reactionTime: number): GlobalFishingItemEntry[] {
  return Array.from({ length: 8 }, (_, index) => ({
    itemId: `golden-scale-${index + 1}`,
    weight: 1,
    symbol: '!!!',
    reactionTime,
    appearTime: commonAppearTime,
    secret: true,
  }))
}

function currencyEntries(reactionTime: number): GlobalFishingItemEntry[] {
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

function genericItemEntries(reactionTime: number): GlobalFishingItemEntry[] {
  const items: Array<{
    itemId: string
    weight: number
    symbol: string
    keepNetRequirements?: GlobalFishingItemEntry['keepNetRequirements']
  }> = [
    { itemId: 'broken-ball-t1', weight: 10, symbol: '!' },
    { itemId: 'poke-ball', weight: 10, symbol: '!' },
    { itemId: 'metal-scrap-t1', weight: 10, symbol: '!' },
    {
      itemId: 'great-ball',
      weight: 4,
      symbol: '!!',
      keepNetRequirements: [{ itemId: 'poke-ball', quantity: 3 }],
    },
    { itemId: 'drake-scale-t1', weight: 4, symbol: '!!' },
  ]

  return items.map((entry) => ({
    ...entry,
    reactionTime,
    appearTime: commonAppearTime,
  }))
}

export const globalFishingItemPools: Record<RodType, GlobalFishingItemEntry[]> = {
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
    ...genericItemEntries(900),
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
    ...genericItemEntries(850),
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
    ...genericItemEntries(800),
    ...goldenScaleEntries(800),
  ],
}
