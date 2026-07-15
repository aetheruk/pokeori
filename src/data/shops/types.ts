import { TaskCondition, TaskIcon } from '../tasks/types'
import { LocationReward } from '../types'

export interface ShopCost {
  type: 'currency' | 'item'
  id: string // currency id (e.g. 'crystals') or item id
  amount: number
}

export interface ShopItem {
  id: string
  name: string
  description?: string
  icon?: TaskIcon
  cost: ShopCost[]
  rewards: LocationReward[]
  stock?: number // If undefined, infinite
  daily?: boolean // If true and stock is set, stock resets daily
  requirements?: TaskCondition[] // Logic to see/unlock this specific item
}

export interface ShopConfig {
  id: string
  hide?: string
  name: string
  description: string
  category?: string
  subCategory?: string
  icon: TaskIcon
  items: ShopItem[]
  requirements?: TaskCondition[] // Logic to access the shop itself
  background?: string
  isRandomEvent?: boolean
}
