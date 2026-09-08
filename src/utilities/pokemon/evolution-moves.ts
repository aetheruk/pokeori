import type { EvolutionCondition } from '@/data/evolutions'
import { getMove } from '@/data/moves'
import {
  normalizeAssignedMoveIds,
  type AssignedMoveInput,
} from './pokemon-moves'

export function matchesEvolutionMove(
  conditions: Pick<EvolutionCondition, 'knownMoveId'>,
  assignedMoves: AssignedMoveInput,
): boolean {
  if (!conditions.knownMoveId) return true
  // Unknown authored moves must not silently unlock an evolution.
  return Boolean(
    getMove(conditions.knownMoveId) &&
      normalizeAssignedMoveIds(assignedMoves).includes(conditions.knownMoveId),
  )
}
