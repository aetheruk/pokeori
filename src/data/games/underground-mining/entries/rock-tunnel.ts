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
      treasureCount: { min: 1, max: 1 },
      lootPool: [
        {
          itemId: 'metal-scrap-t1',
          weight: 1,
          size: { width: 2, height: 2 },
          quantity: { min: 1, max: 2 },
        },
      ],
      bonusLoot: [
        {
          itemId: 'small-stone-t1',
          size: { width: 2, height: 2 },
          quantity: { min: 1, max: 3 },
          dropChance: 100,
        },
        {
          itemId: 'metal-coat',
          size: { width: 2, height: 2 },
          quantity: 1,
          dropChance: 0.1,
        },
      ],
      wallStressLimit: 32,
      toolStress: { pickaxe: 1, hammer: 2 },
      bedrockChance: 4,
    },
    rewards: [
      {
        type: 'task_complete',
        targetId: 'rusty-coat-recipe',
        dropChance: 12,
      },
    ],
    skillXp: { skill: 'catching', level: 15 },
  },
]
