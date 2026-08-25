import type {
  ExpeditionConfig,
  ExpeditionTaskPoolChoice,
  ExpeditionTaskPoolEntry,
} from '../types'
import {
  safariExtraTaskPoolIds,
  safariFlavorTaskPoolIds,
  safariItemTaskPoolIds,
  safariResearchTaskPoolIds,
} from '@/data/tasks/entries/safari-zone-expedition'

const permitRequirement = {
  type: 'item_owned' as const,
  targetId: 'safari-catching-permit',
}

const explorerResearchNotesRequirement = {
  type: 'task_completed' as const,
  targetId: 'safari-explorers-research-notes',
}

const poacherNotesRequirement = {
  type: 'task_completed' as const,
  targetId: 'safari-notes-on-poachers',
}

const safariEntranceFee = {
  type: 'currency_owned' as const,
  targetId: 'pokedollars',
  count: 500,
  consume: true,
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

const scalePoolWeights = (
  entries: ExpeditionTaskPoolEntry[],
  targetWeight: number,
) => entries.map((entry) => ({
  ...entry,
  weight: ((entry.weight ?? 0) * targetWeight) / 100,
}))

const safariBaseRewardTaskPool: ExpeditionTaskPoolEntry[] = [
  ...scalePoolWeights(researchTaskPool, 40),
  ...weightedIds(safariExtraTaskPoolIds.research, 5),
  ...scalePoolWeights(itemTaskPool, 40),
  ...weightedIds(safariExtraTaskPoolIds.materials, 5),
  ...weightedIds(safariExtraTaskPoolIds.safariBalls, 4),
  ...weightedIds(safariExtraTaskPoolIds.rare, 2),
  ...weightedIds(Object.values(safariFlavorTaskPoolIds).flat(), 20),
  ...weightedIds(safariExtraTaskPoolIds.flavor, 4),
]

const normalizePoolWeights = (
  entries: ExpeditionTaskPoolEntry[],
  targetWeight: number,
) => {
  const totalWeight = entries.reduce((sum, entry) => sum + (entry.weight ?? 0), 0)
  return entries.map((entry) => ({
    ...entry,
    weight: totalWeight > 0 ? ((entry.weight ?? 0) * targetWeight) / totalWeight : 0,
  }))
}

const safariRewardTaskPoolWithRests: ExpeditionTaskPoolEntry[] = [
  ...normalizePoolWeights(safariBaseRewardTaskPool, 94),
  ...weightedIds(safariExtraTaskPoolIds.rests, 6),
]

const safariRewardTaskPool = safariRewardTaskPoolWithRests

const allTaskIds = [
  ...safariRewardTaskPoolWithRests.map((entry) => entry.id),
]


const secretActivity = (
  id: string,
  activityType: 'task' | 'field-research' | 'location' | 'battle' | 'game',
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
  _legacyTaskPool?: string,
  _legacyTaskPoolChoices?: ExpeditionTaskPoolChoice[],
) => ({
  type: 'activity' as const,
  id,
  activityType: 'task' as const,
  secret: true,
  taskPool: 'safari-rewards',
})

const researchOrFlavor = (id: string, _area: keyof typeof safariFlavorTaskPoolIds) =>
  taskActivity(id)

const itemOrFlavor = (id: string) => taskActivity(id)

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
    maxLosses: 10,
    safariBallAllowance: 30,
    canAbandon: true,
    requirements: [permitRequirement],
    criteria: [
      safariEntranceFee,
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
      'safari-rewards': safariRewardTaskPool,
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
      { type: 'xp', skill: 'researching', quantity: 1000, dropChance: 100 },
      { type: 'xp', skill: 'catching', quantity: 1000, dropChance: 100 },
      { type: 'currency', targetId: 'safari-notes', quantity: 25, dropChance: 100 },
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
  {
    id: 'safari-zone-catching-expedition',
    name: 'Safari Zone Catching Expedition',
    description:
      'Return to the reserve with a full case of Safari Balls. Make two careful catches in each habitat, then try your luck in the prize habitat at the end.',
    category: 'Kanto',
    subCategory: 'Safari Zone',
    buttonText: 'Begin Catching Expedition',
    icon: { type: 'pokemon', id: '113' },
    background: '/backgrounds/safari-reserve.avif',
    maxLosses: 5,
    safariBallAllowance: 30,
    canAbandon: true,
    requirements: [permitRequirement, explorerResearchNotesRequirement],
    criteria: [safariEntranceFee],
    activityPool: {
      location: [
        'safari-central-catch',
        'safari-east-catch',
        'safari-west-catch',
        'safari-north-catch',
        'safari-grand-finale-catch',
      ],
    },
    path: [
      secretActivity('safari-catching-step-01-central', 'location', 'safari-central-catch'),
      secretActivity('safari-catching-step-02-central', 'location', 'safari-central-catch'),
      secretActivity('safari-catching-step-03-east', 'location', 'safari-east-catch'),
      secretActivity('safari-catching-step-04-east', 'location', 'safari-east-catch'),
      secretActivity('safari-catching-step-05-west', 'location', 'safari-west-catch'),
      secretActivity('safari-catching-step-06-west', 'location', 'safari-west-catch'),
      secretActivity('safari-catching-step-07-north', 'location', 'safari-north-catch'),
      secretActivity('safari-catching-step-08-north', 'location', 'safari-north-catch'),
      secretActivity('safari-catching-step-09-finale', 'location', 'safari-grand-finale-catch'),
    ],
    rewards: [
      { type: 'xp', skill: 'catching', quantity: 500, dropChance: 100 },
      { type: 'currency', targetId: 'safari-notes', quantity: 10, dropChance: 100 },
    ],
  },
  {
    id: 'safari-zone-poacher-watch-expedition',
    name: 'Poacher Watch',
    description:
      'A focused sweep through the reserve. Five poachers have been spotted, and every one of them needs to be driven away from the habitats.',
    category: 'Kanto',
    subCategory: 'Safari Zone',
    buttonText: 'Start the Sweep',
    icon: { type: 'trainer', id: 'rocket-grunt-m' },
    background: '/backgrounds/safari-reserve.avif',
    maxLosses: 1,
    canAbandon: true,
    requirements: [permitRequirement, poacherNotesRequirement],
    criteria: [],
    activityPool: {
      battle: [
        'safari-poacher-watch-one',
        'safari-poacher-watch-two',
        'safari-poacher-watch-three',
        'safari-poacher-watch-four',
        'safari-poacher-watch-five',
      ],
    },
    path: [
      secretActivity('safari-poacher-watch-step-01', 'battle', 'safari-poacher-watch-one'),
      secretActivity('safari-poacher-watch-step-02', 'battle', 'safari-poacher-watch-two'),
      secretActivity('safari-poacher-watch-step-03', 'battle', 'safari-poacher-watch-three'),
      secretActivity('safari-poacher-watch-step-04', 'battle', 'safari-poacher-watch-four'),
      secretActivity('safari-poacher-watch-step-05', 'battle', 'safari-poacher-watch-five'),
    ],
    rewards: [
      { type: 'currency', targetId: 'pokedollars', quantity: 1500, dropChance: 100 },
      { type: 'item', targetId: 'rare-candy-l', quantity: 3, dropChance: 100 },
      { type: 'currency', targetId: 'safari-notes', quantity: 1, dropChance: 100 },
      {
        type: 'item',
        targetId: 'pack-base5',
        quantity: 1,
        dropChance: 100,
        label: 'Team Rocket Booster Pack',
        requirements: [
          { type: 'item_owned', targetId: 'binder-base5' },
          {
            type: 'card_collected_set',
            targetId: 'base5',
            count: 83,
            unique: true,
            inverse: true,
          },
        ],
      },
    ],
  },
]
