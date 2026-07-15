import { describe, expect, test } from 'bun:test'
import type { FishingPokemonEntry } from '@/data/games/fishing/types'
import { applySecretFishingPokemonReplacement } from '@/utilities/fishing/secret-pokemon'

const baseEntry: FishingPokemonEntry = {
  speciesId: 129,
  formId: '129',
  weight: 100,
  symbol: 'fish',
  reactionTime: 1500,
  appearTime: { min: 500, max: 1500 },
}

describe('secret fishing Pokemon replacements', () => {
  test('old rod can secretly replace a Pokemon result with Relicanth', () => {
    expect(
      applySecretFishingPokemonReplacement({
        rodType: 'old',
        entry: baseEntry,
        random: () => 0,
      }),
    ).toEqual({
      ...baseEntry,
      speciesId: 369,
      formId: '369',
    })
  })

  test('good rod can secretly replace a Pokemon result with Feebas', () => {
    expect(
      applySecretFishingPokemonReplacement({
        rodType: 'good',
        entry: baseEntry,
        random: () => 0,
      }),
    ).toEqual({
      ...baseEntry,
      speciesId: 349,
      formId: '349',
    })
  })

  test('secret replacements do not affect super rod or failed rolls', () => {
    expect(
      applySecretFishingPokemonReplacement({
        rodType: 'super',
        entry: baseEntry,
        random: () => 0,
      }),
    ).toBe(baseEntry)

    expect(
      applySecretFishingPokemonReplacement({
        rodType: 'old',
        entry: baseEntry,
        random: () => 1 / 512,
      }),
    ).toBe(baseEntry)
  })
})
