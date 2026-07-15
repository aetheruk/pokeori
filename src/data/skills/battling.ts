import { TaskCardRewardParams } from '../tasks'
import { SLOW_EXP_TABLE } from './xp'

export interface SkillLevelReward {
  type: 'item' | 'pokemon' | 'card' | 'xp' | 'currency' | 'task_complete'
  targetId?: string | number
  quantity?: number
  cardDrawParams?: TaskCardRewardParams
  dropChance?: number // 0-100 percentage
}

export interface SkillLevel {
  level: number
  expRequired: number
  rewards?: SkillLevelReward[]
}

export const battlingLevels: SkillLevel[] = Array.from({ length: 10 }, (_, index) => {
  const level = index + 1
  return {
    level,
    expRequired: level === 1 ? 0 : SLOW_EXP_TABLE[level],
  }
})

export function getBattlingLevel(level: number): SkillLevel | undefined {
  return battlingLevels.find((tl) => tl.level === level)
}
