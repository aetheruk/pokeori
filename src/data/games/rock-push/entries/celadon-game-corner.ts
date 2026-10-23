import type { GridObjectPlacement } from '../../grid-tiles'
import type { RockPushGameConfig } from '../types'

function createSlotMachinePlacements(
  targetId: string,
  layout = { columns: [1, 3, 5, 7], rows: [2, 4, 6] },
  objectId = 'celadon-slot-machine',
): GridObjectPlacement[] {
  return layout.rows.flatMap((y, row) =>
    layout.columns.map((x, column) => ({
      id: `slot-${row + 1}-${column + 1}`,
      objectId,
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
  'celadon-high-stakes-slot-machine',
)

function createGameCornerAdventure({
  id,
  name,
  description,
  requirements,
  overrides,
  screens,
}: {
  id: string
  name: string
  description: string
  requirements: RockPushGameConfig['requirements']
  overrides: string
  screens: NonNullable<RockPushGameConfig['settings']['screens']>
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
      screens,
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
      'Try twelve low-stakes Rocket Slots, each with its own odds, and leave through the center doorway in the back wall.',
    requirements: [{ type: 'task_completed', targetId: 'when-the-fun-stops' }],
    overrides: 'celadon-rocket-slots',
    screens: [{
      id: 'arcade-floor',
      objects: lowStakesSlotMachinePlacements,
      winTiles: [{ x: 3, y: 0 }],
    }],
  }),
  createGameCornerAdventure({
    id: 'grid-adventure-celadon-high-stakes-game-corner',
    name: 'Rocket Slots',
    description:
      'Explore the arcade, pass through the middle door to the High Stakes Room, and use the bottom-center mat to leave or return.',
    requirements: [{ type: 'task_completed', targetId: 'high-roller' }],
    overrides: 'grid-adventure-celadon-game-corner',
    screens: [
      {
        id: 'arcade-floor',
        objects: lowStakesSlotMachinePlacements,
        teleporters: [{
          id: 'high-stakes-room-door',
          x: 3,
          y: 0,
          target: { screen: 'high-stakes-room', x: 3, y: 5 },
        }],
        winTiles: [{ x: 3, y: 6 }],
      },
      {
        id: 'high-stakes-room',
        objects: highStakesSlotMachinePlacements,
        teleporters: [{
          id: 'arcade-return-mat',
          x: 3,
          y: 6,
          target: { screen: 'arcade-floor', x: 3, y: 5 },
        }],
      },
    ],
  }),
]
