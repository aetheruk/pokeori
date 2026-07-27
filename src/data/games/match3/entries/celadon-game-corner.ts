import { Match3GameConfig } from '../types'

export const celadonGameCornermatch3gamesEntries: Match3GameConfig[] = [
  {
    id: 'celadon-rocket-match-3',
    name: 'Rocket Match 3',
    description:
      'Clear Team Rocket’s poison Pokemon from the board before the timer runs out.',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    icon: { type: 'pokemon', id: '109' },
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    requirements: [{ type: 'task_completed', targetId: 'when-the-fun-stops' }],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'fun-tokens',
        count: 10,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'currency',
        targetId: 'fun-tokens',
        quantity: 50,
      },
    ],
    settings: {
      gridSize: { cols: 8, rows: 8 },
      crystalTypes: [
        { id: 'koffing', icon: { type: 'pokemon', id: '109' }, color: '#7e22ce' },
        { id: 'ekans', icon: { type: 'pokemon', id: '23' }, color: '#a855f7' },
        { id: 'weezing', icon: { type: 'pokemon', id: '110' }, color: '#581c87' },
        { id: 'arbok', icon: { type: 'pokemon', id: '24' }, color: '#c026d3' },
        { id: 'grimer', icon: { type: 'pokemon', id: '88' }, color: '#6b21a8' },
        { id: 'muk', icon: { type: 'pokemon', id: '89' }, color: '#86198f' },
      ],
      pointsPerMatch: 10,
      cascadeMultiplier: 1.3,
      themeColour: '#9f1239',
      background: '/backgrounds/celadon-game-corner-arcade.avif',
      timeLimit: 25,
      winScore: 3200,
    },
  },
  {
    id: 'celadon-high-stakes-match-3',
    name: 'High Stakes Rocket Match 3',
    description:
      'The private board runs faster, scores higher, and gives Team Rocket no room for mistakes.',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    icon: { type: 'pokemon', id: '110' },
    background: '/backgrounds/celadon-game-corner-prize-wheel.avif',
    requirements: [{ type: 'task_completed', targetId: 'high-roller' }],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'fun-tokens',
        count: 100,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'currency',
        targetId: 'fun-tokens',
        quantity: 500,
      },
    ],
    settings: {
      gridSize: { cols: 8, rows: 8 },
      crystalTypes: [
        { id: 'koffing', icon: { type: 'pokemon', id: '109' }, color: '#7e22ce' },
        { id: 'ekans', icon: { type: 'pokemon', id: '23' }, color: '#a855f7' },
        { id: 'weezing', icon: { type: 'pokemon', id: '110' }, color: '#581c87' },
        { id: 'arbok', icon: { type: 'pokemon', id: '24' }, color: '#c026d3' },
        { id: 'grimer', icon: { type: 'pokemon', id: '88' }, color: '#6b21a8' },
        { id: 'muk', icon: { type: 'pokemon', id: '89' }, color: '#86198f' },
      ],
      pointsPerMatch: 10,
      cascadeMultiplier: 1.2,
      themeColour: '#f59e0b',
      background: '/backgrounds/celadon-game-corner-prize-wheel.avif',
      timeLimit: 20,
      winScore: 4000,
    },
  },
]
