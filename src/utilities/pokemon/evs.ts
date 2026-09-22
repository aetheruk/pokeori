export const POKEMON_EV_CAPS = {
  perStat: 252,
  total: 510,
} as const

export const POKEMON_EV_STATS = [
  'hp',
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
] as const

export type PokemonEvStat = (typeof POKEMON_EV_STATS)[number]
export type PokemonEvBlock = Record<PokemonEvStat, number>
type PokemonEvInput = Partial<Record<PokemonEvStat, number | null>>

export function getEmptyPokemonEvs(): PokemonEvBlock {
  return {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  }
}

export function getPokemonEvTotal(evs: PokemonEvInput | null | undefined) {
  return POKEMON_EV_STATS.reduce((total, stat) => {
    const value = Number(evs?.[stat] ?? 0)
    return total + (Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0)
  }, 0)
}

/**
 * Normalize persisted EVs to the current configurable rules. The stat order
 * is stable so legacy over-cap values are repaired deterministically.
 */
export function normalizePokemonEvs(
  evs: PokemonEvInput | null | undefined,
): PokemonEvBlock {
  const normalized = getEmptyPokemonEvs()
  let remaining = POKEMON_EV_CAPS.total

  for (const stat of POKEMON_EV_STATS) {
    const rawValue = Number(evs?.[stat] ?? 0)
    const value = Number.isFinite(rawValue)
      ? Math.max(0, Math.floor(rawValue))
      : 0
    const nextValue = Math.min(POKEMON_EV_CAPS.perStat, value, remaining)
    normalized[stat] = nextValue
    remaining -= nextValue
  }

  return normalized
}

export function addPokemonEvs(
  currentEvs: PokemonEvInput | null | undefined,
  gains: PokemonEvInput | null | undefined,
): { evs: PokemonEvBlock; awarded: PokemonEvBlock } {
  const evs = normalizePokemonEvs(currentEvs)
  const awarded = getEmptyPokemonEvs()
  let remaining = Math.max(0, POKEMON_EV_CAPS.total - getPokemonEvTotal(evs))

  for (const stat of POKEMON_EV_STATS) {
    if (remaining <= 0) break

    const rawGain = Number(gains?.[stat] ?? 0)
    const gain = Number.isFinite(rawGain) ? Math.max(0, Math.floor(rawGain)) : 0
    if (gain <= 0) continue

    const amount = Math.min(
      gain,
      Math.max(0, POKEMON_EV_CAPS.perStat - evs[stat]),
      remaining,
    )
    if (amount <= 0) continue

    evs[stat] += amount
    awarded[stat] = amount
    remaining -= amount
  }

  return { evs, awarded }
}
