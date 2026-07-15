import { PachinkoGameConfig, PachinkoGameSettings } from '../types'

const pachinkoConfig: PachinkoGameSettings = {
  board: {
    width: 600,
    height: 800,
    pegs: [], // Generated below
    buckets: [
      {
        id: 'left',
        label: 'Voltorb',
        color: '#f97316',
        x: 120,
        y: 760,
        width: 80,
        height: 50,
        icon: { type: 'pokemon', id: '100' }, // Voltorb
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
        id: 'center',
        label: 'Zapdos',
        color: '#facc15',
        x: 300,
        y: 760,
        width: 80,
        height: 50,
        icon: { type: 'pokemon', id: '145' }, // Zapdos
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
        id: 'right',
        label: 'Pikachu',
        color: '#38bdf8',
        x: 480,
        y: 760,
        width: 80,
        height: 50,
        icon: { type: 'pokemon', id: '25' }, // Pikachu
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
    obstacles: [
      { x: 210, y: 660, width: 120, height: 10, angle: -0.2, bounce: 0.7 },
      { x: 390, y: 660, width: 120, height: 10, angle: 0.2, bounce: 0.7 },
    ],
    wallBounciness: 0.5,
  },
  ballRadius: 8,
  ballBounciness: 0.5,
  gravityScale: 0.8,
}

// Generate Pyramidal Pegs - wider grid to reach edges
const rows = 14
const spacing = 40
const startY = 120

for (let row = 0; row < rows; row++) {
  const cols = row % 2 === 0 ? 13 : 12
  const startX = (600 - (cols - 1) * spacing) / 2

  for (let col = 0; col < cols; col++) {
    pachinkoConfig.board.pegs.push({
      x: startX + col * spacing,
      y: startY + row * 40,
      radius: 5,
      isBouncer: row === 3 && col % 4 === 0,
    })
  }
}

export const testPachinkoEntries: PachinkoGameConfig[] = [
  {
    id: 'pachinko-basic',
    gameType: 'pachinko',
    name: 'Electro Drop',
    description: 'Drop the ball and aim for the high value buckets!',
    icon: { type: 'pokemon', id: '145' }, // Zapdos for electric theme
    settings: {
      background: '/scratchcard/zapscratch.avif',
      themeColour: '#facc15', // Electric yellow to match Zapdos theme
      cost: {
        amount: 10,
        currencyType: 'pokedollars',
      },
      ...pachinkoConfig,
    },
    rewards: [], // Rewards are handled dynamically via buckets
    category: 'Kanto',
    subCategory: 'Test',
    requirements: [],
    criteria: [],
  },
]
