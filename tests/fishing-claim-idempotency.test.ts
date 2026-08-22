import { describe, expect, mock, test } from 'bun:test'

const reservations = new Set<string>()

mock.module('@/utilities/redis', () => ({
  redis: {
    set: async (key: string, _value: unknown, options?: { nx?: boolean }) => {
      if (options?.nx && reservations.has(key)) return null
      reservations.add(key)
      return 'OK'
    },
  },
}))

const { reserveIdempotentResult } = await import('@/utilities/game-integrity')

describe('idempotent grant reservations', () => {
  test('only one concurrent request can reserve a claim key', async () => {
    reservations.clear()

    await expect(reserveIdempotentResult('fishing:item-claim:test')).resolves.toBe(true)
    await expect(reserveIdempotentResult('fishing:item-claim:test')).resolves.toBe(false)
  })
})
