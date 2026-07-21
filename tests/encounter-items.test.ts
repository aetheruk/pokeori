import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import {
  getTypeLureAnswerEquivalent,
  getTypeLureType,
  getTypeLureTier,
  isEncounterItemUsableForPokemon,
  isEncounterUtilityItem,
  isMidEncounterUsableItem,
  isPreEncounterOnlyItem,
  isTypeLureItem,
} from '@/data/items/types'
import {
  applyCatchAbilityModifier,
  getBallQuestionBonus,
  getHardBallCatchRate,
  getSecondChanceRate,
  getThrowQuality,
  getThrowStageBonus,
} from '@/utilities/pokemon/catch-balance'
import {
  buildEncounterQte,
  buildScareQteDecoyFormIds,
  completeEncounterQteState,
  type EncounterQteState,
  serializeEncounterQte,
  shouldRollEncounterQte,
} from '@/utilities/pokemon/encounter-qte'
import {
  getFocusCircleProgress,
  isFocusCircleGesture,
  isFocusCircleProgressComplete,
} from '@/utilities/pokemon/focus-qte'

function getItem(itemId: string) {
  const item = items.find((entry) => entry.id === itemId)
  if (!item) throw new Error(`Missing item fixture: ${itemId}`)
  return item
}

describe('encounter item filtering', () => {
  test('mid-encounter item helpers exclude quest misc items and pre-encounter repels', () => {
    const bugLure = getItem('bug-lure')
    const advancedBugLure = getItem('advanced-bug-lure')
    const masterBugLure = getItem('master-bug-lure')
    const flyingLure = getItem('flying-lure')
    const chaosStone = getItem('chaos-stone')
    const escapeRope = getItem('escape-rope')
    const redBerryCandy = getItem('red-berry-candy')
    const repel = getItem('repel')
    const dayCareFenceWood = getItem('day-care-fence-wood')
    const dayCareClayBrick = getItem('day-care-clay-brick')
    const hikerBoots = getItem('hiker-boots')
    const hikerClothes = getItem('hiker-clothes')
    const hikerGloves = getItem('hiker-gloves')
    const lureBall = getItem('lure-ball')

    expect(dayCareFenceWood.name).toBe('Sturdy Fence')
    expect(dayCareClayBrick).toMatchObject({
      name: 'Kiln-Fired Brick',
      spriteId: 'brick',
    })
    expect(isTypeLureItem(bugLure)).toBe(true)
    expect(isTypeLureItem(advancedBugLure)).toBe(true)
    expect(isTypeLureItem(masterBugLure)).toBe(true)
    expect(getTypeLureType(bugLure.id)).toBe('bug')
    expect(getTypeLureType(advancedBugLure.id)).toBe('bug')
    expect(getTypeLureType(masterBugLure.id)).toBe('bug')
    expect(getTypeLureTier(bugLure.id)).toBe(1)
    expect(getTypeLureTier(advancedBugLure.id)).toBe(2)
    expect(getTypeLureTier(masterBugLure.id)).toBe(3)
    expect(getTypeLureAnswerEquivalent(bugLure.id)).toBe(2.5)
    expect(getTypeLureAnswerEquivalent(advancedBugLure.id)).toBe(3.5)
    expect(getTypeLureAnswerEquivalent(masterBugLure.id)).toBe(5)
    expect(isTypeLureItem(lureBall)).toBe(false)

    expect(isMidEncounterUsableItem(bugLure)).toBe(true)
    expect(isMidEncounterUsableItem(flyingLure)).toBe(true)
    expect(isMidEncounterUsableItem(chaosStone)).toBe(true)
    expect(isMidEncounterUsableItem(escapeRope)).toBe(true)
    expect(isMidEncounterUsableItem(redBerryCandy)).toBe(true)
    expect(isMidEncounterUsableItem(repel)).toBe(false)
    expect(isPreEncounterOnlyItem(repel)).toBe(true)

    expect(isEncounterUtilityItem(repel)).toBe(true)
    expect(isEncounterUtilityItem(redBerryCandy)).toBe(true)
    expect(isEncounterUtilityItem(dayCareFenceWood)).toBe(false)
    expect(isMidEncounterUsableItem(dayCareFenceWood)).toBe(false)
    expect(isEncounterUtilityItem(dayCareClayBrick)).toBe(false)
    expect(isMidEncounterUsableItem(dayCareClayBrick)).toBe(false)
    expect(hikerBoots).toMatchObject({
      name: 'Sturdy Hiking Boots',
      spriteId: 'hiker-boots',
    })
    expect(hikerClothes).toMatchObject({
      name: 'Trail Clothes',
      spriteId: 'hiker-clothes',
    })
    expect(hikerGloves).toMatchObject({
      name: 'Climbing Gloves',
      spriteId: 'hiker-gloves',
    })
    expect(isMidEncounterUsableItem(hikerBoots)).toBe(false)
    expect(isMidEncounterUsableItem(hikerClothes)).toBe(false)
    expect(isMidEncounterUsableItem(hikerGloves)).toBe(false)
  })

  test('type lures only match Pokemon that have the lure type', () => {
    const bugLure = getItem('bug-lure')
    const flyingLure = getItem('flying-lure')
    const chaosStone = getItem('chaos-stone')
    const redBerryCandy = getItem('red-berry-candy')

    expect(isEncounterItemUsableForPokemon(bugLure, ['Normal', 'Flying'])).toBe(false)
    expect(isEncounterItemUsableForPokemon(flyingLure, ['Normal', 'Flying'])).toBe(true)
    expect(isEncounterItemUsableForPokemon(bugLure, ['Bug', 'Poison'])).toBe(true)
    expect(isEncounterItemUsableForPokemon(chaosStone, ['Normal', 'Flying'])).toBe(true)
    expect(isEncounterItemUsableForPokemon(redBerryCandy, ['Normal', 'Flying'])).toBe(true)
  })
})

describe('catch rate helpers', () => {
  test('precision throw quality maps ring timing to stage bonuses', () => {
    expect(getThrowQuality({ ringScale: 0.05, aimOffset: 1 })).toBe('excellent')
    expect(getThrowStageBonus('excellent')).toBe(2)
    expect(getThrowQuality({ ringScale: 0.12, aimOffset: 1 })).toBe('great')
    expect(getThrowStageBonus('great')).toBe(1)
    expect(getThrowQuality({ ringScale: 0.5, aimOffset: 1 })).toBe('nice')
    expect(getThrowStageBonus('nice')).toBe(0)
    expect(getThrowQuality({ ringScale: 0.8, aimOffset: 0 })).toBe('poor')
    expect(getThrowStageBonus('poor')).toBe(-1)
  })

  test('second chance chance scales by Explorer level and encounter item modifiers', () => {
    expect(getSecondChanceRate(1)).toBe(10)
    expect(getSecondChanceRate(27)).toBe(10)
    expect(getSecondChanceRate(28)).toBe(15)
    expect(getSecondChanceRate(45)).toBe(15)
    expect(getSecondChanceRate(46)).toBe(18)
    expect(getSecondChanceRate(71)).toBe(18)
    expect(getSecondChanceRate(72)).toBe(20)
    expect(getSecondChanceRate(72, 10)).toBe(30)
  })

  test('net ball bonus applies to Bug Pokemon but not Water-only Pokemon', () => {
    const baseInput = {
      ballId: 'net-ball',
      turnCount: 1,
      targetLevel: 10,
    }

    expect(
      getBallQuestionBonus({
        ...baseInput,
        species: {
          types: ['Bug', 'Poison'],
          is_baby: false,
          weight: 32,
          stats: { speed: 50 },
        },
      }),
    ).toBe(8)
    expect(
      getBallQuestionBonus({
        ...baseInput,
        species: {
          types: ['Water'],
          is_baby: false,
          weight: 32,
          stats: { speed: 50 },
        },
      }),
    ).toBe(0)
  })

  test('Ultra Beast hard catch rates override normal ball bonuses', () => {
    expect(getHardBallCatchRate({ ballId: 'poke-ball', isUltraBeast: true })).toBe(0.255)
    expect(getHardBallCatchRate({ ballId: 'great-ball', isUltraBeast: true })).toBe(0.255)
    expect(getHardBallCatchRate({ ballId: 'beast-ball', isUltraBeast: true })).toBe(0.255)
    expect(getHardBallCatchRate({ ballId: 'master-ball', isUltraBeast: true })).toBeUndefined()
  })

  test('Beast Ball hard catch rate applies against non-Ultra Beast Pokemon', () => {
    expect(getBallQuestionBonus({
      ballId: 'beast-ball',
      species: {
        types: ['Normal'],
        is_baby: false,
        weight: 32,
        stats: { speed: 50 },
      },
      turnCount: 1,
      targetLevel: 10,
      isUltraBeast: false,
    })).toBe(0)
    expect(getHardBallCatchRate({ ballId: 'beast-ball', isUltraBeast: false })).toBe(0.255)
    expect(getHardBallCatchRate({ ballId: 'poke-ball', isUltraBeast: false })).toBeUndefined()
  })

  test('Rocket Ball only catches Shadow Pokemon at the standard Poke Ball rate', () => {
    expect(getHardBallCatchRate({ ballId: 'rocket-ball', isShadow: false })).toBe(0)
    expect(getHardBallCatchRate({ ballId: 'poke-ball', isShadow: true })).toBe(0)
    expect(getHardBallCatchRate({ ballId: 'master-ball', isShadow: true })).toBe(0)
    expect(getHardBallCatchRate({ ballId: 'rocket-ball', isShadow: true })).toBeUndefined()
  })

  test('type charmer catch abilities apply only to matching encounter types', () => {
    const bugCharmer = {
      type: 'catch',
      value: 1.05,
      criteria: { type: ['Bug'] },
    }

    expect(
      applyCatchAbilityModifier(100, {
        activeAbility: bugCharmer,
        formId: '13',
        locationId: 'viridian-forest',
        types: ['Bug', 'Poison'],
      }),
    ).toBe(105)
    expect(
      applyCatchAbilityModifier(100, {
        activeAbility: bugCharmer,
        formId: '25',
        locationId: 'viridian-forest',
        types: ['Electric'],
      }),
    ).toBe(100)
  })
})

describe('encounter QTE helpers', () => {
  test('focus circle gesture accepts closed loops around the centered Pokemon only', () => {
    const center = { x: 120, y: 120 }
    const loop = Array.from({ length: 34 }, (_, index) => {
      const angle = (Math.PI * 2 * index) / 33
      return {
        x: center.x + Math.cos(angle) * 84,
        y: center.y + Math.sin(angle) * 84,
      }
    })
    const slash = [
      { x: 30, y: 30 },
      { x: 60, y: 55 },
      { x: 100, y: 85 },
      { x: 150, y: 130 },
      { x: 190, y: 170 },
    ]
    const offCenterLoop = loop.map((point) => ({ x: point.x + 130, y: point.y }))

    expect(isFocusCircleGesture(loop, center)).toBe(true)
    expect(isFocusCircleGesture(slash, center)).toBe(false)
    expect(isFocusCircleGesture(offCenterLoop, center)).toBe(false)
    expect(getFocusCircleProgress(loop, center)).toBeGreaterThan(0.85)
    expect(isFocusCircleProgressComplete(loop, center)).toBe(true)
  })

  test('QTE prompt cadence waits for quiz progress and then rolls or forces', () => {
    expect(shouldRollEncounterQte({ normalQuestionsSinceLastQte: 0 })).toBe(false)
    expect(shouldRollEncounterQte({ normalQuestionsSinceLastQte: 1 })).toBe(false)
    expect(
      shouldRollEncounterQte({
        normalQuestionsSinceLastQte: 2,
        shieldActive: true,
        random: () => 0,
      }),
    ).toBe(false)
    expect(
      shouldRollEncounterQte({
        normalQuestionsSinceLastQte: 2,
        shieldActive: false,
        random: () => 0.29,
      }),
    ).toBe(true)
    expect(
      shouldRollEncounterQte({
        normalQuestionsSinceLastQte: 2,
        shieldActive: false,
        random: () => 0.7,
      }),
    ).toBe(false)
    expect(
      shouldRollEncounterQte({
        normalQuestionsSinceLastQte: 3,
        shieldActive: false,
        random: () => 0.99,
      }),
    ).toBe(true)
  })

  test('QTE is built from eligible types', () => {
    const qte = buildEncounterQte({
      inventory: {},
      items,
      random: () => 0,
    })

    expect(qte).toBeDefined()
    expect(qte?.type).toBe('focus')
  })

  test('chase QTE is built with a tap target', () => {
    const qte = buildEncounterQte({
      inventory: {},
      items,
      random: () => 0.8,
    })

    expect(qte).toBeDefined()
    expect(qte?.type).toBe('chase')
    expect(qte?.tapTarget).toBe(12)
  })

  test('scare QTE decoys come from the same catch location excluding the active form', () => {
    const decoys = buildScareQteDecoyFormIds({
      activeFormId: '16',
      encounterPool: [
        { speciesId: 16, formId: '16' },
        { speciesId: 19, formId: '19' },
        { speciesId: 19, formId: '10091' },
      ],
      random: () => 0,
    })

    expect(decoys).toHaveLength(6)
    expect(decoys).not.toContain('16')
    expect(
      decoys.every((formId) => formId === '19' || formId === '10091'),
    ).toBe(true)
  })

  test('scare QTE decoys fall back to Unown forms for single-catch encounters', () => {
    const decoys = buildScareQteDecoyFormIds({
      activeFormId: '143',
      encounterPool: [{ speciesId: 143, formId: '143' }],
      random: () => 0,
    })

    expect(decoys).toHaveLength(6)
    expect(
      decoys.every((formId) => formId === '201' || formId.startsWith('201-')),
    ).toBe(true)
  })

  test('active scare QTE serializes decoy form ids for the client', () => {
    const qte: EncounterQteState = {
      id: 'qte-scare',
      type: 'scare',
      status: 'active',
      decoyFormIds: ['19', '10091'],
    }

    expect(serializeEncounterQte(qte)?.decoyFormIds).toEqual(['19', '10091'])
  })

  test('active chase QTE serializes tap target for the client', () => {
    const qte: EncounterQteState = {
      id: 'qte-chase',
      type: 'chase',
      status: 'active',
      tapTarget: 12,
    }

    expect(serializeEncounterQte(qte)?.tapTarget).toBe(12)
  })

  test('calm QTE uses owned berries and succeeds without consuming inventory', () => {
    const inventory = {
      'oran-berry': 1,
      'cheri-berry': 1,
      'chesto-berry': 1,
    }
    const rolls = [0.99, 0, 0, 0, 0]
    const qte = buildEncounterQte({
      inventory,
      items,
      random: () => rolls.shift() ?? 0,
    })

    expect(qte?.type).toBe('calm')
    expect(qte?.berryOptions).toHaveLength(3)
    completeEncounterQteState(qte!, { type: 'calm', berryId: qte!.correctBerryId })
    expect(qte?.success).toBe(true)
    expect(qte?.catchStageBonus).toBe(1)
    expect('xpBoost' in qte!).toBe(false)
    expect(inventory['oran-berry']).toBe(1)
  })

  test('focus, chase, and scare QTEs use their configured catch stage bonuses', () => {
    const focusQte: EncounterQteState = {
      id: 'qte-focus',
      type: 'focus' as const,
      status: 'active' as const,
    }
    const chaseQte: EncounterQteState = {
      id: 'qte-chase',
      type: 'chase' as const,
      status: 'active' as const,
      tapTarget: 12,
    }
    const scareQte: EncounterQteState = {
      id: 'qte-scare',
      type: 'scare' as const,
      status: 'active' as const,
    }

    completeEncounterQteState(focusQte, { type: 'focus', completedCircles: 3 })
    completeEncounterQteState(chaseQte, { type: 'chase', tapCount: 12 })
    completeEncounterQteState(scareQte, { type: 'scare', tappedDecoys: 6, hitTarget: false })
    expect(focusQte.success).toBe(true)
    expect(focusQte.catchStageBonus).toBe(1.5)
    expect(chaseQte.success).toBe(true)
    expect(chaseQte.catchStageBonus).toBe(1.5)
    expect(scareQte.success).toBe(true)
    expect(scareQte.catchStageBonus).toBe(2)
  })

  test('failed QTE has no catch or XP bonus', () => {
    const qte: EncounterQteState = {
      id: 'qte-1',
      type: 'scare' as const,
      status: 'active' as const,
    }

    completeEncounterQteState(qte, { type: 'scare', tappedDecoys: 6, hitTarget: true })
    expect(qte.success).toBe(false)
    expect(qte.catchStageBonus).toBe(0)
    expect('xpBoost' in qte).toBe(false)
  })
})
