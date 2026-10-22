'use server'

import {
  claimGameActivityEndlessMilestone,
  completeGameActivity,
  getGridAdventureActivityTargetForUser,
  getGridAdventureActivityState,
  getGameActivityState,
  getGameActivityStateForUser,
  getUser,
  startGameActivity,
  submitGameActivityAnswer,
  type GameActivityCompletionResult,
  type GameActivityState,
} from '@/app/(frontend)/game/_shared/activity-actions'
import { allGames } from '@/data/games'
import { exitPrizeWheel } from '@/app/(frontend)/game/research/games/wheel'
import { startBattleBets } from './battle-bets-actions'

export type GameState = GameActivityState
export type GameCompletionResult = GameActivityCompletionResult

export async function startGame(
  gameId: string,
  forceReset = false,
  consumedPokemonIds?: string[],
  gridAdventureObjectKey?: string,
) {
  const user = await getUser()
  const requestedEncounter = allGames.find((entry) => entry.id === gameId)
  if (requestedEncounter?.gridAdventureOnly) {
    if (!user || !gridAdventureObjectKey) {
      return {
        success: false,
        error: 'This activity can only be started from its Grid Adventure object.',
      }
    }
    const authoredTarget = await getGridAdventureActivityTargetForUser(
      user.id,
      gameId,
      gridAdventureObjectKey,
      'minigame',
    )
    if (!authoredTarget) {
      return {
        success: false,
        error: 'This activity is not part of the active Grid Adventure.',
      }
    }
  }
  if (user) {
    const existingState = await getGameActivityStateForUser(user.id, 'game')
    if (existingState && existingState.encounterId !== gameId) {
      const existingEncounter = allGames.find(
        (encounter) => encounter.id === existingState.encounterId,
      )
      if (existingEncounter?.gameType === 'prize-wheel') {
        const exitResult = await exitPrizeWheel(existingState.encounterId)
        if (!exitResult.success) {
          return {
            success: false,
            error:
              ('error' in exitResult && exitResult.error) ||
              'Unable to settle the previous Prize Wheel session.',
          }
        }
      }
    }
  }

  if (gameId === 'celadon-high-stakes-battle-bets') {
    return startBattleBets(forceReset) as any
  }
  const encounter = allGames.find((entry) => entry.id === gameId)
  const isRockPushAdventure =
    encounter?.gameType === 'grid-puzzle' &&
    'variant' in encounter.settings &&
    encounter.settings.variant === 'rock-push'
  return startGameActivity(
    isRockPushAdventure ? 'grid-adventure' : 'game',
    gameId,
    forceReset,
    consumedPokemonIds,
    gridAdventureObjectKey,
  )
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
  gameplayProof?: unknown,
) {
  const encounter = allGames.find((entry) => entry.id === gameId)
  const isRockPushAdventure =
    encounter?.gameType === 'grid-puzzle' &&
    'variant' in encounter.settings &&
    encounter.settings.variant === 'rock-push'
  return completeGameActivity(
    isRockPushAdventure ? 'grid-adventure' : 'game',
    gameId,
    success,
    finalScore,
    additionalLosses,
    collectedEndlessRewards,
    collectedRockPushRewardIds,
    artAcademyDrawing,
    gameplayProof,
  )
}

export async function getGameState() {
  return getGameActivityState('game')
}

export async function getGridAdventureState() {
  return getGridAdventureActivityState()
}

export async function claimEndlessMilestone(gameId: string, score: number) {
  return claimGameActivityEndlessMilestone(gameId, score)
}
