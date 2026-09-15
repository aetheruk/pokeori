import { MdCatchingPokemon } from 'react-icons/md'
import { ArrowDown } from 'lucide-react'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
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
      className="min-h-[3.25rem]"
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
      ) : (
        <span className="text-xs text-game-night-muted">Empty lane</span>
      )}
    </fieldset>
  )
}

function LaneSprite({
  mon,
  side,
  slot,
  isSelected = false,
  effect,
}: {
  mon?: BattlePokemon
  side: Side
  slot: Slot
  isSelected?: boolean
  effect?: DoublesPokemonAnimation
}) {
  if (!mon || (mon.currentHp <= 0 && !effect?.holdFaintedSprite)) return null
  const isPlayer = side === 'player'

  return (
    <div className="relative flex h-24 w-24 shrink-0 items-end justify-center sm:h-32 sm:w-32">
      {isSelected && (
        <span
          data-testid="selected-doubles-arrow"
          className="absolute -top-2 left-1/2 z-20 -translate-x-1/2"
          aria-hidden
        >
          <ArrowDown className="h-7 w-7 animate-bounce fill-game-ochre text-game-night-surface drop-shadow-sm motion-reduce:animate-none" />
        </span>
      )}
      <div
        className="absolute bottom-2 h-5 w-20 rounded-[50%] border border-white/5 bg-black/30 blur-[2px] sm:w-28"
        aria-hidden
      />
      <PokemonDisplay
        key={mon.id}
        formId={mon.battleAbilityState?.illusionMask?.formId || mon.formId}
        isPlayer={isPlayer}
        isAttacking={effect?.attacking}
        isHit={effect?.hit}
        isBoosting={effect?.boosting}
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
    </div>
  )
}

export function DoubleBattleScene({
  state,
  anim,
  isWaitingForOpponent,
  selectedSlot = 0,
}: {
  state: BattleState
  anim?: AnimationState
  isWaitingForOpponent: boolean
  selectedSlot?: Slot
}) {
  const lane = (side: Side, slot: Slot) => {
    const mon = getDoublesPokemon(state, side, slot)
    const index = getDoublesSlots(state, side)[slot]
    const effect =
      index === null ? undefined : anim?.doublesPokemon[`${side}:${index}`]
    return { mon, effect }
  }

  return (
    <div className="relative flex min-h-[21rem] flex-[36] flex-col items-center justify-center overflow-hidden bg-game-night-surface text-game-night-ink xl:col-start-1 xl:row-start-1 xl:min-h-0 xl:flex-none">
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
        <div className="flex w-[min(74vw,20rem)] flex-col gap-1">
          <LaneHealth mon={lane('enemy', 0).mon} side="enemy" slot={0} />
          <LaneHealth mon={lane('enemy', 1).mon} side="enemy" slot={1} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 flex items-end justify-between gap-2 sm:inset-x-5 sm:bottom-4">
        <div className="flex w-[min(74vw,20rem)] flex-col gap-1">
          <LaneHealth mon={lane('player', 0).mon} side="player" slot={0} />
          <LaneHealth mon={lane('player', 1).mon} side="player" slot={1} />
        </div>
        <TeamBallGrid team={state.playerTeam} bottomUp />
      </div>

      <div className="pointer-events-none absolute right-[5%] top-[34%] z-10 flex items-end gap-0.5 sm:right-[12%] sm:top-[34%] sm:gap-2">
        <LaneSprite
          mon={lane('enemy', 0).mon}
          effect={lane('enemy', 0).effect}
          side="enemy"
          slot={0}
        />
        <LaneSprite
          mon={lane('enemy', 1).mon}
          effect={lane('enemy', 1).effect}
          side="enemy"
          slot={1}
        />
      </div>
      <div className="pointer-events-none absolute bottom-[34%] left-[5%] z-10 flex items-end gap-0.5 sm:bottom-[30%] sm:left-[12%] sm:gap-2">
        <LaneSprite
          mon={lane('player', 0).mon}
          effect={lane('player', 0).effect}
          side="player"
          slot={0}
          isSelected={selectedSlot === 0}
        />
        <LaneSprite
          mon={lane('player', 1).mon}
          effect={lane('player', 1).effect}
          side="player"
          slot={1}
          isSelected={selectedSlot === 1}
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
