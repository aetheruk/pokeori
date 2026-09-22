import { mock } from 'bun:test'
import { strict as assert } from 'node:assert'

const safariTask: any = {
  id: 'safari-research-29-common',
  repeatable: true,
  expeditionOnly: true,
  requirements: [],
  criteria: [],
  rewards: [{ type: 'currency', targetId: 'pokedollars', quantity: 1 }],
}
const fixedExpeditionTask: any = {
  id: 'fuchsia-gym-koga-rewards',
  repeatable: true,
  requirements: [],
  criteria: [],
  rewards: [{ type: 'currency', targetId: 'pokedollars', quantity: 1 }],
}
const user: any = { id: 'expedition-audit-user', currency: {} }
const completedTasks: Record<string, any> = {}
let taskStepStatus: 'current' | 'stale' | 'not-in-expedition' = 'current'
let grants = 0

const summary = {
  xp: {},
  items: [],
  pokemon: [],
  currency: [],
  cards: [],
  tasksCompleted: [],
  banners: [],
  icons: [],
  titles: [],
  upgrades: [],
  notices: [],
}

const payload: any = {
  findByID: async () => structuredClone(user),
}

mock.module('server-only', () => ({}))
mock.module('payload', () => ({ getPayload: async () => payload }))
mock.module('@/payload.config', () => ({ default: {} }))
mock.module('next/cache', () => ({ revalidatePath() {} }))
mock.module('@/utilities/auth/server-auth', () => ({
  checkUserAuth: async () => ({ user }),
}))
mock.module('@/data/tasks', () => ({
  tasks: [safariTask, fixedExpeditionTask],
}))
mock.module('@/utilities/events/server', () => ({
  getEffectiveContent: async (_kind: string, taskId: string) =>
    [safariTask, fixedExpeditionTask].find((task) => task.id === taskId),
}))
mock.module('@/utilities/events/participation', () => ({
  resolveEventTaskClaim: async () => null,
}))
mock.module('@/utilities/tasks/task-logic', () => ({
  checkTaskRequirements: () => true,
  checkTaskCriteria: () => true,
  isPokemonEligible: () => true,
}))
mock.module('@/utilities/rewards/reward-logic', () => ({
  grantRewards: async () => {
    grants += 1
    return { summary: structuredClone(summary) }
  },
}))
mock.module('@/utilities/rewards/conditional-rewards', () => ({
  filterEligibleRewards: (rewards: any[]) => rewards,
}))
mock.module('@/utilities/game-data', () => ({
  getGameUserData: async () => ({
    user,
    completedTasks: Object.keys(completedTasks).map((taskId) => ({ taskId })),
    pokemon: [],
    inventory: [],
  }),
}))
mock.module('@/utilities/requirements/analysis', () => ({
  analyzeRequirements: () => [],
}))
mock.module('@/utilities/expeditions/server', () => ({
  grantExpeditionLivesForTask: async () => 0,
  grantExpeditionSafariBallsForTask: async () => 0,
  getExpeditionTaskStepStatusForUser: async () => taskStepStatus,
  recordExpeditionActivityResult: async () => {
    taskStepStatus = 'stale'
    return { success: true, updated: true }
  },
}))
mock.module('@/utilities/pokemon/origin', () => ({
  resolveTaskPokemonOrigin: () => undefined,
}))
mock.module('@/utilities/user-state', () => ({
  getUserCompletedTasksMap: async () => completedTasks,
  setUserCompletedTasksMap: async (_payload: any, _userId: string, map: any) =>
    Object.assign(completedTasks, map),
  getUserInventoryMap: async () => ({}),
  setUserInventoryMap: async () => {},
}))
mock.module('@/utilities/redis', () => ({
  redis: { get: async () => null },
}))
mock.module('@/utilities/economy/transactions', () => ({
  runEconomyAction: async (_options: any, operation: any) =>
    operation({ payload, req: {} }),
  getEconomyActionErrorMessage: () => 'failed',
}))

const { completeTask } = await import('@/utilities/tasks/actions')

assert.equal(
  (await completeTask(safariTask.id, undefined, 'first-request')).success,
  true,
)
assert.equal(grants, 1)

assert.equal(
  (await completeTask(safariTask.id, undefined, 'different-request')).success,
  false,
)
assert.equal(grants, 1)

taskStepStatus = 'not-in-expedition'
assert.equal(
  (await completeTask(fixedExpeditionTask.id, undefined, 'outside-run')).success,
  false,
)
assert.equal(grants, 1)
