import { expect, test } from 'bun:test'
import { getCaptureRingScale, isCaptureAimSessionValid, verifyCaptureRingScale, type CaptureAimTiming } from '../src/utilities/pokemon/capture-timing'
import { getThrowQuality } from '../src/utilities/pokemon/catch-balance'

const timing: CaptureAimTiming = { id: 'challenge', startedAt: 1000, serverNow: 1000, periodMs: 2200, attempt: 0 }
test('missing timing proof defaults to neutral nice quality', () => {
  const ringScale = verifyCaptureRingScale(timing, undefined, 0, 3100)
  expect(ringScale).toBe(0.5)
  expect(getThrowQuality({ ringScale })).toBe('nice')
})
test('capture phase comes from a live server challenge', () => {
  expect(verifyCaptureRingScale(timing, { challengeId: timing.id, elapsedMs: 2100 }, 0, 3200)).toBe(getCaptureRingScale(2100))
  expect(getCaptureRingScale(2200)).toBe(1)
})
test('capture aim remains valid after the quiz timer opens the capture phase', () => {
  expect(
    isCaptureAimSessionValid(
      { userId: 'trainer-1', expiry: Date.now() - 1 },
      'trainer-1',
    ),
  ).toBe(true)
  expect(isCaptureAimSessionValid(null, 'trainer-1')).toBe(false)
  expect(
    isCaptureAimSessionValid({ userId: 'other-trainer' }, 'trainer-1'),
  ).toBe(false)
})
test('stale, future, replaced and malformed timing proofs cannot spend a ball', () => {
  for (const proof of [{ challengeId: 'other', elapsedMs: 2100 }, { challengeId: timing.id, elapsedMs: 0 },
    { challengeId: timing.id, elapsedMs: 999999 }, { challengeId: timing.id, elapsedMs: NaN }]) {
    expect(() => verifyCaptureRingScale(timing, proof, 0, 3200)).toThrow()
  }
  expect(() => verifyCaptureRingScale(timing, { challengeId: timing.id, elapsedMs: 2100 }, 1, 3200)).toThrow()
})
