import { describe, expect, test } from 'bun:test'
import { shouldHideIncompleteSecretTask } from '@/components/game/features/explore/hooks/useExploreData'
import type { ExploreItem } from '@/components/game/features/explore/types'
import { tasks } from '@/data/tasks'

function taskExploreItem(taskId: string): ExploreItem {
  const task = tasks.find((entry) => entry.id === taskId)
  if (!task) throw new Error(`Missing task ${taskId}`)
  return {
    ...task,
    type: 'task',
    originalData: task,
  } as ExploreItem
}

describe('Explore secret random events', () => {
  test('legendary branch fusion tasks are not hidden by the ordinary secret-task filter', () => {
    const item = taskExploreItem('bird-branches-frozen')

    expect(item.originalData.secret).toBe(true)
    expect(item.originalData.isRandomEvent).toBe(true)
    expect(shouldHideIncompleteSecretTask(item, new Set())).toBe(false)
  })

  test('ordinary incomplete secret tasks stay hidden from Explore', () => {
    const item = taskExploreItem('bug-maniac-discovery')

    expect(item.originalData.secret).toBe(true)
    expect(item.originalData.isRandomEvent).not.toBe(true)
    expect(shouldHideIncompleteSecretTask(item, new Set())).toBe(true)
  })
})
