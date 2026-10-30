import type { BaseGameConfig, LocationReward, TaskIcon } from '../shared'
import type { PachinkoCurrencyType } from '../pachinko/types'

export interface CoinPusherPrize {
  id: string
  label: string
  rarity: 'common' | 'uncommon' | 'rare' | 'ultra-rare'
  weight: number
  icon: TaskIcon
  rewards: LocationReward[]
}

export interface CoinPusherSettings {
  cost: { currencyType: PachinkoCurrencyType; amount: number }
  payout: { currencyType: PachinkoCurrencyType; amount: number }
  /** Coin body sizes and relative frequency for the loose coins on the shelves. */
  coinDenominations: {
    bronze: { value: number; weight: number }
    silver: { value: number; weight: number }
    gold: { value: number; weight: number }
  }
  prizePool: CoinPusherPrize[]
  /** Probability of adding a bubble for each paid drop, between 0 and 1. */
  bubbleChance: number
  maxBubbles: number
}

export interface CoinPusherGameConfig extends BaseGameConfig {
  gameType: 'coin-pusher'
  settings: CoinPusherSettings
}
