'use client'

import {
  ChevronLeft,
  ChevronRight,
  Library,
  Loader2,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import Image from 'next/image'
import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useInView } from 'react-intersection-observer'
import {
  DexCountSummary,
  DexEmptyState,
  DexFilterBar,
  DexPageShell,
} from '@/components/game/dex'
import { RewardSummaryDisplay } from '@/components/game/reward-summary'
import { PremiumSearch } from '@/components/game/shared/PremiumSearch'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { type TcgSetSummary, tcgSetSummaries } from '@/data/tcg/summaries'
import type { TcgCard, TcgSet } from '@/data/tcg/types'
import { useGameUserData } from '@/hooks/useGameUserData'
import { useTCG } from '@/hooks/useTCG'
import { APP_VERSION } from '@/utilities/app-version'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import {
  CARDDEX_OWNERSHIP_OPTIONS,
  CARDDEX_RARITY_OPTIONS,
  CARDDEX_SORT_OPTIONS,
  CARDDEX_SUPERTYPE_OPTIONS,
  CARDDEX_TYPE_OPTIONS,
  type CarddexScope,
  type CarddexSeriesGroup,
  type CarddexViewFilters,
  DEFAULT_CARDDEX_FILTERS,
  getCarddexActiveFilterCount,
  getCarddexScopedSets,
  getCarddexSeriesGroups,
  getCarddexSetProgress,
  resolveCarddexScope,
} from '@/utilities/tcg/carddex-view'
import type { TcgCatalogPage } from '@/utilities/tcg/catalog'
import { getTcgCardAccessibleLabel } from '@/utilities/tcg/presentation'
import { sortTcgSetsByReleaseDate } from '@/utilities/tcg/set-order'
import {
  calculateTcgBattleCardCost,
  TCG_BATTLE_FORMATS,
  type TcgBattleEnergyType,
} from '@/utilities/tcg/tcg-battle'
import { getTcgDecks, redistributeDuplicateCards, saveTcgDeck } from './actions'

const CARD_BATCH_SIZE = 80
const CARD_CRYSTALIZER_ITEM_ID = 'card-crystalizer'
type DeckFormat = 'baby' | 'champions' | 'masters'
const DECK_FORMATS: { id: DeckFormat; label: string }[] = [
  { id: 'baby', label: 'Baby' },
  { id: 'champions', label: 'Champions' },
  { id: 'masters', label: 'Masters' },
]

type CatalogCard = { card: TcgCard; set: TcgSet }
type CatalogResponse<T> = {
  items: T[]
  total: number
  ownedTotal?: number
  nextCursor: string | null
}

export default function TcgExplorerPage({
  initialScope,
  initialFilters,
  initialCatalog = null,
}: {
  initialScope: CarddexScope
  initialFilters: CarddexViewFilters
  initialCatalog?: TcgCatalogPage | null
}) {
  const {
    entriesByCard,
    isLoading: collectionLoading,
    error: collectionError,
    refreshCollection,
  } = useTCG()
  const { refreshUser } = useUser()
  const gameData = useGameUserData()

  const [scope, setScope] = useState<CarddexScope>(initialScope)
  const [filters, setFilters] = useState<CarddexViewFilters>(initialFilters)
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<{
    card: TcgCard
    set: TcgSet
  } | null>(null)
  const [redistributing, setRedistributing] = useState(false)
  const [rewardSummary, setRewardSummary] = useState<RewardSummary | null>(null)
  const [generationDecks, setGenerationDecks] = useState<
    Record<
      string,
      Partial<
        Record<DeckFormat, { cards: string[]; energy?: TcgBattleEnergyType }>
      >
    >
  >({})
  const [deckValidation, setDeckValidation] = useState<
    Record<string, Record<DeckFormat, { totalCost: number }>>
  >({})
  const [deckCardsById, setDeckCardsById] = useState<Map<string, TcgCard>>(
    () => new Map(),
  )
  const [deckMessage, setDeckMessage] = useState<string>('')
  const [catalogCards, setCatalogCards] = useState<CatalogCard[]>(
    initialCatalog?.items || [],
  )
  const [catalogTotal, setCatalogTotal] = useState(initialCatalog?.total || 0)
  const [catalogOwnedTotal, setCatalogOwnedTotal] = useState(
    initialCatalog?.ownedTotal || 0,
  )
  const [nextCursor, setNextCursor] = useState<string | null>(
    initialCatalog?.nextCursor || null,
  )
  const [catalogLoading, setCatalogLoading] = useState(false)
  const [catalogError, setCatalogError] = useState(false)
  const loadingMoreRef = useRef(false)
  const catalogRequestRef = useRef(0)
  const skipInitialFetchRef = useRef(Boolean(initialCatalog))
  const deferredSearch = useDeferredValue(filters.query.trim())
  const inventory = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )
  const hasDeckBox = (inventory['deck-box'] || 0) > 0
  const hasCardCrystalizer = (inventory[CARD_CRYSTALIZER_ITEM_ID] || 0) > 0
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  })

  const sets = useMemo(() => {
    if (!gameData) return []
    return sortTcgSetsByReleaseDate(
      tcgSetSummaries.filter((set) => (inventory[`binder-${set.id}`] || 0) > 0),
    )
  }, [gameData, inventory])

  useEffect(() => {
    const resolved = resolveCarddexScope({
      sets,
      requestedSeries: scope.series,
      requestedSetId: scope.setId,
    })
    if (resolved.series !== scope.series || resolved.setId !== scope.setId) {
      setScope(resolved)
    }
  }, [scope.series, scope.setId, sets])

  const scopedSets = useMemo(
    () => getCarddexScopedSets(sets, scope),
    [scope, sets],
  )
  const progressBySet = useMemo(
    () => getCarddexSetProgress(sets, Object.values(entriesByCard)),
    [entriesByCard, sets],
  )
  const seriesGroups = useMemo(
    () => getCarddexSeriesGroups(sets, progressBySet),
    [progressBySet, sets],
  )
  const activeFilterCount = getCarddexActiveFilterCount(filters)

  const updateFilter = <K extends keyof CarddexViewFilters>(
    key: K,
    value: CarddexViewFilters[K],
  ) => setFilters((current) => ({ ...current, [key]: value }))

  const clearFilters = () => setFilters(DEFAULT_CARDDEX_FILTERS)

  const selectSeries = (series: string) => setScope({ series, setId: 'all' })

  const selectSet = (setId: string) => {
    if (setId === 'all') {
      setScope((current) => ({ ...current, setId }))
      return
    }
    const set = sets.find((candidate) => candidate.id === setId)
    if (set) setScope({ series: set.series, setId })
  }

  const catalogUrl = useMemo(() => {
    const requestedSetIds = scopedSets.map((set) => set.id)
    if (requestedSetIds.length === 0) return null
    const params = new URLSearchParams({
      v: APP_VERSION,
      setIds: requestedSetIds.join(','),
      limit: String(CARD_BATCH_SIZE),
    })
    if (deferredSearch) params.set('q', deferredSearch)
    params.set('ownership', filters.ownership)
    params.set('supertype', filters.supertype)
    params.set('type', filters.type)
    params.set('rarity', filters.rarity)
    params.set('sort', filters.sort)
    return `/api/game/catalog/tcg?${params}`
  }, [deferredSearch, filters, scopedSets])

  useEffect(() => {
    const url = new URL(window.location.href)
    for (const key of [
      'series',
      'set',
      'q',
      'ownership',
      'supertype',
      'type',
      'rarity',
      'sort',
    ]) {
      url.searchParams.delete(key)
    }
    if (scope.series !== 'all') url.searchParams.set('series', scope.series)
    if (scope.setId !== 'all') url.searchParams.set('set', scope.setId)
    if (deferredSearch) url.searchParams.set('q', deferredSearch)
    if (filters.ownership !== DEFAULT_CARDDEX_FILTERS.ownership) {
      url.searchParams.set('ownership', filters.ownership)
    }
    if (filters.supertype !== DEFAULT_CARDDEX_FILTERS.supertype) {
      url.searchParams.set('supertype', filters.supertype)
    }
    if (filters.type !== DEFAULT_CARDDEX_FILTERS.type) {
      url.searchParams.set('type', filters.type)
    }
    if (filters.rarity !== DEFAULT_CARDDEX_FILTERS.rarity) {
      url.searchParams.set('rarity', filters.rarity)
    }
    if (filters.sort !== DEFAULT_CARDDEX_FILTERS.sort) {
      url.searchParams.set('sort', filters.sort)
    }
    window.history.replaceState(
      null,
      '',
      `${url.pathname}${url.search}${url.hash}`,
    )
  }, [deferredSearch, filters, scope])

  useEffect(() => {
    catalogRequestRef.current += 1
    if (skipInitialFetchRef.current) {
      skipInitialFetchRef.current = false
      return
    }
    if (!catalogUrl) {
      setCatalogCards([])
      setCatalogTotal(0)
      setCatalogOwnedTotal(0)
      setNextCursor(null)
      return
    }
    const controller = new AbortController()
    setSelectedCard(null)
    setCatalogLoading(true)
    setCatalogError(false)
    fetch(catalogUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Catalog request failed')
        return response.json()
      })
      .then((result: CatalogResponse<CatalogCard>) => {
        setCatalogCards(result.items || [])
        setCatalogTotal(result.total || 0)
        setCatalogOwnedTotal(result.ownedTotal || 0)
        setNextCursor(result.nextCursor)
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') {
          setCatalogError(true)
          setCatalogCards([])
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setCatalogLoading(false)
      })
    return () => controller.abort()
  }, [catalogUrl, entriesByCard])

  const loadMoreCards = useCallback(async () => {
    if (!nextCursor || !catalogUrl || loadingMoreRef.current) return []
    const requestVersion = catalogRequestRef.current
    const nextUrl = new URL(catalogUrl, window.location.origin)
    nextUrl.searchParams.set('cursor', nextCursor)
    loadingMoreRef.current = true
    try {
      const response = await fetch(
        `${nextUrl.pathname}?${nextUrl.searchParams}`,
      )
      if (!response.ok) throw new Error('Catalog request failed')
      const result: CatalogResponse<CatalogCard> = await response.json()
      if (requestVersion !== catalogRequestRef.current) return []
      const newItems = result.items || []
      setCatalogCards((current) => [...current, ...newItems])
      setNextCursor(result.nextCursor)
      return newItems
    } catch {
      if (requestVersion === catalogRequestRef.current) setCatalogError(true)
      return []
    } finally {
      loadingMoreRef.current = false
    }
  }, [catalogUrl, nextCursor])

  useEffect(() => {
    if (inView) void loadMoreCards()
  }, [inView, loadMoreCards])

  const hasMoreCards = Boolean(nextCursor)

  useEffect(() => {
    if (!gameData || !hasDeckBox) return
    let mounted = true
    getTcgDecks().then((result) => {
      if (!mounted) return
      if (result.ok) {
        setGenerationDecks(result.generationDecks || {})
        setDeckValidation(
          (result.validation || {}) as Record<
            string,
            Record<DeckFormat, { totalCost: number }>
          >,
        )
      } else if (result.error) {
        setDeckMessage(result.error)
      }
    })
    return () => {
      mounted = false
    }
  }, [gameData, hasDeckBox])

  const selectedCardGeneration = selectedCard?.set.series || ''
  const selectedGenerationDeckCardIds = useMemo(
    () =>
      Array.from(
        new Set(
          Object.values(generationDecks[selectedCardGeneration] || {}).flatMap(
            (deck) => deck?.cards || [],
          ),
        ),
      ),
    [generationDecks, selectedCardGeneration],
  )

  useEffect(() => {
    if (selectedGenerationDeckCardIds.length === 0) {
      setDeckCardsById(new Map())
      return
    }
    const controller = new AbortController()
    const params = new URLSearchParams({
      v: APP_VERSION,
      cardIds: selectedGenerationDeckCardIds.join(','),
      limit: String(selectedGenerationDeckCardIds.length),
    })
    fetch(`/api/game/catalog/tcg?${params}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((result: { items?: CatalogCard[] }) => {
        setDeckCardsById(
          new Map((result.items || []).map(({ card }) => [card.id, card])),
        )
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') setDeckCardsById(new Map())
      })
    return () => controller.abort()
  }, [selectedGenerationDeckCardIds])

  const getGenerationDeckCost = (generation: string, format: DeckFormat) => {
    const deck = generationDecks[generation]?.[format]?.cards || []
    const hasAllCards = deck.every((cardId) => deckCardsById.has(cardId))
    if (hasAllCards) {
      return deck.reduce(
        (total, cardId) =>
          total + calculateTcgBattleCardCost(deckCardsById.get(cardId)!),
        0,
      )
    }
    return deckValidation[generation]?.[format]?.totalCost || 0
  }

  const toggleCardInGenerationDeck = async (
    generation: string,
    format: DeckFormat,
    cardId: string,
  ) => {
    if (!selectedCard) return
    const currentDeck = generationDecks[generation]?.[format]?.cards || []
    const currentEnergy = generationDecks[generation]?.[format]?.energy
    const cardCost = calculateTcgBattleCardCost(selectedCard.card)
    const currentCost = getGenerationDeckCost(generation, format)
    if (
      !currentDeck.includes(cardId) &&
      currentCost + cardCost > TCG_BATTLE_FORMATS[format].deckCostLimit
    ) {
      setDeckMessage(
        `${selectedCard?.card.name || 'That card'} would exceed the ${TCG_BATTLE_FORMATS[format].label} cost limit.`,
      )
      return
    }
    const nextDeck = currentDeck.includes(cardId)
      ? currentDeck.filter((id) => id !== cardId)
      : currentDeck.length >= 15
        ? currentDeck
        : [...currentDeck, cardId]
    if (nextDeck === currentDeck) return
    setDeckMessage('')
    const result = await saveTcgDeck(
      generation,
      format,
      nextDeck,
      currentEnergy || null,
    )
    if (result.ok) {
      setGenerationDecks(result.generationDecks || {})
      setDeckMessage(
        currentDeck.includes(cardId) ? 'Removed from deck.' : 'Added to deck.',
      )
      return
    }
    setDeckMessage(result.error || 'Unable to update deck.')
  }

  const scopeProgress = useMemo(
    () =>
      scopedSets.reduce(
        (progress, set) => ({
          unique: progress.unique + (progressBySet.get(set.id)?.unique || 0),
          total: progress.total + set.total,
        }),
        { unique: 0, total: 0 },
      ),
    [progressBySet, scopedSets],
  )
  const selectedSet = sets.find((set) => set.id === scope.setId)
  const scopeTitle =
    selectedSet?.name || (scope.series === 'all' ? 'All binders' : scope.series)
  const setOptions = [
    {
      id: 'all',
      label:
        scope.series === 'all' ? 'All unlocked sets' : `All ${scope.series}`,
    },
    ...sets
      .filter((set) => scope.series === 'all' || set.series === scope.series)
      .map((set) => ({
        id: set.id,
        label:
          scope.series === 'all' ? `${set.series} · ${set.name}` : set.name,
      })),
  ]
  const seriesOptions = [
    { id: 'all', label: 'All series' },
    ...seriesGroups.map((group) => ({
      id: group.series,
      label: `${group.series} · ${group.sets.length}`,
    })),
  ]
  const selectedCardIndex = selectedCard
    ? catalogCards.findIndex((item) => item.card.id === selectedCard.card.id)
    : -1
  const hasPreviousCard = catalogCards
    .slice(0, selectedCardIndex)
    .some((item) => (entriesByCard[item.card.id]?.quantity || 0) > 0)
  const hasNextCard =
    catalogCards
      .slice(selectedCardIndex + 1)
      .some((item) => (entriesByCard[item.card.id]?.quantity || 0) > 0) ||
    Boolean(nextCursor)

  const selectAdjacentCard = async (direction: -1 | 1) => {
    if (selectedCardIndex < 0) return
    let candidateIndex = selectedCardIndex + direction
    while (
      candidateIndex >= 0 &&
      candidateIndex < catalogCards.length &&
      !entriesByCard[catalogCards[candidateIndex].card.id]
    ) {
      candidateIndex += direction
    }
    const candidate = catalogCards[candidateIndex]
    if (candidate) {
      setSelectedCard(candidate)
      setRewardSummary(null)
      setDeckMessage('')
      return
    }
    if (direction === 1 && nextCursor) {
      const newItems = await loadMoreCards()
      const nextOwnedCard = newItems.find(
        (item) => (entriesByCard[item.card.id]?.quantity || 0) > 0,
      )
      if (nextOwnedCard) {
        setSelectedCard(nextOwnedCard)
        setRewardSummary(null)
        setDeckMessage('')
      }
    }
  }

  return (
    <DexPageShell
      title="Carddex"
      subtitle="Binder archive"
      contentClassName="p-0 md:p-0"
    >
      <DexFilterBar
        label="Carddex filters"
        className="hidden rounded-none border-x-0 border-t-0 px-6 py-3 lg:block"
        footer={
          <>
            <SlidersHorizontal className="size-3.5" aria-hidden="true" />
            <span className="text-xs text-game-muted" aria-live="polite">
              {catalogTotal} {catalogTotal === 1 ? 'card' : 'cards'} in this
              view
            </span>
            {activeFilterCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto min-h-8 px-2 text-xs"
              >
                <X className="size-3.5" aria-hidden="true" />
                Clear {activeFilterCount}
              </Button>
            )}
          </>
        }
      >
        <div className="grid grid-cols-[minmax(14rem,1.5fr)_minmax(10rem,0.8fr)_minmax(12rem,1fr)_auto] gap-2">
          <div className="space-y-2">
            <label
              htmlFor="carddex-search"
              className="text-xs font-medium text-game-muted"
            >
              Search
            </label>
            <PremiumSearch
              id="carddex-search"
              placeholder="Cards, numbers, or sets"
              value={filters.query}
              onChange={(event) => updateFilter('query', event.target.value)}
              showClear={Boolean(filters.query)}
              onClear={() => updateFilter('query', '')}
            />
          </div>
          <PremiumSelect
            label="Series"
            value={scope.series}
            onValueChange={selectSeries}
            options={seriesOptions}
            placeholder="Choose a series"
          />
          <PremiumSelect
            label="Binder"
            value={scope.setId}
            onValueChange={selectSet}
            options={setOptions}
            placeholder="Choose a binder"
          />
          <Button
            type="button"
            variant="secondary"
            aria-expanded={filtersExpanded}
            aria-controls="carddex-advanced-filters"
            onClick={() => setFiltersExpanded((current) => !current)}
            className="mt-[1.625rem] min-h-11 px-3"
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-game-moss px-1.5 py-0.5 font-mono text-[10px] text-game-cream">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>
        <div
          id="carddex-advanced-filters"
          className={filtersExpanded ? 'mt-3' : 'hidden'}
        >
          <CarddexFilterFields filters={filters} onChange={updateFilter} />
        </div>
      </DexFilterBar>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-4 md:px-6">
        {sets.length > 0 && (
          <CarddexBinderShelf
            seriesGroups={seriesGroups}
            progressBySet={progressBySet}
            scope={scope}
            onSelectSeries={selectSeries}
            onSelectSet={selectSet}
          />
        )}

        <div className="mb-4 mt-5">
          <SectionDivider className="mb-0 flex-1">
            {scopeTitle}
            <DexCountSummary
              className="ml-2 inline"
              count={catalogTotal}
              singular="card"
              plural="cards"
              detail={
                collectionLoading || catalogLoading
                  ? 'Checking collection…'
                  : `${catalogOwnedTotal} collected in results`
              }
            />
          </SectionDivider>
          {scopeProgress.total > 0 && (
            <div className="mt-2 flex items-center gap-3 text-xs text-game-muted">
              <div
                role="progressbar"
                aria-label={`${scopeTitle} collection progress`}
                aria-valuemin={0}
                aria-valuemax={scopeProgress.total}
                aria-valuenow={scopeProgress.unique}
                className="h-1.5 min-w-24 flex-1 overflow-hidden rounded-full bg-game-border/70"
              >
                <div
                  className="h-full rounded-full bg-game-moss transition-[width] motion-reduce:transition-none"
                  style={{
                    width: `${Math.min(100, (scopeProgress.unique / scopeProgress.total) * 100)}%`,
                  }}
                />
              </div>
              <span className="shrink-0 font-mono">
                {scopeProgress.unique}/{scopeProgress.total} recorded
              </span>
            </div>
          )}
        </div>

        {collectionError || catalogError ? (
          <DexEmptyState
            title="The Carddex could not be opened"
            description="Check your connection, then reload the collection."
            action={
              <Button onClick={() => refreshCollection()}>
                Reload collection
              </Button>
            }
          />
        ) : sets.length === 0 && !collectionLoading ? (
          <div className="game-folio-section mx-auto max-w-xl p-6 text-center">
            <p className="font-display text-lg font-semibold text-game-ink">
              No binders recorded yet
            </p>
            <p className="mt-2 text-sm text-game-muted">
              Find a card binder during your travels to begin this collection.
            </p>
          </div>
        ) : catalogCards.length === 0 &&
          !collectionLoading &&
          !catalogLoading ? (
          <DexEmptyState
            title="No cards match this view"
            description="Try another binder or clear the active filters."
            action={
              activeFilterCount > 0 ? (
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              ) : undefined
            }
          />
        ) : (
          <div className="grid grid-cols-4 gap-2 pb-8 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10">
            {catalogCards.map(({ card, set }, index) => {
              const showSetHeading =
                scopedSets.length > 1 &&
                filters.sort === 'set-number' &&
                catalogCards[index - 1]?.set.id !== set.id
              return (
                <div key={card.id} className="contents">
                  {showSetHeading && (
                    <div className="col-span-full flex items-center gap-3 border-b border-game-border pb-2 pt-3">
                      <ItemSprite
                        itemId={`binder-${set.id}`}
                        alt=""
                        width={30}
                        height={30}
                        className="size-7 shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-sm font-semibold text-game-ink">
                          {set.name}
                        </h3>
                        <p className="truncate text-[11px] text-game-muted">
                          {set.series}
                        </p>
                      </div>
                    </div>
                  )}
                  <TcgCardItem
                    card={card}
                    set={set}
                    entry={entriesByCard[card.id]}
                    slot={index + 1}
                    onClick={() => setSelectedCard({ card, set })}
                  />
                </div>
              )
            })}
          </div>
        )}
        {catalogLoading && catalogCards.length === 0 && (
          <div
            className="grid grid-cols-4 gap-2 pb-8 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10"
            role="status"
            aria-label="Loading cards"
          >
            {Array.from({ length: 16 }, (_, index) => (
              <div
                key={index}
                className="aspect-[240/330] rounded-sm border border-game-border bg-game-surface"
              />
            ))}
          </div>
        )}
        {hasMoreCards && (
          <div ref={loadMoreRef} className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-game-moss" />
          </div>
        )}
      </div>

      <SecondaryControlBar className="lg:hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <PremiumSearch
            placeholder="Search cards"
            value={filters.query}
            onChange={(event) => updateFilter('query', event.target.value)}
            showClear={Boolean(filters.query)}
            onClear={() => updateFilter('query', '')}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => setMobileFiltersOpen(true)}
            className="min-h-11 px-3"
            aria-label={`Open Carddex filters${activeFilterCount ? `, ${activeFilterCount} active` : ''}`}
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-game-moss px-1.5 py-0.5 font-mono text-[10px] text-game-cream">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>
      </SecondaryControlBar>

      <ResponsivePanel
        open={mobileFiltersOpen}
        onOpenChange={setMobileFiltersOpen}
        title="Browse the Carddex"
        description="Choose a shelf, binder, and the cards you want to see."
        desktopBreakpoint="lg"
        mobileMaxHeight="100dvh"
        className="gap-0 overflow-hidden bg-game-surface text-game-ink"
      >
        <div className="custom-scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <PremiumSelect
              label="Series"
              value={scope.series}
              onValueChange={selectSeries}
              options={seriesOptions}
            />
            <PremiumSelect
              label="Binder"
              value={scope.setId}
              onValueChange={selectSet}
              options={setOptions}
            />
          </div>
          <CarddexFilterFields filters={filters} onChange={updateFilter} />
        </div>
        <div className="flex gap-2 border-t border-game-border p-4">
          <Button
            type="button"
            variant="outline"
            onClick={clearFilters}
            disabled={activeFilterCount === 0}
            className="flex-1"
          >
            Clear filters
          </Button>
          <Button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="flex-1"
          >
            Show {catalogTotal} cards
          </Button>
        </div>
      </ResponsivePanel>

      <ResponsivePanel
        open={!!selectedCard}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCard(null)
            setRewardSummary(null)
          }
        }}
        title={selectedCard?.card.name}
        description={
          selectedCard ? `Details for ${selectedCard.card.name}` : undefined
        }
        desktopWidth="min(42vw, 620px)"
        desktopBreakpoint="lg"
        mobileHeader={false}
        className="gap-0 overflow-hidden bg-game-surface p-0 text-game-ink"
      >
        {selectedCard && (
          <div className="custom-scrollbar w-full overflow-y-auto p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-game-border pb-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={!hasPreviousCard}
                onClick={() => void selectAdjacentCard(-1)}
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
                Previous
              </Button>
              <span className="font-mono text-[11px] text-game-muted">
                {selectedCardIndex + 1} of {catalogTotal}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={!hasNextCard || catalogLoading}
                onClick={() => void selectAdjacentCard(1)}
              >
                Next
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="grid items-start gap-5 lg:grid-cols-[minmax(12rem,0.8fr)_minmax(0,1fr)]">
              {/* Large Card Image */}
              <div className="mx-auto w-full max-w-64 lg:sticky lg:top-0">
                <div className="relative aspect-[240/330] w-full overflow-hidden rounded-lg border border-game-border bg-game-canvas shadow-sm">
                  <Image
                    src={
                      selectedCard.card.images.large ||
                      selectedCard.card.images.small
                    }
                    alt={selectedCard.card.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Card Details */}
              <div className="w-full min-w-0 space-y-5">
                <div className="space-y-2 text-center lg:text-left">
                  <div className="game-field-label">Card record</div>
                  <h2 className="font-display text-2xl font-semibold text-game-ink">
                    {selectedCard.card.name}
                  </h2>
                  <div className="flex items-center justify-center gap-3 lg:justify-start">
                    <p className="text-xs font-medium text-game-moss-strong">
                      {selectedCard.card.supertype}
                      {selectedCard.card.supertype &&
                        selectedCard.card.subtypes &&
                        selectedCard.card.subtypes.length > 0 && (
                          <span className="mx-2 text-game-border-strong">
                            /
                          </span>
                        )}
                      {selectedCard.card.subtypes?.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-game-border rounded-lg border border-game-border bg-game-surface-raised px-4">
                  <div className="grid min-h-12 grid-cols-[5rem_1fr] items-center gap-3 py-2">
                    <span className="text-xs font-semibold text-game-muted">
                      Set
                    </span>
                    <p className="text-right text-sm font-semibold text-game-ink">
                      {selectedCard.set.name}
                    </p>
                  </div>
                  <div className="grid min-h-12 grid-cols-[5rem_1fr] items-center gap-3 py-2">
                    <span className="text-xs font-semibold text-game-muted">
                      Number
                    </span>
                    <p className="text-right font-mono text-sm font-bold text-game-ink">
                      {selectedCard.card.number}
                    </p>
                  </div>

                  <div className="grid min-h-12 grid-cols-[5rem_1fr] items-center gap-3 py-2">
                    <span className="text-xs font-semibold text-game-muted">
                      Collected
                    </span>
                    <p className="text-right font-mono text-sm font-bold text-game-ink">
                      {entriesByCard[selectedCard.card.id]?.quantity || 0}
                    </p>
                  </div>

                  {selectedCard.card.rarity && (
                    <div className="grid min-h-12 grid-cols-[5rem_1fr] items-center gap-3 py-2">
                      <span className="text-xs font-semibold text-game-muted">
                        Rarity
                      </span>
                      <p className="text-right text-sm font-semibold text-game-ink">
                        {selectedCard.card.rarity}
                      </p>
                    </div>
                  )}

                  {selectedCard.card.artist && (
                    <div className="grid min-h-12 grid-cols-[5rem_1fr] items-center gap-3 py-2">
                      <span className="text-xs font-semibold text-game-muted">
                        Artist
                      </span>
                      <p className="text-right text-sm font-semibold text-game-ink">
                        {selectedCard.card.artist}
                      </p>
                    </div>
                  )}
                </div>

                {/* Collection Status / Actions */}
                {/* Duplicate redistribution section */}
                {rewardSummary ? (
                  <div className="animate-in fade-in zoom-in duration-500 space-y-4">
                    <RewardSummaryDisplay
                      summary={rewardSummary}
                      title="Sent to HQ"
                    />
                  </div>
                ) : (
                  hasCardCrystalizer &&
                  (entriesByCard[selectedCard.card.id]?.quantity || 0) > 1 && (
                    <div className="space-y-4">
                      <SectionDivider>Duplicates</SectionDivider>
                      <div>
                        <Button
                          className="w-full"
                          disabled={redistributing}
                          onClick={async () => {
                            if (redistributing) return
                            setRedistributing(true)
                            try {
                              const result = await redistributeDuplicateCards(
                                selectedCard.card.id,
                                crypto.randomUUID(),
                              )
                              if (result.ok && result.summary) {
                                setRewardSummary(result.summary)
                                refreshCollection()
                                refreshUser()
                              }
                            } catch (e) {
                              // Silent error
                            } finally {
                              setRedistributing(false)
                            }
                          }}
                        >
                          {redistributing ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-game-cream" />
                          )}
                          <span className="text-sm font-semibold">
                            {redistributing
                              ? 'Sending to HQ…'
                              : `Send ${
                                  (entriesByCard[selectedCard.card.id]
                                    ?.quantity || 0) - 1
                                } duplicate cards to HQ`}
                          </span>
                        </Button>
                      </div>
                    </div>
                  )
                )}

                {hasDeckBox &&
                  (entriesByCard[selectedCard.card.id]?.quantity || 0) > 0 && (
                    <div className="space-y-4">
                      <SectionDivider>Battle deck</SectionDivider>
                      {selectedCard.card.supertype === 'Pokémon' &&
                      (selectedCard.card.types?.length || 0) > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {DECK_FORMATS.map((format) => {
                            const generation = selectedCard.set.series
                            const deck =
                              generationDecks[generation]?.[format.id]?.cards ||
                              []
                            const isInDeck = deck.includes(selectedCard.card.id)
                            const deckCost = getGenerationDeckCost(
                              generation,
                              format.id,
                            )
                            const cardCost = calculateTcgBattleCardCost(
                              selectedCard.card,
                            )
                            const costLimit =
                              TCG_BATTLE_FORMATS[format.id].deckCostLimit
                            const wouldExceedCost =
                              !isInDeck && deckCost + cardCost > costLimit
                            return (
                              <Button
                                key={format.id}
                                variant={isInDeck ? 'default' : 'outline'}
                                className="w-full justify-between"
                                disabled={
                                  !isInDeck &&
                                  (deck.length >= 15 || wouldExceedCost)
                                }
                                onClick={() =>
                                  toggleCardInGenerationDeck(
                                    generation,
                                    format.id,
                                    selectedCard.card.id,
                                  )
                                }
                              >
                                <span>
                                  {isInDeck
                                    ? `Remove from ${format.label}`
                                    : `Add to ${format.label} (+${cardCost} cost)`}
                                </span>
                                <span className="text-xs font-mono text-game-muted">
                                  {deck.length}/15 cards · {deckCost}/
                                  {costLimit} cost
                                </span>
                              </Button>
                            )
                          })}
                          {deckMessage && (
                            <span className="text-xs text-game-muted">
                              {deckMessage}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-game-muted">
                          This card is not eligible for battle decks.
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </ResponsivePanel>
    </DexPageShell>
  )
}

type CarddexFilterChange = <K extends keyof CarddexViewFilters>(
  key: K,
  value: CarddexViewFilters[K],
) => void

function CarddexFilterFields({
  filters,
  onChange,
}: {
  filters: CarddexViewFilters
  onChange: CarddexFilterChange
}) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      <PremiumSelect
        label="Ownership"
        value={filters.ownership}
        onValueChange={(value) =>
          onChange('ownership', value as CarddexViewFilters['ownership'])
        }
        options={[...CARDDEX_OWNERSHIP_OPTIONS]}
      />
      <PremiumSelect
        label="Card kind"
        value={filters.supertype}
        onValueChange={(value) =>
          onChange('supertype', value as CarddexViewFilters['supertype'])
        }
        options={[...CARDDEX_SUPERTYPE_OPTIONS]}
      />
      <PremiumSelect
        label="Pokémon type"
        value={filters.type}
        onValueChange={(value) => onChange('type', value)}
        options={[...CARDDEX_TYPE_OPTIONS]}
      />
      <PremiumSelect
        label="Rarity"
        value={filters.rarity}
        onValueChange={(value) =>
          onChange('rarity', value as CarddexViewFilters['rarity'])
        }
        options={[...CARDDEX_RARITY_OPTIONS]}
      />
      <PremiumSelect
        label="Sort"
        value={filters.sort}
        onValueChange={(value) =>
          onChange('sort', value as CarddexViewFilters['sort'])
        }
        options={[...CARDDEX_SORT_OPTIONS]}
      />
    </div>
  )
}

function CarddexBinderShelf({
  seriesGroups,
  progressBySet,
  scope,
  onSelectSeries,
  onSelectSet,
}: {
  seriesGroups: CarddexSeriesGroup<TcgSetSummary>[]
  progressBySet: Map<string, { unique: number; total: number }>
  scope: CarddexScope
  onSelectSeries: (series: string) => void
  onSelectSet: (setId: string) => void
}) {
  const activeSeries = seriesGroups.find(
    (group) => group.series === scope.series,
  )
  const totalUnique = seriesGroups.reduce(
    (total, group) => total + group.unique,
    0,
  )
  const totalCards = seriesGroups.reduce(
    (total, group) => total + group.total,
    0,
  )

  return (
    <section aria-labelledby="carddex-binder-shelf" className="space-y-3">
      <div className="flex items-center gap-2">
        <Library className="size-4 text-game-ochre-strong" aria-hidden="true" />
        <h2
          id="carddex-binder-shelf"
          className="game-field-label text-game-ink"
        >
          Binder shelf
        </h2>
        <span className="ml-auto text-[11px] text-game-muted">
          Series first, then set
        </span>
      </div>

      <div
        className="custom-scrollbar flex snap-x gap-2 overflow-x-auto pb-1"
        role="group"
        aria-label="Card series"
      >
        <button
          type="button"
          aria-pressed={scope.series === 'all'}
          onClick={() => onSelectSeries('all')}
          className={`game-focus-ring min-h-16 w-36 shrink-0 snap-start rounded-lg border px-3 py-2 text-left transition-colors ${
            scope.series === 'all'
              ? 'border-game-moss bg-game-moss/10'
              : 'border-game-border bg-game-surface-raised hover:border-game-moss/40'
          }`}
        >
          <span className="block truncate font-display text-sm font-semibold text-game-ink">
            All series
          </span>
          <span className="mt-1 block font-mono text-[10px] text-game-muted">
            {totalUnique}/{totalCards}
          </span>
        </button>
        {seriesGroups.map((group) => (
          <button
            type="button"
            key={group.series}
            aria-pressed={scope.series === group.series}
            onClick={() => onSelectSeries(group.series)}
            className={`game-focus-ring min-h-16 w-44 shrink-0 snap-start rounded-lg border px-3 py-2 text-left transition-colors ${
              scope.series === group.series
                ? 'border-game-moss bg-game-moss/10'
                : 'border-game-border bg-game-surface-raised hover:border-game-moss/40'
            }`}
          >
            <span className="block truncate font-display text-sm font-semibold text-game-ink">
              {group.series}
            </span>
            <span className="mt-1 block font-mono text-[10px] text-game-muted">
              {group.sets.length} {group.sets.length === 1 ? 'set' : 'sets'} ·{' '}
              {group.unique}/{group.total}
            </span>
          </button>
        ))}
      </div>

      {activeSeries && (
        <div
          className="custom-scrollbar flex snap-x gap-2 overflow-x-auto border-t border-game-border pt-3 pb-1"
          role="group"
          aria-label={`${activeSeries.series} binders`}
        >
          <button
            type="button"
            aria-pressed={scope.setId === 'all'}
            onClick={() => onSelectSet('all')}
            className={`game-focus-ring min-h-16 w-36 shrink-0 snap-start rounded-lg border px-3 py-2 text-left transition-colors ${
              scope.setId === 'all'
                ? 'border-game-ochre bg-game-ochre/10'
                : 'border-game-border bg-game-surface-raised hover:border-game-ochre/40'
            }`}
          >
            <span className="block truncate font-display text-sm font-semibold text-game-ink">
              Whole series
            </span>
            <span className="mt-1 block font-mono text-[10px] text-game-muted">
              {activeSeries.unique}/{activeSeries.total}
            </span>
          </button>
          {activeSeries.sets.map((set) => {
            const progress = progressBySet.get(set.id) || {
              unique: 0,
              total: set.total,
            }
            return (
              <button
                type="button"
                key={set.id}
                aria-pressed={scope.setId === set.id}
                onClick={() => onSelectSet(set.id)}
                className={`game-focus-ring flex min-h-16 w-48 shrink-0 snap-start items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors ${
                  scope.setId === set.id
                    ? 'border-game-ochre bg-game-ochre/10'
                    : 'border-game-border bg-game-surface-raised hover:border-game-ochre/40'
                }`}
              >
                <ItemSprite
                  itemId={`binder-${set.id}`}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0"
                />
                <span className="min-w-0">
                  <span className="block truncate font-display text-sm font-semibold text-game-ink">
                    {set.name}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] text-game-muted">
                    {progress.unique}/{progress.total} cards
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

const TcgCardItem = memo(function TcgCardItem({
  card,
  entry,
  slot,
  onClick,
}: {
  card: TcgCard
  set: TcgSet
  entry?: { quantity: number }
  slot: number
  onClick: () => void
}) {
  const ownedQuantity = entry?.quantity ?? 0
  const isOwned = ownedQuantity > 0
  const imageSrc = isOwned
    ? card.images.small || card.images.large
    : '/images/tcg-back.avif'

  return (
    <button
      type="button"
      onClick={isOwned ? onClick : undefined}
      disabled={!isOwned}
      aria-label={getTcgCardAccessibleLabel({
        isOwned,
        name: card.name,
        number: card.number,
        slot,
      })}
      className={`game-focus-ring relative aspect-[240/330] w-full overflow-hidden rounded-sm border border-transparent transition-colors ${
        isOwned
          ? 'cursor-pointer hover:border-game-moss/45'
          : 'cursor-default opacity-60 grayscale'
      }`}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={isOwned ? card.name : ''}
          fill
          sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 15vw"
          className="object-contain"
          loading="lazy"
        />
      )}

      {/* Quantity Badge */}
      {isOwned && (
        <div className="absolute bottom-1 left-1 z-10">
          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-game-border bg-game-surface font-mono text-[10px] font-bold text-game-ink shadow-sm">
            {ownedQuantity}
          </div>
        </div>
      )}
    </button>
  )
})
