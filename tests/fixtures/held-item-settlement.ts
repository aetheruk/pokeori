import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'

let database: any = { inventories: { owner: { berry: 2 } }, pokemon: {} }
let failPokemon = true
let transactions = 0
const receipts = new Map<string, any>()
mock.module('@payload-config', () => ({ default: {} }))
mock.module('@/utilities/user-state', () => ({
  getUserInventoryMap: async (payload: any, owner: string) => structuredClone(payload.database.inventories[owner] || {}),
  setUserInventoryMap: async (payload: any, owner: string, value: any) => { payload.database.inventories[owner] = value },
}))
mock.module('@/utilities/economy/transactions', () => ({
  createEconomyRequestId: (value: string) => value,
  runEconomyAction: async (options: any, operation: any) => {
    const key = `${options.userId}:${options.requestId}`
    if (receipts.has(key)) return structuredClone(receipts.get(key))
    const candidate = structuredClone(database)
    transactions++
    const payload = { database: candidate, update: async ({ id, data }: any) => {
      if (failPokemon) throw new Error('injected write failure')
      candidate.pokemon[id] = data
    } }
    const result = await operation({ payload })
    database = candidate
    receipts.set(key, structuredClone(result))
    return result
  },
}))
const { persistConsumedHeldItems } = await import('@/app/(frontend)/game/battles/helpers/held-items')
const initial: any = { status: 'lost', battleId: 'battle', economyActionId: 'unique-run', enemyTeam: [],
  playerTeam: [{ id: 'pokemon', user: 'owner', itemCharge: 50, consumedHeldItems: [{ itemId: 'berry', persistent: true }] }],
  heldItemChargeRewards: [{ ownerId: 'owner', itemId: 'gem', quantity: 1 }],
}
const state = structuredClone(initial)
await assert.rejects(persistConsumedHeldItems(state), /injected write failure/)
assert.deepEqual(database.inventories.owner, { berry: 2 })
assert.deepEqual(state, initial)
failPokemon = false
await persistConsumedHeldItems(state)
assert.deepEqual(database.inventories.owner, { berry: 1, gem: 1 })
assert.deepEqual(database.pokemon.pokemon, { heldItemId: 'berry', itemCharge: 50 })
assert.equal(state.heldItemsSettled, true)
const replay = structuredClone(initial)
await persistConsumedHeldItems(replay)
assert.deepEqual(database.inventories.owner, { berry: 1, gem: 1 })
assert.equal(replay.heldItemsSettled, true)
assert.equal(transactions, 2)
