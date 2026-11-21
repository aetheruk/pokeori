import type { PokemonTypeName } from '@/data/items/types'
import { FUJI_GLASSES_ITEM_ID } from '@/data/items/special-item-ids'

export const BOOK_OF_CHANNELING_ITEM_ID = 'book-of-channeling'
export const SPIRIT_CHANNELING_ACTIVITY_PREFIX = 'spirit-channeling'

export interface FortuneChannelingContent {
  mementoItemId: string
  trainerIconId: string
  background: string
  bookItemId: string
  bookName: string
  bookDescription: string
  taskId: string
  taskName: string
  taskDescription: string
  subCategory: string
  payout: number
  exitTitle: string
  exitMessage: string
  closeButtonText: string
}

export const FORTUNE_CHANNELING_CONTENT: FortuneChannelingContent[] = [
  {
    mementoItemId: 'nugget',
    trainerIconId: 'pokefan-m',
    background: '/backgrounds/cerulean.avif',
    bookItemId: 'fortune-book-gilded-life',
    bookName: 'Fortune: Gilded Life',
    bookDescription:
      'Gold brings luck to the one who knows where it belongs. On Cerulean’s bridge, a collector waits for a Nugget to turn a small fortune into a larger one.',
    taskId: 'fortune-exchange-nugget',
    taskName: 'Fortune: Nugget',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Nugget here.',
    subCategory: 'Cerulean City',
    payout: 5000,
    exitTitle: 'A Gilded Deal',
    exitMessage:
      'Not bad 5,000 Pokedollars for a Nugget I’ll be rich in no time!',
    closeButtonText: 'Take the Payment',
  },
  {
    mementoItemId: 'big-nugget',
    trainerIconId: 'rich-boy',
    background: '/backgrounds/celadon-game-corner-prize-exchange.avif',
    bookItemId: 'fortune-book-golden-life',
    bookName: 'Fortune: Golden Life',
    bookDescription:
      'A great weight of gold deserves a great welcome. Seek the buyer at Celadon Game Corner; a Big Nugget will earn a generous offer.',
    taskId: 'fortune-exchange-big-nugget',
    taskName: 'Fortune: Big Nugget',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Big Nugget here.',
    subCategory: 'Celadon Game Corner',
    payout: 20000,
    exitTitle: 'A Golden Offer',
    exitMessage:
      'Not bad 20,000 Pokedollars for a Big Nugget I’ll be rich in no time!',
    closeButtonText: 'Take the Payment',
  },
  {
    mementoItemId: 'pearl',
    trainerIconId: 'sailor',
    background: '/backgrounds/vermillion.avif',
    bookItemId: 'fortune-book-aquatic-gift',
    bookName: 'Fortune: Aquatic Gift',
    bookDescription:
      'The sea gives small treasures to patient hands. At Vermilion Harbor, a trader listens for the clink of a Pearl brought in from the water.',
    taskId: 'fortune-exchange-pearl',
    taskName: 'Fortune: Pearl',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Pearl here.',
    subCategory: 'Vermilion City',
    payout: 700,
    exitTitle: 'A Harbor Exchange',
    exitMessage:
      'Not bad 700 Pokedollars for a Pearl I’ll be rich in no time!',
    closeButtonText: 'Take the Payment',
  },
  {
    mementoItemId: 'big-pearl',
    trainerIconId: 'beauty',
    background: '/backgrounds/artisan-workshop.avif',
    bookItemId: 'fortune-book-aquatic-blessing',
    bookName: 'Fortune: Aquatic Blessing',
    bookDescription:
      'A pearl fit for a queen should find a worthy setting. Look for the Fuchsia artisan near the Safari Zone; a Big Pearl will earn a generous offer.',
    taskId: 'fortune-exchange-big-pearl',
    taskName: 'Fortune: Big Pearl',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Big Pearl here.',
    subCategory: 'Fuchsia City',
    payout: 3750,
    exitTitle: 'A Rare Find',
    exitMessage:
      'Not bad 3,750 Pokedollars for a Big Pearl I’ll be rich in no time!',
    closeButtonText: 'Take the Payment',
  },
  {
    mementoItemId: 'stardust',
    trainerIconId: 'psychic-f',
    background: '/backgrounds/lavender.avif',
    bookItemId: 'fortune-book-skys-boon',
    bookName: 'Fortune: Skys Boon',
    bookDescription:
      'A star’s dust is still a piece of the sky. The sky watcher in Lavender Town keeps a little fund for Stardust brought in for study.',
    taskId: 'fortune-exchange-stardust',
    taskName: 'Fortune: Stardust',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Stardust here.',
    subCategory: 'Lavender Town',
    payout: 1000,
    exitTitle: 'A Piece of the Sky',
    exitMessage:
      'Not bad 1,000 Pokedollars for a Stardust I’ll be rich in no time!',
    closeButtonText: 'Take the Payment',
  },
  {
    mementoItemId: 'star-piece',
    trainerIconId: 'gamer',
    background: '/backgrounds/celadon-game-corner-prize-exchange.avif',
    bookItemId: 'fortune-book-skys-gift',
    bookName: 'Fortune: Skys Gift',
    bookDescription:
      'A fallen star’s bright fragment belongs in careful hands. At Celadon Game Corner, ask the collector who buys Star Pieces.',
    taskId: 'fortune-exchange-star-piece',
    taskName: 'Fortune: Star Piece',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Star Piece here.',
    subCategory: 'Celadon Game Corner',
    payout: 4900,
    exitTitle: 'A Star’s Worth',
    exitMessage:
      'Not bad 4,900 Pokedollars for a Star Piece I’ll be rich in no time!',
    closeButtonText: 'Take the Payment',
  },
  {
    mementoItemId: 'rare-bone',
    trainerIconId: 'researcher-f',
    background: '/backgrounds/museum.avif',
    bookItemId: 'fortune-book-earths-blessing',
    bookName: 'Fortune: Earths Blessing',
    bookDescription:
      'The earth keeps its oldest treasures beneath the stone. Show a Rare Bone to the Pewter museum researcher; their study fund rewards good finds.',
    taskId: 'fortune-exchange-rare-bone',
    taskName: 'Fortune: Rare Bone',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Rare Bone here.',
    subCategory: 'Pewter City',
    payout: 5000,
    exitTitle: 'A Priceless Specimen',
    exitMessage:
      'Not bad 5,000 Pokedollars for a Rare Bone I’ll be rich in no time!',
    closeButtonText: 'Accept Payment',
  },
  {
    mementoItemId: 'big-mushroom',
    trainerIconId: 'breeder-f',
    background: '/backgrounds/forest.avif',
    bookItemId: 'fortune-book-natures-gift',
    bookName: 'Fortune: Natures Gift',
    bookDescription:
      'A giant mushroom is a marvel of the forest. Find the botanist in Viridian Forest; they will pay for a Big Mushroom to study its growth.',
    taskId: 'fortune-exchange-big-mushroom',
    taskName: 'Fortune: Big Mushroom',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Big Mushroom here.',
    subCategory: 'Viridian Forest',
    payout: 2500,
    exitTitle: 'A Wonderful Specimen',
    exitMessage:
      'Not bad 2,500 Pokedollars for a Big Mushroom I’ll be rich in no time!',
    closeButtonText: 'Take the Payment',
  },
  {
    mementoItemId: 'tiny-mushroom',
    trainerIconId: 'school-kid-f',
    background: '/backgrounds/forest.avif',
    bookItemId: 'fortune-book-natures-boon',
    bookName: 'Fortune: Natures Boon',
    bookDescription:
      'Small things can be precious to the right student. Near Viridian Forest’s entrance, a young naturalist collects Tiny Mushrooms for a lesson in woodland life.',
    taskId: 'fortune-exchange-tiny-mushroom',
    taskName: 'Fortune: Tiny Mushroom',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Tiny Mushroom here.',
    subCategory: 'Viridian Forest',
    payout: 500,
    exitTitle: 'A Useful Little Find',
    exitMessage:
      'Not bad 500 Pokedollars for a Tiny Mushroom I’ll be rich in no time!',
    closeButtonText: 'Take the Payment',
  },
  {
    mementoItemId: 'comet-shard',
    trainerIconId: 'super-nerd',
    background: '/backgrounds/mt-moon.avif',
    bookItemId: 'fortune-book-skys-blessing',
    bookName: 'Fortune: Skys Blessing',
    bookDescription:
      'A shard from beyond the clouds carries a rare fortune. Find the Mt. Moon researcher; they will pay for a Comet Shard for the collection.',
    taskId: 'fortune-exchange-comet-shard',
    taskName: 'Fortune: Comet Shard',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Comet Shard here.',
    subCategory: 'Mt. Moon',
    payout: 12500,
    exitTitle: 'A Celestial Find',
    exitMessage:
      'Not bad 12,500 Pokedollars for a Comet Shard I’ll be rich in no time!',
    closeButtonText: 'Take the Payment',
  },
  {
    mementoItemId: 'balmmushroom',
    trainerIconId: 'breeder-m',
    background: '/backgrounds/power-plant.avif',
    bookItemId: 'fortune-book-natures-blessing',
    bookName: 'Fortune: Natures Blessing',
    bookDescription:
      'The sweetest mushroom is prized by growers and healers alike. In the Kanto Plant Store Room, a grower makes a standing offer for each Balm Mushroom.',
    taskId: 'fortune-exchange-balm-mushroom',
    taskName: 'Fortune: Balm Mushroom',
    taskDescription:
      'Hey looks like the fortune was right! I could make good money selling Balm Mushroom here.',
    subCategory: 'Cerulean City',
    payout: 6250,
    exitTitle: 'A Fragrant Treasure',
    exitMessage:
      'Not bad 6,250 Pokedollars for a Balm Mushroom I’ll be rich in no time!',
    closeButtonText: 'Take the Payment',
  },
]

// This module contains only information that is safe to include in client bundles.
// Ritual answers, required energy, channeler requirements, and rewards live in
// spirit-channeling.ts, which is imported by server code only. The available
// offering catalog is public so the picker can render owned items.
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
  ...FORTUNE_CHANNELING_CONTENT.map((ritual) => ritual.mementoItemId),
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
