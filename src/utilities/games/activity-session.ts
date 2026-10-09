export function shouldRestoreExistingGameActivity(params: {
  existingEncounterId: string
  requestedEncounterId: string
  forceReset: boolean
}): boolean {
  return (
    !params.forceReset &&
    params.existingEncounterId === params.requestedEncounterId
  )
}
