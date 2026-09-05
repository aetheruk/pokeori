'use client'

import { DoorOpen, Heart } from 'lucide-react'
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
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
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
    <main className="relative h-dvh min-h-0 w-full overflow-hidden bg-[#18211e] text-[#fff8e8]">
      <Image
        src={encounter.background || '/backgrounds/cave.avif'}
        alt="A dim geological survey cave"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#18211e]/28" />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2 rounded-lg border border-game-border/80 bg-game-surface-raised/95 px-3 py-2 text-sm font-bold text-game-ink shadow-md backdrop-blur-sm">
          <span className="font-mono tabular-nums">Score {score}</span>
          <span aria-hidden className="h-4 w-px bg-game-border" />
          <span className="flex items-center gap-1">
            <span className="sr-only">{lives} survey balls remaining</span>
            {Array.from({ length: lives }, (_, index) => (
              <Heart
                key={index}
                className="size-4 fill-game-clay text-game-clay"
              />
            ))}
          </span>
          <span aria-hidden className="h-4 w-px bg-game-border" />
          {settings.timeLimit ? (
            <span className="font-mono tabular-nums">{timeLeft}s</span>
          ) : (
            <span>Wave {wave}</span>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="pointer-events-auto bg-game-surface-raised/95 text-game-ink shadow-md backdrop-blur-sm"
          aria-label="Leave game"
          onClick={() => router.push('/game/explore')}
        >
          <DoorOpen className="size-5" />
        </Button>
      </header>

      <div
        ref={stageRef}
        role="application"
        aria-label="Brick Breaker. Drag or use Left and Right to move. Tap or press Space to launch."
        className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 touch-none overflow-hidden select-none"
        style={{
          aspectRatio: `${width} / ${height}`,
          maxWidth: `${(width / height) * 100}dvh`,
        }}
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
        {bricks.map((brick) => {
          const [row, column] = brick.id.split(':').map(Number)
          const pokemonId =
            settings.brickPokemonIds[
              (row * settings.layout[0].length + column) %
                settings.brickPokemonIds.length
            ]
          return (
            <div
              key={brick.id}
              aria-hidden
              className={`absolute flex items-center justify-center overflow-hidden border shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-2px_4px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.3)] ${brick.indestructible ? 'border-[#8a857b]' : brick.durability >= 3 ? 'border-[#f0b96e]' : brick.durability === 2 ? 'border-[#dfc071]' : 'border-[#b8d09c]'}`}
              style={{
                left: `${(brick.x / width) * 100}%`,
                top: `${(brick.y / height) * 100}%`,
                width: `${(brick.width / width) * 100}%`,
                aspectRatio: '1 / 1',
                background: brick.indestructible
                  ? 'linear-gradient(135deg, #a29b8c 0%, #5c625d 35%, #343b38 72%, #222926 100%)'
                  : brick.durability >= 3
                    ? 'linear-gradient(135deg, #f0c47d 0%, #b56342 34%, #79422f 72%, #48291f 100%)'
                    : brick.durability === 2
                      ? 'linear-gradient(135deg, #f0d58a 0%, #9a7643 34%, #67502f 72%, #3e321f 100%)'
                      : 'linear-gradient(135deg, #d8ebbd 0%, #6f8c5e 34%, #49603f 72%, #293b2a 100%)',
                clipPath:
                  'polygon(12% 0,88% 0,100% 12%,100% 88%,88% 100%,12% 100%,0 88%,0 12%)',
              }}
            >
              <Image
                src={getPokemonImageUrl(pokemonId, 'sprite')}
                alt=""
                width={64}
                height={64}
                className="pixelated relative z-10 h-[78%] w-[78%] object-contain opacity-90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.45)]"
              />
              <span className="absolute left-[14%] top-[10%] h-[10%] w-[42%] -rotate-12 rounded-full bg-white/35" />
            </div>
          )
        })}
        {specimens.map((specimen) => (
          <div
            key={specimen.id}
            className="absolute flex items-center justify-center rounded-full border border-game-ochre/70 bg-game-ochre/20 shadow-[0_0_18px_rgba(181,138,67,0.55)]"
            style={{
              left: `${((specimen.x - specimen.size / 2) / width) * 100}%`,
              top: `${((specimen.y - specimen.size / 2) / height) * 100}%`,
              width: `${(specimen.size / width) * 100}%`,
              aspectRatio: '1',
            }}
          >
            <span className="absolute inset-1 rounded-full border border-amber-200/35 motion-safe:animate-ping" />
            <span className="relative z-10 h-[76%] w-[76%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]">
              <EndlessCollectibleSprite
                reward={specimen.reward}
                size={Math.round(specimen.size * 0.76)}
              />
            </span>
          </div>
        ))}
        <div
          aria-hidden
          className="absolute overflow-hidden rounded-full border-2 border-[#202826] bg-white shadow-[0_3px_6px_rgba(13,20,18,0.55)]"
          style={{
            left: `${(paddleX / width) * 100}%`,
            top: `${(paddleY / height) * 100}%`,
            width: `${(settings.paddle.width / width) * 100}%`,
            height: `${(settings.paddle.height / height) * 100}%`,
          }}
        >
          <span className="absolute inset-x-0 top-0 h-1/2 bg-[#c84d43]" />
          <span className="absolute inset-x-0 top-1/2 h-[18%] -translate-y-1/2 bg-[#202826]" />
          <span className="absolute left-1/2 top-1/2 aspect-square h-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#202826] bg-white" />
        </div>
        {ball && (
          <div
            className="absolute rounded-full border border-[#f8e7b4] bg-[#f4d276] shadow-[0_0_8px_rgba(244,210,118,0.8)]"
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
            className="absolute inset-0 grid place-items-center bg-[#18211e]/25 text-6xl font-black text-[#fff8e8] drop-shadow-lg"
            aria-live="polite"
          >
            {countdown}
          </div>
        )}
        {!ended && countdown === 0 && docked && (
          <button
            type="button"
            onClick={launch}
            className="absolute bottom-[20%] left-1/2 min-h-11 -translate-x-1/2 whitespace-nowrap rounded-lg border border-game-border bg-game-surface-raised/95 px-4 py-2 font-bold text-game-ink shadow-md backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-game-clay"
          >
            Tap or Space to launch
          </button>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-lg border border-red-700/30 bg-red-50 p-3 text-sm text-red-800 shadow-md"
        >
          {error}
        </p>
      )}

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
