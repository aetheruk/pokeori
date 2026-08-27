import { describe, expect, test } from 'bun:test'
import type { SurfObstacleConfig } from '@/data/games/surf/types'
import {
  clampSurfPlayerX,
  getSurfCoursePosition,
  getSurfDifficultyMultiplier,
  getSurfEmergenceOpacity,
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

  test('introduces course objects at the waterline with distant scale and fade', () => {
    const horizon = getSurfCoursePosition(0.2, 0)
    const emerged = getSurfCoursePosition(0.2, 0.16)
    const nearPlayer = getSurfCoursePosition(0.2, 1)

    expect(horizon.y).toBe(0.28)
    expect(horizon.scale).toBe(0.12)
    expect(horizon.x).toBeCloseTo(0.476)
    expect(emerged.scale).toBeGreaterThan(horizon.scale)
    expect(getSurfCoursePosition(0.5, 0.7).y).toBeCloseTo(0.799, 2)
    expect(nearPlayer.y).toBe(1.12)
    expect(nearPlayer.scale).toBeCloseTo(1.12)
    expect(getSurfEmergenceOpacity(0)).toBe(0.1)
    expect(getSurfEmergenceOpacity(0.08)).toBeCloseTo(0.55)
    expect(getSurfEmergenceOpacity(0.16)).toBe(1)
  })

  test('accelerates course objects as they approach the observer', () => {
    const positions = [0, 0.25, 0.5, 0.75, 1].map(
      (progress) => getSurfCoursePosition(0.5, progress).y,
    )
    const travelSteps = positions.slice(1).map((position, index) =>
      position - positions[index],
    )

    expect(travelSteps[1]).toBeGreaterThan(travelSteps[0])
    expect(travelSteps[2]).toBeGreaterThan(travelSteps[1])
    expect(travelSteps[3]).toBeGreaterThan(travelSteps[2])
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

describe('Surf wake layout', () => {
  test('centres the animated soft wake exactly once', async () => {
    const componentSource = await Bun.file(
      new URL(
        '../src/app/(frontend)/game/research/encounter/surf.tsx',
        import.meta.url,
      ),
    ).text()

    const softWakeElement =
      componentSource.match(/<div className="surf-wake-soft[^\n]+/)?.[0] || ''

    expect(softWakeElement).toContain('left-1/2')
    expect(softWakeElement).not.toContain('-translate-x-1/2')
    expect(componentSource).toContain('transform: translateX(-50%);')
  })
})
