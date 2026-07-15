import { items } from '@/data/items'
import { getAllMoves, getMove } from '@/data/moves'
import type { MoveConfig, MoveContinuousConfig, MoveStance } from '@/data/moves/types'
import type { BattleAiProfileId } from '@/data/types'
import {
  selectBattleMoveLoadoutFromCandidates,
} from '@/utilities/battle/enemy-ai'
import type { BattlePokemon } from '@/utilities/battle/types'
import { MAX_RESEARCHER_MOVE_SLOTS } from '@/utilities/skills/unlocks'

export const MAX_ASSIGNED_MOVES = MAX_RESEARCHER_MOVE_SLOTS

export interface PokemonMoveOption {
  id: string
  name: string
  description: string
  forcedType?: string
  stance: MoveStance
  damage: number
  level: number
  critChance?: number
  accuracy: number
  charged?: number
  recharge?: number
  continuous?: MoveContinuousConfig
}

export type AssignedMoveInput =
  | string[]
  | {
      moveId?: string | null
    }[]
  | null
  | undefined

export function normalizeAssignedMoveIds(
  assignedMoves: AssignedMoveInput,
): string[] {
  if (!Array.isArray(assignedMoves)) return []

  const seen = new Set<string>()
  const moveIds: string[] = []

  for (const entry of assignedMoves) {
    const moveId = typeof entry === 'string' ? entry : entry?.moveId
    if (!moveId || seen.has(moveId)) continue
    seen.add(moveId)
    moveIds.push(moveId)
  }

  return moveIds
}

export function toAssignedMoveRows(moveIds: string[]): { moveId: string }[] {
  return moveIds.map((moveId) => ({ moveId }))
}

export function getInventoryMoveIds(inventory: Record<string, number>): string[] {
  const seen = new Set<string>()
  const moveIds: string[] = []

  for (const item of items) {
    if (!item.moveId || (inventory[item.id] || 0) <= 0) continue
    if (seen.has(item.moveId)) continue
    seen.add(item.moveId)
    moveIds.push(item.moveId)
  }

  return moveIds
}

export function canPokemonUseMove(params: {
  move: MoveConfig
  pokemonTypes: string[]
  pokemonFormId?: string | null
  pokemonLevel?: number | null
  inventory?: Record<string, number>
}): boolean {
  const { move, pokemonFormId, pokemonLevel, inventory = {} } = params
  if (move.aiOnly || move.manualOnly) return false

  const tmItem = items.find((item) => item.moveId === move.id)
  const isAvailable = tmItem ? (inventory[tmItem.id] || 0) > 0 : false
  if (!isAvailable) return false

  if (move.formId && move.formId.length > 0) {
    if (!pokemonFormId) return false
    if (!move.formId.includes(pokemonFormId)) return false
  }

  if (move.level) {
    const level = pokemonLevel || 1
    if (level < move.level) return false
  }

  return true
}

export function getAvailableMoveOptions(params: {
  pokemonTypes: string[]
  pokemonFormId?: string | null
  pokemonLevel?: number | null
  inventory?: Record<string, number>
}): PokemonMoveOption[] {
  const { pokemonTypes, pokemonFormId, pokemonLevel, inventory } = params

  return getAllMoves()
    .filter((move) =>
      canPokemonUseMove({
        move,
        pokemonTypes,
        pokemonFormId,
        pokemonLevel,
        inventory,
      }),
    )
    .map((move) => toPokemonMoveOption(move))
}

export function getAssignedMoveOptions(params: {
  assignedMoves: AssignedMoveInput
  pokemonTypes: string[]
  pokemonFormId?: string | null
  pokemonLevel?: number | null
  inventory?: Record<string, number>
  maxAssignedMoves?: number
  allowUnavailableMoves?: boolean
}): PokemonMoveOption[] {
  const assignedIds = normalizeAssignedMoveIds(params.assignedMoves).slice(
    0,
    params.maxAssignedMoves ?? MAX_ASSIGNED_MOVES,
  )
  if (assignedIds.length === 0) return []

  return assignedIds.flatMap((moveId) => {
    const move = getMove(moveId)
    if (!move) return []
    if (
      !params.allowUnavailableMoves &&
      !canPokemonUseMove({
        move,
        pokemonTypes: params.pokemonTypes,
        pokemonFormId: params.pokemonFormId,
        pokemonLevel: params.pokemonLevel,
        inventory: params.inventory,
      })
    ) {
      return []
    }
    return [toPokemonMoveOption(move)]
  })
}

export function getBattleMoveOptions(params: {
  assignedMoves: AssignedMoveInput
  pokemonTypes: string[]
  pokemonFormId?: string | null
  pokemonLevel?: number | null
  inventory?: Record<string, number>
  maxAssignedMoves?: number
  allowUnavailableAssignedMoves?: boolean
  pokemon?: BattlePokemon
  opponents?: BattlePokemon[]
  profile?: BattleAiProfileId
}): PokemonMoveOption[] {
  const maxAssignedMoves = params.maxAssignedMoves ?? MAX_ASSIGNED_MOVES
  const assignedOptions = getAssignedMoveOptions({
    assignedMoves: params.assignedMoves,
    pokemonTypes: params.pokemonTypes,
    pokemonFormId: params.pokemonFormId,
    pokemonLevel: params.pokemonLevel,
    inventory: params.inventory,
    maxAssignedMoves,
    allowUnavailableMoves: params.allowUnavailableAssignedMoves,
  })

  if (assignedOptions.length >= maxAssignedMoves || !params.pokemon || !params.opponents?.length) {
    return assignedOptions
  }

  const assignedIds = new Set(assignedOptions.map((move) => move.id))
  const fallbackCandidateIds = getAvailableMoveOptions({
    pokemonTypes: params.pokemonTypes,
    pokemonFormId: params.pokemonFormId,
    pokemonLevel: params.pokemonLevel,
    inventory: params.inventory,
  })
    .map((move) => move.id)
    .filter((moveId) => !assignedIds.has(moveId))

  const fallbackIds = selectBattleMoveLoadoutFromCandidates({
    self: params.pokemon,
    opponents: params.opponents,
    moveIds: fallbackCandidateIds,
    profile: params.profile,
    maxMoves: maxAssignedMoves - assignedOptions.length,
  })

  return [
    ...assignedOptions,
    ...fallbackIds.flatMap((moveId) => {
      const move = getMove(moveId)
      return move ? [toPokemonMoveOption(move)] : []
    }),
  ]
}

export function validateAssignedMoveIds(params: {
  moveIds: string[]
  pokemonTypes: string[]
  pokemonFormId?: string | null
  pokemonLevel?: number | null
  inventory?: Record<string, number>
  maxAssignedMoves?: number
}): { success: true; moveIds: string[] } | { success: false; error: string } {
  const moveIds = normalizeAssignedMoveIds(params.moveIds)
  const maxAssignedMoves = params.maxAssignedMoves ?? MAX_ASSIGNED_MOVES

  if (moveIds.length > maxAssignedMoves) {
    return { success: false, error: `Choose up to ${maxAssignedMoves} moves` }
  }

  const availableIds = new Set(
    getAvailableMoveOptions({
      pokemonTypes: params.pokemonTypes,
      pokemonFormId: params.pokemonFormId,
      pokemonLevel: params.pokemonLevel,
      inventory: params.inventory,
    }).map((move) => move.id),
  )

  for (const moveId of moveIds) {
    if (!availableIds.has(moveId)) {
      return {
        success: false,
        error: 'One or more moves are not available for this Pokemon',
      }
    }
  }

  return { success: true, moveIds }
}

function toPokemonMoveOption(move: MoveConfig): PokemonMoveOption {
  return {
    id: move.id,
    name: move.name,
    description: move.description,
    forcedType: move.forcedType,
    stance: move.stance,
    damage: move.damage,
    level: move.level || 1,
    critChance: move.critChance,
    accuracy: move.accuracy,
    charged: move.charged,
    recharge: move.recharge,
    continuous: move.continuous,
  }
}
