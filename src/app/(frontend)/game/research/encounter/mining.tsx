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
import type { MiningConfig } from '@/data/games/mining/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import {
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'

interface MiningGameProps {
  encounter: MiningConfig
  initialState?: any
}

export function MiningGame({ encounter, initialState }: MiningGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const router = useRouter()

  // Game state
  const [gameStarted, setGameStarted] = useState(!!initialState)
  const [gameEnded, setGameEnded] = useState(false)
  const [timeLeft, setTimeLeft] = useState(
    initialState?.timeLeft ?? encounter.settings.timeLimit,
  )
  const [countdown, setCountdown] = useState(3)
  const [result, setResult] = useState<any | null>(null)

  // Mining state
  const [currentHp, setCurrentHp] = useState(encounter.settings.itemHp)
  const [swingsUsed, setSwingsUsed] = useState(0)
  const [chevronPosition, setChevronPosition] = useState(0) // 0-100 percentage
  const [targetZone, setTargetZone] = useState(() => {
    // Initialize with random target zone based on config
    const { min, max } = encounter.settings.targetSize
    const size = min + Math.random() * (max - min)
    const maxStart = 100 - size
    const start = Math.random() * maxStart
    return { start, end: start + size }
  })
  const [isMovingRight, setIsMovingRight] = useState(true)
  const [lastHit, setLastHit] = useState<{ type: string } | null>(null)
  const [shakeIntensity, setShakeIntensity] = useState(0)
  const [crackLevel, setCrackLevel] = useState(0) // 0-100 percentage based on damage dealt
  const [isShattered, setIsShattered] = useState(false)

  // Refs
  const gameLoopRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number>(0)
  const currentSpeedRef = useRef(encounter.settings.speed.min)
  const gameEndedRef = useRef(false)
  const barRef = useRef<HTMLDivElement>(null)

  const {
    itemHp,
    perfectDamage,
    okDamage,
    maxSwings,
    timeLimit,
    buttonIcon,
    miningTarget,
  } = encounter.settings

  // Generate random target zone
  const generateTargetZone = useCallback(() => {
    const { min, max } = encounter.settings.targetSize
    const size = min + Math.random() * (max - min)
    // Random position ensuring zone fits within bar
    const maxStart = 100 - size
    const start = Math.random() * maxStart
    setTargetZone({ start, end: start + size })

    // Also randomize speed for this swing
    const { min: speedMin, max: speedMax } = encounter.settings.speed
    currentSpeedRef.current = speedMin + Math.random() * (speedMax - speedMin)
  }, [encounter.settings.targetSize, encounter.settings.speed])

  // Calculate hit quality
  const calculateHit = useCallback((): {
    type: 'PERFECT' | 'OK' | 'MISS'
    damage: number
  } => {
    const zoneSize = targetZone.end - targetZone.start
    const okBoundary = zoneSize * 0.1 // 10% either side

    // Check if in perfect zone (center)
    if (
      chevronPosition >= targetZone.start &&
      chevronPosition <= targetZone.end
    ) {
      return { type: 'PERFECT', damage: perfectDamage }
    }

    // Check if in OK zone (10% either side)
    if (
      chevronPosition >= targetZone.start - okBoundary &&
      chevronPosition <= targetZone.end + okBoundary
    ) {
      return { type: 'OK', damage: okDamage }
    }

    return { type: 'MISS', damage: 0 }
  }, [chevronPosition, targetZone, perfectDamage, okDamage])

  // Handle swing
  const handleSwing = useCallback(() => {
    if (gameEnded || gameEndedRef.current || countdown > 0) return

    const hit = calculateHit()
    setSwingsUsed((prev) => prev + 1)
    setLastHit({ type: hit.type })
    setTimeout(() => setLastHit(null), 500)

    // Play SFX for miss only (good SFX handled when damage > 0)
    if (hit.type === 'MISS') {
      playSfx('bad')
    }

    if (hit.damage > 0) {
      playSfx('good')
      // Apply damage
      const newHp = Math.max(0, currentHp - hit.damage)
      setCurrentHp(newHp)

      // Update crack level
      const damageDealt = itemHp - newHp
      setCrackLevel((damageDealt / itemHp) * 100)

      // Shake effect
      setShakeIntensity(hit.type === 'PERFECT' ? 8 : 4)
      setTimeout(() => setShakeIntensity(0), 200)

      // Check win
      if (newHp <= 0) {
        handleGameEnd(true)
        return
      }
    }

    // Check swing limit
    if (maxSwings && swingsUsed + 1 >= maxSwings) {
      handleGameEnd(false)
      return
    }

    // Generate new target zone for next swing
    generateTargetZone()
  }, [
    gameEnded,
    countdown,
    calculateHit,
    currentHp,
    itemHp,
    maxSwings,
    swingsUsed,
    generateTargetZone,
  ])

  // Game loop
  const gameLoop = useCallback(
    (currentTime: number) => {
      if (!gameStarted || gameEnded || gameEndedRef.current) return

      gameLoopRef.current = requestAnimationFrame(gameLoop)

      if (countdown > 0) {
        lastFrameTimeRef.current = currentTime
        return
      }

      const rawDeltaTime = (currentTime - lastFrameTimeRef.current) / 1000
      const deltaTime = Math.min(rawDeltaTime, 0.1)
      lastFrameTimeRef.current = currentTime

      // Move chevron (ping-pong motion)
      const speed = currentSpeedRef.current * 100 // Convert to percentage per second
      setChevronPosition((prev) => {
        let newPos =
          prev + (isMovingRight ? speed * deltaTime : -speed * deltaTime)

        // Bounce at edges
        if (newPos >= 100) {
          newPos = 100
          setIsMovingRight(false)
        } else if (newPos <= 0) {
          newPos = 0
          setIsMovingRight(true)
        }

        return newPos
      })
    },
    [gameStarted, gameEnded, countdown, isMovingRight],
  )

  // Handle game end
  const handleGameEnd = useCallback(
    async (success: boolean) => {
      if (gameEndedRef.current) return
      gameEndedRef.current = true
      setGameEnded(true)

      if (success) {
        setIsShattered(true)
      }

      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current)

      try {
        await submitResearchAnswer(success)
        const res = await completeResearchEncounter(encounter.id, success, 0)

        const hasRewards =
          res.summary &&
          ((res.summary.items && res.summary.items.length > 0) ||
            (res.summary.pokemon && res.summary.pokemon.length > 0) ||
            (res.summary.currency && res.summary.currency.length > 0) ||
            (res.summary.cards && res.summary.cards.length > 0))

        setResult({
          success,
          message: success ? 'Nice Work' : 'Keep Trying!',
          rewards: res.summary,
        })
      } catch (e) {
        console.error('Game end error', e)
      }
    },
    [encounter.id],
  )

  // Start game
  const initGame = useCallback(async () => {
    if (gameStarted) return

    const result = await startResearchEncounter(encounter.id)
    if (!result.success) {
      console.error('Failed to start encounter:', result.error)
      return
    }

    setGameStarted(true)
    setGameEnded(false)
    setCurrentHp(itemHp)
    setSwingsUsed(0)
    setCrackLevel(0)
    setIsShattered(false)
    setTimeLeft(timeLimit)
    setCountdown(3)
    generateTargetZone()
    lastFrameTimeRef.current = performance.now()
  }, [encounter.id, itemHp, timeLimit, gameStarted, generateTargetZone])

  // Start game loop
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

  // Timer effect
  useEffect(() => {
    if (!gameStarted || gameEnded || countdown > 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          handleGameEnd(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameEnded, handleGameEnd, countdown])

  // Countdown effect
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
    }
  }, [countdown, gameStarted, gameEnded])

  // Auto-start
  useEffect(() => {
    if (!gameStarted) {
      initGame()
    }
  }, [gameStarted, initGame])

  // HP percentage for bar
  const hpPercentage = (currentHp / itemHp) * 100

  return (
    <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink">
      {/* Shatter animation keyframes */}
      <style jsx global>{`
        @keyframes shatter {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--shatter-x), var(--shatter-y)) rotate(var(--shatter-rotate));
            opacity: 0;
          }
        }
      `}</style>
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          {/* Visual Area (Top 70% - includes background, rock, and bar) */}
          <div className="relative h-[70%] overflow-hidden bg-game-night-surface">
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
              <GameTimer timeLeft={timeLeft} totalTime={timeLimit} />
            </div>

            {/* HP and Swings - Top Left - App Style */}
            <div className="absolute top-4 left-4 z-50 flex gap-2">
              {/* HP Chip */}
              <div className="flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1.5 shadow-sm backdrop-blur-sm">
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-game-canvas">
                  <div
                    className="h-full bg-game-moss transition-all duration-300"
                    style={{ width: `${hpPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium tabular-nums text-game-ink">
                  {currentHp}
                </span>
              </div>

              {/* Swings Chip */}
              {maxSwings && (
                <div className="rounded-full border border-game-border bg-game-surface-raised px-3 py-1.5 shadow-sm backdrop-blur-sm">
                  <span className="text-xs font-medium tabular-nums text-game-ink">
                    {maxSwings - swingsUsed}
                  </span>
                </div>
              )}
            </div>

            {/* Mining Target Image - Centered */}
            <div
              className="absolute inset-0 flex items-center justify-center z-10 pb-20"
              style={{
                transform: `translate(${shakeIntensity * (Math.random() - 0.5)}px, ${shakeIntensity * (Math.random() - 0.5)}px)`,
              }}
            >
              {miningTarget && !isShattered && (
                <div className="relative drop-shadow-2xl">
                  <Image
                    src={miningTarget}
                    alt="Mining Target"
                    width={200}
                    height={200}
                    className="object-contain"
                    style={{
                      filter: `brightness(${Math.max(0.7, 1 - crackLevel / 300)}) saturate(${Math.max(0.85, 1 - crackLevel / 500)})`,
                    }}
                  />
                </div>
              )}

              {/* Shatter effect - image breaks into fragments */}
              {isShattered && miningTarget && (
                <div className="relative w-[200px] h-[200px]">
                  {/* Generate 9 shards (3x3 grid) */}
                  {[...Array(9)].map((_, i) => {
                    const row = Math.floor(i / 3)
                    const col = i % 3
                    // Random direction for each shard
                    const angle = i * 40 + Math.random() * 20
                    const distance = 80 + Math.random() * 60
                    const rotation = (Math.random() - 0.5) * 720
                    const delay = i * 30

                    return (
                      <div
                        key={i}
                        className="absolute w-[200px] h-[200px] animate-[shatter_0.8s_ease-out_forwards]"
                        style={{
                          clipPath: `polygon(
                            ${col * 33.33}% ${row * 33.33}%,
                            ${(col + 1) * 33.33}% ${row * 33.33}%,
                            ${(col + 1) * 33.33}% ${(row + 1) * 33.33}%,
                            ${col * 33.33}% ${(row + 1) * 33.33}%
                          )`,
                          animationDelay: `${delay}ms`,
                          ['--shatter-x' as any]: `${Math.cos((angle * Math.PI) / 180) * distance}px`,
                          ['--shatter-y' as any]: `${Math.sin((angle * Math.PI) / 180) * distance}px`,
                          ['--shatter-rotate' as any]: `${rotation}deg`,
                        }}
                      >
                        <Image
                          src={miningTarget}
                          alt=""
                          width={200}
                          height={200}
                          className="object-contain"
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mining Bar - Bottom of visual area */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div
                ref={barRef}
                className="relative h-8 overflow-hidden rounded-full border border-game-border bg-game-canvas/90 backdrop-blur-sm"
              >
                {/* OK Zones (lighter teal) */}
                <div
                  className="absolute bottom-0 top-0 bg-game-moss/20"
                  style={{
                    left: `${Math.max(0, targetZone.start - (targetZone.end - targetZone.start) * 0.1)}%`,
                    width: `${(targetZone.end - targetZone.start) * 0.1}%`,
                  }}
                />
                <div
                  className="absolute bottom-0 top-0 bg-game-moss/20"
                  style={{
                    left: `${targetZone.end}%`,
                    width: `${Math.min((targetZone.end - targetZone.start) * 0.1, 100 - targetZone.end)}%`,
                  }}
                />

                {/* Perfect Zone (solid teal) */}
                <div
                  className="absolute bottom-0 top-0 bg-game-moss/55"
                  style={{
                    left: `${targetZone.start}%`,
                    width: `${targetZone.end - targetZone.start}%`,
                  }}
                />

                {/* Line Indicator */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-yellow-400 transition-none rounded-full"
                  style={{
                    left: `${chevronPosition}%`,
                    transform: 'translateX(-50%)',
                  }}
                />

                {/* Hit Feedback */}
                {lastHit && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center text-sm font-black pointer-events-none animate-pulse ${
                      lastHit.type === 'PERFECT'
                        ? 'text-game-ochre'
                        : lastHit.type === 'OK'
                          ? 'text-game-moss'
                          : 'text-red-400'
                    }`}
                  >
                    {lastHit.type}!
                  </div>
                )}
              </div>
            </div>

            {/* Countdown Overlay */}
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

          {/* Button Area (Bottom 30%) */}
          <div className="game-paper-background flex h-[30%] items-center justify-center border-t border-game-border bg-game-surface p-6">
            <Button
              size="lg"
              className="h-24 w-24 touch-manipulation select-none rounded-full border-4 border-game-clay bg-game-clay text-game-cream shadow-md hover:bg-game-clay/90"
              onPointerDown={(e) => {
                if (gameEnded) return
                e.preventDefault()
                handleSwing()
              }}
              disabled={gameEnded}
            >
              <TaskIconDisplay icon={buttonIcon} className="w-12 h-12" />
            </Button>
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
