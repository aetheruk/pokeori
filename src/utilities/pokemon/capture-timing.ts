export const CAPTURE_RING_PERIOD_MS = 2200

export type CaptureAimTiming = {
  id: string
  startedAt: number
  serverNow: number
  periodMs: number
  attempt: number
}
export type CaptureTimingProof = { challengeId: string; elapsedMs: number }

/**
 * The quiz timer ending moves a live encounter into its capture phase. The
 * Redis session itself is the source of truth for whether that phase is still
 * available; the quiz expiry must not reject the throw preparation request.
 */
export function isCaptureAimSessionValid<T extends { userId?: string }>(
  state: T | null,
  userId: string,
): state is T & { userId: string } {
  return state?.userId === userId
}

export function getCaptureRingScale(elapsedMs: number) {
  return 1 - (Math.max(0, elapsedMs) % CAPTURE_RING_PERIOD_MS) / CAPTURE_RING_PERIOD_MS
}

/** Client ringScale is presentation only. A bounded, live challenge timestamp
 * determines the actual ring phase; stale/replaced throws fail before spending. */
export function verifyCaptureRingScale(
  timing: CaptureAimTiming | undefined,
  proof: CaptureTimingProof | undefined,
  attempt: number,
  now: number,
): number {
  if (!proof) return 1
  if (!timing || proof.challengeId !== timing.id || timing.attempt !== attempt ||
    !Number.isSafeInteger(proof.elapsedMs) || proof.elapsedMs < 0 ||
    proof.elapsedMs > 86_400_000) throw new Error('Capture timing expired. Aim again.')
  const age = now - timing.startedAt
  if (proof.elapsedMs > age + 100 || age - proof.elapsedMs > 750) {
    throw new Error('Capture timing could not be verified. Aim again.')
  }
  return getCaptureRingScale(proof.elapsedMs)
}
