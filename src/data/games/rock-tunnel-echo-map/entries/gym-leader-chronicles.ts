import type { RockTunnelEchoMapGameConfig } from '../types'

const common = {
  gridSize: { cols: 7, rows: 7 },
  playerStart: { x: 0, y: 6 },
  exit: { x: 6, y: 0 },
  walls: [
    { x: 1, y: 0 }, { x: 4, y: 0 }, { x: 1, y: 1 }, { x: 4, y: 1 },
    { x: 1, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 2, y: 4 },
    { x: 5, y: 4 }, { x: 6, y: 5 }, { x: 3, y: 6 }, { x: 4, y: 6 },
  ],
  holes: [{ x: 2, y: 1 }, { x: 0, y: 2 }, { x: 4, y: 5 }],
  timeLimit: 85,
  maxMoves: 30,
  revealDurationMs: 1100,
  winRate: 1,
  floorSprite: '/games/rockpush/floor.avif',
  barrierSprite: '/games/rockpush/barrier.avif',
  holeSprite: '/games/rockpush/hole.avif',
  winTileSprite: '/games/rockpush/win-tile.avif',
  playerSprite: '/games/rockpush/trainer.avif',
}

export const gymLeaderChronicleEchoMapEntries: RockTunnelEchoMapGameConfig[] = [
  {
    id: 'chronicle-v2-koga-cross-the-unmarked-roofs',
    name: 'Cross the Unmarked Roofs',
    description: 'Memorise Janine’s unmarked route across the Fuchsia rooftops.',
    category: 'Secret', subCategory: 'Koga Chronicle',
    icon: { type: 'trainer', id: 'chronicle-janine' },
    background: '/backgrounds/chronicle-koga-fuchsia-rooftops.avif',
    requirements: [{ type: 'task_completed', targetId: 'soul-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { ...common, themeColour: '#6f5b7e', background: '/backgrounds/chronicle-koga-fuchsia-rooftops.avif' },
  },
  {
    id: 'chronicle-v2-sabrina-enter-the-quiet-room',
    name: 'Enter the Quiet Room',
    description: 'Hold Sabrina’s mental route long enough to reach the door she controls.',
    category: 'Secret', subCategory: 'Sabrina Chronicle',
    icon: { type: 'trainer', id: 'gym-kanto-sabrina' },
    background: '/backgrounds/chronicle-sabrina-quiet-mindscape.avif',
    requirements: [{ type: 'task_completed', targetId: 'marsh-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { ...common, revealDurationMs: 1000, themeColour: '#9b718f', background: '/backgrounds/chronicle-sabrina-quiet-mindscape.avif' },
  },
  {
    id: 'chronicle-v2-blaine-evacuate-the-lab',
    name: 'Evacuate the Laboratory',
    description: 'Follow the remembered floor plan through the smoke and account for every occupied room.',
    category: 'Secret', subCategory: 'Blaine Chronicle',
    icon: { type: 'item', id: 'burn-heal' },
    background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif',
    requirements: [{ type: 'task_completed', targetId: 'volcano-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: { ...common, revealDurationMs: 1200, themeColour: '#b86148', background: '/backgrounds/chronicle-blaine-cinnabar-lab.avif' },
  },
]
