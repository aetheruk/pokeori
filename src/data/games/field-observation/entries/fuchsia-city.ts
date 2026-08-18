import { FieldObservationConfig } from '../types'

export const fuchsiaCityFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'route-13-field-observation',
    name: 'Route 13',
    description: 'Study the Pokemon crowding the tall grass along the long east-west road toward Fuchsia City.',
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
  {
    id: 'route-14-field-observation',
    name: 'Route 14',
    description: 'Study the Pokemon hiding in the dense tall grass of Route 14.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'pokemon',
      id: '83',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-13-bird-keeper-robert',
        battleStatus: 'win',
        count: 1,
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 43, formId: '43', weight: 16 },
        { speciesId: 44, formId: '44', weight: 2 },
        { speciesId: 69, formId: '69', weight: 16 },
        { speciesId: 70, formId: '70', weight: 2 },
        { speciesId: 48, formId: '48', weight: 30 },
        { speciesId: 132, formId: '132', weight: 15 },
        { speciesId: 16, formId: '16', weight: 9 },
        { speciesId: 17, formId: '17', weight: 5 },
        {
          speciesId: 83,
          formId: '83',
          weight: 5,
          requirements: [
            {
              type: 'task_completed',
              targetId: 'route-14-bird-gauntlet-clear',
            },
          ],
        },
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
          id: 'route-14-snapped-chain-link',
          itemId: 'snapped-chain-link',
          dropChance: 10,
          requirements: [
            {
              type: 'task_completed',
              targetId: 'route-14-biker-fetch-3',
              inverse: true,
            },
            {
              type: 'item_owned',
              targetId: 'snapped-chain-link',
              inverse: true,
            },
          ],
        },
        {
          id: 'route-14-rusty-bike-parts',
          itemId: 'rusty-bike-parts',
          dropChance: 1,
          secret: true,
          requirements: [
            {
              type: 'task_completed',
              targetId: 'route-14-bikers-cleared',
            },
            {
              type: 'item_owned',
              targetId: 'rusty-bike-parts',
              inverse: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'route-15-field-observation',
    name: 'Route 15',
    description: 'Study the Pokemon in the last stretch of grass before Fuchsia City.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'pokemon',
      id: '85',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-15-choo-rest',
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
    },
  },
]
