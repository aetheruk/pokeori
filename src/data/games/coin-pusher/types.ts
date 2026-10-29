import type { BaseGameConfig, LocationReward, TaskIcon } from '../shared'
import type { PachinkoCurrencyType } from '../pachinko/types'

export interface CoinPusherPrize {
  id: string
  weight: number
  icon: TaskIcon
  rewards: LocationReward[]
}

export interface CoinPusherSettings {
  cost: { currencyType: PachinkoCurrencyType; amount: number }
  payout: { currencyType: PachinkoCurrencyType; amount: number }
  prizePool: CoinPusherPrize[]
  /** Probability of adding a bubble for each paid drop, between 0 and 1. */
  bubbleChance: number
  maxBubbles: number
}

export interface CoinPusherGameConfig extends BaseGameConfig {
  gameType: 'coin-pusher'
  settings: CoinPusherSettings
}
