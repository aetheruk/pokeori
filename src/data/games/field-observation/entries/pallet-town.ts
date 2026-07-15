import { FieldObservationConfig } from '../types'

const palletOrientationRequirements: FieldObservationConfig['requirements'] = [
  {
    type: 'pokedex_caught_total',
    count: 1,
  },
  {
    type: 'task_completed',
    targetId: 'tutorial-16',
    inverse: true,
  },
  {
    type: 'expedition_result',
    targetId: 'pallet-town-orientation',
    expeditionStatus: 'completed',
    count: 1,
    inverse: true,
  },
]

export const palletTownFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'pallet-orientation-field-observation',
    name: 'Route 1 Field Study',
    description: 'Watch the Route 1 grass and identify what the local Pokemon are doing.',
    category: 'Secret',
    subCategory: 'Pallet Town',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass-v2.png',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: palletOrientationRequirements,
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 16, formId: '16', weight: 35 },
        { speciesId: 19, formId: '19', weight: 35 },
        { speciesId: 129, formId: '129', weight: 30 },
      ],
      levelRange: {
        min: 2,
        max: 5,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 1,
    },
  },
  {
    id: 'route-1-field-observation',
    name: 'Route 1',
    description: 'Small Pokémon from the local area hide in the long grass around here.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass-v2.png',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-16',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 16, formId: '16', weight: 45 },
        { speciesId: 19, formId: '19', weight: 45 },
        { speciesId: 129, formId: '129', weight: 10 },
        {
          speciesId: 19,
          formId: '10091',
          weight: 10,
          requirements: [
            {
              type: 'time_range',
              timeRange: {
                start: '18:00',
                end: '06:00',
              },
            },
            {
              type: 'skill_level',
              targetId: 'researching',
              count: 5,
            },
            {
              type: 'skill_level',
              targetId: 'catching',
              count: 5,
            },
          ],
        },
      ],
      levelRange: {
        min: 2,
        max: 5,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 1,
    },
  },
]
