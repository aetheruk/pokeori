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
    return typeof reward?.quantity === 'number' ? reward.quantity : 0
  })
}

describe('daily task generator', () => {
  test('creates six source-hinted challenges with typed daily activity criteria', () => {
    const generated = generateDailyTasks(userData, {
      date: new Date('2026-05-27T12:00:00'),
      random: () => 0.25,
    })

    expect(generated).toHaveLength(6)
    expect(generated.every((task) => task.dailyMetadata?.sourceHint)).toBe(true)
    expect(generated.some((task) => task.criteria[0]?.type === 'daily_activity')).toBe(true)
    expect(new Set(generated.map((task) => task.dailyMetadata?.signature)).size).toBe(6)
    expect(generated.filter((task) => task.dailyMetadata?.isBonus)).toHaveLength(1)
  })

  test('only offers card crystallizing when the player owns the Crystalizer and a duplicate', () => {
    const otherFamilies = [
      'catch',
      'battle',
      'research',
      'fishing',
      'artisan',
      'shop',
      'voyage',
      'gem-delivery',
      'berry-delivery',
      'material-delivery',
    ].map((family) => ({
      dailyMetadata: { family, signature: family, templateId: family, sourceHint: family },
    })) as any
    const withoutDuplicate = generateDailyTasks(
      {
        ...userData,
        inventory: [{ itemId: 'card-crystalizer', quantity: 1 }],
      },
      { date: new Date('2026-05-27T12:00:00'), random: () => 0.99, previousTasks: otherFamilies },
    )
    const withDuplicate = generateDailyTasks(
      {
        ...userData,
        inventory: [{ itemId: 'card-crystalizer', quantity: 1 }],
        tcg: [{ cardId: 'base1-1', quantity: 4 }],
      },
      { date: new Date('2026-05-27T12:00:00'), random: () => 0.99, previousTasks: otherFamilies },
    )

    expect(
      withoutDuplicate.some(
        (task) => task.criteria[0]?.dailyActivity?.kind === 'card_crystalized',
      ),
    ).toBe(false)
    expect(
      withDuplicate.some(
        (task) => task.criteria[0]?.dailyActivity?.kind === 'card_crystalized',
      ),
    ).toBe(true)
  })

  test('accepts yesterday\'s set as rotation input while retaining six distinct signatures', () => {
    const firstDay = generateDailyTasks(userData, {
      date: new Date('2026-05-27T12:00:00'),
      random: () => 0.25,
    })
    const secondDay = generateDailyTasks(userData, {
      date: new Date('2026-05-28T12:00:00'),
      previousTasks: firstDay,
      random: () => 0.25,
    })
    expect(secondDay).toHaveLength(6)
    expect(new Set(secondDay.map((task) => task.dailyMetadata?.signature)).size).toBe(6)
  })

  test('rewards five standard challenges and one fixed 25-scrip Daily Bonus', () => {
    expect(getDailyScripRewards(new Date('2026-05-27T12:00:00')).sort((a, b) => (a || 0) - (b || 0))).toEqual([
      5, 5, 5, 5, 5, 25,
    ])
    expect(getDailyScripRewards(new Date('2026-05-30T12:00:00')).sort((a, b) => (a || 0) - (b || 0))).toEqual([
      5, 5, 5, 5, 5, 25,
    ])
    expect(getDailyScripRewards(new Date('2026-05-31T12:00:00')).sort((a, b) => (a || 0) - (b || 0))).toEqual([
      5, 5, 5, 5, 5, 25,
    ])
    expect(getDailyScripRewards(new Date('2026-05-31T00:15:00.000Z')).sort((a, b) => (a || 0) - (b || 0))).toEqual([
      5, 5, 5, 5, 5, 25,
    ])
  })
})
