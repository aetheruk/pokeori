import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'

let database = { currency: { pokedollars: 100 }, losses: 0, expeditionLosses: 0, eventLosses: 0 }
let failKo = true
const receipts = new Map<string, any>()
mock.module('server-only', () => ({}))
mock.module('@/utilities/events/participation', () => ({ recordEventActivityProgress: async (payload: any, _user: any, event: any, req: any) => { assert.ok(req); assert.equal(event.kind, 'battle_loss'); assert.equal(event.sourceId, 'trainer'); payload.next.eventLosses++ } }))
mock.module('@payload-config', () => ({ default: {} }))
mock.module('@/utilities/economy/transactions', () => ({
  createEconomyRequestId: (value: string) => value,
  runEconomyAction: async (options: any, operation: any) => {
    if (receipts.has(options.requestId)) return structuredClone(receipts.get(options.requestId))
    const next = structuredClone(database)
    const payload = { next, findByID: async () => ({ id: 'owner', currency: next.currency }),
      update: async ({ data }: any) => { Object.assign(next, data) } }
    const result = await operation({ payload, req: {} })
    database = next
    receipts.set(options.requestId, structuredClone(result))
    return result
  },
}))
mock.module('@/utilities/user-state', () => ({ incrementUserActivityResult: async (payload: any) => { payload.next.losses++ } }))
mock.module('@/utilities/expeditions/server', () => ({ recordExpeditionActivityResult: async (_user: any, _type: any, _id: any, _win: any, options: any) => {
  options.payload.next.expeditionLosses++
  return { expedition: { losses: options.payload.next.expeditionLosses } }
} }))
mock.module('@/app/(frontend)/game/battles/helpers/held-items', () => ({ persistConsumedHeldItems: async (state: any) => { state.heldItemsSettled = true } }))
mock.module('@/app/(frontend)/game/battles/helpers/pokemon-ko-credit', () => ({ persistPokemonBattleKOs: async () => { if (failKo) throw new Error('KO persistence failed') } }))
const { handleBattleLoss } = await import('@/app/(frontend)/game/battles/helpers/loss-handler')
const user: any = { id: 'owner' }
const original: any = { battleId: 'trainer', economyActionId: 'one-battle', status: 'lost', playerTeam: [], enemyTeam: [], history: [{ message: 'Lost' }] }
const config: any = { rewards: [{ type: 'currency', targetId: 'pokedollars', quantity: 40 }] }
const state = structuredClone(original)
await assert.rejects(handleBattleLoss(state, user, config), /KO persistence failed/)
assert.deepEqual(state, original)
assert.equal(database.currency.pokedollars, 100)
assert.equal(database.losses, 0)
assert.equal(database.expeditionLosses, 0)
failKo = false
await handleBattleLoss(state, user, config)
assert.equal(database.currency.pokedollars, 80)
assert.equal(database.losses, 1)
assert.equal(database.eventLosses, 1)
assert.equal(database.expeditionLosses, 1)
assert.equal(state.heldItemsSettled, true)
const retry = structuredClone(original)
await handleBattleLoss(retry, user, config)
assert.deepEqual(retry, state)
assert.equal(database.currency.pokedollars, 80)
assert.equal(database.losses, 1)
