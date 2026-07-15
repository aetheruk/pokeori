import { CompareConfig } from '../types'

export const palletTowncompareEntries: CompareConfig[] = [
  // Pallet Town - Brock the Tutor
  {
    id: 'tutorial-compare',
    name: 'Brock the Tutor',
    description:
      "What is going on… I don't think knowing the stats of the Rhydon is going to help me out here.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'pokemon',
      id: '112',
    },
    background: '/backgrounds/lab.avif',
    requirements: [
      { type: 'research_encounter_result', targetId: 'tutorial-compare', count: 1, inverse: true },
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-13',
      },
    ],
    skillXp: { skill: 'researching', level: 1 },
    rewards: [],
    settings: {
      pokemonPool: [112, 111],
      optionsPool: [],
      timeLimit: 60,
      winRate: 4,
      maxPokemonShown: 2,
      comparisonOperator: [
        'height',
        'weight',
        'hp',
        'attack',
        'defense',
        'specialAttack',
        'specialDefense',
        'speed',
      ],
    },
  },
  // Pallet Town - Researching the Stat Module
  {
    id: 'stat-module-easy',
    name: 'Researching the Stat Module',
    description:
      'Ive been tasked with calibrating the stat module for the Pokedex with enough data we should be a step closer to completing it!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'item',
      id: 'stats-scanner',
    },
    background: '/backgrounds/lab.avif',
    hide: 'stat-module-1',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'researcher-life-1',
      },
    ],
    rewards: [
      {
        type: 'item',
        dropChance: 20,
        targetId: 'stats-data-1',
        quantity: 1,
      },
      {
        type: 'item',
        dropChance: 20,
        targetId: 'stats-data-2',
        quantity: 1,
      },
      {
        type: 'item',
        dropChance: 20,
        targetId: 'stats-data-3',
        quantity: 1,
      },
      {
        type: 'item',
        dropChance: 20,
        targetId: 'stats-data-4',
        quantity: 1,
      },
      {
        type: 'item',
        dropChance: 20,
        targetId: 'stats-data-5',
        quantity: 1,
      },
    ],
    skillXp: { skill: 'researching', level: 8 },
    settings: {
      pokemonPool: [1, 4, 7],
      optionsPool: [],
      timeLimit: 60,
      winRate: 3,
      maxPokemonShown: 2,
      comparisonOperator: ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'],
      lose_points: 1,
    },
  },
  // Pallet Town - Fine Tuning the Stat Module
  {
    id: 'stat-module-hard',
    name: 'Fine Tuning the Stat Module',
    description:
      'This next step is going to be a bit more challenging, one wrong move and Ill need to start over!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'item',
      id: 'stats-scanner',
    },
    background: '/backgrounds/lab.avif',
    requirements: [
      { type: 'research_encounter_result', targetId: 'stat-module-hard', count: 1, inverse: true },
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'stat-module-2',
      },
    ],
    rewards: [
      {
        type: 'xp',
        dropChance: 100,
        skill: 'researching',
        quantity: 500,
      },
    ],
    settings: {
      pokemonPool: [1, 4, 7],
      optionsPool: [],
      timeLimit: 120,
      winRate: 10,
      maxPokemonShown: 2,
      death: true,
      comparisonOperator: ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'],
    },
  },
]
