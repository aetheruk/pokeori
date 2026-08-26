import type { SurfObstacleConfig } from '@/data/games/surf/types'

export interface SurfBox {
  x: number
  y: number
  width: number
  height: number
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
