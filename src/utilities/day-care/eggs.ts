import type { Payload } from 'payload'
import pokemonData, { type PokemonData } from '@/data/pokemon-data'
import { allGames } from '@/data/games'
import { getPokemonForm, getSpeciesIdForForm } from '@/utilities/pokemon/pokedex'
import {
  isPokemonRarityId,
  POKEMON_RARITY_IDS,
  type PokemonRarityId,
} from '@/utilities/pokemon/rarity-effects'
import { getResearcherShinyModifier, getSkillLevel } from '@/utilities/skills/unlocks'
import { getUserCompletedTasksMap, getUserPokedexMap, type PokedexMap } from '@/utilities/user-state'
import { getShinyChance, rollShiny } from '@/utilities/pokemon/shiny-odds'

export const DAY_CARE_EGG_UNLOCK_TASK_ID = 'day-care-egg-program'
export const DAY_CARE_EGG_HATCH_DELAY_MS = 12 * 60 * 60 * 1000
export const DAY_CARE_EGG_HATCH_COST_CRYSTALS = 50
export const DAY_CARE_EGG_HATCH_LEVEL = 5
export const DAY_CARE_EGG_RESEARCH_XP = 15
export const FIELD_OBSERVATION_EGG_DENOMINATOR = 26
export const DAY_CARE_EGG_MAX_OWNED = 10
export const DAY_CARE_EGG_SHINY_MULTIPLIER = 2
/** Derived from the central rarity registry so new rarities gain an egg variant automatically. */
export const DAY_CARE_EGG_RARITIES = POKEMON_RARITY_IDS

export type EggPool = {
  id: string
  weight: number
  source: 'caught' | 'seen-uncaught' | 'baby'
}

export const DAY_CARE_EGG_POOLS: EggPool[] = [
  { id: 'caught', weight: 74, source: 'caught' },
  { id: 'baby', weight: 25, source: 'baby' },
  { id: 'seen-uncaught', weight: 1, source: 'seen-uncaught' },
]

export type EggHatchResult = {
  poolId: string
  formId: string
  speciesId: number
  rarity: PokemonRarityId
  shiny: boolean
}

export type EggGrantData = {
  rarity?: PokemonRarityId | string | null
  sourceResearchId?: string
  sourceBackground?: string
  sourceRegion?: string
  sourceLocation?: string
}

export function resolveEggRarity(
  rarity?: PokemonRarityId | string | null,
): PokemonRarityId {
  return isPokemonRarityId(rarity) ? rarity : 'normal'
}

function allEligibleForms(pokedex: PokedexMap, predicate: (entry: any) => boolean) {
  return Object.values(pokedex).flatMap((forms) =>
    Object.entries(forms)
      .filter(([, entry]) => predicate(entry))
      .map(([formId]) => formId)
      .filter((formId) => {
        const form = getPokemonForm(formId)
        return !!form && !form.is_legendary && !form.is_mythical
      }),
  )
}

export function getEggPoolCandidates(pool: EggPool, pokedex: PokedexMap): string[] {
  if (pool.source === 'caught') return allEligibleForms(pokedex, (entry) => entry.caught)
  if (pool.source === 'seen-uncaught') return allEligibleForms(pokedex, (entry) => entry.seen && !entry.caught)
  return (pokemonData as PokemonData).flatMap((species) =>
    species.is_baby ? species.forms.map((form) => form.id) : [],
  ).filter((formId) => {
    const form = getPokemonForm(formId)
    return !!form && !form.is_legendary && !form.is_mythical
  })
}

export function rollEggHatch(
  pokedex: PokedexMap,
  researcherLevel: number,
  random: () => number = Math.random,
  pools: EggPool[] = DAY_CARE_EGG_POOLS,
  eggRarity?: PokemonRarityId | string | null,
): EggHatchResult | null {
  const eligible = pools
    .map((pool) => ({ pool, forms: getEggPoolCandidates(pool, pokedex) }))
    .filter(({ forms }) => forms.length > 0)
  const totalWeight = eligible.reduce((total, entry) => total + entry.pool.weight, 0)
  if (!totalWeight) return null
  let roll = random() * totalWeight
  let selected = eligible[eligible.length - 1]
  for (const entry of eligible) {
    roll -= entry.pool.weight
    if (roll < 0) {
      selected = entry
      break
    }
  }
  const formId = selected.forms[Math.floor(random() * selected.forms.length)]
  const speciesId = getSpeciesIdForForm(formId)
  if (!speciesId) return null
  const shinyChance = getShinyChance({
    sourceModifier: DAY_CARE_EGG_SHINY_MULTIPLIER,
    researcherModifier: getResearcherShinyModifier(researcherLevel),
  })
  const resolvedEggRarity = resolveEggRarity(eggRarity)
  const rarity =
    resolvedEggRarity === 'normal'
      ? rollShiny(shinyChance, 1, random)
        ? 'shiny'
        : 'normal'
      : resolvedEggRarity

  return {
    poolId: selected.pool.id,
    formId,
    speciesId,
    rarity,
    shiny: rarity === 'shiny',
  }
}

export async function canUseDayCareEggs(payload: Payload, user: any): Promise<boolean> {
  if (getSkillLevel(user.skills, 'researching') < 32) return false
  const completed = await getUserCompletedTasksMap(payload as any, user.id)
  return Boolean(completed[DAY_CARE_EGG_UNLOCK_TASK_ID])
}

export async function getActiveEggCount(payload: Payload, userId: string): Promise<number> {
  return (await payload.count({ collection: 'user-eggs' as any, where: { and: [{ user: { equals: userId } }, { status: { equals: 'incubating' } }] } })).totalDocs
}

export async function createUserEgg(
  payload: Payload,
  userId: string,
  data: EggGrantData = {},
) {
  const foundAt = new Date()
  return payload.create({
    collection: 'user-eggs' as any,
    data: {
      user: userId,
      foundAt: foundAt.toISOString(),
      hatchAt: new Date(
        foundAt.getTime() + DAY_CARE_EGG_HATCH_DELAY_MS,
      ).toISOString(),
      sourceResearchId: data.sourceResearchId,
      sourceBackground: data.sourceBackground,
      sourceRegion: data.sourceRegion,
      sourceLocation: data.sourceLocation,
      rarity: resolveEggRarity(data.rarity),
      status: 'incubating',
    },
  })
}

export async function maybeCreateFieldObservationEgg(payload: Payload, user: any, researchId: string) {
  if (!(await canUseDayCareEggs(payload, user))) return null
  const eggCount = await getActiveEggCount(payload, user.id)
  if (eggCount >= DAY_CARE_EGG_MAX_OWNED || Math.floor(Math.random() * FIELD_OBSERVATION_EGG_DENOMINATOR) !== 0) return null
  const pokemonCount = (await payload.count({ collection: 'pokemon', where: { user: { equals: user.id } } })).totalDocs
  if (pokemonCount + eggCount >= (user.maxPokemon || 50)) return null
  const research = allGames.find((game) => game.id === researchId)
  return createUserEgg(payload, user.id, {
    sourceResearchId: researchId,
    sourceBackground: research?.background,
    sourceRegion: research?.category,
    sourceLocation: research?.subCategory || research?.name,
  })
}

export async function getEggHatchOutcome(
  payload: Payload,
  user: any,
  eggRarity?: PokemonRarityId | string | null,
) {
  return rollEggHatch(
    await getUserPokedexMap(payload as any, user.id),
    getSkillLevel(user.skills, 'researching'),
    Math.random,
    DAY_CARE_EGG_POOLS,
    eggRarity,
  )
}
