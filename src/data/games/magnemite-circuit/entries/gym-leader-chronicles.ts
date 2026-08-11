import type { MagnemiteCircuitGameConfig } from '../types'

export const gymLeaderChronicleCircuitEntries: MagnemiteCircuitGameConfig[] = [
  {
    id: 'chronicle-surge-restore-the-east-grid',
    name: 'Restore the East Grid',
    description: 'Reconnect the storm-damaged grid and bring the eastern shelter lights back online.',
    category: 'Secret', subCategory: 'Lt. Surge Chronicle',
    icon: { type: 'pokemon', id: '81' },
    background: '/backgrounds/chronicle-surge-blackout-streets.avif',
    requirements: [{ type: 'task_completed', targetId: 'thunder-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: {
      gridSize: { cols: 5, rows: 4 },
      source: { x: 0, y: 1 },
      targets: [{ x: 4, y: 1, formId: '100' }],
      tiles: [
        { x: 0, y: 1, type: 'straight', rotation: 1, locked: true },
        { x: 1, y: 1, type: 'straight', rotation: 0 },
        { x: 2, y: 1, type: 'straight', rotation: 1, locked: true },
        { x: 3, y: 1, type: 'straight', rotation: 0 },
        { x: 4, y: 1, type: 'straight', rotation: 1, locked: true },
        { x: 1, y: 0, type: 'corner', rotation: 0 },
        { x: 3, y: 2, type: 'tee', rotation: 2 },
      ],
      timeLimit: 75, maxRotations: 12, winRate: 1, themeColour: '#f0c94a',
      background: '/backgrounds/chronicle-surge-blackout-streets.avif',
    },
  },
]
