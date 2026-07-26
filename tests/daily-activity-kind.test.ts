import { describe, expect, test } from 'bun:test'
import { matchesDailyActivityKind } from '@/utilities/tasks/daily-activity-kind'

describe('daily activity kind matching', () => {
  test('matches current activity kinds exactly', () => {
    expect(matchesDailyActivityKind('game_win', 'game_win')).toBe(true)
    expect(
      matchesDailyActivityKind('field_research_win', 'field_research_win'),
    ).toBe(true)
    expect(matchesDailyActivityKind('catch', 'battle_win')).toBe(false)
  })

  test('accepts new activity events for pre-split research dailies', () => {
    expect(matchesDailyActivityKind('research_win', 'game_win')).toBe(true)
    expect(
      matchesDailyActivityKind('research_win', 'field_research_win'),
    ).toBe(true)
  })

  test('does not broaden legacy research dailies to unrelated activities', () => {
    expect(matchesDailyActivityKind('research_win', 'fishing_catch')).toBe(
      false,
    )
    expect(matchesDailyActivityKind('research_win', 'battle_win')).toBe(false)
  })
})
