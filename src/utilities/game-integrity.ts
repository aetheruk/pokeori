import { redis } from '@/utilities/redis'

export interface RateLimitCheck {
  allowed: boolean
  count: number
  limit: number
  windowSeconds: number
  remaining: number
}

export interface ActionLock {
  key: string
  token: string
  acquired: boolean
}

export async function checkActionRateLimit(
  userId: string,
  action: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitCheck> {
  const key = `ratelimit:${userId}:${action}`
  const count = await redis.incr(key)

  if (count === 1) {
    await redis.expire(key, windowSeconds)
  }

  return {
    allowed: count <= limit,
    count,
    limit,
    windowSeconds,
    remaining: Math.max(0, limit - count),
  }
}

export async function acquireActionLock(key: string, ttlSeconds = 10): Promise<ActionLock> {
  const token = crypto.randomUUID()
  const res = await redis.set(key, token, { nx: true, ex: ttlSeconds })

  return {
    key,
    token,
    acquired: res === 'OK',
  }
}

export async function releaseActionLock(lock: ActionLock): Promise<void> {
  if (!lock.acquired) return
  await redis.deleteIfValue(lock.key, lock.token)
}

export async function getIdempotentResult<T>(key: string): Promise<T | null> {
  return await redis.get<T>(key)
}

export async function setIdempotentResult<T>(
  key: string,
  value: T,
  ttlSeconds = 600,
): Promise<void> {
  await redis.set(key, value, { ex: ttlSeconds })
}
