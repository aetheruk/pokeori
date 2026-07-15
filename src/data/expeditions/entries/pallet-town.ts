import type { ExpeditionConfig } from '../types'

const orientationRequirements: ExpeditionConfig['requirements'] = [
  {
    type: 'pokedex_caught_total',
    count: 1,
  },
  {
    type: 'task_completed',
    targetId: 'tutorial-16',
    inverse: true,
  },
  {
    type: 'expedition_result',
    targetId: 'pallet-town-orientation',
    expeditionStatus: 'completed',
    count: 1,
    inverse: true,
  },
]

export const palletTownExpeditions: ExpeditionConfig[] = [
  {
    id: 'pallet-town-orientation',
    name: 'Pallet Town Orientation',
    description:
      "Professor Oak wants a few minutes in the lab before you take your first proper walk beyond town.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    buttonText: 'Start Orientation',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    background: '/backgrounds/lab.avif',
    maxLosses: 3,
    canAbandon: false,
    canFail: false,
    requirements: orientationRequirements,
    activityPool: {
      task: [
        'pallet-orientation-professor-briefing',
        'pallet-orientation-rival-selection',
        'pallet-orientation-battle-briefing',
        'pallet-orientation-field-briefing',
        'pallet-orientation-wrap-up',
      ],
      battle: ['pallet-orientation-lab-rattata'],
      location: ['pallet-orientation-route-1'],
      research: ['pallet-orientation-cry', 'pallet-orientation-field-observation'],
    },
    path: [
      {
        type: 'activity',
        id: 'pallet-orientation-step-1-briefing',
        activityType: 'task',
        activityId: 'pallet-orientation-professor-briefing',
        secret: true,
      },
      {
        type: 'activity',
        id: 'pallet-orientation-step-3-cry',
        activityType: 'research',
        activityId: 'pallet-orientation-cry',
        secret: true,
      },
      {
        type: 'activity',
        id: 'pallet-orientation-step-4-battle-briefing',
        activityType: 'task',
        activityId: 'pallet-orientation-battle-briefing',
        secret: true,
      },
      {
        type: 'activity',
        id: 'pallet-orientation-step-5-lab-rattata',
        activityType: 'battle',
        activityId: 'pallet-orientation-lab-rattata',
        secret: true,
      },
      {
        type: 'activity',
        id: 'pallet-orientation-step-6-field-briefing',
        activityType: 'task',
        activityId: 'pallet-orientation-field-briefing',
        secret: true,
      },
      {
        type: 'activity',
        id: 'pallet-orientation-step-7-field-observation',
        activityType: 'research',
        activityId: 'pallet-orientation-field-observation',
        secret: true,
      },
      {
        type: 'activity',
        id: 'pallet-orientation-step-8-route-1-catch',
        activityType: 'location',
        activityId: 'pallet-orientation-route-1',
        secret: true,
      },
      {
        type: 'activity',
        id: 'pallet-orientation-step-8-rival-selection',
        activityType: 'task',
        activityId: 'pallet-orientation-rival-selection',
        secret: true,
      },
      {
        type: 'activity',
        id: 'pallet-orientation-step-9-wrap-up',
        activityType: 'task',
        activityId: 'pallet-orientation-wrap-up',
        secret: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'kanto-badge-case',
        quantity: 1,
        secret: true,
      },
      {
        type: 'task_complete',
        targetId: 'tutorial-16',
        secret: true,
      },
    ],
  },
]
