import { SnapConfig } from '../types'

const RANDOM_ROLL_MAX = 1_000_000
const oneIn = (odds: number) => Math.floor(RANDOM_ROLL_MAX / odds)
const clearBellRequirement = { type: 'item_owned' as const, targetId: 'clear-bell' }

type LegendaryBirdSnap = {
  id: string
  name: string
  description: string
  target: number
  iconPokemon: string
  background: string
  rewardItem: string
  targetMissMessage: string
}

const legendaryBirdSnaps: LegendaryBirdSnap[] = [
  {
    id: 'moltres-shadow-snap',
    name: 'A Flaming Shadow',
    description: 'A flaming shape just swept overhead. I should get the camera ready!',
    target: 146,
    iconPokemon: '146',
    background: '/backgrounds/volcano.avif',
    rewardItem: 'flaming-bough',
    targetMissMessage: 'The flaming shadow vanished!',
  },
  {
    id: 'zapdos-shadow-snap',
    name: 'A Charged Shadow',
    description: 'A charged shape just crackled past. I should get the camera ready!',
    target: 145,
    iconPokemon: '145',
    background: '/backgrounds/power-plant.avif',
    rewardItem: 'charged-bough',
    targetMissMessage: 'The charged shadow vanished!',
  },
  {
    id: 'articuno-shadow-snap',
    name: 'A Frozen Shadow',
    description: 'A frozen shape just glided through the air. I should get the camera ready!',
    target: 144,
    iconPokemon: '144',
    background: '/backgrounds/snow-field.avif',
    rewardItem: 'frozen-bough',
    targetMissMessage: 'The frozen shadow vanished!',
  },
]

const legendaryBirdSnapEntries: SnapConfig[] = legendaryBirdSnaps.map((entry) => ({
  id: entry.id,
  name: entry.name,
  description: entry.description,
  category: 'Special',
  subCategory: 'Legendary',
  icon: {
    type: 'pokemon',
    id: entry.iconPokemon,
  },
  background: entry.background,
  isRandomEvent: true,
  requirements: [
    {
      type: 'research_encounter_result',
      targetId: entry.id,
      battleStatus: 'win',
      count: 1,
      inverse: true,
    },
    {
      type: 'roll',
      count: oneIn(256),
    },
  ],
  rewards: [
    {
      type: 'item',
      targetId: entry.rewardItem,
      quantity: 1,
      dropChance: 100,
    },
    {
      type: 'xp',
      skill: 'catching',
      quantity: 1000,
      dropChance: 100,
    },
  ],
  settings: {
    target: entry.target,
    targetMissMessage: entry.targetMissMessage,
    timeLimit: 180,
    winRate: 1,
    successThreshold: 5000,
  },
}))

export const specialEventSnapEntries: SnapConfig[] = [
  {
    id: 'rainbow-feather-shadow-snap',
    name: 'A Huge Shadow',
    description: 'A huge shadow just appeared, I should look up!',
    category: 'Special',
    subCategory: 'Legendary',
    icon: {
      type: 'item',
      id: 'rainbow-feather',
    },
    background: '/backgrounds/mountain-sky.avif',
    isRandomEvent: true,
    requirements: [
      clearBellRequirement,
      {
        type: 'research_encounter_result',
        targetId: 'rainbow-feather-shadow-snap',
        battleStatus: 'win',
        count: 3,
        inverse: true,
      },
      {
        type: 'roll',
        count: oneIn(256),
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'rainbow-feather',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'xp',
        skill: 'catching',
        quantity: 1000,
        dropChance: 100,
      },
    ],
    settings: {
      target: 250,
      targetMissMessage: 'The shadow vanished!',
      timeLimit: 180,
      winRate: 1,
      successThreshold: 5000,
    },
  },
  {
    id: 'silver-feather-shadow-snap',
    name: 'A Moonlit Shadow',
    description: 'A huge shadow crossed the moon. I should look up!',
    category: 'Special',
    subCategory: 'Legendary',
    icon: {
      type: 'item',
      id: 'silver-feather',
    },
    background: '/backgrounds/epic-ocean.avif',
    isRandomEvent: true,
    requirements: [
      {
        type: 'research_encounter_result',
        targetId: 'silver-feather-shadow-snap',
        battleStatus: 'win',
        count: 3,
        inverse: true,
      },
      {
        type: 'roll',
        count: oneIn(256),
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'silver-feather',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'xp',
        skill: 'catching',
        quantity: 1000,
        dropChance: 100,
      },
    ],
    settings: {
      target: 249,
      targetMissMessage: 'The moonlit shadow vanished!',
      timeLimit: 180,
      winRate: 1,
      successThreshold: 5000,
    },
  },
  {
    id: 'entei-shadow-snap',
    name: 'A Fiery Shadow',
    description: 'A fiery shape just dashed past. I should get the camera ready!',
    category: 'Special',
    subCategory: 'Legendary',
    icon: {
      type: 'pokemon',
      id: '244',
    },
    background: '/backgrounds/rocky-path.avif',
    isRandomEvent: true,
    requirements: [
      clearBellRequirement,
      {
        type: 'research_encounter_result',
        targetId: 'entei-shadow-snap',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'roll',
        count: oneIn(256),
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'proof-of-fire',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'xp',
        skill: 'catching',
        quantity: 1000,
        dropChance: 100,
      },
    ],
    settings: {
      target: 244,
      targetMissMessage: 'The fiery shadow vanished!',
      timeLimit: 180,
      winRate: 1,
      successThreshold: 5000,
    },
  },
  {
    id: 'raikou-shadow-snap',
    name: 'A Thunderous Shadow',
    description: 'A thunderous shape just flashed by. I should get the camera ready!',
    category: 'Special',
    subCategory: 'Legendary',
    icon: {
      type: 'pokemon',
      id: '243',
    },
    background: '/backgrounds/rocky-path.avif',
    isRandomEvent: true,
    requirements: [
      clearBellRequirement,
      {
        type: 'research_encounter_result',
        targetId: 'raikou-shadow-snap',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'roll',
        count: oneIn(256),
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'proof-of-thunder',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'xp',
        skill: 'catching',
        quantity: 1000,
        dropChance: 100,
      },
    ],
    settings: {
      target: 243,
      targetMissMessage: 'The thunderous shadow vanished!',
      timeLimit: 180,
      winRate: 1,
      successThreshold: 5000,
    },
  },
  {
    id: 'suicune-shadow-snap',
    name: 'A Mystic Shadow',
    description: 'A mystic shape just crossed the water. I should get the camera ready!',
    category: 'Special',
    subCategory: 'Legendary',
    icon: {
      type: 'pokemon',
      id: '245',
    },
    background: '/backgrounds/rocky-lake.avif',
    isRandomEvent: true,
    requirements: [
      clearBellRequirement,
      {
        type: 'research_encounter_result',
        targetId: 'suicune-shadow-snap',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'roll',
        count: oneIn(256),
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'proof-of-water',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'xp',
        skill: 'catching',
        quantity: 1000,
        dropChance: 100,
      },
    ],
    settings: {
      target: 245,
      targetMissMessage: 'The mystic shadow vanished!',
      timeLimit: 180,
      winRate: 1,
      successThreshold: 5000,
    },
  },
  ...legendaryBirdSnapEntries,
]
