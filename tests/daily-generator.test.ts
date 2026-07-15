import { describe, expect, test } from 'bun:test'
import { generateDailyTasks } from '@/utilities/tasks/daily-generator'

const userData = {
  user: {},
  inventory: [],
  pokemon: [],
  tcg: [],
  pokedex: [],
  completedTasks: [],
  battleResults: [],
  locationEncounterResults: [],
  researchEncounterResults: [],
} as any

function getDailyScripRewards(date: Date) {
  return generateDailyTasks(userData, { date }).map((task) => {
    const reward = task.rewards?.find(
      (entry) => entry.type === 'currency' && entry.targetId === 'prof-scrip',
    )
    return reward?.quantity
  })
}

describe('daily task generator', () => {
  test('only generates crystallize card dailies after owning the Card Crystalizer', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99

    try {
      const withoutCrystalizer = generateDailyTasks(userData, {
        date: new Date('2026-05-27T12:00:00'),
      }).find((task) => task.id === 'daily-4')
      const withCrystalizer = generateDailyTasks(
        {
          ...userData,
          inventory: [{ itemId: 'card-crystalizer', quantity: 1 }],
        },
        { date: new Date('2026-05-27T12:00:00') },
      ).find((task) => task.id === 'daily-4')

      expect(withoutCrystalizer?.criteria?.[0]?.type).toBe('daily_card')
      expect(withCrystalizer?.criteria?.[0]?.type).toBe('daily_crystalize')
    } finally {
      Math.random = originalRandom
    }
  })

  test('rewards five Professor Scrip on weekdays and Saturdays', () => {
    expect(getDailyScripRewards(new Date('2026-05-27T12:00:00'))).toEqual([
      5, 5, 5, 5,
    ])
    expect(getDailyScripRewards(new Date('2026-05-30T12:00:00'))).toEqual([
      5, 5, 5, 5,
    ])
  })

  test('rewards ten Professor Scrip on Sundays', () => {
    expect(getDailyScripRewards(new Date('2026-05-31T12:00:00'))).toEqual([
      10, 10, 10, 10,
    ])
    expect(getDailyScripRewards(new Date('2026-05-31T00:15:00.000Z'))).toEqual([
      10, 10, 10, 10,
    ])
  })
})
