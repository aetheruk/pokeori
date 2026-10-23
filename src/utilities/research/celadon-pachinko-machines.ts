import type { PachinkoGameSettings } from '@/data/games/pachinko/types'

export type CeladonPachinkoStakes = 'standard' | 'high'

/**
 * Builds the server-owned board and payout table for one Celadon cabinet.
 * Layout changes stay within a few board units; token prizes vary by at most 8%.
 */
export function getCeladonPachinkoMachineSettings(
  settings: PachinkoGameSettings,
  machineNumber: number,
  stakes: CeladonPachinkoStakes,
): PachinkoGameSettings {
  if (!Number.isInteger(machineNumber) || machineNumber < 1 || machineNumber > 12) {
    return settings
  }

  const stakeMultiplier = stakes === 'high' ? 5 : 1
  const buckets = settings.board.buckets.map((bucket, index) => {
    const positionDelta = ((machineNumber * 3 + index * 2) % 7) - 3
    const widthDelta = ((machineNumber * 3 + index * 2) % 5) - 2
    const payoutPercent =
      1 + (((machineNumber * 7 + index * 3) % 9) - 4) * 0.02

    return {
      ...bucket,
      x: bucket.x + positionDelta,
      width: bucket.width + widthDelta,
      icon:
        stakes === 'high' && bucket.kind === 'jackpot'
          ? { type: 'pokemon' as const, id: '101' }
          : bucket.icon,
      rewards: bucket.rewards.map((reward) => {
        if (
          reward.type !== 'currency' ||
          reward.targetId !== 'fun-tokens' ||
          typeof reward.quantity !== 'number'
        ) {
          return reward
        }

        return {
          ...reward,
          quantity: Math.round(reward.quantity * payoutPercent) * stakeMultiplier,
        }
      }),
    }
  })

  return {
    ...settings,
    board: {
      ...settings.board,
      buckets,
    },
    cost: {
      currencyType: 'fun-tokens',
      amount: stakes === 'high' ? 25 : 5,
    },
    themeColour: stakes === 'high' ? '#15803d' : '#9f1239',
  }
}
