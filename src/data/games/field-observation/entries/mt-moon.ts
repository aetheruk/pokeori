import { FieldObservationConfig } from '../types'

export const mtMoonFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'mt-moon-1f-field-observation',
    name: 'Mt. Moon 1F',
    description: 'A complex cave system rumoured to be home of pokemon from another world.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '41',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-pokemon-center',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 27, formId: '27', weight: 4 },
        { speciesId: 35, formId: '35', weight: 1 },
        { speciesId: 41, formId: '41', weight: 75 },
        { speciesId: 46, formId: '46', weight: 5 },
        { speciesId: 74, formId: '74', weight: 15 },
      ],
      levelRange: {
        min: 6,
        max: 12,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [
        {
          id: 'mt-moon-1f-rock-shield-tm',
          itemId: 'tm-rock-shield',
          dropChance: 2,
        },
      ],
    },
  },
  {
    id: 'mt-moon-b1f-field-observation',
    name: 'Mt. Moon B1F',
    description: 'Deeper down in the cave, so many Zubats!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '46',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-ladder-a',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 35, formId: '35', weight: 4 },
        { speciesId: 41, formId: '41', weight: 60 },
        { speciesId: 46, formId: '46', weight: 10 },
        { speciesId: 74, formId: '74', weight: 26 },
      ],
      levelRange: {
        min: 8,
        max: 12,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [
        {
          id: 'mt-moon-b1f-rock-shield-tm',
          itemId: 'tm-rock-shield',
          dropChance: 2,
        },
      ],
    },
  },
  {
    id: 'mt-moon-b2f-field-observation',
    name: 'Mt. Moon B2F',
    description: 'Somehow the pokemon seem slightly tougher down here...',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '35',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-ladder-e',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 35, formId: '35', weight: 6 },
        { speciesId: 41, formId: '41', weight: 49 },
        { speciesId: 46, formId: '46', weight: 15 },
        { speciesId: 74, formId: '74', weight: 30 },
      ],
      levelRange: {
        min: 9,
        max: 13,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [
        {
          id: 'mt-moon-b2f-rock-shield-tm',
          itemId: 'tm-rock-shield',
          dropChance: 2,
        },
      ],
    },
  },
]
