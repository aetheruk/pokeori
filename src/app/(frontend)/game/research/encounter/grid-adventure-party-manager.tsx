'use client'

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
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
import {
  Check,
  GripVertical,
  Loader2,
  LockKeyhole,
  PackageOpen,
  Pencil,
  Sparkles,
  Swords,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { setHeldItem } from '@/app/(frontend)/game/pokemon/actions/held-items'
import { setAssignedMoves } from '@/app/(frontend)/game/pokemon/actions/moves'
import { setSelectedPokemonPower } from '@/app/(frontend)/game/pokemon/actions/powers'
import {
  getPokemonTeamLayout,
  reorderBattleTeam,
} from '@/app/(frontend)/game/pokemon/actions/team'
import { MoveFieldNote, MoveLoadoutWorkspace } from '@/components/game/moves'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { useUser } from '@/context/UserContext'
import { items } from '@/data/items'
import { getMove } from '@/data/moves'
import type { MoveConfig } from '@/data/moves/types'
import { cn } from '@/lib/utils'
import type { Pokemon } from '@/payload-types'
import type { BattlePokemon } from '@/utilities/battle/types'
import { getOwnedPokemonGender } from '@/utilities/pokemon/gender'
import {
  getHeldItemDefinition,
  getHeldItemOptions,
} from '@/utilities/pokemon/held-items'
import {
  getMovePresentation,
  getMoveTypeSpriteItemId,
} from '@/utilities/pokemon/move-display'
import {
  autoPickMoveLoadout,
  type MoveLoadoutEntry,
} from '@/utilities/pokemon/move-loadout'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import {
  getAvailableMoveOptions,
  normalizeAssignedMoveIds,
} from '@/utilities/pokemon/pokemon-moves'
import {
  getAvailablePokemonPowerOptions,
  normalizeSelectedPokemonPower,
} from '@/utilities/pokemon/pokemon-powers'
import { getPokemonResearchLevel } from '@/utilities/research/research-levels'
import {
  canUseTrainerHeldItems,
  getItemSkillLockReason,
  getResearcherMoveSlotCount,
  getSkillLevel,
  TRAINER_HELD_ITEM_LEVEL,
} from '@/utilities/skills/unlocks'

function getBattleTeamPosition(pokemon: Pokemon, fallbackIndex: number) {
  return typeof pokemon.battleTeamPosition === 'number'
    ? pokemon.battleTeamPosition
    : fallbackIndex + 1
}

function SortableBattleTeamCard({
  pokemon,
  index,
  selected,
  disabled,
  onSelect,
}: {
  pokemon: Pokemon
  index: number
  selected: boolean
  disabled: boolean
  onSelect: () => void
}) {
  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pokemon.id, disabled })
  const form = getPokemonForm(pokemon.formId)
  const name = pokemon.name || form?.name || 'Pokémon'
  const moves = normalizeAssignedMoveIds(pokemon.assignedMoves).length
  const heldItem = getHeldItemDefinition(pokemon.heldItemId)
  const hasPower = Boolean(
    normalizeSelectedPokemonPower(pokemon.selectedPokemonPower),
  )

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        'relative list-none rounded-xl transition-shadow',
        isDragging && 'z-20 opacity-35',
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          'game-focus-ring flex min-h-[126px] w-full flex-col rounded-xl border bg-game-surface-raised p-2.5 text-left shadow-sm transition-colors',
          selected
            ? 'border-game-charcoal bg-game-charcoal/[0.035]'
            : 'border-game-card-border hover:bg-game-surface',
          'disabled:cursor-wait',
        )}
      >
        <span
          className={cn(
            'absolute left-2.5 top-2.5 flex size-6 items-center justify-center rounded-md font-mono text-[11px] font-bold',
            index === 0
              ? 'bg-game-charcoal text-game-cream'
              : 'border border-game-border bg-game-canvas text-game-muted',
          )}
          title={index === 0 ? 'Lead Pokémon' : `Team position ${index + 1}`}
        >
          {index === 0 ? 'L' : index + 1}
        </span>
        {selected && (
          <span className="absolute right-10 top-2.5 flex size-6 items-center justify-center rounded-full bg-game-charcoal text-game-cream">
            <Check className="size-3.5" aria-hidden="true" />
          </span>
        )}

        <div className="flex w-full items-center gap-2 pt-5">
          <PokemonRaritySprite
            formId={pokemon.formId}
            view="home"
            rarity={pokemon.rarity}
            shiny={pokemon.shiny}
            isShadow={pokemon.isShadow}
            isRadiant={pokemon.isRadiant}
            female={getOwnedPokemonGender(pokemon) === 'female'}
            alt=""
            className="size-12 shrink-0"
          />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-bold leading-tight text-game-ink">
              {name}
            </span>
            <span className="mt-1 block font-mono text-[10px] text-game-muted">
              Lv. {pokemon.level}
            </span>
          </span>
        </div>

        <span className="mt-auto flex w-full items-center gap-3 border-t border-game-border/70 pt-2 text-game-muted">
          <span
            className="inline-flex items-center gap-1 text-[10px] font-semibold"
            title={`${moves} battle ${moves === 1 ? 'move' : 'moves'}`}
          >
            <Swords className="size-3.5" aria-hidden="true" />
            {moves}
          </span>
          <span
            className="inline-flex size-5 items-center justify-center"
            title={heldItem?.name || 'No held item'}
          >
            {heldItem ? (
              <ItemSprite itemId={heldItem.id} alt="" width={20} height={20} />
            ) : (
              <PackageOpen className="size-3.5" aria-hidden="true" />
            )}
          </span>
          <span
            className={cn(
              'ml-auto inline-flex size-5 items-center justify-center',
              hasPower ? 'text-game-ochre' : 'text-game-muted/70',
            )}
            title={hasPower ? 'Pokémon Power selected' : 'No Pokémon Power'}
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
          </span>
        </span>
      </button>

      <button
        ref={setActivatorNodeRef}
        type="button"
        {...attributes}
        {...listeners}
        disabled={disabled}
        aria-label={`Drag to reorder ${name}`}
        title={`Drag to reorder ${name}`}
        className="game-focus-ring absolute right-2 top-2 z-10 flex size-8 touch-none items-center justify-center rounded-md text-game-muted hover:bg-game-charcoal/8 hover:text-game-ink disabled:cursor-not-allowed disabled:opacity-45"
      >
        <GripVertical className="size-4" aria-hidden="true" />
      </button>
    </li>
  )
}

export function GridAdventurePartyManager() {
  const { user, gameData, refreshUser } = useUser()
  const [open, setOpen] = useState(false)
  const [battleTeam, setBattleTeam] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(
    null,
  )
  const [activePokemonId, setActivePokemonId] = useState<string | null>(null)
  const [editingSection, setEditingSection] = useState<'item' | 'power' | null>(
    null,
  )
  const [reorderingPokemonId, setReorderingPokemonId] = useState<string | null>(
    null,
  )
  const [savingHeldItemId, setSavingHeldItemId] = useState<string | null>(null)
  const [savingPowerId, setSavingPowerId] = useState<string | null>(null)
  const [moveWorkspaceOpen, setMoveWorkspaceOpen] = useState(false)
  const [moveDetail, setMoveDetail] = useState<MoveConfig | null>(null)
  const [selectedMoveIds, setSelectedMoveIds] = useState<string[]>([])
  const [savingMoves, setSavingMoves] = useState(false)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    if (!open) return
    let current = true
    setLoading(true)
    setLoadError(null)
    void getPokemonTeamLayout()
      .then((layout) => {
        if (current) {
          setBattleTeam(layout.battleTeam as Pokemon[])
          setSelectedPokemonId(layout.battleTeam[0]?.id || null)
          setEditingSection(null)
        }
      })
      .catch(() => {
        if (current) setLoadError('Your battle team could not be loaded.')
      })
      .finally(() => {
        if (current) setLoading(false)
      })
    return () => {
      current = false
    }
  }, [open])

  const sortedTeam = useMemo(
    () =>
      [...battleTeam].sort(
        (left, right) =>
          (left.battleTeamPosition || 0) - (right.battleTeamPosition || 0),
      ),
    [battleTeam],
  )
  const selectedPokemon =
    sortedTeam.find((pokemon) => pokemon.id === selectedPokemonId) || null
  const activePokemon = activePokemonId
    ? sortedTeam.find((pokemon) => pokemon.id === activePokemonId) || null
    : null
  const inventoryMap = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map(({ itemId, quantity }) => [
          itemId,
          quantity,
        ]),
      ),
    [gameData?.inventory],
  )
  const researcherLevel = getSkillLevel(user?.skills, 'researching')
  const trainerLevel = getSkillLevel(user?.skills, 'battling')
  const maxMoves = getResearcherMoveSlotCount(researcherLevel)
  const pokemonResearchLevel = selectedPokemon
    ? getPokemonResearchLevel(
        gameData?.pokedex,
        selectedPokemon.speciesId,
        selectedPokemon.formId,
      )
    : 0
  const pokemonForm = selectedPokemon
    ? getPokemonForm(selectedPokemon.formId)
    : null
  const moveUnlockMessage =
    maxMoves <= 0
      ? 'Researcher Level 10 required to assign battle moves.'
      : pokemonResearchLevel < 1
        ? 'Research Level 1 required for this species to assign battle moves.'
        : null
  const heldItemUnlockMessage = !canUseTrainerHeldItems(trainerLevel)
    ? `Trainer Level ${TRAINER_HELD_ITEM_LEVEL} required to assign held items.`
    : pokemonResearchLevel < 1
      ? 'Research Level 1 required for this species to assign held items.'
      : null
  const assignableMoves = useMemo(
    () =>
      selectedPokemon
        ? getAvailableMoveOptions({
            pokemonTypes: pokemonForm?.types || [],
            pokemonFormId: selectedPokemon.formId,
            pokemonLevel: selectedPokemon.level,
            inventory: inventoryMap,
            sketchedMoveIds: gameData?.sketchedMoves,
          })
        : [],
    [
      gameData?.sketchedMoves,
      inventoryMap,
      pokemonForm?.types,
      selectedPokemon,
    ],
  )
  const moveLoadoutEntries = useMemo<MoveLoadoutEntry[]>(
    () =>
      assignableMoves.flatMap((move) => {
        const fullMove = getMove(move.id)
        if (!fullMove) return []
        const moveItem = items.find(
          (item) => item.moveId === move.id && (inventoryMap[item.id] || 0) > 0,
        )
        const isSketched = Boolean(
          gameData?.sketchedMoves?.includes(move.id) && !moveItem,
        )
        const source =
          move.id === 'sketch'
            ? 'level'
            : isSketched
              ? 'sketch'
              : moveItem?.id.startsWith('hm-')
                ? 'hm'
                : 'tm'
        const sourceLabel =
          source === 'level'
            ? 'Research move'
            : source === 'sketch'
              ? 'Sketchbook'
              : source === 'hm'
                ? 'Owned HM'
                : 'Owned TM'
        return [{ move: fullMove, source, sourceLabel }]
      }),
    [assignableMoves, gameData?.sketchedMoves, inventoryMap],
  )
  const heldItemOptions = useMemo(
    () => getHeldItemOptions(inventoryMap),
    [inventoryMap],
  )
  const currentHeldItemId = selectedPokemon?.heldItemId || null
  const currentHeldItem = getHeldItemDefinition(currentHeldItemId)
  const selectedPokemonPower = selectedPokemon
    ? normalizeSelectedPokemonPower(selectedPokemon.selectedPokemonPower)
    : null
  const availablePokemonPowers = useMemo(
    () =>
      selectedPokemon
        ? getAvailablePokemonPowerOptions({
            pokemonFormId: selectedPokemon.formId,
            inventory: inventoryMap,
            trainerLevel,
          })
        : [],
    [inventoryMap, selectedPokemon, trainerLevel],
  )

  useEffect(() => {
    setSelectedMoveIds(
      selectedPokemon
        ? normalizeAssignedMoveIds(selectedPokemon.assignedMoves)
        : [],
    )
  }, [selectedPokemon?.id, selectedPokemon?.assignedMoves])

  const updatePokemon = (updatedPokemon: Pokemon) => {
    setBattleTeam((current) =>
      current.map((pokemon) =>
        pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon,
      ),
    )
  }

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    setActivePokemonId(null)
    if (!over || active.id === over.id || reorderingPokemonId) return

    const oldIndex = sortedTeam.findIndex(
      (pokemon) => pokemon.id === String(active.id),
    )
    const newIndex = sortedTeam.findIndex(
      (pokemon) => pokemon.id === String(over.id),
    )
    if (oldIndex < 0 || newIndex < 0) return

    const previousTeam = battleTeam
    const previousPositions = sortedTeam.map((pokemon, index) =>
      getBattleTeamPosition(pokemon, index),
    )
    const nextOrder = arrayMove(sortedTeam, oldIndex, newIndex)
    const optimisticTeam = nextOrder.map((pokemon, index) => ({
      ...pokemon,
      battleTeamPosition: previousPositions[index],
    }))
    const optimisticById = new Map(
      optimisticTeam.map((pokemon) => [pokemon.id, pokemon]),
    )
    setBattleTeam((current) =>
      current.map((pokemon) => optimisticById.get(pokemon.id) || pokemon),
    )
    setReorderingPokemonId(String(active.id))
    try {
      const result = await reorderBattleTeam(
        optimisticTeam.map((pokemon) => ({
          pokemonId: pokemon.id,
          position: pokemon.battleTeamPosition,
        })),
      )
      if (!result.success || !result.placements) {
        setBattleTeam(previousTeam)
        toast.error(result.message || 'Could not reorder the battle team.')
        return
      }
      const positions = new Map(
        result.placements.map(({ pokemonId, position }) => [
          pokemonId,
          position,
        ]),
      )
      setBattleTeam((current) =>
        current
          .map((pokemon) => ({
            ...pokemon,
            battleTeamPosition:
              positions.get(pokemon.id) ?? pokemon.battleTeamPosition,
          }))
          .sort(
            (left, right) =>
              (left.battleTeamPosition || 0) - (right.battleTeamPosition || 0),
          ),
      )
      toast.success('Battle order saved.')
    } catch {
      setBattleTeam(previousTeam)
      toast.error('Could not reorder the battle team.')
    } finally {
      setReorderingPokemonId(null)
    }
  }

  const saveHeldItem = async (itemId: string | null) => {
    if (!selectedPokemon || savingHeldItemId) return
    setSavingHeldItemId(itemId || 'none')
    try {
      const result = await setHeldItem(
        selectedPokemon.id,
        itemId,
        crypto.randomUUID(),
      )
      if (!result.success) {
        toast.error(result.message || 'Could not set the held item.')
        return
      }
      if (result.pokemon) updatePokemon(result.pokemon as Pokemon)
      toast.success(itemId ? 'Held item equipped.' : 'Held item cleared.')
      setEditingSection(null)
      void refreshUser()
    } catch {
      toast.error('Could not set the held item.')
    } finally {
      setSavingHeldItemId(null)
    }
  }

  const savePokemonPower = async (powerId: string | null) => {
    if (!selectedPokemon || savingPowerId) return
    setSavingPowerId(powerId || 'none')
    try {
      const result = await setSelectedPokemonPower(selectedPokemon.id, powerId)
      if (!result.success) {
        toast.error(result.message || 'Could not select this Pokémon Power.')
        return
      }
      if (result.pokemon) updatePokemon(result.pokemon as Pokemon)
      toast.success(
        powerId ? 'Pokémon Power selected.' : 'Pokémon Power cleared.',
      )
      setEditingSection(null)
    } catch {
      toast.error('Could not select this Pokémon Power.')
    } finally {
      setSavingPowerId(null)
    }
  }

  const saveMoves = async (moveIds = selectedMoveIds, close = false) => {
    if (!selectedPokemon || savingMoves) return
    setSavingMoves(true)
    try {
      const result = await setAssignedMoves(selectedPokemon.id, moveIds)
      if (!result.success) {
        toast.error(result.message || 'Could not assign moves.')
        return
      }
      if (result.pokemon) updatePokemon(result.pokemon as Pokemon)
      setSelectedMoveIds(result.assignedMoveIds || moveIds)
      toast.success('Moves assigned.')
      if (close) setMoveWorkspaceOpen(false)
    } catch {
      toast.error('Could not assign moves.')
    } finally {
      setSavingMoves(false)
    }
  }

  const handleAutoPick = async () => {
    if (!selectedPokemon || moveUnlockMessage || maxMoves <= 0) return
    const stats = selectedPokemon.stats as BattlePokemon['stats']
    const self = {
      ...selectedPokemon,
      name: selectedPokemon.name || pokemonForm?.name || 'Pokémon',
      types: pokemonForm?.types || [],
      stats,
      currentHp: stats?.hp || 1,
      maxHp: stats?.hp || 1,
    } as BattlePokemon
    const picked = autoPickMoveLoadout({
      pokemon: self,
      moveIds: moveLoadoutEntries.map(({ move }) => move.id),
      maxMoves,
    })
    setSelectedMoveIds(picked)
    await saveMoves(picked)
  }

  return (
    <ResponsivePanel
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && (moveWorkspaceOpen || moveDetail)) return
        setOpen(nextOpen)
        if (!nextOpen) {
          setSelectedPokemonId(null)
          setEditingSection(null)
        }
      }}
      dismissible={!moveWorkspaceOpen && !moveDetail}
      title="Battle team"
      description="Prepare your team for the battles ahead."
      showHero={false}
      className="game-paper-first flex w-full flex-col overflow-hidden bg-game-canvas p-0 text-game-ink"
      trigger={
        <Button
          type="button"
          variant="outline"
          className="size-12 rounded-full border border-game-border bg-game-surface-raised p-1 shadow-sm hover:border-game-charcoal hover:bg-game-surface"
          aria-label="Manage battle team"
          title="Manage battle team"
        >
          <ItemSprite itemId="poke-ball" alt="" width={36} height={36} />
        </Button>
      }
    >
      <header className="shrink-0 border-b border-game-border bg-game-surface-raised px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] pr-16 shadow-sm sm:px-6 sm:pr-20">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-game-charcoal text-game-cream">
            <Swords className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-xl font-bold leading-tight text-game-ink">
              Battle team
            </h1>
            <p className="mt-1 text-xs text-game-muted">
              Drag to reorder · select a Pokémon to prepare it
            </p>
          </div>
          {sortedTeam.length > 0 && (
            <span className="ml-auto rounded-full border border-game-border bg-game-canvas px-2.5 py-1 font-mono text-xs font-semibold text-game-ink">
              {sortedTeam.length}/6
            </span>
          )}
        </div>
      </header>

      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-6">
        {loading ? (
          <div
            className="flex min-h-40 items-center justify-center gap-2 text-sm text-game-muted"
            role="status"
          >
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Loading team…
          </div>
        ) : loadError ? (
          <p
            className="mx-auto max-w-xl rounded-lg border border-game-danger/30 bg-game-danger/5 p-4 text-sm text-game-danger"
            role="alert"
          >
            {loadError}
          </p>
        ) : sortedTeam.length === 0 ? (
          <div className="mx-auto mt-8 flex max-w-sm flex-col items-center rounded-xl border border-game-card-border bg-game-surface-raised p-6 text-center shadow-sm">
            <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-game-charcoal/8 text-game-charcoal">
              <PackageOpen className="size-6" aria-hidden="true" />
            </span>
            <h2 className="font-display text-lg font-semibold text-game-ink">
              No Pokémon on your battle team
            </h2>
            <p className="mt-1 text-sm text-game-muted">
              Add Pokémon to your team before entering a battle.
            </p>
          </div>
        ) : (
          <main className="mx-auto flex w-full max-w-4xl flex-col gap-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={({ active }) =>
                setActivePokemonId(String(active.id))
              }
              onDragCancel={() => setActivePokemonId(null)}
              onDragEnd={(event) => void handleDragEnd(event)}
            >
              <SortableContext
                items={sortedTeam.map((pokemon) => pokemon.id)}
                strategy={rectSortingStrategy}
              >
                <ol
                  className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3"
                  aria-label="Battle team order"
                >
                  {sortedTeam.map((pokemon, index) => (
                    <SortableBattleTeamCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      index={index}
                      selected={pokemon.id === selectedPokemonId}
                      disabled={!!reorderingPokemonId}
                      onSelect={() => {
                        setSelectedPokemonId(pokemon.id)
                        setEditingSection(null)
                      }}
                    />
                  ))}
                </ol>
              </SortableContext>
              <DragOverlay>
                {activePokemon ? (
                  <div className="flex items-center gap-3 rounded-xl border border-game-charcoal bg-game-surface-raised p-3 shadow-lg">
                    <PokemonRaritySprite
                      formId={activePokemon.formId}
                      view="home"
                      rarity={activePokemon.rarity}
                      shiny={activePokemon.shiny}
                      isShadow={activePokemon.isShadow}
                      isRadiant={activePokemon.isRadiant}
                      female={getOwnedPokemonGender(activePokemon) === 'female'}
                      alt=""
                      className="size-12 shrink-0"
                    />
                    <span className="font-semibold text-game-ink">
                      {activePokemon.name ||
                        getPokemonForm(activePokemon.formId)?.name ||
                        'Pokémon'}
                    </span>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>

            {selectedPokemon && (
              <section
                aria-label={`${selectedPokemon.name || pokemonForm?.name || 'Pokémon'} loadout`}
                className="rounded-xl border border-game-card-border bg-game-surface-raised p-3 shadow-sm sm:p-4"
              >
                <div className="flex items-center gap-3 border-b border-game-border/70 pb-3">
                  <PokemonRaritySprite
                    formId={selectedPokemon.formId}
                    view="home"
                    rarity={selectedPokemon.rarity}
                    shiny={selectedPokemon.shiny}
                    isShadow={selectedPokemon.isShadow}
                    isRadiant={selectedPokemon.isRadiant}
                    female={getOwnedPokemonGender(selectedPokemon) === 'female'}
                    alt=""
                    className="size-14 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-game-muted">
                      Selected Pokémon
                    </p>
                    <h2 className="truncate font-display text-lg font-bold leading-tight text-game-ink">
                      {selectedPokemon.name || pokemonForm?.name || 'Pokémon'}
                    </h2>
                    <p className="mt-0.5 font-mono text-[11px] text-game-muted">
                      Lv. {selectedPokemon.level}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3">
                  <div className="min-w-0 rounded-lg border border-game-border/80 bg-game-canvas/60 p-2">
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-game-charcoal/8 text-game-charcoal">
                        {currentHeldItem ? (
                          <ItemSprite
                            itemId={currentHeldItem.id}
                            alt=""
                            width={26}
                            height={26}
                          />
                        ) : (
                          <PackageOpen className="size-4" aria-hidden="true" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[9px] font-bold uppercase tracking-wide text-game-muted">
                          Item
                        </span>
                        <span className="block truncate text-[11px] font-semibold text-game-ink">
                          {currentHeldItem?.name || 'None'}
                        </span>
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setEditingSection((current) =>
                            current === 'item' ? null : 'item',
                          )
                        }
                        aria-label="Change held item"
                        aria-expanded={editingSection === 'item'}
                        title="Change held item"
                        className="size-8 shrink-0 text-game-muted hover:bg-game-charcoal/5 hover:text-game-ink"
                      >
                        <Pencil className="size-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>

                  <div className="min-w-0 rounded-lg border border-game-border/80 bg-game-canvas/60 p-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'flex size-8 shrink-0 items-center justify-center rounded-md',
                          selectedPokemonPower
                            ? 'bg-game-ochre/15 text-game-ochre'
                            : 'bg-game-charcoal/8 text-game-muted',
                        )}
                      >
                        <Sparkles className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[9px] font-bold uppercase tracking-wide text-game-muted">
                          Power
                        </span>
                        <span className="block truncate text-[11px] font-semibold text-game-ink">
                          {availablePokemonPowers.find(
                            (power) => power.id === selectedPokemonPower,
                          )?.name ||
                            selectedPokemonPower ||
                            'None'}
                        </span>
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setEditingSection((current) =>
                            current === 'power' ? null : 'power',
                          )
                        }
                        aria-label="Change Pokémon Power"
                        aria-expanded={editingSection === 'power'}
                        title="Change Pokémon Power"
                        className="size-8 shrink-0 text-game-muted hover:bg-game-charcoal/5 hover:text-game-ink"
                      >
                        <Pencil className="size-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>

                  <div className="min-w-0 rounded-lg border border-game-border/80 bg-game-canvas/60 p-2">
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-game-charcoal/8 text-game-charcoal">
                        <Swords className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[9px] font-bold uppercase tracking-wide text-game-muted">
                          Moves
                        </span>
                        <span className="block truncate font-mono text-[11px] font-semibold text-game-ink">
                          {selectedMoveIds.length}/{maxMoves}
                        </span>
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setMoveWorkspaceOpen(true)}
                        disabled={!!moveUnlockMessage || savingMoves}
                        aria-label="Edit battle moves"
                        title={moveUnlockMessage || 'Edit battle moves'}
                        className="size-8 shrink-0 text-game-muted hover:bg-game-charcoal/5 hover:text-game-ink disabled:opacity-40"
                      >
                        <Pencil className="size-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>

                {moveUnlockMessage && (
                  <p className="mt-2 text-[11px] text-game-muted">
                    {moveUnlockMessage}
                  </p>
                )}

                {editingSection === 'item' && (
                  <div className="mt-3 rounded-lg border border-game-border bg-game-canvas/50 p-2.5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="text-xs font-bold text-game-ink">
                        Held items
                      </h3>
                      {heldItemUnlockMessage && (
                        <span
                          className="flex items-center gap-1 text-[10px] text-game-muted"
                          title={heldItemUnlockMessage}
                        >
                          <LockKeyhole
                            className="size-3.5"
                            aria-hidden="true"
                          />
                          Locked
                        </span>
                      )}
                    </div>
                    {heldItemUnlockMessage ? (
                      <p className="text-xs text-game-muted">
                        {heldItemUnlockMessage}
                      </p>
                    ) : (
                      <div className="custom-scrollbar grid max-h-56 grid-cols-2 gap-2 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => void saveHeldItem(null)}
                          disabled={
                            !currentHeldItemId || savingHeldItemId !== null
                          }
                          aria-pressed={!currentHeldItemId}
                          className={cn(
                            'game-focus-ring flex min-h-14 items-center gap-2 rounded-lg border p-2 text-left transition-colors disabled:opacity-50',
                            !currentHeldItemId
                              ? 'border-game-charcoal bg-game-charcoal/5'
                              : 'border-game-border bg-game-surface-raised hover:bg-game-surface',
                          )}
                        >
                          <PackageOpen
                            className="ml-1 size-5 shrink-0 text-game-muted"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-game-ink">
                            None
                          </span>
                          {!currentHeldItemId && (
                            <Check
                              className="size-3.5 text-game-charcoal"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                        {heldItemOptions.map((item) => {
                          const skillLock = getItemSkillLockReason(
                            item,
                            user?.skills,
                          )
                          const selected = currentHeldItemId === item.id
                          const disabled =
                            selected ||
                            !!skillLock ||
                            savingHeldItemId !== null ||
                            !!heldItemUnlockMessage
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => void saveHeldItem(item.id)}
                              disabled={disabled}
                              aria-pressed={selected}
                              aria-label={
                                item.name +
                                ', ' +
                                (inventoryMap[item.id] || 0) +
                                ' available' +
                                (skillLock ? `, ${skillLock}` : '')
                              }
                              title={skillLock || item.name}
                              className={cn(
                                'game-focus-ring flex min-h-14 min-w-0 items-center gap-2 rounded-lg border p-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                                selected
                                  ? 'border-game-charcoal bg-game-charcoal/5'
                                  : 'border-game-border bg-game-surface-raised hover:bg-game-surface',
                              )}
                            >
                              <ItemSprite
                                itemId={item.id}
                                alt=""
                                width={28}
                                height={28}
                              />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[11px] font-semibold text-game-ink">
                                  {item.name}
                                </span>
                                <span className="block font-mono text-[9px] text-game-muted">
                                  x{inventoryMap[item.id] || 0}
                                </span>
                              </span>
                              {selected ? (
                                <Check
                                  className="size-3.5 shrink-0 text-game-charcoal"
                                  aria-hidden="true"
                                />
                              ) : skillLock ? (
                                <LockKeyhole
                                  className="size-3.5 shrink-0 text-game-muted"
                                  aria-hidden="true"
                                />
                              ) : savingHeldItemId === item.id ? (
                                <Loader2
                                  className="size-3.5 shrink-0 animate-spin"
                                  aria-hidden="true"
                                />
                              ) : null}
                            </button>
                          )
                        })}
                        {heldItemOptions.length === 0 && (
                          <p className="col-span-2 py-3 text-center text-xs text-game-muted">
                            No held items in your bag.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {editingSection === 'power' && (
                  <div className="mt-3 rounded-lg border border-game-border bg-game-canvas/50 p-2.5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="text-xs font-bold text-game-ink">
                        Pokémon Powers
                      </h3>
                      {pokemonResearchLevel < 3 && (
                        <span
                          className="flex items-center gap-1 text-[10px] text-game-muted"
                          title="Research Level 3 required"
                        >
                          <LockKeyhole
                            className="size-3.5"
                            aria-hidden="true"
                          />
                          Locked
                        </span>
                      )}
                    </div>
                    {pokemonResearchLevel < 3 ? (
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs text-game-muted">
                          Research Level 3 required.
                        </p>
                        {selectedPokemonPower && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => void savePokemonPower(null)}
                            disabled={savingPowerId !== null}
                            aria-label="Clear Pokémon Power"
                            title="Clear Pokémon Power"
                            className="size-8 shrink-0 text-game-muted hover:bg-game-charcoal/5 hover:text-game-ink"
                          >
                            {savingPowerId === 'none' ? (
                              <Loader2
                                className="size-3.5 animate-spin"
                                aria-hidden="true"
                              />
                            ) : (
                              <X className="size-3.5" aria-hidden="true" />
                            )}
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="custom-scrollbar grid max-h-56 grid-cols-2 gap-2 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => void savePokemonPower(null)}
                          disabled={
                            !selectedPokemonPower || savingPowerId !== null
                          }
                          aria-pressed={!selectedPokemonPower}
                          className={cn(
                            'game-focus-ring flex min-h-14 items-center gap-2 rounded-lg border p-2 text-left transition-colors disabled:opacity-50',
                            !selectedPokemonPower
                              ? 'border-game-charcoal bg-game-charcoal/5'
                              : 'border-game-border bg-game-surface-raised hover:bg-game-surface',
                          )}
                        >
                          <Sparkles
                            className="ml-1 size-5 shrink-0 text-game-muted"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-game-ink">
                            None
                          </span>
                          {!selectedPokemonPower && (
                            <Check
                              className="size-3.5 text-game-charcoal"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                        {availablePokemonPowers.map((power) => {
                          const selected = selectedPokemonPower === power.id
                          return (
                            <button
                              key={power.id}
                              type="button"
                              onClick={() => void savePokemonPower(power.id)}
                              disabled={selected || savingPowerId !== null}
                              aria-pressed={selected}
                              title={power.description}
                              className={cn(
                                'game-focus-ring flex min-h-14 min-w-0 items-center gap-2 rounded-lg border p-2 text-left transition-colors disabled:opacity-50',
                                selected
                                  ? 'border-game-charcoal bg-game-charcoal/5'
                                  : 'border-game-border bg-game-surface-raised hover:bg-game-surface',
                              )}
                            >
                              <ItemSprite
                                itemId={power.itemId}
                                alt=""
                                width={28}
                                height={28}
                              />
                              <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-game-ink">
                                {power.name}
                              </span>
                              {selected ? (
                                <Check
                                  className="size-3.5 shrink-0 text-game-charcoal"
                                  aria-hidden="true"
                                />
                              ) : savingPowerId === power.id ? (
                                <Loader2
                                  className="size-3.5 shrink-0 animate-spin"
                                  aria-hidden="true"
                                />
                              ) : null}
                            </button>
                          )
                        })}
                        {availablePokemonPowers.length === 0 && (
                          <p className="col-span-2 py-3 text-center text-xs text-game-muted">
                            No Pokémon Powers unlocked.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}
          </main>
        )}
      </div>

      {selectedPokemon && (
        <>
          <MoveLoadoutWorkspace
            open={moveWorkspaceOpen}
            onOpenChange={setMoveWorkspaceOpen}
            pokemonName={selectedPokemon.name || pokemonForm?.name || 'Pokémon'}
            entries={moveLoadoutEntries}
            selectedMoveIds={selectedMoveIds}
            maxMoves={maxMoves}
            hasChanges={
              selectedMoveIds.length !==
                normalizeAssignedMoveIds(selectedPokemon.assignedMoves)
                  .length ||
              selectedMoveIds.some(
                (moveId, index) =>
                  moveId !==
                  normalizeAssignedMoveIds(selectedPokemon.assignedMoves)[
                    index
                  ],
              )
            }
            isSaving={savingMoves}
            onToggleMove={(moveId) =>
              setSelectedMoveIds((current) =>
                current.includes(moveId)
                  ? current.filter((id) => id !== moveId)
                  : current.length < maxMoves
                    ? [...current, moveId]
                    : current,
              )
            }
            onClear={() => setSelectedMoveIds([])}
            onAutoPick={() => void handleAutoPick()}
            onSave={() => void saveMoves(selectedMoveIds, true)}
            onDetails={(moveId) => setMoveDetail(getMove(moveId) || null)}
          />
          <ResponsivePanel
            open={moveDetail !== null}
            onOpenChange={(nextOpen) => !nextOpen && setMoveDetail(null)}
            title={moveDetail?.name || 'Move details'}
            description="Battle move field note"
            icon={
              moveDetail ? (
                <ItemSprite
                  itemId={getMoveTypeSpriteItemId(moveDetail)}
                  alt=""
                  width={72}
                  height={72}
                  normalizeVisibleBounds
                />
              ) : undefined
            }
            background="/backgrounds/lab.avif"
            heroLabel="Battle move"
          >
            <div className="custom-scrollbar h-full overflow-y-auto p-4">
              {moveDetail ? (
                <MoveFieldNote
                  presentation={getMovePresentation(moveDetail, {
                    source: { kind: 'other', label: 'Assignable move' },
                  })}
                />
              ) : null}
            </div>
          </ResponsivePanel>
        </>
      )}
    </ResponsivePanel>
  )
}
