import { ShopConfig } from '../types'

export const pewterCityShops: ShopConfig[] = [
  {
    id: 'pewter-city-mart',
    name: 'Pewter City Poké Mart',
    description: 'A convenient shop for travelers heading through Mt. Moon.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'item',
      id: 'poke-ball',
    },
    background: '/backgrounds/shop.avif',
    requirements: [
      {
        type: 'research_encounter_result',
        targetId: 'pewter-item-identify',
        battleStatus: 'win',
        count: 5,
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
    ],
  },
]
