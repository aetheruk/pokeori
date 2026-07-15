import {
  acquireActionLock,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { redis } from '@/utilities/redis'

const VALID_CLIENT_ACTION_ID = /^[a-zA-Z0-9:_-]{1,120}$/
const BATTLE_ACTION_LOCK_TTL_SECONDS = 12
const BATTLE_ACTION_RESULT_TTL_SECONDS = 120

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

function getBattleActionLockKey(userId: string) {
  return `lock:battle:action:${userId}`
}

function getBattleActionPendingKey(userId: string) {
  return `battle:action:pending:${userId}`
}

function getBattleActionResultKey(userId: string, clientActionId?: string) {
  if (!clientActionId || !VALID_CLIENT_ACTION_ID.test(clientActionId)) {
    return undefined
  }

  return `battle:action:result:${userId}:${clientActionId}`
}

async function waitForCachedBattleActionResult<T>(
  key: string,
): Promise<T | null> {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const cached = await getIdempotentResult<T>(key)
    if (cached) return cached
    await wait(120)
  }

  return null
}

export async function runBattleActionWithGuard<
  T extends { success: boolean; error?: string },
>(
  userId: string,
  clientActionId: string | undefined,
  action: () => Promise<T>,
): Promise<T> {
  const resultKey = getBattleActionResultKey(userId, clientActionId)
  const pendingActionId = resultKey ? clientActionId : undefined
  const pendingKey = getBattleActionPendingKey(userId)

  if (resultKey) {
    const cached = await getIdempotentResult<T>(resultKey)
    if (cached) return cached
  }

  const lock = await acquireActionLock(
    getBattleActionLockKey(userId),
    BATTLE_ACTION_LOCK_TTL_SECONDS,
  )

  if (!lock.acquired) {
    const activeActionId = pendingActionId
      ? await redis.get<string>(pendingKey)
      : null
    if (resultKey && activeActionId === pendingActionId) {
      const cached = await waitForCachedBattleActionResult<T>(resultKey)
      if (cached) return cached
    }

    return {
      success: false,
      error: 'Another battle action is being processed',
    } as T
  }

  try {
    if (pendingActionId) {
      await redis.set(pendingKey, pendingActionId, {
        ex: BATTLE_ACTION_LOCK_TTL_SECONDS,
      })
    }

    if (resultKey) {
      const cached = await getIdempotentResult<T>(resultKey)
      if (cached) return cached
    }

    const result = await action()
    if (resultKey) {
      await setIdempotentResult(
        resultKey,
        result,
        BATTLE_ACTION_RESULT_TTL_SECONDS,
      )
    }
    return result
  } finally {
    if (pendingActionId) {
      await redis.deleteIfValue(pendingKey, pendingActionId)
    }
    await releaseActionLock(lock)
  }
}
