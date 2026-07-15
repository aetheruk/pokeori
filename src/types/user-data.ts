/**
 * Extended type definitions for User model that aren't included in payload-types.ts
 * These types represent data stored in JSON fields and embedded documents.
 */

import type { User, Pokemon } from '@/payload-types'
import type { BattleStance } from '@/utilities/battle/types'

/**
 * Pokedex entry for a specific Pokemon form
 */
export interface PokedexFormEntry {
  caught: boolean
  seen: boolean
  totalCaught?: number
  totalSeen?: number
  shinyCaught?: boolean
  shinySeen?: boolean
  researchXp?: number
  researchLevel?: number
  preferredBattleStance?: BattleStance
}

/**
 * Pokedex entry for a Pokemon species (contains multiple forms)
 * Key is the form ID (string)
 */
export type PokedexSpeciesEntry = Record<string, PokedexFormEntry>

/**
 * Full Pokedex structure
 * Key is the species ID (string)
 */
export type PokedexData = Record<string, PokedexSpeciesEntry>

/**
 * Completed task entry
 */
export interface CompletedTaskEntry {
  taskId: string
  completedAt: string
  count: number
}

/**
 * Completed tasks map
 * Key is the task ID (string)
 */
export type CompletedTasksData = Record<string, CompletedTaskEntry>

/**
 * Battle result statistics
 */
export interface BattleStats {
  wins?: number
  losses?: number
  lastPlayed?: string
}

/**
 * Location encounter statistics
 */
export interface LocationStats {
  wins?: number
  losses?: number
  lastPlayed?: string
}

/**
 * Research encounter statistics
 */
export interface ResearchStats {
  wins?: number
  losses?: number
  lastPlayed?: string
}

/**
 * User stats structure
 */
export interface UserStats {
  battles?: Record<string, BattleStats>
  locations?: Record<string, LocationStats>
  research?: Record<string, ResearchStats>
  totalEvolutions?: number
  // Dynamic stats for extensibility
  [key: string]: number | undefined | Record<string, unknown> | BattleStats | LocationStats | ResearchStats
}

/**
 * TCG card collection
 * Key is card ID, value is quantity owned
 */
export type TCGData = Record<string, number>

/**
 * Currency amounts
 */
export interface CurrencyData {
  crystals?: number
  tokens?: number
  coins?: number
  [key: string]: number | undefined
}

/**
 * Skill data with level and experience
 */
export interface SkillData {
  level: number
  exp: number
}

/**
 * All skills
 */
export interface SkillsData {
  catching?: SkillData
  battling?: SkillData
  researching?: SkillData
  artisan?: SkillData
  'ranked-battling'?: SkillData
  [key: string]: SkillData | undefined
}

/**
 * Inventory structure
 * Key is item ID, value is quantity
 */
export type InventoryData = Record<string, number>

/**
 * Shop purchase tracking
 */
export interface ShopPurchase {
  shopId: string
  itemId: string
  quantity: number
  purchasedAt: string
}

/**
 * Power usage tracking
 */
export interface PowerUsageData {
  teraUses?: number
  megaUses?: number
  dynamaxUses?: number
  zMoveUses?: number
  shoutUses?: number
  victoryUses?: number
  weatherUses?: number
  circadianUses?: number
}

/**
 * Voyage completion tracking
 */
export interface VoyageStats {
  completedVoyages?: Record<string, { completedAt: string; count: number }>
  totalCompleted?: number
}

export interface TcgDecksData {
  baby?: string[]
  champions?: string[]
  masters?: string[]
}

/**
 * Extended User type with all embedded data properly typed.
 * Note: Doesn't extend User to avoid conflicts with payload-types.ts JSON field types.
 * Cast User to ExtendedUser when you need access to typed embedded data.
 */
export interface ExtendedUser {
  id: string
  trainerName?: string | null
  pokedex?: PokedexData
  completedTasks?: CompletedTasksData
  stats?: UserStats
  tcg?: TCGData
  tcgDecks?: TcgDecksData
  currency?: CurrencyData
  skills?: SkillsData
  inventory?: InventoryData
  shopPurchases?: ShopPurchase[]
  powerUsage?: PowerUsageData
  voyageStats?: VoyageStats
  unlockedBanners?: string[]
  unlockedIcons?: string[]
  unlockedTitles?: string[]
  banner?: string
  icon?: string
  title?: string
  maxPokemon?: number
  maxBoxes?: number
  rivalTrainerId?: string | null
  lastRoll?: number
  weatherSlot?: number
  weatherUpdatedAt?: string | null
}

/**
 * Inventory item array format (for conversion from Map)
 */
export interface InventoryItem {
  itemId: string
  quantity: number
}

/**
 * TCG card array format (for conversion from Map)
 */
export interface TCGCardItem {
  cardId: string
  quantity: number
  setId?: string
}

/**
 * Pokedex array format (for conversion from Map)
 */
export interface PokedexArrayEntry {
  speciesId: number
  formId: string
  caught: boolean
  seen: boolean
  totalCaught?: number
  totalSeen?: number
  shinyCaught?: boolean
  shinySeen?: boolean
  researchXp?: number
  researchLevel?: number
}

/**
 * Battle result array format
 */
export interface BattleResultEntry {
  battleId: string
  wins: number
  losses: number
  lastPlayed?: string
}

/**
 * Location encounter result array format
 */
export interface LocationResultEntry {
  locationId: string
  wins: number
  losses: number
  lastPlayed?: string
}

/**
 * Research encounter result array format
 */
export interface ResearchResultEntry {
  encounterId: string
  wins: number
  losses: number
  lastPlayed?: string
}

/**
 * Helper type conversions from Map to Array formats
 */
export namespace UserDataConverters {
  export function inventoryToArray(inventory: InventoryData): InventoryItem[] {
    return Object.entries(inventory).map(([itemId, quantity]) => ({
      itemId,
      quantity,
    }))
  }

  export function tcgToArray(tcg: TCGData): TCGCardItem[] {
    return Object.entries(tcg).map(([cardId, quantity]) => ({
      cardId,
      quantity,
    }))
  }

  export function pokedexToArray(pokedex: PokedexData): PokedexArrayEntry[] {
    const entries: PokedexArrayEntry[] = []
    for (const [speciesId, species] of Object.entries(pokedex)) {
      for (const [formId, formData] of Object.entries(species)) {
        entries.push({
          speciesId: parseInt(speciesId, 10),
          formId,
          ...formData,
        })
      }
    }
    return entries
  }

  export function completedTasksToArray(
    completedTasks: CompletedTasksData | any[],
  ): CompletedTaskEntry[] {
    if (Array.isArray(completedTasks)) {
      // It's an array. Some elements might be undefined or strings.
      // Some might be valid objects { taskId: '...', ... }
      return completedTasks
        .filter(Boolean)
        .map((t) => {
          if (typeof t === 'string') {
            return { taskId: t, completedAt: new Date().toISOString(), count: 1 }
          }
          if (typeof t === 'object' && t !== null) {
            // If it's a valid object from an array with holes, just return it.
            // BUT wait, if the array has holes, maybe the "taskId" is the *key*, but Array.entries() won't work in filter(Boolean).
            // If `t` is an object, ensure it has a taskId
            const obj = t as any
            if (obj.taskId) return obj as CompletedTaskEntry
          }
          return t
        })
        .filter((t) => t && typeof t === 'object' && t.taskId) as CompletedTaskEntry[]
    }
    return Object.entries(completedTasks || {})
      .filter(([_, data]) => data)
      .map(([taskId, data]) => ({
        taskId,
        ...(data as any),
      })) as CompletedTaskEntry[]
  }

  export function battleStatsToArray(battles: Record<string, BattleStats>): BattleResultEntry[] {
    return Object.entries(battles).map(([battleId, stats]) => ({
      battleId,
      wins: stats.wins || 0,
      losses: stats.losses || 0,
      lastPlayed: stats.lastPlayed,
    }))
  }

  export function locationStatsToArray(
    locations: Record<string, LocationStats>,
  ): LocationResultEntry[] {
    return Object.entries(locations).map(([locationId, stats]) => ({
      locationId,
      wins: stats.wins || 0,
      losses: stats.losses || 0,
      lastPlayed: stats.lastPlayed,
    }))
  }

  export function researchStatsToArray(
    research: Record<string, ResearchStats>,
  ): ResearchResultEntry[] {
    return Object.entries(research).map(([encounterId, stats]) => ({
      encounterId,
      wins: stats.wins || 0,
      losses: stats.losses || 0,
      lastPlayed: stats.lastPlayed,
    }))
  }
}
