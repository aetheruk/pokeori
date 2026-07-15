import { describe, expect, test } from 'bun:test'
import { ABILITIES, ABILITY_FORM_MAP, rollNaturalFormAbility } from '@/data/abilities'
import { getMove, getMoveDamageMultiplier } from '@/data/moves'
import {
  applyBattleAbilityAfterKoStatStages,
  applyBattleAbilityBeforeAttackTypeChange,
  applyBattleAbilityOpponentStatStageBoostCopy,
	  applyBattleAbilityStatStageDropReflection,
	  applyBattleAbilityStatusReflection,
	  applyBattleAbilityStatStageDropTriggers,
	  applyBattleAbilityDamageModifiers,
	  applyBattleAbilityOnDamagedStatStages,
	  applyBattleAbilityOpposingMoveUseDepletion,
	  applyBattleAbilitySwitchOutEffects,
  blocksBattleForcedSwitchByAbility,
  blocksBattleStatStageDropByAbility,
  getBattleAbilityMoveAccuracy,
  getBattleAbilityEntryFormChange,
  getBattleAbilityHpThresholdFormChange,
  getBattleAbilityAddedEffectMoveDamageMultiplier,
  getBattleAbilityExtraHitDamageMultiplier,
  getBattleAbilityMoveInterruptChance,
  getBattleAbilityMoveBlockMessage,
  getBattleAbilityRecoilMoveDamageMultiplier,
  getBattleAbilitySecondaryEffectChance,
  getBattleAbilityStatusCounterStep,
  getBattleSecondaryEffectBlockMessage,
	  getBattleAbilityLowHpSelfSwitchMessage,
	  getBattleRecoilDamageBlockMessage,
	  getBattleAbilitySwitchPreventionMessage,
  processBattleAbilityEntryCopiesForState,
  processBattleAbilitySuppressionForState,
  processBattleAbilityTurnEndEffects,
  processBattleAbilityTeraActivation,
  processBattleAbilityTerrainSet,
	  processBattleAbilityWeatherSet,
	  processBattleAbilityWeatherTypeChangesForState,
	  resolveBattleAbilityBeforeMove,
    suppressesBattleHeldItemEffectsByAbility,
    suppressesBattleCounterPreventionByAbility,
    suppressesBattleMoveAddedEffectsByAbility,
    usesBattleAbilityMaxMultiHitDamage,
	} from '@/utilities/battle/abilities'
import { calculateDamage } from '@/utilities/battle/damage-calc'
import {
  applyHeldItemIfTriggered,
  getHeldAttackDamageMultiplier,
} from '@/utilities/battle/held-items'
import {
  applyMoveRuntimeEffects,
  getMoveLockMessage,
  recordSuccessfulMoveUse,
  tickMoveLock,
} from '@/utilities/battle/move-effects'
import {
  applyEnemyAiMoveEffects,
  shouldInterruptEnemyAiMove,
} from '@/utilities/battle/enemy-ai'
import { resolveMoveContest } from '@/utilities/battle/move-contest'
import {
  applySecondaryStatusDamageModifiers,
  applySecondaryStatusesFromMove,
  processBeforeMoveSecondaryStatuses,
  processSecondaryStatusesForSwitch,
  processSecondaryStatusesForTurnEnd,
} from '@/utilities/battle/secondary-statuses'
import {
  canApplyStatus,
  resolveBeforeMoveStatus,
} from '@/utilities/battle/status-effects-logic'
import {
  applyBattleFormChange,
  DEFAULT_STAT_STAGES,
  getEffectiveBattleSpeed,
} from '@/utilities/battle/stats-calc'
import { processBattleAbilitySwitchOut } from '@/utilities/battle/switching'
import { resetBattleTypeChange } from '@/utilities/battle/tera'
import { processEndTurnStatusDamage } from '@/utilities/battle/turn-logic'
import { processEndTurnWeatherDamage } from '@/utilities/battle/weather-effects'
import { makeBattlePokemon, makePveBattleState } from './helpers/battle-fixtures'

describe('canonical battle abilities', () => {
  test('canonical natural rolls prefer rare hidden abilities before guaranteed base slots', () => {
    expect(ABILITY_FORM_MAP['1']).toContainEqual({
      id: 'chlorophyll',
      rate: 5,
      hidden: true,
      slot: 3,
    })
    expect(rollNaturalFormAbility('1', () => 0.04)).toBe('chlorophyll')
    expect(rollNaturalFormAbility('1', () => 0.5)).toBe('overgrow')
  })

  test('absorb abilities block damage and apply healing or boosts', () => {
    const vaporeon = makeBattlePokemon({
      name: 'Vaporeon',
      ability: 'water_absorb',
      currentHp: 60,
      maxHp: 120,
    })

    const waterAbsorb = applyBattleAbilityDamageModifiers({
      defender: vaporeon,
      damage: 40,
      attackType: 'water',
    })

    expect(waterAbsorb.damage).toBe(0)
    expect(vaporeon.currentHp).toBe(90)
    expect(waterAbsorb.messages.join(' ')).toContain('Water Absorb absorbed')

    const pikachu = makeBattlePokemon({
      name: 'Pikachu',
      ability: 'lightning_rod',
      statStages: { ...DEFAULT_STAT_STAGES },
    })

    const lightningRod = applyBattleAbilityDamageModifiers({
      defender: pikachu,
      damage: 40,
      attackType: 'electric',
    })

    expect(lightningRod.damage).toBe(0)
    expect(pikachu.statStages?.specialAttack).toBe(1)
  })

  test('stat and damage ability effects participate in damage calculation', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const attacker = makeBattlePokemon({
        name: 'Azumarill',
        ability: 'huge_power',
        types: ['water'],
        stats: {
          hp: 120,
          attack: 80,
          defense: 70,
          specialAttack: 80,
          specialDefense: 70,
          speed: 60,
        },
      })
      const baselineAttacker = makeBattlePokemon({
        name: 'Azumarill',
        types: ['water'],
        stats: attacker.stats,
      })
      const defender = makeBattlePokemon({
        name: 'Rhydon',
        types: ['ground', 'rock'],
      })
      const filteredDefender = makeBattlePokemon({
        name: 'Rhydon',
        ability: 'solid_rock',
        types: ['ground', 'rock'],
      })

      const baseline = calculateDamage(
        baselineAttacker,
        defender,
        'power',
        1,
        'water',
      ).damage
      const hugePower = calculateDamage(
        attacker,
        defender,
        'power',
        1,
        'water',
      ).damage
      const solidRock = calculateDamage(
        attacker,
        filteredDefender,
        'power',
        1,
        'water',
      ).damage

      expect(hugePower).toBeGreaterThan(baseline)
      expect(solidRock).toBeLessThan(hugePower)
    } finally {
      Math.random = originalRandom
    }
  })

  test('Mold Breaker family bypasses defender ability protections without boosting damage', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99
    try {
      const baselineAttacker = makeBattlePokemon({
        name: 'Baseline',
        ability: undefined,
        types: ['Water'],
        stats: {
          hp: 120,
          attack: 80,
          defense: 70,
          specialAttack: 80,
          specialDefense: 70,
          speed: 60,
        },
      })
      const moldBreaker = makeBattlePokemon({
        name: 'Haxorus',
        ability: 'mold_breaker',
        types: ['Water'],
        stats: baselineAttacker.stats,
      })
      const teravolt = makeBattlePokemon({
        name: 'Zekrom',
        ability: 'teravolt',
      })
      const turboblaze = makeBattlePokemon({
        name: 'Reshiram',
        ability: 'turboblaze',
      })
      const normalTarget = makeBattlePokemon({ name: 'Target', types: ['Normal'] })

      expect(
        calculateDamage(moldBreaker, normalTarget, 'power', 1, 'normal').damage,
      ).toBe(
        calculateDamage(baselineAttacker, normalTarget, 'power', 1, 'normal')
          .damage,
      )

      const shedinja = makeBattlePokemon({
        name: 'Shedinja',
        ability: 'wonder_guard',
        types: ['Bug', 'Ghost'],
      })
      expect(
        applyBattleAbilityDamageModifiers({
          attacker: baselineAttacker,
          defender: shedinja,
          damage: 30,
          attackType: 'normal',
          typeEffectiveness: 1,
        }).damage,
      ).toBe(0)
      expect(
        applyBattleAbilityDamageModifiers({
          attacker: moldBreaker,
          defender: shedinja,
          damage: 30,
          attackType: 'normal',
          typeEffectiveness: 1,
        }).damage,
      ).toBe(30)

      const levitate = makeBattlePokemon({
        name: 'Gengar',
        ability: 'levitate',
      })
      expect(
        applyBattleAbilityDamageModifiers({
          attacker: baselineAttacker,
          defender: levitate,
          damage: 30,
          attackType: 'ground',
        }).damage,
      ).toBe(0)
      expect(
        applyBattleAbilityDamageModifiers({
          attacker: teravolt,
          defender: levitate,
          damage: 30,
          attackType: 'ground',
        }).damage,
      ).toBe(30)

      const flashFire = makeBattlePokemon({
        name: 'Arcanine',
        ability: 'flash_fire',
        currentHp: 50,
        maxHp: 100,
      })
      expect(
        applyBattleAbilityDamageModifiers({
          attacker: turboblaze,
          defender: flashFire,
          damage: 30,
          attackType: 'fire',
        }).damage,
      ).toBe(30)
      expect(flashFire.currentHp).toBe(50)

      const soundproof = makeBattlePokemon({
        name: 'Exploud',
        ability: 'soundproof',
      })
      const hyperVoice = getMove('hyper-voice')
      expect(hyperVoice).toBeDefined()
      expect(getBattleAbilityMoveBlockMessage(soundproof, hyperVoice!)).toBe(
        "Exploud's Soundproof blocked Hyper Voice!",
      )
      expect(
        getBattleAbilityMoveBlockMessage(soundproof, hyperVoice!, moldBreaker),
      ).toBeUndefined()

      const hyperCutter = makeBattlePokemon({
        name: 'Kingler',
        ability: 'hyper_cutter',
      })
      expect(
        blocksBattleStatStageDropByAbility({
          pokemon: hyperCutter,
          stat: 'attack',
          source: 'opponent',
        }),
      ).toBe(true)
      expect(
        blocksBattleStatStageDropByAbility({
          pokemon: hyperCutter,
          stat: 'attack',
          source: 'opponent',
          sourcePokemon: moldBreaker,
        }),
      ).toBe(false)

      const mirrorArmor = makeBattlePokemon({
        name: 'Corviknight',
        ability: 'mirror_armor',
      })
      expect(
        applyBattleAbilityStatStageDropReflection({
          pokemon: mirrorArmor,
          opponent: baselineAttacker,
          stat: 'defense',
          stages: -1,
          source: 'opponent',
        }).reflected,
      ).toBe(true)
      expect(
        applyBattleAbilityStatStageDropReflection({
          pokemon: mirrorArmor,
          opponent: moldBreaker,
          stat: 'defense',
          stages: -1,
          source: 'opponent',
          sourcePokemon: moldBreaker,
        }).reflected,
      ).toBe(false)

      const shellArmor = makeBattlePokemon({
        name: 'Lapras',
        ability: 'shell_armor',
      })
      Math.random = () => 0
      expect(
        calculateDamage(
          baselineAttacker,
          shellArmor,
          'power',
          1,
          'normal',
          undefined,
          undefined,
          100,
        ).isCrit,
      ).toBe(false)
      expect(
        calculateDamage(
          moldBreaker,
          shellArmor,
          'power',
          1,
          'normal',
          undefined,
          undefined,
          100,
        ).isCrit,
      ).toBe(true)

      Math.random = () => 0.99
      const solidRock = makeBattlePokemon({
        name: 'Rhydon',
        ability: 'solid_rock',
        types: ['Ground', 'Rock'],
      })
      const reduced = calculateDamage(
        baselineAttacker,
        solidRock,
        'power',
        1,
        'water',
      ).damage
      const bypassed = calculateDamage(
        moldBreaker,
        solidRock,
        'power',
        1,
        'water',
      ).damage
      expect(bypassed).toBeGreaterThan(reduced)
    } finally {
      Math.random = originalRandom
    }
  })

  test('Trace copies the opposing active ability until switch-out', () => {
    const traceUser = makeBattlePokemon({
      name: 'Porygon2',
      ability: 'trace',
      stats: {
        hp: 120,
        attack: 70,
        defense: 70,
        specialAttack: 80,
        specialDefense: 70,
        speed: 60,
      },
    })
    const hugePowerTarget = makeBattlePokemon({
      name: 'Azumarill',
      ability: 'huge_power',
    })
    const defender = makeBattlePokemon({ name: 'Target' })
    const state = makePveBattleState({
      playerTeam: [traceUser],
      enemyTeam: [hugePowerTarget],
    })

    expect(processBattleAbilityEntryCopiesForState(state)).toEqual([
      "Porygon2's Trace copied Azumarill's Huge Power!",
    ])
    expect(traceUser.ability).toBe('huge_power')
    expect(traceUser.battleAbilityState?.originalAbility).toBe('trace')
    expect(
      calculateDamage(traceUser, defender, 'power', 1, 'normal').damage,
    ).toBeGreaterThan(
      calculateDamage(
        makeBattlePokemon({
          name: 'Baseline',
          stats: traceUser.stats,
        }),
        defender,
        'power',
        1,
        'normal',
      ).damage,
    )

    expect(processBattleAbilityEntryCopiesForState(state)).toEqual([])
    expect(processBattleAbilitySwitchOut(traceUser)).toEqual([
      "Porygon2's ability returned to Trace.",
    ])
    expect(traceUser.ability).toBe('trace')
    expect(traceUser.battleAbilityState?.originalAbility).toBeUndefined()
  })

  test('Receiver and Power of Alchemy copy fainted ally abilities on entry', () => {
    const faintedAlly = makeBattlePokemon({
      name: 'Medicham',
      ability: 'pure_power',
      currentHp: 0,
    })
    const receiver = makeBattlePokemon({
      name: 'Passimian',
      ability: 'receiver',
      stats: {
        hp: 120,
        attack: 70,
        defense: 70,
        specialAttack: 80,
        specialDefense: 70,
        speed: 60,
      },
    })
    const target = makeBattlePokemon({ name: 'Target' })
    const state = makePveBattleState({
      playerTeam: [faintedAlly, receiver],
      activePlayerIndex: 1,
      enemyTeam: [target],
    })

    expect(processBattleAbilityEntryCopiesForState(state)).toEqual([
      "Passimian's Receiver copied Medicham's Pure Power!",
    ])
    expect(receiver.ability).toBe('pure_power')
    expect(receiver.battleAbilityState?.originalAbility).toBe('receiver')
    expect(
      calculateDamage(receiver, target, 'power', 1, 'normal').damage,
    ).toBeGreaterThan(
      calculateDamage(
        makeBattlePokemon({ name: 'Baseline', stats: receiver.stats }),
        target,
        'power',
        1,
        'normal',
      ).damage,
    )
    expect(processBattleAbilitySwitchOut(receiver)).toEqual([
      "Passimian's ability returned to Receiver.",
    ])

    const alchemyUser = makeBattlePokemon({
      name: 'Alolan Muk',
      ability: 'power_of_alchemy',
    })
    const enemyState = makePveBattleState({
      playerTeam: [makeBattlePokemon({ name: 'Player' })],
      enemyTeam: [
        makeBattlePokemon({
          name: 'Arcanine',
          ability: 'intimidate',
          currentHp: 0,
        }),
        alchemyUser,
      ],
      activeEnemyIndex: 1,
    })
    expect(processBattleAbilityEntryCopiesForState(enemyState)).toEqual([
      "Alolan Muk's Power of Alchemy copied Arcanine's Intimidate!",
      "Alolan Muk's Intimidate lowered Player's Attack!",
    ])
    expect(alchemyUser.ability).toBe('intimidate')
  })

  test('Intimidate lowers opposing attack on entry and does not reapply to the same target', () => {
    const intimidateUser = makeBattlePokemon({
      id: 'player-intimidate',
      name: 'Loudred',
      ability: 'intimidate',
      currentHp: 100,
      maxHp: 100,
    })
    const firstEnemy = makeBattlePokemon({
      id: 'enemy-a',
      name: 'Arbok',
      currentHp: 100,
      maxHp: 100,
      statStages: { ...DEFAULT_STAT_STAGES },
    })
    const state = makePveBattleState({
      playerTeam: [intimidateUser],
      enemyTeam: [firstEnemy],
    })

    expect(processBattleAbilityEntryCopiesForState(state)).toEqual([
      "Loudred's Intimidate lowered Arbok's Attack!",
    ])
    expect(firstEnemy.statStages?.attack).toBe(-1)

    expect(processBattleAbilityEntryCopiesForState(state)).toEqual([])
    expect(firstEnemy.statStages?.attack).toBe(-1)

    const secondEnemy = makeBattlePokemon({
      id: 'enemy-b',
      name: 'Weepinbell',
      currentHp: 100,
      maxHp: 100,
      statStages: { ...DEFAULT_STAT_STAGES },
    })
    const switchedState = makePveBattleState({
      playerTeam: [intimidateUser],
      enemyTeam: [firstEnemy, secondEnemy],
      activeEnemyIndex: 1,
    })
    expect(processBattleAbilityEntryCopiesForState(switchedState)).toEqual([
      "Loudred's Intimidate lowered Weepinbell's Attack!",
    ])
    expect(secondEnemy.statStages?.attack).toBe(-1)
  })

  test('air lock and cloud nine do not apply fallback damage multipliers in battle', () => {
    const noAbility = makeBattlePokemon({
      id: 'airless',
      name: 'No Ability',
    })
    const airLock = makeBattlePokemon({
      id: 'air-lock',
      name: 'Haze',
      ability: 'air_lock',
    })
    const cloudNine = makeBattlePokemon({
      id: 'cloud-nine',
      name: 'Nimbus',
      ability: 'cloud_nine',
    })

    expect(
      applyBattleAbilityDamageModifiers({
        defender: noAbility,
        damage: 40,
        attackType: 'water',
      }).damage,
    ).toBe(40)
    expect(
      applyBattleAbilityDamageModifiers({
        defender: airLock,
        damage: 40,
        attackType: 'water',
      }).damage,
    ).toBe(40)
    expect(
      applyBattleAbilityDamageModifiers({
        defender: cloudNine,
        damage: 40,
        attackType: 'water',
      }).damage,
    ).toBe(40)
  })

  test('Receiver no longer boosts damage before copying a fainted ally ability', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const receiver = makeBattlePokemon({
        name: 'Passimian',
        ability: 'receiver',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })
      const baseline = makeBattlePokemon({
        name: 'Baseline',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })
      const defender = makeBattlePokemon({ name: 'Defender' })

      expect(calculateDamage(receiver, defender, 'power', 1, 'normal').damage).toBe(
        calculateDamage(baseline, defender, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('Forewarn reveals the opposing active Pokemon strongest loaded move', () => {
    const forewarnUser = makeBattlePokemon({
      name: 'Drowzee',
      ability: 'forewarn',
    })
    const opponent = makeBattlePokemon({
      name: 'Blastoise',
      aiMoveLoadout: ['water-gun', 'growl', 'hydro-pump'],
    })
    const state = makePveBattleState({
      playerTeam: [forewarnUser],
      enemyTeam: [opponent],
    })

    expect(processBattleAbilityEntryCopiesForState(state)).toEqual([
      "Drowzee's Forewarn alerted it to Blastoise's Hydro Pump!",
    ])
  })

  test('Forewarn no longer reduces incoming super-effective damage', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const attacker = makeBattlePokemon({
        name: 'Attacker',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })
      const forewarn = makeBattlePokemon({
        name: 'Drowzee',
        ability: 'forewarn',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })
      const baseline = makeBattlePokemon({
        name: 'Baseline',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })

      expect(calculateDamage(attacker, forewarn, 'power', 1, 'normal').damage).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('Anticipation warns about dangerous opposing loaded moves without reducing damage', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const anticipation = makeBattlePokemon({
        name: 'Croagunk',
        ability: 'anticipation',
        types: ['Poison', 'Fighting'],
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })
      const opponent = makeBattlePokemon({
        name: 'Dugtrio',
        aiMoveLoadout: ['fissure'],
      })
      const state = makePveBattleState({
        playerTeam: [anticipation],
        enemyTeam: [opponent],
      })

      expect(processBattleAbilityEntryCopiesForState(state)).toEqual([
        "Croagunk's Anticipation shuddered at Dugtrio's Fissure!",
      ])

      const attacker = makeBattlePokemon({
        name: 'Attacker',
        stats: anticipation.stats,
      })
      const baseline = makeBattlePokemon({
        name: 'Baseline',
        types: anticipation.types,
        stats: anticipation.stats,
      })
      expect(calculateDamage(attacker, anticipation, 'power', 1, 'ground').damage).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'ground').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('Frisk reveals opposing held items instead of boosting damage', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const frisk = makeBattlePokemon({
        name: 'Gothitelle',
        ability: 'frisk',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })
      const target = makeBattlePokemon({
        name: 'Snorlax',
        heldItem: { id: 'oran-berry', name: 'Oran Berry' },
      })
      const state = makePveBattleState({
        playerTeam: [frisk],
        enemyTeam: [target],
      })

      expect(processBattleAbilityEntryCopiesForState(state)).toEqual([
        "Gothitelle's Frisk frisked Snorlax and found Oran Berry!",
      ])
      expect(calculateDamage(frisk, target, 'power', 1, 'normal').damage).toBe(
        calculateDamage(
          makeBattlePokemon({ name: 'Baseline', stats: frisk.stats }),
          target,
          'power',
          1,
          'normal',
        ).damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('Damp blocks explosion moves from either active Pokemon without reducing Fire damage', () => {
    const damp = makeBattlePokemon({
      name: 'Poliwrath',
      ability: 'damp',
      stats: {
        hp: 100,
        attack: 100,
        defense: 100,
        specialAttack: 100,
        specialDefense: 100,
        speed: 100,
      },
    })
    const golem = makeBattlePokemon({ name: 'Golem' })
    const explosion = getMove('explosion')
    const ember = getMove('ember')
    expect(explosion).toBeDefined()
    expect(ember).toBeDefined()

    expect(getBattleAbilityMoveBlockMessage(damp, explosion!, golem)).toBe(
      "Poliwrath's Damp blocked Explosion!",
    )
    expect(getBattleAbilityMoveBlockMessage(golem, explosion!, damp)).toBe(
      "Poliwrath's Damp blocked Explosion!",
    )
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      expect(calculateDamage(golem, damp, 'power', 1, 'fire').damage).toBe(
        calculateDamage(
          golem,
          makeBattlePokemon({
            name: 'Baseline',
            types: damp.types,
            stats: damp.stats,
          }),
          'power',
          1,
          'fire',
        ).damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('Sturdy survives full-HP knockout damage at 1 HP instead of halving damage', () => {
    const sturdy = makeBattlePokemon({
      name: 'Onix',
      ability: 'sturdy',
      currentHp: 100,
      maxHp: 100,
    })
    expect(
      applyBattleAbilityDamageModifiers({
        defender: sturdy,
        damage: 150,
      }),
    ).toMatchObject({
      damage: 99,
      messages: ["Onix's Sturdy let it endure the hit!"],
    })

    sturdy.currentHp = 80
    expect(
      applyBattleAbilityDamageModifiers({
        defender: sturdy,
        damage: 150,
      }).damage,
    ).toBe(150)
  })

  test('Illusion masks active display identity until damaging hit damage', () => {
    const zoroark = makeBattlePokemon({
      name: 'Zoroark',
      formId: '571',
      ability: 'illusion',
      currentHp: 100,
      maxHp: 100,
    })
    const pikachu = makeBattlePokemon({
      name: 'Pikachu',
      formId: '25',
      currentHp: 100,
      maxHp: 100,
    })
    const state = makePveBattleState({
      playerTeam: [zoroark, pikachu],
      enemyTeam: [makeBattlePokemon({ name: 'Target' })],
    })

    expect(processBattleAbilityEntryCopiesForState(state)).toEqual([
      "Zoroark's Illusion made it look like Pikachu!",
    ])
    expect(zoroark.name).toBe('Zoroark')
    expect(zoroark.formId).toBe('571')
    expect(zoroark.battleAbilityState?.illusionMask).toEqual({
      name: 'Pikachu',
      formId: '25',
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: zoroark,
        attacker: makeBattlePokemon({ name: 'Attacker' }),
        damage: 20,
        previousHp: 100,
      }),
    ).toContain("Zoroark's Illusion wore off!")
    expect(zoroark.battleAbilityState?.illusionMask).toBeUndefined()
  })

  test('Illusion no longer reduces incoming damage', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const attacker = makeBattlePokemon({
        name: 'Attacker',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })
      const illusion = makeBattlePokemon({
        name: 'Zoroark',
        ability: 'illusion',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })
      const baseline = makeBattlePokemon({
        name: 'Baseline',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })

      expect(calculateDamage(attacker, illusion, 'power', 1, 'normal').damage).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('Neutralizing Gas suppresses opposing active battle abilities until it leaves', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const droughtUser = makeBattlePokemon({
        name: 'Torkoal',
        ability: 'drought',
        stats: {
          hp: 120,
          attack: 80,
          defense: 90,
          specialAttack: 80,
          specialDefense: 70,
          speed: 30,
        },
      })
      const gasUser = makeBattlePokemon({
        name: 'Weezing',
        ability: 'neutralizing_gas',
      })
      const state = makePveBattleState({
        playerTeam: [droughtUser],
        enemyTeam: [gasUser],
      })

      expect(processBattleAbilitySuppressionForState(state)).toEqual([
        "Weezing's Neutralizing Gas neutralized abilities!",
      ])
      expect(droughtUser.battleAbilityState?.suppressed).toBe(true)
      expect(
        processBattleAbilityWeatherSet({
          state,
          pokemon: droughtUser,
          ownerName: 'Player',
        }),
      ).toEqual([])
      expect(state.weather).toBeUndefined()

      const defender = makeBattlePokemon({ name: 'Target' })
      const suppressedDamage = calculateDamage(
        droughtUser,
        defender,
        'power',
        1,
        'normal',
      ).damage
      const baselineDamage = calculateDamage(
        makeBattlePokemon({
          name: 'Baseline',
          stats: droughtUser.stats,
        }),
        defender,
        'power',
        1,
        'normal',
      ).damage
      expect(suppressedDamage).toBe(baselineDamage)

      gasUser.currentHp = 0
      expect(processBattleAbilitySuppressionForState(state)).toEqual([])
      expect(droughtUser.battleAbilityState?.suppressed).toBeUndefined()
      expect(
        processBattleAbilityWeatherSet({
          state,
          pokemon: droughtUser,
          ownerName: 'Player',
        }),
      ).toEqual(["Torkoal's Drought made the weather Harsh Sunlight!"])
      expect(state.weather?.weather).toBe('harsh-sunlight')
    } finally {
      Math.random = originalRandom
    }
  })

  test('Imposter transforms into the opposing active Pokemon until switch-out', () => {
    const ditto = makeBattlePokemon({
      name: 'Ditto',
      ability: 'imposter',
      formId: '132',
      types: ['Normal'],
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 50,
      },
      statStages: { ...DEFAULT_STAT_STAGES, speed: 1 },
    })
    const azumarill = makeBattlePokemon({
      name: 'Azumarill',
      ability: 'huge_power',
      formId: '184',
      types: ['Water', 'Fairy'],
      stats: {
        hp: 120,
        attack: 80,
        defense: 70,
        specialAttack: 60,
        specialDefense: 70,
        speed: 50,
      },
      statStages: { ...DEFAULT_STAT_STAGES, attack: 2 },
    })
    const state = makePveBattleState({
      playerTeam: [ditto],
      enemyTeam: [azumarill],
    })

    expect(processBattleAbilityEntryCopiesForState(state)).toEqual([
      "Ditto's Imposter transformed it into Azumarill!",
    ])
    expect(ditto.name).toBe('Azumarill')
    expect(ditto.formId).toBe('184')
    expect(ditto.types).toEqual(['Water', 'Fairy'])
    expect(ditto.stats.attack).toBe(80)
    expect(ditto.statStages?.attack).toBe(2)
    expect(ditto.ability).toBe('huge_power')
    expect(ditto.battleAbilityState?.originalAbility).toBe('imposter')
    expect(ditto.battleAbilityState?.originalTransform?.name).toBe('Ditto')

    expect(processBattleAbilityEntryCopiesForState(state)).toEqual([])
    expect(processBattleAbilitySwitchOut(ditto)).toEqual([
      "Ditto's transformation wore off.",
    ])
    expect(ditto.name).toBe('Ditto')
    expect(ditto.formId).toBe('132')
    expect(ditto.types).toEqual(['Normal'])
    expect(ditto.stats.attack).toBe(50)
    expect(ditto.statStages?.speed).toBe(1)
    expect(ditto.ability).toBe('imposter')
    expect(ditto.battleAbilityState?.originalTransform).toBeUndefined()
    expect(ditto.battleAbilityState?.originalAbility).toBeUndefined()
  })

  test('Unaware ignores opposing positive stat stages instead of reducing damage', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99
    try {
      const stats = {
        hp: 120,
        attack: 100,
        defense: 100,
        specialAttack: 100,
        specialDefense: 100,
        speed: 100,
      }
      const attacker = makeBattlePokemon({ name: 'Attacker', stats })
      const defender = makeBattlePokemon({ name: 'Defender', stats })

      const neutralDamage = calculateDamage(attacker, defender, 'power', 1, 'normal').damage

      attacker.statStages = { ...DEFAULT_STAT_STAGES, attack: 4 }
      const boostedAttackDamage = calculateDamage(attacker, defender, 'power', 1, 'normal').damage
      defender.ability = 'unaware'
      const unawareDefenderDamage = calculateDamage(attacker, defender, 'power', 1, 'normal').damage

      expect(boostedAttackDamage).toBeGreaterThan(neutralDamage)
      expect(unawareDefenderDamage).toBe(neutralDamage)

      attacker.statStages = { ...DEFAULT_STAT_STAGES }
      defender.ability = undefined
      defender.statStages = { ...DEFAULT_STAT_STAGES, defense: 4 }
      const boostedDefenseDamage = calculateDamage(attacker, defender, 'power', 1, 'normal').damage
      attacker.ability = 'unaware'
      const unawareAttackerDamage = calculateDamage(attacker, defender, 'power', 1, 'normal').damage

      expect(boostedDefenseDamage).toBeLessThan(neutralDamage)
      expect(unawareAttackerDamage).toBe(neutralDamage)

      defender.statStages = { ...DEFAULT_STAT_STAGES }
      const unboostedUnawareDamage = calculateDamage(attacker, defender, 'power', 1, 'normal').damage

      expect(unboostedUnawareDamage).toBe(neutralDamage)
    } finally {
      Math.random = originalRandom
    }
  })

  test('Slow Start halves Attack and Speed only for five active turns', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99
    try {
      const regigigas = makeBattlePokemon({
        name: 'Regigigas',
        ability: 'slow_start',
        activeTurnStarted: 1,
        stats: {
          hp: 120,
          attack: 120,
          defense: 70,
          specialAttack: 80,
          specialDefense: 70,
          speed: 80,
        },
      })
      const baseline = makeBattlePokemon({
        name: 'Regigigas',
        activeTurnStarted: 1,
        stats: regigigas.stats,
      })
      const defender = makeBattlePokemon({ name: 'Defender' })

      const slowedDamage = calculateDamage(
        regigigas,
        defender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { currentTurn: 1 },
      ).damage
      const restoredDamage = calculateDamage(
        regigigas,
        defender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { currentTurn: 6 },
      ).damage
      const baselineDamage = calculateDamage(
        baseline,
        defender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { currentTurn: 6 },
      ).damage

      expect(slowedDamage).toBeLessThan(baselineDamage)
      expect(restoredDamage).toBe(baselineDamage)
      expect(getEffectiveBattleSpeed(regigigas, 1)).toBe(40)
      expect(getEffectiveBattleSpeed(regigigas, 6)).toBe(80)
    } finally {
      Math.random = originalRandom
    }
  })

  test('Truant skips every other active turn instead of lowering Speed', () => {
    const slaking = makeBattlePokemon({
      name: 'Slaking',
      ability: 'truant',
      activeTurnStarted: 1,
    })

    expect(resolveBattleAbilityBeforeMove(slaking, 1)).toEqual({
      canMove: true,
      message: '',
    })
    expect(resolveBattleAbilityBeforeMove(slaking, 2)).toEqual({
      canMove: false,
      message: "Slaking's Truant made it loaf around!",
    })
    expect(resolveBattleAbilityBeforeMove(slaking, 3)).toEqual({
      canMove: true,
      message: '',
    })
    expect(getEffectiveBattleSpeed(slaking, 2)).toBe(slaking.stats.speed)

    slaking.activeTurnStarted = 6
    expect(resolveBattleAbilityBeforeMove(slaking, 6)).toEqual({
      canMove: true,
      message: '',
    })
    expect(resolveBattleAbilityBeforeMove(slaking, 7).canMove).toBe(false)
  })

  test('Pressure drains an extra move use instead of reducing damage', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99
    try {
      const state = makePveBattleState()
      const attacker = state.playerTeam[state.activePlayerIndex]
      const defender = state.enemyTeam[state.activeEnemyIndex]
      attacker.name = 'Mew'
      attacker.moveUsesRemaining = 3
      state.powers!.moveUsesRemaining = 3
      defender.name = 'Articuno'
      defender.ability = 'pressure'

      const pressureDamage = calculateDamage(
        attacker,
        defender,
        'tech',
        1,
        'psychic',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { currentTurn: state.turn },
      ).damage
      const normalDamage = calculateDamage(
        attacker,
        makeBattlePokemon({ name: 'Target' }),
        'tech',
        1,
        'psychic',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { currentTurn: state.turn },
      ).damage

      expect(pressureDamage).toBe(normalDamage)
      expect(
        applyBattleAbilityOpposingMoveUseDepletion({
          state,
          attackerSide: 'player',
          attacker,
          defender,
          move: { target: 'enemy' },
        }),
      ).toEqual(["Articuno's Pressure drained 1 extra move use from Mew!"])
      expect(attacker.moveUsesRemaining).toBe(2)
      expect(state.powers!.moveUsesRemaining).toBe(2)

      expect(
        applyBattleAbilityOpposingMoveUseDepletion({
          state,
          attackerSide: 'player',
          attacker,
          defender,
          move: { target: 'self' },
        }),
      ).toEqual([])
      expect(attacker.moveUsesRemaining).toBe(2)
    } finally {
      Math.random = originalRandom
    }
  })

  test('priority-granting abilities use move contests instead of damage boosts', () => {
    const thunderWave = getMove('thunder-wave')
    const swift = getMove('swift')
    const aerialAce = getMove('aerial-ace')
    const drainingKiss = getMove('draining-kiss')
    const moonblast = getMove('moonblast')

    expect(thunderWave).toBeDefined()
    expect(swift).toBeDefined()
    expect(aerialAce).toBeDefined()
    expect(drainingKiss).toBeDefined()
    expect(moonblast).toBeDefined()

    const target = makeBattlePokemon({
      name: 'Target',
      currentHp: 100,
      maxHp: 100,
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 200,
      },
    })

    const prankster = makeBattlePokemon({
      name: 'Klefki',
      ability: 'prankster',
    })
    expect(
      resolveMoveContest({
        move: thunderWave!,
        attacker: prankster,
        defender: target,
      }),
    ).toMatchObject({
      configured: true,
      success: true,
      preventCounter: true,
      result: 'win',
    })
    expect(
      resolveMoveContest({
        move: swift!,
        attacker: prankster,
        defender: target,
      }).configured,
    ).toBe(false)

    const galeWings = makeBattlePokemon({
      name: 'Talonflame',
      ability: 'gale_wings',
      currentHp: 100,
      maxHp: 100,
    })
    expect(
      resolveMoveContest({
        move: aerialAce!,
        attacker: galeWings,
        defender: target,
        attackType: 'flying',
      }).preventCounter,
    ).toBe(true)
    galeWings.currentHp = 99
    expect(
      resolveMoveContest({
        move: aerialAce!,
        attacker: galeWings,
        defender: target,
        attackType: 'flying',
      }).configured,
    ).toBe(false)

    const triage = makeBattlePokemon({
      name: 'Comfey',
      ability: 'triage',
    })
    expect(
      resolveMoveContest({
        move: drainingKiss!,
        attacker: triage,
        defender: target,
      }).preventCounter,
    ).toBe(true)
    expect(
      resolveMoveContest({
        move: moonblast!,
        attacker: triage,
        defender: target,
      }).configured,
    ).toBe(false)

    const quickDraw = makeBattlePokemon({
      name: 'Slowbro',
      ability: 'quick_draw',
    })
    expect(
      resolveMoveContest({
        move: swift!,
        attacker: quickDraw,
        defender: target,
        random: () => 0.29,
      }).preventCounter,
    ).toBe(true)
    expect(
      resolveMoveContest({
        move: swift!,
        attacker: quickDraw,
        defender: target,
        random: () => 0.3,
      }).configured,
    ).toBe(false)
    expect(
      resolveMoveContest({
        move: swift!,
        attacker: quickDraw,
        defender: target,
      }).configured,
    ).toBe(false)

    const originalRandom = Math.random
    Math.random = () => 0.99
    try {
      const stats = {
        hp: 100,
        attack: 60,
        defense: 50,
        specialAttack: 60,
        specialDefense: 50,
        speed: 80,
      }
      const baseline = makeBattlePokemon({
        name: 'Baseline',
        currentHp: 100,
        maxHp: 100,
        stats,
      })
      const fullHpGaleWings = makeBattlePokemon({
        name: 'Talonflame',
        ability: 'gale_wings',
        currentHp: 100,
        maxHp: 100,
        stats,
      })

      const baselineDamage = calculateDamage(
        baseline,
        target,
        'speed',
        aerialAce!.damage,
        'flying',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: aerialAce!.id },
      ).damage
      const galeWingsDamage = calculateDamage(
        fullHpGaleWings,
        target,
        'speed',
        aerialAce!.damage,
        'flying',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: aerialAce!.id },
      ).damage

      expect(galeWingsDamage).toBe(baselineDamage)
    } finally {
      Math.random = originalRandom
    }
  })

  test('Cursed Body disables the attacker stance instead of reducing Ghost damage', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99
    try {
      const attacker = makeBattlePokemon({
        name: 'Attacker',
        currentHp: 100,
        maxHp: 100,
      })
      const cursedBody = makeBattlePokemon({
        name: 'Cursola',
        ability: 'cursed_body',
        currentHp: 80,
        maxHp: 100,
      })
      const normalTarget = makeBattlePokemon({
        name: 'Target',
        currentHp: 80,
        maxHp: 100,
      })

      const cursedBodyDamage = calculateDamage(
        attacker,
        cursedBody,
        'tech',
        1,
        'ghost',
      ).damage
      const normalDamage = calculateDamage(
        attacker,
        normalTarget,
        'tech',
        1,
        'ghost',
      ).damage
      expect(cursedBodyDamage).toBe(normalDamage)

      const state = makePveBattleState()
      state.turn = 4
      expect(
        applyBattleAbilityOnDamagedStatStages({
          state,
          defender: cursedBody,
          defenderSide: 'enemy',
          attacker,
          damage: 20,
          previousHp: 100,
          attackStance: 'tech',
          attackType: 'ghost',
          random: () => 0,
        }),
      ).toEqual([
        "Cursola's Cursed Body activated!",
        "Attacker's Tech Stance was disabled for 2 turns!",
      ])
      expect(attacker.disabledStance).toEqual({
        stance: 'tech',
        turnsRemaining: 2,
        appliedTurn: 4,
      })

      attacker.disabledStance = undefined
      expect(
        applyBattleAbilityOnDamagedStatStages({
          state,
          defender: cursedBody,
          defenderSide: 'enemy',
          attacker,
          damage: 20,
          previousHp: 100,
          attackStance: 'power',
          attackType: 'ghost',
          random: () => 0.99,
        }),
      ).toEqual([])
      expect(attacker.disabledStance).toBeUndefined()
    } finally {
      Math.random = originalRandom
    }
  })

  test('Aroma Veil blocks mental effects instead of reducing damage', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const attacker = makeBattlePokemon({
        name: 'Attacker',
        gender: 'male',
      })
      const aromaVeil = makeBattlePokemon({
        name: 'Aromatisse',
        ability: 'aroma_veil',
        gender: 'female',
      })
      const baseline = makeBattlePokemon({
        name: 'Baseline',
        gender: 'female',
      })

      expect(
        calculateDamage(attacker, aromaVeil, 'power', 1, 'normal').damage,
      ).toBe(calculateDamage(attacker, baseline, 'power', 1, 'normal').damage)

      const attract = getMove('attract')!
      expect(
        applySecondaryStatusesFromMove({
          move: attract,
          attacker,
          defender: aromaVeil,
          sourceSide: 'player',
          random: () => 0,
        }),
      ).toEqual(["Aromatisse's Aroma Veil protected it from Infatuation!"])
      expect(aromaVeil.secondaryStatuses).toBeUndefined()

      const torment = getMove('torment')!
      expect(
        applySecondaryStatusesFromMove({
          move: torment,
          attacker,
          defender: aromaVeil,
          sourceSide: 'player',
          random: () => 0,
        }),
      ).toEqual(["Aromatisse's Aroma Veil protected it from Torment!"])
      expect(aromaVeil.secondaryStatuses).toBeUndefined()

      const state = makePveBattleState({
        playerTeam: [attacker],
        enemyTeam: [aromaVeil],
        moveHistory: {
          lastSuccessful: {
            enemy: {
              moveId: 'tackle',
              moveName: 'Tackle',
              side: 'enemy',
              pokemonId: aromaVeil.id,
              turn: 1,
            },
          },
        },
      })
      const encore = getMove('encore')!
      expect(
        applyMoveRuntimeEffects({
          move: encore,
          state,
          side: 'player',
          attacker,
          defender: aromaVeil,
          random: () => 0,
        }).messages,
      ).toEqual(["Aromatisse's Aroma Veil protected it from Encore!"])
      expect(aromaVeil.encoredMove).toBeUndefined()

      const cursedBody = makeBattlePokemon({
        name: 'Cursola',
        ability: 'cursed_body',
      })
      expect(
        applyBattleAbilityOnDamagedStatStages({
          state,
          defender: cursedBody,
          defenderSide: 'enemy',
          attacker: aromaVeil,
          damage: 20,
          previousHp: 100,
          attackStance: 'tech',
          random: () => 0,
        }),
      ).toEqual(["Aromatisse's Aroma Veil protected it from Cursed Body!"])
      expect(aromaVeil.disabledStance).toBeUndefined()
    } finally {
      Math.random = originalRandom
    }
  })

  test('Zen Mode and Power Construct use HP-threshold form changes', () => {
    const darmanitan = makeBattlePokemon({
      speciesId: 555,
      formId: '555',
      name: 'Darmanitan',
      ability: 'zen_mode',
      types: ['Fire'],
      currentHp: 60,
      maxHp: 120,
    })

    const zenMode = getBattleAbilityHpThresholdFormChange(darmanitan)
    expect(zenMode).toEqual({
      formId: '10017',
      messages: ["Darmanitan's Zen Mode changed its form!"],
    })
    expect(applyBattleFormChange(darmanitan, zenMode.formId)).toBe(true)
    expect(darmanitan.formId).toBe('10017')
    expect(darmanitan.name).toBe('Zen Darmanitan')
    expect(darmanitan.types).toEqual(['Fire', 'Psychic'])

    darmanitan.currentHp = Math.ceil(darmanitan.maxHp * 0.75)
    const standardMode = getBattleAbilityHpThresholdFormChange(darmanitan)
    expect(standardMode).toEqual({
      formId: '555',
      messages: ["Zen Darmanitan's Zen Mode changed its form!"],
    })
    expect(applyBattleFormChange(darmanitan, standardMode.formId)).toBe(true)
    expect(darmanitan.formId).toBe('555')
    expect(darmanitan.name).toBe('Darmanitan')
    expect(darmanitan.types).toEqual(['Fire'])

    const zygarde = makeBattlePokemon({
      speciesId: 718,
      formId: '718',
      name: 'Zygarde',
      ability: 'power_construct',
      types: ['Dragon', 'Ground'],
      currentHp: 40,
      maxHp: 80,
    })

    const completeForm = getBattleAbilityHpThresholdFormChange(zygarde)
    expect(completeForm).toEqual({
      formId: '10120',
      messages: ["Zygarde's Power Construct changed its form!"],
    })
    const originalMaxHp = zygarde.maxHp
    expect(applyBattleFormChange(zygarde, completeForm.formId)).toBe(true)
    expect(zygarde.formId).toBe('10120')
    expect(zygarde.name).toBe('Complete Zygarde')
    expect(zygarde.maxHp).toBeGreaterThan(originalMaxHp)

    const zygardeTenPercent = makeBattlePokemon({
      speciesId: 718,
      formId: '10181',
      name: '10% Zygarde',
      ability: 'power_construct',
      types: ['Dragon', 'Ground'],
      currentHp: 40,
      maxHp: 100,
    })
    expect(getBattleAbilityHpThresholdFormChange(zygardeTenPercent).formId).toBe(
      '10120',
    )
  })

  test('Terapagos form abilities use battle form and field hooks', () => {
    const terapagos = makeBattlePokemon({
      speciesId: 1024,
      formId: '1024',
      name: 'Terapagos',
      ability: 'tera_shift',
      types: ['Normal'],
    })

    const entryForm = getBattleAbilityEntryFormChange(terapagos)
    expect(entryForm).toEqual({
      formId: '10276',
      messages: ["Terapagos's Tera Shift changed its form!"],
    })
    expect(applyBattleFormChange(terapagos, entryForm.formId)).toBe(true)
    expect(terapagos.formId).toBe('10276')
    expect(terapagos.name).toBe('Terapagos')

    const stellarTerapagos = makeBattlePokemon({
      speciesId: 1024,
      formId: '10277',
      name: 'Terapagos',
      ability: 'teraform_zero',
      types: ['Normal'],
      teraType: 'normal',
      teraTypeOverride: 'normal',
    })
    const state = makePveBattleState({
      playerTeam: [stellarTerapagos],
      weather: {
        slot: 1,
        weather: 'rain',
        label: 'Rain',
      },
      terrain: {
        terrain: 'electric',
        label: 'Electric Terrain',
        source: 'ability',
      },
    })

    const teraActivation = processBattleAbilityTeraActivation({
      state,
      pokemon: stellarTerapagos,
    })
    expect(teraActivation).toEqual({
      formId: '10277',
      messages: [
        "Terapagos's Teraform Zero cleared the weather!",
        "Terapagos's Teraform Zero cleared the terrain!",
      ],
    })
    expect(state.weather).toBeUndefined()
    expect(state.terrain).toBeUndefined()
  })

  test('Tera Shell sets full-HP attack effectiveness to not very effective', () => {
    const attacker = makeBattlePokemon({
      name: 'Attacker',
      types: ['Fighting'],
    })
    const terapagos = makeBattlePokemon({
      speciesId: 1024,
      formId: '10276',
      name: 'Terapagos',
      ability: 'tera_shell',
      types: ['Normal'],
      currentHp: 120,
      maxHp: 120,
    })

    const neutral = calculateDamage(attacker, terapagos, 'power', 1, 'normal')
    expect(neutral.typeEffectiveness).toBe(0.5)
    expect(neutral.isNotVeryEffective).toBe(true)

    const normallySuperEffective = calculateDamage(
      attacker,
      terapagos,
      'power',
      1,
      'fighting',
    )
    expect(normallySuperEffective.typeEffectiveness).toBe(0.5)
    expect(normallySuperEffective.isNotVeryEffective).toBe(true)

    const resistedTerapagos = makeBattlePokemon({
      speciesId: 1024,
      formId: '10276',
      name: 'Terapagos',
      ability: 'tera_shell',
      types: ['Rock'],
      currentHp: 120,
      maxHp: 120,
    })
    const alreadyResisted = calculateDamage(
      attacker,
      resistedTerapagos,
      'power',
      1,
      'normal',
    )
    expect(alreadyResisted.typeEffectiveness).toBe(0.5)

    terapagos.currentHp = 119
    const damaged = calculateDamage(attacker, terapagos, 'power', 1, 'fighting')
    expect(damaged.typeEffectiveness).toBe(2)

    const moldBreaker = makeBattlePokemon({
      name: 'Mold Breaker',
      ability: 'mold_breaker',
      types: ['Fighting'],
    })
    terapagos.currentHp = terapagos.maxHp
    const bypassed = calculateDamage(moldBreaker, terapagos, 'power', 1, 'fighting')
    expect(bypassed.typeEffectiveness).toBe(2)
  })

  test('Gorilla Tactics boosts Attack and locks the first successful move until switch-out', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99
    try {
      const state = makePveBattleState()
      const defender = makeBattlePokemon({ name: 'Target' })
      const baseline = makeBattlePokemon({ name: 'Baseline' })
      const darmanitan = makeBattlePokemon({
        name: 'Darmanitan',
        ability: 'gorilla_tactics',
      })
      const aerialAce = getMove('aerial-ace')
      const swift = getMove('swift')

      expect(aerialAce).toBeDefined()
      expect(swift).toBeDefined()
      expect(
        calculateDamage(darmanitan, defender, 'power', 1, 'normal').damage,
      ).toBeGreaterThan(
        calculateDamage(baseline, defender, 'power', 1, 'normal').damage,
      )

      recordSuccessfulMoveUse({
        state,
        side: 'player',
        pokemon: darmanitan,
        move: aerialAce!,
      })

      expect(darmanitan.encoredMove).toEqual({
        moveId: 'aerial-ace',
        moveName: 'Aerial Ace',
        turnsRemaining: 1,
        permanent: true,
        source: 'ability',
      })
      expect(getMoveLockMessage(darmanitan, swift!.id)).toBe(
        'Darmanitan must use Aerial Ace.',
      )
      tickMoveLock(darmanitan, aerialAce!.id)
      expect(darmanitan.encoredMove?.turnsRemaining).toBe(1)

      processBattleAbilitySwitchOut(darmanitan)
      expect(darmanitan.encoredMove).toBeUndefined()
    } finally {
      Math.random = originalRandom
    }
  })

  test('Stall suppresses counter prevention without lowering Speed', () => {
    const sableye = makeBattlePokemon({
      name: 'Sableye',
      ability: 'stall',
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 80,
      },
    })

    expect(getEffectiveBattleSpeed(sableye)).toBe(80)
    expect(suppressesBattleCounterPreventionByAbility(sableye)).toBe(true)
  })

  test('move-category damage abilities only boost authored matching move ids', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99
    try {
      const defender = makeBattlePokemon({ name: 'Target' })
      const baseline = makeBattlePokemon({ name: 'Baseline' })
      const ironFist = makeBattlePokemon({
        name: 'Hitmonchan',
        ability: 'iron_fist',
      })
      const strongJaw = makeBattlePokemon({
        name: 'Tyrantrum',
        ability: 'strong_jaw',
      })
      const sharpness = makeBattlePokemon({
        name: 'Gallade',
        ability: 'sharpness',
      })
      const megaLauncher = makeBattlePokemon({
        name: 'Clawitzer',
        ability: 'mega_launcher',
      })
      const toughClaws = makeBattlePokemon({
        name: 'Barbaracle',
        ability: 'tough_claws',
      })

      const machPunch = calculateDamage(
        ironFist,
        defender,
        'power',
        1,
        'fighting',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: 'mach-punch' },
      )
      const normalFighting = calculateDamage(
        baseline,
        defender,
        'power',
        1,
        'fighting',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: 'low-kick' },
      )
      expect(machPunch.damage).toBeGreaterThan(normalFighting.damage)

      const bite = calculateDamage(
        strongJaw,
        defender,
        'power',
        1,
        'dark',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: 'bite' },
      )
      const nonBite = calculateDamage(
        strongJaw,
        defender,
        'power',
        1,
        'dark',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: 'thief' },
      )
      expect(bite.damage).toBeGreaterThan(nonBite.damage)

      const slash = calculateDamage(
        sharpness,
        defender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: 'slash' },
      )
      const tackle = calculateDamage(
        sharpness,
        defender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: 'tackle' },
      )
      expect(slash.damage).toBeGreaterThan(tackle.damage)

      const darkPulse = calculateDamage(
        megaLauncher,
        defender,
        'tech',
        1,
        'dark',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: 'dark-pulse' },
      )
      const snarl = calculateDamage(
        megaLauncher,
        defender,
        'tech',
        1,
        'dark',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: 'snarl' },
      )
      expect(darkPulse.damage).toBeGreaterThan(snarl.damage)

      const contactSlash = calculateDamage(
        toughClaws,
        defender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: 'slash' },
      )
      const nonContactSwift = calculateDamage(
        toughClaws,
        defender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { moveId: 'swift' },
      )
      expect(contactSlash.damage).toBeGreaterThan(nonContactSwift.damage)
    } finally {
      Math.random = originalRandom
    }
  })

  test('Skill Link maximizes variable multi-hit ranges without boosting unrelated moves', () => {
    const skillLink = makeBattlePokemon({
      name: 'Cloyster',
      ability: 'skill_link',
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
    })
    const icicleSpear = getMove('icicle-spear')
    const doubleKick = getMove('double-kick')
    const ember = getMove('ember')
    expect(icicleSpear).toBeDefined()
    expect(doubleKick).toBeDefined()
    expect(ember).toBeDefined()

    expect(usesBattleAbilityMaxMultiHitDamage(skillLink, icicleSpear!)).toBe(true)
    expect(usesBattleAbilityMaxMultiHitDamage(baseline, icicleSpear!)).toBe(false)
    expect(usesBattleAbilityMaxMultiHitDamage(skillLink, doubleKick!)).toBe(false)
    expect(usesBattleAbilityMaxMultiHitDamage(skillLink, ember!)).toBe(false)

    expect(
      getMoveDamageMultiplier(icicleSpear!, ['normal'], () => 0, undefined, {
        forceMaxDamageRange: usesBattleAbilityMaxMultiHitDamage(skillLink, icicleSpear!),
      }),
    ).toBe(2.5)
    expect(
      getMoveDamageMultiplier(icicleSpear!, ['normal'], () => 0, undefined, {
        forceMaxDamageRange: usesBattleAbilityMaxMultiHitDamage(baseline, icicleSpear!),
      }),
    ).toBe(1)
    expect(getMoveDamageMultiplier(ember!, ['normal'], () => 0)).toBe(ember!.damage)
  })

  test('Parental Bond grants a follow-up hit instead of a generic damage boost', () => {
    const parentalBond = makeBattlePokemon({
      name: 'Kangaskhan',
      ability: 'parental_bond',
      types: ['Normal'],
      stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      types: ['Normal'],
      stats: parentalBond.stats,
    })
    const target = makeBattlePokemon({
      name: 'Target',
      types: ['Normal'],
      stats: parentalBond.stats,
    })
    const ember = getMove('ember')
    const icicleSpear = getMove('icicle-spear')
    expect(ember).toBeDefined()
    expect(icicleSpear).toBeDefined()

    expect(getBattleAbilityExtraHitDamageMultiplier(parentalBond, ember!)).toBe(0.25)
    expect(getBattleAbilityExtraHitDamageMultiplier(parentalBond, icicleSpear!)).toBe(0)

    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      expect(calculateDamage(parentalBond, target, 'power', 1, 'normal').damage).toBe(
        calculateDamage(baseline, target, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('status immunity abilities block matching statuses', () => {
    const persian = makeBattlePokemon({
      name: 'Persian',
      ability: 'limber',
    })
    const muk = makeBattlePokemon({
      name: 'Muk',
      ability: 'immunity',
    })

    expect(canApplyStatus(persian, 'paralysis')).toBe(false)
    expect(canApplyStatus(persian, 'burn')).toBe(true)
    expect(canApplyStatus(muk, 'poison')).toBe(false)
    expect(canApplyStatus(muk, 'bad-poison')).toBe(false)
  })

  test('corrosion bypasses poison immunities when applying poison statuses', () => {
    const corrosionMon = makeBattlePokemon({
      name: 'Toxapex',
      ability: 'corrosion',
    })
    const poisonTarget = makeBattlePokemon({
      name: 'Muk',
      types: ['Poison'],
      ability: undefined,
    })

    expect(canApplyStatus(poisonTarget, 'poison')).toBe(false)
    expect(
      canApplyStatus(poisonTarget, 'poison', undefined, {
        sourcePokemon: corrosionMon,
      }),
    ).toBe(true)
    expect(canApplyStatus(poisonTarget, 'bad-poison')).toBe(false)
    expect(
      canApplyStatus(poisonTarget, 'bad-poison', undefined, {
        sourcePokemon: corrosionMon,
      }),
    ).toBe(true)
  })

  test('Flower Veil protects only active Grass Pokemon from status and stat drops', () => {
    const florges = makeBattlePokemon({
      name: 'Florges',
      ability: 'flower_veil',
      types: ['Fairy'],
    })
    const cherrim = makeBattlePokemon({
      name: 'Cherrim',
      ability: 'flower_veil',
      types: ['Grass'],
    })
    const attacker = makeBattlePokemon({ name: 'Attacker' })

    expect(canApplyStatus(florges, 'burn')).toBe(true)
    expect(canApplyStatus(cherrim, 'burn')).toBe(false)
    expect(
      blocksBattleStatStageDropByAbility({
        pokemon: florges,
        stat: 'attack',
        source: 'opponent',
        sourcePokemon: attacker,
      }),
    ).toBe(false)
    expect(
      blocksBattleStatStageDropByAbility({
        pokemon: cherrim,
        stat: 'attack',
        source: 'opponent',
        sourcePokemon: attacker,
      }),
    ).toBe(true)

    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const baseline = makeBattlePokemon({
        name: 'Baseline',
        types: ['Grass'],
      })
      expect(
        calculateDamage(attacker, cherrim, 'power', 1, 'grass').damage,
      ).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'grass').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('stat-drop immunity abilities block opponent-caused matching stat drops only', () => {
    const metagross = makeBattlePokemon({
      name: 'Metagross',
      ability: 'clear_body',
    })
    const krabby = makeBattlePokemon({
      name: 'Krabby',
      ability: 'hyper_cutter',
    })

    expect(
      blocksBattleStatStageDropByAbility({
        pokemon: metagross,
        stat: 'speed',
        source: 'opponent',
      }),
    ).toBe(true)
    expect(
      blocksBattleStatStageDropByAbility({
        pokemon: krabby,
        stat: 'attack',
        source: 'opponent',
      }),
    ).toBe(true)
    expect(
      blocksBattleStatStageDropByAbility({
        pokemon: krabby,
        stat: 'defense',
        source: 'opponent',
      }),
    ).toBe(false)
    expect(
      blocksBattleStatStageDropByAbility({
        pokemon: metagross,
        stat: 'defense',
        source: 'self',
      }),
    ).toBe(false)
  })

  test('critical-hit abilities modify crit rolls instead of generic damage', () => {
    const originalRandom = Math.random
    try {
      const attacker = makeBattlePokemon({ name: 'Attacker' })
      const sniper = makeBattlePokemon({ name: 'Sniper', ability: 'sniper' })
      const superLuck = makeBattlePokemon({ name: 'Lucky', ability: 'super_luck' })
      const merciless = makeBattlePokemon({
        name: 'Merciless',
        ability: 'merciless',
      })
      const defender = makeBattlePokemon({ name: 'Defender' })
      const poisonedDefender = makeBattlePokemon({
        name: 'Poisoned',
        status: { id: 'poison', counter: 0 },
      })
      const armored = makeBattlePokemon({
        name: 'Armored',
        ability: 'battle_armor',
      })

      Math.random = () => 0
      const blockedCrit = calculateDamage(
        attacker,
        armored,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        100,
      )
      expect(blockedCrit.isCrit).toBe(false)

      const normalCrit = calculateDamage(
        attacker,
        defender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        100,
      )
      const sniperCrit = calculateDamage(
        sniper,
        defender,
        'power',
        1,
        'normal',
        undefined,
        undefined,
        100,
      )
      expect(normalCrit.isCrit).toBe(true)
      expect(sniperCrit.isCrit).toBe(true)
      expect(sniperCrit.damage).toBeGreaterThan(normalCrit.damage)

      Math.random = () => 0.1
      const baseline = calculateDamage(attacker, defender, 'power', 1, 'normal')
      const lucky = calculateDamage(superLuck, defender, 'power', 1, 'normal')
      expect(baseline.isCrit).toBe(false)
      expect(lucky.isCrit).toBe(true)

      Math.random = () => 0.99
      const mercilessCrit = calculateDamage(
        merciless,
        poisonedDefender,
        'power',
        1,
        'normal',
      )
      expect(mercilessCrit.isCrit).toBe(true)
    } finally {
      Math.random = originalRandom
    }
  })

  test('after-KO stat-stage abilities raise stats only when the attacker survives', () => {
    const gyarados = makeBattlePokemon({
      name: 'Gyarados',
      ability: 'moxie',
      statStages: { ...DEFAULT_STAT_STAGES },
    })

    expect(applyBattleAbilityAfterKoStatStages(gyarados)).toEqual([
      "Gyarados's Moxie raised Attack!",
    ])
    expect(gyarados.statStages?.attack).toBe(1)

    gyarados.currentHp = 0
    expect(applyBattleAbilityAfterKoStatStages(gyarados)).toEqual([])
    expect(gyarados.statStages?.attack).toBe(1)
  })

  test('opponent stat-drop trigger abilities raise their configured stats', () => {
    const bisharp = makeBattlePokemon({
      name: 'Bisharp',
      ability: 'defiant',
      statStages: { ...DEFAULT_STAT_STAGES, defense: -1 },
    })
    const milotic = makeBattlePokemon({
      name: 'Milotic',
      ability: 'competitive',
      statStages: { ...DEFAULT_STAT_STAGES, speed: -1 },
    })

    expect(
      applyBattleAbilityStatStageDropTriggers({
        pokemon: bisharp,
        source: 'opponent',
      }),
    ).toEqual(["Bisharp's Defiant raised Attack!"])
    expect(bisharp.statStages?.attack).toBe(2)

    expect(
      applyBattleAbilityStatStageDropTriggers({
        pokemon: milotic,
        source: 'opponent',
      }),
    ).toEqual(["Milotic's Competitive raised Special Attack!"])
    expect(milotic.statStages?.specialAttack).toBe(2)

    expect(
      applyBattleAbilityStatStageDropTriggers({
        pokemon: bisharp,
        source: 'self',
      }),
    ).toEqual([])
  })

  test('mirror armor reflects opponent-caused stat drops', () => {
    const corviknight = makeBattlePokemon({
      name: 'Corviknight',
      ability: 'mirror_armor',
      statStages: { ...DEFAULT_STAT_STAGES },
    })
    const arbok = makeBattlePokemon({
      name: 'Arbok',
      statStages: { ...DEFAULT_STAT_STAGES },
    })

    const reflected = applyBattleAbilityStatStageDropReflection({
      pokemon: corviknight,
      opponent: arbok,
      stat: 'defense',
      stages: -1,
      source: 'opponent',
    })

    expect(reflected.reflected).toBe(true)
    expect(reflected.changed).toBe(true)
    expect(reflected.messages).toEqual([
      "Corviknight's Mirror Armor reflected the stat drop!",
      "Corviknight's Mirror Armor lowered Arbok's Defense!",
    ])
    expect(corviknight.statStages?.defense).toBe(0)
    expect(arbok.statStages?.defense).toBe(-1)

    expect(
      applyBattleAbilityStatStageDropReflection({
        pokemon: corviknight,
        opponent: arbok,
        stat: 'defense',
        stages: -1,
        source: 'self',
      }).reflected,
    ).toBe(false)
  })

  test('opportunist copies opponent stat boosts', () => {
    const espathra = makeBattlePokemon({
      name: 'Espathra',
      ability: 'opportunist',
      statStages: { ...DEFAULT_STAT_STAGES },
    })
    const dragonite = makeBattlePokemon({
      name: 'Dragonite',
      statStages: { ...DEFAULT_STAT_STAGES, attack: 1 },
    })

    expect(
      applyBattleAbilityOpponentStatStageBoostCopy({
        pokemon: espathra,
        boostedPokemon: dragonite,
        stat: 'attack',
        stages: 1,
      }),
    ).toEqual(["Espathra's Opportunist raised Attack!"])
    expect(espathra.statStages?.attack).toBe(1)

    expect(
      applyBattleAbilityOpponentStatStageBoostCopy({
        pokemon: espathra,
        boostedPokemon: dragonite,
        stat: 'defense',
        stages: -1,
      }),
    ).toEqual([])
    expect(espathra.statStages?.defense).toBe(0)
  })

  test('trapping and switch-out abilities use battle event hooks', () => {
    const dugtrio = makeBattlePokemon({
      name: 'Dugtrio',
      ability: 'arena_trap',
    })
    const magneton = makeBattlePokemon({
      name: 'Magneton',
      ability: 'magnet_pull',
    })
    const target = makeBattlePokemon({
      name: 'Target',
      types: ['normal'],
    })
    const runawayTarget = makeBattlePokemon({
      name: 'Raticate',
      ability: 'run_away',
      types: ['normal'],
    })
    const flyingTarget = makeBattlePokemon({
      name: 'Pidgeot',
      types: ['normal', 'flying'],
    })
    const steelTarget = makeBattlePokemon({
      name: 'Steelix',
      types: ['steel', 'ground'],
    })

    expect(
      getBattleAbilitySwitchPreventionMessage({
        trapper: dugtrio,
        switchingPokemon: target,
      }),
    ).toBe("Target cannot switch out because of Dugtrio's Arena Trap.")
    expect(
      getBattleAbilitySwitchPreventionMessage({
        trapper: dugtrio,
        switchingPokemon: flyingTarget,
      }),
    ).toBeUndefined()
    expect(
      getBattleAbilitySwitchPreventionMessage({
        trapper: dugtrio,
        switchingPokemon: runawayTarget,
      }),
    ).toBeUndefined()
    expect(
      getBattleAbilitySwitchPreventionMessage({
        trapper: magneton,
        switchingPokemon: steelTarget,
      }),
    ).toBe("Steelix cannot switch out because of Magneton's Magnet Pull.")

    const cradily = makeBattlePokemon({
      name: 'Cradily',
      ability: 'suction_cups',
    })
    expect(blocksBattleForcedSwitchByAbility(cradily)).toBe(true)

    const starmie = makeBattlePokemon({
      name: 'Starmie',
      ability: 'natural_cure',
      status: { id: 'poison', counter: 0 },
    })
    expect(applyBattleAbilitySwitchOutEffects(starmie)).toEqual([
      "Starmie's Natural Cure cured its status!",
    ])
    expect(starmie.status).toBeUndefined()

    const slowking = makeBattlePokemon({
      name: 'Slowking',
      ability: 'regenerator',
      currentHp: 40,
      maxHp: 100,
    })
    expect(applyBattleAbilitySwitchOutEffects(slowking)).toEqual([
      "Slowking's Regenerator restored 33 HP!",
    ])
    expect(slowking.currentHp).toBe(73)

    const golisopod = makeBattlePokemon({
      name: 'Golisopod',
      ability: 'emergency_exit',
      currentHp: 50,
      maxHp: 100,
    })
    expect(
      getBattleAbilityLowHpSelfSwitchMessage({
        pokemon: golisopod,
        previousHp: 80,
        damage: 30,
      }),
    ).toBe("Golisopod's Emergency Exit made it retreat!")
  })

  test('keen eye blocks outgoing damage reductions from accuracy-style statuses', () => {
    const attacker = makeBattlePokemon({
      name: 'Fearow',
      ability: 'keen_eye',
      secondaryStatuses: [
        {
          id: 'sand-attack',
          name: 'Sand Attack',
          target: 'pokemon',
          sourceSide: 'enemy',
          triggers: ['turn-end'],
          effects: [{ type: 'damage-modifier', percent: -25 }],
          remainingTurns: 1,
        },
      ],
    })
    const baseline = makeBattlePokemon({
      name: 'Pidgey',
      secondaryStatuses: attacker.secondaryStatuses,
    })
    const defender = makeBattlePokemon({ name: 'Target' })

    const keenEye = applySecondaryStatusDamageModifiers({
      attacker,
      defender,
      damage: 40,
    })
    const reduced = applySecondaryStatusDamageModifiers({
      attacker: baseline,
      defender,
      damage: 40,
    })

    expect(keenEye.damage).toBe(40)
    expect(keenEye.messages.join(' ')).toContain('prevented Sand Attack')
    expect(reduced.damage).toBe(30)
  })

  test('on-damaged abilities apply stat stages after matching damage events', () => {
    const attacker = makeBattlePokemon({
      name: 'Attacker',
      statStages: { ...DEFAULT_STAT_STAGES },
    })
    const mudsdale = makeBattlePokemon({
      name: 'Mudsdale',
      ability: 'stamina',
      currentHp: 80,
      maxHp: 100,
      statStages: { ...DEFAULT_STAT_STAGES },
    })

    mudsdale.currentHp = 60
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: mudsdale,
        attacker,
        damage: 20,
        previousHp: 80,
        attackType: 'normal',
      }),
    ).toEqual(["Mudsdale's Stamina raised Defense!"])
    expect(mudsdale.statStages?.defense).toBe(1)

    const coalossal = makeBattlePokemon({
      name: 'Coalossal',
      ability: 'steam_engine',
      currentHp: 70,
      maxHp: 100,
      statStages: { ...DEFAULT_STAT_STAGES },
    })
    coalossal.currentHp = 50
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: coalossal,
        attacker,
        damage: 20,
        previousHp: 70,
        attackType: 'water',
      }),
    ).toEqual(["Coalossal's Steam Engine raised Speed!"])
    expect(coalossal.statStages?.speed).toBe(6)

    const weakArmor = makeBattlePokemon({
      name: 'Onix',
      ability: 'weak_armor',
      currentHp: 70,
      maxHp: 100,
      statStages: { ...DEFAULT_STAT_STAGES },
    })
    weakArmor.currentHp = 55
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: weakArmor,
        attacker,
        damage: 15,
        previousHp: 70,
        attackType: 'normal',
      }),
    ).toEqual([
      "Onix's Weak Armor lowered Defense!",
      "Onix's Weak Armor raised Speed!",
    ])
    expect(weakArmor.statStages?.defense).toBe(-1)
    expect(weakArmor.statStages?.speed).toBe(2)
  })

  test('on-damaged abilities can affect attackers and threshold crossings', () => {
    const attacker = makeBattlePokemon({
      name: 'Attacker',
      statStages: { ...DEFAULT_STAT_STAGES },
    })
    const gumshoos = makeBattlePokemon({
      name: 'Gumshoos',
      ability: 'stakeout',
    })
    const tangela = makeBattlePokemon({
      name: 'Tangela',
      ability: 'gooey',
      currentHp: 60,
      maxHp: 100,
      statStages: { ...DEFAULT_STAT_STAGES },
    })

    tangela.currentHp = 40
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: tangela,
        attacker,
        damage: 20,
        previousHp: 60,
        attackType: 'normal',
      }),
    ).toEqual(["Tangela's Gooey lowered Attacker's Speed!"])
    expect(attacker.statStages?.speed).toBe(-1)

    const drampa = makeBattlePokemon({
      name: 'Drampa',
      ability: 'berserk',
      currentHp: 60,
      maxHp: 100,
      statStages: { ...DEFAULT_STAT_STAGES },
    })
    drampa.currentHp = 45
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: drampa,
        attacker: gumshoos,
        damage: 15,
        previousHp: 60,
        attackType: 'normal',
      }),
    ).toEqual(["Drampa's Berserk raised Special Attack!"])
    expect(drampa.statStages?.specialAttack).toBe(1)

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: drampa,
        attacker: gumshoos,
        damage: 5,
        previousHp: 45,
        attackType: 'normal',
      }),
    ).toEqual([])

    const tauros = makeBattlePokemon({
      name: 'Tauros',
      ability: 'anger_point',
      currentHp: 80,
      maxHp: 100,
      statStages: { ...DEFAULT_STAT_STAGES },
    })
    tauros.currentHp = 65
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: tauros,
        attacker: gumshoos,
        damage: 15,
        previousHp: 80,
        attackType: 'normal',
      }),
    ).toEqual([])
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: tauros,
        attacker: gumshoos,
        damage: 15,
        previousHp: 80,
        attackType: 'normal',
        criticalHit: true,
      }),
    ).toEqual(["Tauros's Anger Point raised Attack!"])
    expect(tauros.statStages?.attack).toBe(6)
  })

  test('on-damaged status abilities can status the attacker', () => {
    const pikachu = makeBattlePokemon({
      name: 'Pikachu',
      ability: 'static',
      currentHp: 50,
      maxHp: 100,
    })
    const attacker = makeBattlePokemon({
      name: 'Attacker',
      types: ['Normal'],
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: pikachu,
        attacker,
        damage: 20,
        previousHp: 70,
        random: () => 0,
      }),
    ).toEqual([
      "Pikachu's Static activated!",
      'Attacker was inflicted with Paralysis! [icon:status:paralysis]',
    ])
    expect(attacker.status?.id).toBe('paralysis')

    const noProcAttacker = makeBattlePokemon({
      name: 'No Proc',
      types: ['Normal'],
    })
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: pikachu,
        attacker: noProcAttacker,
        damage: 20,
        previousHp: 70,
        random: () => 0.99,
      }),
    ).toEqual([])
    expect(noProcAttacker.status).toBeUndefined()
  })

  test('cute charm applies battle infatuation instead of reducing damage', () => {
    const clefairy = makeBattlePokemon({
      name: 'Clefairy',
      ability: 'cute_charm',
      currentHp: 50,
      maxHp: 100,
      gender: 'female',
    })
    const attacker = makeBattlePokemon({
      name: 'Nidoran',
      currentHp: 80,
      maxHp: 100,
      gender: 'male',
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: clefairy,
        attacker,
        damage: 20,
        previousHp: 70,
        random: () => 0,
      }),
    ).toEqual([
      "Clefairy's Cute Charm activated!",
      'Infatuation took hold.',
    ])
    expect(attacker.secondaryStatuses?.[0]).toMatchObject({
      id: 'infatuation',
      effects: [{ type: 'infatuation', chance: 50 }],
    })
    expect(
      processBeforeMoveSecondaryStatuses({
        pokemon: attacker,
        random: () => 0.49,
      }),
    ).toEqual({
      canMove: false,
      message: 'Nidoran is immobilized by love!',
    })

    const sameGenderAttacker = makeBattlePokemon({
      name: 'Pikachu',
      currentHp: 80,
      maxHp: 100,
      gender: 'female',
    })
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: clefairy,
        attacker: sameGenderAttacker,
        damage: 20,
        previousHp: 70,
        random: () => 0,
      }),
    ).toEqual([])
    expect(sameGenderAttacker.secondaryStatuses).toBeUndefined()
  })

  test('toxic debris scatters toxic spikes on the attacker side', () => {
    const state = makePveBattleState({
      playerTeam: [
        makeBattlePokemon({
          id: 'player-active',
          name: 'Rattata',
          types: ['Normal'],
          currentHp: 80,
          maxHp: 100,
        }),
      ],
      enemyTeam: [
        makeBattlePokemon({
          id: 'enemy-active',
          name: 'Glimmora',
          ability: 'toxic_debris',
          currentHp: 80,
          maxHp: 100,
        }),
      ],
    })
    const attacker = state.playerTeam[state.activePlayerIndex]
    const defender = state.enemyTeam[state.activeEnemyIndex]

    expect(
      applyBattleAbilityOnDamagedStatStages({
        state,
        defender,
        defenderSide: 'enemy',
        attacker,
        damage: 20,
        previousHp: 100,
        random: () => 0,
      }),
    ).toEqual(["Glimmora's Toxic Debris scattered Toxic Spikes!"])
    expect(state.secondaryStatuses?.[0]).toMatchObject({
      id: 'toxic-spikes',
      sourceSide: 'enemy',
      target: 'side',
      targetSide: 'player',
      effects: [{ type: 'apply-status', statusId: 'poison', chance: 100 }],
    })

    const messages = processSecondaryStatusesForSwitch(state, 'player', () => 0)

    expect(state.playerTeam[state.activePlayerIndex].status?.id).toBe('poison')
    expect(messages.join(' ')).toContain('Rattata was inflicted with Poison')
  })

  test('perish body applies a delayed perish count to both active pokemon', () => {
    const state = makePveBattleState({
      playerTeam: [
        makeBattlePokemon({
          id: 'player-active',
          name: 'Primeape',
          currentHp: 80,
          maxHp: 100,
        }),
      ],
      enemyTeam: [
        makeBattlePokemon({
          id: 'enemy-active',
          name: 'Cursola',
          ability: 'perish_body',
          currentHp: 80,
          maxHp: 100,
        }),
      ],
    })
    const attacker = state.playerTeam[state.activePlayerIndex]
    const defender = state.enemyTeam[state.activeEnemyIndex]

    expect(
      applyBattleAbilityOnDamagedStatStages({
        state,
        defender,
        defenderSide: 'enemy',
        attacker,
        damage: 20,
        previousHp: 100,
        random: () => 0,
      }),
    ).toEqual([
      "Cursola's Perish Body activated!",
      'Perish Song took hold.',
    ])
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
  })

  test('contact ability-change abilities mutate active battle abilities', () => {
    const attacker = makeBattlePokemon({
      name: 'Slaking',
      ability: 'truant',
      currentHp: 100,
      maxHp: 100,
    })
    const cofagrigus = makeBattlePokemon({
      name: 'Cofagrigus',
      ability: 'mummy',
      currentHp: 80,
      maxHp: 100,
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: cofagrigus,
        attacker,
        damage: 20,
        previousHp: 100,
        random: () => 0,
      }),
    ).toEqual([
      "Cofagrigus's Mummy changed Slaking's ability to Mummy!",
    ])
    expect(attacker.ability).toBe('mummy')
    expect(processBattleAbilitySwitchOut(attacker)).toEqual([
      "Slaking's ability returned to Truant.",
    ])
    expect(attacker.ability).toBe('truant')

    attacker.ability = 'huge_power'
    const stonjourner = makeBattlePokemon({
      name: 'Stonjourner',
      ability: 'wandering_spirit',
      currentHp: 80,
      maxHp: 100,
    })
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: stonjourner,
        attacker,
        damage: 20,
        previousHp: 100,
        random: () => 0,
      }),
    ).toEqual([
      "Stonjourner's Wandering Spirit swapped abilities with Slaking!",
    ])
    expect(stonjourner.ability).toBe('huge_power')
    expect(attacker.ability).toBe('wandering_spirit')

    const longReachAttacker = makeBattlePokemon({
      name: 'Decidueye',
      ability: 'long_reach',
      currentHp: 80,
      maxHp: 100,
    })
    const oinkologne = makeBattlePokemon({
      name: 'Oinkologne',
      ability: 'lingering_aroma',
      currentHp: 80,
      maxHp: 100,
    })
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: oinkologne,
        attacker: longReachAttacker,
        damage: 20,
        previousHp: 100,
        random: () => 0,
      }),
    ).toEqual([])
    expect(longReachAttacker.ability).toBe('long_reach')
  })

  test('on-damaged status abilities respect status immunity and random status selection', () => {
    const pikachu = makeBattlePokemon({
      name: 'Pikachu',
      ability: 'static',
      currentHp: 50,
      maxHp: 100,
    })
    const electricAttacker = makeBattlePokemon({
      name: 'Electric Attacker',
      types: ['Electric'],
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: pikachu,
        attacker: electricAttacker,
        damage: 20,
        previousHp: 70,
        random: () => 0,
      }),
    ).toEqual([])
    expect(electricAttacker.status).toBeUndefined()

    const breloom = makeBattlePokemon({
      name: 'Breloom',
      ability: 'effect_spore',
      currentHp: 40,
      maxHp: 100,
    })
    const attacker = makeBattlePokemon({
      name: 'Attacker',
      types: ['Normal'],
    })
    const rolls = [0, 0.67]
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: breloom,
        attacker,
        damage: 20,
        previousHp: 60,
        random: () => rolls.shift() ?? 0,
      }),
    ).toEqual([
      "Breloom's Effect Spore activated!",
      'Attacker was inflicted with Paralysis! [icon:status:paralysis]',
    ])
    expect(attacker.status?.id).toBe('paralysis')
  })

  test('on-damaged chip abilities damage the attacker', () => {
    const sharpedo = makeBattlePokemon({
      name: 'Sharpedo',
      ability: 'rough_skin',
      currentHp: 0,
      maxHp: 100,
    })
    const attacker = makeBattlePokemon({
      name: 'Attacker',
      currentHp: 80,
      maxHp: 120,
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: sharpedo,
        attacker,
        damage: 40,
        previousHp: 40,
      }),
    ).toEqual([
      "Attacker was hurt by Sharpedo's Rough Skin! [icon:damage:15]",
    ])
    expect(attacker.currentHp).toBe(65)

    const ferrothorn = makeBattlePokemon({
      name: 'Ferrothorn',
      ability: 'iron_barbs',
      currentHp: 20,
      maxHp: 100,
    })
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: ferrothorn,
        attacker,
        damage: 20,
        previousHp: 40,
      }),
    ).toEqual([
      "Attacker was hurt by Ferrothorn's Iron Barbs! [icon:damage:15]",
    ])
    expect(attacker.currentHp).toBe(50)
  })

  test('KO reactive damage abilities trigger on faint instead of reducing damage', () => {
    const attacker = makeBattlePokemon({
      name: 'Attacker',
      currentHp: 90,
      maxHp: 120,
      types: ['Normal'],
      stats: { hp: 120, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
    })
    const aftermath = makeBattlePokemon({
      name: 'Drifblim',
      ability: 'aftermath',
      currentHp: 0,
      maxHp: 100,
      types: ['Normal'],
      stats: attacker.stats,
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      types: ['Normal'],
      stats: attacker.stats,
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: aftermath,
        attacker,
        damage: 40,
        previousHp: 40,
      }),
    ).toEqual([
      "Attacker was hurt by Drifblim's Aftermath! [icon:damage:30]",
    ])
    expect(attacker.currentHp).toBe(60)

    const longReachAttacker = makeBattlePokemon({
      name: 'Decidueye',
      ability: 'long_reach',
      currentHp: 90,
      maxHp: 120,
      types: ['Normal'],
      stats: attacker.stats,
    })
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: aftermath,
        attacker: longReachAttacker,
        damage: 40,
        previousHp: 40,
      }),
    ).toEqual([])
    expect(longReachAttacker.currentHp).toBe(90)

    const pyukumuku = makeBattlePokemon({
      name: 'Pyukumuku',
      ability: 'innards_out',
      currentHp: 0,
      maxHp: 100,
      types: ['Normal'],
      stats: attacker.stats,
    })
    const secondAttacker = makeBattlePokemon({
      name: 'Second Attacker',
      currentHp: 80,
      maxHp: 120,
      types: ['Normal'],
      stats: attacker.stats,
    })
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: pyukumuku,
        attacker: secondAttacker,
        damage: 70,
        previousHp: 70,
      }),
    ).toEqual([
      "Second Attacker was hurt by Pyukumuku's Innards Out! [icon:damage:70]",
    ])
    expect(secondAttacker.currentHp).toBe(10)

    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      expect(calculateDamage(attacker, aftermath, 'power', 1, 'normal').damage).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'normal').damage,
      )
      expect(calculateDamage(attacker, pyukumuku, 'power', 1, 'normal').damage).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('long reach prevents reactive contact-like ability effects', () => {
    const longReachAttacker = makeBattlePokemon({
      name: 'Decidueye',
      ability: 'long_reach',
      currentHp: 80,
      maxHp: 100,
    })
    const normalAttacker = makeBattlePokemon({
      name: 'Attacker',
      currentHp: 80,
      maxHp: 100,
    })
    const sharpedo = makeBattlePokemon({
      name: 'Sharpedo',
      ability: 'rough_skin',
      currentHp: 40,
      maxHp: 100,
    })
    const pikachu = makeBattlePokemon({
      name: 'Pikachu',
      ability: 'static',
      currentHp: 40,
      maxHp: 100,
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: sharpedo,
        attacker: longReachAttacker,
        damage: 20,
        previousHp: 60,
      }),
    ).toEqual([])
    expect(longReachAttacker.currentHp).toBe(80)

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: sharpedo,
        attacker: normalAttacker,
        damage: 20,
        previousHp: 60,
      }),
    ).toEqual([
      "Attacker was hurt by Sharpedo's Rough Skin! [icon:damage:12]",
    ])
    expect(normalAttacker.currentHp).toBe(68)

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: pikachu,
        attacker: longReachAttacker,
        damage: 20,
        previousHp: 60,
        random: () => 0,
      }),
    ).toEqual([])
    expect(longReachAttacker.status).toBeUndefined()
  })

  test('held item abilities steal or suppress items through battle hooks', () => {
    const pickpocket = makeBattlePokemon({
      name: 'Weavile',
      ability: 'pickpocket',
      currentHp: 80,
      maxHp: 100,
    })
    const attacker = makeBattlePokemon({
      name: 'Attacker',
      heldItem: { id: 'hard-stone', name: 'Hard Stone' },
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: pickpocket,
        attacker,
        damage: 20,
        previousHp: 100,
      }),
    ).toEqual(["Weavile's Pickpocket stole Attacker's Hard Stone!"])
    expect(pickpocket.heldItem).toEqual({ id: 'hard-stone', name: 'Hard Stone' })
    expect(pickpocket.heldItemBattleOnly).toBe(true)
    expect(attacker.heldItem).toBeUndefined()
    expect(attacker.battleAbilityState?.heldItemLost).toBe(true)

    const longReachAttacker = makeBattlePokemon({
      name: 'Decidueye',
      ability: 'long_reach',
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })
    const secondPickpocket = makeBattlePokemon({
      name: 'Sneasel',
      ability: 'pickpocket',
      currentHp: 80,
      maxHp: 100,
    })
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: secondPickpocket,
        attacker: longReachAttacker,
        damage: 20,
        previousHp: 100,
      }),
    ).toEqual([])
    expect(secondPickpocket.heldItem).toBeUndefined()
    expect(longReachAttacker.heldItem).toEqual({ id: 'oran-berry', name: 'Oran Berry' })

    const magician = makeBattlePokemon({
      name: 'Delphox',
      ability: 'magician',
    })
    const target = makeBattlePokemon({
      name: 'Target',
      heldItem: { id: 'sitrus-berry', name: 'Sitrus Berry' },
    })
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: target,
        attacker: magician,
        damage: 30,
        previousHp: 100,
      }),
    ).toEqual(["Delphox's Magician stole Target's Sitrus Berry!"])
    expect(magician.heldItem).toEqual({ id: 'sitrus-berry', name: 'Sitrus Berry' })
    expect(target.heldItem).toBeUndefined()

    const stickyHolder = makeBattlePokemon({
      name: 'Sticky Holder',
      ability: 'sticky_hold',
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })
    const secondMagician = makeBattlePokemon({
      name: 'Klefki',
      ability: 'magician',
    })
    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: stickyHolder,
        attacker: secondMagician,
        damage: 20,
        previousHp: 100,
      }),
    ).toEqual(["Sticky Holder's Sticky Hold protected its held item!"])
    expect(secondMagician.heldItem).toBeUndefined()
    expect(stickyHolder.heldItem).toEqual({ id: 'oran-berry', name: 'Oran Berry' })

    const klutz = makeBattlePokemon({
      name: 'Lopunny',
      ability: 'klutz',
      currentHp: 20,
      maxHp: 100,
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })
    expect(suppressesBattleHeldItemEffectsByAbility(klutz)).toBe(true)
    expect(applyHeldItemIfTriggered(klutz, 'hp')).toEqual({
      applied: false,
      message: '',
    })
    expect(klutz.heldItem).toEqual({ id: 'oran-berry', name: 'Oran Berry' })

    const boosted = makeBattlePokemon({
      name: 'Rock Holder',
      heldItem: { id: 'hard-stone', name: 'Hard Stone' },
    })
    const klutzBoosted = makeBattlePokemon({
      name: 'Klutz Rock Holder',
      ability: 'klutz',
      heldItem: { id: 'hard-stone', name: 'Hard Stone' },
    })
    expect(getHeldAttackDamageMultiplier(boosted, 'rock')).toBeGreaterThan(1)
    expect(getHeldAttackDamageMultiplier(klutzBoosted, 'rock')).toBe(1)
  })

  test('Pickup no longer reduces incoming damage in battle', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const attacker = makeBattlePokemon({
        name: 'Attacker',
        stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
      })
      const pickup = makeBattlePokemon({
        name: 'Meowth',
        ability: 'pickup',
        stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
      })
      const baseline = makeBattlePokemon({
        name: 'Baseline',
        stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
      })

      expect(
        calculateDamage(attacker, pickup, 'power', 1, 'normal').damage,
      ).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('ally-only abilities have no single-battle damage or stat fallback', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const allyOnlyAbilities = [
        'battery',
        'commander',
        'costar',
        'friend_guard',
        'hospitality',
        'minus',
        'plus',
        'power_spot',
        'symbiosis',
        'telepathy',
      ] as const
      const attacker = makeBattlePokemon({
        name: 'Attacker',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })
      const baseline = makeBattlePokemon({
        name: 'Baseline',
        stats: {
          hp: 100,
          attack: 100,
          defense: 100,
          specialAttack: 100,
          specialDefense: 100,
          speed: 100,
        },
      })

      const baselineIncomingPower = calculateDamage(
        attacker,
        baseline,
        'power',
        1,
        'normal',
      ).damage
      const baselineOutgoingPower = calculateDamage(
        baseline,
        attacker,
        'power',
        1,
        'normal',
      ).damage
      const baselineOutgoingTech = calculateDamage(
        baseline,
        attacker,
        'tech',
        1,
        'normal',
      ).damage

      for (const abilityId of allyOnlyAbilities) {
        const ability = ABILITIES[abilityId]
        expect(ability).toBeDefined()
        const effects = ability?.effects ?? []
        expect(
          effects.some(
            (effect) => effect.type === 'battle-no-single-battle-effect',
          ),
        ).toBe(true)
        expect(
          effects.some(
            (effect) =>
              effect.type === 'battle-damage-multiplier' ||
              effect.type === 'battle-stat-multiplier',
          ),
        ).toBe(false)

        const holder = makeBattlePokemon({
          name: abilityId,
          ability: abilityId,
          stats: baseline.stats,
        })

        expect(calculateDamage(attacker, holder, 'power', 1, 'normal').damage).toBe(
          baselineIncomingPower,
        )
        expect(calculateDamage(holder, attacker, 'power', 1, 'normal').damage).toBe(
          baselineOutgoingPower,
        )
        expect(calculateDamage(holder, attacker, 'tech', 1, 'normal').damage).toBe(
          baselineOutgoingTech,
        )
      }
    } finally {
      Math.random = originalRandom
    }
  })

  test('Early Bird advances sleep counters instead of boosting damage', () => {
    const stats = {
      hp: 100,
      attack: 100,
      defense: 100,
      specialAttack: 100,
      specialDefense: 100,
      speed: 100,
    }
    const earlyBird = makeBattlePokemon({
      name: 'Doduo',
      ability: 'early_bird',
      stats,
      status: { id: 'sleep', counter: 2 },
    })
    const baselineSleeper = makeBattlePokemon({
      name: 'Sleeper',
      stats,
      status: { id: 'sleep', counter: 2 },
    })
    const defender = makeBattlePokemon({ name: 'Target', stats })

    expect(getBattleAbilityStatusCounterStep(earlyBird, 'sleep')).toBe(2)
    expect(getBattleAbilityStatusCounterStep(baselineSleeper, 'sleep')).toBe(1)

    const woke = resolveBeforeMoveStatus(earlyBird)
    expect(woke).toEqual({
      canMove: true,
      message: 'Doduo woke up!',
      selfDamage: 0,
    })
    expect(earlyBird.status).toBeUndefined()

    const blocked = resolveBeforeMoveStatus(baselineSleeper)
    expect(blocked.canMove).toBe(false)
    expect(blocked.message).toBe('Sleeper is fast asleep.')
    expect(baselineSleeper.status).toEqual({ id: 'sleep', counter: 1 })

    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      expect(calculateDamage(earlyBird, defender, 'power', 1, 'normal').damage).toBe(
        calculateDamage(makeBattlePokemon({ name: 'Baseline', stats }), defender, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('recoil abilities only apply to recoil-style self-damage moves', () => {
    const rockHead = makeBattlePokemon({
      name: 'Rhydon',
      ability: 'rock_head',
    })
    const magicGuard = makeBattlePokemon({
      name: 'Clefable',
      ability: 'magic_guard',
    })
    const reckless = makeBattlePokemon({
      name: 'Staraptor',
      ability: 'reckless',
    })
    const doubleEdge = getMove('double-edge')
    const steelBeam = getMove('steel-beam')
    const rockShield = getMove('rock-shield')

    expect(doubleEdge).toBeDefined()
    expect(steelBeam).toBeDefined()
    expect(rockShield).toBeDefined()
    expect(getBattleRecoilDamageBlockMessage(rockHead, doubleEdge!)).toBe(
      "Rhydon's Rock Head prevented recoil damage!",
    )
    expect(getBattleRecoilDamageBlockMessage(magicGuard, doubleEdge!)).toBe(
      "Clefable's Magic Guard prevented recoil damage!",
    )
    expect(getBattleAbilityRecoilMoveDamageMultiplier(reckless, doubleEdge!)).toBe(
      1.2,
    )

    expect(getBattleRecoilDamageBlockMessage(rockHead, steelBeam!)).toBeUndefined()
    expect(getBattleRecoilDamageBlockMessage(magicGuard, rockShield!)).toBeUndefined()
    expect(getBattleAbilityRecoilMoveDamageMultiplier(reckless, steelBeam!)).toBe(
      1,
    )
  })

  test('soundproof blocks authored sound moves only', () => {
    const soundproof = makeBattlePokemon({
      name: 'Exploud',
      ability: 'soundproof',
    })
    const hyperVoice = getMove('hyper-voice')
    const doubleEdge = getMove('double-edge')

    expect(hyperVoice).toBeDefined()
    expect(doubleEdge).toBeDefined()
    expect(getBattleAbilityMoveBlockMessage(soundproof, hyperVoice!)).toBe(
      "Exploud's Soundproof blocked Hyper Voice!",
    )
    expect(getBattleAbilityMoveBlockMessage(soundproof, doubleEdge!)).toBeUndefined()
  })

  test('bulletproof and overcoat block authored move categories', () => {
    const bulletproof = makeBattlePokemon({
      name: 'Chesnaught',
      ability: 'bulletproof',
    })
    const overcoat = makeBattlePokemon({
      name: 'Mandibuzz',
      ability: 'overcoat',
    })
    const shadowBall = getMove('shadow-ball')
    const sludgeBomb = getMove('sludge-bomb')
    const sleepPowder = getMove('sleep-powder')
    const doubleEdge = getMove('double-edge')

    expect(shadowBall).toBeDefined()
    expect(sludgeBomb).toBeDefined()
    expect(sleepPowder).toBeDefined()
    expect(doubleEdge).toBeDefined()
    expect(getBattleAbilityMoveBlockMessage(bulletproof, shadowBall!)).toBe(
      "Chesnaught's Bulletproof blocked Shadow Ball!",
    )
    expect(getBattleAbilityMoveBlockMessage(bulletproof, sludgeBomb!)).toBe(
      "Chesnaught's Bulletproof blocked Sludge Bomb!",
    )
    expect(getBattleAbilityMoveBlockMessage(bulletproof, doubleEdge!)).toBeUndefined()
    expect(getBattleAbilityMoveBlockMessage(overcoat, sleepPowder!)).toBe(
      "Mandibuzz's Overcoat blocked Sleep Powder!",
    )
    expect(getBattleAbilityMoveBlockMessage(overcoat, shadowBall!)).toBeUndefined()
  })

  test('good as gold and magic bounce block incoming status moves without damage reduction', () => {
    const attacker = makeBattlePokemon({
      name: 'Pikachu',
      stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
    })
    const moldBreaker = makeBattlePokemon({
      name: 'Haxorus',
      ability: 'mold_breaker',
      stats: attacker.stats,
    })
    const gholdengo = makeBattlePokemon({
      name: 'Gholdengo',
      ability: 'good_as_gold',
      types: ['Normal'],
      stats: attacker.stats,
    })
    const espeon = makeBattlePokemon({
      name: 'Espeon',
      ability: 'magic_bounce',
      types: ['Normal'],
      stats: attacker.stats,
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      types: ['Normal'],
      stats: attacker.stats,
    })
    const thunderWave = getMove('thunder-wave')

    expect(thunderWave).toBeDefined()
    expect(getBattleAbilityMoveBlockMessage(gholdengo, thunderWave!, attacker)).toBe(
      "Gholdengo's Good as Gold blocked Thunder Wave!",
    )
    expect(getBattleAbilityMoveBlockMessage(espeon, thunderWave!, attacker)).toBe(
      "Espeon's Magic Bounce bounced back Thunder Wave!",
    )
    expect(getBattleAbilityMoveBlockMessage(gholdengo, thunderWave!, moldBreaker)).toBeUndefined()
    expect(canApplyStatus(gholdengo, 'burn')).toBe(true)

    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      expect(calculateDamage(attacker, gholdengo, 'power', 1, 'normal').damage).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'normal').damage,
      )
      expect(calculateDamage(attacker, espeon, 'power', 1, 'normal').damage).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('shield dust blocks secondary effects without reducing damage', () => {
    const attacker = makeBattlePokemon({
      name: 'Charmander',
      stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
    })
    const dustox = makeBattlePokemon({
      name: 'Dustox',
      ability: 'shield_dust',
      types: ['Normal'],
      stats: attacker.stats,
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      types: ['Normal'],
      stats: attacker.stats,
    })
    const ember = getMove('ember')

    expect(ember).toBeDefined()
    expect(
      getBattleSecondaryEffectBlockMessage({
        defender: dustox,
        move: ember!,
        damageDealt: 20,
      }),
    ).toBe("Dustox's Shield Dust blocked the added effects!")

    const messages = applyEnemyAiMoveEffects({
      move: ember!,
      self: attacker,
      opponent: dustox,
      state: makePveBattleState({ playerTeam: [dustox], enemyTeam: [attacker] }),
      damageDealt: 20,
      random: () => 0,
    })
    expect(messages).toContain("Dustox's Shield Dust blocked the added effects!")
    expect(dustox.status).toBeUndefined()
    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      expect(calculateDamage(attacker, dustox, 'power', 1, 'normal').damage).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('serene grace doubles damaging move added-effect chances without boosting damage', () => {
    const sereneGrace = makeBattlePokemon({
      name: 'Togekiss',
      ability: 'serene_grace',
      types: ['Normal'],
      stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      types: ['Normal'],
      stats: sereneGrace.stats,
    })
    const target = makeBattlePokemon({ name: 'Target', types: ['Normal'] })
    const ember = getMove('ember')

    expect(ember).toBeDefined()
    expect(getBattleAbilitySecondaryEffectChance(sereneGrace, ember!, 10)).toBe(20)
    expect(getBattleAbilitySecondaryEffectChance(baseline, ember!, 10)).toBe(10)

    const boostedTarget = makeBattlePokemon({ name: 'Boosted Target', types: ['Normal'] })
    const boostedMessages = applyEnemyAiMoveEffects({
      move: ember!,
      self: sereneGrace,
      opponent: boostedTarget,
      damageDealt: 20,
      random: () => 0.15,
    })
    expect(boostedMessages).toContain('Boosted Target was inflicted with Burn! [icon:status:burn]')

    const normalMessages = applyEnemyAiMoveEffects({
      move: ember!,
      self: baseline,
      opponent: target,
      damageDealt: 20,
      random: () => 0.15,
    })
    expect(normalMessages).not.toContain('Target was inflicted with Burn! [icon:status:burn]')

    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      expect(calculateDamage(sereneGrace, target, 'power', 1, 'normal').damage).toBe(
        calculateDamage(baseline, target, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('sheer force boosts damaging moves with added effects and suppresses those effects', () => {
    const sheerForce = makeBattlePokemon({
      name: 'Nidoking',
      ability: 'sheer_force',
      types: ['Normal'],
      stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      types: ['Normal'],
      stats: sheerForce.stats,
    })
    const target = makeBattlePokemon({ name: 'Target', types: ['Normal'] })
    const ember = getMove('ember')
    const doubleEdge = getMove('double-edge')

    expect(ember).toBeDefined()
    expect(doubleEdge).toBeDefined()
    expect(getBattleAbilityAddedEffectMoveDamageMultiplier(sheerForce, ember!)).toBe(1.3)
    expect(getBattleAbilityAddedEffectMoveDamageMultiplier(sheerForce, doubleEdge!)).toBe(1)
    expect(suppressesBattleMoveAddedEffectsByAbility(sheerForce, ember!)).toBe(true)

    const messages = applyEnemyAiMoveEffects({
      move: ember!,
      self: sheerForce,
      opponent: target,
      damageDealt: 20,
      random: () => 0,
    })
    expect(messages).not.toContain('Target was burned!')

    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      const boosted = calculateDamage(sheerForce, target, 'power', 1.3, 'normal').damage
      const normal = calculateDamage(baseline, target, 'power', 1, 'normal').damage
      expect(boosted).toBeGreaterThan(normal)
    } finally {
      Math.random = originalRandom
    }
  })

  test('stench grants damaging moves an interrupt chance without boosting damage', () => {
    const stench = makeBattlePokemon({
      name: 'Muk',
      ability: 'stench',
      types: ['Normal'],
      stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      types: ['Normal'],
      stats: stench.stats,
    })
    const target = makeBattlePokemon({ name: 'Target', types: ['Normal'] })
    const doubleEdge = getMove('double-edge')
    const thunderWave = getMove('thunder-wave')
    expect(doubleEdge).toBeDefined()
    expect(thunderWave).toBeDefined()

    expect(getBattleAbilityMoveInterruptChance(stench, doubleEdge!, undefined)).toBe(10)
    expect(getBattleAbilityMoveInterruptChance(stench, thunderWave!, undefined)).toBe(0)
    expect(
      shouldInterruptEnemyAiMove({
        move: doubleEdge!,
        attacker: stench,
        enemyAiMove: { move: doubleEdge! } as any,
        target,
        random: () => 0.05,
      }),
    ).toBe(true)
    expect(
      shouldInterruptEnemyAiMove({
        move: doubleEdge!,
        attacker: baseline,
        enemyAiMove: { move: doubleEdge! } as any,
        target,
        random: () => 0.05,
      }),
    ).toBe(false)

    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      expect(calculateDamage(stench, target, 'power', 1, 'normal').damage).toBe(
        calculateDamage(baseline, target, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('post-damage poison abilities apply statuses without boosting poison damage', () => {
    const stats = { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 }
    const poisonTouch = makeBattlePokemon({
      name: 'Muk',
      ability: 'poison_touch',
      types: ['Normal'],
      stats,
    })
    const toxicChain = makeBattlePokemon({
      name: 'Pecharunt',
      ability: 'toxic_chain',
      types: ['Normal'],
      stats,
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      types: ['Normal'],
      stats,
    })
    const target = makeBattlePokemon({
      name: 'Target',
      types: ['Normal'],
      currentHp: 80,
      maxHp: 100,
    })
    const toxicTarget = makeBattlePokemon({
      name: 'Toxic Target',
      types: ['Normal'],
      currentHp: 80,
      maxHp: 100,
    })
    const steelTarget = makeBattlePokemon({
      name: 'Steel Target',
      types: ['Steel'],
      currentHp: 80,
      maxHp: 100,
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: target,
        attacker: poisonTouch,
        damage: 20,
        previousHp: 100,
        random: () => 0,
      }),
    ).toEqual([
      "Muk's Poison Touch activated!",
      'Target was inflicted with Poison! [icon:status:poison]',
    ])
    expect(target.status?.id).toBe('poison')

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: toxicTarget,
        attacker: toxicChain,
        damage: 20,
        previousHp: 100,
        random: () => 0,
      }),
    ).toEqual([
      "Pecharunt's Toxic Chain activated!",
      'Toxic Target was inflicted with Bad Poison! [icon:status:bad-poison]',
    ])
    expect(toxicTarget.status?.id).toBe('bad-poison')

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: steelTarget,
        attacker: poisonTouch,
        damage: 20,
        previousHp: 100,
        random: () => 0,
      }),
    ).toEqual([])
    expect(steelTarget.status).toBeUndefined()

    const damageTarget = makeBattlePokemon({ name: 'Damage Target', types: ['Normal'], stats })
    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      const baselineDamage = calculateDamage(baseline, damageTarget, 'power', 1, 'poison').damage
      expect(calculateDamage(poisonTouch, damageTarget, 'power', 1, 'poison').damage).toBe(
        baselineDamage,
      )
      expect(calculateDamage(toxicChain, damageTarget, 'power', 1, 'poison').damage).toBe(
        baselineDamage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('Synchronize reflects status without reducing incoming damage', () => {
    const stats = { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 }
    const synchronizer = makeBattlePokemon({
      name: 'Espeon',
      ability: 'synchronize',
      types: ['Normal'],
      stats,
    })
    const attacker = makeBattlePokemon({
      name: 'Magmar',
      types: ['Normal'],
      stats,
    })

    expect(
      applyBattleAbilityStatusReflection({
        pokemon: synchronizer,
        source: attacker,
        statusId: 'burn',
      }),
    ).toEqual([
      "Espeon's Synchronize synchronized Magmar!",
      'Magmar was inflicted with Burn! [icon:status:burn]',
    ])
    expect(attacker.status?.id).toBe('burn')

    const steelTarget = makeBattlePokemon({
      name: 'Steelix',
      types: ['Steel'],
      stats,
    })
    expect(
      applyBattleAbilityStatusReflection({
        pokemon: synchronizer,
        source: steelTarget,
        statusId: 'poison',
      }),
    ).toEqual([])
    expect(steelTarget.status).toBeUndefined()

    const statusedSynchronizer = makeBattlePokemon({
      name: 'Statused Espeon',
      ability: 'synchronize',
      types: ['Normal'],
      stats,
      status: { id: 'burn', counter: 0 },
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      types: ['Normal'],
      stats,
      status: { id: 'burn', counter: 0 },
    })

    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      expect(calculateDamage(attacker, statusedSynchronizer, 'power', 1, 'normal').damage).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('poison puppeteer is explicitly unsupported instead of boosting poison damage', () => {
    const poisonPuppeteer = makeBattlePokemon({
      name: 'Pecharunt',
      ability: 'poison_puppeteer',
      types: ['Normal'],
      stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      types: ['Normal'],
      stats: poisonPuppeteer.stats,
    })
    const target = makeBattlePokemon({
      name: 'Target',
      types: ['Normal'],
      stats: poisonPuppeteer.stats,
    })

    expect(ABILITIES.poison_puppeteer.effects).toContainEqual({
      type: 'battle-no-single-battle-effect',
      reason:
        'Requires confusion to coexist with poison after the holder poisons a target; the current engine models confusion as a main status rather than a volatile secondary status.',
    })

    const originalRandom = Math.random
    try {
      Math.random = () => 0.5
      expect(calculateDamage(poisonPuppeteer, target, 'power', 1, 'poison').damage).toBe(
        calculateDamage(baseline, target, 'power', 1, 'poison').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('noncombat abilities stay non-damaging and non-stat-boosting in single battles', () => {
    const noCombatAbilities = [
      'air_lock',
      'analytic',
      'ball_fetch',
      'battery',
      'cloud_nine',
      'commander',
      'contrary',
      'corrosion',
      'costar',
      'cud_chew',
      'curious_medicine',
      'dancer',
      'friend_guard',
      'heavy_metal',
      'honey_gather',
      'hospitality',
      'hunger_switch',
      'illuminate',
      'infiltrator',
      'light_metal',
      'mega_sol',
      'minds_eye',
      'moody',
      'minus',
      'mycelium_might',
      'plus',
      'power_spot',
      'poison_puppeteer',
      'propeller_tail',
      'punk_rock',
      'screen_cleaner',
      'scrappy',
      'shields_down',
      'simple',
      'spicy_spray',
      'stakeout',
      'stalwart',
      'steadfast',
      'supersweet_syrup',
      'symbiosis',
      'telepathy',
      'trace',
      'unseen_fist',
      'unnerve',
    ] as const

    const attacker = makeBattlePokemon({
      name: 'Attacker',
      stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
    })
    const baseline = makeBattlePokemon({
      name: 'Baseline',
      stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
    })

    const originalRandom = Math.random
    Math.random = () => 0.5
    const baselinePower = calculateDamage(attacker, baseline, 'power', 1, 'normal').damage
    const baselineTech = calculateDamage(attacker, baseline, 'tech', 1, 'normal').damage
    try {
      for (const abilityId of noCombatAbilities) {
        const ability = ABILITIES[abilityId]
        expect(ability).toBeDefined()
        const effects = ability?.effects ?? []
        expect(effects.some((effect) => effect.type === 'battle-no-single-battle-effect')).toBe(true)
        expect(
          effects.some(
            (effect) =>
              effect.type === 'battle-damage-multiplier' ||
              effect.type === 'battle-stat-multiplier',
          ),
        ).toBe(false)

        const holder = makeBattlePokemon({
          name: abilityId,
          ability: abilityId,
          stats: baseline.stats,
        })

        expect(calculateDamage(attacker, holder, 'power', 1, 'normal').damage).toBe(baselinePower)
        expect(calculateDamage(holder, attacker, 'power', 1, 'normal').damage).toBe(baselinePower)
        expect(calculateDamage(holder, attacker, 'tech', 1, 'normal').damage).toBe(baselineTech)
      }
    } finally {
      Math.random = originalRandom
    }
  })

  test('anti-priority abilities block authored priority move ids', () => {
    const armorTail = makeBattlePokemon({
      name: 'Farigiraf',
      ability: 'armor_tail',
    })
    const queenlyMajesty = makeBattlePokemon({
      name: 'Tsareena',
      ability: 'queenly_majesty',
    })
    const dazzling = makeBattlePokemon({
      name: 'Bruxish',
      ability: 'dazzling',
    })
    const quickAttack = getMove('quick-attack')
    const suckerPunch = getMove('sucker-punch')
    const machPunch = getMove('mach-punch')
    const doubleEdge = getMove('double-edge')

    expect(quickAttack).toBeDefined()
    expect(suckerPunch).toBeDefined()
    expect(machPunch).toBeDefined()
    expect(doubleEdge).toBeDefined()
    expect(getBattleAbilityMoveBlockMessage(armorTail, quickAttack!)).toBe(
      "Farigiraf's Armor Tail blocked Quick Attack!",
    )
    expect(getBattleAbilityMoveBlockMessage(queenlyMajesty, suckerPunch!)).toBe(
      "Tsareena's Queenly Majesty blocked Sucker Punch!",
    )
    expect(getBattleAbilityMoveBlockMessage(dazzling, machPunch!)).toBe(
      "Bruxish's Dazzling blocked Mach Punch!",
    )
    expect(getBattleAbilityMoveBlockMessage(armorTail, doubleEdge!)).toBeUndefined()
  })

  test('accuracy abilities modify authored move accuracy instead of damage', () => {
    const compoundEyes = makeBattlePokemon({
      name: 'Butterfree',
      ability: 'compound_eyes',
    })
    const hustle = makeBattlePokemon({
      name: 'Dodrio',
      ability: 'hustle',
    })
    const victoryStar = makeBattlePokemon({
      name: 'Victini',
      ability: 'victory_star',
    })
    const noGuard = makeBattlePokemon({
      name: 'Machamp',
      ability: 'no_guard',
    })
    const targetNoGuard = makeBattlePokemon({
      name: 'Golurk',
      ability: 'no_guard',
    })
    const sandVeil = makeBattlePokemon({
      name: 'Cacturne',
      ability: 'sand_veil',
    })
    const snowCloak = makeBattlePokemon({
      name: 'Froslass',
      ability: 'snow_cloak',
    })
    const tangledFeet = makeBattlePokemon({
      name: 'Pidgeot',
      ability: 'tangled_feet',
      status: { id: 'confusion', counter: 2 },
    })
    const wonderSkin = makeBattlePokemon({
      name: 'Delcatty',
      ability: 'wonder_skin',
    })
    const normalTarget = makeBattlePokemon({ name: 'Target' })
    const damagingMove = { damage: 1, target: 'enemy' as const }
    const statusMove = { damage: 0, target: 'enemy' as const }

    expect(
      getBattleAbilityMoveAccuracy({
        attacker: compoundEyes,
        defender: normalTarget,
        accuracy: 70,
      }),
    ).toBe(91)
    expect(
      getBattleAbilityMoveAccuracy({
        attacker: hustle,
        defender: normalTarget,
        accuracy: 100,
      }),
    ).toBe(80)
    expect(
      getBattleAbilityMoveAccuracy({
        attacker: victoryStar,
        defender: normalTarget,
        accuracy: 80,
      }),
    ).toBe(88)
    expect(
      getBattleAbilityMoveAccuracy({
        attacker: compoundEyes,
        defender: normalTarget,
        accuracy: 90,
      }),
    ).toBe(100)
    expect(
      getBattleAbilityMoveAccuracy({
        attacker: noGuard,
        defender: normalTarget,
        accuracy: 1,
      }),
    ).toBe(100)
    expect(
      getBattleAbilityMoveAccuracy({
        attacker: normalTarget,
        defender: targetNoGuard,
        accuracy: 1,
      }),
    ).toBe(100)
    expect(
      getBattleAbilityMoveAccuracy({
        attacker: normalTarget,
        defender: sandVeil,
        move: damagingMove,
        accuracy: 100,
        weather: 'sandstorm',
      }),
    ).toBe(75)
    expect(
      getBattleAbilityMoveAccuracy({
        attacker: normalTarget,
        defender: snowCloak,
        move: damagingMove,
        accuracy: 100,
        weather: 'snow',
      }),
    ).toBe(75)
    expect(
      getBattleAbilityMoveAccuracy({
        attacker: normalTarget,
        defender: tangledFeet,
        move: damagingMove,
        accuracy: 100,
      }),
    ).toBe(50)
    expect(
      getBattleAbilityMoveAccuracy({
        attacker: normalTarget,
        defender: wonderSkin,
        move: statusMove,
        accuracy: 90,
      }),
    ).toBe(50)
    expect(
      getBattleAbilityMoveAccuracy({
        attacker: normalTarget,
        defender: wonderSkin,
        move: damagingMove,
        accuracy: 90,
      }),
    ).toBe(90)
  })

  test('overcoat prevents residual weather damage', () => {
    const overcoat = makeBattlePokemon({
      name: 'Mandibuzz',
      ability: 'overcoat',
      currentHp: 80,
      maxHp: 100,
      types: ['Dark', 'Flying'],
    })
    const exposed = makeBattlePokemon({
      name: 'Pidgeot',
      currentHp: 80,
      maxHp: 100,
      types: ['Normal', 'Flying'],
    })

    const messages = processEndTurnWeatherDamage({
      playerMon: overcoat,
      enemyMon: exposed,
      playerName: 'Player',
      enemyName: 'Enemy',
      weather: 'sandstorm',
    })

    expect(overcoat.currentHp).toBe(80)
    expect(exposed.currentHp).toBe(74)
    expect(messages).toEqual([
      "Enemy's Pidgeot is buffeted by Sandstorm! [icon:damage:6]",
    ])
  })

  test('Healer cures its own status at end of turn in single battles', () => {
    const healer = makeBattlePokemon({
      name: 'Audino',
      ability: 'healer',
      status: { id: 'burn', counter: 0 },
    })
    const enemy = makeBattlePokemon({ name: 'Enemy' })

    expect(
      processBattleAbilityTurnEndEffects({
        playerMon: healer,
        enemyMon: enemy,
        playerName: 'Player',
        enemyName: 'Enemy',
        random: () => 0.29,
      }),
    ).toEqual(["Player's Audino's Healer cured burn!"])
    expect(healer.status).toBeUndefined()

    const failedRoll = makeBattlePokemon({
      name: 'Chansey',
      ability: 'healer',
      status: { id: 'poison', counter: 0 },
    })
    expect(
      processBattleAbilityTurnEndEffects({
        playerMon: failedRoll,
        enemyMon: enemy,
        playerName: 'Player',
        enemyName: 'Enemy',
        random: () => 0.3,
      }),
    ).toEqual([])
    expect(failedRoll.status?.id).toBe('poison')
  })

  test('Healer no longer reduces incoming damage while statused', () => {
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const attacker = makeBattlePokemon({
        name: 'Attacker',
        stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
      })
      const baseline = makeBattlePokemon({
        name: 'Baseline',
        status: { id: 'burn', counter: 0 },
        stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
      })
      const healer = makeBattlePokemon({
        name: 'Audino',
        ability: 'healer',
        status: { id: 'burn', counter: 0 },
        stats: { hp: 100, attack: 100, defense: 100, specialAttack: 100, specialDefense: 100, speed: 100 },
      })
      expect(
        calculateDamage(attacker, healer, 'power', 1, 'normal').damage,
      ).toBe(
        calculateDamage(attacker, baseline, 'power', 1, 'normal').damage,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('Magic Guard blocks indirect status, weather, and hazard damage', () => {
    const clefable = makeBattlePokemon({
      name: 'Clefable',
      ability: 'magic_guard',
      currentHp: 80,
      maxHp: 100,
      status: { id: 'bad-poison', counter: 2 },
      types: ['Fairy'],
    })
    const poisonState = makePveBattleState({
      playerTeam: [clefable],
      enemyTeam: [makeBattlePokemon({ name: 'Enemy' })],
    })

    const poisonMessages = processEndTurnStatusDamage(poisonState)

    expect(clefable.currentHp).toBe(80)
    expect(clefable.status?.counter).toBe(3)
    expect(poisonMessages).toContain(
      "Clefable's Magic Guard prevented damage from bad-poison.",
    )

    const exposed = makeBattlePokemon({
      name: 'Pidgeot',
      currentHp: 80,
      maxHp: 100,
      types: ['Normal', 'Flying'],
    })
    const weatherMessages = processEndTurnWeatherDamage({
      playerMon: clefable,
      enemyMon: exposed,
      playerName: 'Player',
      enemyName: 'Enemy',
      weather: 'sandstorm',
    })

    expect(clefable.currentHp).toBe(80)
    expect(exposed.currentHp).toBe(74)
    expect(weatherMessages).toEqual([
      "Enemy's Pidgeot is buffeted by Sandstorm! [icon:damage:6]",
    ])

    const firstEnemy = makeBattlePokemon({ id: 'enemy-1', name: 'First Enemy' })
    const magicGuardSwitchIn = makeBattlePokemon({
      id: 'enemy-2',
      name: 'Clefable',
      ability: 'magic_guard',
      currentHp: 80,
      maxHp: 100,
    })
    const switchState = makePveBattleState({
      playerTeam: [makeBattlePokemon({ name: 'Player' })],
      enemyTeam: [firstEnemy, magicGuardSwitchIn],
      activeEnemyIndex: 1,
      secondaryStatuses: [
        {
          id: 'stealth-rock',
          name: 'Stealth Rock',
          triggers: ['switch'],
          effects: [{ type: 'damage', percentMaxHp: 25 }],
          sourceSide: 'player',
          target: 'side',
          targetSide: 'enemy',
        },
      ],
    })

    const switchMessages = processSecondaryStatusesForSwitch(switchState, 'enemy')

    expect(magicGuardSwitchIn.currentHp).toBe(80)
    expect(switchMessages).toEqual([
      "Clefable's Magic Guard prevented damage from Stealth Rock.",
    ])
  })

  test('Bad Dreams damages sleeping pokemon and is blocked by Magic Guard', () => {
    const badDreamsMon = makeBattlePokemon({
      name: 'Misdreavus',
      ability: 'bad_dreams',
      currentHp: 100,
      maxHp: 100,
    })
    const sleeping = makeBattlePokemon({
      name: 'Drowzee',
      currentHp: 100,
      maxHp: 100,
      status: { id: 'sleep', counter: 2 },
    })
    const sleepState = makePveBattleState({
      playerTeam: [badDreamsMon],
      enemyTeam: [sleeping],
    })

    expect(processEndTurnStatusDamage(sleepState)).toContain(
      "Enemy's Drowzee is hurt by Misdreavus's Bad Dreams. [icon:damage:12]",
    )
    expect(sleeping.currentHp).toBe(88)

    const guarded = makeBattlePokemon({
      name: 'Drowzee',
      ability: 'magic_guard',
      currentHp: 100,
      maxHp: 100,
      status: { id: 'sleep', counter: 2 },
    })
    const guardedState = makePveBattleState({
      playerTeam: [badDreamsMon],
      enemyTeam: [guarded],
    })

    expect(processEndTurnStatusDamage(guardedState)).toEqual([
      "Drowzee's Magic Guard prevented damage from sleep.",
    ])
    expect(guarded.currentHp).toBe(100)
  })

  test('terrain setter abilities create terrain and terrain modifies damage', () => {
    const tapuKoko = makeBattlePokemon({
      name: 'Tapu Koko',
      ability: 'electric_surge',
      types: ['Electric', 'Fairy'],
    })
    const ally = makeBattlePokemon({
      name: 'Raichu',
      types: ['Electric'],
    })
    const airborneAlly = makeBattlePokemon({
      name: 'Emolga',
      types: ['Electric', 'Flying'],
    })
    const defender = makeBattlePokemon({
      name: 'Target',
      types: ['Normal'],
    })
    const state = makePveBattleState({
      playerTeam: [tapuKoko],
      enemyTeam: [defender],
    })

    expect(
      processBattleAbilityTerrainSet({
        state,
        pokemon: tapuKoko,
        ownerName: 'Player',
      }),
    ).toEqual(["Tapu Koko's Electric Surge created Electric Terrain!"])
    expect(state.terrain).toMatchObject({
      terrain: 'electric',
      label: 'Electric Terrain',
      source: 'ability',
    })

    const boosted = calculateDamage(
      ally,
      defender,
      'tech',
      1,
      'electric',
      undefined,
      undefined,
      0,
      undefined,
      undefined,
      { terrain: state.terrain?.terrain },
    )

    expect(boosted.terrainMultiplier).toBe(1.3)
    const airborne = calculateDamage(
      airborneAlly,
      defender,
      'tech',
      1,
      'electric',
      undefined,
      undefined,
      0,
      undefined,
      undefined,
      { terrain: state.terrain?.terrain },
    )
    expect(airborne.terrainMultiplier).toBe(1)

    const hadronEngine = makeBattlePokemon({
      name: 'Miraidon',
      ability: 'hadron_engine',
      stats: {
        hp: 120,
        attack: 80,
        defense: 70,
        specialAttack: 100,
        specialDefense: 70,
        speed: 60,
      },
    })
    const neutralState = makePveBattleState({ playerTeam: [hadronEngine] })
    expect(
      processBattleAbilityTerrainSet({
        state: neutralState,
        pokemon: hadronEngine,
      }),
    ).toEqual(["Miraidon's Hadron Engine created Electric Terrain!"])
    expect(neutralState.terrain).toMatchObject({
      terrain: 'electric',
      label: 'Electric Terrain',
      source: 'ability',
    })
  })

  test('terrain sub-rules block grounded status and priority effects', () => {
    const groundedTarget = makeBattlePokemon({
      name: 'Grounded Target',
      types: ['Normal'],
    })
    const flyingTarget = makeBattlePokemon({
      name: 'Flying Target',
      types: ['Normal', 'Flying'],
      stats: {
        hp: 120,
        attack: 80,
        defense: 70,
        specialAttack: 80,
        specialDefense: 70,
        speed: 10,
      },
    })

    expect(
      canApplyStatus(groundedTarget, 'sleep', undefined, { terrain: 'electric' }),
    ).toBe(false)
    expect(
      canApplyStatus(flyingTarget, 'sleep', undefined, { terrain: 'electric' }),
    ).toBe(true)
    expect(
      canApplyStatus(groundedTarget, 'burn', undefined, { terrain: 'misty' }),
    ).toBe(false)
    expect(
      canApplyStatus(groundedTarget, 'confusion', undefined, { terrain: 'misty' }),
    ).toBe(true)

    const quickAttack = getMove('quick-attack')
    const thunderWave = getMove('thunder-wave')
    expect(quickAttack).toBeDefined()
    expect(thunderWave).toBeDefined()

    const attacker = makeBattlePokemon({
      name: 'Attacker',
      stats: {
        hp: 120,
        attack: 80,
        defense: 70,
        specialAttack: 80,
        specialDefense: 70,
        speed: 200,
      },
    })
    expect(
      resolveMoveContest({
        move: quickAttack!,
        attacker,
        defender: groundedTarget,
        terrain: 'psychic',
      }),
    ).toMatchObject({
      configured: true,
      failMove: true,
      message: 'Psychic Terrain blocked Quick Attack!',
    })

    const prankster = makeBattlePokemon({
      name: 'Klefki',
      ability: 'prankster',
    })
    expect(
      resolveMoveContest({
        move: thunderWave!,
        attacker: prankster,
        defender: groundedTarget,
        terrain: 'psychic',
      }),
    ).toMatchObject({
      configured: true,
      failMove: true,
      message: 'Psychic Terrain blocked Thunder Wave!',
    })

    expect(
      resolveMoveContest({
        move: quickAttack!,
        attacker,
        defender: flyingTarget,
        terrain: 'psychic',
      }).failMove,
    ).toBe(false)
  })

  test('Seed Sower creates Grassy Terrain after taking damage', () => {
    const arboliva = makeBattlePokemon({
      name: 'Arboliva',
      ability: 'seed_sower',
      currentHp: 70,
      maxHp: 100,
    })
    const attacker = makeBattlePokemon({ name: 'Attacker' })
    const state = makePveBattleState({
      playerTeam: [attacker],
      enemyTeam: [arboliva],
    })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        state,
        defender: arboliva,
        defenderSide: 'enemy',
        attacker,
        damage: 30,
        previousHp: 100,
      }),
    ).toEqual(["Arboliva's Seed Sower created Grassy Terrain!"])
    expect(state.terrain).toMatchObject({
      terrain: 'grassy',
      label: 'Grassy Terrain',
      source: 'ability',
    })
  })

  test('Protean and Libero change type before attacking once per switch-in', () => {
    const greninja = makeBattlePokemon({
      name: 'Greninja',
      ability: 'protean',
      types: ['Water', 'Dark'],
    })

    expect(
      applyBattleAbilityBeforeAttackTypeChange({
        pokemon: greninja,
        attackType: 'ice',
        damage: 50,
      }),
    ).toEqual(["Greninja's Protean changed it to Ice type!"])
    expect(greninja.types).toEqual(['ice'])
    expect(greninja.battleTypeOverride).toEqual(['ice'])
    expect(greninja.battleTypeOriginalTypes).toEqual(['Water', 'Dark'])
    expect(greninja.battleAbilityState?.beforeAttackTypeChangeActivated).toBe(true)

    expect(
      applyBattleAbilityBeforeAttackTypeChange({
        pokemon: greninja,
        attackType: 'grass',
        damage: 50,
      }),
    ).toEqual([])
    expect(greninja.types).toEqual(['ice'])

    resetBattleTypeChange(greninja)
    processBattleAbilitySwitchOut(greninja)
    expect(
      applyBattleAbilityBeforeAttackTypeChange({
        pokemon: greninja,
        attackType: 'grass',
        damage: 50,
      }),
    ).toEqual(["Greninja's Protean changed it to Grass type!"])
    expect(greninja.types).toEqual(['grass'])

    const cinderace = makeBattlePokemon({
      name: 'Cinderace',
      ability: 'libero',
      types: ['Fire'],
    })
    expect(
      applyBattleAbilityBeforeAttackTypeChange({
        pokemon: cinderace,
        attackType: 'fighting',
        damage: 50,
      }),
    ).toEqual(["Cinderace's Libero changed it to Fighting type!"])
    expect(cinderace.types).toEqual(['fighting'])
  })

  test('Color Change and Mimicry use battle type changes instead of damage boosts', () => {
    const kecleon = makeBattlePokemon({
      name: 'Kecleon',
      ability: 'color_change',
      types: ['Normal'],
    })
    const attacker = makeBattlePokemon({ name: 'Attacker' })

    expect(
      applyBattleAbilityOnDamagedStatStages({
        defender: kecleon,
        attacker,
        damage: 20,
        previousHp: 100,
        attackType: 'ghost',
      }),
    ).toEqual(["Kecleon's Color Change changed it to Ghost type!"])
    expect(kecleon.types).toEqual(['ghost'])
    expect(kecleon.battleTypeOverride).toEqual(['ghost'])
    expect(kecleon.battleTypeOriginalTypes).toEqual(['Normal'])

    const stunfisk = makeBattlePokemon({
      name: 'Stunfisk',
      ability: 'mimicry',
      types: ['Ground', 'Electric'],
    })
    const state = makePveBattleState({
      playerTeam: [stunfisk],
      terrain: {
        terrain: 'grassy',
        label: 'Grassy Terrain',
        source: 'ability',
      },
    })

    expect(processBattleAbilityWeatherTypeChangesForState(state)).toEqual([
      "Stunfisk's Mimicry changed it to Grass type!",
    ])
    expect(stunfisk.types).toEqual(['grass'])
    expect(stunfisk.battleTypeOverride).toEqual(['grass'])
    expect(stunfisk.battleTypeOriginalTypes).toEqual(['Ground', 'Electric'])

    state.terrain = undefined
    expect(processBattleAbilityWeatherTypeChangesForState(state)).toEqual([
      "Stunfisk's Mimicry restored its original type!",
    ])
    expect(stunfisk.types).toEqual(['Ground', 'Electric'])
    expect(stunfisk.battleTypeOverride).toBeUndefined()
  })

  test('Multitype and RKS System use held items for battle type changes', () => {
    const arceus = makeBattlePokemon({
      name: 'Arceus',
      ability: 'multitype',
      types: ['Normal'],
      heldItem: { id: 'fire-plate', name: 'Fire Plate' },
    })
    const silvally = makeBattlePokemon({
      name: 'Silvally',
      ability: 'rks_system',
      types: ['Normal'],
      heldItem: { id: 'water-memory', name: 'Water Memory' },
    })
    const state = makePveBattleState({
      playerTeam: [arceus],
      enemyTeam: [silvally],
    })

    expect(processBattleAbilityWeatherTypeChangesForState(state)).toEqual([
      "Arceus's Multitype changed it to Fire type!",
      "Silvally's RKS System changed it to Water type!",
    ])
    expect(arceus.types).toEqual(['fire'])
    expect(arceus.battleTypeOverride).toEqual(['fire'])
    expect(arceus.battleTypeOriginalTypes).toEqual(['Normal'])
    expect(silvally.types).toEqual(['water'])
    expect(silvally.battleTypeOverride).toEqual(['water'])
    expect(silvally.battleTypeOriginalTypes).toEqual(['Normal'])

    const knockOff = getMove('knock-off')
    expect(knockOff).toBeDefined()
    const attacker = makeBattlePokemon({ name: 'Attacker' })
    const removalState = makePveBattleState({
      playerTeam: [attacker],
      enemyTeam: [arceus],
    })
    expect(
      applyMoveRuntimeEffects({
        move: knockOff!,
        state: removalState,
        side: 'player',
        attacker,
        defender: arceus,
      }).messages,
    ).toEqual([
      "Knock Off removed Arceus's Fire Plate.",
      "Arceus's Multitype changed it to Normal type!",
    ])
    expect(arceus.types).toEqual(['Normal'])
    expect(arceus.battleTypeOverride).toBeUndefined()
  })

  test('Forecast changes active battle type with weather', () => {
    const castform = makeBattlePokemon({
      name: 'Castform',
      ability: 'forecast',
      types: ['Normal'],
    })
    const opponent = makeBattlePokemon({ name: 'Target', types: ['Fire'] })
    const state = makePveBattleState({
      playerTeam: [castform],
      enemyTeam: [opponent],
      weather: {
        slot: 1,
        weather: 'rain',
        label: 'Rain',
      },
    })

    expect(processBattleAbilityWeatherTypeChangesForState(state)).toEqual([
      "Castform's Forecast changed it to Water type!",
    ])
    expect(castform.types).toEqual(['water'])
    expect(castform.battleTypeOverride).toEqual(['water'])
    expect(castform.battleTypeOriginalTypes).toEqual(['Normal'])

    state.weather = {
      slot: 1,
      weather: 'harsh-sunlight',
      label: 'Harsh Sunlight',
    }
    expect(processBattleAbilityWeatherTypeChangesForState(state)).toEqual([
      "Castform's Forecast changed it to Fire type!",
    ])
    expect(castform.types).toEqual(['fire'])
    expect(castform.battleTypeOverride).toEqual(['fire'])

    state.weather = {
      slot: 1,
      weather: 'snow',
      label: 'Snow',
    }
    expect(processBattleAbilityWeatherTypeChangesForState(state)).toEqual([
      "Castform's Forecast changed it to Ice type!",
    ])
    expect(castform.types).toEqual(['ice'])
    expect(castform.battleTypeOverride).toEqual(['ice'])

    state.weather = {
      slot: 1,
      weather: 'clear',
      label: 'Clear',
    }
    expect(processBattleAbilityWeatherTypeChangesForState(state)).toEqual([
      "Castform's Forecast changed it to Normal type!",
    ])
    expect(castform.types).toEqual(['Normal'])
    expect(castform.battleTypeOverride).toBeUndefined()
    expect(castform.battleTypeOriginalTypes).toBeUndefined()
  })
})
