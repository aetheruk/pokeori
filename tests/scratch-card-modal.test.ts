import { describe, expect, test } from 'bun:test'
import { hasScratchCardRewards } from '@/app/(frontend)/game/inventory/_components/scratch-card-modal'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'

function emptySummary(overrides: Partial<RewardSummary> = {}): RewardSummary {
  return {
    xp: {},
    items: [],
    pokemon: [],
    currency: [],
    cards: [],
    tasksCompleted: [],
    banners: [],
    icons: [],
    titles: [],
    upgrades: [],
    ...overrides,
  }
}

describe('scratch card reward detection', () => {
  test('counts task completions and exit modals as scratch card wins', () => {
    expect(
      hasScratchCardRewards(
        emptySummary({
          tasksCompleted: [{ id: 'moon-ball-manual', name: 'Moon Ball Manual' }],
        }),
      ),
    ).toBe(true)

    expect(
      hasScratchCardRewards(
        emptySummary({
          taskExitModals: [
            {
              title: 'Crafting Recipe Unlocked',
              message: 'You unlocked the Moon Ball crafting recipe.',
              closeButtonText: 'Got it',
            },
          ],
        }),
      ),
    ).toBe(true)
  })

  test('treats an empty summary as no prize', () => {
    expect(hasScratchCardRewards(emptySummary())).toBe(false)
  })
})
