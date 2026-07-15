import { describe, expect, test } from 'bun:test'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { mapCriteriaToDisplayItem } from '@/components/game/shared/criteria-mapping'
import { mapRewardToDisplayItem } from '@/components/game/shared/reward-mapping'

describe('display mapping copy', () => {
  test('location and wild battle result criteria use activity-specific language', () => {
    const catchRequirement = mapCriteriaToDisplayItem({
      type: 'location_encounter_result',
      targetId: 'route-6',
      count: 3,
    })
    const battleRequirement = mapCriteriaToDisplayItem({
      type: 'battle_result',
      targetId: 'route-6-battle',
      battleStatus: 'win',
      count: 3,
    })

    expect(catchRequirement.label).toBe('Catch 3 Pokemon on Route 6')
    expect(battleRequirement.label).toBe('Defeat 3 Pokemon on Route 6')
  })

  test('single-species catch areas name the Pokemon being caught', () => {
    const requirement = mapCriteriaToDisplayItem({
      type: 'location_encounter_result',
      targetId: 'charmander-den',
      count: 1,
    })

    expect(requirement.label).toBe("Catch Charmander in Charmander's Den")
  })

  test('content prerequisites use content icons instead of generic requirement icons', () => {
    const requirement = mapCriteriaToDisplayItem({
      type: 'task_completed',
      targetId: 'charred-hiker-3',
    })
    const reward = mapRewardToDisplayItem(
      {
        type: 'task_complete',
        targetId: 'charred-hiker-4',
      },
      { checkRequirements: () => true, completedTasks: [] },
    )

    expect(requirement.label).toBe('Complete (Not) Cerulean Cave')
    expect((requirement.icon as any).type).toBe(TaskIconDisplay)
    expect(reward?.label).toBe('Unlock: A CHARming Culprit')
    expect((reward?.icon as any).type).toBe(TaskIconDisplay)
  })

  test('secret task-complete rewards do not reveal their icons', () => {
    const reward = mapRewardToDisplayItem(
      {
        type: 'task_complete',
        targetId: 'cerulean-city-complete',
        secret: true,
      },
      { checkRequirements: () => true, completedTasks: [] },
    )

    expect(reward?.label).toBe('???')
    expect(reward?.subLabel).toBe('Secret Reward')
    expect((reward?.icon as any).type).not.toBe(TaskIconDisplay)

    const targetSecretReward = mapRewardToDisplayItem(
      {
        type: 'task_complete',
        targetId: 'mt-moon-strange-wall',
      },
      { checkRequirements: () => true, completedTasks: [] },
    )

    expect(targetSecretReward?.label).toBe('Secret to Unlock')
    expect((targetSecretReward?.icon as any).type).not.toBe(TaskIconDisplay)
  })

  test('companion criteria can use authored requirement copy', () => {
    const requirement = mapCriteriaToDisplayItem({
      type: 'companion',
      count: 1,
      companionCheck: {
        speciesId: 25,
        formId: '25',
        minLevel: 20,
      },
      label: 'Bring a Level 20 Pikachu to start the power supply',
    })

    expect(requirement.label).toBe('Bring a Level 20 Pikachu to start the power supply')
    expect(requirement.subLabel).toBe('Active Companion')
  })

  test('set collection criteria use set names without duplicating progress counts', () => {
    const requirement = mapCriteriaToDisplayItem({
      type: 'card_collected_set',
      targetId: 'base3',
      count: 40,
    })

    expect(requirement.label).toBe('Fossil Collection')
    expect(requirement.subLabel).toBe('Collection Requirement')
  })
})
