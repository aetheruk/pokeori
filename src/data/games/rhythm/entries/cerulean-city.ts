import { RhythmConfig } from '../types'

export const ceruleanCityrhythmEntries: RhythmConfig[] = [
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
      // Fixed cadence gives every round 16 hittable berries (480 perfect points).
      spawnRate: { min: 1.2, max: 1.2 },
      timeLimit: 20,
      endless: {
        enabled: true,
        milestones: [
          {
            score: 120,
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
            score: 320,
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
            score: 460,
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
  {
    id: 'razz-berry-crushing-ex',
    name: 'Razz Berry Crushing EX',
    description: 'Time to crush even more berries!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'item',
      id: 'razz-berry',
    },
    background: '/backgrounds/inside-house.avif',
    requirements: [
      {
        type: 'game_result',
        targetId: 'razz-berry-crushing',
        battleStatus: 'win',
        count: 20,
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'razz-berry',
        consume: true,
        count: 5,
      },
    ],
    settings: {
      icons: [{ type: 'item', id: 'razz-berry', label: 'Razz' }],
      speed: 300,
      // The longer round offers 49 hittable berries (1,470 perfect points).
      spawnRate: { min: 1.2, max: 1.2 },
      timeLimit: 60,
      endless: {
        enabled: true,
        milestones: [
          {
            score: 360,
            rewards: [
              {
                type: 'currency',
                targetId: 'berry-powder',
                quantity: 100,
                label: 'Berry Powder',
              },
            ],
          },
          {
            score: 980,
            rewards: [
              {
                type: 'currency',
                targetId: 'berry-powder',
                quantity: 150,
                label: 'Berry Powder',
              },
            ],
          },
          {
            score: 1400,
            rewards: [
              {
                type: 'currency',
                targetId: 'berry-powder',
                quantity: 250,
                label: 'Berry Powder',
              },
            ],
          },
        ],
      },
      winRate: 1,
    },
    skillXp: { skill: 'artisan', level: 20 },
    rewards: [],
  },
]
