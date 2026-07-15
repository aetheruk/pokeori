import { BaseGameConfig, TaskIcon } from '../shared'
import { Reward } from '@/utilities/rewards/reward-logic'

export interface PrizeWheelSlot {
  id: string
  label: string
  color: string // Hex or Tailwind class
  icon?: TaskIcon | string
  percentage: number // 0-100, should sum to 100
  rewards: Reward[]
}

export interface PrizeWheelGameConfig extends BaseGameConfig {
  gameType: 'prize-wheel'
  settings: {
    slots: PrizeWheelSlot[]
    spinTime: {
      min: number // seconds
      max: number // seconds
    }
    background?: string
    themeColour?: string // Hex color for wheel theming (border, buttons, etc.)
    cost?: {
      amount: number
      currencyType:
        | 'crystals'
        | 'mega-shards'
        | 'pokedollars'
        | 'battle-points'
        | 'berry-powder'
        | 'prof-scrip'
        | 'league-ticket'
    }
  }
}
