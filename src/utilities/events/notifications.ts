import 'server-only'
import { createHash } from 'node:crypto'
import type { Payload } from 'payload'
import type { PushSubscription } from '@/payload-types'
import { loadGameEvents } from './server'
import { eventPhase, eventNotificationRun } from './model'
import { getGameUserData } from '@/utilities/game-data'
import { checkRequirement } from '@/utilities/requirements'
import { analyzeRequirements } from '@/utilities/requirements/analysis'

export async function dispatchEventNotifications(
  payload: Payload,
  subscription: PushSubscription,
  send: (
    message: {
      title: string
      body: string
      icon: string
      tag: string
      url: string
    },
    ttl: number,
  ) => Promise<void>,
) {
  if (!subscription.gameEvents || !subscription.eventsEnabledAt) return
  const now = Date.now()
  const events = (await loadGameEvents()).filter(
    (event) =>
      event.notify &&
      eventPhase(event, now) === 'active' &&
      Date.parse(event.startAt) > Date.parse(subscription.eventsEnabledAt!) &&
      now - Date.parse(event.startAt) < 86400000,
  )
  if (!events.length) return
  const userId =
    typeof subscription.user === 'string'
      ? subscription.user
      : subscription.user.id
  const user = await payload.findByID({ collection: 'users', id: userId })
  const data = await getGameUserData(
    user,
    analyzeRequirements(events.flatMap((event) => event.requirements)),
  )
  let processed = 0
  for (const event of events) {
    const id = createHash('sha256')
      .update(`${subscription.id}:${eventNotificationRun(event)}`)
      .digest('hex')
    if (
      await payload.findByID({
        collection: 'event-deliveries',
        id,
        disableErrors: true,
      })
    )
      continue
    if (processed >= 5) break
    if (Date.now() >= Date.parse(event.endAt)) continue
    processed++
    const eligible = event.requirements.every((condition) =>
      checkRequirement(data, condition),
    )
    if (eligible)
      await send(
        {
          title: event.title,
          body: event.notificationBody || event.description.slice(0, 240),
          icon: '/app-icon.avif',
          tag: `game-event:${event.id}`,
          url: `/game/explore?event=${encodeURIComponent(event.id)}`,
        },
        Math.max(
          1,
          Math.min(3600, Math.floor((Date.parse(event.endAt) - now) / 1000)),
        ),
      )
    await payload.create({
      collection: 'event-deliveries',
      data: {
        id,
        eventId: event.id,
        subscriptionId: subscription.id,
        outcome: eligible ? 'sent' : 'ineligible',
      },
    })
  }
}
