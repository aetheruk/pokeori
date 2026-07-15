'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { RhythmConfig, RhythmIcon } from '@/data/games/rhythm/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import {
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'

interface RhythmGameProps {
  encounter: RhythmConfig
  initialState?: any
}

interface MovingIcon {
  id: string
  iconData: RhythmIcon
  x: number // Current x position (0 = left edge)
  createdAt: number
}

// Scoring thresholds (distance from target center in pixels)
// Based on Taiko no Tatsujin Hard mode timing windows, converted to pixels at 300px/s
// PERFECT: ±25ms = ±7.5px, GREAT: ±75ms = ±22.5px, GOOD: ±108ms = ±32.4px
const PERFECT_THRESHOLD = 8 // ~±27ms - Taiko "GOOD" equivalent
const GREAT_THRESHOLD = 23 // ~±77ms - Taiko "OK" equivalent
const GOOD_THRESHOLD = 33 // ~±110ms - Taiko "BAD" threshold

// Points
const PERFECT_POINTS = 30
const GREAT_POINTS = 20
const GOOD_POINTS = 10
const MISS_POINTS = -15

// Track dimensions
const TRACK_WIDTH = 100 // percentage
const TARGET_POSITION = 85 // percentage from left where shadow sits

export function RhythmGame({ encounter, initialState }: RhythmGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const router = useRouter()
  const canvasRef = useRef<HTMLDivElement>(null)

  // Game state
  const [gameStarted, setGameStarted] = useState(!!initialState)
  const [gameEnded, setGameEnded] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(
    initialState?.timeLeft ?? encounter.settings.timeLimit,
  )
  const [countdown, setCountdown] = useState(3)
  const [result, setResult] = useState<any | null>(null)
  const [movingIcons, setMovingIcons] = useState<MovingIcon[]>([])
  const [lastHit, setLastHit] = useState<{
    type: string
    x: number
    y: number
  } | null>(null)

  // Refs for game loop
  const gameLoopRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number>(0)
  const lastSpawnTimeRef = useRef<number>(0)
  const nextSpawnDelayRef = useRef<number>(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const iconIdCounterRef = useRef<number>(0)

  const { speed, spawnRate, icons, winScore } = encounter.settings
  const isEndlessMode = (encounter.settings as any).endless?.enabled || false

  // Get a random spawn delay within the range
  const getRandomSpawnDelay = useCallback(() => {
    return spawnRate.min + Math.random() * (spawnRate.max - spawnRate.min)
  }, [spawnRate])

  // Get a random icon from the pool
  const getRandomIcon = useCallback(() => {
    return icons[Math.floor(Math.random() * icons.length)]
  }, [icons])

  // Spawn a new icon
  const spawnIcon = useCallback(() => {
    const newIcon: MovingIcon = {
      id: `icon-${iconIdCounterRef.current++}`,
      iconData: getRandomIcon(),
      x: 0,
      createdAt: performance.now(),
    }
    setMovingIcons((prev) => [...prev, newIcon])
    nextSpawnDelayRef.current = getRandomSpawnDelay()
    lastSpawnTimeRef.current = performance.now()
  }, [getRandomIcon, getRandomSpawnDelay])

  const gameEndedRef = useRef(false)

  // Calculate hit quality based on distance from target
  const calculateHitQuality = useCallback(
    (iconX: number): { type: string; points: number } => {
      const trackWidth = trackRef.current?.offsetWidth || 300
      const targetX = (TARGET_POSITION / 100) * trackWidth

      // Icon is w-16 (64px). We want center-to-center distance.
      // iconX is left edge. Center is iconX + 32.
      const iconCenter = iconX + 32
      const distance = Math.abs(iconCenter - targetX)

      if (distance <= PERFECT_THRESHOLD) {
        return { type: 'PERFECT', points: PERFECT_POINTS }
      } else if (distance <= GREAT_THRESHOLD) {
        return { type: 'GREAT', points: GREAT_POINTS }
      } else if (distance <= GOOD_THRESHOLD) {
        return { type: 'GOOD', points: GOOD_POINTS }
      } else {
        return { type: 'MISS', points: MISS_POINTS }
      }
    },
    [],
  )

  // Handle icon button click
  const handleIconClick = useCallback(
    (clickedIconId: string) => {
      if (gameEnded || gameEndedRef.current || countdown > 0) return

      // Find the closest icon of this type to the target
      const trackWidth = trackRef.current?.offsetWidth || 300
      const targetX = (TARGET_POSITION / 100) * trackWidth

      const matchingIcons = movingIcons.filter(
        (icon) => icon.iconData.id === clickedIconId,
      )

      if (matchingIcons.length === 0) {
        // Wrong icon or no icons of this type on track
        setScore((prev) => prev + MISS_POINTS)
        playSfx('bad')
        setLastHit({ type: 'MISS', x: targetX, y: 50 })
        setTimeout(() => setLastHit(null), 500)
        return
      }

      // Find the icon closest to the target using reduce
      const closestIcon = matchingIcons.reduce((closest, icon) => {
        // Use center distance
        const dist = Math.abs(icon.x + 32 - targetX)
        const closestDist = Math.abs(closest.x + 32 - targetX)
        return dist < closestDist ? icon : closest
      }, matchingIcons[0])

      const { type, points } = calculateHitQuality(closestIcon.x)
      if (type === 'MISS') {
        playSfx('bad')
      } else {
        playSfx('good')
      }
      setScore((prev) => prev + points)
      setLastHit({ type, x: closestIcon.x + 32, y: 50 }) // Visual hit at center
      setTimeout(() => setLastHit(null), 500)

      // Remove the hit icon
      setMovingIcons((prev) =>
        prev.filter((icon) => icon.id !== closestIcon.id),
      )
    },
    [gameEnded, movingIcons, calculateHitQuality, playSfx],
  )

  // Game loop with delta time
  const gameLoop = useCallback(
    (currentTime: number) => {
      if (!gameStarted || gameEnded || gameEndedRef.current) return

      // Always schedule next frame
      gameLoopRef.current = requestAnimationFrame(gameLoop)

      if (countdown > 0) {
        lastFrameTimeRef.current = currentTime
        return
      }

      const rawDeltaTime = (currentTime - lastFrameTimeRef.current) / 1000
      // Clamp delta time to max 0.1s to prevent icons from jumping when tab is backgrounded
      const deltaTime = Math.min(rawDeltaTime, 0.1)
      lastFrameTimeRef.current = currentTime

      // Update icon positions
      setMovingIcons((prev) => {
        const trackWidth = trackRef.current?.offsetWidth || 300
        const updated = prev
          .map((icon) => ({
            ...icon,
            x: icon.x + speed * deltaTime,
          }))
          .filter((icon) => {
            // Remove icons that passed the right edge (missed)
            if (icon.x > trackWidth) {
              setScore((s) => s + MISS_POINTS)
              playSfx('bad')
              return false
            }
            return true
          })
        return updated
      })

      // Check if we should spawn a new icon
      const timeSinceLastSpawn = (currentTime - lastSpawnTimeRef.current) / 1000
      if (timeSinceLastSpawn >= nextSpawnDelayRef.current) {
        spawnIcon()
      }
    },
    [gameStarted, gameEnded, speed, spawnIcon, countdown, playSfx],
  )

  // Start the game
  const initGame = useCallback(async () => {
    if (gameStarted) return

    const result = await startResearchEncounter(encounter.id)
    if (!result.success) {
      console.error('Failed to start encounter:', result.error)
      return
    }

    setGameStarted(true)
    setGameEnded(false)
    setScore(0)
    setMovingIcons([])
    setTimeLeft(encounter.settings.timeLimit)
    setCountdown(3)

    // Initialize spawn timing
    lastSpawnTimeRef.current = performance.now()
    nextSpawnDelayRef.current = getRandomSpawnDelay()
    lastFrameTimeRef.current = performance.now()

    // Spawn first icon will happen via game loop
  }, [
    encounter.id,
    encounter.settings.timeLimit,
    gameStarted,
    getRandomSpawnDelay,
    spawnIcon,
  ])

  // Start game loop when game starts
  useEffect(() => {
    if (gameStarted && !gameEnded) {
      lastFrameTimeRef.current = performance.now()
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameStarted, gameEnded, gameLoop])

  // Handle Game End Logic
  const handleGameEnd = useCallback(async () => {
    if (gameEndedRef.current) return
    gameEndedRef.current = true
    setGameEnded(true)

    // Stop loop
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current)

    // For normal mode, determine success if score >= winScore
    const isNormalWin = !!(!isEndlessMode && winScore && score >= winScore)

    try {
      await submitResearchAnswer(isNormalWin)
      const res = await completeResearchEncounter(
        encounter.id,
        isNormalWin,
        Math.floor(score),
      )

      const hasRewards =
        res.summary &&
        ((res.summary.items && res.summary.items.length > 0) ||
          (res.summary.pokemon && res.summary.pokemon.length > 0) ||
          (res.summary.currency && res.summary.currency.length > 0) ||
          (res.summary.cards && res.summary.cards.length > 0))

      const finalSuccess = isEndlessMode ? hasRewards : isNormalWin

      setResult({
        success: finalSuccess,
        message: isEndlessMode
          ? `Final Score: ${Math.floor(score)}`
          : finalSuccess
            ? 'Level Complete!'
            : 'Time Up!',
        rewards: res.summary,
      })
    } catch (e) {
      console.error('Game end error', e)
    }
  }, [encounter.id, score, winScore, isEndlessMode])

  // Check win condition (Early Win for Normal Mode)
  useEffect(() => {
    if (
      !isEndlessMode &&
      gameStarted &&
      !gameEnded &&
      winScore &&
      score >= winScore
    ) {
      handleGameEnd()
    }
  }, [gameStarted, gameEnded, score, winScore, handleGameEnd, isEndlessMode])

  // Timer effect handles Game End
  useEffect(() => {
    if (!gameStarted || gameEnded || countdown > 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          handleGameEnd()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameEnded, handleGameEnd, countdown])

  // Countdown Effect
  useEffect(() => {
    if (!gameStarted || gameEnded || countdown <= 0) return
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [gameStarted, gameEnded, countdown])

  // Reset timing when countdown finishes
  useEffect(() => {
    if (countdown === 0 && gameStarted && !gameEnded) {
      lastFrameTimeRef.current = performance.now()
      lastSpawnTimeRef.current = performance.now()
    }
  }, [countdown, gameStarted, gameEnded])

  // Auto-start
  useEffect(() => {
    if (!gameStarted) {
      initGame()
    }
  }, [gameStarted, initGame])

  return (
    <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink">
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          {/* Track Area (Top 40%) */}
          <div className="relative h-[40%] overflow-hidden bg-game-night-surface">
            {encounter.background && (
              <Image
                src={encounter.background}
                alt="Background"
                fill
                className="object-cover opacity-50"
              />
            )}

            {/* Timer - Top Right */}
            <div className="absolute top-4 right-4 z-50">
              <GameTimer
                timeLeft={timeLeft}
                totalTime={encounter.settings.timeLimit}
              />
            </div>

            {/* Score Display (Pill Style) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-row gap-3 z-50 pointer-events-none">
              <div className="flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-4 py-2 font-bold text-game-ink shadow-sm backdrop-blur-sm">
                <span className="text-sm">
                  {isEndlessMode ? (
                    <>Score: {Math.floor(score)}</>
                  ) : (
                    <>
                      Score: {Math.floor(score)} / {winScore || 0}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Track */}
            <div
              ref={trackRef}
              className="absolute bottom-8 left-4 right-4 h-24 overflow-hidden rounded-lg border-2 border-[#5b686b] bg-[#22353d]/90"
            >
              {/* Target Shadow Zone - Dynamic color based on closest icon */}
              {(() => {
                // Calculate what the current hit quality would be
                const trackWidth = trackRef.current?.offsetWidth || 300
                const targetX = (TARGET_POSITION / 100) * trackWidth

                // Find the closest icon to target
                let closestDistance = Infinity
                for (const icon of movingIcons) {
                  const iconCenter = icon.x + 32
                  const distance = Math.abs(iconCenter - targetX)
                  if (distance < closestDistance) {
                    closestDistance = distance
                  }
                }

                // Determine ring color based on distance
                let ringColor = 'border-[#748083] bg-[#46545a]/50'
                if (closestDistance <= PERFECT_THRESHOLD) {
                  ringColor = 'border-yellow-400 bg-yellow-500/30'
                } else if (closestDistance <= GREAT_THRESHOLD) {
                  ringColor = 'border-green-400 bg-green-500/30'
                } else if (closestDistance <= GOOD_THRESHOLD) {
                  ringColor = 'border-blue-400 bg-blue-500/30'
                }

                return (
                  <div
                    className="absolute bottom-0 top-0 flex w-20 items-center justify-center border-l-2 border-r-2 border-dashed border-[#748083] bg-[#5b686b]/50"
                    style={{
                      left: `${TARGET_POSITION}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div
                      className={`w-16 h-16 rounded-full border-2 border-dashed transition-colors duration-100 ${ringColor}`}
                    />
                  </div>
                )
              })()}

              {/* Moving Icons - Circular containers matching target ring */}
              {movingIcons.map((icon) => (
                <div
                  key={icon.id}
                  className="absolute top-1/2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#5b686b] bg-[#22353d]/90 transition-none"
                  style={{
                    left: 0,
                    transform: `translate3d(${icon.x}px, -50%, 0)`,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    zIndex: 10,
                  }}
                >
                  <TaskIconDisplay
                    icon={icon.iconData}
                    className="w-10 h-10 drop-shadow-lg"
                  />
                </div>
              ))}

              {/* Hit Feedback */}
              {lastHit && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-lg font-black pointer-events-none animate-in zoom-in-50 fade-out-0 duration-500 ${
                    lastHit.type === 'PERFECT'
                      ? 'text-yellow-400'
                      : lastHit.type === 'GREAT'
                        ? 'text-green-400'
                        : lastHit.type === 'GOOD'
                          ? 'text-blue-400'
                          : 'text-red-400'
                  }`}
                  style={{ left: lastHit.x }}
                >
                  {lastHit.type}!
                </div>
              )}
            </div>

            {/* Countdown Overlay - Outside track to prevent clipping */}
            {countdown > 0 && gameStarted && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#081014]/55 backdrop-blur-sm">
                <div className="animate-pulse">
                  <GameTimer
                    timeLeft={countdown}
                    totalTime={3}
                    size="xl"
                    className="text-[#f7ecd6] drop-shadow-2xl"
                    colorOverride="text-[#d3ad63]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Icon Selection Area (Bottom 60%) */}
          <div className="game-paper-texture h-[60%] border-t border-game-border bg-game-surface p-6 text-game-ink">
            <div className="h-full flex flex-col">
              <div className="text-center mb-6">
                <p className="text-xs uppercase tracking-wider text-game-muted">
                  Tap the matching icon
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-game-ink">
                  when it reaches the target!
                </h3>
                <hr className="mt-4 border-game-border" />
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  {icons.map((icon) => (
                    <Button
                      key={icon.id}
                      variant="outline"
                      className="h-auto p-3 flex flex-col items-center justify-center gap-2 min-w-28 touch-manipulation select-none"
                      onPointerDown={(e) => {
                        if (gameEnded) return
                        e.preventDefault()
                        handleIconClick(icon.id)
                      }}
                      disabled={gameEnded}
                    >
                      <div className="w-20 h-20 relative flex items-center justify-center">
                        <TaskIconDisplay icon={icon} className="w-16 h-16" />
                      </div>
                      {icon.label && (
                        <span className="text-xs text-game-muted">
                          {icon.label}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
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
          title={result.success ? 'Success' : 'Game Over'}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter?.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={async () => {
                  try {
                    const res = await startResearchEncounter(
                      (initialState?.encounter || encounter).id,
                      true,
                    )
                    if (res?.success) {
                      window.location.reload()
                    } else {
                      window.location.href = '/game/explore'
                    }
                  } catch (e) {
                    window.location.href = '/game/explore'
                  }
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
