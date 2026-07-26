import { allGames, type GameType } from '@/data/games'

export type GameActivityDomain = 'game' | 'field-research'

export function getGameActivityDomain(gameType: GameType): GameActivityDomain {
  return gameType === 'field-observation' ? 'field-research' : 'game'
}

export function getGameActivityRoute(gameType: GameType): string {
  return gameType === 'field-observation'
    ? '/game/field-research'
    : `/game/games/${gameType}`
}

export function getGameActivityRouteForId(gameId: string): string | null {
  const game = allGames.find((entry) => entry.id === gameId)
  return game ? getGameActivityRoute(game.gameType) : null
}

export function classifyLegacyActivityId(
  activityId: string,
): GameActivityDomain {
  const game = allGames.find((entry) => entry.id === activityId)
  return game?.gameType === 'field-observation' ? 'field-research' : 'game'
}

export function getGameActivitySessionKey(
  userId: string,
  domain: GameActivityDomain,
): string {
  return `${domain}:${userId}`
}
