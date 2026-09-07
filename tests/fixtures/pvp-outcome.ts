import {mock} from 'bun:test'
import {strict as assert} from 'node:assert'
import {makePvpBattleState} from '../helpers/battle-fixtures'

let database = {p1Wins: 0, p2Losses: 0, rewards: 0, expeditions: 0, held: 0, kos: 0}
let failHeld = true
const receipts = new Map<string, any>()
mock.module('server-only', () => ({}))
mock.module('@/data/battles', () => ({battles: [{id: 'pvp-test-battle', rewards: [{type: 'currency', targetId: 'pokedollars', quantity: 10}]}]}))
mock.module('@/utilities/economy/transactions', () => ({
  createEconomyRequestId: (id: string) => id,
  runEconomyAction: async (options: any, operation: any) => {
    const key = `${options.userId}:${options.action}:${options.requestId}`
    if (receipts.has(key)) return structuredClone(receipts.get(key))
    const next = structuredClone(database)
    const result = await operation({payload: {next}, req: {transactionID: 'test'}})
    database = next
    receipts.set(key, structuredClone(result))
    return result
  },
}))
mock.module('@/utilities/user-state', () => ({
  incrementUserActivityResult: async (payload: any, user: string, _domain: any, _id: any, result: any) => {
    if (user === 'player-1') payload.next.p1Wins += result.wins || 0
    if (user === 'player-2') payload.next.p2Losses += result.losses || 0
  },
  registerUserSketchedMove: async () => ({isNew: false}),
}))
mock.module('@/utilities/expeditions/server', () => ({recordExpeditionActivityResult: async (_u: any, _d: any, _i: any, _w: any, options: any) => {options.payload.next.expeditions++; return {}}}))
mock.module('@/utilities/rewards/reward-logic', () => ({grantRewards: async (_u: any, _r: any, options: any) => {options.payload.next.rewards++; return {summary: {}}}}))
mock.module('@/app/(frontend)/game/battles/helpers/held-items', () => ({
  persistHeldItemBattleWinEffects: async (_t: any, _r: any, payload: any) => {payload.next.held++},
  persistConsumedHeldItems: async (_s: any, payload: any) => {if (failHeld) throw new Error('held persistence failed'); payload.next.held++},
}))
mock.module('@/app/(frontend)/game/battles/helpers/pokemon-ko-credit', () => ({persistPokemonBattleKOs: async (_s: any, payload: any) => {payload.next.kos++}}))
const {settlePvpOutcome} = await import('@/app/(frontend)/game/battles/pvp/outcome')
const state = {...makePvpBattleState(), battleId: 'pvp-test-battle', status: 'won' as const, economyActionId: 'one-match'}
const original = structuredClone(state)
await assert.rejects(settlePvpOutcome(state), /held persistence failed/)
assert.deepEqual(database, {p1Wins: 0, p2Losses: 0, rewards: 0, expeditions: 0, held: 0, kos: 0})
assert.deepEqual(state, original)
failHeld = false
const settled = await settlePvpOutcome(state)
assert.deepEqual(database, {p1Wins: 1, p2Losses: 1, rewards: 1, expeditions: 2, held: 2, kos: 1})
const committed = structuredClone(database)
// A concurrent surrender or rerolled loss must restore the committed winner.
assert.deepEqual(await settlePvpOutcome({...original, status: 'lost'}), settled)
assert.deepEqual(database, committed)
await settlePvpOutcome({...original, status: 'draw', economyActionId: 'draw-match'})
assert.equal(database.p1Wins, 1)
assert.equal(database.p2Losses, 1)
assert.equal(database.rewards, 1)
assert.equal(database.kos, 2)
