import { strict as assert } from 'node:assert'
// Companion to the opt-in production browser test. These exact isolated
// addresses are checked before importing Payload or touching any data.
import { writeFile } from 'node:fs/promises'
assert.equal(process.env.DATABASE_URI, 'mongodb://127.0.0.1:27028/pokeori_standalone_test?replicaSet=audit-rs&directConnection=true')
assert.equal(process.env.REDIS_URL, 'redis://127.0.0.1:6399/14')
const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
const fixturePath = '/tmp/pokeori-csp-fixture.json'
if (process.argv.includes('--seed-pokemon')) {
  const fixture = await Bun.file(fixturePath).json()
  const player = fixture.users.find((user: any) => user.role === 'player')
  assert.ok(player)
  const existing = await payload.count({ collection: 'pokemon', where: { user: { equals: player.id } }, overrideAccess: true })
  assert.equal(existing.totalDocs, 0, 'Seed only a fresh owned fixture collection')
  for (let index = 0; index < 160; index++) {
    await payload.create({ collection: 'pokemon', overrideAccess: true, data: { user: player.id, originalTrainer: player.id, speciesId: 19, formId: '19', name: `Audit sample ${String(index + 1).padStart(3, '0')}`, level: 5, identified: true } })
  }
  console.log('Seeded 160 Pokemon owned by the isolated player')
} else if (process.argv.includes('--seed-run')) {
  const fixture = await Bun.file(fixturePath).json()
  const { allGames } = await import('../src/data/games')
  const { createArcadeRound } = await import('../src/utilities/research/arcade-authority')
  const { redis } = await import('../src/utilities/redis')
  const player = fixture.users.find((user: any) => user.role === 'player')
  const encounter = allGames.find((game) => game.id === 'joeys-rattata-run')!
  const startTime = Date.now()
  await redis.set(`game:${player.id}`, { userId: player.id, encounterId: encounter.id, startTime, expiry: startTime + 7200000, wins: 0, losses: 0, history: [], roundData: createArcadeRound('run', encounter.settings, startTime, 42) }, 7200)
  console.log('Seeded own isolated Run session without a charge')
} else if (process.argv.includes('--cleanup')) {
  const fixture = await Bun.file(fixturePath).json()
  const { redis } = await import('../src/utilities/redis')
  for (const id of fixture.users.map((user: any) => user.id)) {
    await redis.del(`game:${id}`)
    await payload.delete({ collection: 'pokemon', where: { user: { equals: id } }, overrideAccess: true })
    await payload.delete({ collection: 'users', id, overrideAccess: true })
  }
  console.log('Removed only CSP fixture users')
} else {
  const prefix = `csp-${Date.now()}`
  const users = []
  for (const role of ['player', 'admin']) {
    const email = `${prefix}-${role}@example.test`
    const user = await payload.create({ collection: 'users', overrideAccess: true, data: { email, password: 'isolated-csp-browser-password-123', trainerName: `${prefix}-${role}`, isAdmin: role === 'admin' } })
    users.push({ id: user.id, email, role })
  }
  await writeFile(fixturePath, JSON.stringify({ users }), { mode: 0o600 })
  console.log(JSON.stringify({ users }))
}
await payload.destroy()
process.exit(0)
