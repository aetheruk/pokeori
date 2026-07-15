import { Task } from '@/data/tasks'
import {
  checkRequirement,
  getRequirementProgress,
  isPokemonEligible,
  RequirementData,
} from '@/utilities/requirements'
import { isToday } from '@/utilities/date-utils'

export type UserTaskData = RequirementData

// Re-export for backward compatibility if needed, or just use checkRequirement directly
export const checkCondition = checkRequirement
export { checkRequirement, isPokemonEligible }

export function checkTaskRequirements(data: UserTaskData, task: Task): boolean {
  return task.requirements.every((req) =>
    checkRequirement(data, req, { category: task.category, subCategory: task.subCategory }),
  )
}

export function checkTaskCriteria(data: UserTaskData, task: Task): boolean {
  return task.criteria.every((crit) =>
    checkRequirement(data, crit, { category: task.category, subCategory: task.subCategory }),
  )
}

export function getTaskProgress(data: UserTaskData, task: Task) {
  const { completedTasks } = data
  const existingCompletion = completedTasks.find((t) => t.taskId === task.id)

  const criteriaProgress = task.criteria.map((crit) => {
    const progress = getRequirementProgress(data, crit, {
      category: task.category,
      subCategory: task.subCategory,
    })
    return {
      ...crit,
      ...progress,
    }
  })

  const criteriaMet = criteriaProgress.every((p) => p.completed)

  // For generated daily tasks, check the `completed` flag set by the daily task system
  // For static tasks, use the standard completion record
  let isCompleted = false
  if ((task as any).completed) {
    // Generated daily task marked as completed
    isCompleted = true
  } else if (task.daily) {
    // Static daily task: check if a daily_not_completed requirement exists and is NOT met
    const hasDailyReq = task.requirements.some((r) => r.type === 'daily_not_completed')
    if (hasDailyReq) {
      isCompleted = !task.requirements
        .filter((r) => r.type === 'daily_not_completed')
        .every((r) =>
          checkRequirement(data, r, { category: task.category, subCategory: task.subCategory }),
        )
    } else {
      // Fallback for daily tasks: only consider completed if it happened today
      isCompleted =
        !!existingCompletion &&
        isToday(existingCompletion.updatedAt || existingCompletion.completedAt)
    }
  } else {
    isCompleted = !!existingCompletion
  }

  return { criteriaProgress, isCompleted, criteriaMet }
}
