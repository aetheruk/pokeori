/**
 * Victory Power system.
 * Allows swapping to a backline Pokemon of matching type with Victory status.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import type { BattleState, BattleStance } from '@/utilities/battle/types'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { queuePvpMoveAndResolveTurn } from '../pvp/turn-sync'
import { validateSelectedPokemonPower } from '@/utilities/pokemon/pokemon-powers'
import { needsPlayerReplacement } from '@/utilities/battle/switching'
import { markPlayerPokemonInvolved } from '@/utilities/battle/participants'
import {
  clearPokemonSecondaryStatuses,
  clearSourceLinkedTrapSecondaryStatuses,
} from '@/utilities/battle/secondary-statuses'
import {
  getSkillLevel,
  validateBattlePowerSkillRequirement,
} from '@/utilities/skills/unlocks'
import { getUserInventoryMap } from '@/utilities/user-state'
import { runBattleActionWithGuard } from '../helpers/action-guard'

/**
 * Use a Victory Power item to swap to a Pokemon of matching type.
 * The swapped Pokemon receives Victory status (enhanced next attack).
 * Triggers a free enemy attack in PVE mode.
 *
 * @param itemId - ID of the Victory item (e.g., 'victory-fire')
 */
export async function useVictoryPower(
  itemId: string,
  clientActionId?: string,
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  message?: string
  waiting?: boolean
}> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  return runBattleActionWithGuard(user.id, clientActionId, async () => {
    const state = await getActiveBattleState(user)
    if (!state) return { success: false, error: 'No active battle' }

    if (state.status !== 'ongoing')
      return { success: false, error: 'Battle has ended' }
    if (needsPlayerReplacement(state)) {
      return {
        success: false,
        error: 'Choose your next Pokemon before using Victory Power',
        state,
      }
    }

    if (!state.powers) {
      const { createInitialPowersState } = await import('@/data/powers')
      state.powers = createInitialPowersState()
    }

    if (state.powers.victoryUsesRemaining <= 0) {
      return { success: false, error: 'No Victory Power uses remaining' }
    }

    // Validate item ownership
    const payload = await getPayload({ config: configPromise })
    const userInventory = await getUserInventoryMap(payload as any, user.id)
    if ((userInventory[itemId] || 0) < 1) {
      return { success: false, error: 'You do not own this Victory Symbol' }
    }
    const skillRequirementError = validateBattlePowerSkillRequirement(
      'victory',
      getSkillLevel(user.skills, 'battling'),
    )
    if (skillRequirementError)
      return { success: false, error: skillRequirementError }

    // Extract type from ID (e.g., victory-fire -> fire)
    if (!itemId.startsWith('victory-')) {
      return { success: false, error: 'Invalid Victory Item' }
    }
    const type = itemId.replace('victory-', '')

    const playerTeam = state.playerTeam
    const activeIndex = state.activePlayerIndex

    if (playerTeam[activeIndex].isShadow) {
      return { success: false, error: 'Shadow Pokemon cannot use Powers!' }
    }

    const selectedPowerError = validateSelectedPokemonPower({
      selectedPokemonPower: playerTeam[activeIndex].selectedPokemonPower,
      requiredPower: 'victory',
      pokemonName: playerTeam[activeIndex].name,
    })
    if (selectedPowerError) {
      return { success: false, error: selectedPowerError }
    }

    // Find valid swap targets (matching type, alive, not active)
    const validIndices: number[] = []
    playerTeam.forEach((p, index) => {
      if (index === activeIndex) return
      if (p.currentHp <= 0) return
      if (p.types.some((t) => t.toLowerCase() === type.toLowerCase())) {
        validIndices.push(index)
      }
    })

    if (validIndices.length === 0) {
      return {
        success: false,
        error: 'No valid Pokemon of that type to swap to!',
      }
    }

    // Pick random target from valid options
    const randomIndex =
      validIndices[Math.floor(Math.random() * validIndices.length)]
    const newPokemon = playerTeam[randomIndex]

    // Handle PVP Victory Power
    if (state.isPvp && state.pvpBattleId) {
      return await handlePvpVictoryPower(user, state, randomIndex, itemId)
    }

    // Handle PVE Victory Power
    return await handlePveVictoryPower(user, state, randomIndex, newPokemon)
  })
}

/**
 * Handle Victory Power in PVP battles.
 */
async function handlePvpVictoryPower(
  user: any,
  state: BattleState,
  swapIndex: number,
  itemId: string,
): Promise<{
  success: boolean
  state?: BattleState
  waiting?: boolean
}> {
  if (!state.pvpBattleId) return { success: false }

  const syncResult = await queuePvpMoveAndResolveTurn({
    viewerId: user.id,
    battleState: state,
    move: {
      stance: 'speed' as BattleStance,
      attackType: `victory-swap:${swapIndex}:${itemId}`,
    },
  })

  if (syncResult.waiting) {
    return { success: true, state: syncResult.state, waiting: true }
  }

  if (syncResult.state.status !== 'ongoing') {
    revalidatePath('/game/battles/encounter')
  }
  return { success: true, state: syncResult.state }
}

/**
 * Handle Victory Power in PVE battles.
 */
async function handlePveVictoryPower(
  user: any,
  state: BattleState,
  swapIndex: number,
  newPokemon: any,
): Promise<{
  success: boolean
  state: BattleState
  message: string
}> {
  // Apply Victory status
  newPokemon.status = { id: 'victory', counter: 0 }

  // Decrement usage
  state.powers!.victoryUsesRemaining -= 1

  const payload = await getPayload({ config: configPromise })
  const powerUsage =
    ((user as any).powerUsage as Record<string, number> | undefined) || {}
  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      powerUsage: {
        ...powerUsage,
        victoryUses: (powerUsage.victoryUses || 0) + 1,
      },
    },
  })

  // Perform swap
  const outgoingPokemon = state.playerTeam[state.activePlayerIndex]
  clearSourceLinkedTrapSecondaryStatuses({
    state,
    sourceSide: 'player',
    sourcePokemon: outgoingPokemon,
  })
  clearPokemonSecondaryStatuses(outgoingPokemon)
  state.activePlayerIndex = swapIndex
  markPlayerPokemonInvolved(state, swapIndex)

  // Enemy gets free attack
  const enemyMon = state.enemyTeam[state.activeEnemyIndex]
  const { processEnemyAttackOnly } = await import('../pve/enemy-attack')

  const message = `${newPokemon.name} was swapped in with Victory status!`
  await processEnemyAttackOnly(state, newPokemon, enemyMon, user, message)

  return { success: true, state, message }
}
