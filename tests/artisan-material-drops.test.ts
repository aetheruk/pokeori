import { describe, expect, test } from 'bun:test'
import { SPECIAL_POKEMON_DROPS } from '@/data/pokemon/special-drops'
import {
  buildArtisanMaterialRewards,
  buildBrokenBallRewards,
  CAPTURE_PRIMARY_MATERIAL_QUANTITY_ODDS,
  FIELD_OBSERVATION_PRIMARY_MATERIAL_DROP_CHANCE,
  buildFieldObservationMaterialRewards,
  buildReleaseBrokenBallReward,
  buildReleaseMaterialRewards,
  TYPE_MATERIAL_CONFIG,
} from '@/utilities/artisan/material-drops'

function rngSequence(...values: number[]) {
  let index = 0
  return () => values[index++] ?? values[values.length - 1] ?? 0
}

describe('artisan material drops', () => {
  test('Pikachu has an unconditional one-percent Light Ball roll', () => {
    expect(SPECIAL_POKEMON_DROPS['25']).toEqual([
      { itemId: 'light-ball', dropChance: 1 },
    ])
    expect(
      buildArtisanMaterialRewards(
        {
          speciesId: 25,
          formId: '25',
          level: 20,
          types: ['Electric'],
          researchingLevel: 1,
        },
        'capture',
        { rng: rngSequence(0, 0.9) },
      ),
    ).toContainEqual({
      type: 'item',
      targetId: 'light-ball',
      quantity: 1,
      dropChance: 1,
    })
  })

  test('signature held items have independent one-percent form drops', () => {
    expect(SPECIAL_POKEMON_DROPS['83']).toEqual([
      { itemId: 'leek', dropChance: 1 },
    ])
    expect(SPECIAL_POKEMON_DROPS['10166']).toEqual([
      { itemId: 'leek', dropChance: 1 },
    ])
    expect(SPECIAL_POKEMON_DROPS['104']).toEqual([
      { itemId: 'thick-club', dropChance: 1 },
    ])
    expect(SPECIAL_POKEMON_DROPS['105']).toEqual([
      { itemId: 'thick-club', dropChance: 1 },
    ])
    expect(SPECIAL_POKEMON_DROPS['10115']).toEqual([
      { itemId: 'thick-club', dropChance: 1 },
    ])
    expect(SPECIAL_POKEMON_DROPS['132']).toEqual([
      { itemId: 'quick-powder', dropChance: 1 },
      { itemId: 'metal-powder', dropChance: 1 },
    ])
  })

  test('every pokemon type maps to a primary material family', () => {
    const cases: Array<{ type: string; expected: string }> = [
      { type: 'Normal', expected: 'soft-fluff-t1' },
      { type: 'Fire', expected: 'cinder-shard-t1' },
      { type: 'Water', expected: 'aqua-solvent-t1' },
      { type: 'Electric', expected: 'electric-component-t1' },
      { type: 'Grass', expected: 'wood-scraps-t1' },
      { type: 'Ice', expected: 'frost-crystal-t1' },
      { type: 'Fighting', expected: 'grip-weave-t1' },
      { type: 'Poison', expected: 'toxic-resin-t1' },
      { type: 'Ground', expected: 'terra-dust-t1' },
      { type: 'Flying', expected: 'wing-feather-t1' },
      { type: 'Psychic', expected: 'mind-thread-t1' },
      { type: 'Bug', expected: 'chitin-fragment-t1' },
      { type: 'Rock', expected: 'small-stone-t1' },
      { type: 'Ghost', expected: 'spirit-wisp-t1' },
      { type: 'Dragon', expected: 'drake-scale-t1' },
      { type: 'Dark', expected: 'shadow-fiber-t1' },
      { type: 'Steel', expected: 'metal-scrap-t1' },
      { type: 'Fairy', expected: 'pixie-powder-t1' },
    ]

    for (const testCase of cases) {
      const rewards = buildArtisanMaterialRewards(
        {
          speciesId: 1,
          level: 5,
          types: [testCase.type],
          researchingLevel: 1,
        },
        'capture',
        { rng: rngSequence(0, 0.9) },
      )
      expect(rewards[0]?.targetId).toBe(testCase.expected)
      expect(rewards[0]?.dropChance).toBe(100)
      expect(rewards[0]?.quantity).toBe(1)
    }
  })

  test('capture rewards always include one guaranteed primary material drop', () => {
    const rewards = buildArtisanMaterialRewards(
      {
        speciesId: 25,
        level: 20,
        types: ['Electric'],
        researchingLevel: 1,
      },
      'capture',
      { rng: rngSequence(0, 0.9) },
    )

    expect(rewards.some((reward) => reward.targetId === 'electric-component-t1')).toBe(true)
    expect(rewards.some((reward) => reward.dropChance === 100)).toBe(true)
    expect(rewards).toContainEqual(
      expect.objectContaining({
        targetId: 'electric-component-t1',
        quantity: 1,
      }),
    )
  })

  test('capture primary material quantity uses 100 percent for one, 50 percent for two, and 20 percent for three', () => {
    const context = {
      speciesId: 25,
      level: 20,
      types: ['Electric'],
      researchingLevel: 1,
    }

    expect(
      buildArtisanMaterialRewards(context, 'capture', { rng: rngSequence(0, 0.9) })[0]
        ?.quantity,
    ).toBe(1)
    expect(
      buildArtisanMaterialRewards(context, 'capture', { rng: rngSequence(0, 0.49) })[0]
        ?.quantity,
    ).toBe(2)
    expect(
      buildArtisanMaterialRewards(context, 'capture', { rng: rngSequence(0, 0.19) })[0]
        ?.quantity,
    ).toBe(3)
    expect(CAPTURE_PRIMARY_MATERIAL_QUANTITY_ODDS).toEqual({
      one: 100,
      two: 50,
      three: 20,
    })
  })

  test('capture dual type pokemon choose one random primary material type', () => {
    const captureRewards = buildArtisanMaterialRewards(
      {
        speciesId: 149,
        level: 80,
        types: ['Dragon', 'Flying'],
        researchingLevel: 70,
      },
      'capture',
      { rng: rngSequence(0.75, 0.9) },
    )
    const fieldRewards = buildArtisanMaterialRewards(
      {
        speciesId: 149,
        level: 80,
        types: ['Dragon', 'Flying'],
        researchingLevel: 70,
      },
      'field-observation',
    )

    expect(captureRewards).toEqual([
      { type: 'item', targetId: 'wing-feather-t1', quantity: 1, dropChance: 100 },
    ])
    expect(fieldRewards).toEqual([
      { type: 'item', targetId: 'drake-scale-t1', quantity: 1, dropChance: FIELD_OBSERVATION_PRIMARY_MATERIAL_DROP_CHANCE },
      { type: 'item', targetId: 'wing-feather-t1', quantity: 1, dropChance: FIELD_OBSERVATION_PRIMARY_MATERIAL_DROP_CHANCE },
    ])
  })

  test('grassland habitat alone does not add wing feather secondary drops', () => {
    const rewards = buildArtisanMaterialRewards(
      {
        speciesId: 19,
        level: 5,
        types: ['Normal'],
        researchingLevel: 1,
      },
      'capture',
      { rng: rngSequence(0, 0.9) },
    )

    expect(rewards).toEqual([
      {
        type: 'item',
        targetId: 'soft-fluff-t1',
        quantity: 1,
        dropChance: 100,
      },
    ])
  })

  test('field observation primary material drops are chance based', () => {
    const rewards = buildArtisanMaterialRewards(
      {
        speciesId: 25,
        level: 20,
        types: ['Electric'],
        researchingLevel: 1,
      },
      'field-observation',
    )

    expect(rewards[0]).toMatchObject({
      targetId: 'electric-component-t1',
      dropChance: FIELD_OBSERVATION_PRIMARY_MATERIAL_DROP_CHANCE,
    })
  })

  test('field observation caps primary material reward rolls at three subjects', () => {
    const rewards = buildFieldObservationMaterialRewards([
      { speciesId: 1, level: 5, types: ['Grass', 'Poison'], researchingLevel: 1 },
      { speciesId: 4, level: 5, types: ['Fire'], researchingLevel: 1 },
      { speciesId: 7, level: 5, types: ['Water'], researchingLevel: 1 },
      { speciesId: 25, level: 5, types: ['Electric'], researchingLevel: 1 },
    ])

    const primaryRewards = rewards.filter(
      (reward) => reward.dropChance === FIELD_OBSERVATION_PRIMARY_MATERIAL_DROP_CHANCE,
    )

    expect(primaryRewards).toHaveLength(3)
    expect(primaryRewards.map((reward) => reward.targetId)).toEqual([
      'wood-scraps-t1',
      'toxic-resin-t1',
      'cinder-shard-t1',
    ])
  })

  test('legendary beast special materials are guaranteed form-configured drops', () => {
    expect(SPECIAL_POKEMON_DROPS['244']).toContainEqual({
      itemId: 'token-of-fire',
      dropChance: 100,
      guaranteed: true,
    })
    expect(SPECIAL_POKEMON_DROPS['243']).toContainEqual({
      itemId: 'token-of-thunder',
      dropChance: 100,
      guaranteed: true,
    })
    expect(SPECIAL_POKEMON_DROPS['245']).toContainEqual({
      itemId: 'token-of-water',
      dropChance: 100,
      guaranteed: true,
    })

    expect(
      buildArtisanMaterialRewards(
        {
          speciesId: 244,
          formId: '244',
          level: 30,
          types: ['Fire'],
          researchingLevel: 1,
        },
        'field-observation',
      ),
    ).toContainEqual({
      type: 'item',
      targetId: 'token-of-fire',
      quantity: 1,
      dropChance: 100,
      guaranteed: true,
    })
  })

  test('form-specific drops are independent of the selected primary material type', () => {
    SPECIAL_POKEMON_DROPS['25-special'] = [
      {
        itemId: 'static-pelt',
        dropChance: 35,
        requirements: [{ type: 'item_owned', targetId: 'research-kit' }],
      },
      { itemId: 'charged-feather', dropChance: 15 },
    ]

    try {
      const fieldRewards = buildArtisanMaterialRewards(
        {
          speciesId: 25,
          formId: '25-special',
          level: 20,
          types: ['Electric', 'Flying'],
          researchingLevel: 1,
        },
        'field-observation',
      )
      const electricCaptureRewards = buildArtisanMaterialRewards(
        {
          speciesId: 25,
          formId: '25-special',
          level: 20,
          types: ['Electric', 'Flying'],
          researchingLevel: 1,
        },
        'capture',
        { rng: rngSequence(0, 0.9) },
      )
      const flyingCaptureRewards = buildArtisanMaterialRewards(
        {
          speciesId: 25,
          formId: '25-special',
          level: 20,
          types: ['Electric', 'Flying'],
          researchingLevel: 1,
        },
        'capture',
        { rng: rngSequence(0.75, 0.9) },
      )

      expect(fieldRewards.map((reward) => reward.targetId)).toEqual([
        'electric-component-t1',
        'wing-feather-t1',
        'static-pelt',
        'charged-feather',
      ])
      expect(electricCaptureRewards.map((reward) => reward.targetId)).toEqual([
        'electric-component-t1',
        'static-pelt',
        'charged-feather',
      ])
      expect(flyingCaptureRewards.map((reward) => reward.targetId)).toEqual([
        'wing-feather-t1',
        'static-pelt',
        'charged-feather',
      ])
      expect(
        electricCaptureRewards.find(
          (reward) => reward.targetId === 'static-pelt',
        )?.requirements,
      ).toEqual([{ type: 'item_owned', targetId: 'research-kit' }])
    } finally {
      delete SPECIAL_POKEMON_DROPS['25-special']
    }
  })

  test('active material drops stay base tier even when source levels could support higher tiers', () => {
    const lowResearcher = buildArtisanMaterialRewards(
      {
        speciesId: 149,
        level: 80,
        types: ['Dragon', 'Flying'],
        researchingLevel: 1,
      },
      'field-observation',
    )
    const belowTierTwoResearcher = buildArtisanMaterialRewards(
      {
        speciesId: 149,
        level: 80,
        types: ['Dragon', 'Flying'],
        researchingLevel: 59,
      },
      'field-observation',
    )
    const midResearcher = buildArtisanMaterialRewards(
      {
        speciesId: 149,
        level: 80,
        types: ['Dragon', 'Flying'],
        researchingLevel: 60,
      },
      'field-observation',
    )
    const highResearcher = buildArtisanMaterialRewards(
      {
        speciesId: 149,
        level: 80,
        types: ['Dragon', 'Flying'],
        researchingLevel: 70,
      },
      'field-observation',
    )

    for (const rewards of [
      lowResearcher,
      belowTierTwoResearcher,
      midResearcher,
      highResearcher,
    ]) {
      expect(rewards.length).toBeGreaterThan(0)
      expect(rewards.every((reward) => String(reward.targetId).endsWith('-t1'))).toBe(true)
    }
  })

  test('active broken ball salvage stays base tier', () => {
    expect(buildBrokenBallRewards({ level: 59, researchingLevel: 100 }, 'wild-battle')[0]?.targetId).toBe('broken-ball-t1')
    expect(buildBrokenBallRewards({ level: 60, researchingLevel: 59 }, 'wild-battle')[0]?.targetId).toBe('broken-ball-t1')
    expect(buildBrokenBallRewards({ level: 60, researchingLevel: 60 }, 'wild-battle')[0]?.targetId).toBe('broken-ball-t1')
    expect(buildBrokenBallRewards({ level: 70, researchingLevel: 70 }, 'field-observation')[0]).toMatchObject({
      targetId: 'broken-ball-t1',
      dropChance: 40,
    })
    expect(buildBrokenBallRewards({ level: 70, researchingLevel: 70 }, 'wild-battle')[0]).toMatchObject({
      targetId: 'broken-ball-t1',
      dropChance: 25,
    })
  })

  test('release broken ball reward is guaranteed and base tier', () => {
    expect(buildReleaseBrokenBallReward({ level: 34 })).toMatchObject({
      targetId: 'broken-ball-t1',
      dropChance: 100,
    })
    expect(buildReleaseBrokenBallReward({ level: 60 })).toMatchObject({
      targetId: 'broken-ball-t1',
      dropChance: 100,
    })
    expect(buildReleaseBrokenBallReward({ level: 70 })).toMatchObject({
      targetId: 'broken-ball-t1',
      dropChance: 100,
    })
  })

  test('release material rewards roll five primary materials at 30%', () => {
    const rewards = buildReleaseMaterialRewards({
      speciesId: 149,
      formId: '149',
      level: 80,
      types: ['Dragon', 'Flying'],
      researchingLevel: 70,
    })

    expect(rewards).toHaveLength(5)
    expect(rewards.every((reward) => reward.dropChance === 30)).toBe(true)
    expect(rewards.map((reward) => reward.targetId)).toEqual([
      'drake-scale-t1',
      'wing-feather-t1',
      'drake-scale-t1',
      'wing-feather-t1',
      'drake-scale-t1',
    ])
  })
})
