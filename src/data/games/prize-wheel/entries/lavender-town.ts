import { PrizeWheelGameConfig } from '../types'

export const lavenderTownchanseyEntries: PrizeWheelGameConfig[] = [
  {
    id: 'chansey-wheel-lavender',
    name: 'Lavender Chansey Wheel',
    gameType: 'prize-wheel',
    description:
      'Visit Chansey in the Lavender Town Pokemon Center and spin the wheel for a chance to win spectral and psychic crafting prizes each day!',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    background: '/backgrounds/chansey.avif',
    icon: { type: 'pokemon', id: '113' },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-lavender-town',
      },
    ],
    criteria: [
    ],
    rewards: [],
    settings: {
      spinTime: { min: 5, max: 10 },
      background: '/scratchcard/chansey.avif',
      themeColour: '#FAC0CC',
      cost: { amount: 2, currencyType: 'league-ticket' },
      slots: [
        {
          id: '1',
          label: '6x Psychic Gems',
          color: '#F1AEC6',
          percentage: 23,
          icon: { type: 'item', id: 'psychic-gem' },
          rewards: [{ type: 'item', targetId: 'psychic-gem', quantity: 6, dropChance: 100 }],
        },
        {
          id: '2',
          label: '6x Ghost Gems',
          color: '#E8F3E2',
          percentage: 24,
          icon: { type: 'item', id: 'ghost-gem' },
          rewards: [{ type: 'item', targetId: 'ghost-gem', quantity: 6, dropChance: 100 }],
        },
        {
          id: '3',
          label: '6x Rune Stones',
          color: '#F1AEC6',
          percentage: 24,
          icon: { type: 'item', id: 'mind-thread-t1' },
          rewards: [{ type: 'item', targetId: 'mind-thread-t1', quantity: 6, dropChance: 100 }],
        },
        {
          id: '4',
          label: '6x Ectoplasm',
          color: '#E8F3E2',
          percentage: 24,
          icon: { type: 'item', id: 'spirit-wisp-t1' },
          rewards: [{ type: 'item', targetId: 'spirit-wisp-t1', quantity: 6, dropChance: 100 }],
        },
        {
          id: '5',
          label: '6x Ghost Gems',
          color: '#f7cf05',
          percentage: 5,
          icon: { type: 'item', id: 'ghost-gem' },
          rewards: [{ type: 'item', targetId: 'ghost-gem', quantity: 6, dropChance: 100 }],
        },
      ],
    },
  },
]
