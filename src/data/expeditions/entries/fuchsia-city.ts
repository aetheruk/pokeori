import type { ExpeditionConfig } from '../types'

export const fuchsiaCityExpeditions: ExpeditionConfig[] = [
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
