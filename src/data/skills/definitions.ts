export interface Skill {
  id: string
  name: string
  description: string
  iconId?: string
}

export const skills: Skill[] = [
  {
    id: 'catching',
    name: 'Explorer',
    description: 'Travel & Catch Pokemon.',
    iconId: 'explorer.avif',
  },
  {
    id: 'battling',
    name: 'Trainer',
    description: 'Become the Best Trainer.',
    iconId: 'trainer.avif',
  },
  {
    id: 'researching',
    name: 'Researcher',
    description: 'Master Pokemon Knowledge.',
    iconId: 'researcher.avif',
  },
  {
    id: 'artisan',
    name: 'Artisan',
    description: 'Gather materials and craft useful items.',
    iconId: 'artisan.avif',
  },
  {
    id: 'ranked-battling',
    name: 'PVP Rank',
    description: 'Dominate the Competitive Arena.',
    iconId: 'ranked.avif',
  },
]

export function getSkill(id: string): Skill | undefined {
  return skills.find((s) => s.id === id)
}
