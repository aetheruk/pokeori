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
      {
        type: 'item',
        targetId: 'rare-candy-l',
        quantity: 3,
        dropChance: 100,
      },
    ],
  },
  {
    id: 'fuchsia-gym-trial-expedition',
    name: "Koga's Gym Trial",
    description:
      'Keep your judgment while the poisoned floor wears down your team, defeat Koga’s ninjas, and feel your way through the invisible walls.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: { type: 'trainer', id: 'gym-kanto-koga' },
    background: '/backgrounds/gym-poison.avif',
    maxLosses: 3,
    requirements: [
      { type: 'task_completed', targetId: 'fuchsia-gym-trial-ready' },
      { type: 'item_owned', targetId: 'badge-kanto-soul', inverse: true },
    ],
    activityPool: {
      battle: [
        'fuchsia-gym-juggler-nate',
        'fuchsia-gym-juggler-kayden',
        'fuchsia-gym-juggler-kirk',
        'fuchsia-gym-tamer-edgar',
        'fuchsia-gym-tamer-phil',
        'fuchsia-gym-juggler-shawn',
        'fuchsia-gym-leader-koga',
      ],
      game: ['fuchsia-gym-invisible-maze-one', 'fuchsia-gym-invisible-maze-two'],
      task: ['fuchsia-gym-koga-rewards'],
    },
    path: [
      { type: 'activity', id: 'fuchsia-gym-step-nate', activityType: 'battle', activityId: 'fuchsia-gym-juggler-nate' },
      { type: 'activity', id: 'fuchsia-gym-step-kayden', activityType: 'battle', activityId: 'fuchsia-gym-juggler-kayden' },
      { type: 'activity', id: 'fuchsia-gym-step-maze-one', activityType: 'game', activityId: 'fuchsia-gym-invisible-maze-one' },
      { type: 'activity', id: 'fuchsia-gym-step-kirk', activityType: 'battle', activityId: 'fuchsia-gym-juggler-kirk' },
      { type: 'activity', id: 'fuchsia-gym-step-edgar', activityType: 'battle', activityId: 'fuchsia-gym-tamer-edgar' },
      { type: 'activity', id: 'fuchsia-gym-step-maze-two', activityType: 'game', activityId: 'fuchsia-gym-invisible-maze-two' },
      { type: 'activity', id: 'fuchsia-gym-step-phil', activityType: 'battle', activityId: 'fuchsia-gym-tamer-phil' },
      { type: 'activity', id: 'fuchsia-gym-step-shawn', activityType: 'battle', activityId: 'fuchsia-gym-juggler-shawn' },
      { type: 'activity', id: 'fuchsia-gym-step-koga', activityType: 'battle', activityId: 'fuchsia-gym-leader-koga' },
      { type: 'activity', id: 'fuchsia-gym-step-rewards', activityType: 'task', activityId: 'fuchsia-gym-koga-rewards', secret: true },
    ],
    rewards: [
      { type: 'item', targetId: 'badge-kanto-soul', quantity: 1, dropChance: 100 },
      { type: 'item', targetId: 'tm-swift-poison', quantity: 1, dropChance: 100 },
      { type: 'item', targetId: 'binder-gym2', quantity: 1, dropChance: 100 },
      { type: 'currency', targetId: 'pokedollars', quantity: 4300, dropChance: 100 },
    ],
  },
]
