import type {
  FishingGameConfig,
  FishingItemEntry,
  FishingPokemonEntry,
  FishingRodConfig,
} from '../types'

const permitRequirement = {
  type: 'task_completed' as const,
  targetId: 'safari-wardens-permit',
}

const rodCriteria = {
  type: 'item_owned' as const,
  targetId: 'old-rod',
}

const fishingEntry = (speciesId: number, weight: number): FishingPokemonEntry => ({
  speciesId,
  formId: String(speciesId),
  weight,
  symbol: '!',
  reactionTime: 750,
  appearTime: { min: 1600, max: 4200 },
})

const fishingRod = (
  entries: FishingPokemonEntry[],
  catchRateModifier: number,
): FishingRodConfig => ({
  levelRange: { min: 25, max: 35 },
  shinyChanceModifier: 1,
  catchRateModifier,
  timer: 25,
  encounters: { entries },
})

const safariFishingPool = [
  fishingEntry(129, 30),
  fishingEntry(60, 15),
  fishingEntry(118, 15),
  fishingEntry(54, 10),
  fishingEntry(79, 10),
  fishingEntry(98, 10),
  fishingEntry(147, 8),
  fishingEntry(148, 2),
]

const safariFishingItems = (): FishingItemEntry[] => [
  {
    itemId: 'water-gem',
    weight: 40,
    symbol: '!',
    reactionTime: 850,
    appearTime: { min: 2000, max: 5000 },
  },
  {
    itemId: 'aqua-solvent-t1',
    weight: 20,
    symbol: '!',
    reactionTime: 850,
    appearTime: { min: 2000, max: 5000 },
  },
  {
    itemId: 'drake-scale-t1',
    weight: 20,
    symbol: '!',
    reactionTime: 850,
    appearTime: { min: 2000, max: 5000 },
  },
  {
    currencyId: 'safari-notes',
    weight: 20,
    symbol: '!',
    reactionTime: 850,
    appearTime: { min: 2000, max: 5000 },
  },
]

const safariFishingRod = (): FishingRodConfig => ({
  levelRange: { min: 25, max: 35 },
  shinyChanceModifier: 1,
  catchRateModifier: 0,
  timer: 30,
  encounters: { entries: safariFishingPool },
  items: { entries: safariFishingItems() },
})

const standardSafariFishing = ({
  id,
  name,
  description,
  superEntries,
}: {
  id: string
  name: string
  description: string
  superEntries: FishingPokemonEntry[]
}): FishingGameConfig => ({
  id,
  name,
  description,
  category: 'Kanto',
  subCategory: 'Safari Zone',
  background: '/backgrounds/safari-reserve.avif',
  icon: { type: 'item', id: 'old-rod' },
  requirements: [permitRequirement],
  criteria: [rodCriteria],
  rewards: [],
  gameType: 'fishing',
  settings: {
    sky: '/games/run/backgrounds/sky.avif',
    scene: {
      portraitBackground: '/backgrounds/fishing-safari-reserve-portrait.avif',
      waterStyle: 'pond',
      waterline: { portrait: 55 },
    },
    waterAnimationSpeed: 1.15,
    rods: {
      old: fishingRod([fishingEntry(129, 100)], 5),
      good: fishingRod([fishingEntry(60, 50), fishingEntry(118, 50)], 0),
      super: fishingRod(superEntries, 0),
    },
  },
})

const centralSuperPool = [
  fishingEntry(129, 70),
  fishingEntry(54, 50),
  fishingEntry(79, 50),
  fishingEntry(98, 50),
  fishingEntry(147, 70),
  fishingEntry(148, 10),
]

const areaSuperPool = [
  fishingEntry(129, 90),
  fishingEntry(54, 50),
  fishingEntry(79, 50),
  fishingEntry(98, 50),
  fishingEntry(147, 60),
]

export const safariZoneFishing: FishingGameConfig[] = [
  standardSafariFishing({
    id: 'safari-central-fishing',
    name: 'Central Habitat Survey',
    description: 'Fish the central ponds and study the Pokémon drawn from the reserve’s original rod tables.',
    superEntries: centralSuperPool,
  }),
  standardSafariFishing({
    id: 'safari-east-fishing',
    name: 'Eastern Habitat Survey',
    description: 'Fish the eastern ponds and study the Pokémon drawn from the reserve’s original rod tables.',
    superEntries: areaSuperPool,
  }),
  standardSafariFishing({
    id: 'safari-west-fishing',
    name: 'Western Habitat Survey',
    description: 'Fish the western water and study the Pokémon drawn from the reserve’s original rod tables.',
    superEntries: areaSuperPool,
  }),
  standardSafariFishing({
    id: 'safari-north-fishing',
    name: 'Northern Habitat Survey',
    description: 'Fish the northern channels and study the Pokémon drawn from the reserve’s original rod tables.',
    superEntries: areaSuperPool,
  }),
  {
    id: 'safari-zone-fishing-expedition',
    name: 'Safari Zone Fishing',
    description:
      'Fish the reserve’s full rod pool. Every hooked Pokémon is followed by a short Safari Ball encounter with three Safari Balls.',
    category: 'Kanto',
    subCategory: 'Safari Zone',
    background: '/backgrounds/safari-reserve.avif',
    icon: { type: 'item', id: 'super-rod' },
    requirements: [
      permitRequirement,
      {
        type: 'task_completed',
        targetId: 'safari-fishing-research-notes',
      },
    ],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'pokedollars',
        count: 250,
        consume: true,
      },
      { type: 'item_owned', targetId: 'old-rod' },
      { type: 'item_owned', targetId: 'good-rod' },
      { type: 'item_owned', targetId: 'super-rod' },
    ],
    rewards: [],
    gameType: 'fishing',
    settings: {
      sky: '/games/run/backgrounds/sky.avif',
      scene: {
        portraitBackground: '/backgrounds/fishing-safari-reserve-portrait.avif',
        waterStyle: 'pond',
        waterline: { portrait: 55 },
      },
      waterAnimationSpeed: 1.15,
      safariCapture: { balls: 3 },
      rods: {
        old: safariFishingRod(),
        good: safariFishingRod(),
        super: safariFishingRod(),
      },
    },
  },
]
