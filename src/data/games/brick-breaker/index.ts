export * from './types'

import type { BrickBreakerGameConfig } from './types'

export const brickBreakerGames: BrickBreakerGameConfig[] = [
  {
    id: 'brick-breaker-test',
    name: "Oak's Mineral Breaker",
    description:
      "Ricochet a survey ball through Professor Oak's mineral samples and crack open any reward specimens you uncover.",
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'item', id: 'rock-gem' },
    requirements: [],
    rewards: [],
    isEligibleForReplay: true,
    background: '/backgrounds/cave.avif',
    settings: {
      playfield: { width: 390, height: 640 },
      layout: [
        '..111111..',
        '.122##221.',
        '1232112321',
        '11#1111#11',
        '.12222221.',
        '..111111..',
      ],
      brickGap: 5,
      boardPadding: 18,
      boardTop: 92,
      paddle: { width: 82, height: 14, speed: 430 },
      ball: {
        radius: 7,
        initialSpeed: 285,
        maxSpeed: 440,
        accelerationPerHit: 2.5,
      },
      lives: 3,
      pointsPerHit: 10,
      rewardLifetimeMs: 8000,
      endless: {
        enabled: true,
        waveSpeedIncrease: 12,
        milestones: [],
        repeatingRewards: [
          {
            everyScore: { min: 70, max: 110 },
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
