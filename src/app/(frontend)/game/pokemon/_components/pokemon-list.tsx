'use client'

import {
  Box,
  Check,
  ChevronDown,
  ChevronUp,
  Circle,
  Diamond,
  Heart,
  Loader2,
  Pencil,
  Plus,
  Square,
  Swords,
  Trash2,
  Triangle,
} from 'lucide-react'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { type PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { items } from '@/data/items'
import type { PokemonData } from '@/data/pokemon-data'
import pokemonData from '@/data/pokemon-data'
import { cn } from '@/lib/utils'
import type { Pokemon } from '@/payload-types'
import { getOwnedPokemonGender } from '@/utilities/pokemon/gender'
import {
  getPokemonItemUnavailableReason,
  isPokemonTargetedInventoryItem,
} from '@/utilities/pokemon/item-usability'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  applyItemToPokemon,
  createBox,
  deleteBox,
  getPokemon,
  getEggsForBox,
  getPokemonTeamLayout,
  getUserPokemonCount,
  identifyPokemon,
  hatchEgg,
  releasePokemonBulk,
  reorderBattleTeam,
  renameBox,
  setPokemonRosterRole,
} from '../actions'
import { PokemonDetailsDialog } from './pokemon-details-dialog'

const POKEMON_BOX_PAGE_SIZE = 18

type RosterSelection =
  | { role: 'battle-team'; position: number }
  | { role: 'companion' }

export function PokemonList() {
  const { user, gameData, refreshUser } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectForItem = searchParams.get('selectFor')
  const itemToUse = selectForItem
    ? items.find((i) => i.id === selectForItem)
    : null
  const isSelectingPokemonForItem = !!itemToUse
  const selectedItemUsesDetailsDialog = Boolean(
    itemToUse?.effects?.maximizeOneIv || itemToUse?.effects?.fusePokemon,
  )

  const [isPanelExpanded, setIsPanelExpanded] = useState(false)
  const inventoryMap = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )

  const userPokemonData = user?.pokemon as any
  const initialDocs =
    userPokemonData?.docs ||
    (Array.isArray(userPokemonData) ? userPokemonData : []) ||
    []
  const initialTotal = userPokemonData?.totalDocs || initialDocs.length

  const [pokemonList, setPokemonList] = useState<Pokemon[]>(initialDocs)
  const [eggs, setEggs] = useState<{ id: string; foundAt: string; hatchAt: string; sourceLocation?: string | null; sourceBackground?: string | null }[]>([])
  const [hatchingEggId, setHatchingEggId] = useState<string | null>(null)
  const [eggHatchResult, setEggHatchResult] = useState<any | null>(null)
  const [eggHatchAnimation, setEggHatchAnimation] = useState<any | null>(null)
  const [battleTeam, setBattleTeam] = useState<Pokemon[]>([])
  const [companion, setCompanion] = useState<Pokemon | null>(null)

  const [hasNextPage, setHasNextPage] = useState(
    userPokemonData?.hasNextPage || false,
  )
  const [nextPage, setNextPage] = useState(userPokemonData?.nextPage || 2)
  const [loading, setLoading] = useState(false)
  const [selectedBoxId, setSelectedBoxId] = useState<string | null | undefined>(
    null,
  )
  const [isCreatingBox, setIsCreatingBox] = useState(false)
  const [isRenamingBox, setIsRenamingBox] = useState(false)
  const [isDeletingBox, setIsDeletingBox] = useState(false)
  const [newBoxName, setNewBoxName] = useState('')
  const [renameBoxName, setRenameBoxName] = useState('')
  const { ref, inView } = useInView()

  const [quickMenuPokemon, setQuickMenuPokemon] = useState<Pokemon | null>(null)
  const [rosterSelection, setRosterSelection] =
    useState<RosterSelection | null>(null)
  const [isAssigningRoster, setIsAssigningRoster] = useState(false)
  const [isReorderingBattleTeam, setIsReorderingBattleTeam] = useState(false)
  const battleTeamSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )
  const [releaseResult, setReleaseResult] = useState<any | null>(null)
  const [releasedPokemonResult, setReleasedPokemonResult] =
    useState<Pokemon | null>(null)
  const [isBulkReleaseMode, setIsBulkReleaseMode] = useState(false)
  const [bulkReleaseIds, setBulkReleaseIds] = useState<string[]>([])
  const [bulkReleaseConfirmOpen, setBulkReleaseConfirmOpen] = useState(false)
  const [isBulkReleasingPokemon, setIsBulkReleasingPokemon] = useState(false)
  const [usingItemOnPokemonId, setUsingItemOnPokemonId] = useState<
    string | null
  >(null)

  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTriggeredRef = useRef(false)
  const didLoadInitialBoxRef = useRef(false)

  useEffect(() => {
    if (gameData?.pokemon && gameData.pokemon.length > 0) {
      const allPokemon = gameData.pokemon
      const newTeam = allPokemon
        .filter((p) => p.onBattleTeam)
        .sort(
          (a, b) => (a.battleTeamPosition || 0) - (b.battleTeamPosition || 0),
        )
      const newCompanion = allPokemon.find((p) => p.isCompanion) || null

      setBattleTeam(newTeam)
      setCompanion(newCompanion)

      // Only update pokemonList if we are NOT in a specific box view, OR if we want to sync
      if (!selectedBoxId) {
        setPokemonList(
          allPokemon.filter((p) => !p.onBattleTeam && !p.isCompanion),
        )
        setHasNextPage(false)
      }
    }
  }, [gameData, selectedBoxId])

  useEffect(() => {
    let cancelled = false

    getPokemonTeamLayout()
      .then(({ battleTeam, companion }) => {
        if (cancelled) return
        setBattleTeam(battleTeam)
        setCompanion(companion)
      })
      .catch(console.error)

    return () => {
      cancelled = true
    }
  }, [gameData?.user?.id])

  const [totalPokemonCount, setTotalPokemonCount] = useState(initialTotal)
  useEffect(() => {
    getUserPokemonCount().then(setTotalPokemonCount)
  }, [])

  const canBulkReleasePokemon = useCallback(
    (pokemon: Pokemon) =>
      !isSelectingPokemonForItem &&
      !pokemon.locked &&
      !pokemon.onBattleTeam &&
      !pokemon.partner &&
      !pokemon.isCompanion,
    [isSelectingPokemonForItem],
  )

  const exitBulkReleaseMode = useCallback(() => {
    setIsBulkReleaseMode(false)
    setBulkReleaseIds([])
    setBulkReleaseConfirmOpen(false)
  }, [])

  const toggleBulkReleaseSelection = useCallback(
    (pokemon: Pokemon) => {
      if (!canBulkReleasePokemon(pokemon)) {
        toast.error('That Pokemon cannot be released.')
        return
      }

      setBulkReleaseIds((prev) =>
        prev.includes(pokemon.id)
          ? prev.filter((id) => id !== pokemon.id)
          : [...prev, pokemon.id],
      )
    },
    [canBulkReleasePokemon],
  )

  const visibleBulkReleaseIds = useMemo(
    () => new Set(pokemonList.map((pokemon) => pokemon.id)),
    [pokemonList],
  )

  useEffect(() => {
    setBulkReleaseIds((prev) =>
      prev.filter((pokemonId) => visibleBulkReleaseIds.has(pokemonId)),
    )
  }, [visibleBulkReleaseIds])

  useEffect(() => {
    if (isSelectingPokemonForItem && isBulkReleaseMode) exitBulkReleaseMode()
  }, [exitBulkReleaseMode, isBulkReleaseMode, isSelectingPokemonForItem])

  const assignRosterRole = async (
    pokemon: Pokemon,
    role: 'box' | 'battle-team' | 'companion',
    position?: number,
  ) => {
    if (
      role === 'battle-team' &&
      battleTeam.length >= 6 &&
      !pokemon.onBattleTeam
    ) {
      toast.error('Your battle team is full.')
      return false
    }
    setIsAssigningRoster(true)
    try {
      const result = await setPokemonRosterRole(
        pokemon.id,
        role,
        role === 'box' ? (selectedBoxId ?? null) : undefined,
        position,
      )
      if (!result.success) {
        toast.error(result.message || 'Could not update Pokemon assignment')
        return false
      }

      // Keep the roster panels and box responsive while the server refresh is
      // settling. The assignment menu is used as a quick, local interaction,
      // so waiting for refreshUser alone leaves the Pokemon visibly in its old
      // location for a moment (and can be especially noticeable on mobile).
      syncPokemonAssignment({
        ...pokemon,
        onBattleTeam: role === 'battle-team',
        battleTeamPosition:
          role === 'battle-team'
            ? result.battleTeamPosition ?? position ?? 1
            : null,
        isCompanion: role === 'companion',
        boxId:
          role === 'box'
            ? result.boxId ?? (selectedBoxId ?? null)
            : pokemon.boxId,
      })
      await refreshUser()
      return true
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Could not update Pokemon assignment',
      )
      return false
    } finally {
      setIsAssigningRoster(false)
    }
  }

  const beginRosterSelection = (selection: RosterSelection) => {
    setRosterSelection(selection)
    setIsPanelExpanded(false)
  }

  const choosePokemonForRoster = async (pokemon: Pokemon) => {
    if (!rosterSelection || isAssigningRoster) return
    const success = await assignRosterRole(
      pokemon,
      rosterSelection.role,
      rosterSelection.role === 'battle-team'
        ? rosterSelection.position
        : undefined,
    )
    if (success) {
      setRosterSelection(null)
      setIsPanelExpanded(true)
    }
  }

  const saveBattleTeamOrder = async (reordered: Pokemon[]) => {
    if (isReorderingBattleTeam) return
    setIsReorderingBattleTeam(true)
    try {
      const result = await reorderBattleTeam(reordered.map((pokemon) => pokemon.id))
      if (!result.success) {
        toast.error(result.message || 'Could not reorder the battle team.')
        return
      }
      setBattleTeam(reordered.map((pokemon, index) => ({ ...pokemon, battleTeamPosition: index + 1 })))
      await refreshUser()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not reorder the battle team.')
    } finally {
      setIsReorderingBattleTeam(false)
    }
  }

  const handleBattleTeamDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    const ordered = [...battleTeam].sort(
      (a, b) => (a.battleTeamPosition || 0) - (b.battleTeamPosition || 0),
    )
    const oldIndex = ordered.findIndex((pokemon) => pokemon.id === active.id)
    const newIndex = ordered.findIndex((pokemon) => pokemon.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    await saveBattleTeamOrder(arrayMove(ordered, oldIndex, newIndex))
  }

  const startLongPress = (pokemon: Pokemon) => {
    if (isBulkReleaseMode || isSelectingPokemonForItem || rosterSelection)
      return
    longPressTriggeredRef.current = false
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
    holdTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true
      setQuickMenuPokemon(pokemon)
    }, 520)
  }

  const cancelLongPress = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current)
    holdTimerRef.current = null
  }

  const handleConfirmBulkRelease = async () => {
    if (bulkReleaseIds.length === 0 || isBulkReleasingPokemon) return

    const selectedIds = [...bulkReleaseIds]
    setIsBulkReleasingPokemon(true)
    try {
      const result = await releasePokemonBulk(selectedIds)
      if (result.success) {
        const releasedIds = new Set((result as any).releasedIds || selectedIds)
        setPokemonList((prev) => prev.filter((p) => !releasedIds.has(p.id)))
        setBattleTeam((prev) => prev.filter((p) => !releasedIds.has(p.id)))
        if (companion && releasedIds.has(companion.id)) setCompanion(null)
        setTotalPokemonCount((prev: number) =>
          Math.max(0, prev - releasedIds.size),
        )
        setBulkReleaseIds([])
        setIsBulkReleaseMode(false)
        setBulkReleaseConfirmOpen(false)
        setReleasedPokemonResult(null)
        setReleaseResult({
          success: true,
          rewards: result.summary,
        })
        refreshUser()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Could not release Pokemon',
      )
    } finally {
      setIsBulkReleasingPokemon(false)
    }
  }

  const loadMore = useCallback(async () => {
    if (loading || !hasNextPage || !nextPage) return
    setLoading(true)
    try {
      const result = await getPokemon(
        nextPage,
        POKEMON_BOX_PAGE_SIZE,
        selectedBoxId,
      )
      const newDocs = result.docs.filter(
        (p) => !p.onBattleTeam && !p.isCompanion,
      )
      setPokemonList((prev) => {
        const existingIds = new Set(prev.map((p) => p.id))
        const uniqueNewDocs = newDocs.filter((p) => !existingIds.has(p.id))
        return [...prev, ...uniqueNewDocs]
      })
      setHasNextPage(result.hasNextPage)
      setNextPage(result.nextPage)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [loading, hasNextPage, nextPage, selectedBoxId])

  useEffect(() => {
    if (inView) loadMore()
  }, [inView, loadMore])

  const handleBoxChange = useCallback(
    async (boxId: string | null | undefined) => {
      exitBulkReleaseMode()
      setSelectedBoxId(boxId)
      setLoading(true)
      setPokemonList([])
      try {
        const result = await getPokemon(1, POKEMON_BOX_PAGE_SIZE, boxId)
        setPokemonList(
          result.docs.filter((p) => !p.onBattleTeam && !p.isCompanion),
        )
        setHasNextPage(result.hasNextPage)
        setNextPage(result.nextPage)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    },
    [exitBulkReleaseMode],
  )

  useEffect(() => {
    if (didLoadInitialBoxRef.current) return
    didLoadInitialBoxRef.current = true
    handleBoxChange(null)
  }, [handleBoxChange])

  useEffect(() => {
    getEggsForBox().then(setEggs).catch(console.error)
  }, [])

  const hatchBoxEgg = async (eggId: string) => {
    setHatchingEggId(eggId)
    try {
      const result = await hatchEgg(eggId)
      if (!result.success) {
        toast.error(result.message)
        return
      }
      setEggs((current) => current.filter((egg) => egg.id !== eggId))
      await refreshUser()
      await handleBoxChange(selectedBoxId)
      setEggHatchAnimation(result)
    } finally {
      setHatchingEggId(null)
    }
  }

  const renderEggCard = (egg: { id: string; hatchAt: string; sourceLocation?: string | null }) => {
    const ready = new Date(egg.hatchAt).getTime() <= Date.now()
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Card className="game-focus-ring group relative h-full w-full aspect-square cursor-pointer border border-game-border bg-game-surface-raised p-1.5 transition-colors hover:border-game-moss/45 hover:bg-game-surface">
            <Image src="/sprites/items/egg.png" alt="Pokemon Egg" width={128} height={128} className="h-full w-full object-contain" />
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-sm border-game-border bg-game-surface-raised text-game-ink">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">???</DialogTitle>
            <DialogDescription className="text-game-muted">An unhatched Pokemon Egg{egg.sourceLocation ? ` found at ${egg.sourceLocation}` : ''}.</DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border border-game-border bg-game-canvas p-5 text-center">
            <Image src="/sprites/pokemon/home/egg.png" alt="Mystery Pokemon Egg" width={192} height={192} className="mx-auto h-40 w-40 object-contain" />
            <dl className="mt-4 grid grid-cols-2 gap-2 text-left text-sm">
              <div><dt className="text-game-muted">Species</dt><dd className="font-semibold">???</dd></div>
              <div><dt className="text-game-muted">Level</dt><dd className="font-semibold">???</dd></div>
              <div><dt className="text-game-muted">Nature</dt><dd className="font-semibold">???</dd></div>
              <div><dt className="text-game-muted">Ability</dt><dd className="font-semibold">???</dd></div>
            </dl>
          </div>
          <DialogFooter>
            {ready ? (
              <Button className="min-h-11 w-full bg-game-clay text-game-cream hover:bg-game-clay-strong" disabled={hatchingEggId === egg.id} onClick={() => hatchBoxEgg(egg.id)}>{hatchingEggId === egg.id ? 'Preparing hatch…' : 'Hatch · 50 Crystals'}</Button>
            ) : (
              <p className="w-full rounded-lg bg-game-moss/10 p-3 text-center font-mono text-sm text-game-moss">Ready {new Date(egg.hatchAt).toLocaleString()}</p>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const visibleEggs = selectedBoxId === null ? eggs : []

  const handleCreateBox = async () => {
    if (!newBoxName.trim()) return
    const result = await createBox(newBoxName)
    if (result.success) {
      setNewBoxName('')
      setIsCreatingBox(false)
      refreshUser()
    }
  }

  const handleRenameBox = async () => {
    if (!renameBoxName.trim() || typeof selectedBoxId !== 'string') return
    const result = await renameBox(selectedBoxId, renameBoxName)
    if (result.success) {
      setRenameBoxName('')
      setIsRenamingBox(false)
      refreshUser()
    }
  }

  const handleDeleteBox = async () => {
    if (typeof selectedBoxId !== 'string') return
    const result = await deleteBox(selectedBoxId)
    if (result.success) {
      handleBoxChange(null)
      setIsDeletingBox(false)
      toast.success('Box deleted')
      refreshUser()
    } else {
      toast.error(result.message)
    }
  }

  const handleIdentify = async (id: string) => {
    const updated = await identifyPokemon(
      id,
      user?.skills?.catching?.level || 1,
    )
    setPokemonList((prev) => prev.map((p) => (p.id === id ? updated : p)))
    setBattleTeam((prev) => prev.map((p) => (p.id === id ? updated : p)))
    refreshUser()
  }

  const belongsInSelectedBox = (pokemon: Pokemon) => {
    if (selectedBoxId === undefined || selectedBoxId === null) {
      return !pokemon.boxId
    }
    return pokemon.boxId === selectedBoxId
  }

  const syncPokemonAssignment = (updated: Pokemon) => {
    setBattleTeam((prev) => {
      const withoutUpdated = prev.filter((p) => p.id !== updated.id)
      if (!updated.onBattleTeam) return withoutUpdated
      return [...withoutUpdated, updated].sort(
        (a, b) => (a.battleTeamPosition || 0) - (b.battleTeamPosition || 0),
      )
    })

    setCompanion((prev) => {
      if (updated.isCompanion) return updated
      if (prev?.id === updated.id) return null
      return prev
    })

    if (updated.isCompanion && companion && companion.id !== updated.id) {
      const oldCompanion = { ...companion, isCompanion: false }
      if (belongsInSelectedBox(oldCompanion)) {
        setPokemonList((prev) => {
          if (prev.some((p) => p.id === oldCompanion.id)) {
            return prev.map((p) =>
              p.id === oldCompanion.id ? oldCompanion : p,
            )
          }
          return [oldCompanion, ...prev]
        })
      }
    }

    setPokemonList((prev) => {
      const withoutUpdated = prev.filter((p) => p.id !== updated.id)
      if (
        updated.onBattleTeam ||
        updated.isCompanion ||
        !belongsInSelectedBox(updated)
      ) {
        return withoutUpdated
      }

      return prev.some((p) => p.id === updated.id)
        ? prev.map((p) => (p.id === updated.id ? updated : p))
        : [updated, ...withoutUpdated]
    })
  }

  const handleUseSelectedItemOnPokemon = async (pokemon: Pokemon) => {
    if (!itemToUse || usingItemOnPokemonId) return
    if (!pokemon.identified) {
      toast.error('Identify this Pokemon before using an item on it.')
      return
    }

    setUsingItemOnPokemonId(pokemon.id)
    try {
      const result = await applyItemToPokemon(pokemon.id, itemToUse.id)
      if (!result.success) {
        toast.error(result.error || 'Failed to use item')
        return
      }

      toast.success(result.message)
      if (result.pokemon) syncPokemonAssignment(result.pokemon)
      await refreshUser()

      const currentQuantity = inventoryMap[itemToUse.id] || 0
      if (currentQuantity <= 1) {
        router.replace('/game/pokemon')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to use item')
    } finally {
      setUsingItemOnPokemonId(null)
    }
  }

  const renderPokemonCard = (
    pokemon: Pokemon,
    options?: { showRosterBadge?: boolean },
  ) => {
    const species = (pokemonData as PokemonData).find(
      (s) => s.id === pokemon.speciesId,
    )
    const form = species?.forms.find((f) => f.id === pokemon.formId)
    const name = pokemon.name || form?.name || 'Unknown'
    const spriteUrl = getPokemonImageUrl(
      pokemon.formId,
      'sprite',
      !!pokemon.shiny,
      getOwnedPokemonGender(pokemon),
    )
    const selectedItemUnavailableReason =
      itemToUse &&
      pokemon.identified &&
      isPokemonTargetedInventoryItem(itemToUse)
        ? getPokemonItemUnavailableReason(
            itemToUse,
            {
              speciesId: pokemon.speciesId,
              formId: pokemon.formId,
              level: pokemon.level,
              evs: pokemon.evs,
              ivs: pokemon.ivs,
              nature: pokemon.nature,
              friendship: pokemon.friendship,
              ability:
                typeof pokemon.ability === 'string'
                  ? pokemon.ability
                  : undefined,
              teraType: pokemon.teraType,
              fusionItemId: pokemon.fusionItemId,
              fusionBaseFormId: pokemon.fusionBaseFormId,
              fusedWithPokemonId: pokemon.fusedWithPokemonId,
              fusedIntoPokemonId: pokemon.fusedIntoPokemonId,
            },
            user?.skills,
          )
        : null
    const isBulkReleaseSelected = bulkReleaseIds.includes(pokemon.id)
    const isBulkReleaseSelectable = canBulkReleasePokemon(pokemon)
    const isCardInteractive =
      pokemon.identified || isBulkReleaseMode || !!rosterSelection
    const markings = [
      {
        key: 'markingSquare',
        className: 'top-1 left-1 text-game-moss',
        Icon: Square,
      },
      {
        key: 'markingCircle',
        className: 'top-1 right-1 text-game-danger',
        Icon: Circle,
      },
      {
        key: 'markingTriangle',
        className: 'bottom-1 left-1 text-game-moss-strong',
        Icon: Triangle,
      },
      {
        key: 'markingDiamond',
        className: 'bottom-1 right-1 text-game-ochre',
        Icon: Diamond,
      },
    ] as const
    const cardContent = (
      <Card
        title={name}
        role={isCardInteractive ? 'button' : undefined}
        tabIndex={isCardInteractive ? 0 : undefined}
        aria-label={isCardInteractive ? name : undefined}
        className={cn(
          'game-focus-ring group relative aspect-square flex items-center justify-center border border-game-border bg-game-surface-raised p-1.5 transition-colors',
          pokemon.locked
            ? 'bg-game-danger/10'
            : 'hover:border-game-moss/45 hover:bg-game-surface',
          pokemon.identified && 'cursor-pointer',
          isBulkReleaseMode && 'cursor-pointer',
          isBulkReleaseMode &&
            isBulkReleaseSelectable &&
            'ring-1 ring-game-danger/30 hover:ring-game-danger/70',
          isBulkReleaseMode &&
            isBulkReleaseSelected &&
            'bg-game-clay/10 ring-2 ring-game-clay',
          isBulkReleaseMode &&
            !isBulkReleaseSelectable &&
            'cursor-not-allowed opacity-50 saturate-50',
          isSelectingPokemonForItem &&
            pokemon.identified &&
            !selectedItemUnavailableReason &&
            'ring-1 ring-game-moss/45 hover:ring-game-moss',
          isSelectingPokemonForItem &&
            pokemon.identified &&
            selectedItemUnavailableReason &&
            'cursor-not-allowed opacity-50 saturate-50',
          usingItemOnPokemonId === pokemon.id &&
            'pointer-events-none opacity-60',
        )}
        onClick={(event) => {
          if (longPressTriggeredRef.current) {
            event.preventDefault()
            event.stopPropagation()
            longPressTriggeredRef.current = false
            return
          }

          if (rosterSelection) {
            event.preventDefault()
            event.stopPropagation()
            choosePokemonForRoster(pokemon)
            return
          }

          if (isBulkReleaseMode) {
            event.preventDefault()
            event.stopPropagation()
            toggleBulkReleaseSelection(pokemon)
            return
          }

          if (
            isSelectingPokemonForItem &&
            pokemon.identified &&
            selectedItemUnavailableReason
          ) {
            event.preventDefault()
            event.stopPropagation()
            toast.error(selectedItemUnavailableReason)
            return
          }

          if (
            isSelectingPokemonForItem &&
            pokemon.identified &&
            !selectedItemUsesDetailsDialog
          ) {
            event.preventDefault()
            event.stopPropagation()
            handleUseSelectedItemOnPokemon(pokemon)
          }
        }}
        onKeyDown={(event) => {
          if (
            isCardInteractive &&
            (event.key === 'Enter' || event.key === ' ')
          ) {
            event.preventDefault()
            event.currentTarget.click()
          }
        }}
        onPointerDown={() => startLongPress(pokemon)}
        onPointerUp={cancelLongPress}
        onPointerCancel={cancelLongPress}
        onPointerLeave={cancelLongPress}
        onContextMenu={(event) => {
          if (longPressTriggeredRef.current) event.preventDefault()
        }}
      >
        {isBulkReleaseMode && (
          <div
            className={cn(
              'absolute top-1 right-1 z-50 flex h-5 w-5 items-center justify-center rounded-md border shadow',
              isBulkReleaseSelected
                ? 'border-game-clay bg-game-clay text-game-cream'
                : 'border-game-border bg-game-surface text-transparent',
            )}
          >
            {isBulkReleaseSelected && <Check className="h-3 w-3" />}
          </div>
        )}
        {options?.showRosterBadge !== false && (
          <div className="absolute top-1 left-1 z-30 flex gap-1">
            {pokemon.onBattleTeam && (
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-game-moss text-game-cream shadow-sm">
                <Swords className="w-3 h-3" />
              </span>
            )}
            {pokemon.isCompanion && (
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-game-clay text-game-cream shadow-sm">
                <Heart className="w-3 h-3" />
              </span>
            )}
          </div>
        )}
        {markings.map(({ key, className, Icon }) =>
          pokemon[key] ? (
            <Icon
              key={key}
              className={cn(
                'pointer-events-none absolute z-40 h-2 w-2 fill-current drop-shadow-[0_0_2px_rgba(0,0,0,0.85)]',
                className,
              )}
            />
          ) : null,
        )}
        <div className="absolute inset-0 flex items-center justify-center p-2">
          {spriteUrl ? (
            <Image
              src={spriteUrl}
              alt={name}
              width={64}
              height={64}
              className={cn(
                'w-full h-full object-contain pixelated z-10 relative drop-shadow-md',
                !pokemon.identified && 'brightness-0 opacity-50',
              )}
            />
          ) : (
            <div className="text-xl font-bold text-game-muted">?</div>
          )}
        </div>
        {!pokemon.identified && !isBulkReleaseMode && (
          <div className="absolute bottom-0 z-20 flex w-full justify-center bg-game-ink/70 p-1">
            <Button
              size="sm"
              className="h-10 w-full max-w-[90%] bg-game-ochre text-[10px] font-bold !text-game-cream hover:bg-game-ochre/90"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleIdentify(pokemon.id)
              }}
            >
              Identify
            </Button>
          </div>
        )}
        {usingItemOnPokemonId === pokemon.id && (
          <div className="absolute inset-0 z-40 flex items-center justify-center rounded-xl bg-game-ink/70">
            <Loader2 className="h-6 w-6 animate-spin text-game-cream" />
          </div>
        )}
      </Card>
    )
    if (isBulkReleaseMode) {
      return cardContent
    }

    if (pokemon.identified) {
      if (isSelectingPokemonForItem && selectedItemUnavailableReason) {
        return cardContent
      }

      if (isSelectingPokemonForItem && !selectedItemUsesDetailsDialog) {
        return cardContent
      }

      return (
        <PokemonDetailsDialog
          pokemon={pokemon}
          boxes={user?.boxes || []}
          inventory={Object.entries(inventoryMap).map(([itemId, quantity]) => ({
            itemId,
            quantity,
          }))}
          onRename={(u) => {
            syncPokemonAssignment(u)
          }}
          onRelease={(id) => {
            setPokemonList((prev) => prev.filter((p) => p.id !== id))
            setBattleTeam((prev) => prev.filter((p) => p.id !== id))
            if (companion?.id === id) setCompanion(null)
          }}
          defaultOpenUseItem={
            isSelectingPokemonForItem && selectedItemUsesDetailsDialog
          }
          highlightItemId={
            selectedItemUsesDetailsDialog ? itemToUse?.id : undefined
          }
          trigger={cardContent}
        />
      )
    }
    return cardContent
  }

  const bulkReleaseWouldEmptyCollection =
    bulkReleaseIds.length > 0 && bulkReleaseIds.length >= totalPokemonCount

  if (!user) return null

  return (
    <div className="flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <PremiumHeader
        title="POKEMON BOX"
        subtitle={`${totalPokemonCount} / ${user?.maxPokemon || 50}`}
      />
      {!itemToUse && !isBulkReleaseMode && (
        <div className="mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between gap-3 border-b border-game-border pb-3">
          <p className="text-xs text-game-muted">
            Hold a Pokemon for team options.
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="shrink-0 border-game-border bg-game-surface-raised text-game-ink hover:border-game-danger/45 hover:bg-game-danger/10 hover:text-game-danger"
            onClick={() => setIsBulkReleaseMode(true)}
          >
            <Trash2 className="h-3.5 w-3.5 text-game-danger" />
            Release
          </Button>
        </div>
      )}
      {rosterSelection && !itemToUse && (
        <div className="mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between gap-3 rounded-lg border border-game-moss/35 bg-game-moss/10 px-4 py-3 text-game-ink">
          <div className="min-w-0">
            <p className="font-display text-base font-semibold">
              Choose a Pokemon
            </p>
            <p className="truncate text-xs text-game-muted">
              {rosterSelection.role === 'companion'
                ? 'Select your new partner from this box.'
                : `Select a Pokemon for battle team slot ${rosterSelection.position}.`}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0 border-game-border bg-game-surface-raised text-game-ink"
            onClick={() => {
              setRosterSelection(null)
              setIsPanelExpanded(true)
            }}
          >
            Cancel
          </Button>
        </div>
      )}
      {itemToUse && (
        <div className="mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between gap-3 rounded-xl border border-game-moss/35 bg-game-moss/10 px-4 py-3 text-sm text-game-ink">
          <div className="min-w-0">
            <div className="font-black uppercase tracking-wide">
              Choose a Pokemon
            </div>
            <div className="truncate text-xs text-game-muted">
              Tap a Pokemon to use {itemToUse.name}.
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0 border-game-moss/45 bg-transparent text-game-moss-strong hover:bg-game-moss/10"
            onClick={() => router.replace('/game/pokemon')}
          >
            Cancel
          </Button>
        </div>
      )}
      {isBulkReleaseMode && !itemToUse && (
        <div className="mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between gap-3 rounded-lg border border-game-danger/30 bg-game-danger/10 px-4 py-3 text-sm text-game-ink">
          <div className="min-w-0">
            <div className="font-display font-semibold text-game-danger">
              Select Pokemon to release
            </div>
            <div className="truncate text-xs text-game-muted">
              {bulkReleaseWouldEmptyCollection
                ? 'Keep at least 1 Pokemon'
                : `${bulkReleaseIds.length} selected`}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-game-border bg-game-surface-raised text-game-ink hover:bg-game-canvas"
              onClick={exitBulkReleaseMode}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={
                bulkReleaseIds.length === 0 || bulkReleaseWouldEmptyCollection
              }
              className="min-h-11 bg-game-clay text-game-cream hover:bg-game-clay-strong disabled:opacity-50"
              onClick={() => setBulkReleaseConfirmOpen(true)}
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Release {bulkReleaseIds.length}
            </Button>
          </div>
        </div>
      )}
      <div className="contents xl:grid xl:min-h-0 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 flex flex-col gap-6 w-full max-w-7xl mx-auto custom-scrollbar xl:min-w-0 xl:max-w-none">
          <div className="w-full flex-1">
            <div className="min-h-[40vh] p-4">
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-[repeat(auto-fill,minmax(104px,1fr))]">
                {visibleEggs.map((egg) => (
                  <div key={`egg-${egg.id}`} className="relative aspect-square w-full select-none touch-manipulation">{renderEggCard(egg)}</div>
                ))}
                {pokemonList.map((p) => (
                  <div
                    key={p.id}
                    className="relative aspect-square w-full select-none touch-manipulation"
                  >
                    {renderPokemonCard(p)}
                  </div>
                ))}
              </div>
            </div>
            {pokemonList.length === 0 && visibleEggs.length === 0 && (
              <div
                className="mx-auto flex max-w-md flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-game-border-strong bg-game-canvas/70 px-6 py-10 text-center text-game-muted"
                role="status"
                aria-live="polite"
              >
                <Image
                  src="/ui/pokeori/desktop/empty-box.png"
                  alt=""
                  aria-hidden="true"
                  width={220}
                  height={180}
                  className="h-28 w-36 object-contain opacity-90 sm:h-36 sm:w-44"
                />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.08em] text-game-ink">
                    Box is empty
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-game-muted">
                    Catch or receive a Pokémon to start filling your field box.
                  </p>
                </div>
              </div>
            )}
            {hasNextPage && (
              <div ref={ref} className="flex justify-center py-8">
                {loading && (
                  <Loader2 className="h-6 w-6 animate-spin text-game-muted" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="z-30 flex w-full shrink-0 flex-col border-t border-game-border bg-game-surface/96 shadow-[0_-10px_30px_rgba(75,62,39,0.14)] backdrop-blur-xl xl:h-full xl:min-w-0 xl:border-l xl:border-t-0 xl:shadow-none">
          <button
            type="button"
            onClick={() => setIsPanelExpanded(!isPanelExpanded)}
            className="game-focus-ring group flex h-10 w-full items-center justify-center border-b border-game-border hover:bg-game-moss/5 xl:hidden"
            aria-expanded={isPanelExpanded}
            aria-controls="pokemon-team-panel"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-game-muted group-hover:text-game-moss-strong">
                {isPanelExpanded ? 'Collapse Team' : 'Expand Team'}
              </span>
              {isPanelExpanded ? (
                <ChevronDown className="h-3 w-3 text-game-muted group-hover:text-game-moss" />
              ) : (
                <ChevronUp className="h-3 w-3 text-game-muted group-hover:text-game-moss" />
              )}
            </div>
          </button>

          <div
            id="pokemon-team-panel"
            className={cn(
              'invisible grid overflow-hidden border-b border-game-border transition-[grid-template-rows,opacity,visibility] duration-200',
              isPanelExpanded
                ? 'grid-rows-[1fr] opacity-100 visible'
                : 'grid-rows-[0fr] opacity-0 xl:grid-rows-[1fr] xl:opacity-100 xl:visible',
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-3">
                <div className="flex flex-col gap-4 items-stretch">
                  <div className="flex-1 min-w-0 w-full">
                    <div className="h-full rounded-lg border border-game-border bg-game-surface p-2">
                      <div className="flex items-center justify-center mb-2 px-1 relative">
                        <div className="flex items-center gap-2">
                          <Swords className="h-3 w-3 text-game-moss-strong" />
                          <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-game-ink">
                            Battle Team
                          </h3>
                        </div>
                        <div className="absolute right-1 font-mono text-[10px] text-game-muted">
                          {battleTeam.length}/6
                        </div>
                      </div>
                      <DndContext
                        sensors={battleTeamSensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleBattleTeamDragEnd}
                      >
                      <SortableContext
                        items={[...battleTeam]
                          .sort((a, b) => (a.battleTeamPosition || 0) - (b.battleTeamPosition || 0))
                          .map((pokemon) => pokemon.id)}
                        strategy={rectSortingStrategy}
                      >
                      <div className="grid w-full grid-cols-3 gap-2">
                        {[...Array(6)].map((_, i) => {
                          const p = battleTeam.find(
                            (pokemon) => pokemon.battleTeamPosition === i + 1,
                          )
                          return p ? (
                            <SortableBattleTeamMember
                              key={p.id}
                              pokemonId={p.id}
                              disabled={isReorderingBattleTeam}
                            >
                              {renderPokemonCard(p, {
                                showRosterBadge: false,
                              })}
                            </SortableBattleTeamMember>
                          ) : (
                            <button
                              type="button"
                              key={`empty-${i}`}
                              onClick={() =>
                                beginRosterSelection({
                                  role: 'battle-team',
                                  position: i + 1,
                                })
                              }
                              className="game-focus-ring group/slot flex aspect-square w-full max-w-[104px] items-center justify-center rounded-lg border border-dashed border-game-border bg-game-surface-raised hover:border-game-moss/50 hover:bg-game-moss/5"
                              aria-label={`Choose a Pokemon for battle team slot ${i + 1}`}
                            >
                              <span className="text-[10px] font-bold text-game-muted group-hover/slot:text-game-moss-strong">
                                {i + 1}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                      </SortableContext>
                      </DndContext>
                    </div>
                  </div>
                  <div className="w-full shrink-0">
                    <div className="flex h-full flex-col rounded-lg border border-game-border bg-game-surface p-2">
                      <div className="flex items-center justify-center gap-2 mb-2 px-1">
                        <Heart className="h-3 w-3 text-game-moss-strong" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-game-ink">
                          Partner
                        </h3>
                      </div>
                      <div className="mx-auto h-24 w-24">
                        {companion ? (
                          renderPokemonCard(companion, {
                            showRosterBadge: false,
                          })
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              beginRosterSelection({ role: 'companion' })
                            }
                            className="game-focus-ring group/slot flex h-full w-full items-center justify-center rounded-lg border border-dashed border-game-border bg-game-surface-raised hover:border-game-moss/50 hover:bg-game-moss/5"
                            aria-label="Choose a partner Pokemon"
                          >
                            <Plus className="h-4 w-4 text-game-muted group-hover/slot:text-game-moss-strong" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full shrink-0 bg-game-surface-raised px-4 py-3">
            <div className="max-w-7xl mx-auto relative">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <PremiumSelect
                    value={selectedBoxId ?? 'unorganized'}
                    onValueChange={(val) =>
                      handleBoxChange(val === 'unorganized' ? null : val)
                    }
                    options={[
                      { id: 'unorganized', label: 'Unorganized' },
                      ...(user?.boxes || [])
                        .filter((box) => !!box.id)
                        .map((box) => ({
                          id: box.id as string,
                          label: box.name as string,
                        })),
                    ]}
                  />
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {(user?.boxes?.length || 0) < (user?.maxBoxes || 5) && (
                    <Dialog
                      open={isCreatingBox}
                      onOpenChange={setIsCreatingBox}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-10 w-10 border-game-border bg-game-surface text-game-moss-strong"
                          aria-label="Create storage box"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-game-border bg-game-surface text-game-ink sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Create a box</DialogTitle>
                          <DialogDescription>
                            Give this storage box a short, memorable name.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right text-xs text-game-muted">
                              Name
                            </Label>
                            <Input
                              value={newBoxName}
                              onChange={(e) => setNewBoxName(e.target.value)}
                              className="col-span-3 h-10 border-game-border bg-game-surface-raised text-game-ink"
                              maxLength={12}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleCreateBox}
                            className="h-10 w-full bg-game-clay text-game-cream hover:bg-game-clay-strong"
                          >
                            Create Box
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                  {typeof selectedBoxId === 'string' &&
                    selectedBoxId !== 'battle-team' && (
                      <>
                        <Dialog
                          open={isRenamingBox}
                          onOpenChange={setIsRenamingBox}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setRenameBoxName(
                                  user?.boxes?.find(
                                    (b) => b.id === selectedBoxId,
                                  )?.name || '',
                                )
                              }
                              className="h-10 w-10 text-game-muted hover:text-game-ink"
                              aria-label="Rename selected box"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="border-game-border bg-game-surface text-game-ink">
                            <DialogHeader>
                              <DialogTitle>Rename box</DialogTitle>
                              <DialogDescription>
                                Choose a new name for this collection.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right text-xs text-game-muted">
                                  Name
                                </Label>
                                <Input
                                  value={renameBoxName}
                                  onChange={(e) =>
                                    setRenameBoxName(e.target.value)
                                  }
                                  className="col-span-3 h-10 border-game-border bg-game-surface-raised text-game-ink"
                                  maxLength={12}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={handleRenameBox}
                                className="h-10 w-full bg-game-clay text-game-cream hover:bg-game-clay-strong"
                              >
                                Save
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Dialog
                          open={isDeletingBox}
                          onOpenChange={setIsDeletingBox}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 text-game-clay-strong"
                              aria-label="Delete selected box"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="border-game-border bg-game-surface text-game-ink">
                            <DialogHeader>
                              <DialogTitle>Delete box?</DialogTitle>
                              <DialogDescription>
                                The box must be empty. This cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="mt-4 flex flex-row gap-2">
                              <Button
                                variant="ghost"
                                onClick={() => setIsDeletingBox(false)}
                                className="h-10 flex-1"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleDeleteBox}
                                variant="destructive"
                                className="h-10 flex-1"
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ResponsivePanel
        open={!!quickMenuPokemon}
        onOpenChange={(open) => !open && setQuickMenuPokemon(null)}
        title={quickMenuPokemon?.name || 'Pokemon options'}
        description="Choose where this Pokemon belongs."
        desktopWidth="360px"
        mobileMaxHeight="60dvh"
        className="bg-game-surface text-game-ink"
      >
        {quickMenuPokemon && (
          <div
            className="grid gap-2 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
            aria-busy={isAssigningRoster}
          >
            {!quickMenuPokemon.onBattleTeam && (
              <Button
                type="button"
                variant="outline"
                disabled={battleTeam.length >= 6 || isAssigningRoster}
                aria-busy={isAssigningRoster}
                className="h-12 justify-start border-game-border bg-game-surface-raised text-game-ink hover:border-game-moss/45 hover:bg-game-moss/5"
                onClick={async () => {
                  if (await assignRosterRole(quickMenuPokemon, 'battle-team')) {
                    setQuickMenuPokemon(null)
                  }
                }}
              >
                {isAssigningRoster ? (
                  <Loader2 className="h-4 w-4 animate-spin text-game-moss-strong" />
                ) : (
                  <Swords className="h-4 w-4 text-game-moss-strong" />
                )}
                {isAssigningRoster ? 'Adding to battle team…' : 'Add to battle team'}
              </Button>
            )}
            {!quickMenuPokemon.isCompanion && (
              <Button
                type="button"
                variant="outline"
                disabled={isAssigningRoster}
                aria-busy={isAssigningRoster}
                className="h-12 justify-start border-game-border bg-game-surface-raised text-game-ink hover:border-game-moss/45 hover:bg-game-moss/5"
                onClick={async () => {
                  if (await assignRosterRole(quickMenuPokemon, 'companion')) {
                    setQuickMenuPokemon(null)
                  }
                }}
              >
                {isAssigningRoster ? (
                  <Loader2 className="h-4 w-4 animate-spin text-game-danger" />
                ) : (
                  <Heart className="h-4 w-4 text-game-danger" />
                )}
                {isAssigningRoster ? 'Making partner…' : 'Make partner'}
              </Button>
            )}
            {(quickMenuPokemon.onBattleTeam ||
              quickMenuPokemon.isCompanion) && (
              <Button
                type="button"
                variant="outline"
                disabled={isAssigningRoster}
                aria-busy={isAssigningRoster}
                className="h-12 justify-start border-game-border bg-game-surface-raised text-game-ink hover:bg-game-canvas"
                onClick={async () => {
                  if (await assignRosterRole(quickMenuPokemon, 'box')) {
                    setQuickMenuPokemon(null)
                  }
                }}
              >
                {isAssigningRoster ? (
                  <Loader2 className="h-4 w-4 animate-spin text-game-muted" />
                ) : (
                  <Box className="h-4 w-4 text-game-muted" />
                )}
                {isAssigningRoster ? 'Moving to current box…' : 'Move to current box'}
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              className="h-11 text-game-muted hover:bg-game-canvas hover:text-game-ink"
              onClick={() => setQuickMenuPokemon(null)}
            >
              Close
            </Button>
          </div>
        )}
      </ResponsivePanel>

      <Dialog
        open={bulkReleaseConfirmOpen}
        onOpenChange={(open) => {
          if (!open && !isBulkReleasingPokemon) setBulkReleaseConfirmOpen(false)
        }}
      >
        <DialogContent className="border-game-border bg-game-surface text-game-ink">
          <DialogTitle className="sr-only">Bulk Release Pokemon</DialogTitle>
          <div className="w-full text-center mt-2">
            <SectionDivider>
              Release {bulkReleaseIds.length} Pokemon?
            </SectionDivider>
          </div>
          <DialogDescription className="text-center text-game-muted">
            Their rewards will be collected together. This cannot be undone.
          </DialogDescription>
          <DialogFooter className="mt-4 flex flex-row gap-2">
            <Button
              variant="ghost"
              onClick={() => setBulkReleaseConfirmOpen(false)}
              disabled={isBulkReleasingPokemon}
              className="h-10 flex-1 border border-game-border bg-game-surface-raised text-game-ink hover:bg-game-canvas"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBulkRelease}
              disabled={isBulkReleasingPokemon || bulkReleaseIds.length === 0}
              className="min-h-11 flex-1 bg-game-clay text-game-cream hover:bg-game-clay-strong"
            >
              {isBulkReleasingPokemon ? 'Releasing...' : 'Release All'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <RewardResultOverlay
        result={releaseResult}
        onClose={() => {
          setReleaseResult(null)
          setReleasedPokemonResult(null)
          refreshUser()
        }}
        icon={
          releasedPokemonResult
            ? { type: 'pokemon', id: releasedPokemonResult.formId }
            : undefined
        }
        iconAlt={releasedPokemonResult?.name || 'Released Pokemon'}
        title={releasedPokemonResult ? 'Goodbye' : 'Released'}
        message={
          releasedPokemonResult
            ? "It's been fun."
            : 'Rewards collected together.'
        }
      />
      {eggHatchAnimation && (
        <EggHatchOverlay
          onComplete={() => {
            setEggHatchResult(eggHatchAnimation)
            setEggHatchAnimation(null)
          }}
        />
      )}
      <RewardResultOverlay
        result={eggHatchResult}
        onClose={() => setEggHatchResult(null)}
        icon={eggHatchResult?.summary?.pokemon?.[0] ? { type: 'pokemon', id: eggHatchResult.summary.pokemon[0].speciesId } : undefined}
        iconAlt="Hatched Pokemon"
        title="Egg Hatched"
        message={eggHatchResult?.message}
      />
    </div>
  )
}

function EggHatchOverlay({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'warm' | 'flash' | 'reveal'>('warm')
  useEffect(() => {
    const flash = setTimeout(() => setPhase('flash'), 1500)
    const done = setTimeout(() => { setPhase('reveal'); onComplete() }, 2300)
    return () => { clearTimeout(flash); clearTimeout(done) }
  }, [onComplete])
  return (
    <Dialog open>
      <DialogContent showCloseButton={false} className="fixed inset-0 z-[100] m-0 flex h-[100dvh] w-screen max-w-none !translate-x-0 !translate-y-0 items-center justify-center rounded-none border-none bg-game-night p-0">
        <DialogTitle className="sr-only">An Egg is hatching</DialogTitle>
        <div className={cn('flex flex-col items-center transition-all duration-500', phase === 'flash' && 'scale-125 opacity-20')}>
          <Image src="/sprites/pokemon/home/egg.png" alt="Hatching Egg" width={320} height={320} className={cn('h-64 w-64 object-contain', phase === 'warm' && 'animate-pulse motion-reduce:animate-none')} />
          <p className="mt-8 font-serif text-3xl text-game-cream">Oh?</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SortableBattleTeamMember({
  pokemonId,
  disabled,
  children,
}: PropsWithChildren<{ pokemonId: string; disabled: boolean }>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: pokemonId, disabled })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
      }}
      className={cn(
        'relative aspect-square w-full max-w-[104px] cursor-grab active:cursor-grabbing',
        isDragging && 'z-50 opacity-50',
      )}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}
