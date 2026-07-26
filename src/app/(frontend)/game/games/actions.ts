'use server'

import {
  claimGameActivityEndlessMilestone,
  completeGameActivity,
  getGameActivityState,
  startGameActivity,
  submitGameActivityAnswer,
  type GameActivityCompletionResult,
  type GameActivityState,
} from '@/app/(frontend)/game/_shared/activity-actions'

export type GameState = GameActivityState
export type GameCompletionResult = GameActivityCompletionResult

export async function startGame(
  gameId: string,
  forceReset = false,
  consumedPokemonIds?: string[],
) {
  return startGameActivity('game', gameId, forceReset, consumedPokemonIds)
}

export async function submitGameAnswer(answer: unknown) {
  return submitGameActivityAnswer('game', answer)
}

export async function completeGame(
  gameId: string,
  success: boolean,
  finalScore?: number,
  additionalLosses?: number,
  collectedEndlessRewards?: Record<string, number>,
  collectedRockPushRewardIds?: string[],
  artAcademyDrawing?: string,
) {
  return completeGameActivity(
    'game',
    gameId,
    success,
    finalScore,
    additionalLosses,
    collectedEndlessRewards,
    collectedRockPushRewardIds,
    artAcademyDrawing,
  )
}

export async function getGameState() {
  return getGameActivityState('game')
}

export async function claimEndlessMilestone(gameId: string, score: number) {
  return claimGameActivityEndlessMilestone(gameId, score)
}
