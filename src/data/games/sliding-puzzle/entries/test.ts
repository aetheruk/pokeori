import type { SlidingPuzzleConfig } from '../types'

export const testslidingpuzzlegamesEntries: SlidingPuzzleConfig[] = [
  {
    id: 'sliding-puzzle-tutorial',
    name: 'Pika Puzzle',
    description: 'Slide the tiles to complete the Pokemon picture!',
    category: 'Kanto',
    subCategory: 'Test',
    icon: {
      type: 'pokemon',
      id: '25',
    },
    background: '/backgrounds/cave.avif',
    requirements: [],
    rewards: [
      {
        type: 'item',
        targetId: 'pack-pgo',
        quantity: 1,
        dropChance: 100,
      },
    ],
    settings: {
      pokemonPool: [25, 26],
      timeLimit: 300,
      winRate: 1,
      gridSize: 3,
    },
  },
]
