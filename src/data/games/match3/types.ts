import { BaseGameConfig } from '../shared'
import { LocationReward, TaskIcon } from '@/data/types'

export interface Match3Crystal {
  id: string
  icon: TaskIcon
  color: string // CSS color for crystal glow/background
  points?: number // Points per crystal matched, overrides default pointsPerMatch
  spawnWeight?: number // Appearance rate (1 = default, 0.5 = 50% less likely, 2 = twice as likely)
}

export interface EndlessMilestone {
  score: number
  rewards: LocationReward[]
}

export interface EndlessRepeatingReward {
  everyScore: number
  random?: boolean
  rewards: LocationReward[]
}

export interface Match3GameSettings {
  gridSize: { cols: number; rows: number }
  crystalTypes: Match3Crystal[]
  timeLimit?: number // Seconds (0 or undefined for no limit in endless)
  winScore?: number // Score needed to win (if not endless mode)
  pointsPerMatch?: number // Points per crystal matched, default 10
  cascadeMultiplier?: number // Multiplier for chain reactions, default 1.5
  themeColour?: string // UI accent color
  background?: string // Background image URL
  endless?: {
    enabled: boolean
    milestones: EndlessMilestone[]
    repeatingRewards?: EndlessRepeatingReward[]
  }
}

export interface Match3GameConfig extends BaseGameConfig {
  settings: Match3GameSettings
}
