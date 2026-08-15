import { describe, expect, test } from 'bun:test'
import { SAFFRON_TAKEOVER_MEMORIES } from '@/data/saffron-takeover'
import { tasks } from '@/data/tasks'
import {
  isSaffronTakeoverActive,
  SAFFRON_ESCAPE_COMPLETE_TASK_ID,
  SAFFRON_GYM_AMBUSH_TASK_ID,
  SAFFRON_TAKEOVER_CHRONICLES,
} from '@/utilities/story-state'

describe('Saffron takeover story state', () => {
  test('is inactive before the gym ambush is completed', () => {
    expect(
      isSaffronTakeoverActive({
        completedTasks: [],
        expeditionResults: [],
      }),
    ).toBe(false)
  })

  test('becomes active after the ambush until the escape completes', () => {
    expect(
      isSaffronTakeoverActive({
        completedTasks: [{ taskId: SAFFRON_GYM_AMBUSH_TASK_ID }],
      }),
    ).toBe(true)
  })

  test('is inactive again once the escape completion marker exists', () => {
    expect(
      isSaffronTakeoverActive({
        completedTasks: [
          { taskId: SAFFRON_GYM_AMBUSH_TASK_ID },
          { taskId: SAFFRON_ESCAPE_COMPLETE_TASK_ID },
        ],
      }),
    ).toBe(false)
  })
})

describe('Saffron knockout task data', () => {
  test('the gym ambush task is authored as a one-time Saffron cinematic', () => {
    const task = tasks.find((entry) => entry.id === SAFFRON_GYM_AMBUSH_TASK_ID)
    expect(task).toBeDefined()
    expect(task?.name).toBe('Reaching Sabrina')
    expect(task?.description).toContain(
      'There sure is a lot of Rocket about in this town',
    )
    expect(task?.repeatable).toBe(false)
    expect(task?.subCategory).toBe('Saffron City')
    expect(task?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'a-stone-for-a-friend',
      }),
    )
    expect(task?.enterModal?.[0]?.message).toBe(
      "Choo will be right behind me, I'll go on ahead.",
    )
    expect(task?.exitModal?.message).toBe('Hello is anyo.........')
    expect(task?.exitModal?.closeButtonText).toBe('....')
  })
})

describe('Saffron takeover memory slots', () => {
  test('reference the future chronicle expedition ids', () => {
    const ids = SAFFRON_TAKEOVER_MEMORIES.map((memory) => memory.id)
    expect(ids).toContain(SAFFRON_TAKEOVER_CHRONICLES.ariana)
    expect(ids).toContain(SAFFRON_TAKEOVER_CHRONICLES.choo)
    expect(ids).toContain(SAFFRON_TAKEOVER_CHRONICLES.escape)
  })

  test('keep the escape memory sealed until both records are recovered', () => {
    const escapeMemory = SAFFRON_TAKEOVER_MEMORIES.find(
      (memory) => memory.id === SAFFRON_TAKEOVER_CHRONICLES.escape,
    )
    expect(escapeMemory?.requiresCompleted).toEqual([
      SAFFRON_TAKEOVER_CHRONICLES.ariana,
      SAFFRON_TAKEOVER_CHRONICLES.choo,
    ])
  })
})
