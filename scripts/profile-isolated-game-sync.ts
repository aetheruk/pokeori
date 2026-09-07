import { strict as assert } from 'node:assert'
import type { Payload } from 'payload'
import { EXPLORE_POKEMON_SELECT } from '../src/utilities/game-data-scopes'
import { loadExplorePokemonReadModel } from '../src/utilities/pokemon/explore-read-model'

/** Called only after the integration runner has enforced isolated credentials. */
export async function profileIsolatedGameSync(payload: Payload, userId: string, token: string, origin: string) {
  assert.equal(new URL(process.env.DATABASE_URI || 'invalid:').pathname, '/pokeori_security_test')
  assert.equal(new URL(process.env.DATABASE_URI || 'invalid:').port, '27028')
  const ids: string[] = []
  const measurements: unknown[] = []
  async function measure(fixture: string) {
    for (const scope of ['pokemon-box', 'inventory', 'explore']) {
      // The first request warms compilation and scoped caches; report the next two.
      for (let sample = 0; sample < 3; sample++) {
        const started = performance.now()
        const response = await fetch(`${origin}/api/game/sync?scope=${scope}`, {
          headers: { authorization: `JWT ${token}` },
        })
        const text = await response.text()
        assert.equal(response.status, 200, text)
        const data = JSON.parse(text)
        if (fixture === '1000 additional Pokemon' && scope === 'explore') {
          assert.ok(data.pokemon.length >= 1000, 'Mechanics snapshot must remain complete')
        }
        if (sample > 0) measurements.push({ fixture, scope, sample, elapsedMs: Math.round(performance.now() - started),
          bytes: Buffer.byteLength(text), serverTiming: response.headers.get('server-timing'), pokemonRows: data.pokemon?.length || 0 })
      }
    }
  }
  try {
    await measure('minimal account')
    for (let batch = 0; batch < 100; batch++) {
      const rows = await Promise.all(Array.from({ length: 10 }, () => payload.create({
        collection: 'pokemon', overrideAccess: true, depth: 0,
        data: { user: userId, originalTrainer: userId, speciesId: 1, formId: '1', level: 5 },
      })))
      ids.push(...rows.map((row) => row.id))
    }
    await measure('1000 additional Pokemon')
    const model = (payload.db as any).collections.pokemon
    const filter = { user: userId, $or: [{ fusedIntoPokemonId: { $exists: false } }, { fusedIntoPokemonId: null }, { fusedIntoPokemonId: '' }] }
    const started = performance.now()
    const rawRows = await model.find(filter).select(EXPLORE_POKEMON_SELECT).lean().exec()
    const directReadMs = performance.now() - started
    const explanation = await model.find(filter).select(EXPLORE_POKEMON_SELECT).maxTimeMS(10_000).explain('executionStats')
    const readModel = await loadExplorePokemonReadModel(payload, userId)
    const canonical = await payload.find({ collection: 'pokemon', where: {
      and: [{ user: { equals: userId } }, { or: [{ fusedIntoPokemonId: { exists: false } },
        { fusedIntoPokemonId: { equals: null } }, { fusedIntoPokemonId: { equals: '' } }] }],
    }, select: EXPLORE_POKEMON_SELECT, pagination: false, depth: 0 })
    const normalize = (rows: unknown[]) => JSON.parse(JSON.stringify(rows)).sort((a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id))
    assert.deepEqual(normalize(readModel || []), normalize(canonical.docs), 'Read model must preserve complete Payload DTO values')
    console.log(JSON.stringify({ event: 'isolated-pokemon-query-profile', directReadMs, rows: rawRows.length,
      executionStats: { executionTimeMillis: explanation.executionStats.executionTimeMillis,
        totalDocsExamined: explanation.executionStats.totalDocsExamined,
        totalKeysExamined: explanation.executionStats.totalKeysExamined,
        nReturned: explanation.executionStats.nReturned },
      indexes: (await model.collection.listIndexes().toArray()).map((index: any) => ({ key: index.key, unique: !!index.unique })) }))
    console.log(JSON.stringify({ event: 'isolated-game-sync-profile', measurements }))
  } finally {
    if (ids.length) await payload.delete({ collection: 'pokemon', where: { id: { in: ids } }, overrideAccess: true })
  }
}
