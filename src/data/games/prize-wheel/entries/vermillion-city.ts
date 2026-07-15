import { PrizeWheelGameConfig } from '../types'

export const vermillionCitychanseyEntries: PrizeWheelGameConfig[] = [
  {
    id: 'chansey-wheel-vermilion',
    name: 'Vermilion Chansey Wheel',
    gameType: 'prize-wheel',
    description:
      'Visit Chansey in the Vermilion City Pokemon Center and spin the wheel for a chance to win a stat-boosting vitamin each day!',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    background: '/backgrounds/chansey.avif',
    icon: { type: 'pokemon', id: '113' },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [
    ],
    rewards: [],
    settings: {
      spinTime: { min: 5, max: 10 },
      background: '/scratchcard/chansey.avif',
      themeColour: '#FAC0CC',
      cost: { amount: 5, currencyType: 'league-ticket' },
      slots: [
        {
          id: '1',
          label: 'HP Up',
          color: '#F1AEC6',
          percentage: 16.67,
          icon: { type: 'item', id: 'hp-up' },
          rewards: [{ type: 'item', targetId: 'hp-up', quantity: 1, dropChance: 100 }],
        },
        {
          id: '2',
          label: 'Protein',
          color: '#E8F3E2',
          percentage: 16.67,
          icon: { type: 'item', id: 'protein' },
          rewards: [{ type: 'item', targetId: 'protein', quantity: 1, dropChance: 100 }],
        },
        {
          id: '3',
          label: 'Iron',
          color: '#F1AEC6',
          percentage: 16.67,
          icon: { type: 'item', id: 'iron' },
          rewards: [{ type: 'item', targetId: 'iron', quantity: 1, dropChance: 100 }],
        },
        {
          id: '4',
          label: 'Calcium',
          color: '#E8F3E2',
          percentage: 16.67,
          icon: { type: 'item', id: 'calcium' },
          rewards: [{ type: 'item', targetId: 'calcium', quantity: 1, dropChance: 100 }],
        },
        {
          id: '5',
          label: 'Zinc',
          color: '#F1AEC6',
          percentage: 16.66,
          icon: { type: 'item', id: 'zinc' },
          rewards: [{ type: 'item', targetId: 'zinc', quantity: 1, dropChance: 100 }],
        },
        {
          id: '6',
          label: 'Carbos',
          color: '#E8F3E2',
          percentage: 16.66,
          icon: { type: 'item', id: 'carbos' },
          rewards: [{ type: 'item', targetId: 'carbos', quantity: 1, dropChance: 100 }],
        },
      ],
    },
  },
]
