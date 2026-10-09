import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import { globalFishingItemPools } from '@/data/games/fishing/item-pools'
import type {
  FishingItemEntry,
  GlobalFishingItemEntry,
} from '@/data/games/fishing/types'
import {
  addPostCollectionGoldenScaleDrop,
  getAvailableFishingItemEntries,
} from '@/utilities/fishing/item-pool'

describe('fishing item pools', () => {
  test('adds Discarded Rubbish as a common item to every global rod pool', () => {
    for (const entries of Object.values(globalFishingItemPools)) {
      expect(entries).toContainEqual(
        expect.objectContaining({ itemId: 'discarded-rubbish', weight: 10 }),
      )
    }
    expect(items.find((item) => item.id === 'discarded-rubbish')).toMatchObject({
      name: 'Discarded Rubbish',
      category: 'misc',
    })
  })

  test('Pouch of Materials is a consumable that grants mixed Tier 1 materials', () => {
    expect(items.find((item) => item.id === 'pouch-of-materials')).toMatchObject({
      name: 'Pouch of Materials',
      effects: {
        grantRandomPokemonMaterials: { min: 1, max: 5 },
        grantRandomGems: { min: 1, max: 3 },
      },
    })
  })

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
      'discarded-rubbish',
      'broken-ball-t1',
      'poke-ball',
      'metal-scrap-t1',
      'drake-scale-t1',
    ])
    expect(available.some((entry) => entry.currencyId === 'pokedollars')).toBe(true)
    expect(available.some((entry) => entry.currencyId === 'crystals')).toBe(true)
  })

  test('unlocks repeatable Golden Scales only after all numbered scales and sets a 1-in-50 item roll', () => {
    const eligible = getAvailableFishingItemEntries(
      globalFishingItemPools.old,
      {},
    )
    expect(
      addPostCollectionGoldenScaleDrop(eligible, {}).some(
        (entry) => entry.itemId === 'golden-scale',
      ),
    ).toBe(false)

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
    const withGoldenScale = addPostCollectionGoldenScaleDrop(available, owned)
    const totalWeight = withGoldenScale.reduce(
      (total, entry) => total + entry.weight,
      0,
    )
    const goldenScaleWeight = withGoldenScale.find(
      (entry) => entry.itemId === 'golden-scale',
    )?.weight

    expect(goldenScaleWeight).toBeDefined()
    expect(goldenScaleWeight! / totalWeight).toBeCloseTo(1 / 50)
    expect(items.find((item) => item.id === 'golden-scale')).toMatchObject({
      name: 'Golden Scale',
      category: 'misc',
      spriteId: 'golden-scale',
    })
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

  test('filters keep-net-gated catches until the required item is stored', () => {
    const gatedEntries: GlobalFishingItemEntry[] = [
      {
        itemId: 'golden-scale-1',
        weight: 1,
        symbol: '!!!',
        reactionTime: 900,
        appearTime: { min: 1, max: 1 },
        keepNetRequirements: [{ itemId: 'drake-scale-t1' }],
      },
    ]

    expect(getAvailableFishingItemEntries(gatedEntries, {})).toEqual([])
    expect(
      getAvailableFishingItemEntries(gatedEntries, {}, new Set(), [
        {
          id: 'drake-scale',
          type: 'item',
          itemId: 'drake-scale-t1',
          quantity: 1,
        },
      ]),
    ).toEqual(gatedEntries)
  })

  test('Great Balls require three Poké Balls in the keep net on every rod', () => {
    const pokeballs = (count: number) =>
      Array.from({ length: count }, (_, index) => ({
        id: `pokeball-${index}`,
        type: 'item' as const,
        itemId: 'poke-ball',
        quantity: 1,
      }))

    for (const pool of Object.values(globalFishingItemPools)) {
      expect(
        getAvailableFishingItemEntries(pool, {}, new Set(), pokeballs(2)).some(
          (entry) => entry.itemId === 'great-ball',
        ),
      ).toBe(false)
      expect(
        getAvailableFishingItemEntries(
          pool,
          {},
          new Set(),
          pokeballs(3),
        ).some((entry) => entry.itemId === 'great-ball'),
      ).toBe(true)
    }
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

  test('global pools include the requested common and uncommon crafting and ball items', () => {
    for (const pool of Object.values(globalFishingItemPools)) {
      const entries = new Map(
        pool
          .filter((entry) => entry.itemId)
          .map((entry) => [entry.itemId, entry]),
      )

      for (const itemId of [
        'discarded-rubbish',
        'broken-ball-t1',
        'poke-ball',
        'metal-scrap-t1',
      ]) {
        expect(entries.get(itemId)?.weight).toBe(10)
        expect(entries.get(itemId)?.symbol).toBe('!')
      }
      for (const itemId of ['great-ball', 'drake-scale-t1']) {
        expect(entries.get(itemId)?.weight).toBe(4)
        expect(entries.get(itemId)?.symbol).toBe('!!')
      }
    }
  })

  test('Golden Scales keep their authored weight after general items are added', () => {
    const expected = { old: 8 / 155, good: 8 / 156, super: 8 / 156 }
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
