import { expect, test } from 'bun:test'
import { snakeGames } from '@/data/games/snake'
import { brickBreakerGames } from '@/data/games/brick-breaker'
import { createArcadeRound, stepArcadeSimulation, verifyArcadeCheckpoint, type ArcadeInput } from '@/utilities/research/arcade-authority'
import { createTrajectoryState, stepTrajectoryState } from '@/utilities/research/trajectory-arcade'

test('snake checkpoint replays actual movement, pickup geometry and terminal collisions', () => {
  const settings = snakeGames[0].settings
  const round = createArcadeRound('snake', settings, 1000, 55)
  let sim = round.simulation
  while (sim.status === 'playing' && sim.tick < 600) sim = stepArcadeSimulation('snake', settings, sim)
  expect(sim.status).toBe('lost')
  const proof = { kind: 'arcade', sessionId: round.sessionId, revision: 0, targetTick: sim.tick, inputs: [], score: 99999, collectedRewards: { '0:0': 500 } }
  const result = verifyArcadeCheckpoint('snake', settings, round, proof, 11000)
  expect(result.success).toBe(true)
  if (!result.success) return
  expect(result.roundData.simulation).toEqual(sim)
  expect(result.score).toBe(sim.score)
  expect(result.collectedRewards).toEqual(sim.collectedRewards)
  expect(verifyArcadeCheckpoint('snake', settings, round, { ...proof, targetTick: sim.tick + 1 }, 11000).success).toBe(false)
  expect(verifyArcadeCheckpoint('snake', settings, round, { ...proof, targetTick: 1, inputs: [{ tick: 1, kind: 'heading', value: 999 }] }, 11000).success).toBe(false)
})

test('brick checkpoints require a launch and exact collision replay; paddle movement is speed limited', () => {
  const settings = brickBreakerGames[0].settings
  const round = createArcadeRound('brick-breaker', settings, 1000, 23)
  expect(JSON.parse(JSON.stringify(round))).toEqual(round)
  const moved = stepArcadeSimulation('brick-breaker', settings, round.simulation, [{ tick: 1, kind: 'paddle', value: 1 }])
  expect(moved.score).toBe(0)
  expect(moved.trajectory!.paddleX - round.simulation.trajectory!.paddleX).toBeCloseTo(settings.paddle.speed / 60)
  const inputs: ArcadeInput[] = [{ tick: 1, kind: 'launch' }]
  let sim = round.simulation
  for (let index = 0; index < 240; index++) sim = stepArcadeSimulation('brick-breaker', settings, sim, inputs)
  const result = verifyArcadeCheckpoint('brick-breaker', settings, round, { kind: 'arcade', sessionId: round.sessionId, revision: 0, targetTick: sim.tick, inputs }, 6000)
  expect(result.success).toBe(true)
  if (!result.success) return
  expect(result.roundData.simulation).toEqual(sim)
  expect(result.score).toBeGreaterThan(0)
  expect(verifyArcadeCheckpoint('brick-breaker', settings, round, { kind: 'arcade', sessionId: round.sessionId, revision: 0, targetTick: 1, inputs: [{ tick: 1, kind: 'paddle', value: 2 }] }, 6000).success).toBe(false)
})

test('trajectory seed, checkpoint chunking and JSON storage preserve exact future outcomes', () => {
  const settings = brickBreakerGames[0].settings
  const round = createArcadeRound('brick-breaker', settings, 1000, 23)
  const first = verifyArcadeCheckpoint('brick-breaker', settings, round, { kind: 'arcade', sessionId: round.sessionId, revision: 0, targetTick: 120, inputs: [{ tick: 1, kind: 'launch' }] }, 10000)
  expect(first.success).toBe(true)
  if (!first.success) return
  const second = verifyArcadeCheckpoint('brick-breaker', settings, JSON.parse(JSON.stringify(first.roundData)), { kind: 'arcade', sessionId: round.sessionId, revision: 1, targetTick: 240, inputs: [] }, 10000)
  const combined = verifyArcadeCheckpoint('brick-breaker', settings, round, { kind: 'arcade', sessionId: round.sessionId, revision: 0, targetTick: 240, inputs: [{ tick: 1, kind: 'launch' }] }, 10000)
  expect(second.success && combined.success && second.roundData.simulation).toEqual(combined.success && combined.roundData.simulation)
})

test('Brick Breaker rewards attach to a random brick and require hitting it before expiry', () => {
  const settings = {
    ...brickBreakerGames[0].settings,
    playfield: { width: 200, height: 300 },
    layout: ['21'],
    boardPadding: 10,
    boardTop: 80,
    brickGap: 2,
    endless: {
      enabled: true,
      milestones: [],
      repeatingRewards: [{
        everyScore: 10,
        random: true,
        rewards: [{ type: 'item' as const, targetId: 'rock-gem', quantity: 1 }],
      }],
    },
  }
  const state = createTrajectoryState('brick-breaker', settings, 23)
  const [triggerBrick, targetBrick] = state.bricks
  state.docked = false
  state.schedules['0'] = 1
  state.ball = {
    x: triggerBrick.x + triggerBrick.width / 2,
    y: triggerBrick.y + triggerBrick.height + settings.ball.radius,
    vx: 0,
    vy: -300,
    radius: settings.ball.radius,
  }

  const spawned = stepTrajectoryState('brick-breaker', settings, state, [])
  expect(spawned.pickups).toHaveLength(1)
  expect(spawned.pickups[0].brickId).toBe(targetBrick.id)
  spawned.schedules['0'] = 1000

  const unrelatedHit = structuredClone(spawned)
  unrelatedHit.ball = {
    x: triggerBrick.x + triggerBrick.width / 2,
    y: triggerBrick.y + triggerBrick.height + settings.ball.radius,
    vx: 0,
    vy: -300,
    radius: settings.ball.radius,
  }
  const stillAvailable = stepTrajectoryState('brick-breaker', settings, unrelatedHit, [])
  expect(stillAvailable.collectedRewards).toEqual({})
  expect(stillAvailable.pickups).toHaveLength(1)

  const targetBall = {
    x: targetBrick.x + targetBrick.width / 2,
    y: targetBrick.y + targetBrick.height + settings.ball.radius,
    vx: 0,
    vy: -300,
    radius: settings.ball.radius,
  }
  const hitPickup = structuredClone(stillAvailable)
  hitPickup.ball = targetBall
  const collected = stepTrajectoryState('brick-breaker', settings, hitPickup, [])
  expect(collected.collectedRewards[spawned.pickups[0].rewardKey]).toBe(1)

  const expiredPickup = structuredClone(spawned)
  expiredPickup.tick = spawned.pickups[0].expiresAt - 1
  expiredPickup.ball = targetBall
  const expired = stepTrajectoryState('brick-breaker', settings, expiredPickup, [])
  expect(expired.collectedRewards).toEqual({})
  expect(expired.pickups).toEqual([])
})
