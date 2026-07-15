import { BaseGameConfig } from '../shared'

export interface MagnemiteCircuitPosition {
  x: number
  y: number
}

export interface MagnemiteCircuitTarget extends MagnemiteCircuitPosition {
  formId?: string
  sprite?: string
}

export type MagnemiteCircuitTileType = 'straight' | 'corner' | 'tee' | 'cross'

export interface MagnemiteCircuitTile extends MagnemiteCircuitPosition {
  type: MagnemiteCircuitTileType
  rotation?: number
  locked?: boolean
}

export interface MagnemiteCircuitSettings {
  gridSize: {
    cols: number
    rows: number
  }
  source: MagnemiteCircuitPosition
  targets: MagnemiteCircuitTarget[]
  tiles: MagnemiteCircuitTile[]
  timeLimit?: number
  maxRotations?: number
  winRate?: number
  themeColour?: string
  background?: string
}

export interface MagnemiteCircuitGameConfig extends BaseGameConfig {
  settings: MagnemiteCircuitSettings
}
