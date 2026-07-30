import { PachinkoGameConfig, PachinkoGameSettings } from '../types'

const rocketPachinkoSettings: PachinkoGameSettings = {
  board: {
    width: 600,
    height: 800,
    pegs: [],
    buckets: [
      { id: 'fifteen-left', kind: 'prize', label: 'Prize', color: '#7c2d12', x: 70, y: 760, width: 60, height: 50, icon: { type: 'item', id: 'fun-token' }, rewards: [{ type: 'currency', targetId: 'fun-tokens', quantity: 15, dropChance: 100 }] },
      { id: 'bonus-left', kind: 'bonus', label: '5-Ball Bonus Drop', color: '#b58a43', x: 185, y: 760, width: 32, height: 50, icon: { type: 'lucide', id: 'ChevronsDown' }, rewards: [] },
      { id: 'fifty', kind: 'jackpot', label: 'Jackpot', color: '#ca8a04', x: 300, y: 760, width: 32, height: 50, icon: { type: 'pokemon', id: '100' }, rewards: [{ type: 'currency', targetId: 'fun-tokens', quantity: 50, dropChance: 100 }] },
      { id: 'bonus-right', kind: 'bonus', label: '5-Ball Bonus Drop', color: '#b58a43', x: 415, y: 760, width: 32, height: 50, icon: { type: 'lucide', id: 'ChevronsDown' }, rewards: [] },
      { id: 'fifteen-right', kind: 'prize', label: 'Prize', color: '#7c2d12', x: 530, y: 760, width: 60, height: 50, icon: { type: 'item', id: 'fun-token' }, rewards: [{ type: 'currency', targetId: 'fun-tokens', quantity: 15, dropChance: 100 }] },
    ],
    wallBounciness: 0.55,
  },
  ballRadius: 8,
  ballBounciness: 0.55,
  gravityScale: 0.8,
}

for (let row = 0; row < 13; row++) {
  const columns = row % 2 === 0 ? 13 : 12
  const startX = (600 - (columns - 1) * 40) / 2
  for (let column = 0; column < columns; column++) {
    rocketPachinkoSettings.board.pegs.push({
      x: startX + column * 40,
      y: 120 + row * 40,
      radius: 5,
      isBouncer: row === 3 && column % 4 === 0,
    })
  }
}

export const celadonGameCornerPachinkoEntries: PachinkoGameConfig[] = [
  {
    id: 'celadon-rocket-pachinko',
    gameType: 'pachinko',
    name: 'Rocket Pachinko',
    description: 'Drop through the pegs for token prizes, the narrow 50-token Voltorb jackpot, or a five-ball Bonus Drop.',
    icon: { type: 'pokemon', id: '100' },
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    requirements: [{ type: 'task_completed', targetId: 'when-the-fun-stops' }],
    criteria: [],
    rewards: [],
    settings: {
      ...rocketPachinkoSettings,
      background: '/backgrounds/celadon-game-corner-arcade.avif',
      themeColour: '#9f1239',
      cost: { currencyType: 'fun-tokens', amount: 5 },
    },
  },
  {
    id: 'celadon-high-stakes-pachinko',
    gameType: 'pachinko',
    name: 'High Stakes Rocket Pachinko',
    description: 'Twenty-five tokens buys a drop toward the 250-token Electrode jackpot or a five-ball Bonus Drop.',
    icon: { type: 'pokemon', id: '101' },
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    requirements: [{ type: 'task_completed', targetId: 'high-roller' }],
    criteria: [],
    rewards: [],
    settings: {
      ...rocketPachinkoSettings,
      board: {
        ...rocketPachinkoSettings.board,
        buckets: rocketPachinkoSettings.board.buckets.map((bucket) => ({
          ...bucket,
          icon:
            bucket.kind === 'jackpot'
              ? { type: 'pokemon' as const, id: '101' }
              : bucket.icon,
          rewards:
            bucket.id === 'fifty'
              ? [{ type: 'currency', targetId: 'fun-tokens', quantity: 250, dropChance: 100 }]
              : bucket.id.includes('fifteen')
                ? [{ type: 'currency', targetId: 'fun-tokens', quantity: 75, dropChance: 100 }]
                : [],
        })),
      },
      background: '/backgrounds/celadon-game-corner-arcade.avif',
      themeColour: '#f59e0b',
      cost: { currencyType: 'fun-tokens', amount: 25 },
    },
  },
]
