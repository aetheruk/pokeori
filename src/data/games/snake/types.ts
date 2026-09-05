import type { LocationReward } from '@/data/types'
import type { BaseGameConfig, EndlessScoreInterval } from '../shared'

export interface SnakePosition {
  x: number
  y: number
}

export interface SnakeObstacle extends SnakePosition {
  radius: number
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
  /** Coordinate space used by the responsive scene renderer. */
  playfield: { width: number; height: number }
  initialLength: number
  initialPosition: SnakePosition
  /** Initial travel angle in degrees. Zero points right. */
  initialHeading: number
  segmentSpacing: number
  moveSpeed: number
  maxSpeed: number
  speedUpEvery: number
  speedUpBy: number
  /** Maximum steering speed in degrees per second. */
  turnRate: number
  headRadius: number
  bodyRadius: number
  foodRadius: number
  rewardRadius: number
  /** Minimum centre-to-centre distance between the head and a new pickup. */
  minimumSpawnDistance: number
  foodScore: number
  wrapBoundaries?: boolean
  obstacles?: SnakeObstacle[]
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
