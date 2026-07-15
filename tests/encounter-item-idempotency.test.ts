import { describe, expect, test } from 'bun:test'
import { getEncounterItemResultKey } from '@/app/(frontend)/game/locations/encounter/actions/item-idempotency'

describe('encounter item idempotency', () => {
  test('keys repeated uses of the same item by the encounter item-use slot', () => {
    const baseState = {
      locationId: 'route-4-catch',
      startTime: 12345,
      itemsUsed: [],
    }

    const firstUseKey = getEncounterItemResultKey({
      userId: 'user-1',
      state: baseState,
      itemId: 'water-lure',
    })
    const firstRetryKey = getEncounterItemResultKey({
      userId: 'user-1',
      state: baseState,
      itemId: 'water-lure',
    })
    const secondUseKey = getEncounterItemResultKey({
      userId: 'user-1',
      state: { ...baseState, itemsUsed: ['water-lure'] },
      itemId: 'water-lure',
    })

    expect(firstRetryKey).toBe(firstUseKey)
    expect(secondUseKey).not.toBe(firstUseKey)
  })
})
