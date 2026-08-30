import type { RockPushGameConfig } from '../types'

export const gymLeaderChronicleRockPushEntries: RockPushGameConfig[] = [
  {
    id: 'chronicle-v2-brock-bring-home-the-stone',
    name: 'Bring Home the Stone',
    description: 'Guide replacement stone through the quarry without cracking it against the old barriers.',
    category: 'Secret', subCategory: 'Brock Chronicle',
    icon: { type: 'item', id: 'hard-stone' },
    background: '/backgrounds/chronicle-brock-quarry.avif',
    requirements: [{ type: 'task_completed', targetId: 'boulder-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'basic-cave',
      timeLimit: 110, grid_size: 8, maxMoves: 40,
      playerStart: { x: 1, y: 6 },
      boulders: [{ x: 3, y: 5 }], holes: [{ x: 6, y: 1 }],
      barriers: [{ x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }],
      prizes: [],
    },
  },
  {
    id: 'chronicle-v2-giovanni-clear-the-western-road',
    name: 'Clear the Western Road',
    description: "Move the fallen stone and reopen Viridian's western supply route.",
    category: 'Secret', subCategory: 'Giovanni Chronicle',
    icon: { type: 'item', id: 'hard-stone' },
    background: '/backgrounds/gym-ground.avif',
    requirements: [{ type: 'task_completed', targetId: 'earth-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'grass',
      timeLimit: 110, grid_size: 8, maxMoves: 40,
      playerStart: { x: 1, y: 6 },
      boulders: [{ x: 3, y: 5 }],
      holes: [{ x: 6, y: 1 }],
      barriers: [{ x: 3, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 5 }, { x: 5, y: 5 }],
      prizes: [],
    },
  },
]
