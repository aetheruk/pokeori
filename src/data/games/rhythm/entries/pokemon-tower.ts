import { RhythmConfig } from '../types'

export const pokemonTowerrhythmEntries: RhythmConfig[] = [
  {
    id: 'fuji-chronicle-berry-crushing',
    name: 'Pokemon House Berry Crushing',
    description: 'Help Mr. Fuji prepare dinner for the Pokemon House residents.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'item',
      id: 'oran-berry',
    },
    background: '/backgrounds/inside-house.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    criteria: [],
    settings: {
      icons: [
        { type: 'item', id: 'oran-berry', label: 'Oran' },
        { type: 'item', id: 'sitrus-berry', label: 'Sitrus' },
      ],
      speed: 300,
      spawnRate: { min: 0.9, max: 1.25 },
      timeLimit: 25,
      winScore: 350,
      winRate: 1,
    },
    skillXp: { skill: 'artisan', level: 10 },
    rewards: [],
  },
]
