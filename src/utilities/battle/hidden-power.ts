import type { BattlePokemon } from './types'

const HIDDEN_POWER_TYPES = [
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
] as const

const IV_KEYS = ['hp', 'attack', 'defense', 'speed', 'specialAttack', 'specialDefense'] as const

function normalizeIv(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 0
  return Math.max(0, Math.min(31, Math.floor(value)))
}

export function resolveHiddenPower(pokemon: Pick<BattlePokemon, 'ivs'>): {
  attackType: string
  damageMultiplier: number
} {
  const ivs = pokemon.ivs ?? {}
  const values = IV_KEYS.map((key) => normalizeIv(ivs[key]))
  const typeSeed = values.reduce((sum, value, index) => sum + (value % 2) * 2 ** index, 0)
  const averageIv = values.reduce((sum, value) => sum + value, 0) / values.length

  return {
    attackType: HIDDEN_POWER_TYPES[typeSeed % HIDDEN_POWER_TYPES.length],
    damageMultiplier: Number((0.7 + (averageIv / 31) * 0.8).toFixed(2)),
  }
}
