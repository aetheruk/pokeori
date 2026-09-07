import Matter from 'matter-js'
import type { PachinkoGameSettings } from '@/data/games/pachinko/types'
import {
  getPachinkoBonusFan, getPachinkoBucketSensor, getPachinkoDropX,
  PACHINKO_BUCKET_RAIL_WIDTH, PACHINKO_DROP_TIMEOUT_MS, PACHINKO_WALL_WIDTH,
} from './pachinko-physics'

export type PachinkoBallTrace = {
  /** Positions sampled at sampleIntervalMs, including the initial position. */
  positions: Array<[number, number]>
  bucketId: string | null
}
export type PachinkoPlayback = {
  sampleIntervalMs: number
  phases: Array<{ mode: 'normal' | 'bonus'; balls: PachinkoBallTrace[] }>
}

const STEP_MS = 1000 / 60
const SAMPLE_EVERY_STEPS = 2
const MAX_STEPS = Math.ceil(PACHINKO_DROP_TIMEOUT_MS / STEP_MS)

/** Fixed-step server simulation. Only the release position is player input. */
export function simulatePachinkoRound(
  config: PachinkoGameSettings,
  arrowPosition: number,
  initialVelocity: number,
): { playback: PachinkoPlayback; triggerBucketId?: string; outcomeBucketIds: Array<string | null> } {
  if (!Number.isFinite(arrowPosition) || arrowPosition < 0 || arrowPosition > 100 ||
      !Number.isFinite(initialVelocity) || Math.abs(initialVelocity) > 1) {
    throw new Error('Invalid Pachinko release')
  }
  const { Bodies, Body, Composite, Engine, Events } = Matter
  const engine = Engine.create()
  engine.gravity.y = config.gravityScale ?? 1
  const radius = config.ballRadius || 8
  const pegs = config.board.pegs.map((peg) => Bodies.circle(peg.x, peg.y, peg.radius || 5, {
    isStatic: true,
    restitution: peg.isBouncer ? 1.2 : config.board.wallBounciness || 0.5,
  }))
  const sensors: Matter.Body[] = []
  const rails: Matter.Body[] = []
  const bonusBodies: Matter.Body[] = []
  for (const bucket of config.board.buckets) {
    const bounds = getPachinkoBucketSensor(bucket, radius)
    const sensor = Bodies.rectangle(bounds.x, bounds.y, bounds.width, bounds.height, {
      isStatic: true, isSensor: true, label: `BUCKET_${bucket.id}`,
    })
    sensors.push(sensor)
    const options = { isStatic: true, restitution: 0.15, friction: 0.05 }
    const bucketRails = [
      Bodies.rectangle(bucket.x - bucket.width / 2, bucket.y, PACHINKO_BUCKET_RAIL_WIDTH, bucket.height, options),
      Bodies.rectangle(bucket.x + bucket.width / 2, bucket.y, PACHINKO_BUCKET_RAIL_WIDTH, bucket.height, options),
      Bodies.rectangle(bucket.x, bucket.y + bucket.height / 2, bucket.width + PACHINKO_BUCKET_RAIL_WIDTH, PACHINKO_BUCKET_RAIL_WIDTH, options),
    ]
    rails.push(...bucketRails)
    if (bucket.kind === 'bonus') bonusBodies.push(sensor, ...bucketRails)
  }
  const obstacles = (config.board.obstacles || []).map((obstacle) => Bodies.rectangle(
    obstacle.x, obstacle.y, obstacle.width, obstacle.height, {
      angle: obstacle.angle || 0, isStatic: obstacle.isStatic ?? true,
      restitution: obstacle.bounce ?? config.board.wallBounciness ?? 0.5,
      friction: obstacle.friction ?? 0.05,
    },
  ))
  Composite.add(engine.world, [
    ...pegs, ...sensors, ...rails, ...obstacles,
    Bodies.rectangle(0, config.board.height / 2, PACHINKO_WALL_WIDTH, config.board.height, { isStatic: true }),
    Bodies.rectangle(config.board.width, config.board.height / 2, PACHINKO_WALL_WIDTH, config.board.height, { isStatic: true }),
    Bodies.rectangle(config.board.width / 2, config.board.height + 20, config.board.width, 40, {
      isStatic: true, isSensor: true, label: 'FLOOR',
    }),
  ])
  const playback: PachinkoPlayback = { sampleIntervalMs: STEP_MS * SAMPLE_EVERY_STEPS, phases: [] }
  const dropX = getPachinkoDropX({ arrowPosition, boardWidth: config.board.width, ballRadius: radius })
  const position = (body: Matter.Body): [number, number] => [
    Math.round(body.position.x * 100) / 100, Math.round(body.position.y * 100) / 100,
  ]
  const runPhase = (mode: 'normal' | 'bonus', releases: Array<{ x: number; xVelocity: number }>) => {
    const balls = releases.map((release) => {
      const body = Bodies.circle(release.x, 20, radius, {
        restitution: config.ballBounciness || 0.6, friction: 0.001, mass: 5, label: 'BALL',
      })
      Body.setVelocity(body, { x: release.xVelocity, y: 0 })
      return { body, settled: false, trace: { positions: [position(body)], bucketId: null } as PachinkoBallTrace }
    })
    Composite.add(engine.world, balls.map(({ body }) => body))
    const collisions = (event: Matter.IEventCollision<Matter.Engine>) => {
      for (const { bodyA, bodyB } of event.pairs) {
        const ball = balls.find(({ body, settled }) => !settled && (body === bodyA || body === bodyB))
        if (!ball) continue
        const target = ball.body === bodyA ? bodyB : bodyA
        if (target.label !== 'FLOOR' && !target.label.startsWith('BUCKET_')) continue
        ball.settled = true
        ball.trace.bucketId = target.label.startsWith('BUCKET_') ? target.label.slice(7) : null
      }
    }
    Events.on(engine, 'collisionStart', collisions)
    for (let step = 1; step <= MAX_STEPS; step++) {
      Engine.update(engine, STEP_MS)
      for (const ball of balls) {
        if (!Composite.get(engine.world, ball.body.id, 'body')) continue
        if (step % SAMPLE_EVERY_STEPS === 0 || ball.settled || step === MAX_STEPS) {
          ball.trace.positions.push(position(ball.body))
        }
        if (ball.settled) Composite.remove(engine.world, ball.body)
      }
      if (balls.every(({ settled }) => settled)) break
    }
    Events.off(engine, 'collisionStart', collisions)
    for (const { body } of balls) Composite.remove(engine.world, body)
    const traces = balls.map(({ trace }) => trace)
    playback.phases.push({ mode, balls: traces })
    return traces
  }
  try {
    const first = runPhase('normal', [{ x: dropX, xVelocity: initialVelocity }])[0]
    const trigger = config.board.buckets.find((bucket) => bucket.id === first.bucketId && bucket.kind === 'bonus')
    if (!trigger) return { playback, outcomeBucketIds: [first.bucketId] }
    for (const body of bonusBodies) Composite.remove(engine.world, body)
    const bonus = runPhase('bonus', getPachinkoBonusFan({ dropX, boardWidth: config.board.width, ballRadius: radius }))
    return { playback, triggerBucketId: trigger.id, outcomeBucketIds: bonus.map(({ bucketId }) => bucketId) }
  } finally {
    Composite.clear(engine.world, false)
    Engine.clear(engine)
  }
}
