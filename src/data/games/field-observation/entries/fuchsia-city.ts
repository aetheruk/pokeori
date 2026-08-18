import { FieldObservationConfig } from '../types'

export const fuchsiaCityFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'route-13-field-observation',
    name: 'Route 13',
    description: 'Study the Pokemon crowding the tall grass on the final road to Fuchsia City.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'pokemon',
      id: '132',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'on-to-fuchsia-city',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 43, formId: '43', weight: 18 },
        { speciesId: 44, formId: '44', weight: 2 },
        { speciesId: 69, formId: '69', weight: 18 },
        { speciesId: 70, formId: '70', weight: 2 },
        { speciesId: 48, formId: '48', weight: 30 },
        { speciesId: 16, formId: '16', weight: 20 },
        { speciesId: 17, formId: '17', weight: 5 },
        { speciesId: 132, formId: '132', weight: 5 },
      ],
      levelRange: {
        min: 22,
        max: 30,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [
        {
          id: 'route-13-manics-journal-pg-132',
          itemId: 'manics-journal-pg-132',
          dropChance: 3,
          secret: true,
        },
      ],
    },
  },
]
