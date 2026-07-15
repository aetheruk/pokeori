import { SLOW_EXP_TABLE } from './xp'
import type { SkillLevel } from './battling'

export const researchingLevels: SkillLevel[] = Array.from({ length: 10 }, (_, index) => {
  const level = index + 1
  return {
    level,
    expRequired: level === 1 ? 0 : SLOW_EXP_TABLE[level],
  }
})

export function getResearchingLevel(level: number): SkillLevel | undefined {
  return researchingLevels.find((l) => l.level === level)
}
