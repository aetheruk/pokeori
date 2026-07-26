import { describe, expect, test } from 'bun:test'
import type { RequirementData } from '@/utilities/requirements'
import { selectFreshestGameData } from '@/utilities/game-data-snapshot'

function snapshot(updatedAt: string, marker: string) {
  return {
    user: { id: 'user-1', updatedAt, marker },
  } as unknown as RequirementData
}

describe('game data snapshot selection', () => {
  test('prefers a newer RSC snapshot over stale scoped client data', () => {
    const cached = snapshot('2026-07-26T12:00:00.000Z', 'cached')
    const server = snapshot('2026-07-26T12:01:00.000Z', 'server')

    expect(selectFreshestGameData(cached, server)).toBe(server)
  })

  test('keeps newer client data after a server snapshot has hydrated', () => {
    const cached = snapshot('2026-07-26T12:02:00.000Z', 'cached')
    const server = snapshot('2026-07-26T12:01:00.000Z', 'server')

    expect(selectFreshestGameData(cached, server)).toBe(cached)
  })
})
