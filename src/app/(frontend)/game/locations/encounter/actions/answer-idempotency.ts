const VALID_ANSWER_ATTEMPT_ID = /^[a-zA-Z0-9:_-]{1,120}$/

export function createAnswerAttemptId(questionId: string): string {
  const safeQuestionId = questionId
    .replace(/[^a-zA-Z0-9:_-]/g, '_')
    .slice(0, 80)
  const nonce = Math.random().toString(36).slice(2, 10).padEnd(8, '0')
  return `${safeQuestionId}-${Date.now()}-${nonce}`
}

export function getAnswerAttemptCacheId(
  questionId: string,
  answer: string,
  attemptId?: string,
): string {
  if (attemptId && VALID_ANSWER_ATTEMPT_ID.test(attemptId)) {
    return attemptId
  }

  return `${questionId}:${answer}`
}

export function getAnswerResultKey({
  userId,
  locationId,
  startTime,
  questionId,
  answer,
  attemptId,
}: {
  userId: string
  locationId: string
  startTime: number
  questionId: string
  answer: string
  attemptId?: string
}): string {
  const answerAttemptId = getAnswerAttemptCacheId(questionId, answer, attemptId)
  return `encounter:answer:result:${userId}:${locationId}:${startTime}:${questionId}:${answerAttemptId}:${answer}`
}
