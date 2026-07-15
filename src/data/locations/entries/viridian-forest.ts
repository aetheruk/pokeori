import { Location } from '../../types'

export const viridianForestLocations: Location[] = [
  {
    name: 'Viridian Forest',
    description: 'A deep and sprawling forest, home to many Bug-type Pokémon.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'pokemon',
      id: '10',
    },
    background: '/backgrounds/forest.avif',
    timer: 20,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: {
      min: 3,
      max: 6,
    },
    requirements: [
      {
        type: 'battle_result',
        battleStatus: 'win',
        targetId: 'battle-grumpy-man',
        count: 1,
      },
    ],
    encounters: [
      {
        speciesId: 10,
        formId: '10',
        chance: 35,
      },
      {
        speciesId: 13,
        formId: '13',
        chance: 35,
      },
      {
        speciesId: 11,
        formId: '11',
        chance: 5,
      },
      {
        speciesId: 14,
        formId: '14',
        chance: 5,
      },
      {
        speciesId: 25,
        formId: '25',
        chance: 10,
      },
      {
        speciesId: 12,
        formId: '12',
        chance: 5,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'bug-maniac-trade-3',
          },
          {
            type: 'battle_result',
            targetId: 'buggy-champion',
            battleStatus: 'win',
            count: 1,
          },
          {
            type: 'skill_level',
            targetId: 'catching',
            count: 10,
          },
          {
            type: 'skill_level',
            targetId: 'researching',
            count: 10,
          },
        ],
      },
      {
        speciesId: 15,
        formId: '15',
        chance: 5,
        requirements: [
          {
            type: 'task_completed',
            targetId: 'bug-maniac-trade-3',
          },
          {
            type: 'battle_result',
            targetId: 'buggy-champion',
            battleStatus: 'win',
            count: 1,
          },
          {
            type: 'skill_level',
            targetId: 'catching',
            count: 10,
          },
          {
            type: 'skill_level',
            targetId: 'researching',
            count: 10,
          },
        ],
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'broken-bike',
        dropChance: 1,
        quantity: 1,
        requirements: [
          {
            type: 'item_owned',
            targetId: 'broken-bike',
            inverse: true,
          },
          {
            type: 'task_completed',
            targetId: 'bike-shop-trade',
            inverse: true,
          },
        ],
      },
      {
        type: 'task_complete',
        targetId: 'bug-maniac-discovery',
        dropChance: 14,
      },
    ],
    id: 'viridian-forest',
  },
  {
    id: 'viridian-secret-garden',
    name: 'Secret Garden',
    description:
      'A hidden garden deep in Viridian Forest, bathed in the morning light. Rare Pokemon appear here at dawn.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'pokemon',
      id: '1',
    },
    background: '/backgrounds/forest.avif',
    timer: 20,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: {
      min: 5,
      max: 8,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bulbasaur-2',
      },
    ],
    criteria: [
      {
        type: 'time_range',
        timeRange: {
          start: '05:00',
          end: '09:00',
        },
      },
    ],
    encounters: [
      {
        speciesId: 1,
        formId: '1',
        chance: 100,
      },
    ],
    rewards: [],
  },
  {
    id: 'viridian-secret-garden-open',
    overrides: 'viridian-secret-garden',
    name: 'Secret Garden',
    description:
      'A hidden garden deep in Viridian Forest. The Bulbasaur are comfortable enough to appear whenever the garden is quiet.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'pokemon',
      id: '1',
    },
    background: '/backgrounds/forest.avif',
    timer: 20,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: {
      min: 5,
      max: 8,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'secret-garden-trust',
      },
    ],
    criteria: [],
    encounters: [
      {
        speciesId: 1,
        formId: '1',
        chance: 100,
      },
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'regular-seed-recipe',
        dropChance: 12,
      },
    ],
  },
]
