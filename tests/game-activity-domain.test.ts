import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  getGameTypeLabel,
  getTypeIcon,
} from '@/components/game/features/explore/utils'
import { allGames, fieldResearchGames, miniGames } from '@/data/games'
import {
  classifyLegacyActivityId,
  getGameActivityDomain,
  getGameActivityRoute,
  getGameActivitySessionKey,
} from '@/utilities/games/activity-domain'
import { getRequiredResearchWins } from '@/utilities/research/required-wins'

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
    expect(getGameActivityRoute('brick-breaker')).toBe(
      '/game/games/brick-breaker',
    )
    expect(getGameActivityRoute('snake')).toBe('/game/games/snake')
    expect(getGameActivityRoute('field-observation')).toBe(
      '/game/field-research',
    )
  })

  test('registers the Brick Breaker and Onix Snake test activities as mini-games', () => {
    const brickBreaker = allGames.find(
      (entry) => entry.gameType === 'brick-breaker',
    )
    const snake = allGames.find((entry) => entry.gameType === 'snake')

    expect(brickBreaker).toBeDefined()
    expect(snake).toBeDefined()
    expect(miniGames.some((entry) => entry.id === brickBreaker?.id)).toBe(true)
    expect(miniGames.some((entry) => entry.id === snake?.id)).toBe(true)
    expect(brickBreaker && getRequiredResearchWins(brickBreaker)).toBe(1)
    expect(snake && getRequiredResearchWins(snake)).toBe(1)

    const brickExploreItem = {
      id: brickBreaker?.id,
      type: 'game',
      originalData: brickBreaker,
    } as any
    const snakeExploreItem = {
      id: snake?.id,
      type: 'game',
      originalData: snake,
    } as any
    expect(getGameTypeLabel(brickExploreItem)).toBe('BRICK BREAKER')
    expect(getGameTypeLabel(snakeExploreItem)).toBe('ONIX SNAKE')
    expect(renderToStaticMarkup(getTypeIcon(brickExploreItem))).toContain(
      'lucide-brick-wall',
    )
    expect(renderToStaticMarkup(getTypeIcon(snakeExploreItem))).toContain(
      'lucide-worm',
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
