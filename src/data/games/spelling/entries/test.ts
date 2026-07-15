import { SpellingConfig } from '../types'

export const testspellingEntries: SpellingConfig[] = [
  // Tutorial - Spell the Kanto Starters
  {
    id: 'spelling-tutorial',
    name: 'Spelling Bee',
    description: 'Can you spell these Pokemon names? Fill in the missing letters!',
    category: 'Kanto',
    subCategory: 'Test',
    icon: {
      type: 'pokemon',
      id: '201', //unown
    },
    background: '/backgrounds/lab.avif',
    requirements: [],
    rewards: [
      {
        type: 'item',
        targetId: 'pack-pgo',
        quantity: 1,
        dropChance: 100,
      },
    ],
    settings: {
      pokemonPool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 150, 151, 25, 26, 146, 145, 144],
      timeLimit: 120,
      winRate: 3,
      missingLetters: 3,
      extraLetters: 7,
    },
  },
]
