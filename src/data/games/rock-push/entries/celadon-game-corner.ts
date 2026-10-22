import type { GridObjectPlacement } from '../../grid-tiles'
import type { RockPushGameConfig } from '../types'

function createSlotMachinePlacements(
  targetId: string,
  layout = { columns: [1, 3, 5, 7], rows: [2, 4, 6] },
): GridObjectPlacement[] {
  return layout.rows.flatMap((y, row) =>
    layout.columns.map((x, column) => ({
      id: `slot-${row + 1}-${column + 1}`,
      objectId: 'celadon-slot-machine',
      x,
      y,
      removeOnSuccess: false,
      interaction: {
        type: 'minigame',
        targetId,
        victory: 'clear',
      },
    })),
  )
}

const testSlotMachinePlacements = createSlotMachinePlacements(
  'celadon-game-corner-test-slots',
)

const lowStakesSlotMachinePlacements = createSlotMachinePlacements(
  'celadon-rocket-slots',
  { columns: [1, 2, 4, 5], rows: [1, 3, 5] },
)

const highStakesSlotMachinePlacements = createSlotMachinePlacements(
  'celadon-high-stakes-slots',
  { columns: [1, 2, 4, 5], rows: [1, 3, 5] },
)

function createGameCornerAdventure({
  id,
  name,
  description,
  requirements,
  overrides,
  objects,
}: {
  id: string
  name: string
  description: string
  requirements: RockPushGameConfig['requirements']
  overrides: string
  objects: GridObjectPlacement[]
}): RockPushGameConfig {
  return {
    id,
    name,
    description,
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    icon: { type: 'local', id: '/games/grid-objects/celadon-slot-machine.png' },
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    requirements,
    overrides,
    rewards: [],
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'celadon-game-corner',
      timeLimit: 1800,
      grid_size: 7,
      playerStart: { x: 3, y: 5 },
      startScreen: 'arcade-floor',
      screens: [{
        id: 'arcade-floor',
        objects,
        winTiles: [{ x: 3, y: 0 }],
      }],
    },
  }
}

export const celadonGameCornerbasicEntries: RockPushGameConfig[] = [
  {
    id: 'grid-adventure-celadon-game-corner-test',
    name: 'Celadon Game Corner Grid Test',
    description:
      'Explore a Celadon Game Corner floor lined with twelve slot machines, each with its own win odds, and reach the large doorway in the back wall.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'local', id: '/games/grid-objects/celadon-slot-machine.png' },
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    requirements: [],
    rewards: [],
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'celadon-game-corner',
      timeLimit: 1800,
      grid_size: 9,
      playerStart: { x: 4, y: 7 },
      startScreen: 'arcade-floor',
      screens: [{
        id: 'arcade-floor',
        objects: testSlotMachinePlacements,
        winTiles: [{ x: 4, y: 0 }],
      }],
    },
  },
  createGameCornerAdventure({
    id: 'grid-adventure-celadon-game-corner',
    name: 'Rocket Slots',
    description:
      'Explore the Celadon Game Corner floor, try twelve low-stakes slot machines with different odds, and find the exit in the back wall.',
    requirements: [{ type: 'task_completed', targetId: 'when-the-fun-stops' }],
    overrides: 'celadon-rocket-slots',
    objects: lowStakesSlotMachinePlacements,
  }),
  createGameCornerAdventure({
    id: 'grid-adventure-celadon-high-stakes-game-corner',
    name: 'High Stakes Rocket Slots',
    description:
      'Enter the High Stakes Room, try twelve slot machines with different odds, and find the exit in the back wall.',
    requirements: [{ type: 'task_completed', targetId: 'high-roller' }],
    overrides: 'celadon-high-stakes-slots',
    objects: highStakesSlotMachinePlacements,
  }),
]
