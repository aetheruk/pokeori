import { NatureName } from '../natures'
import type { BattleAiUseConfig } from '../battle-ai'

export type ItemSkillId = 'catching' | 'battling' | 'researching' | 'artisan' | 'ranked-battling'
export type ItemSkillRequirements = Partial<Record<ItemSkillId, number>>

export type PokemonStatType =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'
export type BattleStatType = Exclude<PokemonStatType, 'hp'>
export type PokemonTypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'

export interface BattleEffect {
  type:
    | 'heal'
    | 'buff'
    | 'tera'
    | 'reveal-stance'
    | 'z-move'
    | 'damage-block'
    | 'ev-training'
    | 'type-damage-boost'
    | 'attack-status-chance'
    | 'item-charge'
  healAmount?: number // For potions - flat HP restore
  healFull?: boolean // For Max Potion - restore to full
  buffStat?: BattleStatType | 'crit' // Which stat to buff
  buffStages?: number // How many stages (+1 typically)
  teraType?: PokemonTypeName // Legacy Tera battle effect payload
  skipsTurn?: boolean // Whether using this item skips the player's attack (default: true)
  zMoveStance?: 'power' | 'speed' | 'tech' // Legacy stance-specific Z-Move item data
  clearStatus?: string | string[] | 'all' // Status ID to clear, array of IDs, or 'all'
  blockAmount?: number // For held items that prevent a fixed amount of incoming damage
  trainingStat?: PokemonStatType // For held training bands
  statPenaltyPercent?: number // Battle stat reduction while held
  evAmount?: number // EVs granted on battle success
  pokemonType?: PokemonTypeName // Holder type required for held offensive effects
  attackType?: PokemonTypeName // Attack type required for held offensive effects
  damageMultiplier?: number // Damage multiplier for held offensive effects
  statusId?: string // Status applied by held offensive effects
  statusChance?: number // Percent chance for held offensive status effects
  chargeOn?: 'hit-by-type' | 'damage-during-time' // How a held charge item gains charge
  chargeAmount?: number // Percent charge gained per matching trigger
  maxCharge?: number // Percent charge required for the outcome
  rewardItemId?: string // Item granted when max charge is reached
  rewardWindows?: {
    startHour: number
    endHour: number
    rewardItemId: string
  }[] // Optional time windows that override the default max-charge reward
  chargeActiveWindow?: {
    startHour: number
    endHour: number
  } // Optional local time window when damage can add charge
  consumeHeldItem?: boolean // Whether max charge removes the held item
}

export type HeldItemTrigger =
  | {
      type: 'hp-at-or-below'
      thresholdPercent: number
    }
  | {
      type: 'status'
      status: string | string[] | 'all'
    }
  | {
      type: 'permanent'
    }

export interface HeldItemConfig {
  trigger: HeldItemTrigger
  consumeOnUse: boolean
  consumeChance?: number
  consumeTrigger?: 'activation' | 'battle-win' | 'attack'
  effect: BattleEffect
}

export interface Item {
  id: string
  name: string
  description: string
  category:
    | 'ball'
    | 'potion'
    | 'key'
    | 'evolution'
    | 'vitamin'
    | 'candy'
    | 'battle'
    | 'badge'
    | 'Binder'
    | 'valuable'
    | 'tm'
    | 'scratch-card'
    | 'berry'
    | 'ability-patch'
    | 'booster-pack'
    | 'books'
    | 'misc'
  berryPower?: number
  spriteId?: string
  hueRotate?: number
  unique?: boolean
  skillRequirements?: ItemSkillRequirements
  moveId?: string // Link to a MoveConfig id for TMs
  scratchCardId?: string // Link to a ScratchCardConfig id
  effects?: {
    teachAbility?: string // ID of ability to teach
    usableByForms?: string[] // Only usable on these Form IDs
    usableByTypes?: PokemonTypeName[] // Only usable on Pokemon with one of these types
    increaseEv?: {
      stat: 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed'
      amount: number
    }
    decreaseEv?: {
      stat: 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed'
      amount: number
    }
    increaseLevel?: number
    maxLevel?: number // Item can only be used if pokemon level is less than or equal to this (actually, usually it's "less than", but let's define it as "up to this level")
    minLevel?: number
    changeNature?: NatureName
    changeForm?: {
      transitions: {
        fromFormId: string
        toFormId: string
      }[]
      label?: string
    }
    fusePokemon?: {
      baseFormId: string
      fusions: {
        partnerFormId: string
        fusedFormId: string
        label?: string
      }[]
      label?: string
    }
    setTeraType?: PokemonTypeName
    maximizeIv?: boolean // Sets all IVs to 31
    maximizeOneIv?: boolean // Sets one chosen IV to 31
    increaseFriendship?: number // Increases friendship by this amount
    encounterSecondChanceModifier?: number // Adds percentage points to capture second-chance rolls
    grantSkillXp?: {
      // Grants experience in a specific skill
      skill: 'catching' | 'battling' | 'researching' | 'artisan' | 'ranked-battling'
      amount: number
    }
    startBattle?: {
      id: string
      minLevel?: number
    }
    startEncounter?: {
      id: string
      minLevel?: number
    }
    startMinigame?: {
      id: string
      minLevel?: number
    }
    startResearch?: {
      id: string
      minLevel?: number
    }
    grantPokemonResearchXp?: {
      formId?: string
      amount: number | { min: number; max: number }
      minSkillLevel?: number
    }
  }
  battleEffect?: BattleEffect // New: for battle-usable items
  enemyBattleUse?: BattleAiUseConfig
  heldConfig?: HeldItemConfig
  sellValue?: number
  sellCurrency?: string // defaults to 'pokedollars' if undefined
  consume?: boolean // if false, the item is not consumed when used
  boosterPack?: {
    setId: string
    cardsPerPack: number
  }
}

export const ITEM_CATEGORY_LABELS: Record<string, string> = {
  ball: 'Poké Balls',
  potion: 'Potions',
  key: 'Key Items',
  evolution: 'Evolution',
  vitamin: 'Vitamins',
  candy: 'Candies',
  battle: 'Battle Items',
  badge: 'Badges',
  Binder: 'TCG Binders',
  'booster-pack': 'Booster Packs',
  valuable: 'Valuables',
  tm: 'TMs',
  'scratch-card': 'Scratchcards',
  berry: 'Berries',
  'ability-patch': 'Ability Patches',
  books: 'Books',
  misc: 'Miscellaneous',
}

export type InventoryDisplayGroup =
  | 'encounter'
  | 'crafting'
  | 'tcg'
  | 'key-items'
  | 'tms'
  | 'training'
  | 'misc'

export type InventoryDisplaySubCategory =
  | 'capture-tools'
  | 'battle-kit'
  | 'encounter-tools'
  | 'candies'
  | 'berries'
  | 'materials'
  | 'binders'
  | 'booster-packs'
  | 'key-items'
  | 'badges'
  | 'evolution-items'
  | 'tms'
  | 'vitamins'
  | 'ability-patches'
  | 'scratch-cards'
  | 'books'
  | 'other'

export const INVENTORY_GROUP_LABELS: Record<InventoryDisplayGroup, string> = {
  encounter: 'Encounter',
  crafting: 'Crafting',
  tcg: 'TCG',
  'key-items': 'Key Items',
  tms: 'TMs/HMs',
  training: 'Training',
  misc: 'Misc',
}

export const INVENTORY_SUBCATEGORY_LABELS: Record<InventoryDisplaySubCategory, string> = {
  'capture-tools': 'Capture Tools',
  'battle-kit': 'Battle & Recovery',
  'encounter-tools': 'Lures & Escape',
  candies: 'Candies',
  berries: 'Berries',
  materials: 'Materials',
  binders: 'Binders',
  'booster-packs': 'Booster Packs',
  'key-items': 'Key Items',
  badges: 'Badges',
  'evolution-items': 'Evolution',
  tms: 'TMs',
  vitamins: 'Vitamins',
  'ability-patches': 'Ability Patches',
  'scratch-cards': 'Scratch Cards',
  books: 'Books',
  other: 'Other',
}

export const INVENTORY_GROUP_ORDER: InventoryDisplayGroup[] = [
  'encounter',
  'crafting',
  'tcg',
  'key-items',
  'tms',
  'training',
  'misc',
]

export const INVENTORY_SUBCATEGORY_ORDER: Record<
  InventoryDisplayGroup,
  InventoryDisplaySubCategory[]
> = {
  encounter: ['capture-tools', 'battle-kit', 'encounter-tools'],
  crafting: ['materials'],
  tcg: ['binders', 'booster-packs'],
  'key-items': ['key-items', 'badges', 'books'],
  tms: ['tms'],
  training: ['candies', 'berries', 'evolution-items', 'vitamins', 'ability-patches'],
  misc: ['scratch-cards', 'other'],
}

const POKEMON_TYPE_NAMES = new Set<PokemonTypeName>([
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
])

export const PRE_ENCOUNTER_ONLY_ITEM_IDS = new Set([
  'repel',
  'super-repel',
  'max-repel',
])

const MID_ENCOUNTER_UTILITY_ITEMS = new Set(['escape-rope', 'chaos-stone'])

const ENCOUNTER_UTILITY_ITEMS = new Set([
  'escape-rope',
  'repel',
  'super-repel',
  'max-repel',
  'chaos-stone',
])

const ARTISAN_MATERIAL_PREFIXES = [
  'wood-scraps-',
  'broken-ball-',
  'soft-fluff-',
  'wing-feather-',
  'metal-scrap-',
  'electric-component-',
  'aqua-solvent-',
  'cinder-shard-',
  'frost-crystal-',
  'grip-weave-',
  'toxic-resin-',
  'terra-dust-',
  'mind-thread-',
  'chitin-fragment-',
  'small-stone-',
  'spirit-wisp-',
  'drake-scale-',
  'shadow-fiber-',
  'pixie-powder-',
  'poke-powder-',
  'paint-',
  'nut-',
] as const

export function getTypeLureType(itemId: string): PokemonTypeName | null {
  if (!itemId.endsWith('-lure')) return null

  const type = itemId
    .replace('-lure', '')
    .replace(/^advanced-/, '')
    .replace(/^master-/, '')
  return POKEMON_TYPE_NAMES.has(type as PokemonTypeName) ? (type as PokemonTypeName) : null
}

export function getTypeLureTier(itemId: string): 1 | 2 | 3 {
  if (itemId.startsWith('master-')) return 3
  if (itemId.startsWith('advanced-')) return 2
  return 1
}

export function getTypeLureAnswerEquivalent(itemId: string): number {
  const tier = getTypeLureTier(itemId)
  if (tier === 3) return 5
  if (tier === 2) return 3.5
  return 2.5
}

export function isTypeLureItem(item: Pick<Item, 'id' | 'category'>): boolean {
  return item.category === 'misc' && getTypeLureType(item.id) !== null
}

export function getEncounterSecondChanceModifier(
  item: Pick<Item, 'effects'>,
): number {
  return item.effects?.encounterSecondChanceModifier || 0
}

export function isSecondChanceEncounterItem(
  item: Pick<Item, 'effects'>,
): boolean {
  return getEncounterSecondChanceModifier(item) > 0
}

export function isPreEncounterOnlyItem(item: Pick<Item, 'id'>): boolean {
  return PRE_ENCOUNTER_ONLY_ITEM_IDS.has(item.id)
}

export function isMidEncounterUsableItem(
  item: Pick<Item, 'id' | 'category' | 'effects'>,
): boolean {
  if (isSecondChanceEncounterItem(item)) return true
  return item.category === 'misc' && (MID_ENCOUNTER_UTILITY_ITEMS.has(item.id) || isTypeLureItem(item))
}

export function isEncounterUtilityItem(
  item: Pick<Item, 'id' | 'category' | 'effects'>,
): boolean {
  if (isSecondChanceEncounterItem(item)) return true
  return item.category === 'misc' && (isTypeLureItem(item) || ENCOUNTER_UTILITY_ITEMS.has(item.id))
}

export function isEncounterItemUsableForPokemon(
  item: Pick<Item, 'id' | 'category'>,
  pokemonTypes: string[] = [],
): boolean {
  const lureType = isTypeLureItem(item) ? getTypeLureType(item.id) : null
  if (!lureType) return true

  return pokemonTypes.some((type) => type.toLowerCase() === lureType)
}

export function isCraftingMaterialItem(item: Pick<Item, 'id' | 'category'>): boolean {
  if (item.category === 'tm') return false
  if (item.id.endsWith('-gem')) return true
  return ARTISAN_MATERIAL_PREFIXES.some((prefix) => item.id.startsWith(prefix))
}

export function getInventoryDisplayPlacement(item: Item): {
  group: InventoryDisplayGroup
  subCategory: InventoryDisplaySubCategory
} {
  if (isCraftingMaterialItem(item)) {
    return { group: 'crafting', subCategory: 'materials' }
  }

  switch (item.category) {
    case 'ball':
      return { group: 'encounter', subCategory: 'capture-tools' }
    case 'potion':
    case 'battle':
      return { group: 'encounter', subCategory: 'battle-kit' }
    case 'candy':
      return { group: 'training', subCategory: 'candies' }
    case 'berry':
      return { group: 'training', subCategory: 'berries' }
    case 'Binder':
      return { group: 'tcg', subCategory: 'binders' }
    case 'booster-pack':
      return { group: 'tcg', subCategory: 'booster-packs' }
    case 'key':
      if (item.moveId) return { group: 'tms', subCategory: 'tms' }
      return { group: 'key-items', subCategory: 'key-items' }
    case 'badge':
      return { group: 'key-items', subCategory: 'badges' }
    case 'evolution':
      return { group: 'training', subCategory: 'evolution-items' }
    case 'tm':
      return { group: 'tms', subCategory: 'tms' }
    case 'valuable':
      return { group: 'misc', subCategory: 'other' }
    case 'vitamin':
      return { group: 'training', subCategory: 'vitamins' }
    case 'ability-patch':
      return { group: 'training', subCategory: 'ability-patches' }
    case 'scratch-card':
      return { group: 'misc', subCategory: 'scratch-cards' }
    case 'books':
      return { group: 'key-items', subCategory: 'books' }
    case 'misc':
      return isEncounterUtilityItem(item)
        ? { group: 'encounter', subCategory: 'encounter-tools' }
        : { group: 'misc', subCategory: 'other' }
    default:
      return { group: 'misc', subCategory: 'other' }
  }
}

export function getInventorySubCategoryLabel(subCategory: string): string {
  return INVENTORY_SUBCATEGORY_LABELS[subCategory as InventoryDisplaySubCategory] || 'Other'
}
