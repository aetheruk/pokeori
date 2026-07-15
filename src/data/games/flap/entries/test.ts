import { FlapGameConfig } from '../types'

export const testbasicEntries: FlapGameConfig[] = [
  {
    id: 'endless-pidgey-flap',
    name: 'Endless Pidgey Flight',
    description: 'How far can you fly? Survive as long as possible and earn rewards!',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '18' }, // Pidgeot
    requirements: [],
    rewards: [],
    settings: {
      speed: 200,
      gravity: 0.3,
      flapForce: 6,
      terminalVelocity: 12,
      sprite: {
        sheetUrl: '/games/run/sprites/pidgey-sprite.avif',
        renderWidth: 60,
        renderHeight: 58,
        frameWidth: 100,
        frameHeight: 97,
        frameRate: 100,
      },
      wallSprite: '/games/fly/sprites/wall.avif',
      enemySprite: {
        sheetUrl: '/games/run/sprites/pidgey-sprite.avif',
        renderWidth: 60,
        renderHeight: 58,
        frameWidth: 100,
        frameHeight: 97,
        frameRate: 100,
      },
      wallGap: { min: 0, max: 0 },
      wallFrequency: { min: 0, max: 0 },
      wallWidth: 0,
      enemyFrequency: { min: 40, max: 80 },
      enemySize: 72,
      parallaxLayers: [
        {
          url: '/games/fly/backgrounds/cloud-drift-seamless.avif',
          speed: 0.24,
          style: {
            backgroundSize: '2400px 600px',
            backgroundPosition: 'center',
            opacity: 0.48,
          },
        },
      ],
      scene: {
        backdrop: '/games/fly/backgrounds/sky-backdrop.avif',
        atmosphere: 'sky',
      },
      endless: {
        enabled: true,
        milestones: [
          {
            score: 100,
            rewards: [
              {
                type: 'item',
                targetId: 'pack-pgo',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
          {
            score: 300,
            rewards: [
              {
                type: 'item',
                targetId: 'pack-pgo',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
          {
            score: 700,
            rewards: [
              {
                type: 'item',
                targetId: 'pack-pgo',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
          {
            score: 1000,
            rewards: [
              {
                type: 'item',
                targetId: 'pack-pgo',
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
