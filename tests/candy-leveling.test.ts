import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import {
  getPokemonItemEffectLabel,
  getPokemonItemUnavailableReason,
  getPokemonItemPickerGroup,
} from '@/utilities/pokemon/item-usability'

const CANDY_CONFIGS = [
  ['rare-candy-xs', 'XS', 100, 1],
  ['rare-candy-m', 'S', 800, 20],
  ['rare-candy-xl', 'M', 3000, 40],
  ['rare-candy-mega', 'L', 10000, 60],
  ['rare-candy-tera', 'XL', 30000, 80],
] as const

describe('Experience candies', () => {
  test.each(CANDY_CONFIGS)(
    '%s grants the specified XP from its minimum level upward',
    (itemId, size, xp, minLevel) => {
      for (const bag of [false, true]) {
        const item = items.find(
          (entry) => entry.id === `${itemId}${bag ? '-bag' : ''}`,
        )!
        const amount = xp * (bag ? 10 : 1)
        expect(item.name).toBe(`Exp. Candy ${size}${bag ? ' Bag' : ''}`)
        expect(item.effects).toEqual({
          grantPokemonExperience: amount,
          minLevel,
        })
        expect(getPokemonItemEffectLabel(item)).toBe(
          `XP +${amount.toLocaleString('en-US')}`,
        )
        expect(getPokemonItemPickerGroup(item)).toBe('level-candy')
        expect(
          getPokemonItemUnavailableReason(item, { level: minLevel }),
        ).toBeNull()
        expect(getPokemonItemUnavailableReason(item, { level: 99 })).toBeNull()
        if (minLevel > 1) {
          expect(
            getPokemonItemUnavailableReason(item, { level: minLevel - 1 }),
          ).toBe(`This candy can only be used from level ${minLevel}.`)
        }
        expect(getPokemonItemUnavailableReason(item, { level: 100 })).toBe(
          'Pokemon is already at max level.',
        )
      }
    },
  )

  test('friendship candies keep their friendship effects and have no level gate', () => {
    for (const color of ['red', 'purple', 'green', 'blue', 'yellow']) {
      const item = items.find((entry) => entry.id === `${color}-berry-candy`)!
      expect(item.effects?.increaseFriendship).toBe(2)
      expect(item.effects?.grantPokemonExperience).toBeUndefined()
      expect(getPokemonItemPickerGroup(item)).toBe('friendship')
      expect(
        getPokemonItemUnavailableReason(item, { level: 100, friendship: 0 }),
      ).toBeNull()
    }
  })

  test('candies settle XP and standard results atomically through the item action', () => {
    const result = Bun.spawnSync({
      cmd: ['bun', 'tests/fixtures/candy-experience.ts'],
      cwd: process.cwd(),
      stdout: 'pipe',
      stderr: 'pipe',
    })
    expect(new TextDecoder().decode(result.stderr)).toBe('')
    expect(result.exitCode).toBe(0)
  })
})
