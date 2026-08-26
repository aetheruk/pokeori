import { describe, expect, test } from 'bun:test'
import type { SurfObstacleConfig } from '@/data/games/surf/types'
import {
  clampSurfPlayerX,
  getSurfDifficultyMultiplier,
  getSurfObstacleInterval,
  moveSurfPlayerTowards,
  pickSurfObstacle,
  pickSurfSpawnX,
  surfBoxesOverlap,
} from '@/utilities/research/surf'

const obstacles: SurfObstacleConfig[] = [
  { sprite: '/rock.avif', width: 100, height: 100, weight: 3 },
  {
    sprite: '/buoy.avif',
    width: 80,
    height: 80,
    weight: 1,
    minDifficulty: 4,
  },
]

describe('Surf game mechanics', () => {
  test('clamps the player inside the course edges', () => {
    expect(clampSurfPlayerX(-1, 0.2)).toBe(0.1)
    expect(clampSurfPlayerX(2, 0.2)).toBe(0.9)
    expect(clampSurfPlayerX(0.55, 0.2)).toBe(0.55)
  })

  test('steers toward the pointer target using delta time', () => {
    expect(moveSurfPlayerTowards(0.5, 0.9, 100, 0.1, 400)).toBe(0.525)
    expect(moveSurfPlayerTowards(0.5, 0.51, 100, 0.1, 400)).toBe(0.51)
  })

  test('difficulty shortens obstacle intervals predictably', () => {
    expect(getSurfDifficultyMultiplier(1)).toBe(1)
    expect(getSurfDifficultyMultiplier(10)).toBeCloseTo(1.495)
    expect(getSurfObstacleInterval({ min: 1, max: 2 }, 1, () => 0)).toBe(1)
    expect(
      getSurfObstacleInterval({ min: 1, max: 2 }, 10, () => 0),
    ).toBeLessThan(1)
  })

  test('filters and weights obstacles by authored difficulty', () => {
    expect(pickSurfObstacle(obstacles, 1, () => 0.99)?.sprite).toBe(
      '/rock.avif',
    )
    expect(pickSurfObstacle(obstacles, 4, () => 0.99)?.sprite).toBe(
      '/buoy.avif',
    )
  })

  test('keeps new hazards and prizes away from occupied horizon lanes', () => {
    const rolls = [0.5, 0, 1]
    let index = 0
    expect(pickSurfSpawnX([0.5], () => rolls[index++], 0.2)).toBe(0.13)
  })

  test('detects overlap without treating touching edges as collisions', () => {
    const player = { x: 0.4, y: 0.7, width: 0.2, height: 0.15 }
    expect(
      surfBoxesOverlap(player, { x: 0.5, y: 0.75, width: 0.1, height: 0.1 }),
    ).toBe(true)
    expect(
      surfBoxesOverlap(player, { x: 0.61, y: 0.7, width: 0.1, height: 0.1 }),
    ).toBe(false)
  })
})
