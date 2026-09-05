import { describe, expect, test } from 'bun:test'
import { snakeGames } from '@/data/games/snake'
import {
  advanceSnake,
  canTurn,
  createInitialSnake,
  findSafeSnakeCell,
  getSnakeTickMs,
} from '@/utilities/research/snake'

describe('Snake game mechanics', () => {
  test('creates the initial body behind the configured heading', () => {
    expect(createInitialSnake({ x: 4, y: 3 }, 4, 'right')).toEqual([
      { x: 4, y: 3 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
    ])
    expect(createInitialSnake({ x: 2, y: 4 }, 3, 'up')).toEqual([
      { x: 2, y: 4 },
      { x: 2, y: 5 },
      { x: 2, y: 6 },
    ])
  })

  test('moves without growing and permits moving into the departing tail', () => {
    const result = advanceSnake({
      snake: [
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 1, y: 2 },
        { x: 1, y: 1 },
      ],
      direction: 'left',
      food: null,
      columns: 5,
      rows: 5,
    })
    expect(result.collision).toBeNull()
    expect(result.snake).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
    ])
  })

  test('grows and reports food collection', () => {
    const result = advanceSnake({
      snake: [
        { x: 2, y: 2 },
        { x: 1, y: 2 },
      ],
      direction: 'right',
      food: { x: 3, y: 2 },
      columns: 6,
      rows: 6,
    })
    expect(result.ateFood).toBe(true)
    expect(result.snake).toHaveLength(3)
    expect(result.snake[0]).toEqual({ x: 3, y: 2 })
  })

  test('rejects immediate reversals', () => {
    expect(canTurn('right', 'left')).toBe(false)
    expect(canTurn('right', 'up')).toBe(true)
    expect(canTurn('up', 'up')).toBe(true)
  })

  test('detects boundary, wall, and self collisions', () => {
    expect(
      advanceSnake({
        snake: [{ x: 0, y: 1 }],
        direction: 'left',
        food: null,
        columns: 3,
        rows: 3,
      }).collision,
    ).toBe('boundary')
    expect(
      advanceSnake({
        snake: [{ x: 1, y: 1 }],
        direction: 'right',
        food: null,
        walls: [{ x: 2, y: 1 }],
        columns: 3,
        rows: 3,
      }).collision,
    ).toBe('wall')
    expect(
      advanceSnake({
        snake: [
          { x: 2, y: 1 },
          { x: 2, y: 2 },
          { x: 1, y: 2 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
        ],
        direction: 'left',
        food: null,
        columns: 4,
        rows: 4,
      }).collision,
    ).toBe('self')
  })

  test('wraps each boundary when configured', () => {
    const horizontal = advanceSnake({
      snake: [{ x: 0, y: 1 }],
      direction: 'left',
      food: null,
      columns: 4,
      rows: 3,
      wrapBoundaries: true,
    })
    const vertical = advanceSnake({
      snake: [{ x: 2, y: 0 }],
      direction: 'up',
      food: null,
      columns: 4,
      rows: 3,
      wrapBoundaries: true,
    })
    expect(horizontal.snake[0]).toEqual({ x: 3, y: 1 })
    expect(vertical.snake[0]).toEqual({ x: 2, y: 2 })
  })

  test('accelerates at configured food intervals without passing the floor', () => {
    expect(getSnakeTickMs(150, 78, 4, 8, 3)).toBe(150)
    expect(getSnakeTickMs(150, 78, 4, 8, 4)).toBe(142)
    expect(getSnakeTickMs(150, 78, 4, 8, 400)).toBe(78)
  })

  test('places food only in safe cells and handles a full board', () => {
    const occupied = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ]
    expect(findSafeSnakeCell(2, 2, [occupied], () => 0)).toEqual({ x: 1, y: 1 })
    expect(
      findSafeSnakeCell(2, 2, [[...occupied, { x: 1, y: 1 }]], () => 0),
    ).toBeNull()
  })
})

describe('Onix Snake test entry', () => {
  test('is an endless replayable Test game with collectible mineral rewards', () => {
    const game = snakeGames.find((entry) => entry.id === 'onix-snake-test')
    expect(game).toBeDefined()
    expect(game?.gameType).toBe('snake')
    expect(game?.subCategory).toBe('Test')
    expect(game?.isEligibleForReplay).toBe(true)
    expect(game?.settings.endless?.enabled).toBe(true)
    expect(game?.settings.endless?.repeatingRewards?.[0].random).toBe(true)
    expect(
      game?.settings.endless?.repeatingRewards?.[0].rewards.map(
        (reward) => reward.targetId,
      ),
    ).toEqual(['rock-gem', 'ground-gem'])
  })

  test('uses a dedicated original rock-serpent sprite set', async () => {
    const sprites = snakeGames[0].settings.sprites
    expect(sprites).toEqual({
      head: '/games/snake/sprites/rock-serpent-head.avif',
      body: '/games/snake/sprites/rock-serpent-body.avif',
      tail: '/games/snake/sprites/rock-serpent-tail.avif',
    })

    for (const sprite of Object.values(sprites)) {
      const file = Bun.file(`public${sprite}`)
      expect(await file.exists()).toBe(true)
      expect(file.type).toBe('image/avif')
      expect(file.size).toBeGreaterThan(0)
    }
  })
})
