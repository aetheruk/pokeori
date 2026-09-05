import type { LocationReward } from '@/data/types'
import type { BaseGameConfig, EndlessScoreInterval } from '../shared'

export type BrickBreakerLayoutCell = '.' | '1' | '2' | '3' | '#'

export interface BrickBreakerGameSettings {
  playfield: { width: number; height: number }
  layout: string[]
  brickGap: number
  boardPadding: number
  boardTop: number
  paddle: { width: number; height: number; speed: number }
  ball: {
    radius: number
    initialSpeed: number
    maxSpeed: number
    accelerationPerHit: number
  }
  lives: number
  pointsPerHit: number
  rewardLifetimeMs?: number
  timeLimit?: number
  endless?: {
    enabled: boolean
    waveSpeedIncrease?: number
    milestones: Array<{ score: number; rewards: LocationReward[] }>
    repeatingRewards?: Array<{
      everyScore: EndlessScoreInterval
      random?: boolean
      rewards: LocationReward[]
    }>
  }
}

export interface BrickBreakerGameConfig extends BaseGameConfig {
  gameType?: 'brick-breaker'
  settings: BrickBreakerGameSettings
}
