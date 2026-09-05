import type { SnakeDirection, SnakePosition } from '@/data/games/snake/types'

export interface SnakeStepInput {
  snake: SnakePosition[]
  direction: SnakeDirection
  food: SnakePosition | null
  walls?: SnakePosition[]
  columns: number
  rows: number
  wrapBoundaries?: boolean
}

export interface SnakeStepResult {
  snake: SnakePosition[]
  ateFood: boolean
  collision: 'boundary' | 'self' | 'wall' | null
}

const DIRECTION_VECTOR: Record<SnakeDirection, SnakePosition> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

const OPPOSITE_DIRECTION: Record<SnakeDirection, SnakeDirection> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

export function positionsEqual(a: SnakePosition, b: SnakePosition) {
  return a.x === b.x && a.y === b.y
}

export function canTurn(
  currentDirection: SnakeDirection,
  nextDirection: SnakeDirection,
) {
  return OPPOSITE_DIRECTION[currentDirection] !== nextDirection
}

export function createInitialSnake(
  head: SnakePosition,
  length: number,
  direction: SnakeDirection,
): SnakePosition[] {
  const vector = DIRECTION_VECTOR[direction]
  return Array.from({ length }, (_, index) => ({
    x: head.x - vector.x * index,
    y: head.y - vector.y * index,
  }))
}

export function getSnakeTickMs(
  initialTickMs: number,
  minTickMs: number,
  speedUpEvery: number,
  speedUpByMs: number,
  foodEaten: number,
) {
  const increases = speedUpEvery > 0 ? Math.floor(foodEaten / speedUpEvery) : 0
  return Math.max(minTickMs, initialTickMs - increases * speedUpByMs)
}

export function advanceSnake({
  snake,
  direction,
  food,
  walls = [],
  columns,
  rows,
  wrapBoundaries = false,
}: SnakeStepInput): SnakeStepResult {
  if (snake.length === 0) {
    return { snake, ateFood: false, collision: 'self' }
  }

  const vector = DIRECTION_VECTOR[direction]
  let nextHead = {
    x: snake[0].x + vector.x,
    y: snake[0].y + vector.y,
  }

  const outside =
    nextHead.x < 0 ||
    nextHead.x >= columns ||
    nextHead.y < 0 ||
    nextHead.y >= rows

  if (outside && !wrapBoundaries) {
    return { snake, ateFood: false, collision: 'boundary' }
  }

  if (wrapBoundaries) {
    nextHead = {
      x: (nextHead.x + columns) % columns,
      y: (nextHead.y + rows) % rows,
    }
  }

  if (walls.some((wall) => positionsEqual(wall, nextHead))) {
    return { snake, ateFood: false, collision: 'wall' }
  }

  const ateFood = food !== null && positionsEqual(nextHead, food)
  // Moving into the old tail cell is legal when the tail advances this tick.
  const occupiedBody = ateFood ? snake : snake.slice(0, -1)
  if (occupiedBody.some((segment) => positionsEqual(segment, nextHead))) {
    return { snake, ateFood: false, collision: 'self' }
  }

  return {
    snake: [nextHead, ...(ateFood ? snake : snake.slice(0, -1))],
    ateFood,
    collision: null,
  }
}

export function findSafeSnakeCell(
  columns: number,
  rows: number,
  occupiedGroups: ReadonlyArray<ReadonlyArray<SnakePosition>>,
  random: () => number = Math.random,
): SnakePosition | null {
  const occupied = new Set(
    occupiedGroups.flatMap((group) =>
      group.map((position) => `${position.x}:${position.y}`),
    ),
  )
  const available: SnakePosition[] = []

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      if (!occupied.has(`${x}:${y}`)) available.push({ x, y })
    }
  }

  if (available.length === 0) return null
  const index = Math.min(
    available.length - 1,
    Math.max(0, Math.floor(random() * available.length)),
  )
  return available[index]
}

export function directionBetween(
  from: SnakePosition,
  to: SnakePosition,
): SnakeDirection {
  if (to.x > from.x) return 'right'
  if (to.x < from.x) return 'left'
  if (to.y > from.y) return 'down'
  return 'up'
}
