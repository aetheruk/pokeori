import type { LocationReward } from '@/data/types'
import type { PokemonTypeName } from '@/data/items/types'
import { FUJI_GLASSES_ITEM_ID } from '@/data/items/special-item-ids'
import { TYPE_MATERIAL_CONFIG } from '@/utilities/artisan/material-drops'

export const BOOK_OF_CHANNELING_ITEM_ID = 'book-of-channeling'
export const DEV_CHANNELING_MEMENTO_ITEM_ID = 'dev-channeling-memento'

export const SPIRIT_CHANNELING_ACTIVITY_PREFIX = 'spirit-channeling'

export const SPIRIT_CHANNELING_INCENSE_ITEMS = [
  {
    id: 'incense-boon',
    name: 'Boon Incense',
    description: 'A reusable incense for quiet ritual work.',
    spriteId: 'key/incense-boon',
  },
  {
    id: 'incense-dev',
    name: 'Dev Incense',
    description: 'A reusable test incense for strange ritual work.',
    spriteId: 'key/incense-dev',
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

export type SpiritChannelingIncenseItemId = (typeof SPIRIT_CHANNELING_INCENSE_ITEMS)[number]['id']

export type SpiritChannelingEnergy = Partial<Record<PokemonTypeName, number>>

export interface SpiritChannelingConfig {
  id: string
  name: string
  description: string
  mementoItemId: string
  correctIncenseItemId: SpiritChannelingIncenseItemId
  requiredEnergy: SpiritChannelingEnergy
  channelerMinLevel: number
  rewards: LocationReward[]
}

export interface SpiritChannelingOfferingItem {
  itemId: string
  type: PokemonTypeName
  energy: number
  kind: 'material' | 'gem'
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

export const SPIRIT_CHANNELING_CONFIGS: SpiritChannelingConfig[] = [
  {
    id: 'dev-channeling-memento',
    name: 'Dev Memento Channeling',
    description: 'A test memento carrying a faint presence for channeling validation.',
    mementoItemId: DEV_CHANNELING_MEMENTO_ITEM_ID,
    correctIncenseItemId: 'incense-dev',
    requiredEnergy: { water: 3 },
    channelerMinLevel: 10,
    rewards: [
      {
        type: 'pokemon',
        targetId: 92,
        quantity: 1,
        dropChance: 100,
        pokemonData: {
          formId: '92',
          level: 10,
          obtainedMethod: 'reward',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Spirit Channeling',
          obtainedSourceId: `spirit-channeling:${DEV_CHANNELING_MEMENTO_ITEM_ID}`,
        },
      },
    ],
  },
  {
    id: 'fuji-glasses-memory',
    name: "Fuji's Glasses Memory",
    description: 'A memory held in the spare glasses Mr. Fuji left behind.',
    mementoItemId: FUJI_GLASSES_ITEM_ID,
    correctIncenseItemId: 'incense-memory',
    requiredEnergy: { ground: 5 },
    channelerMinLevel: 5,
    rewards: [
      {
        type: 'task_complete',
        targetId: 'fuji-glasses-memory-revealed',
        quantity: 1,
        dropChance: 100,
        secret: true,
      },
    ],
  },
]

export const SPIRIT_CHANNELING_CONFIG_BY_MEMENTO = new Map(
  SPIRIT_CHANNELING_CONFIGS.map((config) => [config.mementoItemId, config]),
)

export const SPIRIT_CHANNELING_CONFIG_BY_ID = new Map(
  SPIRIT_CHANNELING_CONFIGS.map((config) => [config.id, config]),
)

export function getSpiritChannelingActivityId(config: SpiritChannelingConfig): string {
  return `${SPIRIT_CHANNELING_ACTIVITY_PREFIX}:${config.mementoItemId}`
}

export function getSpiritChannelingConfigForMemento(
  mementoItemId: string,
): SpiritChannelingConfig | undefined {
  return SPIRIT_CHANNELING_CONFIG_BY_MEMENTO.get(mementoItemId)
}

export function isSpiritChannelingMementoItem(itemId: string): boolean {
  return SPIRIT_CHANNELING_CONFIG_BY_MEMENTO.has(itemId)
}

export const SPIRIT_CHANNELING_OFFERING_ITEMS: SpiritChannelingOfferingItem[] =
  POKEMON_TYPE_NAMES.flatMap((type) => {
    const materialFamily = TYPE_MATERIAL_CONFIG[type]?.family
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
  SPIRIT_CHANNELING_OFFERING_ITEMS.map((offering) => [offering.itemId, offering]),
)

export function getSpiritChannelingOffering(itemId: string) {
  return SPIRIT_CHANNELING_OFFERING_BY_ITEM_ID.get(itemId)
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
