import { BaseGameConfig, TaskIcon } from '../shared'
import { LocationReward } from '@/data/types'

export type PachinkoCurrencyType =
  | 'crystals'
  | 'mega-shards'
  | 'pokedollars'
  | 'battle-points'
  | 'berry-powder'
  | 'prof-scrip'
  | 'league-ticket'

export interface PachinkoPeg {
  x: number
  y: number
  radius?: number // Override default
  isBouncer?: boolean // High bounce
}

export interface PachinkoBucket {
  id: string
  x: number
  y: number
  width: number
  height: number
  label?: string
  color?: string
  icon?: TaskIcon
  rewards: LocationReward[]
}

export interface PachinkoObstacle {
  x: number
  y: number
  width: number
  height: number
  angle?: number
  isStatic?: boolean
  bounce?: number
  friction?: number
}

export interface PachinkoBoard {
  width: number
  height: number
  pegs: PachinkoPeg[]
  buckets: PachinkoBucket[]
  obstacles?: PachinkoObstacle[] // Walls, spinners, etc.
  wallBounciness?: number
}

export interface PachinkoGameSettings {
  board: PachinkoBoard
  cost?: {
    currencyType: PachinkoCurrencyType
    amount: number
  }
  ballRadius?: number
  ballBounciness?: number
  gravityScale?: number // 1.0 is default matter.js gravity
  background?: string
  themeColour?: string // Hex color for theming (buttons, pegs, buckets, arrow)
}

export interface PachinkoGameConfig extends BaseGameConfig {
  gameType: 'pachinko'
  settings: PachinkoGameSettings
}
