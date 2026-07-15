import { describe, expect, test } from 'bun:test'
import {
  ensureUserWeatherSlot,
  getActiveStoredWeatherSlot,
  getWeatherSlotFromRoll,
  resolveSubRegionWeather,
} from '@/utilities/weather'

describe('weather slots', () => {
  test('maps one-million roll range into twenty fifty-thousand slots', () => {
    expect(getWeatherSlotFromRoll(1)).toBe(1)
    expect(getWeatherSlotFromRoll(50_000)).toBe(1)
    expect(getWeatherSlotFromRoll(50_001)).toBe(2)
    expect(getWeatherSlotFromRoll(999_999)).toBe(20)
    expect(getWeatherSlotFromRoll(1_000_000)).toBe(20)
  })

  test('reuses stored weather inside the thirty-minute window', async () => {
    const now = new Date('2026-06-06T12:00:00.000Z')
    const user = {
      id: 'user-1',
      weatherSlot: 7,
      weatherUpdatedAt: '2026-06-06T11:45:00.000Z',
    }
    const updates: any[] = []
    const payload = {
      update: async (args: any) => {
        updates.push(args)
      },
    }

    expect(getActiveStoredWeatherSlot(user, now)?.slot).toBe(7)
    const state = await ensureUserWeatherSlot(payload, user, now, () => 0.99)

    expect(state).toMatchObject({ slot: 7, rolled: false })
    expect(updates).toEqual([])
  })

  test('rerolls stale weather and persists the new slot', async () => {
    const now = new Date('2026-06-06T12:00:00.000Z')
    const user = {
      id: 'user-1',
      weatherSlot: 7,
      weatherUpdatedAt: '2026-06-06T11:29:59.000Z',
    }
    const updates: any[] = []
    const payload = {
      update: async (args: any) => {
        updates.push(args)
      },
    }

    const state = await ensureUserWeatherSlot(payload, user, now, () => 0.55)

    expect(state.slot).toBe(12)
    expect(state.rolled).toBe(true)
    expect(updates[0].data).toEqual({
      weatherSlot: 12,
      weatherUpdatedAt: '2026-06-06T12:00:00.000Z',
    })
  })

  test('resolves authored sub-region slots and defaults missing slots to clear', () => {
    expect(resolveSubRegionWeather('Viridian Forest', 1).weather).toBe('rain')
    expect(resolveSubRegionWeather('Viridian Forest', 11).weather).toBe('clear')
    expect(resolveSubRegionWeather('Unknown Place', 11).weather).toBe('clear')
  })
})
