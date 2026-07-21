export const BASE_SHINY_CHANCE = 1 / 512

type ShinyChanceOptions = {
  sourceModifier?: number
  researcherModifier?: number
  abilityModifier?: number
}

/** Calculates the common shiny chance before encounter-specific extra rolls. */
export function getShinyChance({
  sourceModifier = 1,
  researcherModifier = 1,
  abilityModifier = 1,
}: ShinyChanceOptions = {}): number {
  return Math.min(
    1,
    Math.max(0, BASE_SHINY_CHANCE * sourceModifier * researcherModifier * abilityModifier),
  )
}

export function rollShiny(chance: number, rolls = 1, random: () => number = Math.random): boolean {
  for (let roll = 0; roll < rolls; roll += 1) {
    if (random() < chance) return true
  }
  return false
}
