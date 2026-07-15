import { SLOW_EXP_TABLE } from './xp'
import { SkillLevel } from './battling'

export const rankedBattlingLevels: SkillLevel[] = Array.from({ length: 10 }, (_, index) => {
  const level = index + 1
  return {
    level,
    expRequired: level === 1 ? 0 : SLOW_EXP_TABLE[level],
  }
})

export function getRankedBattlingLevel(level: number): SkillLevel | undefined {
  return rankedBattlingLevels.find((tl) => tl.level === level)
}
