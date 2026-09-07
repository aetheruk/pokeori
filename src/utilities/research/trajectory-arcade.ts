import type { LocationReward } from '@/data/types'
import type { SnakePosition } from '@/data/games/snake/types'
import { advanceContinuousSnake, createInitialSnake, findSafeSnakePosition, getSnakeSpeed, growSnake, sweptCircleIntersects } from './snake'
import { brickBreakerBallOverlapsRect, clampBrickBreakerPaddleX, createBrickBreakerBoard, getBrickBreakerLaunchBall, stepBrickBreaker, type BrickBreakerBall, type BrickBreakerBrick } from './brick-breaker'
import { getEndlessScoreIntervalMinimum, getNextRandomRepeatingRewardScore } from './endless-milestones'

export interface TrajectoryPickup { id: number; rewardKey: string; reward: LocationReward; x: number; y: number; size: number; expiresAt: number }
export interface TrajectoryState {
  tick: number; rng: number; status: 'playing' | 'won' | 'lost'; score: number; collectedRewards: Record<string, number>
  snake: SnakePosition[]; heading: number; targetHeading: number; food: SnakePosition | null; foodEaten: number
  ball: BrickBreakerBall | null; bricks: BrickBreakerBrick[]; paddleX: number; targetPaddleX: number; docked: boolean; lives: number; wave: number
  pickups: TrajectoryPickup[]; schedules: Record<string, number>; nextId: number
}
function random(state: TrajectoryState) { state.rng = (Math.imul(state.rng, 1664525) + 1013904223) >>> 0; return state.rng / 2 ** 32 }
function configs(settings: any) {
  return (settings.endless?.repeatingRewards || []).flatMap((entry: any, index: number) => entry.random && entry.rewards?.length && getEndlessScoreIntervalMinimum(entry.everyScore) !== null ? [{ ...entry, key: String(index) }] : [])
}
function occupied(state: TrajectoryState, settings: any, includeFood = false) {
  return [...state.snake.map((point, index) => ({ ...point, radius: index === 0 ? settings.headRadius : settings.bodyRadius })),
    ...(settings.obstacles || []), ...state.pickups.map((point) => ({ x: point.x, y: point.y, radius: settings.rewardRadius })),
    ...(includeFood && state.food ? [{ ...state.food, radius: settings.foodRadius }] : [])]
}
function placeFood(state: TrajectoryState, settings: any) {
  state.food = findSafeSnakePosition(settings.playfield, settings.foodRadius, occupied(state, settings), settings.minimumSpawnDistance, state.snake[0], () => random(state))
}
function paddle(state: TrajectoryState, settings: any) { return { x: state.paddleX, y: settings.playfield.height - 48, width: settings.paddle.width, height: settings.paddle.height } }
function launchBall(state: TrajectoryState, settings: any) {
  return getBrickBreakerLaunchBall(paddle(state, settings), settings.ball.radius, Math.min(settings.ball.maxSpeed, settings.ball.initialSpeed + (state.wave - 1) * (settings.endless?.waveSpeedIncrease || 0)))
}

export function createTrajectoryState(type: 'snake' | 'brick-breaker', settings: any, seed: number): TrajectoryState {
  const state: TrajectoryState = { tick: 0, rng: seed >>> 0, status: 'playing', score: 0, collectedRewards: {}, snake: [], heading: settings.initialHeading || 0, targetHeading: settings.initialHeading || 0,
    food: null, foodEaten: 0, ball: null, bricks: [], paddleX: 0, targetPaddleX: 0, docked: true, lives: settings.lives || 1, wave: 1, pickups: [], schedules: {}, nextId: 0 }
  for (const config of configs(settings)) state.schedules[config.key] = getNextRandomRepeatingRewardScore(0, config.everyScore, () => random(state))
  if (type === 'snake') {
    state.snake = createInitialSnake(settings.initialPosition, settings.initialLength, settings.initialHeading, settings.segmentSpacing)
    placeFood(state, settings)
  } else {
    // Infinity is not JSON-safe in Redis; indestructible bricks use their flag.
    state.bricks = createBrickBreakerBoard(settings).map((brick) => ({ ...brick, durability: brick.indestructible ? 0 : brick.durability }))
    state.paddleX = state.targetPaddleX = (settings.playfield.width - settings.paddle.width) / 2
    state.ball = launchBall(state, settings)
  }
  return state
}

function spawnPickups(state: TrajectoryState, settings: any, type: 'snake' | 'brick-breaker') {
  for (const config of configs(settings)) {
    let target = state.schedules[config.key]
    while (target !== undefined && state.score >= target) {
      const position = type === 'snake'
        ? findSafeSnakePosition(settings.playfield, settings.rewardRadius, occupied(state, settings, true), settings.minimumSpawnDistance, state.snake[0], () => random(state))
        : { x: 42 + random(state) * (settings.playfield.width - 84), y: settings.boardTop + 40 + random(state) * Math.min(210, settings.playfield.height * 0.35) }
      if (position) {
        const index = Math.floor(random(state) * config.rewards.length)
        state.pickups.push({ id: state.nextId++, rewardKey: `${config.key}:${index}`, reward: config.rewards[index], ...position,
          size: type === 'snake' ? settings.rewardRadius * 2 : 34, expiresAt: state.tick + Math.ceil((settings.rewardLifetimeMs || 8000) * 60 / 1000) })
      }
      target = getNextRandomRepeatingRewardScore(target, config.everyScore, () => random(state))
      state.schedules[config.key] = target
    }
  }
}

export function stepTrajectoryState(type: 'snake' | 'brick-breaker', settings: any, previous: TrajectoryState, inputs: Array<{ tick: number; kind: string; value?: number }>): TrajectoryState {
  if (previous.status !== 'playing') return previous
  const state = structuredClone(previous)
  state.tick++
  for (const input of inputs) {
    if (input.tick !== state.tick) continue
    if (type === 'snake' && input.kind === 'heading') state.targetHeading = input.value!
    if (type === 'brick-breaker' && input.kind === 'paddle') state.targetPaddleX = input.value! * (settings.playfield.width - settings.paddle.width)
    if (type === 'brick-breaker' && input.kind === 'launch') state.docked = false
  }
  state.pickups = state.pickups.filter((pickup) => pickup.expiresAt > state.tick)
  if (type === 'snake') {
    const head = state.snake[0]
    const step = advanceContinuousSnake({ snake: state.snake, heading: state.heading, targetHeading: state.targetHeading,
      speed: getSnakeSpeed(settings.moveSpeed, settings.maxSpeed, settings.speedUpEvery, settings.speedUpBy, state.foodEaten),
      turnRate: settings.turnRate, deltaSeconds: 1 / 60, segmentSpacing: settings.segmentSpacing, headRadius: settings.headRadius,
      boundaryRadius: settings.boundaryRadius, bodyRadius: settings.bodyRadius, playfield: settings.playfield, obstacles: settings.obstacles, wrapBoundaries: settings.wrapBoundaries })
    state.heading = step.heading
    state.snake = step.snake
    if (step.collision) { state.status = 'lost'; return state }
    const intersects = (position: SnakePosition, radius: number) => sweptCircleIntersects(head, state.snake[0], settings.headRadius, { ...position, radius }, settings.maxSpeed * 0.06)
    state.pickups = state.pickups.filter((pickup) => {
      if (!intersects(pickup, settings.rewardRadius)) return true
      state.collectedRewards[pickup.rewardKey] = (state.collectedRewards[pickup.rewardKey] || 0) + 1
      return false
    })
    if (state.food && intersects(state.food, settings.foodRadius)) {
      state.snake = growSnake(state.snake)
      state.foodEaten++
      state.score += settings.foodScore
      spawnPickups(state, settings, type)
      placeFood(state, settings)
      if (!state.food || (!settings.endless?.enabled && settings.winScore !== undefined && state.score >= settings.winScore)) state.status = 'won'
    }
  } else {
    const difference = state.targetPaddleX - state.paddleX
    state.paddleX = clampBrickBreakerPaddleX(state.paddleX + Math.sign(difference) * Math.min(Math.abs(difference), settings.paddle.speed / 60), settings.paddle.width, settings.playfield.width)
    if (state.docked) state.ball = launchBall(state, settings)
    else {
      const step = stepBrickBreaker(state.ball!, state.bricks, paddle(state, settings), settings, 1 / 60)
      state.ball = step.ball
      state.bricks = step.bricks
      state.score += step.hits * settings.pointsPerHit
      spawnPickups(state, settings, type)
      state.pickups = state.pickups.filter((pickup) => {
        if (!brickBreakerBallOverlapsRect(state.ball!, { x: pickup.x - pickup.size / 2, y: pickup.y - pickup.size / 2, width: pickup.size, height: pickup.size })) return true
        state.collectedRewards[pickup.rewardKey] = (state.collectedRewards[pickup.rewardKey] || 0) + 1
        return false
      })
      if (step.lost) { state.lives--; state.docked = true; if (state.lives <= 0) state.status = 'lost' }
      else if (step.cleared) {
        if (!settings.endless?.enabled) state.status = 'won'
        else { state.wave++; state.bricks = createBrickBreakerBoard(settings).map((brick) => ({ ...brick, durability: brick.indestructible ? 0 : brick.durability })); state.docked = true }
      }
    }
  }
  if (state.status === 'playing' && ((settings.timeLimit && state.tick >= settings.timeLimit * 60) || state.tick >= 432000)) state.status = 'lost'
  return state
}
