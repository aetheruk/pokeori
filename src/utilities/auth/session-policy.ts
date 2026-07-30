export const GAME_AUTH_TOKEN_EXPIRATION_SECONDS = 60 * 60 * 24 * 30

export const AUTH_REFRESH_BUFFER_MS = 15 * 60 * 1000
export const AUTH_REFRESH_MAX_DELAY_MS = 24 * 60 * 60 * 1000
export const AUTH_REFRESH_MIN_DELAY_MS = 60 * 1000
export const AUTH_REFRESH_RETRY_DELAY_MS = 5 * 60 * 1000
export const AUTH_REFRESH_ON_WAKE_AFTER_MS = 30 * 60 * 1000

export class ApiResponseError extends Error {
  readonly status: number
  readonly requestId?: string

  constructor(message: string, status: number, requestId?: string) {
    super(message)
    this.name = 'ApiResponseError'
    this.status = status
    this.requestId = requestId
  }
}

export function getApiErrorStatus(error: unknown): number | undefined {
  if (
    typeof error !== 'object' ||
    error === null ||
    !('status' in error) ||
    typeof error.status !== 'number'
  ) {
    return undefined
  }

  return error.status
}

export function isAuthenticationError(error: unknown): boolean {
  const status = getApiErrorStatus(error)
  return status === 401 || status === 403
}

export function getAuthRefreshDelay(
  expiresAtSeconds: number | undefined,
  nowMs = Date.now(),
): number {
  if (
    typeof expiresAtSeconds !== 'number' ||
    !Number.isFinite(expiresAtSeconds)
  ) {
    return AUTH_REFRESH_MAX_DELAY_MS
  }

  const delay =
    expiresAtSeconds * 1000 - nowMs - AUTH_REFRESH_BUFFER_MS

  return Math.min(
    AUTH_REFRESH_MAX_DELAY_MS,
    Math.max(AUTH_REFRESH_MIN_DELAY_MS, delay),
  )
}
