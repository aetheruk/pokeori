/**
 * Central export for all Pokemon evolutions across all generations.
 */

import { Evolution } from './types'
import { gen1Evolutions } from './gen1'
import { gen2Evolutions } from './gen2'
import { gen3Evolutions } from './gen3'
import { gen4Evolutions } from './gen4'
import { gen5Evolutions } from './gen5'
import { gen6Evolutions } from './gen6'
import { gen7Evolutions } from './gen7'
import { gen8Evolutions } from './gen8'
import { gen9Evolutions } from './gen9'

export * from './types'
export {
  gen1Evolutions,
  gen2Evolutions,
  gen3Evolutions,
  gen4Evolutions,
  gen5Evolutions,
  gen6Evolutions,
  gen7Evolutions,
  gen8Evolutions,
  gen9Evolutions,
}

export const EVOLUTIONS: Record<number, Evolution[]> = {
  ...gen1Evolutions,
  ...gen2Evolutions,
  ...gen3Evolutions,
  ...gen4Evolutions,
  ...gen5Evolutions,
  ...gen6Evolutions,
  ...gen7Evolutions,
  ...gen8Evolutions,
  ...gen9Evolutions,
}
