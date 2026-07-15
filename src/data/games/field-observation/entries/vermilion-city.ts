import { FieldObservationConfig } from '../types'

export const vermilionCityFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'route-6-field-observation',
    name: 'Route 6',
    description: 'Ahh, the fresh smell of salty sea air lingers on the breeze!',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '16',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'underground-path-route-5',
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
      itemDrops: [],
    },
  },
  {
    id: 'route-11-field-observation',
    name: 'Route 11',
    description: 'A grassy route east of Vermilion City, watched over by waiting Trainers.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '96',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'ss-anne-repair-duty',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 21, formId: '21', weight: 35 },
        { speciesId: 23, formId: '23', weight: 20 },
        { speciesId: 27, formId: '27', weight: 20 },
        { speciesId: 96, formId: '96', weight: 25 },
      ],
      levelRange: {
        min: 9,
        max: 17,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [
        {
          id: 'route-11-manics-journal-pg-172',
          itemId: 'manics-journal-pg-172',
          dropChance: 3,
          secret: true,
        },
      ],
    },
  },
]
