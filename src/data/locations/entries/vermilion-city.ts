import { Location } from '../../types'

export const vermilionCityLocations: Location[] = [
  {
    id: 'route-6',
    name: 'Route 6',
    description: 'Ahh, the fresh smell of salty sea air lingers on the breeze!',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '16',
    },
    background: '/backgrounds/grassy-route.avif',
    levelRange: {
      min: 13,
      max: 16,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'underground-path-route-5',
      },
    ],
    encounters: [
      { speciesId: 16, formId: '16', chance: 25 },
      { speciesId: 43, formId: '43', chance: 20 },
      { speciesId: 52, formId: '52', chance: 20 },
      { speciesId: 56, formId: '56', chance: 20 },
      { speciesId: 69, formId: '69', chance: 15 },
    ],
    rewards: [],
  },
  {
    id: 'route-11',
    name: 'Route 11',
    description: 'A grassy route east of Vermilion City, watched over by waiting Trainers.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '96',
    },
    background: '/backgrounds/grassy-route.avif',
    levelRange: {
      min: 9,
      max: 17,
    },
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'ss-anne-repair-duty',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    encounters: [
      { speciesId: 21, formId: '21', chance: 35 },
      { speciesId: 23, formId: '23', chance: 20 },
      { speciesId: 27, formId: '27', chance: 20 },
      { speciesId: 96, formId: '96', chance: 25 },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'manics-journal-pg-172',
        dropChance: 10,
        secret: true,
      },
    ],
  },
  {
    id: 'squirtle-squad-lost-member',
    name: 'Lost Squirtle',
    description: 'Spray, the smallest Squad member, is hiding between the pier supports.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '7',
    },
    background: '/backgrounds/beach.avif',
    levelRange: {
      min: 12,
      max: 12,
    },
    requirements: [
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
      },
    ],
    encounters: [{ speciesId: 7, formId: '7', chance: 100 }],
    rewards: [],
    timer: 45,
    catchRateModifier: 2,
    keyEncounter: true,
  },
  {
    id: 'vermilion-squirtle-cove',
    name: 'Squirtle Cove',
    description:
      'A tucked-away cove where the Squad gathers. Visitors are tolerated if they bring snacks.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '7',
    },
    background: '/backgrounds/beach.avif',
    levelRange: {
      min: 8,
      max: 12,
    },
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'squirtle-squad-chronicle',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'green-berry-candy',
        count: 3,
        consume: true,
      },
    ],
    encounters: [{ speciesId: 7, formId: '7', chance: 100 }],
    rewards: [],
    timer: 45,
    catchRateModifier: 1,
  },
  {
    id: 'vermilion-squirtle-cove-open',
    overrides: 'vermilion-squirtle-cove',
    name: 'Squirtle Cove',
    description:
      'The Squad has decided you count as a regular. Snacks are still appreciated, but no longer inspected.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '7',
    },
    background: '/backgrounds/beach.avif',
    levelRange: {
      min: 8,
      max: 12,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'squirtle-cove-regular',
      },
    ],
    criteria: [],
    encounters: [{ speciesId: 7, formId: '7', chance: 100 }],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'magic-water-recipe',
        dropChance: 12,
      },
    ],
    timer: 45,
    catchRateModifier: 1,
  },
]
