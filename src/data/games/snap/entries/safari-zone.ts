import { SnapConfig } from '../types'

export const safariZonesnapEntries: SnapConfig[] = [
  {
    id: 'safari-chansey-search-snap',
    name: 'Find the Gentle Chansey',
    description:
      'The Institute has marked a quiet stretch of reeds where a particular Chansey was last seen. Keep the camera ready.',
    category: 'Secret',
    subCategory: 'Safari Zone',
    icon: { type: 'pokemon', id: '113' },
    background: '/backgrounds/safari-reserve.avif',
    requirements: [
      { type: 'task_completed', targetId: 'fuchsia-research-institute-chansey-request' },
      {
        type: 'game_result',
        targetId: 'safari-chansey-search-snap',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'safari-chansey-search-complete',
        quantity: 1,
        dropChance: 100,
      },
    ],
    skillXp: { skill: 'researching', level: 32 },
    settings: {
      target: 113,
      targetMissMessage: 'Chansey slips back into the reeds before the shutter catches it.',
      timeLimit: 60,
      winRate: 1,
      successThreshold: 5000,
    },
  },
]
