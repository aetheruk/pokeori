'use server'

import { getPayload } from 'payload'
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
  renumberSteps,
  resolveResultBranchAfterStep,
} from '@/utilities/expeditions/path-builder'
import type { User } from '@/payload-types'

interface ExpeditionRunDoc {
  id: string
  user: string
  expeditionId: string
  expeditionName: string
  status: 'active' | 'ready_to_claim'
  mapItemId?: string
  maxLosses: number
  losses: number
  currentStepIndex: number
  totalSteps: number
  steps: ExpeditionGeneratedStep[]
  startedAt: string
  completedAt?: string
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
    mapItemId: runDoc.mapItemId,
    steps: runDoc.steps || [],
  }
}

async function consumeMapItem(payload: any, userId: string, mapItemId?: string): Promise<boolean> {
  if (!mapItemId) {
    return true
  }

  const inventory = await getUserInventoryMap(payload, userId)
  const currentQuantity = inventory[mapItemId] || 0

  if (currentQuantity < 1) {
    return false
  }

  inventory[mapItemId] = currentQuantity - 1

  await setUserInventoryMap(payload, userId, inventory)

  return true
}

async function updateExpeditionStats(
  payload: any,
  userId: string,
  expeditionId: string,
  completed: boolean,
): Promise<void> {
  const stats = await getUserActivityStatsMap(payload, userId, ['expeditionResults'])
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

  await consumeMapItem(payload, userId, run.mapItemId)
  await updateExpeditionStats(payload, userId, run.expeditionId, completed)

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
    })
  } else {
    await (payload as any).delete({
      collection: 'expedition-runs',
      id: run.id,
    })
  }

  revalidatePath('/game')
  revalidatePath('/game/explore')

  return {
    success: true,
    updated: true,
    completed: completed || undefined,
    failed: completed ? undefined : true,
    expedition,
  }
}

async function getRunsForUser(payload: any, userId: string): Promise<ExpeditionRunDoc[]> {
  const res = await payload.find({
    collection: 'expedition-runs',
    where: {
      user: { equals: userId },
    },
    sort: '-createdAt',
    limit: 10,
  })

  return (res.docs || []) as ExpeditionRunDoc[]
}

async function getActiveRunForUser(payload: any, userId: string): Promise<ExpeditionRunDoc | null> {
  const runs = await getRunsForUser(payload, userId)
  return runs.find((run) => run.status === 'active' || run.status === 'ready_to_claim') || null
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

export async function startExpedition(expeditionId: string): Promise<StartExpeditionResult> {
  const { payload, user } = await getAuthedPayloadUser()
  if (!user) {
    return { success: false, message: 'Not authenticated' }
  }

  const expedition = getExpedition(expeditionId)
  if (!expedition) {
    return { success: false, message: 'Expedition not found' }
  }

  const lock = await acquireActionLock(getLockKey(user.id), EXPEDITION_PROGRESS_LOCK_TTL)
  if (!lock.acquired) {
    return { success: false, message: 'Another expedition action is in progress' }
  }

  try {
    const existingRun = await getActiveRunForUser(payload as any, user.id)
    if (existingRun) {
      return { success: false, message: 'You already have an active expedition' }
    }

    const freshUser = (await payload.findByID({
      collection: 'users',
      id: user.id,
    })) as User

    const userData = await getGameUserData(freshUser)

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

    const created = (await (payload as any).create({
      collection: 'expedition-runs',
      data: {
        user: user.id,
        expeditionId: expedition.id,
        expeditionName: expedition.name,
        status: 'active',
        mapItemId: expedition.mapItemId,
        maxLosses: expedition.maxLosses,
        losses: 0,
        currentStepIndex: 0,
        totalSteps: generatedSteps.length,
        steps: generatedSteps,
        startedAt: now,
      },
    })) as ExpeditionRunDoc

    revalidatePath('/game')
    revalidatePath('/game/explore')

    return {
      success: true,
      run: mapRunDocToActiveRun(created),
    }
  } finally {
    await releaseActionLock(lock)
  }
}

export async function abandonExpedition(): Promise<ExpeditionActionResult> {
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
    const activeRun = runs.find((run) => run.status === 'active')

    if (!activeRun) {
      return { success: false, message: 'No active expedition to abandon' }
    }

    const expedition = getExpedition(activeRun.expeditionId)
    if (expedition?.canAbandon === false) {
      return { success: false, message: 'This expedition cannot be abandoned' }
    }

    await consumeMapItem(payload, user.id, activeRun.mapItemId)
    await updateExpeditionStats(payload, user.id, activeRun.expeditionId, false)

    await (payload as any).delete({
      collection: 'expedition-runs',
      id: activeRun.id,
    })

    revalidatePath('/game')
    revalidatePath('/game/explore')

    return { success: true }
  } finally {
    await releaseActionLock(lock)
  }
}

export async function claimExpeditionRewards(
  expeditionId?: string,
): Promise<ClaimExpeditionResult> {
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

    const { summary } = await grantRewards(user.id, rewardsToGrant, { source: 'expedition' })

    await (payload as any).delete({
      collection: 'expedition-runs',
      id: run.id,
    })

    revalidatePath('/game')
    revalidatePath('/game/explore')

    return {
      success: true,
      rewards: summary,
      summary,
    }
  } finally {
    await releaseActionLock(lock)
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
  )

  if (!result.success) {
    return { success: false, message: 'Failed to update expedition progress' }
  }

  if (!result.updated) {
    return { success: false, message: 'Task is not the active expedition step' }
  }

  return {
    success: true,
    exitModal: tasks.find((task) => task.id === taskId)?.exitModal,
    rewards: {
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
    },
    completed: result.completed,
    failed: result.failed,
    updated: result.updated,
    expedition: result.expedition,
  }
}

export async function recordExpeditionActivityResult(
  userId: string,
  activityType: ExpeditionActivityType,
  activityId: string,
  didWin: boolean,
): Promise<{
  success: boolean
  failed?: boolean
  completed?: boolean
  updated?: boolean
  expedition?: ExpeditionProgressSnapshot
}> {
  const payload = await getPayload({ config: configPromise })

  const lock = await acquireActionLock(getLockKey(userId), EXPEDITION_PROGRESS_LOCK_TTL)
  if (!lock.acquired) {
    return { success: false }
  }

  try {
    const runs = await getRunsForUser(payload as any, userId)
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

        await consumeMapItem(payload, userId, run.mapItemId)
        await updateExpeditionStats(payload, userId, run.expeditionId, true)

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
        })

        revalidatePath('/game')
        revalidatePath('/game/explore')

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
      })

      revalidatePath('/game')
      revalidatePath('/game/explore')

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

        await consumeMapItem(payload, userId, run.mapItemId)
        await updateExpeditionStats(payload, userId, run.expeditionId, true)

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
        })

        revalidatePath('/game')
        revalidatePath('/game/explore')

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
      })

      revalidatePath('/game')
      revalidatePath('/game/explore')

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
      })

      revalidatePath('/game')
      revalidatePath('/game/explore')

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

      await consumeMapItem(payload, userId, run.mapItemId)
      await updateExpeditionStats(payload, userId, run.expeditionId, false)

      await (payload as any).delete({
        collection: 'expedition-runs',
        id: run.id,
      })

      revalidatePath('/game')
      revalidatePath('/game/explore')

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
    })

    revalidatePath('/game')
    revalidatePath('/game/explore')

    return { success: true, updated: true, expedition }
  } finally {
    await releaseActionLock(lock)
  }
}
