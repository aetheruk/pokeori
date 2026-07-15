export const TCG_ENERGY_SYMBOLS: Record<string, string> = {
  Grass: '/images/tcg-energy/grass.svg',
  Fire: '/images/tcg-energy/fire.svg',
  Water: '/images/tcg-energy/water.svg',
  Lightning: '/images/tcg-energy/lightning.svg',
  Psychic: '/images/tcg-energy/psychic.svg',
  Fighting: '/images/tcg-energy/fighting.svg',
  Darkness: '/images/tcg-energy/darkness.svg',
  Metal: '/images/tcg-energy/metal.svg',
  Fairy: '/images/tcg-energy/fairy.svg',
  Dragon: '/images/tcg-energy/dragon.svg',
  Colorless: '/images/tcg-energy/colorless.svg',
}

export function getTcgEnergySymbol(type: string | null | undefined): string {
  if (!type) return TCG_ENERGY_SYMBOLS.Colorless
  return TCG_ENERGY_SYMBOLS[type] || TCG_ENERGY_SYMBOLS.Colorless
}
