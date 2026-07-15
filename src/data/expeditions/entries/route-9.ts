import type { ExpeditionConfig } from '../types'

const route9PassBattles = [
  'route-9-pass-picnicker-alicia',
  'route-9-pass-hiker-jeremy',
  'route-9-pass-camper-chris',
  'route-9-pass-bug-catcher-brent',
  'route-9-pass-hiker-alan',
  'route-9-pass-bug-catcher-conner',
  'route-9-pass-camper-drew',
  'route-9-pass-hiker-brice',
  'route-9-pass-picnicker-caitlin',
]

export const route9Expeditions: ExpeditionConfig[] = [
  {
    id: 'route-9-pass-expedition',
    name: 'Route 9 Pass',
    description: 'Cross the rocky mountain pass between Route 9 and Route 10.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    buttonText: 'Cross the Pass',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    maxLosses: 4,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
      {
        type: 'expedition_result',
        targetId: 'route-9-pass-expedition',
        expeditionStatus: 'completed',
        count: 1,
        inverse: true,
      },
    ],
    activityPool: {
      battle: route9PassBattles,
      location: ['route-9-pass-lower-trail', 'route-9-pass-upper-trail'],
    },
    path: [
      {
        type: 'activity',
        id: 'route-9-pass-step-1-lower-trail',
        activityType: 'location',
        activityId: 'route-9-pass-lower-trail',
        secret: true,
      },
      {
        type: 'activity',
        id: 'route-9-pass-step-2-alicia',
        activityType: 'battle',
        activityId: 'route-9-pass-picnicker-alicia',
        secret: true,
      },
      {
        type: 'activity',
        id: 'route-9-pass-step-3-jeremy',
        activityType: 'battle',
        activityId: 'route-9-pass-hiker-jeremy',
        secret: true,
      },
      {
        type: 'activity',
        id: 'route-9-pass-step-4-chris',
        activityType: 'battle',
        activityId: 'route-9-pass-camper-chris',
        secret: true,
      },
      {
        type: 'activity',
        id: 'route-9-pass-step-5-brent',
        activityType: 'battle',
        activityId: 'route-9-pass-bug-catcher-brent',
        secret: true,
      },
      {
        type: 'activity',
        id: 'route-9-pass-step-6-upper-trail',
        activityType: 'location',
        activityId: 'route-9-pass-upper-trail',
        secret: true,
      },
      {
        type: 'activity',
        id: 'route-9-pass-step-7-alan',
        activityType: 'battle',
        activityId: 'route-9-pass-hiker-alan',
        secret: true,
      },
      {
        type: 'activity',
        id: 'route-9-pass-step-8-conner',
        activityType: 'battle',
        activityId: 'route-9-pass-bug-catcher-conner',
        secret: true,
      },
      {
        type: 'activity',
        id: 'route-9-pass-step-9-drew',
        activityType: 'battle',
        activityId: 'route-9-pass-camper-drew',
        secret: true,
      },
      {
        type: 'activity',
        id: 'route-9-pass-step-10-brice',
        activityType: 'battle',
        activityId: 'route-9-pass-hiker-brice',
        secret: true,
      },
      {
        type: 'activity',
        id: 'route-9-pass-step-11-caitlin',
        activityType: 'battle',
        activityId: 'route-9-pass-picnicker-caitlin',
        secret: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 350,
        dropChance: 100,
      },
      {
        type: 'xp',
        skill: 'battling',
        quantity: 500,
        dropChance: 100,
      },
      {
        type: 'currency',
        targetId: 'pokedollars',
        quantity: 900,
        dropChance: 100,
      },
      {
        type: 'currency',
        targetId: 'league-ticket',
        quantity: 5,
        dropChance: 100,
      },
    ],
  },
]
