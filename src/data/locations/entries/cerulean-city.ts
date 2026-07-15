import { Location } from '../../types'

export const ceruleanCityLocations: Location[] = [
  {
    id: 'route-5',
    name: 'Route 5',
    description: 'The grassy route south of Cerulean City. Home to a Pokemon day care',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '52',
    },
    background: '/backgrounds/grassy-route.avif',
    levelRange: {
      min: 13,
      max: 16,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-city-complete',
      },
    ],
    encounters: [
      { speciesId: 16, formId: '16', chance: 25 },
      { speciesId: 43, formId: '43', chance: 20 },
      { speciesId: 52, formId: '52', chance: 20 },
      { speciesId: 56, formId: '56', chance: 20 },
      { speciesId: 69, formId: '69', chance: 15 },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'sweet-flower',
        quantity: 1,
        dropChance: 80,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'day-care-intro',
          },
          {
            type: 'task_completed',
            targetId: 'day-care-plants-for-the-garden',
            inverse: true,
          },
          {
            type: 'companion',
            companionCheck: {
              type: 'grass',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'route-9',
    name: 'Route 9',
    description: 'A rocky road east of Cerulean City leading toward Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '27',
    },
    background: '/backgrounds/rocky-path.avif',
    levelRange: {
      min: 11,
      max: 17,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-shrub',
      },
    ],
    encounters: [
      { speciesId: 19, formId: '19', chance: 25 },
      { speciesId: 16, formId: '16', chance: 25 },
      { speciesId: 27, formId: '27', chance: 25 },
      { speciesId: 23, formId: '23', chance: 25 },
    ],
    rewards: [],
  },
  {
    id: 'route-9-pass-lower-trail',
    name: 'Route 9 Pass: Lower Trail',
    description: 'A narrow stretch of the Route 9 Pass where Pokemon dart between loose stones.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '27',
    },
    background: '/backgrounds/rocky-path.avif',
    levelRange: {
      min: 14,
      max: 18,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    encounters: [
      { speciesId: 19, formId: '19', chance: 25 },
      { speciesId: 16, formId: '16', chance: 25 },
      { speciesId: 27, formId: '27', chance: 25 },
      { speciesId: 23, formId: '23', chance: 25 },
    ],
    rewards: [],
  },
  {
    id: 'route-9-pass-upper-trail',
    name: 'Route 9 Pass: Upper Trail',
    description: 'A windswept ledge above Route 9 where tougher wild Pokemon shelter.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '23',
    },
    background: '/backgrounds/rocky-path.avif',
    levelRange: {
      min: 16,
      max: 20,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    encounters: [
      { speciesId: 19, formId: '19', chance: 20 },
      { speciesId: 16, formId: '16', chance: 20 },
      { speciesId: 27, formId: '27', chance: 30 },
      { speciesId: 23, formId: '23', chance: 30 },
    ],
    rewards: [],
  },
  {
    id: 'route-4',
    name: 'Route 4',
    description: 'A rocky path leading from Mt. Moon to Cerulean City.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '23',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-exit',
      },
    ],
    encounters: [
      {
        speciesId: 19,
        chance: 25,
      },
      {
        speciesId: 23,
        chance: 25,
      },
      {
        speciesId: 21,
        chance: 20,
      },
      {
        speciesId: 27,
        chance: 20,
      },
      {
        speciesId: 56,
        chance: 10,
      },
    ],
    levelRange: {
      min: 8,
      max: 12,
    },
    rewards: [
      {
        type: 'item',
        targetId: 'vital-spirit-ability-patch',
        dropChance: 5,
      },
      {
        type: 'task_complete',
        targetId: 'razz-berry-discovery',
        dropChance: 5,
        label: 'Discovered Secret!',
      },
    ],
  },
  {
    id: 'route-24',
    name: 'Route 24',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'pokemon',
      id: '63',
    },
    description:
      "A small route connecting Cerulean City to route 25 There's an ominous looking cave just across the water.",
    levelRange: {
      min: 9,
      max: 14,
    },
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'nugget-bridge-end',
      },
    ],
    encounters: [
      {
        speciesId: 10,
        chance: 12,
        formId: '10',
      },
      {
        speciesId: 11,
        chance: 7,
        formId: '11',
      },
      {
        speciesId: 13,
        chance: 12,
        formId: '13',
      },
      {
        speciesId: 14,
        chance: 7,
        formId: '14',
      },
      {
        speciesId: 16,
        chance: 20,
        formId: '16',
      },
      {
        speciesId: 43,
        chance: 16,
        formId: '43',
      },
      {
        speciesId: 63,
        chance: 10,
        formId: '63',
      },
      {
        speciesId: 69,
        chance: 16,
        formId: '69',
      },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'charred-wood',
        dropChance: 100,
        requirements: [
          {
            type: 'task_completed',
            count: 1,
            targetId: 'charred-hiker',
            secret: false,
          },
          {
            type: 'task_completed',
            targetId: 'growlithe-knows-the-way',
            inverse: true,
          },
        ],
      },
    ],
    timer: 30,
    shinyChanceModifier: 1,
  },
  {
    id: 'charmander-den',
    name: "Charmander's Den",
    description: "A secret den inside (Not) Cerulean Cave. A Hiker's Growlithe lead me here.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '4',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'charred-hiker-3',
      },
    ],
    encounters: [
      {
        speciesId: 4,
        chance: 100,
        formId: '4',
      },
    ],
    levelRange: {
      min: 5,
      max: 5,
    },
    rewards: [],
    criteria: [
      {
        type: 'item_owned',
        count: 5,
        targetId: 'charred-wood',
        consume: true,
      },
    ],
  },
  {
    id: 'charmander-den-growlithe',
    overrides: 'charmander-den',
    name: "Charmander's Den",
    description:
      "Growlithe has made the trip enough times to know the way by heart. No sticks needed.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '4',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'growlithe-knows-the-way',
      },
    ],
    encounters: [
      {
        speciesId: 4,
        chance: 100,
        formId: '4',
      },
    ],
    levelRange: {
      min: 5,
      max: 5,
    },
    rewards: [
      {
        type: 'task_complete',
        targetId: 'dusty-charcoal-recipe',
        dropChance: 12,
      },
    ],
    criteria: [],
  },
  {
    id: 'route-25',
    name: 'Route 25',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'pokemon',
      id: '43',
    },
    description: 'A lovely route with a sea view, leading to a beautiful cottage.',
    levelRange: {
      min: 9,
      max: 14,
    },
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'abra-teleport',
      },
    ],
    encounters: [
      {
        speciesId: 10,
        chance: 12,
        formId: '10',
      },
      {
        speciesId: 11,
        chance: 7,
        formId: '11',
      },
      {
        speciesId: 13,
        chance: 12,
        formId: '13',
      },
      {
        speciesId: 14,
        chance: 7,
        formId: '14',
      },
      {
        speciesId: 16,
        chance: 20,
        formId: '16',
      },
      {
        speciesId: 43,
        chance: 16,
        formId: '43',
      },
      {
        speciesId: 63,
        chance: 10,
        formId: '63',
      },
      {
        speciesId: 69,
        chance: 16,
        formId: '69',
      },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'manics-journal-pg-322',
        dropChance: 5,
        secret: true,
      },
    ],
    timer: 35,
    shinyChanceModifier: 1,
  },
]
