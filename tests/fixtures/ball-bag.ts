import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'

mock.module('server-only', () => ({}))
mock.module('@payload-config', () => ({ default: {} }))
mock.module('@/payload.config', () => ({ default: {} }))
mock.module('next/headers', () => ({ headers: async () => new Headers(), cookies: async () => ({ get: () => ({ value: 'test' }) }) }))
mock.module('next/cache', () => ({ revalidatePath() {} }))
mock.module('@/app/(frontend)/game/battles/actions', () => ({ startBattle: async () => ({}) }))
mock.module('@/app/(frontend)/game/locations/encounter/actions', () => ({ startEncounter: async () => ({}) }))
mock.module('@/app/(frontend)/game/games/actions', () => ({ startGame: async () => ({}) }))
mock.module('@/app/(frontend)/game/field-research/actions', () => ({ startFieldResearch: async () => ({}) }))
mock.module('@/utilities/tcg/tcg-card-draw', () => ({ drawRandomTcgCard: async () => ({}), drawTcgBoosterPacks: async () => ({}) }))
mock.module('@/utilities/events/participation', () => ({ recordEventStateProgress: async () => {}, recordEventActivityProgress: async () => {} }))
mock.module('@/utilities/weather', () => ({ ensureUserWeatherSlot: async () => ({ slot: 1, updatedAt: new Date().toISOString() }), resolveRequirementWeather: () => 'clear' }))
const req = { transactionID: 'bag-test' }
const user = { id: 'owner', skills: {}, currency: {} }
let inventory: Record<string, number> = {}
let failGrant = false
let authenticated = true
const receipts = new Map<string, any>()
const payload = {
  auth: async () => ({ user: authenticated ? user : null }),
  findByID: async () => user,
  find: async () => ({ docs: [] }),
  update: async ({ req: request }: any) => { assert.equal(request, req); if (failGrant) throw new Error('Grant failed'); return user },
}
mock.module('payload', () => ({ getPayload: async () => payload }))
mock.module('@/utilities/economy/transactions', () => ({
  createEconomyActionId: () => 'test', createEconomyRequestId: (id: string) => id,
  getEconomyActionErrorMessage: () => 'Failed',
  runEconomyAction: async (options: any, operation: any) => {
    if (receipts.has(options.requestId)) return structuredClone(receipts.get(options.requestId))
    const snapshot = structuredClone(inventory)
    try {
      const response = await operation({ payload, req })
      receipts.set(options.requestId, structuredClone(response))
      return response
    } catch (error) { inventory = snapshot; throw error }
  },
}))
const realState = await import('@/utilities/user-state')
mock.module('@/utilities/user-state', () => ({
  ...realState,
  getUserInventoryMap: async () => structuredClone(inventory),
  getUserPokedexMap: async () => ({}), getUserCompletedTasksMap: async () => ({}),
  getUserTcgMap: async () => ({}), getUserActivityStatsMap: async () => ({}),
  setUserInventoryMap: async (_payload: any, _id: string, next: any, options: any) => {
    assert.equal(options.req, req)
    inventory = structuredClone(next)
  },
}))
const { useConsumable: openContainer } = await import('@/app/(frontend)/game/inventory/actions')
const originalRandom = Math.random
function rolls(values: number[]) {
  // The shared reward grant updates the account's lastRoll before item rolls.
  const queued = [0.5, ...values]
  Math.random = () => queued.shift() ?? 0.99
}
try {
  inventory = { 'ball-bag': 2 }
  rolls([0, 0.99, 0.99, 0.99])
  assert.equal((await openContainer('ball-bag', 'ordinary')).success, true)
  assert.equal(inventory['poke-ball'], 1)
  assert.equal(inventory['ball-bag'], 1)
  assert.equal(inventory['great-ball'], undefined)
  rolls([0.999, 0.149, 0.019, 0.0000009])
  assert.equal((await openContainer('ball-bag', 'jackpot')).success, true)
  assert.equal(inventory['poke-ball'], 4)
  for (const id of ['great-ball', 'ultra-ball', 'master-ball']) assert.equal(inventory[id], 1)
  assert.equal(inventory['ball-bag'], undefined)
  const beforeReplay = structuredClone(inventory)
  await openContainer('ball-bag', 'jackpot')
  assert.deepEqual(inventory, beforeReplay)
  assert.equal((await openContainer('ball-bag', 'empty')).success, false)
  inventory = { 'ball-bag': 1 }
  rolls([0.5, 0.151, 0.021, 0.0000011])
  await openContainer('ball-bag', 'miss-bonuses')
  assert.deepEqual(inventory, { 'poke-ball': 2 })
  inventory = { 'ball-bag': 1 }
  failGrant = true
  assert.equal((await openContainer('ball-bag', 'rollback')).success, false)
  assert.deepEqual(inventory, { 'ball-bag': 1 })
  failGrant = false
  authenticated = false
  assert.equal((await openContainer('ball-bag', 'unauthorized')).success, false)
  console.log('Ball bag opening passed')
} finally { Math.random = originalRandom }
