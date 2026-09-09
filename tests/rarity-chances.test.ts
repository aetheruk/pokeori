import { describe, expect, test } from 'bun:test'
import {
  combinedShinyChance,
  RANDOM_POKEMON_RARITIES,
  rarityChancesSchema,
  rarityProbabilities,
  resolveGeneratedPokemonRarity,
  resolveRarityChances,
  rollPokemonRarity,
} from '@/utilities/pokemon/rarity-chances'

describe('shared rarity thresholds', () => {
  test('lowest qualifying threshold wins and normal is the remainder', () => {
    const chances = { shadow: 0.1, silver: 0.01, shiny: 1 / 512 }
    expect(rollPokemonRarity(chances, () => 0.1)).toBe('normal')
    expect(rollPokemonRarity(chances, () => 0.05)).toBe('shadow')
    expect(rollPokemonRarity(chances, () => 0.005)).toBe('silver')
    expect(rollPokemonRarity(chances, () => 0)).toBe('shiny')
    expect(rarityProbabilities(chances).silver).toBeCloseTo(0.01 - 1 / 512)
  })
  test('ties share their interval uniformly', () => {
    const chances = { shadow: 0.1, silver: 0.1 }
    const rolls = [0.02, 0.99]
    expect(rollPokemonRarity(chances, () => rolls.shift()!)).toBe('silver')
    expect(rarityProbabilities(chances).shadow).toBeCloseTo(0.05)
  })
  test('all registered special rarities work without maintaining a second list', () => {
    for (const rarity of RANDOM_POKEMON_RARITIES)
      expect(rollPokemonRarity({ [rarity]: 1 }, () => 0.5)).toBe(rarity)
    expect(rollPokemonRarity({ shiny: 0 }, () => 0)).toBe('normal')
  })
  test('inheritance, explicit zero, trainer defaults and fixed rarities', () => {
    expect(resolveRarityChances().shiny).toBe(1 / 512)
    expect(resolveRarityChances(undefined, undefined, false).shiny).toBe(0)
    expect(resolveRarityChances({ shadow: 0.1 }, { shadow: 0 }).shadow).toBe(0)
    expect(
      resolveGeneratedPokemonRarity({ rarity: 'normal' }, { shiny: 1 }),
    ).toBe('normal')
    expect(resolveGeneratedPokemonRarity({ shiny: false }, { shiny: 1 })).toBe(
      'shiny',
    )
  })
  test('extra shiny opportunities become an equivalent threshold', () => {
    expect(combinedShinyChance(0.1, 2, 0.2)).toBeCloseTo(1 - 0.9 ** 2 * 0.8)
  })
  test('invalid thresholds and unknown rarities are rejected', () => {
    for (const input of [
      { shiny: -1 },
      { shiny: 2 },
      { shiny: Number.NaN },
      { normal: 1 },
      { fake: 0.1 },
    ])
      expect(rarityChancesSchema.safeParse(input).success).toBe(false)
  })
})
