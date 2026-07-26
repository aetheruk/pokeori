import { describe, expect, test } from 'bun:test'
import { allGames, fieldResearchGames, miniGames } from '@/data/games'
import {
  classifyLegacyActivityId,
  getGameActivityDomain,
  getGameActivityRoute,
  getGameActivitySessionKey,
} from '@/utilities/games/activity-domain'

describe('game activity domains', () => {
  test('partitions every authored activity into exactly one domain', () => {
    expect(miniGames.length + fieldResearchGames.length).toBe(allGames.length)
    expect(
      fieldResearchGames.every(
        (entry) => entry.gameType === 'field-observation',
      ),
    ).toBe(true)
    expect(
      miniGames.every(
        (entry) => (entry.gameType as string) !== 'field-observation',
      ),
    ).toBe(true)
  })

  test('uses typed mini-game routes and the dedicated Field Research route', () => {
    expect(getGameActivityRoute('match3')).toBe('/game/games/match3')
    expect(getGameActivityRoute('field-observation')).toBe(
      '/game/field-research',
    )
  })

  test('keeps Mini Game and Field Research sessions independent', () => {
    expect(getGameActivitySessionKey('user-1', 'game')).toBe('game:user-1')
    expect(getGameActivitySessionKey('user-1', 'field-research')).toBe(
      'field-research:user-1',
    )
  })

  test('classifies legacy rows by authored game identity and defaults unknown rows to game', () => {
    expect(classifyLegacyActivityId('route-1-field-observation')).toBe(
      'field-research',
    )
    expect(classifyLegacyActivityId('tutorial-sound')).toBe('game')
    expect(classifyLegacyActivityId('spirit-channeling:unknown')).toBe('game')
    expect(getGameActivityDomain('field-observation')).toBe('field-research')
  })
})
