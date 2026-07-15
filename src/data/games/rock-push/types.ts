import { BaseGameConfig } from '../shared'
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
  grid_size?: number
  boulders?: RockPushPosition[]
  holes?: RockPushPosition[]
  barriers?: RockPushPosition[]
  ice?: RockPushPosition[]
  winTiles?: RockPushPosition[]
  teleporters?: RockPushTeleporter[]
  prizes?: RockPushPrizeSquare[]
}

export interface RockPushGameConfig extends BaseGameConfig {
  settings: {
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
    grid_size?: number // 6-15
    winRate?: number
    timeLimit?: number
    maxMoves?: number
    boulderSprite?: string
    barrierSprite?: string
    floorSprite?: string
    iceSprite?: string
    holeSprite?: string
    filledHoleSprite?: string
    winTileSprite?: string
    teleporterSprite?: string
    playerSprite?: string
  }
}
