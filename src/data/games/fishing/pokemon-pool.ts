import type { FishingKeepNetRequirement } from './types'

export interface GlobalFishingPokemonReplacement {
  speciesId: number
  formId: string
  chance: number
  rarity?: import('@/utilities/pokemon/rarity-effects').PokemonRarityId
  keepNetRequirements?: FishingKeepNetRequirement[]
}

/** Secret fish that can replace any ordinary Pokemon hook on any rod. */
export const globalFishingPokemonPool: GlobalFishingPokemonReplacement[] = [
  {
    speciesId: 369,
    formId: '369',
    chance: 1 / 512,
  },
  {
    speciesId: 349,
    formId: '349',
    chance: 1 / 32,
    keepNetRequirements: [{ itemId: 'drake-scale-t1' }],
  },
  {
    speciesId: 129,
    formId: '129',
    chance: 0.99,
    rarity: 'shiny',
    keepNetRequirements: [{ itemId: 'golden-scale', quantity: 5 }],
  },
]
