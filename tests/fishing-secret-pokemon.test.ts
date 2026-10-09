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

const drakeScaleKeepNet = [
  {
    id: 'drake-scale',
    type: 'item' as const,
    itemId: 'drake-scale-t1',
    quantity: 1,
  },
]

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
          keepNet: drakeScaleKeepNet,
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

  test('Feebas requires a Drake Scale and then uses a 1 in 32 roll', () => {
    for (const rodType of rodTypes) {
      let calls = 0
      expect(
        applySecretFishingPokemonReplacement({
          rodType,
          entry: baseEntry,
          random: () => (calls++ === 0 ? 1 : 0),
        }),
      ).toBe(baseEntry)
      expect(calls).toBe(1)

      expect(
        applySecretFishingPokemonReplacement({
          rodType,
          entry: baseEntry,
          keepNet: drakeScaleKeepNet,
          random: () => 1 / 64,
        }).speciesId,
      ).toBe(349)

      expect(
        applySecretFishingPokemonReplacement({
          rodType,
          entry: baseEntry,
          keepNet: drakeScaleKeepNet,
          random: () => 1 / 32,
        }).speciesId,
      ).toBe(129)
    }
  })

  test('Drake Scale quantities in bundles satisfy global catch requirements', () => {
    const bundledScaleKeepNet = [
      {
        id: 'scale-bundle',
        type: 'item' as const,
        itemId: 'drake-scale-t1',
        quantity: 3,
      },
    ]

    expect(
      applySecretFishingPokemonReplacement({
        rodType: 'old',
        entry: baseEntry,
        keepNet: bundledScaleKeepNet,
        random: () => 1 / 64,
      }).speciesId,
    ).toBe(349)
  })

  test('five repeatable Golden Scales make a Gold Magikarp almost certain', () => {
    const goldenScales = [
      {
        id: 'golden-scales',
        type: 'item' as const,
        itemId: 'golden-scale',
        quantity: 5,
      },
    ]

    expect(
      applySecretFishingPokemonReplacement({
        rodType: 'old',
        entry: baseEntry,
        keepNet: goldenScales,
        random: (() => {
          let rolls = 0
          return () => (rolls++ === 0 ? 1 : 0)
        })(),
      }),
    ).toMatchObject({ speciesId: 129, formId: '129', rarity: 'gold' })

    expect(
      applySecretFishingPokemonReplacement({
        rodType: 'old',
        entry: baseEntry,
        keepNet: goldenScales,
        random: () => 1,
      }),
    ).toBe(baseEntry)

    expect(
      applySecretFishingPokemonReplacement({
        rodType: 'old',
        entry: baseEntry,
        keepNet: [{ ...goldenScales[0], quantity: 4 }],
        random: () => 1,
      }),
    ).toBe(baseEntry)
  })
})
