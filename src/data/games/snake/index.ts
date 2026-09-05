import type { SnakeGameConfig } from './types'

export * from './types'

export const snakeGames: SnakeGameConfig[] = [
  {
    id: 'onix-snake-test',
    gameType: 'snake',
    name: 'Onix Tunnel Survey',
    description:
      'Guide Onix through a cave survey, gather mineral samples, and avoid crossing its winding trail.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '95' },
    background: '/backgrounds/cave.avif',
    requirements: [],
    rewards: [],
    isEligibleForReplay: true,
    settings: {
      gridSize: { columns: 18, rows: 18 },
      initialLength: 4,
      initialPosition: { x: 8, y: 9 },
      initialDirection: 'right',
      tickMs: 150,
      speedUpEvery: 4,
      speedUpByMs: 8,
      minTickMs: 78,
      foodScore: 10,
      wrapBoundaries: false,
      sprites: {
        head: '/games/snake/sprites/rock-serpent-head.avif',
        body: '/games/snake/sprites/rock-serpent-body.avif',
        tail: '/games/snake/sprites/rock-serpent-tail.avif',
      },
      rewardLifetimeMs: 7500,
      endless: {
        enabled: true,
        milestones: [
          {
            score: 200,
            rewards: [
              {
                type: 'item',
                targetId: 'ground-gem',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
        ],
        repeatingRewards: [
          {
            everyScore: { min: 50, max: 80 },
            random: true,
            rewards: [
              { type: 'item', targetId: 'rock-gem', quantity: 1 },
              { type: 'item', targetId: 'ground-gem', quantity: 1 },
            ],
          },
        ],
      },
    },
  },
]
