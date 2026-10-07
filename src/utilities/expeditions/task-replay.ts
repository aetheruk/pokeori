export function shouldUseCompletedExpeditionTaskReplay(params: {
  isExpeditionTaskFlow: boolean
  isAlreadyCompleted: boolean
  repeatable: boolean
}): boolean {
  return (
    params.isExpeditionTaskFlow &&
    params.isAlreadyCompleted &&
    !params.repeatable
  )
}
