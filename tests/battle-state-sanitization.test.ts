import { describe, expect, test } from 'bun:test'
import { sanitizeBattleMoveState } from '@/utilities/battle/state-sanitization'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'

function makePokemon(overrides: Partial<BattlePokemon> = {}): BattlePokemon {
  return {
    id: 'pokemon-1',
    user: 'user-1',
    originalTrainer: 'user-1',
    speciesId: 4,
    formId: '4',
    level: 30,
    name: 'Charmander',
    types: ['Fire'],
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

function makeBattleState(overrides: Partial<BattleState> = {}): BattleState {
  return {
    battleId: 'test-battle',
    playerTeam: [makePokemon()],
    enemyTeam: [
      makePokemon({ id: 'enemy-1', user: 'enemy', originalTrainer: 'enemy' }),
    ],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    playerName: 'Player',
    enemyName: 'Enemy',
    turn: 1,
    status: 'ongoing',
    history: [],
    itemsUsedThisBattle: [],
    powers: {
      moveUsesRemaining: 2,
      teraUsesRemaining: 0,
      megaUsesRemaining: 0,
      megaEvolved: false,
      megaTurnsRemaining: 0,
      zMoveUsesRemaining: 0,
      zMoveUsed: false,
      dynamaxAvailable: false,
      dynamaxActive: false,
      dynamaxTurnsRemaining: 0,
      dynamaxUsesRemaining: 0,
      turnsPlayedThisBattle: 0,
      victoryUsesRemaining: 0,
      weatherUsesRemaining: 0,
      shoutUsesRemaining: 0,
      circadianUsesRemaining: 0,
      dimensionalShift: {
        charges: {
          wins: 0,
          losses: 0,
          draws: 0,
        },
      },
    },
    ...overrides,
  }
}

describe('battle state sanitization', () => {
  test('normalizes malformed stored move rows and loadouts', () => {
    const state = makeBattleState({
      playerTeam: [
        makePokemon({
          assignedMoves: [
            undefined,
            { moveId: 'ember' },
            { moveId: null },
            'scratch',
            { moveId: 'ember' },
          ] as any,
        }),
      ],
      enemyTeam: [
        makePokemon({
          id: 'enemy-1',
          user: 'enemy',
          originalTrainer: 'enemy',
          aiMoves: ['growl', undefined, '', 'growl'] as any,
          aiMoveLoadout: [
            undefined,
            'quick-attack',
            { moveId: 'tackle' },
          ] as any,
        }),
      ],
      moveHistory: {
        usedByPokemon: {
          'enemy:enemy-1': ['growl', undefined, 'growl', 'quick-attack'] as any,
        },
      },
    })

    const result = sanitizeBattleMoveState(state)

    expect(result.changed).toBe(true)
    expect(result.state.playerTeam[0].assignedMoves).toEqual([
      { moveId: 'ember' },
      { moveId: 'scratch' },
    ])
    expect(result.state.enemyTeam[0].aiMoves).toEqual(['growl'])
    expect(result.state.enemyTeam[0].aiMoveLoadout).toEqual([
      'quick-attack',
      'tackle',
    ])
    expect(result.state.moveHistory?.usedByPokemon?.['enemy:enemy-1']).toEqual([
      'growl',
      'quick-attack',
    ])
  })
})
