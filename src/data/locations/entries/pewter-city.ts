import { Location } from '../../types'

export const pewterCityLocations: Location[] = [
  {
    id: 'route-2',
    name: 'Route 2',
    description: 'A route connecting Viridian City and Pewter City.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass.avif',
    },
    background: '/backgrounds/grassy-route.avif',
    timer: 20,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: {
      min: 3,
      max: 7,
    },
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'viridian-exit',
      },
    ],
    encounters: [
      {
        speciesId: 10, // Caterpie
        formId: '10',
        chance: 15,
      },
      {
        speciesId: 13, // Weedle
        formId: '13',
        chance: 15,
      },
      {
        speciesId: 16, // Pidgey
        formId: '16',
        chance: 20,
      },
      {
        speciesId: 19, // Rattata
        formId: '19',
        chance: 20,
      },
      {
        speciesId: 29, // NidoranF
        formId: '29',
        chance: 15,
      },
      {
        speciesId: 32, // NidoranM
        formId: '32',
        chance: 15,
      },
    ],
    rewards: [],
  },
  {
    id: 'route-3',
    name: 'Route 3',
    description:
      'A rocky route leading towards Mt. Moon, faint singing can be heard in the distance.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass.avif',
    },
    background: '/backgrounds/rocky-path.avif',
    timer: 20,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: {
      min: 6,
      max: 12,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-roadblock',
      },
    ],
    encounters: [
      {
        speciesId: 16, // Pidgey
        formId: '16',
        chance: 30,
      },
      {
        speciesId: 21, // Spearow
        formId: '21',
        chance: 30,
      },
      {
        speciesId: 19, // Rattata
        formId: '19',
        chance: 28,
      },
      {
        speciesId: 27, // Sandshrew
        formId: '27',
        chance: 7,
      },
      {
        speciesId: 39, // Jigglypuff
        formId: '39',
        chance: 5,
      },
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'cotton-scarf-recipe',
        dropChance: 12,
      },
    ],
  },
]
