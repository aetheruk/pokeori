import type { CompareConfig } from '../types'

export const gymLeaderChronicleCompareEntries: CompareConfig[] = [
  {
    id: 'chronicle-v2-blaine-compare-the-baselines',
    name: 'Compare the Baselines',
    description: 'Check the recovery baselines before Blaine and Fuji approve the first trial.',
    category: 'Secret',
    subCategory: 'Blaine Chronicle',
    icon: { type: 'trainer', id: 'gym-kanto-blaine' },
    background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif',
    requirements: [{ type: 'task_completed', targetId: 'volcano-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    settings: {
      pokemonPool: [58, 77, 126],
      optionsPool: [],
      timeLimit: 60,
      winRate: 5,
      maxPokemonShown: 2,
      comparisonOperator: ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'],
    },
  },
]
