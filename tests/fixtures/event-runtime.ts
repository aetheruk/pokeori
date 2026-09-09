import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'
import type { EventParticipation } from '@/payload-types'

mock.module('server-only', () => ({}))
const now = Date.now()
const req: any = { transactionID: 'event-test' }
const event: any = {
  id: 'outbreak',
  status: 'published',
  startAt: new Date(now - 1000).toISOString(),
  endAt: new Date(now + 60000).toISOString(),
  title: 'Outbreak',
  description: 'Discover Pokémon',
  notify: true,
  requirements: [],
  notificationBody: '',
  content: [],
  modifiers: [],
}
const user: any = { id: 'trainer', skills: {} }
const task: any = {
  id: 'event:outbreak:task',
  name: 'Catch two',
  category: 'Kanto',
  requirements: [],
  criteria: [
    { type: 'location_encounter_result', targetId: 'route-1', count: 2 },
    { type: 'item_owned', targetId: 'poke-ball', count: 1, consume: true },
  ],
  rewards: [],
  repeatable: false,
  eventContexts: [{ id: event.id, title: event.title, endAt: event.endAt }],
}
const participation = new Map<string, EventParticipation>()
const deliveries = new Map<string, any>()
const payload: any = {
  findByID: async ({ collection, id }: any) =>
    collection === 'users'
      ? user
      : collection === 'game-events'
        ? event
        : collection === 'event-deliveries'
          ? deliveries.get(id) || null
          : participation.get(id) || null,
  find: async ({ collection }: any) => ({
    docs:
      collection === 'event-participation' ? [...participation.values()] : [],
  }),
  create: async ({ collection, data, req: passed }: any) => {
    if (collection === 'event-participation') {
      assert.equal(passed, req)
      participation.set(data.id, structuredClone(data))
      return structuredClone(data)
    }
    deliveries.set(data.id, data)
    return data
  },
  update: async ({ collection, id, data, req: passed }: any) => {
    assert.equal(collection, 'event-participation')
    assert.equal(passed, req)
    const next = {
      ...participation.get(id),
      ...structuredClone(data),
    } as EventParticipation
    participation.set(id, next)
    return next
  },
}
mock.module('@/utilities/events/server', () => ({
  getEffectiveContent: async () =>
    event.endAt > new Date().toISOString() ? task : undefined,
  loadGameEvents: async () => [event],
}))
mock.module('@/utilities/game-data', () => ({
  getGameUserData: async () => ({
    user,
    inventory: [],
    pokemon: [],
    completedTasks: [],
    pokedex: {},
    tcg: [],
  }),
}))
const {
  acceptEventTaskForUser,
  recordEventActivityProgress,
  resolveEventTaskClaim,
} = await import('@/utilities/events/participation')
const { dispatchEventNotifications } = await import(
  '@/utilities/events/notifications'
)

await recordEventActivityProgress(
  payload,
  user,
  { kind: 'catch', sourceId: 'route-1' },
  req,
)
assert.equal(participation.size, 0)
const accepted = await acceptEventTaskForUser(payload, user, task.id, req)
assert.equal(accepted.readyAt, undefined)
await recordEventActivityProgress(
  payload,
  user,
  { kind: 'catch', sourceId: 'route-2' },
  req,
)
await assert.rejects(
  () => resolveEventTaskClaim(payload, user, task.id, req),
  /not complete/,
)
await recordEventActivityProgress(
  payload,
  user,
  { kind: 'catch', sourceId: 'route-1' },
  req,
)
await recordEventActivityProgress(
  payload,
  user,
  { kind: 'catch', sourceId: 'route-1' },
  req,
)
event.endAt = new Date(Date.now() - 1).toISOString()
const claim = await resolveEventTaskClaim(payload, user, task.id, req)
assert.equal(claim?.task.criteria.length, 1)
assert.equal(claim?.task.criteria[0].consume, true)
assert.ok(claim)
assert.equal((claim.record.progress as any)['0'], 2)
await recordEventActivityProgress(
  payload,
  user,
  { kind: 'catch', sourceId: 'route-1' },
  req,
)
assert.equal((participation.get(accepted.id)!.progress as any)['0'], 2)
event.endAt = new Date(Date.now() - 86400001).toISOString()
await assert.rejects(
  () => resolveEventTaskClaim(payload, user, task.id, req),
  /expired/,
)
event.endAt = new Date(Date.now() + 60000).toISOString()
await payload.update({
  collection: 'event-participation',
  id: accepted.id,
  data: { claimedAt: new Date().toISOString() },
  req,
})
await assert.rejects(
  () => resolveEventTaskClaim(payload, user, task.id, req),
  /Accept the task again/,
)

const subscription: any = {
  id: 'device',
  user: user.id,
  gameEvents: true,
  eventsEnabledAt: new Date(now - 60000).toISOString(),
}
const messages: any[] = []
let fail = true
const send = async (message: any, ttl: number) => {
  if (fail) throw new Error('Transient')
  messages.push({ message, ttl })
}
await assert.rejects(
  () => dispatchEventNotifications(payload, subscription, send),
  /Transient/,
)
assert.equal(deliveries.size, 0)
fail = false
await dispatchEventNotifications(payload, subscription, send)
await dispatchEventNotifications(payload, subscription, send)
assert.equal(messages.length, 1)
assert.equal(messages[0].message.tag, 'game-event:outbreak')
assert.ok(messages[0].ttl <= 60)
await dispatchEventNotifications(
  payload,
  {
    ...subscription,
    id: 'late-device',
    eventsEnabledAt: new Date().toISOString(),
  },
  send,
)
assert.equal(messages.length, 1)
event.endAt = new Date(now - 1).toISOString()
await dispatchEventNotifications(
  payload,
  { ...subscription, id: 'other-device' },
  send,
)
assert.equal(messages.length, 1)
console.log('Event runtime checks passed')
