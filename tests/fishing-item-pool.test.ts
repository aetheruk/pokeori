import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import {
  globalFishingCommonItemPools,
  globalFishingRareItemPools,
  FISHING_EVOLUTION_STONE_TYPES,
  NUMBERED_GOLDEN_SCALE_IDS,
} from '@/data/games/fishing/item-pools'
import {
  TIER_ONE_POKEMON_MATERIAL_IDS,
  TYPE_MATERIAL_CONFIG,
} from '@/utilities/artisan/material-drops'
import {
  getAvailableFishingItemEntries,
  getGlobalFishingItemTables,
  getFishingRareItemChance,
  rollGlobalFishingItem,
} from '@/utilities/fishing/item-pool'
import type { FishingKeepNetEntry } from '@/utilities/fishing/keep-net'

const netItem = (itemId: string, quantity = 1): FishingKeepNetEntry => ({
  id: itemId,
  type: 'item',
  itemId,
  quantity,
})
const ownedScales = Object.fromEntries(
  NUMBERED_GOLDEN_SCALE_IDS.map((id) => [id, 1]),
)
const has = (entries: Array<{ itemId?: string }>, id: string) =>
  entries.some((entry) => entry.itemId === id)

describe('fishing common and rare tables', () => {
  test('every rod offers all eighteen base materials and broken balls in bundles of one or two', () => {
    expect(TIER_ONE_POKEMON_MATERIAL_IDS).toHaveLength(18)
    for (const pool of Object.values(globalFishingCommonItemPools)) {
      expect(pool.every((entry) => entry.weight === 1)).toBe(true)
      for (const id of [...TIER_ONE_POKEMON_MATERIAL_IDS, 'broken-ball-t1']) {
        expect(
          pool.find((entry) => entry.itemId === id)?.quantityRange,
        ).toEqual({ min: 1, max: 2 })
      }
      expect(
        pool.find((entry) => entry.currencyId === 'pokedollars')?.quantity,
      ).toBe(100)
      expect(
        pool.find((entry) => entry.currencyId === 'crystals')?.quantity,
      ).toBe(25)
      expect(has(pool, 'water-gem')).toBe(false)
      expect(has(pool, 'discarded-rubbish')).toBe(false)
    }
  })

  test('ball gates use total broken-ball quantity and unlock cumulatively', () => {
    for (const rod of ['old', 'good', 'super'] as const) {
      for (const [count, unlocked] of [
        [0, 0],
        [1, 0],
        [2, 1],
        [4, 1],
        [5, 2],
        [7, 2],
        [8, 3],
      ]) {
        const table = getGlobalFishingItemTables(rod, {}, [
          netItem('broken-ball-t1', count),
        ]).common
        for (const [index, id] of [
          'poke-ball',
          'great-ball',
          'ultra-ball',
        ].entries()) {
          expect(has(table, id)).toBe(index < unlocked)
        }
      }
      const split = [
        netItem('broken-ball-t1', 2),
        netItem('broken-ball-t1', 2),
        netItem('broken-ball-t1'),
      ]
      expect(
        has(getGlobalFishingItemTables(rod, {}, split).common, 'great-ball'),
      ).toBe(true)
      expect(
        has(
          getGlobalFishingItemTables(rod, { 'broken-ball-t1': 100 }, []).common,
          'poke-ball',
        ),
      ).toBe(false)
    }
  })

  test('all eleven evolution stones need five occupied slots of the matching base material', () => {
    const stoneIds = items
      .filter(
        (item) => item.category === 'evolution' && item.id.endsWith('-stone'),
      )
      .map((item) => item.id)
    expect(Object.keys(FISHING_EVOLUTION_STONE_TYPES).sort()).toEqual(
      stoneIds.sort(),
    )
    for (const [stone, type] of Object.entries(FISHING_EVOLUTION_STONE_TYPES)) {
      const material = `${TYPE_MATERIAL_CONFIG[type].family}-t1`
      expect(
        has(
          getGlobalFishingItemTables('old', {}, [netItem(material, 10)]).rare,
          stone,
        ),
      ).toBe(false)
      expect(
        has(
          getGlobalFishingItemTables(
            'old',
            {},
            Array(4).fill(netItem(material, 2)),
          ).rare,
          stone,
        ),
      ).toBe(false)
      const eligible = getGlobalFishingItemTables(
        'old',
        {},
        Array(5).fill(netItem(material, 2)),
      ).rare
      expect(has(eligible, stone)).toBe(true)
      expect(eligible.find((entry) => entry.itemId === stone)?.weight).toBe(1)
      expect(
        has(
          getGlobalFishingItemTables(
            'old',
            {},
            Array(5).fill(netItem(material.replace('-t1', '-t2'))),
          ).rare,
          stone,
        ),
      ).toBe(false)
    }
  })

  test('unique scales are excluded when owned or netted and repeatable scale has equal rare weight', () => {
    const initial = getGlobalFishingItemTables('old', {}).rare
    expect(initial).toHaveLength(11)
    expect(initial.every((entry) => entry.weight === 1)).toBe(true)
    expect(has(initial, 'golden-scale')).toBe(false)
    const partial = getGlobalFishingItemTables('old', { 'golden-scale-1': 1 }, [
      netItem('golden-scale-2'),
    ]).rare
    expect(partial).toHaveLength(9)
    expect(has(partial, 'golden-scale-1')).toBe(false)
    expect(has(partial, 'golden-scale-2')).toBe(false)
    expect(has(partial, 'golden-scale')).toBe(false)
    const complete = getGlobalFishingItemTables('old', ownedScales).rare
    expect(complete.map((entry) => entry.itemId || entry.currencyId)).toEqual([
      'discarded-rubbish',
      'pokedollars',
      'crystals',
      'golden-scale',
    ])
    expect(complete.every((entry) => entry.weight === 1)).toBe(true)
    expect(
      complete.find((entry) => entry.currencyId === 'pokedollars')?.quantity,
    ).toBe(500)
    expect(
      complete.find((entry) => entry.currencyId === 'crystals')?.quantity,
    ).toBe(200)
    expect(
      getAvailableFishingItemEntries(
        globalFishingRareItemPools.old,
        {},
        new Set(['golden-scale-1']),
      ).some((entry) => entry.itemId === 'golden-scale-1'),
    ).toBe(false)
  })

  test('only unnumbered Golden Scales boost the rare roll by one percentage point each', () => {
    expect(getFishingRareItemChance([])).toBe(1)
    expect(getFishingRareItemChance([netItem('golden-scale')])).toBe(2)
    expect(
      getFishingRareItemChance(Array(5).fill(netItem('golden-scale'))),
    ).toBe(6)
    expect(
      getFishingRareItemChance(Array(10).fill(netItem('golden-scale'))),
    ).toBe(11)
    expect(
      getFishingRareItemChance([
        netItem('golden-scale-1'),
        netItem('drake-scale-t1'),
      ]),
    ).toBe(1)
  })

  test('table selection is separate from equal entry selection and quantity resolves once', () => {
    const rng =
      (...values: number[]) =>
      () =>
        values.shift() ?? 0
    for (const rod of ['old', 'good', 'super'] as const) {
      expect(rollGlobalFishingItem(rod, {}, [], rng(0.00999, 0)).itemId).toBe(
        'golden-scale-1',
      )
      const one = rollGlobalFishingItem(rod, {}, [], rng(0.01, 0, 0))
      const two = rollGlobalFishingItem(rod, {}, [], rng(0.99, 0, 0.99999))
      expect(one.itemId).toBe(TIER_ONE_POKEMON_MATERIAL_IDS[0])
      expect(one.quantity).toBe(1)
      expect(two.quantity).toBe(2)
      expect('quantityRange' in two).toBe(false)
      expect(
        rollGlobalFishingItem(
          rod,
          ownedScales,
          [netItem('golden-scale')],
          rng(0.01999, 0.9999),
        ).itemId,
      ).toBe('golden-scale')
      expect(
        rollGlobalFishingItem(
          rod,
          ownedScales,
          [netItem('golden-scale')],
          rng(0.02, 0),
        ).itemId,
      ).toBe(TIER_ONE_POKEMON_MATERIAL_IDS[0])
      const available = getGlobalFishingItemTables(rod, {}).common
      const selected = Array.from({ length: available.length }, (_, index) =>
        rollGlobalFishingItem(
          rod,
          {},
          [],
          rng(0.5, (index + 0.5) / available.length, 0),
        ),
      )
      expect(selected.map((entry) => entry.itemId || entry.currencyId)).toEqual(
        available.map((entry) => entry.itemId || entry.currencyId),
      )
    }
  })

  test('material pouches keep their existing material and gem contents', () => {
    expect(
      items.find((item) => item.id === 'pouch-of-materials')?.effects,
    ).toMatchObject({
      grantRandomPokemonMaterials: { min: 1, max: 5 },
      grantRandomGems: { min: 1, max: 3 },
    })
  })
})
