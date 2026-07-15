import { SnapConfig } from '../types'

export const vermillionCitysnapEntries: SnapConfig[] = [
  {
    id: 'vermilion-gym-voltorb-1',
    name: 'Voltorb Trap',
    description: 'A volatile Voltorb blocks the path through Vermilion Gym.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '100',
    },
    background: '/backgrounds/gym-electric.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-gym-shrub',
      },
    ],
    rewards: [],
    settings: {
      target: 100,
      targetMissMessage: 'Voltorb exploded!',
      timeLimit: 20,
      winRate: 1,
      successThreshold: 1000,
      death: true,
    },
  },
  {
    id: 'vermilion-gym-voltorb-2',
    name: 'Voltorb Trap II',
    description: 'The second Voltorb is rolling faster than the first.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '100',
    },
    background: '/backgrounds/gym-electric.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-gym-shrub',
      },
    ],
    rewards: [],
    settings: {
      target: 100,
      targetMissMessage: 'Voltorb exploded!',
      timeLimit: 16,
      winRate: 2,
      successThreshold: 850,
      death: true,
    },
  },
  {
    id: 'vermilion-gym-voltorb-3',
    name: 'Voltorb Trap III',
    description: "Lt. Surge's final trap is one bad flash away from blowing the challenge.",
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '100',
    },
    background: '/backgrounds/gym-electric.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-gym-shrub',
      },
    ],
    rewards: [],
    settings: {
      target: 100,
      targetMissMessage: 'Voltorb exploded!',
      timeLimit: 12,
      winRate: 3,
      successThreshold: 700,
      death: true,
    },
  },
  {
    id: 'vermilion-gym-voltorb-drill',
    name: "Surge's Voltorb Drill",
    description:
      'Return to Vermilion Gym for Lt. Surge\'s daily flash drill and keep the leftover Voltorb traps from exploding.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '100',
    },
    background: '/backgrounds/gym-electric.avif',
    daily: true,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'vermilion-gym-lt-surge',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'daily_not_completed',
        targetId: 'vermilion-gym-voltorb-drill',
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'pack-gym1',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'currency',
        targetId: 'league-ticket',
        quantity: 1,
        dropChance: 100,
      },
    ],
    settings: {
      target: 100,
      targetMissMessage: 'Voltorb exploded!',
      timeLimit: 18,
      winRate: 2,
      successThreshold: 800,
    },
  },
]
