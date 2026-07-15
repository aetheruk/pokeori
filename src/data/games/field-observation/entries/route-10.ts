import { FieldObservationConfig } from '../types'

export const route10FieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'route-10-field-observation',
    name: 'Route 10',
    description: 'Study the Pokemon moving between the rocks near Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '100',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'route-9-pass-expedition',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 100, formId: '100', weight: 30 },
        { speciesId: 21, formId: '21', weight: 25 },
        { speciesId: 23, formId: '23', weight: 25 },
        { speciesId: 27, formId: '27', weight: 20 },
        {
          speciesId: 239,
          formId: '239',
          weight: 25,
          requirements: [
            {
              type: 'task_completed',
              targetId: 'route-10-watt-a-problem',
            },
          ],
        },
      ],
      levelRange: {
        min: 14,
        max: 18,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
]
