import { DiglettTunnelTapGameConfig } from '../types'

export const testDiglettTunnelTapEntries: DiglettTunnelTapGameConfig[] = [
  {
    id: 'diglett-tunnel-tap-test',
    name: 'Diglett Tunnel Tap Test',
    description: 'Test a Diglett tunnel reaction game for Diglett Cave-style content.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '50' },
    background: '/backgrounds/cave.avif',
    requirements: [],
    rewards: [
      {
        type: 'item',
        targetId: 'terra-dust-t1',
        quantity: 3,
        dropChance: 100,
      },
    ],
    settings: {
      gridSize: { cols: 4, rows: 4 },
      targetScore: 14,
      timeLimit: 35,
      spawnIntervalMs: 720,
      visibleMs: 950,
      diglettScore: 1,
      dugtrioPenalty: 2,
      maxLives: 3,
      winRate: 1,
      themeColour: '#a16207',
      background: '/backgrounds/cave.avif',
    },
  },
]
