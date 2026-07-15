import { Item } from '../types'

const EX_CANDY_HUE_ROTATE = 80

export const candyItems: Item[] = [
  {
    id: 'rare-candy-xs',
    name: 'XS Candy',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 10.',
    category: 'candy',
    spriteId: 'materials/candy-xs',
    hueRotate: 0,
    effects: {
      increaseLevel: 1,
      maxLevel: 9,
      minLevel: 1,
    },
  },
  {
    id: 'rare-candy-s',
    name: 'XS Candy EX',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 20.',
    category: 'candy',
    spriteId: 'materials/candy-xs',
    hueRotate: EX_CANDY_HUE_ROTATE,
    effects: {
      increaseLevel: 1,
      maxLevel: 19,
      minLevel: 10,
    },
  },
  {
    id: 'rare-candy-m',
    name: 'S Candy',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 30.',
    category: 'candy',
    spriteId: 'materials/candy-s',
    hueRotate: 0,
    effects: {
      increaseLevel: 1,
      maxLevel: 29,
      minLevel: 20,
    },
  },
  {
    id: 'rare-candy-l',
    name: 'S Candy EX',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 40.',
    category: 'candy',
    spriteId: 'materials/candy-s',
    hueRotate: EX_CANDY_HUE_ROTATE,
    effects: {
      increaseLevel: 1,
      maxLevel: 39,
      minLevel: 30,
    },
  },
  {
    id: 'rare-candy-xl',
    name: 'M Candy',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 50.',
    category: 'candy',
    spriteId: 'materials/candy-m',
    hueRotate: 0,
    effects: {
      increaseLevel: 1,
      maxLevel: 49,
      minLevel: 40,
    },
  },
  {
    id: 'rare-candy-xxl',
    name: 'M Candy EX',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 60.',
    category: 'candy',
    spriteId: 'materials/candy-m',
    hueRotate: EX_CANDY_HUE_ROTATE,
    effects: {
      increaseLevel: 1,
      maxLevel: 59,
      minLevel: 50,
    },
  },
  {
    id: 'rare-candy-mega',
    name: 'L Candy',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 70.',
    category: 'candy',
    spriteId: 'materials/candy-l',
    hueRotate: 0,
    effects: {
      increaseLevel: 1,
      maxLevel: 69,
      minLevel: 60,
    },
  },
  {
    id: 'rare-candy-giga',
    name: 'L Candy EX',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 80.',
    category: 'candy',
    spriteId: 'materials/candy-l',
    hueRotate: EX_CANDY_HUE_ROTATE,
    effects: {
      increaseLevel: 1,
      maxLevel: 79,
      minLevel: 70,
    },
  },
  {
    id: 'rare-candy-tera',
    name: 'XL Candy',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 90.',
    category: 'candy',
    spriteId: 'materials/candy-xl',
    hueRotate: 0,
    effects: {
      increaseLevel: 1,
      maxLevel: 89,
      minLevel: 80,
    },
  },
  {
    id: 'rare-candy-max',
    name: 'XL Candy EX',
    description:
      'A candy that is packed with energy. It raises the level of a single Pokémon by one, up to level 100.',
    category: 'candy',
    spriteId: 'materials/candy-xl',
    hueRotate: EX_CANDY_HUE_ROTATE,
    effects: {
      increaseLevel: 1,
      maxLevel: 99,
      minLevel: 90,
    },
  },
]
