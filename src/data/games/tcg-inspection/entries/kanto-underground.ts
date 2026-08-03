import type { TcgInspectionGameConfig } from '../types'

export const kantoUndergroundTcgInspectionEntries: TcgInspectionGameConfig[] = [
  {
    id: 'underground-tcg-card-memory-game',
    name: 'TCG Quiz',
    description: 'I need to Research the cards correctly to pass my basic training.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: { type: 'item', id: 'pack-base1' },
    background: '/backgrounds/kanto-underground.avif',
    requirements: [
      { type: 'task_completed', targetId: 'underground-tcg-card-redistribution' },
      {
        type: 'game_result',
        targetId: 'underground-tcg-card-memory-game',
        battleStatus: 'win',
        count: 3,
        inverse: true,
      },
    ],
    rewards: [{ type: 'item', targetId: 'pack-base1', quantity: 1, dropChance: 100 }],
    isEligibleForReplay: false,
    settings: {
      allowedSetIds: ['base1', 'base2'],
      questionTypes: ['name', 'number', 'rarity', 'pokemonType', 'hp'],
      packSize: 5,
      requiredAnswers: 3,
      studySeconds: 30,
      lives: 2,
      timeLimit: 60,
      themeColour: '#b58a43',
    },
  },
]
