export const GRID_LOGICAL_TILE_SIZE = 16 as const

export type GridTileRole =
  | 'floor'
  | 'barrier'
  | 'boulder'
  | 'ice'
  | 'hole'
  | 'goal'
  | 'teleporter'
  | 'player'

export type GridGameplayTileRole = 'boulder' | 'ice' | 'hole'

export interface GridTileAsset {
  src: string
  /** Number of animation frames across and down the source image. */
  frameGrid?: { cols: number; rows: number }
}

export interface GridTilePackCredit {
  label: string
  creator?: string
  href?: string
  license?: string
  notice?: string
  external: boolean
}

export interface GridFloorVariant {
  id: string
  asset: GridTileAsset
  /** Relative selection weight among rare variants. Defaults to 1. */
  weight?: number
}

export interface GridFloorBlockers {
  /** Generic solid 1x1 blocker used by legacy barrier maps. */
  small: GridTileAsset
  /** Optional generic solid 2x2 blocker. */
  large?: GridTileAsset
}

export interface GridFloorMarkers {
  /** Floor-surface markers rendered inside a normal walkable cell. */
  goal?: GridTileAsset
  teleporter?: GridTileAsset
}

export interface GridFloorSet {
  common: GridTileAsset
  rare?: GridFloorVariant[]
  /** Fraction of cells that use a rare variant. Defaults to 0.08. */
  rareChance?: number
  blockers?: GridFloorBlockers
  markers?: GridFloorMarkers
}

export type GridWallMask = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export interface GridWallMarkers {
  /** Wall-surface markers rendered into architectural wall cells. */
  goal?: GridTileAsset
  teleporter?: GridTileAsset
}

export interface GridWallSet {
  /** Single native tile repeated along the far/top edge of simple scenes. */
  back?: GridTileAsset
  /** N=1, E=2, S=4, W=8. All 16 variants are required when supplied. */
  variants?: Record<GridWallMask, GridTileAsset>
  /** Optional 3x3 atlas: top/middle/bottom by left/centre/right. */
  frame?: GridTileAsset
  markers?: GridWallMarkers
}

export type GridObjectPurpose =
  | 'entity'
  | 'hazard'
  | 'destructible'
  | 'pushable'
  | 'decoration'
  | 'dialogue'
  | (string & {})

export interface GridObjectSize {
  cols: number
  rows: number
}

/** Shared object definition. It is independent of any particular floor/wall set. */
export interface GridObjectDefinition {
  id: string
  name: string
  purpose: GridObjectPurpose
  size: GridObjectSize
  asset: GridTileAsset
  collision?: 'none' | 'solid' | 'pushable'
  /** Optional renderer hints; gameplay rules remain owned by the active variant. */
  properties?: Record<string, unknown>
}

export type GridObjectLibrary = Record<string, GridObjectDefinition>

/** Asset manifest. Scene geometry and reusable objects are intentionally separate. */
export interface GridTilePalette {
  id: string
  name: string
  logicalTileSize: typeof GRID_LOGICAL_TILE_SIZE
  /** Native source-art width/height for one logical cell (64 for the current sets). */
  nativeTileSize: number
  floor: GridFloorSet
  walls?: GridWallSet
  gameplay: Record<GridGameplayTileRole, GridTileAsset>
  credits: GridTilePackCredit[]
}

export type GridTileLegacyOverrides = Partial<Record<GridTileRole, string>>

export interface GridFloorRenderConfig {
  /** Stable per-scene salt. Changing it creates a new visual distribution. */
  seed?: string
  /** Per-scene override in the inclusive range 0..1. */
  rareChance?: number
}

export interface GridTileRenderConfig {
  spriteSetId: string
  floor?: GridFloorRenderConfig
}

/** Surface on which a goal/exit marker is authored. */
export type GridGoalSurface = 'floor' | 'wall'

export interface GridPosition { x: number; y: number }
export interface GridWallPosition extends GridPosition {}

export interface GridBlockerPlacement extends GridPosition {
  id?: string
  size: 1 | 2
}

export interface GridObjectPlacement extends GridPosition {
  id?: string
  objectId: string
  /** Per-placement state or renderer hints interpreted by the active variant. */
  properties?: Record<string, unknown>
}

/** Reusable visual scene contract. Games may adapt their existing collision maps into it. */
export interface GridSceneConfig {
  cols: number
  rows: number
  rendering: GridTileRenderConfig
  walls?: GridWallPosition[]
  blockers?: GridBlockerPlacement[]
  objects?: GridObjectPlacement[]
}

/** Deprecated names retained for compatibility with the existing game renderers. */
export type GridObstaclePosition = GridPosition
export type GridObstaclePlacement = GridBlockerPlacement

export interface GridObstaclePart extends GridBlockerPlacement {
  offsetX: 0 | 1
  offsetY: 0 | 1
}
