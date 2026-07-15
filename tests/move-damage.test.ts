import { describe, expect, test } from 'bun:test'
import {
  getMove,
  getMoveDamageMultiplier,
  resolveMoveDamageMultiplier,
} from '@/data/moves'
import { calculateDamage } from '@/utilities/battle/damage-calc'
import { resolveMoveContest } from '@/utilities/battle/move-contest'
import {
  applyStanceDisable,
  isStanceDisabled,
  tickDisabledStance,
} from '@/utilities/battle/stance-disable'
import { resolveHiddenPower } from '@/utilities/battle/hidden-power'
import {
  DEFAULT_STAT_STAGES,
  initializeBattlePokemon,
} from '@/utilities/battle/stats-calc'
import {
  applyPveDamageExchange,
  resolvePveDamageExchange,
} from '@/utilities/battle/engine/pve-turn'
import {
  getMetronomeCallableMoves,
  resolveMetronomeMove,
} from '@/utilities/battle/metronome'
import {
  applyMoveRuntimeEffects,
  applyContinuousEndEffects,
  applyNextDamageModifier,
  consumeNextAccuracyBypass,
  checkMoveBattleCondition,
  getCallableAuthoredMoves,
  getConditionalDamageMultiplier,
  getEffectiveMoveAccuracy,
  getMoveHealAmount,
  getMoveLockMessage,
  getRepeatDamageMultiplier,
  processDelayedMoveDamage,
  queueDelayedMoveDamage,
  recordBattleDamage,
  recordSuccessfulBasicAttackUse,
  recordStatLoweredThisTurn,
  recordSuccessfulMoveUse,
  recordSwitchingOutThisTurn,
  resolveCalledMove,
  resolveDamageRuleDamage,
  resolveDynamicMoveType,
  tickMoveLock,
} from '@/utilities/battle/move-effects'
import {
  getBattleItemUseLimit,
  getBattleItemUsesRemaining,
} from '@/utilities/battle/item-use-limits'
import {
  applySecondaryStatusDamageModifiers,
  applySecondaryStatusesFromMove,
  clearPokemonSecondaryStatuses,
  clearSourceLinkedTrapSecondaryStatuses,
  getSecondaryStatusSwitchPreventionMessage,
  getSecondaryStatusStatusPreventionMessage,
  getSecondaryStatusTypeImmunityBypassAttackTypes,
  hasSecondaryStatusAccuracyBypass,
  processBeforeMoveSecondaryStatuses,
  processSecondaryStatusFaintEffects,
  processSecondaryStatusesForSwitch,
  processSecondaryStatusesForTurnEnd,
} from '@/utilities/battle/secondary-statuses'
import { makePveBattleState } from './helpers/battle-fixtures'
import { makeBattlePokemon } from './helpers/battle-fixtures'
import { shouldFailMoveFromStance } from '@/utilities/battle/move-contest'
import { processBattleAbilitySwitchOut } from '@/utilities/battle/switching'

describe('move damage helpers', () => {
  test('wave breaker hits lightly unless the defender is Water type', () => {
    const move = getMove('wave-breaker')

    expect(move).toBeDefined()
    expect(move?.forcedType).toBe('rock')
    expect(move?.formId).toContain('95')
    expect(move?.accuracy).toBe(90)
    expect(move?.ignoreTypeEffectiveness).toBe(true)
    expect(getMoveDamageMultiplier(move!, ['Rock'])).toBe(0.5)
    expect(getMoveDamageMultiplier(move!, ['Flying'])).toBe(0.5)
    expect(getMoveDamageMultiplier(move!, ['Water'])).toBe(1.7)
    expect(getMoveDamageMultiplier(move!, ['Water', 'Flying'])).toBe(1.7)
  })

  test('weather ball changes type and doubles damage in active weather', () => {
    const move = getMove('weather-ball')!
    const attacker = makeBattlePokemon({
      name: 'Castform',
      types: ['normal'],
    })

    expect(move.dynamicType).toEqual({
      type: 'weather',
      fallbackType: 'normal',
    })
    expect(resolveDynamicMoveType({
      move,
      attacker,
      fallbackType: 'normal',
    })).toBe('normal')
    expect(resolveDynamicMoveType({
      move,
      attacker,
      weather: 'rain',
      fallbackType: 'normal',
    })).toBe('water')
    expect(resolveDynamicMoveType({
      move,
      attacker,
      weather: 'sandstorm',
      fallbackType: 'normal',
    })).toBe('rock')
    expect(resolveDynamicMoveType({
      move,
      attacker,
      weather: 'shadowy-aura',
      fallbackType: 'normal',
    })).toBe('dark')
    expect(getMoveDamageMultiplier(move, ['normal'], () => 0, 'clear')).toBe(1)
    expect(getMoveDamageMultiplier(move, ['normal'], () => 0, 'rain')).toBe(2)
    expect(getMoveDamageMultiplier(move, ['normal'], () => 0, 'snowstorm')).toBe(2)
  })

  test('magnitude and rototiller use their authored ground move mechanics', () => {
    const magnitude = getMove('magnitude')!

    expect(magnitude.damageRange).toEqual({ min: 0.2, max: 3 })
    expect(getMoveDamageMultiplier(magnitude, ['normal'], () => 0)).toBe(0.2)
    expect(getMoveDamageMultiplier(magnitude, ['normal'], () => 1)).toBe(3)

    const rototiller = getMove('rototiller')!
    expect(rototiller.secondaryStatuses?.[0]).toMatchObject({
      id: 'rototiller',
      target: 'field',
      triggers: ['switch'],
      turns: 5,
      effects: [
        { type: 'stat', stat: 'attack', stages: 1, pokemonType: 'grass' },
        { type: 'stat', stat: 'specialAttack', stages: 1, pokemonType: 'grass' },
      ],
    })

    const state = makePveBattleState({
      playerTeam: [
        makeBattlePokemon({ name: 'Ground User', types: ['Ground'] }),
        makeBattlePokemon({ id: 'grass-ally', name: 'Grass Ally', types: ['Grass'] }),
      ],
      enemyTeam: [makeBattlePokemon({ name: 'Rock Target', types: ['Rock'] })],
    })
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    const messages = applySecondaryStatusesFromMove({
      move: rototiller,
      state,
      attacker,
      defender,
      sourceSide: 'player',
    })
    expect(messages).toEqual(['Rototiller took hold.'])

    state.activePlayerIndex = 1
    const switchMessages = processSecondaryStatusesForSwitch(state, 'player', () => 0)
    expect(switchMessages).toEqual([
      "Grass Ally's attack rose!",
      "Grass Ally's specialAttack rose!",
    ])
    expect(state.playerTeam[1].statStages).toMatchObject({ attack: 1, specialAttack: 1 })
    expect(attacker.statStages).toBeUndefined()
    expect(defender.statStages).toBeUndefined()
  })

  test('leech seed attaches a draining secondary status', () => {
    const leechSeed = getMove('leech-seed')!
    expect(leechSeed.secondaryStatuses?.[0]).toMatchObject({
      id: 'leech-seed',
      target: 'enemy-pokemon',
      triggers: ['turn-end'],
      effects: [{ type: 'absorb', percentMaxHp: 12.5, healPercent: 100 }],
    })

    const state = makePveBattleState({
      playerTeam: [makeBattlePokemon({ name: 'Seeder', currentHp: 40, maxHp: 100 })],
      enemyTeam: [makeBattlePokemon({ name: 'Seeded', currentHp: 100, maxHp: 100 })],
    })
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    const applied = applySecondaryStatusesFromMove({
      move: leechSeed,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    expect(applied).toEqual(['Leech Seed took hold.'])
    expect(defender.secondaryStatuses).toHaveLength(1)

    const messages = processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(defender.currentHp).toBe(87)
    expect(attacker.currentHp).toBe(53)
    expect(messages).toContain("Enemy's Seeded is hurt by Leech Seed. [icon:damage:13]")
    expect(messages).toContain('Seeder absorbed energy! [icon:heal:13]')
  })

  test('levitate blocks ground damage from the active battle Pokemon', () => {
    const attacker = makeBattlePokemon({ name: 'Ground User', types: ['Ground'] })
    const defender = makeBattlePokemon({
      id: 'gastly',
      name: 'Gastly',
      speciesId: 92,
      formId: '92',
      ability: 'levitate',
      types: ['Ghost', 'Poison'],
      currentHp: 80,
      maxHp: 80,
    })

    const result = applyPveDamageExchange({
      playerMon: attacker,
      enemyMon: defender,
      playerDamage: 40,
      enemyDamage: 0,
      playerAttackType: 'ground',
      playerTypeEffectiveness: 2,
      enemyCanMove: false,
    })

    expect(result.playerDamage).toBe(0)
    expect(defender.currentHp).toBe(80)
    expect(result.messages).toContain("Gastly's ability made it immune!")
  })

  test('wonder guard allows only super-effective battle damage and clamps Shedinja to 1 HP', () => {
    const shedinja = initializeBattlePokemon({
      id: 'shedinja',
      user: 'player-1',
      originalTrainer: 'player-1',
      speciesId: 292,
      formId: '292',
      level: 50,
      name: 'Shedinja',
      updatedAt: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
    } as any)
    const attacker = makeBattlePokemon({ name: 'Attacker' })

    expect(shedinja.ability).toBe('wonder_guard')
    expect(shedinja.maxHp).toBe(1)
    expect(shedinja.currentHp).toBe(1)

    const neutral = applyPveDamageExchange({
      playerMon: attacker,
      enemyMon: shedinja,
      playerDamage: 1,
      enemyDamage: 0,
      playerAttackType: 'normal',
      playerTypeEffectiveness: 1,
      enemyCanMove: false,
    })

    expect(neutral.playerDamage).toBe(0)
    expect(shedinja.currentHp).toBe(1)
    expect(neutral.messages).toContain("Shedinja's ability blocked the attack!")

    const superEffective = applyPveDamageExchange({
      playerMon: attacker,
      enemyMon: shedinja,
      playerDamage: 1,
      enemyDamage: 0,
      playerAttackType: 'fire',
      playerTypeEffectiveness: 2,
      enemyCanMove: false,
    })

    expect(superEffective.playerDamage).toBe(1)
    expect(shedinja.currentHp).toBe(0)
  })

  test('disguise blocks only the first damaging hit', () => {
    const attacker = makeBattlePokemon({ name: 'Attacker' })
    const mimikyu = makeBattlePokemon({
      id: 'mimikyu',
      name: 'Mimikyu',
      speciesId: 778,
      formId: '778',
      ability: 'disguise',
      currentHp: 90,
      maxHp: 90,
    })

    const firstHit = applyPveDamageExchange({
      playerMon: attacker,
      enemyMon: mimikyu,
      playerDamage: 40,
      enemyDamage: 0,
      playerStance: 'power',
      playerAttackType: 'steel',
      playerTypeEffectiveness: 2,
      enemyCanMove: false,
    })

    expect(firstHit.playerDamage).toBe(0)
    expect(mimikyu.currentHp).toBe(90)
    expect(firstHit.messages).toContain("Mimikyu's Disguise blocked the hit!")

    const secondHit = applyPveDamageExchange({
      playerMon: attacker,
      enemyMon: mimikyu,
      playerDamage: 40,
      enemyDamage: 0,
      playerStance: 'power',
      playerAttackType: 'steel',
      playerTypeEffectiveness: 2,
      enemyCanMove: false,
    })

    expect(secondHit.playerDamage).toBe(40)
    expect(mimikyu.currentHp).toBe(50)
  })

  test('multi-hit moves resolve discrete hit counts and per-hit damage application', () => {
    const doubleSlap = getMove('double-slap')!
    const twineedle = getMove('twineedle')!
    const spikeCannon = getMove('spike-cannon')!
    const twinBeam = getMove('twin-beam')!
    const populationBomb = getMove('population-bomb')!

    expect(doubleSlap.multiHit).toEqual({ minHits: 2, maxHits: 5 })
    expect(twineedle.multiHit).toEqual({ minHits: 2, maxHits: 2 })
    expect(spikeCannon.multiHit).toEqual({ minHits: 2, maxHits: 5 })
    expect(twinBeam.multiHit).toEqual({ minHits: 2, maxHits: 2 })
    expect(populationBomb.multiHit).toEqual({ minHits: 1, maxHits: 10 })

    expect(resolveMoveDamageMultiplier(doubleSlap, ['normal'], () => 0)).toMatchObject({
      hitCount: 2,
      damageMultiplier: 0.6,
    })
    expect(resolveMoveDamageMultiplier(doubleSlap, ['normal'], () => 0.99)).toMatchObject({
      hitCount: 5,
      damageMultiplier: 1.5,
    })
    expect(
      resolveMoveDamageMultiplier(doubleSlap, ['normal'], () => 0, undefined, {
        forceMaxDamageRange: true,
      }),
    ).toMatchObject({
      hitCount: 5,
      damageMultiplier: 1.5,
    })
    expect(resolveMoveDamageMultiplier(twineedle, ['grass'], () => 0.5)).toMatchObject({
      hitCount: 2,
      damageMultiplier: 1,
    })
    expect(resolveMoveDamageMultiplier(populationBomb, ['normal'], () => 1)).toMatchObject({
      hitCount: 10,
      damageMultiplier: 4,
    })

    const attacker = makeBattlePokemon({ name: 'Attacker' })
    const mimikyu = makeBattlePokemon({
      name: 'Mimikyu',
      ability: 'disguise',
      currentHp: 100,
      maxHp: 100,
    })
    const result = applyPveDamageExchange({
      playerMon: attacker,
      enemyMon: mimikyu,
      playerDamage: 60,
      playerHitCount: 2,
      enemyDamage: 0,
      playerStance: 'power',
      playerAttackType: 'steel',
      playerTypeEffectiveness: 2,
      enemyCanMove: false,
    })

    expect(result.playerDamage).toBe(30)
    expect(mimikyu.currentHp).toBe(70)
    expect(result.messages).toContain("Mimikyu's Disguise blocked the hit!")
    expect(result.messages).toContain('Attacker hit 2 times!')
  })

  test('ice face blocks one physical-style hit and changes Eiscue to Noice Face', () => {
    const attacker = makeBattlePokemon({ name: 'Attacker' })
    const eiscue = makeBattlePokemon({
      id: 'eiscue',
      name: 'Eiscue',
      speciesId: 875,
      formId: '875',
      ability: 'ice_face',
      types: ['Ice'],
      currentHp: 100,
      maxHp: 100,
    })

    const powerHit = applyPveDamageExchange({
      playerMon: attacker,
      enemyMon: eiscue,
      playerDamage: 35,
      enemyDamage: 0,
      playerStance: 'power',
      playerAttackType: 'fighting',
      playerTypeEffectiveness: 2,
      enemyCanMove: false,
    })

    expect(powerHit.playerDamage).toBe(0)
    expect(eiscue.formId).toBe('10185')
    expect(eiscue.currentHp).toBe(eiscue.maxHp)
    expect(powerHit.messages).toContain("Eiscue's Ice Face blocked the hit!")

    const techEiscue = makeBattlePokemon({
      id: 'eiscue-tech',
      name: 'Eiscue',
      speciesId: 875,
      formId: '875',
      ability: 'ice_face',
      types: ['Ice'],
      currentHp: 100,
      maxHp: 100,
    })
    const techHit = applyPveDamageExchange({
      playerMon: attacker,
      enemyMon: techEiscue,
      playerDamage: 25,
      enemyDamage: 0,
      playerStance: 'tech',
      playerAttackType: 'fire',
      playerTypeEffectiveness: 2,
      enemyCanMove: false,
    })

    expect(techHit.playerDamage).toBe(25)
    expect(techEiscue.formId).toBe('875')
    expect(techEiscue.currentHp).toBe(75)
  })

  test('stance change switches Aegislash into Blade Forme before attacking', () => {
    const aegislash = makeBattlePokemon({
      id: 'aegislash',
      name: 'Aegislash',
      speciesId: 681,
      formId: '681',
      ability: 'stance_change',
      types: ['Steel', 'Ghost'],
    })
    const defender = makeBattlePokemon({ name: 'Defender' })

    const exchange = resolvePveDamageExchange({
      playerMon: aegislash,
      enemyMon: defender,
      playerStance: 'power',
      enemyStance: 'tech',
      playerDamageMultiplier: 1,
      enemyDamageMultiplier: 0,
      attackType: 'steel',
      enemyCanMove: false,
    })

    expect(aegislash.formId).toBe('10026')
    expect(exchange.playerDamage).toBeGreaterThan(0)
    expect(exchange.shieldMessages).toContain(
      "Aegislash's Stance Change changed its form!",
    )
  })

  test('schooling enters School Form at battle start and returns to Solo Form at low HP', () => {
    const wishiwashi = initializeBattlePokemon({
      id: 'wishiwashi',
      user: 'player-1',
      originalTrainer: 'player-1',
      speciesId: 746,
      formId: '746',
      level: 20,
      name: 'Wishiwashi',
      updatedAt: '2026-01-01T00:00:00.000Z',
      createdAt: '2026-01-01T00:00:00.000Z',
    } as any)
    const attacker = makeBattlePokemon({ name: 'Attacker' })

    expect(wishiwashi.ability).toBe('schooling')
    expect(wishiwashi.formId).toBe('10127')

    wishiwashi.currentHp = Math.floor(wishiwashi.maxHp * 0.25) + 1
    const result = applyPveDamageExchange({
      playerMon: attacker,
      enemyMon: wishiwashi,
      playerDamage: 1,
      enemyDamage: 0,
      playerAttackType: 'electric',
      playerTypeEffectiveness: 2,
      enemyCanMove: false,
    })

    expect(result.playerDamage).toBe(1)
    expect(wishiwashi.formId).toBe('746')
    expect(result.messages).toContain(
      "School Wishiwashi's Schooling changed its form!",
    )
  })

  test('zero to hero changes Palafin after it switches out', () => {
    const palafin = makeBattlePokemon({
      id: 'palafin',
      name: 'Palafin',
      speciesId: 964,
      formId: '964',
      ability: 'zero_to_hero',
      types: ['Water'],
    })

    const messages = processBattleAbilitySwitchOut(palafin)

    expect(palafin.formId).toBe('10256')
    expect(messages).toEqual([
      "Palafin's Zero to Hero changed its form!",
    ])
    expect(processBattleAbilitySwitchOut(palafin)).toEqual([])
  })

  test('suction cups blocks forced switch move effects', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[state.activePlayerIndex]
    const defender = state.enemyTeam[state.activeEnemyIndex]
    defender.name = 'Cradily'
    defender.ability = 'suction_cups'
    state.enemyTeam.push(
      makeBattlePokemon({
        id: 'enemy-bench',
        name: 'Bench',
        currentHp: 100,
        maxHp: 100,
      }),
    )

    const result = applyMoveRuntimeEffects({
      move: getMove('whirlwind')!,
      state,
      side: 'player',
      attacker,
      defender,
    })

    expect(result.failed).toBe(
      "Whirlwind failed because Cradily's ability anchored it in place.",
    )
    expect(state.activeEnemyIndex).toBe(0)
  })

  test('battle bond changes Greninja after it knocks out a Pokemon', () => {
    const greninja = makeBattlePokemon({
      id: 'greninja',
      name: 'Greninja',
      speciesId: 658,
      formId: '10116',
      ability: 'battle_bond',
      types: ['Water', 'Dark'],
    })
    const target = makeBattlePokemon({
      id: 'target',
      name: 'Target',
      currentHp: 10,
      maxHp: 10,
    })

    const result = applyPveDamageExchange({
      playerMon: greninja,
      enemyMon: target,
      playerDamage: 20,
      enemyDamage: 0,
      playerAttackType: 'water',
      playerTypeEffectiveness: 1,
      enemyCanMove: false,
    })

    expect(result.playerDamage).toBe(20)
    expect(target.currentHp).toBe(0)
    expect(greninja.formId).toBe('10117')
    expect(result.messages).toContain(
      "Greninja's Battle Bond changed its form!",
    )
  })

  test('bubble beam is a water typed partial damage speed debuff', () => {
    const move = getMove('bubble-beam')

    expect(move).toBeDefined()
    expect(move?.forcedType).toBe('water')
    expect(move?.stance).toBe('tech')
    expect(move?.damage).toBe(1.3)
    expect(move?.accuracy).toBe(100)
    expect(move?.debuffs).toEqual([
      { stat: 'speed', stages: -1, target: 'enemy', chance: 10 },
    ])
  })

  test('poison sting is a poison power TM with poison chance', () => {
    const move = getMove('poison-sting')

    expect(move).toBeDefined()
    expect(move?.name).toBe('Poison Sting')
    expect(move?.forcedType).toBe('poison')
    expect(move?.formId).toEqual(
      expect.arrayContaining(['13', '23', '29', '72', '451', '543']),
    )
    expect(move?.stance).toBe('tech')
    expect(move?.damage).toBe(0.3)
    expect(move?.accuracy).toBe(100)
    expect(move?.status).toEqual({
      id: 'poison',
      chance: 45,
      target: 'enemy',
    })
  })

  test('grass starter TMs include absorb and razor leaf effects', () => {
    const absorb = getMove('absorb')
    const razorLeaf = getMove('razor-leaf')

    expect(absorb).toBeDefined()
    expect(absorb?.forcedType).toBe('grass')
    expect(absorb?.stance).toBe('tech')
    expect(absorb?.damage).toBe(0.8)
    expect(absorb?.absorb).toBe(50)
    expect(absorb?.status).toBeUndefined()

    expect(razorLeaf).toBeDefined()
    expect(razorLeaf?.forcedType).toBe('grass')
    expect(razorLeaf?.stance).toBe('speed')
    expect(razorLeaf?.damage).toBe(1)
    expect(razorLeaf?.critChance).toBe(30)
    expect(razorLeaf?.formId).toContain('1')
    expect(razorLeaf?.formId).toContain('812')
  })

  test('tm flash lowers target accuracy without damage', () => {
    const move = getMove('flash')

    expect(move).toBeDefined()
    expect(move?.forcedType).toBe('electric')
    expect(move?.formId).toEqual(
      expect.arrayContaining(['25', '81', '100', '125', '145', '702']),
    )
    expect(move?.stance).toBe('tech')
    expect(move?.damage).toBe(0)
    expect(move?.accuracy).toBe(100)
    expect(move?.disableStance).toBeUndefined()
    expect(move?.interruptEnemyMove).toBeUndefined()
    expect(move?.failOnStance).toBeUndefined()
    expect(move?.debuffs).toEqual([
      { stat: 'accuracy', stages: -1, chance: 100 },
    ])
  })

  test('tm cut is a normal base damage move with a 25 percent crit chance', () => {
    const move = getMove('cut')

    expect(move).toBeDefined()
    expect(move?.forcedType).toBe('normal')
    expect(move?.stance).toBe('speed')
    expect(move?.damage).toBe(1.1)
    expect(move?.accuracy).toBe(95)
    expect(move?.critChance).toBe(0)
  })

  test('field HMs Fly Surf and Strength have authored battle move effects', () => {
    const fly = getMove('fly')
    const surf = getMove('surf')
    const strength = getMove('strength')

    expect(fly).toBeDefined()
    expect(fly?.forcedType).toBe('flying')
    expect(fly?.formId).toEqual(
      expect.arrayContaining(['6', '18', '22', '142', '144', '145', '146']),
    )
    expect(fly?.stance).toBe('speed')
    expect(fly?.damage).toBe(1.8)
    expect(fly?.target).toBe('enemy')
    expect(fly?.accuracy).toBe(95)
    expect(fly?.charged).toBe(1)
    expect(fly?.status).toEqual({ id: 'vanished', chance: 100, target: 'self' })

    expect(surf).toBeDefined()
    expect(surf?.forcedType).toBe('water')
    expect(surf?.formId).toEqual(
      expect.arrayContaining(['9', '73', '130', '131']),
    )
    expect(surf?.stance).toBe('tech')
    expect(surf?.damage).toBe(1.7)
    expect(surf?.target).toBe('enemy')
    expect(surf?.accuracy).toBe(100)

    expect(strength).toBeDefined()
    expect(strength?.forcedType).toBe('normal')
    expect(strength?.formId).toEqual(
      expect.arrayContaining(['9', '31', '34', '67', '68', '76', '112']),
    )
    expect(strength?.stance).toBe('power')
    expect(strength?.damage).toBe(1)
    expect(strength?.target).toBe('enemy')
    expect(strength?.accuracy).toBe(100)
  })

  test('Rest forcefully replaces the user main status with sleep', () => {
    const rest = getMove('rest')

    expect(rest?.status).toMatchObject({
      id: 'sleep',
      chance: 100,
      target: 'self',
      forceStatus: true,
    })
  })

  test('quick attack is a low damage speed contest normal TM move', () => {
    const move = getMove('quick-attack')

    expect(move).toBeDefined()
    expect(move?.stance).toBe('speed')
    expect(move?.damage).toBe(0.5)
    expect(move?.accuracy).toBe(100)
    expect(move?.contest).toEqual({
      attackerMetric: 'effective-stat:speed',
      defenderMetric: 'effective-stat:speed',
      comparison: 'greaterThan',
      success: {
        damageMultiplier: 1,
        preventCounter: true,
        result: 'win',
        message: '{attacker} moved first and avoided the counterattack!',
      },
      failure: {
        damageMultiplier: 0,
        failMove: true,
        result: 'loss',
        message: '{attacker} was not faster, so {move} failed!',
      },
    })
  })

  test('sucker punch is stance-win gated and prevents the counterattack', () => {
    const move = getMove('sucker-punch')

    expect(move).toBeDefined()
    expect(move?.stance).toBe('speed')
    expect(move?.failOnStance).toBe('tie')
    expect(move?.preventCounterOnStanceWin).toBe(true)
    expect(move?.contest).toBeUndefined()
  })

  test('protect, detect, and quick guard take hold without stance-fail gating', () => {
    expect(getMove('protect')?.failOnStance).toBeUndefined()
    expect(getMove('detect')?.failOnStance).toBeUndefined()
    expect(getMove('quick-guard')?.failOnStance).toBeUndefined()
    expect(getMove('quick-guard')?.secondaryStatuses?.[0]?.effects).toEqual([
      { type: 'damage-reduction', percent: 100 },
    ])
  })

  test('guard variants spread damage reduction across battle stances', () => {
    expect(getMove('wide-guard')?.secondaryStatuses?.[0]?.effects).toEqual([
      { type: 'damage-reduction', percent: 75, stance: 'tech' },
    ])
    expect(getMove('baneful-bunker')?.secondaryStatuses?.[0]?.effects).toEqual([
      { type: 'damage-reduction', percent: 75, stance: 'power' },
    ])
    expect(getMove('kings-shield')?.secondaryStatuses?.[0]?.effects).toEqual([
      { type: 'damage-reduction', percent: 75, stance: 'power' },
    ])
    expect(getMove('spiky-shield')?.secondaryStatuses?.[0]?.effects).toEqual([
      { type: 'damage-reduction', percent: 75, stance: 'speed' },
    ])
    expect(getMove('obstruct')?.secondaryStatuses?.[0]?.effects).toEqual([
      { type: 'damage-reduction', percent: 75, stance: 'speed' },
    ])
    expect(getMove('burning-bulwark')?.secondaryStatuses?.[0]?.effects).toEqual([
      { type: 'damage-reduction', percent: 75, stance: 'tech' },
    ])
  })

  test('aerial ace is a speed TM move with flying damage', () => {
    const move = getMove('aerial-ace')

    expect(move).toBeDefined()
    expect(move?.forcedType).toBe('flying')
    expect(move?.stance).toBe('speed')
    expect(move?.damage).toBe(1.2)
    expect(move?.accuracy).toBe(100)
  })

  test('rock slide is a power TM move with heavy rock damage', () => {
    const move = getMove('rock-slide')

    expect(move).toBeDefined()
    expect(move?.forcedType).toBe('rock')
    expect(move?.stance).toBe('power')
    expect(move?.damage).toBe(1.5)
    expect(move?.accuracy).toBe(90)
  })

  test('hidden power resolves type and strength from IVs', () => {
    const move = getMove('hidden-power')
    const weakPokemon = makeBattlePokemon({
      ivs: {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
      },
    })
    const strongPokemon = makeBattlePokemon({
      ivs: {
        hp: 31,
        attack: 31,
        defense: 31,
        specialAttack: 31,
        specialDefense: 31,
        speed: 31,
      },
    })

    expect(move).toBeDefined()
    expect(move?.forcedType).toBe('random')
    expect(move?.damage).toBe(1)
    expect(resolveHiddenPower(weakPokemon)).toEqual({
      attackType: 'fighting',
      damageMultiplier: 0.7,
    })
    expect(resolveHiddenPower(strongPokemon)).toEqual({
      attackType: 'psychic',
      damageMultiplier: 1.5,
    })
  })

  test('metronome is a wrapper that calls another authored move', () => {
    const move = getMove('metronome')
    const callableMoves = getMetronomeCallableMoves()
    const calledMove = resolveMetronomeMove(() => 0)

    expect(move).toBeDefined()
    expect(move?.stance).toBe('tech')
    expect(move?.damage).toBe(0)
    expect(move?.damageRange).toBeUndefined()
    expect(move?.randomStatuses).toBeUndefined()
    expect(callableMoves.length).toBeGreaterThan(0)
    expect(
      callableMoves.some((candidate) => candidate.id === 'metronome'),
    ).toBe(false)
    expect(
      callableMoves.every(
        (candidate) => !candidate.charged && !candidate.continuous,
      ),
    ).toBe(true)
    expect(calledMove.id).toBe(callableMoves[0].id)
  })

  test('called moves can copy the opponent last successful authored move', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const quickAttack = getMove('quick-attack')!
    const copycat = getMove('copycat')!

    recordSuccessfulMoveUse({
      state,
      side: 'enemy',
      pokemon: defender,
      move: quickAttack,
    })

    const result = resolveCalledMove({
      move: copycat,
      state,
      side: 'player',
      attacker,
      random: () => 0,
    })

    expect(result.move.id).toBe('quick-attack')
    expect(result.message).toContain('Copycat called Quick Attack')
  })

  test('runtime move helpers support fixed damage, next boost, item use, and held item typing', () => {
    const state = makePveBattleState({
      config: { itemsPerBattle: 2 },
      itemsUsedThisBattle: [{ itemId: 'potion', turn: 1 }],
    })
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    expect(
      resolveDamageRuleDamage({
        rule: getMove('sonic-boom')?.damageRule,
        attacker,
        defender,
      }).damage,
    ).toBe(20)
    attacker.level = 37
    expect(
      resolveDamageRuleDamage({
        rule: { type: 'user-level' },
        attacker,
        defender,
      }).damage,
    ).toBe(37)
    expect(
      resolveDamageRuleDamage({
        rule: { type: 'user-level', multiplier: 1.5 },
        attacker,
        defender,
      }).damage,
    ).toBe(55)
    recordBattleDamage({
      state,
      sourceSide: 'enemy',
      targetSide: 'player',
      sourcePokemon: defender,
      targetPokemon: attacker,
      damage: 40,
      attackType: 'steel',
    })
    expect(
      resolveDamageRuleDamage({
        rule: { type: 'last-damage-taken', multiplier: 1.5 },
        attacker,
        defender,
        state,
        side: 'player',
      }).damage,
    ).toBe(60)
    expect(
      resolveDamageRuleDamage({
        rule: { type: 'last-damage-taken', multiplier: 1.5 },
        attacker,
        defender,
        state,
        side: 'player',
      }).failed,
    ).toContain('no recent damage')
    attacker.currentHp = 42
    expect(
      resolveDamageRuleDamage({
        rule: { type: 'user-current-hp' },
        attacker,
        defender,
      }).damage,
    ).toBe(42)
    attacker.currentHp = attacker.maxHp
    expect(getMove('guillotine')?.damageRule).toEqual({ type: 'ohko' })
    expect(getMove('horn-drill')?.damageRule).toEqual({ type: 'ohko' })
    expect(
      resolveDamageRuleDamage({
        rule: getMove('guillotine')?.damageRule,
        attacker,
        defender,
      }).damage,
    ).toBe(defender.currentHp)

    const falseSwipe = getMove('false-swipe')!
    applyMoveRuntimeEffects({
      move: falseSwipe,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(applyNextDamageModifier(attacker, 100).damage).toBe(160)

    const doomDesire = getMove('doom-desire')!
    expect(doomDesire.delayedDamage).toEqual({ turns: 2, damage: 2.8 })
    const delayedMessage = queueDelayedMoveDamage({
      state,
      move: doomDesire,
      sourceSide: 'player',
      targetSide: 'enemy',
      attacker,
      damage: 33,
      attackType: 'steel',
    })
    expect(delayedMessage).toContain('will strike in 2 turns')
    expect(processDelayedMoveDamage(state)).toEqual([])
    expect(defender.currentHp).toBe(defender.maxHp)
    const delayedMessages = processDelayedMoveDamage(state)
    expect(delayedMessages.join(' ')).toContain('Doom Desire struck')
    expect(defender.currentHp).toBe(defender.maxHp - 33)

    const stockpile = getMove('stockpile')!
    expect(getBattleItemUseLimit(state, 'player')).toBe(2)
    expect(getBattleItemUsesRemaining(state, 'player')).toBe(1)
    const itemResult = applyMoveRuntimeEffects({
      move: stockpile,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(itemResult.failed).toBeUndefined()
    expect(getBattleItemUseLimit(state, 'player')).toBe(2)
    expect(getBattleItemUsesRemaining(state, 'player')).toBe(2)

    attacker.heldItem = { id: 'fire-plate', name: 'Fire Plate' }
    expect(
      resolveDynamicMoveType({
        move: getMove('judgment')!,
        attacker,
        fallbackType: 'normal',
      }),
    ).toBe('fire')

    attacker.heldItem = { id: 'water-memory', name: 'Water Memory' }
    expect(getMove('multi-attack')?.dynamicType).toEqual({
      type: 'held-memory',
      fallbackType: 'normal',
    })
    expect(
      resolveDynamicMoveType({
        move: getMove('multi-attack')!,
        attacker,
        fallbackType: 'normal',
      }),
    ).toBe('water')

    attacker.heldItem = { id: 'shock-drive', name: 'Shock Drive' }
    expect(getMove('techno-blast')?.dynamicType).toEqual({
      type: 'held-drive',
      fallbackType: 'normal',
    })
    expect(
      resolveDynamicMoveType({
        move: getMove('techno-blast')!,
        attacker,
        fallbackType: 'normal',
      }),
    ).toBe('electric')

    const firePledge = getMove('fire-pledge')!
    expect(getConditionalDamageMultiplier({ move: firePledge, attacker, defender, state, side: 'player' })).toBe(1)
    state.turn = 1
    recordSuccessfulMoveUse({
      state,
      side: 'player',
      pokemon: attacker,
      move: getMove('water-pledge')!,
    })
    state.turn = 2
    expect(getConditionalDamageMultiplier({ move: firePledge, attacker, defender, state, side: 'player' })).toBe(1.5)
  })

  test('normal TM runtime authoring maps conditional damage, aiming, and move locks', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    const facade = getMove('facade')!
    expect(facade.conditionalDamageModifiers).toEqual([
      {
        type: 'user-status',
        statuses: ['burn', 'frostbite', 'paralysis', 'poison', 'bad-poison', 'sleep', 'freeze'],
        multiplier: 2,
      },
    ])
    expect(getConditionalDamageMultiplier({ move: facade, attacker, defender })).toBe(1)
    attacker.status = { id: 'burn', counter: 1 }
    expect(getConditionalDamageMultiplier({ move: facade, attacker, defender })).toBe(2)
    attacker.status = undefined

    const rage = getMove('rage')!
    expect(rage.buffs).toBeUndefined()
    expect(rage.conditionalDamageModifiers).toEqual([
      { type: 'user-took-damage', multiplier: 2 },
    ])

    const chipAway = getMove('chip-away')!
    expect(chipAway.ignoreDefenderStatStages).toBe(true)
    defender.statStages = { ...DEFAULT_STAT_STAGES, defense: 6, specialDefense: 6 }
    const blockedDamage = calculateDamage(attacker, defender, 'power', 1, 'normal')
    const ignoredDamage = calculateDamage(attacker, defender, 'power', 1, 'normal', undefined, undefined, undefined, undefined, undefined, {
      ignoreDefenderStatStages: true,
    })
    expect(ignoredDamage.damage).toBeGreaterThan(blockedDamage.damage)

    const lockOn = getMove('lock-on')!
    expect(lockOn.nextAccuracyBypass).toEqual({ target: 'self', uses: 1 })
    applyMoveRuntimeEffects({ move: lockOn, state, side: 'player', attacker, defender })
    expect(consumeNextAccuracyBypass(attacker)).toBe(true)
    expect(consumeNextAccuracyBypass(attacker)).toBe(false)

    const kowtowCleave = getMove('kowtow-cleave')!
    expect(kowtowCleave.alwaysHits).toBe(true)
    attacker.nextAccuracyBypass = { remainingUses: 1 }
    expect(
      getEffectiveMoveAccuracy({
        move: { ...kowtowCleave, accuracy: 1 },
        state,
        attacker,
        attackerSide: 'player',
        weather: 'fog',
        consumeNextAccuracyBypass: true,
      }),
    ).toBe(100)
    expect(attacker.nextAccuracyBypass).toEqual({ remainingUses: 1 })

    recordSuccessfulMoveUse({
      state,
      side: 'enemy',
      pokemon: defender,
      move: getMove('ember')!,
    })
    const encore = getMove('encore')!
    expect(encore.moveLockEffect).toEqual({ target: 'enemy', turns: 2 })
    const encoreResult = applyMoveRuntimeEffects({
      move: encore,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(encoreResult.failed).toBeUndefined()
    expect(defender.encoredMove).toEqual({
      moveId: 'ember',
      moveName: 'Ember',
      turnsRemaining: 2,
    })
    expect(getMoveLockMessage(defender, 'tackle')).toBe('Enemy Mon must use Ember.')
    tickMoveLock(defender, 'ember')
    expect(defender.encoredMove?.turnsRemaining).toBe(1)
  })

  test('normal TM runtime authoring maps status cures, stat copying, transform, and berry use', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    defender.status = { id: 'paralysis', counter: 1 }
    const smellingSalts = getMove('smelling-salts')!
    expect(getConditionalDamageMultiplier({ move: smellingSalts, attacker, defender })).toBe(2)
    const saltsResult = applyMoveRuntimeEffects({
      move: smellingSalts,
      state,
      side: 'player',
      attacker,
      defender,
      damageDealt: 20,
    })
    expect(saltsResult.messages).toEqual(['Enemy Mon was cured of paralysis!'])
    expect(defender.status).toBeUndefined()

    defender.statStages = {
      ...DEFAULT_STAT_STAGES,
      attack: 2,
      defense: -1,
      specialAttack: 1,
      speed: 3,
      crit: 1,
    }
    const psychUp = getMove('psych-up')!
    expect(psychUp.statStageEffect).toEqual({ type: 'copy-target', target: 'self' })
    applyMoveRuntimeEffects({ move: psychUp, state, side: 'player', attacker, defender })
    expect(attacker.statStages).toEqual(defender.statStages)

    attacker.statStages = { ...DEFAULT_STAT_STAGES, attack: 3, defense: -2 }
    const powerShift = getMove('power-shift')!
    expect(powerShift.statStageEffect).toEqual({
      type: 'swap-self',
      first: 'attack',
      second: 'defense',
    })
    applyMoveRuntimeEffects({ move: powerShift, state, side: 'player', attacker, defender })
    expect(attacker.statStages?.attack).toBe(-2)
    expect(attacker.statStages?.defense).toBe(3)

    defender.formId = '25'
    defender.name = 'Pikachu'
    defender.types = ['Electric']
    defender.stats = { hp: 90, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 }
    const transform = getMove('transform')!
    expect(transform.transformEffect).toEqual({ target: 'enemy' })
    applyMoveRuntimeEffects({ move: transform, state, side: 'player', attacker, defender })
    expect(attacker.originalFormId).toBe('1')
    expect(attacker.formId).toBe('25')
    expect(attacker.name).toBe('Pikachu')
    expect(attacker.types).toEqual(['Electric'])
    expect(attacker.stats.speed).toBe(90)

    attacker.heldItem = { id: 'oran-berry', name: 'Oran Berry' }
    defender.heldItem = { id: 'hard-stone', name: 'Hard Stone' }
    const teatime = getMove('teatime')!
    expect(teatime.heldItemEffect).toEqual({ type: 'consume-berries', target: 'both' })
    applyMoveRuntimeEffects({ move: teatime, state, side: 'player', attacker, defender })
    expect(attacker.heldItem).toBeUndefined()
    expect(attacker.consumedHeldItems).toEqual([
      { itemId: 'oran-berry', name: 'Oran Berry', persistent: false },
    ])
    expect(defender.heldItem).toEqual({ id: 'hard-stone', name: 'Hard Stone' })
  })

  test('purify cures the target status and heals the user only on success', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const purify = getMove('purify')!

    expect(purify.target).toBe('enemy')
    expect(purify.heal).toBeUndefined()
    expect(purify.statusCure).toEqual({
      target: 'enemy',
      statuses: 'all',
      healUserPercent: 50,
      failIfNoStatus: true,
    })

    attacker.currentHp = 20
    attacker.maxHp = 100
    defender.status = { id: 'poison', counter: 1 }
    const success = applyMoveRuntimeEffects({
      move: purify,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(success.failed).toBeUndefined()
    expect(success.messages).toEqual([
      'Enemy Mon was cured of poison!',
      'Player Mon healed 50 HP!',
    ])
    expect(defender.status).toBeUndefined()
    expect(attacker.currentHp).toBe(70)

    const failed = applyMoveRuntimeEffects({
      move: purify,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(failed.failed).toContain('no status to cure')
    expect(failed.messages).toEqual([])
    expect(attacker.currentHp).toBe(70)
  })

  test('psycho shift transfers the user main status to the target', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const psychoShift = getMove('psycho-shift')!

    expect(psychoShift.statusTransfer).toEqual({
      from: 'self',
      to: 'enemy',
      statuses: 'all',
      clearSourceOnSuccess: true,
      failIfNoStatus: true,
    })

    attacker.status = { id: 'burn', counter: 1 }
    defender.status = undefined
    const result = applyMoveRuntimeEffects({
      move: psychoShift,
      state,
      side: 'player',
      attacker,
      defender,
    })

    expect(result.failed).toBeUndefined()
    expect(attacker.status).toBeUndefined()
    expect((defender.status as { id?: string } | undefined)?.id).toBe('burn')
    expect(result.messages).toContain('Player Mon transferred its status to Enemy Mon.')
  })

  test('psycho shift fails without clearing the user status when transfer is invalid', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const psychoShift = getMove('psycho-shift')!

    const noStatus = applyMoveRuntimeEffects({
      move: psychoShift,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(noStatus.failed).toBe('Psycho Shift failed because there was no status to transfer.')

    attacker.status = { id: 'poison', counter: 1 }
    defender.types = ['poison']
    const immune = applyMoveRuntimeEffects({
      move: psychoShift,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(immune.failed).toBe('Psycho Shift failed because the status could not be transferred.')
    expect(attacker.status?.id).toBe('poison')
    expect(defender.status).toBeUndefined()
  })

  test('normal TM runtime authoring maps weather healing, status immunity, wake effects, and type changes', () => {
    const state = makePveBattleState({
      weather: {
        slot: 1,
        weather: 'harsh-sunlight',
        label: 'Harsh Sunlight',
      },
    })
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    attacker.currentHp = 20
    attacker.maxHp = 120

    const morningSun = getMove('morning-sun')!
    expect(getMoveHealAmount({ move: morningSun, pokemon: attacker, weather: 'harsh-sunlight' })).toBe(79)
    expect(getMoveHealAmount({ move: morningSun, pokemon: attacker, weather: 'rain' })).toBe(30)

    const safeguard = getMove('safeguard')!
    applySecondaryStatusesFromMove({
      move: safeguard,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    expect(
      getSecondaryStatusStatusPreventionMessage({
        state,
        pokemon: attacker,
        side: 'player',
        statusId: 'burn',
      }),
    ).toBe('Player Mon is protected from burn by Safeguard.')

    defender.status = { id: 'sleep', counter: 2 }
    const uproar = getMove('uproar')!
    applySecondaryStatusesFromMove({
      move: uproar,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    const messages = processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(messages).toContain('Enemy Mon woke up because of Uproar.')
    expect(defender.status).toBeUndefined()
    expect(
      getSecondaryStatusStatusPreventionMessage({
        state,
        pokemon: defender,
        side: 'enemy',
        statusId: 'sleep',
      }),
    ).toBe('Enemy Mon is protected from sleep by Uproar.')

    defender.types = ['Water']
    const reflectType = getMove('reflect-type')!
    expect(reflectType.typeChangeEffect).toEqual({
      type: 'target-primary',
      target: 'self',
    })
    applyMoveRuntimeEffects({ move: reflectType, state, side: 'player', attacker, defender })
    expect(attacker.battleTypeOverride).toEqual(['water'])
    expect(attacker.types).toEqual(['water'])

    const wish = getMove('wish')!
    attacker.currentHp = 30
    applySecondaryStatusesFromMove({
      move: wish,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(attacker.currentHp).toBe(30)
    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(attacker.currentHp).toBe(90)
  })

  test('snore can only be used while the user is asleep', () => {
    const snore = getMove('snore')!
    const state = makePveBattleState()
    const attacker = makeBattlePokemon({ name: 'Sleeper' })
    const defender = makeBattlePokemon({ name: 'Target' })

    expect(snore.battleCondition).toEqual({
      type: 'user-status',
      statusId: 'sleep',
    })
    expect(snore.interruptEnemyMove).toBe(30)

    expect(
      checkMoveBattleCondition({
        move: snore,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBe('Snore failed because Sleeper is not sleep.')

    attacker.status = { id: 'sleep', counter: 2 }
    expect(
      checkMoveBattleCondition({
        move: snore,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBeUndefined()
  })

  test('conversion changes the user type to its first assigned move type', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const conversion = getMove('conversion')!

    attacker.assignedMoves = [{ moveId: 'ember' }] as any

    expect(conversion.typeChangeEffect).toEqual({
      type: 'first-known-move',
      target: 'self',
    })

    const result = applyMoveRuntimeEffects({
      move: conversion,
      state,
      side: 'player',
      attacker,
      defender,
    })

    expect(result.failed).toBeUndefined()
    expect(attacker.battleTypeOverride).toEqual(['fire'])
    expect(attacker.types).toEqual(['fire'])
    expect(result.messages).toContain('Player Mon became fire-type.')
  })

  test('conversion 2 changes the user to resist the opponent last attack type', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const conversion2 = getMove('conversion-2')!

    expect(conversion2.typeChangeEffect).toEqual({
      type: 'resist-last-opponent-move',
      target: 'self',
    })

    recordSuccessfulBasicAttackUse({
      state,
      side: 'enemy',
      pokemon: defender,
      attackType: 'normal',
    })

    const result = applyMoveRuntimeEffects({
      move: conversion2,
      state,
      side: 'player',
      attacker,
      defender,
      random: () => 0,
    })

    expect(result.failed).toBeUndefined()
    expect(attacker.battleTypeOverride).toEqual(['ghost'])
    expect(attacker.types).toEqual(['ghost'])
    expect(result.messages).toContain('Player Mon became ghost-type.')
  })

  test('conversion 2 can use the opponent last authored move type', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const conversion2 = getMove('conversion-2')!

    recordSuccessfulMoveUse({
      state,
      side: 'enemy',
      pokemon: defender,
      move: getMove('ember')!,
      attackType: 'fire',
    })

    const result = applyMoveRuntimeEffects({
      move: conversion2,
      state,
      side: 'player',
      attacker,
      defender,
      random: () => 0,
    })

    expect(result.failed).toBeUndefined()
    expect(attacker.battleTypeOverride).toEqual(['fire'])
    expect(attacker.types).toEqual(['fire'])
    expect(result.messages).toContain('Player Mon became fire-type.')
  })

  test('echoed voice scales repeated continuous damage', () => {
    const echoedVoice = getMove('echoed-voice')!

    expect(echoedVoice.continuous).toEqual({ min: 2, max: 5 })
    expect(echoedVoice.repeatDamage).toEqual({
      perUsePercent: 100,
      maxUses: 5,
    })
    expect(getRepeatDamageMultiplier({ move: echoedVoice, previousUses: 0 })).toBe(1)
    expect(getRepeatDamageMultiplier({ move: echoedVoice, previousUses: 1 })).toBe(2)
    expect(getRepeatDamageMultiplier({ move: echoedVoice, previousUses: 4 })).toBe(5)
    expect(getRepeatDamageMultiplier({ move: echoedVoice, previousUses: 8 })).toBe(5)
  })

  test('continuous end effects can apply self confusion after rampage moves', () => {
    const attacker = makeBattlePokemon({ name: 'Tauros' })
    const defender = makeBattlePokemon({ name: 'Target' })
    const thrash = getMove('thrash')!

    expect(thrash.status).toBeUndefined()
    expect(thrash.continuousEnd).toEqual({
      status: { id: 'confusion', chance: 100, target: 'self' },
    })

    const messages = applyContinuousEndEffects({
      move: thrash,
      attacker,
      defender,
      random: () => 0,
    })

    expect(attacker.status?.id).toBe('confusion')
    expect(messages.join(' ')).toContain('[icon:status:confusion]')
  })

  test('pay day adds a flat Pokedollar battle reward for player use', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const payDay = getMove('pay-day')!

    expect(payDay.battleRewards).toEqual({
      rewards: [
        {
          type: 'currency',
          targetId: 'pokedollars',
          quantity: 30,
          dropChance: 100,
        },
      ],
    })

    const result = applyMoveRuntimeEffects({
      move: payDay,
      state,
      side: 'player',
      attacker,
      defender,
    })

    expect(result.failed).toBeUndefined()
    expect(result.messages).toEqual(['Pay Day scattered 30 Pokédollars.'])
    expect(state.moveRewards).toEqual([
      {
        type: 'currency',
        targetId: 'pokedollars',
        quantity: 30,
        dropChance: 100,
      },
    ])
  })

  test('swallow reduces available item uses without lowering the battle item limit', () => {
    const state = makePveBattleState({
      config: { itemsPerBattle: 2 },
      itemsUsedThisBattle: [],
    })
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    expect(getBattleItemUseLimit(state, 'player')).toBe(2)
    expect(getBattleItemUsesRemaining(state, 'player')).toBe(2)

    const result = applyMoveRuntimeEffects({
      move: getMove('swallow')!,
      state,
      side: 'enemy',
      attacker,
      defender,
    })

    expect(result.failed).toBeUndefined()
    expect(getBattleItemUseLimit(state, 'player')).toBe(2)
    expect(getBattleItemUsesRemaining(state, 'player')).toBe(1)
  })

  test('enemy stockpile restores assigned trainer item availability up to its starting quantity', () => {
    const state = makePveBattleState({
      trainerItems: [{ itemId: 'battle-potion', quantity: 1 }],
    })
    const player = state.playerTeam[0]
    const enemy = state.enemyTeam[0]

    expect(getBattleItemUseLimit(state, 'enemy')).toBe(1)
    expect(getBattleItemUsesRemaining(state, 'enemy')).toBe(1)

    applyMoveRuntimeEffects({
      move: getMove('swallow')!,
      state,
      side: 'player',
      attacker: player,
      defender: enemy,
    })
    expect(state.trainerItems?.[0]?.quantity).toBe(0)
    expect(getBattleItemUseLimit(state, 'enemy')).toBe(1)
    expect(getBattleItemUsesRemaining(state, 'enemy')).toBe(0)

    const stockpileResult = applyMoveRuntimeEffects({
      move: getMove('stockpile')!,
      state,
      side: 'enemy',
      attacker: enemy,
      defender: player,
    })

    expect(stockpileResult.failed).toBeUndefined()
    expect(state.trainerItems?.[0]?.quantity).toBe(1)
    expect(getBattleItemUseLimit(state, 'enemy')).toBe(1)
    expect(getBattleItemUsesRemaining(state, 'enemy')).toBe(1)
  })

  test('last resort requires another successful move from the user first', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const lastResort = getMove('last-resort')!

    expect(lastResort.battleCondition).toEqual({ type: 'user-has-used-other-moves' })
    expect(
      checkMoveBattleCondition({
        move: lastResort,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toContain('other moves have not been used')

    recordSuccessfulMoveUse({
      state,
      side: 'player',
      pokemon: attacker,
      move: getMove('quick-attack')!,
    })

    expect(
      checkMoveBattleCondition({
        move: lastResort,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBeUndefined()
  })

  test('first impression only works on the user first active turn', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const firstImpression = getMove('first-impression')!

    expect(firstImpression.battleCondition).toEqual({ type: 'first-active-turn' })
    expect(
      checkMoveBattleCondition({
        move: firstImpression,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBeUndefined()

    state.turn = 2
    expect(
      checkMoveBattleCondition({
        move: firstImpression,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toContain('no longer newly active')

    attacker.activeTurnStarted = 3
    state.turn = 3
    expect(
      checkMoveBattleCondition({
        move: firstImpression,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBeUndefined()
  })

  test('yawn applies sleep on the next turn end and clears when the target switches out', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const yawn = getMove('yawn')!

    applySecondaryStatusesFromMove({
      move: yawn,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(defender.secondaryStatuses?.[0]).toMatchObject({
      id: 'yawn',
      delayTurns: 1,
    })

    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(defender.status).toBeUndefined()
    expect(defender.secondaryStatuses?.[0]).toMatchObject({
      id: 'yawn',
      delayTurns: 0,
    })

    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(defender.status?.id).toBe('sleep')
    expect(defender.secondaryStatuses).toBeUndefined()

    defender.status = undefined
    applySecondaryStatusesFromMove({
      move: yawn,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    clearPokemonSecondaryStatuses(defender)
    processSecondaryStatusesForTurnEnd(state, () => 0)

    expect(defender.status).toBeUndefined()
    expect(defender.secondaryStatuses).toBeUndefined()
  })

  test('secondary statuses refresh instead of stacking identical pokemon or side effects', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const yawn = getMove('yawn')!

    applySecondaryStatusesFromMove({
      move: yawn,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    defender.secondaryStatuses![0].delayTurns = 0

    applySecondaryStatusesFromMove({
      move: yawn,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(defender.secondaryStatuses).toHaveLength(1)
    expect(defender.secondaryStatuses?.[0]).toMatchObject({
      id: 'yawn',
      delayTurns: 1,
    })

    const sideMove = {
      secondaryStatuses: [
        {
          id: 'test-hazard',
          name: 'Test Hazard',
          target: 'enemy-side' as const,
          triggers: ['switch' as const],
          turns: 2,
          effects: [{ type: 'damage' as const, percentMaxHp: 10 }],
        },
      ],
    }

    applySecondaryStatusesFromMove({
      move: sideMove,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    state.secondaryStatuses![0].remainingTurns = 1
    applySecondaryStatusesFromMove({
      move: sideMove,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(state.secondaryStatuses).toHaveLength(1)
    expect(state.secondaryStatuses?.[0]).toMatchObject({
      id: 'test-hazard',
      target: 'side',
      targetSide: 'enemy',
      remainingTurns: 2,
    })
  })

  test('ghost curse refreshes its secondary status instead of stacking damage', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const curse = getMove('curse')!
    attacker.types = ['ghost']
    attacker.maxHp = 100
    attacker.currentHp = 100

    applyMoveRuntimeEffects({ move: curse, state, side: 'player', attacker, defender })
    defender.secondaryStatuses![0].remainingTurns = 1
    applyMoveRuntimeEffects({ move: curse, state, side: 'player', attacker, defender })

    expect(defender.secondaryStatuses).toHaveLength(1)
    expect(defender.secondaryStatuses?.[0]).toMatchObject({
      id: 'curse',
      remainingTurns: 4,
    })
  })

  test('destiny bond only takes down the attacker when the bonded pokemon faints from damage', () => {
    const state = makePveBattleState()
    const bonded = state.playerTeam[0]
    const attacker = state.enemyTeam[0]
    const destinyBond = getMove('destiny-bond')!
    bonded.currentHp = 50
    attacker.currentHp = 80

    applySecondaryStatusesFromMove({
      move: destinyBond,
      state,
      attacker: bonded,
      defender: attacker,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(bonded.secondaryStatuses?.[0]).toMatchObject({
      id: 'destiny-bond',
      effects: [{ type: 'faint-bond' }],
    })

    bonded.currentHp = 1
    expect(
      processSecondaryStatusFaintEffects({
        state,
        faintedPokemon: bonded,
        faintedSide: 'player',
        attackerPokemon: attacker,
        attackerSide: 'enemy',
        damage: 49,
      }),
    ).toEqual([])
    expect(attacker.currentHp).toBe(80)
    expect(bonded.secondaryStatuses).toHaveLength(1)

    bonded.currentHp = 0
    expect(
      processSecondaryStatusFaintEffects({
        state,
        faintedPokemon: bonded,
        faintedSide: 'player',
        attackerPokemon: attacker,
        attackerSide: 'enemy',
        damage: 1,
      }),
    ).toEqual(['Enemy Mon was taken down by Destiny Bond.'])
    expect(attacker.currentHp).toBe(0)
    expect(bonded.secondaryStatuses).toBeUndefined()
  })

  test('grudge only depletes attacker move uses when the grudge user faints from damage', () => {
    const state = makePveBattleState()
    const grudging = state.playerTeam[0]
    const attacker = state.enemyTeam[0]
    const grudge = getMove('grudge')!
    grudging.currentHp = 50
    attacker.moveUsesRemaining = 4
    state.enemyMoveUsesRemaining = 4

    applySecondaryStatusesFromMove({
      move: grudge,
      state,
      attacker: grudging,
      defender: attacker,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(grudging.secondaryStatuses?.[0]).toMatchObject({
      id: 'grudge',
      effects: [{ type: 'faint-move-use-depletion', amount: 5 }],
    })

    grudging.currentHp = 1
    expect(
      processSecondaryStatusFaintEffects({
        state,
        faintedPokemon: grudging,
        faintedSide: 'player',
        attackerPokemon: attacker,
        attackerSide: 'enemy',
        damage: 49,
      }),
    ).toEqual([])
    expect(attacker.moveUsesRemaining).toBe(4)
    expect(grudging.secondaryStatuses).toHaveLength(1)

    grudging.currentHp = 0
    expect(
      processSecondaryStatusFaintEffects({
        state,
        faintedPokemon: grudging,
        faintedSide: 'player',
        attackerPokemon: attacker,
        attackerSide: 'enemy',
        damage: 1,
      }),
    ).toEqual(['Enemy Mon lost 4 move uses to Grudge.'])
    expect(attacker.currentHp).toBeGreaterThan(0)
    expect(attacker.moveUsesRemaining).toBe(0)
    expect(state.enemyMoveUsesRemaining).toBe(0)
    expect(grudging.secondaryStatuses).toBeUndefined()
  })

  test('perish song faints both active pokemon after its delayed count', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    const perishSong = getMove('perish-song')!

    applySecondaryStatusesFromMove({
      move: perishSong,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(attacker.secondaryStatuses?.[0]).toMatchObject({
      id: 'perish-song',
      delayTurns: 2,
      remainingTurns: 1,
    })
    expect(defender.secondaryStatuses?.[0]).toMatchObject({
      id: 'perish-song',
      delayTurns: 2,
      remainingTurns: 1,
    })

    processSecondaryStatusesForTurnEnd(state, () => 0)
    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(attacker.currentHp).toBeGreaterThan(0)
    expect(defender.currentHp).toBeGreaterThan(0)

    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(attacker.currentHp).toBe(0)
    expect(defender.currentHp).toBe(0)
    expect(attacker.secondaryStatuses).toBeUndefined()
    expect(defender.secondaryStatuses).toBeUndefined()
  })

  test('attract infatuates opposite gender targets with a before-move immobilization chance', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    attacker.gender = 'male'
    defender.gender = 'female'
    const attract = getMove('attract')!

    expect(attract.status).toBeUndefined()

    applySecondaryStatusesFromMove({
      move: attract,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(defender.secondaryStatuses?.[0]).toMatchObject({
      id: 'infatuation',
      effects: [{ type: 'infatuation', chance: 50 }],
    })

    const blocked = processBeforeMoveSecondaryStatuses({
      state,
      pokemon: defender,
      side: 'enemy',
      random: () => 0.49,
    })
    expect(blocked).toEqual({
      canMove: false,
      message: 'Enemy Mon is immobilized by love!',
    })

    const canMove = processBeforeMoveSecondaryStatuses({
      state,
      pokemon: defender,
      side: 'enemy',
      random: () => 0.5,
    })
    expect(canMove).toEqual({ canMove: true, message: '' })
  })

  test('attract fails against same gender and genderless targets', () => {
    const attract = getMove('attract')!

    const sameGenderState = makePveBattleState()
    const sameGenderAttacker = sameGenderState.playerTeam[0]
    const sameGenderDefender = sameGenderState.enemyTeam[0]
    sameGenderAttacker.gender = 'female'
    sameGenderDefender.gender = 'female'

    const sameGenderMessages = applySecondaryStatusesFromMove({
      move: attract,
      state: sameGenderState,
      attacker: sameGenderAttacker,
      defender: sameGenderDefender,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(sameGenderMessages).toContain(
      'Infatuation failed because the genders are not compatible.',
    )
    expect(sameGenderDefender.secondaryStatuses).toBeUndefined()

    const genderlessState = makePveBattleState()
    const genderlessAttacker = genderlessState.playerTeam[0]
    const genderlessDefender = genderlessState.enemyTeam[0]
    genderlessAttacker.gender = 'male'
    genderlessDefender.gender = 'genderless'

    const genderlessMessages = applySecondaryStatusesFromMove({
      move: attract,
      state: genderlessState,
      attacker: genderlessAttacker,
      defender: genderlessDefender,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(genderlessMessages).toContain(
      'Infatuation failed because the genders are not compatible.',
    )
    expect(genderlessDefender.secondaryStatuses).toBeUndefined()
  })

  test('block and trapping moves prevent voluntary switches through secondary statuses', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    applySecondaryStatusesFromMove({
      move: getMove('block')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(defender.secondaryStatuses?.[0]).toMatchObject({
      id: 'blocked',
      effects: [{ type: 'switch-prevention' }],
    })
    expect(
      getSecondaryStatusSwitchPreventionMessage({
        state,
        pokemon: defender,
        side: 'enemy',
      }),
    ).toBe('Enemy Mon cannot switch out because of Blocked.')

    clearPokemonSecondaryStatuses(defender)
    applySecondaryStatusesFromMove({
      move: getMove('wrap')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(defender.secondaryStatuses?.[0].effects).toEqual(
      expect.arrayContaining([
        { type: 'damage', percentMaxHp: 12.5 },
        { type: 'switch-prevention' },
      ]),
    )
  })

  test('trapping move effects end when the source pokemon leaves battle', () => {
    const state = makePveBattleState({
      playerTeam: [
        makeBattlePokemon({ id: 'source-mon', user: 'player-1', name: 'Source Mon' }),
        makeBattlePokemon({ id: 'bench-mon', user: 'player-1', name: 'Bench Mon' }),
      ],
      enemyTeam: [
        makeBattlePokemon({ id: 'target-mon', user: 'enemy', name: 'Target Mon' }),
      ],
    })
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    applySecondaryStatusesFromMove({
      move: getMove('wrap')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })

    const trapStatus = defender.secondaryStatuses?.[0]
    expect(trapStatus).toMatchObject({
      id: 'wrap',
      sourceSide: 'player',
      sourcePokemonId: 'source-mon',
    })
    expect(trapStatus?.effects).toEqual(
      expect.arrayContaining([{ type: 'switch-prevention' }]),
    )

    const cleared = clearSourceLinkedTrapSecondaryStatuses({
      state,
      sourceSide: 'player',
      sourcePokemon: attacker,
    })

    expect(cleared).toBe(1)
    expect(defender.secondaryStatuses).toBeUndefined()
  })

  test('foresight and odor sleuth expose Normal and Fighting immunity as neutral damage', () => {
    const originalRandom = Math.random
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    defender.types = ['Ghost']

    try {
      Math.random = () => 0.99
      const immune = calculateDamage(attacker, defender, 'power', 1, 'normal')
      expect(immune.damage).toBe(0)
      expect(immune.isImmune).toBe(true)

      applySecondaryStatusesFromMove({
        move: getMove('foresight')!,
        state,
        attacker,
        defender,
        sourceSide: 'player',
        random: () => 0,
      })

      expect(defender.secondaryStatuses?.[0]).toMatchObject({
        id: 'identified',
        effects: [
          {
            type: 'type-immunity-bypass',
            attackTypes: ['normal', 'fighting'],
          },
        ],
      })

      const bypassAttackTypes = getSecondaryStatusTypeImmunityBypassAttackTypes({
        state,
        defender,
        defenderSide: 'enemy',
      })
      const exposed = calculateDamage(
        attacker,
        defender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        undefined,
        undefined,
        bypassAttackTypes,
      )

      expect(exposed.damage).toBeGreaterThan(0)
      expect(exposed.typeEffectiveness).toBe(1)
      expect(exposed.isImmune).toBe(false)
      expect(getMove('odor-sleuth')?.secondaryStatuses).toEqual(
        getMove('foresight')?.secondaryStatuses,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('miracle eye exposes Psychic immunity as neutral damage', () => {
    const originalRandom = Math.random
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    defender.types = ['Dark']

    try {
      Math.random = () => 0.99
      const immune = calculateDamage(attacker, defender, 'tech', 1, 'psychic')
      expect(immune.damage).toBe(0)

      applySecondaryStatusesFromMove({
        move: getMove('miracle-eye')!,
        state,
        attacker,
        defender,
        sourceSide: 'player',
        random: () => 0,
      })
      const exposed = calculateDamage(
        attacker,
        defender,
        'tech',
        1,
        'psychic',
        undefined,
        undefined,
        undefined,
        undefined,
        getSecondaryStatusTypeImmunityBypassAttackTypes({
          state,
          defender,
          defenderSide: 'enemy',
        }),
      )

      expect(exposed.damage).toBeGreaterThan(0)
      expect(exposed.typeEffectiveness).toBe(1)
    } finally {
      Math.random = originalRandom
    }
  })

  test('fire move batch maps core secondary effects', () => {
    const flameCharge = getMove('flame-charge')
    const bitterBlade = getMove('bitter-blade')
    const willOWisp = getMove('will-o-wisp')
    const heatCrash = getMove('heat-crash')
    const incinerate = getMove('incinerate')
    const magmaStorm = getMove('magma-storm')

    expect(flameCharge?.forcedType).toBe('fire')
    expect(flameCharge?.buffs).toEqual([{ stat: 'speed', stages: 1 }])

    expect(bitterBlade?.forcedType).toBe('fire')
    expect(bitterBlade?.absorb).toBe(50)

    expect(willOWisp).toMatchObject({
      damage: 0,
      accuracy: 85,
      status: { id: 'burn', chance: 100, target: 'enemy' },
    })

    expect(incinerate?.heldItemEffect).toEqual({
      type: 'consume-berries',
      target: 'enemy',
    })
    expect(magmaStorm?.secondaryStatuses?.[0]).toMatchObject({
      id: 'magma-storm',
      target: 'enemy-pokemon',
      effects: [
        { type: 'damage', percentMaxHp: 12.5 },
        { type: 'switch-prevention' },
      ],
    })

    const heavy = makeBattlePokemon({ name: 'Heavy', weight: 1200 })
    const light = makeBattlePokemon({ name: 'Light', weight: 100 })
    expect(
      resolveMoveContest({
        move: heatCrash!,
        attacker: heavy,
        defender: light,
      }),
    ).toMatchObject({
      configured: true,
      success: true,
      damageMultiplier: 2,
    })
  })

  test('recharge moves use post-action recharge instead of pre-action charge', () => {
    const rechargeMoveIds = [
      'giga-impact',
      'hyper-beam',
      'blast-burn',
      'hydro-cannon',
      'frenzy-plant',
      'meteor-assault',
      'rock-wrecker',
      'roar-of-time',
    ]

    for (const moveId of rechargeMoveIds) {
      const move = getMove(moveId)
      expect(move?.charged).toBeUndefined()
      expect(move?.recharge).toBe(1)
    }

    expect(getMove('solar-beam')?.charged).toBe(1)
    expect(getMove('phantom-force')?.charged).toBe(1)
    expect(getMove('geomancy')?.charged).toBe(1)
  })

  test('recharge moves are excluded from called move pools', () => {
    expect(getMetronomeCallableMoves().some((move) => move.id === 'hyper-beam')).toBe(false)
    expect(getCallableAuthoredMoves().some((move) => move.id === 'hyper-beam')).toBe(false)
  })

  test('rapid spin clears secondary statuses from the user', () => {
    const move = getMove('rapid-spin')!
    const state = makePveBattleState()
    state.secondaryStatuses = [
      {
        id: 'stealth-rock',
        name: 'Stealth Rock',
        triggers: ['switch'],
        sourceSide: 'enemy',
        target: 'side',
        targetSide: 'player',
        effects: [{ type: 'damage', percentMaxHp: 12.5 }],
      },
      {
        id: 'spikes',
        name: 'Spikes',
        triggers: ['switch'],
        sourceSide: 'player',
        target: 'side',
        targetSide: 'enemy',
        effects: [{ type: 'damage', percentMaxHp: 12.5 }],
      },
    ]
    const attacker = makeBattlePokemon({
      name: 'Spinner',
      secondaryStatuses: [
        {
          id: 'wrap',
          name: 'Wrap',
          triggers: ['turn-end'],
          sourceSide: 'enemy',
          target: 'pokemon',
          effects: [{ type: 'switch-prevention' }],
        },
        {
          id: 'infatuation',
          name: 'Infatuation',
          triggers: ['turn-end'],
          sourceSide: 'enemy',
          target: 'pokemon',
          effects: [{ type: 'infatuation' }],
        },
      ],
    })
    const defender = makeBattlePokemon({
      name: 'Target',
      secondaryStatuses: [
        {
          id: 'identified',
          name: 'Identified',
          triggers: ['turn-end'],
          sourceSide: 'player',
          target: 'pokemon',
          effects: [{ type: 'type-immunity-bypass', attackTypes: ['normal', 'fighting'] }],
        },
      ],
    })

    expect(move.secondaryStatusCure).toEqual({ target: 'self', scope: 'pokemon-and-side' })

    const result = applyMoveRuntimeEffects({
      move,
      state,
      side: 'player',
      attacker,
      defender,
    })

    expect(result.failed).toBeUndefined()
    expect(result.messages).toEqual(['Spinner shook off lingering effects.'])
    expect(attacker.secondaryStatuses).toBeUndefined()
    expect(defender.secondaryStatuses).toHaveLength(1)
    expect(state.secondaryStatuses).toEqual([
      expect.objectContaining({
        id: 'spikes',
        targetSide: 'enemy',
      }),
    ])
  })

  test('tidy up clears hazards and substitutes without removing unrelated secondary statuses', () => {
    const move = getMove('tidy-up')!
    const state = makePveBattleState()
    state.secondaryStatuses = [
      {
        id: 'stealth-rock',
        name: 'Stealth Rock',
        triggers: ['switch'],
        sourceSide: 'enemy',
        target: 'side',
        targetSide: 'player',
        effects: [{ type: 'damage', percentMaxHp: 12.5 }],
      },
      {
        id: 'sticky-web',
        name: 'Sticky Web',
        triggers: ['switch'],
        sourceSide: 'player',
        target: 'side',
        targetSide: 'enemy',
        effects: [{ type: 'stat', stat: 'speed', stages: -1 }],
      },
      {
        id: 'safeguard',
        name: 'Safeguard',
        triggers: ['turn-end'],
        sourceSide: 'player',
        target: 'side',
        targetSide: 'player',
        effects: [{ type: 'damage-reduction', percent: 15 }],
      },
    ]
    const attacker = makeBattlePokemon({
      name: 'Cleaner',
      secondaryStatuses: [
        {
          id: 'substitute',
          name: 'Substitute',
          triggers: ['turn-end'],
          sourceSide: 'player',
          target: 'pokemon',
          effects: [{ type: 'damage-reduction', percent: 50 }],
        },
      ],
    })
    const defender = makeBattlePokemon({
      name: 'Target',
      secondaryStatuses: [
        {
          id: 'shed-tail',
          name: 'Shed Tail',
          triggers: ['turn-end'],
          sourceSide: 'enemy',
          target: 'pokemon',
          effects: [{ type: 'damage-reduction', percent: 50 }],
        },
        {
          id: 'perish-song',
          name: 'Perish Song',
          triggers: ['turn-end'],
          sourceSide: 'player',
          target: 'pokemon',
          effects: [{ type: 'damage', percentMaxHp: 34 }],
        },
      ],
    })

    expect(move.secondaryStatusCure).toEqual({
      target: 'both',
      scope: 'pokemon-and-side',
      ids: ['spikes', 'toxic-spikes', 'stealth-rock', 'sticky-web', 'substitute', 'shed-tail'],
    })

    const result = applyMoveRuntimeEffects({
      move,
      state,
      side: 'player',
      attacker,
      defender,
    })

    expect(result.failed).toBeUndefined()
    expect(attacker.secondaryStatuses).toBeUndefined()
    expect(defender.secondaryStatuses).toEqual([
      expect.objectContaining({
        id: 'perish-song',
      }),
    ])
    expect(state.secondaryStatuses).toEqual([
      expect.objectContaining({
        id: 'safeguard',
      }),
    ])
  })

  test('camouflage randomly changes the user battle type', () => {
    const move = getMove('camouflage')!
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    expect(move.typeChangeEffect).toEqual({ type: 'random', target: 'self' })

    const result = applyMoveRuntimeEffects({
      move,
      state,
      side: 'player',
      attacker,
      defender,
      random: () => 0.5,
    })

    expect(result.failed).toBeUndefined()
    expect(attacker.battleTypeOverride).toEqual(['flying'])
    expect(attacker.types).toEqual(['flying'])
    expect(result.messages).toEqual(['Player Mon became flying-type.'])
  })

  test('Bestow transfers the user held item onto the target', () => {
    const move = getMove('bestow')
    const state = makePveBattleState()
    const attacker = makeBattlePokemon({
      name: 'Giver',
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })
    const defender = makeBattlePokemon({
      name: 'Receiver',
      heldItem: { id: 'hard-stone', name: 'Hard Stone' },
    })

    expect(move?.heldItemEffect).toEqual({ type: 'bestow' })

    const result = applyMoveRuntimeEffects({
      move: move!,
      state,
      side: 'player',
      attacker,
      defender,
    })

    expect(result.failed).toBeUndefined()
    expect(result.messages).toEqual(['Giver gave Oran Berry to Receiver.'])
    expect(attacker.heldItem).toBeUndefined()
    expect((attacker as any).heldItemId).toBeNull()
    expect(defender.heldItem).toEqual({ id: 'oran-berry', name: 'Oran Berry' })
    expect((defender as any).heldItemId).toBe('oran-berry')
  })

  test('held item move effects remove, steal, swap, and recycle battle items', () => {
    const state = makePveBattleState()

    const knockOff = getMove('knock-off')!
    const attacker = makeBattlePokemon({ name: 'Remover' })
    const defender = makeBattlePokemon({
      name: 'Target',
      heldItem: { id: 'hard-stone', name: 'Hard Stone' },
    })
    expect(knockOff.heldItemEffect).toEqual({ type: 'remove-target' })
    expect(
      applyMoveRuntimeEffects({
        move: knockOff,
        state,
        side: 'player',
        attacker,
        defender,
      }).messages,
    ).toEqual(["Knock Off removed Target's Hard Stone."])
    expect(defender.heldItem).toBeUndefined()
    expect((defender as any).heldItemId).toBeNull()

    const covet = getMove('covet')!
    const thief = getMove('thief')!
    const thiefUser = makeBattlePokemon({ name: 'Thief' })
    const theftTarget = makeBattlePokemon({
      name: 'Holder',
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })
    expect(covet.heldItemEffect).toEqual({ type: 'steal-target' })
    expect(thief.heldItemEffect).toEqual({ type: 'steal-target' })
    expect(
      applyMoveRuntimeEffects({
        move: thief,
        state,
        side: 'player',
        attacker: thiefUser,
        defender: theftTarget,
      }).messages,
    ).toEqual(["Thief stole Holder's Oran Berry."])
    expect(thiefUser.heldItem).toEqual({ id: 'oran-berry', name: 'Oran Berry' })
    expect(theftTarget.heldItem).toBeUndefined()

    const trick = getMove('trick')!
    const switcheroo = getMove('switcheroo')!
    const swapper = makeBattlePokemon({
      name: 'Swapper',
      heldItem: { id: 'sitrus-berry', name: 'Sitrus Berry' },
    })
    const swapTarget = makeBattlePokemon({
      name: 'TradeTarget',
      heldItem: { id: 'hard-stone', name: 'Hard Stone' },
    })
    expect(trick.heldItemEffect).toEqual({ type: 'swap' })
    expect(switcheroo.heldItemEffect).toEqual({ type: 'swap' })
    expect(
      applyMoveRuntimeEffects({
        move: trick,
        state,
        side: 'player',
        attacker: swapper,
        defender: swapTarget,
      }).messages,
    ).toEqual(['Swapper and TradeTarget swapped held items.'])
    expect(swapper.heldItem).toEqual({ id: 'hard-stone', name: 'Hard Stone' })
    expect(swapTarget.heldItem).toEqual({ id: 'sitrus-berry', name: 'Sitrus Berry' })

    const recycle = getMove('recycle')!
    const recycler = makeBattlePokemon({
      name: 'Recycler',
      consumedHeldItems: [{ itemId: 'oran-berry', name: 'Oran Berry' }],
    })
    expect(recycle.heldItemEffect).toEqual({ type: 'recycle' })
    expect(
      applyMoveRuntimeEffects({
        move: recycle,
        state,
        side: 'player',
        attacker: recycler,
        defender: swapTarget,
      }).messages,
    ).toEqual(['Recycler restored its Oran Berry.'])
    expect(recycler.heldItem).toEqual({ id: 'oran-berry', name: 'Oran Berry' })
    expect(recycler.consumedHeldItems).toEqual([])
  })

  test('Sticky Hold protects held items from opposing item moves', () => {
    const state = makePveBattleState()
    const knockOff = getMove('knock-off')!
    const thief = getMove('thief')!
    const trick = getMove('trick')!
    const pluck = getMove('pluck')!

    const remover = makeBattlePokemon({ name: 'Remover' })
    const protectedTarget = makeBattlePokemon({
      name: 'Holder',
      ability: 'sticky_hold',
      heldItem: { id: 'hard-stone', name: 'Hard Stone' },
    })

    const knockOffResult = applyMoveRuntimeEffects({
      move: knockOff,
      state,
      side: 'player',
      attacker: remover,
      defender: protectedTarget,
    })
    expect(knockOffResult.failed).toBe("Holder's Sticky Hold protected its held item!")
    expect(protectedTarget.heldItem).toEqual({ id: 'hard-stone', name: 'Hard Stone' })

    const thiefUser = makeBattlePokemon({ name: 'Thief' })
    const theftTarget = makeBattlePokemon({
      name: 'BerryHolder',
      ability: 'sticky_hold',
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })
    const thiefResult = applyMoveRuntimeEffects({
      move: thief,
      state,
      side: 'player',
      attacker: thiefUser,
      defender: theftTarget,
    })
    expect(thiefResult.failed).toBe("BerryHolder's Sticky Hold protected its held item!")
    expect(thiefUser.heldItem).toBeUndefined()
    expect(theftTarget.heldItem).toEqual({ id: 'oran-berry', name: 'Oran Berry' })

    const swapper = makeBattlePokemon({
      name: 'Swapper',
      heldItem: { id: 'sitrus-berry', name: 'Sitrus Berry' },
    })
    const swapTarget = makeBattlePokemon({
      name: 'TradeTarget',
      ability: 'sticky_hold',
      heldItem: { id: 'hard-stone', name: 'Hard Stone' },
    })
    const trickResult = applyMoveRuntimeEffects({
      move: trick,
      state,
      side: 'player',
      attacker: swapper,
      defender: swapTarget,
    })
    expect(trickResult.failed).toBe("TradeTarget's Sticky Hold protected its held item!")
    expect(swapper.heldItem).toEqual({ id: 'sitrus-berry', name: 'Sitrus Berry' })
    expect(swapTarget.heldItem).toEqual({ id: 'hard-stone', name: 'Hard Stone' })

    const pluckResult = applyMoveRuntimeEffects({
      move: pluck,
      state,
      side: 'player',
      attacker: makeBattlePokemon({ name: 'Plucker' }),
      defender: theftTarget,
    })
    expect(pluckResult.failed).toBe("BerryHolder's Sticky Hold protected its held item!")
    expect(theftTarget.heldItem).toEqual({ id: 'oran-berry', name: 'Oran Berry' })
    expect(theftTarget.consumedHeldItems).toBeUndefined()
  })

  test('water move batch maps core secondary effects', () => {
    const aquaRing = getMove('aqua-ring')
    const bouncyBubble = getMove('bouncy-bubble')
    const flipTurn = getMove('flip-turn')
    const scald = getMove('scald')
    const waterSport = getMove('water-sport')
    const waterfall = getMove('waterfall')
    const surf = getMove('surf')

    expect(aquaRing?.status).toEqual({ id: 'regen', chance: 100, target: 'self' })

    expect(bouncyBubble?.absorb).toBe(50)
    expect(flipTurn?.switchEffect).toEqual({ type: 'self-pending' })
    expect(scald?.status).toEqual({ id: 'burn', chance: 30, target: 'enemy' })
    expect(waterfall?.interruptEnemyMove).toBe(20)
    expect(surf?.accuracy).toBe(100)
    expect(waterSport?.secondaryStatuses?.[0]?.effects).toEqual([
      { type: 'damage-reduction', attackType: 'fire', percent: 50 },
    ])
  })

  test('bug move batch maps Powder, Rage Powder, and Fell Stinger effects', () => {
    const state = makePveBattleState()
    const attacker = makeBattlePokemon({ name: 'Bug User' })
    const defender = makeBattlePokemon({ name: 'Target' })

    const fellStinger = getMove('fell-stinger')!
    expect(fellStinger.buffs).toBeUndefined()
    expect(fellStinger.postDamageStatStage).toEqual({
      condition: 'target-ko',
      stat: 'attack',
      stages: 3,
      chance: 100,
      target: 'self',
    })
    applyMoveRuntimeEffects({
      move: fellStinger,
      state,
      side: 'player',
      attacker,
      defender,
      damageDealt: 20,
    })
    expect(attacker.statStages?.attack).toBeUndefined()
    defender.currentHp = 0
    applyMoveRuntimeEffects({
      move: fellStinger,
      state,
      side: 'player',
      attacker,
      defender,
      damageDealt: 20,
    })
    expect(attacker.statStages?.attack).toBe(3)

    defender.currentHp = defender.maxHp
    const powder = getMove('powder')!
    expect(powder.secondaryStatuses?.[0]).toMatchObject({
      target: 'enemy-pokemon',
      effects: [
        {
          type: 'move-block',
          mode: 'attack-type',
          attackTypes: ['fire'],
          damagePercentMaxHp: 25,
          removeOnBlock: true,
        },
      ],
    })
    applySecondaryStatusesFromMove({
      move: powder,
      state,
      attacker,
      defender,
      sourceSide: 'player',
    })
    const powderBlock = processBeforeMoveSecondaryStatuses({
      state,
      pokemon: defender,
      side: 'enemy',
      move: getMove('ember')!,
      attackType: 'fire',
    })
    expect(powderBlock.canMove).toBe(false)
    expect(powderBlock.message).toContain('Powder')
    expect(defender.currentHp).toBe(90)
    expect(defender.secondaryStatuses).toBeUndefined()

    expect(getMove('rage-powder')).toBeUndefined()
  })

  test('remaining move authoring table adds recommended type libraries', () => {
    expect(getMove('apple-acid')).toMatchObject({
      forcedType: 'grass',
      debuffs: [{ stat: 'specialDefense', stages: -1, chance: 100 }],
    })
    expect(getMove('apple-acid')?.formId).toEqual(['842'])
    expect(getMove('apple-acid')?.manualOnly).toBeUndefined()
    expect(getMove('aurora-beam')).toMatchObject({
      forcedType: 'ice',
      debuffs: [{ stat: 'attack', stages: -1, chance: 10 }],
    })
    expect(getMove('bulk-up')).toMatchObject({
      target: 'self',
      buffs: [
        { stat: 'attack', stages: 1, chance: 100 },
        { stat: 'defense', stages: 1, chance: 100 },
      ],
    })
    expect(getMove('toxic-spikes')?.secondaryStatuses?.[0]).toMatchObject({
      target: 'enemy-side',
      triggers: ['switch'],
      effects: [{ type: 'damage', percentMaxHp: 12.5 }],
    })
    expect(getMove('earthquake')).toMatchObject({
      forcedType: 'ground',
      damage: 2,
    })
    expect(getMove('air-slash')).toMatchObject({
      forcedType: 'flying',
      damage: 1.5,
      interruptEnemyMove: 30,
    })
    expect(getMove('moonblast')).toMatchObject({
      forcedType: 'fairy',
      debuffs: [{ stat: 'specialAttack', stages: -1, chance: 30 }],
    })
    expect(getMove('shadow-ball')).toMatchObject({
      forcedType: 'ghost',
      debuffs: [{ stat: 'specialDefense', stages: -1, chance: 20 }],
    })
    expect(getMove('hex')?.conditionalDamageModifiers).toEqual([
      { type: 'target-status', statuses: 'all', multiplier: 2 },
    ])
    expect(getMove('infernal-parade')?.conditionalDamageModifiers).toEqual([
      { type: 'target-status', statuses: 'all', multiplier: 2 },
    ])
    expect(getMove('last-respects')?.conditionalDamageModifiers).toEqual([
      {
        type: 'fainted-party-members',
        baseMultiplier: 1,
        perFaintedMultiplier: 1,
      },
    ])
    expect(getMove('destiny-bond')).toMatchObject({
      damage: 0,
      secondaryStatuses: [
        {
          id: 'destiny-bond',
          target: 'self-pokemon',
          triggers: ['turn-end'],
          turns: 1,
          effects: [{ type: 'faint-bond' }],
        },
      ],
    })
    expect(getMove('curse')?.curseEffect).toEqual({
      ghostType: 'ghost',
      ghostHpFraction: 2,
      ghostDamagePercentMaxHp: 25,
      ghostTurns: 4,
      nonGhostBuffs: [
        { stat: 'attack', stages: 1, chance: 100 },
        { stat: 'defense', stages: 1, chance: 100 },
        { stat: 'speed', stages: -1, chance: 100 },
      ],
    })
    expect(getMove('grudge')).toMatchObject({
      damage: 0,
      secondaryStatuses: [
        {
          id: 'grudge',
          target: 'self-pokemon',
          triggers: ['turn-end'],
          turns: 1,
          effects: [{ type: 'faint-move-use-depletion', amount: 5 }],
        },
      ],
    })
    expect(getMove('nightmare')).toMatchObject({
      damage: 0,
      battleCondition: { type: 'target-status', statusId: 'sleep' },
      secondaryStatuses: [
        {
          id: 'nightmare',
          target: 'enemy-pokemon',
          triggers: ['turn-end'],
          turns: 3,
          effects: [{ type: 'damage', percentMaxHp: 25 }],
        },
      ],
    })
    expect(getMove('poltergeist')?.battleCondition).toEqual({
      type: 'target-has-held-item',
    })
    expect(getMove('rage-fist')?.conditionalDamageModifiers).toEqual([
      { type: 'user-took-damage', multiplier: 2 },
    ])
    expect(getMove('shadow-punch')?.alwaysHits).toBe(true)
    expect(getMove('spite')?.moveUseEffect).toEqual({ target: 'enemy', amount: 1 })
    expect(getMove('meteor-mash')).toMatchObject({
      forcedType: 'steel',
      buffs: [{ stat: 'attack', stages: 1, chance: 20 }],
    })
    expect(getMove('volt-switch')?.switchEffect).toEqual({ type: 'self-pending' })
    expect(getMove('roost')).toMatchObject({
      target: 'self',
      heal: true,
    })
    expect(getMove('sacred-sword')?.ignoreDefenderStatStages).toBe(true)
    expect(getMove('darkest-lariat')?.ignoreDefenderStatStages).toBe(true)
    expect(getMove('brick-break')?.secondaryStatusCure).toEqual({
      target: 'enemy',
      scope: 'pokemon',
      ids: ['reflect', 'light-screen', 'aurora-veil'],
    })
    expect(getMove('psychic-fangs')?.secondaryStatusCure).toEqual({
      target: 'enemy',
      scope: 'pokemon',
      ids: ['reflect', 'light-screen', 'aurora-veil'],
    })
    expect(getMove('barb-barrage')?.conditionalDamageModifiers).toEqual([
      {
        type: 'target-status',
        statuses: ['poison', 'bad-poison'],
        multiplier: 2,
      },
    ])
    expect(getMove('sparkling-aria')?.postDamageStatusCure).toEqual({
      target: 'enemy',
      statuses: ['burn'],
    })
    expect(getMove('incinerate')?.heldItemEffect).toEqual({
      type: 'consume-berries',
      target: 'enemy',
    })
    expect(getMove('defog')?.secondaryStatusCure).toEqual({
      target: 'both',
      scope: 'side',
    })
    expect(getMove('soak')?.typeChangeEffect).toEqual({
      type: 'set',
      target: 'enemy',
      pokemonType: 'water',
    })
    expect(getMove('roost')?.typeChangeEffect).toEqual({
      type: 'remove',
      target: 'self',
      pokemonType: 'flying',
      turns: 1,
    })
    expect(getMove('clear-smog')?.statStageEffect).toEqual({
      type: 'reset',
      target: 'enemy',
    })
    expect(getMove('haze')?.statStageEffect).toEqual({
      type: 'reset',
      target: 'both',
    })
    expect(getMove('heart-swap')?.statStageEffect).toEqual({
      type: 'swap-target',
      target: 'enemy',
    })
    expect(getMove('topsy-turvy')?.statStageEffect).toEqual({
      type: 'invert-target',
      target: 'enemy',
    })
    expect(getMove('brine')?.conditionalDamageModifiers).toEqual([
      { type: 'target-current-hp-at-or-below-percent', percent: 50, multiplier: 2 },
    ])
    expect(getMove('stomping-tantrum')?.conditionalDamageModifiers).toEqual([
      { type: 'user-previous-move-failed', multiplier: 2 },
    ])

    expect(getMove('hail')).toBeUndefined()
    expect(getMove('sandstorm')).toBeUndefined()
    expect(getMove('max-hailstorm')).toBeUndefined()
  })

  test('psychic rock flying and poison move audit fixes are wired', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    expect(getMove('eerie-spell')?.moveUseEffect).toEqual({ target: 'enemy', amount: 1 })
    expect(getMove('extrasensory')?.interruptEnemyMove).toBe(20)
    expect(getMove('future-sight')).toMatchObject({
      damage: 0,
      delayedDamage: { turns: 2, damage: 2.4 },
    })
    expect(getMove('guard-swap')).toBeUndefined()
    expect(getMove('power-swap')?.statStageEffect).toEqual({
      type: 'swap-target',
      target: 'enemy',
      stats: ['attack', 'specialAttack'],
    })
    expect(getMove('psyshield-bash')?.buffs).toContainEqual({
      stat: 'specialDefense',
      stages: 1,
      chance: 100,
    })
    expect(getMove('stored-power')?.conditionalDamageModifiers).toEqual([
      { type: 'user-positive-stat-stages', multiplier: 3 },
    ])
    expect(getMove('zen-headbutt')?.interruptEnemyMove).toBe(20)

    expect(getMove('rollout')).toMatchObject({
      continuous: { min: 5, max: 5 },
      repeatDamage: { perUsePercent: 100, maxUses: 5 },
    })
    defender.currentHp = defender.maxHp
    defender.types = ['Water']
    applySecondaryStatusesFromMove({
      move: getMove('salt-cure')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(defender.currentHp).toBe(defender.maxHp - 30)
    defender.secondaryStatuses = undefined
    defender.currentHp = defender.maxHp
    defender.types = ['Rock']
    applySecondaryStatusesFromMove({
      move: getMove('salt-cure')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(defender.currentHp).toBe(defender.maxHp - 15)
    defender.secondaryStatuses = undefined
    expect(getMove('tar-shot')?.secondaryStatuses?.[0]).toMatchObject({
      effects: [{ type: 'damage-taken-modifier', attackType: 'fire', percent: 100 }],
    })
    applySecondaryStatusesFromMove({
      move: getMove('tar-shot')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    expect(applySecondaryStatusDamageModifiers({
      state,
      attacker,
      defender,
      attackerSide: 'player',
      defenderSide: 'enemy',
      damage: 40,
      attackType: 'fire',
    }).damage).toBe(80)
    defender.secondaryStatuses = undefined

    expect(getMove('aerial-ace')?.alwaysHits).toBe(true)
    expect(getMove('fly')).toMatchObject({ target: 'enemy', damage: 1.8, charged: 1 })
    expect(getMove('acrobatics')?.conditionalDamageModifiers).toEqual([
      { type: 'user-no-held-item', multiplier: 2 },
    ])
    attacker.heldItem = undefined
    expect(getConditionalDamageMultiplier({ move: getMove('acrobatics')!, attacker, defender })).toBe(2)
    attacker.heldItem = { id: 'oran-berry', name: 'Oran Berry' }
    expect(getConditionalDamageMultiplier({ move: getMove('acrobatics')!, attacker, defender })).toBe(1)
    attacker.heldItem = undefined
    expect(getMove('air-slash')?.interruptEnemyMove).toBe(30)
    expect(getMove('floaty-fall')?.interruptEnemyMove).toBe(30)
    expect(getMove('pluck')?.heldItemEffect).toEqual({ type: 'consume-berries', target: 'enemy' })
    expect(getMove('sky-attack')).toMatchObject({ charged: 1, interruptEnemyMove: 30, critChance: 30 })
    expect(getMove('sky-drop')).toMatchObject({
      charged: 1,
      status: { id: 'vanished', chance: 100, target: 'self' },
    })
    expect(getMove('bounce')).toMatchObject({
      charged: 1,
      status: { id: 'vanished', chance: 100, target: 'self' },
      additionalStatuses: [{ id: 'paralysis', chance: 30, target: 'enemy' }],
    })
    expect(getMove('tailwind')).toMatchObject({
      target: 'self',
      buffs: [{ stat: 'speed', stages: 2 }],
    })

    const belch = getMove('belch')!
    expect(belch.battleCondition).toEqual({ type: 'user-has-consumed-held-item' })
    attacker.consumedHeldItems = undefined
    expect(checkMoveBattleCondition({ move: belch, state, side: 'player', attacker, defender }))
      .toBe('Belch failed because Player Mon has not consumed a held item.')
    attacker.consumedHeldItems = [{ itemId: 'oran-berry', name: 'Oran Berry' }]
    expect(checkMoveBattleCondition({ move: belch, state, side: 'player', attacker, defender }))
      .toBeUndefined()
    attacker.consumedHeldItems = undefined
    expect(getMove('coil')).toMatchObject({
      buffs: [
        { stat: 'attack', stages: 1, chance: 100 },
        { stat: 'defense', stages: 1, chance: 100 },
      ],
      nextAccuracyBypass: { target: 'self', uses: 1 },
    })
    expect(getMove('venoshock')?.conditionalDamageModifiers).toEqual([
      { type: 'target-status', statuses: ['poison', 'bad-poison'], multiplier: 2 },
    ])
    defender.status = { id: 'poison', counter: 1 }
    expect(getConditionalDamageMultiplier({ move: getMove('venoshock')!, attacker, defender }))
      .toBe(2)
  })

  test('remaining type moves use newly supported runtime effects', () => {
    const state = makePveBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]

    defender.status = { id: 'poison', counter: 1 }
    expect(
      getConditionalDamageMultiplier({
        move: getMove('barb-barrage')!,
        attacker,
        defender,
      }),
    ).toBe(2)

    defender.status = { id: 'burn', counter: 1 }
    const sparklingAria = applyMoveRuntimeEffects({
      move: getMove('sparkling-aria')!,
      state,
      side: 'player',
      attacker,
      defender,
      damageDealt: 20,
    })
    expect(sparklingAria.messages).toEqual(['Enemy Mon was cured of burn!'])
    expect(defender.status).toBeUndefined()

    defender.heldItem = { id: 'oran-berry', name: 'Oran Berry' }
    const incinerate = applyMoveRuntimeEffects({
      move: getMove('incinerate')!,
      state,
      side: 'player',
      attacker,
      defender,
      damageDealt: 20,
    })
    expect(incinerate.failed).toBeUndefined()
    expect(defender.heldItem).toBeUndefined()
    expect(defender.consumedHeldItems).toEqual([
      { itemId: 'oran-berry', name: 'Oran Berry', persistent: false },
    ])

    defender.secondaryStatuses = [
      {
        id: 'reflect',
        name: 'Reflect',
        triggers: ['turn-end'],
        sourceSide: 'enemy',
        target: 'pokemon',
        effects: [{ type: 'damage-reduction', percent: 50 }],
      },
    ]
    const brickBreak = applyMoveRuntimeEffects({
      move: getMove('brick-break')!,
      state,
      side: 'player',
      attacker,
      defender,
      damageDealt: 20,
    })
    expect(brickBreak.messages).toEqual(['Enemy Mon shook off lingering effects.'])
    expect(defender.secondaryStatuses).toBeUndefined()

    state.secondaryStatuses = [
      {
        id: 'spikes',
        name: 'Spikes',
        triggers: ['switch'],
        sourceSide: 'enemy',
        target: 'side',
        targetSide: 'player',
        effects: [{ type: 'damage', percentMaxHp: 12.5 }],
      },
      {
        id: 'toxic-spikes',
        name: 'Toxic Spikes',
        triggers: ['switch'],
        sourceSide: 'player',
        target: 'side',
        targetSide: 'enemy',
        effects: [{ type: 'apply-status', statusId: 'poison', chance: 100 }],
      },
    ]
    const defog = applyMoveRuntimeEffects({
      move: getMove('defog')!,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(defog.messages).toEqual([
      'Player Mon shook off lingering effects.',
      'Enemy Mon shook off lingering effects.',
    ])
    expect(state.secondaryStatuses).toBeUndefined()

    expect(getMove('ingrain')?.secondaryStatuses?.[0]).toMatchObject({
      id: 'ingrain',
      target: 'self-pokemon',
      effects: [
        { type: 'switch-prevention' },
      ],
    })
    expect(getMove('ingrain')?.status).toEqual({
      id: 'regen',
      target: 'self',
    })
    expect(getMove('matcha-gotcha')?.absorb).toBe(50)
    expect(getMove('coaching')?.buffs).toEqual([
      { stat: 'attack', stages: 1 },
      { stat: 'defense', stages: 1 },
    ])
    expect(getMove('counter')).toMatchObject({
      damage: 0,
      damageRule: { type: 'last-damage-taken', multiplier: 2 },
    })
    expect(getMove('no-retreat')).toMatchObject({
      buffs: [
        { stat: 'attack', stages: 1 },
        { stat: 'defense', stages: 1 },
        { stat: 'specialAttack', stages: 1 },
        { stat: 'specialDefense', stages: 1 },
        { stat: 'speed', stages: 1 },
      ],
    })
    expect(getMove('no-retreat')?.secondaryStatuses?.[0]).toMatchObject({
      target: 'self-pokemon',
      effects: [{ type: 'switch-prevention' }],
    })
    expect(getMove('octolock')?.secondaryStatuses?.[0]).toMatchObject({
      target: 'enemy-pokemon',
      effects: [
        { type: 'stat', stat: 'defense', stages: -1 },
        { type: 'stat', stat: 'specialDefense', stages: -1 },
        { type: 'switch-prevention' },
      ],
    })
    expect(getMove('mortal-spin')).toMatchObject({
      secondaryStatusCure: { target: 'self', scope: 'pokemon-and-side' },
      status: { id: 'poison', chance: 100, target: 'enemy' },
    })
    expect(getMove('toxic-thread')).toMatchObject({
      status: { id: 'poison', chance: 100, target: 'enemy' },
      debuffs: [{ stat: 'speed', stages: -1 }],
    })
    const belch = getMove('belch')!
    expect(belch.battleCondition).toEqual({ type: 'user-has-consumed-held-item' })
    attacker.consumedHeldItems = undefined
    expect(
      checkMoveBattleCondition({
        move: belch,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBe('Belch failed because Player Mon has not consumed a held item.')
    attacker.consumedHeldItems = [{ itemId: 'oran-berry', name: 'Oran Berry' }]
    expect(
      checkMoveBattleCondition({
        move: belch,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBeUndefined()
    attacker.consumedHeldItems = undefined
    expect(getMove('coil')).toMatchObject({
      buffs: [
        { stat: 'attack', stages: 1, chance: 100 },
        { stat: 'defense', stages: 1, chance: 100 },
      ],
      nextAccuracyBypass: { target: 'self', uses: 1 },
    })
    expect(getMove('venoshock')?.conditionalDamageModifiers).toEqual([
      { type: 'target-status', statuses: ['poison', 'bad-poison'], multiplier: 2 },
    ])
    defender.status = { id: 'poison', counter: 1 }
    expect(
      getConditionalDamageMultiplier({
        move: getMove('venoshock')!,
        attacker,
        defender,
      }),
    ).toBe(2)
    defender.status = undefined
    const venomDrench = getMove('venom-drench')!
    expect(venomDrench).toMatchObject({
      battleCondition: { type: 'target-status', statusId: 'poison' },
      debuffs: [
        { stat: 'specialAttack', stages: -1 },
        { stat: 'speed', stages: -1 },
      ],
    })
    defender.status = undefined
    expect(
      checkMoveBattleCondition({
        move: venomDrench,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBe('Venom Drench failed because the target is not poison.')
    defender.status = { id: 'poison', counter: 1 }
    expect(
      checkMoveBattleCondition({
        move: venomDrench,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBeUndefined()
    expect(getMove('sand-tomb')?.secondaryStatuses?.[0]).toMatchObject({
      effects: [
        { type: 'damage', percentMaxHp: 12.5 },
        { type: 'switch-prevention' },
      ],
    })
    expect(getMove('thousand-waves')?.secondaryStatuses?.[0]).toMatchObject({
      effects: [{ type: 'switch-prevention' }],
    })
    expect(getMove('oblivion-wing')?.absorb).toBe(75)
    expect(getMove('aerial-ace')?.alwaysHits).toBe(true)
    expect(getMove('fly')).toMatchObject({
      target: 'enemy',
      damage: 1.8,
      charged: 1,
      status: { id: 'vanished', chance: 100, target: 'self' },
    })
    expect(getMove('acrobatics')?.conditionalDamageModifiers).toEqual([
      { type: 'user-no-held-item', multiplier: 2 },
    ])
    attacker.heldItem = undefined
    expect(getConditionalDamageMultiplier({
      move: getMove('acrobatics')!,
      attacker,
      defender,
    })).toBe(2)
    attacker.heldItem = { id: 'oran-berry', name: 'Oran Berry' }
    expect(getConditionalDamageMultiplier({
      move: getMove('acrobatics')!,
      attacker,
      defender,
    })).toBe(1)
    attacker.heldItem = undefined
    expect(getMove('floaty-fall')?.interruptEnemyMove).toBe(30)
    expect(getMove('pluck')?.heldItemEffect).toEqual({
      type: 'consume-berries',
      target: 'enemy',
    })
    expect(getMove('sky-attack')).toMatchObject({
      charged: 1,
      interruptEnemyMove: 30,
      critChance: 30,
    })
    expect(getMove('sky-drop')).toMatchObject({
      charged: 1,
      status: { id: 'vanished', chance: 100, target: 'self' },
    })
    expect(getMove('bounce')).toMatchObject({
      charged: 1,
      status: { id: 'vanished', chance: 100, target: 'self' },
      additionalStatuses: [{ id: 'paralysis', chance: 30, target: 'enemy' }],
    })
    expect(getMove('tailwind')).toMatchObject({
      target: 'self',
      buffs: [{ stat: 'speed', stages: 2 }],
    })
    expect(getMove('dual-wingbeat')?.damageRange).toEqual({ min: 2, max: 2 })
    expect(getMove('glitzy-glow')?.secondaryStatuses?.[0]).toMatchObject({
      target: 'self-side',
      effects: [{ type: 'damage-reduction', stance: 'tech', percent: 50 }],
    })
    expect(getMove('lumina-crash')?.debuffs).toEqual([
      { stat: 'specialDefense', stages: -2 },
    ])
    expect(getMove('prismatic-laser')?.recharge).toBe(1)
    expect(getMove('eerie-spell')?.moveUseEffect).toEqual({ target: 'enemy', amount: 1 })
    expect(getMove('extrasensory')?.interruptEnemyMove).toBe(20)
    expect(getMove('future-sight')).toMatchObject({
      damage: 0,
      delayedDamage: { turns: 2, damage: 2.4 },
    })
    expect(getMove('take-heart')).toMatchObject({
      statusCure: { target: 'self', statuses: 'all' },
      buffs: [
        { stat: 'specialAttack', stages: 1 },
        { stat: 'specialDefense', stages: 1 },
      ],
    })
    expect(getMove('heal-block')?.secondaryStatuses?.[0]).toMatchObject({
      target: 'enemy-pokemon',
      turns: 5,
      effects: [{ type: 'move-block', mode: 'healing' }],
    })
    expect(getMove('psychic-noise')?.secondaryStatuses?.[0]).toMatchObject({
      target: 'enemy-pokemon',
      turns: 5,
      effects: [{ type: 'move-block', mode: 'healing' }],
    })
    expect(getMove('guard-split')?.buffs).toEqual(
      expect.arrayContaining([
        { stat: 'defense', stages: 1, chance: 50 },
        { stat: 'specialDefense', stages: 1, chance: 50 },
      ]),
    )
    expect(getMove('guard-split')?.debuffs).toEqual(
      expect.arrayContaining([
        { stat: 'defense', stages: -1, chance: 50 },
        { stat: 'specialDefense', stages: -1, chance: 50 },
      ]),
    )
    expect(getMove('power-split')).toBeUndefined()
    expect(getMove('power-trick')?.statStageEffect).toEqual({
      type: 'swap-self',
      first: 'attack',
      second: 'defense',
    })
    expect(getMove('guard-swap')).toBeUndefined()
    expect(getMove('heart-stamp')?.interruptEnemyMove).toBe(30)
    expect(getMove('power-swap')?.statStageEffect).toEqual({
      type: 'swap-target',
      target: 'enemy',
      stats: ['attack', 'specialAttack'],
    })
    expect(getMove('psyshield-bash')?.buffs).toContainEqual({
      stat: 'specialDefense',
      stages: 1,
      chance: 100,
    })
    expect(getMove('stored-power')?.conditionalDamageModifiers).toEqual([
      { type: 'user-positive-stat-stages', multiplier: 3 },
    ])
    expect(getMove('zen-headbutt')?.interruptEnemyMove).toBe(20)
    expect(getMove('teleport')).toBeUndefined()
    expect(getMove('heal-order')?.heal).toBe(true)
    expect(getMove('pollen-puff')?.status).toEqual({
      id: 'regen',
      chance: 100,
      target: 'self',
    })
    expect(getMove('silver-wind')?.buffs).toContainEqual({
      stat: 'attack',
      stages: 1,
      chance: 10,
    })
    expect(getMove('ancient-power')?.buffs).toContainEqual({
      stat: 'specialAttack',
      stages: 1,
      chance: 10,
    })
    expect(getMove('rollout')).toMatchObject({
      continuous: { min: 5, max: 5 },
      repeatDamage: { perUsePercent: 100, maxUses: 5 },
    })
    expect(getMove('salt-cure')?.secondaryStatuses?.[0]).toMatchObject({
      target: 'enemy-pokemon',
      effects: [
        { type: 'damage', percentMaxHp: 12.5 },
        { type: 'damage', percentMaxHp: 12.5, pokemonTypes: ['water', 'steel'] },
      ],
    })
    defender.currentHp = defender.maxHp
    defender.types = ['Water']
    applySecondaryStatusesFromMove({
      move: getMove('salt-cure')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(defender.currentHp).toBe(defender.maxHp - 30)
    defender.secondaryStatuses = undefined
    defender.currentHp = defender.maxHp
    defender.types = ['Rock']
    applySecondaryStatusesFromMove({
      move: getMove('salt-cure')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(defender.currentHp).toBe(defender.maxHp - 15)
    defender.secondaryStatuses = undefined
    expect(getMove('tar-shot')).toMatchObject({
      debuffs: [{ stat: 'speed', stages: -1, chance: 100 }],
    })
    expect(getMove('tar-shot')?.secondaryStatuses?.[0]).toMatchObject({
      effects: [{ type: 'damage-taken-modifier', attackType: 'fire', percent: 100 }],
    })
    applySecondaryStatusesFromMove({
      move: getMove('tar-shot')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    expect(applySecondaryStatusDamageModifiers({
      state,
      attacker,
      defender,
      attackerSide: 'player',
      defenderSide: 'enemy',
      damage: 40,
      attackType: 'fire',
    }).damage).toBe(80)
    defender.secondaryStatuses = undefined
    expect(getMove('meteor-beam')).toMatchObject({
      charged: 1,
      buffs: [{ stat: 'specialAttack', stages: 1 }],
    })
    expect(getMove('ominous-wind')?.buffs).toContainEqual({
      stat: 'speed',
      stages: 1,
      chance: 10,
    })
    expect(getMove('spectral-thief')?.statStageEffect).toEqual({
      type: 'copy-target',
      target: 'self',
    })
    expect(getMove('spirit-shackle')?.secondaryStatuses?.[0]).toMatchObject({
      effects: [{ type: 'switch-prevention' }],
    })
    expect(getMove('phantom-force')).toMatchObject({
      charged: 1,
      status: { id: 'vanished', chance: 100, target: 'self' },
    })
    expect(getMove('breaking-swipe')?.debuffs).toEqual([
      { stat: 'attack', stages: -1 },
    ])
    expect(getMove('glaive-rush')?.secondaryStatuses?.[0]).toMatchObject({
      target: 'enemy-pokemon',
      triggers: ['turn-end'],
      delayTurns: 1,
      turns: 1,
      effects: [
        { type: 'accuracy-bypass' },
        { type: 'damage-modifier', percent: 100 },
      ],
    })
    applySecondaryStatusesFromMove({
      move: getMove('glaive-rush')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    expect(hasSecondaryStatusAccuracyBypass({
      state,
      attacker: defender,
      attackerSide: 'enemy',
    })).toBe(false)
    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(hasSecondaryStatusAccuracyBypass({
      state,
      attacker: defender,
      attackerSide: 'enemy',
    })).toBe(true)
    expect(
      applySecondaryStatusDamageModifiers({
        state,
        attacker: defender,
        defender: attacker,
        attackerSide: 'enemy',
        defenderSide: 'player',
        damage: 50,
      }).damage,
    ).toBe(100)
    processSecondaryStatusesForTurnEnd(state, () => 0)
    expect(hasSecondaryStatusAccuracyBypass({
      state,
      attacker: defender,
      attackerSide: 'enemy',
    })).toBe(false)
    expect(getMove('clangorous-soul')).toMatchObject({
      selfDamage: { fraction: 3 },
    })
    expect(getMove('clangorous-soul')?.buffs).toContainEqual({
      stat: 'specialDefense',
      stages: 1,
    })
    expect(getMove('dragon-darts')?.damageRange).toEqual({ min: 2, max: 2 })
    expect(getMove('eternabeam')?.recharge).toBe(1)
    const fickleBeam = getMove('fickle-beam')!
    expect(fickleBeam.conditionalDamageModifiers).toEqual([
      { type: 'chance', chance: 30, multiplier: 2 },
    ])
    expect(
      getConditionalDamageMultiplier({
        move: fickleBeam,
        attacker,
        defender,
        random: () => 0.29,
      }),
    ).toBe(2)
    expect(
      getConditionalDamageMultiplier({
        move: fickleBeam,
        attacker,
        defender,
        random: () => 0.3,
      }),
    ).toBe(1)
    expect(getMove('order-up')?.buffs).toContainEqual({ stat: 'attack', stages: 1, chance: 50 })
    expect(getMove('scale-shot')).toMatchObject({
      damageRange: { min: 1, max: 2.5 },
      buffs: [{ stat: 'speed', stages: 1 }],
      debuffs: [{ stat: 'defense', stages: -1, target: 'self' }],
    })
    expect(getMove('psyshock')?.stance).toBe('random')
    expect(getMove('psystrike')?.stance).toBe('random')
    expect(getMove('secret-sword')?.stance).toBe('random')

    defender.currentHp = Math.floor(defender.maxHp / 2)
    expect(
      getConditionalDamageMultiplier({
        move: getMove('brine')!,
        attacker,
        defender,
      }),
    ).toBe(2)

    state.turn = 4
    state.moveHistory = {
      lastFailed: {
        player: {
          moveId: 'splash',
          moveName: 'Splash',
          side: 'player',
          pokemonId: attacker.id,
          turn: 3,
        },
      },
    }
    expect(
      getConditionalDamageMultiplier({
        move: getMove('stomping-tantrum')!,
        attacker,
        defender,
        state,
        side: 'player',
      }),
    ).toBe(2)
    state.moveHistory = {}
    expect(
      getConditionalDamageMultiplier({
        move: getMove('stomping-tantrum')!,
        attacker: makeBattlePokemon({ id: undefined }),
        defender,
        state,
        side: 'enemy',
      }),
    ).toBe(1)

    const gigatonHammer = getMove('gigaton-hammer')!
    expect(gigatonHammer.battleCondition).toEqual({ type: 'not-last-used-move' })
    state.moveHistory = {
      lastSuccessful: {
        player: {
          moveId: 'gigaton-hammer',
          moveName: 'Gigaton Hammer',
          side: 'player',
          pokemonId: attacker.id,
          turn: 3,
        },
      },
    }
    expect(
      checkMoveBattleCondition({
        move: gigatonHammer,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBe('Gigaton Hammer failed because it was used last turn.')

    const behemothBlade = getMove('behemoth-blade')!
    expect(behemothBlade.conditionalDamageModifiers).toEqual([
      { type: 'target-dynamaxed', multiplier: 2 },
    ])
    defender.isDynamaxed = false
    expect(getConditionalDamageMultiplier({ move: behemothBlade, attacker, defender })).toBe(1)
    defender.isDynamaxed = true
    expect(getConditionalDamageMultiplier({ move: behemothBlade, attacker, defender })).toBe(2)
    expect(getMove('behemoth-bash')?.conditionalDamageModifiers).toEqual([
      { type: 'target-dynamaxed', multiplier: 2 },
    ])
    defender.isDynamaxed = false

    expect(getMove('anchor-shot')?.secondaryStatuses?.[0]).toMatchObject({
      id: 'anchor-shot',
      target: 'enemy-pokemon',
      effects: [{ type: 'switch-prevention' }],
    })
    expect(getMove('autotomize')).toMatchObject({
      target: 'self',
      buffs: [{ stat: 'speed', stages: 2, chance: 100 }],
    })
    expect(getMove('doom-desire')).toMatchObject({
      damage: 0,
      delayedDamage: { turns: 2, damage: 2.8 },
    })
    expect(getMove('gear-up')?.buffs).toEqual([
      { stat: 'attack', stages: 1, chance: 100 },
      { stat: 'specialAttack', stages: 1, chance: 100 },
    ])
    expect(getMove('gyro-ball')?.contest).toMatchObject({
      attackerMetric: 'effective-stat:speed',
      defenderMetric: 'effective-stat:speed',
      comparison: 'lessThan',
      success: { damageMultiplier: 1.5 },
    })
    expect(getMove('heavy-slam')?.contest).toMatchObject({
      attackerMetric: 'weight',
      defenderMetric: 'weight',
      comparison: 'greaterThan',
      success: { damageMultiplier: 1.5 },
    })
    expect(getMove('double-iron-bash')?.interruptEnemyMove).toBe(30)
    expect(getMove('iron-head')?.interruptEnemyMove).toBe(30)
    expect(getMove('make-it-rain')?.battleRewards).toEqual({
      rewards: [{ type: 'currency', targetId: 'pokedollars', quantity: 100, dropChance: 100 }],
    })
    expect(getMove('metal-burst')).toMatchObject({
      damage: 0,
      damageRule: { type: 'last-damage-taken', multiplier: 1.5 },
    })
    expect(getMove('spin-out')?.debuffs).toEqual([
      { stat: 'speed', stages: -2, chance: 100, target: 'self' },
    ])
    expect(getMove('shift-gear')?.buffs).toEqual([
      { stat: 'attack', stages: 1, chance: 100 },
      { stat: 'speed', stages: 2, chance: 100 },
    ])
    expect(getMove('steel-beam')?.selfDamage).toEqual({ fraction: 2 })
    expect(getMove('tachyon-cutter')?.damageRange).toEqual({ min: 2, max: 2 })

    expect(getMove('baddy-bad')?.secondaryStatuses?.[0]).toMatchObject({
      id: 'baddy-bad',
      target: 'self-side',
      effects: [{ type: 'damage-reduction', percent: 50, stance: 'power' }],
    })
    expect(getMove('bite')?.interruptEnemyMove).toBe(30)
    expect(getMove('dark-pulse')?.interruptEnemyMove).toBe(20)
    expect(getMove('fiery-wrath')?.interruptEnemyMove).toBe(20)
    expect(getMove('comeuppance')).toMatchObject({
      damage: 0,
      damageRule: { type: 'last-damage-taken', multiplier: 1.5 },
    })
    expect(getMove('beat-up')).toMatchObject({
      damage: 0,
      damageRule: { type: 'party-member-count', perMemberDamage: 0.25 },
    })
    expect(
      resolveDamageRuleDamage({
        rule: getMove('beat-up')!.damageRule,
        attacker,
        defender,
        attackerTeam: [
          attacker,
          { ...attacker, id: 'ally-1', currentHp: 1 },
          { ...attacker, id: 'ally-2', currentHp: 0 },
        ],
      }).damage,
    ).toBe(25)
    expect(getMove('foul-play')?.damageStatSource).toBe('target')
    expect(getMove('fling')).toMatchObject({
      battleCondition: { type: 'user-has-held-item' },
      heldItemEffect: { type: 'consume-self' },
    })
    expect(getMove('flatter')).toMatchObject({
      status: { id: 'confusion', chance: 100, target: 'enemy' },
      buffs: [{ stat: 'specialAttack', stages: 1, chance: 100, target: 'enemy' }],
    })
    expect(getMove('jaw-lock')?.secondaryStatuses?.[0]).toMatchObject({
      id: 'jaw-lock',
      target: 'both-pokemon',
      effects: [{ type: 'switch-prevention' }],
    })
    expect(getMove('lash-out')?.conditionalDamageModifiers).toEqual([
      { type: 'user-stat-lowered-this-turn', multiplier: 2 },
    ])
    expect(getMove('memento')?.debuffs).toEqual([
      { stat: 'attack', stages: -2, chance: 100 },
      { stat: 'specialAttack', stages: -2, chance: 100 },
    ])
    expect(getMove('obstruct')?.debuffs).toEqual([
      { stat: 'defense', stages: -2, chance: 100 },
    ])
    expect(getMove('parting-shot')?.debuffs).toEqual([
      { stat: 'attack', stages: -1, chance: 100 },
      { stat: 'specialAttack', stages: -1, chance: 100 },
    ])
    expect(getMove('payback')?.conditionalDamageModifiers).toEqual([
      { type: 'user-took-damage', multiplier: 2 },
    ])
    expect(getMove('pursuit')?.conditionalDamageModifiers).toEqual([
      { type: 'target-switching-out', multiplier: 2 },
    ])
    expect(getMove('power-trip')?.conditionalDamageModifiers).toEqual([
      { type: 'user-positive-stat-stages', multiplier: 2 },
    ])
    expect(getMove('punishment')?.conditionalDamageModifiers).toEqual([
      { type: 'target-positive-stat-stages', multiplier: 2 },
    ])
    expect(getMove('quash')?.interruptEnemyMove).toBe(100)
    expect(getMove('ruination')?.damageRule).toEqual({
      type: 'target-current-hp-percent',
      percent: 50,
    })
    expect(getMove('taunt')?.secondaryStatuses?.[0]).toMatchObject({
      id: 'taunt',
      target: 'enemy-pokemon',
      effects: [{ type: 'move-block', mode: 'zero-damage' }],
    })
    const throatChopStatus = getMove('throat-chop')?.secondaryStatuses?.[0]
    const throatChopBlock = throatChopStatus?.effects[0]
    expect(throatChopStatus).toMatchObject({
      id: 'throat-chop',
      target: 'enemy-pokemon',
    })
    expect(throatChopBlock?.type).toBe('move-block')
    if (throatChopBlock?.type !== 'move-block') {
      throw new Error('Expected Throat Chop to author a move-block effect')
    }
    expect(throatChopBlock.mode).toBe('move-id')
    expect(throatChopBlock.moveIds).toEqual(
      expect.arrayContaining([
        'growl',
        'sing',
        'snore',
        'perish-song',
        'hyper-voice',
        'metal-sound',
        'bug-buzz',
        'echoed-voice',
        'snarl',
        'parting-shot',
        'boomburst',
        'sparkling-aria',
        'clanging-scales',
        'clangorous-soul',
        'overdrive',
        'torch-song',
        'dragon-cheer',
        'alluring-voice',
        'psychic-noise',
      ]),
    )
    expect(getMove('snatch')?.secondaryStatuses?.[0]).toMatchObject({
      id: 'snatch',
      target: 'enemy-pokemon',
      effects: [{ type: 'snatch-beneficial-move' }],
    })
    expect(getMove('torment')?.secondaryStatuses?.[0]).toMatchObject({
      id: 'torment',
      target: 'enemy-pokemon',
      effects: [{ type: 'move-block', mode: 'last-used' }],
    })
    const healBlockedMon = makeBattlePokemon({
      name: 'Heal Blocked',
      secondaryStatuses: [
        {
          id: 'heal-block',
          name: 'Heal Block',
          triggers: [],
          sourceSide: 'player',
          target: 'pokemon',
          effects: [{ type: 'move-block', mode: 'healing' }],
        },
      ],
    })
    expect(
      processBeforeMoveSecondaryStatuses({
        pokemon: healBlockedMon,
        side: 'enemy',
        move: getMove('recover')!,
      }),
    ).toEqual({
      canMove: false,
      message: 'Heal Blocked cannot use Recover because of Heal Block.',
    })
    expect(
      processBeforeMoveSecondaryStatuses({
        pokemon: healBlockedMon,
        side: 'enemy',
        move: getMove('tackle')!,
      }),
    ).toEqual({ canMove: true, message: '' })
    expect(getMove('wicked-torque')?.status).toEqual({
      id: 'sleep',
      chance: 10,
      target: 'enemy',
    })

    attacker.statStages = { ...DEFAULT_STAT_STAGES, attack: 1 }
    expect(getConditionalDamageMultiplier({ move: getMove('power-trip')!, attacker, defender })).toBe(2)
    attacker.statStages = { ...DEFAULT_STAT_STAGES }
    defender.statStages = { ...DEFAULT_STAT_STAGES, defense: 1 }
    expect(getConditionalDamageMultiplier({ move: getMove('punishment')!, attacker, defender })).toBe(2)
    defender.statStages = { ...DEFAULT_STAT_STAGES }
    const lastRespects = getMove('last-respects')!
    state.playerTeam = [
      attacker,
      { ...attacker, id: 'ally-fainted-1', currentHp: 0 },
      { ...attacker, id: 'ally-ready', currentHp: 1 },
      { ...attacker, id: 'ally-fainted-2', currentHp: 0 },
    ]
    expect(
      getConditionalDamageMultiplier({
        move: lastRespects,
        attacker,
        defender,
        state,
        side: 'player',
      }),
    ).toBe(3)
    defender.status = { id: 'sleep', counter: 1 }
    expect(getConditionalDamageMultiplier({ move: getMove('hex')!, attacker, defender })).toBe(2)
    expect(
      checkMoveBattleCondition({
        move: getMove('nightmare')!,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBeUndefined()
    defender.status = undefined
    expect(
      checkMoveBattleCondition({
        move: getMove('nightmare')!,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBe('Nightmare failed because the target is not sleep.')
    defender.heldItem = undefined
    ;(defender as any).heldItemId = null
    expect(
      checkMoveBattleCondition({
        move: getMove('poltergeist')!,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBe('Poltergeist failed because the target has no held item.')
    defender.heldItem = { id: 'oran-berry', name: 'Oran Berry' }
    expect(
      checkMoveBattleCondition({
        move: getMove('poltergeist')!,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBeUndefined()
    state.enemyMoveUsesRemaining = 5
    defender.moveUsesRemaining = 5
    const spite = applyMoveRuntimeEffects({
      move: getMove('spite')!,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(spite.failed).toBeUndefined()
    expect(defender.moveUsesRemaining).toBe(4)
    expect(state.enemyMoveUsesRemaining).toBe(4)

    attacker.currentHp = 80
    attacker.maxHp = 100
    attacker.types = ['Ghost']
    defender.secondaryStatuses = undefined
    const ghostCurse = applyMoveRuntimeEffects({
      move: getMove('curse')!,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(ghostCurse.failed).toBeUndefined()
    expect(attacker.currentHp).toBe(30)
    expect(defender.secondaryStatuses?.[0]).toMatchObject({
      id: 'curse',
      remainingTurns: 4,
      effects: [{ type: 'damage', percentMaxHp: 25 }],
    })

    attacker.currentHp = 80
    attacker.types = ['Normal']
    attacker.statStages = { ...DEFAULT_STAT_STAGES }
    const nonGhostCurse = applyMoveRuntimeEffects({
      move: getMove('curse')!,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(nonGhostCurse.failed).toBeUndefined()
    expect(attacker.currentHp).toBe(80)
    expect(attacker.statStages).toMatchObject({
      attack: 1,
      defense: 1,
      speed: -1,
    })
    recordBattleDamage({
      state,
      sourceSide: 'enemy',
      targetSide: 'player',
      sourcePokemon: defender,
      targetPokemon: attacker,
      damage: 12,
    })
    expect(
      getConditionalDamageMultiplier({
        move: getMove('payback')!,
        attacker,
        defender,
        state,
        side: 'player',
      }),
    ).toBe(2)
    recordStatLoweredThisTurn({ state, side: 'player', pokemon: attacker })
    expect(
      getConditionalDamageMultiplier({
        move: getMove('lash-out')!,
        attacker,
        defender,
        state,
        side: 'player',
      }),
    ).toBe(2)
    recordSwitchingOutThisTurn({ state, side: 'enemy', pokemon: defender })
    expect(
      getConditionalDamageMultiplier({
        move: getMove('pursuit')!,
        attacker,
        defender,
        state,
        side: 'player',
      }),
    ).toBe(2)

    const fling = getMove('fling')!
    attacker.heldItem = undefined
    ;(attacker as any).heldItemId = null
    expect(
      checkMoveBattleCondition({
        move: fling,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBe('Fling failed because Player Mon has no held item.')
    attacker.heldItem = { id: 'oran-berry', name: 'Oran Berry' }
    expect(
      checkMoveBattleCondition({
        move: fling,
        state,
        side: 'player',
        attacker,
        defender,
      }),
    ).toBeUndefined()
    const flingResult = applyMoveRuntimeEffects({
      move: fling,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(flingResult.failed).toBeUndefined()
    expect(flingResult.messages).toContain('Player Mon used its Oran Berry.')
    expect(attacker.heldItem).toBeUndefined()
    const lastConsumedHeldItem = (
      attacker.consumedHeldItems as
        | { itemId: string; name: string; persistent?: boolean }[]
        | undefined
    )?.at(-1)
    expect(lastConsumedHeldItem).toEqual({
      itemId: 'oran-berry',
      name: 'Oran Berry',
      persistent: false,
    })

    attacker.secondaryStatuses = undefined
    defender.secondaryStatuses = undefined
    applySecondaryStatusesFromMove({
      move: getMove('taunt')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    expect(
      processBeforeMoveSecondaryStatuses({
        state,
        pokemon: defender,
        side: 'enemy',
        move: getMove('memento')!,
        random: () => 0,
      }),
    ).toEqual({
      canMove: false,
      message: 'Enemy Mon cannot use Memento because of Taunt.',
    })

    defender.secondaryStatuses = undefined
    applySecondaryStatusesFromMove({
      move: getMove('throat-chop')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    expect(
      processBeforeMoveSecondaryStatuses({
        state,
        pokemon: defender,
        side: 'enemy',
        move: getMove('sing')!,
        random: () => 0,
      }),
    ).toEqual({
      canMove: false,
      message: 'Enemy Mon cannot use Sing because of Throat Chop.',
    })
    expect(
      processBeforeMoveSecondaryStatuses({
        state,
        pokemon: defender,
        side: 'enemy',
        move: getMove('hyper-voice')!,
        random: () => 0,
      }),
    ).toEqual({
      canMove: false,
      message: 'Enemy Mon cannot use Hyper Voice because of Throat Chop.',
    })

    defender.secondaryStatuses = undefined
    recordSuccessfulMoveUse({
      state,
      side: 'enemy',
      pokemon: defender,
      move: getMove('memento')!,
    })
    applySecondaryStatusesFromMove({
      move: getMove('torment')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    expect(
      processBeforeMoveSecondaryStatuses({
        state,
        pokemon: defender,
        side: 'enemy',
        move: getMove('memento')!,
        random: () => 0,
      }),
    ).toEqual({
      canMove: false,
      message: 'Enemy Mon cannot use Memento because of Torment.',
    })

    defender.secondaryStatuses = undefined
    attacker.currentHp = Math.max(1, attacker.maxHp - 20)
    applySecondaryStatusesFromMove({
      move: getMove('snatch')!,
      state,
      attacker,
      defender,
      sourceSide: 'player',
      random: () => 0,
    })
    const snatchCheck = processBeforeMoveSecondaryStatuses({
      state,
      pokemon: defender,
      side: 'enemy',
      move: getMove('slack-off')!,
      random: () => 0,
    })
    expect(snatchCheck.canMove).toBe(false)
    expect(snatchCheck.message).toContain('Player Mon snatched Slack Off')
    expect(attacker.currentHp).toBe(attacker.maxHp)

    defender.types = ['fire']
    const soak = applyMoveRuntimeEffects({
      move: getMove('soak')!,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(soak.messages).toEqual(['Enemy Mon became water-type.'])
    expect(defender.types).toEqual(['water'])
    expect(defender.battleTypeOverride).toEqual(['water'])

    attacker.types = ['normal', 'flying']
    const roost = applyMoveRuntimeEffects({
      move: getMove('roost')!,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(roost.messages).toContain('Player Mon lost the flying type.')
    expect(attacker.types).toEqual(['normal'])
    expect(attacker.battleTypeTurnsRemaining).toBe(1)

    attacker.statStages = {
      ...DEFAULT_STAT_STAGES,
      attack: 2,
      defense: -1,
      speed: 1,
    }
    defender.statStages = {
      ...DEFAULT_STAT_STAGES,
      attack: -2,
      defense: 3,
      specialAttack: 1,
      specialDefense: -1,
    }
    applyMoveRuntimeEffects({
      move: getMove('heart-swap')!,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(attacker.statStages?.attack).toBe(-2)
    expect(defender.statStages?.attack).toBe(2)

    applyMoveRuntimeEffects({
      move: getMove('topsy-turvy')!,
      state,
      side: 'player',
      attacker,
      defender,
    })
    expect(defender.statStages?.attack).toBe(-2)
    expect(defender.statStages?.defense).toBe(1)

    applyMoveRuntimeEffects({
      move: getMove('clear-smog')!,
      state,
      side: 'player',
      attacker,
      defender,
      damageDealt: 20,
    })
    expect(defender.statStages).toEqual({
      ...DEFAULT_STAT_STAGES,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      crit: 0,
    })
  })

  test('move contests can compare non-stat Pokemon metrics', () => {
    const attacker = makeBattlePokemon({
      name: 'Heavy',
      weight: 1200,
      size: 'XL',
    })
    const defender = makeBattlePokemon({
      name: 'Light',
      weight: 100,
      size: 'S',
    })
    const move = {
      id: 'test-heavy-slam',
      name: 'Heavy Slam',
      description: 'Test move',
      stance: 'power' as const,
      damage: 1,
      target: 'enemy' as const,
      accuracy: 100,
      contest: {
        attackerMetric: 'weight' as const,
        defenderMetric: 'weight' as const,
        comparison: 'greaterThan' as const,
        success: { damageMultiplier: 1.5, result: 'win' as const },
        failure: { damageMultiplier: 0.5, result: 'loss' as const },
      },
    }

    expect(resolveMoveContest({ move, attacker, defender })).toMatchObject({
      configured: true,
      success: true,
      damageMultiplier: 1.5,
      result: 'win',
    })
  })

  test('move contests can compare against numeric defender metrics', () => {
    const attacker = makeBattlePokemon({
      name: 'Fast',
      stats: { ...makeBattlePokemon().stats, speed: 110 },
    })
    const defender = makeBattlePokemon({
      name: 'Any',
      stats: { ...makeBattlePokemon().stats, speed: 10 },
    })
    const move = {
      id: 'test-speed-threshold',
      name: 'Test Speed Threshold',
      description: 'Test move',
      stance: 'speed' as const,
      damage: 0,
      target: 'enemy' as const,
      accuracy: 100,
      contest: {
        attackerMetric: 'effective-stat:speed' as const,
        defenderMetric: 100,
        comparison: 'greaterThan' as const,
        success: { damageMultiplier: 1, result: 'win' as const },
        failure: { damageMultiplier: 0.5, result: 'loss' as const },
      },
    }

    expect(resolveMoveContest({ move, attacker, defender })).toMatchObject({
      configured: true,
      success: true,
      damageMultiplier: 1,
      result: 'win',
    })
    expect(
      resolveMoveContest({
        move: {
          ...move,
          contest: { ...move.contest, defenderMetric: 111 },
        },
        attacker,
        defender,
      }),
    ).toMatchObject({
      configured: true,
      success: false,
      result: 'loss',
    })
  })

  test('stand stance fail rules correctly gate on loss and tie outcomes', () => {
    expect(
      shouldFailMoveFromStance({ result: 'loss', failOnStance: 'loss' }),
    ).toBe(true)
    expect(
      shouldFailMoveFromStance({ result: 'tie', failOnStance: 'loss' }),
    ).toBe(false)
    expect(
      shouldFailMoveFromStance({ result: 'loss', failOnStance: 'tie' }),
    ).toBe(true)
    expect(
      shouldFailMoveFromStance({ result: 'tie', failOnStance: 'tie' }),
    ).toBe(true)
    expect(
      shouldFailMoveFromStance({ result: 'win', failOnStance: 'tie' }),
    ).toBe(false)
  })

  test('move crit chance overrides the base crit chance for damage rolls', () => {
    const originalRandom = Math.random
    const attacker = makeBattlePokemon()
    const defender = makeBattlePokemon({ types: ['Normal'] })

    try {
      Math.random = () => 0.49
      const result = calculateDamage(
        attacker,
        defender,
        'power',
        1,
        'normal',
        60,
        undefined,
        50,
      )
      expect(result.isCrit).toBe(true)

      Math.random = () => 0.5
      const nonCritResult = calculateDamage(
        attacker,
        defender,
        'power',
        1,
        'normal',
        60,
        undefined,
        50,
      )
      expect(nonCritResult.isCrit).toBe(false)
    } finally {
      Math.random = originalRandom
    }
  })

  test('reverse stab applies a 15% damage reduction for non-matching move types', () => {
    const originalRandom = Math.random
    const attacker = makeBattlePokemon({ types: ['Fire'] })
    const defender = makeBattlePokemon({ types: ['Ghost'] })

    try {
      Math.random = () => 0.99
      const matching = calculateDamage(attacker, defender, 'power', 1, 'fire')
      const nonMatching = calculateDamage(
        attacker,
        defender,
        'power',
        1,
        'electric',
      )

      const ratio = nonMatching.damage / matching.damage
      expect(ratio).toBeGreaterThan(0.82)
      expect(ratio).toBeLessThan(0.88)
      expect(nonMatching.damage).toBeLessThan(matching.damage)
    } finally {
      Math.random = originalRandom
    }
  })

  test('vanished attacker deals 1.3x damage and vanished defender is immune', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99

    try {
      const normalAttacker = makeBattlePokemon({ types: ['Normal'] })
      const vanishedAttacker = makeBattlePokemon({
        types: ['Normal'],
        status: { id: 'vanished', counter: 0 },
      })
      const defender = makeBattlePokemon({ types: ['Water'] })

      const baseDamage = calculateDamage(
        normalAttacker,
        defender,
        'power',
        1,
        'normal',
      )
      const vanishedDamage = calculateDamage(
        vanishedAttacker,
        defender,
        'power',
        1,
        'normal',
      )
      expect(vanishedDamage.damage).toBe(Math.floor(baseDamage.damage * 1.3))

      defender.status = { id: 'vanished', counter: 0 }
      const immuneDamage = calculateDamage(
        normalAttacker,
        defender,
        'power',
        1,
        'normal',
      )
      expect(immuneDamage.damage).toBe(0)
    } finally {
      Math.random = originalRandom
    }
  })

  test('tera type is used for reverse stab matching', () => {
    const originalRandom = Math.random
    const attacker = makeBattlePokemon({
      types: ['Fire'],
      teraTypeOverride: 'water' as const,
    })
    const defender = makeBattlePokemon({ types: ['Ghost'] })

    try {
      Math.random = () => 0.99
      const firstTypeDamage = calculateDamage(
        attacker,
        defender,
        'power',
        1,
        'water',
      )
      const secondTypeDamage = calculateDamage(
        attacker,
        defender,
        'power',
        1,
        'electric',
      )

      expect(secondTypeDamage).toEqual(firstTypeDamage)
    } finally {
      Math.random = originalRandom
    }
  })

  test('stance disable lasts for two later turns', () => {
    const pokemon = makeBattlePokemon({ name: 'Raichu' })

    applyStanceDisable({ pokemon, stance: 'tech', turns: 2, currentTurn: 1 })

    expect(isStanceDisabled(pokemon, 'tech')).toBe(true)
    expect(tickDisabledStance(pokemon, 1)).toBe('')
    expect(pokemon.disabledStance?.turnsRemaining).toBe(2)
    expect(tickDisabledStance(pokemon, 2)).toBe('')
    expect(pokemon.disabledStance?.turnsRemaining).toBe(1)
    expect(tickDisabledStance(pokemon, 3)).toBe(
      "Raichu's Tech Stance is available again.",
    )
    expect(isStanceDisabled(pokemon, 'tech')).toBe(false)
  })

  test('disable can choose a random base stance', () => {
    const pokemon = makeBattlePokemon({ name: 'Gengar' })
    const disable = getMove('disable')!

    expect(disable.disableStance).toEqual({ stance: 'random', turns: 2 })
    expect(
      applyStanceDisable({
        pokemon,
        stance: disable.disableStance!.stance,
        turns: disable.disableStance!.turns,
        currentTurn: 1,
        random: () => 0.5,
      }),
    ).toBe("Gengar's Speed Stance was disabled for 2 turns!")
    expect(isStanceDisabled(pokemon, 'speed')).toBe(true)
  })
})
