import type { TaskCondition } from '@/data/tasks/types'
import type { LocationReward } from '@/data/types'

export interface SpecialPokemonDrop {
  itemId: string
  dropChance: number
  quantity?: LocationReward['quantity']
  guaranteed?: boolean
  secret?: boolean
  requirements?: TaskCondition[]
}

/**
 * Extra item rolls keyed directly by Pokemon form ID. Each entry is an
 * independent reward roll and does not participate in primary material type
 * selection or quantity rolls.
 */
export const SPECIAL_POKEMON_DROPS: Record<string, SpecialPokemonDrop[]> = {
  '25': [{ itemId: 'light-ball', dropChance: 1 }],
  '83': [{ itemId: 'leek', dropChance: 1 }],
  '10166': [{ itemId: 'leek', dropChance: 1 }],
  '104': [{ itemId: 'thick-club', dropChance: 1 }],
  '105': [{ itemId: 'thick-club', dropChance: 1 }],
  '10115': [{ itemId: 'thick-club', dropChance: 1 }],
  '113': [
    {
      itemId: 'lucky-egg',
      dropChance: 1,
      requirements: [
        { type: 'task_completed', targetId: 'safari-rare-item-rumours' },
      ],
    },
    {
      itemId: 'lucky-punch',
      dropChance: 1,
      requirements: [
        { type: 'task_completed', targetId: 'safari-rare-item-rumours' },
      ],
    },
  ],
  '132': [
    { itemId: 'quick-powder', dropChance: 1 },
    { itemId: 'metal-powder', dropChance: 1 },
  ],
  '144': [{ itemId: 'frozen-twig', dropChance: 100, guaranteed: true }],
  '145': [{ itemId: 'charged-twig', dropChance: 100, guaranteed: true }],
  '146': [{ itemId: 'flaming-twig', dropChance: 100, guaranteed: true }],
  '243': [{ itemId: 'token-of-thunder', dropChance: 100, guaranteed: true }],
  '244': [{ itemId: 'token-of-fire', dropChance: 100, guaranteed: true }],
  '245': [{ itemId: 'token-of-water', dropChance: 100, guaranteed: true }],
}
