import {
  SKILL_TITLE_TIERS,
  getSkillTitleId,
  getSkillTitleName,
  type CoreSkillId,
} from '@/utilities/skills/unlocks'

export interface TitleConfig {
  id: string
  name: string // Name is also the displayed message
}

const skillTitleConfigs: TitleConfig[] = (
  ['battling', 'catching', 'researching', 'artisan'] as CoreSkillId[]
)
  .flatMap((skillId) =>
    SKILL_TITLE_TIERS.map((tier) => ({
      id: getSkillTitleId(skillId, tier.level),
      name: getSkillTitleName(skillId, tier.level),
    })),
  )

export const titles: TitleConfig[] = [
  // Default
  { id: 'new-beginnings', name: 'New Beginnings' },
  // Gen 1
  { id: 'starter-grass', name: 'New Leaf' },
  { id: 'starter-fire', name: 'Tiny Ember' },
  { id: 'starter-water', name: 'Bubble Blower' },
  // Unlocks
  { id: 'boulder-breaker', name: 'Boulder Breaker' },
  { id: 'cascade-caller', name: 'Cascade Caller' },
  { id: 'lightning-lieutenant', name: 'Lightning Lieutenant' },
  { id: 'joey-friend', name: "Joey's Best Friend" },
  { id: 'team-rocket-grunt', name: 'Team Rocket Grunt' },
  { id: 'golden-child', name: 'Golden Child' },
  { id: 'the-captain', name: 'The Captain' },
  { id: 'the-nido-king', name: 'The Nido King' },
  { id: 'the-nido-queen', name: 'The Nido Queen' },
  ...skillTitleConfigs,
]

export function getTitle(id: string): TitleConfig | undefined {
  return titles.find((t) => t.id === id)
}
