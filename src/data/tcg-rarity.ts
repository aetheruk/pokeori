// prettier-ignore
export const tcgRarityOdds = {
  'Common': 10, // So we can lower odds Commons are always available
  'Unknown': 1000, // So we can lower odds Energies are always available
  'Uncommon': 0.85,
  'Rare': 0.3,
  'Rare Holo': 0.3,

  'Rare Shining': 0.1,
  'Rare Shiny': 0.1,
  'Shiny Rare': 0.1,

  'Double Rare': 0.2,
  'Rare Holo EX': 0.2,
  'Rare Holo GX': 0.2,
  'Rare Holo V': 0.2,
  'Rare ACE': 0.1,
  'ACE SPEC Rare': 0.1,
  'Amazing Rare': 0.1,
  'Radiant Rare': 0.2,
  'Rare Prism Star': 0.1,
  'Rare Prime': 0.1,

  'Rare Shiny GX': 0.15,
  'Rare Holo LV.X': 0.15,

  'Illustration Rare': 0.1,
  'Trainer Gallery Rare Holo': 0.1,
  'LEGEND': 0.1,
  'Rare BREAK': 0.1,
  'Rare Holo VMAX': 0.1,

  'Rare Ultra': 0.1,
  'Shiny Ultra Rare': 0.1,
  'Ultra Rare': 0.1,
  'Classic Collection': 0.1,

  'Special Illustration Rare': 0.08,
  'MEGA_ATTACK_RARE': 0.08,
  'Rare Secret': 0.1,
  'Rare Holo VSTAR': 0.1,

  'Rare Rainbow': 0.02,
  'Hyper Rare': 0.02,
  'Mega Hyper Rare': 0.02,
  'Black White Rare': 0.02,
  'Rare Holo Star': 0.02,

  'Promo': 0,
} as const satisfies Record<string, number>

export type TcgRarity = keyof typeof tcgRarityOdds

export const tcgRarityCrystalValues: Record<string, number> = {
  Common: 1,
  Unknown: 1,
  Uncommon: 2,
  Rare: 5,
  'Rare Holo': 10,

  'Rare Shining': 25,
  'Rare Shiny': 25,
  'Shiny Rare': 25,

  'Double Rare': 20,
  'Rare Holo EX': 20,
  'Rare Holo GX': 20,
  'Rare Holo V': 20,
  'Rare ACE': 50,
  'ACE SPEC Rare': 50,
  'Amazing Rare': 30,
  'Radiant Rare': 30,
  'Rare Prism Star': 30,
  'Rare Prime': 30,

  'Rare Shiny GX': 40,
  'Rare Holo LV.X': 40,

  'Illustration Rare': 40,
  'Trainer Gallery Rare Holo': 40,
  LEGEND: 50,
  'Rare BREAK': 25,
  'Rare Holo VMAX': 40,

  'Rare Ultra': 60,
  'Shiny Ultra Rare': 80,
  'Ultra Rare': 60,
  'Classic Collection': 40,

  'Special Illustration Rare': 150,
  MEGA_ATTACK_RARE: 150,
  'Rare Secret': 150,
  'Rare Holo VSTAR': 150,

  'Rare Rainbow': 150,
  'Hyper Rare': 200,
  'Mega Hyper Rare': 200,
  'Black White Rare': 200,

  'Rare Holo Star': 300,

  Promo: 5,
}
