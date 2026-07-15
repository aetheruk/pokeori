import Bottleneck from 'bottleneck'

// Create a global rate limiter instance
const limiter = new Bottleneck({
  maxConcurrent: 10, // Max 10 concurrent requests
  minTime: 100, // Min 100ms between requests (10 req/sec)
  reservoir: 100, // Initial bucket size
  reservoirRefreshAmount: 100, // Refill amount
  reservoirRefreshInterval: 60 * 1000, // Refill every 60 seconds
})

// Per-IP rate limiter using in-memory store (consider Redis for production)
const ipLimiters = new Map<string, { limiter: Bottleneck; lastSeen: number }>()
const IP_LIMITER_TTL_MS = 10 * 60 * 1000

function pruneExpiredLimiters(now = Date.now()) {
  for (const [ip, entry] of ipLimiters.entries()) {
    if (now - entry.lastSeen > IP_LIMITER_TTL_MS) {
      void entry.limiter.stop({ dropWaitingJobs: true })
      ipLimiters.delete(ip)
    }
  }
}

export function getRateLimiter(ip: string): Bottleneck {
  const now = Date.now()
  pruneExpiredLimiters(now)

  const existing = ipLimiters.get(ip)
  if (existing) {
    existing.lastSeen = now
    return existing.limiter
  }

  if (!ipLimiters.has(ip)) {
    const limiter = new Bottleneck({
      maxConcurrent: 5,
      minTime: 200, // 5 req/sec per IP
      reservoir: 30, // 30 requests
      reservoirRefreshAmount: 30,
      reservoirRefreshInterval: 60 * 1000,
    })
    ipLimiters.set(ip, { limiter, lastSeen: now })
  }
  return ipLimiters.get(ip)!.limiter
}

export async function rateLimit(ip: string): Promise<boolean> {
  const limiter = getRateLimiter(ip)
  try {
    await limiter.schedule(() => Promise.resolve())
    return true // Allowed
  } catch {
    return false // Rate limited
  }
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  return headers.get('x-real-ip')?.trim() || 'unknown'
}
