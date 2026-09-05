import { describe, expect, test } from 'bun:test'
import type { BrickBreakerGameSettings } from '@/data/games/brick-breaker/types'
import {
  clampBrickBreakerPaddleX,
  createBrickBreakerBoard,
  getBrickBreakerBallSpeed,
  getBrickBreakerLaunchBall,
  reflectBrickBreakerPaddle,
  stepBrickBreaker,
} from '@/utilities/research/brick-breaker'

const settings: BrickBreakerGameSettings = {
  playfield: { width: 390, height: 640 },
  layout: ['12#'],
  brickPokemonIds: ['74', '95'],
  brickGap: 5,
  boardPadding: 15,
  boardTop: 80,
  paddle: { width: 80, height: 14, speed: 400 },
  ball: {
    radius: 7,
    initialSpeed: 280,
    maxSpeed: 420,
    accelerationPerHit: 4,
  },
  lives: 3,
  pointsPerHit: 10,
}

describe('Brick Breaker mechanics', () => {
  test('builds durability and indestructible bricks from the character layout', () => {
    const bricks = createBrickBreakerBoard(settings)
    expect(
      bricks.map(({ durability, indestructible }) => ({
        durability,
        indestructible,
      })),
    ).toEqual([
      { durability: 1, indestructible: false },
      { durability: 2, indestructible: false },
      { durability: Infinity, indestructible: true },
    ])
    expect(bricks[2].x + bricks[2].width).toBeCloseTo(375)
    expect(bricks[0].height).toBeCloseTo(bricks[0].width)
  })

  test('clamps the paddle within both field edges', () => {
    expect(clampBrickBreakerPaddleX(-20, 80, 390)).toBe(0)
    expect(clampBrickBreakerPaddleX(500, 80, 390)).toBe(310)
    expect(clampBrickBreakerPaddleX(120, 80, 390)).toBe(120)
  })

  test('launches a speed-normalized ball from the paddle', () => {
    const ball = getBrickBreakerLaunchBall(
      { x: 100, y: 600, width: 80, height: 14 },
      7,
      280,
    )
    expect(ball.x).toBe(140)
    expect(ball.vy).toBeLessThan(0)
    expect(getBrickBreakerBallSpeed(ball)).toBeCloseTo(280)
  })

  test('uses paddle contact position to aim the rebound', () => {
    const paddle = { x: 100, y: 600, width: 100, height: 14 }
    const left = reflectBrickBreakerPaddle(
      { x: 105, y: 598, vx: 0, vy: 300, radius: 7 },
      paddle,
      400,
    )
    const right = reflectBrickBreakerPaddle(
      { x: 195, y: 598, vx: 0, vy: 300, radius: 7 },
      paddle,
      400,
    )
    expect(left.vx).toBeLessThan(0)
    expect(right.vx).toBeGreaterThan(0)
    expect(left.vy).toBeLessThan(0)
  })

  test('damages a brick, scores a hit, and accelerates the ball', () => {
    const brick = {
      id: 'brick',
      x: 100,
      y: 100,
      width: 80,
      height: 25,
      durability: 2,
      indestructible: false,
    }
    const result = stepBrickBreaker(
      { x: 140, y: 140, vx: 0, vy: -300, radius: 7 },
      [brick],
      { x: 100, y: 600, width: 80, height: 14 },
      settings,
      0.12,
    )
    expect(result.hits).toBe(1)
    expect(result.bricks[0].durability).toBe(1)
    expect(getBrickBreakerBallSpeed(result.ball)).toBeGreaterThan(300)
  })

  test('substeps fast movement so a thin brick cannot be tunnelled through', () => {
    const brick = {
      id: 'brick',
      x: 100,
      y: 100,
      width: 80,
      height: 18,
      durability: 1,
      indestructible: false,
    }
    const result = stepBrickBreaker(
      { x: 140, y: 170, vx: 0, vy: -900, radius: 5 },
      [brick],
      { x: 100, y: 600, width: 80, height: 14 },
      { ...settings, ball: { ...settings.ball, maxSpeed: 900 } },
      0.1,
    )
    expect(result.hits).toBe(1)
    expect(result.cleared).toBe(true)
  })

  test('keeps indestructible bricks and does not award points for them', () => {
    const brick = {
      id: 'wall',
      x: 100,
      y: 100,
      width: 80,
      height: 25,
      durability: Infinity,
      indestructible: true,
    }
    const result = stepBrickBreaker(
      { x: 140, y: 140, vx: 0, vy: -300, radius: 7 },
      [brick],
      { x: 100, y: 600, width: 80, height: 14 },
      settings,
      0.12,
    )
    expect(result.hits).toBe(0)
    expect(result.bricks).toHaveLength(1)
    expect(result.ball.vy).toBeGreaterThan(0)
  })

  test('reports a lost ball below the playfield', () => {
    const result = stepBrickBreaker(
      { x: 200, y: 635, vx: 0, vy: 300, radius: 7 },
      createBrickBreakerBoard(settings),
      { x: 0, y: 600, width: 80, height: 14 },
      settings,
      0.1,
    )
    expect(result.lost).toBe(true)
  })
})

describe('Brick Breaker presentation', () => {
  test('renders configurable Pokemon gems over a full-scene playfield with a Poké Ball paddle', async () => {
    const source = await Bun.file(
      new URL(
        '../src/app/(frontend)/game/research/encounter/brick-breaker.tsx',
        import.meta.url,
      ),
    ).text()

    expect(source).toContain('settings.brickPokemonIds[')
    expect(source).toContain("getPokemonImageUrl(pokemonId, 'sprite')")
    expect(source).toContain(
      ['aspectRatio: `', '$', '{width} / ', '$', '{height}`'].join(''),
    )
    expect(source).toContain(
      ['maxWidth: `', '$', '{(width / height) * 100}dvh`'].join(''),
    )
    expect(source).not.toContain('game-activity-panel')
    expect(source).toContain("aspectRatio: '1 / 1'")
    expect(source).toContain('rounded-lg')
    expect(source).toContain('color-mix(in srgb,')
    expect(source).toContain('crystalColor} 70%, white)')
    expect(source).not.toContain('clipPath:')
    expect(source).toContain('!brick.indestructible &&')
    expect(source).toContain('width={64}')
    expect(source).toContain('height={64}')
    expect(source).toContain('h-[78%] w-[78%] object-contain')
    expect(source).not.toContain('max-w-[calc(100dvh*0.609375)]')
    expect(source).toContain('bg-[#c84d43]')
    expect(source).toContain('rounded-full border-2 border-[#202826] bg-white')
    expect(source).toContain(
      'border border-game-ochre/70 bg-game-ochre/20 shadow-[0_0_18px_rgba(181,138,67,0.55)]',
    )
    expect(source).toContain('motion-safe:animate-ping')
    expect(source).toContain("void finish(false, 'Survey ended early.')")
    expect(source).toContain('disabled={!started || ended || Boolean(result)}')
    expect(source).not.toContain("onClick={() => router.push('/game/explore')}")
  })
})
