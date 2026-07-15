export type ExploreItemType =
  | 'battle'
  | 'location'
  | 'research'
  | 'shop'
  | 'voyage'
  | 'expedition'
  | 'vs-seeker'
  | 'task'

export interface ExploreItem {
  id: string
  name: string
  description: string
  category: string
  subCategory?: string
  icon: any
  type: ExploreItemType
  originalData: any
  requirements?: any[]
  overrides?: string
  criteria?: any[]
  hide?: string
  isChallenge?: boolean
}

export interface ExploreItemGroup {
  id: string
  name: string
  category: string
  subCategory?: string
  icon: any
  items: ExploreItem[]
}

export type ExploreDisplayItem =
  | { kind: 'single'; item: ExploreItem }
  | { kind: 'group'; group: ExploreItemGroup }
