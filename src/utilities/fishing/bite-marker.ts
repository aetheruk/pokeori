import type { FishingItemEntry, FishingPokemonEntry } from '@/data/games/fishing/types'
import type { PokemonRarityId } from '@/utilities/pokemon/rarity-effects'

/** Shared for every rod and location; authored symbol overrides are ignored. */
export function getFishingBiteMarker(result: {
  type: 'pokemon' | 'item'
  entry: FishingItemEntry | FishingPokemonEntry
  isAlpha?: boolean
  isShiny?: boolean
  rarity?: PokemonRarityId
}): string {
  if (result.type === 'item') {
    return (result.entry as FishingItemEntry).dropTable === 'rare' ? '!!!' : '!!'
  }
  if (result.isAlpha) return 'alpha'
  if (result.isShiny || (result.rarity && result.rarity !== 'normal')) return 'variant'
  return (result.entry as FishingPokemonEntry).fromKeepNet ? '?!' : '!'
}
