import { describe, expect, test } from 'bun:test'
import { getQuizData } from '@/data/quiz'
import type { EncounterState } from '@/app/(frontend)/game/locations/encounter/actions/types'

describe('encounter next question generation', () => {
  test('ignores removed custom ability decorators when building bundled next question', async () => {
    const originalRandom = Math.random
    Math.random = () => 0

    try {
      const { buildEncounterQuizQuestion } = await import(
        '@/app/(frontend)/game/locations/encounter/actions/quiz-question'
      )
      const firstBulbasaurQuestion = getQuizData(1)![0]
      const state = {
        userId: 'user-1',
        locationId: 'route-1',
        pokemonId: 1,
        formId: '1',
        isShiny: false,
        startTime: 1,
        expiry: Date.now() + 30_000,
        baseCatchRate: 100,
        currentCatchRate: 100,
        questionsAnswered: [firstBulbasaurQuestion.id],
        itemsUsed: [],
        totalCorrectAnswers: 1,
        consecutiveCorrectAnswers: 1,
        activeAbilityId: 'strange_song',
        lastCorrectOptionIndex: 2,
      } as EncounterState

      const nextQuestion = buildEncounterQuizQuestion({
        pokemonId: 1,
        state,
      })

      expect(
        typeof nextQuestion?.options[2] === 'string'
          ? nextQuestion.options[2]
          : nextQuestion?.options[2]?.value,
      ).not.toBe(firstBulbasaurQuestion.correctAnswer)
    } finally {
      Math.random = originalRandom
    }
  })
})
