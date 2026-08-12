import type { VoltorbGridGameConfig } from '../types'

export const gymLeaderChronicleVoltorbGridEntries: VoltorbGridGameConfig[] = [
  {
    id: 'chronicle-v2-surge-cross-the-substation',
    name: 'Cross the Substation',
    description:
      'Clear only the necessary debris and reach the emergency exit without catching stranded Pokémon in a discharge.',
    category: 'Secret', subCategory: 'Lt. Surge Chronicle',
    icon: { type: 'pokemon', id: '100' },
    background: '/backgrounds/chronicle-surge-blackout-streets.avif',
    requirements: [{ type: 'task_completed', targetId: 'thunder-badge-memory-revealed' }],
    criteria: [], rewards: [],
    settings: {
      gridSize: { cols: 7, rows: 7 }, playerStart: { x: 0, y: 6 }, exit: { x: 6, y: 0 },
      walls: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 1, y: 4 }, { x: 2, y: 4 }],
      debris: [{ x: 1, y: 5 }, { x: 3, y: 3 }, { x: 5, y: 1 }],
      voltorbs: [{ id: 'west-cell', x: 0, y: 3, blastRadius: 2 }, { id: 'east-cell', x: 5, y: 4, blastRadius: 2 }],
      protectedPokemon: [{ id: 'magnemite', speciesId: 81, x: 2, y: 3 }, { id: 'pikachu', speciesId: 25, x: 6, y: 5 }],
      requiredCleared: 2, timeLimit: 100, maxMoves: 36, maxDischarges: 2, winRate: 1,
      themeColour: '#b58a43', background: '/backgrounds/chronicle-surge-blackout-streets.avif',
      floorSprite: '/games/rockpush/floor.avif', boulderSprite: '/games/rockpush/boulder.avif', barrierSprite: '/games/rockpush/barrier.avif', winTileSprite: '/games/rockpush/win-tile.avif', playerSprite: '/games/rockpush/trainer.avif',
    },
  },
]
