import { createInitialPowersState } from '@/data/powers'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'

export function makeBattlePokemon(overrides: Partial<BattlePokemon> = {}): BattlePokemon {
  return {
    id: 'pokemon-1',
    user: 'player-1',
    originalTrainer: 'player-1',
    speciesId: 1,
    formId: '1',
    level: 50,
    name: 'Bulbasaur',
    types: ['Grass'],
    stats: {
      hp: 120,
      attack: 80,
      defense: 70,
      specialAttack: 80,
      specialDefense: 70,
      speed: 60,
    },
    currentHp: 120,
    maxHp: 120,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

export function makePvpBattleState(overrides: Partial<BattleState> = {}): BattleState {
  const p1Powers = createInitialPowersState({ movesPerBattle: 2, zMovesPerBattle: 1 })
  const p2Powers = createInitialPowersState({ movesPerBattle: 2, zMovesPerBattle: 1 })

  return {
    playerTeam: [makeBattlePokemon({ id: 'p1-mon', user: 'player-1', name: 'P1 Mon' })],
    enemyTeam: [makeBattlePokemon({ id: 'p2-mon', user: 'player-2', name: 'P2 Mon' })],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [],
    status: 'ongoing',
    battleId: 'test-battle',
    pvpBattleId: 'pvp-test',
    playerName: 'Player 1',
    enemyName: 'Player 2',
    itemsUsedThisBattle: [],
    powers: p1Powers,
    pvpPowers: {
      'player-1': p1Powers,
      'player-2': p2Powers,
    },
    isPvp: true,
    ...overrides,
  }
}

export function makePveBattleState(overrides: Partial<BattleState> = {}): BattleState {
  return {
    playerTeam: [makeBattlePokemon({ user: 'player-1', name: 'Player Mon' })],
    enemyTeam: [makeBattlePokemon({ user: 'enemy', name: 'Enemy Mon' })],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    playerParticipantIndexes: [0],
    turn: 1,
    history: [],
    status: 'ongoing',
    battleId: 'test-battle',
    playerName: 'Player',
    enemyName: 'Enemy',
    itemsUsedThisBattle: [],
    powers: createInitialPowersState(),
    ...overrides,
  }
}
