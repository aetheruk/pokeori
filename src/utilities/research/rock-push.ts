import type {
  RockPushPrizeSquare,
  RockPushPosition,
} from '@/data/games/rock-push/types'
import type { LocationReward } from '@/data/types'

export const getRockPushPositionKey = (position: RockPushPosition) =>
  `${position.x},${position.y}`

export const getRockPushPrizeId = (prize: RockPushPrizeSquare, index: number) =>
  prize.id || `prize-${index}`

export const getRockPushScopedPrizeId = (
  prize: RockPushPrizeSquare,
  index: number,
  screenId?: string,
) => {
  const prizeId = getRockPushPrizeId(prize, index)
  return screenId ? `${screenId}:${prizeId}` : prizeId
}

export const getRockPushPrizeReward = (
  prize: RockPushPrizeSquare,
): LocationReward => {
  if (prize.reward) return { ...prize.reward, dropChance: 100 }

  return {
    type: 'item',
    targetId: prize.itemId,
    quantity: prize.quantity || 1,
    dropChance: 100,
  }
}
