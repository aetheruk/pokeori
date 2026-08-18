import type { ExpeditionConfig } from '../types'

export const fuchsiaCityExpeditions: ExpeditionConfig[] = [
  {
    id: 'route-14-bird-gauntlet-expedition',
    name: 'The Feathered Gauntlet',
    description:
      "Donald's flock keeps the gauntlet open for challengers. Beat all six Bird Keepers again to earn their respect.",
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'bird-keeper',
    },
    background: '/backgrounds/grassy-route.avif',
    maxLosses: 1,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-14-bird-gauntlet-clear',
      },
    ],
    activityPool: {
      battle: [
        'route-14-gauntlet-carter',
        'route-14-gauntlet-mitch',
        'route-14-gauntlet-marlon',
        'route-14-gauntlet-beck',
        'route-14-gauntlet-benny',
        'route-14-gauntlet-donald',
      ],
    },
    path: [
      {
        type: 'activity',
        id: 'route-14-gauntlet-step-1',
        activityType: 'battle',
        activityId: 'route-14-gauntlet-carter',
      },
      {
        type: 'activity',
        id: 'route-14-gauntlet-step-2',
        activityType: 'battle',
        activityId: 'route-14-gauntlet-mitch',
      },
      {
        type: 'activity',
        id: 'route-14-gauntlet-step-3',
        activityType: 'battle',
        activityId: 'route-14-gauntlet-marlon',
      },
      {
        type: 'activity',
        id: 'route-14-gauntlet-step-4',
        activityType: 'battle',
        activityId: 'route-14-gauntlet-beck',
      },
      {
        type: 'activity',
        id: 'route-14-gauntlet-step-5',
        activityType: 'battle',
        activityId: 'route-14-gauntlet-benny',
      },
      {
        type: 'activity',
        id: 'route-14-gauntlet-step-6',
        activityType: 'battle',
        activityId: 'route-14-gauntlet-donald',
      },
    ],
    rewards: [
      {
        type: 'currency',
        targetId: 'pokedollars',
        quantity: 1200,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'wing-feather-t1',
        quantity: 3,
        dropChance: 100,
      },
    ],
  },
]
