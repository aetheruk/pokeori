import type { RockPushGameConfig, RockPushPosition } from '../types'

// Keep a single connected route through each room so every mechanic is exercised.
function corridor(cells: RockPushPosition[]): RockPushPosition[] {
  const open = new Set(cells.map(({ x, y }) => `${x},${y}`))
  return Array.from({ length: 72 }, (_, index) => ({
    x: index % 9,
    y: Math.floor(index / 9) + 1,
  })).filter(({ x, y }) => !open.has(`${x},${y}`))
}

export const testbasicEntries: RockPushGameConfig[] = [
  {
    id: 'grid-adventure-test',
    name: 'Grid Adventure Test',
    description: 'Explore three connected rooms. Slide rocks across ice, collect supplies, use teleporters, clear a wild encounter, and defeat the trainer before filling the final hole.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'item', id: 'hard-stone' },
    requirements: [],
    rewards: [],
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'basic-cave',
      timeLimit: 1800,
      grid_size: 9,
      maxMoves: 200,
      playerStart: { x: 1, y: 1 },
      startScreen: 'entry',
      screens: [
        {
          id: 'entry',
          barriers: corridor([
            { x: 1, y: 1 },
            ...Array.from({ length: 7 }, (_, i) => ({ x: i + 1, y: 2 })),
          ]),
          boulders: [{ x: 2, y: 2 }],
          holes: [{ x: 5, y: 2 }],
          ice: [{ x: 3, y: 2 }, { x: 4, y: 2 }],
          prizes: [{ id: 'entry-supplies', x: 1, y: 2, itemId: 'poke-ball', quantity: 3 }],
          teleporters: [{
            id: 'entry-to-frost', x: 7, y: 2,
            target: { screen: 'frost', x: 1, y: 1 },
          }],
        },
        {
          id: 'frost',
          barriers: corridor([
            { x: 1, y: 1 },
            ...Array.from({ length: 4 }, (_, i) => ({ x: i + 1, y: 2 })),
            { x: 4, y: 3 },
            ...Array.from({ length: 4 }, (_, i) => ({ x: i + 4, y: 4 })),
          ]),
          ice: [{ x: 2, y: 2 }, { x: 3, y: 2 }],
          prizes: [{ id: 'ice-supplies', x: 3, y: 2, itemId: 'battle-potion', quantity: 1 }],
          teleporters: [
            { id: 'frost-to-entry', x: 1, y: 1, target: { screen: 'entry', x: 7, y: 2 } },
            { id: 'frost-to-vault', x: 7, y: 4, target: { screen: 'vault', x: 1, y: 1 }, oneWay: true },
          ],
          objects: [{
            id: 'wild-checkpoint', objectId: 'encounter-trigger', x: 4, y: 3,
            interaction: { type: 'encounter', targetId: 'test-safari-catching', victory: 'clear' },
          }],
        },
        {
          id: 'vault',
          tilePaletteId: 'wooden-interior',
          barriers: corridor([
            { x: 1, y: 1 },
            ...Array.from({ length: 4 }, (_, i) => ({ x: i + 1, y: 2 })),
            { x: 4, y: 3 }, { x: 4, y: 4 },
          ]),
          boulders: [{ x: 4, y: 3 }],
          holes: [{ x: 4, y: 4 }],
          prizes: [{ id: 'vault-supplies', x: 3, y: 2, itemId: 'escape-rope', quantity: 1 }],
          objects: [{
            id: 'trainer-checkpoint', objectId: 'battle-trigger', x: 2, y: 2,
            interaction: { type: 'battle', targetId: 'safari-central-rocket-poacher', victory: 'clear' },
          }],
        },
      ],
    },
  },
]
