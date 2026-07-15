import type { BaseGameConfig } from '../shared'

export interface SlidingPuzzleSettings {
  pokemonPool: number[]
  timeLimit: number
  winRate: number
  image?: string
  gridSize?: number // 3 for 3x3, 4 for 4x4, 5 for 5x5 (default: 4)
  shuffleMoves?: number // How many random moves to shuffle (default: 100)
  death?: boolean
  lose_points?: number
}

export interface SlidingPuzzleConfig extends BaseGameConfig {
  settings: SlidingPuzzleSettings
}
