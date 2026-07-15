import { BaseGameConfig } from '../shared'

export interface RockTunnelEchoPosition {
  x: number
  y: number
}

export interface RockTunnelEchoMapSettings {
  gridSize: {
    cols: number
    rows: number
  }
  playerStart: RockTunnelEchoPosition
  exit: RockTunnelEchoPosition
  walls: RockTunnelEchoPosition[]
  holes?: RockTunnelEchoPosition[]
  timeLimit?: number
  maxMoves?: number
  revealDurationMs?: number
  winRate?: number
  themeColour?: string
  background?: string
  floorSprite?: string
  barrierSprite?: string
  holeSprite?: string
  winTileSprite?: string
  playerSprite?: string
}

export interface RockTunnelEchoMapGameConfig extends BaseGameConfig {
  settings: RockTunnelEchoMapSettings
}
