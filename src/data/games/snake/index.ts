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
      playfield: { width: 390, height: 700 },
      initialLength: 5,
      initialPosition: { x: 195, y: 380 },
      initialHeading: -90,
      segmentSpacing: 24,
      moveSpeed: 150,
      maxSpeed: 225,
      speedUpEvery: 4,
      speedUpBy: 8,
      turnRate: 420,
      headRadius: 22,
      bodyRadius: 14,
      foodRadius: 11,
      rewardRadius: 14,
      minimumSpawnDistance: 95,
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
