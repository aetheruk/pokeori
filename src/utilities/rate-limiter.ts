import { redis } from '@/utilities/redis'

export type RateLimitResult = {
  allowed: boolean
  count: number
  limit: number
  remaining: number
  windowSeconds: number
}

type ClientIpOptions = {
  trustCloudflare?: boolean
  trustProxy?: boolean
}

function firstAddress(value: string | null): string | null {
  const address = value?.split(',')[0]?.trim()
  return address || null
}

export function getClientIp(
  headers: Headers,
  options: ClientIpOptions = {},
): string {
  const trustCloudflare =
    options.trustCloudflare ??
    process.env.TRUST_CLOUDFLARE_PROXY === 'true'
  const trustProxy =
    options.trustProxy ?? process.env.TRUST_PROXY_HEADERS === 'true'

  if (trustCloudflare) {
    const cloudflareIp = firstAddress(headers.get('cf-connecting-ip'))
    if (cloudflareIp) return cloudflareIp
  }

  if (trustProxy) {
    return (
      firstAddress(headers.get('x-forwarded-for')) ||
      firstAddress(headers.get('x-real-ip')) ||
      'unknown'
    )
  }

  return 'unknown'
}

export async function rateLimit(
  namespace: string,
  identifier: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const safeIdentifier = identifier || 'unknown'
  const key = `ratelimit:http:${namespace}:${safeIdentifier}`
  const count = await redis.incrementWithExpiry(key, windowSeconds)

  return {
    allowed: count <= limit,
    count,
    limit,
    remaining: Math.max(0, limit - count),
    windowSeconds,
  }
}
