import type { TcgSetSummary } from '@/data/tcg/summaries'
import {
  getTcgSeriesInReleaseOrder,
  sortTcgSetsByReleaseDate,
} from '@/utilities/tcg/set-order'

export type CarddexOwnershipFilter = 'all' | 'owned' | 'missing' | 'duplicates'
export type CarddexSupertypeFilter = 'all' | 'pokemon' | 'trainer' | 'energy'
export type CarddexRarityFilter =
  | 'all'
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'chase'
export type CarddexSort =
  | 'set-number'
  | 'name'
  | 'rarity'
  | 'missing-first'
  | 'duplicates-first'

export interface CarddexViewFilters {
  query: string
  ownership: CarddexOwnershipFilter
  supertype: CarddexSupertypeFilter
  type: string
  rarity: CarddexRarityFilter
  sort: CarddexSort
}

export interface CarddexScope {
  series: string
  setId: string
}

export interface CarddexCollectionEntry {
  cardId: string
  quantity: number
}

export interface CarddexSetProgress {
  unique: number
  total: number
}

export interface CarddexSeriesGroup<T extends TcgSetSummary = TcgSetSummary> {
  series: string
  sets: T[]
  unique: number
  total: number
}

export const DEFAULT_CARDDEX_FILTERS: CarddexViewFilters = {
  query: '',
  ownership: 'all',
  supertype: 'all',
  type: 'all',
  rarity: 'all',
  sort: 'set-number',
}

export const CARDDEX_OWNERSHIP_OPTIONS = [
  { id: 'all', label: 'All cards' },
  { id: 'owned', label: 'Collected' },
  { id: 'missing', label: 'Missing' },
  { id: 'duplicates', label: 'Duplicates' },
] as const

export const CARDDEX_SUPERTYPE_OPTIONS = [
  { id: 'all', label: 'All card kinds' },
  { id: 'pokemon', label: 'Pokémon' },
  { id: 'trainer', label: 'Trainer' },
  { id: 'energy', label: 'Energy' },
] as const

export const CARDDEX_RARITY_OPTIONS = [
  { id: 'all', label: 'All rarities' },
  { id: 'common', label: 'Common' },
  { id: 'uncommon', label: 'Uncommon' },
  { id: 'rare', label: 'Rare' },
  { id: 'chase', label: 'Chase' },
] as const

export const CARDDEX_SORT_OPTIONS = [
  { id: 'set-number', label: 'Collector number' },
  { id: 'name', label: 'Name A–Z' },
  { id: 'rarity', label: 'Rarity high–low' },
  { id: 'missing-first', label: 'Missing first' },
  { id: 'duplicates-first', label: 'Duplicates first' },
] as const

export const CARDDEX_TYPE_OPTIONS = [
  { id: 'all', label: 'All Pokémon types' },
  { id: 'colorless', label: 'Colorless' },
  { id: 'darkness', label: 'Darkness' },
  { id: 'dragon', label: 'Dragon' },
  { id: 'fairy', label: 'Fairy' },
  { id: 'fighting', label: 'Fighting' },
  { id: 'fire', label: 'Fire' },
  { id: 'grass', label: 'Grass' },
  { id: 'lightning', label: 'Lightning' },
  { id: 'metal', label: 'Metal' },
  { id: 'psychic', label: 'Psychic' },
  { id: 'water', label: 'Water' },
] as const

const OWNERSHIP_VALUES = new Set(
  CARDDEX_OWNERSHIP_OPTIONS.map((option) => option.id),
)
const SUPERTYPE_VALUES = new Set(
  CARDDEX_SUPERTYPE_OPTIONS.map((option) => option.id),
)
const RARITY_VALUES = new Set(CARDDEX_RARITY_OPTIONS.map((option) => option.id))
const SORT_VALUES = new Set(CARDDEX_SORT_OPTIONS.map((option) => option.id))
const TYPE_VALUES = new Set(CARDDEX_TYPE_OPTIONS.map((option) => option.id))

function normalizeOption<T extends string>(
  value: string | string[] | undefined,
  values: Set<string>,
  fallback: T,
): T {
  const candidate = Array.isArray(value) ? value[0] : value
  return candidate && values.has(candidate) ? (candidate as T) : fallback
}

export function normalizeCarddexFilters(
  input: Partial<
    Record<keyof CarddexViewFilters, string | string[] | undefined>
  >,
): CarddexViewFilters {
  const rawQuery = Array.isArray(input.query) ? input.query[0] : input.query
  return {
    query: rawQuery?.trim().slice(0, 80) || '',
    ownership: normalizeOption(
      input.ownership,
      OWNERSHIP_VALUES,
      DEFAULT_CARDDEX_FILTERS.ownership,
    ),
    supertype: normalizeOption(
      input.supertype,
      SUPERTYPE_VALUES,
      DEFAULT_CARDDEX_FILTERS.supertype,
    ),
    type: normalizeOption(
      input.type,
      TYPE_VALUES,
      DEFAULT_CARDDEX_FILTERS.type,
    ),
    rarity: normalizeOption(
      input.rarity,
      RARITY_VALUES,
      DEFAULT_CARDDEX_FILTERS.rarity,
    ),
    sort: normalizeOption(
      input.sort,
      SORT_VALUES,
      DEFAULT_CARDDEX_FILTERS.sort,
    ),
  }
}

export function resolveCarddexScope<T extends TcgSetSummary>({
  sets,
  requestedSeries,
  requestedSetId,
}: {
  sets: T[]
  requestedSeries?: string | string[]
  requestedSetId?: string | string[]
}): CarddexScope {
  if (sets.length === 0) return { series: 'all', setId: 'all' }

  const setId = Array.isArray(requestedSetId)
    ? requestedSetId[0]
    : requestedSetId
  const requestedSet = sets.find((set) => set.id === setId)
  if (requestedSet) {
    return { series: requestedSet.series, setId: requestedSet.id }
  }

  const series = Array.isArray(requestedSeries)
    ? requestedSeries[0]
    : requestedSeries
  if (series === 'all') return { series: 'all', setId: 'all' }
  if (series && sets.some((set) => set.series === series)) {
    return { series, setId: 'all' }
  }

  const newestSet = sortTcgSetsByReleaseDate(sets).at(-1)!
  return { series: newestSet.series, setId: newestSet.id }
}

export function getCarddexScopedSets<T extends TcgSetSummary>(
  sets: T[],
  scope: CarddexScope,
): T[] {
  if (scope.setId !== 'all') {
    return sets.filter((set) => set.id === scope.setId)
  }
  if (scope.series === 'all') return sets
  return sets.filter((set) => set.series === scope.series)
}

export function getCarddexSetProgress<T extends TcgSetSummary>(
  sets: T[],
  entries: CarddexCollectionEntry[],
): Map<string, CarddexSetProgress> {
  const progress = new Map(
    sets.map((set) => [set.id, { unique: 0, total: set.total }]),
  )
  const setIds = new Set(sets.map((set) => set.id))

  for (const entry of entries) {
    if (entry.quantity <= 0) continue
    const setId = entry.cardId.split('-')[0]
    if (!setIds.has(setId)) continue
    const current = progress.get(setId)
    if (current) current.unique += 1
  }

  return progress
}

export function getCarddexSeriesGroups<T extends TcgSetSummary>(
  sets: T[],
  progressBySet: Map<string, CarddexSetProgress>,
): CarddexSeriesGroup<T>[] {
  const order = getTcgSeriesInReleaseOrder(sets).reverse()
  return order.map((series) => {
    const seriesSets = sortTcgSetsByReleaseDate(
      sets.filter((set) => set.series === series),
    ).reverse()
    return {
      series,
      sets: seriesSets,
      unique: seriesSets.reduce(
        (total, set) => total + (progressBySet.get(set.id)?.unique || 0),
        0,
      ),
      total: seriesSets.reduce((total, set) => total + set.total, 0),
    }
  })
}

export function getCarddexActiveFilterCount(
  filters: CarddexViewFilters,
): number {
  return (
    Number(Boolean(filters.query.trim())) +
    Number(filters.ownership !== DEFAULT_CARDDEX_FILTERS.ownership) +
    Number(filters.supertype !== DEFAULT_CARDDEX_FILTERS.supertype) +
    Number(filters.type !== DEFAULT_CARDDEX_FILTERS.type) +
    Number(filters.rarity !== DEFAULT_CARDDEX_FILTERS.rarity) +
    Number(filters.sort !== DEFAULT_CARDDEX_FILTERS.sort)
  )
}
