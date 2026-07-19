'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { RewardSummaryDisplay } from '@/components/game/reward-summary'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import { PremiumSearch } from '@/components/game/shared/PremiumSearch'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import { Button } from '@/components/ui/button'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import pokemonData from '@/data/pokemon-data'
import type { TcgCard, TcgSet } from '@/data/tcg/types'
import { useGameUserData } from '@/hooks/useGameUserData'
import { useTCG } from '@/hooks/useTCG'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import { getAllTcgSets } from '@/utilities/tcg/tcg'
import type { TcgBattleEnergyType } from '@/utilities/tcg/tcg-battle'
import { getVisibleItems } from '@/utilities/ui/progressive-list'
import { crystallizeDuplicates, getTcgDecks, saveTcgDeck } from './actions'

const INITIAL_CARD_BATCH_SIZE = 80
const CARD_BATCH_INCREMENT = 80
const CARD_CRYSTALIZER_ITEM_ID = 'card-crystalizer'
type DeckFormat = 'baby' | 'champions' | 'masters'
const DECK_FORMATS: { id: DeckFormat; label: string }[] = [
  { id: 'baby', label: 'Baby' },
  { id: 'champions', label: 'Champions' },
  { id: 'masters', label: 'Masters' },
]

export default function TcgExplorerPage() {
  const {
    entriesByCard,
    isLoading: collectionLoading,
    error: collectionError,
    summary: collectionSummary,
    refreshCollection,
  } = useTCG()
  const { refreshUser } = useUser()
  const gameData = useGameUserData()

  const [selectedSetId, setSelectedSetId] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
    null,
  )
  const [selectedCard, setSelectedCard] = useState<{
    card: TcgCard
    set: TcgSet
  } | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [crystalizing, setCrystalizing] = useState(false)
  const [rewardSummary, setRewardSummary] = useState<RewardSummary | null>(null)
  const [generationDecks, setGenerationDecks] = useState<
    Record<
      string,
      Partial<
        Record<DeckFormat, { cards: string[]; energy?: TcgBattleEnergyType }>
      >
    >
  >({})
  const [deckMessage, setDeckMessage] = useState<string>('')
  const [visibleCardCount, setVisibleCardCount] = useState(
    INITIAL_CARD_BATCH_SIZE,
  )
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
    const allSets = getAllTcgSets().sort((a, b) => a.name.localeCompare(b.name))
    return allSets.filter((set) => {
      const binderId = `binder-${set.id}`
      return (inventory[binderId] || 0) > 0
    })
  }, [gameData, inventory])

  // Select first set if none selected and sets are available
  useEffect(() => {
    if (
      (!selectedSetId || !sets.find((s) => s.id === selectedSetId)) &&
      sets.length > 0
    ) {
      setSelectedSetId(sets[0].id)
    }
  }, [sets, selectedSetId])

  const pokemonList = useMemo(() => {
    return pokemonData.map((p) => ({
      id: p.id,
      name: p.forms.find((f) => f.form === 'base')?.name || p.forms[0].name,
    }))
  }, [])

  const filteredPokemon = useMemo(() => {
    if (!searchQuery) return []
    const query = searchQuery.toLowerCase()
    return pokemonList
      .filter((p) => p.name.toLowerCase().includes(query))
      .slice(0, 50) // Limit results for performance
  }, [pokemonList, searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handlePokemonSelect = (pokemon: { id: number; name: string }) => {
    setSelectedPokemonId(pokemon.id)
    setSearchQuery(pokemon.name)
    setShowDropdown(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setSelectedPokemonId(null)
    setShowDropdown(true)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSelectedPokemonId(null)
    setShowDropdown(false)
  }

  /* FILTERING LOGIC */
  const filteredCards = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()
    const matchingPokemonIds = normalizedSearch
      ? new Set(
          pokemonList
            .filter((pokemon) =>
              pokemon.name.toLowerCase().includes(normalizedSearch),
            )
            .map((pokemon) => pokemon.id),
        )
      : null
    // Any Pokemon search spans every owned binder. Selecting a suggestion uses
    // its exact Pokedex id; free text matches the visible Pokemon suggestions.
    const isGlobalSearch = !!selectedPokemonId || normalizedSearch.length > 0

    if (!selectedSetId && !isGlobalSearch) return []

    const cards: { card: TcgCard; set: TcgSet }[] = []

    sets.forEach((set) => {
      // If we ARE NOT doing a global search, respect the selected set
      if (!isGlobalSearch) {
        if (
          selectedSetId &&
          selectedSetId !== 'all' &&
          set.id !== selectedSetId
        )
          return
      }

      set.cards.forEach((card) => {
        // If a pokemon is selected, filter by national pokedex number
        if (selectedPokemonId) {
          if (!card.nationalPokedexNumbers.includes(selectedPokemonId)) return
        } else if (
          matchingPokemonIds &&
          !card.nationalPokedexNumbers.some((id) => matchingPokemonIds.has(id))
        ) {
          return
        }

        cards.push({ card, set })
      })
    })

    return cards
  }, [sets, selectedSetId, selectedPokemonId, searchQuery, pokemonList])

  useEffect(() => {
    setVisibleCardCount(INITIAL_CARD_BATCH_SIZE)
  }, [selectedSetId, selectedPokemonId, searchQuery])

  useEffect(() => {
    if (inView) {
      setVisibleCardCount((prev) => prev + CARD_BATCH_INCREMENT)
    }
  }, [inView])

  const visibleCards = useMemo(
    () => getVisibleItems(filteredCards, visibleCardCount),
    [filteredCards, visibleCardCount],
  )
  const hasMoreCards = visibleCardCount < filteredCards.length

  useEffect(() => {
    if (!gameData || !hasDeckBox) return
    let mounted = true
    getTcgDecks().then((result) => {
      if (!mounted) return
      if (result.ok) {
        setGenerationDecks(result.generationDecks || {})
      } else if (result.error) {
        setDeckMessage(result.error)
      }
    })
    return () => {
      mounted = false
    }
  }, [gameData, hasDeckBox])

  const toggleCardInGenerationDeck = async (
    generation: string,
    format: DeckFormat,
    cardId: string,
  ) => {
    const currentDeck = generationDecks[generation]?.[format]?.cards || []
    const currentEnergy = generationDecks[generation]?.[format]?.energy
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

  const totalCards = useMemo(
    () => sets.reduce((sum, set) => sum + set.cards.length, 0),
    [sets],
  )

  const currentSetStats = useMemo(() => {
    if (searchQuery.trim()) {
      const total = filteredCards.length
      const unique = filteredCards.reduce((count, { card }) => {
        return count + ((entriesByCard[card.id]?.quantity || 0) > 0 ? 1 : 0)
      }, 0)
      return { unique, total }
    }

    if (!selectedSetId || selectedSetId === 'all') {
      return {
        unique: collectionSummary.uniqueCards,
        total: totalCards,
      }
    }

    const set = sets.find((s) => s.id === selectedSetId)
    if (!set) return { unique: 0, total: 0 }

    const total = set.cards.length
    const unique = set.cards.reduce((count, card) => {
      return count + ((entriesByCard[card.id]?.quantity || 0) > 0 ? 1 : 0)
    }, 0)

    return { unique, total }
  }, [
    selectedSetId,
    sets,
    collectionSummary,
    entriesByCard,
    selectedPokemonId,
    searchQuery,
    filteredCards,
  ])

  return (
    <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <PremiumHeader title="Carddex" subtitle="Collection" />

      <div className="hidden items-center gap-3 border-b border-game-border bg-game-surface/70 px-6 py-3 xl:flex">
        <div className="relative min-w-0 flex-1">
          <PremiumSearch
            placeholder="Search Pokémon"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            showClear={!!searchQuery}
            onClear={clearSearch}
          />
          {showDropdown && filteredPokemon.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-auto rounded-lg border border-game-border bg-game-surface-raised shadow-xl">
              {filteredPokemon.map((p) => (
                <button
                  type="button"
                  key={`desktop-${p.id}`}
                  onClick={() => handlePokemonSelect(p)}
                  className="game-focus-ring block min-h-10 w-full px-4 py-2 text-left text-sm transition-colors hover:bg-game-surface"
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="w-64 shrink-0">
          <PremiumSelect
            value={selectedSetId}
            onValueChange={setSelectedSetId}
            placeholder="Select a set"
            options={sets.map((set) => ({ id: set.id, label: set.name }))}
          />
        </div>
      </div>

      {/* Main Content - Scrollable with padding */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 pt-4">
        {/* Section Divider with Set Name/Pokemon Name and Stats */}
        <div className="mb-4">
          <SectionDivider className="mb-0 flex-1">
            {searchQuery
              ? searchQuery
              : selectedSetId
                ? sets.find((s) => s.id === selectedSetId)?.name || 'All Cards'
                : 'All Cards'}
            <span className="ml-2 text-xs font-normal text-game-muted">
              (
              {collectionLoading ? (
                '...'
              ) : (
                <>
                  <span className="text-game-ink">
                    {currentSetStats.unique}
                  </span>{' '}
                  / {currentSetStats.total}
                </>
              )}
              )
            </span>
          </SectionDivider>
        </div>

        {collectionError ? (
          <div className="game-folio-section mx-auto max-w-xl p-6 text-center">
            <p className="font-display text-lg font-semibold text-game-ink">
              The Carddex could not be opened
            </p>
            <p className="mt-2 text-sm text-game-muted">
              Check your connection, then reload the collection.
            </p>
            <Button className="mt-4" onClick={() => refreshCollection()}>
              Reload collection
            </Button>
          </div>
        ) : sets.length === 0 && !collectionLoading ? (
          <div className="game-folio-section mx-auto max-w-xl p-6 text-center">
            <p className="font-display text-lg font-semibold text-game-ink">
              No binders recorded yet
            </p>
            <p className="mt-2 text-sm text-game-muted">
              Find a card binder during your travels to begin this collection.
            </p>
          </div>
        ) : visibleCards.length === 0 && !collectionLoading ? (
          <div className="game-folio-section mx-auto max-w-xl p-6 text-center">
            <p className="font-display text-lg font-semibold text-game-ink">
              No cards match this search
            </p>
            <p className="mt-2 text-sm text-game-muted">
              Clear your search or choose another binder.
            </p>
            {searchQuery && (
              <Button variant="outline" className="mt-4" onClick={clearSearch}>
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 pb-8 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10">
            {visibleCards.map(({ card, set }) => (
              <TcgCardItem
                key={card.id}
                card={card}
                set={set}
                entry={entriesByCard[card.id]}
                onClick={() => setSelectedCard({ card, set })}
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

      <SecondaryControlBar className="xl:hidden">
        <div
          className="grid grid-cols-[minmax(0,1fr)_minmax(8rem,0.5fr)] gap-2"
          ref={dropdownRef}
        >
          <div className="relative">
            <PremiumSearch
              placeholder="Search Pokémon"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(true)}
              showClear={!!searchQuery}
              onClear={clearSearch}
            />
            {showDropdown && filteredPokemon.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 z-50 mb-2 max-h-60 overflow-auto rounded-lg border border-game-border bg-game-surface-raised shadow-lg">
                {filteredPokemon.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => handlePokemonSelect(p)}
                    className="game-focus-ring block min-h-10 w-full cursor-pointer px-4 py-2 text-left text-sm text-game-ink transition-colors hover:bg-game-surface"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <PremiumSelect
            value={selectedSetId}
            onValueChange={setSelectedSetId}
            placeholder="Select a set"
            options={sets.map((set) => ({ id: set.id, label: set.name }))}
          />
        </div>
      </SecondaryControlBar>

      {/* Card Details Drawer */}
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
        mobileHeader={false}
        className="gap-0 overflow-hidden bg-game-surface p-0 text-game-ink"
      >
        {selectedCard && (
          <div className="custom-scrollbar w-full space-y-6 overflow-y-auto p-5 md:p-6">
            <div className="flex flex-col items-center gap-6">
              {/* Large Card Image */}
              <div>
                <div className="relative aspect-[240/330] w-56 overflow-hidden rounded-lg border border-game-border bg-game-canvas md:w-72">
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
              <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="font-display text-2xl font-semibold text-game-ink md:text-3xl">
                    {selectedCard.card.name}
                  </h2>
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-px w-4 bg-game-ochre/45" />
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
                    <span className="h-px w-4 bg-game-ochre/45" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-game-border bg-game-surface-raised p-4">
                      <SectionDivider className="mb-2">Set</SectionDivider>
                      <p className="text-center font-bold tracking-tight text-game-ink">
                        {selectedCard.set.name}
                      </p>
                    </div>
                    <div className="rounded-lg border border-game-border bg-game-surface-raised p-4">
                      <SectionDivider className="mb-2">Number</SectionDivider>
                      <p className="text-center font-mono font-bold text-game-ink">
                        {selectedCard.card.number}
                      </p>
                    </div>
                  </div>

                  {selectedCard.card.artist && (
                    <div className="rounded-lg border border-game-border bg-game-surface-raised p-4">
                      <SectionDivider className="mb-2">Artist</SectionDivider>
                      <p className="text-center font-bold italic tracking-tight text-game-ink">
                        {selectedCard.card.artist}
                      </p>
                    </div>
                  )}
                </div>

                {/* Collection Status / Actions */}
                {/* Crystalise Section */}
                {rewardSummary ? (
                  <div className="animate-in fade-in zoom-in duration-500 space-y-4">
                    <RewardSummaryDisplay
                      summary={rewardSummary}
                      title="Crystallized"
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
                          disabled={crystalizing}
                          onClick={async () => {
                            if (crystalizing) return
                            setCrystalizing(true)
                            try {
                              const result = await crystallizeDuplicates(
                                selectedCard.card.id,
                              )
                              if (result.ok && result.summary) {
                                setRewardSummary(result.summary)
                                refreshCollection()
                                refreshUser()
                              }
                            } catch (e) {
                              // Silent error
                            } finally {
                              setCrystalizing(false)
                            }
                          }}
                        >
                          {crystalizing ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-game-cream" />
                          )}
                          <span className="text-sm font-semibold">
                            {crystalizing
                              ? 'Crystallizing…'
                              : `Crystallize ${
                                  (entriesByCard[selectedCard.card.id]
                                    ?.quantity || 0) - 1
                                } cards`}
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
                            return (
                              <Button
                                key={format.id}
                                variant={isInDeck ? 'default' : 'outline'}
                                className="w-full justify-between"
                                disabled={!isInDeck && deck.length >= 15}
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
                                    : `Add to ${format.label}`}
                                </span>
                                <span className="text-xs font-mono text-game-muted">
                                  {deck.length}/15
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
    </div>
  )
}

const TcgCardItem = memo(function TcgCardItem({
  card,
  entry,
  onClick,
}: {
  card: TcgCard
  set: TcgSet
  entry?: { quantity: number }
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
      aria-label={
        isOwned
          ? `View ${card.name} card ${card.number}`
          : `${card.name} card ${card.number}, not owned`
      }
      className={`game-focus-ring relative aspect-[240/330] w-full overflow-hidden rounded-sm border border-transparent transition-colors ${
        isOwned
          ? 'cursor-pointer hover:border-game-moss/45'
          : 'cursor-default opacity-60 grayscale'
      }`}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={card.name}
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
