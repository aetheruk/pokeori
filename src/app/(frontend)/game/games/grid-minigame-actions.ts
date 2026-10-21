'use server'

import {
  completeGameActivity,
  getGameActivityState,
  startGameActivity,
} from '@/app/(frontend)/game/_shared/activity-actions'

/** Start an authored mining object in its own slot beside the parent grid session. */
export async function startGridMinigame(gameId: string, forceReset = false) {
  return startGameActivity('grid-minigame', gameId, forceReset)
}

export async function completeGridMinigame(gameId: string, success: boolean) {
  return completeGameActivity('grid-minigame', gameId, success)
}

export async function getGridMinigameState() {
  return getGameActivityState('grid-minigame')
}
