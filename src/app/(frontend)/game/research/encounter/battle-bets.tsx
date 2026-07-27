'use client'

import { AnimatePresence } from 'framer-motion'
import { DoorOpen } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { BattleLog } from '@/app/(frontend)/game/battles/_components/battle-log'
import { BattleScene } from '@/app/(frontend)/game/battles/_components/battle-scene'
import {
  advanceBattleBetsBattle,
  clearBattleBetsResult,
  placeBattleBet,
  startBattleBets,
} from '@/app/(frontend)/game/games/battle-bets-actions'
import { VSAnimation } from '@/components/game/battles/VSAnimation'
import { GameResult } from '@/components/game/ResearchResult'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ItemSprite } from '@/components/ui/item-sprite'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { GameItem } from '@/data/games'
import { useBattleManager } from '@/utilities/battle/engine/useBattleManager'
import type { BattleState } from '@/utilities/battle/types'
import type {
  BattleBetsPublicState,
  BattleBetsSide,
  BattleBetsTeamPreview,
} from '@/utilities/battle-bets'

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

function formatOdds(odds: number): string {
  return `1:${odds.toFixed(2)}`
}

export function BattleBetsGame({
  encounter,
  initialState,
}: {
  encounter: GameItem
  initialState: BattleBetsPublicState
}) {
  const router = useRouter()
  const { refreshUser } = useUser()
  const [state, setState] = useState(initialState)
  const [busy, setBusy] = useState(false)
  const [selectedSide, setSelectedSide] = useState<BattleBetsSide>()
  const [stakeInput, setStakeInput] = useState('')

  const selectedOdds =
    selectedSide === 'female'
      ? state.femaleOdds
      : selectedSide === 'male'
        ? state.maleOdds
        : 0
  const stake = Number(stakeInput)
  const validStake =
    Number.isSafeInteger(stake) && stake >= 1 && stake <= state.tokenBalance
  const potentialPayout =
    validStake && selectedOdds > 0 ? Math.floor(stake * selectedOdds) : 0

  const closeStakeDialog = () => {
    if (busy) return
    setSelectedSide(undefined)
    setStakeInput('')
  }

  const openStakeDialog = (side: BattleBetsSide) => {
    setSelectedSide(side)
    setStakeInput('')
  }

  const placeBet = async () => {
    if (!selectedSide || !validStake) return
    setBusy(true)
    const result = await placeBattleBet(selectedSide, stake, newActionId())
    setBusy(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    setSelectedSide(undefined)
    setStakeInput('')
    setState(result.state)
    refreshUser()
  }

  const playAgain = async () => {
    setBusy(true)
    const result = await startBattleBets(true)
    setBusy(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    setState(result.state)
    refreshUser()
  }

  const returnToExplore = async () => {
    setBusy(true)
    const result = await clearBattleBetsResult()
    setBusy(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    refreshUser()
    router.push('/game/explore')
  }

  if (state.phase !== 'inspect' && state.battle) {
    return (
      <BattleBetsBattle
        state={state}
        busy={busy}
        onStateChange={setState}
        onPlayAgain={playAgain}
        onReturn={returnToExplore}
      />
    )
  }

  return (
    <main className="game-night relative h-[100dvh] min-h-0 overflow-y-auto bg-game-night-canvas text-game-night-ink">
      <Image
        src="/backgrounds/game-corner.avif"
        alt=""
        fill
        priority
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-game-night-canvas/75" />

      <div className="relative mx-auto flex min-h-full w-full max-w-4xl flex-col px-3 py-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:py-5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-10 border border-game-night-border/60 bg-game-night-surface/90 text-game-night-ink hover:bg-game-night-surface-raised hover:text-game-night-ink sm:right-5 sm:top-5"
          disabled={busy}
          onClick={() => void returnToExplore()}
          aria-label="Return to Explore"
        >
          <DoorOpen className="h-4 w-4" />
        </Button>
        <TokenChip balance={state.tokenBalance} />

        <div className="flex flex-1 items-center py-3 sm:py-5">
          <div className="grid w-full gap-3 lg:grid-cols-2">
            <TeamCard
              team={state.femaleTeam}
              odds={state.femaleOdds}
              disabled={busy || state.tokenBalance < 1}
              onBet={() => openStakeDialog('female')}
            />
            <TeamCard
              team={state.maleTeam}
              odds={state.maleOdds}
              disabled={busy || state.tokenBalance < 1}
              onBet={() => openStakeDialog('male')}
            />
          </div>
        </div>
      </div>

      <Dialog
        open={selectedSide !== undefined}
        onOpenChange={(open) => {
          if (!open) closeStakeDialog()
        }}
      >
        <DialogContent className="game-night border-game-night-border bg-game-night-surface text-game-night-ink sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Place your bet
            </DialogTitle>
            <DialogDescription className="text-game-night-ink/65">
              Back{' '}
              {selectedSide === 'female'
                ? state.femaleTeam.trainerName
                : state.maleTeam.trainerName}{' '}
              at {formatOdds(selectedOdds)}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-game-night-ink/60">
              <span>Stake</span>
              <span className="font-mono">
                Balance {state.tokenBalance.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                autoFocus
                inputMode="numeric"
                pattern="[0-9]*"
                min={1}
                max={state.tokenBalance}
                value={stakeInput}
                onChange={(event) =>
                  setStakeInput(event.target.value.replace(/\D/g, ''))
                }
                placeholder="Enter Fun Tokens"
                aria-label="Fun Token stake"
                className="h-11 border-game-night-border bg-game-night-canvas font-mono text-game-night-ink"
              />
              <Button
                type="button"
                variant="outline"
                className="min-h-11 shrink-0 border-game-night-border bg-game-night-canvas text-game-night-ink"
                onClick={() => setStakeInput(String(state.tokenBalance))}
              >
                Max
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-game-ochre/30 bg-game-night-canvas px-3 py-2">
              <span className="text-xs text-game-night-ink/60">
                Total return
              </span>
              <span className="font-mono font-semibold text-game-ochre">
                {potentialPayout.toLocaleString()} Fun Tokens
              </span>
            </div>
          </div>

          <DialogFooter className="grid grid-cols-2 gap-2 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="min-h-11 border-game-night-border bg-game-night-canvas text-game-night-ink"
              disabled={busy}
              onClick={closeStakeDialog}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="game-accent-button min-h-11"
              disabled={busy || !validStake}
              onClick={() => void placeBet()}
            >
              {busy ? 'Placing bet…' : 'Place Bet'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

function TokenChip({ balance }: { balance: number }) {
  return (
    <div className="flex justify-center">
      <div className="flex min-h-11 items-center gap-2 rounded-full border border-game-ochre/35 bg-game-surface-raised px-4 py-2 text-game-ink shadow-sm">
        <ItemSprite
          itemId="fun-token"
          alt="Fun Tokens"
          width={22}
          height={22}
          className="h-[22px] w-[22px] object-contain"
        />
        <span className="font-mono text-base font-semibold">
          {balance.toLocaleString()}
        </span>
        <span className="text-xs text-game-muted">Fun Tokens</span>
      </div>
    </div>
  )
}

function TeamCard({
  team,
  odds,
  disabled,
  onBet,
}: {
  team: BattleBetsTeamPreview
  odds: number
  disabled: boolean
  onBet: () => void
}) {
  return (
    <section className="game-activity-panel p-3">
      <div className="flex items-center gap-2.5">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-game-ochre/35 bg-game-night-canvas">
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
          <p className="font-mono text-base font-semibold leading-none text-game-ochre">
            {formatOdds(odds)}
          </p>
          <p className="mt-1 text-[0.55rem] uppercase tracking-wider text-game-night-ink/50">
            odds
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

      <Button
        className="game-accent-button mt-3 min-h-11 w-full"
        disabled={disabled}
        onClick={onBet}
      >
        Back this team
      </Button>
    </section>
  )
}

function BattleBetsBattle({
  state,
  busy,
  onStateChange,
  onPlayAgain,
  onReturn,
}: {
  state: BattleBetsPublicState
  busy: boolean
  onStateChange: (state: BattleBetsPublicState) => void
  onPlayAgain: () => Promise<void>
  onReturn: () => Promise<void>
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

  const selectedOdds =
    state.selectedSide === 'female' ? state.femaleOdds : state.maleOdds
  const selectedTrainer =
    state.selectedSide === 'female' ? state.femaleTeam : state.maleTeam

  return (
    <main className="game-night h-[100dvh] min-h-0 text-game-night-ink">
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
              Backing {selectedTrainer.trainerName}
            </p>
            <p className="text-[0.62rem] text-game-night-ink/55">
              {advancing || isProcessing ? 'Battle in progress…' : 'AI battle'}
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-game-ochre">
            {state.stake?.toLocaleString()} at {formatOdds(selectedOdds)}
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
        <div className="fixed inset-0 z-[100] bg-game-canvas">
          <GameResult
            success={state.won === true}
            title={state.won ? 'BET WON!' : 'BET LOST'}
            message={
              state.won
                ? `${selectedTrainer.trainerName} won. Your ${state.stake?.toLocaleString()} Fun Token bet paid out ${state.payout?.toLocaleString()} Fun Tokens.`
                : `${selectedTrainer.trainerName} lost the battle. Your ${state.stake?.toLocaleString()} Fun Token stake is gone.`
            }
            rewardSummary={state.rewardSummary}
            icon={{ type: 'trainer', id: selectedTrainer.trainerSpriteId }}
            iconAlt={selectedTrainer.trainerName}
            titleColor={state.won ? 'text-game-ochre' : 'text-game-danger'}
            returnText="Return to Explore"
            onReturn={() => void onReturn()}
            secondaryAction={
              <Button disabled={busy} onClick={() => void onPlayAgain()}>
                {busy ? 'Preparing matchup…' : 'Play Again'}
              </Button>
            }
          />
        </div>
      )}
    </main>
  )
}
