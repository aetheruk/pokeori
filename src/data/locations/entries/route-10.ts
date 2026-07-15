import { Location } from '../../types'

export const route10Locations: Location[] = [
  {
    id: 'route-10',
    name: 'Route 10',
    description: 'A rugged mountain route at the mouth of Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '100',
    },
    background: '/backgrounds/rocky-path.avif',
    levelRange: {
      min: 14,
      max: 18,
    },
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'route-9-pass-expedition',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    encounters: [
      { speciesId: 100, formId: '100', chance: 30 },
      { speciesId: 21, formId: '21', chance: 25 },
      { speciesId: 23, formId: '23', chance: 25 },
      { speciesId: 27, formId: '27', chance: 20 },
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'weak-magnet-recipe',
        dropChance: 12,
      },
    ],
  },
  {
    id: 'route-10-plant-store-room',
    name: 'Kanto Plant Store Room',
    description: 'An old Power Plant storage room packed with Elekid slipping through the mountain.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '239',
    },
    background: '/backgrounds/power-plant.avif',
    levelRange: {
      min: 12,
      max: 18,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-10-such-devastation',
      },
    ],
    encounters: [{ speciesId: 239, formId: '239', chance: 100 }],
    rewards: [
      {
        type: 'item',
        targetId: 'thunder-stone',
        quantity: 1,
        dropChance: 1,
      },
    ],
  },
]
