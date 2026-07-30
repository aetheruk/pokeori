import { describe, expect, test } from 'bun:test'
import {
  ApiResponseError,
  AUTH_REFRESH_MAX_DELAY_MS,
  AUTH_REFRESH_MIN_DELAY_MS,
  GAME_AUTH_TOKEN_EXPIRATION_SECONDS,
  getApiErrorStatus,
  getAuthRefreshDelay,
  isAuthenticationError,
} from '@/utilities/auth/session-policy'

describe('auth session policy', () => {
  test('only classifies authentication response statuses as auth loss', () => {
    expect(isAuthenticationError(new ApiResponseError('Unauthorized', 401))).toBe(
      true,
    )
    expect(isAuthenticationError(new ApiResponseError('Forbidden', 403))).toBe(
      true,
    )
    expect(isAuthenticationError(new ApiResponseError('Rate limited', 429))).toBe(
      false,
    )
    expect(isAuthenticationError(new ApiResponseError('Server error', 500))).toBe(
      false,
    )
    expect(isAuthenticationError(new TypeError('Network error'))).toBe(false)
  })

  test('preserves API response status without depending on an Error subclass', () => {
    expect(getApiErrorStatus({ status: 401 })).toBe(401)
    expect(getApiErrorStatus({ status: '401' })).toBeUndefined()
    expect(getApiErrorStatus(null)).toBeUndefined()
  })

  test('refreshes fifteen minutes before a nearby token expiry', () => {
    const now = Date.UTC(2026, 6, 30, 12)
    const expiresAt = (now + 2 * 60 * 60 * 1000) / 1000

    expect(getAuthRefreshDelay(expiresAt, now)).toBe(105 * 60 * 1000)
  })

  test('bounds refresh timers for long-lived and nearly expired tokens', () => {
    const now = Date.UTC(2026, 6, 30, 12)
    const thirtyDaysFromNow =
      (now + GAME_AUTH_TOKEN_EXPIRATION_SECONDS * 1000) / 1000
    const alreadyExpired = (now - 60 * 1000) / 1000

    expect(getAuthRefreshDelay(thirtyDaysFromNow, now)).toBe(
      AUTH_REFRESH_MAX_DELAY_MS,
    )
    expect(getAuthRefreshDelay(alreadyExpired, now)).toBe(
      AUTH_REFRESH_MIN_DELAY_MS,
    )
    expect(getAuthRefreshDelay(undefined, now)).toBe(
      AUTH_REFRESH_MAX_DELAY_MS,
    )
  })

  test('uses a thirty-day login lifetime', () => {
    expect(GAME_AUTH_TOKEN_EXPIRATION_SECONDS).toBe(2_592_000)
  })
})
