import type { ShopConfig, ShopItem } from '../types'

const starterShopChoices = [
  {
    id: 'bulbasaur',
    name: 'Bulbasaur',
    pokemonId: '1',
    taskId: 'starter-bulbasaur',
    titleId: 'starter-grass',
  },
  {
    id: 'charmander',
    name: 'Charmander',
    pokemonId: '4',
    taskId: 'starter-charmander',
    titleId: 'starter-fire',
  },
  {
    id: 'squirtle',
    name: 'Squirtle',
    pokemonId: '7',
    taskId: 'starter-squirtle',
    titleId: 'starter-water',
  },
  {
    id: 'chikorita',
    name: 'Chikorita',
    pokemonId: '152',
    taskId: 'starter-chikorita',
    titleId: 'starter-grass',
  },
  {
    id: 'cyndaquil',
    name: 'Cyndaquil',
    pokemonId: '155',
    taskId: 'starter-cyndaquil',
    titleId: 'starter-fire',
  },
  {
    id: 'totodile',
    name: 'Totodile',
    pokemonId: '158',
    taskId: 'starter-totodile',
    titleId: 'starter-water',
  },
  {
    id: 'treecko',
    name: 'Treecko',
    pokemonId: '252',
    taskId: 'starter-treecko',
    titleId: 'starter-grass',
  },
  {
    id: 'torchic',
    name: 'Torchic',
    pokemonId: '255',
    taskId: 'starter-torchic',
    titleId: 'starter-fire',
  },
  {
    id: 'mudkip',
    name: 'Mudkip',
    pokemonId: '258',
    taskId: 'starter-mudkip',
    titleId: 'starter-water',
  },
  {
    id: 'turtwig',
    name: 'Turtwig',
    pokemonId: '387',
    taskId: 'starter-turtwig',
    titleId: 'starter-grass',
  },
  {
    id: 'chimchar',
    name: 'Chimchar',
    pokemonId: '390',
    taskId: 'starter-chimchar',
    titleId: 'starter-fire',
  },
  {
    id: 'piplup',
    name: 'Piplup',
    pokemonId: '393',
    taskId: 'starter-piplup',
    titleId: 'starter-water',
  },
  {
    id: 'snivy',
    name: 'Snivy',
    pokemonId: '495',
    taskId: 'starter-snivy',
    titleId: 'starter-grass',
  },
  {
    id: 'tepig',
    name: 'Tepig',
    pokemonId: '498',
    taskId: 'starter-tepig',
    titleId: 'starter-fire',
  },
  {
    id: 'oshawott',
    name: 'Oshawott',
    pokemonId: '501',
    taskId: 'starter-oshawott',
    titleId: 'starter-water',
  },
  {
    id: 'chespin',
    name: 'Chespin',
    pokemonId: '650',
    taskId: 'starter-chespin',
    titleId: 'starter-grass',
  },
  {
    id: 'fennekin',
    name: 'Fennekin',
    pokemonId: '653',
    taskId: 'starter-fennekin',
    titleId: 'starter-fire',
  },
  {
    id: 'froakie',
    name: 'Froakie',
    pokemonId: '656',
    taskId: 'starter-froakie',
    titleId: 'starter-water',
  },
  {
    id: 'rowlet',
    name: 'Rowlet',
    pokemonId: '722',
    taskId: 'starter-rowlet',
    titleId: 'starter-grass',
  },
  {
    id: 'litten',
    name: 'Litten',
    pokemonId: '725',
    taskId: 'starter-litten',
    titleId: 'starter-fire',
  },
  {
    id: 'popplio',
    name: 'Popplio',
    pokemonId: '728',
    taskId: 'starter-popplio',
    titleId: 'starter-water',
  },
  {
    id: 'grookey',
    name: 'Grookey',
    pokemonId: '810',
    taskId: 'starter-grookey',
    titleId: 'starter-grass',
  },
  {
    id: 'scorbunny',
    name: 'Scorbunny',
    pokemonId: '813',
    taskId: 'starter-scorbunny',
    titleId: 'starter-fire',
  },
  {
    id: 'sobble',
    name: 'Sobble',
    pokemonId: '816',
    taskId: 'starter-sobble',
    titleId: 'starter-water',
  },
  {
    id: 'sprigatito',
    name: 'Sprigatito',
    pokemonId: '906',
    taskId: 'starter-sprigatito',
    titleId: 'starter-grass',
  },
  {
    id: 'fuecoco',
    name: 'Fuecoco',
    pokemonId: '909',
    taskId: 'starter-fuecoco',
    titleId: 'starter-fire',
  },
  {
    id: 'quaxly',
    name: 'Quaxly',
    pokemonId: '912',
    taskId: 'starter-quaxly',
    titleId: 'starter-water',
  },
] as const

const starterShopTitles = [
  { id: 'starter-grass', name: 'New Leaf' },
  { id: 'starter-fire', name: 'Tiny Ember' },
  { id: 'starter-water', name: 'Bubble Blower' },
] as const

const profScripStarterCost = (): ShopItem['cost'] => [
  {
    type: 'currency',
    id: 'prof-scrip',
    amount: 500,
  },
]

const starterChoiceExclusion = (taskId: string): ShopItem['requirements'] => [
  {
    type: 'task_completed',
    targetId: taskId,
    inverse: true,
  },
]

const starterTitleRequirement = (titleId: string): ShopItem['requirements'] => [
  {
    type: 'any_of',
    conditions: starterShopChoices
      .filter((starter) => starter.titleId !== titleId)
      .map((starter) => ({
        type: 'task_completed' as const,
        targetId: starter.taskId,
      })),
  },
]

const starterExclusiveShopItems: ShopItem[] = [
  ...starterShopChoices.map((starter) => ({
    id: `icon-${starter.id}`,
    name: `Icon: ${starter.name}`,
    description: `Unlock the ${starter.name} trainer icon.`,
    icon: {
      type: 'pokemon' as const,
      id: starter.pokemonId,
    },
    cost: profScripStarterCost(),
    stock: 1,
    requirements: starterChoiceExclusion(starter.taskId),
    rewards: [
      {
        type: 'icon' as const,
        targetId: starter.id,
        quantity: 1,
        dropChance: 100,
      },
    ],
  })),
  ...starterShopTitles.map((title) => ({
    id: `title-${title.id}`,
    name: `Title: ${title.name}`,
    description: `Unlock the title "${title.name}".`,
    icon: {
      type: 'local' as const,
      id: '/sprites/items/certificate.avif',
    },
    cost: profScripStarterCost(),
    stock: 1,
    requirements: starterTitleRequirement(title.id),
    rewards: [
      {
        type: 'title' as const,
        targetId: title.id,
        dropChance: 100,
      },
    ],
  })),
]

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
      ...starterExclusiveShopItems,
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
