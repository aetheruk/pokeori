import { describe, expect, test } from 'bun:test'
import { clearGameRecovery, getGameRecovery, recoverGameAction } from '@/utilities/games/action-recovery'
import { isActivityUpdateDeferred } from '@/utilities/games/update-safety'

describe('game action recovery', () => {
  test('discards recovery prompts from a departed route, including delayed failures', async () => {
    let fail: (() => void) | undefined
    void recoverGameAction(() => new Promise((_resolve, reject) => { fail = () => reject(new Error('late failure')) }), 'Old game')
    clearGameRecovery()
    fail?.()
    await Promise.resolve()
    await Promise.resolve()
    expect(getGameRecovery()).toBeNull()
  })
  test('holds the original result submission until an explicit retry succeeds', async () => {
    let attempts = 0
    const response = { success: true, score: 120 }
    const pending = recoverGameAction(async () => {
      if (++attempts === 1) throw new Error('response dropped')
      return response
    }, 'Retry this result')
    await Promise.resolve()
    expect(attempts).toBe(1)
    expect(getGameRecovery()?.message).toBe('Retry this result')
    getGameRecovery()?.retry()
    expect(await pending).toBe(response)
    expect(attempts).toBe(2)
    expect(getGameRecovery()).toBeNull()
  })

  test('surfaces returned action errors without converting them into a lost game', async () => {
    let attempts = 0
    const pending = recoverGameAction(async () => ++attempts === 1
      ? { success: false, error: 'Completion already being processed' }
      : { success: true, error: undefined }, 'Connection interrupted', (result) => result.error)
    await Promise.resolve()
    expect(getGameRecovery()?.message).toBe('Completion already being processed')
    getGameRecovery()?.retry()
    expect((await pending).success).toBe(true)
  })

  test('does not retry a legitimate losing result', async () => {
    const result = { success: false, message: 'Game over' }
    expect(await recoverGameAction(async () => result, 'Connection interrupted')).toBe(result)
    expect(getGameRecovery()).toBeNull()
  })
})

test('release updates defer during games and apply on return to ordinary pages', () => {
  for (const route of ['/game/games/match3', '/game/battles/encounter', '/game/locations/encounter', '/game/field-research']) {
    expect(isActivityUpdateDeferred(route)).toBe(true)
  }
  for (const route of ['/game/explore', '/game', '/auth', '/game/pokemon']) {
    expect(isActivityUpdateDeferred(route)).toBe(false)
  }
})
