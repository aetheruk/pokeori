import { FieldObservationConfig } from '../types'

export const diglettsCaveFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'digletts-cave-field-observation',
    name: "Diglett's Cave",
    description: 'A narrow tunnel where Diglett and Dugtrio constantly churn the earth.',
    category: 'Kanto',
    subCategory: 'Digletts Cave',
    icon: {
      type: 'pokemon',
      id: '50',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-rumours',
      },
    ],
    rewards: [],
    skillXp: { skill: 'researching', level: 5 },
    settings: {
      pokemonPool: [
        { speciesId: 50, formId: '50', weight: 80 },
        { speciesId: 51, formId: '51', weight: 20 },
      ],
      levelRange: {
        min: 16,
        max: 21,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
      itemDrops: [
        {
          id: 'digletts-cave-promo-binder',
          itemId: 'binder-basep',
          dropChance: 5,
          secret: true,
        },
        {
          id: 'digletts-cave-rubber-mallet',
          itemId: 'rubber-mallet',
          dropChance: 10,
          requirements: [
            {
              type: 'item_owned',
              targetId: 'rubber-mallet',
              inverse: true,
            },
          ],
        },
      ],
    },
  },
]
