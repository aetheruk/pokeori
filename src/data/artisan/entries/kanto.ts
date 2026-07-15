import type { ArtisanRecipe, ArtisanRecipeCategory } from '../types'
import { candyItems } from '@/data/items/entries/candies'

type ArtisanRecipeDraft = Omit<ArtisanRecipe, 'category' | 'craftType' | 'outputQuantity'> & {
  outputQuantity?: ArtisanRecipe['outputQuantity']
  craftType?: ArtisanRecipe['craftType']
}

function withCraftDefaults(
  category: ArtisanRecipeCategory,
  recipes: ArtisanRecipeDraft[],
): ArtisanRecipe[] {
  return recipes.map((recipe) => ({
    ...recipe,
    category,
    craftType: recipe.craftType || 'precise',
    fail: recipe.fail ?? (category === 'balls' || category === 'items' ? true : undefined),
    outputQuantity:
      recipe.outputQuantity ||
      (category === 'balls' || category === 'items' ? { min: 0, max: 2 } : { min: 1, max: 3 }),
  }))
}

const TYPES = [
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
] as const

const TYPE_PRIMARY_MATERIAL: Record<(typeof TYPES)[number], string> = {
  normal: 'soft-fluff',
  fire: 'cinder-shard',
  water: 'aqua-solvent',
  electric: 'electric-component',
  grass: 'wood-scraps',
  ice: 'frost-crystal',
  fighting: 'grip-weave',
  poison: 'toxic-resin',
  ground: 'terra-dust',
  flying: 'wing-feather',
  psychic: 'mind-thread',
  bug: 'chitin-fragment',
  rock: 'small-stone',
  ghost: 'spirit-wisp',
  dragon: 'drake-scale',
  dark: 'shadow-fiber',
  steel: 'metal-scrap',
  fairy: 'pixie-powder',
}

const TYPE_HELD_ITEM_FAMILIES: Array<{
  type: (typeof TYPES)[number]
  normalId: string
  normalName: string
  lowId: string
  lowName: string
}> = [
  { type: 'normal', normalId: 'silk-scarf', normalName: 'Silk Scarf', lowId: 'cotton-scarf', lowName: 'Cotton Scarf' },
  { type: 'fire', normalId: 'charcoal', normalName: 'Charcoal', lowId: 'dusty-charcoal', lowName: 'Dusty Charcoal' },
  { type: 'water', normalId: 'mystic-water', normalName: 'Mystic Water', lowId: 'magic-water', lowName: 'Magic Water' },
  { type: 'electric', normalId: 'magnet', normalName: 'Magnet', lowId: 'weak-magnet', lowName: 'Weak Magnet' },
  { type: 'grass', normalId: 'miracle-seed', normalName: 'Miracle Seed', lowId: 'regular-seed', lowName: 'Regular Seed' },
  { type: 'ice', normalId: 'never-melt-ice', normalName: 'Never-Melt Ice', lowId: 'often-melt-ice', lowName: 'Often-Melt Ice' },
  { type: 'fighting', normalId: 'black-belt', normalName: 'Black Belt', lowId: 'brown-belt', lowName: 'Brown Belt' },
  { type: 'poison', normalId: 'poison-barb', normalName: 'Poison Barb', lowId: 'poison-tip', lowName: 'Poison Tip' },
  { type: 'ground', normalId: 'soft-sand', normalName: 'Soft Sand', lowId: 'coarse-sand', lowName: 'Coarse Sand' },
  { type: 'flying', normalId: 'sharp-beak', normalName: 'Sharp Beak', lowId: 'dull-beak', lowName: 'Dull Beak' },
  { type: 'psychic', normalId: 'twisted-spoon', normalName: 'Twisted Spoon', lowId: 'straight-spoon', lowName: 'Straight Spoon' },
  { type: 'bug', normalId: 'silver-powder', normalName: 'Silver Powder', lowId: 'aluminium-powder', lowName: 'Aluminium Powder' },
  { type: 'rock', normalId: 'hard-stone', normalName: 'Hard Stone', lowId: 'brittle-hard-stone', lowName: 'Brittle Hard Stone' },
  { type: 'ghost', normalId: 'spell-tag', normalName: 'Spell Tag', lowId: 'faux-spell-tag', lowName: 'Faux Spell Tag' },
  { type: 'dragon', normalId: 'dragon-fang', normalName: 'Dragon Fang', lowId: 'chipped-dragon-fang', lowName: 'Chipped Dragon Fang' },
  { type: 'dark', normalId: 'black-glasses', normalName: 'Black Glasses', lowId: 'chipped-glasses', lowName: 'Chipped Glasses' },
  { type: 'steel', normalId: 'metal-polish', normalName: 'Metal Polish', lowId: 'rusty-coat', lowName: 'Rusty Coat' },
  { type: 'fairy', normalId: 'fairy-feather', normalName: 'Fairy Feather', lowId: 'fairy-down', lowName: 'Fairy Down' },
]

const ELEMENTAL_STONE_RECIPES = [
  {
    label: 'Fire',
    outputId: 'inferior-fire-stone',
    gemId: 'fire-gem',
    materialType: 'fire',
  },
  {
    label: 'Water',
    outputId: 'inferior-water-stone',
    gemId: 'water-gem',
    materialType: 'water',
  },
  {
    label: 'Leaf',
    outputId: 'inferior-leaf-stone',
    gemId: 'grass-gem',
    materialType: 'grass',
  },
  {
    label: 'Thunder',
    outputId: 'inferior-thunder-stone',
    gemId: 'electric-gem',
    materialType: 'electric',
  },
  {
    label: 'Shiny',
    outputId: 'inferior-shiny-stone',
    gemId: 'fairy-gem',
    materialType: 'fairy',
  },
  {
    label: 'Ice',
    outputId: 'inferior-ice-stone',
    gemId: 'ice-gem',
    materialType: 'ice',
  },
  {
    label: 'Dark',
    outputId: 'inferior-dark-stone',
    gemId: 'dark-gem',
    materialType: 'dark',
  },
  {
    label: 'Light',
    outputId: 'inferior-light-stone',
    gemId: 'dragon-gem',
    materialType: 'dragon',
  },
] as const

const LURE_RECIPE_TIERS = [
  {
    prefix: '',
    label: '',
    artisanLevel: 10,
    researchLevel: 10,
    gemPrefix: '',
    gemCost: 2,
    materialTier: 1,
    quantity: 3,
  },
  {
    prefix: 'advanced-',
    label: 'Advanced ',
    artisanLevel: 40,
    researchLevel: 40,
    gemPrefix: '',
    gemCost: 5,
    materialTier: 1,
    quantity: 2,
  },
  {
    prefix: 'master-',
    label: 'Master ',
    artisanLevel: 70,
    researchLevel: 70,
    gemPrefix: 'pristine-',
    gemCost: 5,
    materialTier: 3,
    quantity: 1,
  },
] as const

const POKE_POWDER_TIERS = ['xs', 's', 'm', 'l', 'xl'] as const

function getPokePowderIdForArtisanLevel(level: number): string {
  const tierIndex = Math.min(POKE_POWDER_TIERS.length - 1, Math.floor(level / 20))
  return `poke-powder-${POKE_POWDER_TIERS[tierIndex]}`
}

function withPokePowderCost(recipe: ArtisanRecipeDraft, amount = 2): ArtisanRecipeDraft {
  return {
    ...recipe,
    costs: [...recipe.costs, { id: getPokePowderIdForArtisanLevel(recipe.artisanLevel), amount }],
  }
}

const BALL_RECIPES_WITHOUT_MANUALS = new Set(['poke-ball', 'great-ball', 'ultra-ball'])

function getRecipePrimaryItemId(recipe: ArtisanRecipeDraft) {
  return recipe.rewards.find((reward) => reward.type === 'item')?.targetId?.toString()
}

function withBallManualRequirement(recipe: ArtisanRecipeDraft): ArtisanRecipeDraft {
  const outputItemId = getRecipePrimaryItemId(recipe)
  if (!outputItemId || BALL_RECIPES_WITHOUT_MANUALS.has(outputItemId)) return recipe

  return {
    ...recipe,
    requirements: [
      ...(recipe.requirements || []),
      { type: 'task_completed', targetId: `${outputItemId}-manual` },
    ],
  }
}

const BALL_RECIPES: ArtisanRecipeDraft[] = [
  {
    id: 'craft-poke-ball',
    name: 'Craft Poké Ball',
    description: 'Assemble basic Poké Balls from artisan components.',
    artisanLevel: 1,
    costs: [
      { id: 'broken-ball-t1', amount: 1 },
      { id: 'paint-red', amount: 1 },
      { id: 'soft-fluff-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'poke-ball', quantity: 4, dropChance: 100 }],
  },
  {
    id: 'craft-premier-ball',
    name: 'Craft Premier Ball',
    description: 'Craft ceremonial white Poké Balls.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 2 },
      { id: 'paint-white', amount: 1 },
      { id: 'soft-fluff-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'premier-ball', quantity: 3, dropChance: 100 }],
  },
  {
    id: 'craft-nest-ball',
    name: 'Craft Nest Ball',
    description: 'Craft a ball tuned for weaker wild Pokémon.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 2 },
      { id: 'paint-green', amount: 1 },
      { id: 'wood-scraps-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'nest-ball', quantity: 3, dropChance: 100 }],
  },
  {
    id: 'craft-net-ball',
    name: 'Craft Net Ball',
    description: 'Craft netted balls for Bug catches.',
    artisanLevel: 16,
    costs: [
      { id: 'broken-ball-t1', amount: 2 },
      { id: 'paint-green', amount: 1 },
      { id: 'chitin-fragment-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'net-ball', quantity: 3, dropChance: 100 }],
  },
  {
    id: 'craft-friend-ball',
    name: 'Craft Friend Ball',
    description: 'Craft soothing balls that help build friendship.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 2 },
      { id: 'paint-green', amount: 1 },
      { id: 'pixie-powder-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'friend-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-lure-ball',
    name: 'Craft Lure Ball',
    description: 'Craft specialty balls designed for hooked encounters.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 2 },
      { id: 'paint-blue', amount: 1 },
      { id: 'aqua-solvent-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'lure-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-dive-ball',
    name: 'Craft Dive Ball',
    description: 'Craft pressure-resistant capture balls for aquatic hunts.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 3 },
      { id: 'paint-blue', amount: 1 },
      { id: 'aqua-solvent-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'dive-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-great-ball',
    name: 'Craft Great Ball',
    description: 'Assemble sturdy Great Balls from basic parts.',
    artisanLevel: 25,
    costs: [
      { id: 'broken-ball-t1', amount: 3 },
      { id: 'paint-blue', amount: 1 },
      { id: 'electric-component-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'great-ball', quantity: 3, dropChance: 100 }],
  },
  {
    id: 'craft-repeat-ball',
    name: 'Craft Repeat Ball',
    description: 'Craft tracker-linked balls for already catalogued species.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 3 },
      { id: 'paint-red', amount: 1 },
      { id: 'mind-thread-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'repeat-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-level-ball',
    name: 'Craft Level Ball',
    description: 'Craft calibrating balls keyed to level advantage.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 3 },
      { id: 'paint-yellow', amount: 1 },
      { id: 'mind-thread-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'level-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-fast-ball',
    name: 'Craft Fast Ball',
    description: 'Craft low-drag balls for speedy targets.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 3 },
      { id: 'paint-yellow', amount: 1 },
      { id: 'electric-component-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'fast-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-heavy-ball',
    name: 'Craft Heavy Ball',
    description: 'Craft dense impact balls effective on heavy Pokémon.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 3 },
      { id: 'paint-blue', amount: 1 },
      { id: 'small-stone-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'heavy-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-moon-ball',
    name: 'Craft Moon Ball',
    description: 'Craft moon-reactive balls for evolution-line targets.',
    artisanLevel: 12,
    costs: [
      { id: 'broken-ball-t1', amount: 3 },
      { id: 'fairy-gem', amount: 2 },
      { id: 'pixie-powder-t1', amount: 3 },
    ],
    rewards: [{ type: 'item', targetId: 'moon-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-love-ball',
    name: 'Craft Love Ball',
    description: 'Craft affinity-tuned balls for compatible pairs.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 3 },
      { id: 'paint-red', amount: 1 },
      { id: 'pixie-powder-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'love-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-dusk-ball',
    name: 'Craft Dusk Ball',
    description: 'Craft low-light balls tuned for caves and nighttime.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 3 },
      { id: 'paint-purple', amount: 1 },
      { id: 'shadow-fiber-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'dusk-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-ultra-ball',
    name: 'Craft Ultra Ball',
    description: 'Assemble Ultra Balls from sturdy basic parts.',
    artisanLevel: 50,
    costs: [
      { id: 'broken-ball-t1', amount: 4 },
      { id: 'paint-yellow', amount: 1 },
      { id: 'electric-component-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'ultra-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-timer-ball',
    name: 'Craft Timer Ball',
    description: 'Craft adaptive balls that improve over drawn-out encounters.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 4 },
      { id: 'paint-red', amount: 1 },
      { id: 'mind-thread-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'timer-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-luxury-ball',
    name: 'Craft Luxury Ball',
    description: 'Craft premium comfort-lined capture balls.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 4 },
      { id: 'paint-black', amount: 1 },
      { id: 'soft-fluff-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'luxury-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-quick-ball',
    name: 'Craft Quick Ball',
    description: 'Craft pre-primed balls optimized for opening throws.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 4 },
      { id: 'paint-blue', amount: 1 },
      { id: 'electric-component-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'quick-ball', quantity: 2, dropChance: 100 }],
  },
  {
    id: 'craft-rocket-ball',
    name: 'Craft Rocket Ball',
    description: 'Craft a dark-aura tactical ball variant.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 4 },
      { id: 'paint-purple', amount: 1 },
      { id: 'shadow-fiber-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'rocket-ball', quantity: 1, dropChance: 100 }],
  },
  {
    id: 'craft-dream-ball',
    name: 'Craft Dream Ball',
    description: 'Craft oneiric balls tuned to sleeping targets.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t1', amount: 4 },
      { id: 'paint-purple', amount: 1 },
      { id: 'spirit-wisp-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'dream-ball', quantity: 1, dropChance: 100 }],
  },
  {
    id: 'craft-cherish-ball',
    name: 'Craft Cherish Ball',
    description: 'Craft limited commemorative artisan balls.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t3', amount: 4 },
      { id: 'paint-red', amount: 1 },
      { id: 'drake-scale-t3', amount: 2 },
    ],
    rewards: [{ type: 'item', targetId: 'cherish-ball', quantity: 1, dropChance: 100 }],
  },
  {
    id: 'craft-beast-ball',
    name: 'Craft Beast Ball',
    description: 'Craft unstable dimensional capsules for exotic targets.',
    artisanLevel: 100,
    costs: [
      { id: 'broken-ball-t3', amount: 5 },
      { id: 'paint-blue', amount: 1 },
      { id: 'drake-scale-t3', amount: 2 },
    ],
    rewards: [{ type: 'item', targetId: 'beast-ball', quantity: 1, dropChance: 100 }],
  },
]

const LURE_RECIPES: ArtisanRecipeDraft[] = LURE_RECIPE_TIERS.flatMap((tier) =>
  TYPES.map((type) => {
    const typeName = type[0].toUpperCase() + type.slice(1)
    const materialId = `${TYPE_PRIMARY_MATERIAL[type]}-t${tier.materialTier}`
    const costs = [
      { id: `${tier.gemPrefix}${type}-gem`, amount: tier.gemCost },
      { id: materialId, amount: 2 },
      { id: getPokePowderIdForArtisanLevel(tier.artisanLevel), amount: 1 },
    ].reduce<Array<{ id: string; amount: number }>>((entries, cost) => {
      const existing = entries.find((entry) => entry.id === cost.id)
      if (existing) existing.amount += cost.amount
      else entries.push({ ...cost })
      return entries
    }, [])

    return {
      id: `craft-${tier.prefix}${type}-lure`,
      name: `${tier.label}${typeName} Lure`,
      description: `Craft ${tier.label.toLowerCase()}${type} lures from matching gems and ${TYPE_PRIMARY_MATERIAL[type]} infusions.`,
      artisanLevel: tier.artisanLevel,
      requirements: [{ type: 'skill_level', targetId: 'researching', count: tier.researchLevel }],
      costs,
      craftType: 'balance',
      rewards: [
        {
          type: 'item' as const,
          targetId: `${tier.prefix}${type}-lure`,
          quantity: tier.quantity,
          dropChance: 100,
        },
      ],
      bulk: 3,
    }
  }),
)

const PAINT_RECIPES: ArtisanRecipeDraft[] = [
  {
    id: 'paint-red',
    name: 'Red Dye',
    description: 'Crush red nuts into crafting dye.',
    artisanLevel: 1,
    costs: [{ id: 'nut-red', amount: 1 }],
    rewards: [{ type: 'item', targetId: 'paint-red', quantity: 1, dropChance: 100 }],
    craftType: 'crush',
    bulk: 5,
  },
  {
    id: 'paint-blue',
    name: 'Blue Dye',
    description: 'Crush blue nuts into crafting dye.',
    artisanLevel: 21,
    costs: [{ id: 'nut-blue', amount: 1 }],
    rewards: [{ type: 'item', targetId: 'paint-blue', quantity: 1, dropChance: 100 }],
    craftType: 'crush',
    bulk: 5,
  },
  {
    id: 'paint-yellow',
    name: 'Yellow Dye',
    description: 'Crush yellow nuts into crafting dye.',
    artisanLevel: 28,
    costs: [{ id: 'nut-yellow', amount: 1 }],
    rewards: [{ type: 'item', targetId: 'paint-yellow', quantity: 1, dropChance: 100 }],
    craftType: 'crush',
    bulk: 5,
  },
  {
    id: 'paint-green',
    name: 'Green Dye',
    description: 'Crush green nuts into crafting dye.',
    artisanLevel: 14,
    costs: [{ id: 'nut-green', amount: 1 }],
    rewards: [{ type: 'item', targetId: 'paint-green', quantity: 1, dropChance: 100 }],
    craftType: 'crush',
    bulk: 5,
  },
  {
    id: 'paint-purple',
    name: 'Purple Dye',
    description: 'Crush purple nuts into crafting dye.',
    artisanLevel: 7,
    costs: [{ id: 'nut-purple', amount: 1 }],
    rewards: [{ type: 'item', targetId: 'paint-purple', quantity: 1, dropChance: 100 }],
    craftType: 'crush',
    bulk: 5,
  },
  {
    id: 'paint-white',
    name: 'White Dye',
    description: 'Crush pale nuts into crafting dye.',
    artisanLevel: 40,
    costs: [{ id: 'nut-white', amount: 1 }],
    rewards: [{ type: 'item', targetId: 'paint-white', quantity: 1, dropChance: 100 }],
    craftType: 'crush',
    bulk: 5,
  },
  {
    id: 'paint-black',
    name: 'Black Dye',
    description: 'Crush dark nuts into crafting dye.',
    artisanLevel: 40,
    costs: [{ id: 'nut-black', amount: 1 }],
    rewards: [{ type: 'item', targetId: 'paint-black', quantity: 1, dropChance: 100 }],
    craftType: 'crush',
    bulk: 5,
  },
]

const DRIED_DYE_RECIPES: ArtisanRecipeDraft[] = PAINT_RECIPES.map((recipe) => {
  const color = recipe.id.replace('paint-', '')
  return {
    id: `dried-${color}`,
    name: `Dried ${color[0].toUpperCase()}${color.slice(1)} Dye`,
    description: `Balance and dry ${color} dye into a shelf-stable crafting pigment.`,
    artisanLevel: recipe.artisanLevel + 3,
    costs: [{ id: recipe.id, amount: 5 }],
    rewards: [{ type: 'item' as const, targetId: `dried-${color}`, quantity: 1, dropChance: 100 }],
    craftType: 'balance',
    fail: true,
    outputQuantity: { min: 0, max: 2 },
    bulk: 3,
  }
})

const paintRecipes = PAINT_RECIPES.map((recipe) => ({
  ...recipe,
  fail: true,
  outputQuantity: { min: 0, max: 2 },
}))

const POKE_POWDER_BY_CANDY_ID: Record<string, { id: string; name: string; isEx: boolean }> = {
  'rare-candy-xs': { id: 'poke-powder-xs', name: 'XS PokePowder', isEx: false },
  'rare-candy-s': { id: 'poke-powder-xs', name: 'XS PokePowder', isEx: true },
  'rare-candy-m': { id: 'poke-powder-s', name: 'S PokePowder', isEx: false },
  'rare-candy-l': { id: 'poke-powder-s', name: 'S PokePowder', isEx: true },
  'rare-candy-xl': { id: 'poke-powder-m', name: 'M PokePowder', isEx: false },
  'rare-candy-xxl': { id: 'poke-powder-m', name: 'M PokePowder', isEx: true },
  'rare-candy-mega': { id: 'poke-powder-l', name: 'L PokePowder', isEx: false },
  'rare-candy-giga': { id: 'poke-powder-l', name: 'L PokePowder', isEx: true },
  'rare-candy-tera': { id: 'poke-powder-xl', name: 'XL PokePowder', isEx: false },
  'rare-candy-max': { id: 'poke-powder-xl', name: 'XL PokePowder', isEx: true },
}

const POKE_POWDER_RECIPES: ArtisanRecipeDraft[] = candyItems.map((candy, index) => {
  const powder = POKE_POWDER_BY_CANDY_ID[candy.id]
  const tier = candy.id.replace('rare-candy-', '')
  const artisanLevel = index === 0 ? 2 : index * 10

  return {
    id: `craft-poke-powder-${tier}`,
    name: powder.isEx ? `${powder.name} EX` : powder.name,
    description: `Crush ${candy.name} into concentrated ${powder.name}.`,
    artisanLevel,
    costs: [{ id: candy.id, amount: 2 }],
    rewards: [{ type: 'item', targetId: powder.id, quantity: 1, dropChance: 100 }],
    craftType: 'crush',
    outputQuantity: powder.isEx ? { min: 1, max: 5 } : { min: 1, max: 3 },
    bulk: 5,
  }
})

const ITEM_RECIPES: ArtisanRecipeDraft[] = [
  {
    id: 'craft-battle-observer',
    name: 'Battle Observer',
    description: 'Snap conductive parts into a compact lens for reading battle habits.',
    artisanLevel: 3,
    costs: [
      { id: 'electric-component-t1', amount: 2 },
      { id: 'metal-scrap-t1', amount: 2 },
    ],
    rewards: [{ type: 'item', targetId: 'battle-observer', quantity: 1, dropChance: 100 }],
    craftType: 'scatter',
    outputQuantity: { min: 0, max: 2 },
    iconItemId: 'battle-observer',
    bulk: 5,
  },
  {
    id: 'mix-potion',
    name: 'Potion',
    description: 'Spin together dye, solvent, and fine powder into a basic healing Potion.',
    artisanLevel: 5,
    costs: [
      { id: 'poke-powder-xs', amount: 2 },
      { id: 'paint-purple', amount: 1 },
      { id: 'aqua-solvent-t1', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'battle-potion', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    bulk: 3,
  },
  {
    id: 'craft-red-berry-candy',
    name: 'Red Berry Candy',
    description: 'Tap berry candy pieces into a soft red friendship treat.',
    artisanLevel: 5,
    costs: [
      { id: 'paint-red', amount: 1 },
      { id: 'poke-powder-xs', amount: 2 },
    ],
    rewards: [{ type: 'item', targetId: 'red-berry-candy', quantity: 1, dropChance: 100 }],
    craftType: 'scatter',
    outputQuantity: { min: 0, max: 2 },
    iconItemId: 'red-berry-candy',
    bulk: 3,
  },
  {
    id: 'craft-purple-berry-candy',
    name: 'Purple Berry Candy',
    description: 'Tap berry candy pieces into a soft purple friendship treat.',
    artisanLevel: 11,
    costs: [
      { id: 'paint-purple', amount: 1 },
      { id: 'poke-powder-xs', amount: 2 },
    ],
    rewards: [{ type: 'item', targetId: 'purple-berry-candy', quantity: 1, dropChance: 100 }],
    craftType: 'scatter',
    outputQuantity: { min: 0, max: 2 },
    iconItemId: 'purple-berry-candy',
    bulk: 3,
  },
  {
    id: 'craft-green-berry-candy',
    name: 'Green Berry Candy',
    description: 'Tap berry candy pieces into a soft green friendship treat.',
    artisanLevel: 18,
    costs: [
      { id: 'paint-green', amount: 1 },
      { id: 'poke-powder-xs', amount: 2 },
    ],
    rewards: [{ type: 'item', targetId: 'green-berry-candy', quantity: 1, dropChance: 100 }],
    craftType: 'scatter',
    outputQuantity: { min: 0, max: 2 },
    iconItemId: 'green-berry-candy',
    bulk: 3,
  },
  {
    id: 'craft-blue-berry-candy',
    name: 'Blue Berry Candy',
    description: 'Tap berry candy pieces into a soft blue friendship treat.',
    artisanLevel: 25,
    costs: [
      { id: 'paint-blue', amount: 1 },
      { id: 'poke-powder-xs', amount: 2 },
    ],
    rewards: [{ type: 'item', targetId: 'blue-berry-candy', quantity: 1, dropChance: 100 }],
    craftType: 'scatter',
    outputQuantity: { min: 0, max: 2 },
    iconItemId: 'blue-berry-candy',
    bulk: 3,
  },
  {
    id: 'craft-yellow-berry-candy',
    name: 'Yellow Berry Candy',
    description: 'Tap berry candy pieces into a soft yellow friendship treat.',
    artisanLevel: 32,
    costs: [
      { id: 'paint-yellow', amount: 1 },
      { id: 'poke-powder-xs', amount: 2 },
    ],
    rewards: [{ type: 'item', targetId: 'yellow-berry-candy', quantity: 1, dropChance: 100 }],
    craftType: 'scatter',
    outputQuantity: { min: 0, max: 2 },
    iconItemId: 'yellow-berry-candy',
    bulk: 3,
  },
  {
    id: 'craft-research-kit',
    name: 'Research Kit',
    description: 'Pack observation supplies into a field-ready research kit.',
    artisanLevel: 35,
    costs: [
      { id: 'battle-observer', amount: 1 },
      { id: 'battle-potion', amount: 1 },
      { id: 'poke-ball', amount: 1 },
      { id: 'poke-powder-xs', amount: 2 },
      { id: 'soft-fluff-t1', amount: 2 },
    ],
    rewards: [{ type: 'item', targetId: 'research-kit', quantity: 1, dropChance: 100 }],
    outputQuantity: { min: 1, max: 1 },
    iconItemId: 'research-kit',
  },
  {
    id: 'mix-antidote',
    name: 'Antidote',
    description: 'Mix fine powder, Pecha Berry, and poison reagents into a basic Antidote.',
    artisanLevel: 22,
    costs: [
      { id: 'poke-powder-xs', amount: 2 },
      { id: 'pecha-berry', amount: 1 },
      { id: 'toxic-resin-t1', amount: 3 },
    ],
    rewards: [{ type: 'item', targetId: 'antidote', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    bulk: 3,
  },
  {
    id: 'mix-fresh-water',
    name: 'Fresh Water',
    description: 'Mix Water-type solvent with fine powder into mineral-rich Fresh Water.',
    artisanLevel: 13,
    costs: [
      { id: 'poke-powder-xs', amount: 3 },
      { id: 'aqua-solvent-t1', amount: 1 },
      { id: 'water-gem', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'fresh-water', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    bulk: 3,
  },
  {
    id: 'mix-paralyze-heal',
    name: 'Paralyze Heal',
    description: 'Mix fine powder, Cheri Berry, and Electric-type components into a paralysis remedy.',
    artisanLevel: 22,
    costs: [
      { id: 'poke-powder-xs', amount: 2 },
      { id: 'cheri-berry', amount: 1 },
      { id: 'electric-component-t1', amount: 3 },
    ],
    rewards: [{ type: 'item', targetId: 'paralyze-heal', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    bulk: 3,
  },
  {
    id: 'mix-awakening',
    name: 'Awakening',
    description: 'Mix fine powder, Chesto Berry, and Psychic-type thread into a waking remedy.',
    artisanLevel: 22,
    costs: [
      { id: 'poke-powder-xs', amount: 2 },
      { id: 'chesto-berry', amount: 1 },
      { id: 'mind-thread-t1', amount: 3 },
    ],
    rewards: [{ type: 'item', targetId: 'awakening', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    bulk: 3,
  },
  {
    id: 'mix-burn-heal',
    name: 'Burn Heal',
    description: 'Mix fine powder, Rawst Berry, and Water-type solvent into a burn remedy.',
    artisanLevel: 22,
    costs: [
      { id: 'poke-powder-xs', amount: 2 },
      { id: 'rawst-berry', amount: 1 },
      { id: 'aqua-solvent-t1', amount: 3 },
    ],
    rewards: [{ type: 'item', targetId: 'burn-heal', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    bulk: 3,
  },
  {
    id: 'mix-super-potion',
    name: 'Super Potion',
    description: 'Mix red dye, small powder, and Water-type solvent into a Super Potion.',
    artisanLevel: 32,
    costs: [
      { id: 'poke-powder-s', amount: 1 },
      { id: 'paint-red', amount: 1 },
      { id: 'aqua-solvent-t1', amount: 3 },
    ],
    rewards: [{ type: 'item', targetId: 'battle-super-potion', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    bulk: 3,
  },
  {
    id: 'mix-soda-pop',
    name: 'Soda Pop',
    description: 'Mix small powder, solvent, and blue dye into Soda Pop.',
    artisanLevel: 35,
    costs: [
      { id: 'poke-powder-s', amount: 1 },
      { id: 'aqua-solvent-t1', amount: 2 },
      { id: 'paint-blue', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'soda-pop', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    bulk: 3,
  },
  {
    id: 'mix-lemonade',
    name: 'Lemonade',
    description: 'Mix medium powder with Water-type solvent and yellow dye into Lemonade.',
    artisanLevel: 41,
    costs: [
      { id: 'poke-powder-m', amount: 1 },
      { id: 'aqua-solvent-t1', amount: 2 },
      { id: 'paint-yellow', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'lemonade', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    bulk: 3,
  },
  {
    id: 'mix-ice-heal',
    name: 'Ice Heal',
    description: 'Mix fine powder, Aspear Berry, and Fire-type cinders into a thawing remedy.',
    artisanLevel: 22,
    costs: [
      { id: 'poke-powder-xs', amount: 2 },
      { id: 'aspear-berry', amount: 1 },
      { id: 'cinder-shard-t1', amount: 3 },
    ],
    rewards: [{ type: 'item', targetId: 'ice-heal', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    bulk: 3,
  },
]

const HELD_RECIPES: ArtisanRecipeDraft[] = TYPE_HELD_ITEM_FAMILIES.flatMap((family) => {
  const materialId = `${TYPE_PRIMARY_MATERIAL[family.type]}-t1`
  const recipeFor = (params: {
    itemId: string
    itemName: string
    artisanLevel: number
    materialAmount: number
    powderId: string
    powderAmount: number
  }): ArtisanRecipeDraft => ({
    id: `craft-${params.itemId}`,
    name: params.itemName,
    description: `Craft ${params.itemName} from ${family.type}-aligned materials and candy dust.`,
    artisanLevel: params.artisanLevel,
    costs: [
      { id: materialId, amount: params.materialAmount },
      { id: params.powderId, amount: params.powderAmount },
    ],
    rewards: [
      {
        type: 'item',
        targetId: params.itemId,
        quantity: 1,
        dropChance: 100,
      },
    ],
    outputQuantity: { min: 1, max: 1 },
    iconItemId: params.itemId,
    requirements: [
      {
        type: 'task_completed',
        targetId: `${params.itemId}-recipe`,
      },
    ],
  })

  return [
    recipeFor({
      itemId: family.lowId,
      itemName: family.lowName,
      artisanLevel: 18,
      materialAmount: 5,
      powderId: 'poke-powder-xs',
      powderAmount: 2,
    }),
    recipeFor({
      itemId: family.normalId,
      itemName: family.normalName,
      artisanLevel: 50,
      materialAmount: 500,
      powderId: 'poke-powder-m',
      powderAmount: 100,
    }),
    recipeFor({
      itemId: `unstable-${family.normalId}`,
      itemName: `Unstable ${family.normalName}`,
      artisanLevel: 75,
      materialAmount: 25,
      powderId: 'poke-powder-xl',
      powderAmount: 5,
    }),
  ]
})

const ELEMENTAL_STONE_HELD_RECIPES: ArtisanRecipeDraft[] = ELEMENTAL_STONE_RECIPES.map(
  (stone) => ({
    id: `craft-${stone.outputId}`,
    name: `Inferior ${stone.label} Stone`,
    description: `Fuse elemental gems into an Inferior ${stone.label} Stone. Only a perfect craft binds the stone.`,
    artisanLevel: 30,
    costs: [
      { id: stone.gemId, amount: 10 },
      { id: `${TYPE_PRIMARY_MATERIAL[stone.materialType]}-t1`, amount: 100 },
      { id: 'neutral-stone', amount: 1 },
      { id: 'crystals', amount: 1000, type: 'currency' },
    ],
    rewards: [{ type: 'item', targetId: stone.outputId, quantity: 1, dropChance: 100 }],
    outputQuantity: { min: 1, max: 1 },
    qualityOutputQuantity: { perfect: 1 },
    minimumQuality: 'perfect',
    iconItemId: stone.outputId,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'elemental-stones-recipe',
      },
    ],
  }),
)

const CONCENTRATED_ELEMENT_RECIPES: ArtisanRecipeDraft[] = [
  {
    id: 'craft-concentrated-fire',
    name: 'Concentrated Fire',
    description: 'Refine a lifeless fire stone with Rainbow Feather energy and dense PokePowder.',
    artisanLevel: 50,
    costs: [
      { id: 'rainbow-feather', amount: 1 },
      { id: 'poke-powder-m', amount: 100 },
      { id: 'lifeless-fire', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'concentrated-fire', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    outputQuantity: { min: 1, max: 1 },
    iconItemId: 'concentrated-fire',
    requirements: [
      { type: 'task_completed', targetId: 'beast-stones-fire' },
      { type: 'item_owned', targetId: 'concentrated-fire', inverse: true },
    ],
  },
  {
    id: 'craft-concentrated-thunder',
    name: 'Concentrated Thunder',
    description: 'Refine a lifeless thunder stone with Rainbow Feather energy and dense PokePowder.',
    artisanLevel: 50,
    costs: [
      { id: 'rainbow-feather', amount: 1 },
      { id: 'poke-powder-m', amount: 100 },
      { id: 'lifeless-thunder', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'concentrated-thunder', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    outputQuantity: { min: 1, max: 1 },
    iconItemId: 'concentrated-thunder',
    requirements: [
      { type: 'task_completed', targetId: 'beast-stones-thunder' },
      { type: 'item_owned', targetId: 'concentrated-thunder', inverse: true },
    ],
  },
  {
    id: 'craft-concentrated-water',
    name: 'Concentrated Water',
    description: 'Refine a lifeless water stone with Rainbow Feather energy and dense PokePowder.',
    artisanLevel: 50,
    costs: [
      { id: 'rainbow-feather', amount: 1 },
      { id: 'poke-powder-m', amount: 100 },
      { id: 'lifeless-water', amount: 1 },
    ],
    rewards: [{ type: 'item', targetId: 'concentrated-water', quantity: 1, dropChance: 100 }],
    craftType: 'mix',
    outputQuantity: { min: 1, max: 1 },
    iconItemId: 'concentrated-water',
    requirements: [
      { type: 'task_completed', targetId: 'beast-stones-water' },
      { type: 'item_owned', targetId: 'concentrated-water', inverse: true },
    ],
  },
]

const CONCENTRATED_BRANCH_RECIPES: ArtisanRecipeDraft[] = [
  {
    id: 'craft-concentrated-flaming-branch',
    name: 'Concentrated Flaming Branch',
    description: 'Refine a lifeless flaming branch with Silver Feather energy and dense PokePowder.',
    artisanLevel: 35,
    costs: [
      { id: 'silver-feather', amount: 1 },
      { id: 'poke-powder-s', amount: 100 },
      { id: 'lifeless-flaming-branch', amount: 1 },
    ],
    rewards: [
      { type: 'item', targetId: 'concentrated-flaming-branch', quantity: 1, dropChance: 100 },
    ],
    craftType: 'mix',
    outputQuantity: { min: 1, max: 1 },
    iconItemId: 'concentrated-flaming-branch',
    requirements: [
      { type: 'task_completed', targetId: 'bird-branches-flaming' },
      { type: 'item_owned', targetId: 'concentrated-flaming-branch', inverse: true },
    ],
  },
  {
    id: 'craft-concentrated-charged-branch',
    name: 'Concentrated Charged Branch',
    description: 'Refine a lifeless charged branch with Silver Feather energy and dense PokePowder.',
    artisanLevel: 35,
    costs: [
      { id: 'silver-feather', amount: 1 },
      { id: 'poke-powder-s', amount: 100 },
      { id: 'lifeless-charged-branch', amount: 1 },
    ],
    rewards: [
      { type: 'item', targetId: 'concentrated-charged-branch', quantity: 1, dropChance: 100 },
    ],
    craftType: 'mix',
    outputQuantity: { min: 1, max: 1 },
    iconItemId: 'concentrated-charged-branch',
    requirements: [
      { type: 'task_completed', targetId: 'bird-branches-charged' },
      { type: 'item_owned', targetId: 'concentrated-charged-branch', inverse: true },
    ],
  },
  {
    id: 'craft-concentrated-frozen-branch',
    name: 'Concentrated Frozen Branch',
    description: 'Refine a lifeless frozen branch with Silver Feather energy and dense PokePowder.',
    artisanLevel: 35,
    costs: [
      { id: 'silver-feather', amount: 1 },
      { id: 'poke-powder-s', amount: 100 },
      { id: 'lifeless-frozen-branch', amount: 1 },
    ],
    rewards: [
      { type: 'item', targetId: 'concentrated-frozen-branch', quantity: 1, dropChance: 100 },
    ],
    craftType: 'mix',
    outputQuantity: { min: 1, max: 1 },
    iconItemId: 'concentrated-frozen-branch',
    requirements: [
      { type: 'task_completed', targetId: 'bird-branches-frozen' },
      { type: 'item_owned', targetId: 'concentrated-frozen-branch', inverse: true },
    ],
  },
]

const QUEST_RECIPES: ArtisanRecipeDraft[] = [
  ...CONCENTRATED_ELEMENT_RECIPES,
  ...CONCENTRATED_BRANCH_RECIPES,
  {
    id: 'craft-tiny-bug-armour',
    name: 'Tiny Bug Armour',
    description: 'Fasten tiny chitin plates into ceremonial armour for the swarm.',
    artisanLevel: 6,
    costs: [
      { id: 'chitin-fragment-t1', amount: 3 },
      { id: 'poke-powder-xs', amount: 2 },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'tiny-bug-armour',
        quantity: 1,
        dropChance: 100,
      },
    ],
    craftType: 'scatter',
    outputQuantity: { min: 1, max: 1 },
    iconItemId: 'tiny-bug-armour',
    minimumQuality: 'good',
    materialFailQualities: ['bad'],
    bulk: 10,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bug-maniac-trade-3',
      },
      {
        type: 'item_owned',
        targetId: 'binder-base2',
      },
    ],
  },
  {
    id: 'craft-day-care-fence',
    name: 'Sturdy Fence',
    description: 'Build a sturdy Day Care fence panel from Grass-type wood scraps.',
    artisanLevel: 12,
    costs: [{ id: 'wood-scraps-t1', amount: 2 }],
    rewards: [
      {
        type: 'item',
        targetId: 'day-care-fence-wood',
        quantity: 1,
        dropChance: 100,
      },
    ],
    outputQuantity: { min: 1, max: 1 },
    iconItemId: 'day-care-fence-wood',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-intro',
      },
      {
        type: 'task_completed',
        targetId: 'day-care-fixing-the-fence',
        inverse: true,
      },
      {
        type: 'item_owned',
        targetId: 'day-care-fence-wood',
        count: 5,
        inverse: true,
      },
    ],
  },
  {
    id: 'craft-day-care-clay-brick',
    name: 'Kiln-Fired Brick',
    description: 'Fire soft clay in the Day Care kiln with Magby watching the heat.',
    artisanLevel: 15,
    costs: [{ id: 'terra-dust-t1', amount: 1 }],
    rewards: [
      {
        type: 'item',
        targetId: 'day-care-clay-brick',
        quantity: 1,
        dropChance: 100,
      },
    ],
    craftType: 'mix',
    outputQuantity: { min: 1, max: 2 },
    qualityOutputQuantity: { good: 1, perfect: 2 },
    iconItemId: 'day-care-clay-brick',
    minimumQuality: 'good',
    materialFailQualities: ['bad'],
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-building-repairs',
      },
      {
        type: 'task_completed',
        targetId: 'day-care-firing-the-bricks',
        inverse: true,
      },
      {
        type: 'item_owned',
        targetId: 'day-care-clay-brick',
        count: 100,
        inverse: true,
      },
    ],
  },
  {
    id: 'craft-hiker-clothes',
    name: 'Trail Clothes',
    description: 'Stitch warm, flexible trail clothes for crossing Route 9 Pass.',
    artisanLevel: 15,
    costs: [
      { id: 'soft-fluff-t1', amount: 10 },
      { id: 'wing-feather-t1', amount: 6 },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'hiker-clothes',
        quantity: 1,
        dropChance: 100,
      },
    ],
    craftType: 'precise',
    outputQuantity: { min: 1, max: 1 },
    iconItemId: 'hiker-clothes',
    minimumQuality: 'good',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-trail-clothes',
      },
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
        inverse: true,
      },
      {
        type: 'item_owned',
        targetId: 'hiker-clothes',
        count: 1,
        inverse: true,
      },
    ],
  },
  {
    id: 'craft-trainers-glove',
    name: "Trainer's Glove",
    description:
      'Patch a trainer glove with soft Route 1 fluff. It will not win fashion awards, but your hand might survive.',
    artisanLevel: 1,
    costs: [{ id: 'soft-fluff-t1', amount: 1 }],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'pallet-artisan-glove-crafted',
        quantity: 1,
        dropChance: 100,
      },
    ],
    primaryOutputRewardIndex: null,
    iconItemId: 'soft-fluff-t1',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'tutorial-16',
      },
      {
        type: 'task_completed',
        targetId: 'pallet-artisan-glove-crafted',
        inverse: true,
      },
    ],
  },
]

export const kantoArtisanRecipes: ArtisanRecipe[] = [
  ...withCraftDefaults('materials', paintRecipes),
  ...withCraftDefaults('materials', DRIED_DYE_RECIPES),
  ...withCraftDefaults('materials', POKE_POWDER_RECIPES),
  ...withCraftDefaults(
    'balls',
    BALL_RECIPES.map((recipe) =>
      withBallManualRequirement({
        ...(recipe.id === 'craft-poke-ball' ? recipe : withPokePowderCost(recipe)),
        bulk: 3,
      }),
    ),
  ),
  ...withCraftDefaults('lures', LURE_RECIPES),
  ...withCraftDefaults('held', [...HELD_RECIPES, ...ELEMENTAL_STONE_HELD_RECIPES]),
  ...withCraftDefaults('items', ITEM_RECIPES),
  ...withCraftDefaults('quests', QUEST_RECIPES),
]
