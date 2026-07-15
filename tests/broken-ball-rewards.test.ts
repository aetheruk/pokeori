import { describe, expect, test } from 'bun:test'
import { buildBattleWinRewards } from '@/app/(frontend)/game/battles/helpers/win-rewards'

function battleState(enemyLevel: number) {
  return {
    playerTeam: [
      {
        id: 'player-1',
        formId: '1',
        currentHp: 10,
        maxHp: 10,
        name: 'Bulbasaur',
        types: ['Grass'],
      },
    ],
    enemyTeam: [
      {
        id: 'enemy-1',
        speciesId: 19,
        formId: '19',
        level: enemyLevel,
        currentHp: 0,
        maxHp: 10,
        name: 'Rattata',
        types: ['Normal'],
      },
    ],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [],
    status: 'won',
    battleId: 'test-battle',
    playerName: 'Player',
    enemyName: 'Enemy',
    itemsUsedThisBattle: [],
  } as any
}

function user(researchingLevel: number) {
  return {
    id: 'user-1',
    skills: {
      battling: { level: 1 },
      researching: { level: researchingLevel },
    },
    pokedex: {},
  } as any
}

describe('broken ball battle rewards', () => {
  test('wild battles grant broken ball salvage', () => {
    const rewards = buildBattleWinRewards(battleState(60), user(60), {
      rewards: [],
      isWildBattle: true,
      levelCap: 60,
    })

    expect(rewards).toContainEqual(
      expect.objectContaining({
        targetId: 'broken-ball-t1',
        dropChance: 25,
      }),
    )
  })

  test('trainer battles do not grant broken ball salvage', () => {
    const rewards = buildBattleWinRewards(battleState(35), user(35), {
      rewards: [],
      isWildBattle: false,
      levelCap: 35,
    })

    expect(rewards.some((reward) => String(reward.targetId).startsWith('broken-ball-'))).toBe(false)
  })

  test('battle level cap limits broken ball tier', () => {
    const rewards = buildBattleWinRewards(battleState(80), user(70), {
      rewards: [],
      isWildBattle: true,
      levelCap: 5,
    })

    expect(rewards.some((reward) => reward.targetId === 'broken-ball-t1')).toBe(true)
    expect(rewards.some((reward) => reward.targetId === 'broken-ball-t3')).toBe(false)
  })

  test('S.S. Anne evening cruise battle wins pay 20 percent Pokedollars', () => {
    const state = {
      ...battleState(20),
      expeditionContext: {
        expeditionId: 'ss-anne-evening-cruise',
        expeditionName: 'S.S. Anne Evening Dock Visit',
      },
    }
    const rewards = buildBattleWinRewards(state, user(1), {
      rewards: [
        {
          type: 'currency',
          targetId: 'pokedollars',
          quantity: 1000,
          dropChance: 100,
        },
      ],
      isWildBattle: false,
      levelCap: 20,
    })

    expect(rewards).toContainEqual({
      type: 'currency',
      targetId: 'pokedollars',
      quantity: 200,
      dropChance: 100,
    })
  })

  test('original S.S. Anne battle wins keep full Pokedollar rewards', () => {
    const state = {
      ...battleState(20),
      expeditionContext: {
        expeditionId: 'ss-anne-repair-duty',
        expeditionName: 'S.S. Anne Repair Duty',
      },
    }
    const rewards = buildBattleWinRewards(state, user(1), {
      rewards: [
        {
          type: 'currency',
          targetId: 'pokedollars',
          quantity: 1000,
          dropChance: 100,
        },
      ],
      isWildBattle: false,
      levelCap: 20,
    })

    expect(rewards).toContainEqual({
      type: 'currency',
      targetId: 'pokedollars',
      quantity: 1000,
      dropChance: 100,
    })
  })
})
