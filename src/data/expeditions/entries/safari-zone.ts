import type {
  ExpeditionConfig,
  ExpeditionTaskPoolChoice,
  ExpeditionTaskPoolEntry,
} from '../types'
import {
  safariFlavorTaskPoolIds,
  safariItemTaskPoolIds,
  safariResearchTaskPoolIds,
} from '@/data/tasks/entries/safari-zone-expedition'

const permitRequirement = {
  type: 'item_owned' as const,
  targetId: 'safari-catching-permit',
}

const researchTaskPool: ExpeditionTaskPoolEntry[] = [
  ...safariResearchTaskPoolIds.common.map((id) => ({ id, weight: 70 / safariResearchTaskPoolIds.common.length })),
  ...safariResearchTaskPoolIds.uncommon.map((id) => ({ id, weight: 25 / safariResearchTaskPoolIds.uncommon.length })),
  ...safariResearchTaskPoolIds.rare.map((id) => ({ id, weight: 5 / safariResearchTaskPoolIds.rare.length })),
]

const weightedIds = (ids: string[], totalWeight: number): ExpeditionTaskPoolEntry[] =>
  ids.map((id) => ({ id, weight: totalWeight / Math.max(1, ids.length) }))

const itemTaskPool: ExpeditionTaskPoolEntry[] = [
  ...weightedIds(safariItemTaskPoolIds.materials, 30),
  ...weightedIds(safariItemTaskPoolIds.balls, 20),
  ...weightedIds(safariItemTaskPoolIds.gems, 25),
  ...weightedIds(safariItemTaskPoolIds.currency, 15),
  ...weightedIds(safariItemTaskPoolIds.safariBalls, 8),
  ...weightedIds(safariItemTaskPoolIds.rare, 2),
]

const allTaskIds = [
  ...researchTaskPool.map((entry) => entry.id),
  ...Object.values(safariFlavorTaskPoolIds).flat(),
  ...itemTaskPool.map((entry) => entry.id),
]

const secretActivity = (
  id: string,
  activityType: 'task' | 'field-research' | 'location' | 'battle',
  activityId: string,
) => ({
  type: 'activity' as const,
  id,
  activityType,
  activityId,
  secret: true,
})

const taskActivity = (
  id: string,
  taskPool: string,
  taskPoolChoices?: ExpeditionTaskPoolChoice[],
) => ({
  type: 'activity' as const,
  id,
  activityType: 'task' as const,
  secret: true,
  ...(taskPoolChoices ? { taskPoolChoices } : { taskPool }),
})

const researchOrFlavor = (id: string, area: keyof typeof safariFlavorTaskPoolIds) =>
  taskActivity(id, 'research', [
    { pool: 'research', weight: 1 },
    { pool: `flavor-${area}`, weight: 1 },
  ])

const itemOrFlavor = (id: string) =>
  taskActivity(id, 'items', [
    { pool: 'items', weight: 1 },
    { pool: 'flavor-north', weight: 1 },
  ])

export const safariZoneExpeditions: ExpeditionConfig[] = [
  {
    id: 'safari-zone-grand-expedition',
    name: 'Safari Zone Grand Expedition',
    description:
      'A full reserve survey through all four Safari Zone areas. Follow the field signs, keep the poachers out of the habitats, and make every Safari Ball count.',
    category: 'Kanto',
    subCategory: 'Safari Zone',
    buttonText: 'Begin Grand Expedition',
    icon: { type: 'pokemon', id: '128' },
    background: '/backgrounds/safari-reserve.avif',
    maxLosses: 5,
    safariBallAllowance: 30,
    canAbandon: true,
    requirements: [permitRequirement],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'pokedollars',
        count: 500,
        consume: true,
      },
    ],
    activityPool: {
      task: allTaskIds,
      'field-research': [
        'safari-central-expedition-field-observation',
        'safari-east-expedition-field-observation',
        'safari-west-expedition-field-observation',
        'safari-north-expedition-field-observation',
      ],
      location: [
        'safari-central-catch',
        'safari-east-catch',
        'safari-west-catch',
        'safari-north-catch',
        'safari-grand-finale-catch',
      ],
      battle: [
        'safari-central-rocket-poacher',
        'safari-east-rocket-poacher',
        'safari-west-rocket-poacher',
        'safari-north-rocket-poacher',
      ],
    },
    taskPools: {
      research: researchTaskPool,
      items: itemTaskPool,
      'flavor-central': safariFlavorTaskPoolIds.central.map((id) => ({ id, weight: 1 })),
      'flavor-east': safariFlavorTaskPoolIds.east.map((id) => ({ id, weight: 1 })),
      'flavor-west': safariFlavorTaskPoolIds.west.map((id) => ({ id, weight: 1 })),
      'flavor-north': safariFlavorTaskPoolIds.north.map((id) => ({ id, weight: 1 })),
    },
    path: [
      taskActivity('safari-grand-step-01-research', 'research'),
      secretActivity('safari-grand-step-02-central-survey', 'field-research', 'safari-central-expedition-field-observation'),
      secretActivity('safari-grand-step-03-central-survey', 'field-research', 'safari-central-expedition-field-observation'),
      taskActivity('safari-grand-step-04-central-find', 'items'),
      secretActivity('safari-grand-step-05-central-catch', 'location', 'safari-central-catch'),
      {
        type: 'branch',
        id: 'safari-grand-central-detour',
        selection: 'random',
        branches: [
          {
            id: 'central-boardwalk',
            nodes: [
              taskActivity('safari-grand-step-06a-central-flavor', 'flavor-central'),
              secretActivity('safari-grand-step-07a-central-battle', 'battle', 'safari-central-rocket-poacher'),
              secretActivity('safari-grand-step-08a-central-catch', 'location', 'safari-central-catch'),
              researchOrFlavor('safari-grand-step-09a-central-research', 'central'),
            ],
          },
          {
            id: 'central-grassland',
            nodes: [
              researchOrFlavor('safari-grand-step-06b-central-research', 'central'),
              taskActivity('safari-grand-step-07b-central-flavor', 'flavor-central'),
              taskActivity('safari-grand-step-08b-central-flavor', 'flavor-central'),
              secretActivity('safari-grand-step-09b-central-catch', 'location', 'safari-central-catch'),
            ],
          },
        ],
      },
      secretActivity('safari-grand-step-10-east-survey', 'field-research', 'safari-east-expedition-field-observation'),
      secretActivity('safari-grand-step-11-east-survey', 'field-research', 'safari-east-expedition-field-observation'),
      taskActivity('safari-grand-step-12-east-research', 'research'),
      secretActivity('safari-grand-step-13-east-catch', 'location', 'safari-east-catch'),
      {
        type: 'branch',
        id: 'safari-grand-east-detour',
        selection: 'random',
        branches: [
          {
            id: 'east-pond',
            nodes: [
              taskActivity('safari-grand-step-14a-east-find', 'items'),
              secretActivity('safari-grand-step-15a-east-battle', 'battle', 'safari-east-rocket-poacher'),
              secretActivity('safari-grand-step-16a-east-catch', 'location', 'safari-east-catch'),
              taskActivity('safari-grand-step-17a-east-flavor', 'flavor-east'),
            ],
          },
          {
            id: 'east-boardwalk',
            nodes: [
              secretActivity('safari-grand-step-14b-east-catch', 'location', 'safari-east-catch'),
              taskActivity('safari-grand-step-15b-east-find', 'items'),
              taskActivity('safari-grand-step-16b-east-flavor', 'flavor-east'),
              taskActivity('safari-grand-step-17b-east-flavor', 'flavor-east'),
            ],
          },
        ],
      },
      secretActivity('safari-grand-step-18-west-survey', 'field-research', 'safari-west-expedition-field-observation'),
      secretActivity('safari-grand-step-19-west-survey', 'field-research', 'safari-west-expedition-field-observation'),
      taskActivity('safari-grand-step-20-west-research', 'research'),
      secretActivity('safari-grand-step-21-west-catch', 'location', 'safari-west-catch'),
      {
        type: 'branch',
        id: 'safari-grand-west-detour',
        selection: 'random',
        branches: [
          {
            id: 'west-powder-trail',
            nodes: [
              researchOrFlavor('safari-grand-step-22a-west-research', 'west'),
              secretActivity('safari-grand-step-23a-west-catch', 'location', 'safari-west-catch'),
              secretActivity('safari-grand-step-24a-west-battle', 'battle', 'safari-west-rocket-poacher'),
              taskActivity('safari-grand-step-25a-west-find', 'items'),
            ],
          },
          {
            id: 'west-rest-house',
            nodes: [
              secretActivity('safari-grand-step-22b-west-catch', 'location', 'safari-west-catch'),
              researchOrFlavor('safari-grand-step-23b-west-research', 'west'),
              taskActivity('safari-grand-step-24b-west-find', 'items'),
              taskActivity('safari-grand-step-25b-west-flavor', 'flavor-west'),
            ],
          },
        ],
      },
      secretActivity('safari-grand-step-26-north-survey', 'field-research', 'safari-north-expedition-field-observation'),
      secretActivity('safari-grand-step-27-north-survey', 'field-research', 'safari-north-expedition-field-observation'),
      taskActivity('safari-grand-step-28-north-research', 'research'),
      secretActivity('safari-grand-step-29-north-catch', 'location', 'safari-north-catch'),
      {
        type: 'branch',
        id: 'safari-grand-north-detour',
        selection: 'random',
        branches: [
          {
            id: 'north-service-path',
            nodes: [
              taskActivity('safari-grand-step-30a-north-find', 'items'),
              secretActivity('safari-grand-step-31a-north-battle', 'battle', 'safari-north-rocket-poacher'),
              secretActivity('safari-grand-step-32a-north-catch', 'location', 'safari-north-catch'),
              taskActivity('safari-grand-step-33a-north-flavor', 'flavor-north'),
            ],
          },
          {
            id: 'north-ledges',
            nodes: [
              secretActivity('safari-grand-step-30b-north-catch', 'location', 'safari-north-catch'),
              taskActivity('safari-grand-step-31b-north-find', 'items'),
              taskActivity('safari-grand-step-32b-north-flavor', 'flavor-north'),
              taskActivity('safari-grand-step-33b-north-flavor', 'flavor-north'),
            ],
          },
        ],
      },
      {
        type: 'branch',
        id: 'safari-grand-final-notes',
        selection: 'random',
        branches: [
          {
            id: 'final-specimen-notes',
            nodes: [
              secretActivity('safari-grand-step-34a-final-catch', 'location', 'safari-north-catch'),
              secretActivity('safari-grand-step-35a-finale-catch', 'location', 'safari-grand-finale-catch'),
              itemOrFlavor('safari-grand-step-36a-final-find'),
            ],
          },
          {
            id: 'final-route-notes',
            nodes: [
              secretActivity('safari-grand-step-34b-final-catch', 'location', 'safari-north-catch'),
              secretActivity('safari-grand-step-35b-finale-catch', 'location', 'safari-grand-finale-catch'),
              itemOrFlavor('safari-grand-step-36b-final-find'),
            ],
          },
        ],
      },
    ],
    rewards: [
      { type: 'xp', skill: 'researching', quantity: 250, dropChance: 100 },
      { type: 'xp', skill: 'catching', quantity: 250, dropChance: 100 },
      {
        type: 'item',
        targetId: 'tm-strength',
        quantity: 1,
        dropChance: 100,
        secret: true,
        requirements: [
          { type: 'item_owned', targetId: 'tm-strength', inverse: true },
        ],
      },
    ],
  },
]
