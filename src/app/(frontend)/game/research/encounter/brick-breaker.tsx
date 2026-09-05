'use client'

import { DoorOpen, Heart, Pickaxe } from 'lucide-react'
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
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { BrickBreakerGameConfig } from '@/data/games/brick-breaker/types'
import type { LocationReward } from '@/data/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { usePageVisibility } from '@/hooks/usePageVisibility'
import {
  type BrickBreakerBall,
  type BrickBreakerBrick,
  brickBreakerBallOverlapsRect,
  clampBrickBreakerPaddleX,
  createBrickBreakerBoard,
  getBrickBreakerLaunchBall,
  stepBrickBreaker,
} from '@/utilities/research/brick-breaker'
import {
  EndlessCollectibleSprite,
  getEndlessCollectibleRewardConfigs,
  getNextCollectibleScore,
} from './endless-collectibles'

interface BrickBreakerGameProps {
  encounter: BrickBreakerGameConfig
  initialState?: any
}

interface RewardSpecimen {
  id: number
  rewardKey: string
  reward: LocationReward
  x: number
  y: number
  size: number
  expiresAt: number
}

function hasRewards(summary: any) {
  return Boolean(
    summary &&
      [summary.items, summary.pokemon, summary.currency, summary.cards].some(
        (entries) => entries?.length,
      ),
  )
}

export function BrickBreakerGame({
  encounter,
  initialState,
}: BrickBreakerGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const isPageVisible = usePageVisibility()
  const settings = encounter.settings
  const { width, height } = settings.playfield
  const isEndless = settings.endless?.enabled === true
  const paddleY = height - 48
  const rewardConfigs = useMemo(
    () => getEndlessCollectibleRewardConfigs(settings),
    [settings],
  )

  const stageRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const lastFrameRef = useRef(0)
  const keysRef = useRef(new Set<string>())
  const paddleXRef = useRef((width - settings.paddle.width) / 2)
  const ballRef = useRef<BrickBreakerBall | null>(null)
  const bricksRef = useRef<BrickBreakerBrick[]>([])
  const dockedRef = useRef(true)
  const scoreRef = useRef(0)
  const livesRef = useRef(settings.lives)
  const waveRef = useRef(1)
  const specimensRef = useRef<RewardSpecimen[]>([])
  const specimenIdRef = useRef(0)
  const schedulesRef = useRef<Record<string, number>>({})
  const collectedRef = useRef<Record<string, number>>({})
  const endingRef = useRef(false)

  const [started, setStarted] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [ended, setEnded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(settings.lives)
  const [wave, setWave] = useState(1)
  const [timeLeft, setTimeLeft] = useState(settings.timeLimit || 0)
  const [paddleX, setPaddleX] = useState(paddleXRef.current)
  const [ball, setBall] = useState<BrickBreakerBall | null>(null)
  const [bricks, setBricks] = useState<BrickBreakerBrick[]>([])
  const [docked, setDocked] = useState(true)
  const [specimens, setSpecimens] = useState<RewardSpecimen[]>([])
  const [result, setResult] = useState<any>(null)

  const resetRound = useCallback(() => {
    const x = (width - settings.paddle.width) / 2
    const paddle = {
      x,
      y: paddleY,
      width: settings.paddle.width,
      height: settings.paddle.height,
    }
    const nextBall = getBrickBreakerLaunchBall(
      paddle,
      settings.ball.radius,
      settings.ball.initialSpeed,
    )
    const nextBricks = createBrickBreakerBoard(settings)
    paddleXRef.current = x
    ballRef.current = nextBall
    bricksRef.current = nextBricks
    dockedRef.current = true
    scoreRef.current = 0
    livesRef.current = settings.lives
    waveRef.current = 1
    specimensRef.current = []
    specimenIdRef.current = 0
    collectedRef.current = {}
    schedulesRef.current = Object.fromEntries(
      rewardConfigs.map((config) => [
        config.key,
        getNextCollectibleScore(0, config.everyScore),
      ]),
    )
    endingRef.current = false
    lastFrameRef.current = 0
    setPaddleX(x)
    setBall(nextBall)
    setBricks(nextBricks)
    setDocked(true)
    setScore(0)
    setLives(settings.lives)
    setWave(1)
    setSpecimens([])
    setCountdown(3)
    setEnded(false)
    setResult(null)
  }, [paddleY, rewardConfigs, settings, width])

  const begin = useCallback(async () => {
    const response = await startGame(encounter.id)
    if (!response.success) {
      setError(response.error || 'The mineral survey could not begin.')
      return
    }
    resetRound()
    setError(null)
    setStarted(true)
    if (response.restored && response.expiry && settings.timeLimit) {
      setTimeLeft(
        Math.max(0, Math.floor((response.expiry - Date.now()) / 1000)),
      )
    } else setTimeLeft(settings.timeLimit || 0)
  }, [encounter.id, resetRound, settings.timeLimit])

  useEffect(() => {
    if (!started) void begin()
  }, [begin, started])

  const finish = useCallback(
    async (success: boolean, message: string) => {
      if (endingRef.current) return
      endingRef.current = true
      setEnded(true)
      playSfx(success ? 'good' : 'bad')
      await submitGameAnswer(success)
      const response = await completeGame(
        encounter.id,
        success,
        Math.floor(scoreRef.current),
        undefined,
        collectedRef.current,
      )
      const earned = hasRewards(response.summary)
      setResult({
        success: isEndless ? earned : success,
        message:
          response.success === false
            ? response.error || 'The survey could not be recorded.'
            : isEndless
              ? `Survey score: ${Math.floor(scoreRef.current)}`
              : message,
        rewards: response.summary,
      })
    },
    [encounter.id, isEndless, playSfx],
  )

  const launch = useCallback(() => {
    if (!started || ended || countdown > 0 || !dockedRef.current) return
    dockedRef.current = false
    setDocked(false)
    playSfx('select')
  }, [countdown, ended, playSfx, started])

  useEffect(() => {
    if (!started || ended || countdown <= 0 || !isPageVisible) return
    const timer = window.setTimeout(
      () => setCountdown((value) => value - 1),
      1000,
    )
    return () => window.clearTimeout(timer)
  }, [countdown, ended, isPageVisible, started])

  useEffect(() => {
    if (!settings.timeLimit || ended || countdown > 0 || !isPageVisible) return
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          void finish(false, 'The survey timer expired.')
          return 0
        }
        return value - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [countdown, ended, finish, isPageVisible, settings.timeLimit])

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'd', ' '].includes(event.key)) {
        event.preventDefault()
        if (event.key === ' ') launch()
        else keysRef.current.add(event.key.toLowerCase())
      }
    }
    const up = (event: KeyboardEvent) =>
      keysRef.current.delete(event.key.toLowerCase())
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [launch])

  useEffect(() => {
    if (!isPageVisible) lastFrameRef.current = 0
  }, [isPageVisible])

  useEffect(() => {
    if (!started || ended || countdown > 0 || !isPageVisible) return

    const loop = (now: number) => {
      if (!lastFrameRef.current) lastFrameRef.current = now
      const delta = Math.min(0.04, (now - lastFrameRef.current) / 1000)
      lastFrameRef.current = now
      const left = keysRef.current.has('arrowleft') || keysRef.current.has('a')
      const right =
        keysRef.current.has('arrowright') || keysRef.current.has('d')
      if (left !== right) {
        paddleXRef.current = clampBrickBreakerPaddleX(
          paddleXRef.current + (right ? 1 : -1) * settings.paddle.speed * delta,
          settings.paddle.width,
          width,
        )
      }
      const paddle = {
        x: paddleXRef.current,
        y: paddleY,
        width: settings.paddle.width,
        height: settings.paddle.height,
      }

      if (dockedRef.current) {
        ballRef.current = getBrickBreakerLaunchBall(
          paddle,
          settings.ball.radius,
          Math.min(
            settings.ball.maxSpeed,
            settings.ball.initialSpeed +
              (waveRef.current - 1) *
                (settings.endless?.waveSpeedIncrease || 0),
          ),
        )
      } else if (ballRef.current) {
        const stepped = stepBrickBreaker(
          ballRef.current,
          bricksRef.current,
          paddle,
          settings,
          delta,
        )
        ballRef.current = stepped.ball
        bricksRef.current = stepped.bricks
        if (stepped.hits) {
          scoreRef.current += stepped.hits * settings.pointsPerHit
          playSfx('select')
        }

        let nextSpecimens = specimensRef.current.filter(
          (specimen) => specimen.expiresAt > now,
        )
        for (const config of rewardConfigs) {
          let target = schedulesRef.current[config.key]
          while (target !== undefined && scoreRef.current >= target) {
            const option =
              config.rewardOptions[
                Math.floor(Math.random() * config.rewardOptions.length)
              ]
            nextSpecimens.push({
              id: specimenIdRef.current++,
              rewardKey: option.key,
              reward: option.reward,
              x: 42 + Math.random() * (width - 84),
              y:
                settings.boardTop +
                40 +
                Math.random() * Math.min(210, height * 0.35),
              size: 34,
              expiresAt: now + (settings.rewardLifetimeMs || 8000),
            })
            target = getNextCollectibleScore(target, config.everyScore)
            schedulesRef.current[config.key] = target
          }
        }
        const collected = new Set<number>()
        for (const specimen of nextSpecimens) {
          if (
            ballRef.current &&
            brickBreakerBallOverlapsRect(ballRef.current, {
              x: specimen.x - specimen.size / 2,
              y: specimen.y - specimen.size / 2,
              width: specimen.size,
              height: specimen.size,
            })
          ) {
            collected.add(specimen.id)
            collectedRef.current[specimen.rewardKey] =
              (collectedRef.current[specimen.rewardKey] || 0) + 1
            playSfx('good')
          }
        }
        if (collected.size)
          nextSpecimens = nextSpecimens.filter(
            (item) => !collected.has(item.id),
          )
        specimensRef.current = nextSpecimens

        if (stepped.lost) {
          livesRef.current -= 1
          if (livesRef.current <= 0) {
            void finish(false, 'The final survey ball was lost.')
            return
          }
          dockedRef.current = true
          setDocked(true)
          playSfx('bad')
        } else if (stepped.cleared) {
          if (!isEndless) {
            void finish(true, 'All mineral samples cleared!')
            return
          }
          waveRef.current += 1
          bricksRef.current = createBrickBreakerBoard(settings)
          dockedRef.current = true
          setDocked(true)
          playSfx('good')
        }
      }

      setPaddleX(paddleXRef.current)
      setBall(ballRef.current)
      setBricks([...bricksRef.current])
      setScore(scoreRef.current)
      setLives(livesRef.current)
      setWave(waveRef.current)
      setSpecimens([...specimensRef.current])
      animationRef.current = requestAnimationFrame(loop)
    }
    animationRef.current = requestAnimationFrame(loop)
    return () => {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current)
    }
  }, [
    countdown,
    ended,
    finish,
    height,
    isEndless,
    isPageVisible,
    paddleY,
    playSfx,
    rewardConfigs,
    settings,
    started,
    width,
  ])

  const movePaddleToPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const designX = ((event.clientX - bounds.left) / bounds.width) * width
    paddleXRef.current = clampBrickBreakerPaddleX(
      designX - settings.paddle.width / 2,
      settings.paddle.width,
      width,
    )
  }

  const replay = async () => {
    const response = await startGame(encounter.id, true)
    if (response.success) window.location.reload()
    else router.push('/game/explore')
  }

  return (
    <main className="game-activity-chrome relative flex min-h-dvh items-center justify-center overflow-hidden p-3 sm:p-6">
      <Image
        src={encounter.background || '/backgrounds/cave.avif'}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35 blur-sm"
      />
      <section className="game-activity-panel relative z-10 flex w-full max-w-[470px] flex-col gap-3 p-3 sm:p-4">
        <header className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-game-muted">
              Oak field trial · Wave {wave}
            </p>
            <h1 className="text-lg font-extrabold text-game-ink">
              {encounter.name}
            </h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label="Leave game"
            onClick={() => router.push('/game/explore')}
          >
            <DoorOpen className="size-5" />
          </Button>
        </header>

        <div className="flex items-center justify-between rounded-lg border border-game-border bg-game-surface-raised px-3 py-2 text-sm font-bold">
          <span className="font-mono tabular-nums">Score {score}</span>
          <span className="flex items-center gap-1">
            <span className="sr-only">{lives} survey balls remaining</span>
            {Array.from({ length: lives }, (_, index) => (
              <Heart
                key={index}
                className="size-4 fill-game-clay text-game-clay"
              />
            ))}
          </span>
          {settings.timeLimit ? (
            <span className="font-mono tabular-nums">{timeLeft}s</span>
          ) : (
            <span>Wave {wave}</span>
          )}
        </div>

        <div
          ref={stageRef}
          role="application"
          aria-label="Brick Breaker. Drag or use Left and Right to move. Tap or press Space to launch."
          className="relative mx-auto aspect-[390/640] max-h-[calc(100dvh-185px)] w-full touch-none overflow-hidden rounded-lg border border-game-border bg-[#26332f] shadow-inner select-none"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            movePaddleToPointer(event)
            launch()
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              movePaddleToPointer(event)
          }}
        >
          <Image
            src="/backgrounds/cave.avif"
            alt="A dim geological survey cave"
            fill
            sizes="470px"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[#243029]/50" />
          {bricks.map((brick) => (
            <div
              key={brick.id}
              className={`absolute border shadow-sm ${brick.indestructible ? 'border-[#625849] bg-[#373c38]' : brick.durability >= 3 ? 'border-[#d0a660] bg-[#9b683d]' : brick.durability === 2 ? 'border-[#c39554] bg-[#786848]' : 'border-[#b7a27d] bg-[#596d4d]'}`}
              style={{
                left: `${(brick.x / width) * 100}%`,
                top: `${(brick.y / height) * 100}%`,
                width: `${(brick.width / width) * 100}%`,
                height: `${(brick.height / height) * 100}%`,
              }}
            />
          ))}
          {specimens.map((specimen) => (
            <div
              key={specimen.id}
              className="absolute rounded-full border-2 border-game-ochre bg-game-surface-raised p-1 shadow-md"
              style={{
                left: `${((specimen.x - specimen.size / 2) / width) * 100}%`,
                top: `${((specimen.y - specimen.size / 2) / height) * 100}%`,
                width: `${(specimen.size / width) * 100}%`,
                aspectRatio: '1',
              }}
            >
              <EndlessCollectibleSprite
                reward={specimen.reward}
                size={specimen.size}
              />
            </div>
          ))}
          <div
            className="absolute rounded bg-game-clay shadow-[0_2px_0_#774334]"
            style={{
              left: `${(paddleX / width) * 100}%`,
              top: `${(paddleY / height) * 100}%`,
              width: `${(settings.paddle.width / width) * 100}%`,
              height: `${(settings.paddle.height / height) * 100}%`,
            }}
          />
          {ball && (
            <div
              className="absolute rounded-full border border-[#f7df9c] bg-game-ochre shadow-[0_0_8px_rgba(181,138,67,0.75)]"
              style={{
                left: `${((ball.x - ball.radius) / width) * 100}%`,
                top: `${((ball.y - ball.radius) / height) * 100}%`,
                width: `${((ball.radius * 2) / width) * 100}%`,
                aspectRatio: '1',
              }}
            />
          )}

          {countdown > 0 && (
            <div
              className="absolute inset-0 grid place-items-center bg-[#18211e]/45 text-6xl font-black text-[#fff8e8]"
              aria-live="polite"
            >
              {countdown}
            </div>
          )}
          {!ended && countdown === 0 && docked && (
            <button
              type="button"
              onClick={launch}
              className="absolute inset-x-10 bottom-[20%] min-h-11 rounded-lg border border-game-border bg-game-surface-raised px-4 py-2 font-bold text-game-ink shadow-md focus-visible:outline-2 focus-visible:outline-game-clay"
            >
              <Pickaxe className="mr-2 inline size-5" />
              Tap or press Space to launch
            </button>
          )}
        </div>
        <p className="text-center text-xs text-game-muted" aria-live="polite">
          Move with touch, pointer, Arrow keys, or A/D. Reward specimens must be
          struck before they fade.
        </p>
        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-700/30 bg-red-50 p-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}
      </section>

      {result && (
        <RewardResultOverlay
          result={result}
          onClose={() => {
            refreshUser()
            router.push('/game/explore')
          }}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Survey complete' : 'Survey ended'}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter.isEligibleForReplay ? (
              <Button size="lg" onClick={() => void replay()}>
                Try again
              </Button>
            ) : undefined
          }
        />
      )}
    </main>
  )
}
