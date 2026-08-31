import { BaseGameConfig } from '../shared'
import type { GridFloorRenderConfig, GridTilePaletteId } from '../grid-tiles'

export interface RockTunnelEchoPosition {
  x: number
  y: number
}

export interface RockTunnelEchoMapSettings {
  /** Ruleset executed by the shared Grid Puzzle game mode. */
  variant: 'echo-map'
  /** Semantic 16x16 tile palette. Legacy sprite fields override individual roles. */
  tilePaletteId?: GridTilePaletteId
  floorVariation?: GridFloorRenderConfig
  gridSize: {
    cols: number
    rows: number
  }
  playerStart: RockTunnelEchoPosition
  exit: RockTunnelEchoPosition
  /** Interior blockers only; y=0 is reserved for the repeated back wall. */
  walls: RockTunnelEchoPosition[]
  /** Floor hazards only; y=0 is reserved for the repeated back wall and exit marker. */
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
  /** Optional override for a goal occupying the reserved wall row. */
  wallGoalSprite?: string
  /** Floor goal override; wall goals use the palette wall marker instead. */
  winTileSprite?: string
  playerSprite?: string
}

export interface RockTunnelEchoMapGameConfig extends BaseGameConfig {
  settings: RockTunnelEchoMapSettings
}
