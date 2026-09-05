import { describe, expect, test } from 'bun:test'
import { snakeGames } from '@/data/games/snake'
import {
  advanceContinuousSnake,
  circlesOverlap,
  createInitialSnake,
  distanceBetween,
  findSafeSnakePosition,
  getSegmentHeading,
  getSnakeSpeed,
  growSnake,
  normalizeAngle,
  shortestAngleDelta,
  turnToward,
} from '@/utilities/research/snake'

describe('continuous Snake mechanics', () => {
  test('creates a spaced body behind any authored heading', () => {
    const snake = createInitialSnake({ x: 100, y: 100 }, 3, 45, 20)
    expect(snake).toHaveLength(3)
    expect(distanceBetween(snake[0], snake[1])).toBeCloseTo(20)
    expect(distanceBetween(snake[1], snake[2])).toBeCloseTo(20)
    expect(snake[1].x).toBeLessThan(100)
    expect(snake[1].y).toBeLessThan(100)
  })

  test('turns through the shortest arc with a rate limit', () => {
    expect(normalizeAngle(-10)).toBe(350)
    expect(shortestAngleDelta(350, 10)).toBe(20)
    expect(turnToward(350, 10, 5)).toBe(355)
    expect(turnToward(10, 350, 5)).toBe(5)
  })

  test('moves freely at curved headings and maintains segment spacing', () => {
    const result = advanceContinuousSnake({
      snake: createInitialSnake({ x: 200, y: 200 }, 4, 0, 24),
      heading: 0,
      targetHeading: 90,
      speed: 100,
      turnRate: 180,
      deltaSeconds: 0.05,
      segmentSpacing: 24,
      headRadius: 10,
      bodyRadius: 9,
      playfield: { width: 400, height: 400 },
    })
    expect(result.collision).toBeNull()
    expect(result.heading).toBe(9)
    expect(result.snake[0].x).toBeGreaterThan(204)
    expect(result.snake[0].y).toBeGreaterThan(200)
    expect(distanceBetween(result.snake[0], result.snake[1])).toBeCloseTo(24)
  })

  test('caps resume deltas to avoid a visibility jump', () => {
    const snake = createInitialSnake({ x: 100, y: 100 }, 2, 0, 20)
    const result = advanceContinuousSnake({
      snake,
      heading: 0,
      targetHeading: 0,
      speed: 100,
      turnRate: 180,
      deltaSeconds: 5,
      segmentSpacing: 20,
      headRadius: 5,
      bodyRadius: 5,
      playfield: { width: 400, height: 400 },
    })
    expect(result.snake[0].x).toBe(105)
  })

  test('detects scene edges, obstacles, and the distant body', () => {
    const base = {
      heading: 180,
      targetHeading: 180,
      speed: 100,
      turnRate: 180,
      deltaSeconds: 0.05,
      segmentSpacing: 100,
      headRadius: 10,
      bodyRadius: 9,
      playfield: { width: 300, height: 300 },
    }
    expect(
      advanceContinuousSnake({
        ...base,
        snake: [{ x: 12, y: 100 }],
      }).collision,
    ).toBe('boundary')
    expect(
      advanceContinuousSnake({
        ...base,
        heading: 0,
        targetHeading: 0,
        snake: [{ x: 100, y: 100 }],
        obstacles: [{ x: 115, y: 100, radius: 5 }],
      }).collision,
    ).toBe('obstacle')
    expect(
      advanceContinuousSnake({
        ...base,
        speed: 0,
        deltaSeconds: 0,
        snake: [
          { x: 100, y: 100 },
          { x: 80, y: 100 },
          { x: 60, y: 100 },
          { x: 40, y: 100 },
          { x: 105, y: 100 },
        ],
      }).collision,
    ).toBe('self')
  })

  test('wraps the logical plane when configured', () => {
    const result = advanceContinuousSnake({
      snake: [{ x: 2, y: 50 }],
      heading: 180,
      targetHeading: 180,
      speed: 100,
      turnRate: 180,
      deltaSeconds: 0.05,
      segmentSpacing: 10,
      headRadius: 5,
      bodyRadius: 4,
      playfield: { width: 100, height: 100 },
      wrapBoundaries: true,
    })
    expect(result.collision).toBeNull()
    expect(result.snake[0].x).toBe(97)
  })

  test('grows once and accelerates only to the configured cap', () => {
    const snake = growSnake([{ x: 1, y: 2 }])
    expect(snake).toEqual([
      { x: 1, y: 2 },
      { x: 1, y: 2 },
    ])
    expect(getSnakeSpeed(100, 150, 4, 10, 3)).toBe(100)
    expect(getSnakeSpeed(100, 150, 4, 10, 4)).toBe(110)
    expect(getSnakeSpeed(100, 150, 4, 10, 100)).toBe(150)
  })

  test('places pickups away from the head and occupied circles', () => {
    const head = { x: 100, y: 100 }
    const position = findSafeSnakePosition(
      { width: 300, height: 300 },
      10,
      [{ x: 18, y: 18, radius: 8 }],
      80,
      head,
      () => 0,
    )
    expect(position).not.toBeNull()
    expect(distanceBetween(position!, head)).toBeGreaterThanOrEqual(80)
    expect(
      circlesOverlap(
        { ...position!, radius: 10 },
        { x: 18, y: 18, radius: 8 },
      ),
    ).toBe(false)
  })

  test('orients body toward the head connection', () => {
    expect(getSegmentHeading({ x: 10, y: 10 }, { x: 20, y: 10 })).toBe(0)
    expect(getSegmentHeading({ x: 10, y: 10 }, { x: 10, y: 0 })).toBe(270)
  })
})

describe('Onix Snake test entry and scene', () => {
  test('uses a replayable continuous portrait playfield and mineral rewards', () => {
    const game = snakeGames.find((entry) => entry.id === 'onix-snake-test')
    expect(game?.gameType).toBe('snake')
    expect(game?.subCategory).toBe('Test')
    expect(game?.isEligibleForReplay).toBe(true)
    expect(game?.settings.playfield).toEqual({ width: 390, height: 700 })
    expect(game?.settings.turnRate).toBeGreaterThan(0)
    expect(game?.settings.endless?.repeatingRewards?.[0].random).toBe(true)
    expect(
      game?.settings.endless?.repeatingRewards?.[0].rewards.map(
        (reward) => reward.targetId,
      ),
    ).toEqual(['rock-gem', 'ground-gem'])
  })

  test('renders without a grid or D-pad and reverses tail art toward the rear', async () => {
    const source = await Bun.file(
      new URL(
        '../src/app/(frontend)/game/research/encounter/snake.tsx',
        import.meta.url,
      ),
    ).text()
    expect(source).not.toContain('gridTemplateColumns')
    expect(source).not.toContain('DirectionButton')
    expect(source).toContain("kind === 'tail' ? 180 : 0")
    expect(source).toContain('bg-game-ochre/20')
    expect(source).toContain('motion-safe:animate-ping')
  })
})
