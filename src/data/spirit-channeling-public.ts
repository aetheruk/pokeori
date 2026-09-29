import type { PokemonTypeName } from '@/data/items/types'
import { FUJI_GLASSES_ITEM_ID } from '@/data/items/special-item-ids'

export const BOOK_OF_CHANNELING_ITEM_ID = 'book-of-channeling'
export const SPIRIT_CHANNELING_ACTIVITY_PREFIX = 'spirit-channeling'

// This module contains only information that is safe to include in client bundles.
// Correct incense, offerings, channeler requirements, and rewards live in
// spirit-channeling.ts, which is imported by server code only.
export const SPIRIT_CHANNELING_MEMENTO_ITEM_IDS = [
  FUJI_GLASSES_ITEM_ID,
  'badge-kanto-boulder',
  'badge-kanto-cascade',
  'badge-kanto-thunder',
  'badge-kanto-rainbow',
  'badge-kanto-soul',
  'badge-kanto-marsh',
  'badge-kanto-volcano',
  'badge-kanto-earth',
  ...Array.from({ length: 8 }, (_, index) => `golden-scale-${index + 1}`),
] as const

export function getSpiritChannelingActivityIdForMemento(
  mementoItemId: string,
): string {
  return `${SPIRIT_CHANNELING_ACTIVITY_PREFIX}:${mementoItemId}`
}

export function isSpiritChannelingMementoItem(itemId: string): boolean {
  return (SPIRIT_CHANNELING_MEMENTO_ITEM_IDS as readonly string[]).includes(
    itemId,
  )
}

export const SPIRIT_CHANNELING_INCENSE_ITEMS = [
  {
    id: 'incense-boon',
    name: 'Boon Incense',
    description: 'A reusable incense for quiet ritual work.',
    spriteId: 'key/incense-boon',
  },
  {
    id: 'incense-exploration',
    name: 'Exploration Incense',
    description: 'A reusable incense for seeking distant traces.',
    spriteId: 'key/incense-exploration',
  },
  {
    id: 'incense-fishers',
    name: "Fisher's Incense",
    description: 'A reusable incense with a briny, patient scent.',
    spriteId: 'key/incense-fishers',
  },
  {
    id: 'incense-fortune',
    name: 'Fortune Incense',
    description: 'A reusable incense for reading lucky signs.',
    spriteId: 'key/incense-fortune',
  },
  {
    id: 'incense-macabre',
    name: 'Macabre Incense',
    description: 'A reusable incense with a heavy, spectral smoke.',
    spriteId: 'key/incense-macabre',
  },
  {
    id: 'incense-memory',
    name: 'Memory Incense',
    description: 'A reusable incense for calling echoes from old keepsakes.',
    spriteId: 'key/incense-memory',
  },
  {
    id: 'incense-strange',
    name: 'Strange Incense',
    description: 'A reusable incense whose smoke curls in odd patterns.',
    spriteId: 'key/incense-strange',
  },
  {
    id: 'incense-tracking',
    name: 'Tracking Incense',
    description: 'A reusable incense for following faint trails.',
    spriteId: 'key/incense-tracking',
  },
] as const

export type SpiritChannelingIncenseItemId =
  (typeof SPIRIT_CHANNELING_INCENSE_ITEMS)[number]['id']

export type SpiritChannelingEnergy = Partial<Record<PokemonTypeName, number>>

export const FISHER_SECRET_BOOKS = [
  {
    itemId: 'fishers-secret-1',
    name: "Fisher's Secret 1",
    description:
      "Hey Frank, I'm not sure this is a great idea. Shouldn't we be more inclusive? How many of those things did you make anyway?",
  },
  {
    itemId: 'fishers-secret-2',
    name: "Fisher's Secret 2",
    description:
      'Dont worry about that Fred, I have it all under control. Besides we need to attract the right crowd we dont want just everyone turning up.',
  },
  {
    itemId: 'fishers-secret-3',
    name: "Fisher's Secret 3",
    description:
      'So were just going to wait around on the off chance we bump into someone with 8 golden scales?',
  },
  {
    itemId: 'fishers-secret-4',
    name: "Fisher's Secret 4",
    description:
      'Dont be ridiculous Fred Ive got better things to be doing with my time, youre going to wait around 5 minutes each day on your way in.',
  },
  {
    itemId: 'fishers-secret-5',
    name: "Fisher's Secret 5",
    description:
      'You expect me to loiter around Vermilion Harbor at 5am every day?... I suppose it cant be helped, but how will i know the difference between a candidate and a potential mugger?',
  },
  {
    itemId: 'fishers-secret-6',
    name: "Fisher's Secret 6",
    description:
      'Hells bells Fred do I have to think of everything myself? I imagine theyll probably be traveling with a strong solid partner',
  },
  {
    itemId: 'fishers-secret-7',
    name: "Fisher's Secret 7",
    description: 'Like a Magikarp?',
  },
  {
    itemId: 'fishers-secret-8',
    name: "Fisher's Secret 8",
    description:
      'Exactly! now give me a hand dumping these scales in the sea! Right-o Frank',
  },
] as const

export type SpiritChannelerRequirement = {
  channelerMinLevel: number
} & (
  | {
      channelerType?: never
      channelerFormId?: never
    }
  | {
      channelerType: PokemonTypeName
      channelerFormId?: never
    }
  | {
      channelerType?: never
      channelerFormId: string
    }
)

export interface SpiritChannelingOfferingItem {
  itemId: string
  type: PokemonTypeName
  energy: number
  kind: 'material' | 'gem'
}

export interface SpiritChannelingOfferingSelection {
  itemId: string
  quantity: number
}

export function hasDuplicateSpiritChannelingOfferings(
  offerings: SpiritChannelingOfferingSelection[],
): boolean {
  const itemIds = offerings.map((offering) => offering.itemId)
  return new Set(itemIds).size !== itemIds.length
}

export const POKEMON_TYPE_NAMES: PokemonTypeName[] = [
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

const MATERIAL_FAMILY_BY_TYPE: Partial<Record<PokemonTypeName, string>> = {
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

export const SPIRIT_CHANNELING_OFFERING_ITEMS: SpiritChannelingOfferingItem[] =
  POKEMON_TYPE_NAMES.flatMap((type) => {
    const materialFamily = MATERIAL_FAMILY_BY_TYPE[type]
    const offerings: SpiritChannelingOfferingItem[] = [
      {
        itemId: `${type}-gem`,
        type,
        energy: 3,
        kind: 'gem',
      },
    ]

    if (materialFamily) {
      offerings.unshift({
        itemId: `${materialFamily}-t1`,
        type,
        energy: 1,
        kind: 'material',
      })
    }

    return offerings
  })

export const SPIRIT_CHANNELING_OFFERING_BY_ITEM_ID = new Map(
  SPIRIT_CHANNELING_OFFERING_ITEMS.map((offering) => [
    offering.itemId,
    offering,
  ]),
)

export function getSpiritChannelingOffering(itemId: string) {
  return SPIRIT_CHANNELING_OFFERING_BY_ITEM_ID.get(itemId)
}

export function getSpiritChannelingOfferedEnergy(
  offerings: SpiritChannelingOfferingSelection[],
): SpiritChannelingEnergy | null {
  const energy: SpiritChannelingEnergy = {}

  for (const selection of offerings) {
    const offering = getSpiritChannelingOffering(selection.itemId)
    if (
      !offering ||
      !Number.isInteger(selection.quantity) ||
      selection.quantity < 1
    ) {
      return null
    }
    energy[offering.type] =
      (energy[offering.type] || 0) + offering.energy * selection.quantity
  }

  return energy
}

export function normalizeSpiritChannelingEnergy(
  energy: SpiritChannelingEnergy,
): SpiritChannelingEnergy {
  return Object.fromEntries(
    Object.entries(energy).filter(([, amount]) => Number(amount || 0) > 0),
  ) as SpiritChannelingEnergy
}

export function getSpiritChannelingEnergyClue(
  requiredEnergy: SpiritChannelingEnergy,
  offeredEnergy: SpiritChannelingEnergy,
): string | null {
  const required = normalizeSpiritChannelingEnergy(requiredEnergy)
  const offered = normalizeSpiritChannelingEnergy(offeredEnergy)

  for (const type of POKEMON_TYPE_NAMES) {
    if ((offered[type] || 0) > 0 && (required[type] || 0) <= 0) {
      return `The spirits are not interested in ${formatPokemonType(type)} offerings.`
    }
  }

  for (const type of POKEMON_TYPE_NAMES) {
    if ((offered[type] || 0) < (required[type] || 0)) {
      return `The spirits require more ${formatPokemonType(type)} offerings.`
    }
  }

  for (const type of POKEMON_TYPE_NAMES) {
    if ((offered[type] || 0) > (required[type] || 0)) {
      return `The spirits are overwhelmed by ${formatPokemonType(type)} offerings.`
    }
  }

  return null
}

export function doesSpiritChannelingEnergyMatch(
  requiredEnergy: SpiritChannelingEnergy,
  offeredEnergy: SpiritChannelingEnergy,
): boolean {
  return getSpiritChannelingEnergyClue(requiredEnergy, offeredEnergy) === null
}

function formatPokemonType(type: PokemonTypeName): string {
  return `${type[0].toUpperCase()}${type.slice(1)}`
}
