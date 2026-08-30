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
      tilePaletteId: 'basic-cave',
      gridSize: { cols: 7, rows: 7 }, playerStart: { x: 1, y: 6 }, exit: { x: 6, y: 0 },
      walls: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 1, y: 4 }, { x: 2, y: 4 }],
      debris: [{ x: 3, y: 1 }, { x: 5, y: 1 }],
      voltorbs: [{ id: 'west-cell', x: 1, y: 5, blastRadius: 2 }, { id: 'east-cell', x: 5, y: 3, blastRadius: 2 }],
      protectedPokemon: [{ id: 'magnemite', speciesId: 81, x: 5, y: 4 }, { id: 'pikachu', speciesId: 25, x: 6, y: 5 }],
      requiredCleared: 2, timeLimit: 100, maxMoves: 30, maxDischarges: 1, winRate: 1,
      themeColour: '#b58a43', background: '/backgrounds/chronicle-surge-blackout-streets.avif',
    },
  },
]
