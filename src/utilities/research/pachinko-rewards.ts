import type { LocationReward } from '@/data/types'

export function splitGuaranteedPachinkoCurrencyRewards(
  rewards: LocationReward[],
  currencyType: string,
) {
  let guaranteedCurrencyPayout = 0
  const deferredRewards: LocationReward[] = []

  for (const reward of rewards) {
    const isGuaranteedSettlementCurrency =
      reward.type === 'currency' &&
      reward.targetId === currencyType &&
      typeof reward.quantity === 'number' &&
      Number.isFinite(reward.quantity) &&
      reward.quantity > 0 &&
      (reward.dropChance ?? 100) >= 100 &&
      !reward.requirements?.length

    if (isGuaranteedSettlementCurrency) {
      guaranteedCurrencyPayout += reward.quantity as number
    } else {
      deferredRewards.push(reward)
    }
  }

  return {
    guaranteedCurrencyPayout,
    deferredRewards,
  }
}
