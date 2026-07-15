import { BaseGameConfig, TaskIcon } from '../shared'
import { LocationReward } from '@/data/types'

export type RodType = 'old' | 'good' | 'super'
export type FishingWaterStyle = 'ocean' | 'pond' | 'pool' | 'harbor' | 'rocky-lake'

export interface FishingSceneConfig {
  portraitBackground: string
  landscapeBackground?: string
  waterStyle: FishingWaterStyle
  waterline: {
    portrait: number
    landscape?: number
  }
}

export interface FishingPokemonEntry {
  speciesId: number
  formId?: string
  weight: number // Relative weight in pool
  symbol: string // Emoji/icon shown when hooked (e.g., "🐟", "⭐")
  reactionTime: number // MS window to press hook
  appearTime: { min: number; max: number } // MS range before symbol appears
  time?: 'day' | 'night' // Optional time restriction (Day: 06:00-18:00, Night: 18:00-06:00)
}

export interface FishingItemEntry {
  itemId: string
  weight: number
  symbol: string
  reactionTime: number
  appearTime: { min: number; max: number }
  secret?: boolean
}

export interface FishingRodConfig {
  encounters: {
    chance?: number // Deprecated; fishing rolls Pokemon at a global 80% rate.
    entries: FishingPokemonEntry[]
  }
  items?: {
    chance?: number // Deprecated; fishing rolls items at a global 20% rate.
    entries: FishingItemEntry[]
  }
  // Per-rod catch settings
  levelRange?: { min: number; max: number }
  shinyChanceModifier?: number // Multiplier for shiny rate
  catchRateModifier?: number // 0-255, modifies catch rate
  timer?: number // Duration for catch attempt in seconds
}

export interface FishingGameConfig extends BaseGameConfig {
  gameType: 'fishing'
  settings: {
    rods: {
      old?: FishingRodConfig
      good?: FishingRodConfig
      super?: FishingRodConfig
    }
    sky?: string // Sky/top half background for fishing game UI
    scene?: FishingSceneConfig
    fishingSprite?: string // Character/rod sprite
    waterAnimationSpeed?: number // Optional animation speed
  }
}
