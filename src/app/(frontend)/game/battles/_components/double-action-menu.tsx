'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { Button } from '@/components/ui/button'
import { MoveFieldNote } from '@/components/game/moves'
import { cn } from '@/lib/utils'
import { getMove } from '@/data/moves'
import { getBattleMoveTriggerItemId } from '@/utilities/battle/move-presentation'
import { getBattleItemUseLimit } from '@/utilities/battle/item-use-limits'
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
import { BattleControlRegion, type BattlePanel } from './battle-control-region'
import { getStanceWinCharges, POWER_STANCE_WIN_COST } from '@/utilities/battle/power-charges'
import { BattleActionTrigger } from './battle-action-trigger'
import { ItemSelector } from './item-selector'
import { TeamSwapper } from './team-swapper'
import {
  BattleMovesContent,
  getBattleMovePresentation,
} from './battle-moves-content'

type Slot = 0 | 1

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
    handleSurrender,
    handleUseZMove,
  } = useBattleContext()
  const [typeBySlot, setTypeBySlot] = useState<Partial<Record<Slot, string>>>(
    {},
  )
  const [panel, setPanel] = useState<BattlePanel>(null)
  const [fleeing, setFleeing] = useState(false)
  const [moveInfoId, setMoveInfoId] = useState<string | null>(null)
  const [powerData, setPowerData] = useState<
    Partial<Record<Slot, BattlePowersData>>
  >({})
  const disabled =
    isAnimating ||
    isWaitingForServer ||
    isWaitingForOpponent ||
    battleState.status !== 'ongoing'
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
  const moveTriggerItemId = getBattleMoveTriggerItemId(actor?.types)
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
  const powerOptions: Array<{ label: string; command?: DoublesAction; freeZ?: boolean }> = []
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
    getStanceWinCharges(powers) >= POWER_STANCE_WIN_COST &&
    powers.dynamaxUsesRemaining > 0
  )
    powerOptions.push({
      label: 'Dynamax',
      command: { slot: selectedSlot, kind: 'power', powerId: 'dynamax' },
    })
  if (powers && data?.hasZRing && powers.zMoveUsesRemaining > 0)
    powerOptions.push({
      label: 'Arm Z-Move · next stance 250 power',
      freeZ: true,
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
  if (powers && data?.hasShouts && powers.shoutUsesRemaining > 0)
    powerOptions.push({label:'Battle Shout',command:{slot:selectedSlot,kind:'power',powerId:'shout'}})
  if (powers && data?.hasWeather && powers.weatherUsesRemaining > 0)
    powerOptions.push({label:'Weather Power',command:{slot:selectedSlot,kind:'power',powerId:'weather',target:selectedTarget}})
  if (powers && data?.hasCircadian && powers.circadianUsesRemaining > 0)
    powerOptions.push({label:'Circadian Power',command:{slot:selectedSlot,kind:'power',powerId:'circadian',target:selectedTarget}})
  if (powers && data?.hasVictory && powers.victoryUsesRemaining > 0)
    for (const item of data.victoryPowers)
      powerOptions.push({label:item.name,command:{slot:selectedSlot,kind:'power',powerId:'victory',formId:item.itemId}})
  if (powers && data?.dimensionalShift)
    for (const kind of ['time','space','chaos'] as const)
      if (data.dimensionalShift[kind]) powerOptions.push({label:`Dimensional Shift · ${kind}`,command:{slot:selectedSlot,kind:'power',powerId:'dimensional-shift',formId:kind}})

  const commandUses = panel === 'moves'
    ? `${actor?.moveUsesRemaining ?? 0} left`
    : panel === 'items'
      ? `${Math.max(0, getBattleItemUseLimit(battleState, 'player') - (battleState.itemsUsedThisBattle?.length ?? 0))} left`
      : panel === 'powers'
        ? `${getStanceWinCharges(battleState.powers)}/${POWER_STANCE_WIN_COST} wins`
        : undefined

  return (
    <BattleControlRegion
      state={battleState}
      panel={replacementSlots.length > 0 ? 'switch' : panel}
      onBack={() => { setMoveInfoId(null); setPanel(null) }}
      canGoBack={replacementSlots.length === 0}
      stanceType={selectedType}
      uses={commandUses}
      commands={actor && active.includes(selectedSlot) && replacementSlots.length === 0 ? (
        <div className="game-battle-action-strip w-full">
          <BattleActionTrigger
            icon={<PokemonRaritySprite formId={actor.formId} view="front" rarity={actor.rarity} shiny={actor.shiny} isShadow={actor.isShadow} isRadiant={actor.isRadiant} female={actor.gender === 'female'} alt="" sizes="32px" className="h-8 w-8 object-contain" />}
            label="Stance" data-action="stance" disabled={disabled} onClick={() => setPanel('stance')}
          />
          <BattleActionTrigger itemId={moveTriggerItemId} label="Moves" data-action="moves" disabled={disabled} onClick={() => setPanel('moves')} />
          <BattleActionTrigger itemId="battle-potion" label="Items" data-action="items" disabled={disabled || !!battleState.isPvp} onClick={() => setPanel('items')} />
          <BattleActionTrigger itemId="tera-orb" label="Powers" data-action="powers" disabled={disabled} onClick={() => setPanel('powers')} />
          <BattleActionTrigger itemId="poke-ball" label="Switch" data-action="switch" disabled={disabled || reserves.length === 0} onClick={() => setPanel('switch')} />
          <BattleActionTrigger itemId="escape-rope" label="Flee" data-action="flee" disabled={disabled} onClick={() => setPanel('flee')} />
        </div>
      ) : null}
    >
      {isWaitingForServer && action?.kind !== 'basic' && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-game-surface/85 backdrop-blur-[1px]">
          <Loader2 className="mr-2 h-7 w-7 animate-spin text-game-moss motion-reduce:animate-none" />
          <span className="text-sm font-bold">{pendingBattleAction?.label || 'Resolving actions'}</span>
        </div>
      )}
      {replacementSlots.length > 0 ? (
        <TeamSwapper embedded forced doublesReplacementSlots={replacementSlots} doublesActiveSlots={slots} onDoublesReplace={(slot, pokemonIndex) => handleDoublesReplace(slot, pokemonIndex)} />
      ) : panel === 'stance' && actor ? (
        <StanceSelector
          onSelect={(stance) => commit({
            slot: selectedSlot,
            kind: 'basic',
            stance,
            attackType: selectedType,
            target: selectedTarget.side === 'opponent' ? selectedTarget : getDefaultDoublesTarget(battleState),
          })}
          stats={actor.stats}
          statStages={actor.statStages}
          zMoveReady={!!actor.zMoveReady}
          isDynamaxed={!!actor.isDynamaxed}
          disabledStance={actor.disabledStance?.turnsRemaining ? actor.disabledStance.stance : undefined}
          pendingStance={isWaitingForServer && action?.kind === 'basic' ? action.stance : undefined}
          types={actor.types}
          selectedType={selectedType}
          onTypeSelect={changeType}
          disabled={disabled}
        />
      ) : panel === 'items' ? (
        <ItemSelector embedded onActionComplete={() => setPanel(null)} />
      ) : panel === 'moves' && actor ? (
        moveInfoId && moves.some((move) => move.id === moveInfoId) ? (
          <div className="mx-auto max-w-2xl px-3 py-2">
            <Button type="button" variant="ghost" className="mb-3" onClick={() => setMoveInfoId(null)}>Back to moves</Button>
            <MoveFieldNote presentation={getBattleMovePresentation(moves.find((move) => move.id === moveInfoId)!, actor, battleState, selectedType)} />
          </div>
        ) : (
          <BattleMovesContent
            moves={moves}
            pokemon={actor}
            state={battleState}
            selectedType={selectedType}
            usesRemaining={actor.moveUsesRemaining ?? 0}
            triggerItemId={moveTriggerItemId}
            disabled={disabled}
            onDetails={setMoveInfoId}
            embedded
            onUseMove={(moveId) => commit({
              slot: selectedSlot,
              kind: 'move',
              moveId,
              selectedType,
              target: moveTarget(selectedSlot, moveId, selectedTarget, getDefaultDoublesTarget(battleState)),
            })}
          />
        )
      ) : panel === 'switch' ? (
        <TeamSwapper
          embedded
          doublesReplacementSlots={[selectedSlot]}
          doublesActiveSlots={slots}
          unavailablePokemonIndices={otherDraft?.kind === 'switch' ? [otherDraft.pokemonIndex] : []}
          onDoublesReplace={(_, pokemonIndex) => commit({ slot: selectedSlot, kind: 'switch', pokemonIndex })}
        />
      ) : panel === 'powers' ? (
        <div className="mx-auto max-w-xl space-y-2">
          {getStanceWinCharges(battleState.powers) < POWER_STANCE_WIN_COST && <p className="rounded-lg border border-game-border bg-game-canvas/70 p-3 text-sm text-game-muted">Win {POWER_STANCE_WIN_COST - getStanceWinCharges(battleState.powers)} more stance matchups to use a Power.</p>}
          {powerOptions.map((option) => (
            <Button key={option.label} type="button" variant="outline" className="h-12 w-full justify-start rounded-lg border-game-border bg-game-canvas px-3 text-left text-sm font-semibold" disabled={disabled || getStanceWinCharges(battleState.powers) < POWER_STANCE_WIN_COST} onClick={() => { if (option.freeZ) { void handleUseZMove(selectedSlot); setPanel(null) } else if (option.command) commit(option.command) }}>{option.label}</Button>
          ))}
          {powerOptions.length === 0 && <p className="p-4 text-sm text-game-muted">No assigned power is available for this Pokémon.</p>}
        </div>
      ) : panel === 'flee' ? (
        <div className="mx-auto flex max-w-sm flex-col items-center gap-4 py-8 text-center">
          <p className="text-sm text-game-muted">Leave this battle? This counts as a loss.</p>
          <Button type="button" className="game-accent-button w-full bg-game-clay" disabled={fleeing || disabled} onClick={async () => { setFleeing(true); try { await handleSurrender() } finally { setFleeing(false) } }}>Confirm flee</Button>
        </div>
      ) : null}
    </BattleControlRegion>
  )
}
