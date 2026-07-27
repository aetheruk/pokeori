'use client'

import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Swords } from 'lucide-react'
import { toast } from 'sonner'
import { BattleLog } from '@/app/(frontend)/game/battles/_components/battle-log'
import { BattleScene } from '@/app/(frontend)/game/battles/_components/battle-scene'
import {
  advanceBattleBetsBattle,
  cashOutBattleBets,
  placeBattleBet,
  rollOverBattleBets,
  startBattleBets,
} from '@/app/(frontend)/game/games/battle-bets-actions'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { VSAnimation } from '@/components/game/battles/VSAnimation'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import type { GameItem } from '@/data/games'
import type {
  BattleBetsPublicState,
  BattleBetsSide,
  BattleBetsTeamPreview,
} from '@/utilities/battle-bets'
import { useBattleManager } from '@/utilities/battle/engine/useBattleManager'
import type { BattleState } from '@/utilities/battle/types'

function newActionId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function battleFingerprint(state: BattleState): string {
  const playerHp = state.playerTeam
    .map((pokemon) => pokemon.currentHp)
    .join(',')
  const enemyHp = state.enemyTeam.map((pokemon) => pokemon.currentHp).join(',')
  const latest = state.history[0]

  return [
    state.turn,
    state.status,
    state.activePlayerIndex,
    state.activeEnemyIndex,
    playerHp,
    enemyHp,
    latest?.turn ?? 0,
    latest?.message ?? '',
  ].join('|')
}

export function BattleBetsGame({
  initialState,
}: {
  encounter: GameItem
  initialState?: BattleBetsPublicState
}) {
  const router = useRouter()
  const [state, setState] = useState(initialState)
  const [busy, setBusy] = useState(false)

  const begin = async (forceReset = false) => {
    setBusy(true)
    const result = await startBattleBets(forceReset)
    setBusy(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    setState(result.state)
  }

  const bet = async (side: BattleBetsSide) => {
    setBusy(true)
    const result = await placeBattleBet(side, newActionId())
    setBusy(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    setState(result.state)
  }

  const cashOut = async () => {
    setBusy(true)
    const result = await cashOutBattleBets(newActionId())
    setBusy(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    toast.success(`${result.payout} Fun Tokens added to your balance.`)
    setState(undefined)
    router.refresh()
  }

  const rollOver = async () => {
    setBusy(true)
    const result = await rollOverBattleBets(newActionId())
    setBusy(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    setState(result.state)
  }

  if (!state) {
    return (
      <main className="game-night flex h-full min-h-0 items-center justify-center overflow-y-auto p-3 text-game-night-ink sm:p-5">
        <section className="game-activity-panel w-full max-w-lg overflow-hidden">
          <div className="relative flex min-h-28 items-end border-b border-game-border/40 p-4">
            <Image
              src="/backgrounds/game-corner.avif"
              alt=""
              fill
              priority
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-game-night-surface/95 via-game-night-surface/75 to-transparent" />
            <div className="relative">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-game-ochre">
                High Stakes Room
              </p>
              <h1 className="font-serif text-2xl">Battle Bets</h1>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm leading-relaxed text-game-night-ink/75">
              Inspect two Shadow teams, back one Rocket Grunt, then watch both
              trainers battle. Win to cash out or roll the entire pot onward.
            </p>
            <Button
              className="game-accent-button mt-4 min-h-11 w-full"
              disabled={busy}
              onClick={() => void begin()}
            >
              {busy ? 'Preparing matchup…' : 'Open the book'}
            </Button>
          </div>
        </section>
      </main>
    )
  }

  if (state.phase !== 'inspect' && state.battle) {
    return (
      <BattleBetsBattle
        state={state}
        busy={busy}
        onStateChange={setState}
        onCashOut={cashOut}
        onRollOver={rollOver}
        onRestart={() => begin(true)}
      />
    )
  }

  return (
    <main className="game-night h-full min-h-0 overflow-y-auto p-3 text-game-night-ink sm:p-5">
      <div className="mx-auto max-w-4xl">
        <CompactHeader pot={state.pot} />
        <p className="mb-3 text-center text-sm text-game-night-ink/65">
          Choose a side. Your full pot rides on the result.
        </p>
        <div className="grid gap-3 lg:grid-cols-2">
          <TeamCard
            side="female"
            team={state.femaleTeam}
            chance={state.femaleChance}
            projectedPayout={state.projectedFemalePayout}
            disabled={busy}
            onBet={bet}
          />
          <TeamCard
            side="male"
            team={state.maleTeam}
            chance={state.maleChance}
            projectedPayout={state.projectedMalePayout}
            disabled={busy}
            onBet={bet}
          />
        </div>
      </div>
    </main>
  )
}

function CompactHeader({ pot }: { pot: number }) {
  return (
    <header className="mb-3 flex min-h-12 items-center justify-between gap-3 rounded-xl border border-game-border/45 bg-game-night-surface px-3 py-2 shadow-sm">
      <div className="flex min-w-0 items-center gap-2">
        <Swords className="h-5 w-5 shrink-0 text-game-ochre" />
        <div className="min-w-0">
          <p className="truncate font-serif text-lg leading-none">
            Battle Bets
          </p>
          <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-game-night-ink/55">
            High Stakes Room
          </p>
        </div>
      </div>
      <div className="shrink-0 rounded-full border border-game-ochre/35 bg-game-night-canvas px-3 py-1">
        <span className="font-mono text-sm font-semibold text-game-ochre">
          {pot}
        </span>
        <span className="ml-1 text-[0.65rem] text-game-night-ink/60">
          tokens
        </span>
      </div>
    </header>
  )
}

function TeamCard({
  side,
  team,
  chance,
  projectedPayout,
  disabled,
  onBet,
}: {
  side: BattleBetsSide
  team: BattleBetsTeamPreview
  chance: number
  projectedPayout: number
  disabled: boolean
  onBet: (side: BattleBetsSide) => Promise<void>
}) {
  return (
    <section className="game-activity-panel p-3">
      <div className="flex items-center gap-2.5">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-game-ochre/35 bg-game-night-canvas">
          <Image
            src={`/sprites/trainers/${team.trainerSpriteId}.avif`}
            alt={team.trainerName}
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
        <h2 className="min-w-0 flex-1 truncate font-serif text-lg">
          {team.trainerName}
        </h2>
        <div className="text-right">
          <p className="font-mono text-lg font-semibold leading-none text-game-ochre">
            {Math.round(chance * 100)}%
          </p>
          <p className="mt-1 text-[0.55rem] uppercase tracking-wider text-game-night-ink/50">
            chance
          </p>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {team.pokemon.map((pokemon, index) => (
          <article
            key={`${pokemon.formId}-${index}`}
            className="flex min-w-0 items-center gap-1 rounded-lg border border-game-border/35 bg-game-night-surface px-1.5 py-1"
          >
            <PokemonRaritySprite
              formId={pokemon.formId}
              view="front"
              isShadow
              alt=""
              className="h-9 w-9 shrink-0"
              sizes="36px"
            />
            <div className="min-w-0">
              <p className="truncate text-[0.68rem] font-semibold">
                {pokemon.name}
              </p>
              <p className="text-[0.6rem] text-game-night-ink/55">
                Lv. {pokemon.level}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <p className="min-w-0 flex-1 text-xs text-game-night-ink/60">
          Return{' '}
          <span className="font-mono font-semibold text-game-ochre">
            {projectedPayout}
          </span>
        </p>
        <Button
          className="game-accent-button min-h-10 min-w-32"
          disabled={disabled}
          onClick={() => void onBet(side)}
        >
          Back this team
        </Button>
      </div>
    </section>
  )
}

function BattleBetsBattle({
  state,
  busy,
  onStateChange,
  onCashOut,
  onRollOver,
  onRestart,
}: {
  state: BattleBetsPublicState
  busy: boolean
  onStateChange: (state: BattleBetsPublicState) => void
  onCashOut: () => Promise<void>
  onRollOver: () => Promise<void>
  onRestart: () => Promise<void>
}) {
  const initialBattle = useRef(state.battle as BattleState)
  const { battleState, anim, isProcessing, pushTurnResult } = useBattleManager(
    initialBattle.current,
  )
  const { playMusic, stopMusic } = useAudio()
  const [showVsAnimation, setShowVsAnimation] = useState(
    state.phase === 'battle' && initialBattle.current.turn === 1,
  )
  const [advancing, setAdvancing] = useState(false)
  const [turnError, setTurnError] = useState<string>()
  const lastRequestedFingerprint = useRef<string | undefined>(undefined)
  const serverBattle = state.battle as BattleState
  const serverFingerprint = useMemo(
    () => battleFingerprint(serverBattle),
    [serverBattle],
  )
  const visualFingerprint = useMemo(
    () => battleFingerprint(battleState),
    [battleState],
  )
  const isVisuallySettled =
    serverFingerprint === visualFingerprint && !isProcessing

  useEffect(() => {
    playMusic(serverBattle.config?.music || '/music/battle.mp3', {
      loop: true,
      volume: 0.3,
    })
    return () => stopMusic({ delayMs: 500 })
  }, [playMusic, serverBattle.battleId, serverBattle.config?.music, stopMusic])

  useEffect(() => {
    if (serverFingerprint === visualFingerprint || isProcessing) return
    pushTurnResult({ success: true, state: serverBattle })
  }, [
    isProcessing,
    pushTurnResult,
    serverBattle,
    serverFingerprint,
    visualFingerprint,
  ])

  const advance = useCallback(async () => {
    if (
      state.phase !== 'battle' ||
      advancing ||
      isProcessing ||
      showVsAnimation ||
      serverFingerprint !== visualFingerprint
    ) {
      return
    }
    if (lastRequestedFingerprint.current === serverFingerprint) return

    lastRequestedFingerprint.current = serverFingerprint
    setAdvancing(true)
    setTurnError(undefined)
    const result = await advanceBattleBetsBattle(newActionId())
    setAdvancing(false)
    if (!result.success) {
      setTurnError(result.error)
      toast.error(result.error)
      return
    }
    onStateChange(result.state)
  }, [
    advancing,
    isProcessing,
    onStateChange,
    serverFingerprint,
    showVsAnimation,
    state.phase,
    visualFingerprint,
  ])

  useEffect(() => {
    void advance()
  }, [advance])

  useEffect(() => {
    if (state.phase === 'result' && isVisuallySettled) {
      stopMusic({ fade: true })
    }
  }, [isVisuallySettled, state.phase, stopMusic])

  const retryTurn = () => {
    lastRequestedFingerprint.current = undefined
    setTurnError(undefined)
    void advance()
  }
  const won =
    state.phase === 'result' &&
    state.winner !== undefined &&
    state.winner === state.selectedSide

  return (
    <main className="game-night h-full min-h-0 text-game-night-ink">
      <div className="game-desktop-activity-stage game-activity-chrome relative flex h-full min-h-0 flex-col overflow-hidden xl:my-4 xl:h-[calc(100%-2rem)] xl:grid xl:grid-cols-[minmax(0,1fr)_19rem] xl:grid-rows-[minmax(26rem,1fr)_auto]">
        <AnimatePresence>
          {showVsAnimation &&
            serverBattle.playerTrainer &&
            serverBattle.enemyTrainer && (
              <VSAnimation
                player={serverBattle.playerTrainer}
                enemy={serverBattle.enemyTrainer}
                onComplete={() => setShowVsAnimation(false)}
              />
            )}
        </AnimatePresence>

        <BattleScene battleState={battleState} anim={anim} />

        <div className="flex min-h-12 items-center justify-between gap-2 border-t border-game-border bg-game-night-surface px-3 py-1.5 xl:col-start-1 xl:row-start-2">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">
              {state.selectedSide === 'female'
                ? 'Backing Rocket Grunt F'
                : 'Backing Rocket Grunt M'}
            </p>
            <p className="text-[0.62rem] text-game-night-ink/55">
              {advancing || isProcessing ? 'Battle in progress…' : 'AI battle'}
            </p>
          </div>
          <div className="shrink-0 rounded-full border border-game-ochre/35 bg-game-night-canvas px-2.5 py-1 font-mono text-xs text-game-ochre">
            Pot {state.pot}
          </div>
          {turnError && (
            <Button
              size="sm"
              variant="outline"
              className="min-h-10 shrink-0"
              onClick={retryTurn}
            >
              Retry turn
            </Button>
          )}
        </div>

        <div className="relative min-h-0 flex-[24] border-t border-game-border bg-game-surface-raised xl:col-start-2 xl:row-start-1 xl:row-span-2 xl:border-l xl:border-t-0">
          <div className="h-full overflow-hidden">
            <BattleLog logs={battleState.history} />
          </div>
        </div>
      </div>

      {state.phase === 'result' && isVisuallySettled && (
        <Settlement
          won={won}
          state={state}
          busy={busy}
          onCashOut={onCashOut}
          onRollOver={onRollOver}
          onRestart={onRestart}
        />
      )}
    </main>
  )
}

function Settlement({
  won,
  state,
  busy,
  onCashOut,
  onRollOver,
  onRestart,
}: {
  won: boolean
  state: BattleBetsPublicState
  busy: boolean
  onCashOut: () => Promise<void>
  onRollOver: () => Promise<void>
  onRestart: () => Promise<void>
}) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-game-night-canvas/96 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-game-night-ink backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center">
        <section
          className="game-activity-panel w-full max-w-sm p-5 text-center"
          aria-live="polite"
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-game-ochre">
            Battle settled
          </p>
          <h1 className="mt-1 font-serif text-2xl">
            {won ? 'Your fighter won' : 'Your pot is lost'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-game-night-ink/70">
            {won
              ? `${state.payout} Fun Tokens are waiting. Take them now or risk the full pot on another matchup.`
              : `${state.winner === 'female' ? 'Rocket Grunt F' : 'Rocket Grunt M'} won the battle.`}
          </p>
          {won ? (
            <div className="mt-5 grid gap-2">
              <Button
                className="game-accent-button min-h-12 w-full"
                disabled={busy}
                onClick={() => void onCashOut()}
              >
                Cash out {state.payout}
              </Button>
              <Button
                variant="outline"
                className="min-h-12 w-full"
                disabled={busy}
                onClick={() => void onRollOver()}
              >
                Roll over the full pot
              </Button>
            </div>
          ) : (
            <Button
              className="game-accent-button mt-5 min-h-12 w-full"
              disabled={busy}
              onClick={() => void onRestart()}
            >
              Start another book
            </Button>
          )}
        </section>
      </div>
    </div>
  )
}
