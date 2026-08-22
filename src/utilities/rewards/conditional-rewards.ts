import type { Reward, TaskCondition } from '@/data/types'
import {
  checkRequirement,
  type RequirementData,
} from '@/utilities/requirements'

export function isRewardEligible(
  reward: Pick<Reward, 'requirements'>,
  userData: RequirementData,
  context?: { category?: string; subCategory?: string },
) {
  return (
    !reward.requirements?.length ||
    reward.requirements.every((condition: TaskCondition) =>
      checkRequirement(userData, condition, context),
    )
  )
}

export function filterEligibleRewards(
  rewards: Reward[],
  userData: RequirementData,
  context?: { category?: string; subCategory?: string },
) {
  return rewards.filter((reward) => isRewardEligible(reward, userData, context))
}
