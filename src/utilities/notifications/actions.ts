'use server'

import { createHash, ECDH } from 'node:crypto'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import webpush from 'web-push'
import config from '@payload-config'
import { acquireActionLock, checkActionRateLimit, releaseActionLock } from '@/utilities/game-integrity'
import { getPushConfig } from './config'
import { notificationPreferencesSchema, notificationsOff, pushSubscriptionSchema } from './model'

async function context() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) throw new Error('Please sign in to manage notifications.')
  const rate = await checkActionRateLimit(user.id, 'push-settings', 30, 60)
  if (!rate.allowed) throw new Error('Please wait a minute before trying again.')
  return { payload, user }
}

function subscriptionInput(value: unknown) {
  const subscription = pushSubscriptionSchema.parse(value)
  // Reject malformed curve points before storing a browser credential.
  ECDH.convertKey(Buffer.from(subscription.keys.p256dh, 'base64url'), 'prime256v1')
  const id = createHash('sha256').update(subscription.endpoint).digest('hex')
  return { subscription, id }
}

export async function getNotificationSettings(value?: unknown) {
  const { payload, user } = await context()
  let preferences = notificationsOff
  if (value) {
    const { id, subscription } = subscriptionInput(value)
    const record = await payload.findByID({ collection: 'push-subscriptions', id, depth: 0, disableErrors: true })
    const stored = record ? pushSubscriptionSchema.safeParse(record.subscription) : null
    if (record && record.user === user.id && stored?.success && stored.data.keys.auth === subscription.keys.auth && stored.data.keys.p256dh === subscription.keys.p256dh) {
      preferences = { voyages: Boolean(record.voyages), dailyReset: Boolean(record.dailyReset), gameEvents: Boolean(record.gameEvents) }
    }
  }
  return { publicKey: getPushConfig()?.publicKey || null, preferences }
}

export async function saveNotificationSettings(value: unknown, input: unknown) {
  const { payload, user } = await context()
  const preferences = notificationPreferencesSchema.parse(input)
  const { subscription, id } = subscriptionInput(value)
  if ((preferences.voyages || preferences.dailyReset || preferences.gameEvents) && !getPushConfig()) {
    throw new Error('Notifications are not configured on the server yet.')
  }
  const lock = await acquireActionLock(`push:${id}`, 120)
  if (!lock.acquired) throw new Error('Notifications are being updated. Please try again shortly.')
  try {
    const old = await payload.findByID({ collection: 'push-subscriptions', id, depth: 0, disableErrors: true })
    // A browser changing accounts must unsubscribe and obtain a fresh endpoint.
    if (old && old.user !== user.id) throw new Error('This device is subscribed to another trainer. Reset device notifications first.')
    if (!preferences.voyages && !preferences.dailyReset && !preferences.gameEvents) {
      if (old) await payload.delete({ collection: 'push-subscriptions', id })
      return preferences
    }
    const now = new Date().toISOString()
    const data = {
      user: user.id, subscription, ...preferences,
      voyagesEnabledAt: preferences.voyages ? old?.voyages ? old.voyagesEnabledAt : now : null,
      eventsEnabledAt: preferences.gameEvents ? old?.gameEvents ? old.eventsEnabledAt : now : null,
      dailyCursor: preferences.dailyReset && old?.dailyReset ? old.dailyCursor : now,
      nextCheckAt: now, failures: 0,
      sentVoyages: old?.sentVoyages || [],
    }
    if (old) await payload.update({ collection: 'push-subscriptions', id, data })
    else {
      const accountLock = await acquireActionLock(`push-devices:${user.id}`, 30)
      if (!accountLock.acquired) throw new Error('Another device is being registered. Please try again shortly.')
      try {
        const count = await payload.count({ collection: 'push-subscriptions', where: { user: { equals: user.id } } })
        if (count.totalDocs >= 10) throw new Error('This trainer already has notifications on 10 devices.')
        await payload.create({ collection: 'push-subscriptions', data: { id, ...data } })
      } finally { await releaseActionLock(accountLock) }
    }
    return preferences
  } finally { await releaseActionLock(lock) }
}

export async function resetDeviceNotifications(value: unknown) {
  const { payload } = await context()
  const { subscription, id } = subscriptionInput(value)
  const lock = await acquireActionLock(`push:${id}`, 120)
  if (!lock.acquired) throw new Error('Notifications are being updated. Please try again shortly.')
  try {
    const record = await payload.findByID({ collection: 'push-subscriptions', id, depth: 0, disableErrors: true })
    if (record) {
      const stored = pushSubscriptionSchema.parse(record.subscription)
      // Full browser credential proves possession when switching trainers on a shared device.
      if (stored.keys.auth !== subscription.keys.auth || stored.keys.p256dh !== subscription.keys.p256dh) throw new Error('Could not verify this device subscription.')
      await payload.delete({ collection: 'push-subscriptions', id })
    }
  } finally { await releaseActionLock(lock) }
}

export async function sendTestNotification(value: unknown) {
  const { payload, user } = await context()
  const rate = await checkActionRateLimit(user.id, 'push-test', 3, 60)
  if (!rate.allowed) throw new Error('Please wait a minute before sending another test.')
  const { subscription, id } = subscriptionInput(value)
  const settings = getPushConfig()
  if (!settings) throw new Error('Notifications are not configured on the server yet.')
  const lock = await acquireActionLock(`push:${id}`, 120)
  if (!lock.acquired) throw new Error('Notifications are being updated. Please try again shortly.')
  try {
    const record = await payload.findByID({ collection: 'push-subscriptions', id, depth: 0, disableErrors: true })
    if (!record || record.user !== user.id || (!record.voyages && !record.dailyReset && !record.gameEvents)) throw new Error('Enable a notification category on this device first.')
    const stored = pushSubscriptionSchema.parse(record.subscription)
    if (stored.keys.auth !== subscription.keys.auth || stored.keys.p256dh !== subscription.keys.p256dh) throw new Error('Please reset device notifications and enable them again.')
    try {
      await webpush.sendNotification(stored, JSON.stringify({ title: 'Pokeori notifications are ready', body: 'This device can receive your enabled activity alerts.', icon: '/app-icon.avif', tag: 'pokeori-test', url: '/game' }), { vapidDetails: settings, TTL: 60, urgency: 'normal', timeout: 5000 })
    } catch {
      throw new Error('The test could not be sent. Reset device notifications and enable them again, or try later.')
    }
  } finally { await releaseActionLock(lock) }
}
