import { describe, expect, test } from 'bun:test'
import { regionCategories } from '@/data/region-map'
import { subCategories } from '@/data/sub-region-map'
import { tasks } from '@/data/tasks'
import { buildNameForms } from '@/components/game/features/explore/BlackoutUnowns'
import {
  A_GOLDEN_GLOW_TASK_ID,
  isSaffronTakeoverActive,
  SAFFRON_ESCAPE_COMPLETE_TASK_ID,
  SAFFRON_GYM_AMBUSH_TASK_ID,
  STRUGGLE_TASK_ID,
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

describe('blackout Unown name spelling', () => {
  test('spells the trainer name and ends with a question-mark Unown', () => {
    expect(buildNameForms('Ash')).toEqual([
      '201-a',
      '201-s',
      '201-h',
      '201-question',
    ])
  })

  test('strips non-letters and caps long names', () => {
    const forms = buildNameForms('Pika-2 !! Fan')
    expect(forms).toEqual([
      '201-p',
      '201-i',
      '201-k',
      '201-a',
      '201-f',
      '201-a',
      '201-n',
      '201-question',
    ])
    const long = buildNameForms('A'.repeat(30))
    expect(long.length).toBe(13)
  })

  test('falls back to just a question-mark Unown for an empty name', () => {
    expect(buildNameForms('')).toEqual(['201-question'])
    expect(buildNameForms(undefined)).toEqual(['201-question'])
  })
})

describe('blackout golden glow tasks', () => {
  test('struggle is a hidden one-time task gated on the ambush', () => {
    const task = tasks.find((entry) => entry.id === STRUGGLE_TASK_ID)
    expect(task).toBeDefined()
    expect(task?.secret).toBe(true)
    expect(task?.repeatable).toBe(false)
    expect(task?.category).toBe('???')
    expect(task?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: 'saffron-gym-ambush',
      }),
    )
  })

  test('a golden glow is a repeatable task unlocked by struggle', () => {
    const task = tasks.find((entry) => entry.id === A_GOLDEN_GLOW_TASK_ID)
    expect(task).toBeDefined()
    expect(task?.repeatable).toBe(true)
    expect(task?.category).toBe('???')
    expect(task?.requirements).toContainEqual(
      expect.objectContaining({
        type: 'task_completed',
        targetId: STRUGGLE_TASK_ID,
      }),
    )
  })
})
