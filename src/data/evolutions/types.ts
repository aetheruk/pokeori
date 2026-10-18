export interface EvolutionCondition {
  minLevel?: number
  maxLevel?: number
  itemId?: string
  minHappiness?: number
  timeOfDay?: string
  gender?: number
  locationId?: string
  /** Battle move slug that must be equipped in the saved loadout. */
  knownMoveId?: string
  requiredPartySpeciesId?: number
  requiredInventoryItemId?: string
  requiredInventoryItemQuantity?: number
  requiresBattleTeamSlot?: boolean
  requiresActiveCompanion?: boolean
  requiresBattleLevelUp?: boolean
  minBattleKOs?: number
  minTimesKOd?: number
  additionalSpeciesId?: number
  heldItem?: string
  trade?: boolean
  requiredSourceForm?: string
  requiredRegion?: string
  excludedRegions?: string[]
}

export interface Evolution {
  speciesId: number
  name: string
  targetForm?: string
  trigger: 'level-up' | 'use-item'
  conditions: EvolutionCondition
}
