import { FieldObservationConfig } from '../types'

export const pewterCityFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'route-2-field-observation',
    name: 'Route 2',
    description: 'A route connecting Viridian City and Pewter City.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass.avif',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'viridian-exit',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 10, formId: '10', weight: 15 },
        { speciesId: 13, formId: '13', weight: 15 },
        { speciesId: 16, formId: '16', weight: 20 },
        { speciesId: 19, formId: '19', weight: 20 },
        { speciesId: 29, formId: '29', weight: 15 },
        { speciesId: 32, formId: '32', weight: 15 },
      ],
      levelRange: {
        min: 3,
        max: 7,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
  {
    id: 'route-3-field-observation',
    name: 'Route 3',
    description:
      'A rocky route leading towards Mt. Moon, faint singing can be heard in the distance.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass.avif',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-roadblock',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 16, formId: '16', weight: 30 },
        { speciesId: 21, formId: '21', weight: 30 },
        { speciesId: 19, formId: '19', weight: 28 },
        { speciesId: 27, formId: '27', weight: 7 },
        { speciesId: 39, formId: '39', weight: 5 },
      ],
      levelRange: {
        min: 6,
        max: 12,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [],
    },
  },
]
