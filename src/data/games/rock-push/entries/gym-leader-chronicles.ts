import type { RockPushGameConfig } from '../types'

export const gymLeaderChronicleRockPushEntries: RockPushGameConfig[] = [
  {
    id: 'chronicle-giovanni-clear-the-relief-road',
    name: 'Clear the Relief Road',
    description: 'Move the fallen stone and reopen Viridian’s western supply route.',
    category: 'Secret', subCategory: 'Giovanni Chronicle',
    icon: { type: 'item', id: 'hard-stone' },
    background: '/backgrounds/chronicle-giovanni-viridian-office.avif',
    requirements: [{ type: 'task_completed', targetId: 'earth-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: {
      timeLimit: 75, grid_size: 7, maxMoves: 25,
      playerStart: { x: 1, y: 3 },
      boulders: [{ x: 2, y: 3 }],
      holes: [{ x: 5, y: 3 }],
      barriers: [{ x: 3, y: 1 }, { x: 3, y: 5 }],
      prizes: [],
      playerSprite: '/games/rockpush/trainer.avif',
      boulderSprite: '/games/rockpush/boulder.avif',
      barrierSprite: '/games/rockpush/barrier.avif',
      floorSprite: '/games/rockpush/floor.avif',
      holeSprite: '/games/rockpush/hole.avif',
      filledHoleSprite: '/games/rockpush/filled-hole.avif',
    },
  },
]
