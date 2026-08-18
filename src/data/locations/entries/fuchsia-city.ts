import { Location } from '../../types'

export const fuchsiaCityLocations: Location[] = [
  {
    id: 'route-13',
    name: 'Route 13',
    description:
      'The last stretch of open road before Fuchsia City, crowded with ambitious Trainers.',
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
]
