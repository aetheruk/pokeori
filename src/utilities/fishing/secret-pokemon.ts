import type { FishingPokemonEntry, RodType } from '@/data/games/fishing/types'

const SECRET_FISHING_REPLACEMENT_CHANCE = 1 / 512

const OLD_ROD_RELICANTH = {
  speciesId: 369,
  formId: '369',
}

const GOOD_ROD_FEEBAS = {
  speciesId: 349,
  formId: '349',
}

export function applySecretFishingPokemonReplacement(params: {
  rodType: RodType
  entry: FishingPokemonEntry
  random?: () => number
}): FishingPokemonEntry {
  const random = params.random ?? Math.random
  if (random() >= SECRET_FISHING_REPLACEMENT_CHANCE) return params.entry

  if (params.rodType === 'old') {
    return {
      ...params.entry,
      ...OLD_ROD_RELICANTH,
    }
  }

  if (params.rodType === 'good') {
    return {
      ...params.entry,
      ...GOOD_ROD_FEEBAS,
    }
  }

  return params.entry
}
