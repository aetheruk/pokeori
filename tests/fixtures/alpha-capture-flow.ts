import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'

mock.module('server-only', () => ({}))
mock.module('@payload-config', () => ({ default: {} }))
const user = { id: 'owner', skills: {}, maxPokemon: 50 }
const store = new Map<string, any>()
const receipts = new Map<string, any>()
const idempotentResults = new Map<string, any>()
let ownedPokemon: any
let creates = 0
let abilityRolls = 0
const grantedRewards: any[][] = []
let inventory: Record<string, number> = { 'master-ball': 2 }
const payload = {
  auth: async () => ({ user }),
  find: async () => ({ docs: [], totalDocs: 0 }),
  findByID: async () => user,
  create: async ({ collection, data }: any) => {
    assert.equal(collection, 'pokemon')
    creates++
    ownedPokemon = structuredClone(data)
    return { id: 'caught-alpha', ...data }
  },
}
const redis = {
  get: async (key: string) => structuredClone(store.get(key) ?? null),
  set: async (key: string, value: any) => {
    store.set(key, structuredClone(value))
    return 'OK'
  },
  del: async (key: string) => {
    store.delete(key)
    return 1
  },
  expire: async () => 1,
  setManyIfValue: async (key: string, expected: any, writes: any[]) => {
    if (JSON.stringify(store.get(key)) !== JSON.stringify(expected))
      return false
    for (const write of writes)
      store.set(write.key, structuredClone(write.value))
    return true
  },
}
mock.module('payload', () => ({ getPayload: async () => payload }))
mock.module('@/utilities/redis', () => ({ redis }))
mock.module('@/utilities/game-integrity', () => ({
  acquireActionLock: async () => ({ acquired: true }),
  releaseActionLock: async () => {},
  checkActionRateLimit: async () => ({ allowed: true }),
  getIdempotentResult: async (key: string) =>
    structuredClone(idempotentResults.get(key) ?? null),
  setIdempotentResult: async (key: string, value: any) => {
    idempotentResults.set(key, structuredClone(value))
  },
  reserveIdempotentResult: async () => true,
}))
mock.module('@/app/(frontend)/game/battles/helpers/user', () => ({
  getUser: async () => user,
}))
mock.module('@/app/(frontend)/game/battles/helpers/action-guard', () => ({
  runBattleActionWithGuard: async (
    _user: string,
    _actionId: unknown,
    action: any,
  ) => action(),
}))
mock.module('@/app/(frontend)/game/locations/encounter/actions/utils', () => ({
  getUser: async () => user,
  rollAbility: () => {
    abilityRolls++
    return 'run_away'
  },
}))
mock.module('@/utilities/economy/transactions', () => ({
  createEconomyRequestId: (value: string) => value,
  getEconomyActionResult: async ({ requestId }: any) =>
    receipts.get(requestId) ?? null,
  runEconomyAction: async ({ requestId }: any, operation: any) => {
    if (receipts.has(requestId)) return structuredClone(receipts.get(requestId))
    const result = await operation({ payload, req: {} })
    receipts.set(requestId, structuredClone(result))
    return result
  },
}))
const actualUserState = await import('@/utilities/user-state')
mock.module('@/utilities/user-state', () => ({
  ...actualUserState,
  getUserInventoryMap: async () => ({ ...inventory }),
  setUserInventoryMap: async (_payload: any, _userId: string, value: any) => {
    inventory = value
  },
  // Research level 4 would normally reroll IVs. It must not change an Alpha.
  getUserPokedexMap: async () => ({ '19': { '19': { researchLevel: 4 } } }),
  setUserPokedexMap: async () => {},
  incrementUserActivityResult: async () => {},
  getUserCompletedTasksMap: async () => ({}),
  getUserActivityStatsMap: async () => ({}),
}))
mock.module('@/utilities/expeditions/server', () => ({
  recordExpeditionActivityResult: async () => ({}),
  setSafariBallsRemaining: async () => {},
  getActiveExpeditionForUser: async () => null,
  getExpeditionActivityStepStatusForUser: async () => 'not-in-expedition',
}))
mock.module('@/utilities/tasks/daily-progress', () => ({
  recordDailyActivityProgress: async () => {},
  incrementDailyTaskProgress: async () => {},
}))
mock.module('@/utilities/rewards/reward-logic', () => ({
  grantRewards: async (_userId: string, rewards: any[]) => {
    grantedRewards.push(structuredClone(rewards))
    return { summary: {} }
  },
}))
mock.module('@/utilities/day-care/eggs', () => ({
  getActiveEggCount: async () => 0,
}))
const actualAbilityDex = await import('@/utilities/pokemon/abilitydex')
mock.module('@/utilities/pokemon/abilitydex', () => ({
  ...actualAbilityDex,
  registerAbilityDexEntry: async () => ({ isNew: false }),
}))

const { generateAlphaStats } = await import('@/utilities/pokemon/alpha')
const { makeBattlePokemon, makePveBattleState } = await import(
  '../helpers/battle-fixtures'
)
const config: any = {
  id: 'alpha-route',
  name: 'Route',
  category: 'Kanto',
  subCategory: 'Route 1',
  background: '/backgrounds/grassy-route.avif',
  maxPokemon: 1,
  requirements: [],
  isWildBattle: true,
  rewards: [],
  enemyTeam: [],
}
mock.module('@/app/(frontend)/game/battles/helpers/state-management', () => ({
  BATTLE_TTL: 3600,
  getBattleConfigForState: () => config,
}))
const alpha = {
  ...generateAlphaStats(3, 35, () => 0.5),
  speciesId: 19,
  formId: '19',
  name: 'Rattata',
  level: 11,
  gender: 'female',
  rarity: 'shiny',
  shiny: true,
  isAlpha: true,
  ability: 'run_away',
  background: config.background,
}
store.set(
  'battle:owner',
  makePveBattleState({
    status: 'won',
    isWildBattle: true,
    economyActionId: 'alpha-session',
    alphaCapturePokemon: alpha as any,
    enemyTeam: [makeBattlePokemon({ ...alpha, currentHp: 0 } as any)],
  }),
)
const { attemptAlphaCapture } = await import(
  '@/app/(frontend)/game/battles/actions/alpha-capture'
)
const { attemptCapture } = await import(
  '@/app/(frontend)/game/locations/encounter/actions/capture'
)

assert.equal((await attemptAlphaCapture()).success, true)
const encounter = store.get('encounter:owner')
assert.equal(encounter.currentCatchRate, 0)
assert.equal(encounter.expiry - encounter.startTime, 50_000)
assert.equal((await attemptAlphaCapture()).success, true)
assert.equal(store.get('encounter:owner').startTime, encounter.startTime)
const result = await attemptCapture('master-ball', undefined, 'alpha-catch')
assert.equal(result.caught, true)
assert.equal(creates, 1)
assert.equal(abilityRolls, 0)
const { calculatePokemonContentSkillXp } = await import('@/data/skills/xp')
const { getPokemonForm } = await import('@/utilities/pokemon/pokedex')
function assertExplorerXp(level: number, multiplier: number) {
  const reward = grantedRewards
    .at(-1)!
    .find((reward) => reward.type === 'xp' && reward.skill === 'catching')
  assert.equal(
    reward.quantity,
    calculatePokemonContentSkillXp(
      'catching',
      level,
      getPokemonForm('19')?.base_experience,
    ) * multiplier,
  )
}
assertExplorerXp(alpha.level, 5)
for (const field of [
  'level',
  'gender',
  'rarity',
  'shiny',
  'isAlpha',
  'ability',
  'ivs',
  'evs',
  'nature',
  'height',
  'weight',
  'size',
  'background',
]) {
  assert.deepEqual(
    ownedPokemon[field],
    (alpha as any)[field],
    `Capture must preserve ${field}`,
  )
}
assert.equal(inventory['master-ball'], 1)
assert.equal(
  (await attemptCapture('master-ball', undefined, 'alpha-catch')).caught,
  true,
)
assert.equal(creates, 1)
assert.equal(grantedRewards.length, 1)
assert.equal(inventory['master-ball'], 1)
assert.equal((await attemptAlphaCapture()).success, false)

// Ordinary location captures roll and freeze an Alpha before the quiz begins.
mock.module('next/headers', () => ({ headers: async () => new Headers() }))
mock.module('@/utilities/chronicles', () => ({
  getActiveChronicleContext: async () => null,
}))
const location: any = {
  ...config,
  id: 'direct-alpha-route',
  timer: 60,
  catchRateModifier: 255,
  levelRange: { min: 4, max: 8 },
  encounters: [{ speciesId: 19, formId: '19', chance: 100, rarity: 'shiny' }],
}
mock.module('@/utilities/events/server', () => ({
  getEffectiveContent: async () => location,
}))
const actualWeather = await import('@/utilities/weather')
mock.module('@/utilities/weather', () => ({
  ...actualWeather,
  ensureUserWeatherSlot: async () => ({
    slot: 0,
    updatedAt: 1000,
    expiresAt: Date.now() + 60_000,
  }),
  resolveSubRegionWeather: () => ({ weather: 'clear' }),
}))
const { startEncounter } = await import(
  '@/app/(frontend)/game/locations/encounter/actions/init'
)
const originalRandom = Math.random
try {
  Math.random = () => 0.005
  const started = await startEncounter(location.id)
  assert.equal(started.isAlpha, true)
  const directEncounter = store.get('encounter:owner')
  assert.equal(directEncounter.expiry - directEncounter.startTime, 50_000)
  assert.equal(directEncounter.baseCatchRate, 0)
  assert.equal(directEncounter.currentCatchRate, 0)
  assert.equal(directEncounter.alphaPokemon.level, 9)
  assert.equal(directEncounter.alphaPokemon.rarity, 'shiny')
  assert.equal(directEncounter.alphaPokemon.evs.hp, 252)
  assert.equal(
    Object.values(directEncounter.alphaPokemon.ivs).filter((iv) => iv === 31)
      .length,
    3,
  )
  assert.equal(directEncounter.alphaPokemon.background, location.background)
  assert.equal(abilityRolls, 1)
  await startEncounter(location.id)
  assert.deepEqual(store.get('encounter:owner'), directEncounter)
  assert.equal(abilityRolls, 1)
  assert.equal(
    (await attemptCapture('master-ball', undefined, 'direct-alpha-catch'))
      .caught,
    true,
  )
  assert.equal(creates, 2)
  assert.equal(abilityRolls, 1)
  assertExplorerXp(9, 5)
  for (const field of [
    'level',
    'ivs',
    'evs',
    'nature',
    'size',
    'height',
    'weight',
    'background',
    'ability',
    'rarity',
    'isAlpha',
  ]) {
    assert.deepEqual(
      ownedPokemon[field],
      directEncounter.alphaPokemon[field],
      `Direct capture must preserve ${field}`,
    )
  }
  assert.equal(ownedPokemon.obtainedSourceId, location.id)

  // Event encounters remain normal even when the random roll would be Alpha.
  location.isRandomEvent = true
  const eventStarted = await startEncounter(location.id)
  assert.equal(eventStarted.isAlpha, false)
  assert.equal(eventStarted.duration, 60)
  assert.equal(store.get('encounter:owner').baseCatchRate, 255)
  assert.equal(abilityRolls, 1)
  inventory = { 'master-ball': 1 }
  assert.equal(
    (await attemptCapture('master-ball', undefined, 'ordinary-catch')).caught,
    true,
  )
  assert.equal(creates, 3)
  assert.equal(ownedPokemon.isAlpha, false)
  assert.equal(abilityRolls, 2)
  assertExplorerXp(4, 1)
} finally {
  Math.random = originalRandom
}

// All ordinary rods use the same Alpha capture rules and settlement.
const fishingEntry = {
  speciesId: 19,
  formId: '19',
  rarity: 'shiny',
  weight: 100,
  symbol: '!',
  reactionTime: 1000,
  appearTime: { min: 0, max: 0 },
}
const rod = {
  timer: 60,
  catchRateModifier: 255,
  levelRange: { min: 4, max: 8 },
  encounters: { entries: [fishingEntry] },
}
const fishingConfig: any = {
  ...config,
  id: 'alpha-fishing-route',
  gameType: 'fishing',
  settings: { rods: { old: rod, good: rod, super: rod } },
}
mock.module('@/data/games', () => ({ allGames: [fishingConfig] }))
const actualFishingData = await import('@/data/games/fishing')
mock.module('@/data/games/fishing', () => ({
  ...actualFishingData,
  fishingGames: [fishingConfig],
}))
mock.module('@/app/(frontend)/game/_shared/activity-actions', () => ({
  getUser: async () => user,
}))
mock.module('@/utilities/game-data', () => ({
  getGameUserData: async () => ({}),
}))
const { castFishingLine, startFishingCatch } = await import(
  '@/app/(frontend)/game/research/games/fishing'
)
store.set('game:owner', { encounterId: fishingConfig.id })
let castTime = Date.now()
try {
  for (const rodType of ['old', 'good', 'super'] as const) {
    inventory[`${rodType}-rod`] = 1
    inventory['master-ball'] = 1
    // Avoid the separate secret replacement rolls while casting.
    Math.random = () => 0.5
    assert.equal((await castFishingLine(rodType)).success, true)
    const hooked = store.get('fishing:owner')
    assert.equal(hooked.hookedResult.isSecret, false)
    hooked.phase = 'hooked'
    hooked.castTime = ++castTime
    store.set('fishing:owner', hooked)
    Math.random = () => 0.005
    const start = await startFishingCatch()
    assert.equal(start.success, true)
    assert.equal(start.isAlpha, true)
    assert.equal(start.duration, 50)
    assert.equal(start.level, 9)
    const fishingCapture = store.get('encounter:owner')
    assert.equal(fishingCapture.baseCatchRate, 0)
    assert.equal(fishingCapture.currentCatchRate, 0)
    assert.equal(fishingCapture.alphaPokemon.evs.hp, 252)
    assert.equal(fishingCapture.alphaPokemon.rarity, 'shiny')
    const rollsBeforeRetry: number = abilityRolls
    Math.random = () => {
      throw new Error('Retry must not reroll a fishing Alpha')
    }
    assert.deepEqual(await startFishingCatch(), start)
    assert.deepEqual(store.get('encounter:owner'), fishingCapture)
    assert.equal(abilityRolls, rollsBeforeRetry)
    Math.random = () => 0.5
    const requestId = `fishing-alpha-${rodType}`
    const createsBeforeCatch: number = creates
    const grantsBeforeCatch: number = grantedRewards.length
    assert.equal(
      (await attemptCapture('master-ball', undefined, requestId)).caught,
      true,
    )
    for (const field of [
      'level',
      'ivs',
      'evs',
      'nature',
      'size',
      'height',
      'weight',
      'background',
      'ability',
      'rarity',
      'gender',
      'isAlpha',
    ]) {
      assert.deepEqual(
        ownedPokemon[field],
        fishingCapture.alphaPokemon[field],
        `Fishing capture must preserve ${field}`,
      )
    }
    assert.equal(ownedPokemon.obtainedRegion, 'Kanto')
    assert.equal(ownedPokemon.obtainedSourceId, fishingConfig.id)
    assertExplorerXp(9, 5)
    assert.equal(
      (await attemptCapture('master-ball', undefined, requestId)).caught,
      true,
    )
    assert.equal(creates, createsBeforeCatch + 1)
    assert.equal(grantedRewards.length, grantsBeforeCatch + 1)
    assert.equal(inventory['master-ball'], 0)
  }

  // Secret replacements are explicitly marked by the cast and cannot roll Alpha.
  Math.random = () => 0.005
  assert.equal((await castFishingLine('old')).success, true)
  const secretCast = store.get('fishing:owner')
  assert.equal(secretCast.hookedResult.entry.speciesId, 349)
  assert.equal(secretCast.hookedResult.isSecret, true)
  secretCast.phase = 'hooked'
  secretCast.castTime = ++castTime
  store.set('fishing:owner', secretCast)
  assert.equal((await startFishingCatch()).isAlpha, false)
  store.delete('encounter:owner')

  for (const override of [
    { isRandomEvent: true },
    { category: 'Special' },
    { category: 'Secret' },
    { expeditionOnly: true },
    { allowAlpha: false },
    { settings: { ...fishingConfig.settings, safariCapture: { balls: 10 } } },
  ]) {
    const originalConfig = structuredClone(fishingConfig)
    Object.assign(fishingConfig, override)
    store.set('fishing:owner', {
      encounterId: fishingConfig.id,
      selectedRod: 'old',
      phase: 'hooked',
      castTime: ++castTime,
      hookedResult: { type: 'pokemon', entry: fishingEntry, rarity: 'shiny' },
    })
    assert.equal((await startFishingCatch()).isAlpha, false)
    assert.equal(store.get('encounter:owner').alphaPokemon, undefined)
    store.delete('encounter:owner')
    for (const key of Object.keys(fishingConfig)) delete fishingConfig[key]
    Object.assign(fishingConfig, originalConfig)
  }
  // The exclusive 1-in-30 boundary preserves ordinary rod settings.
  Math.random = () => 1 / 30
  store.set('fishing:owner', {
    encounterId: fishingConfig.id,
    selectedRod: 'old',
    phase: 'hooked',
    castTime: ++castTime,
    hookedResult: { type: 'pokemon', entry: fishingEntry, rarity: 'shiny' },
  })
  const ordinaryFish = await startFishingCatch()
  assert.equal(ordinaryFish.isAlpha, false)
  assert.equal(ordinaryFish.duration, 60)
  assert.equal(ordinaryFish.level, 4)
  assert.equal(store.get('encounter:owner').baseCatchRate, 255)
} finally {
  Math.random = originalRandom
}
