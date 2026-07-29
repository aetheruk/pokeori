'use client'

import { ArrowLeft, Loader2, Package } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useInventoryStore } from '@/app/(frontend)/store/inventory-store'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { useUser } from '@/context/UserContext'
import type { Pokemon } from '@/payload-types'
import { getOwnedPokemonGender } from '@/utilities/pokemon/gender'
import {
  getPokemonItemEffectLabel,
  getPokemonItemPickerGroup,
  POKEMON_ITEM_PICKER_GROUP_LABELS,
  POKEMON_ITEM_PICKER_GROUP_ORDER,
  type PokemonItemPickerGroup,
} from '@/utilities/pokemon/item-usability'
import { SectionDivider } from '@/components/ui/section-divider'
import {
  applyItemToPokemon,
  getFusionPartnerOptions,
  getUsableItems,
  type StatName,
} from '../actions'

interface UseItemDialogProps {
  pokemon: Pokemon
  onUpdate?: (updatedPokemon: Pokemon) => void
}

type UsableItem = NonNullable<
  Awaited<ReturnType<typeof getUsableItems>>[number]
>
type FusionPartnerOption = Awaited<
  ReturnType<typeof getFusionPartnerOptions>
>[number]

const STATS: { label: string; value: StatName }[] = [
  { label: 'HP', value: 'hp' },
  { label: 'Attack', value: 'attack' },
  { label: 'Defense', value: 'defense' },
  { label: 'Sp. Atk', value: 'specialAttack' },
  { label: 'Sp. Def', value: 'specialDefense' },
  { label: 'Speed', value: 'speed' },
]

export function UseItemDialog({
  pokemon,
  onUpdate,
  fullWidth,
  defaultOpen = false,
  highlightItemId,
}: UseItemDialogProps & {
  fullWidth?: boolean
  defaultOpen?: boolean
  highlightItemId?: string
}) {
  const { refreshUser } = useUser()
  const [open, setOpen] = useState(defaultOpen)
  const [items, setItems] = useState<UsableItem[]>([])
  const [loading, setLoading] = useState(false)
  const [usingItem, setUsingItem] = useState<string | null>(null)
  const [selectedItemForStat, setSelectedItemForStat] =
    useState<UsableItem | null>(null)
  const [selectedFusionItem, setSelectedFusionItem] =
    useState<UsableItem | null>(null)
  const [fusionPartnerOptions, setFusionPartnerOptions] = useState<
    FusionPartnerOption[]
  >([])
  const [loadingFusionPartners, setLoadingFusionPartners] = useState(false)

  const inventoryStore = useInventoryStore((state) => state.inventory)
  const decrementItem = useInventoryStore((state) => state.decrementItem)
  const incrementItem = useInventoryStore((state) => state.incrementItem)

  const [currentLevel, setCurrentLevel] = useState(pokemon.level || 1)

  useEffect(() => {
    setCurrentLevel(pokemon.level || 1)
  }, [pokemon.level])

  useEffect(() => {
    if (open) {
      loadItems()
      setSelectedItemForStat(null)
      setSelectedFusionItem(null)
      setFusionPartnerOptions([])
      if (highlightItemId) {
        // Logic to highlight could go here if we had a ref to the list or items
        // For now, let's just let it load.
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const loadItems = async (levelOverride?: number) => {
    setLoading(true)
    try {
      const result = await getUsableItems({
        speciesId: pokemon.speciesId,
        formId: pokemon.formId,
        level: levelOverride ?? currentLevel,
        evs: pokemon.evs,
        ivs: pokemon.ivs,
        nature: pokemon.nature,
        friendship: pokemon.friendship,
        ability:
          typeof pokemon.ability === 'string' ? pokemon.ability : undefined,
        teraType: pokemon.teraType,
        fusionItemId: pokemon.fusionItemId,
        fusionBaseFormId: pokemon.fusionBaseFormId,
        fusedWithPokemonId: pokemon.fusedWithPokemonId,
        fusedIntoPokemonId: pokemon.fusedIntoPokemonId,
      })
      const usableItems = result.filter(
        (item): item is UsableItem => item !== null,
      )
      setItems(
        highlightItemId
          ? [...usableItems].sort((a, b) => {
              if (a.itemId === highlightItemId) return -1
              if (b.itemId === highlightItemId) return 1
              return 0
            })
          : usableItems,
      )
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load items:', error)
      }
      toast.error('Failed to load items')
    } finally {
      setLoading(false)
    }
  }

  const groupedItems = useMemo(() => {
    const groups = new Map<PokemonItemPickerGroup, UsableItem[]>()
    for (const item of items) {
      const group = getPokemonItemPickerGroup(item.definition)
      groups.set(group, [...(groups.get(group) || []), item])
    }
    return POKEMON_ITEM_PICKER_GROUP_ORDER.flatMap((group) => {
      const groupItems = groups.get(group)
      return groupItems?.length ? [[group, groupItems] as const] : []
    })
  }, [items])

  const handleItemClick = (item: UsableItem) => {
    if (item.definition.effects?.maximizeOneIv) {
      setSelectedItemForStat(item)
    } else if (
      item.definition.effects?.fusePokemon &&
      !pokemon.fusedWithPokemonId
    ) {
      loadFusionPartners(item)
    } else {
      handleUseItem(item.itemId)
    }
  }

  const loadFusionPartners = async (item: UsableItem) => {
    setSelectedFusionItem(item)
    setFusionPartnerOptions([])
    setLoadingFusionPartners(true)
    try {
      const result = await getFusionPartnerOptions(pokemon.id, item.itemId)
      setFusionPartnerOptions(result)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to load fusion partners',
      )
      setSelectedFusionItem(null)
    } finally {
      setLoadingFusionPartners(false)
    }
  }

  const handleUseItem = async (
    itemId: string,
    targetStat?: StatName,
    partnerPokemonId?: string,
  ) => {
    setUsingItem(itemId)
    const loadedItem = items.find((item) => item.itemId === itemId)
    const shouldConsume = loadedItem?.definition.consume !== false
    if (shouldConsume) decrementItem(itemId)
    try {
      const result = await applyItemToPokemon(pokemon.id, itemId, {
        targetStat,
        partnerPokemonId,
      })
      if (!result.success) {
        if (shouldConsume) incrementItem(itemId)
        toast.error(result.error || 'Failed to use item')
        return
      }
      if (result.success && result.pokemon) {
        toast.success(result.message)
        const newLevel = result.pokemon.level || 1
        setCurrentLevel(newLevel)
        onUpdate?.(result.pokemon)
        refreshUser()
        loadItems(newLevel) // Reload items to update quantity and level checks
        setSelectedItemForStat(null) // Reset selection view
        setSelectedFusionItem(null)
        setFusionPartnerOptions([])
      }
    } catch (error) {
      if (shouldConsume) incrementItem(itemId)
      toast.error(error instanceof Error ? error.message : 'Failed to use item')
    } finally {
      setUsingItem(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className={`gap-2 border border-game-clay bg-game-clay text-game-cream hover:bg-game-clay/90 ${fullWidth ? 'w-full justify-center' : ''}`}
        >
          <Package className="h-4 w-4 text-game-cream" />
          Use Item
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[88dvh] flex-col gap-0 overflow-hidden border-game-border bg-game-surface p-0 text-game-ink sm:max-w-[460px]">
        <DialogHeader className="shrink-0 border-b border-game-border bg-game-surface-raised px-5 py-4 text-left">
          <div className="flex items-start gap-3 pr-8">
            {(selectedItemForStat || selectedFusionItem) && (
              <Button
                variant="outline"
                size="icon"
                className="mt-0.5 h-9 w-9 shrink-0 border-game-border bg-game-surface text-game-ink"
                onClick={() => {
                  setSelectedItemForStat(null)
                  setSelectedFusionItem(null)
                  setFusionPartnerOptions([])
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to items</span>
              </Button>
            )}
            <div className="min-w-0">
              <DialogTitle className="font-display text-xl font-semibold text-game-ink">
                {selectedItemForStat
                  ? 'Choose a stat'
                  : selectedFusionItem
                    ? 'Choose a fusion partner'
                    : 'Use an item'}
              </DialogTitle>
              <p className="mt-1 text-sm text-game-muted">
                {selectedItemForStat
                  ? `Maximize one of ${pokemon.name}'s IVs.`
                  : selectedFusionItem
                    ? `Select a compatible Pokemon for ${pokemon.name}.`
                    : `Choose an item for ${pokemon.name}.`}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-game-moss" />
            </div>
          ) : selectedItemForStat ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border border-game-ochre/25 bg-game-ochre/10 p-3">
                <ItemSprite
                  itemId={selectedItemForStat.itemId}
                  alt={selectedItemForStat.definition.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 pixelated"
                />
                <div>
                  <div className="font-medium">
                    {selectedItemForStat.definition.name}
                  </div>
                  <div className="text-xs text-game-muted">
                    Select a stat to set its IV to 31.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {STATS.map((stat) => (
                  <Button
                    key={stat.value}
                    variant="outline"
                    className="h-11 justify-between border-game-border bg-game-surface-raised text-game-ink hover:border-game-moss/45 hover:bg-game-moss/5"
                    onClick={() =>
                      handleUseItem(selectedItemForStat.itemId, stat.value)
                    }
                    disabled={!!usingItem}
                  >
                    <span>{stat.label}</span>
                    {usingItem === selectedItemForStat.itemId && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          ) : selectedFusionItem ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border border-game-ochre/25 bg-game-ochre/10 p-3">
                <ItemSprite
                  itemId={selectedFusionItem.itemId}
                  alt={selectedFusionItem.definition.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 pixelated"
                />
                <div>
                  <div className="font-medium">
                    {selectedFusionItem.definition.name}
                  </div>
                  <div className="text-xs text-game-muted">
                    Select a compatible Pokemon.
                  </div>
                </div>
              </div>

              {loadingFusionPartners ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-game-moss" />
                </div>
              ) : fusionPartnerOptions.length === 0 ? (
                <div
                  className="rounded-lg border border-dashed border-game-border bg-game-canvas py-8 text-center text-sm text-game-muted"
                  role="status"
                  aria-live="polite"
                >
                  No compatible partners found.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {fusionPartnerOptions.map((option) => {
                    const partner = option.pokemon
                    return (
                      <Button
                        key={partner.id}
                        variant="outline"
                        className="flex min-h-[68px] w-full items-center justify-between gap-3 whitespace-normal rounded-lg border-game-border bg-game-surface-raised p-3 text-left text-game-ink hover:border-game-moss/45 hover:bg-game-moss/5"
                        onClick={() =>
                          handleUseItem(
                            selectedFusionItem.itemId,
                            undefined,
                            partner.id,
                          )
                        }
                        disabled={!!usingItem}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          {partner.formId ? (
                            <PokemonRaritySprite
                              formId={partner.formId}
                              view="front"
                              rarity={partner.rarity}
                              shiny={partner.shiny}
                              isShadow={partner.isShadow}
                              isRadiant={partner.isRadiant}
                              female={getOwnedPokemonGender(partner) === 'female'}
                              alt={partner.name || 'Fusion partner'}
                              className="h-9 w-9 shrink-0"
                            />
                          ) : (
                            <div className="h-9 w-9 shrink-0 rounded-md border border-game-border bg-game-canvas" />
                          )}
                          <div className="min-w-0 flex-1 text-left">
                            <div className="font-medium leading-tight">
                              {partner.name || `Pokemon #${partner.speciesId}`}
                            </div>
                            <div className="mt-1 text-xs leading-snug text-game-muted">
                              {option.label}
                            </div>
                          </div>
                        </div>
                        {usingItem === selectedFusionItem.itemId && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>
          ) : items.length === 0 ? (
            <div
              className="rounded-lg border border-dashed border-game-border bg-game-canvas py-10 text-center text-game-muted"
              role="status"
              aria-live="polite"
            >
              No usable items found.
            </div>
          ) : (
            <div className="space-y-5">
              {groupedItems.map(([group, groupItems]) => (
                <section
                  key={group}
                  aria-labelledby={`pokemon-item-group-${group}`}
                >
                  <SectionDivider className="mb-2">
                    <span
                      id={`pokemon-item-group-${group}`}
                      className="flex items-center gap-2"
                    >
                      {POKEMON_ITEM_PICKER_GROUP_LABELS[group]}
                      <span className="rounded-full border border-game-border bg-game-canvas/70 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-normal text-game-muted">
                        {groupItems.length}
                      </span>
                    </span>
                  </SectionDivider>
                  <Carousel
                    opts={{ align: 'start', containScroll: 'trimSnaps' }}
                    className="w-full"
                    aria-label={`${POKEMON_ITEM_PICKER_GROUP_LABELS[group]} carousel`}
                  >
                    <CarouselContent className="-ml-2">
                      {groupItems.map((item) => (
                        <CarouselItem
                          key={item.id}
                          className={
                            groupItems.length === 1
                              ? 'basis-full pl-2'
                              : 'basis-[90%] pl-2 sm:basis-[82%]'
                          }
                        >
                          <Button
                            variant="outline"
                            className="flex h-full min-h-[76px] w-full items-center justify-between gap-3 whitespace-normal rounded-xl border-game-border bg-game-surface-raised p-3 text-left text-game-ink shadow-sm hover:border-game-moss/45 hover:bg-game-moss/5"
                            onClick={() => handleItemClick(item)}
                            disabled={!!usingItem}
                          >
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-canvas/70">
                                <ItemSprite
                                  itemId={item.itemId}
                                  alt={item.definition.name}
                                  width={36}
                                  height={36}
                                  className="h-9 w-9 pixelated"
                                />
                              </div>
                              <div className="min-w-0 flex-1 text-left">
                                <div className="font-display text-sm font-semibold leading-tight">
                                  {item.definition.name}
                                </div>
                                <div className="mt-1 text-xs leading-snug text-game-muted">
                                  {getPokemonItemEffectLabel(item.definition)}
                                </div>
                              </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                              <span className="rounded-full border border-game-border bg-game-canvas/70 px-2 py-1 font-mono text-xs font-semibold text-game-muted">
                                ×
                                {inventoryStore[item.itemId] !== undefined
                                  ? inventoryStore[item.itemId]
                                  : item.quantity}
                              </span>
                              {usingItem === item.itemId && (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              )}
                            </div>
                          </Button>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </section>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
