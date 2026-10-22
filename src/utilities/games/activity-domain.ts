import { allGames, type GameType } from '@/data/games'

export type GameActivityDomain =
  | 'game'
  | 'field-research'
  | 'grid-minigame'
  | 'grid-adventure'
type PrimaryGameActivityDomain = Exclude<
  GameActivityDomain,
  'grid-minigame' | 'grid-adventure'
>

/** A mining wall embedded in Grid Adventure owns a separate resumable session. */
export function isGameActivityDomainAllowed(
  gameType: GameType,
  domain: GameActivityDomain,
): boolean {
  return (
    getGameActivityDomain(gameType) === domain ||
    (domain === 'grid-minigame' && gameType === 'underground-mining') ||
    (domain === 'grid-adventure' && gameType === 'grid-puzzle')
  )
}

export function getExpeditionActivityDomain(
  domain: GameActivityDomain,
): PrimaryGameActivityDomain {
  return domain === 'grid-minigame' || domain === 'grid-adventure'
    ? 'game'
    : domain
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
  if (!game) return null
  if (
    game.gameType === 'grid-puzzle' &&
    'variant' in game.settings &&
    game.settings.variant === 'rock-push'
  ) {
    return `${getGameActivityRoute(game.gameType)}?gridAdventure=1`
  }
  return getGameActivityRoute(game.gameType)
}

/** Route for an authored mini-game or Field Research object inside Grid Adventure. */
export function getGridActivityRouteForId(gameId: string): string | null {
  const game = allGames.find((entry) => entry.id === gameId)
  if (!game) return null
  if (
    game.gameType === 'grid-puzzle' &&
    'variant' in game.settings &&
    game.settings.variant === 'rock-push'
  ) {
    return null
  }
  const route = getGameActivityRoute(game.gameType)
  const separator = route.includes('?') ? '&' : '?'
  return `${route}${separator}gridActivity=1&gameId=${encodeURIComponent(gameId)}`
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
