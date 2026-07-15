import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import { getSkillGuideUnlocks } from '@/data/skills/guide'
import {
  calculateContentSkillXp,
  calculatePokemonContentSkillXp,
  getAveragePokemonBaseExperienceXpModifier,
  getContentSkillBaseXp,
  getPokemonBaseExperienceXpModifier,
} from '@/data/skills/xp'
import {
  getTrainerBattleItemUseCount,
  getTrainerBattleMoveUseCount,
  getBattlePowerUnlockLevel,
  getEnemyBattleMoveUseCount,
  getExplorerEncounterItemLimit,
  getExplorerVoyageSlotCount,
  getResearcherMoveSlotCount,
  getEffectivePokemonIvs,
  getEquipableTitleIds,
  getResearcherAbilityRolls,
  getResearcherHiddenAbilitiesUnlocked,
  getResearcherShinyModifier,
  getSkillTitleId,
  getSkillTitleName,
  getTrainerIvCap,
  resolveTrainerBattleItemUseLimit,
  resolveTrainerBattleMoveUseLimit,
  resolveEnemyBattleMoveUseLimit,
  canUseItemWithSkillRequirements,
  getItemSkillLockReason,
  getUnlockedSkillTitleIds,
  validateBattlePowerSkillRequirement,
} from '@/utilities/skills/unlocks'
import {
  calculateLevelUpSkillXp,
  getFieldObservationResearchXpBaseAmount,
  getFieldObservationResearchXpAmount,
  getMaxResearchLevelForXp,
  getPokemonResearchLevel,
  getPokemonResearchLevelItemRewards,
  getPokemonResearchLevelTmUnlocks,
  getRecoverableResearchTmRewards,
  shouldAwardFieldObservationResearchXp,
} from '@/utilities/research/research-levels'
import { getFieldObservationPrimaryMaterialLimit } from '@/utilities/artisan/material-drops'

describe('skill unlock helpers', () => {
  test('content skill XP uses flat level scaling and skill modifiers', () => {
    expect(getContentSkillBaseXp(1)).toBe(20)
    expect(getContentSkillBaseXp(20)).toBe(58)
    expect(getContentSkillBaseXp(100)).toBe(218)
    expect(getContentSkillBaseXp(200)).toBe(218)
    expect(calculateContentSkillXp('battling', 59)).toBe(136)
    expect(calculateContentSkillXp('catching', 20)).toBe(104)
    expect(calculateContentSkillXp('artisan', 10)).toBe(38)
    expect(calculateContentSkillXp('researching', 10, 0.4)).toBe(22)
  })

  test('Pokemon base experience applies a bounded skill XP modifier', () => {
    expect(getPokemonBaseExperienceXpModifier(undefined)).toBe(1)
    expect(getPokemonBaseExperienceXpModifier(0)).toBe(1)
    expect(getPokemonBaseExperienceXpModifier(160)).toBe(1)
    expect(getPokemonBaseExperienceXpModifier(40)).toBeCloseTo(0.8875)
    expect(getPokemonBaseExperienceXpModifier(306)).toBeCloseTo(1.136875)
    expect(getPokemonBaseExperienceXpModifier(608)).toBe(1.15)
    expect(calculatePokemonContentSkillXp('catching', 20, 50)).toBe(94)
    expect(calculatePokemonContentSkillXp('catching', 20, 50, 0.5)).toBe(47)
    expect(
      getAveragePokemonBaseExperienceXpModifier([40, 160, 608]),
    ).toBeCloseTo(1.0125)
  })

  test('researcher move slots unlock at authored levels', () => {
    expect(getResearcherMoveSlotCount(1)).toBe(0)
    expect(getResearcherMoveSlotCount(9)).toBe(0)
    expect(getResearcherMoveSlotCount(10)).toBe(1)
    expect(getResearcherMoveSlotCount(19)).toBe(1)
    expect(getResearcherMoveSlotCount(20)).toBe(2)
    expect(getResearcherMoveSlotCount(44)).toBe(2)
    expect(getResearcherMoveSlotCount(45)).toBe(3)
    expect(getResearcherMoveSlotCount(59)).toBe(3)
    expect(getResearcherMoveSlotCount(60)).toBe(4)
    expect(getResearcherMoveSlotCount(100)).toBe(4)
  })

  test('trainer battle item uses unlock at authored levels and respect battle caps', () => {
    expect(getTrainerBattleItemUseCount(1)).toBe(2)
    expect(getTrainerBattleItemUseCount(16)).toBe(2)
    expect(getTrainerBattleItemUseCount(17)).toBe(3)
    expect(getTrainerBattleItemUseCount(37)).toBe(3)
    expect(getTrainerBattleItemUseCount(38)).toBe(4)
    expect(getTrainerBattleItemUseCount(51)).toBe(4)
    expect(getTrainerBattleItemUseCount(52)).toBe(5)
    expect(getTrainerBattleItemUseCount(100)).toBe(5)

    expect(resolveTrainerBattleItemUseLimit(60)).toBe(5)
    expect(resolveTrainerBattleItemUseLimit(60, 3)).toBe(3)
    expect(resolveTrainerBattleItemUseLimit(60, 10)).toBe(5)
    expect(resolveTrainerBattleItemUseLimit(60, 0)).toBe(0)
  })

  test('trainer battle move uses unlock at authored levels and respect battle caps', () => {
    expect(getTrainerBattleMoveUseCount(1)).toBe(2)
    expect(getTrainerBattleMoveUseCount(9)).toBe(2)
    expect(getTrainerBattleMoveUseCount(10)).toBe(2)
    expect(getTrainerBattleMoveUseCount(20)).toBe(2)
    expect(getTrainerBattleMoveUseCount(21)).toBe(3)
    expect(getTrainerBattleMoveUseCount(41)).toBe(3)
    expect(getTrainerBattleMoveUseCount(42)).toBe(4)
    expect(getTrainerBattleMoveUseCount(58)).toBe(4)
    expect(getTrainerBattleMoveUseCount(59)).toBe(5)
    expect(getTrainerBattleMoveUseCount(100)).toBe(5)

    expect(resolveTrainerBattleMoveUseLimit(60)).toBe(5)
    expect(resolveTrainerBattleMoveUseLimit(60, 3)).toBe(3)
    expect(resolveTrainerBattleMoveUseLimit(60, 10)).toBe(5)
    expect(resolveTrainerBattleMoveUseLimit(60, 0)).toBe(0)
  })

  test('enemy battle move uses derive from highest enemy level unless overridden', () => {
    expect(getEnemyBattleMoveUseCount([20, 45])).toBe(4)
    expect(getEnemyBattleMoveUseCount([1, 9, 10])).toBe(2)
    expect(getEnemyBattleMoveUseCount([21])).toBe(3)
    expect(getEnemyBattleMoveUseCount([42])).toBe(4)
    expect(getEnemyBattleMoveUseCount([59])).toBe(5)
    expect(getEnemyBattleMoveUseCount([])).toBe(2)

    expect(resolveEnemyBattleMoveUseLimit([45])).toBe(4)
    expect(resolveEnemyBattleMoveUseLimit([45], 1)).toBe(1)
    expect(resolveEnemyBattleMoveUseLimit([45], 10)).toBe(10)
    expect(resolveEnemyBattleMoveUseLimit([45], 0)).toBe(0)
  })

  test('trainer IV cap preserves natural IVs while capping effective values', () => {
    const naturalIvs = {
      hp: 31,
      attack: 25,
      defense: 10,
      specialAttack: 0,
      specialDefense: 18,
      speed: 31,
    }

    expect(getTrainerIvCap(1)).toBe(10)
    expect(getTrainerIvCap(9)).toBe(10)
    expect(getTrainerIvCap(10)).toBe(15)
    expect(getTrainerIvCap(19)).toBe(15)
    expect(getTrainerIvCap(20)).toBe(20)
    expect(getTrainerIvCap(29)).toBe(20)
    expect(getTrainerIvCap(30)).toBe(25)
    expect(getTrainerIvCap(39)).toBe(25)
    expect(getTrainerIvCap(40)).toBe(30)
    expect(getTrainerIvCap(49)).toBe(30)
    expect(getTrainerIvCap(50)).toBe(31)
    expect(getTrainerIvCap(100)).toBe(31)
    expect(getEffectivePokemonIvs(naturalIvs, 1)).toEqual({
      hp: 10,
      attack: 10,
      defense: 10,
      specialAttack: 0,
      specialDefense: 10,
      speed: 10,
    })
    expect(getEffectivePokemonIvs(naturalIvs, 50)).toEqual(naturalIvs)
  })

  test('researcher ability and shiny bonuses scale modestly', () => {
    expect(getResearcherAbilityRolls(1)).toBe(1)
    expect(getResearcherAbilityRolls(26)).toBe(1)
    expect(getResearcherAbilityRolls(27)).toBe(1)
    expect(getResearcherAbilityRolls(60)).toBe(2)
    expect(getResearcherAbilityRolls(90)).toBe(3)
    expect(getResearcherHiddenAbilitiesUnlocked(26)).toBe(false)
    expect(getResearcherHiddenAbilitiesUnlocked(27)).toBe(true)
    expect(getResearcherShinyModifier(1)).toBe(1)
    expect(getResearcherShinyModifier(80)).toBe(1)
    expect(getResearcherShinyModifier(81)).toBe(1.1)
    expect(getResearcherShinyModifier(100)).toBe(1.5)
  })

  test('explorer encounter item uses unlock at stepped levels', () => {
    expect(getExplorerEncounterItemLimit(1)).toBe(1)
    expect(getExplorerEncounterItemLimit(24)).toBe(1)
    expect(getExplorerEncounterItemLimit(25)).toBe(2)
    expect(getExplorerEncounterItemLimit(50)).toBe(3)
    expect(getExplorerEncounterItemLimit(80)).toBe(4)
    expect(getExplorerEncounterItemLimit(95)).toBe(5)
  })

  test('explorer active voyages unlock at authored levels', () => {
    expect(getExplorerVoyageSlotCount(1)).toBe(1)
    expect(getExplorerVoyageSlotCount(21)).toBe(1)
    expect(getExplorerVoyageSlotCount(22)).toBe(2)
    expect(getExplorerVoyageSlotCount(45)).toBe(2)
    expect(getExplorerVoyageSlotCount(46)).toBe(3)
    expect(getExplorerVoyageSlotCount(70)).toBe(3)
    expect(getExplorerVoyageSlotCount(71)).toBe(4)
    expect(getExplorerVoyageSlotCount(92)).toBe(4)
    expect(getExplorerVoyageSlotCount(93)).toBe(5)
    expect(getExplorerVoyageSlotCount(100)).toBe(5)
  })

  test('pokemon research thresholds and field observation XP scale as authored', () => {
    expect(getMaxResearchLevelForXp(9)).toBe(0)
    expect(getMaxResearchLevelForXp(10)).toBe(1)
    expect(getMaxResearchLevelForXp(49)).toBe(1)
    expect(getMaxResearchLevelForXp(50)).toBe(2)
    expect(getMaxResearchLevelForXp(150)).toBe(3)
    expect(getMaxResearchLevelForXp(350)).toBe(4)
    expect(getMaxResearchLevelForXp(999)).toBe(4)
    expect(getMaxResearchLevelForXp(1000)).toBe(5)
    expect(calculateLevelUpSkillXp(5, 100)).toBe(0)
    expect(
      getPokemonResearchLevel(
        { '25': { '25': { researchLevel: 4 } } },
        25,
        '25',
      ),
    ).toBe(4)
    expect(getFieldObservationResearchXpBaseAmount(1)).toBe(1)
    expect(getFieldObservationResearchXpBaseAmount(17)).toBe(1)
    expect(getFieldObservationResearchXpBaseAmount(18)).toBe(2)
    expect(getFieldObservationResearchXpBaseAmount(50)).toBe(3)
    expect(getFieldObservationResearchXpBaseAmount(70)).toBe(4)
    expect(getFieldObservationResearchXpBaseAmount(100)).toBe(5)
    expect(getFieldObservationResearchXpAmount(1, () => 0.21)).toBe(1)
    expect(getFieldObservationResearchXpAmount(1, () => 0.19)).toBe(2)
    expect(getFieldObservationResearchXpAmount(30, () => 0.19)).toBe(3)
    expect(shouldAwardFieldObservationResearchXp(() => 0.49)).toBe(true)
    expect(shouldAwardFieldObservationResearchXp(() => 0.5)).toBe(true)
  })

  test('pokemon research level item rewards resolve crossed levels for a form', () => {
    expect(
      getPokemonResearchLevelItemRewards('25', 0, 3, [
        { formId: '25', level: 1, itemId: 'tm-quick-attack' },
        { formId: '25', level: 3, itemId: 'tm-thunder-wave', quantity: 2 },
        { formId: '1', level: 3, itemId: 'tm-vine-whip' },
        { formId: '25', level: 4, itemId: 'tm-agility' },
      ]),
    ).toEqual([
      {
        type: 'item',
        targetId: 'tm-quick-attack',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'tm-thunder-wave',
        quantity: 2,
        dropChance: 100,
      },
    ])
  })

  test('pokemon research level TM unlock notes list all authored TMs for a form', () => {
    expect(
      getPokemonResearchLevelTmUnlocks('25', [
        { formId: '25', level: 3, itemId: 'tm-thunder-wave' },
        { formId: '25', level: 1, itemId: 'rare-candy' },
        { formId: '1', level: 1, itemId: 'tm-vine-whip' },
        { formId: '25', level: 1, itemId: 'tm-quick-attack' },
      ]),
    ).toEqual([
      { formId: '25', level: 1, itemId: 'tm-quick-attack' },
      { formId: '25', level: 3, itemId: 'tm-thunder-wave' },
    ])
  })

  test('recoverable research TMs only include missing rewards from achieved research levels', () => {
    const rewards = [
      { formId: '25', level: 1, itemId: 'tm-quick-attack' },
      { formId: '25', level: 3, itemId: 'tm-thunder-wave' },
      { formId: '25', level: 4, itemId: 'tm-agility' },
      { formId: '1', level: 1, itemId: 'rare-candy' },
      { formId: '4', level: 1, itemId: 'tm-ember' },
    ]
    const pokedex = {
      '25': {
        '25': { caught: true, researchXp: 200, researchLevel: 3 },
      },
      '4': {
        '4': { caught: true, researchXp: 25, researchLevel: 1 },
      },
    }

    expect(
      getRecoverableResearchTmRewards(
        pokedex,
        { 'tm-quick-attack': 1 },
        rewards,
      ).map((reward) => reward.itemId),
    ).toEqual(['tm-ember', 'tm-thunder-wave'])
  })

  test('recoverable research TMs collapse duplicate TM rewards across forms', () => {
    const rewards = [
      { formId: '4', level: 1, itemId: 'tm-ember' },
      { formId: '5', level: 1, itemId: 'tm-ember' },
    ]
    const pokedex = {
      '4': {
        '4': { caught: true, researchXp: 25, researchLevel: 1 },
      },
      '5': {
        '5': { caught: true, researchXp: 25, researchLevel: 1 },
      },
    }

    expect(getRecoverableResearchTmRewards(pokedex, {}, rewards)).toEqual([
      { itemId: 'tm-ember', quantity: 1, formIds: ['4', '5'] },
    ])
  })

  test('recoverable research TMs ignore rewards incompatible with the research form', () => {
    const rewards = [
      { formId: '4', level: 1, itemId: 'tm-ember' },
      { formId: '4', level: 1, itemId: 'tm-water-gun' },
      { formId: '4', level: 1, itemId: 'tm-vine-whip' },
    ]
    const pokedex = {
      '4': {
        '4': { caught: true, researchXp: 25, researchLevel: 1 },
      },
    }

    expect(getRecoverableResearchTmRewards(pokedex, {}, rewards)).toEqual([
      { itemId: 'tm-ember', quantity: 1, formIds: ['4'] },
    ])
  })

  test('recoverable research TMs ignore uncaught or unearned research rows', () => {
    const rewards = [
      { formId: '1', level: 1, itemId: 'tm-vine-whip' },
      { formId: '4', level: 1, itemId: 'tm-ember' },
      { formId: '7', level: 1, itemId: 'tm-water-gun' },
    ]
    const pokedex = {
      '1': {
        '1': {
          seen: true,
          caught: false,
          totalCaught: 0,
          researchXp: 20,
          researchLevel: 1,
        },
      },
      '4': {
        '4': { caught: true, researchXp: 0, researchLevel: 1 },
      },
      '7': {
        '7': { caught: true, researchXp: 9, researchLevel: 1 },
      },
    }

    expect(getRecoverableResearchTmRewards(pokedex, {}, rewards)).toEqual([])
  })

  test('field observation primary material caps scale with Researcher level', () => {
    expect(getFieldObservationPrimaryMaterialLimit(1)).toBe(3)
    expect(getFieldObservationPrimaryMaterialLimit(21)).toBe(3)
    expect(getFieldObservationPrimaryMaterialLimit(22)).toBe(4)
    expect(getFieldObservationPrimaryMaterialLimit(38)).toBe(4)
    expect(getFieldObservationPrimaryMaterialLimit(39)).toBe(5)
  })

  test('battle powers have trainer level gates', () => {
    expect(getBattlePowerUnlockLevel('shout')).toBe(40)
    expect(validateBattlePowerSkillRequirement('shout', 39)).toContain(
      'Trainer Level 40',
    )
    expect(validateBattlePowerSkillRequirement('shout', 40)).toBeNull()
    expect(validateBattlePowerSkillRequirement('mega', 74)).toContain(
      'Trainer Level 75',
    )
  })

  test('skill titles derive from skill levels', () => {
    expect(getSkillTitleId('battling', 10)).toBe('skill-battling-10')
    expect(getSkillTitleName('battling', 10)).toBe('New Trainer')
    expect(getSkillTitleName('researching', 100)).toBe('Researcher')
    expect(
      getUnlockedSkillTitleIds({
        battling: { level: 20 },
        catching: { level: 9 },
        researching: { level: 100 },
      }),
    ).toContain('skill-researching-100')
  })

  test('equipable titles include stored and skill-derived titles', () => {
    const equipableTitleIds = getEquipableTitleIds(['boulder-breaker'], {
      battling: { level: 20 },
      catching: { level: 9 },
    })

    expect(equipableTitleIds).toContain('new-beginnings')
    expect(equipableTitleIds).toContain('boulder-breaker')
    expect(equipableTitleIds).toContain('skill-battling-10')
    expect(equipableTitleIds).toContain('skill-battling-20')
    expect(equipableTitleIds).not.toContain('skill-catching-10')
  })

  test('item skill requirements feed the guide without Explorer ball gates', () => {
    const balls = items.filter((item) => item.category === 'ball')
    const potion = items.find((item) => item.id === 'battle-potion')
    const battleObserver = items.find((item) => item.id === 'battle-observer')
    const trainingBandIds = [
      'health-band',
      'attack-band',
      'defense-band',
      'sp-attack-band',
      'sp-defense-band',
      'speed-band',
    ]
    const heldItems = items.filter((item) => item.heldConfig)
    const trainingBands = items.filter((item) =>
      trainingBandIds.includes(item.id),
    )
    const researchKit = items.find((item) => item.id === 'research-kit')
    const repel = items.find((item) => item.id === 'repel')
    const superRepel = items.find((item) => item.id === 'super-repel')
    const maxRepel = items.find((item) => item.id === 'max-repel')
    const bugLure = items.find((item) => item.id === 'bug-lure')
    const advancedBugLure = items.find(
      (item) => item.id === 'advanced-bug-lure',
    )
    const masterBugLure = items.find((item) => item.id === 'master-bug-lure')
    const redNut = items.find((item) => item.id === 'nut-red')
    const purpleNut = items.find((item) => item.id === 'nut-purple')
    const greenNut = items.find((item) => item.id === 'nut-green')
    const blueNut = items.find((item) => item.id === 'nut-blue')
    const yellowNut = items.find((item) => item.id === 'nut-yellow')
    const whiteNut = items.find((item) => item.id === 'nut-white')
    const blackNut = items.find((item) => item.id === 'nut-black')
    const lemonade = items.find((item) => item.id === 'lemonade')

    expect(balls.length).toBeGreaterThan(0)
    expect(balls.every((ball) => !ball.skillRequirements?.catching)).toBe(true)
    expect(potion?.skillRequirements?.battling).toBe(3)
    expect(battleObserver?.skillRequirements?.battling).toBe(1)
    expect(trainingBands).toHaveLength(6)
    expect(heldItems.length).toBeGreaterThan(0)
    expect(heldItems.every((item) => !item.skillRequirements?.battling)).toBe(
      true,
    )
    expect(lemonade?.skillRequirements?.battling).toBe(34)
    expect(researchKit?.effects?.grantPokemonResearchXp?.amount).toBe(5)
    expect(researchKit?.skillRequirements?.researching).toBe(35)
    expect(researchKit?.effects?.grantPokemonResearchXp?.minSkillLevel).toBe(35)
    expect(repel?.skillRequirements?.catching).toBe(20)
    expect(superRepel?.skillRequirements?.catching).toBe(40)
    expect(maxRepel?.skillRequirements?.catching).toBe(75)
    expect(bugLure?.skillRequirements?.researching).toBe(10)
    expect(advancedBugLure?.skillRequirements?.researching).toBe(40)
    expect(masterBugLure?.skillRequirements?.researching).toBe(70)
    expect(
      heldItems.every((item) => !item.skillRequirements?.researching),
    ).toBe(true)
    expect(redNut?.skillRequirements?.researching).toBeUndefined()
    expect(purpleNut?.skillRequirements?.researching).toBeUndefined()
    expect(greenNut?.skillRequirements?.researching).toBeUndefined()
    expect(blueNut?.skillRequirements?.researching).toBeUndefined()
    expect(yellowNut?.skillRequirements?.researching).toBeUndefined()
    expect(whiteNut?.skillRequirements?.researching).toBeUndefined()
    expect(blackNut?.skillRequirements?.researching).toBeUndefined()
    const typeLureLevels = items
      .filter((item) => item.id.endsWith('-lure') && item.category === 'misc')
      .map((item) => item.skillRequirements?.researching)
    expect(
      Math.min(...typeLureLevels.filter((level): level is number => !!level)),
    ).toBe(10)
    expect(
      Math.max(...typeLureLevels.filter((level): level is number => !!level)),
    ).toBe(70)

    const trainerGuide = getSkillGuideUnlocks('battling')
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: '2 Battle Items',
        level: 1,
        category: 'battle',
        icon: { type: 'item', id: 'battle-potion' },
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: '5 Battle Items',
        level: 52,
        category: 'battle',
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: '2 Trained Moves',
        level: 10,
        category: 'battle',
        icon: { type: 'item', id: 'tm-mega-punch' },
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: '5 Trained Moves',
        level: 59,
        category: 'battle',
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: "Brock's Gym Challenge",
        level: 5,
        category: 'progression',
        source: 'authored',
        icon: { type: 'trainer', id: 'gym-kanto-brock' },
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: "Misty's Gym Challenge",
        level: 10,
        category: 'progression',
        source: 'authored',
        icon: { type: 'trainer', id: 'gym-kanto-misty' },
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: 'Held Items',
        level: 15,
        category: 'battle',
        source: 'authored',
        icon: { type: 'item', id: 'oran-berry' },
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: "Lt. Surge's Gym Challenge",
        level: 15,
        category: 'progression',
        source: 'authored',
        icon: { type: 'trainer', id: 'gym-kanto-ltsurge' },
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: 'Battle Shouts',
        icon: { type: 'item', id: 'book-of-shouts' },
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        itemId: 'battle-potion',
        icon: { type: 'item', id: 'battle-potion' },
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({ itemId: 'battle-super-potion', level: 27 }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({ itemId: 'soda-pop', level: 29 }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({ itemId: 'dire-hit', level: 36 }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({ itemId: 'full-heal', level: 37 }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({ itemId: 'lemonade', level: 34 }),
    )
    expect(
      trainerGuide.some((unlock) => unlock.itemId === 'sitrus-berry'),
    ).toBe(false)
    expect(trainerGuide.some((unlock) => unlock.itemId === 'health-band')).toBe(
      false,
    )
    expect(
      trainerGuide.some((unlock) => unlock.label.includes('Move Slot')),
    ).toBe(false)

    const explorerGuide = getSkillGuideUnlocks('catching')
    expect(explorerGuide).toContainEqual(
      expect.objectContaining({
        label: '3 Encounter Items',
        level: 50,
        source: 'authored',
        icon: { type: 'item', id: 'normal-gem' },
      }),
    )
    expect(explorerGuide).toContainEqual(
      expect.objectContaining({
        label: '2 Active Voyages',
        level: 22,
        source: 'authored',
        icon: { type: 'item', id: 'quality-forest-photo' },
      }),
    )
    expect(
      explorerGuide.some((unlock) => unlock.itemId?.endsWith('-ball')),
    ).toBe(false)
    const researcherGuide = getSkillGuideUnlocks('researching')
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Pokemon Research',
        level: 1,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        itemId: 'research-kit',
        level: 35,
        source: 'item',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({ itemId: 'nut-red', level: 1 }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({ itemId: 'nut-purple', level: 5 }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({ itemId: 'razz-berry', level: 14 }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({ itemId: 'nut-green', level: 15 }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({ itemId: 'nut-black', level: 40 }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Healing Berries',
        itemId: 'oran-berry',
        level: 16,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({ itemId: 'cheri-berry', level: 16 }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({ itemId: 'sitrus-berry', level: 38 }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({ itemId: 'lum-berry', level: 38 }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'EV-Reducing Berries',
        itemId: 'pomeg-berry',
        level: 42,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({ itemId: 'tamato-berry', level: 42 }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Nature Mints',
        itemId: 'adamant-mint',
        level: 55,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Stats Module',
        level: 7,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Flash Research',
        level: 13,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Study XP x2',
        level: 18,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Study Material Cap 4',
        level: 22,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Study Material Cap 5',
        level: 39,
        source: 'authored',
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: 'IV Cap 15',
        level: 10,
        source: 'authored',
      }),
    )
    expect(trainerGuide).toContainEqual(
      expect.objectContaining({
        label: 'IV Cap 31',
        level: 50,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Ability Insight',
        level: 27,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Study XP x5',
        level: 100,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Advanced Lure Recipes',
        level: 40,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Base Lure Recipes',
        level: 10,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Master Lure Recipes',
        level: 70,
        source: 'authored',
      }),
    )
    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Shiny Research',
        level: 81,
        source: 'authored',
      }),
    )
    expect(researcherGuide.some((unlock) => unlock.itemId === 'bug-lure')).toBe(
      false,
    )
    expect(
      researcherGuide.some((unlock) => unlock.itemId === 'advanced-bug-lure'),
    ).toBe(false)
    expect(
      researcherGuide.some((unlock) => unlock.itemId === 'master-bug-lure'),
    ).toBe(false)
    expect(
      researcherGuide.some(
        (unlock) => unlock.label === 'Species Battle Basics',
      ),
    ).toBe(false)

    expect(researcherGuide).toContainEqual(
      expect.objectContaining({
        label: 'Itemfinder',
        level: 12,
        source: 'authored',
      }),
    )
    expect(explorerGuide.some((unlock) => unlock.label === 'Itemfinder')).toBe(
      false,
    )
    expect(
      explorerGuide.some(
        (unlock) => unlock.label === 'Expanded Encounter Pools',
      ),
    ).toBe(false)
    expect(
      explorerGuide.some((unlock) => unlock.label === 'Secret Areas'),
    ).toBe(false)
    expect(explorerGuide.some((unlock) => unlock.label === '1.5x Lures')).toBe(
      false,
    )

    const artisanGuide = getSkillGuideUnlocks('artisan')
    expect(
      artisanGuide.some((unlock) => unlock.itemId === 'day-care-fence-wood'),
    ).toBe(false)
    expect(
      artisanGuide.some((unlock) => unlock.itemId === 'tiny-bug-armour'),
    ).toBe(false)
    expect(artisanGuide.some((unlock) => unlock.itemId === 'love-ball')).toBe(
      false,
    )
    expect(artisanGuide).toContainEqual(
      expect.objectContaining({
        itemId: 'research-kit',
        level: 35,
        source: 'authored',
      }),
    )
  })

  test('repels respect Explorer level requirements before encounter start', () => {
    const repel = items.find((item) => item.id === 'repel')
    const superRepel = items.find((item) => item.id === 'super-repel')
    const maxRepel = items.find((item) => item.id === 'max-repel')

    expect(repel).toBeDefined()
    expect(superRepel).toBeDefined()
    expect(maxRepel).toBeDefined()

    const explorer19 = { catching: { level: 19 } }
    const explorer20 = { catching: { level: 20 } }
    const explorer39 = { catching: { level: 39 } }
    const explorer40 = { catching: { level: 40 } }
    const explorer74 = { catching: { level: 74 } }
    const explorer75 = { catching: { level: 75 } }

    expect(canUseItemWithSkillRequirements(repel!, explorer19)).toBe(false)
    expect(getItemSkillLockReason(repel!, explorer19)).toContain(
      'Explorer Level 20',
    )
    expect(canUseItemWithSkillRequirements(repel!, explorer20)).toBe(true)

    expect(canUseItemWithSkillRequirements(superRepel!, explorer39)).toBe(false)
    expect(canUseItemWithSkillRequirements(superRepel!, explorer40)).toBe(true)

    expect(canUseItemWithSkillRequirements(maxRepel!, explorer74)).toBe(false)
    expect(canUseItemWithSkillRequirements(maxRepel!, explorer75)).toBe(true)
  })
})
