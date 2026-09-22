import type { Reward } from '@/data/types'
import type { TaskIcon } from '@/data/tasks'

export interface GuildRankDefinition {
  rank: number
  totalXp: number
  name: string
  description: string
  unlocks: string[]
  rewards?: Reward[]
}

export interface GuildDefinition {
  id: string
  name: string
  description: string
  category: string
  subCategory: string
  background: string
  icon: TaskIcon
  ranks: GuildRankDefinition[]
}

export interface GuildProgressData {
  rank?: number | null
  xp?: number | null
  joinedAt?: string | null
  rewardedThroughRank?: number | null
  legacyImportedAt?: string | null
  instituteBalanceV2MigratedAt?: string | null
}

export type GuildsData = Record<string, GuildProgressData | undefined>
