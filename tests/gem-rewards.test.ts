import { describe, expect, test } from 'bun:test'
import {
  calculateGemRewards,
  FIELD_OBSERVATION_GEM_DROP_CHANCE,
} from '@/utilities/rewards/gem-logic'

describe('gem rewards', () => {
  test('selects one base gem from the available Pokemon types', () => {
    expect(calculateGemRewards(['Rock', 'Ground'], () => 0)).toEqual([
      {
        type: 'item',
        targetId: 'rock-gem',
        quantity: { min: 1, max: 1 },
        dropChance: 100,
      },
    ])
    expect(calculateGemRewards(['Rock', 'Ground'], () => 0.99)[0]?.targetId).toBe(
      'ground-gem',
    )
  })

  test('ignores unsupported types when building a gem pool', () => {
    expect(calculateGemRewards(['???'])).toEqual([])
  })

  test('field observation gem drops use the authored 35 percent chance', () => {
    expect(FIELD_OBSERVATION_GEM_DROP_CHANCE).toBe(35)
  })
})
