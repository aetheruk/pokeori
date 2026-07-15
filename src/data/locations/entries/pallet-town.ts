import { Location } from '../../types'

const palletOrientationRequirements: Location['requirements'] = [
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

export const palletTownLocations: Location[] = [
  {
    id: 'pallet-orientation-route-1',
    name: 'Route 1 Field Catch',
    description: 'Put the field kit to use and catch a nearby Route 1 Pokemon.',
    category: 'Secret',
    subCategory: 'Pallet Town',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass.avif',
    },
    background: '/backgrounds/grassy-route.avif',
    timer: 20,
    shinyChanceModifier: 1,
    catchRateModifier: 255,
    keyEncounter: true,
    levelRange: {
      min: 2,
      max: 5,
    },
    requirements: palletOrientationRequirements,
    encounters: [
      {
        speciesId: 16,
        formId: '16',
        chance: 50,
      },
      {
        speciesId: 19,
        formId: '19',
        chance: 50,
      },
    ],
    rewards: [],
  },
  {
    name: 'Route 1',
    description: 'Small Pokémon from the local area hide in the long grass around here.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass.avif',
    },
    background: '/backgrounds/grassy-route.avif',
    timer: 20,
    shinyChanceModifier: 1,
    catchRateModifier: 30,
    levelRange: {
      min: 2,
      max: 5,
    },
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-16',
      },
    ],
    encounters: [
      {
        speciesId: 16,
        formId: '16',
        chance: 45,
      },
      {
        speciesId: 19,
        formId: '19',
        chance: 45,
      },
      {
        speciesId: 19,
        formId: '10091',
        chance: 10,
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
    rewards: [
      {
        type: 'task_complete',
        dropChance: 15,
        targetId: 'rattatas-burrow',
      },
    ],
    id: 'tutorial-1',
  },
]
