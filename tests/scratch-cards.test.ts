import { describe, expect, test } from 'bun:test'
import { scratchCards } from '@/data/scratchcards'
import {
  getEligibleScratchCardRewards,
  selectScratchCardReward,
} from '@/utilities/research/scratch-cards'
import type { RequirementData } from '@/utilities/requirements'

const requirementData = {
  user: {} as RequirementData['user'],
  inventory: [],
  pokemon: [],
  tcg: [],
  pokedex: [],
  completedTasks: [],
  battleResults: [],
  locationEncounterResults: [],
  gameResults: [],
  fieldResearchResults: [],
} as RequirementData

describe('scratch card reward eligibility', () => {
  test('removes the binder outcome after the binder is owned', () => {
    const eligible = getEligibleScratchCardRewards(
      scratchCards['zap-n-scratch'].rewards,
      { inventory: { 'binder-sv8': 1 } },
      requirementData,
    )

    expect(
      eligible.some((outcome) =>
        outcome.reward?.some((reward) => reward.targetId === 'binder-sv8'),
      ),
    ).toBe(false)
    expect(
      eligible.some((outcome) =>
        outcome.reward?.some((reward) => reward.targetId === 'pack-sv8'),
      ),
    ).toBe(true)
  })

  test('removes already-unlocked Rocket Scratch cosmetics', () => {
    const eligible = getEligibleScratchCardRewards(
      scratchCards['rocket-scratch'].rewards,
      {
        inventory: {},
        unlockedBanners: ['celadon-game-corner'],
        unlockedIcons: ['gambler'],
        unlockedTitles: ['gambler'],
      },
      requirementData,
    )

    expect(
      eligible.some((outcome) =>
        outcome.reward?.some((reward) =>
          ['gambler', 'celadon-game-corner'].includes(
            String(reward.targetId),
          ),
        ),
      ),
    ).toBe(false)
  })

  test('keeps the Moon Ball Manual only until its task is completed', () => {
    const eligible = getEligibleScratchCardRewards(
      scratchCards['moon-scratch'].rewards,
      { inventory: {} },
      {
        ...requirementData,
        completedTasks: [
          {
            taskId: 'moon-ball-manual',
            completedAt: 'now',
            count: 1,
          },
        ],
      },
    )

    expect(
      eligible.some((outcome) =>
        outcome.reward?.some((reward) => reward.targetId === 'moon-ball-manual'),
      ),
    ).toBe(false)
  })

  test('normalizes the remaining chances after filtering', () => {
    const rewards = [
      { chance: 10, reward: [{ type: 'currency' as const, targetId: 'a' }] },
      { chance: 30, reward: [{ type: 'currency' as const, targetId: 'b' }] },
    ]

    expect(selectScratchCardReward(rewards, 0.24)?.reward?.[0].targetId).toBe(
      'a',
    )
    expect(selectScratchCardReward(rewards, 0.25)?.reward?.[0].targetId).toBe(
      'b',
    )
  })
})
