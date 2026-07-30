'use client'

import { useEffect } from 'react'
import {
  AUTH_REFRESH_ON_WAKE_AFTER_MS,
  AUTH_REFRESH_RETRY_DELAY_MS,
  getAuthRefreshDelay,
} from '@/utilities/auth/session-policy'

interface RefreshTokenResponse {
  exp?: number
}

export function useAuthSessionKeepalive() {
  useEffect(() => {
    let cancelled = false
    let inFlight = false
    let lastSuccessfulRefreshAt = 0
    let refreshTimer: ReturnType<typeof setTimeout> | undefined

    const clearRefreshTimer = () => {
      if (refreshTimer) {
        clearTimeout(refreshTimer)
        refreshTimer = undefined
      }
    }

    const scheduleRefresh = (
      refreshSession: (force?: boolean) => Promise<void>,
      delay: number,
    ) => {
      clearRefreshTimer()
      refreshTimer = setTimeout(() => {
        void refreshSession(true)
      }, delay)
    }

    const refreshSession = async (force = false): Promise<void> => {
      if (cancelled || inFlight) return

      if (
        !force &&
        lastSuccessfulRefreshAt > 0 &&
        Date.now() - lastSuccessfulRefreshAt < AUTH_REFRESH_ON_WAKE_AFTER_MS
      ) {
        return
      }

      inFlight = true

      try {
        const response = await fetch('/api/users/refresh-token', {
          method: 'POST',
          credentials: 'include',
          cache: 'no-store',
        })

        if (cancelled) return

        if (response.ok) {
          const result = (await response.json()) as RefreshTokenResponse
          lastSuccessfulRefreshAt = Date.now()
          scheduleRefresh(
            refreshSession,
            getAuthRefreshDelay(result.exp, lastSuccessfulRefreshAt),
          )
          return
        }

        // A real auth failure will be confirmed by UserContext before navigation.
        // Do not turn a keepalive request into a competing redirect.
        if (response.status === 401 || response.status === 403) {
          clearRefreshTimer()
          return
        }

        scheduleRefresh(refreshSession, AUTH_REFRESH_RETRY_DELAY_MS)
      } catch {
        if (!cancelled) {
          scheduleRefresh(refreshSession, AUTH_REFRESH_RETRY_DELAY_MS)
        }
      } finally {
        inFlight = false
      }
    }

    const refreshAfterWake = () => {
      if (document.visibilityState === 'visible') {
        void refreshSession()
      }
    }

    void refreshSession(true)
    window.addEventListener('focus', refreshAfterWake)
    document.addEventListener('visibilitychange', refreshAfterWake)

    return () => {
      cancelled = true
      clearRefreshTimer()
      window.removeEventListener('focus', refreshAfterWake)
      document.removeEventListener('visibilitychange', refreshAfterWake)
    }
  }, [])
}
