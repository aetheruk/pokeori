'use client'

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  SnakeDirection,
  SnakeGameConfig,
  SnakePosition,
} from '@/data/games/snake/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { usePageVisibility } from '@/hooks/usePageVisibility'
import { getLowestEndlessRewardScore } from '@/utilities/research/endless-milestones'
import {
  advanceSnake,
  canTurn,
  createInitialSnake,
  directionBetween,
  findSafeSnakeCell,
  getSnakeTickMs,
  positionsEqual,
} from '@/utilities/research/snake'
import {
  type EndlessCollectibleRewardConfig,
  EndlessCollectibleSprite,
  getEndlessCollectibleRewardConfigs,
  getNextCollectibleScore,
} from './endless-collectibles'

interface SnakeGameProps {
  encounter: SnakeGameConfig
  initialState?: any
}

interface GridReward {
  id: number
  rewardKey: string
  reward: EndlessCollectibleRewardConfig['rewardOptions'][number]['reward']
  position: SnakePosition
  expiresAt: number
}

const ROTATION: Record<SnakeDirection, number> = {
  right: 0,
  down: 90,
  left: 180,
  up: -90,
}

export function SnakeGame({ encounter, initialState }: SnakeGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const { refreshUser } = useUser()
  const { playSfx } = useAudio()
  const visible = usePageVisibility()
  const settings = encounter.settings
  const { columns, rows } = settings.gridSize
  const initialSnake = useMemo(
    () =>
      createInitialSnake(
        settings.initialPosition,
        settings.initialLength,
        settings.initialDirection,
      ),
    [
      settings.initialDirection,
      settings.initialLength,
      settings.initialPosition,
    ],
  )
  const rewardConfigs = useMemo(
    () => getEndlessCollectibleRewardConfigs(settings),
    [settings],
  )

  const [snake, setSnake] = useState(initialSnake)
  const [food, setFood] = useState<SnakePosition | null>(null)
  const [gridRewards, setGridRewards] = useState<GridReward[]>([])
  const [score, setScore] = useState(0)
  const [foodEaten, setFoodEaten] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'ready' | 'playing' | 'ended'>(
    'loading',
  )
  const [direction, setDirection] = useState(settings.initialDirection)
  const [timeLeft, setTimeLeft] = useState(settings.timeLimit ?? 0)
  const [status, setStatus] = useState('Preparing the tunnel survey.')
  const [startError, setStartError] = useState<string | null>(null)
  const [result, setResult] = useState<any | null>(null)

  const snakeRef = useRef(initialSnake)
  const foodRef = useRef<SnakePosition | null>(null)
  const rewardsRef = useRef<GridReward[]>([])
  const scoreRef = useRef(0)
  const foodEatenRef = useRef(0)
  const directionRef = useRef<SnakeDirection>(settings.initialDirection)
  const bufferedDirectionRef = useRef<SnakeDirection>(settings.initialDirection)
  const endingRef = useRef(false)
  const rewardIdRef = useRef(0)
  const rewardSchedulesRef = useRef<Record<string, number>>({})
  const collectedRewardsRef = useRef<Record<string, number>>({})
  const pointerStartRef = useRef<SnakePosition | null>(null)

  const placeFood = useCallback(
    (nextSnake: SnakePosition[], rewards = rewardsRef.current) => {
      const nextFood = findSafeSnakeCell(columns, rows, [
        nextSnake,
        settings.walls ?? [],
        rewards.map((reward) => reward.position),
      ])
      foodRef.current = nextFood
      setFood(nextFood)
      return nextFood
    },
    [columns, rows, settings.walls],
  )

  const finishGame = useCallback(
    async (forcedSuccess = false) => {
      if (endingRef.current) return
      endingRef.current = true
      setPhase('ended')
      const finalScore = scoreRef.current
      const endless = settings.endless?.enabled === true
      const firstEndlessReward = getLowestEndlessRewardScore({
        milestones: settings.endless?.milestones || [],
        repeatingRewards: settings.endless?.repeatingRewards || [],
      })
      const success =
        forcedSuccess ||
        (endless
          ? firstEndlessReward !== null && finalScore >= firstEndlessReward
          : settings.winScore !== undefined && finalScore >= settings.winScore)

      await submitGameAnswer(success)
      const response = await completeGame(
        encounter.id,
        success,
        finalScore,
        undefined,
        collectedRewardsRef.current,
      )
      const confirmedSuccess = success && response.success
      playSfx(confirmedSuccess ? 'good' : 'bad')
      setStatus(`Survey ended with ${finalScore} points.`)
      setResult({
        success: confirmedSuccess,
        message: endless
          ? `Final score: ${finalScore}`
          : confirmedSuccess
            ? 'Survey complete!'
            : 'Survey incomplete',
        rewards: response.summary,
      })
    },
    [encounter.id, playSfx, settings.endless, settings.winScore],
  )

  const resetLocalGame = useCallback(() => {
    const nextSnake = createInitialSnake(
      settings.initialPosition,
      settings.initialLength,
      settings.initialDirection,
    )
    snakeRef.current = nextSnake
    setSnake(nextSnake)
    scoreRef.current = 0
    setScore(0)
    foodEatenRef.current = 0
    setFoodEaten(0)
    directionRef.current = settings.initialDirection
    bufferedDirectionRef.current = settings.initialDirection
    setDirection(settings.initialDirection)
    rewardsRef.current = []
    setGridRewards([])
    rewardIdRef.current = 0
    collectedRewardsRef.current = {}
    rewardSchedulesRef.current = Object.fromEntries(
      rewardConfigs.map((config) => [
        config.key,
        getNextCollectibleScore(0, config.everyScore),
      ]),
    )
    setTimeLeft(settings.timeLimit ?? 0)
    endingRef.current = false
    setResult(null)
    placeFood(nextSnake, [])
  }, [placeFood, rewardConfigs, settings])

  useEffect(() => {
    let cancelled = false
    void startGame(encounter.id).then((response) => {
      if (cancelled) return
      if (!response.success) {
        setStartError(response.error || 'Unable to start the tunnel survey.')
        setStatus('The tunnel survey could not start.')
        return
      }
      resetLocalGame()
      if (response.restored && response.expiry && settings.timeLimit) {
        setTimeLeft(
          Math.max(0, Math.floor((response.expiry - Date.now()) / 1000)),
        )
      }
      setStartError(null)
      setPhase('ready')
      setStatus('Press Start, Space, or an arrow to guide Onix.')
    })
    return () => {
      cancelled = true
    }
  }, [encounter.id, resetLocalGame, settings.timeLimit])

  const requestTurn = useCallback(
    (nextDirection: SnakeDirection) => {
      if (phase === 'ready') setPhase('playing')
      if (phase !== 'playing' && phase !== 'ready') return
      // Retain at most one turn between simulation ticks.
      if (bufferedDirectionRef.current !== directionRef.current) return
      if (canTurn(directionRef.current, nextDirection)) {
        bufferedDirectionRef.current = nextDirection
      }
    },
    [phase],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyDirections: Partial<Record<string, SnakeDirection>> = {
        ArrowUp: 'up',
        w: 'up',
        W: 'up',
        ArrowDown: 'down',
        s: 'down',
        S: 'down',
        ArrowLeft: 'left',
        a: 'left',
        A: 'left',
        ArrowRight: 'right',
        d: 'right',
        D: 'right',
      }
      if (event.code === 'Space' && phase === 'ready') {
        event.preventDefault()
        setPhase('playing')
        return
      }
      const nextDirection = keyDirections[event.key]
      if (nextDirection) {
        event.preventDefault()
        requestTurn(nextDirection)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [phase, requestTurn])

  const tickMs = getSnakeTickMs(
    settings.tickMs,
    settings.minTickMs,
    settings.speedUpEvery,
    settings.speedUpByMs,
    foodEaten,
  )

  useEffect(() => {
    if (phase !== 'playing' || !visible) return
    const timer = window.setInterval(() => {
      const now = Date.now()
      const activeRewards = rewardsRef.current.filter(
        (reward) => reward.expiresAt > now,
      )
      rewardsRef.current = activeRewards
      setGridRewards(activeRewards)

      const nextDirection = bufferedDirectionRef.current
      directionRef.current = nextDirection
      setDirection(nextDirection)
      const step = advanceSnake({
        snake: snakeRef.current,
        direction: nextDirection,
        food: foodRef.current,
        walls: settings.walls,
        columns,
        rows,
        wrapBoundaries: settings.wrapBoundaries,
      })

      if (step.collision) {
        setStatus(
          step.collision === 'self'
            ? 'Onix crossed its own trail.'
            : 'Onix struck the tunnel wall.',
        )
        void finishGame()
        return
      }

      snakeRef.current = step.snake
      setSnake(step.snake)
      const head = step.snake[0]
      const collected = activeRewards.filter((reward) =>
        positionsEqual(reward.position, head),
      )
      if (collected.length > 0) {
        const remaining = activeRewards.filter(
          (reward) => !positionsEqual(reward.position, head),
        )
        for (const reward of collected) {
          collectedRewardsRef.current[reward.rewardKey] =
            (collectedRewardsRef.current[reward.rewardKey] || 0) + 1
        }
        rewardsRef.current = remaining
        setGridRewards(remaining)
        playSfx('good')
        setStatus('Onix recovered a mineral sample.')
      }

      if (!step.ateFood) return
      const nextFoodCount = foodEatenRef.current + 1
      foodEatenRef.current = nextFoodCount
      setFoodEaten(nextFoodCount)
      const nextScore = scoreRef.current + settings.foodScore
      scoreRef.current = nextScore
      setScore(nextScore)
      playSfx('select')
      setStatus(`Survey score ${nextScore}. Onix grew longer.`)

      let nextRewards = rewardsRef.current
      for (const config of rewardConfigs) {
        const scheduledScore = rewardSchedulesRef.current[config.key]
        if (scheduledScore === undefined || nextScore < scheduledScore) continue
        const rewardCell = findSafeSnakeCell(columns, rows, [
          step.snake,
          settings.walls ?? [],
          nextRewards.map((reward) => reward.position),
        ])
        if (rewardCell) {
          const rewardOption =
            config.rewardOptions[
              Math.floor(Math.random() * config.rewardOptions.length)
            ]
          nextRewards = [
            ...nextRewards,
            {
              id: rewardIdRef.current++,
              rewardKey: rewardOption.key,
              reward: rewardOption.reward,
              position: rewardCell,
              expiresAt: now + (settings.rewardLifetimeMs ?? 8000),
            },
          ]
          rewardsRef.current = nextRewards
          setGridRewards(nextRewards)
          setStatus('A mineral sample surfaced nearby.')
        }
        rewardSchedulesRef.current[config.key] = getNextCollectibleScore(
          scheduledScore,
          config.everyScore,
        )
      }

      const nextFood = placeFood(step.snake, nextRewards)
      const reachedTarget =
        !settings.endless?.enabled &&
        settings.winScore !== undefined &&
        nextScore >= settings.winScore
      if (reachedTarget || nextFood === null) void finishGame(true)
    }, tickMs)
    return () => window.clearInterval(timer)
  }, [
    columns,
    finishGame,
    phase,
    placeFood,
    playSfx,
    rewardConfigs,
    rows,
    settings,
    tickMs,
    visible,
  ])

  useEffect(() => {
    if (phase !== 'playing' || !visible || !settings.timeLimit) return
    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          void finishGame()
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [finishGame, phase, settings.timeLimit, visible])

  const handlePointerDown = (event: React.PointerEvent) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY }
  }
  const handlePointerUp = (event: React.PointerEvent) => {
    const start = pointerStartRef.current
    pointerStartRef.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) {
      if (phase === 'ready') setPhase('playing')
      return
    }
    requestTurn(
      Math.abs(dx) > Math.abs(dy)
        ? dx > 0
          ? 'right'
          : 'left'
        : dy > 0
          ? 'down'
          : 'up',
    )
  }

  const occupied = useMemo(
    () =>
      new Map(
        snake.map((segment, index) => [`${segment.x}:${segment.y}`, index]),
      ),
    [snake],
  )
  const wallSet = useMemo(
    () => new Set((settings.walls ?? []).map((wall) => `${wall.x}:${wall.y}`)),
    [settings.walls],
  )
  const rewardMap = useMemo(
    () =>
      new Map(
        gridRewards.map((reward) => [
          `${reward.position.x}:${reward.position.y}`,
          reward,
        ]),
      ),
    [gridRewards],
  )

  const rotationForSegment = (index: number) => {
    if (index === 0) return ROTATION[direction]
    const towardHead = directionBetween(snake[index], snake[index - 1])
    return ROTATION[towardHead]
  }

  const playAgain = async () => {
    const response = await startGame(encounter.id, true)
    if (!response.success) {
      router.push('/game/explore')
      return
    }
    resetLocalGame()
    setPhase('ready')
    setStatus('Press Start, Space, or an arrow to guide Onix.')
  }

  return (
    <div className="game-activity-chrome relative flex min-h-dvh flex-col overflow-hidden bg-game-canvas text-game-ink">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${encounter.background})` }}
      />
      <header className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between gap-3 border-b border-game-line bg-game-paper/95 px-4 py-3 shadow-sm">
        <div>
          <p className="text-xs font-bold text-game-muted">
            Field trial · Tunnel survey
          </p>
          <h1 className="text-lg font-extrabold sm:text-xl">
            {encounter.name}
          </h1>
        </div>
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="rounded-full border border-game-line bg-game-raised px-3 py-1.5">
            {score} pts
          </span>
          {settings.timeLimit ? (
            <GameTimer timeLeft={timeLeft} totalTime={settings.timeLimit} />
          ) : null}
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-3 p-3 sm:p-5">
        <div
          className="relative aspect-square w-full max-w-[min(72dvh,38rem)] touch-none overflow-hidden rounded-xl border-4 border-game-ink/70 bg-[#3f4939] p-1 shadow-[0_8px_24px_rgba(41,53,50,0.24)]"
          role="application"
          aria-label="Onix Snake playfield. Swipe or use arrow keys to turn."
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div
            className="grid h-full w-full gap-px rounded-md bg-[#252f29] p-1"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns * rows }, (_, cellIndex) => {
              const x = cellIndex % columns
              const y = Math.floor(cellIndex / columns)
              const key = `${x}:${y}`
              const segmentIndex = occupied.get(key)
              const reward = rewardMap.get(key)
              const isFood = food?.x === x && food.y === y
              const isWall = wallSet.has(key)
              return (
                <div
                  key={key}
                  className={`relative aspect-square min-w-0 overflow-hidden ${
                    (x + y) % 2 === 0 ? 'bg-[#6f7658]' : 'bg-[#646c50]'
                  } ${isWall ? 'bg-[#30372f]' : ''}`}
                >
                  {segmentIndex !== undefined ? (
                    <SnakeSegmentImage
                      src={
                        segmentIndex === 0
                          ? settings.sprites.head
                          : segmentIndex === snake.length - 1
                            ? settings.sprites.tail
                            : settings.sprites.body
                      }
                      kind={
                        segmentIndex === 0
                          ? 'head'
                          : segmentIndex === snake.length - 1
                            ? 'tail'
                            : 'body'
                      }
                      rotation={rotationForSegment(segmentIndex)}
                    />
                  ) : reward ? (
                    <div className="absolute inset-[12%] animate-pulse motion-reduce:animate-none">
                      <EndlessCollectibleSprite
                        reward={reward.reward}
                        size={36}
                      />
                    </div>
                  ) : isFood ? (
                    settings.sprites.food ? (
                      <Image
                        src={settings.sprites.food}
                        alt="Cave food"
                        fill
                        sizes="36px"
                        className="object-contain"
                      />
                    ) : (
                      <div className="absolute inset-[25%] rotate-45 rounded-sm border-2 border-[#ffe4a3] bg-game-ochre shadow-sm" />
                    )
                  ) : null}
                </div>
              )
            })}
          </div>

          {phase !== 'playing' ? (
            <div className="absolute inset-0 grid place-items-center bg-game-ink/70 p-6 text-center">
              <div className="game-panel max-w-sm space-y-3 bg-game-raised p-5">
                <p className="font-bold">
                  {phase === 'loading'
                    ? 'Preparing survey…'
                    : startError || 'Guide Onix through the tunnel.'}
                </p>
                {phase === 'ready' ? (
                  <Button
                    className="min-h-11 w-full"
                    onClick={() => setPhase('playing')}
                  >
                    Start survey
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <p
          className="min-h-5 text-center text-sm font-semibold text-game-muted"
          aria-live="polite"
        >
          {!visible && phase === 'playing'
            ? 'Survey paused while this page is hidden.'
            : status}
        </p>

        <div
          className="grid grid-cols-3 grid-rows-2 gap-1 sm:hidden"
          role="group"
          aria-label="Direction controls"
        >
          <DirectionButton
            label="Turn up"
            onClick={() => requestTurn('up')}
            className="col-start-2"
          >
            <ArrowUp />
          </DirectionButton>
          <DirectionButton
            label="Turn left"
            onClick={() => requestTurn('left')}
            className="row-start-2"
          >
            <ArrowLeft />
          </DirectionButton>
          <DirectionButton
            label="Turn down"
            onClick={() => requestTurn('down')}
            className="row-start-2"
          >
            <ArrowDown />
          </DirectionButton>
          <DirectionButton
            label="Turn right"
            onClick={() => requestTurn('right')}
            className="row-start-2"
          >
            <ArrowRight />
          </DirectionButton>
        </div>
      </main>

      {result ? (
        <RewardResultOverlay
          result={result}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Survey complete' : 'Survey ended'}
          onClose={() => {
            refreshUser()
            router.push('/game/explore')
          }}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter.isEligibleForReplay ? (
              <Button
                size="lg"
                className="w-full"
                onClick={() => void playAgain()}
              >
                Play again
              </Button>
            ) : undefined
          }
        />
      ) : null}
    </div>
  )
}

function SnakeSegmentImage({
  src,
  kind,
  rotation,
}: {
  src: string
  kind: 'head' | 'body' | 'tail'
  rotation: number
}) {
  const [imageAvailable, setImageAvailable] = useState(!src.startsWith('css:'))

  return (
    <div
      className="absolute inset-[3%]"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {imageAvailable ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="36px"
          draggable={false}
          className="object-contain drop-shadow-sm"
          onError={() => setImageAvailable(false)}
        />
      ) : kind === 'head' ? (
        <Image
          src="/sprites/pokemon/home/normal/95.avif"
          alt=""
          fill
          sizes="36px"
          draggable={false}
          className="object-contain drop-shadow-sm"
        />
      ) : (
        <div
          className={`absolute border-2 border-[#bfc3b4] bg-[#777d73] shadow-inner ${
            kind === 'tail'
              ? 'inset-[24%] rotate-45 rounded-sm'
              : 'inset-[10%] rounded-full'
          }`}
        />
      )}
    </div>
  )
}

function DirectionButton({
  label,
  onClick,
  className = '',
  children,
}: {
  label: string
  onClick: () => void
  className?: string
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      onClick={onClick}
      className={`h-12 w-12 border-game-line bg-game-raised text-game-ink ${className}`}
    >
      {children}
    </Button>
  )
}
