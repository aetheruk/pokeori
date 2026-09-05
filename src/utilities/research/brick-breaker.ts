import type { BrickBreakerGameSettings } from '@/data/games/brick-breaker/types'

export interface BrickBreakerPoint {
  x: number
  y: number
}

export interface BrickBreakerBall extends BrickBreakerPoint {
  vx: number
  vy: number
  radius: number
}

export interface BrickBreakerBrick {
  id: string
  x: number
  y: number
  width: number
  height: number
  durability: number
  indestructible: boolean
}

export interface BrickBreakerPaddle {
  x: number
  y: number
  width: number
  height: number
}

export interface BrickBreakerStepResult {
  ball: BrickBreakerBall
  bricks: BrickBreakerBrick[]
  hits: number
  lost: boolean
  cleared: boolean
}

export function clampBrickBreakerPaddleX(
  x: number,
  paddleWidth: number,
  playfieldWidth: number,
) {
  return Math.max(0, Math.min(playfieldWidth - paddleWidth, x))
}

export function createBrickBreakerBoard(
  settings: Pick<
    BrickBreakerGameSettings,
    'layout' | 'playfield' | 'brickGap' | 'boardPadding' | 'boardTop'
  >,
): BrickBreakerBrick[] {
  const columns = Math.max(...settings.layout.map((row) => row.length))
  const availableWidth = settings.playfield.width - settings.boardPadding * 2
  const width = (availableWidth - settings.brickGap * (columns - 1)) / columns
  const height = Math.max(18, Math.min(30, width * 0.48))

  return settings.layout.flatMap((row, rowIndex) =>
    [...row].flatMap((cell, columnIndex) => {
      if (cell === '.') return []
      const indestructible = cell === '#'
      return [
        {
          id: `${rowIndex}:${columnIndex}`,
          x: settings.boardPadding + columnIndex * (width + settings.brickGap),
          y: settings.boardTop + rowIndex * (height + settings.brickGap),
          width,
          height,
          durability: indestructible ? Number.POSITIVE_INFINITY : Number(cell),
          indestructible,
        },
      ]
    }),
  )
}

export function getBrickBreakerLaunchBall(
  paddle: BrickBreakerPaddle,
  radius: number,
  speed: number,
): BrickBreakerBall {
  const horizontal = speed * 0.42
  return {
    x: paddle.x + paddle.width / 2,
    y: paddle.y - radius - 2,
    vx: horizontal,
    vy: -Math.sqrt(speed ** 2 - horizontal ** 2),
    radius,
  }
}

export function getBrickBreakerBallSpeed(ball: BrickBreakerBall) {
  return Math.hypot(ball.vx, ball.vy)
}

function accelerateBall(
  ball: BrickBreakerBall,
  acceleration: number,
  maxSpeed: number,
) {
  const speed = getBrickBreakerBallSpeed(ball)
  if (speed === 0) return ball
  const nextSpeed = Math.min(maxSpeed, speed + acceleration)
  const scale = nextSpeed / speed
  return { ...ball, vx: ball.vx * scale, vy: ball.vy * scale }
}

function circleOverlapsRect(
  ball: BrickBreakerBall,
  rect: { x: number; y: number; width: number; height: number },
) {
  const closestX = Math.max(rect.x, Math.min(ball.x, rect.x + rect.width))
  const closestY = Math.max(rect.y, Math.min(ball.y, rect.y + rect.height))
  const dx = ball.x - closestX
  const dy = ball.y - closestY
  return dx * dx + dy * dy < ball.radius * ball.radius
}

export function brickBreakerBallOverlapsRect(
  ball: BrickBreakerBall,
  rect: { x: number; y: number; width: number; height: number },
) {
  return circleOverlapsRect(ball, rect)
}

export function reflectBrickBreakerPaddle(
  ball: BrickBreakerBall,
  paddle: BrickBreakerPaddle,
  maxSpeed: number,
) {
  const speed = Math.min(maxSpeed, Math.max(1, getBrickBreakerBallSpeed(ball)))
  const relativeHit = Math.max(
    -1,
    Math.min(1, (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2)),
  )
  const angle = relativeHit * (Math.PI * 0.38)
  return {
    ...ball,
    y: paddle.y - ball.radius,
    vx: Math.sin(angle) * speed,
    vy: -Math.abs(Math.cos(angle) * speed),
  }
}

export function stepBrickBreaker(
  initialBall: BrickBreakerBall,
  initialBricks: BrickBreakerBrick[],
  paddle: BrickBreakerPaddle,
  settings: Pick<BrickBreakerGameSettings, 'playfield' | 'ball'>,
  deltaSeconds: number,
): BrickBreakerStepResult {
  let ball = { ...initialBall }
  const bricks = initialBricks.map((brick) => ({ ...brick }))
  let hits = 0
  const travel = getBrickBreakerBallSpeed(ball) * Math.max(0, deltaSeconds)
  const steps = Math.max(1, Math.ceil(travel / Math.max(2, ball.radius * 0.65)))
  const stepSeconds = Math.max(0, deltaSeconds) / steps

  for (let step = 0; step < steps; step += 1) {
    const previous = ball
    ball = {
      ...ball,
      x: ball.x + ball.vx * stepSeconds,
      y: ball.y + ball.vy * stepSeconds,
    }

    if (ball.x - ball.radius <= 0 && ball.vx < 0) {
      ball.x = ball.radius
      ball.vx = Math.abs(ball.vx)
    } else if (
      ball.x + ball.radius >= settings.playfield.width &&
      ball.vx > 0
    ) {
      ball.x = settings.playfield.width - ball.radius
      ball.vx = -Math.abs(ball.vx)
    }
    if (ball.y - ball.radius <= 0 && ball.vy < 0) {
      ball.y = ball.radius
      ball.vy = Math.abs(ball.vy)
    }

    if (ball.vy > 0 && circleOverlapsRect(ball, paddle)) {
      ball = reflectBrickBreakerPaddle(ball, paddle, settings.ball.maxSpeed)
    }

    const brickIndex = bricks.findIndex((brick) =>
      circleOverlapsRect(ball, brick),
    )
    if (brickIndex >= 0) {
      const brick = bricks[brickIndex]
      const crossedSide =
        previous.x + ball.radius <= brick.x ||
        previous.x - ball.radius >= brick.x + brick.width
      if (crossedSide) ball.vx *= -1
      else ball.vy *= -1
      ball = accelerateBall(
        ball,
        settings.ball.accelerationPerHit,
        settings.ball.maxSpeed,
      )
      if (!brick.indestructible) {
        hits += 1
        if (brick.durability <= 1) bricks.splice(brickIndex, 1)
        else bricks[brickIndex] = { ...brick, durability: brick.durability - 1 }
      }
    }

    if (ball.y - ball.radius > settings.playfield.height) {
      return {
        ball,
        bricks,
        hits,
        lost: true,
        cleared: !bricks.some((brick) => !brick.indestructible),
      }
    }
  }

  return {
    ball,
    bricks,
    hits,
    lost: false,
    cleared: !bricks.some((brick) => !brick.indestructible),
  }
}
