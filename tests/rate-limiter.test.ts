import { describe, expect, test } from 'bun:test'
import { getClientIp } from '@/utilities/rate-limiter'

describe('rate limiter helpers', () => {
  test('uses the Cloudflare address only when that proxy is trusted', () => {
    const headers = new Headers({
      'cf-connecting-ip': '203.0.113.11',
      'x-forwarded-for': '203.0.113.10, 198.51.100.20',
      'x-real-ip': '192.0.2.10',
    })

    expect(getClientIp(headers, { trustCloudflare: true })).toBe(
      '203.0.113.11',
    )
    expect(getClientIp(headers)).toBe('unknown')
  })

  test('uses the first forwarded address only for a trusted proxy', () => {
    const headers = new Headers({
      'x-forwarded-for': '203.0.113.10, 198.51.100.20',
      'x-real-ip': '192.0.2.10',
    })

    expect(getClientIp(headers, { trustProxy: true })).toBe('203.0.113.10')
    expect(getClientIp(new Headers())).toBe('unknown')
  })
})
