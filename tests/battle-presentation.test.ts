import { describe, expect, test } from 'bun:test'
import {
  beginBattlePresentation,
  finalizeBattlePresentation,
} from '@/utilities/battle/presentation'
import { formatBattleStatName } from '@/utilities/battle/stat-labels'
import { generateBattleEvents } from '@/utilities/battle/engine/event-generator'
import { getCombinedImpactDamage } from '@/utilities/battle/engine/impact-group'
import type { BattlePresentationEvent } from '@/utilities/battle/types'
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
        animateActor: false,
        simultaneousGroup: 'impact:1',
      },
      {
        type: 'attack',
        actorSide: 'player',
        targetSide: 'enemy',
        damage: 40,
        hpAfter: 80,
        animateActor: true,
        simultaneousGroup: 'impact:1',
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

  test('groups Shadow pain with both attack impacts while moving only the stance winner', () => {
    const state = makePvpBattleState()
    beginBattlePresentation(state)

    state.playerTeam[0].currentHp = 80
    state.enemyTeam[0].currentHp = 80
    state.history.unshift({
      turn: 1,
      playerStance: 'power',
      enemyStance: 'tech',
      result: 'win',
      damageDealt: 40,
      damageTaken: 30,
      playerAttackType: 'grass',
      enemyAttackType: 'fire',
      message: [
        "Player 1's P1 Mon screams out in pain! [icon:damage:10]",
        'Player 2: P2 Mon uses Speed Attack! [icon:stance:tech] [icon:type:fire] Dealt 30.',
        'Player 1: P1 Mon uses Power Attack! [icon:stance:power] [icon:type:grass] Dealt 40.',
      ].join('\n'),
    })

    finalizeBattlePresentation(state)

    const impactEvents = state.presentation?.events.filter(
      (event) =>
        (event.type === 'attack' || event.type === 'hp-change') &&
        event.simultaneousGroup === 'impact:1',
    )
    expect(impactEvents?.map((event) => event.type)).toEqual([
      'attack',
      'hp-change',
      'attack',
    ])
    expect(
      impactEvents
        ?.filter((event) => event.type === 'attack')
        .map((event) => [event.actorSide, event.animateActor]),
    ).toEqual([
      ['enemy', false],
      ['player', true],
    ])
    expect(impactEvents?.at(-1)).toMatchObject({
      type: 'attack',
      targetSide: 'enemy',
      hpAfter: 80,
    })
    expect(impactEvents?.[1]).toMatchObject({
      type: 'hp-change',
      side: 'player',
      hpAfter: 80,
    })
    expect(
      getCombinedImpactDamage(
        impactEvents!.filter(
          (
            event,
          ): event is
            | Extract<BattlePresentationEvent, { type: 'attack' }>
            | Extract<BattlePresentationEvent, { type: 'hp-change' }> =>
            event.type === 'attack' || event.type === 'hp-change',
        ),
      ),
    ).toEqual({
      player: 40,
      enemy: 40,
    })
  })

  test('folds an authoritative damage correction into the impact HP target', () => {
    const state = makePvpBattleState()
    beginBattlePresentation(state)
    state.playerTeam[0].currentHp = 100
    state.history.unshift({
      turn: 1,
      playerStance: 'power',
      enemyStance: 'tech',
      result: 'loss',
      damageDealt: 0,
      damageTaken: 30,
      enemyAttackType: 'fire',
      message:
        'Player 2: P2 Mon attacks! [icon:stance:tech] [icon:type:fire] Dealt 30.',
    })

    finalizeBattlePresentation(state)

    expect(state.presentation?.events[0]).toMatchObject({
      type: 'attack',
      targetSide: 'player',
      hpAfter: 100,
    })
  })

  test('silently syncs an unparsed authoritative HP difference', () => {
    const state = makePvpBattleState()
    beginBattlePresentation(state)
    state.playerTeam[0].currentHp = 90
    state.history.unshift({
      turn: 1,
      playerStance: 'tech',
      enemyStance: 'tech',
      result: 'tie',
      damageDealt: 0,
      damageTaken: 0,
      message: 'An unrecognised legacy effect resolved.',
    })

    finalizeBattlePresentation(state)

    expect(
      state.presentation?.events.some((event) => event.type === 'hp-change'),
    ).toBe(false)
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
      hpAfter: 0,
      message: "Player 2's P2 Mon fainted!",
    })
    expect(state.presentation?.events[2]).toMatchObject({
      type: 'switch',
      message: 'Player 2 sent out P2 Reserve!',
    })
  })

  test('carries authoritative zero HP into faint events when damage is unparsed', () => {
    const state = makePvpBattleState()
    beginBattlePresentation(state)
    state.playerTeam[0].currentHp = 0
    state.status = 'lost'
    state.history.unshift({
      turn: 1,
      playerStance: 'tech',
      enemyStance: 'tech',
      result: 'loss',
      damageDealt: 0,
      damageTaken: 0,
      message: [
        'An unrecognised legacy effect resolved.',
        "Player 1's P1 Mon fainted!",
      ].join('\n'),
    })

    finalizeBattlePresentation(state)

    expect(state.presentation?.events).toMatchObject([
      { type: 'message', message: 'An unrecognised legacy effect resolved.' },
      {
        type: 'faint',
        side: 'player',
        pokemonIndex: 0,
        hpAfter: 0,
        message: "Player 1's P1 Mon fainted!",
      },
    ])
  })

  test('authors a switch-in when a player selects a replacement after fainting', () => {
    const fainted = {
      ...makePvpBattleState().playerTeam[0],
      currentHp: 0,
    }
    const replacement = {
      ...makePvpBattleState().playerTeam[0],
      id: 'p1-replacement',
      formId: '2',
      name: 'P1 Reserve',
    }
    const state = makePvpBattleState({
      playerTeam: [fainted, replacement],
      activePlayerIndex: 0,
      pendingPlayerSwitch: true,
      pendingPlayerSwitchReason: 'fainted',
    })
    beginBattlePresentation(state)

    state.activePlayerIndex = 1
    state.pendingPlayerSwitch = false
    state.pendingPlayerSwitchReason = undefined
    state.history.unshift({
      turn: 2,
      playerStance: 'tech',
      enemyStance: 'tech',
      result: 'tie',
      damageDealt: 0,
      damageTaken: 0,
      message: 'Player 1 sent out P1 Reserve!',
    })
    finalizeBattlePresentation(state)

    expect(state.presentation?.events[0]).toMatchObject({
      type: 'switch',
      side: 'player',
      fromIndex: 0,
      toIndex: 1,
      reason: 'replacement',
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
