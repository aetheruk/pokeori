import { IdentifyConfig } from '../types'

export const fuchsiaCityidentifyEntries: IdentifyConfig[] = [
  {
    id: 'fuchsia-research-institute-identify',
    name: 'Institute Membership Assessment',
    description:
      'Identify the Pokémon in the institute’s Safari records to prove you can conduct fieldwork without disturbing the habitats.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: { type: 'trainer', id: 'researcher-f' },
    background: '/backgrounds/lab.avif',
    requirements: [
      { type: 'task_completed', targetId: 'safari-zone-entry-denied' },
      { type: 'skill_level', targetId: 'researching', count: 30 },
    ],
    rewards: [],
    skillXp: { skill: 'researching', level: 30 },
    settings: {
      pokemonPool: [29, 32, 46, 48, 102, 111, 113, 115, 123, 127, 128],
      optionsPool: [],
      timeLimit: 45,
      winRate: 12,
    },
  },
]
