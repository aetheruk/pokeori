import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'
import { createHash } from 'node:crypto'
import { testUndergroundMiningEntries } from '@/data/games/underground-mining/entries/test'
import {
  createUndergroundMiningRound,
  getUndergroundMiningPublicRound,
} from '@/utilities/research/underground-mining'

mock.module('server-only', () => ({}))
mock.module('@payload-config', () => ({ default: {} }))
mock.module('next/headers', () => ({ headers: async () => new Headers() }))
let authenticatedUser: string | null = 'miner'
const store = new Map<string, any>()
const durableReceipts = new Map<string, any>()
const locks = new Set<string>()
let rateAllowed = true
let failNextSave = false
let transactionsAvailable = true
let failAfterGrant = false
let ledger = {
  inventory: {} as Record<string, number>,
  currency: 0,
  wins: 0,
  losses: 0,
  grants: 0,
}
const payload: any = {
  auth: async () => ({
    user: authenticatedUser ? { id: authenticatedUser } : null,
  }),
  findByID: async ({ id }: any) => ({ id, skills: {}, kidMode: false }),
}
mock.module('payload', () => ({ getPayload: async () => payload }))
mock.module('@/utilities/redis', () => ({
  redis: {
    get: async (key: string) => structuredClone(store.get(key) ?? null),
    set: async (key: string, value: any) => {
      store.set(key, structuredClone(value))
      return 'OK'
    },
    del: async (key: string) => Number(store.delete(key)),
    setManyIfValue: async (key: string, expected: any, writes: any[]) => {
      if (failNextSave) {
        failNextSave = false
        return false
      }
      if (JSON.stringify(store.get(key)) !== JSON.stringify(expected))
        return false
      writes.forEach((write) =>
        store.set(write.key, structuredClone(write.value)),
      )
      return true
    },
  },
}))
mock.module('@/utilities/game-integrity', () => ({
  checkActionRateLimit: async () => ({ allowed: rateAllowed }),
  acquireActionLock: async (key: string) => {
    const acquired = !locks.has(key)
    if (acquired) locks.add(key)
    return { key, acquired }
  },
  releaseActionLock: async (lock: any) => {
    if (lock.acquired) locks.delete(lock.key)
  },
  getIdempotentResult: async (key: string) =>
    structuredClone(store.get(key) ?? null),
  setIdempotentResult: async (key: string, value: any) =>
    store.set(key, structuredClone(value)),
}))
class EconomyTransactionsUnavailableError extends Error {
  constructor() {
    super('Transactional account updates are unavailable.')
    this.name = 'EconomyTransactionsUnavailableError'
  }
}
mock.module('@/utilities/economy/transactions', () => ({
  EconomyTransactionsUnavailableError,
  getEconomyActionErrorMessage: () =>
    'Account updates are temporarily unavailable. Please try again shortly.',
  createEconomyRequestId: (value: string) =>
    createHash('sha256').update(value).digest('hex'),
  getEconomyActionResult: async () => null,
  runEconomyAction: async (options: any, operation: any) => {
    if (!transactionsAvailable) throw new EconomyTransactionsUnavailableError()
    if (durableReceipts.has(options.requestId))
      return structuredClone(durableReceipts.get(options.requestId))
    const next = structuredClone(ledger)
    const result = await operation({
      payload: { ...payload, next },
      req: { transactionID: 'mining-transaction' },
    })
    ledger = next
    durableReceipts.set(options.requestId, structuredClone(result))
    return result
  },
}))
mock.module('@/utilities/rewards/reward-logic', () => ({
  grantRewards: async (_userId: string, rewards: any[], options: any) => {
    assert.equal(options.req.transactionID, 'mining-transaction')
    const next = options.payload.next as typeof ledger
    next.grants++
    const summary: any = {
      xp: {},
      items: [],
      pokemon: [],
      currency: [],
      cards: [],
    }
    for (const reward of rewards) {
      if (reward.type === 'item') {
        next.inventory[reward.targetId] =
          (next.inventory[reward.targetId] || 0) + reward.quantity
        summary.items.push({
          id: reward.targetId,
          name: reward.targetId,
          quantity: reward.quantity,
        })
      } else if (reward.type === 'currency') {
        next.currency += reward.quantity
        summary.currency.push({
          type: reward.targetId,
          quantity: reward.quantity,
        })
      }
    }
    if (failAfterGrant) throw new Error('Fixture reward failure')
    return { summary }
  },
}))
const actualUserState = await import('@/utilities/user-state')
mock.module('@/utilities/user-state', () => ({
  ...actualUserState,
  incrementUserActivityResult: async (
    transactionPayload: any,
    _id: string,
    _field: string,
    _source: string,
    delta: any,
  ) => {
    transactionPayload.next.wins += delta.wins || 0
    transactionPayload.next.losses += delta.losses || 0
  },
}))
mock.module('@/utilities/expeditions/server', () => ({
  getActiveExpeditionForUser: async () => null,
  isCurrentExpeditionTask: async () => false,
  grantExpeditionSafariBallsForTask: async () => {},
  grantExpeditionLivesForTask: async () => {},
  completeCurrentUserExpeditionTaskStep: async () => ({}),
  failCurrentUserExpeditionTaskStep: async () => ({}),
  getExpeditionActivityStepStatusForUser: async () => 'current',
  getExpeditionTaskStepStatusForUser: async () => 'current',
  recordExpeditionActivityResult: async () => ({}),
}))
mock.module('@/utilities/tasks/daily-progress', () => ({
  recordDailyActivityProgress: async () => {},
  incrementDailyTaskProgress: async () => {},
}))
mock.module('@/utilities/game-data', () => ({
  getGameUserData: async () => ({}),
}))

const { submitUndergroundMiningStrike } = await import(
  '@/app/(frontend)/game/research/games/underground-mining'
)
const { completeGameActivity } = await import(
  '@/app/(frontend)/game/_shared/activity-actions'
)
const base = testUndergroundMiningEntries[0]
let nextStart = Date.now()

function newSession(
  found = 0,
  status: 'playing' | 'cleared' | 'collapsed' = 'playing',
  complete = false,
) {
  const encounter = {
    ...base,
    gameType: 'underground-mining',
    rewards: [{ type: 'currency', targetId: 'pokedollars', quantity: 25 }],
    settings: {
      ...base.settings,
      complete,
      gridSize: { cols: 8, rows: 6 },
      treasureCount: { min: 2, max: 2 },
      lootPool: [
        {
          itemId: 'helix-fossil',
          weight: 1,
          quantity: 2,
          size: { width: 2, height: 2 },
        },
      ],
      bedrockChance: 0,
    },
  }
  const { privateRound } = createUndergroundMiningRound(encounter.settings, 123)
  privateRound.status = status
  privateRound.treasures.forEach((treasure, index) => {
    if (index < found) {
      treasure.found = true
      for (const cell of privateRound.cells)
        if (
          cell.x >= treasure.x &&
          cell.x < treasure.x + 2 &&
          cell.y >= treasure.y &&
          cell.y < treasure.y + 2
        )
          cell.layersRemaining = 0
    }
  })
  const state = {
    userId: 'miner',
    encounterId: base.id,
    startTime: ++nextStart,
    expiry: Date.now() + 60_000,
    eventConfigSnapshot: encounter,
    roundData: getUndergroundMiningPublicRound(
      encounter.settings,
      privateRound,
    ),
    undergroundMiningPrivate: privateRound,
    wins: 0,
    losses: 0,
    history: [],
  }
  store.set('game:miner', structuredClone(state))
  return state
}

const input = (
  state: ReturnType<typeof newSession>,
  revision = state.roundData.revision,
) => ({
  encounterId: base.id,
  startTime: state.startTime,
  revision,
  x: 0,
  y: 0,
  tool: 'pickaxe' as const,
})
const original = newSession()
const first = await submitUndergroundMiningStrike(input(original))
assert.equal(first.success, true)
assert.equal(first.round.revision, 1)
assert.equal('seed' in first.round, false)
assert.equal('treasures' in first.round, false)
assert.deepEqual(await submitUndergroundMiningStrike(input(original)), first)
assert.equal(store.get('game:miner').roundData.revision, 1)
assert.equal(
  (await submitUndergroundMiningStrike(input(original, 100))).success,
  false,
)
assert.equal(store.get('game:miner').roundData.revision, 1)

for (const invalid of [
  { ...input(original, 1), x: -1 },
  { ...input(original, 1), x: 0.5 },
  { ...input(original, 1), tool: 'constructor' },
]) {
  assert.equal(
    (await submitUndergroundMiningStrike(invalid as any)).success,
    false,
  )
}
authenticatedUser = null
assert.equal(
  (await submitUndergroundMiningStrike(input(original, 1))).success,
  false,
)
authenticatedUser = 'other-miner'
assert.equal(
  (await submitUndergroundMiningStrike(input(original, 1))).success,
  false,
)
authenticatedUser = 'miner'
assert.equal(
  (
    await submitUndergroundMiningStrike({
      ...input(original, 1),
      startTime: original.startTime - 1,
    })
  ).success,
  false,
)
assert.equal(
  (
    await submitUndergroundMiningStrike({
      ...input(original, 1),
      encounterId: 'other-game',
    })
  ).success,
  false,
)
rateAllowed = false
assert.equal(
  (await submitUndergroundMiningStrike(input(original, 1))).success,
  false,
)
rateAllowed = true
locks.add('lock:game:settle:miner')
assert.equal(
  (await submitUndergroundMiningStrike(input(original, 1))).success,
  false,
)
locks.clear()
failNextSave = true
assert.equal(
  (await submitUndergroundMiningStrike(input(original, 1))).success,
  false,
)
assert.equal(store.get('game:miner').roundData.revision, 1)
assert.equal(
  (await submitUndergroundMiningStrike(input(original, 1))).success,
  true,
)
assert.equal(store.get('game:miner').roundData.revision, 2)
const expired = newSession()
store.get('game:miner').expiry = Date.now() - 1
assert.equal(
  (await submitUndergroundMiningStrike(input(expired))).success,
  false,
)

newSession()
assert.equal((await completeGameActivity('game', base.id, true)).success, false)
assert.equal(
  (await completeGameActivity('game', base.id, false)).success,
  false,
)
assert.ok(store.has('game:miner'))
const failing = newSession(1)
store.get('game:miner').undergroundMiningPrivate.wallStress =
  base.settings.wallStressLimit - 1
store.get('game:miner').roundData.wallStress = base.settings.wallStressLimit - 1
const ended = await submitUndergroundMiningStrike(input(failing))
assert.equal(ended.success, true)
assert.deepEqual(await submitUndergroundMiningStrike(input(failing)), ended)
assert.equal(
  store.get('game:miner').undergroundMiningPrivate.status,
  'collapsed',
)
assert.equal((await completeGameActivity('game', base.id, true)).success, false)
const collapsedState = structuredClone(store.get('game:miner'))
assert.equal(
  (
    await completeGameActivity('game', base.id, false, 999999, undefined, {
      'master-ball': 999,
    })
  ).success,
  false,
)
assert.equal(
  (
    await completeGameActivity(
      'game',
      base.id,
      false,
      999999,
      undefined,
      { '0:0': 999 },
      ['master-ball'],
    )
  ).success,
  false,
)
const collapsed = await completeGameActivity('game', base.id, false)
assert.equal(collapsed.success, true, JSON.stringify(collapsed))
assert.equal(store.has('game:miner'), false)
assert.deepEqual(ledger.inventory, { 'helix-fossil': 2 })
assert.equal(ledger.currency, 25)
assert.equal(ledger.losses, 1)
assert.equal(ledger.grants, 1)
assert.equal((await completeGameActivity('game', base.id, false)).success, true)
assert.equal(ledger.grants, 1)

// A committed transaction whose Redis cleanup was interrupted must use its durable receipt.
store.set('game:miner', collapsedState)
for (const key of store.keys())
  if (key.startsWith('game:complete-')) store.delete(key)
assert.equal((await completeGameActivity('game', base.id, false)).success, true)
assert.equal(store.has('game:miner'), false)
assert.equal(ledger.grants, 1)
assert.equal(ledger.losses, 1)

newSession(0, 'collapsed')
assert.equal((await completeGameActivity('game', base.id, false)).success, true)
assert.equal(store.has('game:miner'), false)
assert.equal(ledger.grants, 1)

newSession(2, 'cleared')
assert.equal(
  (await completeGameActivity('game', base.id, false)).success,
  false,
)
assert.equal((await completeGameActivity('game', base.id, true)).success, true)
assert.equal(store.has('game:miner'), false)
assert.equal(ledger.wins, 1)
assert.equal(ledger.currency, 75)
assert.equal(ledger.inventory['helix-fossil'], 6)

// Strict walls cannot pay partial loot, authored completion rewards, or failure XP.
newSession(1, 'collapsed', true)
store.get('game:miner').history = [{ success: false }]
store.get('game:miner').eventConfigSnapshot.skillXp = {
  skill: 'catching',
  level: 15,
}
store.get('game:miner').eventConfigSnapshot.skillXpOnFailure = true
const beforeStrictFailure = structuredClone(ledger)
assert.equal((await completeGameActivity('game', base.id, true)).success, false)
const strictFailure = await completeGameActivity('game', base.id, false)
assert.equal(strictFailure.success, true, JSON.stringify(strictFailure))
assert.deepEqual(strictFailure.summary?.items, [])
assert.deepEqual(strictFailure.summary?.xp, {})
assert.equal(store.has('game:miner'), false)
assert.deepEqual(ledger.inventory, beforeStrictFailure.inventory)
assert.equal(ledger.currency, beforeStrictFailure.currency)
assert.equal(ledger.grants, beforeStrictFailure.grants)
assert.equal(ledger.losses, beforeStrictFailure.losses + 1)
assert.equal((await completeGameActivity('game', base.id, false)).success, true)
assert.equal(ledger.grants, beforeStrictFailure.grants)

newSession(2, 'cleared', true)
assert.equal((await completeGameActivity('game', base.id, true)).success, true)
assert.equal(store.has('game:miner'), false)
assert.equal(
  ledger.inventory['helix-fossil'],
  beforeStrictFailure.inventory['helix-fossil'] + 4,
)
assert.equal(ledger.currency, beforeStrictFailure.currency + 25)
assert.equal(ledger.wins, beforeStrictFailure.wins + 1)

newSession(1, 'collapsed')
const beforeFailure = structuredClone(ledger)
transactionsAvailable = false
const unavailable = await completeGameActivity('game', base.id, false)
assert.equal(unavailable.success, false)
assert.match(
  unavailable.error || '',
  /Account updates are temporarily unavailable/,
)
assert.ok(store.has('game:miner'))
assert.deepEqual(ledger, beforeFailure)
transactionsAvailable = true
failAfterGrant = true
assert.equal(
  (await completeGameActivity('game', base.id, false)).success,
  false,
)
assert.ok(store.has('game:miner'))
assert.deepEqual(ledger, beforeFailure)
failAfterGrant = false
assert.equal((await completeGameActivity('game', base.id, false)).success, true)
assert.equal(store.has('game:miner'), false)
assert.equal(
  ledger.inventory['helix-fossil'],
  beforeFailure.inventory['helix-fossil'] + 2,
)
assert.equal(ledger.grants, beforeFailure.grants + 1)
console.log('Underground Mining session security and settlement passed')
