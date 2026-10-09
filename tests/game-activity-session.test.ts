import { describe, expect, test } from 'bun:test'
import { shouldRestoreExistingGameActivity } from '@/utilities/games/activity-session'

describe('game activity session restoration', () => {
  test('restores the requested encounter when its session is still active', () => {
    expect(
      shouldRestoreExistingGameActivity({
        existingEncounterId: 'rocket-prize-wheel',
        requestedEncounterId: 'rocket-prize-wheel',
        forceReset: false,
      }),
    ).toBe(true)
  })

  test('does not restore a different active encounter over the requested game', () => {
    expect(
      shouldRestoreExistingGameActivity({
        existingEncounterId: 'rocket-prize-wheel',
        requestedEncounterId: 'rocket-slots',
        forceReset: false,
      }),
    ).toBe(false)
  })

  test('honors an explicit reset for the same encounter', () => {
    expect(
      shouldRestoreExistingGameActivity({
        existingEncounterId: 'rocket-prize-wheel',
        requestedEncounterId: 'rocket-prize-wheel',
        forceReset: true,
      }),
    ).toBe(false)
  })
})
