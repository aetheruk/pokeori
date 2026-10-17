import type { UndergroundMiningConfig } from '../types'

export const gymLeaderChronicleUndergroundMiningEntries: UndergroundMiningConfig[] =
  [
    {
      id: 'chronicle-v2-brock-repair-the-gym-wall',
      name: 'Repair the Gym Wall',
      description:
        'Recover the usable stones from the crumbling wall so the gym can be rebuilt before its next League inspection.',
      category: 'Secret',
      subCategory: 'Brock Chronicle',
      icon: { type: 'item', id: 'hard-stone' },
      background: '/backgrounds/chronicle-brock-neglected-gym.avif',
      requirements: [
        { type: 'task_completed', targetId: 'boulder-badge-memory-revealed' },
      ],
      criteria: [],
      rewards: [],
      settings: {
        complete: true,
        awardLoot: false,
        gridSize: { cols: 8, rows: 6 },
        wallTexture: '/backgrounds/chronicle-brock-neglected-gym.avif',
        treasureCount: { min: 3, max: 3 },
        lootPool: [
          {
            itemId: 'small-stone-t1',
            weight: 1,
            size: { width: 2, height: 2 },
          },
        ],
        wallStressLimit: 32,
        toolStress: { pickaxe: 1, hammer: 2 },
        bedrockChance: 0,
      },
    },
  ]
