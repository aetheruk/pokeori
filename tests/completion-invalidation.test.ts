import { expect, test } from 'bun:test'
import { getGameCompletionInvalidations } from '../src/utilities/games/completion-invalidation'
import { isAffectedGameScope } from '../src/utilities/game-data-invalidation'

test('plain field research result avoids unrelated inventory/card/catalog requests', () => {
  const domains = getGameCompletionInvalidations({ xp: { research: 5 } }, 'research', false)
  expect(isAffectedGameScope('/api/game/sync?scope=tcg', domains)).toBe(false)
  expect(isAffectedGameScope('/api/game/sync?scope=inventory', domains)).toBe(false)
  expect(isAffectedGameScope('/api/game/sync?scope=explore', domains)).toBe(true)
})
test('actual rewards invalidate their views, and task/level grants retain story propagation', () => {
  expect(getGameCompletionInvalidations({ items: [{ id: 'x', name: 'X', quantity: 1 }] }, 'game', true))
    .toEqual(['gameResults', 'pokemon', 'inventory', 'activeExpedition', 'expeditionResults'])
  const domains = getGameCompletionInvalidations({ tasksCompleted: [{ id: 'task', name: 'Task' }] }, 'game', false)
  expect(isAffectedGameScope('/api/game/sync?scope=core', domains)).toBe(true)
})
