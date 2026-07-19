'use client'

import { Save, Wand2, X } from 'lucide-react'
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
import { getAllTcgSets } from '@/utilities/tcg/tcg'
import type { TcgBattleEnergyType } from '@/utilities/tcg/tcg-battle'

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

  const inventory = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )
  const hasDeckBox = (inventory['deck-box'] || 0) > 0

  const generationOptions = useMemo(() => {
    const series = Array.from(
      new Set(getAllTcgSets().map((set) => set.series)),
    ).sort((a, b) => a.localeCompare(b))
    return series.map((entry) => ({
      id: entry,
      label: entry.replace('&', 'and'),
    }))
  }, [])

  const cardLabelById = useMemo(() => {
    const map = new Map<string, string>()
    for (const set of getAllTcgSets()) {
      for (const card of set.cards) {
        map.set(card.id, `${card.name} #${card.number}`)
      }
    }
    return map
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
  const activeEnergy = activeDeckEntry?.energy || ''
  const activeValidation = deckValidation[selectedGeneration]?.[deckFormat]
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

        <div className="flex flex-wrap gap-2">
          {activeDeck.length === 0 ? (
            <span className="rounded-lg border border-dashed border-game-border bg-game-surface-raised px-3 py-2 text-sm text-game-muted">
              No cards selected. Use Auto fill to draft a legal starting deck.
            </span>
          ) : (
            activeDeck.map((cardId) => (
              <button
                type="button"
                key={cardId}
                aria-label={`Remove ${cardLabelById.get(cardId) || cardId} from deck`}
                className="game-focus-ring inline-flex min-h-10 items-center gap-2 rounded-lg border border-game-border bg-game-surface-raised px-3 py-1 text-xs text-game-ink transition-colors hover:border-game-clay hover:text-game-clay-strong"
                onClick={() => removeCardFromDeck(cardId)}
              >
                <span className="max-w-[220px] truncate">
                  {cardLabelById.get(cardId) || cardId}
                </span>
                <X className="h-3 w-3" />
              </button>
            ))
          )}
        </div>

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
            <span className="text-xs font-medium text-game-muted" role="status" aria-live="polite">
              {deckMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
