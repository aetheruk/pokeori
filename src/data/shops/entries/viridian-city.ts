import { ShopConfig } from '../types'

export const viridianCityShops: ShopConfig[] = [
  {
    id: 'viridian-general',
    name: 'Viridian City Poké Mart',
    description: 'A Poke Mart selling basic supplies.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'item',
      id: 'potion',
    },
    background: '/backgrounds/shop.avif',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'explore-viridian',
      },
    ],
    items: [
      {
        id: 'poke-ball',
        name: 'Poké Ball',
        description: 'A device for catching wild Pokémon.',
        icon: {
          type: 'item',
          id: 'poke-ball',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 350,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'poke-ball',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'poke-ball-bundle',
        name: 'Ball Bundle',
        description: 'A bundle of 10 Poké Balls.',
        icon: {
          type: 'item',
          id: 'poke-ball',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 3500,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 10,
            targetId: 'poke-ball',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'potion',
        name: 'Potion',
        description: 'Restores HP to an injured Pokémon.',
        icon: {
          type: 'item',
          id: 'potion',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 500,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'battle-potion',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'potion-sale',
        name: 'Potion Bundle Sale',
        description: 'A daily bundle of 5 Potions for new Trainers.',
        stock: 1,
        daily: true,
        icon: {
          type: 'item',
          id: 'potion',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 1800,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 5,
            targetId: 'battle-potion',
            dropChance: 100,
          },
        ],
      },
    ],
  },
]
