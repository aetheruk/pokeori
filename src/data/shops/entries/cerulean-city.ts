import { ShopConfig } from '../types'

export const ceruleanCityShops: ShopConfig[] = [
  {
    id: 'cerulean-city-mart',
    name: 'Cerulean City Poké Mart',
    description: 'A convenient shop in the heart of Cerulean City.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'item',
      id: 'poke-ball',
    },
    background: '/backgrounds/shop.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-cerulean-city',
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
        id: 'escape-rope-sale',
        name: 'Escape Rope Bundle',
        description: 'A long, durable rope. Use it to escape instantly from a cave or dungeon.',
        stock: 1,
        daily: true,
        icon: {
          type: 'item',
          id: 'escape-rope',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 2000,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 5,
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
    ],
  },
  {
    id: 'cerulean-berry-shop',
    name: 'Cerulean Berry Trade',
    description: 'Trade Berry Powder for useful items.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'item',
      id: 'razz-berry',
    },
    background: '/backgrounds/shop.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'a-berry-good-invention',
      },
    ],
    items: [
      {
        id: 'poke-ball-bundle-bp',
        name: 'Poké Ball Bundle',
        description: 'A bundle of 5 Poké Balls.',
        icon: {
          type: 'item',
          id: 'poke-ball',
        },
        cost: [
          {
            type: 'currency',
            id: 'berry-powder',
            amount: 100,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 5,
            targetId: 'poke-ball',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'researchers-journal-bp',
        name: "Researcher's Journal",
        description: 'A journal full of research notes.',
        icon: {
          type: 'item',
          id: 'researchers-journal',
        },
        cost: [
          {
            type: 'currency',
            id: 'berry-powder',
            amount: 150,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'researchers-journal',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'explorers-journal-bp',
        name: "Explorer's Journal",
        description: 'A log of exploration logs.',
        icon: {
          type: 'item',
          id: 'explorers-journal',
        },
        cost: [
          {
            type: 'currency',
            id: 'berry-powder',
            amount: 150,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'explorers-journal',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'champions-journal-bp',
        name: "Champion's Journal",
        description: 'A record of great battles.',
        icon: {
          type: 'item',
          id: 'champions-journal',
        },
        cost: [
          {
            type: 'currency',
            id: 'berry-powder',
            amount: 150,
          },
        ],
        rewards: [
          {
            type: 'item',
            quantity: 1,
            targetId: 'champions-journal',
            dropChance: 100,
          },
        ],
      },
    ],
  },
]
