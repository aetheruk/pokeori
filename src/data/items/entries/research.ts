import { Item } from '../types'

export const researchItems: Item[] = [
  {
    id: 'pouch-of-nuts',
    name: 'Pouch of Nuts',
    description:
      'Open for 3–5 dye nuts in colours unlocked by your Researching level. Colours may repeat.',
    category: 'misc',
    spriteId: 'pouch-of-materials',
    effects: {
      grantRandomDyeNuts: { min: 3, max: 5 },
    },
  },
  {
    id: 'golden-scale',
    name: 'Golden Scale',
    description: 'A rare Golden scale found while fishing.',
    category: 'misc',
    spriteId: 'golden-scale',
  },
  {
    id: 'scrip',
    name: "Prof's Scrip",
    description: 'A voucher issued by Professor Oak for special trainer supplies.',
    category: 'misc',
    spriteId: 'spell-tag',
  },
  {
    id: 'research-kit',
    name: 'Research Kit',
    description:
      'A professional kit for field research. Grants 3 Research XP to a Pokémon of your choice. Requires Researcher Level 35.',
    category: 'misc',
    spriteId: 'eject-pack',
    skillRequirements: { researching: 35 },
    effects: {
      grantPokemonResearchXp: {
        amount: 3,
        minSkillLevel: 35,
      },
    },
  },
]
