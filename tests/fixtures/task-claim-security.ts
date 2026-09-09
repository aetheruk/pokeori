import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'

const daily: any = {
  id: 'daily-1', repeatable: false, daily: true, requirements: [], criteria: [],
  rewards: [{ type: 'currency', targetId: 'crystals', quantity: 10 }],
}
const passwordTask = { ...daily, id: 'pewter-school-glitch-teacher', daily: false }
const user: any = {
  id: 'audit-user', currency: {}, activeDailyTasks: [daily],
  lastDailyRefresh: new Date().toISOString(),
}
const proofs = new Map<string, unknown>()
const completedTasks: Record<string, any> = {}
let grants = 0
const payload: any = {
  findByID: async ({ collection }: any) => collection === 'users' ? structuredClone(user) : null,
  find: async () => ({ docs: [] }),
  update: async ({ data }: any) => Object.assign(user, structuredClone(data)),
}
mock.module('server-only', () => ({}))
mock.module('payload', () => ({ getPayload: async () => payload }))
mock.module('@/payload.config', () => ({ default: {} }))
mock.module('next/cache', () => ({ revalidatePath() {} }))
mock.module('@/utilities/auth/server-auth', () => ({ checkUserAuth: async () => ({ user }) }))
mock.module('@/data/tasks', () => ({ tasks: [passwordTask] }))
mock.module('@/utilities/tasks/task-logic', () => ({
  checkTaskRequirements: () => true, checkTaskCriteria: () => true, isPokemonEligible: () => true,
}))
mock.module('@/utilities/rewards/reward-logic', () => ({
  grantRewards: async () => { grants++; return { summary: {} } },
}))
mock.module('@/utilities/rewards/conditional-rewards', () => ({ filterEligibleRewards: (rewards: any) => rewards }))
mock.module('@/utilities/game-data', () => ({ getGameUserData: async () => ({
  completedTasks: Object.keys(completedTasks).map((taskId) => ({ taskId })), pokemon: [], inventory: [],
}) }))
mock.module('@/utilities/requirements/analysis', () => ({ analyzeRequirements: () => [] }))
mock.module('@/utilities/expeditions/server', () => ({
  grantExpeditionLivesForTask: async () => 0,
  grantExpeditionSafariBallsForTask: async () => 0,
  isCurrentExpeditionTask: async () => true,
  recordExpeditionActivityResult: async () => ({}),
}))
mock.module('@/utilities/pokemon/origin', () => ({ resolveTaskPokemonOrigin: () => undefined }))
mock.module('@/utilities/user-state', () => ({
  getUserCompletedTasksMap: async () => completedTasks,
  setUserCompletedTasksMap: async (_p: any, _u: any, map: any) => Object.assign(completedTasks, map),
  getUserInventoryMap: async () => ({}), setUserInventoryMap: async () => {},
}))
mock.module('@/utilities/redis', () => ({ redis: {
  get: async (key: string) => proofs.get(key),
  set: async (key: string, value: unknown) => { proofs.set(key, value); return 'OK' },
} }))
mock.module('@/utilities/game-integrity', () => ({
  acquireActionLock: async () => ({ acquired: true }), releaseActionLock: async () => {},
  checkActionRateLimit: async () => ({ allowed: true }),
}))
mock.module('@/utilities/economy/transactions', () => ({
  runEconomyAction: async (_options: any, operation: any) => operation({ payload, req: {} }),
  getEconomyActionErrorMessage: () => 'failed',
}))

const { completeTask, validateEnterModalPassword } = await import('@/utilities/tasks/actions')
assert.equal((await completeTask('daily-1', [], 'first-request')).success, true)
assert.equal(grants, 1)
assert.equal((await completeTask('daily-1', [], 'different-request')).success, false)
assert.equal(grants, 1)

user.activeDailyTasks = [{ ...daily, completed: false }]
user.lastDailyRefresh = '2020-01-01T00:00:00.000Z'
assert.equal((await completeTask('daily-1', [], 'stale-day')).success, false)
assert.equal(grants, 1)
user.lastDailyRefresh = new Date().toISOString()
assert.equal((await completeTask('daily-1', [], 'new-day')).success, true)
assert.equal(grants, 2)

assert.equal((await completeTask(passwordTask.id, [], 'skip-dialogue')).success, false)
assert.equal((await validateEnterModalPassword(passwordTask.id, 'incorrect')).correct, false)
assert.equal((await completeTask(passwordTask.id, [], 'wrong-proof')).success, false)
assert.equal((await validateEnterModalPassword(passwordTask.id, 'missingno')).correct, true)
assert.equal((await completeTask(passwordTask.id, [], 'verified')).success, true)
assert.equal(grants, 3)
