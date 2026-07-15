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
    iconId: 'explorer-v2.png',
  },
  {
    id: 'battling',
    name: 'Trainer',
    description: 'Become the Best Trainer.',
    iconId: 'trainer-v2.png',
  },
  {
    id: 'researching',
    name: 'Researcher',
    description: 'Master Pokemon Knowledge.',
    iconId: 'researcher-v2.png',
  },
  {
    id: 'artisan',
    name: 'Artisan',
    description: 'Gather materials and craft useful items.',
    iconId: 'artisan-v2.png',
  },
  {
    id: 'ranked-battling',
    name: 'PVP Rank',
    description: 'Dominate the Competitive Arena.',
    iconId: 'ranked-v2.png',
  },
]

export function getSkill(id: string): Skill | undefined {
  return skills.find((s) => s.id === id)
}
