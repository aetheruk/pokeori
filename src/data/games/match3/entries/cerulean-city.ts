import { Match3GameConfig } from '../types'

export const ceruleanCitymatch3gamesEntries: Match3GameConfig[] = [
  {
    id: 'bill-evolution-stone-study',
    name: "Bill's Evolution Stone Study",
    description:
      "Use Bill's resonance machine to align evolution stones and prove the pattern is stable.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: { type: 'item', id: 'water-stone' },
    background: '/backgrounds/inside-house.avif',
    requirements: [
      {
        type: 'research_encounter_result',
        targetId: 'bill-evolution-stone-study',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'bill-cottage',
      },
    ],
    rewards: [
      {
        type: 'xp',
        dropChance: 100,
        skill: 'researching',
        quantity: 150,
      },
    ],
    settings: {
      gridSize: { cols: 6, rows: 8 },
      crystalTypes: [
        { id: 'fire', icon: { type: 'item', id: 'fire-stone' }, color: '#ff4400' },
        { id: 'water', icon: { type: 'item', id: 'water-stone' }, color: '#00b7ff' },
        { id: 'leaf', icon: { type: 'item', id: 'leaf-stone' }, color: '#00b85c' },
        { id: 'thunder', icon: { type: 'item', id: 'thunder-stone' }, color: '#ffbf00' },
      ],
      pointsPerMatch: 10,
      cascadeMultiplier: 1.5,
      themeColour: '#38bdf8',
      background: '/backgrounds/inside-house.avif',
      timeLimit: 30,
      winScore: 2000,
    },
  },
]
