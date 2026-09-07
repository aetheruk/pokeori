import { expect, test } from 'bun:test'
import { isAffectedGameScope, mergeRefreshedAccount } from '@/utilities/game-data-invalidation'

test('known mutation domains only revalidate dependent scopes', () => {
  expect(isAffectedGameScope('/api/game/sync?scope=tcg', ['gameResults'])).toBe(false)
  expect(isAffectedGameScope('/api/game/sync?scope=explore', ['gameResults'])).toBe(true)
  expect(isAffectedGameScope('/api/game/sync?scope=inventory', ['inventory'])).toBe(true)
  expect(isAffectedGameScope('/api/game/sync?scope=core', ['completedTasks'])).toBe(true)
  expect(isAffectedGameScope('/api/game/sync?scope=core', [])).toBe(false)
  expect(isAffectedGameScope('/api/game/catalog/tcg', ['tcg'])).toBe(false)
  expect(isAffectedGameScope('/api/game/sync?scope=inventory')).toBe(true)
})

test('common account updates preserve other domains and never cross accounts', () => {
  const old: any = { user: { id: 'one', updatedAt: '2026-09-07T10:00:00Z' },
    snapshotAt: 'old-snapshot', tcg: [{ cardId: 'card' }], currency: { crystals: 1 } }
  const fresh: any = { user: { id: 'one', updatedAt: '2026-09-07T11:00:00Z' },
    snapshotAt: 'fresh-snapshot', inventory: [], currency: { crystals: 2 } }
  const merged = mergeRefreshedAccount(old, fresh)
  expect(merged?.currency).toEqual({ crystals: 2 })
  expect(merged?.snapshotAt).toBe('old-snapshot')
  expect(merged?.tcg).toBe(old.tcg)
  expect(mergeRefreshedAccount(old, { ...fresh, user: { ...fresh.user, id: 'two' } })).toBe(old)
  expect(mergeRefreshedAccount(fresh, old)).toBe(fresh)
})
