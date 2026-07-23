import { describe, expect, test } from 'bun:test'
import {
  DAY_CARE_EGG_MAX_OWNED,
  DAY_CARE_EGG_POOLS,
  DAY_CARE_EGG_RARITIES,
  DAY_CARE_EGG_SHINY_MULTIPLIER,
  getEggPoolCandidates,
  rollEggHatch,
} from '@/utilities/day-care/eggs'
import { POKEMON_RARITY_IDS } from '@/utilities/pokemon/rarity-effects'

describe('Day Care eggs', () => {
  const pokedex = {
    '1': { '1': { caught: true, seen: true } },
    '4': { '4': { caught: false, seen: true } },
    '144': { '144': { caught: true, seen: true } },
  } as any

  test('excludes legendary and mythical forms from caught candidates', () => {
    const caught = getEggPoolCandidates(DAY_CARE_EGG_POOLS[0], pokedex)
    expect(caught).toEqual(['1'])
  })

  test('uses the configured pool weights and resolves at hatch time', () => {
    expect(DAY_CARE_EGG_POOLS.map((pool) => pool.weight)).toEqual([74, 25, 1])
    expect(DAY_CARE_EGG_SHINY_MULTIPLIER).toBe(2)
    expect(DAY_CARE_EGG_MAX_OWNED).toBe(10)
    const result = rollEggHatch(pokedex, 1, () => 0, DAY_CARE_EGG_POOLS)
    expect(result).toMatchObject({ poolId: 'caught', formId: '1', speciesId: 1 })
  })

  test('derives egg variants from every registered Pokemon rarity', () => {
    expect(DAY_CARE_EGG_RARITIES).toEqual(POKEMON_RARITY_IDS)
  })

  test('variant eggs always hatch their configured rarity', () => {
    const result = rollEggHatch(
      pokedex,
      1,
      () => 0,
      DAY_CARE_EGG_POOLS,
      'galactic',
    )

    expect(result).toMatchObject({
      formId: '1',
      rarity: 'galactic',
      shiny: false,
    })
  })
})
