import { ShopConfig } from '../types'

export const ssAnneShops: ShopConfig[] = [
  {
    id: 'ss-anne-captains-shop',
    name: "Captain's Credit Exchange",
    description: "Trade Captain's Credits for special S.S. Anne rewards.",
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'captains-credit',
    },
    background: '/backgrounds/ss-anne.avif',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'ss-anne-evening-cruise',
        expeditionStatus: 'completed',
        count: 1,
      },
      {
        type: 'time_range',
        timeRange: {
          start: '17:00',
          end: '22:00',
        },
      },
    ],
    items: [
      {
        id: 'tm-sea-breeze',
        name: 'TM: Sea Breeze',
        description: 'Grants Regeneration to both active Pokemon.',
        icon: {
          type: 'item',
          id: 'tm-sea-breeze',
        },
        cost: [
          {
            type: 'item',
            id: 'captains-credit',
            amount: 10,
          },
        ],
        stock: 1,
        requirements: [
          {
            type: 'item_owned',
            targetId: 'tm-sea-breeze',
            count: 1,
            inverse: true,
          },
        ],
        rewards: [
          {
            type: 'item',
            targetId: 'tm-sea-breeze',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'title-the-captain',
        name: 'Title: The Captain',
        description: 'Unlock the title "The Captain".',
        icon: {
          type: 'local',
          id: '/sprites/items/certificate.avif',
        },
        cost: [
          {
            type: 'item',
            id: 'captains-credit',
            amount: 100,
          },
        ],
        stock: 1,
        rewards: [
          {
            type: 'title',
            targetId: 'the-captain',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'icon-sailor',
        name: 'Icon: Sailor',
        description: 'Unlock the Sailor trainer icon.',
        icon: {
          type: 'trainer',
          id: 'sailor',
        },
        cost: [
          {
            type: 'item',
            id: 'captains-credit',
            amount: 50,
          },
        ],
        stock: 1,
        rewards: [
          {
            type: 'icon',
            targetId: 'sailor',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'banner-ss-anne',
        name: 'Background: S.S. Anne',
        description: 'Unlock the S.S. Anne trainer background.',
        icon: {
          type: 'local',
          id: '/backgrounds/ss-anne.avif',
        },
        cost: [
          {
            type: 'item',
            id: 'captains-credit',
            amount: 50,
          },
        ],
        stock: 1,
        rewards: [
          {
            type: 'banner',
            targetId: 'ss-anne',
            dropChance: 100,
          },
        ],
      },
      {
        id: 'rare-candy-m',
        name: 'S Candy',
        description: 'A small candy for training Pokemon.',
        icon: {
          type: 'item',
          id: 'rare-candy-m',
        },
        cost: [
          {
            type: 'item',
            id: 'captains-credit',
            amount: 2,
          },
        ],
        rewards: [
          {
            type: 'item',
            targetId: 'rare-candy-m',
            quantity: 1,
            dropChance: 100,
          },
        ],
      },
      {
        id: 'crystals-50',
        name: '50 Crystals',
        description: "Trade a Captain's Credit for Crystals.",
        icon: {
          type: 'item',
          id: 'revive',
        },
        cost: [
          {
            type: 'item',
            id: 'captains-credit',
            amount: 1,
          },
        ],
        rewards: [
          {
            type: 'currency',
            targetId: 'crystals',
            quantity: 50,
            dropChance: 100,
          },
        ],
      },
    ],
  },
]
