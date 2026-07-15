import { beforeEach, describe, expect, mock, test } from 'bun:test'
import { makePvpBattleState } from './helpers/battle-fixtures'

const store = new Map<string, unknown>()

mock.module('@/utilities/redis', () => ({
  redis: {
    async get<T>(key: string): Promise<T | null> {
      return (store.get(key) as T | undefined) ?? null
    },
    async set(key: string, value: unknown, options?: { nx?: boolean }): Promise<boolean> {
      if (options?.nx && store.has(key)) return false
      store.set(key, value)
      return true
    },
    async del(key: string): Promise<void> {
      store.delete(key)
    },
  },
}))

describe('PVP turn sync', () => {
  beforeEach(() => {
    store.clear()
  })

  test('returns waiting until the opponent move is queued', async () => {
    const { queuePvpMoveAndResolveTurn } = await import(
      '@/app/(frontend)/game/battles/pvp/turn-sync'
    )
    const state = makePvpBattleState()

    const result = await queuePvpMoveAndResolveTurn({
      viewerId: 'player-1',
      battleState: state,
      move: { stance: 'power', attackType: 'grass' },
    })

    expect(result.waiting).toBe(true)
    expect(store.get('pvp:turn:pvp-test:1:player-1')).toMatchObject({ stance: 'power' })
  })

  test('resolves exactly once when both moves are queued', async () => {
    const { queuePvpMoveAndResolveTurn } = await import(
      '@/app/(frontend)/game/battles/pvp/turn-sync'
    )
    const { toPerspectivePvpState } = await import('@/app/(frontend)/game/battles/pvp/state-utils')
    const sharedState = makePvpBattleState()
    store.set('pvp:battle:pvp-test', sharedState)

    await queuePvpMoveAndResolveTurn({
      viewerId: 'player-1',
      battleState: sharedState,
      move: { stance: 'power', attackType: 'grass' },
    })

    const p2View = toPerspectivePvpState(sharedState, 'player-2', 'pvp-test')
    const resolved = await queuePvpMoveAndResolveTurn({
      viewerId: 'player-2',
      battleState: p2View,
      move: { stance: 'tech', attackType: 'grass' },
    })

    const stored = store.get('pvp:battle:pvp-test') as typeof sharedState
    expect(resolved.waiting).toBe(false)
    expect(stored.turn).toBe(2)
    expect(stored.history).toHaveLength(1)
    expect(store.has('pvp:turn:pvp-test:1:player-1')).toBe(false)
    expect(store.has('pvp:turn:pvp-test:1:player-2')).toBe(false)
  })
})
