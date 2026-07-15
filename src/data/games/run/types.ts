import { BaseGameConfig, SpriteConfig, ParallaxLayer, SideScrollerSceneConfig } from '../shared'
import { LocationReward } from '@/data/types'

export type { SpriteConfig, ParallaxLayer }

export interface EndlessMilestone {
  score: number
  rewards: LocationReward[]
}

export interface EndlessRepeatingReward {
  everyScore: number
  random?: boolean
  rewards: LocationReward[]
}

export interface ObstacleConfig {
  sprite: string
  spriteConfig?: SpriteConfig // Optional sprite sheet config
  width?: number // Defaults to 30
  height?: number // Defaults to 40
  spawnRate: { min: number; max: number } // Frames between spawns for this obstacle type
}

export interface RunGameConfig extends BaseGameConfig {
  settings: {
    winScore?: number // Score needed to win (optional for endless mode)
    speed: number // Base game speed (pixels per second)
    winRate?: number // Number of wins required (1 for one-shot games)
    sprite: string // URL to running sprite (fallback)
    player?: SpriteConfig // Player sprite configuration
    jumpSprite?: string // Optional URL for jump sprite
    // Separate obstacle configs
    groundObstacle: ObstacleConfig
    aerialObstacle?: ObstacleConfig // Optional - if not provided, no aerial obstacles
    parallaxLayers: ParallaxLayer[] // Background layers
    scene?: SideScrollerSceneConfig
    timeLimit?: number // Optional time limit
    endless?: {
      enabled: boolean
      milestones: EndlessMilestone[]
      repeatingRewards?: EndlessRepeatingReward[]
    }
  }
}
