import type { ShopConfig } from '../types'

/** Explore compatibility entry: guildId selects the read-only Institute charter. */
export const safariZoneShops: ShopConfig[] = [
  {
    id: 'fuchsia-research-guild-hall',
    guildId: 'fuchsia-research-guild',
    name: 'Fuchsia Research Institute',
    description:
      'Review submitted field notes, Institute Rank, and charter unlocks.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: { type: 'item', id: 'safari-ball' },
    background: '/backgrounds/lab.avif',
    requirements: [
      { type: 'guild_rank', targetId: 'fuchsia-research-guild', count: 1 },
    ],
    items: [],
  },
]
