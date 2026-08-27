import type { LocationReward } from '@/data/types'
import type { BaseGameConfig, EndlessScoreInterval } from '../shared'

export interface SurfObstacleConfig {
  sprite: string
  width: number
  height: number
  weight?: number
  minDifficulty?: number
  collisionScale?: number
}

export interface SurfGameSettings {
  speed: number
  maxSpeed?: number
  acceleration?: number
  steeringSpeed: number
  difficulty: number
  sprite: string
  playerWidth?: number
  playerHeight?: number
  obstacleFrequency: { min: number; max: number }
  obstacles: SurfObstacleConfig[]
  scene: {
    backdrop: string
    parallax?: {
      islands: string
      cloudsFar: string
      cloudsNear: string
      horizonY?: number
    }
  }
  winScore?: number
  timeLimit?: number
  endless?: {
    enabled: boolean
    milestones: Array<{ score: number; rewards: LocationReward[] }>
    repeatingRewards?: Array<{
      everyScore: EndlessScoreInterval
      random?: boolean
      rewards: LocationReward[]
    }>
  }
}

export interface SurfGameConfig extends BaseGameConfig {
  settings: SurfGameSettings
}
