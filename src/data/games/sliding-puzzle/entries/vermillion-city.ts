import { SlidingPuzzleConfig } from '../types'

export const vermillionCityslidingPuzzleGames: SlidingPuzzleConfig[] = [
  {
    id: 'pokemon-fan-club-pikachu-puzzle-box',
    name: 'Pikachu Puzzle Box',
    description: 'Slide the tiles to complete the Pikachu picture before the box locks shut.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '25',
    },
    background: '/backgrounds/inside-house.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [25],
      timeLimit: 90,
      winRate: 1,
      gridSize: 3,
      shuffleMoves: 30,
    },
  },
  {
    id: 'squirtle-squad-torn-map',
    name: 'Torn Pier Map',
    description: 'Fit the damp map scraps together to find where the trail ends.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '7',
    },
    background: '/backgrounds/beach.avif',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [7],
      image: '/games/sliding-puzzle/squirtle-squad-map.avif',
      timeLimit: 120,
      winRate: 1,
      gridSize: 3,
      shuffleMoves: 36,
    },
  },
]
