'use server'

import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import type { Task, TaskCondition } from '@/data/tasks/types'

export type DailyProgressType = 'daily_catch' | 'daily_battle' | 'daily_card' | 'daily_crystalize'

/**
 * Increments the explicit progress property for dynamic daily tasks inside the User payload's activeDailyTasks array.
 */
export async function incrementDailyTaskProgress(
  userId: string,
  progressType: DailyProgressType,
  amount: number = 1,
  metadata?: {
    speciesId?: number
    types?: string[]
    isTrainer?: boolean
  },
): Promise<{ success: boolean; completedTaskIds?: string[] }> {
  try {
    const payload = await getPayload({ config: payloadConfig })
    const user = await payload.findByID({ collection: 'users', id: userId })

    // Using any internally due to payload generic type generation limits
    const activeTasks = ((user as any).activeDailyTasks as any[]) || []

    if (activeTasks.length === 0) return { success: false }

    let updated = false
    const completedTaskIds: string[] = []

    // Map through the active structure. Tasks contain requirements/criteria arrays
    // where objects are of type TaskCondition
    const updatedTasks = activeTasks.map((task: any) => {
      // Create a shallow copy to prevent mutation bugs
      const t = { ...task }

      const criteria = t.criteria || []
      const updatedCriteria = criteria.map((crit: any) => {
        if (crit.type === progressType) {
          // Filtering logic
          if (progressType === 'daily_catch' && metadata) {
            // Check species if required
            if (
              crit.pokemonCriteria?.speciesId &&
              crit.pokemonCriteria.speciesId !== metadata.speciesId
            ) {
              return crit
            }
            // Check type if required
            if (crit.pokemonCriteria?.type && metadata.types) {
              const normalizedTypes = metadata.types.map((ty: string) => ty.toLowerCase())
              if (!normalizedTypes.includes(crit.pokemonCriteria.type.toLowerCase())) {
                return crit
              }
            }
          }

          if (progressType === 'daily_battle' && metadata) {
            if (crit.battleType === 'wild' && metadata.isTrainer) {
              return crit
            }
            if (crit.battleType === 'trainer' && !metadata.isTrainer) {
              return crit
            }
          }

          const newProgress = (crit.progress || 0) + amount
          const isComplete = newProgress >= (crit.count || 1)

          updated = true
          // If we just pushed it over the edge to completion on this update event
          if (isComplete && (crit.progress || 0) < (crit.count || 1)) {
            completedTaskIds.push(t.id)
          }

          return { ...crit, progress: newProgress }
        }
        return crit
      })

      t.criteria = updatedCriteria
      return t
    })

    if (!updated) return { success: false }

    await payload.update({
      collection: 'users',
      id: userId,
      data: {
        activeDailyTasks: updatedTasks,
      } as any, // Cast to any due to custom JSON types
    })

    return { success: true, completedTaskIds }
  } catch (error) {
    console.error(`Failed to increment daily task progress for ${progressType}:`, error)
    return { success: false }
  }
}
