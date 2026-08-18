import { Location } from '../../types'

export const fuchsiaCityLocations: Location[] = [
  {
    id: 'route-13',
    name: 'Route 13',
    description:
      'A long stretch of open road stretching east to west, crowded with ambitious Trainers on the way to Fuchsia City.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'pokemon',
      id: '132',
    },
    background: '/backgrounds/grassy-route.avif',
    levelRange: {
      min: 22,
      max: 30,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'on-to-fuchsia-city',
      },
    ],
    encounters: [
      { speciesId: 43, formId: '43', chance: 18 },
      { speciesId: 44, formId: '44', chance: 2 },
      { speciesId: 69, formId: '69', chance: 18 },
      { speciesId: 70, formId: '70', chance: 2 },
      { speciesId: 48, formId: '48', chance: 30 },
      { speciesId: 16, formId: '16', chance: 20 },
      { speciesId: 17, formId: '17', chance: 5 },
      { speciesId: 132, formId: '132', chance: 5 },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'manics-journal-pg-132',
        dropChance: 10,
        secret: true,
      },
    ],
  },
  {
    id: 'route-14',
    name: 'Route 14',
    description:
      'A vertical stretch of dense tall grass, home to the Route 14 bird flock and the Junkyard Crew.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'pokemon',
      id: '83',
    },
    background: '/backgrounds/grassy-route.avif',
    levelRange: {
      min: 22,
      max: 30,
    },
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-13-bird-keeper-robert',
        battleStatus: 'win',
        count: 1,
      },
    ],
    encounters: [
      { speciesId: 43, formId: '43', chance: 16 },
      { speciesId: 44, formId: '44', chance: 2 },
      { speciesId: 69, formId: '69', chance: 16 },
      { speciesId: 70, formId: '70', chance: 2 },
      { speciesId: 48, formId: '48', chance: 30 },
      { speciesId: 132, formId: '132', chance: 15 },
      { speciesId: 16, formId: '16', chance: 9 },
      { speciesId: 17, formId: '17', chance: 5 },
      {
        speciesId: 83,
        formId: '83',
        chance: 5,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'route-14-bird-gauntlet-clear',
          },
        ],
      },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'bent-carburetor',
        dropChance: 10,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'route-14-biker-fetch-2',
            inverse: true,
          },
          {
            type: 'item_owned',
            targetId: 'bent-carburetor',
            inverse: true,
          },
        ],
      },
      {
        type: 'item',
        quantity: 1,
        targetId: 'rusty-bike-parts',
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
  {
    id: 'route-15',
    name: 'Route 15',
    description:
      'The last grassy stretch of road before Fuchsia City, patrolled by a long line of Trainers.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'pokemon',
      id: '85',
    },
    background: '/backgrounds/grassy-route.avif',
    levelRange: {
      min: 22,
      max: 30,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-15-choo-rest',
      },
    ],
    encounters: [
      { speciesId: 43, formId: '43', chance: 18 },
      { speciesId: 44, formId: '44', chance: 2 },
      { speciesId: 69, formId: '69', chance: 18 },
      { speciesId: 70, formId: '70', chance: 2 },
      { speciesId: 48, formId: '48', chance: 30 },
      { speciesId: 16, formId: '16', chance: 20 },
      { speciesId: 17, formId: '17', chance: 5 },
      { speciesId: 132, formId: '132', chance: 5 },
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'brown-belt-recipe',
        dropChance: 12,
      },
    ],
  },
]
