import { Match3GameConfig } from '../types'

export const testmatch3gamesEntries: Match3GameConfig[] = [
  {
    id: 'zap-crystals',
    name: 'Zap Crystals',
    description: 'Match 3 evolution stones to score! Chain reactions earn bonus points.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'item', id: 'thunder-stone' },
    background: '/backgrounds/town.avif',
    requirements: [],
    rewards: [],
    settings: {
      gridSize: { cols: 6, rows: 8 },
      crystalTypes: [
        { id: 'fire', icon: { type: 'item', id: 'fire-stone' }, color: '#ff4400' },
        { id: 'water', icon: { type: 'item', id: 'water-stone' }, color: '#00b7ff' },
        { id: 'leaf', icon: { type: 'item', id: 'leaf-stone' }, color: '#00ff5e' },
        { id: 'thunder', icon: { type: 'item', id: 'thunder-stone' }, color: '#ffbf00' },
        {
          id: 'mewtwo',
          icon: { type: 'pokemon', id: '150' },
          color: '#6719e5ff',
          points: 1000,
          spawnWeight: 0.05,
        },
      ],
      pointsPerMatch: 10,
      cascadeMultiplier: 1.5,
      themeColour: '#a855f7',
      background: '/scratchcard/zapscratch.avif',
      timeLimit: 5, // Max time per endless session
      endless: {
        enabled: true,
        milestones: [
          {
            score: 1000,
            rewards: [
              {
                type: 'item',
                targetId: 'pack-pgo',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
          {
            score: 5000,
            rewards: [
              {
                type: 'item',
                targetId: 'pack-pgo',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
        ],
      },
    },
  },
]
