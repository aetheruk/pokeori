import type { ExpeditionConfig } from '../types'

export const viridianForestExpeditions: ExpeditionConfig[] = [
  {
    id: 'bug-gauntlet-expedition',
    name: 'The Buggy Gauntlet',
    description:
      'The Buggy 4 have challenged me to a Gauntlet battle! Ive beat them before... how hard can it be.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxLosses: 1,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-champion',
        battleStatus: 'win',
        count: 1,
      },
    ],
    activityPool: {
      battle: [
        'bug-gauntlet-barry',
        'bug-gauntlet-billy',
        'bug-gauntlet-berry',
        'bug-gauntlet-benny',
        'bug-gauntlet-champion',
      ],
    },
    path: [
      {
        type: 'activity',
        id: 'gauntlet-step-1',
        activityType: 'battle',
        activityId: 'bug-gauntlet-barry',
      },
      {
        type: 'activity',
        id: 'gauntlet-step-2',
        activityType: 'battle',
        activityId: 'bug-gauntlet-billy',
      },
      {
        type: 'activity',
        id: 'gauntlet-step-3',
        activityType: 'battle',
        activityId: 'bug-gauntlet-berry',
      },
      {
        type: 'activity',
        id: 'gauntlet-step-4',
        activityType: 'battle',
        activityId: 'bug-gauntlet-benny',
      },
      {
        type: 'activity',
        id: 'gauntlet-step-5',
        activityType: 'battle',
        activityId: 'bug-gauntlet-champion',
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'chitin-fragment-t1',
        quantity: 5,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'rare-candy-xs',
        quantity: 5,
        dropChance: 100,
      },
      {
        type: 'currency',
        targetId: 'pokedollars',
        quantity: 600,
        dropChance: 100,
      },
    ],
  },
]
