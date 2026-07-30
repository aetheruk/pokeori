import type { PachinkoBucket } from '@/data/games/pachinko/types'

export const PACHINKO_WALL_WIDTH = 10
export const PACHINKO_BUCKET_RAIL_WIDTH = 6
export const PACHINKO_BUCKET_SENSOR_HEIGHT = 2
export const PACHINKO_DROP_TIMEOUT_MS = 30_000

export function getPachinkoDropX({
  arrowPosition,
  boardWidth,
  ballRadius,
}: {
  arrowPosition: number
  boardWidth: number
  ballRadius: number
}) {
  const boundedPosition = Math.min(100, Math.max(0, arrowPosition))
  const wallInset = PACHINKO_WALL_WIDTH / 2 + ballRadius + 1
  const playableWidth = Math.max(0, boardWidth - wallInset * 2)

  return wallInset + (boundedPosition / 100) * playableWidth
}

export function getPachinkoBucketSensor(
  bucket: PachinkoBucket,
  ballRadius: number,
) {
  const width = Math.max(
    2,
    bucket.width - PACHINKO_BUCKET_RAIL_WIDTH - ballRadius * 2,
  )
  const y =
    bucket.y +
    bucket.height / 2 -
    PACHINKO_BUCKET_RAIL_WIDTH / 2 -
    ballRadius -
    PACHINKO_BUCKET_SENSOR_HEIGHT / 2

  return {
    x: bucket.x,
    y,
    width,
    height: PACHINKO_BUCKET_SENSOR_HEIGHT,
  }
}
