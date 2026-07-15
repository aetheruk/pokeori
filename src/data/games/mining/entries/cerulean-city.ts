import { MiningConfig } from '../types'

export const ceruleanCityminingEntries: MiningConfig[] = [
  {
    id: 'razz-bush-shake',
    name: 'Harvesting Razz Berries',
    description:
      "If I shake this tree just right, I might get some Razz Berries! Better yet, they'll grow back tommorow",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'item',
      id: 'razz-berry',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'razz-berry-discovery',
      },
      {
        type: 'daily_not_completed',
        targetId: 'razz-bush-shake',
      },
    ],
    criteria: [],
    daily: true,
    settings: {
      targetSize: { min: 8, max: 10 },
      speed: { min: 1, max: 1 }, // 0.8-1.2 cycles per second
      itemHp: 100,
      perfectDamage: 25,
      okDamage: 10,
      maxSwings: 10,
      timeLimit: 60,
      winRate: 1, // One-shot game
      buttonIcon: {
        type: 'item',
        id: 'razz-berry',
      },
      miningTarget: '/games/mining/razz.avif',
    },
    rewards: [
      {
        type: 'item',
        targetId: 'razz-berry',
        quantity: { min: 3, max: 6 },
        dropChance: 100,
      },
    ],
  },
]
