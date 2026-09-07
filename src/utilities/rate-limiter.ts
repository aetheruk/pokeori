import { redis } from '@/utilities/redis'
import { isIP } from 'node:net'

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
  trustedProxyHops?: number
}

function validAddress(value: string | null): string | null {
  const address = value?.trim()
  return address && isIP(address) ? address : null
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
    const cloudflareIp = validAddress(headers.get('cf-connecting-ip'))
    if (cloudflareIp) return cloudflareIp
  }

  if (trustProxy) {
    const hops = options.trustedProxyHops ?? Number(process.env.TRUSTED_PROXY_HOPS || 1)
    if (!Number.isInteger(hops) || hops < 1 || hops > 10) return 'unknown'
    const addresses = headers.get('x-forwarded-for')?.split(',') || []
    // Count from the trusted end. A caller-controlled prepended address must
    // not provide a fresh rate-limit identity through an appending proxy.
    return validAddress(addresses.at(-hops) ?? null) || 'unknown'
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
