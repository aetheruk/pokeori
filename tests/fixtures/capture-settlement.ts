import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'

const redisState = new Map<string, any>()
const receipts = new Map<string, any>()
let committedAwards = 0
let calls = 0
let redisOffline = true
mock.module('server-only', () => ({}))
mock.module('@/utilities/economy/transactions', () => ({
  createEconomyRequestId: (value: string) => value,
  getEconomyActionResult: async (options: any) => receipts.get(`${options.action}:${options.requestId}`) || null,
  runEconomyAction: async (options: any, operation: any) => {
    const keys = [options.requestId, ...(options.aliasRequestIds || [])].map((key) => `${options.action}:${key}`)
    for (const key of keys) if (receipts.has(key)) return structuredClone(receipts.get(key))
    let pendingAwards = 0
    const result = await operation({ payload: { findByID: async () => ({ id: 'owner' }), create: async () => { pendingAwards++ } }, req: {} })
    committedAwards += pendingAwards
    for (const key of keys) receipts.set(key, structuredClone(result))
    return result
  },
}))
mock.module('@/utilities/redis', () => ({ redis: { get: async (key: string) => redisState.get(key), setManyIfValue: async (key: string, previous: any, writes: any[]) => {
  if (redisOffline) throw new Error('Redis unavailable after Mongo commit')
  if (JSON.stringify(redisState.get(key)) !== JSON.stringify(previous)) return false
  for (const write of writes) redisState.set(write.key, structuredClone(write.value))
  return true
} } }))
const { runCaptureSettlement, replayCaptureSettlement } = await import('@/app/(frontend)/game/locations/encounter/actions/capture-settlement')
const initial: any = { locationId: 'route', startTime: 123, captureAttempts: 0, itemsUsed: [] }
redisState.set('encounter:owner', initial)
const operation = async ({ payload, state, redis, setIdempotentResult }: any) => {
  calls++
  await payload.create({ collection: 'pokemon', data: {} })
  state.captureAttempts++
  await redis.set('encounter:owner', state, { ex: 600 })
  const response = { success: true, caught: false, secondChance: true }
  await setIdempotentResult('result', response, 300)
  return response
}
await assert.rejects(runCaptureSettlement('owner', 'request-1', initial, operation), /Redis unavailable/)
assert.equal(committedAwards, 1)
assert.equal(initial.captureAttempts, 0)
redisOffline = false
const switchedAction = await runCaptureSettlement('owner', 'new-item-action', initial, operation, 'item')
assert.equal(switchedAction.code, 'ENCOUNTER_RESTORED')
assert.equal(calls, 1)
const recovered = await runCaptureSettlement('owner', 'different-client-id', initial, operation)
assert.equal(recovered.secondChance, true)
assert.equal(calls, 1)
assert.equal(redisState.get('encounter:owner').captureAttempts, 1)
assert.equal(redisState.get('encounter:owner').settlementRevision, 1)
assert.equal(redisState.get('result').secondChance, true)
const newer = { ...initial, startTime: 999 }
redisState.set('encounter:owner', newer)
await replayCaptureSettlement('owner', 'request-1')
assert.deepEqual(redisState.get('encounter:owner'), newer)
assert.equal(committedAwards, 1)
const rejected = await runCaptureSettlement('owner', 'rejected', newer, async ({ payload }) => {
  await payload.create({ collection: 'pokemon', data: {} } as any)
  return { success: false, error: 'Invalid ball' }
})
assert.equal(rejected.success, false)
assert.equal(committedAwards, 1)
assert.equal(await replayCaptureSettlement('owner', 'rejected'), null)
