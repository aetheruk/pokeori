import { MiningConfig } from '../types'

export const rockTunnelminingEntries: MiningConfig[] = [
  {
    id: 'rock-tunnel-hidden-chamber-mining',
    name: 'Hidden Chamber Mining',
    description: 'Chip metal scrap from the exposed veins in Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'item', id: 'metal-scrap-t1' },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'rock-tunnel-hidden-chamber',
      },
    ],
    criteria: [],
    settings: {
      targetSize: { min: 6, max: 10 },
      speed: { min: 1.0, max: 1.35 },
      itemHp: 90,
      perfectDamage: 25,
      okDamage: 10,
      maxSwings: 9,
      timeLimit: 28,
      winRate: 1,
      buttonIcon: { type: 'item', id: 'metal-scrap-t1' },
      miningTarget: '/games/mining/metal-vein.avif',
    },
    rewards: [
      {
        type: 'item',
        targetId: 'metal-scrap-t1',
        quantity: { min: 1, max: 2 },
        dropChance: 100,
      },
      {
        type: 'task_complete',
        targetId: 'rusty-coat-recipe',
        dropChance: 12,
      },
    ],
    skillXp: { skill: 'catching', level: 15 },
  },
]
