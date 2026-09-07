'use client'

import { submitDiglettTap } from '@/app/(frontend)/game/research/games/diglett-tunnel-tap'
import { recoverGameAction } from '@/utilities/games/action-recovery'
import type { DiglettRound } from '@/utilities/research/diglett-authority'
import type { GameDataKeys } from '@/utilities/requirements/analysis'

import { Heart, Trophy } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { DiglettTunnelTapGameConfig } from '@/data/games/diglett-tunnel-tap'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  completeGame as completeGameActivity,
  startGame,
} from '@/utilities/games/client-action-recovery'

interface DiglettTunnelTapGameProps {
  encounter: DiglettTunnelTapGameConfig & { isEligibleForReplay?: boolean }
  initialState?: any
}

type MoleKind = 'diglett' | 'dugtrio'

interface ActiveMole {
  slot: number
  kind: MoleKind
  key: number
}

export function DiglettTunnelTapGame({
  encounter,
  initialState,
}: DiglettTunnelTapGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const completionInvalidatesRef = useRef<GameDataKeys[] | undefined>(undefined)
  const router = useRouter()
  const { cols, rows } = encounter.settings.gridSize
  const totalSlots = cols * rows
  const timeLimit = encounter.settings.timeLimit
  const targetScore = encounter.settings.targetScore
  const diglettScore = encounter.settings.diglettScore || 1
  const dugtrioPenalty = encounter.settings.dugtrioPenalty || 1
  const hazardPokemonId = encounter.settings.hazardPokemonId || '51'
  const maxLives = encounter.settings.maxLives || 3
  const themeColour = encounter.settings.themeColour || '#a16207'

  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(maxLives)
  const [activeMole, setActiveMole] = useState<ActiveMole | null>(null)
  const [result, setResult] = useState<any | null>(null)
  const completionRef = useRef(false)
  const [round, setRound] = useState<DiglettRound | null>(null)
  const startTimeRef = useRef(0)
  const busyRef = useRef(false)

  const completeGame = useCallback(
    async (success: boolean, message: string, finalScore = score) => {
      if (completionRef.current) return
      completionRef.current = true
      setGameEnded(true)
      setActiveMole(null)

      const completion = await completeGameActivity(encounter.id, success)
      completionInvalidatesRef.current = completion.invalidates
      const finalSuccess = success && completion.success
      setResult({
        success: finalSuccess,
        message: finalSuccess ? `Score: ${finalScore}` : message,
        rewards: completion.summary,
      })
      playSfx(finalSuccess ? 'good' : 'bad')
    },
    [encounter.id, playSfx, score],
  )

  useEffect(() => {
    let disposed = false
    void (async () => {
      const start = await recoverGameAction(() => startGame(encounter.id), 'Unable to restore the tunnel.', (value) => value.roundData?.kind === 'diglett-tunnel-tap' ? undefined : 'The saved tunnel is unavailable.')
      if (disposed) return
      const restored = start.roundData as DiglettRound
      startTimeRef.current = start.startTime!
      setRound(restored)
      setScore(restored.score)
      setLives(restored.lives)
      setGameStarted(true)
    })()
    return () => { disposed = true }
  }, [encounter.id])

  useEffect(() => {
    if (!round || !gameStarted || gameEnded) return
    const update = () => {
      const now = Date.now()
      setTimeLeft(Math.max(0, Math.ceil((round.deadline - now) / 1000)))
      setActiveMole(busyRef.current ? null : round.spawns.find((spawn) => spawn.startsAt <= now && spawn.endsAt > now && !round.tapped.includes(spawn.key)) || null)
      if (!busyRef.current && (now >= round.deadline || round.score >= targetScore || round.lives <= 0)) {
        void completeGame(round.score >= targetScore, round.lives <= 0 ? 'Too many cave-ins.' : 'The tunnel went quiet.', round.score)
      }
    }
    update()
    const timer = window.setInterval(update, 50)
    return () => window.clearInterval(timer)
  }, [round, gameStarted, gameEnded, targetScore, completeGame])

  const handleHoleTap = async (slot: number) => {
    if (gameEnded || busyRef.current || !round || !activeMole || activeMole.slot !== slot) return
    busyRef.current = true
    const request = { encounterId: encounter.id, startTime: startTimeRef.current, revision: round.revision, spawnKey: activeMole.key, slot, actionId: crypto.randomUUID() }
    setActiveMole(null)
    const response = await recoverGameAction(() => submitDiglettTap(request), 'Your tap could not be confirmed. Retry this same tap.', (value) => value.success && value.round || ['Time is up', 'This Pokémon has returned underground', 'This hole is empty'].includes(value.error || '') ? undefined : value.error || 'Unable to save the tap.')
    if (response.round) {
      setRound(response.round)
      setScore(response.round.score)
      setLives(response.round.lives)
      playSfx(response.correct ? 'good' : 'bad')
    }
    busyRef.current = false
  }

  return (
    <div className="relative min-h-dvh overflow-hidden game-night bg-game-night-canvas text-game-night-ink">
      <div className="absolute inset-0">
        <Image
          src={
            encounter.settings.background ||
            encounter.background ||
            '/backgrounds/cave.avif'
          }
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-[#081014]/65" />
      </div>

      <main className="relative z-10 flex min-h-dvh flex-col">
        <div className="pointer-events-none absolute left-1/2 top-4 z-50 flex -translate-x-1/2 flex-row gap-3">
          <div
            className={cn(
              'flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1 text-xs font-bold text-game-ink shadow-sm backdrop-blur-sm transition-colors',
              score >= targetScore * 0.85
                ? 'border-game-moss bg-game-moss text-game-cream'
                : '',
            )}
          >
            <Trophy className="h-3 w-3 text-game-ochre" />
            <span>
              {score} <span className="text-game-muted">/ {targetScore}</span>
            </span>
          </div>
          <div
            className={cn(
              'flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1 text-xs font-bold text-game-ink shadow-sm backdrop-blur-sm transition-colors',
              lives <= 1 ? 'border-red-500/50 bg-red-500/70' : '',
            )}
          >
            <Heart className="h-3 w-3 fill-current text-game-clay" />
            <span>
              {lives} <span className="text-game-muted">/ {maxLives}</span>
            </span>
          </div>
        </div>

        <div className="absolute right-4 top-4 z-50">
          <GameTimer timeLeft={timeLeft} totalTime={timeLimit} />
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-6">
          <div
            className="grid max-w-[92vw] rounded-lg border border-[#f7ecd6]/15 bg-[#081014]/50 p-3 shadow-2xl backdrop-blur"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 72px))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 72px))`,
              gap: 8,
            }}
          >
            {Array.from({ length: totalSlots }, (_, slot) => {
              const mole = activeMole?.slot === slot ? activeMole : null
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleHoleTap(slot)}
                  disabled={gameEnded || !mole}
                  className={cn(
                    'relative aspect-square overflow-hidden rounded-full border border-stone-700 bg-stone-950 shadow-inner transition',
                    mole &&
                      'scale-105 border-yellow-300 shadow-[0_0_18px_rgba(250,204,21,0.35)]',
                  )}
                  style={{
                    background: mole
                      ? `radial-gradient(circle at center, color-mix(in srgb, ${themeColour} 35%, black), #1c1917 62%)`
                      : undefined,
                  }}
                  aria-label={mole ? `Tap ${mole.kind}` : 'Empty tunnel hole'}
                >
                  <div className="absolute inset-x-2 bottom-1 h-4 rounded-full bg-[#081014]/60" />
                  {mole && (
                    <Image
                      src={getPokemonImageUrl(
                        mole.kind === 'diglett' ? '50' : hazardPokemonId,
                        'home',
                      )}
                      alt={mole.kind === 'diglett' ? 'diglett' : 'hazard'}
                      width={64}
                      height={64}
                      className="absolute inset-x-0 bottom-1 mx-auto h-[82%] w-[82%] object-contain"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </main>

      {result && (
        <RewardResultOverlay
          result={result}
          onClose={() => {
            refreshUser(true, completionInvalidatesRef.current)
            router.push('/game/explore')
          }}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Success' : 'Fail'}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter?.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={async () => {
                  const replay = await startGame(encounter.id, true)
                  if (replay.success) window.location.reload()
                  else router.push('/game/explore')
                }}
                className="w-full"
              >
                Play Again
              </Button>
            ) : undefined
          }
        />
      )}
    </div>
  )
}
