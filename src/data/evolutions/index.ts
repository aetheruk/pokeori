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

const rawEvolutions: Record<number, Evolution[]> = {
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

const hasUsableCondition = (evolution: Evolution) =>
  Object.keys(evolution.conditions).length > 0

const targetsSameForm = (left: Evolution, right: Evolution) =>
  (left.targetForm || 'base') === (right.targetForm || 'base')

const sourceFormsOverlap = (left: Evolution, right: Evolution) =>
  !left.conditions.requiredSourceForm ||
  !right.conditions.requiredSourceForm ||
  left.conditions.requiredSourceForm === right.conditions.requiredSourceForm

/**
 * Location evolutions are represented by Evolution Compass in PokeOri. Keep
 * that fallback only when the target does not already have an authored route.
 */
const normalizeEvolutions = (evolutions: Evolution[]) =>
  evolutions.filter((evolution) => {
    // Unsupported special level-up mechanics have no actionable condition.
    if (!hasUsableCondition(evolution)) return false

    if (!evolution.conditions.locationId) return true

    return !evolutions.some(
      (candidate) =>
        candidate !== evolution &&
        !candidate.conditions.locationId &&
        candidate.speciesId === evolution.speciesId &&
        targetsSameForm(candidate, evolution) &&
        sourceFormsOverlap(candidate, evolution),
    )
  })

export const EVOLUTIONS: Record<number, Evolution[]> = Object.fromEntries(
  Object.entries(rawEvolutions).map(([speciesId, evolutions]) => [
    Number(speciesId),
    normalizeEvolutions(evolutions),
  ]),
)
