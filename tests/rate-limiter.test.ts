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

  test('uses the configured trusted end of the forwarded chain', () => {
    const headers = new Headers({
      'x-forwarded-for': '203.0.113.10, 198.51.100.20',
      'x-real-ip': '192.0.2.10',
    })

    expect(getClientIp(headers, { trustProxy: true })).toBe('198.51.100.20')
    expect(getClientIp(headers, { trustProxy: true, trustedProxyHops: 2 })).toBe('203.0.113.10')
    expect(getClientIp(new Headers())).toBe('unknown')
  })
  test('spoofed prefixes, malformed addresses and incomplete trusted chains cannot select an identity', () => {
    const headers = new Headers({ 'x-forwarded-for': 'attacker, 192.0.2.1' })
    expect(getClientIp(headers, { trustProxy: true })).toBe('192.0.2.1')
    expect(getClientIp(headers, { trustProxy: true, trustedProxyHops: 2 })).toBe('unknown')
    expect(getClientIp(headers, { trustProxy: true, trustedProxyHops: 3 })).toBe('unknown')
    expect(getClientIp(headers, { trustProxy: true, trustedProxyHops: 0 })).toBe('unknown')
    expect(getClientIp(new Headers({ 'cf-connecting-ip': '192.0.2.1, 192.0.2.2' }), { trustCloudflare: true })).toBe('unknown')
    expect(getClientIp(new Headers({ 'x-forwarded-for': '2001:db8::1' }), { trustProxy: true })).toBe('2001:db8::1')
  })
})
