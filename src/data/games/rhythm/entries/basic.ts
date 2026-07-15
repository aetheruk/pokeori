// Rhythm game entries
import { RhythmConfig } from '../types'

export const rhythmEntries: RhythmConfig[] = [
  {
    id: 'razz-berry-crushing',
    name: 'Razz Berry Crushing',
    description: 'Time to crush some berries!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'item',
      id: 'razz-berry',
    },
    background: '/backgrounds/inside-house.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'a-berry-good-invention',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'razz-berry',
        consume: true,
        count: 1,
      },
    ],
    settings: {
      icons: [{ type: 'item', id: 'razz-berry', label: 'Razz' }],
      speed: 300, // pixels per second
      spawnRate: { min: 1, max: 1.4 }, // seconds between spawns
      timeLimit: 20, // Increased time for endless fun
      endless: {
        enabled: true,
        milestones: [
          {
            score: 350,
            rewards: [
              {
                type: 'currency',
                targetId: 'berry-powder',
                quantity: 20,
                label: 'Berry Powder',
              },
            ],
          },
          {
            score: 470,
            rewards: [
              {
                type: 'currency',
                targetId: 'berry-powder',
                quantity: 30,
                label: 'Berry Powder',
              },
            ],
          },
          {
            score: 550,
            rewards: [
              {
                type: 'currency',
                targetId: 'berry-powder',
                quantity: 50,
                label: 'Berry Powder',
              },
            ],
          },
        ],
      },
      winRate: 1, // Single round game
    },
    skillXp: { skill: 'artisan', level: 10 },
    rewards: [],
  },
]
