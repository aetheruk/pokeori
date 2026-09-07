'use client'

import type { GameDataKeys } from '@/utilities/requirements/analysis'

import { ChevronDown, Coins, DoorOpen, Trophy } from 'lucide-react'
import Matter from 'matter-js'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { completeGame, startGame } from '@/utilities/games/client-action-recovery'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { CurrencySprite } from '@/components/ui/currency-sprite'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import { getCurrency } from '@/data/currencies'
import type {
  PachinkoGameConfig,
  PachinkoGameSettings,
} from '@/data/games/pachinko/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import {
  getPachinkoBucketSensor,
  PACHINKO_BONUS_BALL_COUNT,
  PACHINKO_BUCKET_RAIL_WIDTH,
  PACHINKO_WALL_WIDTH,
} from '@/utilities/research/pachinko-physics'
import { recoverGameAction } from '@/utilities/games/action-recovery'
import type { PachinkoPlayback } from '@/utilities/research/pachinko-simulation'
import { samplePachinkoPosition } from '@/utilities/research/pachinko-playback'
import { completePachinkoRound } from '../games/pachinko'

interface PachinkoGameProps {
  encounter: PachinkoGameConfig
  initialState?: any
  state?: any
}

function getRewardLabel(reward: any) {
  if (reward?.type === 'currency') {
    const currency = getCurrency(reward.targetId || reward.currencyType || '')
    const quantity = reward.quantity ? `${reward.quantity} ` : ''
    return `${quantity}${currency?.name || reward.targetId || 'Currency'}`
  }

  return reward?.label || reward?.targetId || reward?.type || 'Prize'
}

function getAwardedRewardLabel(summary: any) {
  const currencyReward = summary?.currency?.[0]
  if (currencyReward?.type && currencyReward?.quantity) {
    const currency = getCurrency(currencyReward.type)
    return `${currencyReward.quantity} ${currency?.name || currencyReward.type}`
  }

  return null
}

// Prizes Modal Component
function PrizesModal({ buckets }: { buckets: any[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="min-h-11 border-game-border bg-game-surface-raised text-game-ink hover:border-game-ochre hover:text-game-ochre"
        >
          <Trophy className="mr-2 h-4 w-4 text-game-ochre" />
          Prizes
        </Button>
      </DialogTrigger>
      <DialogContent className="game-paper-background w-[95%] max-w-md rounded-xl border-game-border bg-game-surface p-6 text-game-ink">
        <DialogHeader>
          <DialogTitle className="sr-only">Bucket Prizes</DialogTitle>
          <SectionDivider>Bucket Prizes</SectionDivider>
        </DialogHeader>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {buckets.map((bucket) => (
            <div
              key={bucket.id}
              className="flex items-center gap-3 rounded-lg border border-game-border bg-game-surface-raised p-3"
            >
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-b-2 bg-game-canvas"
                style={{ borderColor: bucket.color || '#14b8a6' }}
              >
                {bucket.icon && <TaskIconDisplay icon={bucket.icon as any} />}
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-sm font-bold text-game-ink">
                  {bucket.label || bucket.id}
                </div>
                {bucket.rewards.map((reward: any, i: number) => (
                  <div
                    key={i}
                    className="text-sm leading-tight text-game-muted"
                  >
                    {getRewardLabel(reward)}
                  </div>
                ))}
                {bucket.kind === 'bonus' && (
                  <div className="text-sm leading-tight text-game-muted">
                    Five balls for the price of one drop
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function PachinkoGame({ encounter, state }: PachinkoGameProps) {
  useGameMusic(encounter)
  const sceneRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)
  const renderRef = useRef<Matter.Render | null>(null)
  const playbackFrameRef = useRef(0)
  const roundPendingRef = useRef(false)
  const bonusTargetBodiesRef = useRef<Map<string, Matter.Body[]>>(new Map())
  const bonusTargetsInWorldRef = useRef(true)
  const router = useRouter()
  const { playSfx } = useAudio()
  const { user, refreshUser } = useUser()
  const completionInvalidatesRef = useRef<GameDataKeys[] | undefined>(undefined)

  const [isDropping, setIsDropping] = useState(false)
  const [arrowPosition, setArrowPosition] = useState(50) // Percentage 0-100
  const directionRef = useRef(1) // 1 = right, -1 = left

  const [sessionSummary, setSessionSummary] = useState<any>(
    state?.pachinkoSession?.totalRewards || {},
  )
  const [sessionCost, setSessionCost] = useState<number>(
    state?.pachinkoSession?.totalCost || 0,
  )
  const [pendingDrops, setPendingDrops] = useState(0)
  const [isBonusDrop, setIsBonusDrop] = useState(false)
  const [lastDropMessage, setLastDropMessage] = useState(
    'Line up the marker and drop.',
  )

  const config = encounter.settings as PachinkoGameSettings
  const cost = encounter.settings.cost
  const themeColour = config.themeColour || '#14b8a6' // Default to teal
  const rewardCount = Object.values(sessionSummary || {}).reduce<number>(
    (total, value) => total + (Array.isArray(value) ? value.length : 0),
    0,
  )

  // Animate arrow left-right
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDropping) return

      setArrowPosition((prev) => {
        const next = prev + directionRef.current * 2
        if (next >= 100) {
          directionRef.current = -1
          return 100
        }
        if (next <= 0) {
          directionRef.current = 1
          return 0
        }
        return next
      })
    }, 30)
    return () => clearInterval(interval)
  }, [isDropping])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(playbackFrameRef.current)
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current)
        if (renderRef.current.canvas) {
          renderRef.current.canvas.remove()
        }
        renderRef.current = null
      }
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current)
        runnerRef.current = null
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current)
        engineRef.current = null
      }
    }
  }, [])

  // Initialize Physics
  useEffect(() => {
    if (!sceneRef.current || engineRef.current) return

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite

    const engine = Engine.create()
    engineRef.current = engine

    engine.gravity.y = config.gravityScale ?? 1.0

    // Keep the simulation in authored board coordinates. CSS scales only the
    // canvas presentation, so odds do not change with viewport dimensions.
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: config.board.width,
        height: config.board.height,
        wireframes: false,
        background: '#18181b',
        pixelRatio: 1,
      },
    })
    renderRef.current = render

    // Create Pegs
    const pegs: Matter.Body[] = []
    config.board.pegs.forEach((peg) => {
      const circle = Bodies.circle(peg.x, peg.y, peg.radius || 5, {
        isStatic: true,
        render: { fillStyle: peg.isBouncer ? '#facc15' : themeColour },
        restitution: peg.isBouncer ? 1.2 : config.board.wallBounciness || 0.5,
        label: peg.isBouncer ? 'BOUNCER' : 'PEG',
      })
      pegs.push(circle)
    })

    // Create Buckets - sensors with physical rails that match the visible bucket art.
    const buckets: Matter.Body[] = []
    const bucketWalls: Matter.Body[] = []
    config.board.buckets.forEach((bucket) => {
      const halfWidth = bucket.width / 2
      const halfHeight = bucket.height / 2
      const railWidth = PACHINKO_BUCKET_RAIL_WIDTH
      const railColour = bucket.color || themeColour
      const ballRadius = config.ballRadius || 8
      const sensorBounds = getPachinkoBucketSensor(bucket, ballRadius)

      // Detect only after the ball has entered between the physical rails.
      const sensor = Bodies.rectangle(
        sensorBounds.x,
        sensorBounds.y,
        sensorBounds.width,
        sensorBounds.height,
        {
          isStatic: true,
          isSensor: true,
          label: `BUCKET_${bucket.id}`,
          render: {
            visible: false,
          },
        },
      )
      buckets.push(sensor)

      const wallOptions = {
        isStatic: true,
        restitution: 0.15,
        friction: 0.05,
        label: 'BUCKET_WALL',
        render: { fillStyle: railColour },
      }

      const leftBucketWall = Bodies.rectangle(
        bucket.x - halfWidth,
        bucket.y,
        railWidth,
        bucket.height,
        wallOptions,
      )
      bucketWalls.push(leftBucketWall)

      const rightBucketWall = Bodies.rectangle(
        bucket.x + halfWidth,
        bucket.y,
        railWidth,
        bucket.height,
        wallOptions,
      )
      bucketWalls.push(rightBucketWall)

      const bottomBucketWall = Bodies.rectangle(
        bucket.x,
        bucket.y + halfHeight,
        bucket.width + railWidth,
        railWidth,
        wallOptions,
      )
      bucketWalls.push(bottomBucketWall)

      if (bucket.kind === 'bonus') {
        bonusTargetBodiesRef.current.set(bucket.id, [
          sensor,
          leftBucketWall,
          rightBucketWall,
          bottomBucketWall,
        ])
      }
    })

    const obstacles: Matter.Body[] = []
    config.board.obstacles?.forEach((obstacle) => {
      obstacles.push(
        Bodies.rectangle(
          obstacle.x,
          obstacle.y,
          obstacle.width,
          obstacle.height,
          {
            angle: obstacle.angle || 0,
            isStatic: obstacle.isStatic ?? true,
            restitution: obstacle.bounce ?? config.board.wallBounciness ?? 0.5,
            friction: obstacle.friction ?? 0.05,
            label: 'OBSTACLE',
            render: {
              fillStyle:
                obstacle.bounce && obstacle.bounce > 1 ? '#facc15' : '#3f3f46',
            },
          },
        ),
      )
    })

    // Walls
    const wallOpts = { isStatic: true, render: { fillStyle: '#333' } }
    const leftWall = Bodies.rectangle(
      0,
      config.board.height / 2,
      PACHINKO_WALL_WIDTH,
      config.board.height,
      wallOpts,
    )
    const rightWall = Bodies.rectangle(
      config.board.width,
      config.board.height / 2,
      PACHINKO_WALL_WIDTH,
      config.board.height,
      wallOpts,
    )

    // Floor sensor
    const floorSensor = Bodies.rectangle(
      config.board.width / 2,
      config.board.height + 20,
      config.board.width,
      40,
      {
        isStatic: true,
        isSensor: true,
        label: 'FLOOR',
        render: { visible: false },
      },
    )

    Composite.add(engine.world, [
      ...pegs,
      ...buckets,
      ...bucketWalls,
      ...obstacles,
      leftWall,
      rightWall,
      floorSensor,
    ])

    Render.run(render)
    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)
  }, [config, themeColour])

  const setBonusTargetsActive = (active: boolean) => {
    const engine = engineRef.current
    if (!engine || bonusTargetsInWorldRef.current === active) return

    const targetBodies = [...bonusTargetBodiesRef.current.values()].flat()
    if (active) {
      Matter.Composite.add(engine.world, targetBodies)
    } else {
      for (const body of targetBodies) {
        Matter.Composite.remove(engine.world, body)
      }
    }
    bonusTargetsInWorldRef.current = active
  }

  const playRound = async (playback: PachinkoPlayback) => {
    const engine = engineRef.current
    if (!engine) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    for (const phase of playback.phases) {
      if (engineRef.current !== engine) return
      setIsBonusDrop(phase.mode === 'bonus')
      setBonusTargetsActive(phase.mode !== 'bonus')
      if (phase.mode === 'bonus') setLastDropMessage('Bonus drop: five balls in play.')
      const balls = phase.balls.map((trace) => {
        const position = trace.positions[0] || [0, 0]
        const body = Matter.Bodies.circle(position[0], position[1], config.ballRadius || 8, {
          isStatic: true, isSensor: true, collisionFilter: { mask: 0 },
          render: { fillStyle: '#fff' },
        })
        Matter.Composite.add(engine.world, body)
        return body
      })
      await new Promise<void>((resolve) => {
        const duration = Math.max(0, ...phase.balls.map((ball) => (ball.positions.length - 1) * playback.sampleIntervalMs))
        let started: number | undefined
        const frame = (timestamp: number) => {
          if (engineRef.current !== engine) { resolve(); return }
          started ??= timestamp
          const elapsed = reducedMotion ? duration : timestamp - started
          phase.balls.forEach((trace, index) => {
            const position = samplePachinkoPosition(trace.positions, elapsed, playback.sampleIntervalMs)
            if (position) Matter.Body.setPosition(balls[index], { x: position[0], y: position[1] })
          })
          if (elapsed >= duration) {
            balls.forEach((body) => Matter.Composite.remove(engine.world, body))
            resolve()
          } else playbackFrameRef.current = requestAnimationFrame(frame)
        }
        playbackFrameRef.current = requestAnimationFrame(frame)
      })
    }
  }

  const handleDrop = async () => {
    if (roundPendingRef.current || !engineRef.current) return
    const currentBalance = (user?.currency as any)?.[cost?.currencyType || 'pokedollars'] || 0
    if (currentBalance - pendingDrops * (cost?.amount || 0) < (cost?.amount || 0)) {
      toast.error('Insufficient funds')
      return
    }
    roundPendingRef.current = true
    setIsDropping(true)
    setPendingDrops((previous) => previous + 1)
    setLastDropMessage('Preparing drop…')
    // Retain one immutable request through response-loss retries. Outcomes and
    // animation frames come from the already-settled server receipt.
    const request = { roundId: crypto.randomUUID(), arrowPosition }
    try {
      const result = await recoverGameAction(
        () => completePachinkoRound({ encounterId: encounter.id, request }),
        'The drop could not be confirmed. Retry to recover this same drop.',
        (response) => response.error || undefined,
      )
      if (!result.success) {
        toast.error(result.error || 'Drop failed')
        setLastDropMessage(result.error || 'Drop failed')
        return
      }
      setLastDropMessage('Dropping…')
      if (result.playback) await playRound(result.playback)
      if (!engineRef.current) return
      setSessionSummary(result.summary || {})
      setSessionCost(
        (current) => result.totalCost ?? current + (cost?.amount || 0),
      )
      refreshUser(false)

      if (result.rewards) {
        playSfx('good')
        const rewardLabel =
          getAwardedRewardLabel(result.rewards) || 'Added to session winnings'
        const hitCopy =
          result.isBonus && result.hitCount
            ? ` from ${result.hitCount} ${
                result.hitCount === 1 ? 'winning ball' : 'winning balls'
              }`
            : ''

        setLastDropMessage(
          result.isBonus
            ? `Bonus Drop: ${rewardLabel}${hitCopy}`
            : `Prize: ${rewardLabel}`,
        )
        toast.success(result.isBonus ? 'Bonus prize!' : 'Prize!', {
          description: `${rewardLabel}${hitCopy}`,
        })
      } else {
        playSfx('bad')
        setLastDropMessage(
          result.isBonus
            ? 'Bonus Drop complete — all five balls missed.'
            : 'Missed the prize slots.',
        )
        toast.info('Miss', {
          description: result.isBonus
            ? 'No prize from the five bonus balls.'
            : 'No prize this drop.',
        })
      }
    } finally {
      setBonusTargetsActive(true)
      setIsBonusDrop(false)
      setPendingDrops((previous) => Math.max(0, previous - 1))
      setIsDropping(false)
      roundPendingRef.current = false
    }
  }

  const [result, setResult] = useState<any | null>(null)

  const handleLeave = async () => {
    if (isDropping) return

    const res = await completeGame(encounter.id, true)
    completionInvalidatesRef.current = res.invalidates
    setResult({
      success: true,
      message: 'Session Ended',
      rewards: res.summary,
    })
  }

  return (
    <div className="relative min-h-dvh flex flex-col font-sans overflow-hidden game-night bg-game-night-canvas select-none touch-none">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {config.background ? (
          <Image
            src={config.background}
            alt="Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        ) : (
          <div className="h-full w-full bg-game-night-surface" />
        )}
      </div>

      {/* UI Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-50">
        <div className="flex flex-col gap-2 items-center w-full pointer-events-none">
          <div
            className="border rounded-full px-4 py-1.5 flex items-center gap-3 backdrop-blur-sm shadow-lg transform -translate-y-2"
            style={{
              backgroundColor: themeColour,
              borderColor: `color-mix(in srgb, ${themeColour} 70%, white)`,
            }}
          >
            <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-game-cream">
              {cost?.currencyType && getCurrency(cost.currencyType) ? (
                <CurrencySprite
                  currencyId={cost.currencyType}
                  alt={getCurrency(cost.currencyType)!.name}
                  className="w-5 h-5 object-contain pixelated"
                  width={20}
                  height={20}
                />
              ) : (
                <Coins className="h-3.5 w-3.5 text-game-cream" />
              )}
              {(
                (user?.currency as any)?.[cost?.currencyType || 'pokedollars'] -
                pendingDrops * (cost?.amount || 0)
              )?.toLocaleString() || '0'}
            </div>
            <div className="h-3 w-px bg-game-night-border/60" />
            <div className="text-xs font-bold uppercase tracking-wider text-game-night-ink">
              BET: {cost?.amount || 0}
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="pointer-events-auto h-10 w-10 rounded-full border border-game-night-border/60 bg-game-night-surface/85 text-game-night-ink shadow-lg transition-colors hover:bg-game-night-surface-raised hover:text-game-night-ink"
            onClick={handleLeave}
            disabled={isDropping || Boolean(result)}
            aria-label="Leave Pachinko"
          >
            <DoorOpen className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 pt-20 pb-48 z-10">
        <div
          className="relative overflow-hidden rounded-lg border-4 border-[#40545c] bg-[#081014] shadow-xl"
          style={{
            width: 'min(90vw, 400px)',
            aspectRatio: `${config.board.width}/${config.board.height}`,
            maxHeight: '55vh',
          }}
        >
          {/* Moving Arrow Indicator */}
          <div className="absolute left-3 right-3 top-3 z-20 h-1 rounded-full bg-[#5b686b]/80 shadow-inner" />
          <div
            className="absolute top-0 z-20 pointer-events-none transition-all duration-75"
            style={{ left: `${arrowPosition}%`, transform: 'translateX(-50%)' }}
          >
            <ChevronDown
              className="w-6 h-6 animate-pulse"
              style={{ color: themeColour }}
            />
          </div>

          {/* Physics Canvas */}
          <div
            ref={sceneRef}
            className="w-full h-full [&>canvas]:w-full [&>canvas]:h-full"
          />

          {/* Prize icons sit above the physical slots rendered by Matter.js. */}
          <div className="absolute inset-0 pointer-events-none">
            {config.board.buckets
              .filter((bucket) => !isBonusDrop || bucket.kind !== 'bonus')
              .map((bucket) => {
                const xPercent = (bucket.x / config.board.width) * 100
                const distanceFromBottom =
                  config.board.height - (bucket.y - bucket.height / 2)
                const bottomPercent =
                  (distanceFromBottom / config.board.height) * 100

                return (
                  <div
                    key={bucket.id}
                    className="absolute flex aspect-square items-center justify-center"
                    style={{
                      left: `${xPercent}%`,
                      bottom: `${bottomPercent}%`,
                      width: bucket.kind === 'prize' ? '10%' : '8%',
                      transform: 'translateX(-50%)',
                      color: bucket.color || themeColour,
                    }}
                  >
                    {bucket.icon && (
                      <TaskIconDisplay
                        icon={bucket.icon as any}
                        className={cn(
                          'h-full w-full object-contain drop-shadow-[0_2px_2px_rgba(0,0,0,0.75)]',
                          bucket.kind === 'bonus' && 'text-game-ochre',
                        )}
                      />
                    )}
                  </div>
                )
              })}
          </div>
        </div>
        <div className="mt-3 flex w-full max-w-md flex-col gap-2 text-center">
          <div
            className="rounded-md border border-game-border bg-game-surface-raised px-3 py-2 text-sm font-semibold text-game-ink shadow-sm"
            role="status"
            aria-live="polite"
          >
            {lastDropMessage}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wide text-game-muted">
            <div className="rounded-md border border-game-border bg-game-surface-raised px-3 py-2">
              Spent {sessionCost.toLocaleString()}
            </div>
            <div className="rounded-md border border-game-border bg-game-surface-raised px-3 py-2">
              Prizes {rewardCount}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section (Fixed Bottom) */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 px-4 z-50 pb-safe">
        {/* Prizes Button */}
        <PrizesModal buckets={config.board.buckets} />

        {/* Drop Button */}
        <Button
          type="button"
          size="lg"
          aria-busy={isDropping}
          className={cn('h-12 w-full max-w-md text-base !text-game-cream')}
          style={{
            background: `linear-gradient(to right, ${themeColour}, color-mix(in srgb, ${themeColour} 80%, black))`,
            borderBottomColor: `color-mix(in srgb, ${themeColour} 40%, black)`,
          }}
          onClick={handleDrop}
          disabled={isDropping || Boolean(result)}
          aria-label={
            isBonusDrop
              ? 'Five bonus balls dropping'
              : isDropping
                ? 'Dropping ball'
                : 'Drop ball'
          }
        >
          {isBonusDrop
            ? `BONUS DROP · ${PACHINKO_BONUS_BALL_COUNT} BALLS`
            : isDropping
              ? '...'
              : 'DROP'}
        </Button>
      </div>

      {/* Exit Overlay */}
      {result && (
        <RewardResultOverlay
          result={result}
          onClose={() => {
            refreshUser(true, completionInvalidatesRef.current)
            router.push('/game/explore')
          }}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title="DONE"
          message="One more go...?"
          secondaryAction={
            state?.encounter?.isEligibleForReplay ||
            encounter?.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={async () => {
                  try {
                    const res = await startGame(
                      (state?.encounter || encounter).id,
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
