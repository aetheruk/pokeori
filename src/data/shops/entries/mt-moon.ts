import { ShopConfig } from '../types'

export const mtMoonShops: ShopConfig[] = [
  {
    id: 'mt-moon-scratch-card-shop',
    name: 'Mt Moon Scratch Cards',
    description: 'Try your luck with Mt Moon Scratch Cards! You could win rare items and prizes.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/center.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-pokemon-center',
      },
    ],
    items: [
      {
        id: 'moon-scratch-card',
        name: 'Mt Moon Scratch Card',
        description: 'A scratch card themed around Mt. Moon. Scratch it to reveal your prize!',
        icon: {
          type: 'item',
          id: 'moon-scratch',
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
            targetId: 'moon-scratch',
            quantity: 1,
            dropChance: 100,
          },
        ],
        stock: 5,
        daily: true,
      },
    ],
  },
]
