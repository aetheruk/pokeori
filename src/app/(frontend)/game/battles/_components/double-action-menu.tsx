'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ItemSprite } from '@/components/ui/item-sprite'
import { cn } from '@/lib/utils'
import { getMove } from '@/data/moves'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'
import {
  getDefaultDoublesTarget,
  getDoublesPokemon,
  getDoublesSlots,
  type DoublesAction,
  type DoublesTarget,
} from '@/utilities/battle/doubles-state'
import { isDoublesCommanderInactive } from '@/utilities/battle/doubles-abilities'
import { getBattlePowers } from '../actions'
import type { BattlePowersData } from '../powers/powers-data'
import { useBattleContext } from './battle-context'
import { StanceSelector } from './stance-selector'
import { ItemSelector } from './item-selector'
import { BattleMovesContent, getBattleMovePresentation, MoveInfoDialog } from './battle-moves-content'

type Slot = 0 | 1
type Panel = 'moves' | 'switch' | 'powers' | null

const typeIdMap: Record<string, number> = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  ghost: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  electric: 13,
  psychic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,
}

function moveTarget(
  slot: Slot,
  moveId: string,
  selected: DoublesTarget,
  fallback: DoublesTarget,
): DoublesTarget | undefined {
  const move = getMove(moveId)
  if (move?.doublesTarget === 'ally')
    return { side: 'ally', slot: slot === 0 ? 1 : 0 }
  if (
    move?.doublesTarget === 'self' ||
    move?.target === 'self' ||
    ['both-opponents', 'both-allies', 'all-active'].includes(
      move?.doublesTarget ?? '',
    )
  )
    return undefined
  return move?.doublesTarget === 'any-single' || selected.side === 'opponent'
    ? selected
    : fallback
}

export function DoubleActionMenu() {
  const {
    battleState,
    isAnimating,
    isWaitingForServer,
    isWaitingForOpponent,
    pendingBattleAction,
    handleDoublesChooseAction: choose,
    handleDoublesReplace,
    selectedDoublesSlot: selectedSlot,
    setSelectedDoublesSlot: setSelectedSlot,
    doublesDraft: draft,
    setDoublesDraft: setDraft,
    selectedDoublesTarget: selectedTarget,
    setSelectedDoublesTarget: setSelectedTarget,
  } = useBattleContext()
  const [typeBySlot, setTypeBySlot] = useState<Partial<Record<Slot, string>>>(
    {},
  )
  const [panel, setPanel] = useState<Panel>(null)
  const [moveInfoId, setMoveInfoId] = useState<string | null>(null)
  const [powerData, setPowerData] = useState<
    Partial<Record<Slot, BattlePowersData>>
  >({})
  const disabled =
    isAnimating || isWaitingForServer || isWaitingForOpponent || battleState.status !== 'ongoing'
  const slots = getDoublesSlots(battleState, 'player')
  const active = ([0, 1] as const).filter(
    (slot) =>
      getDoublesPokemon(battleState, 'player', slot)?.currentHp &&
      !isDoublesCommanderInactive(
        getDoublesPokemon(battleState, 'player', slot),
      ),
  )
  const replacementSlots = battleState.pendingPlayerReplacementSlots ?? []
  const actor = getDoublesPokemon(battleState, 'player', selectedSlot)
  const action = draft[selectedSlot]
  const partner = getDoublesPokemon(
    battleState,
    'player',
    selectedSlot === 0 ? 1 : 0,
  )
  const selectedType = typeBySlot[selectedSlot] ?? actor?.types[0] ?? 'normal'
  const usedIndexes = getDoublesSlots(battleState, 'player')
  const otherDraft = draft[selectedSlot === 0 ? 1 : 0]
  const reserves = battleState.playerTeam
    .map((mon, index) => ({ mon, index }))
    .filter(
      ({ mon, index }) =>
        mon.currentHp > 0 &&
        !usedIndexes.includes(index) &&
        !(otherDraft?.kind === 'switch' && otherDraft.pokemonIndex === index),
    )
  const moves = (actor?.battleMoveIds ?? [])
    .map((id) => getMove(id))
    .filter(
      (move): move is NonNullable<typeof move> =>
        !!move &&
        !move.charged &&
        !move.recharge &&
        !move.continuous &&
        (move.doublesTarget !== 'ally' ||
          !!(partner?.currentHp && !isDoublesCommanderInactive(partner))),
    )

  useEffect(() => {
    setDraft({})
    setTypeBySlot({})
    setPanel(null)
    setSelectedSlot(active[0] ?? 0)
    setSelectedTarget(getDefaultDoublesTarget(battleState))
  }, [
    battleState.turn,
    battleState.activePlayerSlots?.[0],
    battleState.activePlayerSlots?.[1],
    active[0],
    setSelectedSlot,
  ])

  const player0 = getDoublesPokemon(battleState, 'player', 0)
  const player1 = getDoublesPokemon(battleState, 'player', 1)
  useEffect(() => {
    let cancelled = false
    const entries = ([0, 1] as const)
      .map((slot) => ({ slot, mon: slot === 0 ? player0 : player1 }))
      .filter(({ mon }) => mon?.currentHp && !isDoublesCommanderInactive(mon))
    void Promise.all(
      entries.map(async ({ slot, mon }) => ({
        slot,
        result: await getBattlePowers(mon!.formId, slot),
      })),
    ).then((results) => {
      if (cancelled) return
      const data: Partial<Record<Slot, BattlePowersData>> = {}
      for (const { slot, result } of results)
        if (result.success) data[slot] = result.data
      setPowerData(data)
    })
    return () => {
      cancelled = true
    }
  }, [player0?.id, player0?.formId, player1?.id, player1?.formId])

  const commit = (next: DoublesAction) => {
    setPanel(null)
    choose(next)
  }

  const changeType = (type: string) => {
    setTypeBySlot((current) => ({ ...current, [selectedSlot]: type }))
  }
  const powerOptions: Array<{ label: string; command: DoublesAction }> = []
  const powers = battleState.powers
  const data = powerData[selectedSlot]
  if (powers && data?.hasTera && powers.teraUsesRemaining > 0)
    powerOptions.push({
      label: 'Terastallize',
      command: { slot: selectedSlot, kind: 'power', powerId: 'tera' },
    })
  if (
    powers &&
    data?.hasDynamax &&
    powers.dynamaxAvailable &&
    powers.dynamaxUsesRemaining > 0
  )
    powerOptions.push({
      label: 'Dynamax',
      command: { slot: selectedSlot, kind: 'power', powerId: 'dynamax' },
    })
  if (powers && data?.hasZRing && powers.zMoveUsesRemaining > 0)
    powerOptions.push({
      label: 'Z-Move',
      command: { slot: selectedSlot, kind: 'power', powerId: 'z-move' },
    })
  if (powers && data?.hasMega && powers.megaUsesRemaining > 0)
    for (const form of data.megaStones)
      powerOptions.push({
        label: `Mega · ${form.megaFormName}`,
        command: {
          slot: selectedSlot,
          kind: 'power',
          powerId: 'mega',
          formId: form.megaFormId,
        },
      })

  return (
    <div
      className="game-paper-first game-paper-background relative flex min-h-[13rem] flex-[10] flex-col border-t border-game-border bg-game-canvas px-3 py-3 text-game-ink sm:px-5 sm:py-4 xl:flex-none"
      aria-busy={disabled}
    >
      {isWaitingForServer && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-game-surface/85 backdrop-blur-[1px]">
          <Loader2 className="mr-2 h-7 w-7 animate-spin text-game-moss motion-reduce:animate-none" />
          <span className="text-sm font-bold">
            {pendingBattleAction?.label || 'Resolving actions'}
          </span>
        </div>
      )}
      <div className="mx-auto w-full max-w-2xl">
        {replacementSlots.length > 0 ? (
          <div className="rounded-lg border border-game-ochre/40 bg-game-ochre/10 p-3">
            <p className="mb-3 text-sm font-semibold">
              Choose a Pokemon for each empty lane.
            </p>
            {replacementSlots.map((value) => {
              const slot = value as Slot
              const available = battleState.playerTeam
                .map((mon, index) => ({ mon, index }))
                .filter(
                  ({ mon, index }) =>
                    mon.currentHp > 0 && !slots.includes(index),
                )
              return (
                <div key={slot} className="mb-3 last:mb-0">
                  <p className="mb-2 text-xs font-semibold text-game-muted">
                    Your Pokemon · {slot + 1}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {available.map(({ mon, index }) => (
                      <Button
                        key={`${slot}:${index}`}
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-11 rounded-lg border-game-border bg-game-surface-raised"
                        disabled={disabled}
                        onClick={() => void handleDoublesReplace(slot, index)}
                      >
                        {mon.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <>
            <p className="sr-only" aria-live="polite">
              Choosing an action for {actor?.name ?? 'the active Pokemon'}
            </p>

            {actor && active.includes(selectedSlot) && (
              <>
                <fieldset
                  className="mb-2 flex min-w-0 items-center justify-center gap-2"
                  aria-label={`Attack type for ${actor.name}`}
                >
                  {actor.types.map((type) => {
                    const typeId = typeIdMap[type.toLowerCase()]
                    return (
                      <Button
                        key={type}
                        type="button"
                        variant="ghost"
                        className={cn(
                          'h-12 w-20 rounded-full border-0 bg-transparent p-0 hover:bg-transparent',
                          selectedType === type
                            ? 'opacity-100'
                            : 'opacity-60 grayscale',
                        )}
                        aria-label={type}
                        aria-pressed={selectedType === type}
                        disabled={disabled}
                        onClick={() => changeType(type)}
                      >
                        {typeId ? (
                          <Image
                            src={getPokemonTypeIconUrl(typeId)}
                            alt={type}
                            width={100}
                            height={40}
                            className="h-7 w-auto object-contain"
                            unoptimized
                          />
                        ) : (
                          <span className="text-xs font-semibold capitalize">
                            {type}
                          </span>
                        )}
                      </Button>
                    )
                  })}
                </fieldset>
                <StanceSelector
                  onSelect={(stance) =>
                    choose({
                      slot: selectedSlot,
                      kind: 'basic',
                      stance,
                      attackType: selectedType,
                      target:
                        selectedTarget.side === 'opponent'
                          ? selectedTarget
                          : getDefaultDoublesTarget(battleState),
                    })
                  }
                  stats={actor.stats}
                  statStages={actor.statStages}
                  zMoveReady={!!actor.zMoveReady}
                  disabledStance={
                    actor.disabledStance?.turnsRemaining
                      ? actor.disabledStance.stance
                      : undefined
                  }
                  pendingStance={
                    action?.kind === 'basic' ? action.stance : undefined
                  }
                  disabled={disabled}
                />

                <div className="mt-3 flex w-full max-w-md gap-2">
                  <ItemSelector />
                  {moves.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 flex-1 gap-2 rounded-xl border-game-border bg-game-surface-raised text-game-ink shadow-sm"
                      aria-label={`Moves, ${actor.moveUsesRemaining ?? 0} uses remaining`}
                      disabled={disabled || (actor.moveUsesRemaining ?? 0) <= 0}
                      onClick={() => setPanel('moves')}
                    >
                      <ItemSprite
                        itemId={`tm-${actor.types[0] ?? 'normal'}`}
                        alt=""
                        width={22}
                        height={22}
                        className="h-5 w-5 object-contain"
                      />
                      <span className="rounded-full border border-game-border bg-game-canvas/60 px-1.5 py-0.5 text-[10px] font-black">
                        {actor.moveUsesRemaining ?? 0}/
                        {battleState.config?.movesPerBattle ??
                          actor.moveUsesRemaining ??
                          0}
                      </span>
                    </Button>
                  )}
                  {powerOptions.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 flex-1 gap-2 rounded-xl border-game-border bg-game-surface-raised text-game-ink shadow-sm"
                      aria-label={`Battle powers, ${powerOptions.length} choices`}
                      disabled={disabled}
                      onClick={() => setPanel('powers')}
                    >
                      <ItemSprite
                        itemId="tera-orb"
                        alt=""
                        width={22}
                        height={22}
                        className="h-5 w-5 object-contain"
                      />
                      <span className="rounded-full border border-game-border bg-game-canvas/60 px-1.5 py-0.5 text-[10px] font-black">
                        {powerOptions.length}
                      </span>
                    </Button>
                  )}
                  {battleState.playerTeam.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 w-12 shrink-0 rounded-xl border-game-border bg-game-surface-raised p-0 text-game-ink shadow-sm"
                      aria-label="Switch Pokemon"
                      disabled={disabled || reserves.length === 0}
                      onClick={() => setPanel('switch')}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Drawer
        open={panel !== null}
        onOpenChange={(open) => {
          if (!open) setPanel(null)
        }}
      >
        <DrawerContent className="game-paper-modal game-paper-background max-h-[70dvh] border-game-border bg-game-surface-raised">
          {panel === 'moves' && actor ? (
            <BattleMovesContent
              moves={moves}
              pokemon={actor}
              state={battleState}
              selectedType={selectedType}
              usesRemaining={actor.moveUsesRemaining ?? 0}
              triggerItemId={`tm-${actor.types[0] ?? 'normal'}`}
              disabled={disabled}
              onDetails={setMoveInfoId}
              onUseMove={(moveId) => commit({
                slot: selectedSlot,
                kind: 'move',
                moveId,
                selectedType,
                target: moveTarget(selectedSlot, moveId, selectedTarget, getDefaultDoublesTarget(battleState)),
              })}
            />
          ) : (
            <>
              <DrawerHeader className="pb-2">
                <DrawerTitle>{panel === 'switch' ? 'Switch Pokemon' : 'Battle powers'}</DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto px-4 pb-6">
            {panel === 'switch' &&
              reserves.map(({ mon, index }) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  className="mb-2 h-12 w-full justify-between gap-3 rounded-lg border-game-border bg-game-canvas px-3 text-left"
                  disabled={disabled}
                  onClick={() =>
                    commit({
                      slot: selectedSlot,
                      kind: 'switch',
                      pokemonIndex: index,
                    })
                  }
                >
                  <span className="truncate text-sm font-semibold">
                    {mon.name}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-game-muted">
                    {mon.currentHp}/{mon.maxHp} HP
                  </span>
                </Button>
              ))}
            {panel === 'powers' &&
              powerOptions.map((option) => (
                <Button
                  key={`${option.command.kind === 'power' ? option.command.powerId : ''}:${option.label}`}
                  type="button"
                  variant="outline"
                  className="mb-2 h-12 w-full justify-start rounded-lg border-game-border bg-game-canvas px-3 text-left text-sm font-semibold"
                  disabled={disabled}
                  onClick={() => commit(option.command)}
                >
                  {option.label}
                </Button>
              ))}
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <MoveInfoDialog
        presentation={moveInfoId && actor && moves.find((move) => move.id === moveInfoId)
          ? getBattleMovePresentation(moves.find((move) => move.id === moveInfoId)!, actor, battleState, selectedType)
          : null}
        onOpenChange={(open) => { if (!open) setMoveInfoId(null) }}
      />
    </div>
  )
}
