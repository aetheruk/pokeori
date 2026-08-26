'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  completeGame,
  startGame,
  submitGameAnswer,
} from '@/app/(frontend)/game/games/actions'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type {
  SurfGameConfig,
  SurfObstacleConfig,
} from '@/data/games/surf/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { usePageVisibility } from '@/hooks/usePageVisibility'
import {
  clampSurfPlayerX,
  getSurfObstacleInterval,
  moveSurfPlayerTowards,
  pickSurfObstacle,
  pickSurfSpawnX,
  surfBoxesOverlap,
} from '@/utilities/research/surf'
import {
  EndlessCollectibleSprite,
  getEndlessCollectibleRewardConfigs,
  getNextCollectibleScore,
} from './endless-collectibles'

const DESIGN_WIDTH = 390
const DESIGN_HEIGHT = 844
const SCORE_PER_SECOND = 10
const HORIZON_Y = 0.17
const PLAYER_Y = 0.79

interface SurfGameProps {
  encounter: SurfGameConfig
  initialState?: any
}

interface ActiveObstacle {
  id: number
  x: number
  progress: number
  config: SurfObstacleConfig
}

interface ActiveCollectible {
  id: number
  x: number
  progress: number
  rewardKey: string
  reward: any
}

function getCoursePosition(x: number, progress: number) {
  const perspective = 0.24 + Math.max(0, progress) * 0.76
  return {
    x: 0.5 + (x - 0.5) * perspective,
    y: HORIZON_Y + progress * (1.05 - HORIZON_Y),
    scale: 0.3 + Math.max(0, progress) * 0.82,
  }
}

function hasRewardSummary(summary: any) {
  return (
    summary &&
    [
      summary.items,
      summary.pokemon,
      summary.currency,
      summary.cards,
      summary.icons,
      summary.titles,
    ].some((entries) => entries?.length > 0)
  )
}

export function SurfGame({ encounter, initialState }: SurfGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const isPageVisible = usePageVisibility()
  const stageRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef(0)
  const obstacleIdRef = useRef(0)
  const collectibleIdRef = useRef(0)
  const obstacleTimerRef = useRef(1.25)
  const playerXRef = useRef(0.5)
  const targetXRef = useRef(0.5)
  const scoreRef = useRef(0)
  const speedRef = useRef(encounter.settings.speed)
  const obstaclesRef = useRef<ActiveObstacle[]>([])
  const collectiblesRef = useRef<ActiveCollectible[]>([])
  const collectibleSchedulesRef = useRef<Record<string, number>>({})
  const collectedRewardsRef = useRef<Record<string, number>>({})
  const pressedKeysRef = useRef(new Set<string>())
  const endingRef = useRef(false)

  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [startError, setStartError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(3)
  const [timeLeft, setTimeLeft] = useState(encounter.settings.timeLimit || 0)
  const [score, setScore] = useState(0)
  const [playerX, setPlayerX] = useState(0.5)
  const [obstacles, setObstacles] = useState<ActiveObstacle[]>([])
  const [collectibles, setCollectibles] = useState<ActiveCollectible[]>([])
  const [waterOffset, setWaterOffset] = useState(0)
  const [result, setResult] = useState<any | null>(null)

  const settings = encounter.settings
  const isEndlessMode = settings.endless?.enabled === true
  const collectibleRewardConfigs = useMemo(
    () => getEndlessCollectibleRewardConfigs(settings),
    [settings],
  )
  const playerWidth = settings.playerWidth || 104
  const playerHeight = settings.playerHeight || 104
  const normalizedPlayerWidth = playerWidth / DESIGN_WIDTH
  const normalizedPlayerHeight = playerHeight / DESIGN_HEIGHT

  const resetLocalGame = useCallback(() => {
    playerXRef.current = 0.5
    targetXRef.current = 0.5
    scoreRef.current = 0
    speedRef.current = settings.speed
    obstacleTimerRef.current = 1.25
    obstacleIdRef.current = 0
    collectibleIdRef.current = 0
    obstaclesRef.current = []
    collectiblesRef.current = []
    collectedRewardsRef.current = {}
    collectibleSchedulesRef.current = Object.fromEntries(
      collectibleRewardConfigs.map((config) => [
        config.key,
        getNextCollectibleScore(0, config.everyScore),
      ]),
    )
    endingRef.current = false
    lastFrameTimeRef.current = 0
    setPlayerX(0.5)
    setScore(0)
    setObstacles([])
    setCollectibles([])
    setWaterOffset(0)
    setCountdown(3)
    setGameEnded(false)
    setResult(null)
  }, [collectibleRewardConfigs, settings.speed])

  const initGame = useCallback(async () => {
    const response = await startGame(encounter.id)
    if (!response.success) {
      setStartError(response.error || 'Unable to start Lapras Surf.')
      return
    }

    resetLocalGame()
    setStartError(null)
    setGameStarted(true)
    if (response.restored && response.expiry && settings.timeLimit) {
      setTimeLeft(
        Math.max(0, Math.floor((response.expiry - Date.now()) / 1000)),
      )
    } else {
      setTimeLeft(settings.timeLimit || 0)
    }
  }, [encounter.id, resetLocalGame, settings.timeLimit])

  useEffect(() => {
    if (!gameStarted) void initGame()
  }, [gameStarted, initGame])

  useEffect(() => {
    if (!gameStarted || gameEnded || !isPageVisible || countdown <= 0) return
    const timeout = window.setTimeout(
      () => setCountdown((current) => current - 1),
      1000,
    )
    return () => window.clearTimeout(timeout)
  }, [countdown, gameEnded, gameStarted, isPageVisible])

  const finishGame = useCallback(
    async (success: boolean, message: string) => {
      if (endingRef.current) return
      endingRef.current = true
      setGameEnded(true)
      playSfx(success ? 'good' : 'bad')
      await submitGameAnswer(success)

      const finalScore = isEndlessMode
        ? Math.floor(scoreRef.current)
        : undefined
      const response = await completeGame(
        encounter.id,
        success,
        finalScore,
        undefined,
        collectedRewardsRef.current,
      )
      const earnedRewards = hasRewardSummary(response.summary)

      setResult({
        success: isEndlessMode ? earnedRewards : success,
        message:
          response.success === false
            ? response.error || 'The run could not be recorded.'
            : isEndlessMode
              ? `Final Score: ${Math.floor(scoreRef.current)}`
              : message,
        rewards: response.summary,
      })
    },
    [encounter.id, isEndlessMode, playSfx],
  )

  useEffect(() => {
    if (
      !settings.timeLimit ||
      !gameStarted ||
      gameEnded ||
      countdown > 0 ||
      !isPageVisible
    )
      return

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          void finishGame(false, 'Time up!')
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [
    countdown,
    finishGame,
    gameEnded,
    gameStarted,
    isPageVisible,
    settings.timeLimit,
  ])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(event.key)) {
        event.preventDefault()
        pressedKeysRef.current.add(event.key.toLowerCase())
      }
    }
    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeysRef.current.delete(event.key.toLowerCase())
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    if (!isPageVisible) lastFrameTimeRef.current = 0
  }, [isPageVisible])

  useEffect(() => {
    if (!gameStarted || gameEnded || countdown > 0 || !isPageVisible) return

    const gameLoop = (now: number) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = now
      const deltaSeconds = Math.min(
        0.05,
        (now - lastFrameTimeRef.current) / 1000,
      )
      lastFrameTimeRef.current = now

      const stageWidth = stageRef.current?.clientWidth || DESIGN_WIDTH
      const keyboardLeft =
        pressedKeysRef.current.has('arrowleft') ||
        pressedKeysRef.current.has('a')
      const keyboardRight =
        pressedKeysRef.current.has('arrowright') ||
        pressedKeysRef.current.has('d')
      if (keyboardLeft !== keyboardRight) {
        targetXRef.current = clampSurfPlayerX(
          playerXRef.current + (keyboardRight ? 1 : -1),
          normalizedPlayerWidth,
        )
      }
      playerXRef.current = clampSurfPlayerX(
        moveSurfPlayerTowards(
          playerXRef.current,
          targetXRef.current,
          settings.steeringSpeed,
          deltaSeconds,
          stageWidth,
        ),
        normalizedPlayerWidth,
      )

      speedRef.current = Math.min(
        settings.maxSpeed || settings.speed,
        speedRef.current + (settings.acceleration || 0) * deltaSeconds,
      )
      const courseStep = (speedRef.current / DESIGN_HEIGHT) * deltaSeconds
      const nextScore = scoreRef.current + SCORE_PER_SECOND * deltaSeconds
      scoreRef.current = nextScore

      obstacleTimerRef.current -= deltaSeconds
      let nextObstacles = obstaclesRef.current
      if (obstacleTimerRef.current <= 0) {
        const config = pickSurfObstacle(settings.obstacles, settings.difficulty)
        if (config) {
          const occupiedXs = collectiblesRef.current
            .filter((collectible) => collectible.progress < 0.2)
            .map((collectible) => collectible.x)
          nextObstacles = [
            ...nextObstacles,
            {
              id: obstacleIdRef.current++,
              x: pickSurfSpawnX(occupiedXs),
              progress: 0,
              config,
            },
          ]
        }
        obstacleTimerRef.current = getSurfObstacleInterval(
          settings.obstacleFrequency,
          settings.difficulty,
        )
      }
      nextObstacles = nextObstacles
        .map((obstacle) => ({
          ...obstacle,
          progress: obstacle.progress + courseStep,
        }))
        .filter((obstacle) => obstacle.progress < 1.14)
      obstaclesRef.current = nextObstacles

      let nextCollectibles = collectiblesRef.current
      for (const config of collectibleRewardConfigs) {
        let nextRewardScore = collectibleSchedulesRef.current[config.key]
        while (nextRewardScore !== undefined && nextScore >= nextRewardScore) {
          const rewardOption =
            config.rewardOptions[
              Math.floor(Math.random() * config.rewardOptions.length)
            ]
          const occupiedXs = obstaclesRef.current
            .filter((obstacle) => obstacle.progress < 0.2)
            .map((obstacle) => obstacle.x)
          nextCollectibles = [
            ...nextCollectibles,
            {
              id: collectibleIdRef.current++,
              x: pickSurfSpawnX(occupiedXs),
              progress: 0,
              rewardKey: rewardOption.key,
              reward: rewardOption.reward,
            },
          ]
          nextRewardScore = getNextCollectibleScore(
            nextRewardScore,
            config.everyScore,
          )
          collectibleSchedulesRef.current[config.key] = nextRewardScore
        }
      }
      nextCollectibles = nextCollectibles
        .map((collectible) => ({
          ...collectible,
          progress: collectible.progress + courseStep,
        }))
        .filter((collectible) => collectible.progress < 1.12)

      const playerBox = {
        x: playerXRef.current - normalizedPlayerWidth * 0.31,
        y: PLAYER_Y - normalizedPlayerHeight * 0.28,
        width: normalizedPlayerWidth * 0.62,
        height: normalizedPlayerHeight * 0.56,
      }
      const collision = nextObstacles.some((obstacle) => {
        const position = getCoursePosition(obstacle.x, obstacle.progress)
        const collisionScale = obstacle.config.collisionScale || 0.7
        const width =
          (obstacle.config.width / DESIGN_WIDTH) *
          position.scale *
          collisionScale
        const height =
          (obstacle.config.height / DESIGN_HEIGHT) *
          position.scale *
          collisionScale
        return surfBoxesOverlap(playerBox, {
          x: position.x - width / 2,
          y: position.y - height / 2,
          width,
          height,
        })
      })
      if (collision) {
        void finishGame(false, 'Lapras hit an obstacle!')
        return
      }

      const collectedIds = new Set<number>()
      for (const collectible of nextCollectibles) {
        const position = getCoursePosition(collectible.x, collectible.progress)
        const size = (46 / DESIGN_WIDTH) * position.scale
        if (
          surfBoxesOverlap(playerBox, {
            x: position.x - size / 2,
            y: position.y - size / 2,
            width: size,
            height: size * (DESIGN_WIDTH / DESIGN_HEIGHT),
          })
        ) {
          collectedIds.add(collectible.id)
          collectedRewardsRef.current[collectible.rewardKey] =
            (collectedRewardsRef.current[collectible.rewardKey] || 0) + 1
          playSfx('select')
        }
      }
      if (collectedIds.size > 0) {
        nextCollectibles = nextCollectibles.filter(
          (collectible) => !collectedIds.has(collectible.id),
        )
      }
      collectiblesRef.current = nextCollectibles

      if (
        !isEndlessMode &&
        settings.winScore &&
        nextScore >= settings.winScore
      ) {
        void finishGame(true, 'Course complete!')
        return
      }

      setPlayerX(playerXRef.current)
      setScore(nextScore)
      setObstacles(nextObstacles)
      setCollectibles(nextCollectibles)
      setWaterOffset(
        (current) => (current + speedRef.current * deltaSeconds) % 160,
      )
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [
    collectibleRewardConfigs,
    countdown,
    finishGame,
    gameEnded,
    gameStarted,
    isEndlessMode,
    isPageVisible,
    normalizedPlayerHeight,
    normalizedPlayerWidth,
    playSfx,
    settings,
  ])

  const steerToPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (gameEnded || countdown > 0) return
    const bounds = event.currentTarget.getBoundingClientRect()
    targetXRef.current = clampSurfPlayerX(
      (event.clientX - bounds.left) / bounds.width,
      normalizedPlayerWidth,
    )
  }

  const replay = async () => {
    const response = await startGame(encounter.id, true)
    if (response.success) window.location.reload()
    else router.push('/game/explore')
  }

  return (
    <main className="game-night relative flex h-dvh min-h-0 w-full overflow-hidden bg-game-night-canvas text-game-night-ink">
      <Image
        src={settings.scene.backdrop}
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover opacity-55 blur-2xl"
      />
      <div className="absolute inset-0 bg-[#071923]/45" />

      <div
        ref={stageRef}
        role="application"
        aria-label="Lapras Surf. Drag horizontally or use the left and right arrow keys to steer."
        className="relative mx-auto h-dvh w-full max-w-[520px] touch-none overflow-hidden bg-[#1d8da8] shadow-[0_0_60px_rgba(2,20,31,0.65)] select-none"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          steerToPointer(event)
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            steerToPointer(event)
          }
        }}
      >
        <Image
          src={settings.scene.backdrop}
          alt="A sunlit Kanto coastal route"
          fill
          priority
          sizes="(max-width: 520px) 100vw, 520px"
          className="object-cover"
        />

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 top-[38%] opacity-35 mix-blend-screen motion-reduce:hidden"
          style={{
            backgroundImage:
              'repeating-linear-gradient(176deg, transparent 0 34px, rgba(255,255,255,0.3) 36px, transparent 40px 68px)',
            backgroundPosition: `center ${waterOffset}px`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,37,48,0.08),transparent_42%,rgba(3,42,55,0.18))]"
        />

        {obstacles.map((obstacle) => {
          const position = getCoursePosition(obstacle.x, obstacle.progress)
          const width = obstacle.config.width * position.scale
          const height = obstacle.config.height * position.scale
          return (
            <div
              key={obstacle.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x * 100}%`,
                top: `${position.y * 100}%`,
                width,
                height,
              }}
            >
              <Image
                src={obstacle.config.sprite}
                alt=""
                fill
                sizes={`${Math.ceil(width)}px`}
                className="object-contain drop-shadow-[0_10px_9px_rgba(0,36,48,0.28)]"
              />
            </div>
          )
        })}

        {collectibles.map((collectible) => {
          const position = getCoursePosition(
            collectible.x,
            collectible.progress,
          )
          const size = 46 * position.scale
          return (
            <div
              key={collectible.id}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x * 100}%`,
                top: `${position.y * 100}%`,
                width: size,
                height: size,
              }}
            >
              <EndlessCollectibleSprite
                reward={collectible.reward}
                size={size}
              />
            </div>
          )
        })}

        <div
          aria-hidden
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${playerX * 100}%`,
            top: `${PLAYER_Y * 100}%`,
            width: playerWidth,
            height: playerHeight,
          }}
        >
          <div className="absolute left-1/2 top-[62%] h-[78%] w-[115%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.72),rgba(191,242,248,0.28)_36%,transparent_72%)] blur-[2px] motion-reduce:opacity-60" />
          <Image
            src={settings.sprite}
            alt=""
            fill
            priority
            sizes={`${playerWidth}px`}
            className="object-contain [image-rendering:pixelated] drop-shadow-[0_8px_5px_rgba(1,35,47,0.38)]"
          />
        </div>

        <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between gap-3 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            aria-label="Leave Lapras Surf"
            className="pointer-events-auto border border-game-border/70 bg-game-surface/90 text-game-ink shadow-lg backdrop-blur-md"
            onClick={() => router.push('/game/explore')}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="rounded-lg border border-game-border/70 bg-game-surface/90 px-4 py-2 text-center text-game-ink shadow-lg backdrop-blur-md">
            <p className="text-[10px] font-semibold text-game-muted">
              Distance
            </p>
            <p className="font-mono text-lg font-bold leading-none">
              {Math.floor(score)}
              {!isEndlessMode && settings.winScore
                ? ` / ${settings.winScore}`
                : ''}
            </p>
          </div>
          <div className="min-w-11">
            {settings.timeLimit ? (
              <GameTimer timeLeft={timeLeft} totalTime={settings.timeLimit} />
            ) : null}
          </div>
        </header>

        {countdown > 0 && !startError ? (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#071923]/35 px-6 backdrop-blur-[2px]">
            <GameTimer
              timeLeft={countdown}
              totalTime={3}
              size="xl"
              className="text-[#fff8e8] drop-shadow-xl"
              colorOverride="text-[#f0cc75]"
            />
            <p className="mt-5 rounded-lg border border-[#fff8e8]/25 bg-[#102f3a]/75 px-4 py-2 text-center text-sm font-semibold text-[#fff8e8] shadow-lg">
              Drag side to side to steer Lapras
            </p>
          </div>
        ) : null}

        {startError ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#071923]/60 p-6 backdrop-blur-sm">
            <div className="max-w-sm rounded-xl border border-game-border bg-game-surface p-5 text-center text-game-ink shadow-xl">
              <p className="font-semibold">Unable to start</p>
              <p className="mt-2 text-sm text-game-muted">{startError}</p>
              <Button
                className="mt-4"
                onClick={() => router.push('/game/explore')}
              >
                Back to Explore
              </Button>
            </div>
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 text-center">
          <span className="rounded-md bg-[#102f3a]/58 px-3 py-1 text-[11px] font-medium text-[#fff8e8]/80 backdrop-blur-sm">
            Drag to steer · Arrow keys on desktop
          </span>
        </div>
      </div>

      {result ? (
        <RewardResultOverlay
          result={result}
          onClose={() => {
            refreshUser()
            router.push('/game/explore')
          }}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Surf complete' : 'Course ended'}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter.isEligibleForReplay ? (
              <Button size="lg" className="w-full" onClick={replay}>
                Surf again
              </Button>
            ) : undefined
          }
        />
      ) : null}
    </main>
  )
}
