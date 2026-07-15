import { CryConfig } from '../types'

const palletOrientationRequirements: CryConfig['requirements'] = [
  {
    type: 'pokedex_caught_total',
    count: 1,
  },
  {
    type: 'task_completed',
    targetId: 'tutorial-16',
    inverse: true,
  },
  {
    type: 'expedition_result',
    targetId: 'pallet-town-orientation',
    expeditionStatus: 'completed',
    count: 1,
    inverse: true,
  },
]

export const palletTowncryEntries: CryConfig[] = [
  {
    id: 'pallet-orientation-cry',
    name: 'The Cable Cabinet Cry',
    description:
      "Something is hiding behind Oak's cable cabinet. Listen to the cry and identify it before the lab loses power.",
    category: 'Secret',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/lab.avif',
    requirements: palletOrientationRequirements,
    rewards: [],
    settings: {
      pokemonPool: [19, 1, 7, 4],
      optionsPool: [],
      timeLimit: 60,
      winRate: 3,
      maxPokemonShown: 2,
    },
  },
  // Pallet Town - Rustling in the Lab
  {
    id: 'tutorial-sound',
    name: 'Rustling in the Lab',
    description:
      'Researcher Jim, has asked me to get to the bottom of the pest problem in the lab, I best get to it!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/lab.avif',
    requirements: [
      { type: 'research_encounter_result', targetId: 'tutorial-sound', count: 1, inverse: true },
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-2',
      },
    ],
    skillXp: { skill: 'researching', level: 1 },
    rewards: [],
    settings: {
      pokemonPool: [19, 1, 7, 4],
      optionsPool: [],
      timeLimit: 60,
      winRate: 5,
      maxPokemonShown: 2,
    },
  },
]
