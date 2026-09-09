import 'server-only'

import { getPayload, type Payload } from 'payload'
import webpush from 'web-push'
import config from '@payload-config'
import type { PushSubscription } from '@/payload-types'
import { getVoyage } from '@/data/voyages'
import { getItemSpriteUrl } from '@/data/items'
import { getBundledPokemonSpriteUrl } from '@/utilities/pokemon/local-sprites'
import { getUtcDateKey } from '@/utilities/date-utils'
import { acquireActionLock, releaseActionLock } from '@/utilities/game-integrity'
import { getUserCompletedTasksMap } from '@/utilities/user-state'
import { getPushConfig } from './config'
import { dailyResetDue, dueVoyages, pushSubscriptionSchema, voyageNotificationKey } from './model'

function voyageIcon(voyage: NonNullable<ReturnType<typeof getVoyage>>) {
  if (voyage.icon.type === 'item') return getItemSpriteUrl(voyage.icon.id)
  if (voyage.icon.type === 'pokemon') return getBundledPokemonSpriteUrl({ formId: voyage.icon.id, family: 'gen-v', direction: 'front' })
  return `/${voyage.icon.id.replace(/^\/+/, '')}`
}

async function processSubscription(payload: Payload, id: string) {
  const lock = await acquireActionLock(`push:${id}`, 120)
  if (!lock.acquired) return
  try {
    const record = await payload.findByID({ collection: 'push-subscriptions', id, depth: 0, disableErrors: true })
    if (!record || Date.parse(record.nextCheckAt) > Date.now()) return
    const settings = getPushConfig()
    if (!settings) return
    const parsed = pushSubscriptionSchema.safeParse(record.subscription)
    if (!parsed.success || (parsed.data.expirationTime && parsed.data.expirationTime <= Date.now())) {
      await payload.delete({ collection: 'push-subscriptions', id })
      return
    }
    const subscription = parsed.data
    const userId = typeof record.user === 'string' ? record.user : record.user.id
    const user = await payload.findByID({ collection: 'users', id: userId, depth: 0, disableErrors: true, select: { activeVoyages: true } })
    if (!user || (!record.voyages && !record.dailyReset && !record.gameEvents)) {
      await payload.delete({ collection: 'push-subscriptions', id })
      return
    }
    const now = Date.now()
    const active = user.activeVoyages || []
    const activeKeys = new Set(active.map(voyageNotificationKey))
    let sent = (Array.isArray(record.sentVoyages) ? record.sentVoyages : []).filter((key): key is string => typeof key === 'string' && activeKeys.has(key))
    let cursor = record.dailyCursor
    const send = async (message: { title: string; body: string; icon: string; tag: string }) => {
      await webpush.sendNotification(subscription, JSON.stringify({ ...message, url: '/game/explore' }), {
        vapidDetails: settings, TTL: 3600, urgency: 'normal', timeout: 5000,
      })
    }
    // Bound work below the lease length; remaining voyages are handled next tick.
    for (const activeVoyage of (record.voyages ? dueVoyages(active, record.voyagesEnabledAt, sent, now) : []).slice(0, 5)) {
      const voyage = getVoyage(activeVoyage.voyageId || '')
      if (!voyage) continue
      const key = voyageNotificationKey(activeVoyage)
      await send({ title: 'Voyage complete', body: `${voyage.name} has returned. Open Explore to collect the result.`, icon: voyageIcon(voyage), tag: `voyage:${key}` })
      sent = [...sent, key]
      // Persist each successful delivery independently so later failures don't replay it.
      await payload.update({ collection: 'push-subscriptions', id, data: { sentVoyages: sent } })
    }
    if (record.dailyReset && dailyResetDue(cursor, now)) {
      const tasks = await getUserCompletedTasksMap(payload, userId)
      if (tasks['tutorial-16']) {
        await send({ title: 'Daily tasks have reset', body: 'A new day of challenges is ready. Open Explore to refresh your daily tasks.', icon: getItemSpriteUrl('explorers-journal'), tag: `daily:${getUtcDateKey(new Date(now))}` })
      }
      cursor = new Date(now).toISOString()
    }
    if (record.gameEvents) await (await import('@/utilities/events/notifications')).dispatchEventNotifications(payload, record, async (message, ttl) => {
      await webpush.sendNotification(subscription, JSON.stringify(message), { vapidDetails: settings, TTL: ttl, urgency: 'normal', timeout: 5000 })
    })
    await payload.update({ collection: 'push-subscriptions', id, data: { sentVoyages: sent, dailyCursor: cursor, nextCheckAt: new Date(now + 60_000).toISOString(), failures: 0 } })
  } catch (error) {
    const status = error && typeof error === 'object' && 'statusCode' in error ? Number(error.statusCode) : 0
    if (status === 404 || status === 410) {
      await payload.delete({ collection: 'push-subscriptions', id })
    } else {
      const record = await payload.findByID({ collection: 'push-subscriptions', id, depth: 0, disableErrors: true })
      if (record) {
        const failures = (record.failures || 0) + 1
        await payload.update({ collection: 'push-subscriptions', id, data: { failures, nextCheckAt: new Date(Date.now() + Math.min(3600_000, 60_000 * 2 ** Math.min(failures, 6))).toISOString() } })
      }
      // web-push errors contain credentials and must not be logged verbatim.
      console.warn('Push notification delivery deferred', { status })
    }
  } finally { await releaseActionLock(lock) }
}

export async function dispatchNotifications() {
  if (!getPushConfig()) return
  const payload = await getPayload({ config })
  const due = await payload.find({ collection: 'push-subscriptions', where: { nextCheckAt: { less_than_equal: new Date().toISOString() } }, sort: 'nextCheckAt', limit: 100, depth: 0, select: { id: true } })
  for (let index = 0; index < due.docs.length; index += 5) {
    const results = await Promise.allSettled(due.docs.slice(index, index + 5).map((record: Pick<PushSubscription, 'id'>) => processSubscription(payload, record.id)))
    if (results.some((result) => result.status === 'rejected')) console.warn('Push notification batch will retry')
  }
}

export function startNotificationWorker() {
  const globalState = globalThis as typeof globalThis & { pokeoriPushWorker?: boolean }
  if (globalState.pokeoriPushWorker || !getPushConfig()) return
  globalState.pokeoriPushWorker = true
  const tick = async () => {
    try { await dispatchNotifications() } catch { console.warn('Push notification worker will retry') }
    setTimeout(() => void tick(), 15_000).unref()
  }
  // Do not delay Next startup or initialize Payload during register().
  setTimeout(() => void tick(), 15_000).unref()
}
