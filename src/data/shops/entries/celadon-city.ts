import { ShopConfig } from '../types'

const afterStoreIntro = [{ type: 'task_completed' as const, targetId: 'shop-till-you-drop' }]
const afterRenovation = [
  { type: 'task_completed' as const, targetId: 'department-store-renovation-notes' },
]
const afterComplaints = [{ type: 'task_completed' as const, targetId: 'rocket-ball-complaints' }]

const item = (id: string, targetId: string, amount: number, quantity = 1) => ({
  id,
  name: id
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' '),
  icon: { type: 'item' as const, id: targetId },
  cost: [{ type: 'currency' as const, id: 'pokedollars', amount }],
  rewards: [{ type: 'item' as const, targetId, quantity, dropChance: 100 }],
})

export const celadonCityShops: ShopConfig[] = [
  {
    id: 'celadon-department-store-1f',
    name: 'Celadon Department Store 1F: Trainer Essentials',
    description: 'Rocket-approved supplies for travelling Trainers.',
    category: 'Kanto',
    subCategory: 'Celadon City',
    icon: { type: 'trainer', id: 'maid' },
    background: '/backgrounds/shop.avif',
    requirements: afterStoreIntro,
    items: [
      item('rocket-ball', 'rocket-ball', 350),
      item('rocket-ball-bundle', 'rocket-ball', 3500, 10),
      item('great-ball', 'great-ball', 1500),
      item('battle-potion', 'battle-potion', 500),
      item('antidote', 'antidote', 550),
      item('ice-heal', 'ice-heal', 550),
      item('burn-heal', 'burn-heal', 550),
      item('awakening', 'awakening', 550),
      item('paralyze-heal', 'paralyze-heal', 550),
      item('escape-rope', 'escape-rope', 600),
      item('repel', 'repel', 350),
      item('super-repel', 'super-repel', 700),
      item('battle-super-potion', 'battle-super-potion', 1200),
      {
        ...item('great-ball-daily-bundle', 'great-ball', 3000, 3),
        stock: 1,
        daily: true,
        name: 'Great Ball Bundle',
      },
    ],
  },
  {
    id: 'celadon-department-store-2f',
    name: 'Celadon Department Store 2F: TM Counter',
    description: 'An expensive counter of Rocket-approved battle techniques.',
    category: 'Kanto',
    subCategory: 'Celadon City',
    icon: { type: 'item', id: 'tm-slow-strike' },
    background: '/backgrounds/shop.avif',
    requirements: afterStoreIntro,
    items: ['slow-strike', 'mighty-charge', 'accidental-tap', 'cunning-trap', 'play-dumb'].map(
      (move) => item(`tm-${move}`, `tm-${move}`, 20000),
    ),
  },
  {
    id: 'celadon-department-store-4f',
    name: 'Celadon Department Store 4F: Crafting Notes',
    description: 'Old in-house recipes salvaged from the renovation.',
    category: 'Kanto',
    subCategory: 'Celadon City',
    icon: { type: 'item', id: 'x-attack' },
    background: '/backgrounds/shop.avif',
    requirements: afterRenovation,
    items: ['x-attack', 'x-defense', 'x-sp-atk', 'x-sp-def', 'x-speed', 'dire-hit'].map(
      (statItem) => ({
        ...item(`${statItem}-recipe`, statItem, 5000),
        name: `${itemName(statItem)} Recipe`,
        description: `Unlock the in-house recipe for ${itemName(statItem)}.`,
        rewards: [
          {
            type: 'task_complete' as const,
            targetId: `${statItem}-recipe`,
            quantity: 1,
            dropChance: 100,
          },
        ],
      }),
    ),
  },
  {
    id: 'celadon-department-store-5f',
    name: 'Celadon Department Store 5F: Vitamin Counter',
    description: 'Premium nutritional supplements for serious Trainers.',
    category: 'Kanto',
    subCategory: 'Celadon City',
    icon: { type: 'item', id: 'protein' },
    background: '/backgrounds/shop.avif',
    requirements: afterRenovation,
    items: ['hp-up', 'protein', 'iron', 'calcium', 'zinc', 'carbos'].map((vitamin) =>
      item(vitamin, vitamin, 9800),
    ),
  },
  {
    id: 'celadon-department-store-rooftop',
    name: 'Celadon Department Store Rooftop',
    description: 'A Rocket Grunt has one very expensive curiosity for sale.',
    category: 'Kanto',
    subCategory: 'Celadon City',
    icon: { type: 'trainer', id: 'rocket-grunt' },
    background: '/backgrounds/celadon.avif',
    requirements: afterComplaints,
    items: [
      {
        ...item('chaos-stone', 'chaos-stone', 50000),
        name: 'Mysterious Stone',
        description: 'A strange stone with an unpredictable effect on a catch attempt.',
        stock: 1,
      },
    ],
  },
]

function itemName(id: string) {
  return id
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}
