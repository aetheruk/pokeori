import { allGames, type GameType } from '@/data/games'

export type GameActivityDomain = 'game' | 'field-research' | 'grid-minigame'
type PrimaryGameActivityDomain = Exclude<GameActivityDomain, 'grid-minigame'>

/** A mining wall embedded in Grid Adventure owns a separate resumable session. */
export function isGameActivityDomainAllowed(
  gameType: GameType,
  domain: GameActivityDomain,
): boolean {
  return (
    getGameActivityDomain(gameType) === domain ||
    (domain === 'grid-minigame' && gameType === 'underground-mining')
  )
}

export function getExpeditionActivityDomain(
  domain: GameActivityDomain,
): PrimaryGameActivityDomain {
  return domain === 'grid-minigame' ? 'game' : domain
}

export function getGameActivityDomain(
  gameType: GameType,
): PrimaryGameActivityDomain {
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
): PrimaryGameActivityDomain {
  const game = allGames.find((entry) => entry.id === activityId)
  return game?.gameType === 'field-observation' ? 'field-research' : 'game'
}

export function getGameActivitySessionKey(
  userId: string,
  domain: GameActivityDomain,
): string {
  return `${domain}:${userId}`
}
