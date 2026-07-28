import { describe, expect, test } from 'bun:test'
import {
  beginBattlePresentation,
  finalizeBattlePresentation,
} from '@/utilities/battle/presentation'
import { formatBattleStatName } from '@/utilities/battle/stat-labels'
import { generateBattleEvents } from '@/utilities/battle/engine/event-generator'
import { flipPvpState } from '@/app/(frontend)/game/battles/pvp/state-utils'
import { makePvpBattleState } from './helpers/battle-fixtures'

describe('battle presentation timeline', () => {
  test('authors attacks and residual HP changes in server resolution order', () => {
    const state = makePvpBattleState()
    beginBattlePresentation(state)

    state.playerTeam[0].currentHp = 77
    state.enemyTeam[0].currentHp = 80
    state.history.unshift({
      turn: 1,
      playerStance: 'power',
      enemyStance: 'speed',
      result: 'win',
      damageDealt: 40,
      damageTaken: 30,
      playerAttackType: 'grass',
      enemyAttackType: 'fire',
      message: [
        'Player 2: P2 Mon uses Speed Attack! [icon:stance:speed] [icon:type:fire] Dealt 30.',
        'Player 1: P1 Mon uses Power Attack! [icon:stance:power] [icon:type:grass] Dealt 40.',
        "Player 1's P1 Mon is hurt by poison. [icon:damage:13]",
      ].join('\n'),
    })

    finalizeBattlePresentation(state)

    expect(state.presentation?.events).toMatchObject([
      {
        type: 'attack',
        actorSide: 'enemy',
        targetSide: 'player',
        damage: 30,
        hpAfter: 90,
      },
      {
        type: 'attack',
        actorSide: 'player',
        targetSide: 'enemy',
        damage: 40,
        hpAfter: 80,
      },
      {
        type: 'hp-change',
        side: 'player',
        kind: 'damage',
        amount: 13,
        hpAfter: 77,
      },
    ])
  })

  test('flips every semantic side for the opposing PVP perspective', () => {
    const state = makePvpBattleState()
    beginBattlePresentation(state)
    state.playerTeam[0].currentHp = 100
    state.history.unshift({
      turn: 1,
      playerStance: 'power',
      enemyStance: 'tech',
      result: 'loss',
      damageDealt: 0,
      damageTaken: 20,
      enemyAttackType: 'fire',
      message:
        'Player 2: P2 Mon attacks! [icon:stance:tech] [icon:type:fire] Dealt 20.',
    })
    finalizeBattlePresentation(state)

    const flipped = flipPvpState(state, 'pvp-test')
    expect(flipped.presentation?.events[0]).toMatchObject({
      type: 'attack',
      actorSide: 'player',
      targetSide: 'enemy',
      damage: 20,
      hpAfter: 100,
    })
  })

  test('splits an authored follow-up hit from aggregate combat damage', () => {
    const state = makePvpBattleState()
    beginBattlePresentation(state)
    state.enemyTeam[0].currentHp = 90
    state.history.unshift({
      turn: 1,
      playerStance: 'power',
      enemyStance: 'tech',
      result: 'win',
      damageDealt: 30,
      damageTaken: 0,
      playerAttackType: 'normal',
      message: [
        'Player 1: P1 Mon attacks! [icon:stance:power] [icon:type:normal] Dealt 30.',
        "P1 Mon's Parental Bond struck again! [icon:damage:10]",
      ].join('\n'),
    })
    finalizeBattlePresentation(state)

    expect(state.presentation?.events).toMatchObject([
      {
        type: 'attack',
        actorSide: 'player',
        targetSide: 'enemy',
        damage: 20,
        hpAfter: 100,
      },
      {
        type: 'hp-change',
        side: 'enemy',
        kind: 'damage',
        amount: 10,
        hpAfter: 90,
      },
    ])
  })

  test('reveals faint and replacement messages with their visual events', () => {
    const state = makePvpBattleState({
      enemyTeam: [
        makePvpBattleState().enemyTeam[0],
        {
          ...makePvpBattleState().enemyTeam[0],
          id: 'p2-replacement',
          name: 'P2 Reserve',
        },
      ],
    })
    beginBattlePresentation(state)
    state.enemyTeam[0].currentHp = 0
    state.activeEnemyIndex = 1
    state.history.unshift({
      turn: 1,
      playerStance: 'power',
      enemyStance: 'tech',
      result: 'win',
      damageDealt: 120,
      damageTaken: 0,
      playerAttackType: 'grass',
      message: [
        'Player 1: P1 Mon attacks! [icon:stance:power] [icon:type:grass] Dealt 120.',
        "Player 2's P2 Mon fainted!",
        'Player 2 sent out P2 Reserve!',
        'The battle continues.',
      ].join('\n'),
    })
    finalizeBattlePresentation(state)

    expect(state.presentation?.events.map((event) => event.type)).toEqual([
      'attack',
      'faint',
      'switch',
      'message',
    ])
    expect(state.presentation?.events[1]).toMatchObject({
      type: 'faint',
      message: "Player 2's P2 Mon fainted!",
    })
    expect(state.presentation?.events[2]).toMatchObject({
      type: 'switch',
      message: 'Player 2 sent out P2 Reserve!',
    })
  })

  test('uses semantic presentation events and retains legacy diff fallback', () => {
    const oldState = makePvpBattleState()
    const newState = makePvpBattleState({
      presentation: {
        sequenceId: 'sequence-1',
        turn: 1,
        events: [{ type: 'message', message: 'Rain began to fall.' }],
      },
    })

    const events = generateBattleEvents(oldState, newState)
    expect(events[0]).toMatchObject({
      type: 'PLAY_SEQUENCE',
      payload: { type: 'PRESENTATION' },
    })

    delete newState.presentation
    expect(
      generateBattleEvents(oldState, newState).some(
        (event) => event.payload?.type === 'PRESENTATION',
      ),
    ).toBe(false)
  })
})

describe('battle stat labels', () => {
  test('uses full Pokemon-standard labels and humanizes unknown keys', () => {
    expect(formatBattleStatName('defense')).toBe('Defense')
    expect(formatBattleStatName('specialAttack')).toBe('Special Attack')
    expect(formatBattleStatName('specialDefense')).toBe('Special Defense')
    expect(formatBattleStatName('crit')).toBe('Critical-hit chance')
    expect(formatBattleStatName('customBattleStat')).toBe('Custom Battle Stat')
  })
})
