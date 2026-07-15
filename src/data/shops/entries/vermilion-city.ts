import { ShopConfig } from '../types'

export const vermilionCityShops: ShopConfig[] = [
  {
    id: 'vermilion-city-mart',
    name: 'Vermilion City Poké Mart',
    description: 'A convenient shop for Trainers preparing for the port and nearby routes.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'poke-ball',
    },
    background: '/backgrounds/shop.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
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
        id: 'fresh-berries',
        name: 'Fresh Berries',
        description: 'A fresh bundle of 3 Oran Berries for Trainers preparing to travel.',
        icon: {
          type: 'item',
          id: 'oran-berry',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 500,
          },
        ],
        stock: 1,
        daily: true,
        rewards: [
          {
            type: 'item',
            quantity: 3,
            targetId: 'oran-berry',
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
        id: 'burn-heal',
        name: 'Burn Heal',
        description:
          'A spray-type medicine. It can be used to heal a Pokémon suffering from a burn.',
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
        id: 'ice-heal',
        name: 'Ice Heal',
        description: 'A spray-type medicine. It can be used to defrost a frozen Pokémon.',
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
        id: 'awakening',
        name: 'Awakening',
        description: 'A spray-type medicine. It can be used to wake up a sleeping Pokémon.',
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
        id: 'repel',
        name: 'Repel',
        description: 'A spray-type item that keeps weak pokemon away',
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
