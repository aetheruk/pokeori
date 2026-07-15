import type { CaptureThrowPoint } from './catch-balance'

export function getPathDistance(points: CaptureThrowPoint[]): number {
  return points.slice(1).reduce((sum, point, index) => {
    const previous = points[index]
    return sum + Math.hypot(point.x - previous.x, point.y - previous.y)
  }, 0)
}

export function isFocusCircleGesture(
  points: CaptureThrowPoint[],
  center: CaptureThrowPoint,
): boolean {
  if (points.length < 16) return false

  const first = points[0]
  const last = points[points.length - 1]
  const closedLoop = Math.hypot(first.x - last.x, first.y - last.y) <= 74
  if (!closedLoop) return false

  const distance = getPathDistance(points)
  if (distance < 300) return false

  const radii = points.map((point) => Math.hypot(point.x - center.x, point.y - center.y))
  const averageRadius = radii.reduce((sum, radius) => sum + radius, 0) / radii.length
  if (averageRadius < 52 || averageRadius > 150) return false

  const averagePoint = points.reduce(
    (sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }),
    { x: 0, y: 0 },
  )
  averagePoint.x /= points.length
  averagePoint.y /= points.length

  return Math.hypot(averagePoint.x - center.x, averagePoint.y - center.y) <= 70
}

export function getFocusCircleProgress(
  points: CaptureThrowPoint[],
  center: CaptureThrowPoint,
): number {
  if (points.length < 4) return 0

  let angleTravel = 0
  let previousAngle = Math.atan2(points[0].y - center.y, points[0].x - center.x)
  let validRadiusPoints = 0

  for (const point of points.slice(1)) {
    const radius = Math.hypot(point.x - center.x, point.y - center.y)
    if (radius >= 34 && radius <= 190) validRadiusPoints += 1

    const angle = Math.atan2(point.y - center.y, point.x - center.x)
    let delta = angle - previousAngle
    if (delta > Math.PI) delta -= Math.PI * 2
    if (delta < -Math.PI) delta += Math.PI * 2
    angleTravel += delta
    previousAngle = angle
  }

  const validRadiusRatio = validRadiusPoints / Math.max(1, points.length - 1)
  if (validRadiusRatio < 0.62) return 0
  if (getPathDistance(points) < 170) return 0

  return Math.min(1, Math.abs(angleTravel) / (Math.PI * 2))
}

export function isFocusCircleProgressComplete(
  points: CaptureThrowPoint[],
  center: CaptureThrowPoint,
): boolean {
  return getFocusCircleProgress(points, center) >= 0.88
}
