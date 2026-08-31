import { RockPushGameConfig } from '../types'

const trialRequirements = [
  { type: 'task_completed' as const, targetId: 'fuchsia-gym-trial-ready' },
]

export const fuchsiaCitybasicEntries: RockPushGameConfig[] = [
  {
    id: 'fuchsia-gym-invisible-maze-one',
    name: 'The Unseen Path',
    description:
      'Feel out the first invisible course. The Gym walls reveal themselves only when you touch them.',
    category: 'Secret',
    subCategory: 'Fuchsia City',
    icon: { type: 'trainer', id: 'chronicle-janine' },
    background: '/backgrounds/gym-poison.avif',
    requirements: trialRequirements,
    rewards: [],
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'wooden-interior',
      playerStart: { x: 1, y: 1 },
      grid_size: 8,
      invisibleMaze: true,
      barriers: [
        { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 },
        { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 5 }, { x: 4, y: 6 },
        { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 },
      ],
      winTiles: [{ x: 6, y: 6 }],
      maxMoves: 55,
      timeLimit: 120,
    },
  },
  {
    id: 'fuchsia-gym-invisible-maze-two',
    name: 'The Vanishing Course',
    description:
      'Read the empty floor, remember each invisible wall you reveal, and reach the far corner.',
    category: 'Secret',
    subCategory: 'Fuchsia City',
    icon: { type: 'trainer', id: 'gym-kanto-koga' },
    background: '/backgrounds/gym-poison.avif',
    requirements: trialRequirements,
    rewards: [],
    settings: {
      variant: 'rock-push',
      tilePaletteId: 'wooden-interior',
      playerStart: { x: 1, y: 1 },
      grid_size: 8,
      invisibleMaze: true,
      barriers: [
        { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 },
        { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 },
        { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 },
      ],
      winTiles: [{ x: 6, y: 6 }],
      maxMoves: 55,
      timeLimit: 120,
    },
  },
]
