//
// Rhythm Game
// Match icons as they move across a track to a shadow target
//

import { BaseGameConfig, TaskIcon } from '../shared'

export interface RhythmIcon extends TaskIcon {
  label?: string // Optional display label
}

export interface RhythmGameSettings {
  icons: RhythmIcon[] // Pool of icons to use
  speed: number // Pixels per second (delta-time based)
  spawnRate: { min: number; max: number } // Seconds between spawns
  timeLimit: number // Game duration in seconds
  winScore?: number // Score threshold for rewards
  winRate?: number // Required wins (default 5, set to 1 for single round)
  endless?: {
    enabled: boolean
    milestones: EndlessMilestone[]
    repeatingRewards?: EndlessRepeatingReward[]
  }
}

export interface EndlessMilestone {
  score: number
  rewards: import('@/data/types').LocationReward[]
}

export interface EndlessRepeatingReward {
  everyScore: number
  random?: boolean
  rewards: import('@/data/types').LocationReward[]
}

export interface RhythmConfig extends BaseGameConfig {
  settings: RhythmGameSettings
}
