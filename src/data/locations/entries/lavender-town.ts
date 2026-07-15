import { Location } from '../../types'

export const lavenderTownLocations: Location[] = [
  {
    id: 'route-8',
    name: 'Route 8',
    description: 'A lively grass route between Lavender Town and the Underground Path to Celadon.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'pokemon',
      id: '37',
    },
    background: '/backgrounds/grassy-route.avif',
    levelRange: {
      min: 18,
      max: 22,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-8-open-road',
      },
    ],
    encounters: [
      { speciesId: 16, formId: '16', chance: 15 },
      { speciesId: 17, formId: '17', chance: 10 },
      { speciesId: 52, formId: '52', chance: 20 },
      { speciesId: 56, formId: '56', chance: 15 },
      { speciesId: 58, formId: '58', chance: 15 },
      { speciesId: 37, formId: '37', chance: 15 },
      { speciesId: 63, formId: '63', chance: 4 },
      { speciesId: 64, formId: '64', chance: 1 },
      {
        speciesId: 183,
        formId: '183',
        chance: 5,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'route-8-pikablu-confirmed',
          },
        ],
        secret: true,
      },
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'dull-beak-recipe',
        dropChance: 12,
      },
    ],
  },
  {
    id: 'route-12-dazed-snorlax',
    name: 'Dazed Snorlax',
    description: 'The Snorlax has calmed down just enough for a careful catch attempt.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'pokemon',
      id: '143',
    },
    background: '/backgrounds/grassy-route.avif',
    levelRange: {
      min: 30,
      max: 30,
    },
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-12-furious-snorlax',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'location_encounter_result',
        targetId: 'route-12-dazed-snorlax',
        count: 1,
        inverse: true,
      },
    ],
    encounters: [{ speciesId: 143, formId: '143', chance: 100 }],
    rewards: [],
    timer: 30,
    catchRateModifier: 1,
    keyEncounter: true,
  },
]
