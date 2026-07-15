import { ShopConfig } from '../types'

export const lavenderTownShops: ShopConfig[] = [
  {
    id: 'lavender-town-mart',
    name: 'Lavender Town Poke Mart',
    description: 'A quiet shop stocked for Trainers coming down from Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'item',
      id: 'great-ball',
    },
    background: '/backgrounds/shop.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-lavender-town',
      },
    ],
    items: [
      {
        id: 'poke-ball',
        name: 'Poke Ball',
        description: 'A device for catching wild Pokemon.',
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
        description: 'A bundle of 10 Poke Balls.',
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
        id: 'great-ball',
        name: 'Great Ball',
        description: 'A good, high-performance Ball that provides a higher catch rate.',
        icon: {
          type: 'item',
          id: 'great-ball',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 1500,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'great-ball',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'potion',
        name: 'Potion',
        description: 'Restores HP to an injured Pokemon.',
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
        id: 'great-ball-daily-bundle',
        name: 'Great Ball Bundle',
        description: 'A daily bundle of 3 Great Balls for Trainers preparing to travel.',
        icon: {
          type: 'item',
          id: 'great-ball',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 3000,
          },
        ],
        stock: 1,
        daily: true,
        rewards: [
          {
            type: 'item',
            quantity: 3,
            targetId: 'great-ball',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'antidote',
        name: 'Antidote',
        description:
          'A spray-type medicine for treating poisoning. It can be used to lift the effects of being poisoned.',
        icon: {
          type: 'item',
          id: 'antidote',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 550,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'antidote',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'ice-heal',
        name: 'Ice Heal',
        description: 'A spray-type medicine. It can be used to defrost a frozen Pokemon.',
        icon: {
          type: 'item',
          id: 'ice-heal',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 550,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'ice-heal',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'burn-heal',
        name: 'Burn Heal',
        description:
          'A spray-type medicine. It can be used to heal a Pokemon suffering from a burn.',
        icon: {
          type: 'item',
          id: 'burn-heal',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 550,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'burn-heal',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'awakening',
        name: 'Awakening',
        description: 'A spray-type medicine. It can be used to wake up a sleeping Pokemon.',
        icon: {
          type: 'item',
          id: 'awakening',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 550,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'awakening',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'paralyze-heal',
        name: 'Paralyze Heal',
        description: 'A spray-type medicine. It can be used to lift the effects of paralysis.',
        icon: {
          type: 'item',
          id: 'paralyze-heal',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 550,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'paralyze-heal',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'escape-rope',
        name: 'Escape Rope',
        description: 'A long, durable rope. Use it to escape instantly from a cave or dungeon.',
        icon: {
          type: 'item',
          id: 'escape-rope',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 600,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'escape-rope',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'repel',
        name: 'Repel',
        description: 'A spray-type item that keeps weak Pokemon away.',
        icon: {
          type: 'item',
          id: 'repel',
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
            targetId: 'repel',
            dropChance: 100,
          },
        ],
      },
    ],
  },
]
