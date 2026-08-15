import { describe, expect, test } from 'bun:test'
import { regionCategories } from '@/data/region-map'
import { subCategories } from '@/data/sub-region-map'
import { tasks } from '@/data/tasks'
import {
  isSaffronTakeoverActive,
  SAFFRON_ESCAPE_COMPLETE_TASK_ID,
  SAFFRON_GYM_AMBUSH_TASK_ID,
} from '@/utilities/story-state'

describe('Saffron takeover story state', () => {
  test('is inactive before the gym ambush is completed', () => {
    expect(isSaffronTakeoverActive([])).toBe(false)
  })

  test('becomes active after the ambush until the escape completes', () => {
    expect(isSaffronTakeoverActive([{ taskId: SAFFRON_GYM_AMBUSH_TASK_ID }])).toBe(
      true,
    )
  })

  test('is inactive again once the escape completion marker exists', () => {
    expect(
      isSaffronTakeoverActive([
        { taskId: SAFFRON_GYM_AMBUSH_TASK_ID },
        { taskId: SAFFRON_ESCAPE_COMPLETE_TASK_ID },
      ]),
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

describe('Saffron blackout region', () => {
  test('the ??? region is always available with saffron artwork', () => {
    expect(subCategories['???']).toBeDefined()
    expect(subCategories['???']?.region).toBe('???')
    expect(subCategories['???']?.alwaysAvailable).toBe(true)
    expect(subCategories['???']?.image).toBe('/backgrounds/saffron.avif')
    expect(regionCategories['???']?.image).toBe('/backgrounds/saffron.avif')
  })
})
