import { describe, expect, test } from 'bun:test'
import { generateBattleEvents } from '@/utilities/battle/engine/event-generator'
import type {
  BattleLogEntry,
  BattlePokemon,
  BattleState,
} from '@/utilities/battle/types'

function makePokemon(overrides: Partial<BattlePokemon> = {}): BattlePokemon {
  return {
    id: 'pokemon-1',
    user: 'user-1',
    originalTrainer: 'user-1',
    speciesId: 1,
    formId: '1',
    level: 50,
    name: 'Bulbasaur',
    types: ['Grass'],
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

function makeLog(overrides: Partial<BattleLogEntry> = {}): BattleLogEntry {
  return {
    turn: 1,
    playerStance: 'power',
    enemyStance: 'tech',
    result: 'loss',
    damageDealt: 0,
    damageTaken: 20,
    message:
      'Enemy: Charmander uses a [icon:stance:tech] [icon:type:fire] Attack.',
    ...overrides,
  }
}

function makeState(overrides: Partial<BattleState> = {}): BattleState {
  return {
    playerTeam: [makePokemon()],
    enemyTeam: [
      makePokemon({ id: 'enemy-1', name: 'Charmander', types: ['Fire'] }),
    ],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [],
    status: 'ongoing',
    battleId: 'battle',
    playerName: 'Player',
    enemyName: 'Enemy',
    itemsUsedThisBattle: [],
    ...overrides,
  }
}

describe('battle event generation', () => {
  test('forced player replacement is not replayed as combat', () => {
    const fainted = makePokemon({ currentHp: 0 })
    const replacement = makePokemon({
      id: 'pokemon-2',
      name: 'Ivysaur',
      formId: '2',
      currentHp: 80,
    })
    const koLog = makeLog({
      message:
        "Enemy: Charmander uses a [icon:stance:tech] [icon:type:fire] Attack.\nPlayer's Bulbasaur fainted!\nChoose your next Pokemon!",
    })
    const sentOutLog = makeLog({
      turn: 2,
      playerStance: 'tech',
      enemyStance: 'tech',
      result: 'tie',
      damageDealt: 0,
      damageTaken: 0,
      message: 'Player sent out Ivysaur!',
    })

    const oldState = makeState({
      playerTeam: [fainted, replacement],
      activePlayerIndex: 0,
      pendingPlayerSwitch: true,
      history: [koLog],
      turn: 2,
    })
    const newState = makeState({
      playerTeam: [fainted, replacement],
      activePlayerIndex: 1,
      pendingPlayerSwitch: false,
      history: [sentOutLog, koLog],
      turn: 2,
    })

    const events = generateBattleEvents(oldState, newState)

    expect(events.some((event) => event.payload?.type === 'REPLACEMENT')).toBe(
      true,
    )
    expect(events.some((event) => event.payload?.type === 'COMBAT')).toBe(false)
  })

  test('enemy KO replacement is marked for switch-in after fainting', () => {
    const enemy = makePokemon({
      id: 'enemy-1',
      name: 'Charmander',
      types: ['Fire'],
      currentHp: 40,
    })
    const faintedEnemy = { ...enemy, currentHp: 0 }
    const nextEnemy = makePokemon({
      id: 'enemy-2',
      name: 'Charmeleon',
      formId: '5',
      types: ['Fire'],
      currentHp: 90,
    })
    const combatLog = makeLog({
      result: 'win',
      damageDealt: 40,
      damageTaken: 0,
      message:
        "Player: Bulbasaur uses a [icon:stance:power] [icon:type:grass] Attack.\nEnemy's Charmander fainted!\nEnemy sent out Charmeleon!",
    })

    const oldState = makeState({
      enemyTeam: [enemy, nextEnemy],
      activeEnemyIndex: 0,
    })
    const newState = makeState({
      enemyTeam: [faintedEnemy, nextEnemy],
      activeEnemyIndex: 1,
      history: [combatLog],
    })

    const koEvent = generateBattleEvents(oldState, newState).find(
      (event) => event.type === 'KO_SEQUENCE',
    )

    expect(koEvent?.payload.enemyKOd).toBe(true)
    expect(koEvent?.payload.enemyReplacement).toBe(true)
  })

  test('item healing is visually applied before enemy damage', () => {
    const injured = makePokemon({ currentHp: 10, maxHp: 100 })
    const healedThenHit = makePokemon({ currentHp: 30, maxHp: 100 })
    const itemTurnLog = makeLog({
      result: 'loss',
      damageDealt: 0,
      damageTaken: 20,
      message:
        'Bulbasaur was healed for 40 HP!\nEnemy: Charmander uses a [icon:stance:tech] [icon:type:fire] Attack dealing 20 damage.',
    })

    const oldState = makeState({
      playerTeam: [injured],
    })
    const newState = makeState({
      playerTeam: [healedThenHit],
      history: [itemTurnLog],
    })

    const events = generateBattleEvents(oldState, newState)
    const healIndex = events.findIndex((event) => event.payload?.type === 'HEAL')
    const combatIndex = events.findIndex(
      (event) => event.payload?.type === 'COMBAT',
    )

    expect(healIndex).toBeGreaterThan(-1)
    expect(combatIndex).toBeGreaterThan(-1)
    expect(healIndex).toBeLessThan(combatIndex)
    expect(events[healIndex].payload).toMatchObject({
      type: 'HEAL',
      side: 'player',
      index: 0,
      hp: 50,
    })
  })

  test('item healing accounts for post-combat secondary damage before enemy damage', () => {
    const injured = makePokemon({ currentHp: 10, maxHp: 100 })
    const finalPlayer = makePokemon({ currentHp: 25, maxHp: 100 })
    const itemTurnLog = makeLog({
      result: 'loss',
      damageDealt: 0,
      damageTaken: 20,
      message:
        "Bulbasaur was healed for 40 HP!\nEnemy: Charmander uses a [icon:stance:tech] [icon:type:fire] Attack dealing 20 damage.\nPlayer's Bulbasaur is hurt by Bind. [icon:damage:5]",
    })

    const oldState = makeState({
      playerTeam: [injured],
    })
    const newState = makeState({
      playerTeam: [finalPlayer],
      history: [itemTurnLog],
    })

    const events = generateBattleEvents(oldState, newState)
    const healEvent = events.find((event) => event.payload?.type === 'HEAL')
    const combatIndex = events.findIndex(
      (event) => event.payload?.type === 'COMBAT',
    )
    const statusIndex = events.findIndex(
      (event, index) =>
        index > combatIndex && event.payload?.type === 'STATUS_DAMAGE',
    )

    expect(healEvent?.payload).toMatchObject({
      type: 'HEAL',
      side: 'player',
      index: 0,
      hp: 50,
    })
    expect(combatIndex).toBeGreaterThan(-1)
    expect(statusIndex).toBeGreaterThan(combatIndex)
    expect(events[statusIndex].payload.matches).toEqual([
      {
        amount: 5,
        kind: 'damage',
        lineIndex: 2,
        target: 'player',
      },
    ])
  })

  test('post-combat healing does not create a pre-combat heal animation', () => {
    const before = makePokemon({ currentHp: 50, maxHp: 100 })
    const after = makePokemon({ currentHp: 35, maxHp: 100 })
    const combatLog = makeLog({
      result: 'loss',
      damageDealt: 0,
      damageTaken: 20,
      message:
        "Enemy: Charmander uses a [icon:stance:tech] [icon:type:fire] Attack dealing 20 damage.\nPlayer's Bulbasaur recovered from Aqua Ring. [icon:heal:5]",
    })

    const oldState = makeState({
      playerTeam: [before],
    })
    const newState = makeState({
      playerTeam: [after],
      history: [combatLog],
    })

    const events = generateBattleEvents(oldState, newState)
    const healIndex = events.findIndex((event) => event.payload?.type === 'HEAL')
    const combatIndex = events.findIndex(
      (event) => event.payload?.type === 'COMBAT',
    )
    const statusIndex = events.findIndex(
      (event, index) =>
        index > combatIndex && event.payload?.type === 'STATUS_DAMAGE',
    )

    expect(healIndex).toBe(-1)
    expect(statusIndex).toBeGreaterThan(combatIndex)
    expect(events[statusIndex].payload.matches).toEqual([
      {
        amount: 5,
        kind: 'heal',
        lineIndex: 1,
        target: 'player',
      },
    ])
  })

  test('normal enemy attacks do not infer healing from HP math alone', () => {
    const injured = makePokemon({ currentHp: 10, maxHp: 100 })
    const finalPlayer = makePokemon({ currentHp: 30, maxHp: 100 })
    const combatLog = makeLog({
      result: 'loss',
      damageDealt: 0,
      damageTaken: 20,
      message:
        'Enemy: Charmander uses a [icon:stance:tech] [icon:type:fire] Attack dealing 20 damage.',
    })

    const oldState = makeState({
      playerTeam: [injured],
    })
    const newState = makeState({
      playerTeam: [finalPlayer],
      history: [combatLog],
    })

    const events = generateBattleEvents(oldState, newState)

    expect(events.some((event) => event.payload?.type === 'HEAL')).toBe(false)
    expect(events.some((event) => event.payload?.type === 'COMBAT')).toBe(true)
  })

  test('combat events carry only stance-success attack types for impact animations', () => {
    const combatLog = makeLog({
      result: 'win',
      damageDealt: 24,
      damageTaken: 18,
      message:
        'Player: Bulbasaur uses a [icon:stance:power] [icon:type:grass] Attack.\nEnemy: Charmander uses a [icon:stance:tech] [icon:type:fire] Attack.',
    })

    const oldState = makeState()
    const newState = makeState({
      playerTeam: [makePokemon({ currentHp: 82 })],
      enemyTeam: [
        makePokemon({
          id: 'enemy-1',
          name: 'Charmander',
          types: ['Fire'],
          currentHp: 76,
        }),
      ],
      history: [combatLog],
    })

    const combatEvent = generateBattleEvents(oldState, newState).find(
      (event) => event.payload?.type === 'COMBAT',
    )

    expect(combatEvent?.payload).toMatchObject({
      playerAttackType: 'grass',
    })
    expect(combatEvent?.payload.enemyAttackType).toBeUndefined()
  })

  test('loss combat events carry enemy attack type for impact animations', () => {
    const combatLog = makeLog({
      result: 'loss',
      damageDealt: 24,
      damageTaken: 18,
      message:
        'Player: Bulbasaur uses a [icon:stance:power] [icon:type:grass] Attack.\nEnemy: Charmander uses a [icon:stance:tech] [icon:type:fire] Attack.',
    })

    const oldState = makeState()
    const newState = makeState({
      playerTeam: [makePokemon({ currentHp: 82 })],
      enemyTeam: [
        makePokemon({
          id: 'enemy-1',
          name: 'Charmander',
          types: ['Fire'],
          currentHp: 76,
        }),
      ],
      history: [combatLog],
    })

    const combatEvent = generateBattleEvents(oldState, newState).find(
      (event) => event.payload?.type === 'COMBAT',
    )

    expect(combatEvent?.payload).toMatchObject({
      enemyAttackType: 'fire',
    })
    expect(combatEvent?.payload.playerAttackType).toBeUndefined()
  })
})
