'use client'

import {
  Flame,
  Loader2,
  Minus,
  Plus,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { items } from '@/data/items'
import {
  BOOK_OF_CHANNELING_ITEM_ID,
  getSpiritChannelingActivityIdForMemento,
  getSpiritChannelingOfferedEnergy,
  SPIRIT_CHANNELING_INCENSE_ITEMS,
  SPIRIT_CHANNELING_MEMENTO_ITEM_IDS,
  SPIRIT_CHANNELING_OFFERING_ITEMS,
  type SpiritChannelingOfferingItem,
} from '@/data/spirit-channeling-public'
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
const FULLSCREEN_PICKER_CLASS =
  'game-paper-modal game-paper-background fixed inset-0 left-0 top-0 z-50 flex h-[100dvh] max-h-none w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-game-surface p-0 text-game-ink shadow-none sm:max-w-none sm:p-0'

function itemName(itemId: string) {
  return items.find((item) => item.id === itemId)?.name || itemId
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function pokemonDisplayName(pokemon: Pokemon): string {
  return pokemon.name || getPokemonForm(pokemon.formId)?.name || 'Pokemon'
}

function normalizePokemonBackgroundPath(path?: string | null) {
  const filename = path?.split('/').pop()
  if (!filename) return null

  return `/backgrounds/${filename
    .replace(/\.(png|jpe?g|webp)$/i, '.avif')
    .replaceAll('_', '-')}`
}

function PickerCardBackground({ background }: { background?: string | null }) {
  if (!background) return null

  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${background})` }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-game-surface-raised/76 via-game-surface/56 to-game-surface/10"
      />
    </>
  )
}

function isChannelingComplete(
  gameResults:
    | NonNullable<ReturnType<typeof useUser>['gameData']>['gameResults']
    | undefined,
  activityId: string,
) {
  return (gameResults || []).some(
    (entry) => entry.gameId === activityId && (entry.wins || 0) > 0,
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
  const availableMementoIds = useMemo(
    () =>
      SPIRIT_CHANNELING_MEMENTO_ITEM_IDS.filter((mementoItemId) => {
        if ((inventoryMap[mementoItemId] || 0) <= 0) return false
        return !isChannelingComplete(
          gameData?.gameResults,
          getSpiritChannelingActivityIdForMemento(mementoItemId),
        )
      }),
    [gameData?.gameResults, inventoryMap],
  )

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
  const selectableOfferings = ownedOfferings.filter(
    (offering) =>
      offering.itemId === offeringSlots[activeOfferingSlotIndex]?.itemId ||
      offeringSlots.every(
        (slot, index) =>
          index === activeOfferingSlotIndex || slot.itemId !== offering.itemId,
      ),
  )
  const ownedPokemon = useMemo(
    () =>
      [...((gameData?.pokemon || []) as Pokemon[])].sort(
        (a, b) => Number(b.level || 0) - Number(a.level || 0),
      ),
    [gameData?.pokemon],
  )
  const selectedPokemon = ownedPokemon.find(
    (pokemon) => pokemon.id === selectedPokemonId,
  )
  const hasSelectedPokemon = Boolean(selectedPokemon)

  useEffect(() => {
    if (!hasBook || availableMementoIds.length === 0) {
      setSelectedMementoId('')
      return
    }

    const requestedMementoId = availableMementoIds.find(
      (mementoItemId) => mementoItemId === requestedMemento,
    )
    const currentMementoIsAvailable = availableMementoIds.includes(
      selectedMementoId as (typeof SPIRIT_CHANNELING_MEMENTO_ITEM_IDS)[number],
    )
    if (requestedMementoId) {
      setSelectedMementoId(requestedMementoId)
    } else if (!currentMementoIsAvailable) {
      setSelectedMementoId(availableMementoIds[0])
    }
  }, [availableMementoIds, hasBook, requestedMemento, selectedMementoId])

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
      !ownedPokemon.some((pokemon) => pokemon.id === selectedPokemonId)
    ) {
      setSelectedPokemonId('')
    }
  }, [ownedPokemon, selectedPokemonId])

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

  const setSlotQuantity = useCallback(
    (index: number, quantity: number) => {
      setOfferingSlots((slots) =>
        slots.map((slot, slotIndex) => {
          if (slotIndex !== index || !slot.itemId) return slot
          const nextQuantity = Number.isFinite(quantity)
            ? Math.trunc(quantity)
            : 1
          return {
            ...slot,
            quantity: Math.min(
              inventoryMap[slot.itemId] || 1,
              Math.max(1, nextQuantity),
            ),
          }
        }),
      )
    },
    [inventoryMap],
  )

  const offeredEnergy = useMemo(
    () =>
      getSpiritChannelingOfferedEnergy(
        offeringSlots
          .filter((slot) => slot.itemId)
          .map((slot) => ({ itemId: slot.itemId, quantity: slot.quantity })),
      ) || {},
    [offeringSlots],
  )

  const canSubmit =
    hasBook &&
    !!selectedMementoId &&
    !!selectedIncenseId &&
    hasSelectedPokemon &&
    offeringSlots.some((slot) => slot.itemId) &&
    !submitting

  const handleBegin = useCallback(async () => {
    if (!selectedMementoId || !canSubmit) return

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
          mementoItemId: selectedMementoId,
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
    selectedMementoId,
    selectedIncenseId,
    selectedPokemonId,
  ])

  return (
    <div className="game-paper-first game-paper-background flex h-full min-w-0 flex-col overflow-hidden bg-game-canvas text-game-ink">
      <PremiumHeader
        title={headerTitle}
        subtitle={selectedMementoId ? 'Channeling' : undefined}
        icon={
          selectedMementoId ? (
            <ItemSprite
              itemId={selectedMementoId}
              alt={itemName(selectedMementoId)}
              className="h-10 w-10 object-contain"
            />
          ) : undefined
        }
      />

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-game-moss" />
          </div>
        ) : !hasBook ? (
          <EmptyState itemId={BOOK_OF_CHANNELING_ITEM_ID} title="Locked" />
        ) : availableMementoIds.length === 0 ? (
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
                    disabled={ownedPokemon.length === 0}
                    onOpen={() => setIsPokemonModalOpen(true)}
                  />
                </div>
              </Section>

              <Section title="Offerings">
                <div className="grid grid-cols-3 gap-2">
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
                      onQuantitySet={setSlotQuantity}
                    />
                  ))}
                </div>
                {Object.keys(offeredEnergy).length > 0 && (
                  <div
                    className="mt-4 flex flex-wrap justify-center gap-2"
                    role="status"
                    aria-label="Offered energy totals"
                  >
                    {Object.entries(offeredEnergy).map(([type, amount]) => (
                      <span
                        key={type}
                        role="img"
                        aria-label={`${type} energy: ${amount}`}
                        title={`${type} energy: ${amount}`}
                        className="inline-flex items-center gap-1 rounded-full border border-game-border bg-game-surface px-1.5 py-0.5 font-mono text-[10px] font-black leading-none text-game-ink"
                      >
                        <ItemSprite
                          itemId={`${type}-gem`}
                          alt={`${type} Gem`}
                          width={16}
                          height={16}
                          className="h-4 w-4"
                        />
                        <span>{amount}</span>
                      </span>
                    ))}
                  </div>
                )}
              </Section>

              <div ref={ceremonySectionRef}>
                <InlineCeremonyPanel
                  state={ceremonyState}
                  incenseItemId={selectedIncenseId}
                  pokemon={selectedPokemon}
                  message={ceremonyMessage}
                />
              </div>

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

      {!isLoading && hasBook && availableMementoIds.length > 0 && (
        <div className="shrink-0 border-t border-game-border bg-game-surface/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur md:hidden">
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
        offerings={selectableOfferings}
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
        pokemon={ownedPokemon}
        selectedPokemonId={selectedPokemonId}
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
          'game-focus-ring relative flex h-[72px] w-[72px] items-center justify-center rounded-md border transition-colors disabled:opacity-50',
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
        Incense
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
      <DialogContent
        showCloseButton={false}
        className={FULLSCREEN_PICKER_CLASS}
      >
        <div className="flex h-full min-h-0 flex-col px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+1rem)]">
          <DialogTitle className="sr-only">Incense</DialogTitle>
          <DialogDescription className="sr-only">
            Choose an incense for the channeling.
          </DialogDescription>

          {incenses.length === 0 ? (
            <div className="rounded-md border border-dashed border-game-border bg-game-surface-raised/55 py-8 text-center text-xs font-black uppercase tracking-[0.18em] text-game-muted">
              No incense available
            </div>
          ) : (
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pb-2">
              {incenses.map((incense) => (
                <button
                  key={incense.id}
                  type="button"
                  onClick={() => onSelect(incense.id)}
                  data-haptic-manual="true"
                  aria-pressed={selectedIncenseId === incense.id}
                  className={cn(
                    'game-focus-ring relative flex min-h-[88px] w-full min-w-0 items-center gap-4 overflow-hidden rounded-md rounded-tr-none border bg-game-surface p-3 text-left text-game-ink transition-colors hover:border-game-charcoal/45',
                    selectedIncenseId === incense.id
                      ? 'border-game-charcoal/65 ring-1 ring-game-charcoal/15'
                      : 'border-game-card-border',
                  )}
                >
                  <PickerCardBackground background="/backgrounds/pkmn-tower.avif" />
                  <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center">
                    <ItemSprite
                      itemId={incense.id}
                      alt={incense.name}
                      className="h-16 w-16 object-contain"
                    />
                  </span>
                  <span className="relative z-10 flex min-w-0 flex-1 flex-col items-end self-stretch text-right">
                    <span className="-mr-3 -mt-3 line-clamp-2 w-fit max-w-full rounded-md rounded-tl-none rounded-tr-none rounded-br-none bg-game-charcoal px-2 py-1 text-right text-xs font-bold leading-tight tracking-[0.08em] text-white">
                      {incense.name}
                    </span>
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
  const [activeTab, setActiveTab] = useState<'materials' | 'gems'>('materials')
  const visibleOfferings = offerings.filter((offering) =>
    activeTab === 'materials'
      ? offering.kind === 'material'
      : offering.kind === 'gem',
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={FULLSCREEN_PICKER_CLASS}
      >
        <div className="flex h-full min-h-0 flex-col px-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
          <DialogTitle className="sr-only">Offering {slotIndex + 1}</DialogTitle>
          <DialogDescription className="sr-only">
            Choose an offering for this slot.
          </DialogDescription>

          {offerings.length === 0 ? (
            <div className="min-h-0 flex-1 overflow-y-auto py-8 text-center text-xs font-black uppercase tracking-[0.18em] text-game-muted">
              No offerings available
            </div>
          ) : visibleOfferings.length === 0 ? (
            <div className="min-h-0 flex-1 overflow-y-auto py-8 text-center text-xs font-black uppercase tracking-[0.18em] text-game-muted">
              No {activeTab} available
            </div>
          ) : (
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pb-4 pr-1">
              {visibleOfferings.map((offering) => (
                <button
                  key={offering.itemId}
                  type="button"
                  onClick={() => onSelect(offering.itemId)}
                  data-haptic-manual="true"
                  aria-pressed={selectedItemId === offering.itemId}
                  className={cn(
                    'game-focus-ring relative flex min-h-[76px] w-full min-w-0 items-center gap-4 overflow-hidden rounded-md rounded-tr-none border bg-game-surface p-3 text-left text-game-ink transition-colors hover:border-game-charcoal/45',
                    selectedItemId === offering.itemId
                      ? 'border-game-charcoal/65 ring-1 ring-game-charcoal/15'
                      : 'border-game-card-border',
                  )}
                >
                  <PickerCardBackground background="/backgrounds/inventory.avif" />
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center">
                    <ItemSprite
                      itemId={offering.itemId}
                      alt={itemName(offering.itemId)}
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                  </span>
                  <span className="relative z-10 flex min-w-0 flex-1 flex-col items-end self-stretch text-right">
                    <span className="-mr-3 -mt-3 inline-flex w-fit max-w-full items-start gap-1.5 rounded-md rounded-tl-none rounded-tr-none rounded-br-none bg-game-charcoal px-2 py-1 text-right text-xs font-bold leading-tight tracking-[0.12em] text-white">
                      <span className="min-w-0 line-clamp-2">{itemName(offering.itemId)}</span>
                      <span className="shrink-0 font-mono tracking-normal text-game-battle-orange">
                        x{inventoryMap[offering.itemId] || 0}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
          <div className="shrink-0 border-t border-game-border bg-game-surface pt-3 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
            <div
              role="tablist"
              aria-label="Offering type"
              className="grid grid-cols-2 gap-1 rounded-md border border-game-border bg-game-canvas/60 p-1"
            >
              {(['materials', 'gems'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  data-haptic-manual="true"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'game-focus-ring min-h-11 rounded-sm px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition-colors',
                    activeTab === tab
                      ? 'bg-game-charcoal text-white shadow-sm'
                      : 'text-game-muted hover:bg-game-surface-raised hover:text-game-ink',
                  )}
                >
                  {tab === 'materials' ? 'Materials' : 'Gems'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ChannelerSelector({
  pokemon,
  disabled,
  onOpen,
}: {
  pokemon: Pokemon | undefined
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
  return (
    <div className="flex min-w-0 flex-col items-center">
      <button
        type="button"
        onClick={onOpen}
        disabled={disabled}
        className={cn(
          'game-focus-ring relative flex h-[72px] w-[72px] items-center justify-center rounded-md border transition-colors disabled:opacity-50',
          pokemon
            ? 'border-game-moss/60 bg-game-moss/10'
            : 'border-game-border bg-game-surface/55 hover:border-game-moss/45',
        )}
        aria-label="Select channeler"
        title="Select channeler"
      >
        {pokemon ? (
          <Image
            src={imageUrl}
            alt={pokemonDisplayName(pokemon)}
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
          'mt-2 min-h-4 max-w-28 truncate px-1 text-center text-xs font-medium text-game-ink',
        )}
      >
        Channeller
      </div>
    </div>
  )
}

function PokemonPickerDialog({
  open,
  onOpenChange,
  pokemon,
  selectedPokemonId,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  pokemon: Pokemon[]
  selectedPokemonId: string
  onSelect: (pokemonId: string) => void
}) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const filteredPokemon = useMemo(
    () =>
      pokemon.filter((entry) => {
        if (!normalizedQuery) return true
        const form = getPokemonForm(entry.formId)
        return [
          pokemonDisplayName(entry),
          entry.formId,
          ...(form?.types || []),
        ].some((value) => value.toLowerCase().includes(normalizedQuery))
      }),
    [normalizedQuery, pokemon],
  )
  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={FULLSCREEN_PICKER_CLASS}
      >
        <div className="flex h-full min-h-0 flex-col px-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
          <DialogTitle className="sr-only">Channeller</DialogTitle>
          <DialogDescription className="sr-only">
            Owned Pokemon available for channeling.
          </DialogDescription>

          {pokemon.length === 0 ? (
            <div className="min-h-0 flex-1 overflow-y-auto py-8 text-center text-xs font-black uppercase tracking-[0.18em] text-game-muted">
              No Pokemon available
            </div>
          ) : filteredPokemon.length === 0 ? (
            <div className="min-h-0 flex-1 overflow-y-auto py-8 text-center text-sm text-game-muted">
              No Pokemon match that search.
            </div>
          ) : (
            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pb-4 pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-game-border">
              {filteredPokemon.map((entry) => {
                const imageUrl = getPokemonImageUrl(
                  entry.formId,
                  'sprite',
                  !!entry.shiny,
                  getOwnedPokemonGender(entry),
                )
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => onSelect(entry.id)}
                    data-haptic-manual="true"
                    aria-pressed={selectedPokemonId === entry.id}
                    className={cn(
                      'game-focus-ring relative flex min-h-[88px] w-full min-w-0 items-center gap-4 overflow-hidden rounded-md rounded-tr-none border bg-game-surface p-3 text-left text-game-ink transition-colors hover:border-game-charcoal/45',
                      selectedPokemonId === entry.id
                        ? 'border-game-charcoal/65 ring-1 ring-game-charcoal/15'
                        : 'border-game-card-border',
                    )}
                  >
                    <PickerCardBackground
                      background={normalizePokemonBackgroundPath(entry.background)}
                    />
                    <span className="relative z-10 h-16 w-16 shrink-0">
                      <Image
                        src={imageUrl}
                        alt={pokemonDisplayName(entry)}
                        fill
                        sizes="56px"
                        className="object-contain pixelated"
                      />
                    </span>
                    <span className="relative z-10 flex min-w-0 flex-1 flex-col items-end self-stretch text-right">
                      <span className="-mr-3 -mt-3 inline-flex w-fit max-w-full items-start gap-1.5 rounded-md rounded-tl-none rounded-tr-none rounded-br-none bg-game-charcoal px-2 py-1 text-right text-xs font-bold leading-tight tracking-[0.08em] text-white">
                        <span className="min-w-0 line-clamp-2">{pokemonDisplayName(entry)}</span>
                        <span className="shrink-0 font-mono tracking-normal text-game-battle-orange">
                          Lv. {entry.level}
                        </span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          )}
          <div className="shrink-0 border-t border-game-border bg-game-surface pt-3 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-game-muted"
                aria-hidden="true"
              />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name, form, or type"
                aria-label="Search owned Pokemon"
                className="h-11 pl-9"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InlineCeremonyPanel({
  state,
  incenseItemId,
  pokemon,
  message,
}: {
  state: CeremonyState
  incenseItemId: string
  pokemon: Pokemon | undefined
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
    <div className="relative h-56 w-full overflow-hidden rounded-md border border-game-border bg-game-charcoal sm:h-64">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/backgrounds/pkmn-tower.avif)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-game-charcoal/25"
      />
      <h2 className="absolute right-0 top-0 z-20 line-clamp-2 w-fit max-w-full rounded-md rounded-tl-none rounded-tr-none rounded-br-none bg-game-charcoal px-2 py-1 text-right text-xs font-bold leading-tight tracking-[0.12em] text-white">
        Channeling
      </h2>
      <CeremonyDisplay
        state={state}
        incenseItemId={incenseItemId}
        pokemon={pokemon}
      />
      {status && (
        <div className="absolute inset-x-0 bottom-0 z-20 bg-game-charcoal/75 px-3 py-2 text-center text-xs font-black uppercase tracking-[0.16em] text-white">
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
  onQuantitySet,
}: {
  index: number
  slot: OfferingSlot
  inventoryMap: Record<string, number>
  onActivate: (index: number) => void
  onClear: (index: number) => void
  onQuantityChange: (index: number, delta: number) => void
  onQuantitySet: (index: number, quantity: number) => void
}) {
  const quantityMax = slot.itemId ? inventoryMap[slot.itemId] || 1 : 1

  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <div className="relative h-[72px] w-[72px]">
        <button
          type="button"
          onClick={() => onActivate(index)}
          className={cn(
            'game-focus-ring relative flex h-[72px] w-[72px] items-center justify-center rounded-md border transition-colors',
            slot.itemId
              ? 'border-game-moss/60 bg-game-moss/10'
              : 'border-game-border bg-game-surface/55 hover:border-game-moss/45',
          )}
          aria-label={`Select offering slot ${index + 1}`}
          title={`Offering slot ${index + 1}`}
        >
          {slot.itemId ? (
            <ItemSprite
              itemId={slot.itemId}
              alt={itemName(slot.itemId)}
              className="relative h-10 w-10 object-contain"
            />
          ) : (
            <Plus className="relative h-5 w-5 text-game-muted" />
          )}
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
      <div className="mt-2 min-h-4 max-w-28 truncate px-1 text-center text-xs font-medium text-game-ink">
        {slot.itemId ? itemName(slot.itemId) : 'Empty'}
      </div>
      <div className="mt-1.5 flex h-9 w-full max-w-28 items-center justify-center gap-0.5 rounded-full border border-game-border bg-game-canvas/55">
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="h-8 w-7 rounded-full p-0"
          disabled={!slot.itemId || slot.quantity <= 1}
          onClick={(event) => {
            event.stopPropagation()
            onQuantityChange(index, -1)
          }}
          aria-label={`Decrease offering ${index + 1} quantity`}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <Input
          type="number"
          inputMode="numeric"
          min={1}
          max={quantityMax}
          value={slot.itemId ? slot.quantity : 0}
          disabled={!slot.itemId}
          onChange={(event) => onQuantitySet(index, Number(event.target.value))}
          onFocus={(event) => event.currentTarget.select()}
          aria-label={`Offering ${index + 1} quantity`}
          className="h-8 w-8 border-0 bg-transparent px-0 text-center font-mono text-xs font-black text-game-ink shadow-none focus-visible:ring-1 focus-visible:ring-game-moss"
        />
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="h-8 w-7 rounded-full p-0"
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
  pokemon,
}: {
  state: CeremonyState
  incenseItemId: string
  pokemon: Pokemon | undefined
}) {
  const pokemonImageUrl = pokemon
    ? getPokemonImageUrl(
        pokemon.formId,
        'sprite',
        !!pokemon.shiny,
        getOwnedPokemonGender(pokemon),
      )
    : ''

  return (
    <div className="absolute inset-0 overflow-hidden">
      {incenseItemId && (
        <>
          <div className="absolute bottom-5 left-1/2 h-6 w-20 -translate-x-1/2 rounded-full bg-game-charcoal/45 blur-md" />
          <ItemSprite
            itemId={incenseItemId}
            alt="Incense"
            className="absolute bottom-7 left-1/2 z-10 h-16 w-16 -translate-x-1/2 object-contain drop-shadow-lg sm:h-20 sm:w-20"
          />
        </>
      )}
      {pokemon && (
        <div className="absolute bottom-6 right-[8%] z-10 h-32 w-32 shrink-0 drop-shadow-xl sm:h-40 sm:w-40">
          <Image
            src={pokemonImageUrl}
            alt={pokemonDisplayName(pokemon)}
            fill
            sizes="(min-width: 640px) 160px, 128px"
            className="object-contain pixelated"
          />
        </div>
      )}
      {(state === 'smoke' || state === 'ghost') && (
        <>
          <div className="absolute bottom-10 left-1/2 h-20 w-10 -translate-x-1/2 motion-safe:animate-pulse rounded-full bg-game-moss/35 blur-2xl" />
          <div className="absolute bottom-16 left-1/2 ml-7 h-14 w-14 -translate-x-1/2 motion-safe:animate-pulse rounded-full bg-game-ochre/35 blur-2xl" />
          <div className="absolute bottom-16 left-1/2 -ml-8 h-12 w-12 -translate-x-1/2 motion-safe:animate-pulse rounded-full bg-game-surface-raised/80 blur-xl" />
          <div className="absolute bottom-10 left-1/2 h-24 w-4 -translate-x-1/2 motion-safe:animate-pulse rounded-full bg-game-surface-raised/70 blur-lg" />
        </>
      )}
      {state === 'ghost' && (
        <div className="absolute bottom-10 left-1/2 z-20 h-24 w-24 -translate-x-1/2 animate-pulse">
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
