'use client'

import {
  Coins,
  Flame,
  Minus,
  PackageOpen,
  Plus,
  Sparkles,
  Wand2,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner'
import { RewardCarousel } from '@/components/game/reward-carousel'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import { PremiumSearch } from '@/components/game/shared/PremiumSearch'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import {
  STANCE_ICON_CONFIG,
  StanceIcon,
} from '@/components/game/shared/stance-icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { currencies } from '@/data/currencies'
import { items } from '@/data/items'
import {
  getInventoryDisplayPlacement,
  getInventorySubCategoryLabel,
  INVENTORY_GROUP_LABELS,
  INVENTORY_GROUP_ORDER,
  INVENTORY_SUBCATEGORY_ORDER,
  type InventoryDisplayGroup,
  type InventoryDisplaySubCategory,
} from '@/data/items/types'
import { getMove } from '@/data/moves'
import type { MoveConfig } from '@/data/moves/types'
import type {
  PokemonData,
  PokemonForm,
  PokemonSpecies,
} from '@/data/pokemon-data'
import pokemonData from '@/data/pokemon-data'
import {
  BOOK_OF_CHANNELING_ITEM_ID,
  getSpiritChannelingActivityId,
  getSpiritChannelingConfigForMemento,
  isSpiritChannelingMementoItem,
} from '@/data/spirit-channeling'
import { TaskIcon } from '@/data/types'
import { cn } from '@/lib/utils'
import { isPokemonTargetedInventoryItem } from '@/utilities/pokemon/item-usability'
import {
  getMoveDisplayType,
  getMoveInfoTags,
  getMoveLevel,
  getMoveTypeSpriteItemId,
} from '@/utilities/pokemon/move-display'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { RewardSummary } from '@/utilities/rewards/reward-logic'
import { getItemSkillLockReason } from '@/utilities/skills/unlocks'
import {
  sellItem,
  useAllBoosterPacks,
  useBoosterPack,
  useConsumable,
  useScratchCard,
} from '../actions'
import { ScratchCardModal } from './scratch-card-modal'

const CardDrawReveal = lazy(() =>
  import('@/components/tcg/CardDrawReveal').then((module) => ({
    default: module.CardDrawReveal,
  })),
)

import type { TcgCard } from '@/data/tcg/types'

type InventoryListItem = {
  id: string
  itemId: string
  quantity: number
  details: (typeof items)[number]
  displayGroup: InventoryDisplayGroup
  displaySubCategory: InventoryDisplaySubCategory
  canChannel: boolean
}

type RecentInventoryItem = {
  itemId: string
  quantity: number
  seenAt: number
}

type PokedexProgressByForm = Record<
  string,
  {
    seen?: boolean | null
    caught?: boolean | null
  }
>

interface MoveLearner {
  species: PokemonSpecies
  form: PokemonForm
  progress?: PokedexProgressByForm[string]
}

const RECENT_INVENTORY_STORAGE_KEY = 'pokemon-app:recent-inventory-items'

function getItemActionLabel(
  item: (typeof items)[number],
  canChannel = false,
): string | null {
  if (canChannel) return 'Channel'
  if (item.sellValue) return 'Sell'
  if (item.category === 'booster-pack') return 'Open'
  if (item.category === 'scratch-card') return 'Scratch'
  if (
    item.effects?.grantSkillXp ||
    item.effects?.grantPokemonResearchXp ||
    item.effects?.startBattle ||
    item.effects?.startEncounter ||
    item.effects?.startResearch ||
    item.effects?.startMinigame ||
    item.category === 'ability-patch' ||
    item.category === 'vitamin' ||
    item.category === 'candy'
  ) {
    return item.effects?.startBattle
      ? 'Battle'
      : item.effects?.startEncounter
        ? 'Encounter'
        : item.effects?.startResearch
          ? 'Research'
          : item.effects?.startMinigame
            ? 'Play'
            : 'Use'
  }

  if (item.battleEffect) return 'Battle Only'
  return null
}

function getItemActionIcon(item: (typeof items)[number], canChannel = false) {
  if (canChannel) return Flame
  if (item.sellValue) return Coins
  if (item.category === 'booster-pack') return PackageOpen
  if (item.category === 'scratch-card') return Sparkles
  return Wand2
}

function canChannelItem(
  itemId: string,
  inventoryMap: Record<string, number>,
  researchEncounterResults:
    | {
        encounterId: string
        wins: number
        losses: number
        lastPlayed?: string
      }[]
    | undefined,
) {
  if (!isSpiritChannelingMementoItem(itemId)) return false
  if ((inventoryMap[BOOK_OF_CHANNELING_ITEM_ID] || 0) <= 0) return false
  const config = getSpiritChannelingConfigForMemento(itemId)
  if (!config) return false
  const activityId = getSpiritChannelingActivityId(config)
  return !(researchEncounterResults || []).some(
    (entry) => entry.encounterId === activityId && (entry.wins || 0) > 0,
  )
}

function getInventoryItemDescription(
  item: (typeof items)[number] | null,
  hasChannelingBook: boolean,
) {
  if (!item) return undefined
  if (isSpiritChannelingMementoItem(item.id) && !hasChannelingBook) {
    return 'A small keepsake with a faint, unusual presence.'
  }

  return item.description
}

function getEmptyMessage(
  activeGroup: InventoryDisplayGroup | null,
  activeSubCategory: InventoryDisplaySubCategory | null,
  hasSearch: boolean,
) {
  if (hasSearch)
    return 'No matching items. Try a different name, category, or effect.'

  switch (activeSubCategory || activeGroup) {
    case 'capture-tools':
    case 'encounter':
      return 'No encounter tools yet. Buy Poke Balls from shops or earn them from tasks.'
    case 'battle-kit':
      return 'No battle or recovery items yet. Shops and battles are the fastest way to stock up.'
    case 'encounter-tools':
      return 'No lures or escape tools yet. Explore and check specialty shops.'
    case 'candies':
    case 'berries':
      return 'No training treats yet. Research, battles, and rewards can add candies or berries.'
    case 'materials':
    case 'crafting':
      return 'No crafting materials yet. Gather materials and gems from catches and field studies.'
    case 'tcg':
    case 'booster-packs':
    case 'binders':
      return 'No TCG items yet. Look for binders and booster packs from shops or rewards.'
    case 'training':
    case 'evolution-items':
    case 'vitamins':
    case 'ability-patches':
      return 'No training items yet. These usually come from tougher shops and rewards.'
    case 'key-items':
    case 'books':
    case 'tms':
      return 'No TMs/HMs in this pocket yet.'
    default:
      return 'No items found in this pocket yet.'
  }
}

function getInventoryDisplayLabel(
  activeGroup: InventoryDisplayGroup | null,
  activeSubCategory: InventoryDisplaySubCategory | null,
) {
  if (!activeGroup) return 'Items'

  const groupLabel = INVENTORY_GROUP_LABELS[activeGroup]
  if (!activeSubCategory) return groupLabel

  const subLabel = getInventorySubCategoryLabel(activeSubCategory)
  if (activeGroup === 'tms' && activeSubCategory === 'tms') return groupLabel

  return `${groupLabel} · ${subLabel}`
}

function getMoveLearners(move: MoveConfig): {
  learners: MoveLearner[]
  allPokemon: boolean
} {
  const allowedForms = new Set(
    move.formId?.map((formId) => String(formId)) ?? [],
  )
  const learners: MoveLearner[] = []

  for (const species of pokemonData as PokemonData) {
    for (const form of species.forms) {
      if (!allowedForms.has(String(form.id))) continue
      learners.push({ species, form })
    }
  }

  return {
    learners: learners.sort((a, b) => {
      if (a.species.id !== b.species.id) return a.species.id - b.species.id
      return Number(a.form.id) - Number(b.form.id)
    }),
    allPokemon: false,
  }
}

export function InventoryList() {
  const { user, gameData, refreshUser } = useUser()
  const router = useRouter()
  const [activeGroup, setActiveGroup] = useState<InventoryDisplayGroup | null>(
    null,
  )
  const [activeSubCategory, setActiveSubCategory] =
    useState<InventoryDisplaySubCategory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<
    (typeof items)[number] | null
  >(null)
  const [pendingSale, setPendingSale] = useState<{
    item: (typeof items)[number]
    quantity: number
  } | null>(null)
  const [isSelling, setIsSelling] = useState(false)
  const [isUsing, setIsUsing] = useState(false)
  const [sellQuantity, setSellQuantity] = useState(1)
  const [recentItems, setRecentItems] = useState<RecentInventoryItem[]>([])
  const previousInventoryRef = useRef<Record<string, number> | null>(null)
  const [scratchData, setScratchData] = useState<{
    open: boolean
    background: string
    icon: TaskIcon
    rewards: any[]
    summary?: RewardSummary
  } | null>(null)

  const [rewardResult, setRewardResult] = useState<{
    open: boolean
    summary: RewardSummary
    item: (typeof items)[number]
  } | null>(null)

  const [packData, setPackData] = useState<{
    cards: TcgCard[]
    skipReveal?: boolean
  } | null>(null)

  const inventoryMap = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )
  const pokedexByForm = useMemo<PokedexProgressByForm>(() => {
    return Object.fromEntries(
      (gameData?.pokedex || []).map(({ formId, seen, caught }) => [
        String(formId),
        { seen, caught },
      ]),
    )
  }, [gameData?.pokedex])
  const walletRewards = useMemo(() => {
    const userCurrency = (user?.currency || {}) as Record<string, number>

    return currencies
      .map((currency) => ({
        ...currency,
        amount: userCurrency[currency.id] || 0,
      }))
      .filter((currency) => currency.amount > 0)
      .map((currency) => ({
        icon: (
          <div className="relative">
            <ItemSprite
              itemId={currency.iconId}
              alt={currency.name}
              width={28}
              height={28}
              className="relative z-10 object-contain"
            />
          </div>
        ),
        label: currency.name,
        subLabel: currency.amount.toLocaleString(),
      }))
  }, [user?.currency])

  const inventory = useMemo(() => {
    return Object.entries(inventoryMap)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => ({
        id: itemId,
        itemId,
        quantity,
      }))
  }, [inventoryMap])

  const inventoryWithDetails = useMemo<InventoryListItem[]>(
    () =>
      inventory
        .map((invItem) => {
          const itemDetails = items.find((i) => i.id === invItem.itemId)
          if (!itemDetails) {
            return null
          }

          const placement = getInventoryDisplayPlacement(itemDetails)

          return {
            ...invItem,
            details: itemDetails,
            displayGroup: placement.group,
            displaySubCategory: placement.subCategory,
            canChannel: canChannelItem(
              itemDetails.id,
              inventoryMap,
              gameData?.researchEncounterResults,
            ),
          }
        })
        .filter((item): item is InventoryListItem => item !== null),
    [gameData?.researchEncounterResults, inventory, inventoryMap],
  )

  useEffect(() => {
    try {
      const storedRecent = window.localStorage.getItem(
        RECENT_INVENTORY_STORAGE_KEY,
      )
      if (storedRecent) {
        setRecentItems(JSON.parse(storedRecent) as RecentInventoryItem[])
      }
    } catch {
      setRecentItems([])
    }
  }, [])

  useEffect(() => {
    const previousInventory = previousInventoryRef.current
    previousInventoryRef.current = inventoryMap

    if (!previousInventory) return

    const gainedItems = Object.entries(inventoryMap)
      .filter(
        ([itemId, quantity]) => quantity > (previousInventory[itemId] || 0),
      )
      .map(([itemId, quantity]) => ({
        itemId,
        quantity: quantity - (previousInventory[itemId] || 0),
        seenAt: Date.now(),
      }))

    if (gainedItems.length === 0) return

    setRecentItems((current) => {
      const next = [...gainedItems, ...current]
        .filter(
          (item, index, all) =>
            all.findIndex((candidate) => candidate.itemId === item.itemId) ===
            index,
        )
        .slice(0, 6)

      try {
        window.localStorage.setItem(
          RECENT_INVENTORY_STORAGE_KEY,
          JSON.stringify(next),
        )
      } catch {
        // Local storage is only used for a best-effort recent session rail.
      }

      return next
    })
  }, [inventoryMap])

  const groupCounts = useMemo(() => {
    return inventoryWithDetails.reduce(
      (counts, item) => {
        counts[item.displayGroup] =
          (counts[item.displayGroup] || 0) + item.quantity
        return counts
      },
      {} as Partial<Record<InventoryDisplayGroup, number>>,
    )
  }, [inventoryWithDetails])

  const groups = useMemo(() => {
    const uniqueGroups = new Set(
      inventoryWithDetails.map((item) => item.displayGroup),
    )

    return Array.from(uniqueGroups).sort((a, b) => {
      const idxA = INVENTORY_GROUP_ORDER.indexOf(a)
      const idxB = INVENTORY_GROUP_ORDER.indexOf(b)

      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      if (idxA !== -1) return -1
      if (idxB !== -1) return 1

      return a.localeCompare(b)
    })
  }, [inventoryWithDetails])

  const subCategories = useMemo(() => {
    if (!activeGroup) {
      return []
    }

    const uniqueSubCategories = new Set(
      inventoryWithDetails
        .filter((item) => item.displayGroup === activeGroup)
        .map((item) => item.displaySubCategory),
    )
    const preferredOrder = INVENTORY_SUBCATEGORY_ORDER[activeGroup] || []

    return Array.from(uniqueSubCategories).sort((a, b) => {
      const idxA = preferredOrder.indexOf(a)
      const idxB = preferredOrder.indexOf(b)

      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      if (idxA !== -1) return -1
      if (idxB !== -1) return 1

      return getInventorySubCategoryLabel(a).localeCompare(
        getInventorySubCategoryLabel(b),
      )
    })
  }, [inventoryWithDetails, activeGroup])

  useEffect(() => {
    if (groups.length === 0) {
      setActiveGroup(null)
      return
    }

    if (!activeGroup || !groups.includes(activeGroup)) {
      setActiveGroup(groups[0])
    }
  }, [groups, activeGroup])

  useEffect(() => {
    if (!activeGroup || subCategories.length === 0) {
      setActiveSubCategory(null)
      return
    }

    if (!activeSubCategory || !subCategories.includes(activeSubCategory)) {
      setActiveSubCategory(subCategories[0])
    }
  }, [activeGroup, subCategories, activeSubCategory])

  const filteredInventory = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return inventoryWithDetails
      .filter((item) => {
        if (!normalizedSearch) {
          if (!activeGroup) return false
          if (item.displayGroup !== activeGroup) return false
          return (
            !activeSubCategory || item.displaySubCategory === activeSubCategory
          )
        }

        const searchableText = [
          item.details.name,
          item.details.description,
          item.details.id,
          item.details.category,
          INVENTORY_GROUP_LABELS[item.displayGroup],
          getInventorySubCategoryLabel(item.displaySubCategory),
          getItemActionLabel(item.details, item.canChannel),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return searchableText.includes(normalizedSearch)
      })
      .sort((a, b) => a.details.name.localeCompare(b.details.name))
  }, [inventoryWithDetails, activeGroup, activeSubCategory, searchQuery])

  const recentInventory = useMemo(() => {
    return recentItems
      .map((recent) => {
        const item = inventoryWithDetails.find(
          (entry) => entry.itemId === recent.itemId,
        )
        if (!item) return null
        return item
      })
      .filter((item): item is InventoryListItem => item !== null)
  }, [inventoryWithDetails, recentItems])

  const selectedItemDisplayPlacement = useMemo(
    () => (selectedItem ? getInventoryDisplayPlacement(selectedItem) : null),
    [selectedItem],
  )
  const isTmOrHmItem = useMemo(
    () =>
      !!(
        selectedItemDisplayPlacement &&
        selectedItemDisplayPlacement.group === 'tms' &&
        selectedItemDisplayPlacement.subCategory === 'tms'
      ),
    [selectedItemDisplayPlacement],
  )
  const selectedMove = useMemo(
    () => (selectedItem?.moveId ? getMove(selectedItem.moveId) : undefined),
    [selectedItem],
  )

  const activeDisplayLabel = getInventoryDisplayLabel(
    activeGroup,
    activeSubCategory,
  )
  const selectedItemQuantity = selectedItem
    ? inventoryMap[selectedItem.id] || 0
    : 0
  const selectedSellTotal = selectedItem
    ? (selectedItem.sellValue || 0) * sellQuantity
    : 0
  const selectedPokemonItemLockReason =
    selectedItem && isPokemonTargetedInventoryItem(selectedItem)
      ? getItemSkillLockReason(selectedItem, user?.skills)
      : null
  const selectedItemCanChannel = selectedItem
    ? canChannelItem(
        selectedItem.id,
        inventoryMap,
        gameData?.researchEncounterResults,
      )
    : false
  const hasChannelingBook = (inventoryMap[BOOK_OF_CHANNELING_ITEM_ID] || 0) > 0
  const selectedItemDescription = getInventoryItemDescription(
    selectedItem,
    hasChannelingBook,
  )

  useEffect(() => {
    if (!selectedItem) return
    const quantity = inventoryMap[selectedItem.id] || 1
    setSellQuantity((current) => Math.min(Math.max(current, 1), quantity))
  }, [selectedItem, inventoryMap])

  const executeSellItem = useCallback(
    async (item: (typeof items)[number], quantity: number) => {
      if (isSelling || !item.sellValue) return
      setIsSelling(true)
      try {
        const result = await sellItem(item.id, quantity)
        if (result.success) {
          const totalValue = item.sellValue * quantity
          toast.success(
            `Sold ${quantity} ${item.name} for ${totalValue} ${item.sellCurrency || 'Pokedollars'}!`,
          )
          const newQty =
            (result.newInventory as Record<string, number>)?.[item.id] || 0
          if (newQty <= 0 || selectedItem?.id === item.id) setSelectedItem(null)
          refreshUser()
        } else {
          toast.error(result.error || 'Failed to sell item')
        }
      } catch {
        toast.error('An error occurred')
      } finally {
        setIsSelling(false)
      }
    },
    [isSelling, refreshUser, selectedItem?.id],
  )

  const requestSellItem = useCallback(
    (item: (typeof items)[number], quantity: number) => {
      if (isSelling || !item.sellValue) return
      setPendingSale({ item, quantity })
    },
    [isSelling],
  )

  const handleUseInventoryItem = useCallback(
    async (item: (typeof items)[number]) => {
      if (isUsing) return

      if (
        canChannelItem(
          item.id,
          inventoryMap,
          gameData?.researchEncounterResults,
        )
      ) {
        router.push(`/game/spirit-channeling?memento=${item.id}`)
        setSelectedItem(null)
        return
      }

      if (isPokemonTargetedInventoryItem(item)) {
        const lockReason = getItemSkillLockReason(item, user?.skills)
        if (lockReason) {
          toast.error(lockReason)
          return
        }
        router.push(`/game/pokemon?selectFor=${item.id}`)
        setSelectedItem(null)
        return
      }

      setIsUsing(true)
      try {
        if (item.category === 'booster-pack') {
          const result = await useBoosterPack(item.id)
          if (result.success && result.cards && item.boosterPack) {
            setSelectedItem(null)
            refreshUser()
            setPackData({
              cards: result.cards,
              skipReveal: false,
            })
          } else {
            toast.error((result as any).error || 'Failed to open pack')
          }
          return
        }

        if (item.category === 'scratch-card') {
          const result = await useScratchCard(item.id)
          if (
            result.success &&
            result.background &&
            result.icon &&
            result.rewards
          ) {
            setSelectedItem(null)
            refreshUser()
            setScratchData({
              open: true,
              background: result.background,
              icon: result.icon,
              rewards: result.rewards,
              summary: result.summary,
            })
          } else {
            toast.error(result.error || 'Failed to scratch card')
          }
          return
        }

        if (
          item.effects?.grantSkillXp ||
          item.effects?.grantPokemonResearchXp?.formId ||
          item.effects?.startBattle ||
          item.effects?.startEncounter ||
          item.effects?.startResearch ||
          item.effects?.startMinigame
        ) {
          const result = await useConsumable(item.id)
          if (result.success && result.summary) {
            refreshUser()
            setRewardResult({
              open: true,
              summary: result.summary,
              item,
            })
            setSelectedItem(null)
          } else if (result.success && result.redirect) {
            router.push(result.redirect)
            setSelectedItem(null)
          } else {
            toast.error(result.error || 'Failed to use item')
          }
        }
      } catch {
        toast.error('An error occurred')
      } finally {
        setIsUsing(false)
      }
    },
    [
      gameData?.researchEncounterResults,
      inventoryMap,
      isUsing,
      refreshUser,
      router,
      user?.skills,
    ],
  )

  const handleOpenAllBoosterPacks = useCallback(
    async (item: (typeof items)[number]) => {
      if (isUsing || item.category !== 'booster-pack') return

      setIsUsing(true)
      try {
        const result = await useAllBoosterPacks(item.id)
        if (result.success && result.cards) {
          setSelectedItem(null)
          refreshUser()
          setPackData({
            cards: result.cards,
            skipReveal: true,
          })
          return
        }

        toast.error((result as any).error || 'Failed to open packs')
      } catch {
        toast.error('An error occurred')
      } finally {
        setIsUsing(false)
      }
    },
    [isUsing, refreshUser],
  )

  return (
    <div className="game-paper-first game-paper-background flex flex-col h-full overflow-hidden bg-game-canvas text-game-ink">
      <PremiumHeader title="INVENTORY" subtitle="Storage" />

      <div className="hidden items-center gap-3 border-b border-game-border bg-game-surface/70 px-6 py-3 xl:flex">
        <div className="min-w-0 flex-1">
          <PremiumSearch
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onClear={() => setSearchQuery('')}
            showClear={searchQuery.length > 0}
            placeholder="Search items"
          />
        </div>
        <div className="w-64 shrink-0">
          <PremiumSelect
            value={activeGroup || ''}
            onValueChange={(value) =>
              setActiveGroup(value as InventoryDisplayGroup)
            }
            options={groups.map((group) => ({
              id: group,
              label: `${INVENTORY_GROUP_LABELS[group] || group} (${groupCounts[group] || 0})`,
            }))}
          />
        </div>
      </div>

      {/* Main Content - Scrollable with padding */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 pt-4 pb-4">
        {walletRewards.length > 0 && (
          <div className="mb-6">
            <SectionDivider>Wallet</SectionDivider>
            <div className="mt-3">
              <RewardCarousel rewards={walletRewards} />
            </div>
          </div>
        )}

        {recentInventory.length > 0 && !searchQuery && (
          <div className="mb-6">
            <SectionDivider>Recently Acquired</SectionDivider>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
              {recentInventory.map((item) => (
                <button
                  key={`recent-${item.id}`}
                  type="button"
                  onClick={() => setSelectedItem(item.details)}
                  aria-label={`View ${item.details.name}`}
                  className="flex min-w-[180px] items-center gap-3 rounded-lg border border-game-border bg-game-surface p-3 text-left transition-colors hover:border-game-moss/40 hover:bg-game-surface-raised"
                >
                  <ItemSprite
                    itemId={item.itemId}
                    alt={item.details.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 object-contain"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold italic text-game-ink">
                      {item.details.name}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-game-moss-strong">
                      Owned {item.quantity}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <SectionDivider>
          {searchQuery.trim() ? 'Search Results' : activeDisplayLabel}
        </SectionDivider>

        {filteredInventory.length === 0 ? (
          <div
            className="mx-auto max-w-xl rounded-lg border border-dashed border-game-border-strong bg-game-canvas/60 px-4 py-10 text-center text-sm font-medium text-game-muted"
            role="status"
            aria-live="polite"
          >
            {getEmptyMessage(
              activeGroup,
              activeSubCategory,
              searchQuery.trim().length > 0,
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredInventory.map((item) => (
              <InventoryItemCard
                key={item.id}
                item={item}
                onClick={(details) => setSelectedItem(details)}
                onAction={(details) => {
                  if (details.sellValue) {
                    requestSellItem(details, 1)
                    return
                  }

                  handleUseInventoryItem(details)
                }}
                onBulkAction={(details) => handleOpenAllBoosterPacks(details)}
                disabledAction={isUsing || isSelling}
              />
            ))}
          </div>
        )}
      </div>

      <SecondaryControlBar className="xl:hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(8rem,0.55fr)] gap-2">
          <PremiumSearch
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onClear={() => setSearchQuery('')}
            showClear={searchQuery.length > 0}
            placeholder="Search items"
          />
          <PremiumSelect
            value={activeGroup || ''}
            onValueChange={(value) =>
              setActiveGroup(value as InventoryDisplayGroup)
            }
            options={groups.map((group) => ({
              id: group,
              label: `${INVENTORY_GROUP_LABELS[group] || group} (${groupCounts[group] || 0})`,
            }))}
          />
        </div>
        {subCategories.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {subCategories.map((subCategory) => (
              <Button
                key={subCategory}
                size="sm"
                variant={
                  activeSubCategory === subCategory ? 'default' : 'outline'
                }
                className="shrink-0 whitespace-nowrap"
                onClick={() => setActiveSubCategory(subCategory)}
              >
                {getInventorySubCategoryLabel(subCategory)}
              </Button>
            ))}
          </div>
        )}
      </SecondaryControlBar>

      <GameInfoModal
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
        title={selectedItem?.name || ''}
        description={isTmOrHmItem ? undefined : selectedItemDescription}
        category={
          selectedItemDisplayPlacement
            ? selectedItemDisplayPlacement.group === 'tms' &&
              selectedItemDisplayPlacement.subCategory === 'tms'
              ? INVENTORY_GROUP_LABELS[selectedItemDisplayPlacement.group]
              : `${INVENTORY_GROUP_LABELS[selectedItemDisplayPlacement.group]} · ${getInventorySubCategoryLabel(selectedItemDisplayPlacement.subCategory)}`
            : undefined
        }
        icon={
          selectedItem ? (
            <ItemSprite
              itemId={selectedItem.id}
              alt={selectedItem.name}
              width={64}
              height={64}
              className="w-12 h-12 object-contain"
            />
          ) : null
        }
        properties={
          selectedItem && !isTmOrHmItem
            ? [
                {
                  label: 'Owned',
                  value: selectedItemQuantity,
                  icon: <PackageOpen className="w-4 h-4" />,
                },
                ...(selectedItem.sellValue
                  ? [
                      {
                        label: 'Sell',
                        value: `${selectedItem.sellValue} ${selectedItem.sellCurrency || 'Pokedollars'}`,
                        icon: <Coins className="w-4 h-4" />,
                      },
                    ]
                  : []),
                ...(selectedItem.consume === false
                  ? [
                      {
                        label: 'Consumed',
                        value: 'No',
                        icon: <Sparkles className="w-4 h-4" />,
                      },
                    ]
                  : []),
                ...(selectedItem.battleEffect
                  ? [
                      {
                        label: 'Effect',
                        value: selectedItem.battleEffect.type,
                        icon: <Wand2 className="w-4 h-4" />,
                      },
                    ]
                  : []),
              ]
            : undefined
        }
        autoScrollRewards={false}
        presentation="drawer"
        actionButton={
          selectedItemCanChannel && selectedItem ? (
            <Button
              className="w-full bg-game-clay font-bold text-game-cream hover:bg-game-clay-strong"
              disabled={isUsing}
              onClick={() => handleUseInventoryItem(selectedItem)}
            >
              <span className="flex items-center gap-2">
                <Flame className="h-4 w-4" />
                Channel
              </span>
            </Button>
          ) : selectedItem?.sellValue ? (
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-game-border bg-game-surface-raised p-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="h-10 w-10 text-game-muted hover:bg-game-surface hover:text-game-ink"
                  disabled={sellQuantity <= 1 || isSelling}
                  onClick={() =>
                    setSellQuantity((quantity) => Math.max(1, quantity - 1))
                  }
                  aria-label="Decrease sell quantity"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="text-center">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-game-muted">
                    Sell quantity
                  </div>
                  <div className="font-mono text-lg font-black text-game-ink">
                    {sellQuantity}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="h-10 w-10 text-game-muted hover:bg-game-surface hover:text-game-ink"
                  disabled={sellQuantity >= selectedItemQuantity || isSelling}
                  onClick={() =>
                    setSellQuantity((quantity) =>
                      Math.min(selectedItemQuantity, quantity + 1),
                    )
                  }
                  aria-label="Increase sell quantity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-3 w-full">
                <Button
                  variant="secondary"
                  className="flex-1 border-2 border-game-border font-bold hover:bg-game-surface"
                  disabled={isSelling}
                  onClick={() => requestSellItem(selectedItem, sellQuantity)}
                >
                  {isSelling ? (
                    '...'
                  ) : (
                    <span className="flex items-center gap-2">
                      Sell {sellQuantity}{' '}
                      <span className="text-game-muted">
                        ({selectedSellTotal})
                      </span>
                    </span>
                  )}
                </Button>
                <Button
                  className="flex-1 bg-game-clay font-bold text-game-cream hover:bg-game-clay-strong"
                  disabled={isSelling}
                  onClick={() =>
                    requestSellItem(selectedItem, selectedItemQuantity)
                  }
                >
                  {isSelling ? (
                    'Selling…'
                  ) : (
                    <span className="flex items-center gap-2">
                      Sell All{' '}
                      <span className="text-game-cream">
                        ({(selectedItem.sellValue || 0) * selectedItemQuantity})
                      </span>
                    </span>
                  )}
                </Button>
              </div>
            </div>
          ) : selectedItem?.category === 'booster-pack' ? (
            <div className="flex w-full items-center gap-2">
              <Button
                className="flex-1 bg-game-clay font-bold text-game-cream hover:bg-game-clay-strong"
                disabled={isUsing}
                onClick={() => handleUseInventoryItem(selectedItem)}
              >
                {isUsing ? 'Opening…' : 'Open pack'}
              </Button>
              <Button
                type="button"
                size="icon"
                className="h-11 w-11 rounded-xl bg-game-clay text-game-cream hover:bg-game-clay-strong"
                disabled={isUsing || selectedItemQuantity <= 0}
                onClick={() => handleOpenAllBoosterPacks(selectedItem)}
                aria-label={`Open all ${selectedItem.name}`}
                title={`Open all ${selectedItem.name}`}
              >
                <Zap className="h-5 w-5" />
              </Button>
            </div>
          ) : selectedItem?.category === 'scratch-card' ? (
            <Button
              className="w-full bg-game-clay text-game-cream font-bold hover:bg-game-clay/90"
              disabled={isUsing}
              onClick={() => handleUseInventoryItem(selectedItem)}
            >
              {isUsing ? 'Scratching...' : 'Scratch!'}
            </Button>
          ) : selectedItem?.effects?.grantSkillXp ||
            selectedItem?.effects?.grantPokemonResearchXp?.formId ||
            selectedItem?.effects?.startBattle ||
            selectedItem?.effects?.startEncounter ||
            selectedItem?.effects?.startResearch ||
            selectedItem?.effects?.startMinigame ? (
            <Button
              className="w-full bg-game-clay text-game-cream font-bold hover:bg-game-clay/90"
              disabled={isUsing}
              onClick={() => handleUseInventoryItem(selectedItem)}
            >
              {isUsing ? 'Using...' : 'Use Item'}
            </Button>
          ) : selectedItem?.category === 'ability-patch' ||
            selectedItem?.category === 'vitamin' ||
            selectedItem?.category === 'candy' ||
            (selectedItem?.effects?.grantPokemonResearchXp &&
              !selectedItem?.effects?.grantPokemonResearchXp.formId) ? (
            <Button
              className="w-full bg-game-clay text-game-cream font-bold hover:bg-game-clay/90"
              disabled={!!selectedPokemonItemLockReason}
              onClick={() => handleUseInventoryItem(selectedItem)}
            >
              {selectedPokemonItemLockReason ? 'Locked' : 'Use Item'}
            </Button>
          ) : undefined
        }
      >
        {selectedItem?.moveId && selectedMove && (
          <TmMoveDetails
            item={selectedItem}
            move={selectedMove}
            pokedexByForm={pokedexByForm}
          />
        )}
      </GameInfoModal>
      <AlertDialog
        open={!!pendingSale}
        onOpenChange={(open) => !open && setPendingSale(null)}
      >
        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-lg border-game-border bg-game-surface text-game-ink">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl text-game-ink">
              Confirm sale
            </AlertDialogTitle>
            <AlertDialogDescription className="text-game-muted">
              {pendingSale
                ? `Sell ${pendingSale.quantity} ${pendingSale.item.name} for ${(pendingSale.item.sellValue || 0) * pendingSale.quantity} ${pendingSale.item.sellCurrency || 'Pokedollars'}? This cannot be undone.`
                : 'Choose whether to sell this item.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:gap-3">
            <AlertDialogCancel className="min-h-11 w-full border-game-border text-game-ink hover:bg-game-surface-raised sm:w-auto">
              Keep item
            </AlertDialogCancel>
            <AlertDialogAction
              className="min-h-11 w-full bg-game-clay text-game-cream hover:bg-game-clay-strong sm:w-auto"
              onClick={() => {
                if (!pendingSale) return
                const sale = pendingSale
                setPendingSale(null)
                void executeSellItem(sale.item, sale.quantity)
              }}
            >
              Confirm sale
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ScratchCardModal
        open={!!scratchData?.open}
        onOpenChange={(open) => !open && setScratchData(null)}
        background={scratchData?.background || ''}
        icon={scratchData?.icon || { type: 'item', id: 'unknown' }}
        rewards={scratchData?.rewards || []}
        summary={scratchData?.summary}
        onClose={() => {
          setScratchData(null)
          refreshUser()
        }}
      />

      {/* Reward Result Overlay for Consumables */}
      {rewardResult && (
        <RewardResultOverlay
          onClose={() => setRewardResult(null)}
          result={{
            success: true,
            message: `You used ${rewardResult.item.name}!`,
            rewards: rewardResult.summary as any,
          }}
          title="Item Used"
          message={`You used ${rewardResult.item.name}!`}
          icon={{ type: 'item', id: rewardResult.item.id }}
          iconAlt={rewardResult.item.name}
        />
      )}
      {packData?.cards && (
        <Suspense
          fallback={
            <div
              className="p-8 text-center text-game-muted"
              role="status"
              aria-live="polite"
            >
              Preparing cards…
            </div>
          }
        >
          <CardDrawReveal
            cards={packData.cards}
            skipReveal={packData.skipReveal}
            onComplete={() => {
              setPackData(null)
              refreshUser()
            }}
          />
        </Suspense>
      )}
    </div>
  )
}

function TmMoveDetails({
  item,
  move,
  pokedexByForm,
}: {
  item: (typeof items)[number]
  move: MoveConfig
  pokedexByForm: PokedexProgressByForm
}) {
  const { learners, allPokemon } = useMemo(() => getMoveLearners(move), [move])
  const tags = useMemo(() => getMoveInfoTags(move), [move])
  const moveType = getMoveDisplayType(move)
  const moveTypeLabel = moveType === 'random' ? 'Random' : moveType
  const filteredTags = useMemo(
    () =>
      tags.filter(
        (tag) =>
          tag.label !== 'Level' &&
          tag.label !== 'Stance' &&
          tag.label !== 'Type',
      ),
    [tags],
  )
  const stanceConfig = STANCE_ICON_CONFIG[move.stance]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <SectionDivider>Move data</SectionDivider>
        <div className="rounded-lg border border-game-border bg-game-surface p-4 md:p-5">
          <div className="flex items-start gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
              <ItemSprite
                itemId={getMoveTypeSpriteItemId(move)}
                alt={`${moveType} TM`}
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-xl font-semibold text-game-ink">
                  {move.name}
                </h3>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <StanceIcon
                  stance={move.stance}
                  className={cn(
                    'h-4 w-4',
                    stanceConfig?.tone || 'text-game-ochre',
                  )}
                />
                <Badge className="border-game-border bg-game-canvas px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-game-ink">
                  {moveTypeLabel}
                </Badge>
                <Badge className="border-game-ochre/30 bg-game-ochre/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-game-ochre">
                  Use Lv. {getMoveLevel(move)}
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-game-muted">
                {move.description || item.description}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {filteredTags.map((tag) => (
              <div
                key={`${tag.label}-${tag.value}`}
                className="rounded-lg border border-game-border bg-game-surface-raised px-3 py-2"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-game-muted">
                  {tag.label}
                </div>
                <div className="mt-0.5 truncate text-xs font-bold capitalize text-game-ink">
                  {tag.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SectionDivider>Can learn</SectionDivider>
        <div className="rounded-lg border border-game-border bg-game-surface p-3">
          {allPokemon ? (
            <p className="text-sm text-game-ink">
              All Pokemon can use this move.
            </p>
          ) : (
            <div className="max-h-[min(22rem,45dvh)] overflow-y-auto pr-1 custom-scrollbar">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(4.5rem,4.5rem))] justify-start gap-2">
                {learners.map((learner) => (
                  <TmLearnerTile
                    key={`${learner.species.id}-${learner.form.id}`}
                    learner={learner}
                    progress={pokedexByForm[String(learner.form.id)]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TmLearnerTile({
  learner,
  progress,
}: {
  learner: MoveLearner
  progress?: PokedexProgressByForm[string]
}) {
  const hasSeen = !!(progress?.seen || progress?.caught)
  const hasCaught = !!progress?.caught

  return (
    <div
      className={cn(
        'relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-lg border bg-game-surface-raised p-1.5',
        hasCaught
          ? 'border-game-moss/40'
          : hasSeen
            ? 'border-game-border-strong'
            : 'border-game-border',
      )}
      title={hasSeen ? learner.form.name : 'Unknown Pokemon'}
    >
      {hasSeen ? (
        <Image
          src={getPokemonImageUrl(String(learner.form.id), 'sprite')}
          alt={learner.form.name}
          fill
          sizes="80px"
          className="object-contain p-1"
          style={{
            filter: hasCaught ? undefined : 'grayscale(1) opacity(0.75)',
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-game-muted">
            <span className="text-2xl font-bold text-game-muted">?</span>
        </div>
      )}
      <div className="absolute bottom-1 right-1 rounded bg-game-surface/90 px-1 py-0.5 font-mono text-[10px] font-bold leading-none text-game-muted">
        #{learner.species.id}
      </div>
    </div>
  )
}

// Memoized inventory item card to prevent unnecessary re-renders
const InventoryItemCard = memo(function InventoryItemCard({
  item,
  onClick,
  onAction,
  onBulkAction,
  disabledAction,
}: {
  item: InventoryListItem
  onClick: (details: (typeof items)[number]) => void
  onAction: (details: (typeof items)[number]) => void
  onBulkAction?: (details: (typeof items)[number]) => void
  disabledAction: boolean
}) {
  const actionLabel = getItemActionLabel(item.details, item.canChannel)
  const ActionIcon = getItemActionIcon(item.details, item.canChannel)
  const showBulkOpen =
    item.details.category === 'booster-pack' &&
    item.quantity > 1 &&
    !!onBulkAction

  return (
    <div
      onClick={() => onClick(item.details)}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick(item.details)
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.details.name}`}
      aria-haspopup="dialog"
      className="game-focus-ring group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-lg border border-game-border bg-game-surface p-3 transition-colors hover:border-game-moss/45 hover:bg-game-surface-raised"
    >
      <div className="relative shrink-0">
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
          <ItemSprite
            itemId={item.itemId}
            alt={item.details.name}
            width={48}
            height={48}
            className="h-9 w-9 object-contain"
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col pt-1">
        <span className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-game-muted transition-colors group-hover:text-game-moss-strong">
          {getInventorySubCategoryLabel(item.displaySubCategory)}
        </span>
        <h3 className="font-semibold italic tracking-tighter text-base truncate text-game-ink leading-none">
          {item.details.name}
        </h3>
        {actionLabel && (
          <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-md border border-game-moss/25 bg-game-moss/8 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-game-moss-strong">
            <ActionIcon className="w-3 h-3" />
            {actionLabel}
          </span>
        )}
      </div>

      {/* Quantity Badge */}
      <div className="shrink-0 flex flex-col items-end gap-2">
        <div className="flex items-center gap-1.5 rounded-lg border border-game-border bg-game-surface-raised px-2 py-1">
          <span className="text-[11px] font-black uppercase tracking-widest text-game-muted">
            Qty
          </span>
          <span className="text-sm font-black text-game-ink font-mono leading-none">
            {item.quantity}
          </span>
        </div>
        {actionLabel && actionLabel !== 'Battle Only' && (
          <div className="relative z-10 flex items-center gap-1">
            <Button
              type="button"
              size="icon-sm"
              disabled={disabledAction}
              className="h-10 w-10 rounded-lg bg-game-clay text-game-cream hover:bg-game-clay-strong"
              onClick={(event) => {
                event.stopPropagation()
                onAction(item.details)
              }}
              aria-label={`${actionLabel} ${item.details.name}`}
              title={`${actionLabel} ${item.details.name}`}
            >
              <ActionIcon className="w-4 h-4" />
            </Button>
            {showBulkOpen && (
              <Button
                type="button"
                size="icon-sm"
                disabled={disabledAction}
                className="h-10 w-10 rounded-lg bg-game-clay text-game-cream hover:bg-game-clay/90"
                onClick={(event) => {
                  event.stopPropagation()
                  onBulkAction(item.details)
                }}
                aria-label={`Open all ${item.details.name}`}
                title={`Open all ${item.details.name}`}
              >
                <Zap className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
})
