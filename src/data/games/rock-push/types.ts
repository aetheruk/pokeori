import { BaseGameConfig } from '../shared'
import type {
  GridFloorRenderConfig,
  GridObjectPlacement,
  GridTilePaletteId,
} from '../grid-tiles'
import type { LocationReward } from '@/data/types'

export interface RockPushPosition {
  x: number
  y: number
}

export interface RockPushTeleporterTarget extends RockPushPosition {
  screen?: string
}

export interface RockPushTeleporter extends RockPushPosition {
  id: string
  target: RockPushTeleporterTarget
  oneWay?: boolean
}

export interface RockPushPrizeSquare extends RockPushPosition {
  id?: string
  itemId: string
  quantity?: number
  reward?: LocationReward
}

export interface RockPushScreenConfig {
  id: string
  tilePaletteId?: GridTilePaletteId
  floorVariation?: GridFloorRenderConfig
  grid_size?: number
  boulders?: RockPushPosition[]
  holes?: RockPushPosition[]
  barriers?: RockPushPosition[]
  ice?: RockPushPosition[]
  wallGoalSprite?: string
  winTiles?: RockPushPosition[]
  teleporters?: RockPushTeleporter[]
  prizes?: RockPushPrizeSquare[]
  objects?: GridObjectPlacement[]
}

export interface RockPushGameConfig extends BaseGameConfig {
  settings: {
    /** Ruleset executed by the shared Grid Puzzle game mode. */
    variant: 'rock-push'
    /** Semantic 16x16 tile palette. Legacy sprite fields override individual roles. */
    tilePaletteId?: GridTilePaletteId
    floorVariation?: GridFloorRenderConfig
    playerStart: RockPushPosition
    startScreen?: string
    boulders?: RockPushPosition[]
    holes?: RockPushPosition[]
    barriers?: RockPushPosition[]
    ice?: RockPushPosition[]
    winTiles?: RockPushPosition[]
    teleporters?: RockPushTeleporter[]
    screens?: RockPushScreenConfig[]
    prizes?: RockPushPrizeSquare[]
    objects?: GridObjectPlacement[]
    grid_size?: number // 6-15
    winRate?: number
    timeLimit?: number
    maxMoves?: number
    /** Hide authored internal barriers until the player walks into them. */
    invisibleMaze?: boolean
    boulderSprite?: string
    barrierSprite?: string
  floorSprite?: string
  iceSprite?: string
  holeSprite?: string
  /** Optional override for a goal occupying the reserved wall row. */
  wallGoalSprite?: string
  /** Floor goal override; wall goals use the palette wall marker instead. */
  winTileSprite?: string
    teleporterSprite?: string
    playerSprite?: string
  }
}
