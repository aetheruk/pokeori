import { describe, expect, test } from 'bun:test'
import { vermilionCityExpeditions } from '@/data/expeditions/entries/vermilion-city'
import { shouldUseCompletedExpeditionTaskReplay } from '@/utilities/expeditions/task-replay'

describe('completed expedition task replay', () => {
  test('keeps repeatable completed tasks on the normal completion flow', () => {
    expect(
      shouldUseCompletedExpeditionTaskReplay({
        isExpeditionTaskFlow: true,
        isAlreadyCompleted: true,
        repeatable: true,
      }),
    ).toBe(false)
  })

  test('uses progress-only replay for completed non-repeatable expedition tasks', () => {
    expect(
      shouldUseCompletedExpeditionTaskReplay({
        isExpeditionTaskFlow: true,
        isAlreadyCompleted: true,
        repeatable: false,
      }),
    ).toBe(true)
  })

  test('does not use progress-only replay for tasks outside an expedition', () => {
    expect(
      shouldUseCompletedExpeditionTaskReplay({
        isExpeditionTaskFlow: false,
        isAlreadyCompleted: true,
        repeatable: false,
      }),
    ).toBe(false)
  })

  test('lets the Squirtle Squad Chronicle retry failed steps without a life limit', () => {
    const chronicle = vermilionCityExpeditions.find(
      (expedition) => expedition.id === 'squirtle-squad-chronicle',
    )

    expect(chronicle?.canFail).toBe(false)
  })
})
