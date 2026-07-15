import type { LocationReward } from '../shared'
import type { FieldObservationConfig } from './types'

export const FIELD_OBSERVATION_RESEARCH_KIT_DROP_CHANCE = 10

export function getDefaultFieldObservationRewards(): LocationReward[] {
  return [
    {
      type: 'item',
      targetId: 'research-kit',
      quantity: 1,
      dropChance: FIELD_OBSERVATION_RESEARCH_KIT_DROP_CHANCE,
      requirements: [{ type: 'skill_level', targetId: 'researching', count: 35 }],
    },
  ]
}

export function withDefaultFieldObservationRewards(
  entry: FieldObservationConfig,
): FieldObservationConfig {
  return {
    ...entry,
    rewards: [
      ...getDefaultFieldObservationRewards(),
      ...(entry.rewards || []),
    ],
  }
}
