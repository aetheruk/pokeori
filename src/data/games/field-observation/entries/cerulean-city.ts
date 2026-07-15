import { FieldObservationConfig } from '../types'

export const ceruleanCityFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'route-4-field-observation',
    name: 'Route 4',
    description: 'A rocky path leading from Mt. Moon to Cerulean City.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '23',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-exit',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 19, formId: '19', weight: 25 },
        { speciesId: 23, formId: '23', weight: 25 },
        { speciesId: 21, formId: '21', weight: 20 },
        { speciesId: 27, formId: '27', weight: 20 },
        { speciesId: 56, formId: '56', weight: 10 },
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
          id: 'route-4-vital-spirit-ability-patch',
          itemId: 'vital-spirit-ability-patch',
          dropChance: 3,
        },
      ],
    },
  },
  {
    id: 'route-5-field-observation',
    name: 'Route 5',
    description: 'The grassy route south of Cerulean City. Home to a Pokemon day care',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '52',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-city-complete',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 16, formId: '16', weight: 25 },
        { speciesId: 43, formId: '43', weight: 20 },
        { speciesId: 52, formId: '52', weight: 20 },
        { speciesId: 56, formId: '56', weight: 20 },
        { speciesId: 69, formId: '69', weight: 15 },
      ],
      levelRange: {
        min: 13,
        max: 16,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
  {
    id: 'route-9-field-observation',
    name: 'Route 9',
    description: 'A rocky road east of Cerulean City leading toward Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '27',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-shrub',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 19, formId: '19', weight: 25 },
        { speciesId: 16, formId: '16', weight: 25 },
        { speciesId: 27, formId: '27', weight: 25 },
        { speciesId: 23, formId: '23', weight: 25 },
      ],
      levelRange: {
        min: 11,
        max: 17,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [
        {
          id: 'route-9-forgotten-hiker-gloves',
          itemId: 'hiker-gloves',
          dropChance: 30,
          requirements: [
            {
              type: 'task_completed',
              targetId: 'route-9-trail-clothes',
            },
            {
              type: 'item_owned',
              targetId: 'hiker-clothes',
              count: 1,
            },
            {
              type: 'task_completed',
              targetId: 'route-9-assemble-hiker-outfit',
              inverse: true,
            },
            {
              type: 'item_owned',
              targetId: 'hiker-gloves',
              count: 1,
              inverse: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'route-24-field-observation',
    name: 'Route 24',
    description:
      "A small route connecting Cerulean City to route 25 There's an ominous looking cave just across the water.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '63',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'nugget-bridge-end',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 10, formId: '10', weight: 12 },
        { speciesId: 11, formId: '11', weight: 7 },
        { speciesId: 13, formId: '13', weight: 12 },
        { speciesId: 14, formId: '14', weight: 7 },
        { speciesId: 16, formId: '16', weight: 20 },
        { speciesId: 43, formId: '43', weight: 16 },
        { speciesId: 63, formId: '63', weight: 10 },
        { speciesId: 69, formId: '69', weight: 16 },
      ],
      levelRange: {
        min: 9,
        max: 14,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [
        {
          id: 'route-24-charred-wood',
          itemId: 'charred-wood',
          dropChance: 100,
          requirements: [
            {
              type: 'task_completed',
              count: 1,
              targetId: 'charred-hiker',
              secret: false,
            },
            {
              type: 'task_completed',
              targetId: 'growlithe-knows-the-way',
              inverse: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'route-25-field-observation',
    name: 'Route 25',
    description: 'A lovely route with a sea view, leading to a beautiful cottage.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '43',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'abra-teleport',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 10, formId: '10', weight: 12 },
        { speciesId: 11, formId: '11', weight: 7 },
        { speciesId: 13, formId: '13', weight: 12 },
        { speciesId: 14, formId: '14', weight: 7 },
        { speciesId: 16, formId: '16', weight: 20 },
        { speciesId: 43, formId: '43', weight: 16 },
        { speciesId: 63, formId: '63', weight: 10 },
        { speciesId: 69, formId: '69', weight: 16 },
      ],
      levelRange: {
        min: 9,
        max: 14,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [
        {
          id: 'route-25-manics-journal-pg-322',
          itemId: 'manics-journal-pg-322',
          dropChance: 3,
          secret: true,
        },
      ],
    },
  },
]
