import type { SkillLevel } from './battling'
import { SLOW_EXP_TABLE } from './xp'

export const artisanLevels: SkillLevel[] = Array.from({ length: 100 }, (_, index) => {
  const level = index + 1
  return {
    level,
    expRequired: level === 1 ? 0 : SLOW_EXP_TABLE[level],
  }
})

export function getArtisanLevel(level: number): SkillLevel | undefined {
  return artisanLevels.find((l) => l.level === level)
}
