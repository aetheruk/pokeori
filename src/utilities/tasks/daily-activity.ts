const DAILY_EXCLUDED_GAME_TYPES = new Set(['slots', 'pachinko', 'prize-wheel'])

export function isDailyExcludedGameType(gameType: string) {
  return DAILY_EXCLUDED_GAME_TYPES.has(gameType)
}
