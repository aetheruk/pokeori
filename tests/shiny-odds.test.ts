import { describe, expect, test } from 'bun:test'
import {
  BASE_SHINY_CHANCE,
  getShinyChance,
  rollShiny,
} from '@/utilities/pokemon/shiny-odds'

describe('shiny odds', () => {
  test('uses a global 1:512 base chance', () => {
    expect(BASE_SHINY_CHANCE).toBe(1 / 512)
  })

  test('combines source, Researcher, and ability modifiers with an upper bound', () => {
    expect(
      getShinyChance({ sourceModifier: 2, researcherModifier: 1.5, abilityModifier: 3 }),
    ).toBe(9 / 512)
    expect(getShinyChance({ sourceModifier: 1000 })).toBe(1)
  })

  test('supports the Research Level 5 extra roll deterministically', () => {
    let rolls = 0
    expect(
      rollShiny(0.1, 2, () => {
        rolls += 1
        return rolls === 1 ? 0.2 : 0.05
      }),
    ).toBe(true)
  })
})
