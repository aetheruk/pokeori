import { describe, expect, test } from 'bun:test'
import { globalFishingItemPools } from '@/data/games/fishing/item-pools'
import type { FishingItemEntry } from '@/data/games/fishing/types'
import { getAvailableFishingItemEntries } from '@/utilities/fishing/item-pool'

describe('fishing item pools', () => {
  test('does not offer owned unique Golden Scales again', () => {
    const owned = Object.fromEntries(
      Array.from({ length: 8 }, (_, index) => [
        `golden-scale-${index + 1}`,
        1,
      ]),
    )

    const available = getAvailableFishingItemEntries(
      globalFishingItemPools.old,
      owned,
    )

    expect(available.filter((entry) => entry.itemId).map((entry) => entry.itemId)).toEqual([
      'water-gem',
      'aqua-solvent-t1',
    ])
    expect(available.some((entry) => entry.currencyId === 'pokedollars')).toBe(true)
    expect(available.some((entry) => entry.currencyId === 'crystals')).toBe(true)
  })

  test('keeps unowned unique items and repeatable items available', () => {
    const entries: FishingItemEntry[] = [
      {
        itemId: 'golden-scale-1',
        weight: 1,
        symbol: '!!!',
        reactionTime: 900,
        appearTime: { min: 1, max: 1 },
      },
      {
        itemId: 'water-gem',
        weight: 1,
        symbol: '!',
        reactionTime: 900,
        appearTime: { min: 1, max: 1 },
      },
    ]

    expect(
      getAvailableFishingItemEntries(entries, {
        'golden-scale-1': 1,
      }).map((entry) => entry.itemId),
    ).toEqual(['water-gem'])

    expect(
      getAvailableFishingItemEntries(entries, {}).map((entry) => entry.itemId),
    ).toEqual(['golden-scale-1', 'water-gem'])
  })

  test('does not roll unique items already reserved in the keep net', () => {
    const entries: FishingItemEntry[] = [
      {
        itemId: 'golden-scale-1',
        weight: 1,
        symbol: '!!!',
        reactionTime: 900,
        appearTime: { min: 1, max: 1 },
      },
      {
        itemId: 'water-gem',
        weight: 1,
        symbol: '!',
        reactionTime: 900,
        appearTime: { min: 1, max: 1 },
      },
    ]

    expect(
      getAvailableFishingItemEntries(entries, {}, new Set(['golden-scale-1'])).map(
        (entry) => entry.itemId,
      ),
    ).toEqual(['water-gem'])
  })

  test('global pools include multi-quantity PokeDollars and Crystal catches', () => {
    for (const pool of Object.values(globalFishingItemPools)) {
      for (const currencyId of ['pokedollars', 'crystals']) {
        const quantities = pool
          .filter((entry) => entry.currencyId === currencyId)
          .map((entry) => entry.quantity)
        expect(new Set(quantities).size).toBeGreaterThan(1)
        expect(quantities.every((quantity) => (quantity || 0) > 0)).toBe(true)
      }
    }
  })

  test('adding currencies preserves the existing Golden Scale pool odds', () => {
    const expected = { old: 8 / 107, good: 8 / 108, super: 8 / 108 }
    for (const [rod, pool] of Object.entries(globalFishingItemPools)) {
      const totalWeight = pool.reduce((total, entry) => total + entry.weight, 0)
      const goldenScaleWeight = pool
        .filter((entry) => entry.itemId?.startsWith('golden-scale-'))
        .reduce((total, entry) => total + entry.weight, 0)
      expect(goldenScaleWeight / totalWeight).toBeCloseTo(
        expected[rod as keyof typeof expected],
      )
    }
  })
})
