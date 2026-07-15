import { describe, expect, test } from 'bun:test'
import type { BattlePokemon } from '@/utilities/battle/types'
import { createInitialPowersState } from '@/data/powers'
import { normalizeChronicleBattleBudgets } from '@/utilities/battle/chronicle-budgets'
import { getBattleMoveOptions } from '@/utilities/pokemon/pokemon-moves'

function makeBattlePokemon(overrides: Partial<BattlePokemon> = {}): BattlePokemon {
  return {
    id: 'pokemon-1',
    user: 'user-1',
    originalTrainer: 'user-1',
    speciesId: 122,
    formId: '122',
    level: 24,
    name: 'Still',
    types: ['Psychic', 'Fairy'],
    stats: {
      hp: 100,
      attack: 60,
      defense: 60,
      specialAttack: 60,
      specialDefense: 60,
      speed: 60,
    },
    currentHp: 100,
    maxHp: 100,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('chronicle battle moves', () => {
  test('authored assigned moves ignore TM ownership and player move slot caps', () => {
    const mrMime = makeBattlePokemon({
      assignedMoves: [
        { moveId: 'confusion' },
        { moveId: 'psybeam' },
        { moveId: 'double-slap' },
        { moveId: 'protect' },
      ],
    })

    const moves = getBattleMoveOptions({
      assignedMoves: mrMime.assignedMoves,
      pokemonTypes: mrMime.types,
      pokemonFormId: mrMime.formId,
      pokemonLevel: mrMime.level,
      inventory: {},
      maxAssignedMoves: 4,
      allowUnavailableAssignedMoves: true,
      pokemon: mrMime,
      opponents: [
        makeBattlePokemon({
          id: 'opponent',
          speciesId: 19,
          formId: '19',
          name: 'Rattata',
          types: ['Normal'],
        }),
      ],
      profile: 'trainer',
    })

    expect(moves.map((move) => move.id)).toEqual([
      'confusion',
      'psybeam',
      'double-slap',
      'protect',
    ])
  })

  test('saved chronicle battles repair player-level move and item limits', () => {
    const first = makeBattlePokemon({ id: 'first', moveUsesRemaining: 0 })
    const second = makeBattlePokemon({ id: 'second', moveUsesRemaining: 2 })
    const state = {
      playerTeam: [first, second],
      enemyTeam: [makeBattlePokemon({ id: 'enemy' })],
      activePlayerIndex: 0,
      activeEnemyIndex: 0,
      playerParticipantIndexes: [0],
      turn: 1,
      history: [],
      status: 'ongoing',
      battleId: 'chronicle-battle',
      playerName: 'Mr. Fuji',
      enemyName: 'Team Rocket',
      isWildBattle: false,
      itemsUsedThisBattle: [{ itemId: 'oran-berry', turn: 1 }],
      trainerItems: [],
      powers: createInitialPowersState({ movesPerBattle: 2 }),
      config: {
        itemsPerBattle: 2,
        movesPerBattle: 2,
      },
      chronicle: {
        expeditionId: 'mr-fuji-pokemon-tower-chronicle',
        expeditionName: 'Mr. Fuji: The Night at Pokemon Tower',
      },
      chronicleInventory: {
        'oran-berry': 2,
        'sitrus-berry': 1,
      },
    } as any

    const changed = normalizeChronicleBattleBudgets(state)

    expect(changed).toBe(true)
    expect(state.config.movesPerBattle).toBe(100)
    expect(state.powers.moveUsesRemaining).toBe(100)
    expect(first.moveUsesRemaining).toBe(98)
    expect(second.moveUsesRemaining).toBe(100)
    expect(state.config.itemsPerBattle).toBe(4)
  })
})
