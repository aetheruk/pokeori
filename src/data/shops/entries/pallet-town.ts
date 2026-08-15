import { ShopConfig } from '../types'

export const palletTownShops: ShopConfig[] = [
  {
    id: 'retro-trainer-cards',
    name: "Prof's Scrip Shop",
    description: "Spend Prof's Scrip on classic trainer sprite cards from the GB era.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'item',
      id: 'scrip',
    },
    background: '/backgrounds/lab.avif',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-16',
      },
    ],
    items: [
      {
        id: 'league-ticket-exchange',
        name: 'League Ticket',
        description: 'A ticket for Chansey prize wheels.',
        icon: {
          type: 'item',
          id: 'league-ticket',
        },
        cost: [
          {
            type: 'currency',
            id: 'prof-scrip',
            amount: 2,
          },
        ],
        rewards: [
          {
            type: 'currency',
            targetId: 'league-ticket',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'trainer-gb-red',
        name: 'Red (Red)',
        description: 'Classic GB RED trainer sprite.',
        icon: {
          type: 'trainer',
          id: 'gb-red',
        },
        cost: [
          {
            type: 'currency',
            id: 'prof-scrip',
            amount: 1000,
          },
        ],
        stock: 1,
        rewards: [
          {
            type: 'icon',
            targetId: 'trainer-gb-red',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'trainer-gb-blue',
        name: 'Blue (Red)',
        description: 'Classic GB BLUE trainer sprite.',
        icon: {
          type: 'trainer',
          id: 'gb-blue',
        },
        cost: [
          {
            type: 'currency',
            id: 'prof-scrip',
            amount: 1000,
          },
        ],
        stock: 1,
        rewards: [
          {
            type: 'icon',
            targetId: 'trainer-gb-blue',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'trainer-gb-red-2',
        name: 'Red (Blue)',
        description: 'Alternative Pokemon Red Version trainer sprite.',
        icon: {
          type: 'trainer',
          id: 'gb-red-2',
        },
        cost: [
          {
            type: 'currency',
            id: 'prof-scrip',
            amount: 1000,
          },
        ],
        stock: 1,
        rewards: [
          {
            type: 'icon',
            targetId: 'trainer-gb-red-2',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'trainer-gb-blue-2',
        name: 'Blue (Blue)',
        description: 'Alternative Pokemon Blue Version trainer sprite.',
        icon: {
          type: 'trainer',
          id: 'gb-blue-2',
        },
        cost: [
          {
            type: 'currency',
            id: 'prof-scrip',
            amount: 1000,
          },
        ],
        stock: 1,
        rewards: [
          {
            type: 'icon',
            targetId: 'trainer-gb-blue-2',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'title-golden-child',
        name: 'Title: Golden Child',
        description: 'Unlock the title "Golden Child".',
        icon: {
          type: 'local',
          id: '/sprites/items/certificate.avif',
        },
        cost: [
          {
            type: 'currency',
            id: 'prof-scrip',
            amount: 500,
          },
        ],
        stock: 1,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'nugget-bridge-join',
          },
        ],
        rewards: [
          {
            type: 'title',
            targetId: 'golden-child',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'icon-nugget',
        name: 'Icon: Nugget',
        description: 'Unlock the Nugget trainer icon.',
        icon: {
          type: 'item',
          id: 'nugget',
        },
        cost: [
          {
            type: 'currency',
            id: 'prof-scrip',
            amount: 500,
          },
        ],
        stock: 1,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'nugget-bridge-join',
          },
        ],
        rewards: [
          {
            type: 'icon',
            targetId: 'nugget',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'title-team-rocket-grunt',
        name: 'Title: Team Rocket Grunt',
        description: 'Unlock the title "Team Rocket Grunt".',
        icon: {
          type: 'local',
          id: '/sprites/items/certificate.avif',
        },
        cost: [
          {
            type: 'currency',
            id: 'prof-scrip',
            amount: 500,
          },
        ],
        stock: 1,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'nugget-bridge-refuse',
          },
        ],
        rewards: [
          {
            type: 'title',
            targetId: 'team-rocket-grunt',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'icon-rocket-m',
        name: 'Icon: Rocket Grunt (M)',
        description: 'Unlock the male Team Rocket Grunt trainer icon.',
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-m',
        },
        cost: [
          {
            type: 'currency',
            id: 'prof-scrip',
            amount: 500,
          },
        ],
        stock: 1,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'nugget-bridge-refuse',
          },
        ],
        rewards: [
          {
            type: 'icon',
            targetId: 'rocket-m',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'icon-rocket-f',
        name: 'Icon: Rocket Grunt (F)',
        description: 'Unlock the female Team Rocket Grunt trainer icon.',
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-f',
        },
        cost: [
          {
            type: 'currency',
            id: 'prof-scrip',
            amount: 500,
          },
        ],
        stock: 1,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'nugget-bridge-refuse',
          },
        ],
        rewards: [
          {
            type: 'icon',
            targetId: 'rocket-f',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
    ],
  },

  {
    id: 'tcg-shop',
    name: 'TCG Maniac',
    description: 'Base Set Booster Packs',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'tcg-maniac-m',
    },
    background: '/backgrounds/lab.avif',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-9',
      },
      {
        type: 'card_collected_set',
        targetId: 'base1',
        count: 102,
        unique: true,
        inverse: true,
      },
    ],
    items: [
      {
        id: 'base-set-booster',
        name: 'Base Set Booster Pack',
        description: 'A Booster Pack of 5 Base Set Cards',
        icon: {
          type: 'item',
          id: 'pack-base1',
        },
        cost: [
          {
            type: 'currency',
            id: 'crystals',
            amount: 20,
          },
        ],
        rewards: [
          {
            type: 'item',
            targetId: 'pack-base1',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'base-set-booster-box',
        name: 'Base Set Booster Box',
        description: 'A box of 36 Base Set Booster Packs',
        icon: {
          type: 'item',
          id: 'pack-base1',
        },
        cost: [
          {
            type: 'currency',
            id: 'crystals',
            amount: 600,
          },
        ],
        rewards: [
          {
            type: 'item',
            targetId: 'pack-base1',
            quantity: 36,
            dropChance: 100,
          },
        ],
      },
    ],
  },

  {
    id: 'oaks-balls',
    name: "Prof's Balls",
    description: "The Professor's surplus supply of Poké Balls.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    background: '/backgrounds/lab.avif',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-6',
      },
    ],
    items: [
      {
        id: 'prof-poke-ball-bundle',
        name: "Prof's Daily Ball Bundle",
        description: 'A daily bundle of 5 Poké Balls.',
        stock: 1,
        daily: true, // Resets daily
        icon: {
          type: 'item',
          id: 'poke-ball',
        },
        cost: [
          {
            type: 'currency',
            id: 'pokedollars',
            amount: 1750,
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
    ],
  },
]
