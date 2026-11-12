import { items } from '@/data/items'
import type { TaskCondition } from '@/data/tasks/types'
import { TIER_ONE_POKEMON_MATERIAL_IDS } from '@/utilities/artisan/material-drops'
import { FIELD_OBSERVATION_NUT_UNLOCKS } from '@/utilities/research/berry-drops'
import type { PrizeWheelGameConfig, PrizeWheelSlot } from '../types'

const itemNames = new Map(items.map((item) => [item.id, item.name]))

const badge = (targetId: string, inverse = false): TaskCondition => ({
  type: 'item_owned',
  targetId,
  ...(inverse ? { inverse: true } : {}),
})

const skillLevel = (
  targetId: string,
  count: number,
  inverse = false,
): TaskCondition => ({
  type: 'skill_level',
  targetId,
  count,
  ...(inverse ? { inverse: true } : {}),
})

function badgeTierRequirements(
  requiredBadge?: string,
  nextBadge?: string,
): TaskCondition[] {
  return [
    ...(requiredBadge ? [badge(requiredBadge)] : []),
    ...(nextBadge ? [badge(nextBadge, true)] : []),
  ]
}

type BadgeTier = { id: string; badge?: string; nextBadge?: string }

function makeItemSlot({
  id,
  itemId,
  quantity,
  color,
  groupId,
  requirements,
}: {
  id: string
  itemId: string
  quantity: number
  color: string
  groupId: string
  requirements?: TaskCondition[]
}): PrizeWheelSlot {
  const itemName = itemNames.get(itemId) || itemId
  return {
    id,
    label: `${quantity}x ${itemName}`,
    color,
    percentage: 1,
    weightGroup: { id: groupId, weight: 1 },
    icon: { type: 'item', id: itemId },
    requirements,
    rewards: [{ type: 'item', targetId: itemId, quantity, dropChance: 100 }],
  }
}

function makeItemBundleSlot({
  id,
  label,
  itemIds,
  quantity,
  color,
  groupId,
  requirements,
}: {
  id: string
  label: string
  itemIds: string[]
  quantity: number
  color: string
  groupId: string
  requirements?: TaskCondition[]
}): PrizeWheelSlot {
  const firstItemId = itemIds[0]
  return {
    id,
    label,
    color,
    percentage: 1,
    weightGroup: { id: groupId, weight: 1 },
    icon: { type: 'item', id: firstItemId || 'soft-fluff-t1' },
    requirements,
    rewards: itemIds.map((itemId) => ({
      type: 'item',
      targetId: itemId,
      quantity,
      dropChance: 100,
    })),
  }
}

const ballTiers: (BadgeTier & { itemId: string })[] = [
  {
    id: 'base',
    itemId: 'broken-ball-t1',
    nextBadge: 'badge-kanto-boulder',
  },
  {
    id: 'pewter',
    itemId: 'poke-ball',
    badge: 'badge-kanto-boulder',
    nextBadge: 'badge-kanto-thunder',
  },
  {
    id: 'vermilion',
    itemId: 'great-ball',
    badge: 'badge-kanto-thunder',
    nextBadge: 'badge-kanto-volcano',
  },
  {
    id: 'cinnabar',
    itemId: 'ultra-ball',
    badge: 'badge-kanto-volcano',
  },
]

const healingTiers: (BadgeTier & { itemId: string })[] = [
  {
    id: 'base',
    itemId: 'battle-potion',
    nextBadge: 'badge-kanto-rainbow',
  },
  {
    id: 'celadon',
    itemId: 'battle-super-potion',
    badge: 'badge-kanto-rainbow',
    nextBadge: 'badge-kanto-marsh',
  },
  {
    id: 'saffron',
    itemId: 'battle-hyper-potion',
    badge: 'badge-kanto-marsh',
    nextBadge: 'badge-kanto-earth',
  },
  {
    id: 'viridian',
    itemId: 'battle-full-restore',
    badge: 'badge-kanto-earth',
  },
]

const materialTiers: (BadgeTier & { quantity: number })[] = [
  { id: 'base', quantity: 1, nextBadge: 'badge-kanto-rainbow' },
  {
    id: 'celadon',
    quantity: 2,
    badge: 'badge-kanto-rainbow',
    nextBadge: 'badge-kanto-marsh',
  },
  {
    id: 'saffron',
    quantity: 4,
    badge: 'badge-kanto-marsh',
    nextBadge: 'badge-kanto-earth',
  },
  { id: 'viridian', quantity: 6, badge: 'badge-kanto-earth' },
]

const nutUnlocks = FIELD_OBSERVATION_NUT_UNLOCKS.filter(({ itemId }) =>
  itemId.startsWith('nut-'),
)
const nutUnlockLevels = [...new Set(nutUnlocks.map(({ level }) => level))].sort(
  (left, right) => left - right,
)

const eggRequirements: TaskCondition[] = [
  skillLevel('researching', 32),
  { type: 'task_completed', targetId: 'day-care-egg-program' },
]

const chanseyWheelEggSource = {
  sourceBackground: '/backgrounds/chansey.avif',
  sourceRegion: 'Kanto',
  sourceLocation: 'Viridian City',
}

const badgePremiums = [
  { badgeId: 'badge-kanto-boulder', itemId: 'moon-stone' },
  { badgeId: 'badge-kanto-cascade', itemId: 'water-stone' },
  { badgeId: 'badge-kanto-thunder', itemId: 'thunder-stone' },
  { badgeId: 'badge-kanto-rainbow', itemId: 'leaf-stone' },
  { badgeId: 'badge-kanto-soul', itemId: 'big-mushroom' },
  { badgeId: 'badge-kanto-marsh', itemId: 'link-cable' },
  { badgeId: 'badge-kanto-volcano', itemId: 'fire-stone' },
  { badgeId: 'badge-kanto-earth', itemId: 'up-grade' },
] as const

const slots: PrizeWheelSlot[] = [
  ...ballTiers.map((tier) =>
    makeItemSlot({
      id: `pokeball-${tier.id}`,
      itemId: tier.itemId,
      quantity: 3,
      color: '#F1AEC6',
      groupId: 'pokeball-spot',
      requirements: badgeTierRequirements(tier.badge, tier.nextBadge),
    }),
  ),
  ...healingTiers.map((tier) =>
    makeItemSlot({
      id: `healing-${tier.id}`,
      itemId: tier.itemId,
      quantity: 3,
      color: '#E8F3E2',
      groupId: 'healing-spot',
      requirements: badgeTierRequirements(tier.badge, tier.nextBadge),
    }),
  ),
  ...materialTiers.map((tier) =>
    makeItemBundleSlot({
      id: `materials-${tier.id}`,
      label: `${tier.quantity}x Each Base Material`,
      itemIds: [...TIER_ONE_POKEMON_MATERIAL_IDS],
      quantity: tier.quantity,
      color: '#DCEBFC',
      groupId: 'material-spot',
      requirements: badgeTierRequirements(tier.badge, tier.nextBadge),
    }),
  ),
  ...nutUnlockLevels.flatMap((level, index) => {
    const nextLevel = nutUnlockLevels[index + 1]
    const unlockedNuts = nutUnlocks.filter((unlock) => unlock.level <= level)
    const requirements = [
      skillLevel('researching', level),
      ...(nextLevel ? [skillLevel('researching', nextLevel, true)] : []),
    ]

    return [
      makeItemBundleSlot({
        id: `nuts-${level}`,
        label: '3x Each Unlocked Dye Nut',
        itemIds: unlockedNuts.map(({ itemId }) => itemId),
        quantity: 3,
        color: '#F7E8B5',
        groupId: 'nut-spot',
        requirements,
      }),
    ]
  }),
  {
    id: 'egg',
    label: 'Pokemon Egg',
    color: '#E8F3E2',
    percentage: 2,
    fixedPercentage: 2,
    icon: { type: 'local', id: '/sprites/items/egg.avif' },
    requirements: eggRequirements,
    rewards: [
      {
        type: 'egg',
        quantity: 1,
        dropChance: 100,
        eggData: { rarity: 'normal', ...chanseyWheelEggSource },
      },
    ],
  },
  {
    id: 'shiny-egg',
    label: 'Shiny Pokemon Egg',
    color: '#F7CF05',
    percentage: 0.05,
    fixedPercentage: 0.05,
    icon: { type: 'local', id: '/sprites/items/egg.avif' },
    requirements: eggRequirements,
    rewards: [
      {
        type: 'egg',
        quantity: 1,
        dropChance: 100,
        eggData: { rarity: 'shiny', ...chanseyWheelEggSource },
      },
    ],
  },
  ...badgePremiums.map(({ badgeId, itemId }) => ({
    id: `premium-${badgeId}`,
    label: itemNames.get(itemId) || itemId,
    color: '#F7CF05',
    percentage: 0.5,
    fixedPercentage: 0.5,
    icon: { type: 'item' as const, id: itemId },
    requirements: [badge(badgeId)],
    rewards: [{ type: 'item' as const, targetId: itemId, quantity: 1, dropChance: 100 }],
  })),
]

export const viridianCitychanseyEntries: PrizeWheelGameConfig[] = [
  {
    id: 'chansey-wheel-viridian',
    name: 'Pokemon Center Wheel',
    gameType: 'prize-wheel',
    description:
      'Visit Chansey at the Pokemon Center to use your league tickets and win some Trainer Essentials',
    category: 'Kanto',
    subCategory: 'Viridian City',
    background: '/backgrounds/chansey.avif',
    icon: { type: 'pokemon', id: '113' },
    daily: true,
    requirements: [
      { type: 'task_completed', targetId: 'explore-viridian' },
      {
        type: 'daily_not_completed',
        targetId: 'chansey-wheel-viridian',
        count: 5,
      },
    ],
    criteria: [],
    rewards: [],
    settings: {
      spinTime: { min: 5, max: 10 },
      background: '/scratchcard/chansey.avif',
      themeColour: '#FAC0CC', // ChanseyPink
      showSlotLabels: false,
      cost: { amount: 2, currencyType: 'league-ticket' },
      slots,
    },
  },
]
