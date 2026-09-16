import type {
  ExpeditionActivityType,
  ExpeditionGeneratedStep,
} from '@/data/expeditions'

export type ExpeditionActivityStepStatus =
  | 'current'
  | 'stale'
  | 'not-in-expedition'

export type ExpeditionTaskStepStatus = ExpeditionActivityStepStatus

function isActivityStep(
  step: ExpeditionGeneratedStep | undefined,
  activityType: ExpeditionActivityType,
  activityId: string,
): boolean {
  return (
    (step?.type || 'activity') === 'activity' &&
    step?.activityType === activityType &&
    step?.activityId === activityId
  )
}

/**
 * Classifies an activity against the server-owned expedition path position.
 * A previous or future activity must never be accepted as the current step.
 */
export function getExpeditionActivityStepStatus(
  steps: ExpeditionGeneratedStep[],
  currentStepIndex: number,
  activityType: ExpeditionActivityType,
  activityId: string,
): ExpeditionActivityStepStatus {
  if (isActivityStep(steps[currentStepIndex], activityType, activityId)) {
    return 'current'
  }

  return steps.some((step) => isActivityStep(step, activityType, activityId))
    ? 'stale'
    : 'not-in-expedition'
}

export function getExpeditionTaskStepStatus(
  steps: ExpeditionGeneratedStep[],
  currentStepIndex: number,
  taskId: string,
): ExpeditionTaskStepStatus {
  return getExpeditionActivityStepStatus(
    steps,
    currentStepIndex,
    'task',
    taskId,
  )
}
