'use server'

import { allGames, type GameType } from '@/data/games'
import {
  completeGame,
  getGameState,
  startGame,
  submitGameAnswer as submitGameAnswerAction,
} from '@/app/(frontend)/game/games/actions'

// Get a game config by ID
export function getGameById(gameId: string) {
  return allGames.find((g) => g.id === gameId)
}

// Get the game type for a given game ID
export function getGameType(gameId: string): GameType | undefined {
  const game = allGames.find((g) => g.id === gameId)
  return game?.gameType
}

export async function startGameEncounter(gameId: string, forceReset = false) {
  return startGame(gameId, forceReset)
}

export async function submitGameAnswer(answer: any) {
  return submitGameAnswerAction(answer)
}

export async function completeGameEncounter(gameId: string, success: boolean) {
  return completeGame(gameId, success)
}

export { getGameState }
