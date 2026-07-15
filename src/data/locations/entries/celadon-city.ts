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
]
