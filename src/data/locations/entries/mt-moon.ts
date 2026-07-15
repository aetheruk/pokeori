import { Location } from '../../types'

export const mtMoonLocations: Location[] = [
  {
    id: 'exp-mt-moon-1f',
    name: 'Mt. Moon 1F',
    description: 'A complex cave system rumoured to be home of pokemon from another world.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '41',
    },
    background: '/backgrounds/cave.avif',
    timer: 20,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: {
      min: 6,
      max: 12,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-pokemon-center',
      },
    ],
    encounters: [
      { speciesId: 27, formId: '27', chance: 4 }, // Sandshrew
      { speciesId: 35, formId: '35', chance: 1 }, // Clefairy
      { speciesId: 41, formId: '41', chance: 75 }, // Zubat
      { speciesId: 46, formId: '46', chance: 5 }, // Paras
      { speciesId: 74, formId: '74', chance: 15 }, // Geodude
    ],
    rewards: [
      {
        type: 'item',
        dropChance: 3,
        targetId: 'tm-rock-shield',
        quantity: 1,
      },
      {
        type: 'task_complete',
        targetId: 'brittle-hard-stone-recipe',
        dropChance: 12,
      },
    ],
  },
  {
    id: 'exp-mt-moon-b1f',
    name: 'Mt. Moon B1F',
    description: 'Deeper down in the cave, so many Zubats!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '46',
    },
    background: '/backgrounds/cave.avif',
    timer: 18,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: {
      min: 8,
      max: 12,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-ladder-a',
      },
    ],
    encounters: [
      { speciesId: 35, formId: '35', chance: 4 }, // Clefairy
      { speciesId: 41, formId: '41', chance: 60 }, // Zubat
      { speciesId: 46, formId: '46', chance: 10 }, // Paras
      { speciesId: 74, formId: '74', chance: 26 }, // Geodude
    ],
    rewards: [
      {
        type: 'item',
        dropChance: 3,
        targetId: 'tm-rock-shield',
        quantity: 1,
      },
      {
        type: 'task_complete',
        targetId: 'brittle-hard-stone-recipe',
        dropChance: 12,
      },
    ],
  },
  {
    id: 'exp-mt-moon-b2f',
    name: 'Mt. Moon B2F',
    description: 'Somehow the pokemon seem slightly tougher down here...',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '35',
    },
    background: '/backgrounds/cave.avif',
    timer: 15,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: {
      min: 9,
      max: 13,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-ladder-e',
      },
    ],
    encounters: [
      { speciesId: 35, formId: '35', chance: 6 }, // Clefairy
      { speciesId: 41, formId: '41', chance: 49 }, // Zubat
      { speciesId: 46, formId: '46', chance: 15 }, // Paras
      { speciesId: 74, formId: '74', chance: 30 }, // Geodude
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'mt-moon-strange-wall',
        dropChance: 5,
        secret: true,
      },
      {
        type: 'item',
        dropChance: 3,
        targetId: 'tm-rock-shield',
        quantity: 1,
      },
      {
        type: 'task_complete',
        targetId: 'brittle-hard-stone-recipe',
        dropChance: 12,
      },
    ],
  },
  {
    id: 'exp-mt-moon-clefairy-cavern',
    name: 'Clefairy Cavern',
    description: 'A hidden cavern filled with Clefairy dancing under the moonlight!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '35',
    },
    background: '/backgrounds/cave.avif',
    timer: 25,
    shinyChanceModifier: 1.1,
    catchRateModifier: 1,
    levelRange: {
      min: 10,
      max: 14,
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-wall-weakness',
      },
      {
        type: 'skill_level',
        targetId: 'catching',
        count: 15,
      },
    ],
    encounters: [
      { speciesId: 35, formId: '35', chance: 70 }, // Clefairy
      {
        speciesId: 36,
        formId: '36',
        chance: 30,
        requirements: [
          {
            type: 'skill_level',
            targetId: 'catching',
            count: 20,
          },
        ],
      }, // Clefable
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'moon-stone',
        quantity: 1,
        dropChance: 1,
      },
      {
        type: 'task_complete',
        targetId: 'fairy-down-recipe',
        dropChance: 12,
      },
    ],
  },
]
