import { VoltorbGridGameConfig } from '../types'

export const testVoltorbGridEntries: VoltorbGridGameConfig[] = [
  {
    id: 'route-10-voltorb-grid-test',
    name: 'Route 10 Voltorb Grid Test',
    description:
      'Test a Route 10 puzzle where a Voltorb must be shoved into place before it can blast loose debris from the mountain path.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '100' },
    background: '/backgrounds/rocky-path.avif',
    requirements: [],
    rewards: [
      {
        type: 'item',
        targetId: 'electric-component-t1',
        quantity: 3,
        dropChance: 100,
      },
    ],
    settings: {
      gridSize: { cols: 8, rows: 8 },
      playerStart: { x: 1, y: 6 },
      exit: { x: 6, y: 1 },
      walls: [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 5, y: 1 },
        { x: 1, y: 3 },
        { x: 1, y: 5 },
        { x: 6, y: 5 },
      ],
      debris: [
        { x: 2, y: 4 },
        { x: 4, y: 0 },
        { x: 6, y: 4 },
      ],
      voltorbs: [
        { id: 'main', x: 2, y: 6, blastRadius: 2 },
        { id: 'upper-relay', x: 4, y: 2, blastRadius: 2 },
        { id: 'right-relay', x: 6, y: 2, blastRadius: 2 },
      ],
      protectedPokemon: [{ id: 'watcher', speciesId: 25, x: 0, y: 7 }],
      requiredCleared: 3,
      timeLimit: 90,
      maxMoves: 40,
      maxDischarges: 1,
      winRate: 1,
      themeColour: '#facc15',
      background: '/backgrounds/rocky-path.avif',
      floorSprite: '/games/rockpush/floor.avif',
      boulderSprite: '/games/rockpush/boulder.avif',
      barrierSprite: '/games/rockpush/barrier.avif',
      winTileSprite: '/games/rockpush/win-tile.png',
      playerSprite: '/games/rockpush/trainer.avif',
    },
  },
]
