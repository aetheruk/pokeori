import { Item } from '../types'

const baseCandyItems: Item[] = [
  {
    id: 'rare-candy-xs',
    name: 'Exp. Candy XS',
    description:
      'Grants 100 XP to a single Pokémon of any level.',
    category: 'candy',
    spriteId: 'materials/candy-xs',
    hueRotate: 0,
    effects: {
      grantPokemonExperience: 100,
      minLevel: 1,
    },
  },
  {
    id: 'rare-candy-m',
    name: 'Exp. Candy S',
    description:
      'Grants 800 XP to a single Pokémon at level 20 or higher.',
    category: 'candy',
    spriteId: 'materials/candy-s',
    hueRotate: 0,
    effects: {
      grantPokemonExperience: 800,
      minLevel: 20,
    },
  },
  {
    id: 'rare-candy-xl',
    name: 'Exp. Candy M',
    description:
      'Grants 3,000 XP to a single Pokémon at level 40 or higher.',
    category: 'candy',
    spriteId: 'materials/candy-m',
    hueRotate: 0,
    effects: {
      grantPokemonExperience: 3000,
      minLevel: 40,
    },
  },
  {
    id: 'rare-candy-mega',
    name: 'Exp. Candy L',
    description:
      'Grants 10,000 XP to a single Pokémon at level 60 or higher.',
    category: 'candy',
    spriteId: 'materials/candy-l',
    hueRotate: 0,
    effects: {
      grantPokemonExperience: 10000,
      minLevel: 60,
    },
  },
  {
    id: 'rare-candy-tera',
    name: 'Exp. Candy XL',
    description:
      'Grants 30,000 XP to a single Pokémon at level 80 or higher.',
    category: 'candy',
    spriteId: 'materials/candy-xl',
    hueRotate: 0,
    effects: {
      grantPokemonExperience: 30000,
      minLevel: 80,
    },
  },
]

export const candyBagItems: Item[] = baseCandyItems.map((candy) => {
  const minLevel = candy.effects?.minLevel || 1
  const experience = (candy.effects?.grantPokemonExperience || 0) * 10
  const spriteId = candy.spriteId?.replace(
    'materials/candy-',
    'materials/candy-bag-',
  )

  return {
    id: `${candy.id}-bag`,
    name: `${candy.name} Bag`,
    description: `Grants ${experience.toLocaleString('en-US')} XP to a single Pokémon${minLevel > 1 ? ` at level ${minLevel} or higher` : ' of any level'}.`,
    category: 'candy' as const,
    spriteId,
    hueRotate: candy.hueRotate,
    effects: {
      grantPokemonExperience: experience,
      minLevel,
    },
  }
})

export const candyItems: Item[] = baseCandyItems
