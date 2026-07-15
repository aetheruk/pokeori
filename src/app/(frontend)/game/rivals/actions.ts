'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { User } from '@/payload-types'
import { tasks } from '@/data/tasks'
import { analyzeRequirements } from '@/utilities/requirements/analysis'
import { getGameUserData } from '@/utilities/game-data'
import {
  checkTaskCriteria,
  checkTaskRequirements,
} from '@/utilities/tasks/task-logic'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import { getUserCompletedTasksMap, setUserCompletedTasksMap } from '@/utilities/user-state'

type SelectRivalResult = {
  success: boolean
  error?: string
  rivalName?: string
}

export async function selectRivalTrainer(
  targetUserId: string,
  taskId?: string,
): Promise<SelectRivalResult> {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user: jwtUser } = await payload.auth({ headers: headersList })

  if (!jwtUser) {
    return { success: false, error: 'Not authenticated' }
  }

  if (!targetUserId) {
    return { success: false, error: 'Choose a rival trainer first.' }
  }

  const [freshUser, rivalUser] = (await Promise.all([
    payload.findByID({ collection: 'users', id: jwtUser.id }),
    payload.findByID({ collection: 'users', id: targetUserId }),
  ])) as [User | null, User | null]

  if (!freshUser) {
    return { success: false, error: 'User not found' }
  }

  if (!rivalUser) {
    return { success: false, error: 'Rival trainer not found' }
  }

  const existingRivalId = (freshUser as any).rivalTrainerId as string | undefined
  if (existingRivalId && existingRivalId !== targetUserId) {
    return { success: false, error: 'Your rival has already been chosen.' }
  }

  const updateData: Record<string, any> = {
    rivalTrainerId: rivalUser.id,
  }
  let completedTasksToSave: Record<string, any> | null = null

  if (taskId) {
    const task = tasks.find((entry) => entry.id === taskId)
    if (!task?.rivalSelection) {
      return { success: false, error: 'Invalid rival selection task.' }
    }

    const requiredKeys = analyzeRequirements([
      ...(task.requirements || []),
      ...(task.criteria || []),
    ])
    if (!requiredKeys.includes('completedTasks')) {
      requiredKeys.push('completedTasks')
    }

    const userData = await getGameUserData(freshUser, requiredKeys)
    if (!checkTaskRequirements(userData, task)) {
      return { success: false, error: 'Requirements not met' }
    }
    if (!checkTaskCriteria(userData, task)) {
      return { success: false, error: 'Criteria not met' }
    }

    const completedTasks = { ...(await getUserCompletedTasksMap(payload as any, freshUser.id)) }
    const existingCompletion = completedTasks[taskId]
    const now = new Date().toISOString()

    if (existingCompletion && !task.repeatable) {
      return { success: false, error: 'Rival selection is already complete.' }
    }

    completedTasks[taskId] = {
      count: (existingCompletion?.count || 0) + 1,
      completedAt: existingCompletion?.completedAt || now,
      updatedAt: now,
    }
    completedTasksToSave = completedTasks
  }

  const writes: Promise<any>[] = [
    payload.update({
      collection: 'users',
      id: freshUser.id,
      data: updateData,
    }),
  ]

  if (completedTasksToSave) {
    writes.push(setUserCompletedTasksMap(payload as any, freshUser.id, completedTasksToSave))
  }

  await Promise.all(writes)

  if (taskId) {
    await recordExpeditionActivityResult(freshUser.id, 'task', taskId, true)
  }

  revalidatePath('/game')
  revalidatePath('/game/explore')

  return {
    success: true,
    rivalName: rivalUser.trainerName || 'Rival',
  }
}
