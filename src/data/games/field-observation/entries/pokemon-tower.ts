import { FieldObservationConfig } from '../types'

export const pokemonTowerFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'pokemon-tower-3f-field-observation',
    name: 'Pokemon Tower 3F',
    description: 'Observe the vaporous spirits and cave dwellers on the lower memorial floors.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '92',
    },
    background: '/backgrounds/pkmn-tower.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pokemon-tower-return-with-choo',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 92, formId: '92', weight: 80 },
        { speciesId: 41, formId: '41', weight: 20 },
      ],
      levelRange: {
        min: 20,
        max: 22,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
  {
    id: 'pokemon-tower-4f-field-observation',
    name: 'Pokemon Tower 4F',
    description: 'Study the wandering Gastly and mourning Cubone in the quiet chambers of 4F.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '104',
    },
    background: '/backgrounds/pkmn-tower.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'pokemon-tower-channeler-carly',
        battleStatus: 'win',
        count: 1,
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 92, formId: '92', weight: 70 },
        { speciesId: 41, formId: '41', weight: 15 },
        { speciesId: 104, formId: '104', weight: 15 },
      ],
      levelRange: {
        min: 21,
        max: 23,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
  {
    id: 'pokemon-tower-5f-field-observation',
    name: 'Pokemon Tower 5F',
    description: 'Record observations around the sacred purification zone on 5F.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '93',
    },
    background: '/backgrounds/pkmn-tower.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'pokemon-tower-channeler-paula',
        battleStatus: 'win',
        count: 1,
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 92, formId: '92', weight: 55 },
        { speciesId: 93, formId: '93', weight: 25 },
        { speciesId: 104, formId: '104', weight: 20 },
      ],
      levelRange: {
        min: 22,
        max: 25,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
  {
    id: 'pokemon-tower-6f-field-observation',
    name: 'Pokemon Tower 6F',
    description: 'Survey the highest spiritual corridor before the summit.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '93',
    },
    background: '/backgrounds/pkmn-tower.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'pokemon-tower-channeler-janae',
        battleStatus: 'win',
        count: 1,
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 92, formId: '92', weight: 45 },
        { speciesId: 93, formId: '93', weight: 35 },
        { speciesId: 104, formId: '104', weight: 20 },
      ],
      levelRange: {
        min: 23,
        max: 26,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
]
