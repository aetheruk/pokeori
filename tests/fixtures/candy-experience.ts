import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'
import {
  ALL_LEVEL_CAP_BADGE_IDS,
  getPokemonLevelFromExperience,
  getTotalPokemonExperienceForLevel,
} from '@/utilities/pokemon/experience'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'

const userId = 'candy-owner'
const pokemonId = 'candy-pokemon'
const req = { transactionID: 'candy-transaction' }
let user: any = { id: userId, skills: {}, currency: {} }
let pokemon: any
let inventory: Record<string, number> = {}
let receipts: any[] = []
let snapshot: any
let writes = 0
let failConsumption = false
let authenticated = true

const payload = {
  db: { beginTransaction() {}, transactionOptions: {} },
  auth: async () => ({ user: authenticated ? user : null }),
  findByID: async ({ collection, id }: any) => {
    if (collection === 'users') return structuredClone(user)
    assert.equal(collection, 'pokemon')
    assert.equal(id, pokemonId)
    return structuredClone(pokemon)
  },
  find: async ({ collection, where }: any) => {
    if (collection === 'economy-action-receipts') {
      return {
        docs: receipts.filter((receipt) => receipt.key === where.key.equals),
      }
    }
    assert.equal(collection, 'pokemon')
    return { docs: [structuredClone(pokemon)] }
  },
  update: async ({ collection, data, req: writeReq }: any) => {
    assert.equal(writeReq, req, 'Every durable write uses the same transaction')
    writes++
    if (collection === 'users') {
      user = { ...user, ...data }
      return user
    }
    assert.equal(collection, 'pokemon')
    pokemon = { ...pokemon, ...data }
    return pokemon
  },
  create: async ({ collection, data, req: writeReq }: any) => {
    assert.equal(writeReq, req)
    assert.equal(collection, 'economy-action-receipts')
    writes++
    receipts.push(structuredClone(data))
    return data
  },
}

mock.module('server-only', () => ({}))
mock.module('@/payload.config', () => ({ default: {} }))
mock.module('@payload-config', () => ({ default: {} }))
mock.module('next/headers', () => ({ headers: async () => new Headers() }))
mock.module('next/cache', () => ({ revalidatePath() {} }))
mock.module('@/utilities/logger', () => ({
  logger: { error() {}, warn() {}, info() {} },
}))
mock.module('@/utilities/game-integrity', () => ({
  acquireActionLock: async () => ({ acquired: true }),
  releaseActionLock: async () => {},
}))
mock.module('@/utilities/events/participation', () => ({
  recordEventStateProgress: async () => {},
  recordEventActivityProgress: async () => {},
}))
mock.module('payload', () => ({
  getPayload: async () => payload,
  createLocalReq: async () => req,
  initTransaction: async () => {
    snapshot = structuredClone({ user, pokemon, inventory, receipts })
    return true
  },
  commitTransaction: async () => {},
  killTransaction: async () => {
    ;({ user, pokemon, inventory, receipts } = snapshot)
  },
}))
mock.module('@/utilities/weather', () => ({
  ensureUserWeatherSlot: async () => ({
    slot: 1,
    updatedAt: new Date().toISOString(),
  }),
  resolveRequirementWeather: () => 'clear',
}))
const actualUserState = await import('@/utilities/user-state')
mock.module('@/utilities/user-state', () => ({
  ...actualUserState,
  getUserInventoryMap: async () => structuredClone(inventory),
  getUserPokedexMap: async () => ({}),
  getUserCompletedTasksMap: async () => ({}),
  getUserTcgMap: async () => ({}),
  getUserActivityStatsMap: async () => ({}),
  setUserInventoryMap: async (
    _payload: unknown,
    _id: string,
    next: Record<string, number>,
    options: any,
  ) => {
    assert.equal(options.req, req)
    if (failConsumption) throw new Error('Simulated inventory write failure')
    writes++
    inventory = structuredClone(next)
  },
}))

const { applyItemToPokemon, getUsableItems } = await import(
  '@/app/(frontend)/game/pokemon/actions/items'
)

function reset(
  level: number,
  itemId: string,
  options: { experience?: number; badges?: boolean; speciesId?: number } = {},
) {
  const speciesId = options.speciesId || 25
  const growthRate = getPokemonForm(String(speciesId))!.growth_rate
  pokemon = {
    id: pokemonId,
    user: userId,
    speciesId,
    formId: String(speciesId),
    name: 'Candy test',
    level,
    experience:
      options.experience ??
      getTotalPokemonExperienceForLevel(growthRate, level),
    nature: 'hardy',
    ivs: {},
    evs: {},
    friendship: 0,
  }
  inventory = {
    [itemId]: 2,
    ...(options.badges === false
      ? {}
      : Object.fromEntries(ALL_LEVEL_CAP_BADGE_IDS.map((id) => [id, 1]))),
  }
  receipts = []
  writes = 0
  failConsumption = false
  authenticated = true
}

for (const [itemId, xp, level] of [
  ['rare-candy-xs', 100, 50],
  ['rare-candy-m', 800, 20],
  ['rare-candy-xl', 3000, 40],
  ['rare-candy-mega', 10000, 60],
  ['rare-candy-tera', 30000, 80],
] as const) {
  for (const bag of [false, true]) {
    const id = `${itemId}${bag ? '-bag' : ''}`
    reset(level, id)
    const oldExperience = pokemon.experience
    const amount = xp * (bag ? 10 : 1)
    const result = await applyItemToPokemon(
      pokemonId,
      id,
      undefined,
      'candy-use',
    )
    assert.equal(result.success, true)
    assert.equal(pokemon.experience, oldExperience + amount)
    assert.equal(
      pokemon.level,
      getPokemonLevelFromExperience('medium', oldExperience + amount),
    )
    assert.equal(result.pokemon?.level, pokemon.level)
    assert.equal(inventory[id], 1)
    const entry = result.summary?.pokemonExperience?.[0]
    assert.equal(entry?.pokemonId, pokemonId)
    assert.equal(entry?.amount, amount)
    assert.equal(entry?.oldExperience, oldExperience)
    assert.equal(entry?.newExperience, pokemon.experience)
    assert.equal(entry?.oldLevel, level)
    assert.equal(entry?.newLevel, pokemon.level)
    assert.equal(entry?.formId, '25')
    const beforeReplay = writes
    assert.deepEqual(
      await applyItemToPokemon(pokemonId, id, undefined, 'candy-use'),
      result,
    )
    assert.equal(writes, beforeReplay)
    assert.equal(inventory[id], 1)
  }
}

// XP can make partial progress or cross several thresholds, using the species curve.
reset(50, 'rare-candy-xs')
const partial = await applyItemToPokemon(
  pokemonId,
  'rare-candy-xs',
  undefined,
  'partial',
)
assert.equal(partial.success, true)
assert.equal(partial.pokemon?.level, 50)
reset(1, 'rare-candy-xs-bag', { speciesId: 1 })
const multiLevel = await applyItemToPokemon(
  pokemonId,
  'rare-candy-xs-bag',
  undefined,
  'multiple',
)
assert.equal(multiLevel.success, true)
assert.equal(
  multiLevel.pokemon?.level,
  getPokemonLevelFromExperience('medium-slow', 1000),
)
assert.ok(multiLevel.pokemon!.level! > 2)

// Badge and level-100 caps trim the award and report the actual XP granted.
reset(20, 'rare-candy-xs', { experience: 9210, badges: false })
const capped = await applyItemToPokemon(
  pokemonId,
  'rare-candy-xs',
  undefined,
  'capped',
)
assert.equal(capped.success, true)
assert.equal(capped.summary?.pokemonExperience?.[0].amount, 50)
assert.equal(pokemon.experience, 9260)
assert.equal(pokemon.level, 20)
assert.equal(
  (await getUsableItems(pokemon)).some(
    (item) => item?.itemId === 'rare-candy-xs',
  ),
  false,
)
const capRejected = await applyItemToPokemon(
  pokemonId,
  'rare-candy-xs',
  undefined,
  'cap-full',
)
assert.equal(capRejected.success, false)
assert.equal(inventory['rare-candy-xs'], 1)
reset(99, 'rare-candy-tera-bag')
const maxed = await applyItemToPokemon(
  pokemonId,
  'rare-candy-tera-bag',
  undefined,
  'max-level',
)
assert.equal(maxed.success, true)
assert.equal(maxed.pokemon?.level, 100)
assert.equal(maxed.pokemon?.experience, 1_000_000)
assert.equal(maxed.summary?.pokemonExperience?.[0].amount, 29701)

for (const bag of [false, true]) {
  const id = `rare-candy-m${bag ? '-bag' : ''}`
  reset(19, id)
  assert.equal(
    (await applyItemToPokemon(pokemonId, id, undefined, 'too-young')).success,
    false,
  )
  assert.equal(inventory[id], 2)
  assert.equal(writes, 0)
}
reset(100, 'rare-candy-xs')
assert.equal(
  (
    await applyItemToPokemon(
      pokemonId,
      'rare-candy-xs',
      undefined,
      'already-max',
    )
  ).success,
  false,
)
assert.equal(inventory['rare-candy-xs'], 2)
reset(50, 'rare-candy-xs')
pokemon.user = 'another-user'
assert.equal(
  (await applyItemToPokemon(pokemonId, 'rare-candy-xs', undefined, 'not-owned'))
    .success,
  false,
)
assert.equal(writes, 0)
reset(50, 'rare-candy-xs')
assert.equal(
  (await applyItemToPokemon(pokemonId, 'rare-candy-xs')).success,
  false,
)
authenticated = false
assert.equal(
  (
    await applyItemToPokemon(
      pokemonId,
      'rare-candy-xs',
      undefined,
      'unauthorized',
    )
  ).success,
  false,
)
assert.equal(writes, 0)

// A failed consumption write rolls the XP update back and permits a clean retry.
reset(50, 'rare-candy-xs')
const original = structuredClone(pokemon)
failConsumption = true
assert.equal(
  (await applyItemToPokemon(pokemonId, 'rare-candy-xs', undefined, 'retry'))
    .success,
  false,
)
assert.deepEqual(pokemon, original)
assert.equal(inventory['rare-candy-xs'], 2)
assert.equal(receipts.length, 0)
failConsumption = false
assert.equal(
  (await applyItemToPokemon(pokemonId, 'rare-candy-xs', undefined, 'retry'))
    .success,
  true,
)
assert.equal(pokemon.experience, original.experience + 100)
assert.equal(inventory['rare-candy-xs'], 1)

reset(100, 'green-berry-candy')
const friendship = await applyItemToPokemon(
  pokemonId,
  'green-berry-candy',
  undefined,
  'friendship',
)
assert.equal(friendship.success, true)
assert.equal(pokemon.friendship, 2)
assert.equal(pokemon.level, 100)
assert.equal(friendship.summary, undefined)
