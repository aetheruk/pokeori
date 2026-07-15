import type { Payload } from 'payload'
import pokemonData, { type PokemonData } from '@/data/pokemon-data'
import { getPokemonForm, getSpeciesIdForForm } from '@/utilities/pokemon/pokedex'
import { getResearcherShinyModifier, getSkillLevel } from '@/utilities/skills/unlocks'
import { getUserCompletedTasksMap, getUserPokedexMap, type PokedexMap } from '@/utilities/user-state'

export const DAY_CARE_EGG_UNLOCK_TASK_ID = 'day-care-egg-program'
export const DAY_CARE_EGG_HATCH_DELAY_MS = 12 * 60 * 60 * 1000
export const DAY_CARE_EGG_HATCH_COST_CRYSTALS = 50
export const DAY_CARE_EGG_HATCH_LEVEL = 5
export const DAY_CARE_EGG_RESEARCH_XP = 15
export const FIELD_OBSERVATION_EGG_DENOMINATOR = 26

export type EggPool = {
  id: string
  weight: number
  source: 'caught' | 'seen-uncaught' | 'baby' | 'forms'
  formIds?: string[]
  shinyMultiplier: number
}

// Additional pools can be authored here without changing hatch logic.
export const DAY_CARE_EGG_POOLS: EggPool[] = [
  { id: 'caught', weight: 80, source: 'caught', shinyMultiplier: 1.1 },
  { id: 'baby', weight: 18, source: 'baby', shinyMultiplier: 1 },
  { id: 'seen-uncaught', weight: 2, source: 'seen-uncaught', shinyMultiplier: 1.1 },
]

export type EggHatchResult = {
  poolId: string
  formId: string
  speciesId: number
  shiny: boolean
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
  if (pool.source === 'forms') return (pool.formIds || []).filter((formId) => {
    const form = getPokemonForm(formId)
    return !!form && !form.is_legendary && !form.is_mythical
  })
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
  const shinyChance = Math.min(1, (1 / 4096) * getResearcherShinyModifier(researcherLevel) * selected.pool.shinyMultiplier)
  return { poolId: selected.pool.id, formId, speciesId, shiny: random() < shinyChance }
}

export async function canUseDayCareEggs(payload: Payload, user: any): Promise<boolean> {
  if (getSkillLevel(user.skills, 'researching') < 32) return false
  const completed = await getUserCompletedTasksMap(payload as any, user.id)
  return Boolean(completed[DAY_CARE_EGG_UNLOCK_TASK_ID])
}

export async function getActiveEggCount(payload: Payload, userId: string): Promise<number> {
  return (await payload.count({ collection: 'user-eggs' as any, where: { and: [{ user: { equals: userId } }, { status: { equals: 'incubating' } }] } })).totalDocs
}

export async function maybeCreateFieldObservationEgg(payload: Payload, user: any, researchId: string) {
  if (!(await canUseDayCareEggs(payload, user)) || Math.floor(Math.random() * FIELD_OBSERVATION_EGG_DENOMINATOR) !== 0) return null
  const pokemonCount = (await payload.count({ collection: 'pokemon', where: { user: { equals: user.id } } })).totalDocs
  const eggCount = await getActiveEggCount(payload, user.id)
  if (pokemonCount + eggCount >= (user.maxPokemon || 50)) return null
  const foundAt = new Date()
  return payload.create({ collection: 'user-eggs' as any, data: { user: user.id, foundAt: foundAt.toISOString(), hatchAt: new Date(foundAt.getTime() + DAY_CARE_EGG_HATCH_DELAY_MS).toISOString(), sourceResearchId: researchId, status: 'incubating' } })
}

export async function getEggHatchOutcome(payload: Payload, user: any) {
  return rollEggHatch(await getUserPokedexMap(payload as any, user.id), getSkillLevel(user.skills, 'researching'))
}
