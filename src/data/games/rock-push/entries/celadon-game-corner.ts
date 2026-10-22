import type { GridObjectPlacement } from '../../grid-tiles'
import type { RockPushGameConfig } from '../types'

function createSlotMachinePlacements(
  targetId: string,
  luckyTargetId: string,
  layout = { columns: [1, 3, 5, 7], rows: [2, 4, 6] },
): GridObjectPlacement[] {
  return layout.rows.flatMap((y, row) =>
    layout.columns.map((x, column) => ({
      id: `slot-${row + 1}-${column + 1}`,
      objectId: 'celadon-slot-machine',
      x,
      y,
      interaction: {
        type: 'minigame',
        targetId,
        victory: 'clear',
      },
      properties: {
        // Keep the lucky machine visually identical; its odds are the discovery.
        luckyObjectId: 'celadon-slot-machine',
        luckyTargetId,
      },
    })),
  )
}

const testSlotMachinePlacements = createSlotMachinePlacements(
  'celadon-game-corner-test-slots',
  'celadon-game-corner-test-lucky-slots',
)

const lowStakesSlotMachinePlacements = createSlotMachinePlacements(
  'celadon-rocket-slots',
  'celadon-rocket-slots-lucky',
  { columns: [1, 2, 4, 5], rows: [1, 3, 5] },
)

const highStakesSlotMachinePlacements = createSlotMachinePlacements(
  'celadon-high-stakes-slots',
  'celadon-high-stakes-slots-lucky',
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
      'Explore a Celadon Game Corner floor lined with twelve slot machines and reach the large doorway in the back wall. One machine may be a lucky find with better odds.',
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
      'Explore the Celadon Game Corner floor, try the low-stakes slot machines, and find the exit in the back wall. One machine may secretly have better odds.',
    requirements: [{ type: 'task_completed', targetId: 'when-the-fun-stops' }],
    overrides: 'celadon-rocket-slots',
    objects: lowStakesSlotMachinePlacements,
  }),
  createGameCornerAdventure({
    id: 'grid-adventure-celadon-high-stakes-game-corner',
    name: 'High Stakes Rocket Slots',
    description:
      'Enter the High Stakes Room, try its slot machines, and find the exit in the back wall. One machine may secretly have better odds.',
    requirements: [{ type: 'task_completed', targetId: 'high-roller' }],
    overrides: 'celadon-high-stakes-slots',
    objects: highStakesSlotMachinePlacements,
  }),
]
