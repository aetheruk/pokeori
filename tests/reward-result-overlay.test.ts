import { describe, expect, test } from 'bun:test'
import {
  getRewardResultExitModalQueue,
  shouldShowRewardResultSecondaryAction,
  type GenericResult,
} from '@/components/game/shared/RewardResultOverlay'

describe('reward result exit modal ordering', () => {
  test('shows the completed task modal before task-complete reward modals', () => {
    const result: GenericResult = {
      success: true,
      exitModal: {
        title: 'Bug Maniac',
        message: 'THE BUG GOD IS PLEASED!',
        closeButtonText: 'Take Manual',
      },
      rewards: {
        xp: {},
        items: [],
        pokemon: [],
        currency: [],
        cards: [],
        taskExitModals: [
          {
            title: 'Crafting Recipe Unlocked',
            message: 'You unlocked the Net Ball crafting recipe.',
            closeButtonText: 'Got it',
          },
        ],
      },
    }

    expect(getRewardResultExitModalQueue(result).map((modal) => modal.title)).toEqual([
      'Bug Maniac',
      'Crafting Recipe Unlocked',
    ])
  })

  test('hides secondary actions while task exit modals are queued', () => {
    const resultWithExitModal: GenericResult = {
      success: true,
      rewards: {
        xp: {},
        items: [],
        pokemon: [],
        currency: [],
        cards: [],
        taskExitModals: [
          {
            title: 'Another Zubat',
            message: 'Hey look, a Zubat.',
            closeButtonText: 'Note Zubat',
          },
        ],
      },
    }
    const resultWithoutExitModal: GenericResult = {
      success: true,
      rewards: {
        xp: {},
        items: [],
        pokemon: [],
        currency: [],
        cards: [],
      },
    }

    expect(shouldShowRewardResultSecondaryAction(resultWithExitModal)).toBe(false)
    expect(shouldShowRewardResultSecondaryAction(resultWithoutExitModal)).toBe(true)
  })
})
