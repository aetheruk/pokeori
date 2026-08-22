import { describe, expect, test } from 'bun:test'
import { tasks } from '@/data/tasks'
import { filterEligibleRewards } from '@/utilities/rewards/conditional-rewards'

describe('conditional task rewards', () => {
  test('Pics for Benny gives Net Ball after the Jungle set is complete', () => {
    const task = tasks.find((entry) => entry.id === 'task-photo-exchange')!
    const userData = {
      user: {},
      inventory: [],
      pokemon: [],
      tcg: Array.from({ length: 64 }, (_, index) => ({
        cardId: `base2-${index + 1}`,
        setId: 'base2',
        quantity: 1,
      })),
    } as any

    const eligible = filterEligibleRewards(task.rewards as any, userData)

    expect(eligible.map((reward) => reward.targetId)).toContain('net-ball')
    expect(eligible.map((reward) => reward.targetId)).not.toContain('pack-base2')
  })

  test('Pics for Benny can identify the completed set from card ids when setId is absent', () => {
    const task = tasks.find((entry) => entry.id === 'task-photo-exchange')!
    const userData = {
      user: {},
      inventory: [],
      pokemon: [],
      tcg: Array.from({ length: 64 }, (_, index) => ({
        cardId: `base2-${index + 1}`,
        quantity: 1,
      })),
    } as any

    const eligible = filterEligibleRewards(task.rewards as any, userData)

    expect(eligible.map((reward) => reward.targetId)).toContain('net-ball')
    expect(eligible.map((reward) => reward.targetId)).not.toContain('pack-base2')
  })
})
