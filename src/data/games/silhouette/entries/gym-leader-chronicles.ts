import type { SilhouetteConfig } from '../types'

export const gymLeaderChronicleSilhouetteEntries: SilhouetteConfig[] = [
  {
    id: 'chronicle-v2-koga-read-the-shadow-marks',
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
      timeLimit: 45,
      winRate: 6,
    },
  },
  {
    id: 'chronicle-v2-sabrina-find-the-true-shape',
    name: 'Find the True Shape',
    description:
      'Separate Porygon’s real signal from the Pokémon shapes caught in the psychic feedback.',
    category: 'Secret',
    subCategory: 'Sabrina Chronicle',
    icon: { type: 'trainer', id: 'gym-kanto-sabrina' },
    background: '/backgrounds/chronicle-sabrina-quiet-mindscape.avif',
    requirements: [{ type: 'task_completed', targetId: 'marsh-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    settings: {
      pokemonPool: [64, 92, 93, 96, 122, 137],
      optionsPool: [],
      timeLimit: 45,
      winRate: 8,
    },
  },
]
