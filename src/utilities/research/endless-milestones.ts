import type { Reward } from '@/utilities/rewards/reward-logic'

export interface EndlessMilestone {
  score: number
  rewards?: Reward[]
}

export interface EndlessRepeatingReward {
  everyScore: number
  random?: boolean
  rewards?: Reward[]
}

export function normalizeFinalScore(score: number | undefined): number | null {
  if (typeof score !== 'number' || !Number.isFinite(score)) return null
  return Math.max(0, Math.floor(score))
}

export function getLowestMilestoneScore(milestones: EndlessMilestone[]): number | null {
  if (milestones.length === 0) return null
  return Math.min(...milestones.map((milestone) => milestone.score))
}

export function getLowestEndlessRewardScore(params: {
  milestones?: EndlessMilestone[]
  repeatingRewards?: EndlessRepeatingReward[]
}): number | null {
  const scores = [
    ...(params.milestones || []).map((milestone) => milestone.score),
    ...(params.repeatingRewards || []).map((reward) => reward.everyScore),
  ].filter((score) => Number.isFinite(score) && score > 0)

  if (scores.length === 0) return null
  return Math.min(...scores)
}

export function getAchievedUnclaimedMilestones(
  milestones: EndlessMilestone[],
  finalScore: number | undefined,
  claimedScores: number[] = [],
): EndlessMilestone[] {
  const normalizedScore = normalizeFinalScore(finalScore)
  if (normalizedScore === null) return []

  const claimed = new Set(claimedScores)
  return milestones
    .filter((milestone) => normalizedScore >= milestone.score && !claimed.has(milestone.score))
    .sort((a, b) => a.score - b.score)
}

function multiplyRewardQuantity(
  quantity: Reward['quantity'],
  multiplier: number,
): Reward['quantity'] {
  if (typeof quantity === 'number') return quantity * multiplier
  if (quantity && typeof quantity === 'object') {
    return {
      min: quantity.min * multiplier,
      max: quantity.max * multiplier,
    }
  }
  return multiplier
}

export function getEarnedRepeatingRewards(
  repeatingRewards: EndlessRepeatingReward[],
  finalScore: number | undefined,
): Reward[] {
  const normalizedScore = normalizeFinalScore(finalScore)
  if (normalizedScore === null) return []

  return repeatingRewards.flatMap((entry) => {
    if (entry.random) return []
    if (!Number.isFinite(entry.everyScore) || entry.everyScore <= 0) return []
    const multiplier = Math.floor(normalizedScore / entry.everyScore)
    if (multiplier <= 0) return []

    return (entry.rewards || []).map((reward) => ({
      ...reward,
      quantity: multiplyRewardQuantity(reward.quantity, multiplier),
    }))
  })
}

export function getEarnedRandomRepeatingRewards(params: {
  repeatingRewards: EndlessRepeatingReward[]
  finalScore: number | undefined
  collectedRewards?: Record<string, number>
}): Reward[] {
  const normalizedScore = normalizeFinalScore(params.finalScore)
  if (normalizedScore === null) return []

  const collectedRewards = params.collectedRewards || {}

  return params.repeatingRewards.flatMap((entry, entryIndex) => {
    if (!entry.random || !Number.isFinite(entry.everyScore) || entry.everyScore <= 0) {
      return []
    }

    const maxCollectibleCount = Math.floor(normalizedScore / (entry.everyScore * 0.75))
    if (maxCollectibleCount <= 0) return []

    return (entry.rewards || []).flatMap((reward, rewardIndex) => {
      const key = `${entryIndex}:${rewardIndex}`
      const collectedCount = Math.min(
        Math.max(0, Math.floor(collectedRewards[key] || 0)),
        maxCollectibleCount,
      )
      if (collectedCount <= 0) return []

      return {
        ...reward,
        quantity: multiplyRewardQuantity(reward.quantity, collectedCount),
        dropChance: 100,
      }
    })
  })
}

export function getMaxAllowedEndlessScore(
  gameType: string,
  settings: Record<string, any>,
  elapsedSeconds: number,
): number | null {
  if (!Number.isFinite(elapsedSeconds) || elapsedSeconds < 0) return 0

  if (gameType === 'match3') {
    return null
  }

  if (gameType === 'rhythm') {
    const minSpawnRate = settings.spawnRate?.min || 1
    return (elapsedSeconds / minSpawnRate) * 30 * 1.5
  }

  const scorePerSecond = 10
  return elapsedSeconds * scorePerSecond * 1.5
}
