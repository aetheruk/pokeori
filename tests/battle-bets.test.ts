import { describe, expect, test } from 'bun:test'
import { battleBetsGames } from '@/data/games/battle-bets'
import { resolvePvpTurn } from '@/app/(frontend)/game/battles/pvp/resolution'
import {
  calculateBattleBetsPayout,
  getBattleBetsFallbackWinner,
} from '@/utilities/battle-bets'
import { makePvpBattleState } from './helpers/battle-fixtures'

describe('Battle Bets', () => {
  test('authors the 100-token virtual starting pot, house edge, simulation count, and odds band', () => {
    expect(battleBetsGames[0].settings).toEqual({
      buyIn: 100,
      houseEdge: 0.05,
      simulationCount: 200,
      minimumWinChance: 0.25,
      maximumWinChance: 0.75,
    })
  })

  test('prices an all-in winning pot from the selected probability', () => {
    expect(
      calculateBattleBetsPayout({
        pot: 25,
        selectedProbability: 0.5,
        houseEdge: 0.05,
      }),
    ).toBe(47)
    expect(
      calculateBattleBetsPayout({
        pot: 500,
        selectedProbability: 0.25,
        houseEdge: 0.05,
      }),
    ).toBe(1900)
    expect(
      calculateBattleBetsPayout({
        pot: 25,
        selectedProbability: 0,
        houseEdge: 0.05,
      }),
    ).toBe(0)
  })

  test('uses remaining team HP to decide a turn-cap result', () => {
    expect(
      getBattleBetsFallbackWinner({
        femaleRemainingHp: 180,
        femaleMaximumHp: 300,
        maleRemainingHp: 120,
        maleMaximumHp: 300,
      }),
    ).toBe('female')
    expect(
      getBattleBetsFallbackWinner({
        femaleRemainingHp: 100,
        femaleMaximumHp: 200,
        maleRemainingHp: 150,
        maleMaximumHp: 300,
        random: () => 0.9,
      }),
    ).toBe('male')
  })

  test('supports a read-only spectator item turn without attacking', async () => {
    const state = makePvpBattleState()
    const femaleHp = state.playerTeam[0].currentHp

    const resolved = await resolvePvpTurn(
      state,
      {
        stance: 'tech',
        skipAction: true,
        spectatorMessage: 'Rocket Grunt F used a Super Potion on P1 Mon!',
      },
      { stance: 'speed', attackType: 'normal' },
      { persist: false, random: () => 0.99 },
    )

    expect(resolved.history[0]?.message).toContain(
      'Rocket Grunt F used a Super Potion',
    )
    expect(resolved.playerTeam[0].currentHp).toBeLessThan(femaleHp)
    expect(resolved.enemyTeam[0].currentHp).toBe(resolved.enemyTeam[0].maxHp)
  })

  test('does not attack a Shadow Pokemon that faints before combat', async () => {
    const state = makePvpBattleState()
    state.playerTeam = [state.playerTeam[0]]
    state.enemyTeam = [state.enemyTeam[0]]
    state.playerTeam[0].currentHp = 0
    const maleHp = state.enemyTeam[0].currentHp

    const resolved = await resolvePvpTurn(
      state,
      {
        stance: 'tech',
        skipAction: true,
        spectatorMessage:
          "Rocket Grunt F's P1 Mon screams out in pain! [icon:damage:15]",
      },
      { stance: 'power', attackType: 'normal' },
      { persist: false, random: () => 0.99 },
    )

    expect(resolved.enemyTeam[0].currentHp).toBe(maleHp)
    expect(resolved.status).toBe('lost')
    expect(resolved.history[0]?.message).toContain('screams out in pain')
  })
})
