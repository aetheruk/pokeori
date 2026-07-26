'use server'

import {
  collectFieldObservationDrop,
  completeGameActivity,
  getGameActivityState,
  startGameActivity,
  submitGameActivityAnswer,
  type GameActivityCompletionResult,
  type GameActivityState,
} from '@/app/(frontend)/game/_shared/activity-actions'

export type FieldResearchState = GameActivityState
export type FieldResearchCompletionResult = GameActivityCompletionResult

export async function startFieldResearch(
  fieldResearchId: string,
  forceReset = false,
) {
  return startGameActivity('field-research', fieldResearchId, forceReset)
}

export async function submitFieldResearchAnswer(answer: unknown) {
  return submitGameActivityAnswer('field-research', answer)
}

export async function collectFieldResearchDrop(dropId: string) {
  return collectFieldObservationDrop(dropId)
}

export async function completeFieldResearch(
  fieldResearchId: string,
  success: boolean,
  finalScore?: number,
) {
  return completeGameActivity(
    'field-research',
    fieldResearchId,
    success,
    finalScore,
  )
}

export async function getFieldResearchState() {
  return getGameActivityState('field-research')
}
