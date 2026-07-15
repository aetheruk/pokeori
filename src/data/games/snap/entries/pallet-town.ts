import { SnapConfig } from '../types'

export const palletTownsnapEntries: SnapConfig[] = [
  // Pallet Town - Bootleg Artwork
  {
    id: 'tutorial-snap',
    name: 'Bootleg Artwork',
    description:
      "TCG Maniac Terrance wants some photos to help design his bootleg cards… I'm not sure why I'm going along with this.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'tcg-maniac-m',
    },
    background: '/backgrounds/lab.avif',
    requirements: [
      {
        type: 'research_encounter_result',
        targetId: 'tutorial-snap',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-8',
      },
    ],
    skillXp: { skill: 'researching', level: 1 },
    rewards: [],
    settings: {
      pokemonPool: [4, 1, 7],
      optionsPool: [],
      timeLimit: 60,
      winRate: 4,
      successThreshold: 1000,
    },
  },
]
