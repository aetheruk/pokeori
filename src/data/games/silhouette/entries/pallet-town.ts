import { SilhouetteConfig } from '../types'

export const palletTownsilhouetteEntries: SilhouetteConfig[] = [
  // Pallet Town - Brock's Terrible Photo
  {
    id: 'who-tutorial',
    name: "Brock's Terrible Photo",
    description:
      "Brock seemed really excited to see me... strange... Right let's figure out what Pokemon this is a photo of.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'research_encounter_result',
        targetId: 'who-tutorial',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-10',
      },
    ],
    skillXp: { skill: 'researching', level: 1 },
    rewards: [],
    settings: {
      pokemonPool: [112],
      optionsPool: [],
      timeLimit: 60,
      winRate: 1,
    },
  },
]
