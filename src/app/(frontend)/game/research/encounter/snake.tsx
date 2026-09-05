'use client'

import Image from 'next/image'
import { DoorOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  completeGame,
  startGame,
  submitGameAnswer,
} from '@/app/(frontend)/game/games/actions'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type {
  SnakeGameConfig,
  SnakePosition,
} from '@/data/games/snake/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { usePageVisibility } from '@/hooks/usePageVisibility'
import { getLowestEndlessRewardScore } from '@/utilities/research/endless-milestones'
import {
  advanceContinuousSnake,
  createInitialSnake,
  findSafeSnakePosition,
  getSegmentHeading,
  getSnakeSpeed,
  growSnake,
  headingToward,
  normalizeAngle,
  sweptCircleIntersects,
  type SnakeCircle,
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

interface SceneReward {
  id: number
  rewardKey: string
  reward: EndlessCollectibleRewardConfig['rewardOptions'][number]['reward']
  position: SnakePosition
  expiresAt: number
}

type GamePhase = 'loading' | 'ready' | 'playing' | 'ended'

export function SnakeGame({ encounter, initialState }: SnakeGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const { refreshUser } = useUser()
  const { playSfx } = useAudio()
  const visible = usePageVisibility()
  const settings = encounter.settings
  const stageRef = useRef<HTMLElement>(null)
  const initialSnake = useMemo(
    () =>
      createInitialSnake(
        settings.initialPosition,
        settings.initialLength,
        settings.initialHeading,
        settings.segmentSpacing,
      ),
    [settings],
  )
  const rewardConfigs = useMemo(
    () => getEndlessCollectibleRewardConfigs(settings),
    [settings],
  )

  const [snake, setSnake] = useState(initialSnake)
  const [food, setFood] = useState<SnakePosition | null>(null)
  const [sceneRewards, setSceneRewards] = useState<SceneReward[]>([])
  const [score, setScore] = useState(0)
  const [foodEaten, setFoodEaten] = useState(0)
  const [heading, setHeading] = useState(settings.initialHeading)
  const [phase, setPhase] = useState<GamePhase>('loading')
  const [timeLeft, setTimeLeft] = useState(settings.timeLimit ?? 0)
  const [status, setStatus] = useState('Preparing the tunnel survey.')
  const [startError, setStartError] = useState<string | null>(null)
  const [result, setResult] = useState<any | null>(null)

  const snakeRef = useRef(initialSnake)
  const foodRef = useRef<SnakePosition | null>(null)
  const rewardsRef = useRef<SceneReward[]>([])
  const headingRef = useRef(settings.initialHeading)
  const targetHeadingRef = useRef(settings.initialHeading)
  const pointerTargetRef = useRef<SnakePosition | null>(null)
  const scoreRef = useRef(0)
  const foodEatenRef = useRef(0)
  const lastFrameRef = useRef(0)
  const animationRef = useRef<number | null>(null)
  const endingRef = useRef(false)
  const rewardIdRef = useRef(0)
  const rewardSchedulesRef = useRef<Record<string, number>>({})
  const collectedRewardsRef = useRef<Record<string, number>>({})
  const pressedKeysRef = useRef(new Set<string>())

  const pickupCircles = useCallback(
    (
      nextSnake: SnakePosition[],
      rewards: SceneReward[],
      includeFood = false,
    ): SnakeCircle[] => [
      ...nextSnake.map((position, index) => ({
        ...position,
        radius: index === 0 ? settings.headRadius : settings.bodyRadius,
      })),
      ...(settings.obstacles ?? []),
      ...rewards.map((reward) => ({
        ...reward.position,
        radius: settings.rewardRadius,
      })),
      ...(includeFood && foodRef.current
        ? [{ ...foodRef.current, radius: settings.foodRadius }]
        : []),
    ],
    [settings],
  )

  const placeFood = useCallback(
    (nextSnake: SnakePosition[], rewards: SceneReward[]) => {
      const nextFood = findSafeSnakePosition(
        settings.playfield,
        settings.foodRadius,
        pickupCircles(nextSnake, rewards),
        settings.minimumSpawnDistance,
        nextSnake[0],
      )
      foodRef.current = nextFood
      setFood(nextFood)
      return nextFood
    },
    [pickupCircles, settings],
  )

  const finishGame = useCallback(
    async (forcedSuccess = false) => {
      if (endingRef.current) return
      endingRef.current = true
      setPhase('ended')
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      const finalScore = scoreRef.current
      const endless = settings.endless?.enabled === true
      const firstReward = getLowestEndlessRewardScore({
        milestones: settings.endless?.milestones ?? [],
        repeatingRewards: settings.endless?.repeatingRewards ?? [],
      })
      const success =
        forcedSuccess ||
        (endless
          ? firstReward !== null && finalScore >= firstReward
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
    }, [encounter.id, playSfx, settings])

  const resetLocalGame = useCallback(() => {
    const nextSnake = createInitialSnake(
      settings.initialPosition,
      settings.initialLength,
      settings.initialHeading,
      settings.segmentSpacing,
    )
    snakeRef.current = nextSnake
    setSnake(nextSnake)
    headingRef.current = normalizeAngle(settings.initialHeading)
    targetHeadingRef.current = normalizeAngle(settings.initialHeading)
    pointerTargetRef.current = null
    setHeading(normalizeAngle(settings.initialHeading))
    scoreRef.current = 0
    setScore(0)
    foodEatenRef.current = 0
    setFoodEaten(0)
    rewardsRef.current = []
    setSceneRewards([])
    rewardIdRef.current = 0
    collectedRewardsRef.current = {}
    rewardSchedulesRef.current = Object.fromEntries(
      rewardConfigs.map((config) => [
        config.key,
        getNextCollectibleScore(0, config.everyScore),
      ]),
    )
    lastFrameRef.current = 0
    endingRef.current = false
    setResult(null)
    setTimeLeft(settings.timeLimit ?? 0)
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
      setStatus('Press Start or Space, then steer toward the cave floor.')
    })
    return () => {
      cancelled = true
    }
  }, [encounter.id, resetLocalGame, settings.timeLimit])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(event.key)) {
        event.preventDefault()
        pointerTargetRef.current = null
        pressedKeysRef.current.add(event.key.toLowerCase())
      }
      if (event.code === 'Space' && phase === 'ready') {
        event.preventDefault()
        setPhase('playing')
      }
    }
    const onKeyUp = (event: KeyboardEvent) => {
      pressedKeysRef.current.delete(event.key.toLowerCase())
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [phase])

  const steerTowardPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (phase !== 'playing') return
    const bounds = stageRef.current?.getBoundingClientRect()
    if (!bounds) return
    const target = {
      x: ((event.clientX - bounds.left) / bounds.width) * settings.playfield.width,
      y: ((event.clientY - bounds.top) / bounds.height) * settings.playfield.height,
    }
    pointerTargetRef.current = target
    targetHeadingRef.current = headingToward(snakeRef.current[0], target)
  }

  useEffect(() => {
    if (phase !== 'playing' || !visible) return

    const frame = (timestamp: number) => {
      if (endingRef.current) return
      if (lastFrameRef.current === 0) lastFrameRef.current = timestamp
      const deltaSeconds = Math.min(0.05, (timestamp - lastFrameRef.current) / 1000)
      lastFrameRef.current = timestamp

      const keys = pressedKeysRef.current
      const steerLeft = keys.has('arrowleft') || keys.has('a')
      const steerRight = keys.has('arrowright') || keys.has('d')
      if (steerLeft !== steerRight) {
        targetHeadingRef.current = normalizeAngle(
          headingRef.current + (steerLeft ? -1 : 1) * settings.turnRate * deltaSeconds,
        )
      } else if (pointerTargetRef.current) {
        targetHeadingRef.current = headingToward(
          snakeRef.current[0],
          pointerTargetRef.current,
        )
      }

      const speed = getSnakeSpeed(
        settings.moveSpeed,
        settings.maxSpeed,
        settings.speedUpEvery,
        settings.speedUpBy,
        foodEatenRef.current,
      )
      const previousHead = snakeRef.current[0]
      const step = advanceContinuousSnake({
        snake: snakeRef.current,
        heading: headingRef.current,
        targetHeading: targetHeadingRef.current,
        speed,
        turnRate: settings.turnRate,
        deltaSeconds,
        segmentSpacing: settings.segmentSpacing,
        headRadius: settings.headRadius,
        bodyRadius: settings.bodyRadius,
        playfield: settings.playfield,
        obstacles: settings.obstacles,
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

      const now = Date.now()
      let activeRewards = rewardsRef.current.filter(
        (reward) => reward.expiresAt > now,
      )
      let nextSnake = step.snake
      headingRef.current = step.heading
      setHeading(step.heading)

      const headCircle = { ...nextSnake[0], radius: settings.headRadius }
      const collected = activeRewards.filter((reward) =>
        sweptCircleIntersects(previousHead, headCircle, settings.headRadius, {
          ...reward.position,
          radius: settings.rewardRadius,
        }, settings.maxSpeed * 0.06),
      )
      if (collected.length > 0) {
        const ids = new Set(collected.map((reward) => reward.id))
        activeRewards = activeRewards.filter((reward) => !ids.has(reward.id))
        for (const reward of collected) {
          collectedRewardsRef.current[reward.rewardKey] =
            (collectedRewardsRef.current[reward.rewardKey] || 0) + 1
        }
        playSfx('good')
        setStatus('Onix recovered a mineral sample.')
      }

      const ateFood =
        foodRef.current !== null &&
        sweptCircleIntersects(previousHead, headCircle, settings.headRadius, {
          ...foodRef.current,
          radius: settings.foodRadius,
        }, settings.maxSpeed * 0.06)
      if (ateFood) {
        nextSnake = growSnake(nextSnake)
        const nextFoodCount = foodEatenRef.current + 1
        foodEatenRef.current = nextFoodCount
        setFoodEaten(nextFoodCount)
        const nextScore = scoreRef.current + settings.foodScore
        scoreRef.current = nextScore
        setScore(nextScore)
        playSfx('select')
        setStatus(`Survey score ${nextScore}. Onix grew longer.`)

        for (const config of rewardConfigs) {
          const scheduledScore = rewardSchedulesRef.current[config.key]
          if (scheduledScore === undefined || nextScore < scheduledScore) continue
          const position = findSafeSnakePosition(
            settings.playfield,
            settings.rewardRadius,
            pickupCircles(nextSnake, activeRewards, true),
            settings.minimumSpawnDistance,
            nextSnake[0],
          )
          if (position) {
            const option =
              config.rewardOptions[
                Math.floor(Math.random() * config.rewardOptions.length)
              ]
            activeRewards.push({
              id: rewardIdRef.current++,
              rewardKey: option.key,
              reward: option.reward,
              position,
              expiresAt: now + (settings.rewardLifetimeMs ?? 8000),
            })
            setStatus('A mineral sample surfaced nearby.')
          }
          rewardSchedulesRef.current[config.key] = getNextCollectibleScore(
            scheduledScore,
            config.everyScore,
          )
        }

        const nextFood = placeFood(nextSnake, activeRewards)
        const reachedTarget =
          !settings.endless?.enabled &&
          settings.winScore !== undefined &&
          nextScore >= settings.winScore
        if (reachedTarget || nextFood === null) {
          snakeRef.current = nextSnake
          setSnake(nextSnake)
          rewardsRef.current = activeRewards
          setSceneRewards([...activeRewards])
          void finishGame(true)
          return
        }
      }

      snakeRef.current = nextSnake
      rewardsRef.current = activeRewards
      setSnake(nextSnake)
      setSceneRewards([...activeRewards])
      animationRef.current = requestAnimationFrame(frame)
    }

    lastFrameRef.current = 0
    animationRef.current = requestAnimationFrame(frame)
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [
    finishGame,
    phase,
    pickupCircles,
    placeFood,
    playSfx,
    rewardConfigs,
    settings,
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

  const playAgain = async () => {
    const response = await startGame(encounter.id, true)
    if (!response.success) {
      router.push('/game/explore')
      return
    }
    resetLocalGame()
    setPhase('ready')
    setStatus('Press Start or Space, then steer toward the cave floor.')
  }

  return (
    <div
      className="game-activity-chrome relative h-dvh touch-none overflow-hidden bg-cover bg-center text-game-raised select-none"
      style={{ backgroundImage: `url(${encounter.background})` }}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest('button')) return
        event.currentTarget.setPointerCapture(event.pointerId)
        steerTowardPointer(event)
      }}
      onPointerMove={(event) => {
        if ((event.target as HTMLElement).closest('button')) return
        steerTowardPointer(event)
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-game-ink/25" />
      <header className="pointer-events-none absolute inset-x-0 top-0 z-[60] flex items-start justify-end gap-2 p-3 sm:p-5">
        <div className="flex items-center gap-2 rounded-full border border-game-line/50 bg-game-ink/80 px-3 py-2 font-mono text-sm font-bold text-game-raised shadow-md backdrop-blur-sm">
          <output>{score} pts</output>
          {settings.timeLimit ? (
            <>
              <span aria-hidden className="h-4 w-px bg-game-line/50" />
              <span>{timeLeft}s</span>
            </>
          ) : null}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="pointer-events-auto bg-game-raised/95 text-game-ink shadow-md backdrop-blur-sm"
          aria-label="Leave game"
          onClick={() => router.push('/game/explore')}
        >
          <DoorOpen className="size-5" />
        </Button>
      </header>
      <section
        ref={stageRef}
        aria-label="Onix tunnel survey playfield"
        aria-describedby="snake-controls snake-status"
        className="absolute left-1/2 top-1/2 z-10 h-[min(100dvh,179.487vw)] w-[min(100vw,55.714dvh)] -translate-x-1/2 -translate-y-1/2 touch-none overflow-hidden"
      >
        {(settings.obstacles ?? []).map((obstacle, index) => (
          <div
            key={`${obstacle.x}:${obstacle.y}:${index}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-game-line/30 bg-game-ink/75 shadow-lg"
            style={sceneCircleStyle(obstacle, obstacle.radius * 2, settings.playfield)}
          />
        ))}

        {food ? (
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={sceneCircleStyle(food, settings.foodRadius * 2, settings.playfield)}
          >
            {settings.sprites.food ? (
              <Image src={settings.sprites.food} alt="Cave food" fill sizes="48px" className="object-contain" />
            ) : (
              <div className="absolute inset-[22%] rotate-45 rounded-sm border-2 border-[#ffe4a3] bg-game-ochre shadow-md" />
            )}
          </div>
        ) : null}

        {sceneRewards.map((reward) => (
          <div
            key={reward.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-game-ochre/70 bg-game-ochre/20 shadow-[0_0_14px_rgba(181,138,67,0.48)]"
            style={sceneCircleStyle(reward.position, settings.rewardRadius * 2, settings.playfield)}
          >
            <div className="pointer-events-none absolute inset-[10%] rounded-full border border-amber-200/35 motion-safe:animate-ping" />
            <div className="absolute inset-[20%]">
              <EndlessCollectibleSprite reward={reward.reward} size={50} />
            </div>
          </div>
        ))}

        {[...snake].reverse().map((segment, reverseIndex) => {
          const index = snake.length - 1 - reverseIndex
          const kind = index === 0 ? 'head' : index === snake.length - 1 ? 'tail' : 'body'
          const segmentHeading =
            kind === 'head'
              ? heading
              : getSegmentHeading(segment, snake[index - 1]) +
                (kind === 'tail' ? 180 : 0)
          const radius = kind === 'head' ? settings.headRadius : settings.bodyRadius
          return (
            <SnakeSegment
              key={index}
              src={settings.sprites[kind]}
              kind={kind}
              position={segment}
              heading={segmentHeading}
              radius={radius}
              playfield={settings.playfield}
            />
          )
        })}

        {phase === 'loading' || phase === 'ready' ? (
          <div className="absolute inset-0 z-50 grid place-items-center bg-game-ink/45 p-6 text-center">
            {phase === 'ready' ? (
              <Button className="pointer-events-auto min-h-11 min-w-40 shadow-lg" onClick={() => setPhase('playing')}>
                Start
              </Button>
            ) : (
              <p className="rounded-lg bg-game-ink/80 px-3 py-2 text-sm font-bold">
                {startError || 'Preparing…'}
              </p>
            )}
          </div>
        ) : null}
      </section>

      <p id="snake-controls" className="sr-only">
        Move the pointer or drag to steer. Left and Right arrow keys or A and D curve Onix.
      </p>
      <p id="snake-status" className="sr-only" aria-live="polite">
        {!visible && phase === 'playing' ? 'Survey paused.' : status}
      </p>

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
            initialState?.encounter?.isEligibleForReplay || encounter.isEligibleForReplay ? (
              <Button size="lg" className="w-full" onClick={() => void playAgain()}>
                Play again
              </Button>
            ) : undefined
          }
        />
      ) : null}
    </div>
  )
}

function sceneCircleStyle(
  position: SnakePosition,
  diameter: number,
  playfield: { width: number; height: number },
) {
  return {
    left: `${(position.x / playfield.width) * 100}%`,
    top: `${(position.y / playfield.height) * 100}%`,
    width: `${(diameter / playfield.width) * 100}%`,
    aspectRatio: '1',
  }
}

function SnakeSegment({
  src,
  kind,
  position,
  heading,
  radius,
  playfield,
}: {
  src: string
  kind: 'head' | 'body' | 'tail'
  position: SnakePosition
  heading: number
  radius: number
  playfield: { width: number; height: number }
}) {
  const [imageAvailable, setImageAvailable] = useState(true)
  const widthMultiplier = kind === 'tail' ? 2.1 : 2
  return (
    <div
      className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
      style={{
        ...sceneCircleStyle(position, radius * widthMultiplier, playfield),
        transform: `translate(-50%, -50%) rotate(${heading}deg)`,
      }}
    >
      {imageAvailable ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="80px"
          draggable={false}
          className="object-contain drop-shadow-md"
          onError={() => setImageAvailable(false)}
        />
      ) : kind === 'head' ? (
        <Image
          src="/sprites/pokemon/home/normal/95.avif"
          alt=""
          fill
          sizes="80px"
          draggable={false}
          className="object-contain drop-shadow-md"
        />
      ) : (
        <div className={`absolute border-2 border-[#bfc3b4] bg-[#777d73] shadow-inner ${kind === 'tail' ? 'inset-[24%] rotate-45 rounded-sm' : 'inset-[10%] rounded-full'}`} />
      )}
    </div>
  )
}
