import { describe, expect, test } from 'bun:test'
import {
  createAnswerAttemptId,
  getAnswerResultKey,
} from '@/app/(frontend)/game/locations/encounter/actions/answer-idempotency'

const baseKeyParams = {
  userId: 'user-1',
  locationId: 'test-mewtwo-consecutive-shield',
  startTime: 123456,
  questionId: 'mewtwo-question',
  answer: 'Mewtwo',
}

describe('encounter answer idempotency', () => {
  test('repeated quiz questions use separate cache entries per rendered attempt', () => {
    const firstAttemptKey = getAnswerResultKey({
      ...baseKeyParams,
      attemptId: 'attempt-1',
    })
    const secondAttemptKey = getAnswerResultKey({
      ...baseKeyParams,
      attemptId: 'attempt-2',
    })

    expect(firstAttemptKey).not.toBe(secondAttemptKey)
  })

  test('retries for the same rendered question reuse the same cache entry', () => {
    const firstSubmitKey = getAnswerResultKey({
      ...baseKeyParams,
      attemptId: 'attempt-1',
    })
    const retryKey = getAnswerResultKey({
      ...baseKeyParams,
      attemptId: 'attempt-1',
    })

    expect(firstSubmitKey).toBe(retryKey)
  })

  test('missing attempt ids fall back to the legacy question and answer key', () => {
    const firstSubmitKey = getAnswerResultKey(baseKeyParams)
    const retryKey = getAnswerResultKey(baseKeyParams)

    expect(firstSubmitKey).toBe(retryKey)
  })

  test('generated attempt ids are bounded redis-safe tokens', () => {
    expect(createAnswerAttemptId('question-1')).toMatch(
      /^question-1-\d+-[a-z0-9]{1,10}$/,
    )
  })
})
