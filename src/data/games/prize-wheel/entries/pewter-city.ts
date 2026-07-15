import { PrizeWheelGameConfig } from '../types'

export const pewterCitychanseyEntries: PrizeWheelGameConfig[] = [
  {
    id: 'chansey-wheel-pewter',
    name: 'Pewter Chansey Wheel',
    gameType: 'prize-wheel',
    description:
      'Visit Chansey in the Pewter City Pokemon Center and spin the wheel for a chance to win helpful prizes each day!',
    category: 'Kanto',
    subCategory: 'Pewter City',
    background: '/backgrounds/chansey.avif',
    icon: { type: 'pokemon', id: '113' },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-pewter',
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
          label: '3x Potions',
          color: '#F1AEC6',
          percentage: 35,
          icon: { type: 'item', id: 'battle-potion' },
          rewards: [{ type: 'item', targetId: 'battle-potion', quantity: 3, dropChance: 100 }],
        },
        {
          id: '2',
          label: '3x Broken Balls',
          color: '#E8F3E2',
          percentage: 25,
          icon: { type: 'item', id: 'broken-ball-t1' },
          rewards: [{ type: 'item', targetId: 'broken-ball-t1', quantity: 3, dropChance: 100 }],
        },
        {
          id: '3',
          label: '3x Rock Gems',
          color: '#F1AEC6',
          percentage: 20,
          icon: { type: 'item', id: 'rock-gem' },
          rewards: [{ type: 'item', targetId: 'rock-gem', quantity: 3, dropChance: 100 }],
        },
        {
          id: '4',
          label: '3x Small Stones',
          color: '#E8F3E2',
          percentage: 19,
          icon: { type: 'item', id: 'small-stone-t1' },
          rewards: [{ type: 'item', targetId: 'small-stone-t1', quantity: 3, dropChance: 100 }],
        },
        {
          id: '5',
          label: 'Moon Stone',
          color: '#f7cf05',
          percentage: 1,
          icon: { type: 'item', id: 'moon-stone' },
          rewards: [{ type: 'item', targetId: 'moon-stone', quantity: 1, dropChance: 100 }],
        },
      ],
    },
  },
]
