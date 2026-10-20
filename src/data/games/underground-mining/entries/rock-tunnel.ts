import type { UndergroundMiningConfig } from '../types'

export const rockTunnelUndergroundMiningEntries: UndergroundMiningConfig[] = [
  {
    id: 'rock-tunnel-hidden-chamber-mining',
    name: 'Hidden Chamber Mining',
    description:
      'Excavate Small Stones and Metal Scrap from the hidden veins. A rare Metal Coat may be buried here.',
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
      complete: false,
      gridSize: { cols: 13, rows: 10 },
      wallTexture: '/backgrounds/underground-mining-wall.avif',
      wallTexturePortrait: '/games/underground-mining/scene-portrait.avif',
      treasureCount: { min: 2, max: 4 },
      lootPool: [
        {
          itemId: 'metal-scrap-t1',
          weight: 74.1,
          size: { width: 2, height: 2 },
          quantity: 1,
        },
        {
          itemId: 'small-stone-t1',
          weight: 24.7,
          size: { width: 2, height: 2 },
          quantity: 1,
        },
        {
          itemId: 'metal-coat',
          weight: 1.2,
          size: { width: 2, height: 2 },
          quantity: 1,
        },
      ],
      wallStressLimit: 49,
      toolStress: { pickaxe: 1, hammer: 2 },
      bedrockChance: 4,
    },
    rewards: [
      {
        type: 'task_complete',
        targetId: 'rusty-coat-recipe',
        dropChance: 100,
      },
      {
        type: 'xp',
        skill: 'catching',
        quantity: 50,
        dropChance: 100,
      },
    ],
  },
]
