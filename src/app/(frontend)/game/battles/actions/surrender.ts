/**
 * Surrender and clear battle state actions.
 * Handles both PVE and PVP battle surrender with proper state updates.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redis } from '@/utilities/redis'
import { revalidatePath } from 'next/cache'
import type { BattleState } from '@/utilities/battle/types'
import type { User } from '@/payload-types'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { trimBattleHistory } from '@/utilities/battle/history'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import { isBattleUser } from '../pvp/state-utils'
import { battles } from '@/data/battles'
import { applyTrainerBattleLossPayout } from '../helpers/loss-payout'
import { persistConsumedHeldItems } from '../helpers/held-items'
import { incrementUserActivityResult } from '@/utilities/user-state'
import { persistPokemonBattleKOs } from '../helpers/pokemon-ko-credit'

const PVP_BATTLE_PREFIX = 'pvp:battle:'
const BATTLE_TTL = 3600

function getBattleConfigForState(state: BattleState) {
  return (
    state.dynamicBattleConfig ??
    battles.find((battle) => battle.id === state.battleId)
  )
}

/**
 * Surrender the current battle.
 * For PVP, updates shared state to reflect opponent's win.
 * For PVE, marks battle as lost.
 * Updates user stats with a loss.
 */
export async function surrenderBattle(): Promise<{
  success: boolean
  message?: string
  error?: string
}> {
  const user = await getUser()
  if (!user) return { success: false, message: 'Not authenticated' }

  const state = await getActiveBattleState(user)
  if (!state) {
    return { success: false, message: 'No active battle to surrender' }
  }
  if (state.status !== 'ongoing') {
    return { success: false, message: 'Battle has ended' }
  }

  // Handle PVP surrender
  if (state.isPvp && state.pvpBattleId) {
    await handlePvpSurrender(user, state)
  } else {
    // Handle PVE surrender
    await handlePveSurrender(user, state)
  }

  // Update user stats with loss
  if (!state.chronicle) {
    await updateSurrenderStats(user, state.battleId)
  }
  const expeditionResult = await recordExpeditionActivityResult(
    user.id,
    'battle',
    state.battleId,
    false,
  )
  if (!state.isPvp && expeditionResult.expedition) {
    state.expeditionProgress = expeditionResult.expedition
  }

  if (!state.isPvp) {
    const battleConfig = getBattleConfigForState(state)
    if (battleConfig) {
      const amountLost = await applyTrainerBattleLossPayout(
        state,
        user,
        battleConfig,
      )
      if (amountLost > 0) {
        state.history[0].message += `\nYou paid ${amountLost} Pokedollars.`
      }
    }
    await persistPokemonBattleKOs(state)
    await persistConsumedHeldItems(state)
    await redis.set(`battle:${user.id}`, state, { ex: BATTLE_TTL })
  }

  revalidatePath('/game/battles/encounter')
  return { success: true }
}

/**
 * Handle surrender in a PVP battle.
 * Updates the shared battle state to reflect the opponent's victory.
 */
async function handlePvpSurrender(user: User, state: BattleState): Promise<void> {
  if (!state.pvpBattleId) return

  const sharedState = await redis.get<BattleState>(`${PVP_BATTLE_PREFIX}${state.pvpBattleId}`)
  if (!sharedState) return

  const isP1 = isBattleUser((sharedState.playerTeam[0] as any)?.user, user.id)

  // If P1 surrenders, P1 loses -> status 'lost'
  // If P2 surrenders, P1 wins -> status 'won'
  const newStatus = isP1 ? 'lost' : 'won'

  // Update shared state
  sharedState.status = newStatus
  sharedState.history.unshift({
    turn: sharedState.turn,
    playerStance: 'tech',
    enemyStance: 'tech',
    result: isP1 ? 'loss' : 'win', // From P1 perspective
    damageDealt: 0,
    damageTaken: 0,
    message: `${user.trainerName || 'Opponent'} surrendered!`,
  })
  sharedState.history = trimBattleHistory(sharedState.history)

  await persistPokemonBattleKOs(sharedState)
  await persistConsumedHeldItems(sharedState)
  await redis.set(`${PVP_BATTLE_PREFIX}${state.pvpBattleId}`, sharedState, { ex: 3600 })
}

/**
 * Handle surrender in a PVE battle.
 * Updates the battle state to reflect a loss.
 */
async function handlePveSurrender(user: User, state: BattleState): Promise<void> {
  state.status = 'lost'
  state.history.unshift({
    turn: state.turn,
    playerStance: 'tech',
    enemyStance: 'tech',
    result: 'loss',
    damageDealt: 0,
    damageTaken: 0,
    message: `${state.playerName || 'Player'} surrendered.`,
  })
  state.history = trimBattleHistory(state.history)

  // Save updated state so UI sees the loss
  await redis.set(`battle:${user.id}`, state, { ex: BATTLE_TTL })
}

/**
 * Update user battle statistics with a loss from surrender.
 */
async function updateSurrenderStats(user: User, battleId: string): Promise<void> {
  const payload = await getPayload({ config: configPromise })
  await incrementUserActivityResult(payload as any, user.id, 'battleResults', battleId, {
    losses: 1,
  })
}

/**
 * Clear all battle state for the current user.
 * Removes both PVE battle state and PVP status.
 */
export async function clearBattleState(): Promise<{ success: boolean }> {
  const user = await getUser()
  if (!user) return { success: false }

  await redis.del(`battle:${user.id}`)
  // Also clear PVP status
  await redis.del(`pvp:status:${user.id}`)

  return { success: true }
}
