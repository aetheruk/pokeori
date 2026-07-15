import { describe, expect, test } from 'bun:test'
import {
  buildFieldObservationBerryRewards,
  buildFieldObservationMintRewards,
  FIELD_OBSERVATION_HEALING_BERRY_UNLOCKS,
  FIELD_OBSERVATION_MINTS,
  getFieldObservationHealingBerries,
  getFieldObservationMints,
  FIELD_OBSERVATION_NUTS,
  getFieldObservationNutDropWeights,
  getFieldObservationNuts,
} from '@/utilities/research/berry-drops'
import pokemonData from '@/data/pokemon-data'

const FIELD_NUTS = new Set<string>(FIELD_OBSERVATION_NUTS)

describe('field observation berry drops', () => {
  test('can award no nut from a successful report', () => {
    const originalRandom = Math.random
    try {
      Math.random = () => 0.99
      const rewards = buildFieldObservationBerryRewards(
        [
          { speciesId: 25, formId: '25', level: 10, pokemonResearchXp: 1 },
          { speciesId: 149, formId: '149', level: 55, pokemonResearchXp: 1 },
        ],
        pokemonData as any[],
      )

      expect(rewards).toHaveLength(0)
    } finally {
      Math.random = originalRandom
    }
  })

  test('awards one resolved nut reward on the 55 percent single-nut band', () => {
    const originalRandom = Math.random
    try {
      Math.random = () => 0.84
      const rewards = buildFieldObservationBerryRewards(
        [{ speciesId: 25, formId: '25', level: 10, pokemonResearchXp: 1 }],
        pokemonData as any[],
      )

      expect(rewards).toHaveLength(1)
      expect(rewards[0]).toMatchObject({
        type: 'item',
        quantity: 1,
        dropChance: 100,
      })
      expect(FIELD_NUTS.has(String(rewards[0]?.targetId))).toBe(true)
    } finally {
      Math.random = originalRandom
    }
  })

  test('can award two or three different nut types from one report', () => {
    const originalRandom = Math.random
    try {
      const twoRolls = [0.2, 0, 0]
      Math.random = () => twoRolls.shift() ?? 0
      const twoRewards = buildFieldObservationBerryRewards(
        [{ speciesId: 1, formId: '1', level: 10, pokemonResearchXp: 1 }],
        pokemonData as any[],
        15,
      )

      expect(twoRewards).toHaveLength(2)
      expect(new Set(twoRewards.map((reward) => reward.targetId)).size).toBe(2)
      expect(twoRewards.every((reward) => reward.dropChance === 100)).toBe(true)

      const threeRolls = [0.05, 0, 0, 0]
      Math.random = () => threeRolls.shift() ?? 0
      const threeRewards = buildFieldObservationBerryRewards(
        [{ speciesId: 1, formId: '1', level: 10, pokemonResearchXp: 1 }],
        pokemonData as any[],
        15,
      )

      expect(threeRewards).toHaveLength(3)
      expect(new Set(threeRewards.map((reward) => reward.targetId)).size).toBe(
        3,
      )
      expect(threeRewards.every((reward) => reward.dropChance === 100)).toBe(
        true,
      )
    } finally {
      Math.random = originalRandom
    }
  })

  test('can award up to three nut rewards before three nut types are unlocked', () => {
    const originalRandom = Math.random
    try {
      const oneBerryRolls = [0.05, 0, 0, 0]
      Math.random = () => oneBerryRolls.shift() ?? 0
      const oneBerryRewards = buildFieldObservationBerryRewards(
        [{ speciesId: 1, formId: '1', level: 10, pokemonResearchXp: 1 }],
        pokemonData as any[],
        1,
      )

      expect(oneBerryRewards).toHaveLength(3)
      expect(oneBerryRewards.map((reward) => reward.targetId)).toEqual([
        'nut-red',
        'nut-red',
        'nut-red',
      ])

      const twoBerryRolls = [0.05, 0, 0, 0]
      Math.random = () => twoBerryRolls.shift() ?? 0
      const twoBerryRewards = buildFieldObservationBerryRewards(
        [{ speciesId: 1, formId: '1', level: 10, pokemonResearchXp: 1 }],
        pokemonData as any[],
        5,
      )

      expect(twoBerryRewards).toHaveLength(3)
      expect(
        new Set(twoBerryRewards.map((reward) => reward.targetId)).size,
      ).toBe(2)
    } finally {
      Math.random = originalRandom
    }
  })

  test('field research uses the shared nut pool', () => {
    const originalRandom = Math.random
    const seen = new Set<string>()
    try {
      const weightedPool = getFieldObservationNutDropWeights(100)
      const totalWeight = weightedPool.reduce(
        (total, entry) => total + entry.weight,
        0,
      )
      let cumulativeWeight = 0

      for (const entry of weightedPool) {
        const selectionRoll =
          (cumulativeWeight + entry.weight / 2) / totalWeight
        cumulativeWeight += entry.weight
        const rolls = [0.84, selectionRoll]
        Math.random = () => rolls.shift() ?? 0
        const [reward] = buildFieldObservationBerryRewards(
          [{ speciesId: 1, formId: '1', level: 10, pokemonResearchXp: 1 }],
          pokemonData as any[],
          100,
        )
        seen.add(String(reward?.targetId))
      }
    } finally {
      Math.random = originalRandom
    }

    expect([...seen].sort()).toEqual([...FIELD_OBSERVATION_NUTS].sort())
  })

  test('razz berry is rarer than standard field research nuts', () => {
    const weightedPool = getFieldObservationNutDropWeights(14)
    const standardNut = weightedPool.find((entry) => entry.itemId === 'nut-red')
    const razzBerry = weightedPool.find(
      (entry) => entry.itemId === 'razz-berry',
    )

    expect(razzBerry?.weight).toBeDefined()
    expect(standardNut?.weight).toBeGreaterThan(razzBerry?.weight || 0)
  })

  test('nuts unlock by Researcher level', () => {
    expect(getFieldObservationNuts(1)).toEqual(['nut-red'])
    expect(getFieldObservationNuts(5)).toEqual(['nut-red', 'nut-purple'])
    expect(getFieldObservationNuts(14)).toContain('razz-berry')
    expect(getFieldObservationNuts(15)).toEqual([
      'nut-red',
      'nut-purple',
      'razz-berry',
      'nut-green',
    ])
    expect(getFieldObservationNuts(21)).toContain('nut-blue')
    expect(getFieldObservationNuts(28)).toContain('nut-yellow')
    expect(getFieldObservationNuts(40)).toEqual([...FIELD_OBSERVATION_NUTS])
  })

  test('healing berries unlock as a separate Researcher field pool', () => {
    expect(getFieldObservationHealingBerries(15)).toEqual([])
    expect(getFieldObservationHealingBerries(16)).toEqual([
      'oran-berry',
      'cheri-berry',
      'chesto-berry',
      'pecha-berry',
      'rawst-berry',
      'aspear-berry',
      'persim-berry',
    ])
    expect(getFieldObservationHealingBerries(37)).not.toContain('sitrus-berry')
    expect(getFieldObservationHealingBerries(38)).toEqual([
      'oran-berry',
      'cheri-berry',
      'chesto-berry',
      'pecha-berry',
      'rawst-berry',
      'aspear-berry',
      'persim-berry',
      'sitrus-berry',
      'lum-berry',
    ])
    expect(getFieldObservationHealingBerries(41)).not.toContain('pomeg-berry')
    expect(getFieldObservationHealingBerries(42)).toEqual(
      FIELD_OBSERVATION_HEALING_BERRY_UNLOCKS.map((unlock) => unlock.itemId),
    )
  })

  test('healing berry rewards start at zero to one drops', () => {
    const originalRandom = Math.random
    try {
      const zeroHealingBerryRolls = [0.99, 0.49]
      Math.random = () => zeroHealingBerryRolls.shift() ?? 0
      const zeroHealingBerryReward = buildFieldObservationBerryRewards(
        [{ speciesId: 1, formId: '1', level: 10, pokemonResearchXp: 1 }],
        pokemonData as any[],
        16,
      )
      expect(zeroHealingBerryReward).toHaveLength(0)

      const oneHealingBerryRolls = [0.99, 0.5, 0]
      Math.random = () => oneHealingBerryRolls.shift() ?? 0
      const oneHealingBerryRewards = buildFieldObservationBerryRewards(
        [{ speciesId: 1, formId: '1', level: 10, pokemonResearchXp: 1 }],
        pokemonData as any[],
        16,
      )
      expect(oneHealingBerryRewards.map((reward) => reward.targetId)).toEqual([
        'oran-berry',
      ])
    } finally {
      Math.random = originalRandom
    }
  })

  test('nature mints unlock as a very rare Researcher field pool', () => {
    expect(getFieldObservationMints(54)).toEqual([])
    expect(getFieldObservationMints(55)).toEqual(FIELD_OBSERVATION_MINTS)

    const missedReward = buildFieldObservationMintRewards(
      [{ speciesId: 1, formId: '1', level: 10, pokemonResearchXp: 1 }],
      pokemonData as any[],
      55,
      () => 0.03,
    )
    expect(missedReward).toEqual([])

    const rolls = [0.029, 0]
    const [mintReward] = buildFieldObservationMintRewards(
      [{ speciesId: 1, formId: '1', level: 10, pokemonResearchXp: 1 }],
      pokemonData as any[],
      55,
      () => rolls.shift() ?? 0,
    )
    expect(mintReward).toMatchObject({
      type: 'item',
      targetId: 'adamant-mint',
      quantity: 1,
      dropChance: 100,
      guaranteed: true,
    })
  })
})
