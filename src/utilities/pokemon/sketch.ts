import { items } from '@/data/items'
import { getMove } from '@/data/moves'
import type { BattlePokemon } from '@/utilities/battle/types'

export const SMEARGLE_FORM_ID = '235'
export const SKETCH_MOVE_ID = 'sketch'
export const SMEARGLE_SKETCH_CHANCE = 0.25

function normalizeBattleMoveIds(pokemon: BattlePokemon): string[] {
  const source =
    pokemon.battleMoveIds?.length
      ? pokemon.battleMoveIds
      : pokemon.aiMoveLoadout?.length
        ? pokemon.aiMoveLoadout
        : pokemon.aiMoves?.length
          ? pokemon.aiMoves
          : pokemon.assignedMoves?.map((entry) => entry.moveId)

  if (!Array.isArray(source)) return []

  return Array.from(
    new Set(
      source
        .map((moveId) => String(moveId || '').trim())
        .filter(Boolean),
    ),
  )
}

export function isSmeargle(formId: string | number | null | undefined): boolean {
  return String(formId || '') === SMEARGLE_FORM_ID
}

export function isSketchableMoveId(moveId: string): boolean {
  if (!moveId || moveId === SKETCH_MOVE_ID) return false

  const move = getMove(moveId)
  if (!move || move.aiOnly || move.manualOnly) return false

  return items.some((item) => item.category === 'tm' && item.moveId === moveId)
}

export function getSketchableOpponentMoveIds(
  opponent: BattlePokemon,
): string[] {
  return normalizeBattleMoveIds(opponent).filter(isSketchableMoveId)
}

export function getAvailableSketchMoveIds(
  opponent: BattlePokemon,
  alreadySketchedMoveIds: string[] = [],
): string[] {
  const alreadySketched = new Set(alreadySketchedMoveIds)
  return getSketchableOpponentMoveIds(opponent).filter(
    (moveId) => !alreadySketched.has(moveId),
  )
}

export function attemptSmeargleSketch(params: {
  attacker: BattlePokemon
  opponent: BattlePokemon
  alreadySketchedMoveIds?: string[]
  random?: () => number
}): string | undefined {
  if (!isSmeargle(params.attacker.formId)) return undefined

  const candidateMoveIds = getAvailableSketchMoveIds(
    params.opponent,
    params.alreadySketchedMoveIds,
  )
  if (candidateMoveIds.length === 0) return undefined

  const random = params.random ?? Math.random
  if (random() >= SMEARGLE_SKETCH_CHANCE) return undefined

  const index = Math.min(
    candidateMoveIds.length - 1,
    Math.floor(random() * candidateMoveIds.length),
  )
  return candidateMoveIds[index]
}
