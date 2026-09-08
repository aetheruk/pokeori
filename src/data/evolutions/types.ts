export interface EvolutionCondition {
  minLevel?: number
  itemId?: string
  minHappiness?: number
  timeOfDay?: string
  gender?: number
  locationId?: string
  /** Battle move slug that must be equipped in the saved loadout. */
  knownMoveId?: string
  heldItem?: string
  trade?: boolean
  requiredSourceForm?: string
}

export interface Evolution {
  speciesId: number
  name: string
  targetForm?: string
  trigger: 'level-up' | 'use-item'
  conditions: EvolutionCondition
}
