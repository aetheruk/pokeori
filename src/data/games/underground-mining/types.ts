import type { BaseGameConfig, TaskCondition } from '../shared'

export type UndergroundMiningTool = 'pickaxe' | 'hammer'

export interface UndergroundMiningLootItem {
  itemId: string
  /** Footprint in wall cells. */
  size: { width: number; height: number }
  quantity?: number | { min: number; max: number }
  requirements?: TaskCondition[]
}

export interface UndergroundMiningLootEntry extends UndergroundMiningLootItem {
  /** Relative chance for each treasure slot; equal weights give equal odds. */
  weight: number
}

export interface UndergroundMiningSettings {
  /** Require every treasure for any rewards; false/omitted keeps complete finds on collapse. */
  complete?: boolean
  /** False for story objectives whose excavated objects are not inventory rewards. */
  awardLoot?: boolean
  gridSize: { cols: number; rows: number }
  /** Optional painted mining scene behind the excavation wall. */
  wallTexture?: string
  /** Optional portrait composition of the scene for phone screens. */
  wallTexturePortrait?: string
  treasureCount: { min: number; max: number }
  lootPool: UndergroundMiningLootEntry[]
  wallStressLimit: number
  toolStress: Record<UndergroundMiningTool, number>
  bedrockChance: number
}

export interface UndergroundMiningConfig extends BaseGameConfig {
  settings: UndergroundMiningSettings
}
