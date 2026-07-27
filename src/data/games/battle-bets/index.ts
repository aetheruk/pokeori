import type { BattleBetsGameConfig } from './types'

export const battleBetsGames: BattleBetsGameConfig[] = [
  {
    id: 'celadon-high-stakes-battle-bets',
    name: 'Battle Bets',
    description: 'Back one of two Rocket Grunts and watch their Shadow teams settle the wager.',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    icon: { type: 'trainer', id: 'rocket-grunt-f' },
    background: '/backgrounds/celadon-game-corner-prize-wheel.avif',
    requirements: [{ type: 'task_completed', targetId: 'battle-bets' }],
    rewards: [],
    settings: { buyIn: 25, houseEdge: 0.05, simulationCount: 200, minimumWinChance: 0.25, maximumWinChance: 0.75 },
  },
]

export type { BattleBetsGameConfig, BattleBetsSettings } from './types'
