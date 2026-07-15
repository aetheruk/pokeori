import { BaseGameConfig } from '../shared'
import { LocationReward, TaskIcon } from '@/data/types'

export interface SlotSymbol {
  id: string
  icon: TaskIcon
  weight?: number // Frequency for visual distribution in random spins
}

export interface SlotPayline {
  icons: string[] // The 3 icon IDs that must match
  rewards: LocationReward[]
  weight: number // Relative weight of this outcome vs others
}

export interface SlotGameSettings {
  symbols: SlotSymbol[]
  paytable: SlotPayline[]
  cost: {
    currencyType:
      | 'crystals'
      | 'mega-shards'
      | 'pokedollars'
      | 'battle-points'
      | 'berry-powder'
      | 'prof-scrip'
      | 'league-ticket'
    amount: number
  }
  timeLimit?: number // Seconds
  winRate?: number | { min: number; max: number } // Percentage chance to win (0-100) or a range to roll once per session
  // Visual settings
  backgroundImage?: string
  machineTheme?: 'classic' | 'modern' | 'neon'
  themeColour?: string // Hex color for theming (buttons, payline, border)
}

export interface SlotGameConfig extends BaseGameConfig {
  settings: SlotGameSettings
}
