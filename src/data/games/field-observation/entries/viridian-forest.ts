import { FieldObservationConfig } from '../types'

export const viridianForestFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'viridian-forest-field-observation',
    name: 'Viridian Forest',
    description: 'A deep and sprawling forest, home to many Bug-type Pokémon.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'pokemon',
      id: '10',
    },
    background: '/backgrounds/forest.avif',
    requirements: [
      {
        type: 'battle_result',
        battleStatus: 'win',
        targetId: 'battle-grumpy-man',
        count: 1,
      },
    ],
    rewards: [],
    settings: {
      pokemonPool: [
        { speciesId: 10, formId: '10', weight: 35 },
        { speciesId: 13, formId: '13', weight: 35 },
        { speciesId: 11, formId: '11', weight: 5 },
        { speciesId: 14, formId: '14', weight: 5 },
        { speciesId: 25, formId: '25', weight: 10 },
        {
          speciesId: 12,
          formId: '12',
          weight: 5,
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
          weight: 5,
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
      levelRange: {
        min: 3,
        max: 6,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [
        {
          id: 'viridian-forest-broken-bike',
          itemId: 'broken-bike',
          dropChance: 3,
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
      ],
    },
  },
]
