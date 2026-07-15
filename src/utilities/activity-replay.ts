import type { User } from '@/payload-types'
import type { TaskCondition } from '@/data/tasks/types'
import type { ExpeditionActivityType } from '@/data/expeditions/types'
import { getGameUserData } from '@/utilities/game-data'
import { checkRequirement } from '@/utilities/requirements'
import { analyzeRequirements } from '@/utilities/requirements/analysis'
import { getActiveExpeditionForUser } from '@/utilities/expeditions/actions'

type ReplayableActivity = {
  id: string
  category?: string
  subCategory?: string
  requirements?: TaskCondition[]
  criteria?: TaskCondition[]
}

function hasUnsupportedReplayConsumption(conditions: TaskCondition[]) {
  return conditions.some((condition) => condition.type === 'pokemon_owned' && condition.consume)
}

export async function isActivityEligibleForReplay(
  user: User,
  activity: ReplayableActivity,
  activityType: ExpeditionActivityType,
) {
  const conditions = [...(activity.requirements || []), ...(activity.criteria || [])]

  if ((activity.category || '').toLowerCase() === 'secret') {
    return false
  }

  if (hasUnsupportedReplayConsumption(conditions)) {
    return false
  }

  if (conditions.length > 0) {
    const requiredKeys = analyzeRequirements(conditions)
    const userData = await getGameUserData(user, requiredKeys)
    const gatesMet = conditions.every((condition) =>
      checkRequirement(userData, condition, {
        category: activity.category,
        subCategory: activity.subCategory,
      }),
    )

    if (!gatesMet) {
      return false
    }
  }

  const activeExpedition = await getActiveExpeditionForUser(user.id)
  const currentExpeditionStep =
    activeExpedition?.status === 'active'
      ? activeExpedition.steps?.[activeExpedition.currentStepIndex]
      : null
  const currentStepType = currentExpeditionStep?.type || 'activity'

  return !(
    currentStepType === 'activity' &&
    currentExpeditionStep?.activityType === activityType &&
    currentExpeditionStep?.activityId === activity.id
  )
}
