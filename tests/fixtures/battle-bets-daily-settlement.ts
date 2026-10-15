import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'

mock.module('server-only', () => ({}))
mock.module('@payload-config', () => ({ default: {} }))
mock.module('@/payload.config', () => ({ default: {} }))
mock.module('next/headers', () => ({ headers: async () => new Headers() }))
mock.module('@/app/(frontend)/game/battles/pvp/resolution', () => ({
  resolvePvpTurn: async () => { throw new Error('Terminal settlements must not resolve another turn') },
}))
mock.module('@/utilities/game-data', () => ({ getGameUserData: async () => ({}) }))

const gameId = 'celadon-high-stakes-battle-bets'
const user = {
  id: 'bettor',
  currency: { 'fun-tokens': 100 },
  activeDailyTasks: [{
    id: 'daily-battle-bets',
    criteria: [{ type: 'daily_activity', count: 2, progress: 0,
      dailyActivity: { kind: 'game_win', sourceIds: [gameId] } }],
  }, {
    id: 'daily-other-game',
    criteria: [{ type: 'daily_activity', count: 1, progress: 0,
      dailyActivity: { kind: 'game_win', sourceIds: ['other-game'] } }],
  }],
}
const req = { transactionID: 'settlement-transaction' }
const store = new Map<string, any>()
const receipts = new Map<string, any>()
let statsRecorded = 0
let eventsRecorded = 0
const payload = {
  auth: async () => ({ user }),
  findByID: async (args: any) => {
    assert.equal(args.req, req)
    return structuredClone(user)
  },
  update: async (args: any) => {
    assert.equal(args.req, req)
    Object.assign(user, structuredClone(args.data))
    return structuredClone(user)
  },
}
mock.module('payload', () => ({ getPayload: async () => payload }))
mock.module('@/utilities/redis', () => ({ redis: {
  get: async (key: string) => structuredClone(store.get(key) ?? null),
  set: async (key: string, value: any) => store.set(key, structuredClone(value)),
  del: async (key: string) => store.delete(key),
} }))
mock.module('@/utilities/game-integrity', () => ({
  acquireActionLock: async () => ({ acquired: true }),
  releaseActionLock: async () => {},
  checkActionRateLimit: async () => ({ allowed: true }),
  getIdempotentResult: async (key: string) => structuredClone(receipts.get(key) ?? null),
  setIdempotentResult: async (key: string, value: any) => receipts.set(key, structuredClone(value)),
}))
mock.module('@/utilities/economy/transactions', () => ({
  runEconomyAction: async (options: any, callback: any) => {
    const key = `${options.action}:${options.requestId}`
    if (receipts.has(key)) return structuredClone(receipts.get(key))
    const result = await callback({ payload, req })
    receipts.set(key, structuredClone(result))
    return result
  },
}))
const actualUserState = await import('@/utilities/user-state')
mock.module('@/utilities/user-state', () => ({
  ...actualUserState,
  incrementUserActivityResult: async (...args: any[]) => {
    assert.equal(args[5].req, req)
    statsRecorded++
  },
}))
mock.module('@/utilities/events/participation', () => ({
  recordEventActivityProgress: async (...args: any[]) => {
    assert.equal(args[3], req)
    eventsRecorded++
  },
}))

const { advanceBattleBetsBattle } = await import('@/app/(frontend)/game/games/battle-bets-actions')
function terminalSession(sessionId: string, won: boolean) {
  return {
    gameId, sessionId, phase: 'result', won, payout: won ? 50 : 0,
    tokenBalance: user.currency['fun-tokens'], femaleChance: 0.5, maleChance: 0.5,
    expiresAt: Date.now() + 60_000,
    fixture: { battleState: { status: won ? 'won' : 'lost' } },
  }
}

const initialWin = terminalSession('winning-session', true)
store.set('battle-bets:bettor', initialWin)
assert.equal((await advanceBattleBetsBattle('win-action-0001')).success, true)
assert.equal(user.activeDailyTasks[0].criteria[0].progress, 1)
assert.equal(user.activeDailyTasks[1].criteria[0].progress, 0)
assert.equal(user.currency['fun-tokens'], 150)

// A stale Redis snapshot must recover the receipt without repeating daily credit.
store.set('battle-bets:bettor', initialWin)
await advanceBattleBetsBattle('win-retry-0001')
assert.equal(user.activeDailyTasks[0].criteria[0].progress, 1)
assert.equal(user.currency['fun-tokens'], 150)
assert.equal(statsRecorded, 1)
assert.equal(eventsRecorded, 1)

store.set('battle-bets:bettor', terminalSession('losing-session', false))
await advanceBattleBetsBattle('loss-action-0001')
assert.equal(user.activeDailyTasks[0].criteria[0].progress, 1)
assert.equal(eventsRecorded, 1)

store.set('battle-bets:bettor', terminalSession('second-winning-session', true))
await advanceBattleBetsBattle('win-action-0002')
assert.equal(user.activeDailyTasks[0].criteria[0].progress, 2)
assert.equal(user.activeDailyTasks[1].criteria[0].progress, 0)
console.log('Battle Bets daily settlement passed')
