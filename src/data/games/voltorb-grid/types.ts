import { BaseGameConfig } from '../shared'
import type { GridFloorRenderConfig, GridTilePaletteId } from '../grid-tiles'

export interface VoltorbGridPosition {
  x: number
  y: number
}

export interface VoltorbGridVoltorb extends VoltorbGridPosition {
  id?: string
  blastRadius?: number
}

export interface VoltorbGridProtectedPokemon extends VoltorbGridPosition {
  id?: string
  speciesId: number
  formId?: string
}

export interface VoltorbGridSettings {
  /** Ruleset executed by the shared Grid Puzzle game mode. */
  variant: 'voltorb'
  /** Semantic 16x16 tile palette. Legacy sprite fields override individual roles. */
  tilePaletteId?: GridTilePaletteId
  floorVariation?: GridFloorRenderConfig
  gridSize: {
    cols: number
    rows: number
  }
  playerStart: VoltorbGridPosition
  exit: VoltorbGridPosition
  /** Interior blockers only; y=0 is reserved for the repeated back wall. */
  walls?: VoltorbGridPosition[]
  /** Breakable floor objects only; y=0 is reserved for the repeated back wall. */
  debris?: VoltorbGridPosition[]
  voltorbs: VoltorbGridVoltorb[]
  protectedPokemon?: VoltorbGridProtectedPokemon[]
  requiredCleared?: number
  timeLimit?: number
  maxMoves?: number
  maxDischarges?: number
  winRate?: number
  themeColour?: string
  background?: string
  floorSprite?: string
  boulderSprite?: string
  barrierSprite?: string
  /** Optional override for a goal occupying the reserved wall row. */
  wallGoalSprite?: string
  /** Floor goal override; wall goals use the palette wall marker instead. */
  winTileSprite?: string
  playerSprite?: string
}

export interface VoltorbGridGameConfig extends BaseGameConfig {
  settings: VoltorbGridSettings
}
