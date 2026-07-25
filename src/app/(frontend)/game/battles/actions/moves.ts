/**
 * Battle Moves System
 * Handles move availability filtering and validation.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { MoveContinuousConfig, MoveStance } from '@/data/moves/types'
import {
  getAvailableMoveOptions,
  getBattleMoveOptions,
  type AssignedMoveInput,
} from '@/utilities/pokemon/pokemon-moves'
import {
  getResearcherMoveSlotCount,
  getSkillLevel,
} from '@/utilities/skills/unlocks'
import type { BattleState } from '@/utilities/battle/types'
import type { User } from '@/payload-types'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { getUserInventoryMap } from '@/utilities/user-state'

/**
 * Get available moves for a Pokemon based on form and level.
 * Filters moves by TM ownership, form requirements, and level.
 *
 * @param pokemonTypes - Pokemon's types (e.g., ['fire', 'flying'])
 * @param pokemonFormId - Pokemon's form ID (optional)
 * @param pokemonLevel - Pokemon's current level (optional)
 * @returns Array of available moves with their details
 */
export async function getAvailableMoves(
  pokemonTypes: string[],
  pokemonFormId?: string,
  pokemonLevel?: number,
  assignedMoves?: AssignedMoveInput,
  context?: { user: User; state: BattleState | null },
): Promise<
  {
    id: string
    name: string
    description: string
    forcedType?: string
    stance: MoveStance
    damage: number
    accuracy: number
    charged?: number
    recharge?: number
    continuous?: MoveContinuousConfig
  }[]
> {
  const user = context?.user ?? (await getUser())
  if (!user) return []

  const state =
    context?.state !== undefined
      ? context.state
      : await getActiveBattleState(user)
  const activeMon = state?.playerTeam[state.activePlayerIndex]
  if (assignedMoves !== undefined && Array.isArray(activeMon?.battleMoveIds)) {
    return getBattleMoveOptions({
      assignedMoves: activeMon.battleMoveIds,
      pokemonTypes: activeMon.types || pokemonTypes,
      pokemonFormId: activeMon.formId || pokemonFormId,
      pokemonLevel: activeMon.level ?? pokemonLevel,
      inventory: {},
      maxAssignedMoves: activeMon.battleMoveIds.length,
      allowUnavailableAssignedMoves: true,
    })
  }

  const userInventory = state?.chronicle
    ? state.chronicleInventory || {}
    : await getUserInventoryMap(
        (await getPayload({ config: configPromise })) as any,
        user.id,
      )

  if (assignedMoves !== undefined) {
    const researcherLevel = getSkillLevel(user.skills, 'researching')
    const battleLevel = activeMon?.level ?? pokemonLevel
    const isChronicle = !!state?.chronicle

    return getBattleMoveOptions({
      assignedMoves,
      pokemonTypes: activeMon?.types || pokemonTypes,
      pokemonFormId: activeMon?.formId || pokemonFormId,
      pokemonLevel: battleLevel,
      inventory: userInventory,
      maxAssignedMoves: isChronicle
        ? undefined
        : getResearcherMoveSlotCount(researcherLevel),
      allowUnavailableAssignedMoves: isChronicle,
      pokemon: activeMon,
      profile: state?.ai?.profile,
    })
  }

  return getAvailableMoveOptions({
    pokemonTypes,
    pokemonFormId,
    pokemonLevel,
    inventory: userInventory,
  })
}
