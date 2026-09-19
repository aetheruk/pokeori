import { MdCatchingPokemon } from 'react-icons/md'
import { ArrowDown } from 'lucide-react'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import type { DoublesTarget } from '@/utilities/battle/doubles-state'
import type {
  AnimationState,
  DoublesPokemonAnimation,
} from '@/utilities/battle/engine/types'
import {
  getDoublesPokemon,
  getDoublesSlots,
} from '@/utilities/battle/doubles-state'
import { isDoublesCommanderInactive } from '@/utilities/battle/doubles-abilities'
import { HealthDisplay } from './health-display'
import { PokemonDisplay } from './pokemon-display'
import { TeamBallGrid } from './battle-header'

type Side = 'player' | 'enemy'
type Slot = 0 | 1

function eligibleSpriteTargets(
  state: BattleState,
  selectedSlot: Slot,
): DoublesTarget[] {
  const opponents = ([0, 1] as const)
    .filter((slot) => {
      const mon = getDoublesPokemon(state, 'enemy', slot)
      return mon && mon.currentHp > 0 && !isDoublesCommanderInactive(mon)
    })
    .map((slot): DoublesTarget => ({ side: 'opponent', slot }))
  const partnerSlot = selectedSlot === 0 ? 1 : 0
  const partner = getDoublesPokemon(state, 'player', partnerSlot)
  const allies: DoublesTarget[] =
    partner && partner.currentHp > 0 && !isDoublesCommanderInactive(partner)
      ? [{ side: 'ally', slot: partnerSlot }]
      : []
  return [...opponents, ...allies]
}

function LaneHealth({
  mon,
  side,
  slot,
}: {
  mon?: BattlePokemon
  side: Side
  slot: Slot
}) {
  const isPlayer = side === 'player'

  return (
    <fieldset
      className="min-w-0 min-h-[2.75rem]"
      data-testid={`doubles-health-${side}-${slot}`}
      aria-label={`${isPlayer ? 'Your' : 'Opponent'} Pokemon ${slot + 1} health`}
    >
      {mon && isDoublesCommanderInactive(mon) && (
        <span className="mb-0.5 block text-[10px] font-bold text-game-ochre">
          Joined ally
        </span>
      )}
      {mon ? (
        <HealthDisplay
          currentHp={mon.currentHp}
          maxHp={mon.maxHp}
          name={mon.battleAbilityState?.illusionMask?.name || mon.name}
          level={mon.level}
          gender={mon.gender}
          isPlayer={isPlayer}
          align={isPlayer ? 'left' : 'right'}
          status={mon.status}
          preferredStance={isPlayer ? undefined : mon.observedPreferredStance}
          compact
        />
      ) : null}
    </fieldset>
  )
}

function LaneSprite({
  mon,
  side,
  slot,
  isSelected = false,
  isActorSelectable = false,
  onSelectActor,
  isTargetable = false,
  isTargetSelected = false,
  onSelectTarget,
  targetDisabled = false,
  effect,
}: {
  mon?: BattlePokemon
  side: Side
  slot: Slot
  isSelected?: boolean
  isActorSelectable?: boolean
  onSelectActor?: () => void
  isTargetable?: boolean
  isTargetSelected?: boolean
  onSelectTarget?: () => void
  targetDisabled?: boolean
  effect?: DoublesPokemonAnimation
}) {
  if (!mon || (mon.currentHp <= 0 && !effect?.holdFaintedSprite)) return null
  const isPlayer = side === 'player'

  const content = (
    <>
      {isSelected && (
        <span
          data-testid="selected-doubles-arrow"
          className="absolute -top-2 left-1/2 z-20 -translate-x-1/2"
          aria-hidden
        >
          <ArrowDown className="h-7 w-7 animate-bounce fill-game-ochre text-game-night-surface drop-shadow-sm motion-reduce:animate-none" />
        </span>
      )}
      {isTargetSelected && (
        <span
          data-testid="selected-doubles-target-arrow"
          className="absolute -top-2 left-1/2 z-20 -translate-x-1/2"
          aria-hidden
        >
          <ArrowDown
            strokeWidth={3}
            className="h-7 w-7 animate-bounce text-game-danger drop-shadow-[0_1px_2px_rgb(255_248_232_/_0.9)] motion-reduce:animate-none"
          />
        </span>
      )}
      <div
        data-testid={`doubles-ground-shadow-${side}-${slot}`}
        className={`absolute h-5 w-20 rounded-[50%] border border-white/5 bg-black/30 blur-[2px] sm:h-6 sm:w-28 ${
          isPlayer ? 'bottom-3 sm:bottom-4' : 'bottom-5 sm:bottom-7'
        }`}
        aria-hidden
      />
      <PokemonDisplay
        key={mon.id}
        formId={mon.battleAbilityState?.illusionMask?.formId || mon.formId}
        isPlayer={isPlayer}
        isAttacking={effect?.attacking}
        isHit={effect?.hit}
        isBoosting={effect?.boosting}
        isStanceWinner={effect?.stanceWinner}
        isFainting={effect?.fainting}
        isSwitchingOut={effect?.switchingOut}
        isSwitchingIn={effect?.switchingIn}
        backSprite={isPlayer}
        usePixelSprite={!isPlayer}
        isDynamaxed={mon.isDynamaxed}
        hasTeraEffect={!!mon.teraTypeOverride}
        hasZPowerEffect={!!mon.zMoveReady}
        teraType={mon.teraTypeOverride}
        status={mon.status}
        isShadow={mon.isShadow}
        isRadiant={mon.isRadiant}
        shiny={!!mon.shiny}
        rarity={mon.rarity}
        gender={mon.gender}
        damageSplat={effect?.damageSplat}
        statusDamageSplat={effect?.statusDamageSplat}
        attackEffectType={effect?.impactType}
        className="h-24 w-24 sm:h-32 sm:w-32"
      />
      <span className="sr-only">
        {isPlayer ? 'Your' : 'Opponent'} lane {slot + 1}: {mon.name}
      </span>
    </>
  )
  const wrapperClass =
    'relative flex h-24 w-20 shrink-0 items-end justify-center sm:h-32 sm:w-28'
  if (isTargetable && onSelectTarget) {
    return (
      <button
        type="button"
        data-testid={`doubles-sprite-${side}-${slot}`}
        className={`${wrapperClass} pointer-events-auto rounded-lg bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-game-danger`}
        aria-label={`Target ${mon.battleAbilityState?.illusionMask?.name || mon.name}`}
        aria-pressed={isTargetSelected}
        disabled={targetDisabled}
        onClick={onSelectTarget}
      >
        {content}
      </button>
    )
  }
  if (isActorSelectable && onSelectActor) {
    return (
      <button
        type="button"
        data-testid={`doubles-sprite-${side}-${slot}`}
        className={`${wrapperClass} pointer-events-auto rounded-lg bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-game-ochre`}
        aria-label={`Choose ${mon.name} to act next`}
        aria-pressed={isSelected}
        disabled={targetDisabled}
        onClick={onSelectActor}
      >
        <span
          data-testid={`doubles-actor-${side}-${slot}`}
          className="contents"
        >
          {content}
        </span>
      </button>
    )
  }
  return (
    <div
      data-testid={`doubles-sprite-${side}-${slot}`}
      className={wrapperClass}
    >
      {content}
    </div>
  )
}

export function DoubleBattleScene({
  state,
  anim,
  isWaitingForOpponent,
  selectedSlot = 0,
  selectedTarget,
  onChooseTarget,
  selectablePlayerSlots,
  onChooseActor,
  disableTargetSelection = false,
}: {
  state: BattleState
  anim?: AnimationState
  isWaitingForOpponent: boolean
  selectedSlot?: Slot
  selectedTarget?: DoublesTarget
  onChooseTarget?: (target: DoublesTarget) => void
  selectablePlayerSlots?: Slot[]
  onChooseActor?: (slot: Slot) => void
  disableTargetSelection?: boolean
}) {
  const targetOptions = eligibleSpriteTargets(state, selectedSlot)
  const targetProps = (side: Side, slot: Slot) => {
    const target: DoublesTarget = {
      side: side === 'enemy' ? 'opponent' : 'ally',
      slot,
    }
    const isActorSelectable =
      side === 'player' &&
      selectablePlayerSlots?.includes(slot) === true &&
      !disableTargetSelection &&
      !isWaitingForOpponent
    const isTargetable =
      !isActorSelectable &&
      targetOptions.some(
      (candidate) => candidate.side === target.side && candidate.slot === slot,
      )
    const isTargetSelected =
      !disableTargetSelection &&
      !isWaitingForOpponent &&
      isTargetable &&
      selectedTarget?.side === target.side &&
      selectedTarget.slot === slot
    return {
      isActorSelectable,
      onSelectActor:
        isActorSelectable && onChooseActor
          ? () => onChooseActor(slot)
          : undefined,
      isTargetable,
      isTargetSelected,
      onSelectTarget:
        isTargetable && onChooseTarget
          ? () => onChooseTarget(target)
          : undefined,
      targetDisabled: disableTargetSelection || isWaitingForOpponent,
    }
  }
  const lane = (side: Side, slot: Slot) => {
    const mon = getDoublesPokemon(state, side, slot)
    const index = getDoublesSlots(state, side)[slot]
    const effect =
      index === null ? undefined : anim?.doublesPokemon[`${side}:${index}`]
    return { mon, effect }
  }

  return (
    <div className="relative flex min-h-[21rem] flex-[36] flex-col items-center justify-center overflow-hidden bg-game-night-surface text-game-night-ink xl:min-h-0">
      <div
        className="absolute inset-x-0 top-0 z-10 h-[env(safe-area-inset-top)] bg-game-night-canvas"
        aria-hidden
      />
      {state.background && (
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url(${state.background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          aria-hidden
        />
      )}

      <div className="pointer-events-none absolute inset-x-3 top-[max(0.75rem,calc(env(safe-area-inset-top)+0.5rem))] z-20 flex items-start justify-between gap-2 sm:inset-x-5">
        <TeamBallGrid team={state.enemyTeam} />
        <div className="grid min-w-0 max-w-[32rem] flex-1 grid-cols-2 gap-2">
          <LaneHealth mon={lane('enemy', 0).mon} side="enemy" slot={0} />
          <LaneHealth mon={lane('enemy', 1).mon} side="enemy" slot={1} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex items-end justify-between gap-2 sm:inset-x-5 sm:bottom-4">
        <div className="grid min-w-0 max-w-[32rem] flex-1 grid-cols-2 gap-2">
          <LaneHealth mon={lane('player', 0).mon} side="player" slot={0} />
          <LaneHealth mon={lane('player', 1).mon} side="player" slot={1} />
        </div>
        <TeamBallGrid team={state.playerTeam} bottomUp />
      </div>

      <div className="pointer-events-none absolute right-[12%] top-[31%] z-10 flex items-end gap-0 sm:right-[14%] sm:top-[32%]">
        <LaneSprite
          mon={lane('enemy', 0).mon}
          effect={lane('enemy', 0).effect}
          side="enemy"
          slot={0}
          {...targetProps('enemy', 0)}
        />
        <LaneSprite
          mon={lane('enemy', 1).mon}
          effect={lane('enemy', 1).effect}
          side="enemy"
          slot={1}
          {...targetProps('enemy', 1)}
        />
      </div>
      <div className="pointer-events-none absolute bottom-[25%] left-[9%] z-10 flex items-end gap-0 sm:bottom-[24%] sm:left-[13%]">
        <LaneSprite
          mon={lane('player', 0).mon}
          effect={lane('player', 0).effect}
          side="player"
          slot={0}
          isSelected={!disableTargetSelection && !isWaitingForOpponent && selectedSlot === 0}
          {...targetProps('player', 0)}
        />
        <LaneSprite
          mon={lane('player', 1).mon}
          effect={lane('player', 1).effect}
          side="player"
          slot={1}
          isSelected={!disableTargetSelection && !isWaitingForOpponent && selectedSlot === 1}
          {...targetProps('player', 1)}
        />
      </div>

      {isWaitingForOpponent && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-game-night-surface/72 text-center backdrop-blur-sm">
          <MdCatchingPokemon className="mb-3 h-10 w-10 animate-spin text-game-ochre motion-reduce:animate-none" />
          <p className="text-lg font-bold">Waiting for opponent…</p>
          <p className="mt-2 text-sm text-game-night-muted">
            Your two actions are locked in.
          </p>
        </div>
      )}
    </div>
  )
}
