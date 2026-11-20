'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
  autoBuildTcgDeck,
  getTcgDecks,
  saveTcgDeck,
} from '@/app/(frontend)/game/tcg/actions'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import type { TcgCard } from '@/data/tcg/types'
import { APP_VERSION } from '@/utilities/app-version'
import { getTcgSeriesInReleaseOrder } from '@/utilities/tcg/set-order'
import { getTcgCardSeriesById } from '@/utilities/tcg/tcg'
import {
  calculateTcgBattleCardCost,
  type TcgBattleEnergyType,
} from '@/utilities/tcg/tcg-battle'

type DeckEntry = { cards: string[]; energy?: TcgBattleEnergyType }

type DeckValidation = { valid: boolean; errors: string[]; totalCost: number }

export function TcgDecksPanel({
  selectedGeneration,
  setSelectedGeneration,
}: {
  selectedGeneration: string
  setSelectedGeneration: (generation: string) => void
}) {
  const { gameData } = useUser()
  const [generationDecks, setGenerationDecks] = useState<
    Record<string, DeckEntry>
  >({})
  const [deckValidation, setDeckValidation] = useState<
    Record<string, DeckValidation>
  >({})
  const [deckMessage, setDeckMessage] = useState('')
  const [deckBusy, setDeckBusy] = useState(false)
  const [cardsById, setCardsById] = useState<Map<string, TcgCard>>(
    () => new Map(),
  )
  const [cardCatalogState, setCardCatalogState] = useState<
    'idle' | 'loading' | 'error'
  >('idle')

  const inventory = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )
  const hasDeckBox = (inventory['deck-box'] || 0) > 0

  const generationOptions = useMemo(() => {
    const ownedSeries = new Set(
      (gameData?.tcg || [])
        .filter((card) => card.quantity > 0)
        .map((card) => getTcgCardSeriesById(card.cardId))
        .filter((value): value is string => Boolean(value)),
    )
    const series = getTcgSeriesInReleaseOrder(tcgSetSummaries).filter((value) => ownedSeries.has(value))
    return series.map((entry) => ({
      id: entry,
      label: entry.replace('&', 'and'),
    }))
  }, [gameData?.tcg])

  useEffect(() => {
    if (
      generationOptions.length > 0 &&
      !generationOptions.some((option) => option.id === selectedGeneration)
    ) {
      setSelectedGeneration(generationOptions[0].id)
    }
  }, [selectedGeneration, generationOptions])

  useEffect(() => {
    if (!gameData || !hasDeckBox) return
    let mounted = true
    getTcgDecks().then((result) => {
      if (!mounted) return
      if (!result.ok) {
        setDeckMessage(result.error || 'Unable to load decks.')
        return
      }
      setGenerationDecks(result.generationDecks || {})
      setDeckValidation(result.validation || {})
      if (result.resetLegacyDecks) {
        setDeckMessage('Old decks cleared. Build one new 15-card deck for each series.')
      }
      if (
        !selectedGeneration &&
        result.generations &&
        result.generations.length > 0
      ) {
        setSelectedGeneration(result.generations[0])
      }
    })
    return () => {
      mounted = false
    }
  }, [gameData, hasDeckBox, selectedGeneration])

  const activeDeckEntry = generationDecks[selectedGeneration]
  const activeDeck = activeDeckEntry?.cards || []
  const activeDeckKey = activeDeck.join(',')
  const activeEnergy = activeDeckEntry?.energy || ''
  const activeValidation = deckValidation[selectedGeneration]
  useEffect(() => {
    if (activeDeck.length === 0) {
      setCardsById(new Map())
      setCardCatalogState('idle')
      return
    }
    setCardCatalogState('loading')
    const controller = new AbortController()
    const params = new URLSearchParams({
      v: APP_VERSION,
      cardIds: activeDeck.join(','),
      limit: String(activeDeck.length),
    })
    fetch(`/api/game/catalog/tcg?${params}`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((result: { items?: Array<{ card: TcgCard }> }) => {
        setCardsById(
          new Map((result.items || []).map(({ card }) => [card.id, card])),
        )
        setCardCatalogState('idle')
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setCardCatalogState('error')
      })
    return () => controller.abort()
  }, [activeDeckKey])
  const activeCost = useMemo(() => {
    const hasAllCards = activeDeck.every((cardId) => cardsById.has(cardId))
    if (hasAllCards) {
      return activeDeck.reduce(
        (total, cardId) =>
          total + calculateTcgBattleCardCost(cardsById.get(cardId)!),
        0,
      )
    }
    return activeValidation?.totalCost || 0
  }, [activeDeck, activeValidation?.totalCost, cardsById])
  const costLimit = 60
  const seriesSet = tcgSetSummaries.find((set) => set.series === selectedGeneration)
  const energyOptions = useMemo(
    () =>
      [
        'Grass',
        'Fire',
        'Water',
        'Lightning',
        'Psychic',
        'Fighting',
        'Darkness',
        'Metal',
        'Fairy',
        'Dragon',
        'Colorless',
      ].map((energy) => ({ id: energy, label: energy })),
    [],
  )

  const saveActiveDeck = async () => {
    if (!selectedGeneration) return
    setDeckBusy(true)
    setDeckMessage('')
    const result = await saveTcgDeck(
      selectedGeneration,
      activeDeck,
      activeEnergy || null,
    )
    setDeckBusy(false)
    if (result.ok) {
      setGenerationDecks(result.generationDecks || {})
      setDeckMessage('Deck saved.')
      return
    }
    setDeckMessage(result.error || 'Unable to save deck.')
  }

  const autoBuildActiveDeck = async () => {
    if (!selectedGeneration) return
    setDeckBusy(true)
    setDeckMessage('')
    const result = await autoBuildTcgDeck(selectedGeneration)
    setDeckBusy(false)
    if (result.ok) {
      setGenerationDecks(result.generationDecks || {})
      setDeckMessage('Deck auto-built.')
      return
    }
    setDeckMessage(result.error || 'Unable to auto-build deck.')
  }

  const removeCardFromDeck = (cardId: string) => {
    if (!selectedGeneration) return
    setDeckMessage('')
    setGenerationDecks((current) => ({
      ...current,
      [selectedGeneration]: {
        ...(current[selectedGeneration] || {}),
        cards: (current[selectedGeneration]?.cards || []).filter((id) => id !== cardId),
      },
    }))
  }

  if (!hasDeckBox) return null

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="game-paper-background min-h-full space-y-5 bg-game-surface/75 p-4 md:p-6">
        <header className="relative isolate flex min-h-32 items-end overflow-hidden rounded-2xl bg-gradient-to-br from-game-moss/90 via-game-moss/70 to-game-ink px-5 py-4 text-game-cream shadow-md md:min-h-40 md:px-8">
          {seriesSet?.images.logo && (
            <Image
              src={seriesSet.images.logo}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 70vw"
              className="-z-10 object-contain object-right p-4 opacity-30"
            />
          )}
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-game-cream/75">Trading Card Game</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">{selectedGeneration || 'Choose a series'}</h2>
          </div>
          <span className="relative ml-auto text-right text-xs font-bold uppercase tracking-[0.12em] text-game-cream/90">
            {activeDeck.length}/15 cards · Cost{' '}
            <span
              className={
                activeCost > costLimit
                  ? 'text-game-danger'
                  : 'text-game-moss-strong'
              }
            >
              {activeCost}/{costLimit}
            </span>
          </span>
        </header>
        <PremiumSelect
          label="Turn 15 Energy Type"
          value={activeEnergy}
          onValueChange={(value) =>
            setGenerationDecks((current) => ({
              ...current,
              [selectedGeneration]: {
                ...(current[selectedGeneration] || {}),
                cards: current[selectedGeneration]?.cards || [],
                energy: (value || undefined) as TcgBattleEnergyType | undefined,
              },
            }))
          }
          options={energyOptions}
        />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-8">
          {activeDeck.length === 0 ? (
            <span className="col-span-full px-2 py-5 text-sm text-game-muted">
              No cards yet. Add cards from the CardDex or use Auto Fill.
            </span>
          ) : (
            activeDeck.map((cardId, index) => {
              const card = cardsById.get(cardId)
              const cardCost = card ? calculateTcgBattleCardCost(card) : null
              return (
                <button
                  type="button"
                  key={cardId}
                  data-haptic-disabled="true"
                  aria-label={`Remove ${card?.name || cardId} from deck`}
                  className="game-focus-ring group min-w-0 text-left"
                  onClick={() => removeCardFromDeck(cardId)}
                >
                  <div className="relative aspect-[2.5/3.5] overflow-hidden rounded-md border border-game-border bg-game-surface-raised shadow-sm transition-colors group-hover:border-game-clay">
                    <Image
                      src={
                        card?.images.large ||
                        card?.images.small ||
                        '/images/tcg-back.avif'
                      }
                      alt={card?.name || cardId}
                      fill
                      sizes="(max-width: 640px) 30vw, (max-width: 1024px) 18vw, 110px"
                      className="object-cover"
                      priority={index < 3}
                    />
                    <span className="absolute left-1 top-1 rounded bg-game-ink/85 px-1.5 py-0.5 text-[10px] font-bold text-game-cream">
                      {cardCost === null ? '…' : `Cost ${cardCost}`}
                    </span>
                    <span className="absolute right-1 top-1 rounded-md bg-game-clay px-1.5 py-0.5 text-[9px] font-bold uppercase text-game-cream">
                      Remove
                    </span>
                  </div>
                  <span className="mt-1 block truncate text-[10px] font-semibold text-game-ink">
                    {card?.name || cardId}
                  </span>
                </button>
              )
            })
          )}
        </div>

        {cardCatalogState === 'loading' && (
          <p
            className="text-xs text-game-muted"
            role="status"
            aria-live="polite"
          >
            Loading card details…
          </p>
        )}
        {cardCatalogState === 'error' && (
          <p
            className="rounded-md border border-game-danger/25 bg-game-danger/5 px-3 py-2 text-xs text-game-danger"
            role="alert"
          >
            Card art and costs could not be loaded. You can still edit and save
            this deck.
          </p>
        )}

        {activeValidation &&
          !activeValidation.valid &&
          activeValidation.errors.length > 0 && (
            <p className="rounded-md border border-game-ochre/35 bg-game-ochre/10 px-3 py-2 text-xs text-game-ochre">
              {activeValidation.errors[0]}
            </p>
          )}

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={deckBusy}
            aria-busy={deckBusy}
            onClick={autoBuildActiveDeck}
            className="min-h-11"
          >
            Auto Fill
          </Button>
          <Button
            size="sm"
            disabled={deckBusy}
            aria-busy={deckBusy}
            onClick={saveActiveDeck}
            className="min-h-11"
          >
            Save deck
          </Button>
          {deckMessage && (
            <span
              className="text-xs font-medium text-game-muted"
              role="status"
              aria-live="polite"
            >
              {deckMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
