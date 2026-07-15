import { IdentifyConfig } from '../types'

const pokemartItemPool = [
  'battle-potion',
  'battle-super-potion',
  'poke-ball',
  'great-ball',
  'escape-rope',
]

export const pewterCityidentifyEntries: IdentifyConfig[] = [
  {
    id: 'pewter-item-identify',
    name: 'Cleaning the Pokemart',
    description: 'Help the local PokeMart sort their inventory.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'item',
      id: 'battle-potion',
    },
    background: '/backgrounds/shop.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-messy-mart',
      },
    ],
    rewards: [
      {
        type: 'currency',
        dropChance: 100,
        targetId: 'pokedollars',
        quantity: 65,
      },
    ],
    settings: {
      itemPool: pokemartItemPool,
      timeLimit: 25,
      winRate: 10,
    },
  },
  {
    id: 'pewter-item-identify-ex',
    name: 'Cleaning the Pokemart EX',
    description: 'The PokeMart has even more stock to sort, and the pace is picking up.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'item',
      id: 'great-ball',
    },
    background: '/backgrounds/shop.avif',
    requirements: [
      {
        type: 'research_encounter_result',
        battleStatus: 'win',
        targetId: 'pewter-item-identify',
        count: 10,
      },
    ],
    rewards: [
      {
        type: 'currency',
        dropChance: 100,
        targetId: 'pokedollars',
        quantity: 100,
      },
      {
        type: 'item',
        dropChance: 100,
        targetId: 'poke-ball',
        quantity: 1,
      },
      {
        type: 'item',
        dropChance: 1,
        targetId: 'great-ball',
        quantity: 1,
      },
    ],
    settings: {
      itemPool: pokemartItemPool,
      timeLimit: 25,
      winRate: 15,
    },
  },
]
