import type { SurfGameConfig } from '../types'

export const testSurfEntries: SurfGameConfig[] = [
  {
    id: 'lapras-surf-test',
    name: 'Lapras Surf Test',
    description:
      'Guide Lapras through a bright Kanto coastal route, dodge hazards, and gather prizes from the current.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '131' },
    requirements: [],
    rewards: [],
    isEligibleForReplay: true,
    background: '/games/surf/backgrounds/kanto-coast.avif',
    settings: {
      speed: 205,
      maxSpeed: 330,
      acceleration: 2.2,
      steeringSpeed: 380,
      difficulty: 4,
      sprite: '/games/surf/sprites/lapras-rear.png',
      playerWidth: 104,
      playerHeight: 104,
      obstacleFrequency: { min: 0.9, max: 1.45 },
      obstacles: [
        {
          sprite: '/games/surf/sprites/coastal-rock.avif',
          width: 118,
          height: 118,
          weight: 4,
          collisionScale: 0.64,
        },
        {
          sprite: '/games/surf/sprites/coral-reef.avif',
          width: 132,
          height: 106,
          weight: 3,
          minDifficulty: 2,
          collisionScale: 0.7,
        },
        {
          sprite: '/games/surf/sprites/navigation-buoy.avif',
          width: 96,
          height: 96,
          weight: 2,
          minDifficulty: 3,
          collisionScale: 0.68,
        },
      ],
      scene: {
        backdrop: '/games/surf/backgrounds/kanto-coast.avif',
      },
      endless: {
        enabled: true,
        repeatingRewards: [
          {
            everyScore: { min: 90, max: 130 },
            random: true,
            rewards: [
              { type: 'item', targetId: 'fresh-water', quantity: 1 },
              { type: 'item', targetId: 'pearl', quantity: 1 },
            ],
          },
          {
            everyScore: 200,
            rewards: [
              {
                type: 'pokemon_research_xp',
                targetId: '131',
                quantity: 1,
              },
            ],
          },
        ],
        milestones: [
          {
            score: 750,
            rewards: [
              {
                type: 'pokemon_research_xp',
                targetId: '131',
                quantity: 10,
              },
            ],
          },
          {
            score: 2000,
            rewards: [
              {
                type: 'item',
                targetId: 'water-gem',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
        ],
      },
    },
  },
]
