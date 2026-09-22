import { ShopConfig } from '../types'
import { UNDERGROUND_SOCIETY_GUILD_ID } from '@/data/guilds/underground-society'

export const undergroundTccgShops: ShopConfig[] = [
  {
    id: 'underground-society-promo-counter',
    guildId: UNDERGROUND_SOCIETY_GUILD_ID,
    name: 'The Promo Counter',
    description: 'A small counter for cards that are not supposed to be in circulation yet.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: { type: 'trainer', id: 'tcg-maniac-m' },
    background: '/backgrounds/kanto-underground.avif',
    requirements: [
      { type: 'guild_rank', targetId: UNDERGROUND_SOCIETY_GUILD_ID, count: 2 },
    ],
    items: [
      {
        id: 'underground-promo-24',
        name: 'Promo Card 24',
        description: 'A Society-held promo card released through a very quiet channel.',
        icon: { type: 'item', id: 'pack-basep' },
        cost: [{ type: 'currency', id: 'crystals', amount: 50000 }],
        stock: 1,
        rewards: [
          {
            type: 'card',
            cardDrawParams: { allowedCardIds: ['basep-24'], guaranteed: true },
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'underground-promo-25',
        name: 'Promo Card 25',
        description: 'A Society-held promo card released through a very quiet channel.',
        icon: { type: 'item', id: 'pack-basep' },
        cost: [{ type: 'currency', id: 'crystals', amount: 50000 }],
        stock: 1,
        rewards: [
          {
            type: 'card',
            cardDrawParams: { allowedCardIds: ['basep-25'], guaranteed: true },
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'underground-promo-28',
        name: 'Promo Card 28',
        description: 'A Society-held promo card released through a very quiet channel.',
        icon: { type: 'item', id: 'pack-basep' },
        cost: [{ type: 'currency', id: 'crystals', amount: 50000 }],
        stock: 1,
        rewards: [
          {
            type: 'card',
            cardDrawParams: { allowedCardIds: ['basep-28'], guaranteed: true },
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
    ],
  },
]
