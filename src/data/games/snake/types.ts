import type { LocationReward } from '@/data/types'
import type { BaseGameConfig, EndlessScoreInterval } from '../shared'

export type SnakeDirection = 'up' | 'down' | 'left' | 'right'

export interface SnakePosition {
  x: number
  y: number
}

export interface SnakeMilestone {
  score: number
  rewards: LocationReward[]
}

export interface SnakeRepeatingReward {
  everyScore: EndlessScoreInterval
  random?: boolean
  rewards: LocationReward[]
}

export interface SnakeGameSettings {
  gridSize: { columns: number; rows: number }
  initialLength: number
  initialPosition: SnakePosition
  initialDirection: SnakeDirection
  tickMs: number
  speedUpEvery: number
  speedUpByMs: number
  minTickMs: number
  foodScore: number
  wrapBoundaries?: boolean
  walls?: SnakePosition[]
  sprites: {
    head: string
    body: string
    tail: string
    food?: string
  }
  rewardLifetimeMs?: number
  winScore?: number
  timeLimit?: number
  endless?: {
    enabled: boolean
    milestones: SnakeMilestone[]
    repeatingRewards?: SnakeRepeatingReward[]
  }
}

export interface SnakeGameConfig extends BaseGameConfig {
  gameType: 'snake'
  settings: SnakeGameSettings
}
