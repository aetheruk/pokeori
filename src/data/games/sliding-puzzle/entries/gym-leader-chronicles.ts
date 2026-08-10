import type { SlidingPuzzleConfig } from '../types'

export const gymLeaderChronicleSlidingPuzzleGames: SlidingPuzzleConfig[] = [
  {
    id: 'chronicle-sabrina-realign-the-signal',
    name: 'Realign the Signal',
    description: 'Reassemble Porygon’s broken calibration pattern and guide it home.',
    category: 'Secret', subCategory: 'Sabrina Chronicle',
    icon: { type: 'pokemon', id: '137' },
    background: '/backgrounds/chronicle-sabrina-teleport-lab.avif',
    requirements: [{ type: 'task_completed', targetId: 'marsh-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { pokemonPool: [137], timeLimit: 120, winRate: 1, gridSize: 3, shuffleMoves: 38 },
  },
]
