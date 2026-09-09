import { z } from 'zod'
import { getUtcDateKey } from '@/utilities/date-utils'

export const notificationPreferencesSchema = z.object({
  voyages: z.boolean(),
  dailyReset: z.boolean(),
  gameEvents: z.boolean().default(false),
}).strict()
export type NotificationPreferences = z.infer<typeof notificationPreferencesSchema>
export const notificationsOff: NotificationPreferences = { voyages: false, dailyReset: false, gameEvents: false }

// The server makes requests to these endpoints. Never accept arbitrary URLs.
export function isPushEndpoint(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password &&
      !url.port && !url.hash && (
        url.hostname === 'fcm.googleapis.com' ||
        url.hostname === 'updates.push.services.mozilla.com' ||
        url.hostname.endsWith('.push.apple.com') ||
        url.hostname.endsWith('.notify.windows.com')
      )
  } catch { return false }
}

export const pushSubscriptionSchema = z.object({
  endpoint: z.string().max(2048).refine(isPushEndpoint),
  expirationTime: z.number().nullable().optional(),
  keys: z.object({
    p256dh: z.string().regex(/^[A-Za-z0-9_-]{87}={0,1}$/),
    auth: z.string().regex(/^[A-Za-z0-9_-]{22}={0,2}$/),
  }).strict(),
}).strict()

export type TimedVoyage = { voyageId?: string | null; startTime?: string | null; endTime?: string | null }
export const voyageNotificationKey = (voyage: TimedVoyage) => `${voyage.voyageId}:${voyage.startTime}:${voyage.endTime}`

export function dueVoyages(voyages: TimedVoyage[], enabledAt: string | null | undefined, sent: string[], now: number) {
  if (!enabledAt) return []
  const since = Date.parse(enabledAt)
  return voyages.filter((voyage) => {
    const end = Date.parse(voyage.endTime || '')
    return voyage.voyageId && end > since && end <= now && now - end < 86_400_000 &&
      !sent.includes(voyageNotificationKey(voyage))
  })
}

export function dailyResetDue(cursor: string, now: number): boolean {
  return Number.isFinite(Date.parse(cursor)) && getUtcDateKey(cursor) < getUtcDateKey(new Date(now))
}
