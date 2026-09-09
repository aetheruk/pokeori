import { mock } from 'bun:test'
import assert from 'node:assert/strict'
import { createECDH, createHash, randomBytes } from 'node:crypto'

// Intentionally isolated by the parent test: no network or real database access.
const records = new Map<string, any>()
let authenticated: { id: string } | null = { id: 'trainer-a' }
let voyages: any[] = []
let tutorialComplete = true
let allowRate = true
let sendFailure = 0
let failTag = ''
const messages: any[] = []
const locks = new Set<string>()
const payload = {
  auth: async () => ({ user: authenticated }),
  findByID: async ({ collection, id }: any) => collection === 'users' ? { id, activeVoyages: voyages } : records.has(id) ? structuredClone(records.get(id)) : null,
  count: async () => ({ totalDocs: records.size }),
  find: async () => ({ docs: [...records.values()].filter(record => Date.parse(record.nextCheckAt) <= Date.now()).map(record => ({ id: record.id })) }),
  create: async ({ data }: any) => { assert(!records.has(data.id)); records.set(data.id, structuredClone(data)); return data },
  update: async ({ id, data }: any) => { const updated = { ...records.get(id), ...structuredClone(data) }; records.set(id, updated); return updated },
  delete: async ({ id }: any) => { records.delete(id) },
}
mock.module('server-only', () => ({}))
mock.module('next/headers', () => ({ headers: async () => new Headers() }))
mock.module('payload', () => ({ getPayload: async () => payload }))
mock.module('@payload-config', () => ({ default: {} }))
mock.module('@/utilities/game-integrity', () => ({
  checkActionRateLimit: async () => ({ allowed: allowRate }),
  acquireActionLock: async (key: string) => { const acquired = !locks.has(key); if (acquired) locks.add(key); return { key, acquired } },
  releaseActionLock: async ({ key, acquired }: any) => { if (acquired) locks.delete(key) },
}))
mock.module('@/utilities/notifications/config', () => ({ getPushConfig: () => ({ subject: 'mailto:test@example.test', publicKey: 'test', privateKey: 'test' }) }))
mock.module('@/utilities/user-state', () => ({ getUserCompletedTasksMap: async () => tutorialComplete ? { 'tutorial-16': true } : {} }))
mock.module('@/data/voyages', () => ({ getVoyage: (id: string) => ({ id, name: id, icon: { type: 'local', id: 'voyage.png' } }) }))
mock.module('@/data/items', () => ({ getItemSpriteUrl: () => '/journal.png' }))
mock.module('@/utilities/pokemon/local-sprites', () => ({ getBundledPokemonSpriteUrl: () => '/pokemon.png' }))
mock.module('web-push', () => ({ default: { sendNotification: async (subscription: any, body: string, options: any) => {
  const message = JSON.parse(body)
  if (sendFailure && (!failTag || message.tag.startsWith(failTag))) throw { statusCode: sendFailure }
  messages.push({ subscription, message, options })
} } }))
const { getNotificationSettings, saveNotificationSettings, resetDeviceNotifications, sendTestNotification } = await import('@/utilities/notifications/actions')
const { dispatchNotifications } = await import('@/utilities/notifications/worker')

const curve = createECDH('prime256v1')
curve.generateKeys()
const subscription = { endpoint: 'https://web.push.apple.com/Q/test', keys: { p256dh: curve.getPublicKey().toString('base64url'), auth: randomBytes(16).toString('base64url') } }
const id = createHash('sha256').update(subscription.endpoint).digest('hex')
const off = { voyages: false, dailyReset: false }
assert.deepEqual((await getNotificationSettings(subscription)).preferences, off)
authenticated = null
await assert.rejects(() => saveNotificationSettings(subscription, { voyages: true, dailyReset: false }), /sign in/)
authenticated = { id: 'trainer-a' }
allowRate = false
await assert.rejects(() => saveNotificationSettings(subscription, { voyages: true, dailyReset: false }), /wait a minute/)
allowRate = true
await saveNotificationSettings(subscription, { voyages: true, dailyReset: true })
assert.equal(records.size, 1)
const enabledAt = records.get(id).voyagesEnabledAt
assert.deepEqual((await getNotificationSettings(subscription)).preferences, { voyages: true, dailyReset: true })
await saveNotificationSettings(subscription, { voyages: true, dailyReset: false })
assert.equal(records.get(id).voyagesEnabledAt, enabledAt)

authenticated = { id: 'trainer-b' }
assert.deepEqual((await getNotificationSettings(subscription)).preferences, off)
await assert.rejects(() => saveNotificationSettings(subscription, { voyages: true, dailyReset: false }), /another trainer/)
await assert.rejects(() => sendTestNotification(subscription), /Enable a notification category/)
await assert.rejects(() => resetDeviceNotifications({ ...subscription, keys: { ...subscription.keys, auth: randomBytes(16).toString('base64url') } }), /verify/)
assert.equal(records.get(id).user, 'trainer-a')
authenticated = { id: 'trainer-a' }
await sendTestNotification(subscription)
assert.equal(messages.pop().message.tag, 'pokeori-test')

const now = Date.now()
voyages = [1, 2].map(n => ({ voyageId: `voyage-${n}`, startTime: new Date(now - 600_000).toISOString(), endTime: new Date(now - 1000).toISOString() }))
records.get(id).voyagesEnabledAt = new Date(now - 60_000).toISOString()
// An overlapping dispatcher/preferences write must not send.
locks.add(`push:${id}`)
await dispatchNotifications()
assert.equal(messages.length, 0)
locks.delete(`push:${id}`)
sendFailure = 503
failTag = 'voyage:voyage-2'
const previousWarn = console.warn
console.warn = () => {}
await dispatchNotifications()
console.warn = previousWarn
assert.equal(messages.length, 1)
assert.equal(records.get(id).sentVoyages.length, 1)
assert(Date.parse(records.get(id).nextCheckAt) > now)
sendFailure = 0
records.get(id).nextCheckAt = new Date(0).toISOString()
await dispatchNotifications()
assert.equal(messages.length, 2)
assert.equal(records.get(id).sentVoyages.length, 2)
records.get(id).nextCheckAt = new Date(0).toISOString()
await dispatchNotifications()
assert.equal(messages.length, 2)

// Daily reset unlocks, cursor persistence, and no re-send after a new dispatcher call.
records.get(id).dailyReset = true
records.get(id).dailyCursor = new Date(now - 86_400_000).toISOString()
records.get(id).nextCheckAt = new Date(0).toISOString()
tutorialComplete = false
await dispatchNotifications()
assert.equal(messages.length, 2)
records.get(id).dailyCursor = new Date(now - 86_400_000).toISOString()
records.get(id).nextCheckAt = new Date(0).toISOString()
tutorialComplete = true
await dispatchNotifications()
assert.equal(messages.length, 3)
assert(messages[2].message.tag.startsWith('daily:'))
records.get(id).nextCheckAt = new Date(0).toISOString()
await dispatchNotifications()
assert.equal(messages.length, 3)

// A provider-invalidated credential is removed rather than retried forever.
records.get(id).dailyCursor = new Date(now - 86_400_000).toISOString()
records.get(id).nextCheckAt = new Date(0).toISOString()
sendFailure = 410
failTag = ''
await dispatchNotifications()
assert.equal(records.size, 0)
sendFailure = 0
await saveNotificationSettings(subscription, { voyages: true, dailyReset: true })
await saveNotificationSettings(subscription, off)
assert.equal(records.size, 0)
await saveNotificationSettings(subscription, { voyages: true, dailyReset: false })
authenticated = { id: 'trainer-b' }
await resetDeviceNotifications(subscription)
assert.equal(records.size, 0)
await saveNotificationSettings(subscription, { voyages: false, dailyReset: true })
assert.equal(records.get(id).user, 'trainer-b')
console.log('Notification runtime checks passed')
