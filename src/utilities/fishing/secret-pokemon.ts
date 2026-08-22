import type { FishingPokemonEntry, RodType } from '@/data/games/fishing/types'

const FEEBAS_REPLACEMENT_CHANCE = 1 / 256
const RELICANTH_REPLACEMENT_CHANCE = 1 / 512

export interface FishingSecretPokemonPreview {
  speciesId: number
  formId: string
  chanceLabel: string
}

export const FISHING_SECRET_POKEMON: FishingSecretPokemonPreview[] = [
  { speciesId: 349, formId: '349', chanceLabel: '1 in 256 hook replacement' },
  { speciesId: 369, formId: '369', chanceLabel: '1 in 512 hook replacement' },
]

const RELICANTH = {
  speciesId: 369,
  formId: '369',
}

const FEEBAS = {
  speciesId: 349,
  formId: '349',
}

export function applySecretFishingPokemonReplacement(params: {
  rodType: RodType
  entry: FishingPokemonEntry
  random?: () => number
}): FishingPokemonEntry {
  const random = params.random ?? Math.random

  // Relicanth's rarer 1:512 roll takes priority over Feebas.
  if (random() < RELICANTH_REPLACEMENT_CHANCE) {
    return {
      ...params.entry,
      ...RELICANTH,
    }
  }

  // Feebas can replace any rod hook at 1:256.
  if (random() < FEEBAS_REPLACEMENT_CHANCE) {
    return {
      ...params.entry,
      ...FEEBAS,
    }
  }

  return params.entry
}
