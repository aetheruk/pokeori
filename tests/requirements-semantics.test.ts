import { describe, expect, test } from 'bun:test'
import type { RequirementData } from '@/utilities/requirements'
import { checkRequirement, getRequirementProgress } from '@/utilities/requirements'
import { analyzeRequirements } from '@/utilities/requirements/analysis'
import { checkTaskCriteria, checkTaskRequirements, getTaskProgress } from '@/utilities/tasks/task-logic'
import type { Task, TaskCondition } from '@/data/tasks'
import { isToday } from '@/utilities/date-utils'

const baseRequirementData = {
  user: { id: 'user-1' },
  inventory: [],
  pokemon: [],
  tcg: [],
  pokedex: [],
  completedTasks: [],
  battleResults: [],
  locationEncounterResults: [],
  researchEncounterResults: [],
} as unknown as RequirementData

describe('requirements and criteria semantics', () => {
  test('daily reset checks use UTC calendar days', () => {
    expect(isToday('2026-05-12T23:30:00.000Z', '2026-05-12T00:15:00.000Z')).toBe(true)
    expect(isToday('2026-05-12T23:30:00.000Z', '2026-05-13T00:15:00.000Z')).toBe(false)
  })

  test('requirements gate access while criteria gate completion', () => {
    const task = {
      id: 'starter-task',
      name: 'Starter Task',
      description: '',
      category: 'Test',
      icon: { type: 'item', id: 'poke-ball' },
      repeatable: false,
      requirements: [{ type: 'task_completed', targetId: 'tutorial-1' }],
      criteria: [{ type: 'item_owned', targetId: 'poke-ball', count: 1 }],
      rewards: [],
    } as Task

    const unlockedData = {
      ...baseRequirementData,
      completedTasks: [{ taskId: 'tutorial-1', completedAt: new Date().toISOString(), count: 1 }],
    } as RequirementData

    const completedData = {
      ...unlockedData,
      inventory: [{ itemId: 'poke-ball', quantity: 1 }],
    } as RequirementData

    expect(checkTaskRequirements(baseRequirementData, task)).toBe(false)
    expect(checkTaskRequirements(unlockedData, task)).toBe(true)
    expect(checkTaskCriteria(unlockedData, task)).toBe(false)
    expect(checkTaskCriteria(completedData, task)).toBe(true)
  })

  test('progress reports current values without mutating state', () => {
    const data = {
      ...baseRequirementData,
      inventory: [{ itemId: 'old-rod', quantity: 2 }],
    } as RequirementData

    expect(getRequirementProgress(data, { type: 'item_owned', targetId: 'old-rod', count: 3 }))
      .toMatchObject({
        current: 2,
        target: 3,
        completed: false,
      })

    expect(checkRequirement(data, { type: 'item_owned', targetId: 'old-rod', count: 2 })).toBe(true)
  })

  test('any_of requirements pass when any nested requirement passes', () => {
    const requirement: TaskCondition = {
      type: 'any_of',
      conditions: [
        {
          type: 'card_collected_set',
          targetId: 'base3',
          count: 62,
          unique: true,
          inverse: true,
        },
        { type: 'research_level', targetId: '142', count: 1, inverse: true },
      ],
    }
    const completeData = {
      ...baseRequirementData,
      tcg: Array.from({ length: 62 }, (_, index) => ({
        cardId: `base3-${index + 1}`,
        setId: 'base3',
        quantity: 1,
      })),
      pokedex: [
        {
          speciesId: 142,
          formId: '142',
          seen: true,
          caught: true,
          researchLevel: 1,
          researchXp: 10,
        },
      ],
    } as RequirementData

    expect(checkRequirement(baseRequirementData, requirement)).toBe(true)
    expect(getRequirementProgress(completeData, requirement)).toMatchObject({
      current: 0,
      target: 1,
      completed: false,
    })
    expect(analyzeRequirements([requirement]).sort()).toEqual(['pokedex', 'tcg'])
  })

  test('research level requirements use the highest level when duplicate form rows exist', () => {
    const data = {
      ...baseRequirementData,
      pokedex: [
        { speciesId: 10, formId: '13', seen: true, caught: false },
        {
          speciesId: 13,
          formId: '13',
          seen: true,
          caught: true,
          researchLevel: 2,
          researchXp: 133,
        },
      ],
    } as RequirementData

    expect(
      getRequirementProgress(data, {
        type: 'research_level',
        targetId: '13',
        count: 1,
      }),
    ).toMatchObject({
      current: 2,
      target: 1,
      completed: true,
    })
  })

  test('repeatable task requirements use stored completion counts', () => {
    const data = {
      ...baseRequirementData,
      completedTasks: [
        { taskId: 'repeatable-task', completedAt: new Date().toISOString(), count: 4 },
      ],
    } as RequirementData

    expect(
      getRequirementProgress(data, {
        type: 'task_completed',
        targetId: 'repeatable-task',
        count: 5,
      }),
    ).toMatchObject({
      current: 4,
      target: 5,
      completed: false,
    })

    expect(
      checkRequirement(
        {
          ...data,
          completedTasks: [
            { taskId: 'repeatable-task', completedAt: new Date().toISOString(), count: 5 },
          ],
        } as RequirementData,
        { type: 'task_completed', targetId: 'repeatable-task', count: 5 },
      ),
    ).toBe(true)

    expect(
      checkRequirement(
        {
          ...baseRequirementData,
          completedTasks: [
            { taskId: 'legacy-task', completedAt: new Date().toISOString() } as any,
          ],
        } as RequirementData,
        { type: 'task_completed', targetId: 'legacy-task' },
      ),
    ).toBe(true)
  })

  test('unique card set requirements count card ids instead of duplicate copies', () => {
    const duplicateHeavyCollection = [
      { cardId: 'base3-1', setId: 'base3', quantity: 20 },
      { cardId: 'base3-2', setId: 'base3', quantity: 13 },
    ]

    const data = {
      ...baseRequirementData,
      tcg: duplicateHeavyCollection,
    } as RequirementData

    expect(
      getRequirementProgress(data, {
        type: 'card_collected_set',
        targetId: 'base3',
        count: 3,
      }),
    ).toMatchObject({
      current: 33,
      completed: true,
    })

    expect(
      getRequirementProgress(data, {
        type: 'card_collected_set',
        targetId: 'base3',
        count: 3,
        unique: true,
      }),
    ).toMatchObject({
      current: 2,
      completed: false,
    })
  })

  test('location result requirements can be satisfied by any authored target', () => {
    const data = {
      ...baseRequirementData,
      locationEncounterResults: [
        {
          locationId: 'charmander-den-growlithe',
          wins: 1,
          losses: 0,
          lastPlayed: new Date().toISOString(),
        },
      ],
    } as RequirementData

    const requirement: TaskCondition = {
      type: 'location_encounter_result',
      targetId: ['charmander-den', 'charmander-den-growlithe'],
      count: 1,
    }

    expect(getRequirementProgress(data, requirement)).toMatchObject({
      current: 1,
      target: 1,
      completed: true,
    })
    expect(checkRequirement(data, requirement)).toBe(true)
  })

  test('rival selection requirements track whether a rival trainer is set', () => {
    const data = {
      ...baseRequirementData,
      user: { id: 'user-1', rivalTrainerId: 'user-2' },
    } as unknown as RequirementData

    expect(checkRequirement(data, { type: 'rival_selected' })).toBe(true)
    expect(checkRequirement(baseRequirementData, { type: 'rival_selected' })).toBe(false)
    expect(checkRequirement(baseRequirementData, { type: 'rival_selected', inverse: true })).toBe(
      true,
    )
    expect(getRequirementProgress(data, { type: 'rival_selected' })).toMatchObject({
      current: 1,
      target: 1,
      completed: true,
    })
  })

  test('time range criteria fall back to UTC consistently', () => {
    const data = {
      ...baseRequirementData,
      currentTime: '2026-05-13T07:30:00.000Z',
    } as RequirementData

    expect(
      checkRequirement(data, {
        type: 'time_range',
        timeRange: { start: '07:00', end: '08:00' },
      }),
    ).toBe(true)

    expect(
      checkRequirement(
        { ...data, currentTime: '2026-05-13T06:59:00.000Z' } as RequirementData,
        {
          type: 'time_range',
          timeRange: { start: '07:00', end: '08:00' },
        },
      ),
    ).toBe(false)
  })

  test('weather requirements resolve against sub-region weather slots', () => {
    const data = {
      ...baseRequirementData,
      weatherSlot: 1,
    } as RequirementData

    expect(
      checkRequirement(
        data,
        { type: 'weather', targetId: 'rain' },
        { category: 'Kanto', subCategory: 'Viridian Forest' },
      ),
    ).toBe(true)

    expect(
      checkRequirement(
        data,
        { type: 'weather', targetId: ['rain', 'thunderstorm'] },
        { category: 'Kanto', subCategory: 'Viridian Forest' },
      ),
    ).toBe(true)

    expect(
      checkRequirement(
        data,
        { type: 'weather', targetId: 'thunderstorm' },
        { category: 'Kanto', subCategory: 'Viridian Forest' },
      ),
    ).toBe(false)

    expect(
      checkRequirement(
        data,
        { type: 'weather', targetId: 'thunderstorm', inverse: true },
        { category: 'Kanto', subCategory: 'Viridian Forest' },
      ),
    ).toBe(true)
  })

  test('time range criteria use the region timezone when a category is provided', () => {
    const data = {
      ...baseRequirementData,
      currentTime: '2026-05-12T22:30:00.000Z',
    } as RequirementData

    expect(
      checkRequirement(
        data,
        {
          type: 'time_range',
          timeRange: { start: '07:00', end: '08:00' },
        },
        { category: 'Kanto' },
      ),
    ).toBe(true)

    expect(
      checkRequirement(data, {
        type: 'time_range',
        timeRange: { start: '07:00', end: '08:00' },
      }),
    ).toBe(false)
  })

  test('non-repeatable completed tasks stay completed independent of criteria', () => {
    const task = {
      id: 'claim-once',
      name: 'Claim Once',
      description: '',
      category: 'Test',
      icon: { type: 'item', id: 'potion' },
      repeatable: false,
      requirements: [],
      criteria: [{ type: 'item_owned', targetId: 'potion', count: 1 }],
      rewards: [],
    } as Task

    const data = {
      ...baseRequirementData,
      completedTasks: [{ taskId: 'claim-once', completedAt: new Date().toISOString(), count: 1 }],
    } as RequirementData

    expect(getTaskProgress(data, task)).toMatchObject({
      isCompleted: true,
      criteriaMet: false,
    })
  })

  test('pokemon criteria can require radiant or shadow variants', () => {
    const data = {
      ...baseRequirementData,
      pokemon: [
        { speciesId: 25, formId: '25', level: 12, isRadiant: true },
        { speciesId: 25, formId: '25', level: 12, isShadow: true },
        { speciesId: 25, formId: '25', level: 12 },
      ],
    } as unknown as RequirementData

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 1,
        pokemonCriteria: { speciesId: 25, isRadiant: true },
      }),
    ).toBe(true)

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 2,
        pokemonCriteria: { speciesId: 25, isRadiant: true },
      }),
    ).toBe(false)

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 1,
        pokemonCriteria: { speciesId: 25, isShadow: true },
      }),
    ).toBe(true)
  })

  test('pokemon criteria can require partner ownership', () => {
    const data = {
      ...baseRequirementData,
      pokemon: [
        { speciesId: 83, formId: '83', level: 12, partner: false },
        { speciesId: 83, formId: '83', level: 12, partner: true },
      ],
    } as unknown as RequirementData

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 1,
        pokemonCriteria: { speciesId: 83, partner: true },
      }),
    ).toBe(true)

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 1,
        pokemonCriteria: { speciesId: 83, partner: false },
      }),
    ).toBe(true)

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 2,
        pokemonCriteria: { speciesId: 83, partner: true },
      }),
    ).toBe(false)
  })

  test('pokemon criteria can require obtained region or location', () => {
    const data = {
      ...baseRequirementData,
      pokemon: [
        {
          speciesId: 19,
          formId: '19',
          level: 12,
          obtainedMethod: 'caught',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Route 4',
          obtainedSourceId: 'route-4',
        },
        {
          speciesId: 19,
          formId: '19',
          level: 12,
          obtainedMethod: 'caught',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Route 4',
          obtainedSourceId: 'route-4',
        },
        {
          speciesId: 19,
          formId: '19',
          level: 12,
          obtainedMethod: 'caught',
          obtainedRegion: 'Johto',
          obtainedLocation: 'Route 29',
          obtainedSourceId: 'route-29',
        },
        {
          speciesId: 21,
          formId: '21',
          level: 12,
          obtainedMethod: 'caught',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Route 4',
          obtainedSourceId: 'route-4',
        },
      ],
    } as unknown as RequirementData

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 3,
        pokemonCriteria: { region: 'kanto' },
      }),
    ).toBe(true)

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 3,
        pokemonCriteria: { speciesId: 19, region: 'Kanto' },
      }),
    ).toBe(false)

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 2,
        pokemonCriteria: { speciesId: 19, location: 'Route 4' },
      }),
    ).toBe(true)

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 2,
        pokemonCriteria: { speciesId: 19, locationId: 'route-4' },
      }),
    ).toBe(true)
  })

  test('pokemon criteria can require current stats', () => {
    const data = {
      ...baseRequirementData,
      pokemon: [
        { speciesId: 66, formId: '66', level: 20, stats: { attack: 51 } },
        { speciesId: 56, formId: '56', level: 20, stats: { attack: 50 } },
        { speciesId: 19, formId: '19', level: 20, stats: { attack: 49 } },
      ],
    } as unknown as RequirementData

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 2,
        pokemonCriteria: { stats: { attack: 50 } },
      }),
    ).toBe(true)

    expect(
      checkRequirement(data, {
        type: 'pokemon_owned',
        count: 3,
        pokemonCriteria: { stats: { attack: 50 } },
      }),
    ).toBe(false)
  })

  test('companion requirements only pass for the active matching companion', () => {
    const noCompanionData = {
      ...baseRequirementData,
      pokemon: [{ speciesId: 1, formId: '1', level: 12 }],
    } as unknown as RequirementData

    const nonGrassCompanionData = {
      ...baseRequirementData,
      pokemon: [{ speciesId: 4, formId: '4', level: 12, isCompanion: true }],
    } as unknown as RequirementData

    const grassCompanionData = {
      ...baseRequirementData,
      pokemon: [{ speciesId: 1, formId: '1', level: 12, isCompanion: true }],
    } as unknown as RequirementData

    const grassCompanionRequirement = {
      type: 'companion',
      companionCheck: { type: 'grass' },
    } as const

    expect(checkRequirement(noCompanionData, grassCompanionRequirement)).toBe(false)
    expect(checkRequirement(nonGrassCompanionData, grassCompanionRequirement)).toBe(false)
    expect(checkRequirement(grassCompanionData, grassCompanionRequirement)).toBe(true)
  })
})
