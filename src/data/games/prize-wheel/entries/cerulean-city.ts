import { PrizeWheelGameConfig } from '../types'

export const ceruleanCitychanseyEntries: PrizeWheelGameConfig[] = [
  {
    id: 'chansey-wheel-cerulean',
    name: 'Cerulean Chansey Wheel',
    gameType: 'prize-wheel',
    description:
      'Visit Chansey in the Cerulean City Pokemon Center and spin the wheel for a chance to win helpful prizes each day!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/chansey.avif',
    icon: { type: 'pokemon', id: '113' },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-cerulean-city',
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
          label: '5x Potions',
          color: '#F1AEC6',
          percentage: 35,
          icon: { type: 'item', id: 'battle-potion' },
          rewards: [{ type: 'item', targetId: 'battle-potion', quantity: 5, dropChance: 100 }],
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
          label: '3x Water Gems',
          color: '#F1AEC6',
          percentage: 20,
          icon: { type: 'item', id: 'water-gem' },
          rewards: [{ type: 'item', targetId: 'water-gem', quantity: 3, dropChance: 100 }],
        },
        {
          id: '4',
          label: '3x Aqua Solvent',
          color: '#E8F3E2',
          percentage: 19,
          icon: { type: 'item', id: 'aqua-solvent-t1' },
          rewards: [{ type: 'item', targetId: 'aqua-solvent-t1', quantity: 3, dropChance: 100 }],
        },
        {
          id: '5',
          label: 'Nugget',
          color: '#f7cf05',
          percentage: 1,
          icon: { type: 'item', id: 'nugget' },
          rewards: [{ type: 'item', targetId: 'nugget', quantity: 1, dropChance: 100 }],
        },
      ],
    },
  },
]
