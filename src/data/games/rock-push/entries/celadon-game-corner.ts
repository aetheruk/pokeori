import type { GridObjectPlacement } from '../../grid-tiles'
import type { RockPushGameConfig } from '../types'

const slotMachineInteraction: GridObjectPlacement['interaction'] = {
  type: 'minigame',
  targetId: 'celadon-game-corner-test-slots',
  victory: 'clear',
}

const slotMachinePlacements: GridObjectPlacement[] = [2, 4, 6].flatMap(
  (y, row) => [1, 3, 5, 7].map((x, column) => ({
    id: `slot-${row + 1}-${column + 1}`,
    objectId: 'celadon-slot-machine',
    x,
    y,
    interaction: slotMachineInteraction,
    properties: {
      luckyObjectId: 'celadon-lucky-slot-machine',
      luckyTargetId: 'celadon-game-corner-test-lucky-slots',
    },
  })),
)

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
        objects: slotMachinePlacements,
        winTiles: [{ x: 4, y: 0 }],
      }],
    },
  },
]
