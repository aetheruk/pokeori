'use client'

import { completeGame as completeGameAction, startGame as startGameAction } from '@/app/(frontend)/game/games/actions'
export { submitGameAnswer, getGameState, claimEndlessMilestone } from '@/app/(frontend)/game/games/actions'
export type { GameCompletionResult, GameState } from '@/app/(frontend)/game/games/actions'

import { recoverGameAction } from './action-recovery'
import { ACTIVITY_STARTED_EVENT, ACTIVITY_SETTLED_EVENT } from './update-safety'
export { getGameRecovery, getServerGameRecovery, subscribeToGameRecovery } from './action-recovery'

export function startGame(...args: Parameters<typeof startGameAction>) {
  window.dispatchEvent(new Event(ACTIVITY_STARTED_EVENT))
  let firstAttempt = true
  return recoverGameAction(
    () => {
      const request = startGameAction(args[0], firstAttempt ? args[1] : false, args[2])
      firstAttempt = false
      return request
    },
    'The game could not connect. Your current run has not been reset.',
    (result) => result.success ? undefined : result.error || 'Unable to start this game.',
  )
}

export async function completeGame(...args: Parameters<typeof completeGameAction>) {
  const result = await recoverGameAction(
    () => completeGameAction(...args),
    'We could not confirm your result. Retry to check and save this same result.',
    (result) => result.error || undefined,
  )
  window.dispatchEvent(new Event(ACTIVITY_SETTLED_EVENT))
  return result
}
