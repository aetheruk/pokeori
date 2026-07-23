'use client'

import { useEffect } from 'react'
import { APP_VERSION } from '@/utilities/app-version'

const UPDATE_CHECK_INTERVAL_MS = 60_000
const RELOADED_VERSION_KEY = 'pokeori:last-reloaded-version'

type AppVersionResponse = {
  version?: unknown
}

export function PwaRegister() {
  useEffect(() => {
    let registration: ServiceWorkerRegistration | undefined
    let reloading = false

    const refreshForUpdate = (version: string) => {
      if (reloading || sessionStorage.getItem(RELOADED_VERSION_KEY) === version) {
        return
      }

      reloading = true
      sessionStorage.setItem(RELOADED_VERSION_KEY, version)
      window.location.reload()
    }

    const checkForUpdate = async () => {
      if (document.visibilityState === 'hidden' || reloading) return

      void registration?.update().catch(() => {})

      try {
        const response = await fetch('/api/app-version', {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        })
        if (!response.ok) return

        const { version } = (await response.json()) as AppVersionResponse
        if (typeof version === 'string' && version !== APP_VERSION) {
          refreshForUpdate(version)
        }
      } catch {
        // An update check must never interrupt play when the player is offline.
      }
    }

    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker
        .register('/sw.js')
        .then((registeredServiceWorker) => {
          registration = registeredServiceWorker
          if (process.env.NODE_ENV === 'development') {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope,
            )
          }
        })
        .catch((error: unknown) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Service Worker registration failed: ', error)
          }
        })
    }

    void checkForUpdate()
    const interval = window.setInterval(
      () => void checkForUpdate(),
      UPDATE_CHECK_INTERVAL_MS,
    )
    const checkWhenVisible = () => {
      if (document.visibilityState === 'visible') void checkForUpdate()
    }

    window.addEventListener('focus', checkForUpdate)
    document.addEventListener('visibilitychange', checkWhenVisible)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', checkForUpdate)
      document.removeEventListener('visibilitychange', checkWhenVisible)
    }
  }, [])

  return null
}
