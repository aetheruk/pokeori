import { RunGameConfig } from '../types'

export const testbasicEntries: RunGameConfig[] = [
  {
    id: 'rattata-test',
    name: 'Rattata Test',
    description:
      "Joey has managed to train his Rattata to forage for Pokeballs and he's willing to share them with me!",
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '19' }, // Rattata
    requirements: [
      {
        type: 'task_completed',
        targetId: 'joeys-obsession',
      },
    ],
    rewards: [],
    settings: {
      speed: 300,
      sprite: '', // Fallback
      player: {
        sheetUrl: '/games/run/sprites/rattata-sprite.avif',
        renderWidth: 60,
        renderHeight: 49,
        frameWidth: 100,
        frameHeight: 83,
        frameRate: 100,
      },
      groundObstacle: {
        sprite: '/games/run/sprites/rock.avif',
        width: 48,
        height: 48,
        spawnRate: { min: 200, max: 500 },
      },
      aerialObstacle: {
        sprite: '', // Fallback
        spriteConfig: {
          sheetUrl: '/games/run/sprites/pidgey-sprite.avif',
          renderWidth: 60,
          renderHeight: 58,
          frameWidth: 100,
          frameHeight: 97,
          frameRate: 100,
        },
        width: 48,
        height: 48,
        spawnRate: { min: 70, max: 250 },
      },
      parallaxLayers: [
        {
          url: '/games/run/backgrounds/route-ground.avif',
          speed: 1,
          style: {
            backgroundSize: '720px 360px',
            backgroundPosition: 'bottom',
            opacity: 1,
          },
        },
      ],
      scene: {
        backdrop: '/games/run/backgrounds/route-backdrop.avif',
        atmosphere: 'route',
        groundLine: 500,
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
