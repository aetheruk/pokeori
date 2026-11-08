import { BaseGameConfig, TaskCondition, TaskIcon } from '../shared'
import { Reward } from '@/utilities/rewards/reward-logic'

export interface PrizeWheelSlot {
  id: string
  label: string
  color: string // Hex or Tailwind class
  icon?: TaskIcon | string
  percentage: number // Raw weight, or resolved percent in an active wheel session.
  /** Preserve this exact chance while other slots share the remaining odds. */
  fixedPercentage?: number
  /** Split one category's weight across the eligible slots in this group. */
  weightGroup?: { id: string; weight: number }
  requirements?: TaskCondition[]
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
    showSlotLabels?: boolean // Defaults to true; labels remain available to assistive technology.
    cost?: {
      amount: number
      currencyType:
        | 'crystals'
        | 'mega-shards'
        | 'pokedollars'
        | 'fun-tokens'
        | 'battle-points'
        | 'berry-powder'
        | 'prof-scrip'
        | 'league-ticket'
    }
  }
}
