import type { SlidingPuzzleConfig } from '../types'

export const gymLeaderChronicleSlidingPuzzleGames: SlidingPuzzleConfig[] = [
  {
    id: 'chronicle-sabrina-hold-the-focus-pattern',
    name: 'Hold the Focus Pattern',
    description: 'Reassemble the pattern Sabrina uses to separate one thought from a crowded room.',
    category: 'Secret', subCategory: 'Sabrina Chronicle',
    icon: { type: 'pokemon', id: '64' },
    background: '/backgrounds/chronicle-sabrina-quiet-mindscape.avif',
    requirements: [{ type: 'task_completed', targetId: 'marsh-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { pokemonPool: [64], timeLimit: 120, winRate: 1, gridSize: 3, shuffleMoves: 38 },
  },
]
