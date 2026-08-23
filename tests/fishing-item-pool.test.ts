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

    expect(available.map((entry) => entry.itemId)).toEqual([
      'water-gem',
      'aqua-solvent-t1',
    ])
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
})
