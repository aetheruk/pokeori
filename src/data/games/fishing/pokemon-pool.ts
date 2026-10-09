import type { FishingKeepNetRequirement } from './types'

export interface GlobalFishingPokemonReplacement {
  speciesId: number
  formId: string
  chance: number
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
]
