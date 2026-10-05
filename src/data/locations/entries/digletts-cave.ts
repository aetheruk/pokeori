import { Location } from '../../types'

export const diglettsCaveLocations: Location[] = [
  {
    id: 'digletts-cave-main',
    name: "Diglett's Cave",
    description: 'A narrow tunnel where Diglett and Dugtrio constantly churn the earth.',
    category: 'Kanto',
    subCategory: 'Digletts Cave',
    icon: {
      type: 'pokemon',
      id: '50',
    },
    background: '/backgrounds/cave.avif',
    levelRange: {
      min: 16,
      max: 21,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-rumours',
      },
    ],
    encounters: [
      { speciesId: 50, formId: '50', chance: 85 },
      { speciesId: 51, formId: '51', chance: 15 },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'binder-basep',
        quantity: 1,
        dropChance: 20,
        secret: true,
        requirements: [
          { type: 'task_completed', targetId: 'digletts-cave-stressed-stranger' },
          { type: 'item_owned', targetId: 'binder-basep', inverse: true },
        ],
      },
      {
        type: 'item',
        targetId: 'rubber-mallet',
        quantity: 1,
        dropChance: 20,
        secret: true,
        requirements: [
          { type: 'task_completed', targetId: 'digletts-cave-stressed-stranger' },
          { type: 'item_owned', targetId: 'rubber-mallet', inverse: true },
        ],
      },
      {
        type: 'task_complete',
        targetId: 'coarse-sand-recipe',
        dropChance: 12,
      },
    ],
  },
]
