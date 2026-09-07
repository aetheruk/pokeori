import { describe, expect, test } from 'bun:test'
import { getGameUserData } from '@/utilities/game-data'
import { SAFFRON_GYM_AMBUSH_TASK_ID } from '@/utilities/story-state'

function databaseProbe() {
  let inFlight = 0
  let peak = 0
  const calls: any[] = []
  return {
    calls,
    peak: () => peak,
    payload: {
      async find(args: any) {
        calls.push(args)
        inFlight += 1
        peak = Math.max(peak, inFlight)
        await new Promise((resolve) => setTimeout(resolve, 2))
        inFlight -= 1
        return {
          docs:
            args.collection === 'user-task-progress'
              ? [{ taskId: SAFFRON_GYM_AMBUSH_TASK_ID, count: 1 }]
              : [],
        }
      },
    },
  }
}

describe('scoped game snapshot loading', () => {
  test('overlaps independent reads and reuses completed tasks for story state', async () => {
    const probe = databaseProbe()
    const result = await getGameUserData(
      { id: 'player' } as any,
      ['pokemon', 'inventory', 'completedTasks'],
      { payload: probe.payload as any },
    )
    expect(probe.peak()).toBeGreaterThan(1)
    expect(
      probe.calls.filter((call) => call.collection === 'user-task-progress'),
    ).toHaveLength(1)
    expect(result.storyState?.saffronTakeover).toBe(true)
    const pokemonRead = probe.calls.find(
      (call) => call.collection === 'pokemon',
    )
    expect(pokemonRead.depth).toBe(0)
    expect(pokemonRead.pagination).toBe(false)
  })

  test('keeps all reads sequential on a transaction and preserves the request', async () => {
    const probe = databaseProbe()
    const req = { transactionID: 'session' }
    await getGameUserData(
      { id: 'player' } as any,
      ['pokemon', 'inventory', 'completedTasks'],
      { payload: probe.payload as any, req: req as any },
    )
    expect(probe.peak()).toBe(1)
    expect(probe.calls.every((call) => call.req === req)).toBe(true)
  })

  test('narrow scopes still load story gates without exposing full tasks', async () => {
    const probe = databaseProbe()
    const result = await getGameUserData(
      { id: 'player' } as any,
      ['inventory'],
      { payload: probe.payload as any },
    )
    expect(result.storyState?.saffronTakeover).toBe(true)
    expect(result.completedTasks).toBeUndefined()
    expect(
      probe.calls.filter((call) => call.collection === 'user-task-progress'),
    ).toHaveLength(1)
  })
})
