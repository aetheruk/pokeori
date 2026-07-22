'use server'

import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import {
  acquireActionLock,
  releaseActionLock,
} from '@/utilities/game-integrity'
import type { DailyActivityKind } from '@/data/tasks/types'

export type DailyProgressType =
  | 'daily_catch'
  | 'daily_battle'
  | 'daily_card'
  | 'daily_crystalize'

export type DailyActivityEvent = {
  kind: DailyActivityKind
  amount?: number
  sourceId?: string
  speciesId?: number
  types?: string[]
  isTrainer?: boolean
  legacyType?: DailyProgressType
}

export type DailyProgressMetadata = Pick<
  DailyActivityEvent,
  'sourceId' | 'speciesId' | 'types' | 'isTrainer'
>

function matchesCatchCriteria(criterion: any, event: DailyActivityEvent) {
  if (criterion.pokemonCriteria?.speciesId && criterion.pokemonCriteria.speciesId !== event.speciesId) {
    return false
  }

  if (criterion.pokemonCriteria?.type) {
    const normalizedTypes = (event.types || []).map((type) => type.toLowerCase())
    if (!normalizedTypes.includes(criterion.pokemonCriteria.type.toLowerCase())) return false
  }

  return true
}

function matchesBattleCriteria(criterion: any, event: DailyActivityEvent) {
  if (criterion.battleType === 'wild' && event.isTrainer) return false
  if (criterion.battleType === 'trainer' && !event.isTrainer) return false
  return true
}

function matchesCriterion(criterion: any, event: DailyActivityEvent) {
  if (criterion.type === 'daily_activity') {
    if (criterion.dailyActivity?.kind !== event.kind) return false
    const sourceIds = criterion.dailyActivity?.sourceIds
    if (sourceIds?.length && (!event.sourceId || !sourceIds.includes(event.sourceId))) return false
    if (event.kind === 'catch' || event.kind === 'fishing_catch') {
      return matchesCatchCriteria(criterion, event)
    }
    if (event.kind === 'battle_win') return matchesBattleCriteria(criterion, event)
    return true
  }

  if (!event.legacyType || criterion.type !== event.legacyType) return false
  if (event.legacyType === 'daily_catch') return matchesCatchCriteria(criterion, event)
  if (event.legacyType === 'daily_battle') return matchesBattleCriteria(criterion, event)
  return true
}

/**
 * Records a successful player activity against every matching generated daily.
 * The user-scoped lock prevents simultaneous game actions from overwriting each
 * other's activeDailyTasks progress snapshot.
 */
export async function recordDailyActivityProgress(
  userId: string,
  event: DailyActivityEvent,
): Promise<{ success: boolean; completedTaskIds?: string[] }> {
  const lock = await acquireActionLock(`lock:daily-progress:${userId}`, 5)
  if (!lock.acquired) return { success: false }

  try {
    const payload = await getPayload({ config: payloadConfig })
    const user = await payload.findByID({ collection: 'users', id: userId })
    const activeTasks = ((user as any).activeDailyTasks as any[]) || []
    if (activeTasks.length === 0) return { success: false }

    let updated = false
    const completedTaskIds = new Set<string>()
    const amount = Math.max(1, Math.floor(event.amount || 1))

    const updatedTasks = activeTasks.map((task: any) => {
      if (task.completed) return task

      const criteria = task.criteria || []
      const updatedCriteria = criteria.map((criterion: any) => {
        if (!matchesCriterion(criterion, event)) return criterion

        const previousProgress = criterion.progress || 0
        const target = criterion.count || 1
        const nextProgress = Math.min(target, previousProgress + amount)
        updated = true

        if (nextProgress >= target && previousProgress < target) {
          completedTaskIds.add(task.id)
        }

        return { ...criterion, progress: nextProgress }
      })

      return { ...task, criteria: updatedCriteria }
    })

    if (!updated) return { success: false }

    await payload.update({
      collection: 'users',
      id: userId,
      data: { activeDailyTasks: updatedTasks } as any,
    })

    return { success: true, completedTaskIds: Array.from(completedTaskIds) }
  } catch (error) {
    console.error(`Failed to record daily activity progress for ${event.kind}:`, error)
    return { success: false }
  } finally {
    await releaseActionLock(lock)
  }
}

/** Backwards-compatible entry point for existing catch, battle, and TCG actions. */
export async function incrementDailyTaskProgress(
  userId: string,
  progressType: DailyProgressType,
  amount: number = 1,
  metadata?: DailyProgressMetadata,
): Promise<{ success: boolean; completedTaskIds?: string[] }> {
  const kindByLegacyType: Record<DailyProgressType, DailyActivityKind> = {
    daily_catch: 'catch',
    daily_battle: 'battle_win',
    daily_card: 'card_collected',
    daily_crystalize: 'card_crystalized',
  }

  return recordDailyActivityProgress(userId, {
    kind: kindByLegacyType[progressType],
    legacyType: progressType,
    amount,
    ...metadata,
  })
}
