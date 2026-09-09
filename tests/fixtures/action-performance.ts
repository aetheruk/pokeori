import { mock } from 'bun:test'
mock.module('@/utilities/events/participation', () => ({ recordEventStateProgress: async () => {} }))
import { strict as assert } from 'node:assert'

let busy = false
let redisError = false
let commits = 0
const secret = 'private-player-request-reward-error'
mock.module('@payload-config', () => ({ default: {} }))
mock.module('payload', () => ({
  createLocalReq: async () => ({}), initTransaction: async () => true,
  commitTransaction: async () => { commits++ }, killTransaction: async () => {},
}))
mock.module('@/utilities/redis', () => ({ redis: {
  set: async () => { if (redisError) throw new Error(secret); return busy ? null : 'OK' },
  deleteIfValue: async () => true,
} }))
const { runEconomyAction } = await import('@/utilities/economy/transactions')
const { acquireActionLock } = await import('@/utilities/game-integrity')
const records: any[] = []
console.info = (value: string) => records.push(JSON.parse(value))
const payload: any = {
  db: { beginTransaction() {} },
  find: async () => ({ docs: [] }), create: async () => ({}),
}
const options = { userId: secret, action: secret, requestId: secret, payload }
process.env.GAME_PERFORMANCE_LOGS = 'false'
assert.equal(await runEconomyAction(options, async () => secret), secret)
assert.equal(records.length, 0)
process.env.GAME_PERFORMANCE_LOGS = 'true'
let attempts = 0
assert.equal(await runEconomyAction(options, async () => {
  if (++attempts === 1) throw Object.assign(new Error(secret), { errorLabels: ['TransientTransactionError'] })
  return secret
}), secret)
assert.equal(commits, 2)
assert.deepEqual(records.at(-1), { event: 'game-action', operation: 'economy', outcome: 'success', durationMs: records.at(-1).durationMs, attempts: 2, retries: 1, rollbackErrors: 0 })
payload.find = async () => ({ docs: [{ response: secret }] })
assert.equal(await runEconomyAction(options, async () => { throw new Error('must not execute') }), secret)
assert.equal(records.at(-1).outcome, 'replay')
assert.equal(records.at(-1).attempts, 0)
payload.find = async () => ({ docs: [] })
busy = true
await assert.rejects(runEconomyAction(options, async () => secret), { name: 'EconomyActionBusyError' })
assert.equal(records.at(-1).outcome, 'busy')
assert.equal(records.at(-2).outcome, 'busy')
busy = false
await assert.rejects(runEconomyAction(options, async () => { throw new Error(secret) }), { message: secret })
assert.equal(records.at(-1).outcome, 'error')
redisError = true
await assert.rejects(acquireActionLock(secret), { message: secret })
assert.equal(records.at(-1).outcome, 'error')
redisError = false
for (const record of records) {
  assert.deepEqual(Object.keys(record).sort(), ['event', 'operation', 'outcome', 'durationMs', 'attempts', 'retries', 'rollbackErrors'].sort())
  assert.ok(Number.isFinite(record.durationMs) && record.durationMs >= 0)
}
assert.equal(JSON.stringify(records).includes(secret), false)
console.info = () => { throw new Error('broken log sink') }
assert.equal(await runEconomyAction(options, async () => secret), secret)
