import { TcgInspectionGameConfig } from '../types'

export const testTcgInspectionEntries: TcgInspectionGameConfig[] = [
  {
    id: 'booster-inspection-test',
    name: 'Booster Inspection',
    description: 'Inspect a short booster spread, then answer quick questions from memory.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'item', id: 'pack-pgo' },
    background: '/backgrounds/town.avif',
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
      allowedSetIds: ['pgo'],
      questionTypes: ['name', 'rarity', 'supertype', 'number', 'artist', 'pokemonType', 'hp'],
      packSize: 5,
      rounds: 6,
      countdownSeconds: 3,
      attentionSeconds: 1,
      previewSeconds: 2,
      timeLimit: 60,
      winScore: 400,
      pointsPerCorrect: 100,
      themeColour: '#0f766e',
    },
  },
]
