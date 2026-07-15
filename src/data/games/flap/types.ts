import { BaseGameConfig, SpriteConfig, ParallaxLayer, SideScrollerSceneConfig } from '../shared'
import { LocationReward } from '@/data/types'

export interface EndlessMilestone {
  score: number
  rewards: LocationReward[]
}

export interface EndlessRepeatingReward {
  everyScore: number
  random?: boolean
  rewards: LocationReward[]
}

export interface FlapGameConfig extends BaseGameConfig {
  settings: {
    winScore?: number // Score needed to win (optional for endless mode)
    speed: number // Horizontal scroll speed (pixels per second)
    winRate?: number // Number of wins required
    sprite: string | SpriteConfig // URL to player sprite or config
    parallaxLayers: ParallaxLayer[] // Background layers
    scene?: SideScrollerSceneConfig
    timeLimit?: number // Optional time limit
    // Flap-specific physics
    gravity: number // Downward acceleration per frame
    flapForce: number // Upward velocity on flap
    terminalVelocity?: number // Max fall speed (optional)
    // Obstacle configuration
    wallGap: { min: number; max: number } // Gap size in pixels
    wallFrequency: { min: number; max: number } // Frames between wall spawns
    wallWidth?: number // Width of wall obstacles in pixels
    wallSprite: string // URL for wall sprite
    enemyFrequency: { min: number; max: number } // Frames between enemy spawns
    enemySprite: string | SpriteConfig // URL for flying enemy sprite
    enemySize?: number // Size of enemy in pixels
    // Endless mode
    endless?: {
      enabled: boolean
      milestones: EndlessMilestone[]
      repeatingRewards?: EndlessRepeatingReward[]
    }
  }
}
