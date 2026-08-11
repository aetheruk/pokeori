import type { IdentifyConfig } from '../types'

export const gymLeaderChronicleIdentifyEntries: IdentifyConfig[] = [
  {
    id: 'chronicle-erika-identify-the-notes',
    name: 'Identify the Notes',
    description: 'Identify each botanical fragrance before Erika chooses the exhibition blend.',
    category: 'Secret',
    subCategory: 'Erika Chronicle',
    icon: { type: 'pokemon', id: '44' },
    background: '/backgrounds/chronicle-erika-flower-exhibition.avif',
    requirements: [{ type: 'task_completed', targetId: 'rainbow-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    settings: { pokemonPool: [43, 44, 45, 69, 70, 71, 114], timeLimit: 35, winRate: 7 },
  },
  {
    id: 'chronicle-koga-separate-the-toxins',
    name: 'Separate the Toxins',
    description: 'Identify the stolen toxin samples before the trail goes cold.',
    category: 'Secret',
    subCategory: 'Koga Chronicle',
    icon: { type: 'item', id: 'antidote' },
    background: '/backgrounds/chronicle-koga-apothecary.avif',
    requirements: [{ type: 'task_completed', targetId: 'soul-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    settings: {
      pokemonPool: [23, 24, 41, 42, 48, 49, 88, 89, 109, 110],
      timeLimit: 32,
      winRate: 9,
    },
  },
]
