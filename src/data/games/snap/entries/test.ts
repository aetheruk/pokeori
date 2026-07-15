import { SnapConfig } from '../types'

export const testsnapEntries: SnapConfig[] = [
  {
    id: 'test-voltorb-snap',
    name: 'Voltorb Snap Test',
    description: 'Snap Voltorb before it explodes.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: {
      type: 'pokemon',
      id: '100',
    },
    background: '/backgrounds/power-plant.avif',
    requirements: [],
    rewards: [],
    settings: {
      target: 100,
      targetMissMessage: 'Voltorb exploded!',
      timeLimit: 20,
      winRate: 1,
      successThreshold: 1000,
    },
  },
]
