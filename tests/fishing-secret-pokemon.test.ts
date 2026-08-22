import { describe, expect, test } from 'bun:test'
import type { FishingPokemonEntry } from '@/data/games/fishing/types'
import {
  applySecretFishingPokemonReplacement,
  FISHING_SECRET_POKEMON,
} from '@/utilities/fishing/secret-pokemon'

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

  test('preview metadata exposes both global rare catches and their shiny possibility', () => {
    expect(FISHING_SECRET_POKEMON).toEqual([
      { speciesId: 349, formId: '349', chanceLabel: '1 in 256 hook replacement' },
      { speciesId: 369, formId: '369', chanceLabel: '1 in 512 hook replacement' },
    ])
  })

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
          random: () => 1 / 256,
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
})
