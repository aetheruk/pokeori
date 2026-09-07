import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'
mock.module('server-only', () => ({}))
const { loadExplorePokemonReadModel } = await import('@/utilities/pokemon/explore-read-model')

const ownerId = '0123456789abcdef01234567'
let reads = 0
let query: any
let projection: any
let sort: any
let rows: any[] = [{ _id: ownerId, name: 'Leaf', partner: false, identified: true, stats: { hp: 10 } }]
const config: any = { hooks: {}, fields: [{ name: 'partner', defaultValue: false }, { name: 'identified', defaultValue: false },
  { name: 'stats', fields: [{ name: 'hp', defaultValue: 0 }] }] }
const payload: any = { collections: { pokemon: { config } }, db: { collections: { pokemon: { find: (value: any) => {
  reads++; query = value
  return { select: (value: any) => { projection = value; return { sort: (value: any) => {
    sort = value; return { lean: () => ({ exec: async () => structuredClone(rows) }) }
  } } } }
} } } } }

const result = await loadExplorePokemonReadModel(payload, ownerId)
assert.equal(result?.[0].id, ownerId)
assert.equal('_id' in result![0], false)
assert.equal(query.user, ownerId)
assert.deepEqual(query.$or, [{ fusedIntoPokemonId: { $exists: false } }, { fusedIntoPokemonId: null }, { fusedIntoPokemonId: '' }])
assert.equal(projection.obtainedSourceId, true)
assert.equal(projection.gender, true)
assert.deepEqual(sort, { createdAt: -1 })
assert.equal(reads, 1)
assert.equal(await loadExplorePokemonReadModel(payload, 'invalid-owner'), null)
assert.equal(reads, 1)

for (const hook of ['beforeRead', 'afterRead', 'beforeOperation', 'afterOperation']) {
  config.hooks = { [hook]: [() => {}] }
  assert.equal(await loadExplorePokemonReadModel(payload, ownerId), null)
}
assert.equal(reads, 1)
config.hooks = {}
const originalFields = config.fields
for (const field of [
  { name: 'stats', fields: [{ name: 'hp', hooks: { afterRead: [() => {}] } }] },
  { tabs: [{ fields: [{ name: 'partner', hooks: { afterRead: [() => {}] } }] }] },
]) {
  config.fields = [field]
  assert.equal(await loadExplorePokemonReadModel(payload, ownerId), null)
}
assert.equal(reads, 1)
config.fields = originalFields
for (const legacyRow of [
  { _id: ownerId, identified: true, stats: { hp: 10 } },
  { _id: ownerId, partner: false, stats: { hp: 10 } },
  { _id: ownerId, partner: false, identified: true, stats: {} },
  { _id: ownerId, partner: false, identified: true },
]) {
  rows = [legacyRow]
  assert.equal(await loadExplorePokemonReadModel(payload, ownerId), null, 'Missing selected defaults require the canonical Payload path')
}
rows = [{ _id: ownerId, partner: null, identified: true, stats: { hp: null } }]
assert.notEqual(await loadExplorePokemonReadModel(payload, ownerId), null, 'Explicit nulls must not be silently replaced with defaults')
config.fields = [...originalFields, { name: 'friendship', defaultValue: 70 }]
assert.notEqual(await loadExplorePokemonReadModel(payload, ownerId), null, 'Unselected defaults do not require hydrating the entire collection')
config.fields = [{ tabs: [{ fields: [{ name: 'partner', defaultValue: false }] }] }]
rows = [{ _id: ownerId }]
assert.equal(await loadExplorePokemonReadModel(payload, ownerId), null)
