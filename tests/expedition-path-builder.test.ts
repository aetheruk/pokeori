import { describe, expect, test } from 'bun:test'
import { palletTownExpeditions } from '@/data/expeditions/entries/pallet-town'
import { ssAnneExpeditions } from '@/data/expeditions/entries/ss-anne'
import type { ExpeditionConfig } from '@/data/expeditions'
import {
  buildExpeditionSteps,
  resolveResultBranchAfterStep,
} from '@/utilities/expeditions/path-builder'
import type { RequirementData } from '@/utilities/requirements'

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
  expeditionResults: [],
} as unknown as RequirementData

describe('expedition path builder', () => {
  test('builds and resolves result branches from the previous activity outcome', () => {
    const expedition: ExpeditionConfig = {
      id: 'test-result-branch-expedition',
      name: 'Test Result Branch Expedition',
      description: 'Tests result branch path generation.',
      category: 'test',
      icon: { type: 'trainer', id: 'oak' },
      maxLosses: 3,
      activityPool: {},
      path: [
        {
          type: 'activity',
          id: 'catch-step',
          activityType: 'task',
          activityId: 'pallet-orientation-professor-briefing',
        },
        {
          type: 'result_branch',
          id: 'after-catch',
          sourceStepId: 'catch-step',
          results: [
            {
              result: 'win',
              nodes: [
                {
                  type: 'activity',
                  id: 'win-route',
                  activityType: 'task',
                  activityId: 'pallet-orientation-battle-briefing',
                },
              ],
            },
            {
              result: 'loss',
              nodes: [
                {
                  type: 'activity',
                  id: 'loss-route',
                  activityType: 'task',
                  activityId: 'pallet-orientation-rival-selection',
                },
              ],
            },
          ],
        },
        {
          type: 'activity',
          id: 'wrap-up',
          activityType: 'task',
          activityId: 'pallet-orientation-wrap-up',
        },
      ],
      rewards: [],
    }

    const userData = {
      ...baseRequirementData,
      pokedex: [
        {
          speciesId: 1,
          formId: '1',
          seen: true,
          caught: true,
        },
      ],
    } as RequirementData

    const steps = buildExpeditionSteps(expedition, userData)

    expect(steps).toHaveLength(3)
    expect(steps[1].type).toBe('result_branch')
    expect(steps[1].resultOptions?.map((option) => option.result)).toEqual([
      'win',
      'loss',
    ])

    const winRoute = resolveResultBranchAfterStep(steps, 0, 'win')
    expect(winRoute?.nextStepIndex).toBe(1)
    expect(winRoute?.steps.map((step) => step.stepId)).toEqual([
      'catch-step',
      'win-route',
      'wrap-up',
    ])

    const lossRoute = resolveResultBranchAfterStep(steps, 0, 'loss')
    expect(lossRoute?.nextStepIndex).toBe(1)
    expect(lossRoute?.steps.map((step) => step.stepId)).toEqual([
      'catch-step',
      'loss-route',
      'wrap-up',
    ])
  })

  test('resolves terminal result branches without keeping later path steps', () => {
    const expedition: ExpeditionConfig = {
      id: 'test-terminal-result-branch-expedition',
      name: 'Test Terminal Result Branch Expedition',
      description: 'Tests terminal result branch path generation.',
      category: 'test',
      icon: { type: 'trainer', id: 'oak' },
      maxLosses: 3,
      activityPool: {},
      path: [
        {
          type: 'activity',
          id: 'secret-check',
          activityType: 'task',
          activityId: 'pallet-orientation-professor-briefing',
        },
        {
          type: 'result_branch',
          id: 'secret-check-result',
          sourceStepId: 'secret-check',
          results: [
            {
              result: 'win',
              end: 'complete',
            },
            {
              result: 'loss',
              end: 'fail',
            },
          ],
        },
        {
          type: 'activity',
          id: 'standard-route',
          activityType: 'task',
          activityId: 'pallet-orientation-wrap-up',
        },
      ],
      rewards: [],
    }

    const userData = {
      ...baseRequirementData,
      pokedex: [
        {
          speciesId: 1,
          formId: '1',
          seen: true,
          caught: true,
        },
      ],
    } as RequirementData

    const steps = buildExpeditionSteps(expedition, userData)
    const winRoute = resolveResultBranchAfterStep(steps, 0, 'win')
    const lossRoute = resolveResultBranchAfterStep(steps, 0, 'loss')

    expect(winRoute?.end).toBe('complete')
    expect(winRoute?.steps.map((step) => step.stepId)).toEqual([
      'secret-check',
    ])
    expect(lossRoute?.end).toBe('fail')
    expect(lossRoute?.steps.map((step) => step.stepId)).toEqual([
      'secret-check',
    ])
  })

  test('builds the Pallet Town guided tutorial with field research before open Pallet unlocks', () => {
    const expedition = palletTownExpeditions.find(
      (entry) => entry.id === 'pallet-town-orientation',
    )
    expect(expedition).toBeDefined()
    expect(expedition?.canAbandon).toBe(false)
    expect(expedition?.canFail).toBe(false)

    const userData = {
      ...baseRequirementData,
      pokedex: [
        {
          speciesId: 1,
          formId: '1',
          seen: true,
          caught: true,
        },
      ],
    } as RequirementData

    const steps = buildExpeditionSteps(expedition!, userData)

    expect(steps).toHaveLength(9)
    expect(steps[0].activityId).toBe('pallet-orientation-professor-briefing')
    expect(steps[1].activityId).toBe('pallet-orientation-cry')
    expect(steps[7].activityId).toBe('pallet-orientation-rival-selection')
    expect(
      steps.some(
        (step) => step.activityId === 'pallet-orientation-field-observation',
      ),
    ).toBe(true)
    expect(steps.some((step) => step.activityType === 'location')).toBe(true)
    expect(steps.at(-1)?.activityId).toBe('pallet-orientation-wrap-up')
  })

  test('does not require future step criteria before generating the SS Anne path', () => {
    const expedition = ssAnneExpeditions.find(
      (entry) => entry.id === 'ss-anne-repair-duty',
    )
    expect(expedition).toBeDefined()

    const userData = {
      ...baseRequirementData,
      completedTasks: [
        {
          taskId: 'chaos-at-the-coast',
          completedAt: new Date().toISOString(),
          count: 1,
        },
      ],
    } as RequirementData

    const steps = buildExpeditionSteps(expedition!, userData)

    expect(
      steps.some((step) => step.activityId === 'ss-anne-power-the-ship'),
    ).toBe(true)
    expect(steps).toHaveLength(16)
  })

  test('still rejects forced activities when their requirements are unmet', () => {
    const expedition = ssAnneExpeditions.find(
      (entry) => entry.id === 'ss-anne-repair-duty',
    )
    expect(expedition).toBeDefined()

    expect(() =>
      buildExpeditionSteps(expedition!, baseRequirementData),
    ).toThrow(/Forced expedition activity is gated/)
  })

  test('builds a shorter SS Anne evening replay with one random branch and five battles', () => {
    const expedition = ssAnneExpeditions.find(
      (entry) => entry.id === 'ss-anne-evening-cruise',
    )
    expect(expedition).toBeDefined()

    const userData = {
      ...baseRequirementData,
      completedTasks: [
        {
          taskId: 'chaos-at-the-coast',
          completedAt: new Date().toISOString(),
          count: 1,
        },
      ],
      expeditionResults: [
        {
          expeditionId: 'ss-anne-repair-duty',
          wins: 1,
          losses: 0,
        },
      ],
    } as RequirementData

    const steps = buildExpeditionSteps(expedition!, userData)
    const battleSteps = steps.filter((step) => step.activityType === 'battle')
    const taskSteps = steps.filter((step) => step.activityType === 'task')

    expect(steps).toHaveLength(8)
    expect(steps.some((step) => step.type === 'branch_choice')).toBe(false)
    expect(steps[0].activityId).toBe('ss-anne-evening-cruise-welcome')
    expect(steps[1].activityId).toBe('ss-anne-youngster-eddie')
    expect(steps.at(-1)?.activityId).toBe('ss-anne-evening-cruise-farewell')
    expect(battleSteps).toHaveLength(5)
    expect(taskSteps).toHaveLength(3)
    expect(new Set(battleSteps.map((step) => step.activityId)).size).toBe(5)
  })
})
