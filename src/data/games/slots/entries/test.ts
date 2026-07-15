import { SlotGameConfig } from '../types'

export const testbasicslotgameEntries: SlotGameConfig[] = [
  {
    id: 'basic-slots',
    name: 'Zap-Slots',
    description: 'Win Electrifying Prizes!',
    category: 'Kanto',
    subCategory: 'Test',
    icon: {
      type: 'pokemon',
      id: '145',
    },
    requirements: [],
    rewards: [], // Rewards are handled per spin
    settings: {
      timeLimit: 600, // 10 minutes hidden timer
      cost: {
        currencyType: 'pokedollars',
        amount: 100,
      },
      winRate: { min: 10, max: 20 }, // Variable win rate per session
      symbols: [
        {
          id: 'master-ball',
          icon: { type: 'item', id: 'master-ball' },
          weight: 2,
        },
        {
          id: 'ultra-ball',
          icon: { type: 'item', id: 'ultra-ball' },
          weight: 5,
        },
        {
          id: 'great-ball',
          icon: { type: 'item', id: 'great-ball' },
          weight: 10,
        },
        {
          id: 'poke-ball',
          icon: { type: 'item', id: 'poke-ball' },
          weight: 15,
        },
      ],
      paytable: [
        // Jackpot: 3x Master Ball
        {
          icons: ['master-ball', 'master-ball', 'master-ball'],
          rewards: [
            {
              type: 'item',
              targetId: 'pack-pgo',
              quantity: 1,
              dropChance: 100,
            },
          ],
          weight: 1, // Very Rare
        },
        {
          icons: ['ultra-ball', 'ultra-ball', 'ultra-ball'],
          rewards: [
            {
              type: 'item',
              targetId: 'pack-pgo',
              quantity: 1,
              dropChance: 100,
            },
          ],
          weight: 9, // Very Rare
        },
        {
          icons: ['great-ball', 'great-ball', 'great-ball'],
          rewards: [
            {
              type: 'item',
              targetId: 'pack-pgo',
              quantity: 1,
              dropChance: 100,
            },
          ],
          weight: 20, // Very Rare
        },
        {
          icons: ['poke-ball', 'poke-ball', 'poke-ball'],
          rewards: [
            {
              type: 'item',
              targetId: 'pack-pgo',
              quantity: 1,
              dropChance: 100,
            },
          ],
          weight: 70, // Very Rare
        },
      ],
      backgroundImage: '/scratchcard/zapscratch.avif', // Example background
      machineTheme: 'classic',
      themeColour: '#facc15', // Electric yellow to match Zapdos theme
    },
  },
]
