import { ShopConfig } from '../types'

const item = (
  id: string,
  name: string,
  targetId: string,
  amount: number,
  quantity = 1,
) => ({
  id,
  name,
  description: 'A useful supply for Trainers travelling through Fuchsia City.',
  icon: { type: 'item' as const, id: targetId },
  cost: [{ type: 'currency' as const, id: 'pokedollars', amount }],
  rewards: [{ type: 'item' as const, targetId, quantity, dropChance: 100 }],
})

export const fuchsiaCityShops: ShopConfig[] = [
  {
    id: 'fuchsia-city-mart',
    name: 'Fuchsia City Poké Mart',
    description: 'A well-stocked shop for Trainers preparing to face Fuchsia City’s dangers.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: { type: 'item', id: 'revive' },
    background: '/backgrounds/shop.avif',
    requirements: [{ type: 'task_completed', targetId: 'explore-fuchsia-city' }],
    items: [
      item('potion', 'Potion', 'battle-potion', 500),
      item('antidote', 'Antidote', 'antidote', 550),
      item('ice-heal', 'Ice Heal', 'ice-heal', 550),
      item('burn-heal', 'Burn Heal', 'burn-heal', 550),
      item('awakening', 'Awakening', 'awakening', 550),
      item('paralyze-heal', 'Paralyze Heal', 'paralyze-heal', 550),
      item('escape-rope', 'Escape Rope', 'escape-rope', 600),
      item('repel', 'Repel', 'repel', 350),
      item('rocket-ball', 'Rocket Ball', 'rocket-ball', 350),
      {
        ...item('revive', 'Revive', 'revive', 2000),
        description: 'A medicine that revives a fainted Pokémon and restores half of its maximum HP.',
      },
      {
        ...item('revive-daily-bundle', 'Revive Bundle', 'revive', 2500, 3),
        description: 'A daily bundle of 3 Revives for Trainers preparing for a difficult battle.',
        stock: 1,
        daily: true,
      },
    ],
  },
]
