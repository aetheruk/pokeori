'use server'

//
// Shared game utilities for all mini-games
// Wraps the existing research actions with the new game data structure
//

import { allGames, GameType } from '@/data/games'
import {
  startResearchEncounter,
  submitResearchAnswer,
  completeResearchEncounter,
  getResearchState,
} from '@/app/(frontend)/game/research/actions'

// Map from new game type to old research type
const gameTypeToResearchType: Record<GameType, string> = {
  silhouette: 'whos-that-pokemon',
  identify: 'quick-identify',
  snap: 'pokemon-snap',
  cry: 'cry-recognition',
  compare: 'research-compare',
  'rock-push': 'rock-push',
  run: 'run',
  flap: 'flap',
  slots: 'slots',
  pachinko: 'pachinko',
  'prize-wheel': 'prize-wheel',
  fishing: 'fishing',
  match3: 'match3',
  spelling: 'spelling',
  'sliding-puzzle': 'sliding-puzzle',
  rhythm: 'rhythm',
  mining: 'mining',
  'tcg-inspection': 'tcg-inspection',
  'tcg-battle': 'tcg-battle',
  'field-observation': 'field-observation',
  'voltorb-grid': 'voltorb-grid',
  'diglett-tunnel-tap': 'diglett-tunnel-tap',
  'magnemite-circuit': 'magnemite-circuit',
  'rock-tunnel-echo-map': 'rock-tunnel-echo-map',
} as const

// Get a game config by ID
export function getGameById(gameId: string) {
  return allGames.find((g) => g.id === gameId)
}

// Get the game type for a given game ID
export function getGameType(gameId: string): GameType | undefined {
  const game = allGames.find((g) => g.id === gameId)
  return game?.gameType
}

// Start a game encounter - wraps startResearchEncounter
export async function startGameEncounter(gameId: string, forceReset = false) {
  return startResearchEncounter(gameId, forceReset)
}

// Submit an answer - wraps submitResearchAnswer
export async function submitGameAnswer(answer: any) {
  return submitResearchAnswer(answer)
}

// Complete a game - wraps completeResearchEncounter
export async function completeGameEncounter(gameId: string, success: boolean) {
  return completeResearchEncounter(gameId, success)
}

// Get current game state - wraps getResearchState
export async function getGameState() {
  return getResearchState()
}

export { gameTypeToResearchType }
