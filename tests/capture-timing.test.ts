import { expect, test } from 'bun:test'
import { getCaptureRingScale, verifyCaptureRingScale, type CaptureAimTiming } from '../src/utilities/pokemon/capture-timing'

const timing: CaptureAimTiming = { id: 'challenge', startedAt: 1000, serverNow: 1000, periodMs: 2200, attempt: 0 }
test('capture phase comes from a live server challenge, with legacy scalar unable to grant a bonus', () => {
  expect(verifyCaptureRingScale(timing, undefined, 0, 3100)).toBe(1)
  expect(verifyCaptureRingScale(timing, { challengeId: timing.id, elapsedMs: 2100 }, 0, 3200)).toBe(getCaptureRingScale(2100))
  expect(getCaptureRingScale(2200)).toBe(1)
})
test('stale, future, replaced and malformed timing proofs cannot spend a ball', () => {
  for (const proof of [{ challengeId: 'other', elapsedMs: 2100 }, { challengeId: timing.id, elapsedMs: 0 },
    { challengeId: timing.id, elapsedMs: 999999 }, { challengeId: timing.id, elapsedMs: NaN }]) {
    expect(() => verifyCaptureRingScale(timing, proof, 0, 3200)).toThrow()
  }
  expect(() => verifyCaptureRingScale(timing, { challengeId: timing.id, elapsedMs: 2100 }, 1, 3200)).toThrow()
})
