import type { DailyActivityKind } from '@/data/tasks/types'

export type StoredDailyActivityKind = DailyActivityKind | 'research_win'

export function matchesDailyActivityKind(
  storedKind: StoredDailyActivityKind | undefined,
  eventKind: DailyActivityKind,
): boolean {
  if (storedKind === eventKind) return true

  return (
    storedKind === 'research_win' &&
    (eventKind === 'game_win' || eventKind === 'field_research_win')
  )
}
