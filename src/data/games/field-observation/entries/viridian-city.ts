import { FieldObservationConfig } from '../types'

export const viridianCityFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'viridian-outskirts-field-observation',
    name: 'Route 22',
    description:
      'The Outskirts of Viridian City, there seems to be a lot of powerful trainers heading this way.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass.avif',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'explore-viridian',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 19, formId: '19', weight: 40 },
        { speciesId: 21, formId: '21', weight: 30 },
        { speciesId: 29, formId: '29', weight: 10 },
        { speciesId: 32, formId: '32', weight: 10 },
        { speciesId: 56, formId: '56', weight: 10 },
      ],
      levelRange: {
        min: 2,
        max: 5,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
]
