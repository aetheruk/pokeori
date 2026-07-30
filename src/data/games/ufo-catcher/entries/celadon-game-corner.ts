import type {
  UfoCatcherGameConfig,
  UfoCatcherPrizeTier,
  UfoCatcherSettings,
} from '../types'

const board = {
  width: 600,
  depth: 360,
  clawBounds: {
    minX: 60,
    maxX: 540,
    minY: 40,
    maxY: 320,
  },
  anchors: [
    { id: 'back-left', x: 90, y: 70 },
    { id: 'back-centre', x: 285, y: 65 },
    { id: 'back-right', x: 500, y: 82 },
    { id: 'middle-left', x: 165, y: 185 },
    { id: 'middle-right', x: 415, y: 175 },
    { id: 'front-left', x: 105, y: 292 },
    { id: 'front-right', x: 485, y: 285 },
  ],
  positionJitter: { x: 18, y: 14 },
}

const gripByRarity: Record<
  UfoCatcherPrizeTier['rarity'],
  Pick<
    UfoCatcherPrizeTier,
    'hitRadius' | 'edgeGripChance' | 'centerGripChance'
  >
> = {
  common: {
    hitRadius: 36,
    edgeGripChance: 0.45,
    centerGripChance: 0.95,
  },
  uncommon: {
    hitRadius: 32,
    edgeGripChance: 0.3,
    centerGripChance: 0.85,
  },
  rare: {
    hitRadius: 27,
    edgeGripChance: 0.15,
    centerGripChance: 0.7,
  },
  'ultra-rare': {
    hitRadius: 22,
    edgeGripChance: 0,
    centerGripChance: 0.55,
  },
}

function itemPrize({
  id,
  label,
  itemId,
  iconId = itemId,
  quantity,
  weight,
  rarity,
}: {
  id: string
  label: string
  itemId: string
  iconId?: string
  quantity: number
  weight: number
  rarity: UfoCatcherPrizeTier['rarity']
}): UfoCatcherPrizeTier {
  return {
    id,
    label,
    icon: { type: 'item', id: iconId },
    rarity,
    weight,
    ...gripByRarity[rarity],
    rewards: [
      {
        type: 'item',
        targetId: itemId,
        quantity,
        dropChance: 100,
        label,
      },
    ],
  }
}

const typeNames = [
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy',
] as const

const materialFamilies = [
  ['soft-fluff-t1', 'Soft Fluff'],
  ['cinder-shard-t1', 'Cinder Shards'],
  ['aqua-solvent-t1', 'Aqua Solvent'],
  ['electric-component-t1', 'Electric Components'],
  ['wood-scraps-t1', 'Wood Scraps'],
  ['frost-crystal-t1', 'Frost Crystals'],
  ['grip-weave-t1', 'Grip Weave'],
  ['toxic-resin-t1', 'Toxic Resin'],
  ['terra-dust-t1', 'Soft Clay'],
  ['wing-feather-t1', 'Wing Feathers'],
  ['mind-thread-t1', 'Rune Stones'],
  ['chitin-fragment-t1', 'Chitin Fragments'],
  ['small-stone-t1', 'Small Stones'],
  ['spirit-wisp-t1', 'Ectoplasm'],
  ['drake-scale-t1', 'Drake Scales'],
  ['shadow-fiber-t1', 'Shadow Cloth'],
  ['metal-scrap-t1', 'Metal Scrap'],
  ['pixie-powder-t1', 'Fairy Charms'],
] as const

const itemPrizePool: UfoCatcherPrizeTier[] = [
  itemPrize({
    id: 'potions',
    label: 'Potion',
    itemId: 'battle-potion',
    iconId: 'potion',
    quantity: 1,
    weight: 14,
    rarity: 'common',
  }),
  itemPrize({
    id: 'antidotes',
    label: 'Antidote',
    itemId: 'antidote',
    quantity: 1,
    weight: 12,
    rarity: 'common',
  }),
  ...typeNames.map((type) =>
    itemPrize({
      id: `${type.toLowerCase()}-gems`,
      label: `${type} Gem`,
      itemId: `${type.toLowerCase()}-gem`,
      quantity: 1,
      weight: 2,
      rarity: 'common',
    }),
  ),
  ...materialFamilies.map(([itemId, name]) =>
    itemPrize({
      id: itemId,
      label: `5 ${name}`,
      itemId,
      quantity: 5,
      weight: 2,
      rarity: 'common',
    }),
  ),
  itemPrize({
    id: 'xs-candy',
    label: '2 XS Candies',
    itemId: 'rare-candy-xs',
    quantity: 2,
    weight: 8,
    rarity: 'common',
  }),
  itemPrize({
    id: 's-candy',
    label: '2 S Candies',
    itemId: 'rare-candy-m',
    quantity: 2,
    weight: 6,
    rarity: 'common',
  }),
  ...[
    ['x-attack', 'X Attack'],
    ['x-defense', 'X Defense'],
    ['x-sp-atk', 'X Sp. Atk'],
    ['x-sp-def', 'X Sp. Def'],
    ['x-speed', 'X Speed'],
    ['dire-hit', 'Dire Hit'],
  ].map(([itemId, name]) =>
    itemPrize({
      id: itemId,
      label: name,
      itemId,
      quantity: 1,
      weight: 2,
      rarity: 'uncommon',
    }),
  ),
  itemPrize({
    id: 'ultra-ball',
    label: 'Ultra Ball',
    itemId: 'ultra-ball',
    quantity: 1,
    weight: 4,
    rarity: 'rare',
  }),
  itemPrize({
    id: 'rocket-ball',
    label: 'Rocket Ball',
    itemId: 'rocket-ball',
    quantity: 1,
    weight: 2,
    rarity: 'rare',
  }),
  ...[
    ['hp-up', 'HP Up'],
    ['protein', 'Protein'],
    ['iron', 'Iron'],
    ['calcium', 'Calcium'],
    ['zinc', 'Zinc'],
    ['carbos', 'Carbos'],
  ].map(([itemId, name]) =>
    itemPrize({
      id: itemId,
      label: name,
      itemId,
      quantity: 1,
      weight: 0.5,
      rarity: 'ultra-rare',
    }),
  ),
]

const ufoCatcherSettings: UfoCatcherSettings = {
  board,
  cost: { currencyType: 'fun-tokens', amount: 50 },
  xTravelMs: 2400,
  yTravelMs: 1800,
  gripCurveExponent: 1.5,
  prizeCount: 5,
  timeLimit: 600,
  background: '/backgrounds/celadon-game-corner-arcade.avif',
  themeColour: '#b86148',
  tiers: itemPrizePool,
}

export const celadonGameCornerUfoCatcherEntries: UfoCatcherGameConfig[] = [
  {
    id: 'celadon-rocket-ufo-catcher',
    gameType: 'ufo-catcher',
    name: 'Rocket UFO Catcher',
    description:
      'Guide the claw across the cabinet and back over an item prize before making your drop.',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    icon: { type: 'pokemon', id: '479' },
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    requirements: [{ type: 'task_completed', targetId: 'when-the-fun-stops' }],
    criteria: [],
    rewards: [],
    settings: ufoCatcherSettings,
  },
]
