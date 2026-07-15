import type { TaskCondition } from '@/data/tasks'
import type { LocationReward } from '@/data/types'
import type { SkillXpConfig } from '@/data/skills/xp'

export interface ArtisanCost {
  id: string
  amount: number
  type?: 'item' | 'currency'
}

export type ArtisanRecipeCategory = 'materials' | 'balls' | 'lures' | 'held' | 'items' | 'quests'
export type ArtisanCraftType = 'precise' | 'crush' | 'balance' | 'mix' | 'scatter'

export interface ArtisanRecipe {
  id: string
  name: string
  description: string
  category: ArtisanRecipeCategory
  artisanLevel: number
  costs: ArtisanCost[]
  rewards: LocationReward[]
  requirements?: TaskCondition[]
  criteria?: TaskCondition[]
  primaryOutputRewardIndex?: number | null
  craftType: ArtisanCraftType
  fail?: boolean
  minimumQuality?: 'good' | 'perfect'
  materialFail?: boolean
  materialFailQualities?: Array<'bad' | 'good' | 'perfect'>
  outputQuantity: {
    min: number
    max: number
  }
  qualityOutputQuantity?: Partial<Record<'bad' | 'good' | 'perfect', number>>
  bulk?: number
  iconItemId?: string
  skillXp?: SkillXpConfig
}
