import { FlapGameConfig } from '../types'

export const celadonCityFlapEntries: FlapGameConfig[] = [
  {
    id: 'pidgey-training',
    name: 'Pidgey Training',
    description:
      'Soar through the air while avoiding other Pidgey and collecting Lucky Feathers.',
    category: 'Kanto',
    subCategory: 'Celadon City',
    icon: { type: 'pokemon', id: '16' },
    requirements: [
      { type: 'task_completed', targetId: 'nesting-season' },
    ],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'pokedollars',
        count: 100,
        consume: true,
      },
    ],
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
            score: 5000,
            rewards: [
              {
                type: 'title',
                targetId: 'sky-high',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
          {
            score: 8000,
            rewards: [
              {
                type: 'icon',
                targetId: 'bird-keeper',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
        ],
        repeatingRewards: [
          {
            everyScore: { min: 50, max: 75 },
            random: true,
            rewards: [
              { type: 'item', targetId: 'health-feather', quantity: 1 },
              { type: 'item', targetId: 'muscle-feather', quantity: 1 },
              { type: 'item', targetId: 'resist-feather', quantity: 1 },
              { type: 'item', targetId: 'genius-feather', quantity: 1 },
              { type: 'item', targetId: 'clever-feather', quantity: 1 },
              { type: 'item', targetId: 'swift-feather', quantity: 1 },
            ],
          },
        ],
      },
    },
  },
]
