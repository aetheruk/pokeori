import { describe, expect, test } from 'bun:test'
import {
  CHANNELING_POKEMON_SELECT,
  EXPLORE_POKEMON_SELECT,
  GAME_DATA_SCOPE_KEYS,
  getGameDataScope,
} from '@/utilities/game-data-scopes'

describe('game data sync scopes', () => {
  test('pokemon box sync loads only its roster dependencies', () => {
    expect(GAME_DATA_SCOPE_KEYS['pokemon-box']).toEqual([
      'pokemon',
      'inventory',
      'pokedex',
    ])
  })

  test('default sync uses the lightweight core scope', () => {
    expect(GAME_DATA_SCOPE_KEYS.core).toEqual([])
  })

  test('explore sync keeps slim pokemon fields needed for requirements and selection', () => {
    expect(GAME_DATA_SCOPE_KEYS.explore).toContain('pokemon')
    expect(GAME_DATA_SCOPE_KEYS.explore).toContain('weather')
    expect(GAME_DATA_SCOPE_KEYS.explore).toContain('activeExpedition')
    expect(EXPLORE_POKEMON_SELECT).toMatchObject({
      id: true,
      speciesId: true,
      formId: true,
      level: true,
      stats: true,
      onBattleTeam: true,
      isCompanion: true,
    })
  })

  test('channeling sync loads only inventory, completion rows, and slim pokemon fields', () => {
    expect(GAME_DATA_SCOPE_KEYS.channeling).toEqual([
      'pokemon',
      'inventory',
      'gameResults',
    ])
    expect(CHANNELING_POKEMON_SELECT).toMatchObject({
      id: true,
      speciesId: true,
      formId: true,
      level: true,
      gender: true,
    })
  })

  test('routes resolve to purpose-built scopes', () => {
    expect(getGameDataScope('/game/tcg')).toBe('tcg')
    expect(getGameDataScope('/game/inventory')).toBe('inventory')
    expect(getGameDataScope('/game/explore')).toBe('explore')
    expect(getGameDataScope('/game/research/encounter')).toBe('inventory')
    expect(getGameDataScope('/game/games/match3')).toBe('core')
  })
})
