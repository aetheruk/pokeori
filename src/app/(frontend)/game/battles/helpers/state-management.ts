import { redis } from '@/utilities/redis'
import type { BattleState } from '@/utilities/battle/types'
import type { User } from '@/payload-types'
import { checkPvpStatus } from '@/utilities/battle/pvp-logic'
import { initializeSharedPvpBattle } from '../pvp/start-battle'
import { toPerspectivePvpState } from '../pvp/state-utils'
import { isActivityEligibleForReplay } from '@/utilities/activity-replay'
import { getUser } from './user'
import { sanitizeBattleMoveState } from '@/utilities/battle/state-sanitization'
import { normalizeChronicleBattleBudgets } from '@/utilities/battle/chronicle-budgets'

export const BATTLE_TTL = 3600 // 1 hour
export const PVP_BATTLE_PREFIX = 'pvp:battle:'
export const PVP_TURN_PREFIX = 'pvp:turn:'

// Internal Helper: Get Active Battle State (Handles PVP vs PVE)
export async function getActiveBattleState(
  user: User,
): Promise<BattleState | null> {
  // 1. Check for PVP Battle
  const pvpStatus = await checkPvpStatus(user.id)
  if (pvpStatus.battleId) {
    // Fetch shared state
    let sharedState = await redis.get<BattleState>(
      `${PVP_BATTLE_PREFIX}${pvpStatus.battleId}`,
    )

    if (!sharedState) {
      // Check for match data to initialize
      const matchData = await redis.get<{
        player1: string
        player2: string
        configId: string
      }>(`pvp:match:${pvpStatus.battleId}`)
      if (!matchData) return null

      sharedState = await initializeSharedPvpBattle(
        pvpStatus.battleId,
        matchData,
      )
      if (!sharedState) return null
    }

    const sanitized = sanitizeBattleMoveState(sharedState)
    if (sanitized.changed) {
      sharedState = sanitized.state
      await redis.set(
        `${PVP_BATTLE_PREFIX}${pvpStatus.battleId}`,
        sharedState,
        {
          ex: BATTLE_TTL,
        },
      )
    }

    return toPerspectivePvpState(sharedState, user.id, pvpStatus.battleId)
  }

  // 2. Fetch PVE Battle
  const battleState = await redis.get<BattleState>(`battle:${user.id}`)
  if (!battleState) {
    return null
  }

  const sanitized = sanitizeBattleMoveState(battleState)
  let chronicleBudgetsChanged = false
  if (sanitized.state.chronicle) {
    const { battles } = await import('@/data/battles')
    const battleConfig = battles.find(
      (battle) => battle.id === sanitized.state.battleId,
    )
    chronicleBudgetsChanged = normalizeChronicleBattleBudgets(
      sanitized.state,
      battleConfig,
    )
  }
  if (sanitized.changed || chronicleBudgetsChanged) {
    await redis.set(`battle:${user.id}`, sanitized.state, { ex: BATTLE_TTL })
  }

  const needsReplayEligibility =
    sanitized.state.status !== 'ongoing' &&
    sanitized.state.isEligibleForReplay === undefined

  if (needsReplayEligibility) {
    if (sanitized.state.dynamicBattleConfig) {
      sanitized.state.isEligibleForReplay = false
      return sanitized.state
    }

    const { battles } = await import('@/data/battles')
    const battleConfig = battles.find((b) => b.id === sanitized.state.battleId)
    if (battleConfig) {
      sanitized.state.isEligibleForReplay = await isActivityEligibleForReplay(
        user as User,
        battleConfig,
        'battle',
      )
    }
  }

  return sanitized.state
}

export async function clearBattleState(
  userId?: string,
): Promise<{ success: boolean }> {
  // const targetId = userId // Caller must provide or we fetch
  // If no userId provided, we can't clear.
  return { success: true }
}

export async function getBattleState(): Promise<BattleState | null> {
  const user = await getUser()
  if (!user) return null
  return getActiveBattleState(user)
}
