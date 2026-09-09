'use client'

import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getNotificationSettings, saveNotificationSettings } from '@/utilities/notifications/actions'
import { notificationsOff, type NotificationPreferences } from '@/utilities/notifications/model'

export function NotificationSettings() {
  const [preferences, setPreferences] = useState(notificationsOff)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [busy, setBusy] = useState(true)
  const [message, setMessage] = useState('Checking availability…')

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      if (!window.isSecureContext || !('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
        setMessage('Unavailable here. On iPhone or iPad, open Pokeori from your Home Screen (iOS 16.4+).')
        setBusy(false)
        return
      }
      try {
        await navigator.serviceWorker.register('/sw.js')
        const worker = await Promise.race([
          navigator.serviceWorker.ready,
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Notifications could not start. Reload the app to try again.')), 15_000)),
        ])
        const current = await worker.pushManager.getSubscription()
        const settings = await getNotificationSettings(current?.toJSON())
        if (cancelled) return
        setRegistration(worker)
        setSubscription(current)
        setPublicKey(settings.publicKey)
        setPreferences(settings.preferences)
        setMessage(!settings.publicKey ? 'Notifications are temporarily unavailable.' : Notification.permission === 'denied' ? 'Blocked. Allow notifications in browser or device settings.' : '')
      } catch (error) {
        if (!cancelled) setMessage(error instanceof Error ? error.message : 'Could not load notifications. Please reload to try again.')
      } finally { if (!cancelled) setBusy(false) }
    }
    void load()
    return () => { cancelled = true }
  }, [])

  const toggle = async (key: keyof NotificationPreferences) => {
    if (!registration || busy) return
    const next = { ...preferences, [key]: !preferences[key] }
    setBusy(true)
    setMessage('')
    let current = subscription
    let created = false
    try {
      if (next.voyages || next.dailyReset || next.gameEvents) {
        // Must be the direct result of a tap for iOS; no server await before this call.
        if (next[key]) {
          const permission = await Notification.requestPermission()
          if (permission !== 'granted') throw new Error('Notifications were not enabled. Allow them in your browser or device settings, then try again.')
        }
        if (!publicKey) throw new Error('Notifications are not configured on the server yet.')
        if (!current) {
          const bytes = Uint8Array.from(atob(publicKey.replace(/-/g, '+').replace(/_/g, '/')), char => char.charCodeAt(0))
          current = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: bytes })
          created = true
        }
      }
      if (current) {
        await saveNotificationSettings(current.toJSON(), next)
        setPreferences(next)
        setSubscription(current)
        if (!next.voyages && !next.dailyReset && !next.gameEvents) {
          await current.unsubscribe()
          current = null
        }
      }
      setSubscription(current)
      setPreferences(next)
      setMessage('Saved for this device.')
    } catch (error) {
      if (created && current) await current.unsubscribe().catch(() => false)
      setMessage(error instanceof Error ? error.message : 'Could not save notifications. Please try again.')
    } finally { setBusy(false) }
  }

  return (
    <section aria-label="Notifications" className="space-y-3 rounded-lg border border-game-border bg-game-surface p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold"><Bell className="h-4 w-4" aria-hidden="true" />Notifications</h3>
      <p className="text-sm text-game-muted">This device only.</p>
      {([
        ['voyages', 'Voyage completion'],
        ['dailyReset', 'Daily task reset'],
        ['gameEvents', 'Game events'],
      ] as const).map(([key, label]) => (
        <Button key={key} variant="outline" className="min-h-11 w-full justify-between gap-3" aria-pressed={preferences[key]} disabled={busy || !registration || (!publicKey && !preferences[key])} onClick={() => void toggle(key)}>
          <span>{label}</span><span>{preferences[key] ? 'On' : 'Off'}</span>
        </Button>
      ))}
      <details className="text-sm text-game-muted">
        <summary className="game-focus-ring flex min-h-11 cursor-pointer items-center rounded-md font-medium">Details</summary>
        <p>Daily reset: 00:00 UTC, after the tutorial.</p>
        <p>iPhone/iPad: open from your Home Screen.</p>
      </details>
      <p role="status" aria-label="Notification status" className="text-sm text-game-muted empty:hidden">{message}</p>
    </section>
  )
}
