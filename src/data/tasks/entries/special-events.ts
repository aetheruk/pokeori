import { Task } from '../../types'
import type { Reward } from '../../types'

const RANDOM_ROLL_MAX = 1_000_000
const oneIn = (odds: number) => Math.floor(RANDOM_ROLL_MAX / odds)
const dowsingRequirement = { type: 'item_owned' as const, targetId: 'dowsing-machine' }

type DowsingEventDefinition = {
  id: string
  name: string
  description: string
  odds: number
  icon: { type: 'item'; id: string }
  rewards: Reward[]
  completeButtonText?: string
}

type BeastFusionElement = {
  element: 'fire' | 'thunder' | 'water'
  label: string
  iconItem: string
  background: string
}

type BirdBranchElement = {
  element: 'flaming' | 'charged' | 'frozen'
  label: string
  branchItem: string
  boughItem: string
  twigItem: string
  lifelessItem: string
  concentratedItem: string
  background: string
}

const beastFusionElements: BeastFusionElement[] = [
  {
    element: 'fire',
    label: 'Fire',
    iconItem: 'fire-stone',
    background: '/backgrounds/rocky-path.avif',
  },
  {
    element: 'thunder',
    label: 'Thunder',
    iconItem: 'thunder-stone',
    background: '/backgrounds/rocky-path.avif',
  },
  {
    element: 'water',
    label: 'Water',
    iconItem: 'water-stone',
    background: '/backgrounds/rocky-lake.avif',
  },
]

const birdBranchElements: BirdBranchElement[] = [
  {
    element: 'flaming',
    label: 'Flaming',
    branchItem: 'flaming-branch',
    boughItem: 'flaming-bough',
    twigItem: 'flaming-twig',
    lifelessItem: 'lifeless-flaming-branch',
    concentratedItem: 'concentrated-flaming-branch',
    background: '/backgrounds/volcano.avif',
  },
  {
    element: 'charged',
    label: 'Charged',
    branchItem: 'charged-branch',
    boughItem: 'charged-bough',
    twigItem: 'charged-twig',
    lifelessItem: 'lifeless-charged-branch',
    concentratedItem: 'concentrated-charged-branch',
    background: '/backgrounds/power-plant.avif',
  },
  {
    element: 'frozen',
    label: 'Frozen',
    branchItem: 'frozen-branch',
    boughItem: 'frozen-bough',
    twigItem: 'frozen-twig',
    lifelessItem: 'lifeless-frozen-branch',
    concentratedItem: 'concentrated-frozen-branch',
    background: '/backgrounds/snow-field.avif',
  },
]

const typeLures = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
]

const xBattleItems = ['x-attack', 'x-defense', 'x-sp-atk', 'x-sp-def', 'x-speed']

const dowsingEventDefinitions: DowsingEventDefinition[] = [
  {
    id: 'dowsing-machine-false-signal',
    name: 'False Signal',
    description: "Oh. There's nothing here. The Dowsing Machine must be acting up.",
    odds: 64,
    icon: { type: 'item', id: 'dowsing-machine' },
    completeButtonText: 'Keep Searching',
    rewards: [],
  },
  {
    id: 'dowsing-machine-pokedollars-100',
    name: 'Buried PokeDollars',
    description: 'The Dowsing Machine points to a small stash of coins.',
    odds: 128,
    icon: { type: 'item', id: 'relic-gold' },
    rewards: [{ type: 'currency', targetId: 'pokedollars', quantity: 100 }],
  },
  {
    id: 'dowsing-machine-pokedollars-500',
    name: 'Buried PokeDollars',
    description: 'The Dowsing Machine leads you to a tidy stash of coins.',
    odds: 128,
    icon: { type: 'item', id: 'relic-gold' },
    rewards: [{ type: 'currency', targetId: 'pokedollars', quantity: 500 }],
  },
  {
    id: 'dowsing-machine-pokedollars-2000',
    name: 'Buried PokeDollars',
    description: 'The Dowsing Machine uncovers a heavy pouch of coins.',
    odds: 512,
    icon: { type: 'item', id: 'relic-gold' },
    rewards: [{ type: 'currency', targetId: 'pokedollars', quantity: 2000 }],
  },
  {
    id: 'dowsing-machine-crystals-100',
    name: 'Buried Crystals',
    description: 'The Dowsing Machine reacts to a small cluster of crystals.',
    odds: 128,
    icon: { type: 'item', id: 'revive' },
    rewards: [{ type: 'currency', targetId: 'crystals', quantity: 100 }],
  },
  {
    id: 'dowsing-machine-crystals-500',
    name: 'Buried Crystals',
    description: 'The Dowsing Machine reacts to a bright cluster of crystals.',
    odds: 256,
    icon: { type: 'item', id: 'revive' },
    rewards: [{ type: 'currency', targetId: 'crystals', quantity: 500 }],
  },
  {
    id: 'dowsing-machine-crystals-2000',
    name: 'Buried Crystals',
    description: 'The Dowsing Machine reacts to a brilliant cache of crystals.',
    odds: 256,
    icon: { type: 'item', id: 'revive' },
    rewards: [{ type: 'currency', targetId: 'crystals', quantity: 2000 }],
  },
  {
    id: 'dowsing-machine-poke-ball-bundle',
    name: 'Poké Ball Cache',
    description: 'The Dowsing Machine finds a small pack of Poké Balls.',
    odds: 64,
    icon: { type: 'item', id: 'poke-ball' },
    rewards: [{ type: 'item', targetId: 'poke-ball', quantity: 3 }],
  },
  {
    id: 'dowsing-machine-great-ball-bundle',
    name: 'Great Ball Cache',
    description: 'The Dowsing Machine finds a small pack of Great Balls.',
    odds: 128,
    icon: { type: 'item', id: 'great-ball' },
    rewards: [{ type: 'item', targetId: 'great-ball', quantity: 3 }],
  },
  {
    id: 'dowsing-machine-ultra-ball-bundle',
    name: 'Ultra Ball Cache',
    description: 'The Dowsing Machine finds a small pack of Ultra Balls.',
    odds: 512,
    icon: { type: 'item', id: 'ultra-ball' },
    rewards: [{ type: 'item', targetId: 'ultra-ball', quantity: 3 }],
  },
  {
    id: 'dowsing-machine-luxury-ball',
    name: 'Luxury Ball Cache',
    description: 'The Dowsing Machine points to a carefully wrapped Luxury Ball.',
    odds: 256,
    icon: { type: 'item', id: 'luxury-ball' },
    rewards: [{ type: 'item', targetId: 'luxury-ball', quantity: 1 }],
  },
  {
    id: 'dowsing-machine-master-ball',
    name: 'Master Ball Cache',
    description: 'The Dowsing Machine is going wild. This signal is almost impossible.',
    odds: 1000000,
    icon: { type: 'item', id: 'master-ball' },
    rewards: [{ type: 'item', targetId: 'master-ball', quantity: 1 }],
  },
  ...typeLures.map((type) => ({
    id: `dowsing-machine-${type}-lure`,
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} Gem Cache`,
    description: `The Dowsing Machine finds a cache of ${type} gems.`,
    odds: 128,
    icon: { type: 'item' as const, id: `${type}-gem` },
    rewards: [{ type: 'item' as const, targetId: `${type}-gem`, quantity: 7 }],
  })),
  ...xBattleItems.map((itemId) => ({
    id: `dowsing-machine-${itemId}-bundle`,
    name: 'Battle Item Cache',
    description: 'The Dowsing Machine uncovers a useful battle supply cache.',
    odds: 256,
    icon: { type: 'item' as const, id: itemId },
    rewards: [{ type: 'item' as const, targetId: itemId, quantity: 2 }],
  })),
  ...['fire-stone', 'water-stone', 'leaf-stone', 'thunder-stone'].map((itemId) => ({
    id: `dowsing-machine-${itemId}`,
    name: 'Evolution Stone Cache',
    description: 'The Dowsing Machine leads you to a buried evolution stone.',
    odds: 1500,
    icon: { type: 'item' as const, id: itemId },
    rewards: [{ type: 'item' as const, targetId: itemId, quantity: 1 }],
  })),
]

const dowsingEventTasks: Task[] = dowsingEventDefinitions.map((event) => {
  return {
    id: event.id,
    name: event.name,
    description: event.description,
    category: 'Special',
    subCategory: 'Dowsing',
    icon: event.icon,
    background: '/backgrounds/forest.avif',
    repeatable: true,
    daily: true,
    secret: false,
    isRandomEvent: true,
    completionTrigger: 'manual',
    completeButtonText: event.completeButtonText || 'Dig It Up',
    requirements: [
      dowsingRequirement,
      {
        type: 'roll',
        count: oneIn(event.odds),
      },
    ],
    criteria: [],
    rewards: event.rewards,
  }
})

const beastFusionTasks: Task[] = beastFusionElements.map((entry) => {
  const ownedRequirements = [
    { type: 'item_owned' as const, targetId: `mark-of-${entry.element}` },
    { type: 'item_owned' as const, targetId: `proof-of-${entry.element}` },
    { type: 'item_owned' as const, targetId: `token-of-${entry.element}` },
    { type: 'item_owned' as const, targetId: `lifeless-${entry.element}`, inverse: true },
    { type: 'item_owned' as const, targetId: `concentrated-${entry.element}`, inverse: true },
  ]

  return {
    id: `beast-stones-${entry.element}`,
    name: `${entry.label} Stones`,
    description: 'Whoa those stones I found are glowing and going crazy!',
    category: 'Special',
    subCategory: 'Legendary',
    icon: {
      type: 'item',
      id: entry.iconItem,
    },
    background: entry.background,
    repeatable: false,
    secret: true,
    isRandomEvent: true,
    completionTrigger: 'manual',
    completeButtonText: 'Hold Them Together',
    requirements: [
      ...ownedRequirements,
      {
        type: 'roll',
        count: oneIn(1),
      },
    ],
    criteria: ownedRequirements
      .filter((requirement) => !requirement.inverse)
      .map((requirement) => ({ ...requirement, consume: true })),
    rewards: [
      {
        type: 'item',
        targetId: `lifeless-${entry.element}`,
        quantity: 1,
      },
    ],
    exitModal: {
      background: entry.background,
      title: `${entry.label} Stones`,
      icon: {
        type: 'item',
        id: entry.iconItem,
      },
      message: `The stones let out a huge pulse of ${entry.label.toLowerCase()} energy and fuse, seemingly spending all of their power.`,
      closeButtonText: 'Keep the Fused Stone',
    },
  }
})

const birdBranchFusionTasks: Task[] = birdBranchElements.map((entry) => {
  const ownedRequirements = [
    { type: 'item_owned' as const, targetId: entry.branchItem },
    { type: 'item_owned' as const, targetId: entry.boughItem },
    { type: 'item_owned' as const, targetId: entry.twigItem },
    { type: 'item_owned' as const, targetId: entry.lifelessItem, inverse: true },
    { type: 'item_owned' as const, targetId: entry.concentratedItem, inverse: true },
  ]

  return {
    id: `bird-branches-${entry.element}`,
    name: `${entry.label} Branches`,
    description: 'Whoa those strange branches are humming together!',
    category: 'Special',
    subCategory: 'Legendary',
    icon: {
      type: 'item',
      id: entry.branchItem,
    },
    background: entry.background,
    repeatable: false,
    secret: true,
    isRandomEvent: true,
    completionTrigger: 'manual',
    completeButtonText: 'Hold Them Together',
    requirements: [
      ...ownedRequirements,
      {
        type: 'roll',
        count: oneIn(1),
      },
    ],
    criteria: ownedRequirements
      .filter((requirement) => !requirement.inverse)
      .map((requirement) => ({ ...requirement, consume: true })),
    rewards: [
      {
        type: 'item',
        targetId: entry.lifelessItem,
        quantity: 1,
      },
    ],
    exitModal: {
      background: entry.background,
      title: `${entry.label} Branches`,
      icon: {
        type: 'item',
        id: entry.branchItem,
      },
      message: `The branches let out a huge pulse of ${entry.label.toLowerCase()} energy and fuse, seemingly spending all of their power.`,
      closeButtonText: 'Keep the Fused Branch',
    },
  }
})

export const specialEventTasks: Task[] = [
  {
    id: 'squirtle-squad-diary',
    name: 'A Curious Squirtle',
    description:
      'A Squirtle keeps following you around Vermilion, glancing between you and the shiny blue TM.',
    category: 'Special',
    subCategory: 'Squirtle Squad',
    icon: {
      type: 'pokemon',
      id: '7',
    },
    background: '/backgrounds/vermillion.avif',
    repeatable: false,
    secret: false,
    isRandomEvent: true,
    completionTrigger: 'manual',
    completeButtonText: 'Check on Squirtle',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'unknown-tm',
      },
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
        inverse: true,
      },
      {
        type: 'roll',
        count: oneIn(100),
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'squirtle-squad',
        quantity: 1,
      },
    ],
    exitModal: {
      background: '/backgrounds/vermillion.avif',
      title: 'My Friends the Squirtle Squad',
      icon: {
        type: 'pokemon',
        id: '7',
      },
      message:
        'The Squirtle presses a damp little book into your hand. Its cover reads "My Friends the Squirtle Squad."',
      closeButtonText: 'Keep the Diary',
    },
  },
  {
    id: 'gimmighoul-coin-floor',
    name: 'Gimmighoul Coin',
    description: 'Oooh a coin on the ground it must be my lucky day!',
    category: 'Special',
    subCategory: 'Floor',
    icon: {
      type: 'item',
      id: 'gimmighoul-coin',
    },
    background: '/backgrounds/inside-house.avif',
    repeatable: true,
    secret: false,
    isRandomEvent: true,
    completionTrigger: 'manual',
    completeButtonText: 'Pick up Coin',
    requirements: [
      dowsingRequirement,
      {
        type: 'roll',
        count: oneIn(128),
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'gimmighoul-coin',
        quantity: 1,
      },
    ],
  },
  ...beastFusionTasks,
  ...birdBranchFusionTasks,
  ...dowsingEventTasks,
]
