'use client'

import { Flame, Loader2, Minus, Plus, Sparkles, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import {
  type GenericResult,
  RewardResultOverlay,
} from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { items } from '@/data/items'
import {
  BOOK_OF_CHANNELING_ITEM_ID,
  getSpiritChannelingActivityId,
  getSpiritChannelingConfigForMemento,
  SPIRIT_CHANNELING_CONFIGS,
  SPIRIT_CHANNELING_INCENSE_ITEMS,
  SPIRIT_CHANNELING_OFFERING_ITEMS,
  type SpiritChannelingOfferingItem,
} from '@/data/spirit-channeling'
import { cn } from '@/lib/utils'
import type { Pokemon } from '@/payload-types'
import { getOwnedPokemonGender } from '@/utilities/pokemon/gender'
import { getPokemonForm, getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { beginSpiritChanneling } from '@/utilities/spirit-channeling/actions'

type OfferingSlot = {
  itemId: string
  quantity: number
}

type CeremonyState = 'idle' | 'smoke' | 'ghost'
type IncenseOption = (typeof SPIRIT_CHANNELING_INCENSE_ITEMS)[number]

const EMPTY_SLOT: OfferingSlot = { itemId: '', quantity: 1 }

function itemName(itemId: string) {
  return items.find((item) => item.id === itemId)?.name || itemId
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isPsychicPokemon(pokemon: Pokemon) {
  return getPokemonForm(pokemon.formId)?.types?.some(
    (type) => type.toLowerCase() === 'psychic',
  )
}

function isChannelingComplete(
  researchEncounterResults:
    | NonNullable<
        ReturnType<typeof useUser>['gameData']
      >['researchEncounterResults']
    | undefined,
  activityId: string,
) {
  return (researchEncounterResults || []).some(
    (entry) => entry.encounterId === activityId && (entry.wins || 0) > 0,
  )
}

export function SpiritChannelingPanel() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestedMemento = searchParams.get('memento') || ''
  const { gameData, refreshUser, isLoading } = useUser()
  const [selectedMementoId, setSelectedMementoId] = useState('')
  const [selectedIncenseId, setSelectedIncenseId] = useState('')
  const [selectedPokemonId, setSelectedPokemonId] = useState('')
  const [activeOfferingSlotIndex, setActiveOfferingSlotIndex] = useState(0)
  const [offeringSlots, setOfferingSlots] = useState<OfferingSlot[]>([
    { ...EMPTY_SLOT },
    { ...EMPTY_SLOT },
    { ...EMPTY_SLOT },
  ])
  const [submitting, setSubmitting] = useState(false)
  const [isIncenseModalOpen, setIsIncenseModalOpen] = useState(false)
  const [isOfferingModalOpen, setIsOfferingModalOpen] = useState(false)
  const [isPokemonModalOpen, setIsPokemonModalOpen] = useState(false)
  const [ceremonyState, setCeremonyState] = useState<CeremonyState>('idle')
  const [ceremonyMessage, setCeremonyMessage] = useState('')
  const [rewardResult, setRewardResult] = useState<GenericResult | null>(null)
  const ceremonySectionRef = useRef<HTMLDivElement>(null)

  const inventoryMap = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )

  const hasBook = (inventoryMap[BOOK_OF_CHANNELING_ITEM_ID] || 0) > 0
  const availableConfigs = useMemo(
    () =>
      SPIRIT_CHANNELING_CONFIGS.filter((config) => {
        if ((inventoryMap[config.mementoItemId] || 0) <= 0) return false
        return !isChannelingComplete(
          gameData?.researchEncounterResults,
          getSpiritChannelingActivityId(config),
        )
      }),
    [gameData?.researchEncounterResults, inventoryMap],
  )

  const selectedConfig = getSpiritChannelingConfigForMemento(selectedMementoId)
  const headerTitle = selectedMementoId
    ? itemName(selectedMementoId)
    : 'Channeling'
  const ownedIncenses = SPIRIT_CHANNELING_INCENSE_ITEMS.filter(
    (incense) => (inventoryMap[incense.id] || 0) > 0,
  )
  const selectedIncenseName = itemName(selectedIncenseId)
  const ownedOfferings = SPIRIT_CHANNELING_OFFERING_ITEMS.filter(
    (offering) => (inventoryMap[offering.itemId] || 0) > 0,
  )
  const psychicPokemon = useMemo(
    () =>
      ((gameData?.pokemon || []) as Pokemon[])
        .filter(isPsychicPokemon)
        .sort((a, b) => Number(b.level || 0) - Number(a.level || 0)),
    [gameData?.pokemon],
  )
  const selectedPokemon = psychicPokemon.find(
    (pokemon) => pokemon.id === selectedPokemonId,
  )

  useEffect(() => {
    if (!hasBook || availableConfigs.length === 0) {
      setSelectedMementoId('')
      return
    }

    const requestedConfig = availableConfigs.find(
      (config) => config.mementoItemId === requestedMemento,
    )
    const currentConfig = availableConfigs.find(
      (config) => config.mementoItemId === selectedMementoId,
    )
    if (requestedConfig) {
      setSelectedMementoId(requestedConfig.mementoItemId)
    } else if (!currentConfig) {
      setSelectedMementoId(availableConfigs[0].mementoItemId)
    }
  }, [availableConfigs, hasBook, requestedMemento, selectedMementoId])

  useEffect(() => {
    if (
      selectedIncenseId &&
      !ownedIncenses.some((incense) => incense.id === selectedIncenseId)
    ) {
      setSelectedIncenseId('')
    }
  }, [ownedIncenses, selectedIncenseId])

  useEffect(() => {
    if (
      selectedPokemonId &&
      !psychicPokemon.some((pokemon) => pokemon.id === selectedPokemonId)
    ) {
      setSelectedPokemonId('')
    }
  }, [psychicPokemon, selectedPokemonId])

  const setSlotItem = useCallback(
    (index: number, itemId: string) => {
      setOfferingSlots((slots) =>
        slots.map((slot, slotIndex) =>
          slotIndex === index
            ? {
                itemId,
                quantity: itemId
                  ? Math.min(
                      Math.max(slot.quantity || 1, 1),
                      inventoryMap[itemId] || 1,
                    )
                  : 1,
              }
            : slot,
        ),
      )
    },
    [inventoryMap],
  )

  const clearSlotItem = useCallback((index: number) => {
    setOfferingSlots((slots) =>
      slots.map((slot, slotIndex) =>
        slotIndex === index ? { ...EMPTY_SLOT } : slot,
      ),
    )
  }, [])

  const adjustSlotQuantity = useCallback(
    (index: number, delta: number) => {
      setOfferingSlots((slots) =>
        slots.map((slot, slotIndex) => {
          if (slotIndex !== index || !slot.itemId) return slot
          return {
            ...slot,
            quantity: Math.min(
              inventoryMap[slot.itemId] || 1,
              Math.max(1, slot.quantity + delta),
            ),
          }
        }),
      )
    },
    [inventoryMap],
  )

  const canSubmit =
    hasBook &&
    !!selectedConfig &&
    !!selectedIncenseId &&
    !!selectedPokemonId &&
    offeringSlots.some((slot) => slot.itemId) &&
    !submitting

  const handleBegin = useCallback(async () => {
    if (!selectedConfig || !canSubmit) return

    setSubmitting(true)
    setCeremonyMessage('')
    setCeremonyState('smoke')
    requestAnimationFrame(() => {
      ceremonySectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    })

    try {
      const [result] = await Promise.all([
        beginSpiritChanneling({
          mementoItemId: selectedConfig.mementoItemId,
          incenseItemId: selectedIncenseId,
          pokemonId: selectedPokemonId,
          offerings: offeringSlots
            .filter((slot) => slot.itemId)
            .map((slot) => ({
              itemId: slot.itemId,
              quantity: slot.quantity,
            })),
          attemptId: crypto.randomUUID(),
        }),
        sleep(1800),
      ])

      if (result.success && result.summary) {
        setCeremonyState('ghost')
        await sleep(1200)
        refreshUser()
        setRewardResult({
          success: true,
          message: result.message,
          rewards: result.summary,
        })
        setCeremonyState('idle')
        return
      }

      setCeremonyState('idle')
      setCeremonyMessage(
        result.message ||
          result.error ||
          'There is no response from your channeling.',
      )
    } catch {
      setCeremonyState('idle')
      setCeremonyMessage('The ritual faltered.')
    } finally {
      setSubmitting(false)
    }
  }, [
    canSubmit,
    offeringSlots,
    refreshUser,
    selectedConfig,
    selectedIncenseId,
    selectedPokemonId,
  ])

  return (
    <div className="game-night flex h-full min-w-0 flex-col overflow-hidden bg-game-night-canvas text-game-night-ink">
      <PremiumHeader
        title={headerTitle}
        subtitle={selectedMementoId ? 'Channeling' : undefined}
      />

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-game-moss" />
          </div>
        ) : !hasBook ? (
          <EmptyState itemId={BOOK_OF_CHANNELING_ITEM_ID} title="Locked" />
        ) : availableConfigs.length === 0 ? (
          <EmptyState itemId="incense-memory" title="No Mementos" />
        ) : (
          <div className="mx-auto w-full max-w-3xl overflow-x-hidden px-4 pb-5 pt-4 md:px-6">
            <div className="min-w-0 space-y-7">
              <Section title="Ritual">
                <div className="flex flex-wrap justify-center gap-x-7 gap-y-4">
                  <IncenseSelector
                    selectedIncenseId={selectedIncenseId}
                    selectedIncenseName={selectedIncenseName}
                    disabled={ownedIncenses.length === 0}
                    onOpen={() => setIsIncenseModalOpen(true)}
                  />
                  <ChannelerSelector
                    pokemon={selectedPokemon}
                    minLevel={selectedConfig?.channelerMinLevel || 1}
                    disabled={psychicPokemon.length === 0}
                    onOpen={() => setIsPokemonModalOpen(true)}
                  />
                </div>
              </Section>

              <Section title="Offerings">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                  {offeringSlots.map((slot, index) => (
                    <OfferingSlotControl
                      key={index}
                      index={index}
                      slot={slot}
                      inventoryMap={inventoryMap}
                      onActivate={(slotIndex) => {
                        setActiveOfferingSlotIndex(slotIndex)
                        setIsOfferingModalOpen(true)
                      }}
                      onClear={clearSlotItem}
                      onQuantityChange={adjustSlotQuantity}
                    />
                  ))}
                </div>
              </Section>

              <Section title="Channeling">
                <div ref={ceremonySectionRef}>
                  <InlineCeremonyPanel
                    state={ceremonyState}
                    incenseItemId={selectedIncenseId}
                    message={ceremonyMessage}
                  />
                </div>
              </Section>

              <div className="hidden md:block">
                <ChannelingButton
                  canSubmit={canSubmit}
                  submitting={submitting}
                  onBegin={handleBegin}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {!isLoading && hasBook && availableConfigs.length > 0 && (
        <div className="shrink-0 border-t border-game-night-border bg-game-night-surface/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur md:hidden">
          <ChannelingButton
            canSubmit={canSubmit}
            submitting={submitting}
            onBegin={handleBegin}
          />
        </div>
      )}

      <IncensePickerDialog
        open={isIncenseModalOpen}
        onOpenChange={setIsIncenseModalOpen}
        incenses={ownedIncenses}
        selectedIncenseId={selectedIncenseId}
        onSelect={(incenseId) => {
          setSelectedIncenseId(incenseId)
          setIsIncenseModalOpen(false)
        }}
      />

      <OfferingPickerDialog
        open={isOfferingModalOpen}
        onOpenChange={setIsOfferingModalOpen}
        offerings={ownedOfferings}
        inventoryMap={inventoryMap}
        selectedItemId={offeringSlots[activeOfferingSlotIndex]?.itemId || ''}
        slotIndex={activeOfferingSlotIndex}
        onSelect={(itemId) => {
          setSlotItem(activeOfferingSlotIndex, itemId)
          setIsOfferingModalOpen(false)
        }}
      />

      <PokemonPickerDialog
        open={isPokemonModalOpen}
        onOpenChange={setIsPokemonModalOpen}
        pokemon={psychicPokemon}
        selectedPokemonId={selectedPokemonId}
        minLevel={selectedConfig?.channelerMinLevel || 1}
        onSelect={(pokemonId) => {
          setSelectedPokemonId(pokemonId)
          setIsPokemonModalOpen(false)
        }}
      />

      <RewardResultOverlay
        result={rewardResult}
        title="SPIRIT ANSWERED"
        message="The spirit answered your channeling."
        icon={{ type: 'pokemon', id: '92' }}
        iconAlt="Gastly"
        onClose={() => {
          setRewardResult(null)
          router.push('/game/inventory')
        }}
      />
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="min-w-0">
      <SectionDivider className="mb-0">{title}</SectionDivider>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function IncenseSelector({
  selectedIncenseId,
  selectedIncenseName,
  disabled,
  onOpen,
}: {
  selectedIncenseId: string
  selectedIncenseName: string
  disabled: boolean
  onOpen: () => void
}) {
  return (
    <div className="flex min-w-0 flex-col items-center">
      <button
        type="button"
        onClick={onOpen}
        disabled={disabled}
        className={cn(
          'game-focus-ring relative flex h-[72px] w-[72px] items-center justify-center rounded-lg border transition-colors disabled:opacity-50',
          selectedIncenseId
            ? 'border-game-moss/60 bg-game-moss/10'
            : 'border-game-border bg-game-surface/55 hover:border-game-moss/45',
        )}
        aria-label="Select incense"
        title="Select incense"
      >
        {selectedIncenseId ? (
          <ItemSprite
            itemId={selectedIncenseId}
            alt={selectedIncenseName}
            className="relative h-10 w-10 object-contain"
          />
        ) : (
          <Plus className="relative h-5 w-5 text-game-muted" />
        )}
      </button>
      <div className="mt-2 min-h-4 max-w-24 truncate px-1 text-center text-xs font-medium text-game-ink">
        {disabled
          ? 'No Incense'
          : selectedIncenseId
            ? selectedIncenseName
            : 'Select Incense'}
      </div>
    </div>
  )
}

function IncensePickerDialog({
  open,
  onOpenChange,
  incenses,
  selectedIncenseId,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  incenses: IncenseOption[]
  selectedIncenseId: string
  onSelect: (incenseId: string) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="game-paper-modal game-paper-texture max-h-[85vh] max-w-sm overflow-hidden rounded-xl border-game-border bg-game-surface p-0 shadow-xl">
        <div className="px-4 pb-5 pt-5">
          <DialogTitle className="text-left font-display text-lg font-semibold text-game-ink">
            Incense
          </DialogTitle>
          <DialogDescription className="sr-only">
            Choose an incense for the channeling.
          </DialogDescription>

          {incenses.length === 0 ? (
            <div className="rounded-lg border border-dashed border-game-border bg-game-surface-raised/55 py-8 text-center text-xs font-black uppercase tracking-[0.18em] text-game-muted">
              No incense available
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-3 gap-3">
              {incenses.map((incense) => (
                <button
                  key={incense.id}
                  type="button"
                  onClick={() => onSelect(incense.id)}
                  aria-pressed={selectedIncenseId === incense.id}
                  className={cn(
                    'flex min-w-0 flex-col items-center rounded-lg border px-2 py-3 text-center transition-colors',
                    selectedIncenseId === incense.id
                      ? 'border-game-moss bg-game-moss/10 text-game-ink'
                      : 'border-game-border bg-game-surface-raised/55 text-game-ink hover:border-game-moss/45',
                  )}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-game-border bg-game-canvas/45">
                    <ItemSprite
                      itemId={incense.id}
                      alt={incense.name}
                      className="h-10 w-10 object-contain"
                    />
                  </span>
                  <span className="mt-2 min-h-8 max-w-full text-[11px] font-medium leading-4">
                    {incense.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function OfferingPickerDialog({
  open,
  onOpenChange,
  offerings,
  inventoryMap,
  selectedItemId,
  slotIndex,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  offerings: SpiritChannelingOfferingItem[]
  inventoryMap: Record<string, number>
  selectedItemId: string
  slotIndex: number
  onSelect: (itemId: string) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="game-paper-modal game-paper-texture max-h-[85vh] max-w-sm overflow-hidden rounded-xl border-game-border bg-game-surface p-0 shadow-xl">
        <div className="px-4 pb-5 pt-5">
          <DialogTitle className="text-left font-display text-lg font-semibold text-game-ink">
            Offering {slotIndex + 1}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Choose an offering for this slot.
          </DialogDescription>

          {offerings.length === 0 ? (
            <div className="rounded-lg border border-dashed border-game-border bg-game-surface-raised/55 py-8 text-center text-xs font-black uppercase tracking-[0.18em] text-game-muted">
              No offerings available
            </div>
          ) : (
            <div className="mt-5 grid max-h-[60vh] grid-cols-4 gap-2 overflow-y-auto pr-1">
              {offerings.map((offering) => (
                <button
                  key={offering.itemId}
                  type="button"
                  onClick={() => onSelect(offering.itemId)}
                  aria-pressed={selectedItemId === offering.itemId}
                  className={cn(
                    'relative flex min-w-0 flex-col items-center rounded-lg border px-1.5 py-2 text-center transition-colors',
                    selectedItemId === offering.itemId
                      ? 'border-game-moss bg-game-moss/10 text-game-ink'
                      : 'border-game-border bg-game-surface-raised/55 text-game-ink hover:border-game-moss/45',
                  )}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-game-border bg-game-canvas/45">
                    <ItemSprite
                      itemId={offering.itemId}
                      alt={itemName(offering.itemId)}
                      className="h-8 w-8 object-contain"
                    />
                  </span>
                  <span className="absolute right-1 top-1 rounded-full border border-game-border bg-game-canvas px-1 py-0.5 font-mono text-[10px] font-black leading-none text-game-ink">
                    {inventoryMap[offering.itemId] || 0}
                  </span>
                  <span className="mt-1.5 min-h-8 max-w-full text-[10px] font-black uppercase leading-tight tracking-[0.08em]">
                    {itemName(offering.itemId)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ChannelerSelector({
  pokemon,
  minLevel,
  disabled,
  onOpen,
}: {
  pokemon: Pokemon | undefined
  minLevel: number
  disabled: boolean
  onOpen: () => void
}) {
  const imageUrl = pokemon
    ? getPokemonImageUrl(
        pokemon.formId,
        'sprite',
        !!pokemon.shiny,
        getOwnedPokemonGender(pokemon),
      )
    : ''
  const lowLevel = pokemon ? Number(pokemon.level || 0) < minLevel : false

  return (
    <div className="flex min-w-0 flex-col items-center">
      <button
        type="button"
        onClick={onOpen}
        disabled={disabled}
        className={cn(
          'game-focus-ring relative flex h-[72px] w-[72px] items-center justify-center rounded-lg border transition-colors disabled:opacity-50',
          pokemon
            ? lowLevel
              ? 'border-game-ochre bg-game-ochre/10'
              : 'border-game-moss/60 bg-game-moss/10'
            : 'border-game-border bg-game-surface/55 hover:border-game-moss/45',
        )}
        aria-label="Select channeler"
        title="Select channeler"
      >
        {pokemon ? (
          <Image
            src={imageUrl}
            alt={pokemon.name || 'Pokemon'}
            fill
            sizes="72px"
            className="object-contain pixelated"
          />
        ) : (
          <Plus className="relative h-5 w-5 text-game-muted" />
        )}
      </button>
      <div
        className={cn(
          'mt-2 min-h-4 max-w-28 truncate px-1 text-center text-xs font-medium',
          lowLevel ? 'text-game-ochre' : 'text-game-ink',
        )}
      >
        {disabled
          ? 'No Psychic Pokemon'
          : pokemon
            ? `${pokemon.name} LVL ${pokemon.level}`
            : 'Select Pokemon'}
      </div>
    </div>
  )
}

function PokemonPickerDialog({
  open,
  onOpenChange,
  pokemon,
  selectedPokemonId,
  minLevel,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  pokemon: Pokemon[]
  selectedPokemonId: string
  minLevel: number
  onSelect: (pokemonId: string) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="game-paper-modal game-paper-texture max-h-[85vh] max-w-sm overflow-hidden rounded-xl border-game-border bg-game-surface p-0 shadow-xl">
        <div className="px-4 pb-5 pt-5">
          <DialogTitle className="text-left font-display text-lg font-semibold text-game-ink">
            Channeler
          </DialogTitle>
          <DialogDescription className="sr-only">
            Choose a Psychic Pokemon for the channeling.
          </DialogDescription>

          {pokemon.length === 0 ? (
            <div className="rounded-lg border border-dashed border-game-border bg-game-surface-raised/55 py-8 text-center text-xs font-black uppercase tracking-[0.18em] text-game-muted">
              No Psychic Pokemon available
            </div>
          ) : (
            <div className="mt-5 max-h-[60vh] space-y-2 overflow-y-auto pr-1">
              {pokemon.map((entry) => {
                const imageUrl = getPokemonImageUrl(
                  entry.formId,
                  'sprite',
                  !!entry.shiny,
                  getOwnedPokemonGender(entry),
                )
                const lowLevel = Number(entry.level || 0) < minLevel

                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => onSelect(entry.id)}
                    aria-pressed={selectedPokemonId === entry.id}
                    className={cn(
                      'flex w-full min-w-0 items-center gap-3 rounded-lg border p-2 text-left transition-colors',
                      selectedPokemonId === entry.id
                        ? 'border-game-moss bg-game-moss/10 text-game-ink'
                        : 'border-game-border bg-game-surface-raised/55 text-game-ink hover:border-game-moss/45',
                    )}
                  >
                    <span className="relative h-14 w-14 shrink-0 rounded-lg border border-game-border bg-game-canvas/45">
                      <Image
                        src={imageUrl}
                        alt={entry.name || 'Pokemon'}
                        fill
                        sizes="56px"
                        className="object-contain pixelated"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-black uppercase text-game-ink">
                        {entry.name}
                      </span>
                      <span
                        className={cn(
                          'mt-1 block font-mono text-xs font-bold',
                          lowLevel ? 'text-game-ochre' : 'text-game-muted',
                        )}
                      >
                        LVL {entry.level}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InlineCeremonyPanel({
  state,
  incenseItemId,
  message,
}: {
  state: CeremonyState
  incenseItemId: string
  message: string
}) {
  const status =
    message ||
    (state === 'ghost'
      ? 'The spirit answers'
      : state === 'smoke'
        ? 'Channeling'
        : '')

  return (
    <div className="mx-auto w-full max-w-xs">
      <div className="relative h-32 overflow-hidden rounded-lg border border-game-border bg-game-surface/45">
        <CeremonyDisplay state={state} incenseItemId={incenseItemId} />
      </div>
      {status && (
        <div className="mt-3 text-center text-xs font-black uppercase tracking-[0.16em] text-game-ink">
          {status}
        </div>
      )}
    </div>
  )
}

function ChannelingButton({
  canSubmit,
  submitting,
  onBegin,
  className,
}: {
  canSubmit: boolean
  submitting: boolean
  onBegin: () => void
  className?: string
}) {
  return (
    <Button
      className={cn('h-12 w-full font-black', className)}
      disabled={!canSubmit}
      onClick={onBegin}
    >
      {submitting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Channeling
        </>
      ) : (
        <>
          <Flame className="h-4 w-4" />
          Begin Channeling
        </>
      )}
    </Button>
  )
}

function EmptyState({ itemId, title }: { itemId: string; title: string }) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex max-w-sm flex-col items-center rounded-xl border border-game-border bg-game-surface p-8 text-center shadow-sm">
        <ItemSprite
          itemId={itemId}
          alt={title}
          className="h-16 w-16 object-contain opacity-70"
        />
        <div className="mt-4 text-sm font-semibold text-game-ink">{title}</div>
      </div>
    </div>
  )
}

function OfferingSlotControl({
  index,
  slot,
  inventoryMap,
  onActivate,
  onClear,
  onQuantityChange,
}: {
  index: number
  slot: OfferingSlot
  inventoryMap: Record<string, number>
  onActivate: (index: number) => void
  onClear: (index: number) => void
  onQuantityChange: (index: number, delta: number) => void
}) {
  const quantityMax = slot.itemId ? inventoryMap[slot.itemId] || 1 : 1

  return (
    <div className="flex w-20 flex-col items-center">
      <div className="relative h-[72px] w-[72px]">
        <button
          type="button"
          onClick={() => onActivate(index)}
          className={cn(
            'game-focus-ring relative flex h-[72px] w-[72px] items-center justify-center rounded-full border transition-colors',
            slot.itemId
              ? 'border-game-moss/60 bg-game-moss/10'
              : 'border-game-border bg-game-surface/55 hover:border-game-moss/45',
          )}
          aria-label={`Select offering slot ${index + 1}`}
          title={`Offering slot ${index + 1}`}
        >
          <span className="absolute inset-[10%] rounded-full border border-game-border/60" />
          {slot.itemId ? (
            <ItemSprite
              itemId={slot.itemId}
              alt={itemName(slot.itemId)}
              className="relative h-10 w-10 object-contain"
            />
          ) : (
            <Plus className="relative h-5 w-5 text-game-muted" />
          )}
          <span className="absolute bottom-1.5 rounded-full border border-game-border bg-game-canvas/90 px-1.5 py-0.5 text-[10px] font-black uppercase leading-none tracking-[0.08em] text-game-muted">
            {index + 1}
          </span>
        </button>
        {slot.itemId && (
          <button
            type="button"
            className="game-focus-ring absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-game-border bg-game-canvas p-0.5 text-game-muted transition-colors hover:border-game-clay hover:text-game-clay"
            onClick={() => {
              onClear(index)
            }}
            aria-label={`Clear offering slot ${index + 1}`}
            title={`Clear offering slot ${index + 1}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <div className="mt-2 min-h-5 max-w-full truncate px-1 text-center text-[10px] font-black uppercase tracking-[0.08em] text-game-muted">
        {slot.itemId ? itemName(slot.itemId) : 'Empty'}
      </div>
      <div className="mt-1.5 flex h-10 w-full items-center justify-between rounded-full border border-game-border bg-game-canvas/55">
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="h-10 w-10 rounded-full"
          disabled={!slot.itemId || slot.quantity <= 1}
          onClick={(event) => {
            event.stopPropagation()
            onQuantityChange(index, -1)
          }}
          aria-label={`Decrease offering ${index + 1} quantity`}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <div className="w-5 text-center">
          <div className="font-mono text-xs font-black text-game-ink">
            {slot.itemId ? slot.quantity : 0}
          </div>
        </div>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="h-10 w-10 rounded-full"
          disabled={!slot.itemId || slot.quantity >= quantityMax}
          onClick={(event) => {
            event.stopPropagation()
            onQuantityChange(index, 1)
          }}
          aria-label={`Increase offering ${index + 1} quantity`}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

function CeremonyDisplay({
  state,
  incenseItemId,
}: {
  state: CeremonyState
  incenseItemId: string
}) {
  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden bg-[radial-gradient(ellipse_at_bottom,rgba(20,184,166,0.12),rgba(24,24,27,0.16)_46%,transparent_74%)]">
      {incenseItemId && (
        <>
          <div className="absolute bottom-4 h-6 w-24 rounded-full bg-[#081014]/35 blur-md" />
          <ItemSprite
            itemId={incenseItemId}
            alt="Incense"
            className="relative z-10 mb-3 h-12 w-12 object-contain drop-shadow-[0_0_14px_rgba(184,200,148,0.22)]"
          />
        </>
      )}
      {(state === 'smoke' || state === 'ghost') && (
        <>
          <div className="absolute bottom-14 h-20 w-10 animate-pulse rounded-full bg-[#e8eadf]/18 blur-2xl" />
          <div className="absolute bottom-20 ml-7 h-14 w-14 animate-pulse rounded-full bg-[#b8c894]/10 blur-2xl" />
          <div className="absolute bottom-20 -ml-8 h-12 w-12 animate-pulse rounded-full bg-[#f7ecd6]/12 blur-xl" />
          <div className="absolute bottom-14 ml-1 h-24 w-4 animate-pulse rounded-full bg-[#f7ecd6]/12 blur-lg" />
        </>
      )}
      {state === 'ghost' && (
        <div className="absolute bottom-12 h-20 w-20 animate-pulse">
          <Image
            src={getPokemonImageUrl('92', 'sprite')}
            alt="Gastly"
            fill
            sizes="80px"
            className="object-contain pixelated"
          />
          <Sparkles className="absolute -right-1 top-1 h-4 w-4 text-game-moss-strong" />
        </div>
      )}
    </div>
  )
}
