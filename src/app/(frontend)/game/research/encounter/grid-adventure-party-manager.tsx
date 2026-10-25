'use client'

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Loader2,
  PencilLine,
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
  formatHeldItemTrigger,
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

export function GridAdventurePartyManager() {
  const { user, gameData, refreshUser } = useUser()
  const [open, setOpen] = useState(false)
  const [battleTeam, setBattleTeam] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(
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

  useEffect(() => {
    if (!open) return
    let current = true
    setLoading(true)
    setLoadError(null)
    void getPokemonTeamLayout()
      .then((layout) => {
        if (current) {
          setBattleTeam(layout.battleTeam as Pokemon[])
          setSelectedPokemonId(null)
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

  const movePokemon = async (index: number, offset: -1 | 1) => {
    const targetIndex = index + offset
    if (
      reorderingPokemonId ||
      targetIndex < 0 ||
      targetIndex >= sortedTeam.length
    ) {
      return
    }
    const source = sortedTeam[index]
    const target = sortedTeam[targetIndex]
    setReorderingPokemonId(source.id)
    try {
      const sourcePosition = getBattleTeamPosition(source, index)
      const targetPosition = getBattleTeamPosition(target, targetIndex)
      const result = await reorderBattleTeam([
        ...sortedTeam.map((pokemon, currentIndex) => ({
          pokemonId: pokemon.id,
          position:
            pokemon.id === source.id
              ? targetPosition
              : pokemon.id === target.id
                ? sourcePosition
                : getBattleTeamPosition(pokemon, currentIndex),
        })),
      ])
      if (!result.success || !result.placements) {
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
    } catch {
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
      toast.success(itemId ? 'Held item set.' : 'Held item cleared.')
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
        if (!nextOpen) setSelectedPokemonId(null)
      }}
      dismissible={!moveWorkspaceOpen && !moveDetail}
      title="Battle team"
      description="Arrange your team and prepare its battle loadouts."
      icon={<ItemSprite itemId="poke-ball" alt="" width={76} height={76} />}
      background="/backgrounds/battle.avif"
      heroLabel="Grid Adventure"
      className="game-paper-first game-paper-background flex w-full flex-col gap-0 overflow-hidden bg-game-canvas p-0 text-game-ink"
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
      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto p-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-6">
        {loading ? (
          <div
            className="flex min-h-40 items-center justify-center gap-2 text-sm text-game-muted"
            role="status"
          >
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Loading your battle team…
          </div>
        ) : loadError ? (
          <p
            className="rounded-md border border-game-danger/30 bg-game-danger/5 p-4 text-sm text-game-danger"
            role="alert"
          >
            {loadError}
          </p>
        ) : selectedPokemon ? (
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedPokemonId(null)}
              className="min-h-11 w-fit gap-2 border-game-border bg-game-surface-raised text-game-ink"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Battle team
            </Button>

            <section className="flex items-center gap-3 border-b border-game-border pb-4">
              <PokemonRaritySprite
                formId={selectedPokemon.formId}
                view="home"
                rarity={selectedPokemon.rarity}
                shiny={selectedPokemon.shiny}
                isShadow={selectedPokemon.isShadow}
                isRadiant={selectedPokemon.isRadiant}
                female={getOwnedPokemonGender(selectedPokemon) === 'female'}
                alt=""
                className="size-16 shrink-0"
              />
              <div className="min-w-0">
                <h2 className="truncate font-display text-xl font-semibold text-game-ink">
                  {selectedPokemon.name || pokemonForm?.name || 'Pokémon'}
                </h2>
                <p className="text-sm text-game-muted">
                  Level {selectedPokemon.level} ·{' '}
                  {
                    normalizeAssignedMoveIds(selectedPokemon.assignedMoves)
                      .length
                  }{' '}
                  assigned moves
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <div>
                <h3 className="font-display text-lg font-semibold text-game-ink">
                  Held item
                </h3>
                <p className="text-xs text-game-muted">
                  {currentHeldItem?.name || 'No held item assigned'}
                </p>
              </div>
              {heldItemUnlockMessage ? (
                <p className="rounded-md border border-game-border bg-game-surface-raised p-3 text-xs text-game-muted">
                  {heldItemUnlockMessage}
                </p>
              ) : (
                <div className="divide-y divide-game-border/75 border-y border-game-border/75">
                  {currentHeldItem && (
                    <button
                      type="button"
                      onClick={() => void saveHeldItem(null)}
                      disabled={savingHeldItemId !== null}
                      className="flex min-h-14 w-full items-center gap-3 py-2 text-left text-game-ink hover:bg-game-charcoal/5 disabled:opacity-50"
                    >
                      <ItemSprite
                        itemId={currentHeldItem.id}
                        alt=""
                        width={36}
                        height={36}
                      />
                      <span className="flex-1 text-sm font-semibold">
                        Remove {currentHeldItem.name}
                      </span>
                      {savingHeldItemId === 'none' && (
                        <Loader2
                          className="size-4 animate-spin"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}
                  {heldItemOptions.length === 0 ? (
                    <p className="py-3 text-sm text-game-muted">
                      No held items in your bag.
                    </p>
                  ) : (
                    heldItemOptions.map((item) => {
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
                          className={cn(
                            'flex min-h-16 w-full items-center gap-3 py-2 text-left transition-colors',
                            selected
                              ? 'bg-game-moss/10 text-game-ink'
                              : 'text-game-ink hover:bg-game-charcoal/5',
                            disabled &&
                              'cursor-not-allowed opacity-50 hover:bg-transparent',
                          )}
                        >
                          <ItemSprite
                            itemId={item.id}
                            alt=""
                            width={38}
                            height={38}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-sm font-semibold">
                                {item.name}
                              </span>
                              <span className="font-mono text-xs text-game-muted">
                                x{inventoryMap[item.id] || 0}
                              </span>
                            </span>
                            <span className="mt-1 block text-[11px] leading-snug text-game-muted">
                              {skillLock || formatHeldItemTrigger(item)}
                            </span>
                          </span>
                          {savingHeldItemId === item.id && (
                            <Loader2
                              className="size-4 animate-spin"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      )
                    })
                  )}
                </div>
              )}
            </section>

            <section className="space-y-3 border-t border-game-border pt-5">
              <div>
                <h3 className="font-display text-lg font-semibold text-game-ink">
                  Pokémon Power
                </h3>
                <p className="text-xs text-game-muted">
                  {selectedPokemonPower
                    ? availablePokemonPowers.find(
                        (power) => power.id === selectedPokemonPower,
                      )?.name || selectedPokemonPower
                    : 'No Pokémon Power selected'}
                </p>
              </div>
              {pokemonResearchLevel < 3 ? (
                <div className="space-y-3 rounded-md border border-game-border bg-game-surface-raised p-3">
                  <p className="text-xs text-game-muted">
                    Research Level 3 required for this species to select Pokémon
                    Powers.
                  </p>
                  {selectedPokemonPower && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => void savePokemonPower(null)}
                      disabled={savingPowerId !== null}
                      className="min-h-10 border-game-border bg-game-surface text-game-ink"
                    >
                      Clear selected power
                    </Button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-game-border/75 border-y border-game-border/75">
                  {selectedPokemonPower && (
                    <button
                      type="button"
                      onClick={() => void savePokemonPower(null)}
                      disabled={savingPowerId !== null}
                      className="flex min-h-14 w-full items-center gap-3 py-2 text-left text-game-ink hover:bg-game-charcoal/5 disabled:opacity-50"
                    >
                      <span
                        className="flex size-9 items-center justify-center rounded-md border border-game-border bg-game-surface-raised text-xs font-bold text-game-muted"
                        aria-hidden="true"
                      >
                        P
                      </span>
                      <span className="flex-1 text-sm font-semibold">
                        Clear selected power
                      </span>
                      {savingPowerId === 'none' && (
                        <Loader2
                          className="size-4 animate-spin"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )}
                  {availablePokemonPowers.length === 0 ? (
                    <p className="py-3 text-sm text-game-muted">
                      No Pokémon Powers are currently unlocked for this Pokémon.
                    </p>
                  ) : (
                    availablePokemonPowers.map((power) => {
                      const selected = selectedPokemonPower === power.id
                      return (
                        <button
                          key={power.id}
                          type="button"
                          onClick={() => void savePokemonPower(power.id)}
                          disabled={selected || savingPowerId !== null}
                          aria-pressed={selected}
                          className={cn(
                            'flex min-h-16 w-full items-center gap-3 py-2 text-left transition-colors',
                            selected
                              ? 'bg-game-ochre/10 text-game-ink'
                              : 'text-game-ink hover:bg-game-charcoal/5',
                            (selected || savingPowerId !== null) &&
                              'cursor-not-allowed opacity-50 hover:bg-transparent',
                          )}
                        >
                          <ItemSprite
                            itemId={power.itemId}
                            alt=""
                            width={36}
                            height={36}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">
                              {power.name}
                            </span>
                            <span className="mt-1 block text-[11px] leading-snug text-game-muted">
                              {power.description}
                            </span>
                          </span>
                          {savingPowerId === power.id && (
                            <Loader2
                              className="size-4 animate-spin"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      )
                    })
                  )}
                </div>
              )}
            </section>

            <section className="space-y-3 border-t border-game-border pt-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold text-game-ink">
                    Battle moves
                  </h3>
                  <p className="text-xs text-game-muted">
                    {selectedMoveIds.length}/{maxMoves} slots filled
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => setMoveWorkspaceOpen(true)}
                  disabled={!!moveUnlockMessage || savingMoves}
                  className="min-h-11 gap-2 bg-game-charcoal text-game-cream hover:bg-game-charcoal-strong disabled:opacity-50"
                >
                  <PencilLine className="size-4" aria-hidden="true" />
                  Edit moves
                </Button>
              </div>
              {moveUnlockMessage ? (
                <p className="rounded-md border border-game-border bg-game-surface-raised p-3 text-xs text-game-muted">
                  {moveUnlockMessage}
                </p>
              ) : selectedMoveIds.length > 0 ? (
                <ol className="divide-y divide-game-border/75 border-y border-game-border/75">
                  {selectedMoveIds.map((moveId, index) => {
                    const move = getMove(moveId)
                    return move ? (
                      <li
                        key={`${moveId}:${index}`}
                        className="flex min-h-12 items-center gap-3 py-2"
                      >
                        <span className="font-mono text-xs text-game-muted">
                          {index + 1}
                        </span>
                        <ItemSprite
                          itemId={getMoveTypeSpriteItemId(move)}
                          alt=""
                          width={26}
                          height={26}
                        />
                        <span className="text-sm font-semibold text-game-ink">
                          {move.name}
                        </span>
                      </li>
                    ) : null
                  })}
                </ol>
              ) : (
                <p className="rounded-md border border-dashed border-game-border p-3 text-xs text-game-muted">
                  No battle moves assigned.
                </p>
              )}
            </section>
          </div>
        ) : sortedTeam.length > 0 ? (
          <div className="mx-auto w-full max-w-2xl">
            <p className="mb-4 text-sm text-game-muted">
              Use the arrows to set your lead order. Choose a Pokémon to change
              its moves or held item.
            </p>
            <ol className="divide-y divide-game-border/75 border-y border-game-border/75">
              {sortedTeam.map((pokemon, index) => {
                const form = getPokemonForm(pokemon.formId)
                return (
                  <li
                    key={pokemon.id}
                    className="flex min-h-20 items-center gap-3 py-2"
                  >
                    <span className="w-7 shrink-0 text-center font-mono text-sm font-bold text-game-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
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
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-game-ink">
                        {pokemon.name || form?.name || 'Pokémon'}
                      </div>
                      <div className="truncate text-xs text-game-muted">
                        Lv. {pokemon.level} ·{' '}
                        {normalizeAssignedMoveIds(pokemon.assignedMoves).length}{' '}
                        moves
                        {pokemon.heldItemId
                          ? ` · ${getHeldItemDefinition(pokemon.heldItemId)?.name || 'Held item'}`
                          : ''}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => void movePokemon(index, -1)}
                        disabled={index === 0 || !!reorderingPokemonId}
                        aria-label={`Move ${pokemon.name || form?.name || 'Pokémon'} earlier`}
                        className="size-10 border-game-border bg-game-surface-raised text-game-ink disabled:opacity-40"
                      >
                        {reorderingPokemonId === pokemon.id ? (
                          <Loader2
                            className="size-4 animate-spin"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowUp className="size-4" aria-hidden="true" />
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => void movePokemon(index, 1)}
                        disabled={
                          index === sortedTeam.length - 1 ||
                          !!reorderingPokemonId
                        }
                        aria-label={`Move ${pokemon.name || form?.name || 'Pokémon'} later`}
                        className="size-10 border-game-border bg-game-surface-raised text-game-ink disabled:opacity-40"
                      >
                        <ArrowDown className="size-4" aria-hidden="true" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedPokemonId(pokemon.id)}
                        className="min-h-10 border-game-border bg-game-surface-raised px-3 text-xs font-semibold text-game-ink"
                      >
                        Edit
                      </Button>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        ) : (
          <p className="mx-auto max-w-md rounded-md border border-game-border bg-game-surface-raised p-4 text-center text-sm text-game-muted">
            Your battle team is empty. Add Pokémon to your team before starting
            a battle.
          </p>
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
