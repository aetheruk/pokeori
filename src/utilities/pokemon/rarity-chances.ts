import { z } from 'zod'
import {
  POKEMON_RARITY_IDS,
  resolvePokemonRarity,
  type PokemonRarityId,
  type PokemonRaritySource,
} from './rarity-effects'
import { BASE_SHINY_CHANCE } from './shiny-odds'

export type RandomPokemonRarity = Exclude<PokemonRarityId, 'normal'>
export type PokemonRarityChances = Partial<Record<RandomPokemonRarity, number>>
export const RANDOM_POKEMON_RARITIES = POKEMON_RARITY_IDS.filter(
  (id): id is RandomPokemonRarity => id !== 'normal',
)
export const rarityChancesSchema = z
  .record(z.string(), z.number().finite().min(0).max(1))
  .superRefine((value, ctx) => {
    for (const key of Object.keys(value))
      if (!RANDOM_POKEMON_RARITIES.includes(key as RandomPokemonRarity))
        ctx.addIssue({
          code: 'custom',
          path: [key],
          message: 'Unknown special rarity',
        })
  })

export function resolveRarityChances(
  parent?: PokemonRarityChances,
  override?: PokemonRarityChances,
  defaultShiny = true,
): PokemonRarityChances {
  return { shiny: defaultShiny ? BASE_SHINY_CHANCE : 0, ...parent, ...override }
}

/** A configured threshold is cumulative; smaller qualifying thresholds win. */
export function rollPokemonRarity(
  chances: PokemonRarityChances,
  random: () => number = Math.random,
): PokemonRarityId {
  const roll = random()
  const qualifying = RANDOM_POKEMON_RARITIES.filter(
    (id) => roll < (chances[id] ?? 0),
  )
  if (!qualifying.length) return 'normal'
  const minimum = Math.min(...qualifying.map((id) => chances[id]!))
  const tied = qualifying.filter((id) => chances[id] === minimum)
  return tied.length === 1 ? tied[0] : tied[Math.floor(random() * tied.length)]
}

export function hasFixedPokemonRarity(source: PokemonRaritySource) {
  return (
    source.rarity != null ||
    source.shiny === true ||
    source.isShadow === true ||
    source.isRadiant === true
  )
}

export function resolveGeneratedPokemonRarity(
  source: PokemonRaritySource,
  chances: PokemonRarityChances,
  random?: () => number,
) {
  return hasFixedPokemonRarity(source)
    ? resolvePokemonRarity(source)
    : rollPokemonRarity(chances, random)
}

export function combinedShinyChance(
  chance: number,
  rolls: number,
  extraChance = 0,
) {
  return 1 - (1 - chance) ** rolls * (1 - extraChance)
}

export function rarityProbabilities(
  chances: PokemonRarityChances,
): Record<PokemonRarityId, number> {
  const result = Object.fromEntries(
    POKEMON_RARITY_IDS.map((id) => [id, 0]),
  ) as Record<PokemonRarityId, number>
  const thresholds = [
    ...new Set(Object.values(chances).filter((value) => value > 0)),
  ].sort((a, b) => a - b)
  let previous = 0
  for (const threshold of thresholds) {
    const tied = RANDOM_POKEMON_RARITIES.filter(
      (id) => chances[id] === threshold,
    )
    for (const id of tied) result[id] = (threshold - previous) / tied.length
    previous = threshold
  }
  result.normal = 1 - previous
  return result
}
