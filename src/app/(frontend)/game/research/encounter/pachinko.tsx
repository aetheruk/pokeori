'use client'

import { ChevronDown, Coins, DoorOpen, Trophy } from 'lucide-react'
import Matter from 'matter-js'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { startResearchEncounter } from '@/app/(frontend)/game/research/actions'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
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
import { completeResearchEncounter } from '../actions'
import { completePachinkoDrop, completePachinkoMiss } from '../games/pachinko'

interface PachinkoGameProps {
  encounter: PachinkoGameConfig
  initialState?: any
  state?: any
}

function getRewardLabel(reward: any) {
  return reward?.label || reward?.targetId || reward?.type || 'Prize'
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
  const scaleRef = useRef(1)
  const offsetXRef = useRef(0)
  const offsetYRef = useRef(0)
  const containerWidthRef = useRef(400)
  const settledBodyIdsRef = useRef<Set<number>>(new Set())
  const router = useRouter()
  const { playSfx } = useAudio()
  const { user, refreshUser } = useUser()

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
      Composite = Matter.Composite,
      Events = Matter.Events

    const engine = Engine.create()
    engineRef.current = engine

    engine.gravity.y = config.gravityScale ?? 1.0

    const containerRect = sceneRef.current.getBoundingClientRect()
    const containerWidth = containerRect.width || 400
    const containerHeight = containerRect.height || 600
    containerWidthRef.current = containerWidth

    const scaleX = containerWidth / config.board.width
    const scaleY = containerHeight / config.board.height
    const scale = Math.min(scaleX, scaleY)

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: '#18181b',
        pixelRatio: 1,
      },
    })
    renderRef.current = render

    const offsetX = (containerWidth - config.board.width * scale) / 2
    const offsetY = (containerHeight - config.board.height * scale) / 2

    scaleRef.current = scale
    offsetXRef.current = offsetX
    offsetYRef.current = offsetY

    const scalePos = (x: number, y: number) => ({
      x: x * scale + offsetX,
      y: y * scale + offsetY,
    })

    // Create Pegs
    const pegs: Matter.Body[] = []
    config.board.pegs.forEach((peg) => {
      const pos = scalePos(peg.x, peg.y)
      const circle = Bodies.circle(pos.x, pos.y, (peg.radius || 5) * scale, {
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
      const pos = scalePos(bucket.x, bucket.y)
      const halfWidth = (bucket.width * scale) / 2
      const halfHeight = (bucket.height * scale) / 2
      const railWidth = Math.max(4, 6 * scale)
      const railColour = bucket.color || themeColour

      // Sensor for detection (invisible)
      const sensor = Bodies.rectangle(
        pos.x,
        pos.y,
        bucket.width * scale,
        bucket.height * scale,
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
        pos.x - halfWidth,
        pos.y,
        railWidth,
        bucket.height * scale,
        wallOptions,
      )
      bucketWalls.push(leftBucketWall)

      const rightBucketWall = Bodies.rectangle(
        pos.x + halfWidth,
        pos.y,
        railWidth,
        bucket.height * scale,
        wallOptions,
      )
      bucketWalls.push(rightBucketWall)

      const bottomBucketWall = Bodies.rectangle(
        pos.x,
        pos.y + halfHeight,
        bucket.width * scale + railWidth,
        railWidth,
        wallOptions,
      )
      bucketWalls.push(bottomBucketWall)
    })

    const obstacles: Matter.Body[] = []
    config.board.obstacles?.forEach((obstacle) => {
      const pos = scalePos(obstacle.x, obstacle.y)
      obstacles.push(
        Bodies.rectangle(
          pos.x,
          pos.y,
          obstacle.width * scale,
          obstacle.height * scale,
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
      offsetX,
      containerHeight / 2,
      10,
      containerHeight,
      wallOpts,
    )
    const rightWall = Bodies.rectangle(
      offsetX + config.board.width * scale,
      containerHeight / 2,
      10,
      containerHeight,
      wallOpts,
    )

    // Floor sensor
    const floorSensor = Bodies.rectangle(
      containerWidth / 2,
      containerHeight + 20,
      containerWidth,
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

    // Collision Event
    Events.on(engine, 'collisionStart', (event) => {
      const pairs = event.pairs

      pairs.forEach((pair) => {
        const bodyA = pair.bodyA
        const bodyB = pair.bodyB

        const ball =
          bodyA.label === 'BALL' ? bodyA : bodyB.label === 'BALL' ? bodyB : null
        // Filter out bucket walls - only match bucket sensors (BUCKET_left, BUCKET_center, etc.)
        const bucket =
          bodyA.label.startsWith('BUCKET_') && bodyA.label !== 'BUCKET_WALL'
            ? bodyA
            : bodyB.label.startsWith('BUCKET_') && bodyB.label !== 'BUCKET_WALL'
              ? bodyB
              : null
        const floor =
          bodyA.label === 'FLOOR'
            ? bodyA
            : bodyB.label === 'FLOOR'
              ? bodyB
              : null

        if (ball && bucket) {
          const bucketId = bucket.label.replace('BUCKET_', '')
          handleBucketEntry(bucketId, ball)
        } else if (ball && floor) {
          handleFloorHit(ball)
        }
      })
    })

    Render.run(render)
    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)
  }, [config, themeColour])

  const getBallDropId = (ballBody: Matter.Body) => {
    return ((ballBody.plugin || {}) as { dropId?: string }).dropId
  }

  const animateBallIntoBucket = (ballBody: Matter.Body, bucketId: string) => {
    return new Promise<void>((resolve) => {
      const engine = engineRef.current
      if (!engine) {
        resolve()
        return
      }

      const bucket = config.board.buckets.find((entry) => entry.id === bucketId)
      if (!bucket) {
        resolve()
        return
      }

      const scale = scaleRef.current
      const targetX = bucket.x * scale + offsetXRef.current
      const targetY = bucket.y * scale + offsetYRef.current

      Matter.Body.setVelocity(ballBody, { x: 0, y: 0 })
      Matter.Body.setAngularVelocity(ballBody, 0)
      Matter.Body.setPosition(ballBody, { x: targetX, y: targetY })
      Matter.Body.setStatic(ballBody, true)

      const holdMs = 220
      const shrinkMs = 420
      const initialRadius = Math.max(1, (config.ballRadius || 8) * scale)
      let currentScale = 1
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const elapsed = timestamp - start

        if (elapsed < holdMs) {
          requestAnimationFrame(step)
          return
        }

        const progress = Math.min(1, (elapsed - holdMs) / shrinkMs)
        const nextScale = Math.max(0.02, 1 - progress)
        Matter.Body.scale(
          ballBody,
          nextScale / currentScale,
          nextScale / currentScale,
        )
        currentScale = nextScale
        Matter.Body.setPosition(ballBody, {
          x: targetX,
          y: targetY + progress * initialRadius * 0.8,
        })

        if (progress < 1) {
          requestAnimationFrame(step)
          return
        }

        Matter.Composite.remove(engine.world, ballBody)
        resolve()
      }

      requestAnimationFrame(step)
    })
  }

  const completeDropSettlement = async ({
    ballBody,
    bucketId,
  }: {
    ballBody: Matter.Body
    bucketId?: string
  }) => {
    if (!engineRef.current) return
    if (settledBodyIdsRef.current.has(ballBody.id)) return

    settledBodyIdsRef.current.add(ballBody.id)
    if (bucketId) {
      await animateBallIntoBucket(ballBody, bucketId)
    } else {
      Matter.Composite.remove(engineRef.current.world, ballBody)
    }

    const dropId = getBallDropId(ballBody)
    const result = bucketId
      ? await completePachinkoDrop(bucketId, dropId)
      : await completePachinkoMiss(dropId)

    setPendingDrops((prev) => Math.max(0, prev - 1))
    setIsDropping(false)

    if (!result.success) {
      toast.error(result.error || 'Drop failed')
      setLastDropMessage(result.error || 'Drop failed')
      return
    }

    setSessionSummary(result.summary || {})
    setSessionCost(
      (current) => result.totalCost ?? current + (cost?.amount || 0),
    )
    refreshUser(false)

    if (bucketId && result.rewards) {
      playSfx('good')
      const bucket = config.board.buckets.find((b) => b.id === bucketId)
      const rewardLabel =
        bucket?.label ||
        bucket?.rewards?.[0]?.label ||
        'Added to session winnings'

      setLastDropMessage(`Prize: ${rewardLabel}`)
      toast.success('Prize!', {
        description: rewardLabel,
      })
    } else {
      playSfx('bad')
      setLastDropMessage(bucketId ? 'Empty bucket.' : 'Missed the buckets.')
      if (!bucketId) {
        toast.info('Miss', {
          description: 'No prize this drop.',
        })
      }
    }
  }

  const handleFloorHit = (ballBody: Matter.Body) => {
    void completeDropSettlement({ ballBody })
  }

  const handleBucketEntry = (bucketId: string, ballBody: Matter.Body) => {
    void completeDropSettlement({ ballBody, bucketId })
  }

  const handleDrop = () => {
    if (isDropping || !engineRef.current) return

    const currentBalance =
      (user?.currency as any)?.[cost?.currencyType || 'pokedollars'] || 0
    const optimisticBalance =
      currentBalance - pendingDrops * (cost?.amount || 0)

    if (optimisticBalance < (cost?.amount || 0)) {
      toast.error('Insufficient funds')
      return
    }

    setIsDropping(true)
    setPendingDrops((prev) => prev + 1)
    setLastDropMessage('Dropping...')

    const scale = scaleRef.current
    const offsetX = offsetXRef.current
    const offsetY = offsetYRef.current
    const containerWidth = containerWidthRef.current

    // Calculate X position from arrow position percentage
    const dropX = (arrowPosition / 100) * containerWidth
    const dropId = crypto.randomUUID()

    const ball = Matter.Bodies.circle(
      dropX,
      offsetY + 20 * scale,
      (config.ballRadius || 8) * scale,
      {
        restitution: config.ballBounciness || 0.6,
        friction: 0.001,
        mass: 5,
        label: 'BALL',
        plugin: { dropId },
        render: { fillStyle: '#fff' },
      },
    )

    Matter.Composite.add(engineRef.current.world, ball)
    Matter.Body.setVelocity(ball, {
      x: (Math.random() - 0.5) * 2 * scale,
      y: 0,
    })
  }

  const [result, setResult] = useState<any | null>(null)

  const handleLeave = async () => {
    if (isDropping) return

    const res = await completeResearchEncounter(encounter.id, true)
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
                <ItemSprite
                  itemId={getCurrency(cost.currencyType)!.iconId}
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

          {/* Bucket Icons - positioned to match physics buckets */}
          <div className="absolute inset-0 pointer-events-none">
            {config.board.buckets.map((bucket) => {
              // Calculate percentage position based on bucket x/y in config
              const xPercent = (bucket.x / config.board.width) * 100
              // Calculate from bottom: board.height - bucket.y gives distance from bottom
              const distanceFromBottom = config.board.height - bucket.y
              const bottomPercent =
                (distanceFromBottom / config.board.height) * 100
              // Calculate percentage dimensions relative to board
              const widthPercent = (bucket.width / config.board.width) * 100
              const heightPercent = (bucket.height / config.board.height) * 100

              return (
                <div
                  key={bucket.id}
                  className="absolute flex flex-col items-center justify-center gap-0.5 overflow-hidden rounded-b-[25%] border-b-4 border-l-4 border-r-4 bg-[#0d1820]/90 px-1 shadow-[inset_0_-10px_16px_rgba(0,0,0,0.6)]"
                  style={{
                    left: `${xPercent}%`,
                    bottom: `${bottomPercent}%`,
                    width: `${widthPercent}%`,
                    height: `${heightPercent}%`,
                    transform: 'translateX(-50%) translateY(50%)',
                    borderColor: bucket.color || themeColour,
                  }}
                >
                  <div
                    className="absolute left-0 right-0 top-0 h-1.5"
                    style={{ backgroundColor: bucket.color || themeColour }}
                  />
                  <div className="absolute inset-x-[18%] bottom-1 h-2 rounded-full bg-[#081014]/70" />
                  {bucket.icon && (
                    <TaskIconDisplay
                      icon={bucket.icon as any}
                      className="relative z-10 w-[48%] h-[48%]"
                    />
                  )}
                  <span className="relative z-10 max-w-full truncate text-[10px] font-black uppercase leading-none text-[#f7ecd6] drop-shadow">
                    {bucket.label || bucket.id}
                  </span>
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
          aria-label={isDropping ? 'Dropping ball' : 'Drop ball'}
        >
          {isDropping ? '...' : 'DROP'}
        </Button>
      </div>

      {/* Exit Overlay */}
      {result && (
        <RewardResultOverlay
          result={result}
          onClose={() => {
            refreshUser()
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
                    const res = await startResearchEncounter(
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
