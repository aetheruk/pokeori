'use client'

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
import { completeResearchEncounter, startResearchEncounter } from '../actions'

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
  const moleKeyRef = useRef(0)

  const completeGame = useCallback(
    async (success: boolean, message: string, finalScore = score) => {
      if (completionRef.current) return
      completionRef.current = true
      setGameEnded(true)
      setActiveMole(null)

      const completion = await completeResearchEncounter(encounter.id, success)
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

  const initGame = useCallback(async () => {
    const start = await startResearchEncounter(encounter.id)
    if (!start.success) {
      setResult({
        success: false,
        message: start.error || 'Could not start Diglett Tunnel Tap.',
      })
      return
    }

    completionRef.current = false
    setGameStarted(true)
    setGameEnded(false)
    setScore(0)
    setLives(maxLives)
    setActiveMole(null)
    setResult(null)
    setTimeLeft(
      start.restored && start.expiry
        ? Math.max(0, Math.floor((start.expiry - Date.now()) / 1000))
        : timeLimit,
    )
  }, [encounter.id, maxLives, timeLimit])

  useEffect(() => {
    if (!gameStarted) {
      void initGame()
    }
  }, [gameStarted, initGame])

  useEffect(() => {
    if (!gameStarted || gameEnded || timeLeft <= 0) return

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          void completeGame(score >= targetScore, 'The tunnel went quiet.')
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [completeGame, gameEnded, gameStarted, score, targetScore, timeLeft])

  useEffect(() => {
    if (!gameStarted || gameEnded) return

    const spawn = () => {
      const slot = Math.floor(Math.random() * totalSlots)
      const kind: MoleKind = Math.random() < 0.78 ? 'diglett' : 'dugtrio'
      const key = moleKeyRef.current++
      setActiveMole({ slot, kind, key })
      window.setTimeout(() => {
        setActiveMole((current) => (current?.key === key ? null : current))
      }, encounter.settings.visibleMs)
    }

    spawn()
    const interval = window.setInterval(
      spawn,
      encounter.settings.spawnIntervalMs,
    )
    return () => window.clearInterval(interval)
  }, [
    encounter.settings.spawnIntervalMs,
    encounter.settings.visibleMs,
    gameEnded,
    gameStarted,
    totalSlots,
  ])

  const handleHoleTap = useCallback(
    (slot: number) => {
      if (gameEnded || !activeMole || activeMole.slot !== slot) return

      if (activeMole.kind === 'diglett') {
        const nextScore = score + diglettScore
        setScore(nextScore)
        setActiveMole(null)
        playSfx('good')
        if (nextScore >= targetScore) {
          void completeGame(true, 'Tunnel mapped.', nextScore)
        }
      } else {
        const nextLives = lives - 1
        const nextScore = Math.max(0, score - dugtrioPenalty)
        setLives(nextLives)
        setScore(nextScore)
        setActiveMole(null)
        playSfx('bad')
        if (nextLives <= 0) {
          void completeGame(false, 'Too many cave-ins.')
        }
      }
    },
    [
      activeMole,
      completeGame,
      diglettScore,
      dugtrioPenalty,
      gameEnded,
      lives,
      playSfx,
      score,
      targetScore,
    ],
  )

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
            refreshUser()
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
                  const replay = await startResearchEncounter(
                    encounter.id,
                    true,
                  )
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
