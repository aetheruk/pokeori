import type { ExpeditionConfig } from '../types'

export const mtMoonExpeditions: ExpeditionConfig[] = [
  {
    id: 'mt-moon-expedition',
    name: 'Mt. Moon Expedition',
    description: "A handrawn map with the message: {Trainer} I'll be waiting in Mt Moon...",
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'item',
      id: 'mt-moon-expedition-map',
    },
    background: '/backgrounds/cave.avif',
    mapItemId: 'mt-moon-expedition-map',
    maxLosses: 3,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-exit',
      },
      {
        type: 'item_owned',
        targetId: 'mt-moon-expedition-map',
      },
    ],
    activityPool: {
      battle: [
        'exp-bug-catcher-kent',
        'exp-lass-iris',
        'exp-mt-moon-grunt-1',
        'exp-super-nerd-jovan',
        'exp-bug-catcher-robby',
        'exp-lass-miriam',
        'exp-mt-moon-grunt-2',
        'exp-youngster-josh',
        'exp-hiker-marcos',
        'exp-mt-moon-grunt-3',
        'exp-mt-moon-grunt-4',
        'exp-researcher-miguel',
      ],
      location: ['exp-mt-moon-1f', 'exp-mt-moon-b1f', 'exp-mt-moon-b2f'],
    },
    path: [
      {
        type: 'activity',
        id: 'mm-exp-step-1',
        categories: ['location'],
      },
      {
        type: 'activity',
        id: 'mm-exp-step-2',
        activityType: 'battle',
        activityId: 'exp-mt-moon-1f-battle',
      },
      {
        type: 'activity',
        id: 'mm-exp-step-3',
        categories: ['battle'],
      },
      {
        type: 'branch',
        id: 'mm-exp-step-4-branch',
        branches: [
          {
            id: 'catch-route',
            weight: 1,
            nodes: [
              {
                type: 'activity',
                id: 'mm-exp-step-4-catch',
                categories: ['location'],
              },
            ],
          },
          {
            id: 'battle-route',
            weight: 1,
            nodes: [
              {
                type: 'activity',
                id: 'mm-exp-step-4-battle',
                activityType: 'battle',
                activityId: 'exp-mt-moon-b1f-battle',
              },
            ],
          },
        ],
      },
      {
        type: 'activity',
        id: 'mm-exp-step-5-task',
        secret: true,
        activityType: 'task',
        activityId: 'exp-mt-moon-lass-warning',
      },
      {
        type: 'activity',
        id: 'mm-exp-step-6',
        secret: true,
        activityType: 'battle',
        activityId: 'exp-mt-moon-clefable-boss',
      },
    ],
    rewards: [
      {
        type: 'xp',
        targetId: 'catching',
        quantity: 350,
        dropChance: 100,
      },
      {
        type: 'currency',
        targetId: 'pokedollars',
        quantity: 550,
        dropChance: 100,
      },
      {
        type: 'currency',
        targetId: 'crystals',
        quantity: 100,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'escape-rope',
        quantity: 2,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'pixie-powder-t1',
        quantity: 10,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'moon-stone',
        quantity: 1,
        dropChance: 15,
      },
    ],
  },
]
