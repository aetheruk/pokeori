import type { MagnemiteCircuitGameConfig } from '../types'

export const gymLeaderChronicleCircuitEntries: MagnemiteCircuitGameConfig[] = [
  {
    id: 'chronicle-v2-surge-restore-the-east-grid',
    name: 'Restore the East Grid',
    description: 'Reconnect the storm-damaged grid and bring the eastern shelter lights back online.',
    category: 'Secret', subCategory: 'Lt. Surge Chronicle',
    icon: { type: 'pokemon', id: '81' },
    background: '/backgrounds/chronicle-surge-blackout-streets.avif',
    requirements: [{ type: 'task_completed', targetId: 'thunder-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: {
      gridSize: { cols: 6, rows: 5 },
      source: { x: 0, y: 2 },
      targets: [
        { x: 5, y: 0, formId: '81' },
        { x: 5, y: 2, formId: '100' },
        { x: 5, y: 4, formId: '82' },
      ],
      tiles: [
        { x: 0, y: 2, type: 'straight', rotation: 1, locked: true },
        { x: 1, y: 2, type: 'tee', rotation: 0 },
        { x: 2, y: 2, type: 'straight', rotation: 0 },
        { x: 3, y: 2, type: 'cross', rotation: 0, locked: true },
        { x: 4, y: 2, type: 'straight', rotation: 0 },
        { x: 5, y: 2, type: 'straight', rotation: 1, locked: true },
        { x: 3, y: 1, type: 'straight', rotation: 1 },
        { x: 3, y: 0, type: 'corner', rotation: 1 },
        { x: 4, y: 0, type: 'straight', rotation: 0 },
        { x: 5, y: 0, type: 'straight', rotation: 1, locked: true },
        { x: 3, y: 3, type: 'straight', rotation: 0 },
        { x: 3, y: 4, type: 'corner', rotation: 3 },
        { x: 4, y: 4, type: 'straight', rotation: 0 },
        { x: 5, y: 4, type: 'straight', rotation: 1, locked: true },
      ],
      timeLimit: 110, maxRotations: 24, winRate: 1, themeColour: '#b58a43',
      background: '/backgrounds/chronicle-surge-blackout-streets.avif',
    },
  },
]
