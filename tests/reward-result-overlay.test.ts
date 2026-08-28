import { describe, expect, test } from 'bun:test'
import {
  getRewardResultInitialStep,
  getRewardResultExitModalQueue,
  shouldShowRewardResultSecondaryAction,
  type GenericResult,
} from '@/components/game/shared/RewardResultOverlay'

describe('reward result exit modal ordering', () => {
  test('successful chat tasks retain their completion result for the ordered reward flow', async () => {
    const source = await Bun.file(
      'src/components/game/features/explore/hooks/useExploreActions.ts',
    ).text()
    const chatFlowStart = source.indexOf(
      'if (task.chat && task.exitModal && !isDoneForModalFlow)',
    )
    const completedReplayStart = source.indexOf(
      'if (isDoneForModalFlow && !task.repeatable && task.exitModal)',
      chatFlowStart,
    )
    const chatFlow = source.slice(chatFlowStart, completedReplayStart)

    expect(chatFlowStart).toBeGreaterThan(-1)
    expect(completedReplayStart).toBeGreaterThan(chatFlowStart)
    expect(chatFlow).toContain('setCompletionResult(result)')
    expect(chatFlow).toContain('setLastCompletedTask(task)')
    expect(chatFlow).not.toContain('setIsExitModalOpen(true)')
  })

  test('opens currency-only results directly on the summary step', () => {
    expect(
      getRewardResultInitialStep({
        success: true,
        summary: {
          xp: {},
          items: [],
          pokemon: [],
          currency: [{ type: 'fun-tokens', quantity: 120 }],
          cards: [],
        },
      }),
    ).toBe('summary')
  })

  test('keeps card and level-up reveals ahead of the summary', () => {
    expect(
      getRewardResultInitialStep({
        success: true,
        summary: {
          xp: {},
          items: [],
          pokemon: [],
          currency: [],
          cards: [{ id: 'base1-1', discarded: false }],
          levelUp: { newLevel: 2 },
        },
      }),
    ).toBe('level-up')
    expect(
      getRewardResultInitialStep({
        success: true,
        summary: {
          xp: {},
          items: [],
          pokemon: [],
          currency: [],
          cards: [{ id: 'base1-1', discarded: false }],
        },
      }),
    ).toBe('cards')
  })

  test('opens research breakthroughs before the reward summary', () => {
    expect(
      getRewardResultInitialStep({
        success: true,
        summary: {
          xp: {},
          items: [],
          pokemon: [],
          currency: [],
          cards: [],
          researchBreakthroughs: [
            {
              formId: '25',
              pokemonName: 'Pikachu',
              newLevel: 1,
              skillXpGranted: 0,
            },
          ],
        },
      }),
    ).toBe('research-breakthrough')
  })

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
