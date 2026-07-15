import type { Evolution } from '@/data/evolutions'
import type { Pokemon } from '@/payload-types'

const PIKACHU_SPECIES_ID = 25
const RAICHU_SPECIES_ID = 26
const THUNDER_STONE_ID = 'thunder-stone'
const ALOLAN_RAICHU_FORM = 'Alolan Form'
const SPEWPA_SPECIES_ID = 665
const VIVILLON_SPECIES_ID = 666
const ROCKRUFF_SPECIES_ID = 744
const LYCANROC_SPECIES_ID = 745
const TOXEL_SPECIES_ID = 848
const TOXTRICITY_SPECIES_ID = 849
const LOW_KEY_TOXTRICITY_FORM = 'Low Key Form'
const DARUMAKA_SPECIES_ID = 554
const DARMANITAN_SPECIES_ID = 555
const DARMANITAN_FORM_IDS = {
  standard: '555',
  zen: '10017',
  galarianStandard: '10177',
  galarianZen: '10178',
} as const
const GALARIAN_FORM = 'Galarian Form'
const DARUMAKA_ZEN_EVOLUTION_CHANCE = 0.05

const LOW_KEY_TOXTRICITY_NATURES = new Set([
  'lonely',
  'bold',
  'relaxed',
  'timid',
  'serious',
  'modest',
  'mild',
  'quiet',
  'bashful',
  'calm',
  'gentle',
  'careful',
])

const LYCANROC_EVOLUTION_FORMS: Record<string, string> = {
  day: 'base',
  night: 'Midnight Form',
  dusk: 'Dusk Form',
}

export const VIVILLON_EVOLUTION_FORMS = [
  'base',
  'Icy Snow Pattern',
  'Polar Pattern',
  'Tundra Pattern',
  'Continental Pattern',
  'Garden Pattern',
  'Elegant Pattern',
  'Modern Pattern',
  'Marine Pattern',
  'Archipelago Pattern',
  'High Plains Pattern',
  'Sandstorm Pattern',
  'River Pattern',
  'Monsoon Pattern',
  'Savanna Pattern',
  'Sun Pattern',
  'Ocean Pattern',
  'Jungle Pattern',
  'Fancy Pattern',
  'Poké Ball Pattern',
] as const

type EvolutionTargetPokemon = Pick<
  Pokemon,
  'speciesId' | 'obtainedRegion' | 'obtainedLocation' | 'nature'
>

function isAlolaOrigin(pokemon: EvolutionTargetPokemon) {
  return [pokemon.obtainedRegion, pokemon.obtainedLocation].some(
    (value) => value?.trim().toLowerCase() === 'alola',
  )
}

export function resolveEvolutionTargetForm(
  pokemon: EvolutionTargetPokemon,
  evolution: Evolution,
  random: () => number = Math.random,
) {
  if (
    pokemon.speciesId === PIKACHU_SPECIES_ID &&
    evolution.speciesId === RAICHU_SPECIES_ID &&
    evolution.conditions.itemId === THUNDER_STONE_ID &&
    isAlolaOrigin(pokemon)
  ) {
    return ALOLAN_RAICHU_FORM
  }

  if (
    pokemon.speciesId === SPEWPA_SPECIES_ID &&
    evolution.speciesId === VIVILLON_SPECIES_ID
  ) {
    const roll = random()
    const index = Number.isFinite(roll)
      ? Math.min(
          Math.max(Math.floor(roll * VIVILLON_EVOLUTION_FORMS.length), 0),
          VIVILLON_EVOLUTION_FORMS.length - 1,
        )
      : 0

    return VIVILLON_EVOLUTION_FORMS[index] || 'base'
  }

  if (
    pokemon.speciesId === ROCKRUFF_SPECIES_ID &&
    evolution.speciesId === LYCANROC_SPECIES_ID &&
    evolution.conditions.timeOfDay
  ) {
    return LYCANROC_EVOLUTION_FORMS[evolution.conditions.timeOfDay] || 'base'
  }

  if (
    pokemon.speciesId === TOXEL_SPECIES_ID &&
    evolution.speciesId === TOXTRICITY_SPECIES_ID
  ) {
    const nature = pokemon.nature?.trim().toLowerCase()
    return nature && LOW_KEY_TOXTRICITY_NATURES.has(nature)
      ? LOW_KEY_TOXTRICITY_FORM
      : 'base'
  }

  if (
    pokemon.speciesId === DARUMAKA_SPECIES_ID &&
    evolution.speciesId === DARMANITAN_SPECIES_ID
  ) {
    const roll = random()
    const evolvesToZen = Number.isFinite(roll)
      ? roll >= 1 - DARUMAKA_ZEN_EVOLUTION_CHANCE
      : false
    const isGalarianEvolution =
      evolution.conditions.requiredSourceForm === GALARIAN_FORM ||
      evolution.targetForm === GALARIAN_FORM

    if (isGalarianEvolution) {
      return evolvesToZen
        ? DARMANITAN_FORM_IDS.galarianZen
        : DARMANITAN_FORM_IDS.galarianStandard
    }

    return evolvesToZen ? DARMANITAN_FORM_IDS.zen : DARMANITAN_FORM_IDS.standard
  }

  return evolution.targetForm || 'base'
}
