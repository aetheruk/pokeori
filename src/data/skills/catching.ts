import { SkillLevel } from './battling'
import { SLOW_EXP_TABLE } from './xp'

export const catchingLevels: SkillLevel[] = Array.from({ length: 11 }, (_, index) => {
  const level = index + 1
  return {
    level,
    expRequired: level === 1 ? 0 : SLOW_EXP_TABLE[level],
  }
})

export function getCatchingLevel(level: number): SkillLevel | undefined {
  return catchingLevels.find((tl) => tl.level === level)
}
