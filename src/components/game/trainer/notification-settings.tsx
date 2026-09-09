'use client'

import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getNotificationSettings, resetDeviceNotifications, saveNotificationSettings, sendTestNotification } from '@/utilities/notifications/actions'
import { notificationsOff, type NotificationPreferences } from '@/utilities/notifications/model'

export function NotificationSettings() {
  const [preferences, setPreferences] = useState(notificationsOff)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [busy, setBusy] = useState(true)
  const [message, setMessage] = useState('Checking notification support…')

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      if (!window.isSecureContext || !('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
        setMessage('Notifications are unavailable here. On iPhone or iPad (iOS 16.4+), add Pokeori to your Home Screen, then open it from there.')
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
        setMessage(!settings.publicKey ? 'Notifications are not configured on the server yet.' : Notification.permission === 'denied' ? 'Notifications are blocked. Allow them in your browser or device settings to enable alerts.' : '')
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
      if (next.voyages || next.dailyReset) {
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
        if (!next.voyages && !next.dailyReset) {
          await current.unsubscribe()
          current = null
        }
      }
      setSubscription(current)
      setPreferences(next)
      setMessage('Notification preferences saved for this device.')
    } catch (error) {
      if (created && current) await current.unsubscribe().catch(() => false)
      setMessage(error instanceof Error ? error.message : 'Could not save notifications. Please try again.')
    } finally { setBusy(false) }
  }

  const reset = async () => {
    if (!subscription) return
    setBusy(true)
    try {
      await resetDeviceNotifications(subscription.toJSON())
      await subscription.unsubscribe()
      setSubscription(null)
      setPreferences(notificationsOff)
      setMessage('Notifications are off on this device.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not disable notifications. Please try again.')
    } finally { setBusy(false) }
  }

  const test = async () => {
    if (!subscription) return
    setBusy(true)
    try {
      await sendTestNotification(subscription.toJSON())
      setMessage('Test sent. Check your device notifications; Focus or Do Not Disturb may silence it.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not send a test notification.')
    } finally { setBusy(false) }
  }

  return (
    <section aria-label="Notifications" className="space-y-3 rounded-lg border border-game-border bg-game-surface p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold"><Bell className="h-4 w-4" aria-hidden="true" />Notifications</h3>
      <p className="text-sm text-game-muted">Optional alerts on this device, even when Pokeori is closed. Both start off.</p>
      {([
        ['voyages', 'Voyage completion'],
        ['dailyReset', 'Daily task reset'],
      ] as const).map(([key, label]) => (
        <Button key={key} variant="outline" className="min-h-11 w-full justify-between gap-3" aria-pressed={preferences[key]} disabled={busy || !registration || (!publicKey && !preferences[key])} onClick={() => void toggle(key)}>
          <span>{label}</span><span>{preferences[key] ? 'On' : 'Off'}</span>
        </Button>
      ))}
      <p className="text-sm text-game-muted">Daily tasks reset at 00:00 UTC. Daily alerts begin after you finish the tutorial. On iPhone and iPad, open Pokeori from your Home Screen.</p>
      <p className="text-sm text-game-muted">Activity artwork appears where supported; your device may use the Pokeori app icon.</p>
      {subscription && <div className="flex flex-wrap gap-2">
        {(preferences.voyages || preferences.dailyReset) && <Button variant="outline" className="min-h-11" disabled={busy || !publicKey} onClick={() => void test()}>Send test notification</Button>}
        <Button variant="outline" className="min-h-11" disabled={busy} onClick={() => void reset()}>Turn off all device notifications</Button>
      </div>}
      <p role="status" aria-label="Notification status" className="text-sm text-game-muted">{message}</p>
    </section>
  )
}
