import type { SlidingPuzzleConfig } from '../types'

export const gymLeaderChronicleSlidingPuzzleGames: SlidingPuzzleConfig[] = [
  {
    id: 'chronicle-v2-misty-chart-the-cove',
    name: 'Chart the Cove',
    description:
      'Reassemble the sisters’ chart of the currents between Cerulean Gym and the Cape.',
    category: 'Secret', subCategory: 'Misty Chronicle',
    icon: { type: 'pokemon', id: '116' },
    background: '/backgrounds/chronicle-misty-cerulean-cape.avif',
    requirements: [{ type: 'task_completed', targetId: 'cascade-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { pokemonPool: [116], timeLimit: 150, winRate: 1, gridSize: 4, shuffleMoves: 65 },
  },
  {
    id: 'chronicle-v2-sabrina-hold-the-focus-pattern',
    name: 'Hold the Focus Pattern',
    description:
      'Reassemble the psychic route that guides Porygon toward the first Silph receiver.',
    category: 'Secret', subCategory: 'Sabrina Chronicle',
    icon: { type: 'pokemon', id: '64' },
    background: '/backgrounds/chronicle-sabrina-teleport-lab.avif',
    requirements: [{ type: 'task_completed', targetId: 'marsh-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { pokemonPool: [64], timeLimit: 150, winRate: 1, gridSize: 4, shuffleMoves: 65 },
  },
  {
    id: 'chronicle-v2-giovanni-read-the-parcel-map',
    name: 'Read the Parcel Map',
    description:
      'Reassemble the permit map Giovanni intends to turn into control of Viridian’s western road.',
    category: 'Secret', subCategory: 'Giovanni Chronicle',
    icon: { type: 'trainer', id: 'gym-kanto-giovanni' },
    background: '/backgrounds/chronicle-giovanni-viridian-office.avif',
    requirements: [{ type: 'task_completed', targetId: 'earth-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { pokemonPool: [53], timeLimit: 140, winRate: 1, gridSize: 4, shuffleMoves: 60 },
  },
]
