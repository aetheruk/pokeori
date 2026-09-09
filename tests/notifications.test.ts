import { describe, expect, test } from 'bun:test'
import { runInNewContext } from 'node:vm'
import { dailyResetDue, dueVoyages, isPushEndpoint, notificationPreferencesSchema, notificationsOff, pushSubscriptionSchema, voyageNotificationKey } from '@/utilities/notifications/model'
import { notificationServiceWorker } from '@/utilities/notifications/service-worker'
import { PushSubscriptions } from '@/collections/PushSubscriptions'

describe('notification subscriptions', () => {
  test('both categories default off and cannot be truthy strings', () => {
    expect(notificationsOff).toEqual({ voyages: false, dailyReset: false })
    expect(notificationPreferencesSchema.safeParse({ voyages: 'true', dailyReset: false }).success).toBe(false)
    expect(notificationPreferencesSchema.safeParse({ voyages: true, dailyReset: true, user: 'another' }).success).toBe(false)
  })

  test('push endpoints cannot target internal services or deceptive hostnames', () => {
    for (const endpoint of ['https://fcm.googleapis.com/fcm/send/example', 'https://web.push.apple.com/Q/example', 'https://updates.push.services.mozilla.com/wpush/v2/example', 'https://wns2.notify.windows.com/w/?token=example']) expect(isPushEndpoint(endpoint)).toBe(true)
    for (const endpoint of ['http://fcm.googleapis.com/push', 'https://127.0.0.1/push', 'https://localhost/push', 'https://fcm.googleapis.com.evil.test/push', 'https://evilpush.apple.com/push', 'https://fcm.googleapis.com@evil.test/push', 'https://user:password@fcm.googleapis.com/push', 'https://fcm.googleapis.com:8000/push', 'https://fcm.googleapis.com/push#fragment', 'file:///tmp/secret']) expect(isPushEndpoint(endpoint)).toBe(false)
    expect(pushSubscriptionSchema.safeParse({ endpoint: 'https://fcm.googleapis.com/fcm/send/example', keys: { auth: 'bad', p256dh: 'bad' } }).success).toBe(false)
  })

  test('raw subscription collection is inaccessible through the public CMS API', () => {
    if (!PushSubscriptions.access) throw new Error('Missing collection access rules')
    for (const operation of ['create', 'read', 'update', 'delete'] as const) {
      expect((PushSubscriptions.access[operation] as () => boolean)()).toBe(false)
    }
  })
})

test('notification server actions and dispatcher isolate owners and persist retry state', async () => {
  // Module substitutes stay in a child process, never leaking into other Bun tests.
  const process = Bun.spawn(['bun', 'run', 'tests/helpers/notifications-runtime.fixture.ts'], { stdout: 'pipe', stderr: 'pipe' })
  const [status, stdout, stderr] = await Promise.all([process.exited, new Response(process.stdout).text(), new Response(process.stderr).text()])
  expect({ status, stdout: stdout.trim(), stderr: stderr.trim() }).toEqual({ status: 0, stdout: 'Notification runtime checks passed', stderr: '' })
})

describe('notification timing', () => {
  const voyage = { voyageId: 'test', startTime: '2026-09-08T22:00:00Z', endTime: '2026-09-09T01:00:00Z' }
  const enabled = '2026-09-08T23:00:00Z'
  test('uses the actual server end time, including voyages already running when enabled', () => {
    expect(dueVoyages([voyage], enabled, [], Date.parse('2026-09-09T00:59:59Z'))).toEqual([])
    expect(dueVoyages([voyage], enabled, [], Date.parse(voyage.endTime))).toEqual([voyage])
  })
  test('does not notify old completions, claimed voyages, disabled categories, or already-sent runs', () => {
    const now = Date.parse('2026-09-09T02:00:00Z')
    expect(dueVoyages([voyage], null, [], now)).toEqual([])
    expect(dueVoyages([voyage], '2026-09-09T01:30:00Z', [], now)).toEqual([])
    expect(dueVoyages([], enabled, [], now)).toEqual([])
    expect(dueVoyages([voyage], enabled, [voyageNotificationKey(voyage)], now)).toEqual([])
    expect(dueVoyages([voyage], enabled, [], now + 86_400_000)).toEqual([])
    expect(dueVoyages([{ ...voyage, endTime: 'invalid' }], enabled, [], now)).toEqual([])
  })
  test('repeat voyages have distinct identities', () => {
    expect(voyageNotificationKey(voyage)).not.toBe(voyageNotificationKey({ ...voyage, startTime: '2026-09-09T02:00:00Z' }))
  })
  test('daily reset is midnight UTC, unaffected by local date and DST', () => {
    expect(dailyResetDue('2026-09-08T23:59:59Z', Date.parse('2026-09-09T00:00:00Z'))).toBe(true)
    expect(dailyResetDue('2026-09-09T00:00:00Z', Date.parse('2026-09-09T23:59:59Z'))).toBe(false)
    expect(dailyResetDue('2026-09-09T00:30:00+01:00', Date.parse('2026-09-09T00:00:00Z'))).toBe(true)
    expect(dailyResetDue('2026-10-25T00:00:00Z', Date.parse('2026-10-25T23:59:59Z'))).toBe(false)
    expect(dailyResetDue('invalid', Date.now())).toBe(false)
  })
})

function workerHarness(windows: { url: string; focus: () => unknown }[] = []) {
  const handlers: Record<string, (event: any) => void> = {}
  const shown: any[] = []
  const opened: string[] = []
  runInNewContext(notificationServiceWorker, {
    URL,
    self: { location: { origin: 'https://pokeori.test' }, addEventListener: (name: string, handler: (event: any) => void) => { handlers[name] = handler }, registration: { showNotification: async (...args: any[]) => { shown.push(args) } } },
    clients: { matchAll: async () => windows, openWindow: async (url: string) => { opened.push(url) } },
  })
  const dispatch = async (type: string, event: object) => {
    let pending: Promise<unknown> = Promise.resolve()
    handlers[type]({ ...event, waitUntil: (promise: Promise<unknown>) => { pending = promise } })
    await pending
  }
  return { shown, opened, dispatch }
}

describe('push service worker', () => {
  test('displays activity artwork and a stable notification tag', async () => {
    const worker = workerHarness()
    await worker.dispatch('push', { data: { json: () => ({ title: 'Voyage complete', body: 'Returned', icon: '/test.png', tag: 'voyage:1', url: '/game/explore' }) } })
    expect(worker.shown[0]).toEqual(['Voyage complete', { body: 'Returned', icon: 'https://pokeori.test/test.png', tag: 'voyage:1', data: { url: 'https://pokeori.test/game/explore' } }])
  })
  test('malformed pushes still display a visible notification', async () => {
    const worker = workerHarness()
    await worker.dispatch('push', { data: { json: () => { throw new Error('malformed') } } })
    expect(worker.shown[0][0]).toBe('Pokeori')
    await worker.dispatch('push', { data: { json: () => null } })
    expect(worker.shown[1][0]).toBe('Pokeori')
  })
  test('rejects remote icons and destination URLs', async () => {
    const worker = workerHarness()
    await worker.dispatch('push', { data: { json: () => ({ icon: 'https://evil.test/tracker', url: 'https://evil.test/' }) } })
    expect(worker.shown[0][1].icon).toBe('/app-icon.avif')
    expect(worker.shown[0][1].data.url).toBe('/game/explore')
    await worker.dispatch('notificationclick', { notification: { close() {}, data: { url: 'https://evil.test/game' } } })
    expect(worker.opened).toEqual([])
  })
  test('focuses Explore but never navigates an active battle away', async () => {
    let focused = false
    const worker = workerHarness([{ url: 'https://pokeori.test/game/explore', focus: () => { focused = true } }])
    await worker.dispatch('notificationclick', { notification: { close() {}, data: { url: '/game/explore' } } })
    expect(focused).toBe(true)
    expect(worker.opened).toEqual([])
    const battle = workerHarness([{ url: 'https://pokeori.test/game/battles/encounter', focus: () => { throw new Error('Should not focus battle') } }])
    await battle.dispatch('notificationclick', { notification: { close() {}, data: { url: '/game/explore' } } })
    expect(battle.opened).toEqual(['https://pokeori.test/game/explore'])
  })
})
