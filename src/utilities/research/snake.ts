import type {
  SnakeObstacle,
  SnakePosition,
} from '@/data/games/snake/types'

export interface SnakeCircle extends SnakePosition {
  radius: number
}

export interface ContinuousSnakeStepInput {
  snake: SnakePosition[]
  heading: number
  targetHeading: number
  speed: number
  turnRate: number
  deltaSeconds: number
  segmentSpacing: number
  headRadius: number
  bodyRadius: number
  playfield: { width: number; height: number }
  obstacles?: SnakeObstacle[]
  wrapBoundaries?: boolean
}

export interface ContinuousSnakeStepResult {
  snake: SnakePosition[]
  heading: number
  collision: 'boundary' | 'self' | 'obstacle' | null
}

export function distanceBetween(a: SnakePosition, b: SnakePosition) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

export function circlesOverlap(a: SnakeCircle, b: SnakeCircle) {
  return distanceBetween(a, b) < a.radius + b.radius
}

/** Detect a moving circle crossing a stationary pickup between render frames. */
export function sweptCircleIntersects(
  start: SnakePosition,
  end: SnakePosition,
  movingRadius: number,
  target: SnakeCircle,
  maximumSweepDistance = Number.POSITIVE_INFINITY,
) {
  const travelX = end.x - start.x
  const travelY = end.y - start.y
  const travelSquared = travelX * travelX + travelY * travelY
  if (travelSquared > maximumSweepDistance * maximumSweepDistance) {
    // A boundary wrap teleports the head across the seam; it must not sweep a
    // collision chord through the middle of the playfield.
    return circlesOverlap({ ...end, radius: movingRadius }, target)
  }
  const projection =
    travelSquared === 0
      ? 0
      : Math.max(
          0,
          Math.min(
            1,
            ((target.x - start.x) * travelX +
              (target.y - start.y) * travelY) /
              travelSquared,
          ),
        )
  const closest = {
    x: start.x + travelX * projection,
    y: start.y + travelY * projection,
  }
  return distanceBetween(closest, target) <= movingRadius + target.radius
}

export function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360
}

export function shortestAngleDelta(from: number, to: number) {
  return ((normalizeAngle(to) - normalizeAngle(from) + 540) % 360) - 180
}

export function turnToward(
  heading: number,
  targetHeading: number,
  maximumTurn: number,
) {
  const delta = shortestAngleDelta(heading, targetHeading)
  return normalizeAngle(
    heading + Math.max(-maximumTurn, Math.min(maximumTurn, delta)),
  )
}

export function headingToward(from: SnakePosition, to: SnakePosition) {
  return normalizeAngle(
    (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI,
  )
}

export function createInitialSnake(
  head: SnakePosition,
  length: number,
  heading: number,
  segmentSpacing: number,
): SnakePosition[] {
  const radians = (heading * Math.PI) / 180
  return Array.from({ length }, (_, index) => ({
    x: head.x - Math.cos(radians) * segmentSpacing * index,
    y: head.y - Math.sin(radians) * segmentSpacing * index,
  }))
}

export function getSnakeSpeed(
  initialSpeed: number,
  maxSpeed: number,
  speedUpEvery: number,
  speedUpBy: number,
  foodEaten: number,
) {
  const increases =
    speedUpEvery > 0 ? Math.floor(foodEaten / speedUpEvery) : 0
  return Math.min(maxSpeed, initialSpeed + increases * speedUpBy)
}

export function advanceContinuousSnake({
  snake,
  heading,
  targetHeading,
  speed,
  turnRate,
  deltaSeconds,
  segmentSpacing,
  headRadius,
  bodyRadius,
  playfield,
  obstacles = [],
  wrapBoundaries = false,
}: ContinuousSnakeStepInput): ContinuousSnakeStepResult {
  if (snake.length === 0) {
    return { snake, heading, collision: 'self' }
  }

  const safeDelta = Math.max(0, Math.min(deltaSeconds, 0.05))
  const nextHeading = turnToward(
    heading,
    targetHeading,
    turnRate * safeDelta,
  )
  const radians = (nextHeading * Math.PI) / 180
  let bodySource = snake
  let head = {
    x: snake[0].x + Math.cos(radians) * speed * safeDelta,
    y: snake[0].y + Math.sin(radians) * speed * safeDelta,
  }

  const outside =
    head.x < headRadius ||
    head.x > playfield.width - headRadius ||
    head.y < headRadius ||
    head.y > playfield.height - headRadius
  if (outside && !wrapBoundaries) {
    return { snake, heading: nextHeading, collision: 'boundary' }
  }
  if (wrapBoundaries) {
    const wrappedHead = {
      x: (head.x + playfield.width) % playfield.width,
      y: (head.y + playfield.height) % playfield.height,
    }
    if (outside) {
      const shiftX = wrappedHead.x - head.x
      const shiftY = wrappedHead.y - head.y
      bodySource = snake.map((segment) => ({
        x: (segment.x + shiftX + playfield.width) % playfield.width,
        y: (segment.y + shiftY + playfield.height) % playfield.height,
      }))
    }
    head = wrappedHead
  }

  if (
    obstacles.some((obstacle) =>
      circlesOverlap({ ...head, radius: headRadius }, obstacle),
    )
  ) {
    return { snake, heading: nextHeading, collision: 'obstacle' }
  }

  const nextSnake = [head]
  for (let index = 1; index < bodySource.length; index += 1) {
    const leader = nextSnake[index - 1]
    const follower = bodySource[index]
    const distance = distanceBetween(leader, follower)
    if (distance <= segmentSpacing) {
      nextSnake.push(follower)
      continue
    }
    const ratio = segmentSpacing / distance
    nextSnake.push({
      x: leader.x + (follower.x - leader.x) * ratio,
      y: leader.y + (follower.y - leader.y) * ratio,
    })
  }

  // Ignore the neck so adjacent art can overlap without causing a false hit.
  const selfCollision = nextSnake
    .slice(4)
    .some(
      (segment) =>
        distanceBetween(head, segment) < (headRadius + bodyRadius) * 0.72,
    )
  return {
    snake: nextSnake,
    heading: nextHeading,
    collision: selfCollision ? 'self' : null,
  }
}

export function growSnake(snake: SnakePosition[]) {
  if (snake.length === 0) return snake
  return [...snake, { ...snake[snake.length - 1] }]
}

export function findSafeSnakePosition(
  playfield: { width: number; height: number },
  radius: number,
  occupied: ReadonlyArray<SnakeCircle>,
  minimumHeadDistance: number,
  head: SnakePosition,
  random: () => number = Math.random,
): SnakePosition | null {
  const padding = radius + 8
  const isSafe = (position: SnakePosition) =>
    distanceBetween(position, head) >= minimumHeadDistance &&
    occupied.every(
      (circle) =>
        distanceBetween(position, circle) >= radius + circle.radius + 4,
    )

  for (let attempt = 0; attempt < 80; attempt += 1) {
    const candidate = {
      x: padding + random() * Math.max(0, playfield.width - padding * 2),
      y: padding + random() * Math.max(0, playfield.height - padding * 2),
    }
    if (isSafe(candidate)) return candidate
  }

  const step = Math.max(radius * 2 + 8, 24)
  for (let y = padding; y <= playfield.height - padding; y += step) {
    for (let x = padding; x <= playfield.width - padding; x += step) {
      const candidate = { x, y }
      if (isSafe(candidate)) return candidate
    }
  }
  return null
}

export function getSegmentHeading(
  segment: SnakePosition,
  towardHead: SnakePosition,
) {
  return headingToward(segment, towardHead)
}
