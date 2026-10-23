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
  icon,
  requirements,
  overrides,
  screens,
  gridSize = 7,
  playerStart = { x: 3, y: 5 },
  startScreen = 'arcade-floor',
}: {
  id: string
  name: string
  description: string
  icon?: RockPushGameConfig['icon']
  requirements: RockPushGameConfig['requirements']
  overrides: string
  screens: NonNullable<RockPushGameConfig['settings']['screens']>
  gridSize?: number
  playerStart?: RockPushGameConfig['settings']['playerStart']
  startScreen?: RockPushGameConfig['settings']['startScreen']
}): RockPushGameConfig {
  return {
    id,
    name,
    description,
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    icon: icon || { type: 'local', id: '/games/grid-objects/celadon-slot-machine.png' },
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    requirements,
    overrides,
    rewards: [],
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'celadon-game-corner',
      timeLimit: 1800,
      grid_size: gridSize,
      playerStart,
      startScreen,
      screens,
    },
  }
}

function createPachinkoMachinePlacements(
  stakes: 'standard' | 'high',
): GridObjectPlacement[] {
  const objectId = stakes === 'high'
    ? 'celadon-high-stakes-pachinko-machine'
    : 'celadon-pachinko-machine'
  const rows = [1, 3, 5]
  const columns = [1, 2, 4, 5]

  return rows.flatMap((y, row) =>
    columns.map((x, column) => ({
      id: `pachinko-${stakes}-${row + 1}-${column + 1}`,
      objectId,
      x,
      y,
      removeOnSuccess: false,
      interaction: {
        type: 'minigame' as const,
        targetId: 'celadon-rocket-pachinko',
        victory: 'clear' as const,
      },
      properties: {
        gridAdventurePachinkoMachine: row * columns.length + column + 1,
        gridAdventurePachinkoStakes: stakes,
      },
    })),
  )
}

function createGamePlazaPlacements(includeHighStakes: boolean): GridObjectPlacement[] {
  const placements: GridObjectPlacement[] = [
    {
      id: 'game-plaza-match3',
      objectId: 'game-plaza-match3-cabinet',
      x: 1,
      y: 3,
      interaction: {
        type: 'minigame',
        targetId: 'celadon-rocket-match-3',
        victory: 'clear',
      },
    },
    {
      id: 'game-plaza-prize-wheel',
      objectId: 'game-plaza-prize-wheel',
      x: 4,
      y: 3,
      interaction: {
        type: 'minigame',
        targetId: 'celadon-rocket-prize-wheel',
        victory: 'clear',
      },
    },
    {
      id: 'game-plaza-ufo-catcher',
      objectId: 'game-plaza-ufo-catcher',
      x: 7,
      y: 3,
      interaction: {
        type: 'minigame',
        targetId: 'celadon-rocket-ufo-catcher',
        victory: 'clear',
      },
    },
  ]

  if (includeHighStakes) {
    placements.push(
      {
        id: 'game-plaza-high-stakes-match3',
        objectId: 'game-plaza-high-stakes-match3-cabinet',
        x: 2,
        y: 3,
        interaction: {
          type: 'minigame',
          targetId: 'celadon-high-stakes-match-3',
          victory: 'clear',
        },
      },
      {
        id: 'game-plaza-high-stakes-prize-wheel',
        objectId: 'game-plaza-high-stakes-prize-wheel',
        x: 5,
        y: 3,
        interaction: {
          type: 'minigame',
          targetId: 'celadon-high-stakes-prize-wheel',
          victory: 'clear',
        },
      },
      {
        id: 'game-plaza-high-stakes-ufo-catcher',
        objectId: 'game-plaza-high-stakes-ufo-catcher',
        x: 8,
        y: 3,
        interaction: {
          type: 'minigame',
          targetId: 'celadon-high-stakes-ufo-catcher',
          victory: 'clear',
        },
      },
    )
  }

  return placements.map((placement) => ({ ...placement, removeOnSuccess: false }))
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
  createGameCornerAdventure({
    id: 'grid-adventure-celadon-pachinko',
    name: 'Rocket Pachinko',
    description:
      'Try twelve low-stakes Rocket Pachinko machines, each with a slightly different bucket layout and payout table, then leave through the arcade exit mat.',
    icon: { type: 'local', id: '/games/grid-objects/celadon-pachinko-machine.png' },
    requirements: [{ type: 'task_completed', targetId: 'when-the-fun-stops' }],
    overrides: 'celadon-rocket-pachinko',
    screens: [{
      id: 'arcade-floor',
      objects: createPachinkoMachinePlacements('standard'),
      winTiles: [{ x: 3, y: 0 }],
    }],
  }),
  createGameCornerAdventure({
    id: 'grid-adventure-celadon-high-stakes-pachinko',
    name: 'Rocket Pachinko',
    description:
      'Explore both arcade rooms. The middle door leads to twelve High Stakes Pachinko machines; the bottom-center mat exits or returns between rooms.',
    icon: { type: 'local', id: '/games/grid-objects/celadon-pachinko-machine.png' },
    requirements: [{ type: 'task_completed', targetId: 'high-roller' }],
    overrides: 'grid-adventure-celadon-pachinko',
    screens: [
      {
        id: 'arcade-floor',
        objects: createPachinkoMachinePlacements('standard'),
        teleporters: [{
          id: 'high-stakes-pachinko-room-door',
          x: 3,
          y: 0,
          target: { screen: 'high-stakes-pachinko-room', x: 3, y: 5 },
        }],
        winTiles: [{ x: 3, y: 6 }],
      },
      {
        id: 'high-stakes-pachinko-room',
        objects: createPachinkoMachinePlacements('high'),
        teleporters: [{
          id: 'pachinko-arcade-return-mat',
          x: 3,
          y: 6,
          target: { screen: 'arcade-floor', x: 3, y: 5 },
        }],
      },
    ],
  }),
  createGameCornerAdventure({
    id: 'grid-adventure-celadon-game-plaza',
    name: 'Game Plaza',
    description:
      'Visit the Match 3 arcade cabinet, Prize Wheel, and UFO Catcher, then leave through the floor mat at the bottom of the room.',
    icon: { type: 'local', id: '/games/grid-objects/game-plaza-match3-cabinet.png' },
    requirements: [{ type: 'task_completed', targetId: 'when-the-fun-stops' }],
    gridSize: 9,
    playerStart: { x: 4, y: 7 },
    startScreen: 'game-plaza',
    screens: [{
      id: 'game-plaza',
      objects: createGamePlazaPlacements(false),
      winTiles: [{ x: 4, y: 8 }],
    }],
  }),
  createGameCornerAdventure({
    id: 'grid-adventure-celadon-high-stakes-game-plaza',
    name: 'Game Plaza',
    description:
      'Try the standard and High Stakes versions of the Match 3 cabinet, Prize Wheel, and UFO Catcher in the same room.',
    icon: { type: 'local', id: '/games/grid-objects/game-plaza-match3-cabinet.png' },
    requirements: [{ type: 'task_completed', targetId: 'high-roller' }],
    overrides: 'grid-adventure-celadon-game-plaza',
    gridSize: 9,
    playerStart: { x: 4, y: 7 },
    startScreen: 'game-plaza',
    screens: [{
      id: 'game-plaza',
      objects: createGamePlazaPlacements(true),
      winTiles: [{ x: 4, y: 8 }],
    }],
  }),
]
