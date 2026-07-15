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
        type: 'research_encounter_result',
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
      spawnRate: { min: 1, max: 1.4 },
      timeLimit: 60,
      endless: {
        enabled: true,
        milestones: [
          {
            score: 1050,
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
            score: 1410,
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
            score: 1650,
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
