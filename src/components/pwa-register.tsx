'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { APP_VERSION } from '@/utilities/app-version'
import { ACTIVITY_STARTED_EVENT, ACTIVITY_SETTLED_EVENT, isActivityUpdateDeferred } from '@/utilities/games/update-safety'

const UPDATE_CHECK_INTERVAL_MS = 60_000
const RELOADED_VERSION_KEY = 'pokeori:last-reloaded-version'

type AppVersionResponse = {
  version?: unknown
}

export function PwaRegister() {
  const pathname = usePathname()
  const [pendingVersion, setPendingVersion] = useState<string | null>(null)
  const [reloadIn, setReloadIn] = useState<number | null>(null)
  useEffect(() => {
    setReloadIn(null)
    let registration: ServiceWorkerRegistration | undefined
    let reloading = false
    let disposed = false
    const requests = new AbortController()
    let settled = false
    let deferredVersion: string | null = null
    let reloadTimer: ReturnType<typeof setInterval> | undefined

    const reload = (version: string) => {
      // The URL changes synchronously; React's pathname effect cleanup may not
      // have run yet when an old fetch or countdown resolves in this same turn.
      if (window.location.pathname !== pathname) return
      if (disposed || reloading || sessionStorage.getItem(RELOADED_VERSION_KEY) === version) return
      reloading = true
      sessionStorage.setItem(RELOADED_VERSION_KEY, version)
      window.location.reload()
    }

    const refreshForUpdate = (version: string) => {
      if (disposed || window.location.pathname !== pathname) return
      if (isActivityUpdateDeferred(pathname)) {
        setPendingVersion(version)
        deferredVersion = version
        if (settled && !reloadTimer) {
          let remaining = 15
          setReloadIn(remaining)
          reloadTimer = setInterval(() => {
            if (!settled) return
            remaining -= 1
            setReloadIn(remaining)
            if (remaining <= 0) {
              clearInterval(reloadTimer)
              reload(version)
            }
          }, 1000)
        }
        return
      }
      if (reloading || sessionStorage.getItem(RELOADED_VERSION_KEY) === version) {
        return
      }

      reload(version)
    }

    const checkForUpdate = async () => {
      if (document.visibilityState === 'hidden' || reloading) return

      void registration?.update().catch(() => {})

      try {
        const response = await fetch('/api/app-version', {
          signal: requests.signal,
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        })
        if (disposed || !response.ok) return

        const { version } = (await response.json()) as AppVersionResponse
        if (disposed) return
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
    const markStarted = () => {
      settled = false
      clearInterval(reloadTimer)
      reloadTimer = undefined
      setReloadIn(null)
    }
    const markSettled = () => {
      settled = true
      if (deferredVersion) refreshForUpdate(deferredVersion)
      else void checkForUpdate()
    }
    window.addEventListener(ACTIVITY_STARTED_EVENT, markStarted)
    window.addEventListener(ACTIVITY_SETTLED_EVENT, markSettled)
    document.addEventListener('visibilitychange', checkWhenVisible)

    return () => {
      disposed = true
      requests.abort()
      window.clearInterval(interval)
      clearInterval(reloadTimer)
      window.removeEventListener(ACTIVITY_STARTED_EVENT, markStarted)
      window.removeEventListener(ACTIVITY_SETTLED_EVENT, markSettled)
      window.removeEventListener('focus', checkForUpdate)
      document.removeEventListener('visibilitychange', checkWhenVisible)
    }
  }, [pathname])

  return pendingVersion && isActivityUpdateDeferred(pathname) ? (
    <div role="status" className="pointer-events-none fixed left-1/2 top-[max(0.5rem,env(safe-area-inset-top))] z-[100] w-max max-w-[90vw] -translate-x-1/2 rounded-lg border border-game-border bg-game-surface-raised px-3 py-2 text-center text-xs text-game-ink shadow-sm">
      {reloadIn !== null ? `Result saved. Updating in ${reloadIn} seconds.` : 'Update ready. It will apply after your result is saved or you return to Explore.'}
    </div>
  ) : null
}
