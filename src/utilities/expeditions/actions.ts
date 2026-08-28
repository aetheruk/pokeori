'use server'

import { getPayload, type PayloadRequest } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import {
  getExpedition,
  type ExpeditionActivityType,
  type ExpeditionGeneratedStep,
  type ActiveExpeditionRun,
} from '@/data/expeditions'
import { tasks, type TaskExitModal } from '@/data/tasks'
import { checkRequirement } from '@/utilities/requirements'
import { getGameUserData } from '@/utilities/game-data'
import { grantRewards, type RewardSummary } from '@/utilities/rewards/reward-logic'
import { acquireActionLock, releaseActionLock } from '@/utilities/game-integrity'
import {
  getUserActivityStatsMap,
  getUserInventoryMap,
  setUserActivityStatsMap,
  setUserInventoryMap,
} from '@/utilities/user-state'
import {
  buildExpeditionSteps,
  cloneSteps,
  normalizeKidModeExpeditionSteps,
  renumberSteps,
  resolveResultBranchAfterStep,
} from '@/utilities/expeditions/path-builder'
import type { User } from '@/payload-types'
import type { Reward } from '@/data/types'
import { getEconomyActionErrorMessage, runEconomyAction } from '@/utilities/economy/transactions'

interface ExpeditionRunDoc {
  id: string
  user: string
  expeditionId: string
  expeditionName: string
  status: 'active' | 'ready_to_claim'
  mapItemId?: string
  maxLosses: number
  losses: number
  safariBallsRemaining?: number
  currentStepIndex: number
  totalSteps: number
  steps: ExpeditionGeneratedStep[]
  startedAt: string
  completedAt?: string
}

function resolveRewardQuantity(quantity: Reward['quantity']): number {
  if (typeof quantity === 'number') return Math.max(0, quantity)
  if (quantity && typeof quantity === 'object') {
    return Math.floor(
      Math.random() * (quantity.max - quantity.min + 1),
    ) + quantity.min
  }
  return 1
}

interface ExpeditionActionResult {
  success: boolean
  message?: string
}

interface StartExpeditionResult extends ExpeditionActionResult {
  run?: ActiveExpeditionRun
}

interface ClaimExpeditionResult extends ExpeditionActionResult {
  rewards?: RewardSummary
  summary?: RewardSummary
}

export interface ExpeditionProgressSnapshot {
  expeditionId: string
  expeditionName: string
  isChronicle?: boolean
  currentStep: number
  totalSteps: number
  losses: number
  maxLosses: number
  livesLeft: number
  canFail?: boolean
  status: 'active' | 'ready_to_claim' | 'failed'
  progressed: boolean
}

const EXPEDITION_PROGRESS_LOCK_TTL = 10

function getLockKey(userId: string): string {
  return `lock:expedition:progress:${userId}`
}

function isChronicleExpedition(expeditionId: string): boolean {
  return Boolean(getExpedition(expeditionId)?.chronicle)
}

function mapRunDocToActiveRun(runDoc: ExpeditionRunDoc): ActiveExpeditionRun {
  return {
    id: runDoc.id,
    expeditionId: runDoc.expeditionId,
    expeditionName: runDoc.expeditionName,
    isChronicle: isChronicleExpedition(runDoc.expeditionId),
    status: runDoc.status,
    currentStepIndex: runDoc.currentStepIndex,
    totalSteps: runDoc.totalSteps,
    losses: runDoc.losses,
    maxLosses: runDoc.maxLosses,
    safariBallsRemaining: runDoc.safariBallsRemaining,
    mapItemId: runDoc.mapItemId,
    steps: runDoc.steps || [],
  }
}

interface ExpeditionOperationOptions {
  payload?: any
  req?: PayloadRequest
  revalidatePaths?: boolean
}

async function consumeMapItem(
  payload: any,
  userId: string,
  mapItemId?: string,
  req?: PayloadRequest,
): Promise<boolean> {
  if (!mapItemId) {
    return true
  }

  const inventory = await getUserInventoryMap(payload, userId, { req })
  const currentQuantity = inventory[mapItemId] || 0

  if (currentQuantity < 1) {
    return false
  }

  inventory[mapItemId] = currentQuantity - 1

  await setUserInventoryMap(payload, userId, inventory, { req })

  return true
}

async function updateExpeditionStats(
  payload: any,
  userId: string,
  expeditionId: string,
  completed: boolean,
  req?: PayloadRequest,
): Promise<void> {
  const stats = await getUserActivityStatsMap(payload, userId, ['expeditionResults'], { req })
  const expeditionStats = stats.expeditions || {}
  const current = expeditionStats[expeditionId] || { wins: 0, losses: 0 }
  const now = new Date().toISOString()

  expeditionStats[expeditionId] = {
    ...current,
    wins: (current.wins || 0) + (completed ? 1 : 0),
    losses: (current.losses || 0) + (completed ? 0 : 1),
    updatedAt: now,
    lastPlayed: now,
  }

  await setUserActivityStatsMap(
    payload,
    userId,
    { expeditions: expeditionStats },
    ['expeditionResults'],
    { req },
  )
}

async function endExpeditionRun(
  payload: any,
  userId: string,
  run: ExpeditionRunDoc,
  steps: ExpeditionGeneratedStep[],
  currentStepIndex: number,
  canFail: boolean,
  status: 'ready_to_claim' | 'failed',
  req?: PayloadRequest,
  revalidatePaths = true,
): Promise<{
  success: true
  updated: true
  completed?: boolean
  failed?: boolean
  expedition: ExpeditionProgressSnapshot
}> {
  const completed = status === 'ready_to_claim'
  const expedition: ExpeditionProgressSnapshot = {
    expeditionId: run.expeditionId,
    expeditionName: run.expeditionName,
    isChronicle: isChronicleExpedition(run.expeditionId),
    currentStep: steps.length,
    totalSteps: steps.length,
    losses: run.losses || 0,
    maxLosses: run.maxLosses || 0,
    livesLeft: Math.max(0, (run.maxLosses || 0) - (run.losses || 0)),
    canFail,
    status,
    progressed: true,
  }

  await consumeMapItem(payload, userId, run.mapItemId, req)
  await updateExpeditionStats(payload, userId, run.expeditionId, completed, req)

  if (completed) {
    await (payload as any).update({
      collection: 'expedition-runs',
      id: run.id,
      data: {
        status: 'ready_to_claim',
        currentStepIndex,
        totalSteps: steps.length,
        steps,
        completedAt: new Date().toISOString(),
      },
      req,
    })
  } else {
    await (payload as any).delete({
      collection: 'expedition-runs',
      id: run.id,
      req,
    })
  }

  if (revalidatePaths) {
    revalidatePath('/game')
    revalidatePath('/game/explore')
  }

  return {
    success: true,
    updated: true,
    completed: completed || undefined,
    failed: completed ? undefined : true,
    expedition,
  }
}

async function getRunsForUser(
  payload: any,
  userId: string,
  req?: PayloadRequest,
): Promise<ExpeditionRunDoc[]> {
  const res = await payload.find({
    collection: 'expedition-runs',
    where: {
      user: { equals: userId },
    },
    sort: '-createdAt',
    limit: 10,
    pagination: false,
    req,
  })

  const runs = (res.docs || []) as ExpeditionRunDoc[]
  const orientationRuns = runs.filter(
    (run) => run.expeditionId === 'pallet-town-orientation',
  )
  if (orientationRuns.length === 0) return runs

  const user = (await payload.findByID({
    collection: 'users',
    id: userId,
    depth: 0,
    select: { kidMode: true },
    req,
  })) as Pick<User, 'kidMode'>
  if (user.kidMode !== true) return runs

  for (const run of orientationRuns) {
    const normalized = normalizeKidModeExpeditionSteps({
      expeditionId: run.expeditionId,
      steps: run.steps || [],
      currentStepIndex: run.currentStepIndex || 0,
      kidMode: true,
    })
    if (!normalized.changed) continue

    run.steps = normalized.steps
    run.currentStepIndex = normalized.currentStepIndex
    run.totalSteps = normalized.steps.length
    await payload.update({
      collection: 'expedition-runs',
      id: run.id,
      data: {
        steps: normalized.steps,
        currentStepIndex: normalized.currentStepIndex,
        totalSteps: normalized.steps.length,
      },
      req,
    })
  }

  return runs
}

async function getActiveRunForUser(payload: any, userId: string): Promise<ExpeditionRunDoc | null> {
  const runs = await getRunsForUser(payload, userId)
  return runs.find((run) => run.status === 'active' || run.status === 'ready_to_claim') || null
}

export async function isCurrentExpeditionTask(
  payload: any,
  userId: string,
  taskId: string,
): Promise<boolean> {
  const run = await getActiveRunForUser(payload, userId)
  if (!run || (run.status !== 'active' && run.status !== 'ready_to_claim')) {
    return false
  }

  const completedStep = run.steps[run.currentStepIndex - 1]
  const currentStep = run.steps[run.currentStepIndex]
  return (
    (completedStep?.activityType === 'task' && completedStep.activityId === taskId) ||
    (currentStep?.activityType === 'task' && currentStep.activityId === taskId)
  )
}

export async function grantExpeditionSafariBallsForTask(
  payload: any,
  userId: string,
  taskId: string,
  reward: Reward & { type: 'expedition_safari_balls' },
  req?: PayloadRequest,
  revalidatePaths = true,
): Promise<number> {
  const run = await getActiveRunForUser(payload, userId)
  if (!run || (run.status !== 'active' && run.status !== 'ready_to_claim')) {
    return 0
  }

  const completedStep = run.steps[run.currentStepIndex - 1]
  const currentStep = run.steps[run.currentStepIndex]
  const belongsToTask =
    (completedStep?.activityType === 'task' && completedStep.activityId === taskId) ||
    (currentStep?.activityType === 'task' && currentStep.activityId === taskId)
  if (!belongsToTask) return 0

  const dropChance = reward.dropChance ?? 100
  if (dropChance < 100 && Math.random() * 100 > dropChance) return 0

  const quantity = resolveRewardQuantity(reward.quantity)
  if (quantity <= 0) return 0

  const newRemaining = (run.safariBallsRemaining || 0) + quantity
  await payload.update({
    collection: 'expedition-runs',
    id: run.id,
    data: { safariBallsRemaining: newRemaining },
    req,
  })
  if (revalidatePaths) {
    revalidatePath('/game')
    revalidatePath('/game/explore')
  }
  return quantity
}

export async function grantExpeditionLivesForTask(
  payload: any,
  userId: string,
  taskId: string,
  reward: Reward & { type: 'expedition_lives' },
  req?: PayloadRequest,
  revalidatePaths = true,
): Promise<number> {
  const run = await getActiveRunForUser(payload, userId)
  if (!run || (run.status !== 'active' && run.status !== 'ready_to_claim')) {
    return 0
  }

  const completedStep = run.steps[run.currentStepIndex - 1]
  const currentStep = run.steps[run.currentStepIndex]
  const belongsToTask =
    (completedStep?.activityType === 'task' && completedStep.activityId === taskId) ||
    (currentStep?.activityType === 'task' && currentStep.activityId === taskId)
  if (!belongsToTask) return 0

  const dropChance = reward.dropChance ?? 100
  if (dropChance < 100 && Math.random() * 100 > dropChance) return 0

  const quantity = resolveRewardQuantity(reward.quantity)
  const restored = Math.min(quantity, Math.max(0, run.losses || 0))
  if (restored <= 0) return 0

  await payload.update({
    collection: 'expedition-runs',
    id: run.id,
    data: { losses: Math.max(0, (run.losses || 0) - restored) },
    req,
  })
  if (revalidatePaths) {
    revalidatePath('/game')
    revalidatePath('/game/explore')
  }
  return restored
}

export async function setSafariBallsRemaining(
  userId: string,
  remaining: number,
  revalidatePaths = true,
): Promise<boolean> {
  const payload = await getPayload({ config: configPromise })
  const run = await getActiveRunForUser(payload as any, userId)
  if (run?.status !== 'active') return false

  await (payload as any).update({
    collection: 'expedition-runs',
    id: run.id,
    data: { safariBallsRemaining: Math.max(0, remaining) },
  })
  if (revalidatePaths) {
    revalidatePath('/game')
    revalidatePath('/game/explore')
  }
  return true
}

export async function endSafariExpeditionWithoutBalls(userId: string) {
  const lock = await acquireActionLock(getLockKey(userId), EXPEDITION_PROGRESS_LOCK_TTL)
  if (!lock.acquired) return { success: false as const, message: 'Another expedition action is being processed.' }

  try {
    const payload = await getPayload({ config: configPromise })
    const run = await getActiveRunForUser(payload as any, userId)
    if (run?.status !== 'active') {
      return { success: false as const, message: 'No active expedition is available.' }
    }

    const expedition = getExpedition(run.expeditionId)
    const failedRun = { ...run, losses: run.maxLosses }
    return endExpeditionRun(
      payload,
      userId,
      failedRun,
      run.steps,
      run.currentStepIndex,
      expedition?.canFail !== false,
      'failed',
    )
  } finally {
    await releaseActionLock(lock)
  }
}

async function getAuthedPayloadUser(): Promise<{ payload: any; user: User | null }> {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })
  return { payload, user: (user as User) || null }
}

export async function getActiveExpeditionForUser(
  userId: string,
): Promise<ActiveExpeditionRun | null> {
  const payload = await getPayload({ config: configPromise })
  const run = await getActiveRunForUser(payload as any, userId)
  if (!run) {
    return null
  }

  return mapRunDocToActiveRun(run)
}

export async function startExpedition(
  expeditionId: string,
  clientActionId: string,
): Promise<StartExpeditionResult> {
  const { user } = await getAuthedPayloadUser()
  if (!user) {
    return { success: false, message: 'Not authenticated' }
  }

  const expedition = getExpedition(expeditionId)
  if (!expedition) {
    return { success: false, message: 'Expedition not found' }
  }
  if (expedition.legacyOnly) {
    return { success: false, message: 'That expedition is no longer available.' }
  }
  if (!clientActionId) return { success: false, message: 'Missing action identifier' }

  try {
    const result = await runEconomyAction<StartExpeditionResult>(
      { userId: user.id, action: 'start-expedition', requestId: clientActionId },
      async ({ payload, req }) => {
    const runs = await getRunsForUser(payload as any, user.id, req)
    const existingRun = runs.find((run) => run.status === 'active' || run.status === 'ready_to_claim')
    if (existingRun) {
      return { success: false, message: 'You already have an active expedition' }
    }

    const freshUser = (await payload.findByID({
      collection: 'users',
      id: user.id,
      req,
    })) as User

    const userData = await getGameUserData(freshUser, undefined, { payload, req })

    const expeditionGating = [...(expedition.requirements || []), ...(expedition.criteria || [])]

    if (
      expeditionGating.length > 0 &&
      !expeditionGating.every((req) =>
        checkRequirement(userData, req, {
          category: expedition.category,
          subCategory: expedition.subCategory,
        }),
      )
    ) {
      return { success: false, message: 'Expedition requirements not met' }
    }

    if (expedition.mapItemId) {
      const mapQuantity =
        userData.inventory.find((entry) => entry.itemId === expedition.mapItemId)?.quantity || 0
      if (mapQuantity < 1) {
        return { success: false, message: 'You need an expedition map to begin' }
      }
    }

    let generatedSteps: ExpeditionGeneratedStep[]
    try {
      generatedSteps = buildExpeditionSteps(expedition, userData)
    } catch (error) {
      console.error('Failed to generate expedition path', error)
      return { success: false, message: 'Could not generate a valid expedition path' }
    }

    const now = new Date().toISOString()
    const staminaNotes = expedition.staminaNoteLimit
      ? Math.min(
          expedition.staminaNoteLimit,
          userData.completedTasks.find(
            (task) => task.taskId === 'safari-stamina-notes',
          )?.count || 0,
        )
      : 0

    const created = (await (payload as any).create({
      collection: 'expedition-runs',
      data: {
        user: user.id,
        expeditionId: expedition.id,
        expeditionName: expedition.name,
        status: 'active',
        mapItemId: expedition.mapItemId,
        maxLosses: expedition.maxLosses + staminaNotes,
        losses: 0,
        safariBallsRemaining: expedition.safariBallAllowance,
        currentStepIndex: 0,
        totalSteps: generatedSteps.length,
        steps: generatedSteps,
        startedAt: now,
      },
      req,
    })) as ExpeditionRunDoc

    return {
      success: true,
      run: mapRunDocToActiveRun(created),
    }
      },
    )
    revalidatePath('/game')
    revalidatePath('/game/explore')
    return result
  } catch (error) {
    return { success: false, message: getEconomyActionErrorMessage(error) }
  }
}

export async function abandonExpedition(clientActionId: string): Promise<ExpeditionActionResult> {
  const { user } = await getAuthedPayloadUser()
  if (!user) {
    return { success: false, message: 'Not authenticated' }
  }

  if (!clientActionId) return { success: false, message: 'Missing action identifier' }

  try {
    const result = await runEconomyAction<ExpeditionActionResult>(
      { userId: user.id, action: 'abandon-expedition', requestId: clientActionId },
      async ({ payload, req }) => {
    const runs = await getRunsForUser(payload as any, user.id, req)
    const activeRun = runs.find((run) => run.status === 'active')

    if (!activeRun) {
      return { success: false, message: 'No active expedition to abandon' }
    }

    const expedition = getExpedition(activeRun.expeditionId)
    if (expedition?.canAbandon === false) {
      return { success: false, message: 'This expedition cannot be abandoned' }
    }

    await consumeMapItem(payload, user.id, activeRun.mapItemId, req)
    await updateExpeditionStats(payload, user.id, activeRun.expeditionId, false, req)

    await (payload as any).delete({
      collection: 'expedition-runs',
      id: activeRun.id,
      req,
    })

    return { success: true }
      },
    )
    revalidatePath('/game')
    revalidatePath('/game/explore')
    return result
  } catch (error) {
    return { success: false, message: getEconomyActionErrorMessage(error) }
  }
}

export async function claimExpeditionRewards(
  expeditionId?: string,
  clientActionId?: string,
): Promise<ClaimExpeditionResult> {
  const { user } = await getAuthedPayloadUser()
  if (!user) {
    return { success: false, message: 'Not authenticated' }
  }

  if (!clientActionId) return { success: false, message: 'Missing action identifier' }

  try {
    const result = await runEconomyAction<ClaimExpeditionResult>(
      { userId: user.id, action: 'claim-expedition', requestId: clientActionId },
      async ({ payload, req }) => {
    const runs = await getRunsForUser(payload as any, user.id, req)
    const run = runs.find(
      (entry) =>
        entry.status === 'ready_to_claim' && (!expeditionId || entry.expeditionId === expeditionId),
    )

    if (!run) {
      return { success: false, message: 'No completed expedition is ready to claim' }
    }

    const expedition = getExpedition(run.expeditionId)
    if (!expedition) {
      return { success: false, message: 'Expedition configuration missing' }
    }

    const rewardsToGrant = expedition.rewards || []

    const { summary } = await grantRewards(user.id, rewardsToGrant, {
      source: 'expedition',
      payload,
      req,
    })

    await (payload as any).delete({
      collection: 'expedition-runs',
      id: run.id,
      req,
    })

    return {
      success: true,
      rewards: summary,
      summary,
    }
      },
    )
    revalidatePath('/game')
    revalidatePath('/game/explore')
    return result
  } catch (error) {
    return { success: false, message: getEconomyActionErrorMessage(error) }
  }
}

export async function chooseExpeditionBranch(
  expeditionId: string,
  branchNodeStepId: string,
  branchId: string,
): Promise<ExpeditionActionResult> {
  const { payload, user } = await getAuthedPayloadUser()
  if (!user) {
    return { success: false, message: 'Not authenticated' }
  }

  const lock = await acquireActionLock(getLockKey(user.id), EXPEDITION_PROGRESS_LOCK_TTL)
  if (!lock.acquired) {
    return { success: false, message: 'Another expedition action is in progress' }
  }

  try {
    const runs = await getRunsForUser(payload as any, user.id)
    const run = runs.find(
      (entry) => entry.expeditionId === expeditionId && entry.status === 'active',
    )

    if (!run) {
      return { success: false, message: 'No active expedition found' }
    }

    const steps = [...(run.steps || [])]
    const currentStep = steps[run.currentStepIndex]

    if (!currentStep) {
      return { success: false, message: 'No expedition step available' }
    }

    const currentType = currentStep.type || 'activity'
    if (currentType !== 'branch_choice') {
      return { success: false, message: 'Current step is not a branch choice' }
    }

    if (currentStep.stepId !== branchNodeStepId) {
      return { success: false, message: 'Branch choice is no longer current' }
    }

    const selectedOption = (currentStep.branchOptions || []).find(
      (option) => option.branchId === branchId,
    )

    if (!selectedOption) {
      return { success: false, message: 'Invalid branch option selected' }
    }

    if (!selectedOption.steps || selectedOption.steps.length === 0) {
      return { success: false, message: 'Selected branch has no steps' }
    }

    const branchSteps = renumberSteps(cloneSteps(selectedOption.steps))
    const mergedSteps = [
      ...steps.slice(0, run.currentStepIndex),
      ...branchSteps,
      ...steps.slice(run.currentStepIndex + 1),
    ]
    const normalizedSteps = renumberSteps(mergedSteps)

    await (payload as any).update({
      collection: 'expedition-runs',
      id: run.id,
      data: {
        steps: normalizedSteps,
        totalSteps: normalizedSteps.length,
      },
    })

    revalidatePath('/game')
    revalidatePath('/game/explore')

    return { success: true }
  } finally {
    await releaseActionLock(lock)
  }
}

export async function failCurrentUserExpeditionTaskStep(taskId: string): Promise<{
  success: boolean
  message?: string
  failed?: boolean
  updated?: boolean
  expedition?: ExpeditionProgressSnapshot
}> {
  const { user } = await getAuthedPayloadUser()
  if (!user) {
    return { success: false, message: 'Not authenticated' }
  }

  const result = await recordExpeditionActivityResult(
    user.id,
    'task',
    taskId,
    false,
    { revalidatePaths: false },
  )

  if (!result.success) {
    return { success: false, message: 'Failed to update expedition progress' }
  }

  if (!result.updated) {
    return { success: false, message: 'Task is not the active expedition step' }
  }

  return {
    success: true,
    failed: result.failed,
    updated: result.updated,
    expedition: result.expedition,
  }
}

export async function completeCurrentUserExpeditionTaskStep(
  taskId: string,
): Promise<{
  success: boolean
  message?: string
  exitModal?: TaskExitModal
  rewards?: RewardSummary
  completed?: boolean
  failed?: boolean
  updated?: boolean
  expedition?: ExpeditionProgressSnapshot
  expeditionProgress?: ExpeditionProgressSnapshot
}> {
  const { user } = await getAuthedPayloadUser()
  if (!user) {
    return { success: false, message: 'Not authenticated' }
  }

  const result = await recordExpeditionActivityResult(
    user.id,
    'task',
    taskId,
    true,
    { revalidatePaths: false },
  )

  if (!result.success) {
    return { success: false, message: 'Failed to update expedition progress' }
  }

  if (!result.updated) {
    return { success: false, message: 'Task is not the active expedition step' }
  }

  const rewards: RewardSummary & {
    expeditionProgress?: ExpeditionProgressSnapshot
  } = {
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
    expeditionProgress: result.expedition,
  }

  return {
    success: true,
    exitModal: tasks.find((task) => task.id === taskId)?.exitModal,
    rewards,
    completed: result.completed,
    failed: result.failed,
    updated: result.updated,
    expedition: result.expedition,
    expeditionProgress: result.expedition,
  }
}

export async function recordExpeditionActivityResult(
  userId: string,
  activityType: ExpeditionActivityType,
  activityId: string,
  didWin: boolean,
  options: ExpeditionOperationOptions = {},
): Promise<{
  success: boolean
  failed?: boolean
  completed?: boolean
  updated?: boolean
  expedition?: ExpeditionProgressSnapshot
}> {
  const payload = options.payload || (await getPayload({ config: configPromise }))
  const { req } = options
  const revalidatePaths = options.revalidatePaths !== false

  const lock = req
    ? null
    : await acquireActionLock(getLockKey(userId), EXPEDITION_PROGRESS_LOCK_TTL)
  if (lock && !lock.acquired) {
      return { success: false }
  }

  try {
    const runs = await getRunsForUser(payload as any, userId, req)
    const run = runs.find((entry) => entry.status === 'active')
    if (!run) {
      return { success: true, updated: false }
    }

    const steps = [...(run.steps || [])]
    const currentStep = steps[run.currentStepIndex]

    if (!currentStep) {
      return { success: true, updated: false }
    }

    const currentStepType = currentStep.type || 'activity'
    if (currentStepType !== 'activity') {
      return { success: true, updated: false }
    }

    if (!currentStep.activityType || !currentStep.activityId) {
      return { success: true, updated: false }
    }

    if (currentStep.activityType !== activityType || currentStep.activityId !== activityId) {
      return { success: true, updated: false }
    }

    const expeditionConfig = getExpedition(run.expeditionId)
    const canFail = expeditionConfig?.canFail !== false

    currentStep.attempts = (currentStep.attempts || 0) + 1

    if (didWin) {
      currentStep.status = 'completed'
      currentStep.completedAt = new Date().toISOString()

      const routedResult = resolveResultBranchAfterStep(steps, run.currentStepIndex, 'win')
      const updatedSteps = routedResult?.steps || steps
      const nextStepIndex = routedResult?.nextStepIndex ?? run.currentStepIndex + 1
      if (routedResult?.end) {
        return endExpeditionRun(
          payload,
          userId,
          run,
          updatedSteps,
          nextStepIndex,
          canFail,
          routedResult.end === 'complete' ? 'ready_to_claim' : 'failed',
          req,
          revalidatePaths,
        )
      }

      const isFinalStep = nextStepIndex >= updatedSteps.length

      if (isFinalStep) {
        const expedition: ExpeditionProgressSnapshot = {
          expeditionId: run.expeditionId,
          expeditionName: run.expeditionName,
          isChronicle: isChronicleExpedition(run.expeditionId),
          currentStep: updatedSteps.length,
          totalSteps: updatedSteps.length,
          losses: run.losses || 0,
          maxLosses: run.maxLosses || 0,
          livesLeft: Math.max(0, (run.maxLosses || 0) - (run.losses || 0)),
          canFail,
          status: 'ready_to_claim',
          progressed: true,
        }

        await consumeMapItem(payload, userId, run.mapItemId, req)
        await updateExpeditionStats(payload, userId, run.expeditionId, true, req)

        await (payload as any).update({
          collection: 'expedition-runs',
          id: run.id,
          data: {
            status: 'ready_to_claim',
            currentStepIndex: nextStepIndex,
            totalSteps: updatedSteps.length,
            steps: updatedSteps,
            completedAt: new Date().toISOString(),
          },
          req,
        })

        if (revalidatePaths) {
          revalidatePath('/game')
          revalidatePath('/game/explore')
        }

        return { success: true, updated: true, completed: true, expedition }
      }

      const expedition: ExpeditionProgressSnapshot = {
        expeditionId: run.expeditionId,
        expeditionName: run.expeditionName,
        isChronicle: isChronicleExpedition(run.expeditionId),
        currentStep: Math.min(nextStepIndex + 1, updatedSteps.length),
        totalSteps: updatedSteps.length,
        losses: run.losses || 0,
        maxLosses: run.maxLosses || 0,
        livesLeft: Math.max(0, (run.maxLosses || 0) - (run.losses || 0)),
        canFail,
        status: 'active',
        progressed: true,
      }

      await (payload as any).update({
        collection: 'expedition-runs',
        id: run.id,
        data: {
          currentStepIndex: nextStepIndex,
          totalSteps: updatedSteps.length,
          steps: updatedSteps,
        },
        req,
      })

      if (revalidatePaths) {
        revalidatePath('/game')
        revalidatePath('/game/explore')
      }

      return { success: true, updated: true, expedition }
    }

    const routedLoss = resolveResultBranchAfterStep(steps, run.currentStepIndex, 'loss')
    if (routedLoss) {
      currentStep.status = 'completed'
      currentStep.completedAt = new Date().toISOString()

      const updatedSteps = routedLoss.steps
      const nextStepIndex = routedLoss.nextStepIndex
      if (routedLoss.end) {
        return endExpeditionRun(
          payload,
          userId,
          run,
          updatedSteps,
          nextStepIndex,
          canFail,
          routedLoss.end === 'complete' ? 'ready_to_claim' : 'failed',
          req,
          revalidatePaths,
        )
      }

      const isFinalStep = nextStepIndex >= updatedSteps.length

      if (isFinalStep) {
        const expedition: ExpeditionProgressSnapshot = {
          expeditionId: run.expeditionId,
          expeditionName: run.expeditionName,
          isChronicle: isChronicleExpedition(run.expeditionId),
          currentStep: updatedSteps.length,
          totalSteps: updatedSteps.length,
          losses: run.losses || 0,
          maxLosses: run.maxLosses || 0,
          livesLeft: Math.max(0, (run.maxLosses || 0) - (run.losses || 0)),
          canFail,
          status: 'ready_to_claim',
          progressed: true,
        }

        await consumeMapItem(payload, userId, run.mapItemId, req)
        await updateExpeditionStats(payload, userId, run.expeditionId, true, req)

        await (payload as any).update({
          collection: 'expedition-runs',
          id: run.id,
          data: {
            status: 'ready_to_claim',
            currentStepIndex: nextStepIndex,
            totalSteps: updatedSteps.length,
            steps: updatedSteps,
            completedAt: new Date().toISOString(),
          },
          req,
        })

        if (revalidatePaths) {
          revalidatePath('/game')
          revalidatePath('/game/explore')
        }

        return { success: true, updated: true, completed: true, expedition }
      }

      const expedition: ExpeditionProgressSnapshot = {
        expeditionId: run.expeditionId,
        expeditionName: run.expeditionName,
        isChronicle: isChronicleExpedition(run.expeditionId),
        currentStep: Math.min(nextStepIndex + 1, updatedSteps.length),
        totalSteps: updatedSteps.length,
        losses: run.losses || 0,
        maxLosses: run.maxLosses || 0,
        livesLeft: Math.max(0, (run.maxLosses || 0) - (run.losses || 0)),
        canFail,
        status: 'active',
        progressed: true,
      }

      await (payload as any).update({
        collection: 'expedition-runs',
        id: run.id,
        data: {
          currentStepIndex: nextStepIndex,
          totalSteps: updatedSteps.length,
          steps: updatedSteps,
        },
        req,
      })

      if (revalidatePaths) {
        revalidatePath('/game')
        revalidatePath('/game/explore')
      }

      return { success: true, updated: true, expedition }
    }

    if (!canFail) {
      const expedition: ExpeditionProgressSnapshot = {
        expeditionId: run.expeditionId,
        expeditionName: run.expeditionName,
        isChronicle: isChronicleExpedition(run.expeditionId),
        currentStep: Math.min(run.currentStepIndex + 1, steps.length),
        totalSteps: steps.length,
        losses: run.losses || 0,
        maxLosses: run.maxLosses || 0,
        livesLeft: Math.max(0, (run.maxLosses || 0) - (run.losses || 0)),
        canFail,
        status: 'active',
        progressed: false,
      }

      await (payload as any).update({
        collection: 'expedition-runs',
        id: run.id,
        data: {
          steps,
        },
        req,
      })

      if (revalidatePaths) {
        revalidatePath('/game')
        revalidatePath('/game/explore')
      }

      return { success: true, updated: true, expedition }
    }

    const newLosses = (run.losses || 0) + 1

    if (newLosses >= run.maxLosses) {
      const expedition: ExpeditionProgressSnapshot = {
        expeditionId: run.expeditionId,
        expeditionName: run.expeditionName,
        isChronicle: isChronicleExpedition(run.expeditionId),
        currentStep: Math.min(run.currentStepIndex + 1, steps.length),
        totalSteps: steps.length,
        losses: newLosses,
        maxLosses: run.maxLosses || 0,
        livesLeft: 0,
        canFail,
        status: 'failed',
        progressed: false,
      }

      await consumeMapItem(payload, userId, run.mapItemId, req)
      await updateExpeditionStats(payload, userId, run.expeditionId, false, req)

      await (payload as any).delete({
        collection: 'expedition-runs',
        id: run.id,
        req,
      })

      if (revalidatePaths) {
        revalidatePath('/game')
        revalidatePath('/game/explore')
      }

      return { success: true, updated: true, failed: true, expedition }
    }

    const expedition: ExpeditionProgressSnapshot = {
      expeditionId: run.expeditionId,
      expeditionName: run.expeditionName,
      isChronicle: isChronicleExpedition(run.expeditionId),
      currentStep: Math.min(run.currentStepIndex + 1, steps.length),
      totalSteps: steps.length,
      losses: newLosses,
      maxLosses: run.maxLosses || 0,
      livesLeft: Math.max(0, (run.maxLosses || 0) - newLosses),
      canFail,
      status: 'active',
      progressed: false,
    }

    await (payload as any).update({
      collection: 'expedition-runs',
      id: run.id,
      data: {
        losses: newLosses,
        steps,
      },
      req,
    })

    if (revalidatePaths) {
      revalidatePath('/game')
      revalidatePath('/game/explore')
    }

    return { success: true, updated: true, expedition }
  } finally {
    if (lock) await releaseActionLock(lock)
  }
}
