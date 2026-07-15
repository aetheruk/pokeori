import { describe, expect, test } from 'bun:test'
import { getClientIp } from '@/utilities/rate-limiter'

describe('rate limiter helpers', () => {
  test('uses first forwarded IP when a proxy chain is present', () => {
    const headers = new Headers({
      'x-forwarded-for': '203.0.113.10, 198.51.100.20',
      'x-real-ip': '192.0.2.10',
    })

    expect(getClientIp(headers)).toBe('203.0.113.10')
  })

  test('falls back to real IP or unknown', () => {
    expect(getClientIp(new Headers({ 'x-real-ip': '192.0.2.10' }))).toBe('192.0.2.10')
    expect(getClientIp(new Headers())).toBe('unknown')
  })
})

