import { describe, expect, test } from 'bun:test'
import {
  CHANNELING_POKEMON_SELECT,
  CHANNELING_SYNC_KEYS,
  DEFAULT_SYNC_KEYS,
  EXPLORE_POKEMON_SELECT,
  EXPLORE_SYNC_KEYS,
  POKEMON_BOX_SYNC_KEYS,
} from '@/utilities/game-data-scopes'

describe('game data sync scopes', () => {
  test('pokemon box sync avoids loading the full pokemon collection', () => {
    expect(POKEMON_BOX_SYNC_KEYS).not.toContain('pokemon')
    expect(POKEMON_BOX_SYNC_KEYS).toContain('inventory')
    expect(POKEMON_BOX_SYNC_KEYS).toContain('activeExpedition')
  })

  test('default sync uses the lightweight core scope', () => {
    expect(DEFAULT_SYNC_KEYS).toBe(POKEMON_BOX_SYNC_KEYS)
    expect(DEFAULT_SYNC_KEYS).not.toContain('pokemon')
  })

  test('explore sync keeps slim pokemon fields needed for requirements and selection', () => {
    expect(EXPLORE_SYNC_KEYS).toContain('pokemon')
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
    expect(CHANNELING_SYNC_KEYS).toEqual([
      'pokemon',
      'inventory',
      'researchEncounterResults',
    ])
    expect(CHANNELING_POKEMON_SELECT).toMatchObject({
      id: true,
      speciesId: true,
      formId: true,
      level: true,
      gender: true,
    })
  })
})
