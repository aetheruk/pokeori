import { getQuizData } from '@/data/quiz'
import {
  decorateQuizQuestion,
  getStoredEncounterAbility,
} from '@/utilities/pokemon/encounter-ability-runtime'
import { createAnswerAttemptId } from './answer-idempotency'
import type { EncounterState } from './types'

export type PublicEncounterQuestion = {
  id: string
  attemptId: string
  question: string
  options: Array<
    | string
    | {
        value: string
        label: string
        disabledUntil?: number
        highlighted?: boolean
        highlightedUntil?: number
      }
  >
} | null

export function buildEncounterQuizQuestion({
  pokemonId,
  kidMode = false,
  formId,
  state,
}: {
  pokemonId: number
  kidMode?: boolean
  formId?: string
  state?: EncounterState | null
}): PublicEncounterQuestion {
  const activeAbility = state ? getStoredEncounterAbility(state) : undefined

  if (kidMode) {
    const correctId = formId || pokemonId.toString()

    // If encounter is Ditto (132), wrong answers are Pikachu (25). Otherwise Ditto (132).
    const wrongId = pokemonId === 132 ? '25' : '132'
    const otherIds = [wrongId, wrongId, wrongId]

    const options = [correctId, ...otherIds].sort(() => Math.random() - 0.5)

    const question = {
      id: `kid-${pokemonId}`,
      attemptId: createAnswerAttemptId(`kid-${pokemonId}`),
      question: "Who's that Pokemon?",
      options,
    }
    return state
      ? decorateQuizQuestion({
          state,
          ability: activeAbility,
          question,
          correctAnswer: correctId,
        })
      : question
  }

  const questions = getQuizData(pokemonId)
  if (!questions || questions.length === 0) return null

  const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { correctAnswer, ...publicQuestion } = randomQuestion

  const shuffledOptions = [...publicQuestion.options].sort(
    () => Math.random() - 0.5,
  )

  const question = {
    ...publicQuestion,
    attemptId: createAnswerAttemptId(publicQuestion.id),
    options: shuffledOptions,
  }
  return state
    ? decorateQuizQuestion({
        state,
        ability: activeAbility,
        question,
        correctAnswer: randomQuestion.correctAnswer,
      })
    : question
}
