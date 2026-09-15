'use client'

import { useEffect, useMemo, useState } from 'react'
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
import { getBattleItemUseLimit } from '@/utilities/battle/item-use-limits'
import type {
  BattlePokemon,
  BattleInventoryItem,
} from '@/utilities/battle/types'
import {
  getDoublesPokemon,
  getDoublesSlots,
  type DoublesAction,
  type DoublesTarget,
} from '@/utilities/battle/doubles-state'
import { isDoublesCommanderInactive } from '@/utilities/battle/doubles-abilities'
import { getBattleInventory, getBattlePowers } from '../actions'
import type { BattlePowersData } from '../powers/powers-data'
import { useBattleContext } from './battle-context'
import { StanceSelector } from './stance-selector'

type Slot = 0 | 1
type Draft = Partial<Record<Slot, DoublesAction>>
type Panel = 'moves' | 'items' | 'switch' | 'powers' | null

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

function defaultTarget(
  enemy: BattlePokemon | undefined,
  other: BattlePokemon | undefined,
): DoublesTarget {
  return {
    side: 'opponent',
    slot:
      enemy?.currentHp && !isDoublesCommanderInactive(enemy)
        ? 0
        : other?.currentHp && !isDoublesCommanderInactive(other)
          ? 1
          : 0,
  }
}

function moveTarget(
  slot: Slot,
  moveId: string,
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
  return fallback
}

function TargetPicker({
  action,
  onChange,
  enemy,
  ally,
  disabled,
}: {
  action: DoublesAction
  onChange: (target: DoublesTarget) => void
  enemy: [BattlePokemon | undefined, BattlePokemon | undefined]
  ally?: BattlePokemon
  disabled: boolean
}) {
  if (action.kind !== 'basic' && action.kind !== 'move') return null
  const move = action.kind === 'move' ? getMove(action.moveId) : undefined
  const pattern =
    move?.doublesTarget ?? (move?.target === 'self' ? 'self' : 'opponent')
  if (
    ['self', 'both-opponents', 'both-allies', 'all-active'].includes(pattern)
  ) {
    return (
      <p className="text-xs text-game-muted">
        {pattern === 'self'
          ? 'Targets itself'
          : pattern === 'both-opponents'
            ? 'Hits both opponents'
            : pattern === 'both-allies'
              ? 'Affects both allies'
              : 'Hits every other active Pokemon'}
      </p>
    )
  }
  const opponents = enemy
    .map((mon, slot) =>
      mon?.currentHp && !isDoublesCommanderInactive(mon)
        ? { side: 'opponent' as const, slot: slot as Slot, label: mon.name }
        : null,
    )
    .filter(
      (value): value is { side: 'opponent'; slot: Slot; label: string } =>
        !!value,
    )
  const allies =
    ally?.currentHp && !isDoublesCommanderInactive(ally)
      ? [
          {
            side: 'ally' as const,
            slot: (action.slot === 0 ? 1 : 0) as Slot,
            label: ally.name,
          },
        ]
      : []
  const candidates =
    pattern === 'ally'
      ? allies
      : pattern === 'any-single'
        ? [...opponents, ...allies]
        : opponents
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-game-muted">Target</span>
      {candidates.map((candidate) => (
        <Button
          key={`${candidate.side}:${candidate.slot}`}
          type="button"
          size="sm"
          variant="outline"
          className={cn(
            'h-10 rounded-lg border-game-border bg-game-surface-raised px-3 text-xs',
            action.target?.side === candidate.side &&
              action.target?.slot === candidate.slot &&
              'border-game-moss bg-game-moss/15 text-game-moss-strong hover:border-game-moss hover:bg-game-moss/15 hover:text-game-moss-strong',
          )}
          disabled={disabled}
          aria-pressed={
            action.target?.side === candidate.side &&
            action.target?.slot === candidate.slot
          }
          onClick={() =>
            onChange({ side: candidate.side, slot: candidate.slot })
          }
        >
          {candidate.label}
        </Button>
      ))}
    </div>
  )
}

function actionLabel(action: DoublesAction | undefined, team: BattlePokemon[]) {
  if (!action) return 'Choose an action'
  if (action.kind === 'basic')
    return `${action.stance[0].toUpperCase()}${action.stance.slice(1)} Attack`
  if (action.kind === 'move')
    return getMove(action.moveId)?.name ?? action.moveId
  if (action.kind === 'switch')
    return `Switch to ${team[action.pokemonIndex]?.name ?? 'Pokemon'}`
  if (action.kind === 'item') return 'Use item'
  return action.powerId === 'z-move'
    ? 'Z-Move'
    : action.powerId === 'mega'
      ? 'Mega Evolve'
      : action.powerId === 'tera'
        ? 'Terastallize'
        : 'Dynamax'
}

export function DoubleActionMenu() {
  const {
    battleState,
    isAnimating,
    isWaitingForServer,
    pendingBattleAction,
    handleDoublesSubmit,
    handleDoublesReplace,
    selectedDoublesSlot: selectedSlot,
    setSelectedDoublesSlot: setSelectedSlot,
  } = useBattleContext()
  const [draft, setDraft] = useState<Draft>({})
  const [typeBySlot, setTypeBySlot] = useState<Partial<Record<Slot, string>>>(
    {},
  )
  const [panel, setPanel] = useState<Panel>(null)
  const [items, setItems] = useState<BattleInventoryItem[]>([])
  const [powerData, setPowerData] = useState<
    Partial<Record<Slot, BattlePowersData>>
  >({})
  const disabled =
    isAnimating || isWaitingForServer || battleState.status !== 'ongoing'
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
  const enemies: [BattlePokemon | undefined, BattlePokemon | undefined] = [
    getDoublesPokemon(battleState, 'enemy', 0),
    getDoublesPokemon(battleState, 'enemy', 1),
  ]
  const ally = getDoublesPokemon(
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
        !!move && !move.charged && !move.recharge && !move.continuous,
    )
  const complete = useMemo(
    () => active.every((slot) => !!draft[slot]),
    [active, draft],
  )
  const maxItems = getBattleItemUseLimit(battleState, 'player')
  const remainingItems = Math.max(
    0,
    maxItems - (battleState.itemsUsedThisBattle?.length ?? 0),
  )

  useEffect(() => {
    setDraft({})
    setTypeBySlot({})
    setPanel(null)
    setSelectedSlot(active[0] ?? 0)
  }, [
    battleState.turn,
    battleState.activePlayerSlots?.[0],
    battleState.activePlayerSlots?.[1],
    active[0],
    setSelectedSlot,
  ])

  useEffect(() => {
    if (battleState.isPvp) return
    let cancelled = false
    getBattleInventory().then((result) => {
      if (!cancelled && result.success) setItems(result.items)
    })
    return () => {
      cancelled = true
    }
  }, [battleState.turn, battleState.isPvp])

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

  const choose = (next: DoublesAction) => {
    setDraft((current) => ({ ...current, [selectedSlot]: next }))
    setPanel(null)
  }
  const submit = () => {
    const actions = active
      .map((slot) => draft[slot])
      .filter((value): value is DoublesAction => !!value)
    if (actions.length === active.length) void handleDoublesSubmit(actions)
  }
  const changeType = (type: string) => {
    setTypeBySlot((current) => ({ ...current, [selectedSlot]: type }))
    if (action?.kind === 'basic') choose({ ...action, attackType: type })
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
                      target: defaultTarget(...enemies),
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

                {action && (
                  <div className="mt-2">
                    <p className="mb-1 text-xs font-semibold text-game-moss-strong">
                      {actionLabel(action, battleState.playerTeam)}
                    </p>
                    {action.kind === 'basic' || action.kind === 'move' ? (
                      <TargetPicker
                        action={action}
                        enemy={enemies}
                        ally={ally}
                        disabled={disabled}
                        onChange={(target) => choose({ ...action, target })}
                      />
                    ) : action.kind === 'item' ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-game-muted">
                          Item target
                        </span>
                        {battleState.playerTeam
                          .map((mon, index) => ({ mon, index }))
                          .filter(({ mon }) => {
                            const item = items.find(
                              (candidate) => candidate.itemId === action.itemId,
                            )
                            return item?.battleEffect.type === 'revive'
                              ? mon.currentHp <= 0
                              : mon.currentHp > 0
                          })
                          .map(({ mon, index }) => (
                            <Button
                              key={index}
                              type="button"
                              size="sm"
                              variant="outline"
                              className={cn(
                                'h-10 rounded-lg border-game-border bg-game-surface-raised px-3 text-xs',
                                (action.targetPokemonIndex ??
                                  usedIndexes[selectedSlot]) === index &&
                                  'border-game-moss bg-game-moss/10 text-game-moss-strong',
                              )}
                              disabled={disabled}
                              aria-pressed={
                                (action.targetPokemonIndex ??
                                  usedIndexes[selectedSlot]) === index
                              }
                              onClick={() =>
                                choose({ ...action, targetPokemonIndex: index })
                              }
                            >
                              {mon.name}
                            </Button>
                          ))}
                      </div>
                    ) : null}
                  </div>
                )}

                <div className="mt-3 flex w-full max-w-md gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 flex-1 gap-2 rounded-xl border-game-border bg-game-surface-raised text-game-ink shadow-sm"
                    aria-label={`Items, ${remainingItems} of ${maxItems} uses remaining`}
                    disabled={
                      disabled ||
                      battleState.isPvp ||
                      remainingItems <= 0 ||
                      items.length === 0
                    }
                    onClick={() => setPanel('items')}
                  >
                    <ItemSprite
                      itemId="battle-potion"
                      alt=""
                      width={22}
                      height={22}
                      className="h-5 w-5 object-contain"
                    />
                    <span className="rounded-full border border-game-border bg-game-canvas/60 px-1.5 py-0.5 text-[10px] font-black">
                      {remainingItems}/{maxItems}
                    </span>
                  </Button>
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
            {(action || (active.length > 1 && selectedSlot !== active[0])) && (
              <div className="mt-3 flex justify-end gap-2">
                {active.length > 1 && selectedSlot !== active[0] && (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 flex-1 rounded-xl border-game-border bg-game-surface-raised text-game-ink sm:flex-none"
                    disabled={disabled}
                    onClick={() => setSelectedSlot(active[0])}
                  >
                    Previous Pokemon
                  </Button>
                )}
                {active.length > 1 && selectedSlot === active[0] && action && (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 flex-1 rounded-xl border-game-moss bg-game-moss/10 text-game-moss-strong sm:flex-none"
                    disabled={disabled}
                    onClick={() => setSelectedSlot(active[1])}
                  >
                    Next Pokemon
                  </Button>
                )}
                {complete && (
                  <Button
                    type="button"
                    className="game-accent-button h-11 flex-1 sm:min-w-36 sm:flex-none"
                    disabled={disabled || active.length === 0}
                    onClick={submit}
                  >
                    Confirm turn
                  </Button>
                )}
              </div>
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
        <DrawerContent className="max-h-[72dvh] border-game-border bg-game-surface-raised">
          <DrawerHeader className="pb-2">
            <DrawerTitle>
              {panel === 'moves'
                ? `Moves · ${actor?.name ?? ''}`
                : panel === 'items'
                  ? 'Battle items'
                  : panel === 'switch'
                    ? 'Switch Pokemon'
                    : 'Battle powers'}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-6">
            {panel === 'moves' &&
              moves.map((move) => (
                <Button
                  key={move.id}
                  type="button"
                  variant="outline"
                  className="mb-2 h-auto min-h-12 w-full justify-between gap-3 rounded-lg border-game-border bg-game-canvas px-3 py-2 text-left"
                  disabled={disabled || (actor?.moveUsesRemaining ?? 0) <= 0}
                  onClick={() =>
                    choose({
                      slot: selectedSlot,
                      kind: 'move',
                      moveId: move.id,
                      target: moveTarget(
                        selectedSlot,
                        move.id,
                        defaultTarget(...enemies),
                      ),
                    })
                  }
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      {move.name}
                    </span>
                    <span className="block text-xs font-normal text-game-muted">
                      {move.description}
                    </span>
                  </span>
                  <span className="shrink-0 text-[10px] font-semibold text-game-moss-strong">
                    Move
                  </span>
                </Button>
              ))}
            {panel === 'items' &&
              items
                .filter(
                  (item) =>
                    item.battleEffect.type !== 'revive' ||
                    battleState.playerTeam.some((mon) => mon.currentHp <= 0),
                )
                .map((item) => (
                  <Button
                    key={item.itemId}
                    type="button"
                    variant="outline"
                    className="mb-2 h-12 w-full justify-start gap-3 rounded-lg border-game-border bg-game-canvas px-3 text-left"
                    disabled={disabled}
                    onClick={() =>
                      choose({
                        slot: selectedSlot,
                        kind: 'item',
                        itemId: item.itemId,
                        targetPokemonIndex:
                          item.battleEffect.type === 'revive'
                            ? battleState.playerTeam.findIndex(
                                (mon) => mon.currentHp <= 0,
                              )
                            : undefined,
                      })
                    }
                  >
                    <ItemSprite
                      itemId={item.itemId}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </Button>
                ))}
            {panel === 'switch' &&
              reserves.map(({ mon, index }) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  className="mb-2 h-12 w-full justify-between gap-3 rounded-lg border-game-border bg-game-canvas px-3 text-left"
                  disabled={disabled}
                  onClick={() =>
                    choose({
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
                  onClick={() => choose(option.command)}
                >
                  {option.label}
                </Button>
              ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
