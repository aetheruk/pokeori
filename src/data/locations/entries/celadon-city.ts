import { Location } from '../../types'

const route7Gate = {
  type: 'task_completed' as const,
  targetId: 'underground-path-route-8',
}

export const celadonCityLocations: Location[] = [
  {
    id: 'route-7',
    name: 'Route 7',
    description: 'A short grass route outside Celadon, just beyond the Underground Path.',
    category: 'Kanto',
    subCategory: 'Celadon City',
    icon: {
      type: 'pokemon',
      id: '43',
    },
    background: '/backgrounds/grassy-route.avif',
    levelRange: {
      min: 18,
      max: 22,
    },
    requirements: [route7Gate],
    encounters: [
      { speciesId: 16, formId: '16', chance: 20 },
      { speciesId: 17, formId: '17', chance: 10 },
      { speciesId: 43, formId: '43', chance: 15 },
      { speciesId: 69, formId: '69', chance: 15 },
      { speciesId: 56, formId: '56', chance: 15 },
      { speciesId: 58, formId: '58', chance: 10 },
      { speciesId: 37, formId: '37', chance: 10 },
      { speciesId: 63, formId: '63', chance: 5 },
    ],
    rewards: [],
  },
  {
    id: 'route-16-dazed-snorlax',
    name: 'Dazed Snorlax',
    description: 'The Snorlax has calmed down just enough for a careful catch attempt.',
    category: 'Kanto',
    subCategory: 'Celadon City',
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
        targetId: 'route-16-furious-snorlax',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'location_encounter_result',
        targetId: 'route-16-dazed-snorlax',
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
