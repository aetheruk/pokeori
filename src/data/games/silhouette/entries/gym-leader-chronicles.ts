import type { SilhouetteConfig } from '../types'

export const gymLeaderChronicleSilhouetteEntries: SilhouetteConfig[] = [
  {
    id: 'chronicle-koga-read-the-shadow-marks',
    name: 'Read the Shadow Marks',
    description: 'Identify the Pokémon represented in Koga’s succession exercises.',
    category: 'Secret',
    subCategory: 'Koga Chronicle',
    icon: { type: 'trainer', id: 'gym-kanto-koga' },
    background: '/backgrounds/chronicle-koga-training-courtyard.avif',
    requirements: [{ type: 'task_completed', targetId: 'soul-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    settings: {
      pokemonPool: [23, 24, 48, 49, 88, 109],
      optionsPool: [],
      timeLimit: 35,
      winRate: 5,
    },
  },
  {
    id: 'chronicle-sabrina-find-the-true-shape',
    name: 'Find the True Shape',
    description: 'Separate the real silhouettes from the fearful shapes projected into Sabrina’s quiet room.',
    category: 'Secret',
    subCategory: 'Sabrina Chronicle',
    icon: { type: 'trainer', id: 'gym-kanto-sabrina' },
    background: '/backgrounds/chronicle-sabrina-quiet-mindscape.avif',
    requirements: [{ type: 'task_completed', targetId: 'marsh-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    settings: {
      pokemonPool: [63, 64, 92, 93, 96, 122],
      optionsPool: [],
      timeLimit: 35,
      winRate: 5,
    },
  },
]
