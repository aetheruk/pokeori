import { describe, expect, test } from 'bun:test'
import {
  getAchievedUnclaimedMilestones,
  getEarnedRandomRepeatingRewards,
  getEarnedRepeatingRewards,
  getLowestEndlessRewardScore,
  getLowestMilestoneScore,
  getMaxAllowedEndlessScore,
  normalizeFinalScore,
} from '@/utilities/research/endless-milestones'

const milestones = [
  { score: 300, rewards: [{ type: 'item' as const, targetId: 'potion', quantity: 1 }] },
  { score: 100, rewards: [{ type: 'currency' as const, targetId: 'pokedollars', quantity: 50 }] },
  { score: 700, rewards: [{ type: 'item' as const, targetId: 'poke-ball', quantity: 1 }] },
]

describe('endless milestone helpers', () => {
  test('normalizes final scores before validation or reward lookup', () => {
    expect(normalizeFinalScore(150.9)).toBe(150)
    expect(normalizeFinalScore(-10)).toBe(0)
    expect(normalizeFinalScore(Number.NaN)).toBeNull()
    expect(normalizeFinalScore(undefined)).toBeNull()
  })

  test('returns achieved milestones sorted by score and excludes claimed milestones', () => {
    expect(getAchievedUnclaimedMilestones(milestones, 700, [300]).map((m) => m.score)).toEqual([
      100,
      700,
    ])
  })

  test('returns no completion rewards for already claimed milestone scores', () => {
    expect(getAchievedUnclaimedMilestones(milestones, 700, [100, 300, 700])).toEqual([])
  })

  test('finds the lowest milestone without requiring sorted config data', () => {
    expect(getLowestMilestoneScore(milestones)).toBe(100)
    expect(getLowestMilestoneScore([])).toBeNull()
  })

  test('finds the lowest score across milestone and repeating rewards', () => {
    expect(
      getLowestEndlessRewardScore({
        milestones,
        repeatingRewards: [
          {
            everyScore: 50,
            rewards: [{ type: 'item', targetId: 'soft-fluff-t1', quantity: 1 }],
          },
        ],
      }),
    ).toBe(50)
    expect(getLowestEndlessRewardScore({ milestones: [], repeatingRewards: [] })).toBeNull()
  })

  test('scales repeating rewards by final score interval counts', () => {
    expect(
      getEarnedRepeatingRewards(
        [
          {
            everyScore: 200,
            rewards: [
              { type: 'item', targetId: 'soft-fluff-t1', quantity: 1 },
              { type: 'item', targetId: 'wing-feather-t1', quantity: 1 },
            ],
          },
          {
            everyScore: 350,
            random: true,
            rewards: [{ type: 'item', targetId: 'broken-ball-t1', quantity: 1 }],
          },
          {
            everyScore: 150,
            rewards: [{ type: 'pokemon_research_xp', targetId: '19', quantity: 1 }],
          },
        ],
        1050,
      ),
    ).toEqual([
      { type: 'item', targetId: 'soft-fluff-t1', quantity: 5 },
      { type: 'item', targetId: 'wing-feather-t1', quantity: 5 },
      { type: 'pokemon_research_xp', targetId: '19', quantity: 7 },
    ])
  })

  test('grants random repeating rewards only from collected counts', () => {
    expect(
      getEarnedRandomRepeatingRewards({
        repeatingRewards: [
          {
            everyScore: 200,
            random: true,
            rewards: [
              { type: 'item', targetId: 'soft-fluff-t1', quantity: 1 },
              { type: 'item', targetId: 'wing-feather-t1', quantity: 1 },
            ],
          },
          {
            everyScore: 350,
            random: true,
            rewards: [{ type: 'item', targetId: 'broken-ball-t1', quantity: 1 }],
          },
        ],
        finalScore: 1050,
        collectedRewards: {
          '0:0': 2,
          '0:1': 4,
          '1:0': 99,
        },
      }),
    ).toEqual([
      { type: 'item', targetId: 'soft-fluff-t1', quantity: 2, dropChance: 100 },
      { type: 'item', targetId: 'wing-feather-t1', quantity: 4, dropChance: 100 },
      { type: 'item', targetId: 'broken-ball-t1', quantity: 4, dropChance: 100 },
    ])
  })

  test('calculates bounded anti-cheat scores by game type', () => {
    expect(getMaxAllowedEndlessScore('run', {}, 10)).toBe(150)
    expect(getMaxAllowedEndlessScore('rhythm', { spawnRate: { min: 0.5 } }, 10)).toBe(900)
    expect(getMaxAllowedEndlessScore('match3', {}, 10)).toBeNull()
  })
})
