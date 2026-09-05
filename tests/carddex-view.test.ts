import { describe, expect, test } from 'bun:test'
import type { TcgSetSummary } from '@/data/tcg/summaries'
import {
  DEFAULT_CARDDEX_FILTERS,
  getCarddexActiveFilterCount,
  getCarddexScopedSets,
  getCarddexSeriesGroups,
  getCarddexSetProgress,
  normalizeCarddexFilters,
  resolveCarddexScope,
} from '@/utilities/tcg/carddex-view'

const SETS: TcgSetSummary[] = [
  {
    id: 'old1',
    name: 'First Binder',
    series: 'Old Series',
    total: 10,
    printedTotal: 10,
    releaseDate: '2000/01/01',
  },
  {
    id: 'new1',
    name: 'New Binder',
    series: 'New Series',
    total: 20,
    printedTotal: 20,
    releaseDate: '2025/01/01',
  },
  {
    id: 'new2',
    name: 'Newest Binder',
    series: 'New Series',
    total: 30,
    printedTotal: 30,
    releaseDate: '2026/01/01',
  },
]

describe('Carddex view state', () => {
  test('normalizes shareable filter input and rejects invalid values', () => {
    expect(
      normalizeCarddexFilters({
        query: '  Pikachu  ',
        ownership: 'duplicates',
        supertype: 'invalid',
        type: 'fire',
        rarity: 'chase',
        sort: 'name',
      }),
    ).toEqual({
      query: 'Pikachu',
      ownership: 'duplicates',
      supertype: 'all',
      type: 'fire',
      rarity: 'chase',
      sort: 'name',
    })
  })

  test('resolves set URLs, series URLs, and a newest-set fallback', () => {
    expect(resolveCarddexScope({ sets: SETS, requestedSetId: 'new1' })).toEqual(
      { series: 'New Series', setId: 'new1' },
    )
    expect(
      resolveCarddexScope({ sets: SETS, requestedSeries: 'Old Series' }),
    ).toEqual({ series: 'Old Series', setId: 'all' })
    expect(resolveCarddexScope({ sets: SETS })).toEqual({
      series: 'New Series',
      setId: 'new2',
    })
    expect(
      getCarddexScopedSets(SETS, { series: 'New Series', setId: 'all' }).map(
        (set) => set.id,
      ),
    ).toEqual(['new1', 'new2'])
  })

  test('builds newest-first series shelves with collection progress', () => {
    const progress = getCarddexSetProgress(SETS, [
      { cardId: 'new1-001', quantity: 1 },
      { cardId: 'new1-002', quantity: 2 },
      { cardId: 'new2-001', quantity: 0 },
      { cardId: 'old1-001', quantity: 1 },
    ])
    const groups = getCarddexSeriesGroups(SETS, progress)

    expect(groups.map((group) => group.series)).toEqual([
      'New Series',
      'Old Series',
    ])
    expect(groups[0].sets.map((set) => set.id)).toEqual(['new2', 'new1'])
    expect(groups[0]).toMatchObject({ unique: 2, total: 50 })
    expect(progress.get('old1')).toEqual({ unique: 1, total: 10 })
  })

  test('counts only filters which change the result presentation', () => {
    expect(getCarddexActiveFilterCount(DEFAULT_CARDDEX_FILTERS)).toBe(0)
    expect(
      getCarddexActiveFilterCount({
        ...DEFAULT_CARDDEX_FILTERS,
        query: 'mew',
        ownership: 'owned',
        sort: 'rarity',
      }),
    ).toBe(3)
  })
})
