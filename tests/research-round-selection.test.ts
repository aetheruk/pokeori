import { describe, expect, test } from 'bun:test'
import {
  buildIdentifyOptions,
  getRandomItemFromPool,
  getRandomPokemonFromPool,
} from '@/utilities/research/round-selection'

describe('research round selection', () => {
  test('does not repeat a Pokemon when another target is available', () => {
    expect(getRandomPokemonFromPool([140, 141, 142], 140, () => 0)).toBe(141)
  })

  test('does not repeat an item when another target is available', () => {
    expect(
      getRandomItemFromPool(['old-rod', 'good-rod'], 'old-rod', () => 0),
    ).toBe('good-rod')
  })

  test('retains single-entry and empty-pool fallbacks', () => {
    expect(getRandomPokemonFromPool([140], 140, () => 0)).toBe(140)
    expect(getRandomPokemonFromPool([], 140, () => 0)).toBe(1)
    expect(getRandomItemFromPool([], 'old-rod', () => 0)).toBe('potion')
  })

  test('builds the configured number of unique identify choices', () => {
    const options = buildIdentifyOptions(
      29,
      [29, 30, 31, 32, 33, 34],
      6,
      () => 0,
    )

    expect(options).toHaveLength(6)
    expect(new Set(options).size).toBe(6)
    expect(options).toContain(29)
  })

  test('caps identify choices at the number of unique pool entries', () => {
    expect(buildIdentifyOptions('a', ['a', 'b', 'b'], 6, () => 0)).toEqual([
      'b',
      'a',
    ])
  })
})
