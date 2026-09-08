import { strict as assert } from 'node:assert'
import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'

// Never inherit the repository's real database accidentally. Check before even
// importing Payload configuration, which initializes the Mongo adapter.
const databaseUrl = new URL(process.env.DATABASE_URI || 'invalid:')
const redisUrl = new URL(process.env.REDIS_URL || 'invalid:')
assert.equal(databaseUrl.hostname, '127.0.0.1', 'Integration tests require loopback MongoDB')
assert.equal(databaseUrl.port, '27028', 'Integration tests require isolated MongoDB port 27028')
assert.equal(databaseUrl.pathname, '/pokeori_security_test', 'Integration tests require their dedicated database')
assert.equal(redisUrl.hostname, '127.0.0.1', 'Integration tests require loopback Redis')
assert.equal(redisUrl.port, '6399', 'Integration tests require isolated Redis port 6399')
assert.equal(process.env.NODE_ENV, 'test', 'Set NODE_ENV=test explicitly')
const origin = process.env.SECURITY_TEST_ORIGIN
if (origin) {
  const url = new URL(origin)
  assert.equal(url.hostname, '127.0.0.1')
  assert.equal(url.port, '3110')
}

const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config')
const { issueRegistrationInvitation, verifyRegistrationInvitation } = await import('../src/utilities/auth/invitations')
const { registerInvitedAccount } = await import('../src/utilities/auth/register-invited-account')
const { runEconomyAction } = await import('../src/utilities/economy/transactions')
const { planFriendship, friendRequests } = await import('../src/utilities/trainers/friendship')
const { redis } = await import('../src/utilities/redis')
const payload = await getPayload({ config })
const prefix = `security-${randomUUID()}`
const password = 'integration-only-password-123'
const users: string[] = []
const pokemonIds: string[] = []
const runIds: string[] = []
const redisFixtures: string[] = []
let assertions = 0

async function denied(operation: () => Promise<unknown>) {
  await assert.rejects(operation, (error: any) => error.status === 401 || error.status === 403 || error.status === 404)
  assertions++
}

try {
  // Ensure the same existing index required by economy transactions in releases.
  const receiptModel = (payload.db as any).collections['economy-action-receipts']
  await receiptModel.collection.createIndex({ key: 1 }, { name: 'key_1', unique: true })
  const createUser = async (label: string, isAdmin = false) => {
    const user = await payload.create({
      collection: 'users', overrideAccess: true,
      data: { email: `${prefix}-${label}@example.test`, trainerName: `${prefix}-${label}`, password, isAdmin },
    })
    users.push(user.id)
    return user
  }
  const admin = await createUser('admin', true)
  const owner = await createUser('owner')
  const stranger = await createUser('stranger')
  const largeResponse = { frames: Array.from({ length: 2000 }, (_, tick) => ({ tick, x: tick % 60, y: 100 })) }
  const compressedOptions = { userId: owner.id, action: 'integration-compressed-result', requestId: randomUUID(), aliasRequestIds: [randomUUID()], payload }
  assert.deepEqual(await runEconomyAction(compressedOptions, async () => largeResponse), largeResponse)
  assert.deepEqual(await runEconomyAction(compressedOptions, async () => { throw new Error('A replay must not execute again') }), largeResponse)
  assert.deepEqual(await runEconomyAction({ ...compressedOptions, requestId: randomUUID() }, async () => {
    throw new Error('A new client UUID must still recover the semantic action')
  }), largeResponse)
  const compressedReceipt = await payload.find({ collection: 'economy-action-receipts',
    where: { and: [{ user: { equals: owner.id } }, { action: { equals: compressedOptions.action } }] }, depth: 0 })
  assert.equal(compressedReceipt.docs[0].responseEncoding, 'gzip-base64')
  assert.ok(JSON.stringify(compressedReceipt.docs[0].response).length < JSON.stringify(largeResponse).length * 0.8)
  assert.equal(compressedReceipt.totalDocs, 2, 'Primary and semantic identity commit together without rerun receipts')
  await denied(() => payload.findByID({collection: 'economy-action-receipts', id: compressedReceipt.docs[0].id, user: owner, overrideAccess: false}))
  await denied(() => payload.findByID({collection: 'economy-action-receipts', id: compressedReceipt.docs[0].id, user: null, overrideAccess: false}))
  assertions += 6
  const pokemon = await payload.create({
    collection: 'pokemon', overrideAccess: true,
    data: { user: owner.id, originalTrainer: stranger.id, speciesId: 1, formId: '1', level: 5 },
  })
  pokemonIds.push(pokemon.id)
  const runData = {
    user: owner.id, expeditionId: 'integration-run', expeditionName: prefix,
    status: 'active' as const, maxLosses: 3, losses: 0, currentStepIndex: 0,
    totalSteps: 1, steps: [], startedAt: new Date().toISOString(),
  }
  const run = await payload.create({ collection: 'expedition-runs', overrideAccess: true, data: runData })
  runIds.push(run.id)
  for (const user of [null, owner, stranger]) {
    await denied(() => payload.create({ collection: 'users', overrideAccess: false, user, data: { email: `${prefix}-forged@example.test`, trainerName: `${prefix}-forged`, password } }))
    await denied(() => payload.create({ collection: 'expedition-runs', overrideAccess: false, user, data: { ...runData, status: 'ready_to_claim' } }))
    await denied(() => payload.update({ collection: 'pokemon', id: pokemon.id, overrideAccess: false, user, data: { level: 100, shiny: true } }))
    await denied(() => payload.delete({ collection: 'pokemon', id: pokemon.id, overrideAccess: false, user }))
    await denied(() => payload.update({ collection: 'expedition-runs', id: run.id, overrideAccess: false, user, data: { status: 'ready_to_claim' } }))
    await denied(() => payload.delete({ collection: 'expedition-runs', id: run.id, overrideAccess: false, user }))
  }
  assert.equal((await payload.findByID({ collection: 'pokemon', id: pokemon.id, overrideAccess: false, user: owner })).level, 5)
  await denied(() => payload.findByID({ collection: 'pokemon', id: pokemon.id, overrideAccess: false, user: stranger }))
  await payload.update({ collection: 'pokemon', id: pokemon.id, overrideAccess: false, user: admin, data: { level: 6 } })
  assertions += 2

  const invitationSecret = 'integration-test-only-invitation-signing-secret'
  const token = issueRegistrationInvitation(invitationSecret, 3600).token
  const invitation = verifyRegistrationInvitation(token, invitationSecret)!
  const accounts = [0, 1].map((index) => ({
    email: `${prefix}-invite-${index}@example.test`, trainerName: `${prefix}-invite-${index}`,
    password, kidMode: false,
  }))
  const results = await Promise.allSettled(accounts.map((data) => registerInvitedAccount(payload, data, invitation)))
  const successes = results.filter((result) => result.status === 'fulfilled')
  assert.equal(successes.length, 1, 'One invitation must create exactly one account under concurrent redemption')
  for (const result of successes) if (result.status === 'fulfilled') users.push(result.value.id)
  const created = await payload.find({ collection: 'users', where: { email: { in: accounts.map((data) => data.email) } }, pagination: false, depth: 0 })
  assert.equal(created.docs.length, 1, 'Losing signup must roll back its user record')
  const receipts = await payload.find({ collection: 'economy-action-receipts', where: { requestId: { equals: invitation.id } }, pagination: false, depth: 0 })
  assert.equal(receipts.docs.length, 1)
  assert.equal(receipts.docs[0].user, created.docs[0].id)
  await assert.rejects(() => registerInvitedAccount(payload, accounts[0], invitation))
  assertions += 5

  // A failed account insertion must leave its invitation usable.
  const retryInvite = verifyRegistrationInvitation(issueRegistrationInvitation(invitationSecret, 3600).token, invitationSecret)!
  await assert.rejects(() => registerInvitedAccount(payload, { ...accounts[0], email: owner.email }, retryInvite))
  const retried = await registerInvitedAccount(payload, { ...accounts[0], email: `${prefix}-retry@example.test`, trainerName: `${prefix}-retry` }, retryInvite)
  users.push(retried.id)
  assertions += 2

  const friendTransaction = (actorId: string, otherId: string, operation: 'send' | 'accept', requestId: string, failAfterFirstWrite = false) =>
    runEconomyAction({ payload, userId: actorId, action: `security-friend-${operation}`, requestId }, async ({ payload: transaction }) => {
      const actor = await transaction.findByID({ collection: 'users', id: actorId, depth: 0 })
      const other = await transaction.findByID({ collection: 'users', id: otherId, depth: 0 })
      const plan = planFriendship(actor, other, operation, requestId)
      if (!plan.success) return plan
      await transaction.update({ collection: 'users', id: actorId, data: plan.actor })
      if (failAfterFirstWrite) throw new Error('injected bilateral write failure')
      await transaction.update({ collection: 'users', id: otherId, data: plan.other })
      return { success: true }
    })
  await assert.rejects(() => friendTransaction(owner.id, stranger.id, 'send', randomUUID(), true), /injected bilateral write failure/)
  assert.equal(friendRequests(await payload.findByID({ collection: 'users', id: owner.id })).length, 0)
  assert.equal(friendRequests(await payload.findByID({ collection: 'users', id: stranger.id })).length, 0)
  const sends = await Promise.all([
    friendTransaction(owner.id, stranger.id, 'send', randomUUID()),
    friendTransaction(stranger.id, owner.id, 'send', randomUUID()),
  ])
  assert.equal(sends.filter((result) => result.success).length, 1, 'Concurrent bilateral sends must create one pending request')
  const ownerRequests = friendRequests(await payload.findByID({ collection: 'users', id: owner.id }))
  const strangerRequests = friendRequests(await payload.findByID({ collection: 'users', id: stranger.id }))
  assert.equal(ownerRequests.length, 1)
  assert.deepEqual(ownerRequests, strangerRequests)
  const pending = ownerRequests[0]
  assert.ok((await friendTransaction(pending.to, pending.from, 'accept', pending.id)).success)
  assert.ok((await friendTransaction(pending.to, pending.from, 'accept', pending.id)).success)
  assert.deepEqual((await payload.findByID({ collection: 'users', id: owner.id })).friends, [stranger.id])
  assert.deepEqual((await payload.findByID({ collection: 'users', id: stranger.id })).friends, [owner.id])
  assertions += 10

  if (origin) {
    const ownerToken = (await payload.login({ collection: 'users', data: { email: owner.email, password } })).token!
    const adminToken = (await payload.login({ collection: 'users', data: { email: admin.email, password } })).token!
    const request = async (path: string, method: string, body: unknown, token?: string) => {
      const response = await fetch(`${origin}${path}`, {
        method, headers: { 'content-type': 'application/json', ...(token ? { authorization: `JWT ${token}` } : {}) },
        body: JSON.stringify(body),
      })
      return { status: response.status, body: await response.json() as any }
    }
    assert.equal((await request(`/api/pokemon/${pokemon.id}`, 'PATCH', { level: 7 }, adminToken)).status, 200)
    assert.ok([401, 403].includes((await request(`/api/pokemon/${pokemon.id}`, 'PATCH', { level: 100 }, ownerToken)).status))
    assert.ok([401, 403].includes((await request(`/api/expedition-runs/${run.id}`, 'PATCH', { status: 'ready_to_claim' }, ownerToken)).status))
    assert.ok([401, 403].includes((await request('/api/users', 'POST', { email: `${prefix}-http@example.test`, trainerName: `${prefix}-http`, password })).status))
    const query = `mutation { updatePokemon(id: "${pokemon.id}", data: { level: 8 }) { id level } }`
    const administrator = await request('/api/graphql', 'POST', { query }, adminToken)
    assert.equal(administrator.body.errors, undefined, JSON.stringify(administrator.body))
    assert.equal(administrator.body.data.updatePokemon.level, 8)
    const player = await request('/api/graphql', 'POST', { query }, ownerToken)
    assert.ok(player.body.errors?.length, 'GraphQL must reject owner gameplay mutation')
    assertions += 7
    assert.ok([401, 403].includes((await request(`/api/economy-action-receipts/${compressedReceipt.docs[0].id}`, 'GET', undefined, ownerToken)).status))
    assert.equal((await request(`/api/economy-action-receipts/${compressedReceipt.docs[0].id}`, 'GET', undefined, adminToken)).status, 200)
    const receiptQuery = `query { EconomyActionReceipt(id: "${compressedReceipt.docs[0].id}") { id response } }`
    const ownerReceiptQuery = await request('/api/graphql', 'POST', {query: receiptQuery}, ownerToken)
    assert.ok(ownerReceiptQuery.body.errors?.length, 'Players must not read private settlement envelopes through GraphQL')
    const adminReceiptQuery = await request('/api/graphql', 'POST', {query: receiptQuery}, adminToken)
    assert.equal(adminReceiptQuery.body.errors, undefined)
    assert.equal(adminReceiptQuery.body.data.EconomyActionReceipt.id, compressedReceipt.docs[0].id)
    assertions += 5

    const actionId = async (filename: string, name: string) => {
      const manifest = JSON.parse(await readFile('.next-security/dev/server/server-reference-manifest.json', 'utf8'))
      const entry = Object.entries(manifest.node).find(([, value]: [string, any]) => value.filename === filename && value.exportedName === name)
      assert.ok(entry, `Missing live Server Action ${name}`)
      return entry[0]
    }
    const invoke = async (route: string, id: string, args: unknown[], token?: string) => {
      const response = await fetch(`${origin}${route}`, {
        method: 'POST',
        headers: {
          'content-type': 'text/plain;charset=UTF-8', 'next-action': id, origin,
          ...(token ? { authorization: `JWT ${token}` } : {}),
        },
        body: JSON.stringify(args),
      })
      const body = await response.text()
      assert.ok(!body.includes('Failed to find Server Action'), 'Action identifier must resolve to the tested function')
      return { status: response.status, body }
    }
    await fetch(`${origin}/game`, { headers: { authorization: `JWT ${ownerToken}` } })
    const customizationId = await actionId('src/app/(frontend)/game/actions.ts', 'updateUserCustomization')
    assert.ok((await invoke('/game', customizationId, [{ trainerGender: 'male' }])).body.includes('Not authenticated'))
    for (const trainerGender of ['male', 'female', 'neither'] as const) {
      const saved = await invoke('/game', customizationId, [{ trainerGender }], ownerToken)
      assert.ok(saved.body.includes('"success":true'), saved.body)
      assert.equal((await payload.findByID({ collection: 'users', id: owner.id })).trainerGender, trainerGender)
    }
    assert.ok((await invoke('/game', customizationId, [{ trainerGender: 'invalid' }], ownerToken)).body.includes('Invalid data'))
    assert.equal((await payload.findByID({ collection: 'users', id: owner.id })).trainerGender, 'neither')
    await invoke('/game', customizationId, [{ trainerGender: 'female', id: stranger.id }], ownerToken)
    assert.equal((await payload.findByID({ collection: 'users', id: stranger.id })).trainerGender, 'neither', 'Customization cannot target another account')
    const appearanceSync = await fetch(`${origin}/api/game/sync?scope=trainer`, { headers: { authorization: `JWT ${ownerToken}` } })
    assert.equal((await appearanceSync.json() as any).user.trainerGender, 'female', 'Saved appearance must survive a fresh account read')
    assertions += 11

    await fetch(`${origin}/auth`)
    const registerId = await actionId('src/app/(frontend)/auth/actions.ts', 'register')
    const signupToken = issueRegistrationInvitation(invitationSecret, 3600).token
    const submitRegistration = async (label: string, betaCode: string) => {
      const form = new FormData()
      form.set('_1_trainerName', `Invite-${randomUUID().slice(0, 8)}`)
      form.set('_1_email', `${prefix}-${label}@example.test`)
      form.set('_1_password', password)
      form.set('_1_confirmPassword', password)
      form.set('_1_betaCode', betaCode)
      form.set('_1_kidMode', 'false')
      // React's current multipart encoding puts outlined FormData before root.
      form.set('0', JSON.stringify([null, '$K1']))
      const response = await fetch(`${origin}/auth`, {
        method: 'POST', headers: { 'next-action': registerId, origin }, body: form, redirect: 'manual',
      })
      return { status: response.status, redirect: response.headers.get('x-action-redirect'), body: await response.text() }
    }
    const invalidSignup = await submitRegistration('bad-invite', 'invalid')
    assert.ok(invalidSignup.body.includes('Invalid or expired invitation code'), invalidSignup.body)
    const signup = await submitRegistration('http-invite', signupToken)
    assert.ok(signup.status === 200 || signup.status === 303)
    assert.ok(signup.redirect?.startsWith('/game'), 'Successful signup must redirect to the game')
    const signupUsers = await payload.find({ collection: 'users', where: { email: { equals: `${prefix}-http-invite@example.test` } }, pagination: false })
    assert.equal(signupUsers.docs.length, 1)
    users.push(signupUsers.docs[0].id)
    const replay = await submitRegistration('http-replay', signupToken)
    assert.ok(replay.body.includes('Unable to create an account with these details.'))
    const replayUsers = await payload.count({ collection: 'users', where: { email: { equals: `${prefix}-http-replay@example.test` } } })
    assert.equal(replayUsers.totalDocs, 0)
    assertions += 5

    await fetch(`${origin}/game/pokemon`, { headers: { authorization: `JWT ${ownerToken}` } })
    const identifyId = await actionId('src/app/(frontend)/game/pokemon/actions/stats.ts', 'identifyPokemon')
    const strangerToken = (await payload.login({ collection: 'users', data: { email: stranger.email, password } })).token!
    assert.equal((await invoke('/game/pokemon', identifyId, [pokemon.id, 100], strangerToken)).status, 500)
    assert.equal((await payload.findByID({ collection: 'pokemon', id: pokemon.id })).identified, false)
    assert.equal((await invoke('/game/pokemon', identifyId, [pokemon.id, 100])).status, 500)
    const identifiedResponse = await invoke('/game/pokemon', identifyId, [pokemon.id, 100], ownerToken)
    assert.equal(identifiedResponse.status, 200)
    assert.ok(!identifiedResponse.body.includes(stranger.email), 'Identification must not disclose original trainer email')
    const identified = await payload.findByID({ collection: 'pokemon', id: pokemon.id })
    assert.equal(identified.identified, true)
    assert.ok(identified.level >= 3 && identified.level <= 4, 'Caller level must not override authenticated catching level')
    const boxId = await actionId('src/app/(frontend)/game/pokemon/actions/box.ts', 'getPokemon')
    const box = await invoke('/game/pokemon', boxId, [1, 24], ownerToken)
    assert.equal(box.status, 200)
    assert.ok(box.body.includes(stranger.trainerName), 'Public original trainer attribution is preserved')
    assert.ok(!box.body.includes(stranger.email), 'Box relation projection must not disclose original trainer email')
    assertions += 10

    const { allGames } = await import('../src/data/games')
    const { createArcadeRound } = await import('../src/utilities/research/arcade-authority')
    await fetch(`${origin}/game/games/run`, { headers: { authorization: `JWT ${ownerToken}` } })
    const checkpointId = await actionId('src/app/(frontend)/game/research/games/arcade.ts', 'checkpointArcade')
    const arcadeGame = allGames.find((entry) => entry.gameType === 'run')!
    assert.ok(arcadeGame)
    const startedAt = Date.now() - 5000
    const round = createArcadeRound('run', {...arcadeGame.settings, winScore: 100000, speed: 1}, startedAt, 123)
    const state = { encounterId: arcadeGame.id, startTime: startedAt, expiry: Date.now() + 60_000, roundData: round, wins: 0, losses: 0, history: [] }
    const stateKey = `game:${owner.id}`
    redisFixtures.push(stateKey)
    await redis.set(stateKey, state, 120)
    const checkpoint = { kind: 'arcade', sessionId: round.sessionId, revision: 0, targetTick: 60, inputs: [] }
    redisFixtures.push(`arcade:checkpoint:${owner.id}:${round.sessionId}:0:60`)
    assert.ok((await invoke('/game/games/run', checkpointId, [checkpoint])).body.includes('Not authenticated'))
    assert.ok((await invoke('/game/games/run', checkpointId, [checkpoint], strangerToken)).body.includes('Arcade session expired'))
    const accepted = await invoke('/game/games/run', checkpointId, [{...checkpoint, score: 999999}], ownerToken)
    assert.equal(accepted.status, 200)
    const saved = await redis.get<any>(stateKey)
    assert.equal(saved.roundData.simulation.tick, 60)
    assert.equal(saved.roundData.simulation.score, 10)
    assert.equal(saved.roundData.revision, 1)
    await invoke('/game/games/run', checkpointId, [checkpoint], ownerToken)
    assert.equal((await redis.get<any>(stateKey)).roundData.revision, 1, 'Replayed checkpoint must not advance state twice')
    const stale = await invoke('/game/games/run', checkpointId, [{...checkpoint, targetTick: 61}], ownerToken)
    assert.ok(stale.body.includes('Invalid arcade checkpoint'))
    assert.equal((await redis.get<any>(stateKey)).roundData.simulation.tick, 60)
    assertions += 9

    // Recreate the state left by a crash after Mongo commit but before Redis
    // finalization. Retrying must replay both the item and activity-stat receipt.
    await fetch(`${origin}/game/games/fishing`, { headers: { authorization: `JWT ${ownerToken}` } })
    const fishingId = await actionId('src/app/(frontend)/game/research/games/fishing.ts', 'claimFishingItem')
    const fishingGame = allGames.find((entry) => entry.gameType === 'fishing')!
    const castTime = Date.now()
    const fishingStateKey = `fishing:${owner.id}`
    const claimKey = `fishing:item-claim:${owner.id}:${castTime}`
    const lastClaimKey = `fishing:item-claim:last:${owner.id}`
    const fishingState = { phase: 'hooked', castTime, hookedResult: {type: 'item', entry: {itemId: 'potion'}} }
    redisFixtures.push(fishingStateKey, claimKey, lastClaimKey, `${claimKey}:processing`)
    await redis.set(stateKey, {...state, encounterId: fishingGame.id}, 120)
    await redis.set(fishingStateKey, fishingState, 120)
    const { getUserInventoryMap, getUserActivityStatsMap } = await import('../src/utilities/user-state')
    const beforeInventory = await getUserInventoryMap(payload, owner.id)
    const firstClaim = await invoke('/game/games/fishing', fishingId, [], ownerToken)
    assert.ok(firstClaim.body.includes('"claimed":true'), firstClaim.body)
    await redis.del(claimKey)
    await redis.del(lastClaimKey)
    await redis.del(`${claimKey}:processing`)
    await redis.set(fishingStateKey, fishingState, 120)
    const retriedClaim = await invoke('/game/games/fishing', fishingId, [], ownerToken)
    assert.ok(retriedClaim.body.includes('"claimed":true'), retriedClaim.body)
    const afterInventory = await getUserInventoryMap(payload, owner.id)
    assert.equal(afterInventory.potion, (beforeInventory.potion || 0) + 1)
    const fishingStats = await getUserActivityStatsMap(payload, owner.id, ['gameResults'])
    assert.equal(fishingStats.games?.[fishingGame.id]?.wins, 1)
    assertions += 4

    const generatedDailyId = `${prefix}-daily`
    await payload.update({collection: 'users', id: owner.id, data: {
      lastDailyRefresh: new Date().toISOString(),
      activeDailyTasks: [{id: generatedDailyId, name: 'Isolated claim check', repeatable: false, daily: true, requirements: [], criteria: [], rewards: [{type: 'currency', targetId: 'crystals', quantity: 10}]}],
    } as any})
    await fetch(`${origin}/game/explore`, {headers: {authorization: `JWT ${ownerToken}`}})
    const taskClaimId = await actionId('src/utilities/tasks/actions.ts', 'completeTask')
    const beforeDaily = (await payload.findByID({collection: 'users', id: owner.id})).currency?.crystals || 0
    const dailyRace = await Promise.all([
      invoke('/game/explore', taskClaimId, [generatedDailyId, [], randomUUID()], ownerToken),
      invoke('/game/explore', taskClaimId, [generatedDailyId, [], randomUUID()], ownerToken),
    ])
    assert.ok(dailyRace.some((result) => result.body.includes('"success":true')), 'One legitimate daily contender must succeed')
    assert.equal((await payload.findByID({collection: 'users', id: owner.id})).currency?.crystals, beforeDaily + 10)
    assert.ok((await invoke('/game/explore', taskClaimId, [generatedDailyId, [], randomUUID()], ownerToken)).body.includes('"success":false'))
    assert.equal((await payload.findByID({collection: 'users', id: owner.id})).currency?.crystals, beforeDaily + 10)
    assertions += 4

    const milestoneGame = allGames.find((entry) => entry.id === 'joeys-rattata-run')!
    const milestoneStart = Date.now() - 200_000
    const milestoneRound = createArcadeRound('run', milestoneGame.settings, milestoneStart, 321)
    milestoneRound.simulation.tick = 7200
    milestoneRound.simulation.score = 1200
    const milestoneState = {...state, encounterId: milestoneGame.id, startTime: milestoneStart, expiry: Date.now() + 300_000, roundData: milestoneRound, claimedMilestones: []}
    await redis.set(stateKey, milestoneState, 300)
    const milestoneKey = `game:endless:claim-result:${owner.id}:${milestoneGame.id}:${milestoneStart}:1200`
    redisFixtures.push(milestoneKey, `game:complete-result:${owner.id}:${milestoneGame.id}:${milestoneStart}`, `game:complete-last-start:${owner.id}:${milestoneGame.id}`)
    const claimMilestoneId = await actionId('src/app/(frontend)/game/games/actions.ts', 'claimEndlessMilestone')
    const completeGameId = await actionId('src/app/(frontend)/game/games/actions.ts', 'completeGame')
    const milestoneInventory = await getUserInventoryMap(payload, owner.id)
    await Promise.all([
      invoke('/game/games/run', claimMilestoneId, [milestoneGame.id, 1200], ownerToken),
      invoke('/game/games/run', completeGameId, [milestoneGame.id, false, 1200], ownerToken),
    ])
    // Either contender may acquire the lock. Finishing after the race must
    // consume the milestone's durable receipt, even if its Redis marker is lost.
    const afterRace = await redis.get<any>(stateKey)
    if (afterRace) await redis.set(stateKey, {...afterRace, claimedMilestones: []}, 300)
    const finishedMilestone = await invoke('/game/games/run', completeGameId, [milestoneGame.id, false, 1200], ownerToken)
    assert.ok(finishedMilestone.body.includes('"success":true'), finishedMilestone.body)
    assert.equal((await getUserInventoryMap(payload, owner.id))['tm-quick-attack'], (milestoneInventory['tm-quick-attack'] || 0) + 1)
    await invoke('/game/games/run', claimMilestoneId, [milestoneGame.id, 1200], ownerToken)
    await invoke('/game/games/run', completeGameId, [milestoneGame.id, false, 1200], ownerToken)
    assert.equal((await getUserInventoryMap(payload, owner.id))['tm-quick-attack'], (milestoneInventory['tm-quick-attack'] || 0) + 1)
    assert.equal((await getUserActivityStatsMap(payload, owner.id, ['gameResults'])).games?.[milestoneGame.id]?.wins, 1)
    assertions += 4

    const wheelGame = allGames.find((entry) => entry.gameType === 'prize-wheel')!
    const ufoGame = allGames.find((entry) => entry.gameType === 'ufo-catcher')!
    await payload.update({collection: 'users', id: owner.id, data: {currency: {'league-ticket': 100, 'fun-tokens': 1000}}, overrideAccess: true})
    await fetch(`${origin}/game/games/prize-wheel`, {headers: {authorization: `JWT ${ownerToken}`}})
    const wheelStartId = await actionId('src/app/(frontend)/game/research/games/wheel.ts', 'initiatePrizeWheelSpin')
    const wheelClaimId = await actionId('src/app/(frontend)/game/research/games/wheel.ts', 'claimPrizeWheelReward')
    const spinRequest = randomUUID()
    const wheelKey = `prizewheel:${owner.id}`
    const wheelClaimKey = `prizewheel:claim-result:${owner.id}:${spinRequest}`
    redisFixtures.push(wheelKey, wheelClaimKey)
    await redis.set(stateKey, {...state, encounterId: wheelGame.id, roundData: {prizeWheelSlots: [{percentage: 100, rewards: [{type: 'item', targetId: 'potion', quantity: 1}]}]}}, 120)
    const wheelStart = await invoke('/game/games/prize-wheel', wheelStartId, [spinRequest], ownerToken)
    assert.ok(wheelStart.body.includes('"success":true'), wheelStart.body)
    const paidSpin = await redis.get<any>(wheelKey)
    await redis.del(wheelKey)
    const wheelRestore = await invoke('/game/games/prize-wheel', wheelStartId, [spinRequest], ownerToken)
    assert.ok(wheelRestore.body.includes('"success":true'), wheelRestore.body)
    assert.deepEqual(await redis.get(wheelKey), paidSpin)
    assert.equal((await payload.findByID({collection: 'users', id: owner.id})).currency?.['league-ticket'], 98)
    const wheelInventory = await getUserInventoryMap(payload, owner.id)
    assert.ok((await invoke('/game/games/prize-wheel', wheelClaimId, [wheelGame.id], ownerToken)).body.includes('"success":true'))
    await redis.del(wheelClaimKey)
    await redis.set(wheelKey, paidSpin, 120)
    assert.ok((await invoke('/game/games/prize-wheel', wheelClaimId, [wheelGame.id], ownerToken)).body.includes('"success":true'))
    assert.equal((await getUserInventoryMap(payload, owner.id)).potion, (wheelInventory.potion || 0) + 1)
    assert.equal((await getUserActivityStatsMap(payload, owner.id, ['gameResults'])).games?.[wheelGame.id]?.wins, 1)
    assert.ok((await invoke('/game/games/prize-wheel', wheelStartId, [spinRequest], ownerToken)).body.includes('already been claimed'))
    assertions += 9

    await fetch(`${origin}/game/games/ufo-catcher`, {headers: {authorization: `JWT ${ownerToken}`}})
    const ufoStartId = await actionId('src/app/(frontend)/game/research/games/ufo-catcher.ts', 'startUfoCatcherAttempt')
    const ufoSettleId = await actionId('src/app/(frontend)/game/research/games/ufo-catcher.ts', 'settleUfoCatcherAttempt')
    const ufoRequest = randomUUID()
    const ufoKey = `ufo-catcher:${owner.id}`
    const ufoResultKey = `ufo-catcher:result:${owner.id}:${ufoRequest}`
    redisFixtures.push(ufoKey, ufoResultKey)
    await redis.set(stateKey, {...state, encounterId: ufoGame.id, roundData: {}}, 120)
    assert.ok((await invoke('/game/games/ufo-catcher', ufoStartId, [ufoGame.id, ufoRequest], ownerToken)).body.includes('"success":true'))
    const paidClaw = await redis.get<any>(ufoKey)
    await redis.del(ufoKey)
    assert.ok((await invoke('/game/games/ufo-catcher', ufoStartId, [ufoGame.id, ufoRequest], ownerToken)).body.includes('"success":true'))
    assert.deepEqual(await redis.get(ufoKey), paidClaw)
    assert.equal((await payload.findByID({collection: 'users', id: owner.id})).currency?.['fun-tokens'], 970)
    const ufoInput = {encounterId: ufoGame.id, attemptId: ufoRequest, input: {xHoldMs: 0, yHoldMs: 0}}
    const clawResult = await invoke('/game/games/ufo-catcher', ufoSettleId, [ufoInput], ownerToken)
    assert.ok(clawResult.body.includes('"success":true'), clawResult.body)
    await redis.del(ufoResultKey)
    await redis.set(ufoKey, paidClaw, 120)
    assert.ok((await invoke('/game/games/ufo-catcher', ufoSettleId, [ufoInput], ownerToken)).body.includes('"success":true'))
    const clawStats = (await getUserActivityStatsMap(payload, owner.id, ['gameResults'])).games?.[ufoGame.id]
    assert.equal((clawStats?.wins || 0) + (clawStats?.losses || 0), 1)
    assertions += 7

    await fetch(`${origin}/game/locations/encounter`, { headers: { authorization: `JWT ${ownerToken}` } })
    const captureId = await actionId('src/app/(frontend)/game/locations/encounter/actions/capture.ts', 'attemptCapture')
    const { setUserInventoryMap } = await import('../src/utilities/user-state')
    const captureStateKey = `encounter:${owner.id}`
    const captureStart = Date.now()
    const captureLocation = `${prefix}-capture`
    const captureState = { locationId: captureLocation, pokemonId: 1, formId: '1', startTime: captureStart, expiry: captureStart + 60000,
      currentCatchRate: 255, questionsAnswered: [], itemsUsed: [], captureAttempts: 0 }
    const captureResultKey = `encounter:capture:result:${owner.id}:${captureLocation}:${captureStart}:0:master-ball`
    const captureLastKey = `encounter:capture:last:${owner.id}`
    redisFixtures.push(captureStateKey, captureResultKey, captureLastKey)
    const beforeCatchInventory = await getUserInventoryMap(payload, owner.id)
    await setUserInventoryMap(payload, owner.id, { ...beforeCatchInventory, 'master-ball': 2 })
    await redis.set(captureStateKey, captureState, 120)
    const beforeCaught = await payload.find({ collection: 'pokemon', where: { user: { equals: owner.id } }, limit: 0 })
    const forgedCapture = await invoke('/game/locations/encounter', captureId, ['master-ball', { timing: { challengeId: 'forged', elapsedMs: 2000 } }, randomUUID()], ownerToken)
    assert.ok(forgedCapture.body.includes('CAPTURE_TIMING_INVALID'), forgedCapture.body)
    assert.equal((await getUserInventoryMap(payload, owner.id))['master-ball'], 2)
    const catchRequest = randomUUID()
    const caughtResponse = await invoke('/game/locations/encounter', captureId, ['master-ball', undefined, catchRequest], ownerToken)
    assert.ok(caughtResponse.body.includes('"caught":true'), caughtResponse.body)
    const caughtPokemon = await payload.find({ collection: 'pokemon', where: { user: { equals: owner.id } }, limit: 0 })
    for (const doc of caughtPokemon.docs) if (!beforeCaught.docs.some((old) => old.id === doc.id)) pokemonIds.push(doc.id)
    assert.equal(caughtPokemon.totalDocs, beforeCaught.totalDocs + 1)
    await redis.del(captureResultKey)
    await redis.del(captureLastKey)
    await redis.set(captureStateKey, captureState, 120)
    const alternateReplay = await invoke('/game/locations/encounter', captureId, ['master-ball', undefined, randomUUID()], ownerToken)
    assert.ok(alternateReplay.body.includes('"caught":true'), alternateReplay.body)
    assert.equal((await payload.count({ collection: 'pokemon', where: { user: { equals: owner.id } } })).totalDocs, caughtPokemon.totalDocs)
    assert.equal((await getUserInventoryMap(payload, owner.id))['master-ball'], 1)
    assert.equal((await getUserActivityStatsMap(payload, owner.id, ['locationEncounterResults'])).locations?.[captureLocation]?.wins, 1)
    assert.equal(await redis.get(captureStateKey), null)
    assertions += 9

    const itemActionId = await actionId('src/app/(frontend)/game/locations/encounter/actions/mechanics.ts', 'useEncounterItem')
    const itemLocation = `${prefix}-item`
    const itemState = { ...captureState, locationId: itemLocation, startTime: Date.now(), expiry: Date.now() + 60000 }
    const itemResultKey = `encounter:item:result:${owner.id}:${itemLocation}:${itemState.startTime}:escape-rope:0`
    const itemLastKey = `encounter:item:last:${owner.id}`
    redisFixtures.push(itemResultKey, itemLastKey)
    const itemInventory = await getUserInventoryMap(payload, owner.id)
    await setUserInventoryMap(payload, owner.id, { ...itemInventory, 'escape-rope': 2 })
    await redis.set(captureStateKey, itemState, 120)
    const itemResponse = await invoke('/game/locations/encounter', itemActionId, ['escape-rope', randomUUID()], ownerToken)
    assert.ok(itemResponse.body.includes('"fled":true'), itemResponse.body)
    assert.equal((await getUserInventoryMap(payload, owner.id))['escape-rope'], 1)
    assert.equal(await redis.get(captureStateKey), null)
    await redis.del(itemResultKey)
    await redis.del(itemLastKey)
    await redis.set(captureStateKey, itemState, 120)
    const itemReplay = await invoke('/game/locations/encounter', itemActionId, ['escape-rope', randomUUID()], ownerToken)
    assert.ok(itemReplay.body.includes('"fled":true'), itemReplay.body)
    assert.equal((await getUserInventoryMap(payload, owner.id))['escape-rope'], 1)
    assert.equal((await getUserActivityStatsMap(payload, owner.id, ['locationEncounterResults'])).locations?.[itemLocation]?.losses, 1)
    assert.equal(await redis.get(captureStateKey), null)
    assertions += 7

    await fetch(`${origin}/dev/battles`)
    const {makePvpBattleState} = await import('../tests/helpers/battle-fixtures')
    const pvpId = `${prefix}-pvp`
    const pvpState = makePvpBattleState({pvpBattleId: pvpId, battleId: pvpId, economyActionId: randomUUID()})
    pvpState.playerTeam[0].user = owner.id
    pvpState.enemyTeam[0].user = stranger.id
    const pvpKey = `pvp:battle:${pvpId}`
    const pvpStatusKey = `pvp:status:${owner.id}`
    redisFixtures.push(pvpKey, pvpStatusKey)
    await redis.set(pvpKey, pvpState, 120)
    await redis.set(pvpStatusKey, {status: 'battle', battleId: pvpId}, 120)
    await fetch(`${origin}/game/battles/encounter`, {headers: {authorization: `JWT ${ownerToken}`}})
    const surrenderId = await actionId('src/app/(frontend)/game/battles/actions.ts', 'surrenderBattle')
    const clearBattleId = await actionId('src/app/(frontend)/game/battles/actions.ts', 'clearBattleState')
    assert.ok((await invoke('/game/battles/encounter', clearBattleId, [], ownerToken)).body.includes('"success":false'))
    assert.equal((await redis.get<any>(pvpKey)).status, 'ongoing')
    assertions += 2
    const surrendered = await invoke('/game/battles/encounter', surrenderId, [], ownerToken)
    assert.ok(surrendered.body.includes('"success":true'), surrendered.body)
    const terminalPvp = await redis.get<any>(pvpKey)
    assert.equal(terminalPvp.status, 'lost')
    assert.equal((await getUserActivityStatsMap(payload, owner.id, ['battleResults'])).battles?.[pvpId]?.losses, 1)
    assert.equal((await getUserActivityStatsMap(payload, stranger.id, ['battleResults'])).battles?.[pvpId]?.wins, 1)
    // Crash after Mongo commit, then a rerolled decisive turn claims the opposite
    // winner: the shared outcome identity restores the original surrender.
    const {settlePvpOutcome} = await import('../src/app/(frontend)/game/battles/pvp/outcome')
    const contraryOutcome = await settlePvpOutcome({...pvpState, status: 'won'})
    assert.deepEqual(contraryOutcome, terminalPvp)
    await redis.set(pvpKey, pvpState, 120)
    assert.ok((await invoke('/game/battles/encounter', surrenderId, [], ownerToken)).body.includes('"success":true'))
    assert.deepEqual(await redis.get(pvpKey), terminalPvp)
    assert.equal((await getUserActivityStatsMap(payload, owner.id, ['battleResults'])).battles?.[pvpId]?.losses, 1)
    assert.equal((await getUserActivityStatsMap(payload, stranger.id, ['battleResults'])).battles?.[pvpId]?.wins, 1)
    assertions += 9
    const devId = await actionId('src/app/dev/actions.ts', 'getItemList')
    assert.equal((await invoke('/dev/battles', devId, [], ownerToken)).status, 500)
    assert.equal((await invoke('/dev/battles', devId, [])).status, 500)
    assert.equal((await invoke('/dev/battles', devId, [], adminToken)).status, 200)
    const manifest = JSON.parse(await readFile('.next-security/dev/server/server-reference-manifest.json', 'utf8'))
    const forbidden = new Set(['getActiveBattleState', 'handleWin', 'finalizeTurn', 'recordDailyActivityProgress', 'incrementDailyTaskProgress', 'recordExpeditionActivityResult', 'setSafariBallsRemaining', 'endSafariExpeditionWithoutBalls', 'getActiveExpeditionForUser', 'getGameActivityStateForUser', 'setGameActivityStateForUser', 'clearGameActivityStateForUser', 'applyEncounterPromptResult', 'drawRandomTcgCard', 'drawTcgBoosterPacks'])
    for (const value of Object.values(manifest.node) as any[]) assert.ok(!forbidden.has(value.exportedName), `Unsafe emitted action: ${value.exportedName}`)
    assertions += 4
  }
  if (origin && process.env.POKEORI_PROFILE_GAME_SYNC === '1') {
    const { profileIsolatedGameSync } = await import('./profile-isolated-game-sync')
    const token = (await payload.login({ collection: 'users', data: { email: owner.email, password } })).token!
    await profileIsolatedGameSync(payload, owner.id, token, origin)
  }
  console.log(`Security integration passed: ${assertions} assertions; real Payload authorization, concurrent invitation transactions${origin ? ', REST, GraphQL and direct Server Actions' : '; HTTP not requested'}.`)
} finally {
  // Delete only this run's fixtures, never drop a database or flush Redis.
  for (const key of redisFixtures) await redis.del(key)
  const remainingUsers = await payload.find({ collection: 'users', where: { email: { contains: prefix } }, pagination: false, depth: 0 })
  for (const user of remainingUsers.docs) if (!users.includes(user.id)) users.push(user.id)
  for (const id of pokemonIds) await payload.delete({ collection: 'pokemon', id, overrideAccess: true }).catch(() => {})
  for (const id of runIds) await payload.delete({ collection: 'expedition-runs', id, overrideAccess: true }).catch(() => {})
  if (users.length) {
    for (const collection of ['user-inventory-items', 'user-activity-stats'] as const) {
      await payload.delete({ collection, where: { user: { in: users } }, overrideAccess: true })
    }
    await payload.delete({ collection: 'economy-action-receipts', where: { user: { in: users } }, overrideAccess: true })
    for (const id of users) await payload.delete({ collection: 'users', id, overrideAccess: true }).catch(() => {})
  }
  await payload.destroy()
  redis.disconnect()
}
