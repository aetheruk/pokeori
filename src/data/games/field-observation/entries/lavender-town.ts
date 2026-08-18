import { FieldObservationConfig } from '../types'

export const lavenderTownFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'route-8-field-observation',
    name: 'Route 8',
    description: 'Study the Pokemon moving through the grass on the road to Celadon.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'pokemon',
      id: '37',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-8-open-road',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 16, formId: '16', weight: 20 },
        { speciesId: 17, formId: '17', weight: 10 },
        { speciesId: 52, formId: '52', weight: 20 },
        { speciesId: 56, formId: '56', weight: 15 },
        { speciesId: 58, formId: '58', weight: 15 },
        { speciesId: 37, formId: '37', weight: 15 },
        { speciesId: 63, formId: '63', weight: 4 },
        { speciesId: 64, formId: '64', weight: 1 },
      ],
      levelRange: {
        min: 18,
        max: 22,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
  {
    id: 'route-12-field-observation',
    name: 'Route 12',
    description: 'Study the Pokemon drifting through the tall grass along Silence Bridge.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'pokemon',
      id: '43',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'location_encounter_result',
        targetId: 'route-12-dazed-snorlax',
        count: 1,
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 43, formId: '43', weight: 18 },
        { speciesId: 44, formId: '44', weight: 2 },
        { speciesId: 69, formId: '69', weight: 18 },
        { speciesId: 70, formId: '70', weight: 2 },
        { speciesId: 16, formId: '16', weight: 30 },
        { speciesId: 48, formId: '48', weight: 30 },
      ],
      levelRange: {
        min: 22,
        max: 30,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
]
