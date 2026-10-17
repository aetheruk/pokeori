import type { UndergroundMiningConfig } from '../types'

export const mtMoonUndergroundMiningEntries: UndergroundMiningConfig[] = [
  {
    id: 'mt-moon-mining',
    name: 'Mining Mt. Moon',
    description: 'Time to see what Geodude is made of!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'item',
      id: 'hard-stone',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-fossil-hunter',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: '74',
        count: 1,
        consume: true,
      },
    ],
    settings: {
      complete: false,
      gridSize: { cols: 13, rows: 10 },
      wallTexture: '/backgrounds/underground-mining-wall.avif',
      wallTexturePortrait: '/games/underground-mining/scene-portrait.avif',
      treasureCount: { min: 1, max: 1 },
      lootPool: [
        {
          itemId: 'small-stone-t1',
          weight: 1,
          size: { width: 2, height: 2 },
          quantity: 1,
        },
      ],
      bonusLoot: [
        {
          itemId: 'moon-stone',
          size: { width: 2, height: 2 },
          quantity: 1,
          dropChance: 2,
        },
        {
          itemId: 'dome-fossil',
          size: { width: 2, height: 2 },
          quantity: 1,
          dropChance: 1,
          requirements: [
            {
              type: 'task_completed',
              targetId: 'mt-moon-expert-advice',
              inverse: true,
            },
          ],
        },
        {
          itemId: 'dome-fossil',
          size: { width: 2, height: 2 },
          quantity: 1,
          dropChance: 2,
          requirements: [
            { type: 'task_completed', targetId: 'mt-moon-expert-advice' },
          ],
        },
        {
          itemId: 'helix-fossil',
          size: { width: 2, height: 2 },
          quantity: 1,
          dropChance: 1,
          requirements: [
            {
              type: 'task_completed',
              targetId: 'mt-moon-expert-advice',
              inverse: true,
            },
          ],
        },
        {
          itemId: 'helix-fossil',
          size: { width: 2, height: 2 },
          quantity: 1,
          dropChance: 2,
          requirements: [
            { type: 'task_completed', targetId: 'mt-moon-expert-advice' },
          ],
        },
      ],
      wallStressLimit: 49,
      toolStress: { pickaxe: 1, hammer: 2 },
      bedrockChance: 4,
    },
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '74',
        quantity: 5,
        dropChance: 100,
      },
    ],
    skillXp: { skill: 'catching', level: 15 },
  },
]
