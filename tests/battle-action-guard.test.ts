import { beforeEach, describe, expect, mock, test } from 'bun:test'

const store = new Map<string, unknown>()

mock.module('@/utilities/redis', () => ({
  redis: {
    async get<T>(key: string): Promise<T | null> {
      return (store.get(key) as T | undefined) ?? null
    },
    async set(
      key: string,
      value: unknown,
      options?: { nx?: boolean },
    ): Promise<'OK' | null> {
      if (options?.nx && store.has(key)) return null
      store.set(key, value)
      return 'OK'
    },
    async deleteIfValue(key: string, value: unknown): Promise<void> {
      if (store.get(key) === value) store.delete(key)
    },
  },
}))

describe('battle action guard', () => {
  beforeEach(() => {
    store.clear()
  })

  test('returns cached result for repeated client action ids', async () => {
    const { runBattleActionWithGuard } = await import(
      '@/app/(frontend)/game/battles/helpers/action-guard'
    )
    const action = mock(async () => ({ success: true, marker: Math.random() }))

    const first = await runBattleActionWithGuard('user-1', 'action-1', action)
    const second = await runBattleActionWithGuard('user-1', 'action-1', action)

    expect(second).toEqual(first)
    expect(action).toHaveBeenCalledTimes(1)
  })

  test('blocks a different action while one battle action is in flight', async () => {
    const { runBattleActionWithGuard } = await import(
      '@/app/(frontend)/game/battles/helpers/action-guard'
    )
    let finishFirstAction: (() => void) | undefined
    const firstAction = mock(
      () =>
        new Promise<{ success: true }>((resolve) => {
          finishFirstAction = () => resolve({ success: true })
        }),
    )
    const secondAction = mock(
      async (): Promise<{ success: boolean; error?: string }> => ({
        success: true,
      }),
    )

    const firstPromise = runBattleActionWithGuard(
      'user-1',
      'action-1',
      firstAction,
    )
    await new Promise((resolve) => setTimeout(resolve, 0))

    const second = await runBattleActionWithGuard(
      'user-1',
      'action-2',
      secondAction,
    )
    finishFirstAction?.()
    await firstPromise

    expect(second).toEqual({
      success: false,
      error: 'Another battle action is being processed',
    })
    expect(firstAction).toHaveBeenCalledTimes(1)
    expect(secondAction).toHaveBeenCalledTimes(0)
  })

  test('waits for cached result when the same client action is still in flight', async () => {
    const { runBattleActionWithGuard } = await import(
      '@/app/(frontend)/game/battles/helpers/action-guard'
    )
    let finishFirstAction: (() => void) | undefined
    const firstAction = mock(
      () =>
        new Promise<{ success: true; marker: string }>((resolve) => {
          finishFirstAction = () =>
            resolve({ success: true, marker: 'completed' })
        }),
    )
    const duplicateAction = mock(
      async (): Promise<{
        success: boolean
        error?: string
        marker?: string
      }> => ({
        success: true,
        marker: 'duplicate',
      }),
    )

    const firstPromise = runBattleActionWithGuard(
      'user-1',
      'action-1',
      firstAction,
    )
    await new Promise((resolve) => setTimeout(resolve, 0))

    const duplicatePromise = runBattleActionWithGuard(
      'user-1',
      'action-1',
      duplicateAction,
    )
    await new Promise((resolve) => setTimeout(resolve, 10))
    finishFirstAction?.()

    const [first, duplicate] = await Promise.all([
      firstPromise,
      duplicatePromise,
    ])

    expect(duplicate).toEqual(first)
    expect(firstAction).toHaveBeenCalledTimes(1)
    expect(duplicateAction).toHaveBeenCalledTimes(0)
  })
})
