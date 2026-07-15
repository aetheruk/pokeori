import { Location } from '../../types'

export const pokemonTowerLocations: Location[] = [
  {
    id: 'pokemon-tower-1f-blocked',
    name: 'Pokemon Tower 1F',
    description: 'No trace of Fuji, I guess I will just have to press on.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '93',
    },
    background: '/backgrounds/pkmn-tower.avif',
    timer: 20,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    keyEncounter: true,
    specialEncounter: {
      type: 'silph-scope-ghost',
      requiredItemId: 'silph-scope',
      failMessage: 'A ghostly presence forced you away.',
    },
    levelRange: {
      min: 20,
      max: 24,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pkmn-tower-ladder-1f',
      },
      {
        type: 'location_encounter_result',
        targetId: 'pokemon-tower-1f-blocked',
        battleStatus: 'loss',
        count: 1,
        inverse: true,
      },
    ],
    encounters: [
      {
        speciesId: 93,
        formId: '93',
        chance: 95,
      },
      {
        speciesId: 94,
        formId: '94',
        chance: 5,
      },
    ],
    rewards: [],
  },
  {
    id: 'fuji-chronicle-restless-gastly',
    name: 'Panicked Gastly',
    description: 'Catch one of the Gastly fleeing Pokemon Tower.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '92',
    },
    background: '/backgrounds/pkmn-tower.avif',
    timer: 45,
    shinyChanceModifier: 1,
    catchRateModifier: 2,
    keyEncounter: true,
    levelRange: {
      min: 20,
      max: 20,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    encounters: [
      {
        speciesId: 92,
        formId: '92',
        chance: 100,
      },
    ],
    rewards: [],
  },
  {
    id: 'fuji-chronicle-lost-cubone',
    name: 'Tower Stairwell',
    description:
      'The stairwell is crowded with loose cable and unsettled spirits fleeing the floors above.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '92',
    },
    background: '/backgrounds/pkmn-tower.avif',
    timer: 45,
    shinyChanceModifier: 1,
    catchRateModifier: 3,
    keyEncounter: true,
    levelRange: {
      min: 20,
      max: 20,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    encounters: [
      {
        speciesId: 92,
        formId: '92',
        chance: 100,
      },
    ],
    rewards: [],
  },
]
