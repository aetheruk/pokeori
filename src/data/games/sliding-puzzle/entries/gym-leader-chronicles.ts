import type { SlidingPuzzleConfig } from '../types'

export const gymLeaderChronicleSlidingPuzzleGames: SlidingPuzzleConfig[] = [
  {
    id: 'chronicle-sabrina-hold-the-focus-pattern',
    name: 'Hold the Focus Pattern',
    description:
      'Reassemble the psychic route that guides Porygon toward the first Silph receiver.',
    category: 'Secret', subCategory: 'Sabrina Chronicle',
    icon: { type: 'pokemon', id: '64' },
    background: '/backgrounds/chronicle-sabrina-teleport-lab.avif',
    requirements: [{ type: 'task_completed', targetId: 'marsh-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { pokemonPool: [64], timeLimit: 120, winRate: 1, gridSize: 3, shuffleMoves: 38 },
  },
]
