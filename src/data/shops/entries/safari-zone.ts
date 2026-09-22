import type { ShopConfig } from '../types'

/** Explore compatibility entry: guildId selects the read-only Guild Hall. */
export const safariZoneShops: ShopConfig[] = [
  {
    id: 'fuchsia-research-guild-hall',
    guildId: 'fuchsia-research-guild',
    name: 'Fuchsia Research Guild',
    description:
      'Review submitted field notes, Guild Rank, and Institute charter unlocks.',
    category: 'Kanto',
    subCategory: 'Safari Zone',
    icon: { type: 'item', id: 'researchers-journal-page' },
    background: '/backgrounds/safari-reserve.avif',
    requirements: [
      { type: 'guild_rank', targetId: 'fuchsia-research-guild', count: 1 },
    ],
    items: [],
  },
]
