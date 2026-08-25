import type {
  FishingGameConfig,
  FishingItemEntry,
  FishingPokemonEntry,
  FishingRodConfig,
} from '../types'

const fishingResearchNotesRequirement = {
  type: 'task_completed' as const,
  targetId: 'safari-fishing-research-notes',
}

const rodCriteria = {
  type: 'item_owned' as const,
  targetId: 'old-rod',
}

const fishingEntry = (
  speciesId: number,
  weight: number,
  formId = String(speciesId),
): FishingPokemonEntry => ({
  speciesId,
  formId,
  weight,
  symbol: '!',
  reactionTime: 750,
  appearTime: { min: 1600, max: 4200 },
})

const fishingRod = (
  entries: FishingPokemonEntry[],
  catchRateModifier: number,
  items?: FishingItemEntry[],
): FishingRodConfig => ({
  levelRange: { min: 25, max: 35 },
  shinyChanceModifier: 1,
  catchRateModifier,
  timer: 25,
  encounters: { entries },
  ...(items ? { items: { entries: items } } : {}),
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
  requirements: [fishingResearchNotesRequirement],
  criteria: [
    {
      type: 'currency_owned',
      targetId: 'pokedollars',
      count: 250,
      consume: true,
    },
    rodCriteria,
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
    safariCapture: { balls: 5 },
    rods: {
        old: fishingRod([fishingEntry(129, 100)], 5, safariFishingItems()),
        good: fishingRod(
          [fishingEntry(60, 50), fishingEntry(118, 50)],
          0,
          safariFishingItems(),
        ),
        super: fishingRod(superEntries, 0, safariFishingItems()),
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

const northSuperPool = areaSuperPool

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
    superEntries: northSuperPool,
  }),
  {
    id: 'safari-zone-fishing-expedition',
    name: 'Safari Zone Fishing (Legacy Session)',
    description:
      'Compatibility activity for Safari fishing sessions started before the habitat fishing records were merged into Explore.',
    category: 'Secret',
    subCategory: 'Safari Zone',
    background: '/backgrounds/safari-reserve.avif',
    icon: { type: 'item', id: 'super-rod' },
    expeditionOnly: true,
    requirements: [],
    criteria: [],
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
      safariCapture: { balls: 5 },
      rods: {
        old: safariFishingRod(),
        good: safariFishingRod(),
        super: safariFishingRod(),
      },
    },
  },
]
