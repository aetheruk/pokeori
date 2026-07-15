import { redis } from '@/utilities/redis'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import type { BattleState } from '@/utilities/battle/types'
import { getUser } from '../helpers/user'
import { getActiveBattleState, PVP_BATTLE_PREFIX, BATTLE_TTL } from '../helpers/state-management'
import { isBattleUser } from '../pvp/state-utils'
import { incrementUserActivityResult } from '@/utilities/user-state'

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

  // Determine if PVP
  if (state.isPvp && state.pvpBattleId) {
    const sharedState = await redis.get<BattleState>(`${PVP_BATTLE_PREFIX}${state.pvpBattleId}`)
    if (!sharedState) return { success: false, error: 'Battle not found' }

    // Identify P1/P2 from shared state
    const isP1 = isBattleUser((sharedState.playerTeam[0] as any)?.user, user.id)

    // If P1 surrenders, P1 loses -> status 'lost'.
    // If P2 surrenders, P1 wins -> status 'won'.
    const newStatus = isP1 ? 'lost' : 'won'

    // Update Shared State
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

    await redis.set(`${PVP_BATTLE_PREFIX}${state.pvpBattleId}`, sharedState, { ex: 3600 })
  } else {
    // PVE Surrender
    state.status = 'lost'
    state.history.unshift({
      turn: state.turn,
      playerStance: 'tech', // Dummy
      enemyStance: 'tech', // Dummy
      result: 'loss',
      damageDealt: 0,
      damageTaken: 0,
      message: `${state.playerName || 'Player'} surrendered.`,
    })
    // Save updated state so UI sees the loss
    await redis.set(`battle:${user.id}`, state, { ex: BATTLE_TTL })
  }

  // Update User Stats (Loss)
  const payload = await getPayload({ config: configPromise })
  await incrementUserActivityResult(payload as any, user.id, 'battleResults', state.battleId, {
    losses: 1,
  })

  revalidatePath('/game/battles/encounter')
  return { success: true }
}
