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
  const rodTypes = ['old', 'good', 'super'] as const

  test('any rod can secretly replace a Pokemon result with Relicanth', () => {
    for (const rodType of rodTypes) {
      expect(
        applySecretFishingPokemonReplacement({
          rodType,
          entry: baseEntry,
          random: () => 1 / 1024,
        }),
      ).toEqual({
        ...baseEntry,
        speciesId: 369,
        formId: '369',
      })
    }
  })

  test('any rod can secretly replace a Pokemon result with Feebas', () => {
    for (const rodType of rodTypes) {
      let calls = 0
      expect(
        applySecretFishingPokemonReplacement({
          rodType,
          entry: baseEntry,
          random: () => (calls++ === 0 ? 1 / 512 : 1 / 512),
        }),
      ).toEqual({
        ...baseEntry,
        speciesId: 349,
        formId: '349',
      })
    }
  })

  test('Relicanth wins over Feebas when both rolls would succeed', () => {
    for (const rodType of rodTypes) {
      expect(
        applySecretFishingPokemonReplacement({
          rodType,
          entry: baseEntry,
          random: () => 1 / 2048,
        }),
      ).toEqual({
        ...baseEntry,
        speciesId: 369,
        formId: '369',
      })
    }
  })

  test('failed rolls keep the original Pokemon', () => {
    for (const rodType of rodTypes) {
      expect(
        applySecretFishingPokemonReplacement({
          rodType,
          entry: baseEntry,
          random: () => 1 / 128,
        }),
      ).toBe(baseEntry)

      expect(
        applySecretFishingPokemonReplacement({
          rodType,
          entry: baseEntry,
          random: () => 1,
        }),
      ).toBe(baseEntry)
    }
  })

  test('Feebas uses the new 1 in 128 replacement chance', () => {
    for (const rodType of rodTypes) {
      expect(
        applySecretFishingPokemonReplacement({
          rodType,
          entry: baseEntry,
          random: () => 1 / 256,
        }).speciesId,
      ).toBe(349)

      expect(
        applySecretFishingPokemonReplacement({
          rodType,
          entry: baseEntry,
          random: () => 1 / 128,
        }).speciesId,
      ).toBe(129)
    }
  })
})
