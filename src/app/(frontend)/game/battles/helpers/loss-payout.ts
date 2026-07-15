import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { User } from '@/payload-types'
import type { BattleConfig, LocationReward } from '@/data/types'
import type { BattleState } from '@/utilities/battle/types'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'

function buildPokedollarLossSummary(amountLost: number): RewardSummary {
  return {
    xp: {},
    items: [],
    pokemon: [],
    currency: [{ type: 'pokedollars', quantity: -amountLost }],
    cards: [],
    tasksCompleted: [],
    banners: [],
    icons: [],
    titles: [],
    upgrades: [],
  }
}

function getNumericPokedollarReward(reward: LocationReward): number {
  if (reward.type !== 'currency' || reward.targetId !== 'pokedollars') {
    return 0
  }
  return typeof reward.quantity === 'number' ? reward.quantity : 0
}

export function buildTrainerBattleLossPayout(
  battleConfig: Pick<
    BattleConfig,
    'disableRewards' | 'isWildBattle' | 'pvp' | 'rewards'
  >,
): number {
  if (
    battleConfig.disableRewards ||
    battleConfig.isWildBattle ||
    battleConfig.pvp
  ) {
    return 0
  }

  const rewardMoney = (battleConfig.rewards || []).reduce(
    (total, reward) => total + getNumericPokedollarReward(reward),
    0,
  )
  return Math.floor(rewardMoney * 0.5)
}

export async function applyTrainerBattleLossPayout(
  state: BattleState,
  user: User,
  battleConfig: BattleConfig,
): Promise<number> {
  if (state.chronicle) return 0

  const payout = buildTrainerBattleLossPayout(battleConfig)
  if (payout <= 0) return 0

  const payload = await getPayload({ config: configPromise })
  const freshUser = await payload.findByID({
    collection: 'users',
    id: user.id,
    depth: 0,
  })
  const currency = { ...((freshUser.currency || {}) as Record<string, number>) }
  const currentPokedollars = currency.pokedollars || 0
  const amountLost = Math.min(currentPokedollars, payout)

  if (amountLost <= 0) return 0

  currency.pokedollars = currentPokedollars - amountLost

  await payload.update({
    collection: 'users',
    id: user.id,
    data: { currency },
  })

  state.rewards = buildPokedollarLossSummary(amountLost)

  return amountLost
}
