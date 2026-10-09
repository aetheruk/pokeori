import { globalFishingPokemonPool } from '@/data/games/fishing/pokemon-pool'
import type { FishingPokemonEntry, RodType } from '@/data/games/fishing/types'
import type { FishingKeepNetEntry } from './keep-net'
import { meetsFishingKeepNetRequirements } from './keep-net-requirements'

export function applySecretFishingPokemonReplacement(params: {
  rodType: RodType
  entry: FishingPokemonEntry
  keepNet?: readonly FishingKeepNetEntry[]
  random?: () => number
}): FishingPokemonEntry {
  const random = params.random ?? Math.random
  const keepNet = params.keepNet ?? []

  // Preserve the authored rarest-first ordering for global replacement catches.
  for (const replacement of globalFishingPokemonPool) {
    if (
      !meetsFishingKeepNetRequirements(
        replacement.keepNetRequirements,
        keepNet,
      )
    ) {
      continue
    }

    if (random() < replacement.chance) {
      return {
        ...params.entry,
        speciesId: replacement.speciesId,
        formId: replacement.formId,
        ...(replacement.rarity ? { rarity: replacement.rarity } : {}),
      }
    }
  }

  return params.entry
}
