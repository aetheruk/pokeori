import { RockPushGameConfig } from '../types'

export const basicEntries: RockPushGameConfig[] = [
  {
    id: 'pallet-rock-test',
    name: 'Pallet Town Rock Test',
    description: 'Test the rock push mechanics in Pallet Town.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'item', id: 'hard-stone' },
    requirements: [],
    rewards: [
      {
        type: 'item',
        targetId: 'pack-pgo',
        quantity: 1,
        dropChance: 100,
      },
    ],
    settings: {
      timeLimit: 90,
      grid_size: 9,
      maxMoves: 80,
      playerStart: { x: 1, y: 1 },
      boulders: [
        { x: 3, y: 1 },
        { x: 3, y: 3 },
        { x: 3, y: 5 },
      ],
      holes: [
        { x: 6, y: 1 },
        { x: 6, y: 3 },
        { x: 6, y: 5 },
      ],
      barriers: [
        { x: 2, y: 2 },
        { x: 4, y: 2 },
        { x: 2, y: 4 },
        { x: 4, y: 4 },
        { x: 2, y: 6 },
        { x: 4, y: 6 },
        { x: 6, y: 6 },
      ],
      prizes: [
        { id: 'debug-poke-ball', x: 1, y: 3, itemId: 'poke-ball', quantity: 3 },
        {
          id: 'debug-battle-potion',
          x: 5,
          y: 7,
          itemId: 'battle-potion',
          quantity: 1,
        },
      ],
      playerSprite: '/games/rockpush/trainer.avif',
      boulderSprite: '/games/rockpush/boulder.avif',
      barrierSprite: '/games/rockpush/barrier.avif',
      floorSprite: '/games/rockpush/floor.avif',
      holeSprite: '/games/rockpush/hole.avif',
      filledHoleSprite: '/games/rockpush/filled-hole.avif',
    },
  },
]
