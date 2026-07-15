//
// Shared base type for all mini-games
//

import { TaskIcon, TaskCondition } from '@/data/tasks/types'
import { LocationReward } from '@/data/types'
import type { SkillXpConfig } from '@/data/skills/xp'

export interface BaseGameConfig {
  id: string
  hide?: string
  name: string
  description: string
  category: string
  subCategory?: string
  icon: TaskIcon
  requirements: TaskCondition[]
  criteria?: TaskCondition[]
  rewards: LocationReward[]
  overrides?: string
  background?: string
  /** Music track to play during the game. Defaults to '/music/minigame.mp3' if not specified. */
  music?: string
  daily?: boolean
  isRandomEvent?: boolean
  isEligibleForReplay?: boolean
  skillXp?: SkillXpConfig
}

// Re-export commonly used types
export type { TaskIcon, TaskCondition, LocationReward }

export interface ParallaxLayer {
  url: string
  speed: number // Multiplier for scroll speed
  style?: {
    backgroundSize?: string
    backgroundPosition?: string
    backgroundRepeat?: string
    opacity?: number
  }
}

export interface SideScrollerSceneConfig {
  backdrop: string
  atmosphere?: 'route' | 'sky' | 'mountain'
  groundLine?: number
}

export interface SpriteConfig {
  sheetUrl: string
  renderWidth: number // Size on screen
  renderHeight: number // Size on screen
  frameWidth: number // Size in sprite sheet
  frameHeight: number // Size in sprite sheet
  frameCount?: number // Optional, auto-calculated
  frameRate?: number // ms per frame, default 100
}
