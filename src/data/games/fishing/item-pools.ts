import type { GlobalFishingItemEntry, RodType } from './types'
import { TIER_ONE_POKEMON_MATERIAL_IDS, TYPE_MATERIAL_CONFIG } from '@/utilities/artisan/material-drops'

export const FISHING_POKEMON_CHANCE = 50
export const FISHING_ITEM_CHANCE = 50
export const FISHING_RARE_ITEM_CHANCE = 1
export const NUMBERED_GOLDEN_SCALE_IDS = Array.from({ length: 8 }, (_, index) => `golden-scale-${index + 1}`)

export const FISHING_EVOLUTION_STONE_TYPES = {
  'fire-stone': 'fire',
  'water-stone': 'water',
  'thunder-stone': 'electric',
  'leaf-stone': 'grass',
  'ice-stone': 'ice',
  'sun-stone': 'grass',
  'moon-stone': 'fairy',
  'shiny-stone': 'fairy',
  'dusk-stone': 'dark',
  'dawn-stone': 'psychic',
  'oval-stone': 'normal',
} as const

function buildPools(reactionTime: number) {
  const base = { weight: 1, reactionTime, appearTime: { min: 2000, max: 5000 } }
  const common: GlobalFishingItemEntry[] = [
    ...[...TIER_ONE_POKEMON_MATERIAL_IDS, 'broken-ball-t1'].map((itemId) => ({
      ...base, itemId, symbol: '!', quantityRange: { min: 1, max: 2 },
    })),
    { ...base, currencyId: 'pokedollars', quantity: 100, symbol: '$' },
    { ...base, currencyId: 'crystals', quantity: 25, symbol: '✧' },
    ...(['poke-ball', 'great-ball', 'ultra-ball'] as const).map((itemId, index) => ({
      ...base, itemId, quantity: 1, symbol: '!!',
      keepNetRequirements: [{ itemId: 'broken-ball-t1', quantity: [2, 5, 8][index] }],
    })),
  ]
  const rare: GlobalFishingItemEntry[] = [
    ...NUMBERED_GOLDEN_SCALE_IDS.map((itemId) => ({ ...base, itemId, symbol: '!!!', secret: true })),
    { ...base, itemId: 'discarded-rubbish', symbol: '!!!' },
    { ...base, currencyId: 'pokedollars', quantity: 500, symbol: '$$$' },
    { ...base, currencyId: 'crystals', quantity: 200, symbol: '✧✧✧' },
    ...Object.entries(FISHING_EVOLUTION_STONE_TYPES).map(([itemId, type]) => ({
      ...base, itemId, symbol: '!!!',
      keepNetRequirements: [{ itemId: `${TYPE_MATERIAL_CONFIG[type].family}-t1`, slots: 5 }],
    })),
  ]
  return { common, rare }
}

const rodPools = { old: buildPools(900), good: buildPools(850), super: buildPools(800) }
export const globalFishingCommonItemPools: Record<RodType, GlobalFishingItemEntry[]> = {
  old: rodPools.old.common, good: rodPools.good.common, super: rodPools.super.common,
}
export const globalFishingRareItemPools: Record<RodType, GlobalFishingItemEntry[]> = {
  old: rodPools.old.rare, good: rodPools.good.rare, super: rodPools.super.rare,
}
/** Combined catalogue for reference validation; runtime rolls common/rare separately. */
export const globalFishingItemPools: Record<RodType, GlobalFishingItemEntry[]> = {
  old: [...rodPools.old.common, ...rodPools.old.rare],
  good: [...rodPools.good.common, ...rodPools.good.rare],
  super: [...rodPools.super.common, ...rodPools.super.rare],
}
