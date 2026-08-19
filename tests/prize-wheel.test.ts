import { describe, expect, test } from 'bun:test'
import type { RequirementData } from '@/utilities/requirements'
import { getEligiblePrizeWheelSlots } from '@/utilities/research/prize-wheel'
import type { PrizeWheelSlot } from '@/data/games/prize-wheel/types'

const userData = (completedTaskIds: string[]) =>
  ({
    completedTasks: completedTaskIds.map((taskId) => ({ taskId, count: 1 })),
  }) as RequirementData

const slots: PrizeWheelSlot[] = [
  {
    id: 'common',
    label: 'Common',
    color: '#fff',
    percentage: 95,
    rewards: [],
  },
  {
    id: 'exclusive',
    label: 'Exclusive',
    color: '#000',
    percentage: 5,
    requirements: [
      { type: 'task_completed', targetId: 'exclusive-prize', inverse: true },
    ],
    rewards: [],
  },
]

describe('prize wheel slot requirements', () => {
  test('keeps eligible slots and preserves their relative weights', () => {
    expect(getEligiblePrizeWheelSlots(slots, userData([]))).toEqual(slots)
  })

  test('removes claimed exclusive slots and renormalizes the remaining wheel', () => {
    const eligible = getEligiblePrizeWheelSlots(
      slots,
      userData(['exclusive-prize']),
    )

    expect(eligible).toHaveLength(1)
    expect(eligible[0]).toMatchObject({ id: 'common', percentage: 100 })
  })
})
