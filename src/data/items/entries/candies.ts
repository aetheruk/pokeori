import { Item } from '../types'

const baseCandyItems: Item[] = [
  {
    id: 'rare-candy-xs',
    name: 'XS Candy',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 20.',
    category: 'candy',
    spriteId: 'materials/candy-xs',
    hueRotate: 0,
    effects: {
      increaseLevel: 1,
      maxLevel: 19,
      minLevel: 1,
    },
  },
  {
    id: 'rare-candy-m',
    name: 'S Candy',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 40.',
    category: 'candy',
    spriteId: 'materials/candy-s',
    hueRotate: 0,
    effects: {
      increaseLevel: 1,
      maxLevel: 39,
      minLevel: 20,
    },
  },
  {
    id: 'rare-candy-xl',
    name: 'M Candy',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 60.',
    category: 'candy',
    spriteId: 'materials/candy-m',
    hueRotate: 0,
    effects: {
      increaseLevel: 1,
      maxLevel: 59,
      minLevel: 40,
    },
  },
  {
    id: 'rare-candy-mega',
    name: 'L Candy',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 80.',
    category: 'candy',
    spriteId: 'materials/candy-l',
    hueRotate: 0,
    effects: {
      increaseLevel: 1,
      maxLevel: 79,
      minLevel: 60,
    },
  },
  {
    id: 'rare-candy-tera',
    name: 'XL Candy',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 100.',
    category: 'candy',
    spriteId: 'materials/candy-xl',
    hueRotate: 0,
    effects: {
      increaseLevel: 1,
      maxLevel: 99,
      minLevel: 80,
    },
  },
]

export const candyBagItems: Item[] = baseCandyItems.map((candy) => {
  const minLevel = candy.effects?.minLevel || 1
  const maxLevel = candy.effects?.maxLevel || 99
  const targetLevel = maxLevel + 1
  const spriteId = candy.spriteId?.replace(
    'materials/candy-',
    'materials/candy-bag-',
  )

  return {
    id: `${candy.id}-bag`,
    name: `${candy.name} Bag`,
    description: `A carefully portioned bag of ${candy.name.toLowerCase()}. It raises a single Pokémon to level ${targetLevel}.`,
    category: 'candy' as const,
    spriteId,
    hueRotate: candy.hueRotate,
    effects: {
      setLevel: targetLevel,
      maxLevel,
      minLevel,
    },
  }
})

export const candyItems: Item[] = baseCandyItems
