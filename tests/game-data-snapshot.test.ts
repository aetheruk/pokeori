import { describe, expect, test } from 'bun:test'
import type { RequirementData } from '@/utilities/requirements'
import { selectFreshestGameData } from '@/utilities/game-data-snapshot'

function snapshot(updatedAt: string, marker: string) {
  return {
    user: { id: 'user-1', updatedAt, marker },
  } as unknown as RequirementData
}

function generatedSnapshot(
  snapshotAt: string,
  updatedAt: string,
  marker: string,
) {
  return {
    snapshotAt,
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

  test('uses snapshot generation time when joined progression changes without touching the user', () => {
    const userUpdatedAt = '2026-07-26T12:00:00.000Z'
    const cached = generatedSnapshot(
      '2026-07-26T12:01:00.000Z',
      userUpdatedAt,
      'cached expedition step',
    )
    const server = generatedSnapshot(
      '2026-07-26T12:02:00.000Z',
      userUpdatedAt,
      'fresh expedition step',
    )

    expect(selectFreshestGameData(cached, server)).toBe(server)
  })

  test('keeps client data generated after the current server snapshot', () => {
    const userUpdatedAt = '2026-07-26T12:00:00.000Z'
    const cached = generatedSnapshot(
      '2026-07-26T12:03:00.000Z',
      userUpdatedAt,
      'fresh client data',
    )
    const server = generatedSnapshot(
      '2026-07-26T12:02:00.000Z',
      userUpdatedAt,
      'older server data',
    )

    expect(selectFreshestGameData(cached, server)).toBe(cached)
  })

  test('keeps optimistic client changes when both values came from the same snapshot', () => {
    const snapshotAt = '2026-07-26T12:03:00.000Z'
    const userUpdatedAt = '2026-07-26T12:00:00.000Z'
    const cached = generatedSnapshot(
      snapshotAt,
      userUpdatedAt,
      'optimistic client data',
    )
    const server = generatedSnapshot(
      snapshotAt,
      userUpdatedAt,
      'original server data',
    )

    expect(selectFreshestGameData(cached, server)).toBe(cached)
  })
})
