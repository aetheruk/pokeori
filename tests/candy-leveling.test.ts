import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import { shouldCandyIncreaseLevel } from '@/utilities/pokemon/candy-leveling'
import { getPokemonItemEffectLabel } from '@/utilities/pokemon/item-usability'

const CANDY_CHANCES: Array<[string, number | undefined]> = [
  ['rare-candy-xs', undefined],
  ['rare-candy-s', undefined],
  ['rare-candy-m', undefined],
  ['rare-candy-l', undefined],
  ['rare-candy-xl', 90],
  ['rare-candy-xxl', 80],
  ['rare-candy-mega', 70],
  ['rare-candy-giga', 60],
  ['rare-candy-tera', 50],
  ['rare-candy-max', 25],
]

describe('Candy level-up chances', () => {
  test('authors the chance curve only for candy levels 41 through 100', () => {
    expect(
      CANDY_CHANCES.map(([itemId, chance]) => [
        itemId,
        items.find((item) => item.id === itemId)?.effects?.increaseLevelChance,
      ]),
    ).toEqual(CANDY_CHANCES)
    expect(getPokemonItemEffectLabel(items.find((item) => item.id === 'rare-candy-xl')!)).toBe(
      'Level +1 (90% chance)',
    )
    expect(getPokemonItemEffectLabel(items.find((item) => item.id === 'rare-candy-xl-bag')!)).toBe(
      'Level → 50 (90% chance)',
    )
  })

  test('uses the authored percentage for level increases and cap-setting bags', () => {
    expect(shouldCandyIncreaseLevel(undefined, () => 0.999)).toBe(true)
    expect(shouldCandyIncreaseLevel(90, () => 0.899)).toBe(true)
    expect(shouldCandyIncreaseLevel(90, () => 0.9)).toBe(false)
    expect(shouldCandyIncreaseLevel(25, () => 0.249)).toBe(true)
    expect(shouldCandyIncreaseLevel(25, () => 0.25)).toBe(false)
    expect(shouldCandyIncreaseLevel(100, () => 0.999)).toBe(true)
    expect(shouldCandyIncreaseLevel(0, () => 0)).toBe(false)
  })
})
