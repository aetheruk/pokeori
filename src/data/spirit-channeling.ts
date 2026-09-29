import type { LocationReward } from '@/data/types'
import { FUJI_GLASSES_ITEM_ID } from '@/data/items/special-item-ids'
import { KANTO_GYM_CHRONICLES } from '@/data/gym-leader-chronicles'
import {
  FISHER_SECRET_BOOKS,
  SPIRIT_CHANNELING_ACTIVITY_PREFIX,
  type SpiritChannelerRequirement,
  type SpiritChannelingIncenseItemId,
  type SpiritChannelingEnergy,
} from '@/data/spirit-channeling-public'

export * from '@/data/spirit-channeling-public'

export type SpiritChannelingConfig = SpiritChannelerRequirement & {
  id: string
  name: string
  description: string
  mementoItemId: string
  correctIncenseItemId: SpiritChannelingIncenseItemId
  requiredEnergy: SpiritChannelingEnergy
  rewards: LocationReward[]
}

export const SPIRIT_CHANNELING_CONFIGS: SpiritChannelingConfig[] = [
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
  ...KANTO_GYM_CHRONICLES.map((chronicle) => ({
    id: `${chronicle.key}-${chronicle.badgeName.toLowerCase().replace(' badge', '')}-badge-memory`,
    name: `${chronicle.leaderName}: ${chronicle.title}`,
    description: `A personal memory held in the ${chronicle.badgeName}.`,
    mementoItemId: chronicle.badgeItemId,
    correctIncenseItemId: 'incense-memory' as const,
    requiredEnergy: { [chronicle.energyType]: chronicle.energyAmount },
    channelerMinLevel: chronicle.channelerMinLevel,
    rewards: [
      {
        type: 'task_complete' as const,
        targetId: chronicle.markerId,
        quantity: 1,
        dropChance: 100,
        secret: true,
      },
    ],
  })),
  ...Array.from({ length: 8 }, (_, index) => {
    const scaleNumber = index + 1
    const book = FISHER_SECRET_BOOKS[index]

    return {
      id: `golden-scale-${scaleNumber}-memory`,
      name: `Golden Scale (${scaleNumber}) Memory`,
      description: `A memory held in Golden Scale (${scaleNumber}), found while fishing.`,
      mementoItemId: `golden-scale-${scaleNumber}`,
      correctIncenseItemId: 'incense-fishers' as const,
      requiredEnergy: { water: 77 },
      channelerMinLevel: 1,
      channelerFormId: '129',
      rewards: [
        {
          type: 'item' as const,
          targetId: book.itemId,
          quantity: 1,
          dropChance: 100,
        },
      ],
    }
  }),
]

export const SPIRIT_CHANNELING_CONFIG_BY_MEMENTO = new Map(
  SPIRIT_CHANNELING_CONFIGS.map((config) => [config.mementoItemId, config]),
)

export const SPIRIT_CHANNELING_CONFIG_BY_ID = new Map(
  SPIRIT_CHANNELING_CONFIGS.map((config) => [config.id, config]),
)

export function getSpiritChannelingActivityId(
  config: SpiritChannelingConfig,
): string {
  return `${SPIRIT_CHANNELING_ACTIVITY_PREFIX}:${config.mementoItemId}`
}

export function getSpiritChannelingConfigForMemento(
  mementoItemId: string,
): SpiritChannelingConfig | undefined {
  return SPIRIT_CHANNELING_CONFIG_BY_MEMENTO.get(mementoItemId)
}
