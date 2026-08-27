import type { SurfObstacleConfig } from '@/data/games/surf/types'

export interface SurfBox {
  x: number
  y: number
  width: number
  height: number
}

export const SURF_WATERLINE_Y = 0.28
const SURF_COURSE_END_Y = 1.12
const SURF_TRAVEL_DEPTH_EXPONENT = 1.35

export function getSurfCoursePosition(x: number, progress: number) {
  const depth = Math.max(0, progress)
  const perspectiveDepth = depth ** 1.15
  const travelDepth = depth ** SURF_TRAVEL_DEPTH_EXPONENT
  const perspectiveSpread = 0.08 + perspectiveDepth * 0.92

  return {
    x: 0.5 + (x - 0.5) * perspectiveSpread,
    y: SURF_WATERLINE_Y + travelDepth * (SURF_COURSE_END_Y - SURF_WATERLINE_Y),
    scale: 0.12 + perspectiveDepth,
  }
}

export function getSurfEmergenceOpacity(progress: number) {
  const emergence = Math.min(1, Math.max(0, progress / 0.16))
  const smoothed = emergence * emergence * (3 - 2 * emergence)
  return 0.1 + smoothed * 0.9
}

export interface SurfParallaxFrame {
  phase: number
  opacity: number
}

export function getSurfParallaxFrames(
  distance: number,
  cycleDistance: number,
  fadeFraction = 0.14,
): [SurfParallaxFrame, SurfParallaxFrame] {
  const safeDistance = Math.max(0, distance)
  const safeCycleDistance = Math.max(1, cycleDistance)
  const cycle = Math.floor(safeDistance / safeCycleDistance)
  const phase = (safeDistance % safeCycleDistance) / safeCycleDistance
  const fadeProgress = Math.min(
    1,
    Math.max(0, phase / Math.max(0.01, fadeFraction)),
  )
  const smoothedFade = fadeProgress * fadeProgress * (3 - 2 * fadeProgress)
  const isFirstCycle = cycle === 0

  return [
    { phase, opacity: isFirstCycle ? 1 : smoothedFade },
    {
      phase: phase + 1,
      opacity: isFirstCycle ? 0 : 1 - smoothedFade,
    },
  ]
}

export function clampSurfPlayerX(x: number, playerWidth: number) {
  const halfWidth = playerWidth / 2
  return Math.min(1 - halfWidth, Math.max(halfWidth, x))
}

export function moveSurfPlayerTowards(
  currentX: number,
  targetX: number,
  steeringSpeed: number,
  deltaSeconds: number,
  stageWidth: number,
) {
  const maxStep = (steeringSpeed * deltaSeconds) / Math.max(1, stageWidth)
  const delta = targetX - currentX
  if (Math.abs(delta) <= maxStep) return targetX
  return currentX + Math.sign(delta) * maxStep
}

export function getSurfDifficultyMultiplier(difficulty: number) {
  return 1 + (Math.min(10, Math.max(1, difficulty)) - 1) * 0.055
}

export function getSurfObstacleInterval(
  range: { min: number; max: number },
  difficulty: number,
  random: () => number = Math.random,
) {
  const base = range.min + random() * Math.max(0, range.max - range.min)
  return base / getSurfDifficultyMultiplier(difficulty)
}

export function pickSurfSpawnX(
  occupiedXs: number[],
  random: () => number = Math.random,
  minGap = 0.2,
) {
  let bestCandidate = 0.5
  let bestDistance = -1
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const candidate = 0.13 + random() * 0.74
    const nearestDistance = occupiedXs.length
      ? Math.min(...occupiedXs.map((x) => Math.abs(x - candidate)))
      : 1
    if (nearestDistance >= minGap) return candidate
    if (nearestDistance > bestDistance) {
      bestCandidate = candidate
      bestDistance = nearestDistance
    }
  }
  return bestCandidate
}

export function pickSurfObstacle(
  obstacles: SurfObstacleConfig[],
  difficulty: number,
  random: () => number = Math.random,
) {
  const eligible = obstacles.filter(
    (obstacle) => (obstacle.minDifficulty || 1) <= difficulty,
  )
  if (eligible.length === 0) return null

  const totalWeight = eligible.reduce(
    (total, obstacle) => total + Math.max(0, obstacle.weight || 1),
    0,
  )
  if (totalWeight <= 0) return eligible[0]

  let roll = random() * totalWeight
  for (const obstacle of eligible) {
    roll -= Math.max(0, obstacle.weight || 1)
    if (roll <= 0) return obstacle
  }
  return eligible[eligible.length - 1]
}

export function surfBoxesOverlap(a: SurfBox, b: SurfBox) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  )
}
