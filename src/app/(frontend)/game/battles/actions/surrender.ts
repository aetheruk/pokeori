import 'server-only'
import { redis } from '@/utilities/redis'
import { revalidatePath } from 'next/cache'
import type { BattleState } from '@/utilities/battle/types'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { trimBattleHistory } from '@/utilities/battle/history'
import { isBattleUser } from '../pvp/state-utils'
import { battles } from '@/data/battles'
import { handleBattleLoss } from '../helpers/loss-handler'
import { settlePvpOutcome } from '../pvp/outcome'
import { acquireActionLock, releaseActionLock } from '@/utilities/game-integrity'

const BATTLE_TTL = 3600

export async function surrenderBattle(): Promise<{success: boolean; message?: string; error?: string}> {
  const user = await getUser()
  if (!user) return {success: false, message: 'Not authenticated'}
  const actorLock = await acquireActionLock(`lock:battle:action:${user.id}`, 60)
  if (!actorLock.acquired) return {success: false, error: 'Another battle action is in progress'}
  try {
    const perspective = await getActiveBattleState(user)
    if (!perspective) return {success: false, message: 'No active battle to surrender'}
    const battleLock = perspective.isPvp && perspective.pvpBattleId
      ? await acquireActionLock(`pvp:resolve-lock:${perspective.pvpBattleId}`, 60)
      : undefined
    if (battleLock && !battleLock.acquired) return {success: false, error: 'The battle turn is resolving'}
    try {
      const key = perspective.isPvp && perspective.pvpBattleId
        ? `pvp:battle:${perspective.pvpBattleId}` : `battle:${user.id}`
      const previous = await redis.get<BattleState>(key)
      if (previous?.status !== 'ongoing') return {success: false, message: 'Battle has ended'}
      const state = structuredClone(previous)
      let isP1 = true
      if (state.isPvp) {
        isP1 = isBattleUser((state.playerTeam[0] as any)?.user, user.id)
        const isP2 = isBattleUser((state.enemyTeam[0] as any)?.user, user.id)
        if (!isP1 && !isP2) return {success: false, error: 'Not a battle participant'}
      }
      state.status = state.isPvp && !isP1 ? 'won' : 'lost'
      state.history.unshift({turn: state.turn, playerStance: 'tech', enemyStance: 'tech',
        result: state.status === 'won' ? 'win' : 'loss', damageDealt: 0, damageTaken: 0,
        message: `${user.trainerName || 'Player'} surrendered!`})
      state.history = trimBattleHistory(state.history)
      let settled = state
      if (state.isPvp) settled = await settlePvpOutcome(state)
      else {
        state.pendingSketchedMoves = undefined
        const config = state.dynamicBattleConfig ?? battles.find((entry) => entry.id === state.battleId)
        await handleBattleLoss(state, user, config)
      }
      const published = await redis.setManyIfValue(key, previous, [{key, value: settled, ttlSeconds: BATTLE_TTL}])
      if (!published) return {success: false, error: 'Battle changed while settling. Retry to restore the result.'}
      revalidatePath('/game/battles/encounter')
      return {success: true}
    } finally { if (battleLock) await releaseActionLock(battleLock) }
  } finally { await releaseActionLock(actorLock) }
}

export async function clearBattleState(): Promise<{success: boolean}> {
  const user = await getUser()
  if (!user) return {success: false}
  const lock = await acquireActionLock(`lock:battle:action:${user.id}`, 60)
  if (!lock.acquired) return {success: false}
  try {
    const state = await getActiveBattleState(user)
    if (state?.status === 'ongoing') return {success: false}
    await redis.del(`battle:${user.id}`)
    await redis.del(`pvp:status:${user.id}`)
    return {success: true}
  } finally { await releaseActionLock(lock) }
}
