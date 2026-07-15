import { PrizeWheelGameConfig } from '../types'

export const viridianCitychanseyEntries: PrizeWheelGameConfig[] = [
  {
    id: 'chansey-wheel-viridian',
    name: 'Viridian Chansey Wheel',
    gameType: 'prize-wheel',
    description:
      'Visit Chansey in the Viridian City Pokemon Center and spin the wheel for a chance to win helpful prizes each day!',
    category: 'Kanto',
    subCategory: 'Viridian City',
    background: '/backgrounds/chansey.avif',
    icon: { type: 'pokemon', id: '113' },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-viridian',
      },
    ],
    criteria: [
    ],
    rewards: [],
    settings: {
      spinTime: { min: 5, max: 10 },
      background: '/scratchcard/chansey.avif',
      themeColour: '#FAC0CC', // ChanseyPink
      cost: { amount: 2, currencyType: 'league-ticket' },
      slots: [
        {
          id: '1',
          label: '5x Poke Balls',
          color: '#F1AEC6',
          percentage: 12.5,
          icon: { type: 'item', id: 'poke-ball' },
          rewards: [{ type: 'item', targetId: 'poke-ball', quantity: 5, dropChance: 100 }],
        },
        {
          id: '2',
          label: '3x Broken Balls',
          color: '#E8F3E2',
          percentage: 12.5,
          icon: { type: 'item', id: 'broken-ball-t1' },
          rewards: [{ type: 'item', targetId: 'broken-ball-t1', quantity: 3, dropChance: 100 }],
        },
        {
          id: '3',
          label: '3x Red Nuts',
          color: '#F1AEC6',
          percentage: 12.5,
          icon: { type: 'item', id: 'nut-red' },
          rewards: [{ type: 'item', targetId: 'nut-red', quantity: 3, dropChance: 100 }],
        },
        {
          id: '4',
          label: '3x Soft Fluff',
          color: '#E8F3E2',
          percentage: 12.5,
          icon: { type: 'item', id: 'soft-fluff-t1' },
          rewards: [{ type: 'item', targetId: 'soft-fluff-t1', quantity: 3, dropChance: 100 }],
        },
        {
          id: '5',
          label: '5x Poke Balls',
          color: '#F1AEC6',
          percentage: 12.5,
          icon: { type: 'item', id: 'poke-ball' },
          rewards: [{ type: 'item', targetId: 'poke-ball', quantity: 5, dropChance: 100 }],
        },
        {
          id: '6',
          label: '3x Broken Balls',
          color: '#E8F3E2',
          percentage: 12.5,
          icon: { type: 'item', id: 'broken-ball-t1' },
          rewards: [{ type: 'item', targetId: 'broken-ball-t1', quantity: 3, dropChance: 100 }],
        },
        {
          id: '7',
          label: '3x Red Nuts',
          color: '#F1AEC6',
          percentage: 12.5,
          icon: { type: 'item', id: 'nut-red' },
          rewards: [{ type: 'item', targetId: 'nut-red', quantity: 3, dropChance: 100 }],
        },
        {
          id: '8',
          label: '3x Soft Fluff',
          color: '#E8F3E2',
          percentage: 12.5,
          icon: { type: 'item', id: 'soft-fluff-t1' },
          rewards: [{ type: 'item', targetId: 'soft-fluff-t1', quantity: 3, dropChance: 100 }],
        },
      ],
    },
  },
]
