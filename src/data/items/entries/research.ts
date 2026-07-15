import { Item } from '../types'

export const researchItems: Item[] = [
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
      'A professional kit for field research. Grants 5 Research XP to a Pokémon of your choice. Requires Researcher Level 35.',
    category: 'misc',
    spriteId: 'eject-pack',
    skillRequirements: { researching: 35 },
    effects: {
      grantPokemonResearchXp: {
        amount: 5,
        minSkillLevel: 35,
      },
    },
  },
]
