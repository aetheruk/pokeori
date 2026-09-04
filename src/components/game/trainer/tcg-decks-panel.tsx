'use client'

import { Save, Wand2, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
  autoBuildTcgDeck,
  getTcgDecks,
  saveTcgDeck,
} from '@/app/(frontend)/game/tcg/actions'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import type { TcgCard } from '@/data/tcg/types'
import { APP_VERSION } from '@/utilities/app-version'
import { getTcgSeriesInReleaseOrder } from '@/utilities/tcg/set-order'
import {
  calculateTcgBattleCardCost,
  type TcgBattleEnergyType,
} from '@/utilities/tcg/tcg-battle'

export type DeckFormat = 'baby' | 'champions' | 'masters'
type DeckEntry = { cards: string[]; energy?: TcgBattleEnergyType }

type DeckValidation = { valid: boolean; errors: string[]; totalCost: number }

const DECK_FORMATS: { id: DeckFormat; label: string; cap: number }[] = [
  { id: 'baby', label: 'Baby', cap: 30 },
  { id: 'champions', label: 'Champions', cap: 55 },
  { id: 'masters', label: 'Masters', cap: 85 },
]

export function TcgDecksPanel({
  deckFormat,
  setDeckFormat,
  selectedGeneration,
  setSelectedGeneration,
}: {
  deckFormat: DeckFormat
  setDeckFormat: (format: DeckFormat) => void
  selectedGeneration: string
  setSelectedGeneration: (generation: string) => void
}) {
  const { gameData } = useUser()
  const [generationDecks, setGenerationDecks] = useState<
    Record<string, Partial<Record<DeckFormat, DeckEntry>>>
  >({})
  const [deckValidation, setDeckValidation] = useState<
    Record<string, Record<DeckFormat, DeckValidation>>
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
    const series = getTcgSeriesInReleaseOrder(tcgSetSummaries)
    return series.map((entry) => ({
      id: entry,
      label: entry.replace('&', 'and'),
    }))
  }, [])

  useEffect(() => {
    if (!selectedGeneration && generationOptions.length > 0) {
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
      setDeckValidation(
        (result.validation || {}) as Record<
          string,
          Record<DeckFormat, DeckValidation>
        >,
      )
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

  const activeDecks = generationDecks[selectedGeneration] || {}
  const activeDeckEntry = activeDecks[deckFormat]
  const activeDeck = activeDeckEntry?.cards || []
  const activeDeckKey = activeDeck.join(',')
  const activeEnergy = activeDeckEntry?.energy || ''
  const activeValidation = deckValidation[selectedGeneration]?.[deckFormat]
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
  const activeFormat = DECK_FORMATS.find((format) => format.id === deckFormat)
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
      deckFormat,
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
    const result = await autoBuildTcgDeck(selectedGeneration, deckFormat)
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
        [deckFormat]: {
          cards: (
            current[selectedGeneration]?.[deckFormat]?.cards || []
          ).filter((id) => id !== cardId),
          energy: current[selectedGeneration]?.[deckFormat]?.energy,
        },
      },
    }))
  }

  if (!hasDeckBox) return null

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="game-paper-background space-y-4 rounded-xl border border-game-border bg-game-surface p-4 shadow-sm">
        <SectionDivider className="mb-1">TCG Generation Decks</SectionDivider>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-game-border bg-game-surface-raised px-3 py-2">
          <span className="text-sm font-semibold text-game-ink">
            {activeFormat?.label} Deck
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-game-muted">
            Deck cost{' '}
            <span
              className={
                activeCost > (activeFormat?.cap || 0)
                  ? 'text-game-danger'
                  : 'text-game-moss-strong'
              }
            >
              {activeCost}/{activeFormat?.cap}
            </span>
          </span>
        </div>
        <PremiumSelect
          label="Battle Energy Card (Activates Turn 15)"
          value={activeEnergy}
          onValueChange={(value) =>
            setGenerationDecks((current) => ({
              ...current,
              [selectedGeneration]: {
                ...(current[selectedGeneration] || {}),
                [deckFormat]: {
                  cards: current[selectedGeneration]?.[deckFormat]?.cards || [],
                  energy: (value || undefined) as
                    | TcgBattleEnergyType
                    | undefined,
                },
              },
            }))
          }
          options={energyOptions}
        />

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-8">
          {activeDeck.length === 0 ? (
            <span className="col-span-full rounded-lg border border-dashed border-game-border bg-game-surface-raised px-3 py-2 text-sm text-game-muted">
              No cards selected. Use Auto fill to draft a legal starting deck.
            </span>
          ) : (
            activeDeck.map((cardId, index) => {
              const card = cardsById.get(cardId)
              const cardCost = card ? calculateTcgBattleCardCost(card) : null
              return (
                <button
                  type="button"
                  key={cardId}
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
                    <span className="absolute right-1 top-1 rounded-md bg-game-clay p-1 text-game-cream">
                      <X className="h-3 w-3" />
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
            className="rounded-lg border border-game-danger/25 bg-game-danger/5 px-3 py-2 text-xs text-game-danger"
            role="alert"
          >
            Card art and costs could not be loaded. You can still edit and save
            this deck.
          </p>
        )}

        {activeValidation &&
          !activeValidation.valid &&
          activeValidation.errors.length > 0 && (
            <p className="rounded-lg border border-game-ochre/35 bg-game-ochre/10 px-3 py-2 text-xs text-game-ochre">
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
            <Wand2 className="h-4 w-4 mr-2" />
            Auto Fill
          </Button>
          <Button
            size="sm"
            disabled={deckBusy}
            aria-busy={deckBusy}
            onClick={saveActiveDeck}
            className="min-h-11"
          >
            <Save className="h-4 w-4 mr-2" />
            Save {DECK_FORMATS.find((f) => f.id === deckFormat)?.label} Deck
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
