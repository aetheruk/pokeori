import { Location } from '../../types'

export const viridianCityLocations: Location[] = [
  {
    name: 'Route 22',
    description:
      'The Outskirts of Viridian City, there seems to be a lot of powerful trainers heading this way.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass-v2.png',
    },
    background: '/backgrounds/rocky-path.avif',
    timer: 20,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: {
      min: 2,
      max: 5,
    },
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'explore-viridian',
      },
    ],
    encounters: [
      {
        speciesId: 19, // Rattata
        formId: '19',
        chance: 40,
      },
      {
        speciesId: 21, // Spearow
        formId: '21',
        chance: 30,
      },
      {
        speciesId: 29, // NidoranF
        formId: '29',
        chance: 10,
      },
      {
        speciesId: 32, // NidoranM
        formId: '32',
        chance: 10,
      },
      {
        speciesId: 56, // Mankey
        formId: '56',
        chance: 10,
      },
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'discovering-victory-road',
        dropChance: 100,
      },
      {
        type: 'task_complete',
        targetId: 'found-daughter-trigger',
        dropChance: 20,
      },
      {
        type: 'task_complete',
        targetId: 'poison-tip-recipe',
        dropChance: 12,
      },
    ],
    id: 'viridian-outskirts',
  },
]
