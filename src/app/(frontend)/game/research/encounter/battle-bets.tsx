'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { items } from '@/data/items'
import type { GameItem } from '@/data/games'
import type {
  BattleBetsPublicState,
  BattleBetsReplayFrame,
  BattleBetsSide,
  BattleBetsTeamPreview,
} from '@/utilities/battle-bets'
import {
  cashOutBattleBets,
  finishBattleBetsReplay,
  placeBattleBet,
  rollOverBattleBets,
  startBattleBets,
} from '@/app/(frontend)/game/games/battle-bets-actions'

type ReplaySpeed = 'normal' | 'fast'

function newActionId(): string {
  return crypto.randomUUID()
}

function itemName(itemId?: string): string {
  if (!itemId) return 'None'
  return items.find((item) => item.id === itemId)?.name || itemId
}

export function BattleBetsGame({
  initialState,
}: {
  encounter: GameItem
  initialState?: BattleBetsPublicState
}) {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const [state, setState] = useState(initialState)
  const [busy, setBusy] = useState(false)
  const [frameIndex, setFrameIndex] = useState(() =>
    initialState?.phase === 'result'
      ? Math.max(0, (initialState.replay?.length || 1) - 1)
      : 0,
  )
  const [playing, setPlaying] = useState(initialState?.phase === 'replay')
  const [speed, setSpeed] = useState<ReplaySpeed>('normal')
  const settlingRef = useRef(false)
  const replay = state?.replay || []

  const finishReplay = useCallback(async () => {
    if (settlingRef.current) return
    settlingRef.current = true
    const result = await finishBattleBetsReplay(newActionId())
    settlingRef.current = false
    if (!result.success) {
      toast.error(result.error)
      return
    }
    setState(result.state)
  }, [])

  useEffect(() => {
    if (state?.phase !== 'replay' || replay.length === 0) return
    if (reduceMotion) {
      setFrameIndex(replay.length - 1)
      setPlaying(false)
      void finishReplay()
      return
    }
    if (!playing) return
    if (frameIndex >= replay.length - 1) {
      setPlaying(false)
      void finishReplay()
      return
    }

    const timeout = window.setTimeout(
      () =>
        setFrameIndex((current) => Math.min(current + 1, replay.length - 1)),
      speed === 'fast' ? 425 : 1050,
    )
    return () => window.clearTimeout(timeout)
  }, [
    finishReplay,
    frameIndex,
    playing,
    reduceMotion,
    replay.length,
    speed,
    state?.phase,
  ])

  const begin = async (forceReset = false) => {
    setBusy(true)
    const result = await startBattleBets(forceReset)
    setBusy(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    setFrameIndex(0)
    setPlaying(result.state.phase === 'replay')
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
    setFrameIndex(0)
    setPlaying(true)
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
    setFrameIndex(0)
    setPlaying(false)
    setState(result.state)
  }

  if (!state) {
    return (
      <main className="game-night min-h-full p-4 text-game-night-ink sm:p-6">
        <section className="game-activity-panel mx-auto max-w-xl overflow-hidden">
          <div className="relative h-44 border-b border-game-border/40">
            <Image
              src="/backgrounds/celadon-game-corner-prize-wheel.avif"
              alt=""
              fill
              priority
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-game-night-surface via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-game-ochre">
                Celadon High Stakes Room
              </p>
              <h1 className="font-serif text-3xl">Battle Bets</h1>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <p className="leading-relaxed text-game-night-ink/80">
              Put 25 Fun Tokens into the book. Inspect two independently built
              Shadow teams, study the house odds, then back one Rocket Grunt all
              in.
            </p>
            <p className="mt-3 text-sm text-game-night-ink/65">
              A winning pot can be cashed out or rolled into a fresh matchup.
              The book expires after one hour.
            </p>
            <Button
              className="game-accent-button mt-6 w-full"
              disabled={busy}
              onClick={() => void begin()}
            >
              {busy ? 'Preparing matchup…' : 'Open the book — 25 Tokens'}
            </Button>
          </div>
        </section>
      </main>
    )
  }

  const isResult = state.phase === 'result'
  const won =
    isResult &&
    state.winner !== undefined &&
    state.winner === state.selectedSide

  return (
    <main className="game-night min-h-full p-3 text-game-night-ink sm:p-5">
      <div className="mx-auto max-w-6xl">
        <header className="game-activity-panel mb-4 flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-game-ochre">
              Celadon High Stakes Room
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl">Battle Bets</h1>
          </div>
          <div className="rounded-lg border border-game-ochre/50 bg-game-night-surface px-4 py-2 text-right">
            <p className="text-[0.65rem] uppercase tracking-wider text-game-night-ink/65">
              {won ? 'Winning pot' : 'Current pot'}
            </p>
            <p className="font-mono text-lg font-semibold text-game-ochre">
              {won ? state.payout : state.pot} tokens
            </p>
          </div>
        </header>

        {state.phase === 'inspect' ? (
          <Inspection state={state} busy={busy} onBet={bet} />
        ) : (
          <Spectator
            state={state}
            frame={replay[Math.min(frameIndex, replay.length - 1)]}
            frameIndex={frameIndex}
            frameCount={replay.length}
            playing={playing}
            speed={speed}
            onTogglePlaying={() => setPlaying((current) => !current)}
            onToggleSpeed={() =>
              setSpeed((current) => (current === 'normal' ? 'fast' : 'normal'))
            }
          />
        )}

        {isResult && (
          <section
            className="game-activity-panel mt-4 p-5 text-center sm:p-6"
            aria-live="polite"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-game-ochre">
              The book is settled
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl">
              {won ? 'Your side won.' : 'The house takes the pot.'}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-game-night-ink/75">
              {won
                ? `Your all-in wager is now worth ${state.payout} Fun Tokens. Take the money, or carry every token into a new fight.`
                : `${state.winner === 'female' ? 'Rocket Grunt F' : 'Rocket Grunt M'} won the battle. Nothing returns from this book.`}
            </p>
            {won ? (
              <div className="mx-auto mt-5 grid max-w-xl gap-3 sm:grid-cols-2">
                <Button
                  className="game-accent-button"
                  disabled={busy}
                  onClick={() => void cashOut()}
                >
                  Cash out {state.payout}
                </Button>
                <Button
                  variant="outline"
                  disabled={busy}
                  onClick={() => void rollOver()}
                >
                  Roll it all over
                </Button>
              </div>
            ) : (
              <Button
                className="game-accent-button mt-5 w-full max-w-sm"
                disabled={busy}
                onClick={() => void begin(true)}
              >
                Start another book — 25 Tokens
              </Button>
            )}
          </section>
        )}
      </div>
    </main>
  )
}

function Inspection({
  state,
  busy,
  onBet,
}: {
  state: BattleBetsPublicState
  busy: boolean
  onBet: (side: BattleBetsSide) => Promise<void>
}) {
  return (
    <>
      <section className="game-activity-panel mb-4 p-4 text-center">
        <p className="font-serif text-xl">Inspect the teams</p>
        <p className="mt-1 text-sm text-game-night-ink/70">
          The house ran 200 complete battles to price this matchup. Your choice
          commits the entire pot.
        </p>
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        <TeamCard
          side="female"
          team={state.femaleTeam}
          chance={state.femaleChance}
          projectedPayout={state.projectedFemalePayout}
          pot={state.pot}
          disabled={busy}
          onBet={onBet}
        />
        <TeamCard
          side="male"
          team={state.maleTeam}
          chance={state.maleChance}
          projectedPayout={state.projectedMalePayout}
          pot={state.pot}
          disabled={busy}
          onBet={onBet}
        />
      </div>
    </>
  )
}

function TeamCard({
  side,
  team,
  chance,
  projectedPayout,
  pot,
  disabled,
  onBet,
}: {
  side: BattleBetsSide
  team: BattleBetsTeamPreview
  chance: number
  projectedPayout: number
  pot: number
  disabled: boolean
  onBet: (side: BattleBetsSide) => Promise<void>
}) {
  return (
    <section className="game-activity-panel p-4 sm:p-5">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-game-ochre/40 bg-game-night-canvas">
          <Image
            src={`/sprites/trainers/${team.trainerSpriteId}.avif`}
            alt={team.trainerName}
            fill
            sizes="80px"
            className="object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-2xl">{team.trainerName}</h2>
          <p className="text-sm text-game-night-ink/65">
            Advanced AI · 3 Shadow Pokémon
          </p>
          <p className="mt-1 text-xs text-game-night-ink/65">
            Trainer item:{' '}
            <span className="text-game-night-ink">
              {itemName(team.trainerItemId)}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-semibold text-game-ochre">
            {Math.round(chance * 100)}%
          </p>
          <p className="text-[0.65rem] uppercase tracking-wider text-game-night-ink/60">
            win chance
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {team.pokemon.map((pokemon, index) => (
          <article
            key={`${pokemon.formId}-${index}`}
            className="rounded-xl border border-game-border/40 bg-game-night-surface p-3"
          >
            <PokemonRaritySprite
              formId={pokemon.formId}
              view="front"
              isShadow
              alt={`Shadow ${pokemon.name}`}
              className="mx-auto h-24 w-24"
              sizes="96px"
            />
            <p className="mt-1 truncate text-center font-semibold">
              Shadow {pokemon.name}
            </p>
            <p className="text-center text-xs text-game-night-ink/65">
              Lv. {pokemon.level} · {pokemon.types.join(' / ')}
            </p>
            <p className="mt-2 truncate text-center text-xs text-game-night-ink/65">
              Held: {itemName(pokemon.heldItemId)}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between gap-4 rounded-xl border border-game-ochre/25 bg-game-night-canvas p-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-game-night-ink/60">
            All-in return
          </p>
          <p className="font-mono text-xl text-game-ochre">
            {projectedPayout} tokens
          </p>
          <p className="text-xs text-game-night-ink/55">
            {pot} token pot · 5% house edge
          </p>
        </div>
        <Button
          className="game-accent-button min-w-36"
          disabled={disabled}
          onClick={() => void onBet(side)}
        >
          Back {team.trainerName}
        </Button>
      </div>
    </section>
  )
}

function Spectator({
  state,
  frame,
  frameIndex,
  frameCount,
  playing,
  speed,
  onTogglePlaying,
  onToggleSpeed,
}: {
  state: BattleBetsPublicState
  frame?: BattleBetsReplayFrame
  frameIndex: number
  frameCount: number
  playing: boolean
  speed: ReplaySpeed
  onTogglePlaying: () => void
  onToggleSpeed: () => void
}) {
  const messages = useMemo(
    () =>
      (state.replay || [])
        .slice(0, frameIndex + 1)
        .flatMap((entry) => entry.messages)
        .slice(-14),
    [frameIndex, state.replay],
  )
  if (!frame) {
    return (
      <section className="game-activity-panel p-6 text-center">
        The battle record is unavailable.
      </section>
    )
  }

  return (
    <section className="game-activity-panel overflow-hidden">
      <div className="relative min-h-[25rem] overflow-hidden bg-game-night-canvas p-4 sm:p-6">
        <Image
          src="/backgrounds/celadon-game-corner-prize-wheel.avif"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-game-night-canvas/65" />
        <div className="relative grid gap-8 md:grid-cols-2">
          <BattleSide
            label="Rocket Grunt F"
            selected={state.selectedSide === 'female'}
            team={frame.femaleTeam}
            activeIndex={frame.femaleActiveIndex}
            view="back"
          />
          <BattleSide
            label="Rocket Grunt M"
            selected={state.selectedSide === 'male'}
            team={frame.maleTeam}
            activeIndex={frame.maleActiveIndex}
            view="front"
          />
        </div>
      </div>

      <div className="border-t border-game-border/40 bg-game-night-surface p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-game-ochre">
              Spectator feed
            </p>
            <p className="font-mono text-sm text-game-night-ink/65">
              Turn {frame.turn} · {frameIndex + 1} / {frameCount}
            </p>
          </div>
          {state.phase === 'replay' && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onTogglePlaying}
                aria-label={
                  playing ? 'Pause battle replay' : 'Play battle replay'
                }
              >
                {playing ? 'Pause' : 'Play'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onToggleSpeed}
                aria-label={`Use ${speed === 'normal' ? 'fast' : 'normal'} replay speed`}
              >
                {speed === 'normal' ? '1×' : '2×'}
              </Button>
            </div>
          )}
        </div>
        <div
          className="min-h-20 max-h-52 overflow-y-auto rounded-lg border border-game-border/40 bg-game-night-canvas p-3"
          aria-live="polite"
        >
          {messages.map((message, index) => (
            <p
              key={`${frame.turn}-${index}-${message}`}
              className="text-sm leading-relaxed text-game-night-ink/80"
            >
              {message}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

function BattleSide({
  label,
  selected,
  team,
  activeIndex,
  view,
}: {
  label: string
  selected: boolean
  team: BattleBetsReplayFrame['femaleTeam']
  activeIndex: number
  view: 'front' | 'back'
}) {
  const active = team[activeIndex]
  if (!active) return null
  const hpPercent = Math.max(
    0,
    Math.min(100, (active.currentHp / Math.max(1, active.maxHp)) * 100),
  )

  return (
    <div
      className={`rounded-2xl border p-4 backdrop-blur-sm ${
        selected
          ? 'border-game-ochre bg-game-night-surface/85'
          : 'border-game-border/45 bg-game-night-surface/70'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-serif text-xl">{label}</p>
          {selected && (
            <p className="text-xs font-semibold uppercase tracking-wider text-game-ochre">
              Your wager
            </p>
          )}
        </div>
        <div
          className="flex gap-1"
          role="group"
          aria-label={`${label} team status`}
        >
          {team.map((pokemon, index) => (
            <span
              key={`${pokemon.formId}-${index}`}
              className={`h-2.5 w-2.5 rounded-full border ${
                pokemon.fainted
                  ? 'border-game-border/50 bg-transparent'
                  : index === activeIndex
                    ? 'border-game-ochre bg-game-ochre'
                    : 'border-game-night-ink/45 bg-game-night-ink/45'
              }`}
              title={`${pokemon.name}: ${pokemon.fainted ? 'fainted' : 'ready'}`}
            />
          ))}
        </div>
      </div>
      <PokemonRaritySprite
        formId={active.formId}
        view={view}
        isShadow
        alt={`Shadow ${active.name}`}
        className="mx-auto h-44 w-44 sm:h-52 sm:w-52"
        sizes="208px"
      />
      <div className="rounded-xl border border-game-border/40 bg-game-night-canvas/90 p-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-semibold">Shadow {active.name}</p>
          <p className="font-mono text-sm">Lv. {active.level}</p>
        </div>
        <div
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-game-border/35"
          role="progressbar"
          aria-label={`${active.name} health`}
          aria-valuemin={0}
          aria-valuemax={active.maxHp}
          aria-valuenow={active.currentHp}
        >
          <div
            className="h-full rounded-full bg-game-ochre transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${hpPercent}%` }}
          />
        </div>
        <p className="mt-1 text-right font-mono text-xs text-game-night-ink/65">
          {active.currentHp} / {active.maxHp} HP
        </p>
      </div>
    </div>
  )
}
