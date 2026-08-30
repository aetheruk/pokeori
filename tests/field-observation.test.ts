import { describe, expect, test } from 'bun:test'
import {
  calculateFieldObservationSkillXp,
  FIELD_OBSERVATION_COUNT_SPECIES_LIMIT,
  generateFieldObservationRound,
  getFieldObservationBaseExperienceXpModifier,
  getFieldObservationCollectedItemXpModifier,
  getFieldObservationSkillXpLevel,
  getFieldObservationSessionSeconds,
  isFieldObservationAnswerCorrect,
} from '@/utilities/research/field-observation'
import {
  buildFieldObservationCollectibleDrops,
  toPublicFieldObservationCollectibleDrop,
} from '@/utilities/research/field-observation-drops'
import { battles } from '@/data/battles'
import {
  fieldObservationGlobalItemEvents,
  fieldObservationGlobalPokemonEvents,
} from '@/data/games/field-observation/global-events'
import { fieldObservationGames } from '@/data/games/field-observation'
import { FIELD_OBSERVATION_RESEARCH_KIT_DROP_CHANCE } from '@/data/games/field-observation/rewards'
import { locations } from '@/data/locations'
import { getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import {
  rollFieldObservationGlobalPokemonEvent,
  rollFieldObservationItemDrops,
} from '@/utilities/research/field-observation-global-events'
import type { FieldObservationSettings } from '@/data/games/field-observation/types'
import { SPECIAL_POKEMON_DROPS } from '@/data/pokemon/special-drops'

const routeOneSettings: FieldObservationSettings = {
  pokemonPool: [
    { speciesId: 16, formId: '16', weight: 50 },
    { speciesId: 19, formId: '19', weight: 50 },
  ],
  levelRange: { min: 2, max: 5 },
  timeLimit: 12,
  answerTimeLimit: 15,
  difficulty: 1,
}

function seededRandom(seed: number) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

function sequencedRandom(values: number[], fallbackSeed = 1) {
  const fallback = seededRandom(fallbackSeed)
  let index = 0
  return () => values[index++] ?? fallback()
}

function expectedAuthoredStudyDifficulty(study: { subCategory?: string }) {
  switch (study.subCategory) {
    case 'Pallet Town':
      return 1
    case 'Viridian City':
    case 'Viridian Forest':
      return 2
    case 'Pewter City':
      return 2
    case 'Rock Tunnel':
      return 3
    default:
      return 2
  }
}

describe('field observation research mode', () => {
  test('generates public round data without leaking the correct answer', () => {
    const round = generateFieldObservationRound(
      routeOneSettings,
      seededRandom(1),
    )

    expect(round.publicRoundData.gameType).toBe('field-observation')
    expect(round.publicRoundData.availablePokemon).toEqual([
      { speciesId: 16, formId: '16', name: 'Pidgey' },
      { speciesId: 19, formId: '19', name: 'Rattata' },
    ])
    expect(round.publicRoundData.spawns.length).toBeGreaterThan(0)
    expect(['male', 'female', 'genderless']).toContain(
      round.publicRoundData.spawns[0]?.gender,
    )
    expect(
      round.publicRoundData.question.options.length,
    ).toBeGreaterThanOrEqual(2)
    expect(round.privateRoundData.correctOptionId).toBeTruthy()
    expect(
      round.publicRoundData.question.options.some(
        (option) => option.id === round.privateRoundData.correctOptionId,
      ),
    ).toBe(true)
    expect(JSON.stringify(round.publicRoundData)).not.toContain(
      'correctOptionId',
    )
  })

  test('can inject one global special Pokemon spawn into a field observation round', () => {
    const enteiEvent = fieldObservationGlobalPokemonEvents.find(
      (event) => event.id === 'field-observation-entei',
    )
    if (!enteiEvent)
      throw new Error('Missing field-observation-entei global event')

    const round = generateFieldObservationRound(
      routeOneSettings,
      seededRandom(4),
      {
        globalPokemonEvent: enteiEvent,
      },
    )

    const enteiSpawns = round.publicRoundData.spawns.filter(
      (spawn) => spawn.speciesId === 244,
    )
    expect(enteiSpawns).toHaveLength(1)
    expect(enteiSpawns[0]).toMatchObject({
      id: 'global-field-observation-entei',
      formId: '244',
      hidden: false,
      event: 'flash',
    })
    expect(round.privateRoundData.rewardSubjects).toContainEqual(
      expect.objectContaining({
        speciesId: 244,
        formId: '244',
        baseExperience: 261,
      }),
    )
  })

  test('global special Pokemon requirements require Clear Bell for beasts and gate birds by Researcher level', () => {
    const enteiEvent = fieldObservationGlobalPokemonEvents.find(
      (event) => event.id === 'field-observation-entei',
    )
    if (!enteiEvent)
      throw new Error('Missing field-observation-entei global event')

    const baseData = {
      inventory: [],
      pokemon: [],
      tcg: [],
      pokedex: [],
      completedTasks: [],
      battleResults: [],
      locationEncounterResults: [],
      gameResults: [],
      fieldResearchResults: [],
      user: {},
    } as any

    expect(
      rollFieldObservationGlobalPokemonEvent(
        [enteiEvent!],
        baseData,
        'Kanto',
        () => 0,
      ),
    ).toBeNull()
    expect(
      rollFieldObservationGlobalPokemonEvent(
        [enteiEvent!],
        { ...baseData, inventory: [{ itemId: 'clear-bell', quantity: 1 }] },
        'Kanto',
        () => 0,
      ),
    ).toEqual(enteiEvent)
    expect(
      rollFieldObservationGlobalPokemonEvent(
        [enteiEvent!],
        {
          ...baseData,
          inventory: [
            { itemId: 'clear-bell', quantity: 1 },
            { itemId: 'token-of-fire', quantity: 1 },
          ],
        },
        'Kanto',
        () => 0,
      ),
    ).toBeNull()
    expect(
      rollFieldObservationGlobalPokemonEvent(
        [enteiEvent!],
        {
          ...baseData,
          inventory: [
            { itemId: 'clear-bell', quantity: 1 },
            { itemId: 'concentrated-fire', quantity: 1 },
          ],
        },
        'Kanto',
        () => 0,
      ),
    ).toBeNull()
    expect(
      rollFieldObservationGlobalPokemonEvent(
        [enteiEvent!],
        {
          ...baseData,
          inventory: [
            { itemId: 'clear-bell', quantity: 1 },
            { itemId: 'lifeless-fire', quantity: 1 },
          ],
        },
        'Kanto',
        () => 0,
      ),
    ).toBeNull()

    const moltresEvent = fieldObservationGlobalPokemonEvents.find(
      (event) => event.id === 'field-observation-moltres',
    )
    if (!moltresEvent)
      throw new Error('Missing field-observation-moltres global event')
    expect(
      rollFieldObservationGlobalPokemonEvent(
        [moltresEvent],
        { ...baseData, user: { skills: { researching: { level: 49 } } } },
        'Kanto',
        () => 0,
      ),
    ).toBeNull()
    expect(
      rollFieldObservationGlobalPokemonEvent(
        [moltresEvent],
        { ...baseData, user: { skills: { researching: { level: 50 } } } },
        'Kanto',
        () => 0,
      ),
    ).toEqual(moltresEvent)
    expect(
      rollFieldObservationGlobalPokemonEvent(
        [moltresEvent],
        {
          ...baseData,
          user: { skills: { researching: { level: 50 } } },
          inventory: [{ itemId: 'flaming-twig', quantity: 1 }],
        },
        'Kanto',
        () => 0,
      ),
    ).toBeNull()
  })

  test('authored item drops roll into active field observation collectibles', () => {
    const baseData = {
      inventory: [],
      pokemon: [],
      tcg: [],
      pokedex: [],
      completedTasks: [],
      battleResults: [],
      locationEncounterResults: [],
      gameResults: [],
      fieldResearchResults: [],
      user: {},
    } as any
    const route24CharredWoodDrop = {
      id: 'route-24-charred-wood',
      itemId: 'charred-wood',
      dropChance: 5,
      quantity: { min: 1, max: 2 },
    }

    expect(
      rollFieldObservationItemDrops(
        [route24CharredWoodDrop],
        baseData,
        'Kanto',
        () => 0,
      ),
    ).toEqual([route24CharredWoodDrop])
    expect(
      rollFieldObservationItemDrops(
        [route24CharredWoodDrop],
        baseData,
        'Kanto',
        () => 0.99,
      ),
    ).toEqual([])

    const drops = buildFieldObservationCollectibleDrops({
      rewardSubjects: [],
      spawns: [],
      researchingLevel: 1,
      surveyFocus: 'standard',
      observationDurationMs: 20_000,
      globalItemEvents: [route24CharredWoodDrop],
      random: () => 0.99,
    })
    const publicDrops = drops.map(toPublicFieldObservationCollectibleDrop)

    expect(drops).toContainEqual(
      expect.objectContaining({
        itemId: 'charred-wood',
        kind: 'item',
        reward: expect.objectContaining({
          type: 'item',
          targetId: 'charred-wood',
          quantity: { min: 1, max: 2 },
          dropChance: 100,
        }),
      }),
    )
    expect(JSON.stringify(publicDrops)).not.toContain('reward')
  })

  test('field observation keeps authored drop pools independent', () => {
    const ordinaryDrops = Array.from({ length: 6 }, (_, index) => ({
      id: `ordinary-drop-${index}`,
      itemId: 'charred-wood',
      dropChance: 100,
    }))
    const safariNoteDrop = {
      id: 'safari-note-bubble',
      itemId: 'researchers-journal-page',
      label: 'Safari Note',
      dropChance: 100,
      guaranteed: true,
      secret: true,
      reward: {
        type: 'currency' as const,
        targetId: 'safari-notes',
        quantity: 1,
        dropChance: 100,
        guaranteed: true,
        secret: true,
      },
    }

    const drops = buildFieldObservationCollectibleDrops({
      rewardSubjects: [],
      spawns: [],
      researchingLevel: 1,
      surveyFocus: 'standard',
      observationDurationMs: 20_000,
      globalItemEvents: [...ordinaryDrops, safariNoteDrop],
      random: () => 0.99,
    })

    expect(drops).toHaveLength(7)
    expect(drops).toContainEqual(
      expect.objectContaining({
        itemId: 'researchers-journal-page',
        label: 'Safari Note',
        reward: expect.objectContaining({
          type: 'currency',
          targetId: 'safari-notes',
          guaranteed: true,
        }),
      }),
    )
  })

  test('field observation can surface an unlocked Pokemon egg as a collectible bubble', () => {
    const eggReward = {
      type: 'egg' as const,
      quantity: 1,
      dropChance: 100,
      guaranteed: true,
      eggData: {
        rarity: 'shiny' as const,
        sourceResearchId: 'route-24-field-observation',
      },
    }
    const drops = buildFieldObservationCollectibleDrops({
      rewardSubjects: [],
      spawns: [],
      researchingLevel: 32,
      surveyFocus: 'standard',
      observationDurationMs: 20_000,
      additionalRewards: [
        {
          reward: eggReward,
          kind: 'egg',
          displayItemId: 'egg',
          displayLabel: 'Shiny Pokémon Egg',
          displayRarity: 'shiny',
        },
      ],
      random: () => 0,
    })

    expect(drops).toContainEqual(
      expect.objectContaining({
        itemId: 'egg',
        kind: 'egg',
        rarity: 'shiny',
        label: 'Shiny Pokémon Egg',
        reward: expect.objectContaining({ type: 'egg' }),
      }),
    )
    const eggDrop = drops.find((drop) => drop.itemId === 'egg')
    expect(eggDrop).toBeDefined()
    expect(toPublicFieldObservationCollectibleDrop(eggDrop!)).toMatchObject({
      itemId: 'egg',
      kind: 'egg',
      rarity: 'shiny',
    })
  })

  test('Viridian Forest study can bubble Broken Bike only until it is owned or traded', () => {
    const baseData = {
      inventory: [],
      pokemon: [],
      tcg: [],
      pokedex: [],
      completedTasks: [],
      battleResults: [],
      locationEncounterResults: [],
      gameResults: [],
      fieldResearchResults: [],
      user: {},
    } as any
    const viridianForestStudy = fieldObservationGames.find(
      (entry) => entry.id === 'viridian-forest-field-observation',
    )
    const brokenBikeDrop = viridianForestStudy?.settings.itemDrops?.find(
      (drop) => drop.id === 'viridian-forest-broken-bike',
    )
    if (!brokenBikeDrop)
      throw new Error('Missing Viridian Forest Broken Bike drop')

    expect(brokenBikeDrop).toMatchObject({
      itemId: 'broken-bike',
      dropChance: 3,
      quantity: 1,
      requirements: [
        {
          type: 'item_owned',
          targetId: 'broken-bike',
          inverse: true,
        },
        {
          type: 'task_completed',
          targetId: 'bike-shop-trade',
          inverse: true,
        },
      ],
    })
    expect(
      rollFieldObservationItemDrops(
        [brokenBikeDrop],
        baseData,
        'Kanto',
        () => 0,
      ),
    ).toEqual([brokenBikeDrop])
    expect(
      rollFieldObservationItemDrops(
        [brokenBikeDrop],
        { ...baseData, inventory: [{ itemId: 'broken-bike', quantity: 1 }] },
        'Kanto',
        () => 0,
      ),
    ).toEqual([])
    expect(
      rollFieldObservationItemDrops(
        [brokenBikeDrop],
        {
          ...baseData,
          completedTasks: [
            {
              taskId: 'bike-shop-trade',
              completedAt: '2026-06-03T00:00:00.000Z',
              count: 1,
            },
          ],
        },
        'Kanto',
        () => 0,
      ),
    ).toEqual([])
  })

  test('Viridian Forest Broken Bike rewards all stop after it is owned or traded', () => {
    const expectedRequirements = [
      {
        type: 'item_owned',
        targetId: 'broken-bike',
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'bike-shop-trade',
        inverse: true,
      },
    ]
    const viridianForestLocation = locations.find(
      (entry) => entry.id === 'viridian-forest',
    )
    const viridianForestBattle = battles.find(
      (entry) => entry.id === 'viridian-forest-battle',
    )
    const viridianForestStudy = fieldObservationGames.find(
      (entry) => entry.id === 'viridian-forest-field-observation',
    )
    const rewards = [
      viridianForestLocation?.rewards.find(
        (reward) => reward.type === 'item' && reward.targetId === 'broken-bike',
      ),
      viridianForestBattle?.rewards.find(
        (reward) => reward.type === 'item' && reward.targetId === 'broken-bike',
      ),
      viridianForestStudy?.settings.itemDrops?.find(
        (drop) => drop.itemId === 'broken-bike',
      ),
    ]

    expect(rewards).toHaveLength(3)
    for (const reward of rewards) {
      expect(reward).toMatchObject({
        dropChance: expect.any(Number),
        quantity: 1,
        requirements: expectedRequirements,
      })
    }
  })

  test('global utility item drops roll into active field observation collectibles', () => {
    const baseData = {
      inventory: [],
      pokemon: [],
      tcg: [],
      pokedex: [],
      completedTasks: [],
      battleResults: [],
      locationEncounterResults: [],
      gameResults: [],
      fieldResearchResults: [],
      user: {},
    } as any
    const escapeRopeDrop = fieldObservationGlobalItemEvents.find(
      (event) => event.id === 'global-field-observation-escape-rope',
    )
    if (!escapeRopeDrop) throw new Error('Missing global Escape Rope drop')
    const repelDrop = fieldObservationGlobalItemEvents.find(
      (event) => event.id === 'global-field-observation-repel',
    )
    if (!repelDrop) throw new Error('Missing global Repel drop')

    expect(escapeRopeDrop).toMatchObject({
      itemId: 'escape-rope',
      dropChance: 5,
    })
    expect(repelDrop).toMatchObject({
      itemId: 'repel',
      dropChance: 5,
      requirements: [{ type: 'skill_level', targetId: 'catching', count: 20 }],
    })
    expect(
      rollFieldObservationItemDrops([repelDrop], baseData, 'Kanto', () => 0),
    ).toEqual([])
    expect(
      rollFieldObservationItemDrops(
        [repelDrop],
        { ...baseData, user: { skills: { catching: { level: 20 } } } },
        'Kanto',
        () => 0,
      ),
    ).toEqual([repelDrop])
    expect(
      rollFieldObservationItemDrops(
        [escapeRopeDrop],
        baseData,
        'Kanto',
        () => 0,
      ),
    ).toEqual([escapeRopeDrop])
    expect(
      rollFieldObservationItemDrops(
        [escapeRopeDrop],
        baseData,
        'Kanto',
        () => 0.99,
      ),
    ).toEqual([])
  })

  test('Neutral Stones unlock at Researcher 25 after the Gentleman teaches stonecraft', () => {
    const baseData = {
      inventory: [],
      pokemon: [],
      tcg: [],
      pokedex: [],
      completedTasks: [],
      battleResults: [],
      locationEncounterResults: [],
      gameResults: [],
      fieldResearchResults: [],
      user: { skills: { researching: { level: 25 } } },
    } as any
    const neutralStoneDrop = fieldObservationGlobalItemEvents.find(
      (event) => event.id === 'global-field-observation-neutral-stone',
    )
    if (!neutralStoneDrop) throw new Error('Missing global Neutral Stone drop')

    expect(neutralStoneDrop).toMatchObject({
      itemId: 'neutral-stone',
      dropChance: 100 / 16,
      guaranteed: true,
      requirements: [
        { type: 'skill_level', targetId: 'researching', count: 25 },
        { type: 'task_completed', targetId: 'a-craftsmans-secret' },
      ],
    })
    expect(
      rollFieldObservationItemDrops([neutralStoneDrop], baseData, 'Kanto', () => 0),
    ).toEqual([])
    const unlockedData = {
      ...baseData,
      completedTasks: [
        {
          taskId: 'a-craftsmans-secret',
          completedAt: '2026-07-27T00:00:00.000Z',
          count: 1,
        },
      ],
    }
    expect(
      rollFieldObservationItemDrops([neutralStoneDrop], unlockedData, 'Kanto', () => 0),
    ).toEqual([neutralStoneDrop])
    expect(
      rollFieldObservationItemDrops(
        [neutralStoneDrop],
        unlockedData,
        'Kanto',
        () => 1 / 16,
      ),
    ).toEqual([])

    const crowdedDrops = Array.from({ length: 7 }, (_, index) => ({
      id: `crowded-drop-${index}`,
      itemId: 'escape-rope',
      dropChance: 100,
    }))
    const collectibles = buildFieldObservationCollectibleDrops({
      rewardSubjects: [],
      spawns: [],
      researchingLevel: 32,
      surveyFocus: 'standard',
      observationDurationMs: 20_000,
      globalItemEvents: [...crowdedDrops, neutralStoneDrop],
      random: () => 0.5,
    })
    expect(collectibles).toContainEqual(
      expect.objectContaining({ itemId: 'neutral-stone' }),
    )
  })

  test('rolls spawn genders from species appearance rates', () => {
    const femaleOnlyRound = generateFieldObservationRound(
      {
        ...routeOneSettings,
        pokemonPool: [{ speciesId: 29, formId: '29', weight: 1 }],
      },
      seededRandom(4),
    )
    const maleOnlyRound = generateFieldObservationRound(
      {
        ...routeOneSettings,
        pokemonPool: [{ speciesId: 32, formId: '32', weight: 1 }],
      },
      seededRandom(4),
    )
    const genderlessRound = generateFieldObservationRound(
      {
        ...routeOneSettings,
        pokemonPool: [{ speciesId: 120, formId: '120', weight: 1 }],
      },
      seededRandom(4),
    )

    expect(
      femaleOnlyRound.publicRoundData.spawns.every(
        (spawn) => spawn.gender === 'female',
      ),
    ).toBe(true)
    expect(
      maleOnlyRound.publicRoundData.spawns.every(
        (spawn) => spawn.gender === 'male',
      ),
    ).toBe(true)
    expect(
      genderlessRound.publicRoundData.spawns.every(
        (spawn) => spawn.gender === 'genderless',
      ),
    ).toBe(true)
  })

  test('difficulty increases spawn density without changing required config shape', () => {
    const easy = generateFieldObservationRound(
      { ...routeOneSettings, difficulty: 1 },
      seededRandom(2),
    )
    const hard = generateFieldObservationRound(
      { ...routeOneSettings, difficulty: 10 },
      seededRandom(2),
    )

    expect(hard.publicRoundData.spawns.length).toBeGreaterThan(
      easy.publicRoundData.spawns.length,
    )
    expect(getFieldObservationSessionSeconds(routeOneSettings)).toBe(27)
  })

  test('supports ranged observation and answer timers', () => {
    const rangedSettings: FieldObservationSettings = {
      ...routeOneSettings,
      timeLimit: { min: 5, max: 15 },
      answerTimeLimit: { min: 5, max: 15 },
    }
    const round = generateFieldObservationRound(rangedSettings, seededRandom(5))
    const observationSeconds = Math.floor(
      round.publicRoundData.observationDurationMs / 1000,
    )
    const answerSeconds = Math.floor(
      round.publicRoundData.answerDurationMs / 1000,
    )

    expect(observationSeconds).toBeGreaterThanOrEqual(5)
    expect(observationSeconds).toBeLessThanOrEqual(15)
    expect(answerSeconds).toBeGreaterThanOrEqual(5)
    expect(answerSeconds).toBeLessThanOrEqual(15)
    expect(getFieldObservationSessionSeconds(rangedSettings)).toBe(30)
  })

  test('verifies selected options and calculates one dynamic XP grant from average subject level', () => {
    const round = generateFieldObservationRound(
      routeOneSettings,
      seededRandom(3),
    )
    const xpLevel = getFieldObservationSkillXpLevel(
      round.privateRoundData.rewardSubjects,
      routeOneSettings.levelRange,
    )

    expect(
      isFieldObservationAnswerCorrect(
        round.privateRoundData,
        round.privateRoundData.correctOptionId,
      ),
    ).toBe(true)
    expect(
      isFieldObservationAnswerCorrect(round.privateRoundData, 'wrong'),
    ).toBe(false)
    const baseExperienceModifier = getFieldObservationBaseExperienceXpModifier(
      round.privateRoundData.rewardSubjects,
    )
    expect(
      calculateFieldObservationSkillXp(xpLevel, 1, baseExperienceModifier),
    ).toBeGreaterThan(0)
    expect(
      calculateFieldObservationSkillXp(xpLevel, 0.4, baseExperienceModifier),
    ).toBeGreaterThan(0)
    expect(
      round.privateRoundData.rewardSubjects[0].baseExperience,
    ).toBeGreaterThan(0)
    expect(round.privateRoundData.rewardSubjects[0].pokemonResearchXp).toBe(1)
  })

  test('field observation XP averages Pokemon base experience modifiers across subjects', () => {
    const modifier = getFieldObservationBaseExperienceXpModifier([
      {
        speciesId: 129,
        formId: '129',
        level: 30,
        baseExperience: 40,
        pokemonResearchXp: 1,
      },
      {
        speciesId: 150,
        formId: '150',
        level: 30,
        baseExperience: 608,
        pokemonResearchXp: 1,
      },
    ])

    expect(modifier).toBeCloseTo(1.01875)
    expect(calculateFieldObservationSkillXp(30, 1, modifier)).toBe(115)
    expect(calculateFieldObservationSkillXp(30, 0.4, modifier)).toBe(46)
  })

  test('field observation collected item XP bonus caps at 40 percent', () => {
    expect(getFieldObservationCollectedItemXpModifier(0)).toBe(1)
    expect(getFieldObservationCollectedItemXpModifier(1)).toBe(1.04)
    expect(getFieldObservationCollectedItemXpModifier(4)).toBe(1.16)
    expect(getFieldObservationCollectedItemXpModifier(10)).toBe(1.4)
    expect(getFieldObservationCollectedItemXpModifier(20)).toBe(1.4)
    expect(getFieldObservationCollectedItemXpModifier(-2)).toBe(1)
  })

  test('count survey stores private expected counts and validates submitted counters', () => {
    const round = generateFieldObservationRound(
      routeOneSettings,
      sequencedRandom([0.4], 7),
    )

    expect(round.publicRoundData.surveyFocus).toBe('count-survey')
    expect(round.publicRoundData.question).toMatchObject({
      type: 'count-survey',
      prompt: 'Set the Pokemon counters to match what appeared.',
    })
    expect(JSON.stringify(round.publicRoundData)).not.toContain('countAnswer')

    const correctCounts = round.privateRoundData.countAnswer || {}
    const [firstKey] = Object.keys(correctCounts)
    expect(firstKey).toBeTruthy()
    expect(
      isFieldObservationAnswerCorrect(round.privateRoundData, {
        type: 'count-survey',
        counts: correctCounts,
      }),
    ).toBe(true)
    expect(
      isFieldObservationAnswerCorrect(round.privateRoundData, {
        type: 'count-survey',
        counts: { ...correctCounts, [firstKey]: correctCounts[firstKey] + 1 },
      }),
    ).toBe(false)
  })

  test('count surveys expose no more than six different species', () => {
    const settings: FieldObservationSettings = {
      ...routeOneSettings,
      pokemonPool: Array.from({ length: 10 }, (_, index) => ({
        speciesId: index + 1,
        formId: String(index + 1),
        weight: 10,
      })),
    }
    const round = generateFieldObservationRound(
      settings,
      sequencedRandom([0.4], 23),
    )
    const availableSpecies = new Set(
      round.publicRoundData.availablePokemon.map((pokemon) => pokemon.speciesId),
    )
    const countedSpecies = new Set(
      Object.keys(round.privateRoundData.countAnswer || {}).map((key) =>
        Number(key.split(':')[0]),
      ),
    )

    expect(round.publicRoundData.surveyFocus).toBe('count-survey')
    expect(availableSpecies.size).toBeLessThanOrEqual(
      FIELD_OBSERVATION_COUNT_SPECIES_LIMIT,
    )
    expect(countedSpecies.size).toBeLessThanOrEqual(
      FIELD_OBSERVATION_COUNT_SPECIES_LIMIT,
    )
    expect(availableSpecies.size).toBe(countedSpecies.size)

    const roundWithGlobalEvent = generateFieldObservationRound(
      settings,
      sequencedRandom([0.4], 23),
      {
        globalPokemonEvent: {
          id: 'count-survey-special',
          speciesId: 150,
          formId: '150',
          odds: 100,
        },
      },
    )
    const globalEventSpecies = new Set(
      roundWithGlobalEvent.publicRoundData.availablePokemon.map(
        (pokemon) => pokemon.speciesId,
      ),
    )
    expect(globalEventSpecies.size).toBeLessThanOrEqual(
      FIELD_OBSERVATION_COUNT_SPECIES_LIMIT,
    )
    expect(globalEventSpecies.has(150)).toBe(true)
  })

  test('Kid Mode always asks who appeared most with tappable Pokemon options', () => {
    const round = generateFieldObservationRound(
      routeOneSettings,
      seededRandom(42),
      { kidModeQuestion: true },
    )
    const counts = new Map<number, number>()
    for (const spawn of round.publicRoundData.spawns) {
      counts.set(spawn.speciesId, (counts.get(spawn.speciesId) || 0) + 1)
    }
    const leaders = Array.from(counts.entries()).sort(
      (a, b) => b[1] - a[1],
    )

    expect(round.publicRoundData.question.type).toBe('kid-most-appeared')
    expect(round.publicRoundData.question.prompt).toBe(
      'Who appeared the most?',
    )
    expect(round.publicRoundData.question.options.length).toBeGreaterThan(0)
    expect(
      round.publicRoundData.question.options.every(
        (option) => option.speciesId && option.formId,
      ),
    ).toBe(true)
    expect(leaders[0][1]).toBeGreaterThan(leaders[1]?.[1] || 0)
    expect(round.privateRoundData.correctOptionId).toBe(
      `species:${leaders[0][0]}`,
    )
  })

  test('produces varied question families from the same core settings', () => {
    const settings: FieldObservationSettings = {
      ...routeOneSettings,
      pokemonPool: [
        { speciesId: 10, formId: '10', weight: 40 },
        { speciesId: 11, formId: '11', weight: 5 },
        { speciesId: 13, formId: '13', weight: 40 },
        { speciesId: 14, formId: '14', weight: 5 },
        { speciesId: 25, formId: '25', weight: 10 },
      ],
      difficulty: 10,
    }
    const questionTypes = new Set<string>()

    for (let i = 0; i < 300; i++) {
      questionTypes.add(
        generateFieldObservationRound(settings, seededRandom(i + 10))
          .publicRoundData.question.type,
      )
    }

    expect(questionTypes.size).toBeGreaterThan(12)
    expect(questionTypes.has('count-species')).toBe(true)
    expect(questionTypes.has('first-appeared')).toBe(true)
    expect(questionTypes.has('last-appeared')).toBe(true)
  })

  test('can ask gender questions only for species with visible gender differences', () => {
    const settings: FieldObservationSettings = {
      ...routeOneSettings,
      pokemonPool: [
        { speciesId: 3, formId: '3', weight: 25 },
        { speciesId: 19, formId: '19', weight: 25 },
        { speciesId: 20, formId: '20', weight: 25 },
        { speciesId: 25, formId: '25', weight: 25 },
      ],
      difficulty: 10,
    }
    const genderQuestionTypes = new Set<string>()

    for (let i = 0; i < 500; i++) {
      const question = generateFieldObservationRound(
        settings,
        seededRandom(i + 250),
      ).publicRoundData.question
      if (
        question.type.includes('gender') ||
        question.type.includes('female') ||
        question.type.includes('male')
      ) {
        genderQuestionTypes.add(question.type)

        for (const option of question.options) {
          if (option.speciesId) {
            expect(
              getPokemonSpecies(option.speciesId)?.has_gender_differences,
            ).toBe(true)
          }
        }
      }
    }

    expect(genderQuestionTypes.has('female-count-species')).toBe(true)
    expect(genderQuestionTypes.has('gender-majority-species')).toBe(true)
  })

  test('generates varied survey focuses without exposing collectible reward internals publicly', () => {
    const focuses = new Set<string>()
    for (const focusRoll of [0.1, 0.4, 0.55, 0.68, 0.8, 0.91, 0.98]) {
      focuses.add(
        generateFieldObservationRound(
          routeOneSettings,
          sequencedRandom([focusRoll], Math.round(focusRoll * 1000)),
        ).publicRoundData.surveyFocus,
      )
    }

    expect(focuses.size).toBe(7)

    const round = generateFieldObservationRound(
      routeOneSettings,
      seededRandom(12),
    )
    const drops = buildFieldObservationCollectibleDrops({
      rewardSubjects: round.privateRoundData.rewardSubjects,
      spawns: round.publicRoundData.spawns,
      researchingLevel: 20,
      surveyFocus: 'material-survey',
      observationDurationMs: round.publicRoundData.observationDurationMs,
      random: seededRandom(2),
    })
    const publicDrops = drops.map(toPublicFieldObservationCollectibleDrop)

    expect(drops.length).toBeGreaterThan(0)
    expect(publicDrops[0].id).toBe(drops[0].id)
    expect(publicDrops[0].itemId).toBe(drops[0].itemId)
    expect(JSON.stringify(publicDrops)).not.toContain('reward')
    expect(drops.every((drop) => drop.startMs >= 0)).toBe(true)
    expect(
      drops.every(
        (drop) =>
          drop.startMs + drop.durationMs <=
          round.publicRoundData.observationDurationMs,
      ),
    ).toBe(true)
  })

  test('guaranteed special Pokemon materials appear even when normal field drops miss', () => {
    const drops = buildFieldObservationCollectibleDrops({
      rewardSubjects: [
        { speciesId: 244, formId: '244', level: 30, pokemonResearchXp: 1 },
        { speciesId: 146, formId: '146', level: 30, pokemonResearchXp: 1 },
      ],
      spawns: [
        {
          id: 'global-field-observation-entei',
          speciesId: 244,
          formId: '244',
          name: 'Entei',
          level: 30,
          startMs: 1000,
          durationMs: 3000,
          x: 50,
          y: 50,
          scale: 1.15,
          movement: 'still',
          sizeVariant: 'large',
          shiny: false,
          gender: 'genderless',
          hidden: false,
          wave: 0,
          event: 'flash',
        },
        {
          id: 'global-field-observation-moltres',
          speciesId: 146,
          formId: '146',
          name: 'Moltres',
          level: 30,
          startMs: 2000,
          durationMs: 3000,
          x: 60,
          y: 40,
          scale: 1.15,
          movement: 'still',
          sizeVariant: 'large',
          shiny: false,
          gender: 'genderless',
          hidden: false,
          wave: 0,
          event: 'flash',
        },
      ],
      researchingLevel: 1,
      surveyFocus: 'standard',
      observationDurationMs: 20_000,
      random: () => 0.99,
    })

    expect(drops).toContainEqual(
      expect.objectContaining({
        itemId: 'token-of-fire',
        kind: 'material',
        reward: expect.objectContaining({
          targetId: 'token-of-fire',
          dropChance: 100,
        }),
      }),
    )
    expect(drops).toContainEqual(
      expect.objectContaining({
        itemId: 'flaming-twig',
        kind: 'material',
        reward: expect.objectContaining({
          targetId: 'flaming-twig',
          dropChance: 100,
        }),
      }),
    )
  })

  test('field observation filters form-specific drops before scheduling them', () => {
    SPECIAL_POKEMON_DROPS['25-special'] = [
      {
        itemId: 'research-kit',
        dropChance: 100,
        requirements: [{ type: 'item_owned', targetId: 'research-kit' }],
      },
      { itemId: 'escape-rope', dropChance: 100 },
    ]

    try {
      const drops = buildFieldObservationCollectibleDrops({
        rewardSubjects: [
          { speciesId: 25, formId: '25-special', level: 20, pokemonResearchXp: 1 },
        ],
        spawns: [],
        researchingLevel: 1,
        surveyFocus: 'standard',
        observationDurationMs: 20_000,
        rewardEligibility: (reward) => reward.targetId !== 'research-kit',
        random: () => 0.99,
      })

      expect(drops.some((drop) => drop.itemId === 'research-kit')).toBe(false)
      expect(drops.some((drop) => drop.itemId === 'escape-rope')).toBe(true)
    } finally {
      delete SPECIAL_POKEMON_DROPS['25-special']
    }
  })

  test('field observation can reveal one gem from the observed Pokemon type pool', () => {
    const drops = buildFieldObservationCollectibleDrops({
      rewardSubjects: [
        { speciesId: 74, formId: '74', level: 10, pokemonResearchXp: 1 },
      ],
      spawns: [],
      researchingLevel: 1,
      surveyFocus: 'standard',
      observationDurationMs: 20_000,
      random: () => 0,
    })

    expect(drops).toContainEqual(
      expect.objectContaining({
        itemId: 'rock-gem',
        kind: 'item',
        reward: expect.objectContaining({
          targetId: 'rock-gem',
          dropChance: 100,
        }),
      }),
    )
  })

  test('field observation gem rolls can miss', () => {
    const drops = buildFieldObservationCollectibleDrops({
      rewardSubjects: [
        { speciesId: 74, formId: '74', level: 10, pokemonResearchXp: 1 },
      ],
      spawns: [],
      researchingLevel: 1,
      surveyFocus: 'standard',
      observationDurationMs: 20_000,
      random: () => 0.99,
    })

    expect(drops.some((drop) => drop.itemId.endsWith('-gem'))).toBe(false)
  })

  test('Research Kits roll into active collectibles at Researcher 35', () => {
    const baseData = {
      inventory: [],
      pokemon: [],
      tcg: [],
      pokedex: [],
      completedTasks: [],
      battleResults: [],
      locationEncounterResults: [],
      gameResults: [],
      fieldResearchResults: [],
      user: { skills: { researching: { level: 34 } } },
    } as any
    const researchKitDrop = fieldObservationGlobalItemEvents.find(
      (event) => event.id === 'global-field-observation-research-kit',
    )
    if (!researchKitDrop) throw new Error('Missing global Research Kit drop')

    expect(researchKitDrop).toMatchObject({
      itemId: 'research-kit',
      quantity: 1,
      dropChance: FIELD_OBSERVATION_RESEARCH_KIT_DROP_CHANCE,
      guaranteed: true,
      requirements: [
        { type: 'skill_level', targetId: 'researching', count: 35 },
      ],
    })
    expect(
      rollFieldObservationItemDrops(
        [researchKitDrop],
        baseData,
        'Kanto',
        () => 0,
      ),
    ).toEqual([])

    const eligibleData = {
      ...baseData,
      user: { skills: { researching: { level: 35 } } },
    }
    expect(
      rollFieldObservationItemDrops(
        [researchKitDrop],
        eligibleData,
        'Kanto',
        () => 0,
      ),
    ).toEqual([researchKitDrop])
    expect(
      rollFieldObservationItemDrops(
        [researchKitDrop],
        eligibleData,
        'Kanto',
        () => 0.99,
      ),
    ).toEqual([])

    const drops = buildFieldObservationCollectibleDrops({
      rewardSubjects: [],
      spawns: [],
      researchingLevel: 35,
      surveyFocus: 'standard',
      observationDurationMs: 20_000,
      globalItemEvents: [researchKitDrop],
      random: () => 0.99,
    })
    expect(drops).toContainEqual(
      expect.objectContaining({
        itemId: 'research-kit',
        kind: 'item',
        reward: expect.objectContaining({
          targetId: 'research-kit',
          dropChance: 100,
          guaranteed: true,
        }),
      }),
    )

    for (const study of fieldObservationGames) {
      expect(study.rewards.some((reward) => reward.type === 'currency')).toBe(
        false,
      )
      expect(
        study.rewards.some(
          (reward) =>
            reward.type === 'item' && reward.targetId === 'research-kit',
        ),
      ).toBe(false)
    }
  })

  test('authored study entries use fixed observation and answer timers', () => {
    for (const study of fieldObservationGames) {
      expect(study.settings.timeLimit).toBe(12)
      expect(study.settings.answerTimeLimit).toBe(12)
      expect(study.settings.difficulty).toBe(
        expectedAuthoredStudyDifficulty(study),
      )
    }
  })

  test('covers every authored catch and wild battle route card with a matching study entry', () => {
    const wildBattles = battles.filter((battle) => battle.isWildBattle)
    const groupedEncounterLocations = locations.filter((location) =>
      wildBattles.some(
        (battle) =>
          battle.name === location.name &&
          battle.category === location.category &&
          (battle.subCategory || '') === (location.subCategory || ''),
      ),
    )

    expect(groupedEncounterLocations.length).toBeGreaterThan(0)

    for (const location of groupedEncounterLocations) {
      const study = fieldObservationGames.find(
        (game) =>
          game.name === location.name &&
          game.category === location.category &&
          (game.subCategory || '') === (location.subCategory || ''),
      )

      expect(study, `${location.name} is missing a Study entry`).toBeTruthy()
      expect(study?.description).toBeTruthy()
      expect(study?.background).toBe(location.background)
      expect(study?.requirements).toEqual(location.requirements)
      expect(study?.settings.levelRange).toEqual(location.levelRange)
      expect(study?.settings.difficulty).toBe(
        expectedAuthoredStudyDifficulty(study!),
      )

      const studySpeciesIds = new Set(
        (study?.settings.pokemonPool || []).map((entry) => entry.speciesId),
      )
      const encounterSpeciesIds = location.encounters
        .filter((entry) => !entry.requirements?.length)
        .map((entry) => entry.speciesId)
      for (const speciesId of encounterSpeciesIds) {
        expect(studySpeciesIds.has(speciesId)).toBe(true)
      }
    }
  })
})
