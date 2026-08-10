import type { IdentifyConfig } from '../types'

export const gymLeaderChronicleIdentifyEntries: IdentifyConfig[] = [
  {
    id: 'chronicle-erika-trace-the-contamination',
    name: 'Follow the Drainage',
    description: 'Identify the affected greenhouse Pokémon and follow the old drain toward the empty warehouse.',
    category: 'Secret', subCategory: 'Erika Chronicle',
    icon: { type: 'pokemon', id: '114' },
    background: '/backgrounds/chronicle-erika-greenhouse.avif',
    requirements: [{ type: 'task_completed', targetId: 'rainbow-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { pokemonPool: [43, 44, 88, 89, 109, 110, 114], timeLimit: 35, winRate: 8 },
  },
  {
    id: 'chronicle-koga-identify-the-toxin',
    name: 'Antidote Drill',
    description: "Match each Pokémon to its venom sample during Janine's training exercise.",
    category: 'Secret', subCategory: 'Koga Chronicle',
    icon: { type: 'item', id: 'antidote' },
    background: '/backgrounds/chronicle-koga-apothecary.avif',
    requirements: [{ type: 'task_completed', targetId: 'soul-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { pokemonPool: [23, 24, 41, 42, 48, 49, 88, 89, 109, 110], timeLimit: 32, winRate: 9 },
  },
]
