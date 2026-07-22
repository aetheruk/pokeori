import type { allGames } from '@/data/games'

type ResearchGameConfig = (typeof allGames)[number]

function hasSnapTarget(encounter: ResearchGameConfig): boolean {
  return (
    encounter.gameType === 'snap' &&
    typeof (encounter.settings as any).target === 'number'
  )
}

export function getRequiredResearchWins(encounter: ResearchGameConfig): number {
  if (hasSnapTarget(encounter)) return 1

  if (
    encounter.gameType === 'field-observation' ||
    encounter.gameType === 'tcg-battle'
  ) {
    return 1
  }

  const winRate =
    typeof (encounter.settings as any).winRate === 'number'
      ? ((encounter.settings as any).winRate as number)
      : undefined

  if (
    encounter.gameType === 'slots' ||
    encounter.gameType === 'pachinko' ||
    encounter.gameType === 'prize-wheel'
  ) {
    return 0
  }

  const isScoreCompletionGame =
    ((encounter.gameType === 'match3' ||
      encounter.gameType === 'tcg-inspection') &&
      typeof (encounter.settings as any).winScore === 'number') ||
    (encounter.gameType === 'art-academy' &&
      typeof (encounter.settings as any).successThreshold === 'number')

  if (isScoreCompletionGame) return 1

  return winRate || (encounter.gameType === 'rock-push' ? 1 : 5)
}
