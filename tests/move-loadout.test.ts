import { describe, expect, test } from 'bun:test'
import { getMove } from '@/data/moves'
import type { MoveConfig } from '@/data/moves/types'
import type { BattlePokemon } from '@/utilities/battle/types'
import {
  autoPickMoveLoadout,
  filterMoveLoadoutEntries,
  getMoveLoadoutRoles,
  type MoveLoadoutEntry,
  type MoveLoadoutFilters,
} from '@/utilities/pokemon/move-loadout'

function move(id: string): MoveConfig {
  const result = getMove(id)
  if (!result) throw new Error(`Missing test move: ${id}`)
  return result
}

function entry(
  id: string,
  source: MoveLoadoutEntry['source'] = 'tm',
): MoveLoadoutEntry {
  return {
    move: move(id),
    source,
    sourceLabel: source === 'sketch' ? 'Sketchbook' : 'Owned TM',
  }
}

const DEFAULT_FILTERS: MoveLoadoutFilters = {
  query: '',
  type: 'all',
  stance: 'all',
  role: 'all',
  source: 'all',
  sort: 'assigned',
}

function battlePokemon(): BattlePokemon {
  return {
    id: 'pokemon-1',
    user: 'user-1',
    originalTrainer: 'user-1',
    speciesId: 25,
    formId: '25',
    level: 60,
    name: 'Pikachu',
    types: ['electric'],
    stats: {
      hp: 100,
      attack: 80,
      defense: 60,
      specialAttack: 110,
      specialDefense: 70,
      speed: 120,
    },
    currentHp: 100,
    maxHp: 100,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
  }
}

describe('move loadout workspace helpers', () => {
  test('classifies the player-facing effect filters from structured mechanics', () => {
    expect(getMoveLoadoutRoles(move('headbutt'))).toContain('damage')
    expect(getMoveLoadoutRoles(move('sing'))).toContain('status')
    expect(getMoveLoadoutRoles(move('recover'))).toContain('healing')
    expect(getMoveLoadoutRoles(move('swords-dance'))).toContain('setup')
  })

  test('searches known move copy and combines type, effect, and source filters', () => {
    const entries = [
      entry('headbutt'),
      entry('sing', 'sketch'),
      entry('thunderbolt'),
      entry('recover'),
    ]

    expect(
      filterMoveLoadoutEntries({
        entries,
        filters: { ...DEFAULT_FILTERS, query: 'paraly' },
      }).map(({ move: result }) => result.id),
    ).toContain('thunderbolt')
    expect(
      filterMoveLoadoutEntries({
        entries,
        filters: { ...DEFAULT_FILTERS, source: 'sketch' },
      }).map(({ move: result }) => result.id),
    ).toEqual(['sing'])
    expect(
      filterMoveLoadoutEntries({
        entries,
        filters: {
          ...DEFAULT_FILTERS,
          type: 'normal',
          role: 'healing',
        },
      }).map(({ move: result }) => result.id),
    ).toEqual(['recover'])
  })

  test('keeps assigned moves first without disturbing alphabetical order', () => {
    const results = filterMoveLoadoutEntries({
      entries: [entry('sing'), entry('headbutt'), entry('recover')],
      filters: DEFAULT_FILTERS,
      selectedMoveIds: ['recover'],
    })

    expect(results.map(({ move: result }) => result.id)).toEqual([
      'recover',
      'headbutt',
      'sing',
    ])
  })

  test('auto-pick returns a unique, full loadout bounded by unlocked slots', () => {
    const selected = autoPickMoveLoadout({
      pokemon: battlePokemon(),
      moveIds: [
        'thunderbolt',
        'aerial-ace',
        'recover',
        'sing',
        'swords-dance',
        'thunderbolt',
      ],
      maxMoves: 4,
    })

    expect(selected).toHaveLength(4)
    expect(new Set(selected).size).toBe(4)
    expect(
      selected.every((id) =>
        [
          'thunderbolt',
          'aerial-ace',
          'recover',
          'sing',
          'swords-dance',
        ].includes(id),
      ),
    ).toBe(true)
  })
})
