import { items } from '@/data/items'
import type { Reward } from '@/data/types'
import {
  checkRequirement,
  type RequirementData,
} from '@/utilities/requirements'

export interface ScratchCardRewardConfig {
  chance: number
  reward?: Reward[]
}

export interface ScratchCardRewardState {
  inventory: Record<string, number>
  unlockedBanners?: unknown
  unlockedIcons?: unknown
  unlockedTitles?: unknown
}

function hasUnlocked(
  unlocks: unknown,
  targetId: string,
  defaultId: string,
) {
  const storedUnlocks = Array.isArray(unlocks)
    ? unlocks.filter((unlock): unlock is string => typeof unlock === 'string')
    : []
  return new Set([defaultId, ...storedUnlocks]).has(targetId)
}

function isOneTimeRewardClaimed(
  reward: Reward,
  state: ScratchCardRewardState,
) {
  if (!reward.targetId) return false

  const targetId = reward.targetId.toString()

  if (reward.type === 'item') {
    const item = items.find((entry) => entry.id === targetId)
    return item?.unique === true && (state.inventory[targetId] || 0) > 0
  }

  if (reward.type === 'banner') {
    return hasUnlocked(state.unlockedBanners, targetId, 'lab')
  }

  if (reward.type === 'icon') {
    return hasUnlocked(state.unlockedIcons, targetId, 'trainer-red')
  }

  if (reward.type === 'title') {
    return hasUnlocked(state.unlockedTitles, targetId, 'new-beginnings')
  }

  return false
}

export function isScratchCardRewardConfigEligible(
  rewardConfig: ScratchCardRewardConfig,
  state: ScratchCardRewardState,
  requirementData: RequirementData,
) {
  const rewards = rewardConfig.reward || []

  // If a prize contains a one-time reward alongside repeatable rewards,
  // remove the whole outcome so the player never sees a partial prize.
  if (rewards.some((reward) => isOneTimeRewardClaimed(reward, state))) {
    return false
  }

  if (rewards.length === 0) return true

  return rewards.some((reward) => {
    if (!reward.requirements || reward.requirements.length === 0) {
      return true
    }

    return reward.requirements.every((requirement) =>
      checkRequirement(requirementData, requirement),
    )
  })
}

export function getEligibleScratchCardRewards<T extends ScratchCardRewardConfig>(
  rewards: T[],
  state: ScratchCardRewardState,
  requirementData: RequirementData,
) {
  return rewards.filter((rewardConfig) =>
    isScratchCardRewardConfigEligible(rewardConfig, state, requirementData),
  )
}

export function selectScratchCardReward<T extends ScratchCardRewardConfig>(
  rewards: T[],
  roll: number,
) {
  if (rewards.length === 0) return undefined

  const totalChance = rewards.reduce(
    (total, reward) =>
      total + (Number.isFinite(reward.chance) ? Math.max(reward.chance, 0) : 0),
    0,
  )
  if (totalChance <= 0) return undefined

  let cumulative = 0
  const normalizedRoll = Math.min(Math.max(roll, 0), 0.999999999) * totalChance

  for (const reward of rewards) {
    cumulative += Math.max(reward.chance, 0)
    if (normalizedRoll < cumulative) return reward
  }

  return rewards[rewards.length - 1]
}
