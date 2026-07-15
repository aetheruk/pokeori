import { RunGameConfig } from '../types'

export const pewterCitybasicEntries: RunGameConfig[] = [
  {
    id: 'joeys-rattata-run',
    name: "Joey's Amazing Rattata",
    description:
      "Joey has managed to train his Rattata to forage for crafting scraps and he's willing to share them with me!",
    category: 'Kanto',
    subCategory: 'Pewter City',
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
        repeatingRewards: [
          {
            everyScore: 150,
            rewards: [
              {
                type: 'pokemon_research_xp',
                quantity: 1,
                targetId: '19',
              },
            ],
          },
          {
            everyScore: 200,
            random: true,
            rewards: [
              {
                type: 'item',
                targetId: 'soft-fluff-t1',
                quantity: 1,
                dropChance: 100,
              },
              {
                type: 'item',
                targetId: 'wing-feather-t1',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
          {
            everyScore: 350,
            random: true,
            rewards: [
              {
                type: 'item',
                targetId: 'broken-ball-t1',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
        ],
        milestones: [
          {
            score: 1200,
            rewards: [
              {
                type: 'item',
                targetId: 'tm-quick-attack',
                quantity: 1,
                dropChance: 100,
              },
            ],
          },
          {
            score: 4000,
            rewards: [
              {
                type: 'title',
                targetId: 'joey-friend',
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
