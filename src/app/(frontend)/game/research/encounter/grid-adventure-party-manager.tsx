'use client'

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
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
import { getPokemonPokedexBackground } from '@/utilities/pokemon/pokemon-background'
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

function normalizePokemonBackgroundPath(path?: string | null) {
  if (!path) return null

  const filename = path.split('/').pop()
  if (!filename) return null

  return `/backgrounds/${filename
    .replace(/\.(png|jpe?g|webp)$/i, '.avif')
    .replaceAll('_', '-')}`
}

function BattleTeamCardFace({
  pokemon,
  index,
}: {
  pokemon: Pokemon
  index: number
}) {
  const form = getPokemonForm(pokemon.formId)
  const name = pokemon.name || form?.name || 'Pokémon'
  const heldItem = getHeldItemDefinition(pokemon.heldItemId)
  const background =
    normalizePokemonBackgroundPath(pokemon.background) ||
    getPokemonPokedexBackground({ types: form?.types || [] })

  return (
    <span className="relative isolate block aspect-[1.38] min-h-32 w-full overflow-hidden rounded-[inherit] bg-game-canvas text-left">
      <Image
        src={background}
        alt=""
        fill
        sizes="(max-width: 640px) 46vw, 300px"
        className="object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-game-ink/15 via-game-canvas/10 to-game-ink/85"
      />
      <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-game-ink/80 px-2 py-1 font-mono text-[10px] font-bold text-game-cream shadow-sm">
        {index === 0 ? 'LEAD' : index + 1}
      </span>
      {heldItem && (
        <span
          className="absolute right-2.5 top-2.5 z-10 flex size-9 items-center justify-center rounded-full border border-game-border/80 bg-game-surface/90 shadow-sm"
          title={heldItem.name}
        >
          <ItemSprite itemId={heldItem.id} alt="" width={28} height={28} />
        </span>
      )}
      <span className="absolute inset-x-3 bottom-6 top-1 z-[1]">
        <PokemonRaritySprite
          formId={pokemon.formId}
          view="home"
          rarity={pokemon.rarity}
          shiny={pokemon.shiny}
          isShadow={pokemon.isShadow}
          isRadiant={pokemon.isRadiant}
          female={getOwnedPokemonGender(pokemon) === 'female'}
          alt=""
          className="h-full w-full"
          imageClassName="drop-shadow-[0_3px_3px_rgba(20,25,23,0.38)]"
          sizes="(max-width: 640px) 38vw, 220px"
        />
      </span>
      <span className="absolute inset-x-3 bottom-2 z-10 flex min-w-0 items-end justify-between gap-2 text-game-cream">
        <span className="min-w-0 truncate text-sm font-bold leading-tight drop-shadow-sm">
          {name}
        </span>
        <span className="shrink-0 font-mono text-[10px] font-semibold text-game-cream/90">
          Lv. {pokemon.level}
        </span>
      </span>
    </span>
  )
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
  const heldItem = getHeldItemDefinition(pokemon.heldItemId)

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        'relative list-none rounded-xl',
        isDragging && 'z-20 opacity-30',
      )}
    >
      <button
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        type="button"
        disabled={disabled}
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`${name}, level ${pokemon.level}${index === 0 ? ', lead Pokémon' : `, position ${index + 1}`}${heldItem ? `, holding ${heldItem.name}` : ''}. Drag to reorder.`}
        data-haptic-manual="true"
        className={cn(
          'game-focus-ring block w-full touch-pan-y rounded-xl border-2 text-left shadow-sm transition-[border-color,box-shadow] disabled:cursor-wait',
          selected
            ? 'border-game-ochre shadow-md'
            : 'border-game-card-border hover:border-game-charcoal/60',
        )}
      >
        <BattleTeamCardFace pokemon={pokemon} index={index} />
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
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 8 },
    }),
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
      description="Reorder your team and prepare each Pokémon."
      showHero={false}
      closeButtonClassName="right-3 top-[max(0.75rem,env(safe-area-inset-top))] size-8 rounded-md border-0 bg-transparent text-game-muted shadow-none backdrop-blur-none hover:bg-game-charcoal/5 hover:text-game-ink focus-visible:ring-game-charcoal/50"
      closeIconClassName="size-4"
      className="game-paper-first flex w-full min-w-0 flex-col overflow-hidden bg-game-canvas p-0 text-game-ink"
      trigger={
        <Button
          type="button"
          variant="outline"
          data-haptic-manual="true"
          className="size-12 rounded-full border border-game-border bg-game-surface-raised p-1 shadow-sm hover:border-game-charcoal hover:bg-game-surface"
          aria-label="Manage battle team"
          title="Manage battle team"
        >
          <ItemSprite itemId="poke-ball" alt="" width={36} height={36} />
        </Button>
      }
    >
      <header className="z-10 w-full min-w-0 shrink-0 border-b border-game-border bg-game-surface-raised px-4 pb-2.5 pt-[max(0.75rem,env(safe-area-inset-top))] pr-14 shadow-sm sm:px-6 sm:pr-16">
        <div className="mx-auto flex w-full min-w-0 max-w-4xl items-center gap-2.5">
          <ItemSprite itemId="poke-ball" alt="" width={28} height={28} />
          <div className="min-w-0">
            <h1 className="font-display text-lg font-bold leading-tight text-game-ink">
              Battle team
            </h1>
          </div>
          {sortedTeam.length > 0 && (
            <span className="ml-auto rounded-full border border-game-border bg-game-canvas px-2.5 py-1 font-mono text-xs font-semibold text-game-ink">
              {sortedTeam.length}/6
            </span>
          )}
        </div>
      </header>

      <div className="custom-scrollbar min-h-0 min-w-0 w-full max-w-full flex-1 overflow-x-hidden overflow-y-auto overscroll-contain p-3 sm:p-5">
        {loading ? (
          <div
            className="flex min-h-40 items-center justify-center text-sm text-game-muted"
            role="status"
          >
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
          <div className="mx-auto mt-8 max-w-sm rounded-xl border border-game-card-border bg-game-surface-raised p-5 text-center shadow-sm">
            <h2 className="font-display text-lg font-semibold text-game-ink">
              No battle team
            </h2>
            <p className="mt-1 text-sm text-game-muted">
              Add Pokémon before entering a battle.
            </p>
          </div>
        ) : (
          <main className="mx-auto w-full min-w-0 max-w-4xl">
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
                  className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
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
                  <div className="rounded-xl border-2 border-game-ochre shadow-xl">
                    <BattleTeamCardFace
                      pokemon={activePokemon}
                      index={sortedTeam.findIndex(
                        (pokemon) => pokemon.id === activePokemon.id,
                      )}
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </main>
        )}
      </div>

      {selectedPokemon && (
        <footer className="z-20 w-full min-w-0 max-w-full shrink-0 overflow-hidden border-t border-game-border bg-game-surface-raised shadow-[0_-4px_16px_rgba(39,48,43,0.1)]">
          <div className="mx-auto w-full min-w-0 max-w-4xl px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <PokemonRaritySprite
                formId={selectedPokemon.formId}
                view="home"
                rarity={selectedPokemon.rarity}
                shiny={selectedPokemon.shiny}
                isShadow={selectedPokemon.isShadow}
                isRadiant={selectedPokemon.isRadiant}
                female={getOwnedPokemonGender(selectedPokemon) === 'female'}
                alt=""
                className="size-9 shrink-0"
                sizes="36px"
              />
              <div className="flex min-w-0 items-baseline gap-2">
                <h2 className="min-w-0 truncate font-display text-sm font-bold leading-tight text-game-ink">
                  {selectedPokemon.name || pokemonForm?.name || 'Pokémon'}
                </h2>
                <span className="shrink-0 font-mono text-[10px] text-game-muted">
                  Lv. {selectedPokemon.level}
                </span>
              </div>
            </div>

            <fieldset
              className="mt-2 grid min-w-0 grid-cols-3 gap-1.5"
              aria-label="Edit selected Pokémon"
            >
              <button
                type="button"
                data-haptic-manual="true"
                onClick={() => {
                  setEditingSection(null)
                  setMoveWorkspaceOpen(true)
                }}
                disabled={!!moveUnlockMessage || savingMoves}
                aria-label={`Edit moves, ${selectedMoveIds.length} of ${maxMoves} selected`}
                title={moveUnlockMessage || 'Edit moves'}
                className="game-focus-ring flex min-h-11 min-w-0 flex-col justify-center rounded-lg border border-game-border bg-game-canvas px-2 text-left transition-colors hover:border-game-charcoal disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="text-[11px] font-bold text-game-ink">Moves</span>
                <span className="truncate font-mono text-[10px] text-game-muted">
                  {selectedMoveIds.length}/{maxMoves}
                </span>
              </button>
              <button
                type="button"
                data-haptic-manual="true"
                onClick={() =>
                  setEditingSection((current) =>
                    current === 'item' ? null : 'item',
                  )
                }
                aria-pressed={editingSection === 'item'}
                aria-expanded={editingSection === 'item'}
                className={cn(
                  'game-focus-ring flex min-h-11 min-w-0 flex-col justify-center rounded-lg border px-2 text-left transition-colors',
                  editingSection === 'item'
                    ? 'border-game-charcoal bg-game-charcoal/5'
                    : 'border-game-border bg-game-canvas hover:border-game-charcoal',
                )}
              >
                <span className="text-[11px] font-bold text-game-ink">Item</span>
                <span className="truncate text-[10px] text-game-muted">
                  {currentHeldItem?.name || 'None'}
                </span>
              </button>
              <button
                type="button"
                data-haptic-manual="true"
                onClick={() =>
                  setEditingSection((current) =>
                    current === 'power' ? null : 'power',
                  )
                }
                aria-pressed={editingSection === 'power'}
                aria-expanded={editingSection === 'power'}
                className={cn(
                  'game-focus-ring flex min-h-11 min-w-0 flex-col justify-center rounded-lg border px-2 text-left transition-colors',
                  editingSection === 'power'
                    ? 'border-game-charcoal bg-game-charcoal/5'
                    : 'border-game-border bg-game-canvas hover:border-game-charcoal',
                )}
              >
                <span className="text-[11px] font-bold text-game-ink">Power</span>
                <span className="truncate text-[10px] text-game-muted">
                  {availablePokemonPowers.find(
                    (power) => power.id === selectedPokemonPower,
                  )?.name ||
                    selectedPokemonPower ||
                    'None'}
                </span>
              </button>
            </fieldset>

            {moveUnlockMessage && (
              <p className="mt-1.5 text-[11px] text-game-muted">
                {moveUnlockMessage}
              </p>
            )}

            {editingSection === 'item' && (
              <div className="mt-2 w-full min-w-0 max-w-full overflow-hidden border-t border-game-border pt-2">
                {heldItemUnlockMessage ? (
                  <p className="text-xs text-game-muted">
                    {heldItemUnlockMessage}
                  </p>
                ) : (
                  <fieldset
                    className="custom-scrollbar flex w-full min-w-0 max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1 touch-pan-x"
                    aria-label="Held item choices"
                  >
                    <button
                      type="button"
                      data-haptic-manual="true"
                      onClick={() => void saveHeldItem(null)}
                      disabled={!currentHeldItemId || savingHeldItemId !== null}
                      aria-pressed={!currentHeldItemId}
                      className={cn(
                        'game-focus-ring flex min-h-14 min-w-28 shrink-0 flex-col justify-center rounded-lg border px-3 text-left disabled:opacity-50',
                        !currentHeldItemId
                          ? 'border-game-charcoal bg-game-charcoal/5'
                          : 'border-game-border bg-game-canvas',
                      )}
                    >
                      <span className="text-xs font-semibold text-game-ink">
                        None
                      </span>
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
                          data-haptic-manual="true"
                          onClick={() => void saveHeldItem(item.id)}
                          disabled={disabled}
                          aria-pressed={selected}
                          aria-label={`${item.name}, ${inventoryMap[item.id] || 0} available${skillLock ? `, ${skillLock}` : ''}`}
                          title={skillLock || item.name}
                          className={cn(
                            'game-focus-ring flex min-h-14 min-w-32 shrink-0 items-center gap-2 rounded-lg border px-2.5 text-left disabled:cursor-not-allowed disabled:opacity-50',
                            selected
                              ? 'border-game-charcoal bg-game-charcoal/5'
                              : 'border-game-border bg-game-canvas',
                          )}
                        >
                          <ItemSprite
                            itemId={item.id}
                            alt=""
                            width={32}
                            height={32}
                          />
                          <span className="min-w-0">
                            <span className="block max-w-28 truncate text-[11px] font-semibold text-game-ink">
                              {item.name}
                            </span>
                            <span className="block font-mono text-[9px] text-game-muted">
                              x{inventoryMap[item.id] || 0}
                            </span>
                          </span>
                        </button>
                      )
                    })}
                    {heldItemOptions.length === 0 && (
                      <p className="py-2 text-xs text-game-muted">
                        No held items in your bag.
                      </p>
                    )}
                  </fieldset>
                )}
              </div>
            )}

            {editingSection === 'power' && (
              <div className="mt-2 w-full min-w-0 max-w-full overflow-hidden border-t border-game-border pt-2">
                {pokemonResearchLevel < 3 ? (
                  <div className="flex min-h-14 items-center justify-between gap-3">
                    <p className="text-xs text-game-muted">
                      Research Level 3 required.
                    </p>
                    {selectedPokemonPower && (
                      <button
                        type="button"
                        data-haptic-manual="true"
                        onClick={() => void savePokemonPower(null)}
                        disabled={savingPowerId !== null}
                        className="game-focus-ring min-h-10 shrink-0 rounded-lg border border-game-border bg-game-canvas px-3 text-xs font-semibold text-game-ink"
                      >
                        Clear power
                      </button>
                    )}
                  </div>
                ) : (
                  <fieldset
                    className="custom-scrollbar flex w-full min-w-0 max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1 touch-pan-x"
                    aria-label="Pokémon Power choices"
                  >
                    <button
                      type="button"
                      data-haptic-manual="true"
                      onClick={() => void savePokemonPower(null)}
                      disabled={!selectedPokemonPower || savingPowerId !== null}
                      aria-pressed={!selectedPokemonPower}
                      className={cn(
                        'game-focus-ring flex min-h-14 min-w-28 shrink-0 flex-col justify-center rounded-lg border px-3 text-left disabled:opacity-50',
                        !selectedPokemonPower
                          ? 'border-game-charcoal bg-game-charcoal/5'
                          : 'border-game-border bg-game-canvas',
                      )}
                    >
                      <span className="text-xs font-semibold text-game-ink">
                        None
                      </span>
                    </button>
                    {availablePokemonPowers.map((power) => {
                      const selected = selectedPokemonPower === power.id
                      return (
                        <button
                          key={power.id}
                          type="button"
                          data-haptic-manual="true"
                          onClick={() => void savePokemonPower(power.id)}
                          disabled={selected || savingPowerId !== null}
                          aria-pressed={selected}
                          title={power.description}
                          className={cn(
                            'game-focus-ring flex min-h-14 min-w-36 shrink-0 items-center gap-2 rounded-lg border px-2.5 text-left disabled:opacity-50',
                            selected
                              ? 'border-game-charcoal bg-game-charcoal/5'
                              : 'border-game-border bg-game-canvas',
                          )}
                        >
                          <ItemSprite
                            itemId={power.itemId}
                            alt=""
                            width={32}
                            height={32}
                          />
                          <span className="truncate text-[11px] font-semibold text-game-ink">
                            {power.name}
                          </span>
                        </button>
                      )
                    })}
                    {availablePokemonPowers.length === 0 && (
                      <p className="py-2 text-xs text-game-muted">
                        No Pokémon Powers unlocked.
                      </p>
                    )}
                  </fieldset>
                )}
              </div>
            )}
          </div>
        </footer>
      )}

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
