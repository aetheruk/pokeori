import { Location } from '../../types'

export const testLocations: Location[] = [
  {
    id: 'test-safari-catching',
    name: 'Safari Catching Test',
    description:
      'A controlled Safari encounter for testing the Oran Berry, Tamato Berry, and Safari Ball interactions.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: {
      type: 'pokemon',
      id: '128',
    },
    background: '/backgrounds/safari-reserve.avif',
    encounterMode: 'safari',
    timer: 90,
    fleeRate: 10,
    keyEncounter: true,
    levelRange: {
      min: 25,
      max: 25,
    },
    requirements: [],
    encounters: [
      {
        speciesId: 128,
        formId: '128',
        chance: 100,
      },
    ],
    rewards: [],
  },
  {
    id: 'test-mewtwo-consecutive-shield',
    name: 'Mewtwo Shield Test: Consecutive',
    description: 'A Mewtwo catch test using a shield broken by consecutive correct answers.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: {
      type: 'pokemon',
      id: '150',
    },
    background: '/backgrounds/cave.avif',
    timer: 45,
    shinyChanceModifier: 1,
    catchRateModifier: 25,
    keyEncounter: true,
    shield: {
      type: 'consecutive',
      requiredCorrectAnswers: 5,
      bubbleColor: '#a78bfa',
    },
    levelRange: {
      min: 70,
      max: 70,
    },
    requirements: [],
    encounters: [
      {
        speciesId: 150,
        formId: '150',
        chance: 100,
      },
    ],
    rewards: [],
  },
  {
    id: 'test-mewtwo-total-shield',
    name: 'Mewtwo Shield Test: Total',
    description: 'A Mewtwo catch test using a shield broken by total correct answers.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: {
      type: 'pokemon',
      id: '150',
    },
    background: '/backgrounds/cave.avif',
    timer: 55,
    shinyChanceModifier: 1,
    catchRateModifier: 25,
    keyEncounter: true,
    shield: {
      type: 'total',
      requiredCorrectAnswers: 10,
      bubbleColor: '#f59e0b',
    },
    levelRange: {
      min: 70,
      max: 70,
    },
    requirements: [],
    encounters: [
      {
        speciesId: 150,
        formId: '150',
        chance: 100,
      },
    ],
    rewards: [],
  },
  {
    id: 'test-mewtwo-regenerating-shield',
    name: 'Mewtwo Shield Test: Regen',
    description:
      'A Mewtwo catch test using a regenerating shield and incorrect-answer flee chance.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: {
      type: 'pokemon',
      id: '150',
    },
    background: '/backgrounds/cave.avif',
    timer: 55,
    shinyChanceModifier: 1,
    catchRateModifier: 25,
    keyEncounter: true,
    shield: {
      type: 'consecutive',
      requiredCorrectAnswers: 3,
      regenSeconds: 8,
    },
    fleeRate: 15,
    levelRange: {
      min: 70,
      max: 70,
    },
    requirements: [],
    encounters: [
      {
        speciesId: 150,
        formId: '150',
        chance: 100,
      },
    ],
    rewards: [],
  },
]
