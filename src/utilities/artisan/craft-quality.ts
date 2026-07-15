import type { ArtisanCraftQuality, ArtisanCraftTimingWindow } from '@/utilities/artisan/types'

export type { ArtisanCraftQuality, ArtisanCraftTimingWindow } from '@/utilities/artisan/types'

export function getCraftBarPosition(ratio: number) {
  const clamped = Math.min(1, Math.max(0, ratio))
  return clamped ** 1.85
}

export function getArtisanHoldBarWindow(targetElapsedMs: number, windowMs: number, durationMs: number) {
  const duration = Math.max(1, durationMs)
  const left = getCraftBarPosition((targetElapsedMs - windowMs) / duration) * 100
  const right = getCraftBarPosition((targetElapsedMs + windowMs) / duration) * 100

  return {
    left,
    right,
    width: Math.max(0, right - left),
    center: getCraftBarPosition(targetElapsedMs / duration) * 100,
  }
}

export function getArtisanCraftQuality(
  completedAt: number,
  session: ArtisanCraftTimingWindow,
): ArtisanCraftQuality {
  const delta = Math.abs(completedAt - session.targetAt)
  if (delta <= session.perfectWindowMs) return 'perfect'
  if (delta <= session.goodWindowMs) return 'good'
  return 'bad'
}

export function getArtisanHoldQuality(
  heldDurationMs: number[],
  session: ArtisanCraftTimingWindow,
): ArtisanCraftQuality {
  const fallbackTargetElapsed =
    typeof session.startAt === 'number'
      ? session.targetAt - session.startAt
      : session.targetAt
  const targetOffsets =
    session.holdTargetOffsetsMs && session.holdTargetOffsetsMs.length > 0
      ? session.holdTargetOffsetsMs
      : [fallbackTargetElapsed]
  const successes = heldDurationMs.slice(0, 3).filter((heldDuration, index) => {
    if (typeof heldDuration !== 'number' || !Number.isFinite(heldDuration)) return false
    const targetElapsed = targetOffsets[index] ?? fallbackTargetElapsed
    return Math.abs(heldDuration - targetElapsed) <= session.perfectWindowMs
  }).length

  if (successes >= 3) return 'perfect'
  if (successes >= 2) return 'good'
  return 'bad'
}

export function getArtisanCrushQuality(
  tapCount: number,
  session: { goodTapCount?: number; perfectTapCount?: number },
): ArtisanCraftQuality {
  const normalizedTapCount = Math.max(0, Math.floor(tapCount))
  if (normalizedTapCount >= (session.perfectTapCount || 20)) return 'perfect'
  if (normalizedTapCount >= (session.goodTapCount || 12)) return 'good'
  return 'bad'
}

export function getArtisanScatterQuality(
  tapCount: number,
  session: { goodTapCount?: number; perfectTapCount?: number },
): ArtisanCraftQuality {
  const normalizedTapCount = Math.max(0, Math.floor(tapCount))
  if (normalizedTapCount >= (session.perfectTapCount || 15)) return 'perfect'
  if (normalizedTapCount >= (session.goodTapCount || 11)) return 'good'
  return 'bad'
}

export function getArtisanBalancePosition(elapsedMs: number, periodMs = 1200): number {
  const period = Math.max(1, periodMs)
  const phase = ((Math.max(0, elapsedMs) % period) / period) * 2
  return phase <= 1 ? phase : 2 - phase
}

export function getArtisanBalanceQuality(
  lockElapsedMs: number[],
  session: {
    balanceTargets?: number[]
    balanceGoodWindow?: number
    balancePerfectWindow?: number
    balancePeriodMs?: number
  },
): ArtisanCraftQuality {
  const targets = session.balanceTargets || []
  const perfectWindow = session.balancePerfectWindow || 0.07
  const periodMs = session.balancePeriodMs || 1200
  let perfectLocks = 0

  targets.slice(0, 3).forEach((target, index) => {
    const elapsedMs = lockElapsedMs[index]
    if (typeof elapsedMs !== 'number' || !Number.isFinite(elapsedMs)) return
    const position = getArtisanBalancePosition(elapsedMs, periodMs)
    const delta = Math.abs(position - target)
    if (delta <= perfectWindow) perfectLocks += 1
  })

  if (perfectLocks >= 3) return 'perfect'
  if (perfectLocks >= 2) return 'good'
  return 'bad'
}

export function getArtisanMixQuality(
  rotations: number,
  session: { mixGoodRotations?: number; mixPerfectRotations?: number },
): ArtisanCraftQuality {
  const normalizedRotations = Math.max(0, rotations)
  if (normalizedRotations >= (session.mixPerfectRotations || 9)) return 'perfect'
  if (normalizedRotations >= (session.mixGoodRotations || 6)) return 'good'
  return 'bad'
}
