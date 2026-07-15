import { describe, expect, test } from 'bun:test'
import { createInitialPowersState } from '@/data/powers'
import { resolvePvpTurn } from '@/app/(frontend)/game/battles/pvp/resolution'
import { toPerspectivePvpState } from '@/app/(frontend)/game/battles/pvp/state-utils'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'

function makePokemon(id: string, userId: string, speed: number): BattlePokemon {
  return {
    id,
    user: userId,
    originalTrainer: userId,
    speciesId: 1,
    formId: '1',
    level: 50,
    name: id,
    types: ['Grass'],
    stats: {
      hp: 999,
      attack: 35,
      defense: 80,
      specialAttack: 35,
      specialDefense: 80,
      speed,
    },
    currentHp: 999,
    maxHp: 999,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
  }
}

function makePvpState(): BattleState {
  const p1Powers = createInitialPowersState({ movesPerBattle: 2, zMovesPerBattle: 1 })
  const p2Powers = createInitialPowersState({ movesPerBattle: 2, zMovesPerBattle: 1 })

  return {
    playerTeam: [makePokemon('p1-mon', 'player-1', 60)],
    enemyTeam: [makePokemon('p2-mon', 'player-2', 50)],
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
    pvpMoveUseLimits: {
      'player-1': 2,
      'player-2': 5,
    },
    pvpItemUseLimits: {
      'player-1': 2,
      'player-2': 4,
    },
    config: {
      movesPerBattle: 2,
      itemsPerBattle: 2,
    },
    isPvp: true,
  }
}

describe('PVP power state', () => {
  test('charges Z-Move per player without attacking', async () => {
    const state = makePvpState()

    const resolved = await resolvePvpTurn(
      state,
      { stance: 'power', attackType: 'power:z-move', powers: { zMoveCharge: true } },
      { stance: 'tech', attackType: 'power:z-move', powers: { zMoveCharge: true } },
    )

    expect(resolved.pvpPowers?.['player-1'].moveUsesRemaining).toBe(2)
    expect(resolved.pvpPowers?.['player-2'].moveUsesRemaining).toBe(2)
    expect(resolved.pvpPowers?.['player-1'].zMoveUsesRemaining).toBe(0)
    expect(resolved.pvpPowers?.['player-2'].zMoveUsesRemaining).toBe(0)
    expect(resolved.pvpPowers?.['player-1'].zMoveUsed).toBe(true)
    expect(resolved.pvpPowers?.['player-2'].zMoveUsed).toBe(true)
    expect(resolved.playerTeam[0].zMoveReady).toBe(true)
    expect(resolved.enemyTeam[0].zMoveReady).toBe(true)
    expect(resolved.history[0]?.message).toContain('prepares to launch a Z-Move')
  })

  test('special moves consume move uses and fade prepared Z-Move charge', async () => {
    const state = makePvpState()
    state.playerTeam[0].zMoveReady = true
    state.enemyTeam[0].zMoveReady = true

    const resolved = await resolvePvpTurn(
      state,
      { stance: 'power', attackType: 'grass', specialMoveId: 'vine-whip', powers: { zMove: false } },
      { stance: 'tech', attackType: 'grass', specialMoveId: 'razor-leaf', powers: { zMove: false } },
    )

    expect(resolved.pvpPowers?.['player-1'].moveUsesRemaining).toBe(1)
    expect(resolved.pvpPowers?.['player-2'].moveUsesRemaining).toBe(1)
    expect(resolved.playerTeam[0].zMoveReady).toBeUndefined()
    expect(resolved.enemyTeam[0].zMoveReady).toBeUndefined()
  })

  test('exposes viewer-specific powers in perspective state', () => {
    const state = makePvpState()
    state.pvpPowers!['player-1'].moveUsesRemaining = 2
    state.pvpPowers!['player-2'].moveUsesRemaining = 5

    const p1View = toPerspectivePvpState(state, 'player-1', 'pvp-test')
    const p2View = toPerspectivePvpState(state, 'player-2', 'pvp-test')

    expect(p1View.powers?.moveUsesRemaining).toBe(2)
    expect(p2View.powers?.moveUsesRemaining).toBe(5)
    expect(p1View.config?.movesPerBattle).toBe(2)
    expect(p2View.config?.movesPerBattle).toBe(5)
    expect(p2View.config?.itemsPerBattle).toBe(4)
    expect(p2View.playerName).toBe('Player 2')
  })
})
