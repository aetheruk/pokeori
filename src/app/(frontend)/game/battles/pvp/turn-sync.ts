import { randomUUID } from 'node:crypto'
import { redis } from '@/utilities/redis'
import type { BattleState } from '@/utilities/battle/types'
import { BATTLE_TTL, PVP_BATTLE_PREFIX, PVP_TURN_PREFIX } from '../helpers/state-management'
import { resolvePvpTurn, type PvpMove } from './resolution'
import { getSharedBattleUserIds, normalizeBattleUserId, toPerspectivePvpState } from './state-utils'

const TURN_ENTRY_TTL_SECONDS = 300
const TURN_RESOLVE_LOCK_TTL_SECONDS = 6
const TURN_RESOLVE_LOCK_PREFIX = 'pvp:resolve-lock:'

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

async function releaseLockIfOwned(lockKey: string, token: string) {
  const lockValue = await redis.get<string>(lockKey)
  if (lockValue === token) {
    await redis.del(lockKey)
  }
}

async function waitForResolvedTurn(
  battleId: string,
  expectedTurn: number,
  attempts: number = 8,
): Promise<BattleState | null> {
  for (let index = 0; index < attempts; index += 1) {
    const sharedState = await redis.get<BattleState>(`${PVP_BATTLE_PREFIX}${battleId}`)
    if (!sharedState) return null
    if (sharedState.turn !== expectedTurn) return sharedState
    await wait(120)
  }

  return await redis.get<BattleState>(`${PVP_BATTLE_PREFIX}${battleId}`)
}

async function resolveSharedTurnWithLock(params: {
  battleId: string
  expectedTurn: number
  viewerId: string
  viewerMove: PvpMove
  opponentMove: PvpMove
}): Promise<BattleState | null> {
  const { battleId, expectedTurn, viewerId, viewerMove, opponentMove } = params
  const lockKey = `${TURN_RESOLVE_LOCK_PREFIX}${battleId}:${expectedTurn}`
  const token = `${viewerId}:${randomUUID()}`

  const acquired = await redis.set(lockKey, token, {
    nx: true,
    ex: TURN_RESOLVE_LOCK_TTL_SECONDS,
  })

  if (!acquired) {
    return waitForResolvedTurn(battleId, expectedTurn)
  }

  try {
    const sharedState = await redis.get<BattleState>(`${PVP_BATTLE_PREFIX}${battleId}`)
    if (!sharedState) return null
    if (sharedState.turn !== expectedTurn) return sharedState

    const { p1Id, p2Id } = getSharedBattleUserIds(sharedState)
    if (!p1Id || !p2Id) {
      return sharedState
    }

    const p1Move = viewerId === p1Id ? viewerMove : opponentMove
    const p2Move = viewerId === p2Id ? viewerMove : opponentMove

    const nextState = await resolvePvpTurn(sharedState, p1Move, p2Move)

    await redis.set(`${PVP_BATTLE_PREFIX}${battleId}`, nextState, { ex: BATTLE_TTL })

    const turnKey = `${PVP_TURN_PREFIX}${battleId}:${expectedTurn}`
    await redis.del(`${turnKey}:${p1Id}`)
    await redis.del(`${turnKey}:${p2Id}`)

    return nextState
  } finally {
    await releaseLockIfOwned(lockKey, token)
  }
}

export async function queuePvpMoveAndResolveTurn(params: {
  viewerId: string
  battleState: BattleState
  move: PvpMove
}): Promise<{ waiting: boolean; state: BattleState }> {
  const { viewerId, battleState, move } = params

  if (!battleState.pvpBattleId) {
    return { waiting: false, state: battleState }
  }

  const battleId = battleState.pvpBattleId
  const expectedTurn = battleState.turn
  const turnKey = `${PVP_TURN_PREFIX}${battleId}:${expectedTurn}`

  await redis.set(`${turnKey}:${viewerId}`, move, { ex: TURN_ENTRY_TTL_SECONDS })

  const opponentId = normalizeBattleUserId((battleState.enemyTeam[0] as any)?.user)
  if (!opponentId) {
    return { waiting: false, state: battleState }
  }

  const opponentMove = await redis.get<PvpMove>(`${turnKey}:${opponentId}`)
  if (!opponentMove) {
    return { waiting: true, state: battleState }
  }

  const resolvedState = await resolveSharedTurnWithLock({
    battleId,
    expectedTurn,
    viewerId,
    viewerMove: move,
    opponentMove,
  })

  if (!resolvedState) {
    return { waiting: false, state: battleState }
  }

  const perspectiveState = toPerspectivePvpState(resolvedState, viewerId, battleId)

  return {
    waiting: resolvedState.turn === expectedTurn,
    state: perspectiveState,
  }
}
