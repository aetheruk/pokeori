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
  replacementWhenOwned,
}: {
  id: string
  label: string
  itemId: string
  iconId?: string
  quantity: number
  weight: number
  rarity: UfoCatcherPrizeTier['rarity']
  replacementWhenOwned?: UfoCatcherPrizeTier['replacementWhenOwned']
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
    replacementWhenOwned,
  }
}

function profilePrize({
  id,
  label,
  icon,
  rewardType,
  targetId,
  weight,
}: {
  id: string
  label: string
  icon: UfoCatcherPrizeTier['icon']
  rewardType: 'icon' | 'title'
  targetId: string
  weight: number
}): UfoCatcherPrizeTier {
  const rarity = 'uncommon'
  return {
    id,
    label,
    icon,
    rarity,
    weight,
    ...gripByRarity[rarity],
    rewards: [
      {
        type: rewardType,
        targetId,
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
    id: 'rocket-binder',
    label: 'Team Rocket Binder',
    itemId: 'binder-base5',
    quantity: 1,
    weight: 70,
    rarity: 'common',
    replacementWhenOwned: {
      itemId: 'binder-base5',
      label: 'Team Rocket Booster Pack',
      icon: { type: 'item', id: 'pack-base5' },
      rewards: [
        {
          type: 'item',
          targetId: 'pack-base5',
          quantity: 1,
          dropChance: 100,
          label: 'Team Rocket Booster Pack',
        },
      ],
    },
  }),
  itemPrize({
    id: 'antidotes',
    label: 'Antidote',
    itemId: 'antidote',
    quantity: 1,
    weight: 12,
    rarity: 'common',
  }),
  ...[
    ['paralyze-heal', 'Paralyze Heal'],
    ['awakening', 'Awakening'],
    ['burn-heal', 'Burn Heal'],
    ['ice-heal', 'Ice Heal'],
  ].map(([itemId, name]) =>
    itemPrize({
      id: itemId,
      label: name,
      itemId,
      quantity: 1,
      weight: 8,
      rarity: 'common',
    }),
  ),
  ...typeNames.map((type) =>
    itemPrize({
      id: `${type.toLowerCase()}-gems`,
      label: `2 ${type} Gems`,
      itemId: `${type.toLowerCase()}-gem`,
      quantity: 2,
      weight: 2,
      rarity: 'common',
    }),
  ),
  ...materialFamilies.map(([itemId, name]) =>
    itemPrize({
      id: itemId,
      label: `3 ${name}`,
      itemId,
      quantity: 3,
      weight: 2,
      rarity: 'common',
    }),
  ),
  itemPrize({
    id: 'xs-candy',
    label: 'XS Candy',
    itemId: 'rare-candy-xs',
    quantity: 1,
    weight: 1,
    rarity: 'uncommon',
  }),
  itemPrize({
    id: 's-candy',
    label: 'S Candy',
    itemId: 'rare-candy-m',
    quantity: 1,
    weight: 1,
    rarity: 'uncommon',
  }),
  itemPrize({
    id: 'full-heal',
    label: 'Full Heal',
    itemId: 'full-heal',
    quantity: 1,
    weight: 2,
    rarity: 'uncommon',
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
  profilePrize({
    id: 'rotom-icon',
    label: 'Rotom Icon',
    icon: { type: 'pokemon', id: '479' },
    rewardType: 'icon',
    targetId: 'rotom',
    weight: 1,
  }),
  profilePrize({
    id: 'ufo-master-title',
    label: 'UFO Master Title',
    icon: { type: 'trainer', id: 'gamer' },
    rewardType: 'title',
    targetId: 'ufo-master',
    weight: 1,
  }),
  itemPrize({
    id: 'ultra-ball',
    label: 'Ultra Ball',
    itemId: 'ultra-ball',
    quantity: 1,
    weight: 4,
    rarity: 'rare',
  }),
  ...[
    ['link-cable', 'Link Cable'],
    ['up-grade', 'Up-Grade'],
    ['nugget', 'Nugget'],
  ].map(([itemId, name]) =>
    itemPrize({
      id: itemId,
      label: name,
      itemId,
      quantity: 1,
      weight: 0.5,
      rarity: 'rare',
    }),
  ),
  itemPrize({
    id: 'rocket-ball',
    label: 'Rocket Ball',
    itemId: 'rocket-ball',
    quantity: 1,
    weight: 2,
    rarity: 'rare',
  }),
  ...[
    ['health-feather', 'Health Feather'],
    ['muscle-feather', 'Muscle Feather'],
    ['resist-feather', 'Resist Feather'],
    ['genius-feather', 'Genius Feather'],
    ['clever-feather', 'Clever Feather'],
    ['swift-feather', 'Swift Feather'],
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

const evFeatherPrizeIds = new Set([
  'health-feather',
  'muscle-feather',
  'resist-feather',
  'genius-feather',
  'clever-feather',
  'swift-feather',
])
const materialPrizeIds = new Set<string>(
  materialFamilies.map(([itemId]) => itemId),
)

function multiplyItemRewards(
  rewards: UfoCatcherPrizeTier['rewards'],
  itemIds: Set<string>,
  multiplier: number,
) {
  return rewards.map((reward) => {
    if (
      reward.type !== 'item' ||
      !itemIds.has(String(reward.targetId)) ||
      typeof reward.quantity !== 'number'
    ) {
      return reward
    }

    const quantity = reward.quantity * multiplier
    const label = itemIds.has('pack-base5') && reward.targetId === 'pack-base5'
      ? '5 Team Rocket Booster Packs'
      : reward.label?.startsWith('3 ')
        ? reward.label.replace(/^3 /, `${quantity} `)
        : reward.label

    return { ...reward, quantity, label }
  })
}

const highStakesPrizePool: UfoCatcherPrizeTier[] = [
  ...itemPrizePool
    .filter((tier) => !evFeatherPrizeIds.has(tier.id) && tier.id !== 'up-grade')
    .map((tier) => ({
      ...tier,
      label: materialPrizeIds.has(tier.id)
        ? tier.label.replace(/^3 /, '15 ')
        : tier.label,
      rewards: multiplyItemRewards(tier.rewards, materialPrizeIds, 5),
      replacementWhenOwned: tier.replacementWhenOwned
        ? {
            ...tier.replacementWhenOwned,
            label: '5 Team Rocket Booster Packs',
            rewards: multiplyItemRewards(
              tier.replacementWhenOwned.rewards,
              new Set(['pack-base5']),
              5,
            ),
          }
        : undefined,
    })),
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
  ...[
    ['thunder-stone', 'Thunder Stone'],
    ['ice-stone', 'Ice Stone'],
    ['moon-stone', 'Moon Stone'],
    ['fire-stone', 'Fire Stone'],
    ['leaf-stone', 'Leaf Stone'],
    ['water-stone', 'Water Stone'],
    ['oval-stone', 'Oval Stone'],
    ['sun-stone', 'Sun Stone'],
    ['shiny-stone', 'Shiny Stone'],
    ['dusk-stone', 'Dusk Stone'],
    ['dawn-stone', 'Dawn Stone'],
  ].map(([itemId, name]) =>
    itemPrize({
      id: itemId,
      label: name,
      itemId,
      quantity: 1,
      weight: 0.5,
      rarity: 'rare',
    }),
  ),
  itemPrize({
    id: 'super-potion',
    label: 'Super Potion',
    itemId: 'battle-super-potion',
    iconId: 'super-potion',
    quantity: 1,
    weight: 8,
    rarity: 'common',
  }),
  itemPrize({
    id: 'dubious-disc',
    label: 'Dubious Disc',
    itemId: 'dubious-disc',
    quantity: 1,
    weight: 0.5,
    rarity: 'rare',
  }),
]

const ufoCatcherSettings: UfoCatcherSettings = {
  board,
  cost: { currencyType: 'fun-tokens', amount: 30 },
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
    gridAdventureOnly: true,
    hide: 'when-the-fun-stops',
    gameType: 'ufo-catcher',
    name: 'Game Plaza UFO Catcher',
    description:
      'Guide the claw across the cabinet and back over a prize before making your drop.',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    icon: { type: 'pokemon', id: '479' },
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    requirements: [{ type: 'task_completed', targetId: 'when-the-fun-stops' }],
    criteria: [],
    rewards: [],
    settings: ufoCatcherSettings,
  },
  {
    id: 'celadon-high-stakes-ufo-catcher',
    gridAdventureOnly: true,
    hide: 'high-roller',
    gameType: 'ufo-catcher',
    name: 'High Stakes Game Plaza UFO Catcher',
    description:
      'Spend 300 Fun Tokens for a round with fivefold material and booster pack prizes, rare evolution stones, and Super Potions.',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    icon: { type: 'pokemon', id: '479' },
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    requirements: [{ type: 'task_completed', targetId: 'high-roller' }],
    criteria: [],
    rewards: [],
    settings: {
      ...ufoCatcherSettings,
      cost: { currencyType: 'fun-tokens', amount: 300 },
      themeColour: '#1f8a5b',
      tiers: highStakesPrizePool,
    },
  },
]
