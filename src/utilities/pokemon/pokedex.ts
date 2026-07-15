import pokemonData, { type PokemonData, type PokemonForm } from '@/data/pokemon-data'
import { getBundledPokemonSpriteUrl } from './local-sprites'

export type PokemonGender = 'male' | 'female' | 'genderless'

export type { PokemonData, PokemonForm } from '@/data/pokemon-data'

export type PokemonImageType = 'home' | 'sprite'

export function getPokemonImageUrl(
  formId: string | number,
  type: PokemonImageType = 'home',
  shiny = false,
  genderOrFemale?: PokemonGender | boolean | null,
): string {
  return getBundledPokemonSpriteUrl({
    formId,
    family: type === 'home' ? 'home' : 'gen-v',
    direction: 'front',
    shiny,
    female: genderOrFemale === true || genderOrFemale === 'female',
  })
}
/**
 * Flattened Pokemon object with species data moved to top level
 */
export interface FlattenedPokemon extends PokemonForm {
  capture_rate: number
  gender_rate: number
  has_gender_differences: boolean
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  habitat?: string
  shape?: string
  color?: string
}

/**
 * Get a Pokemon species by ID, optionally filtered by form name
 * If no form name is supplied, returns the base form
 * Returns flattened data structure with species properties moved to top level
 */
export function getPokemonSpecies(id: string | number, formName?: string): FlattenedPokemon | null {
  const speciesId = id.toString()
  // Search for the species first
  const species = (pokemonData as PokemonData).find((s) => s.id.toString() === speciesId)

  if (species) {
    // Find the specific form
    let form
    if (formName) {
      form = species.forms.find((f) => f.form === formName)
    } else {
      form = species.forms.find((f) => f.form === 'base') || species.forms[0]
    }

    if (form) {
      // Flatten the structure by moving species-level properties to top level
      return {
        id: form.id,
        height: form.height,
        weight: form.weight,
        base_experience: form.base_experience,
        name: form.name,
        form: form.form,
        types: form.types,
        stats: form.stats,
        capture_rate: species.capture_rate,
        gender_rate: species.gender_rate,
        has_gender_differences: species.has_gender_differences,
        is_baby: species.is_baby,
        is_legendary: species.is_legendary,
        is_mythical: species.is_mythical,
        habitat: (species as any).habitat,
        shape: (species as any).shape,
        color: (species as any).color,
      }
    }
  }

  return null
}

/**
 * Get a Pokemon form by form ID
 * Returns flattened data structure with species properties moved to top level
 */
export function getPokemonForm(id: string | number): FlattenedPokemon | null {
  const targetId = id.toString()
  // Search through all species to find the matching form
  for (const species of pokemonData as PokemonData) {
    const form = species.forms.find((f) => f.id === targetId)

    if (form) {
      // Flatten the structure by moving species-level properties to top level
      return {
        id: form.id,
        height: form.height,
        weight: form.weight,
        base_experience: form.base_experience,
        name: form.name,
        form: form.form,
        types: form.types,
        stats: form.stats,
        capture_rate: species.capture_rate,
        gender_rate: species.gender_rate,
        has_gender_differences: species.has_gender_differences,
        is_baby: species.is_baby,
        is_legendary: species.is_legendary,
        is_mythical: species.is_mythical,
        habitat: (species as any).habitat,
        shape: (species as any).shape,
        color: (species as any).color,
      }
    }
  }

  return null
}

/**
 * Get all baby Pokemon IDs
 */
export function getBaby(): string[] {
  const ids: string[] = []

  for (const species of pokemonData as PokemonData) {
    if (species.is_baby) {
      ids.push(...species.forms.map((form) => form.id))
    }
  }

  return ids
}

/**
 * Get all legendary Pokemon IDs
 */
export function getLegendary(): string[] {
  const ids: string[] = []

  for (const species of pokemonData as PokemonData) {
    if (species.is_legendary) {
      ids.push(...species.forms.map((form) => form.id))
    }
  }

  return ids
}

/**
 * Get all mythical Pokemon IDs
 */
export function getMythical(): string[] {
  const ids: string[] = []

  for (const species of pokemonData as PokemonData) {
    if (species.is_mythical) {
      ids.push(...species.forms.map((form) => form.id))
    }
  }

  return ids
}

/**
 * Get all Pokemon form IDs by form type
 * @param formType - The form type to search for (e.g., "Mega", "Mega X", "Alolan Form", etc.)
 * @returns Array of Pokemon IDs with that form type
 */
export function getByForm(formType: string): string[] {
  const ids: string[] = []

  for (const species of pokemonData as PokemonData) {
    for (const form of species.forms) {
      if (form.form === formType) {
        ids.push(form.id)
      }
    }
  }

  return ids
}

/**
 * Get all species IDs that have a specific type in their base form
 * @param type - The type to search for (e.g., "Fire", "Water", "Electric", etc.)
 * @returns Array of species IDs where the base form includes the specified type
 */
export function getByType(type: string): number[] {
  const ids: number[] = []

  for (const species of pokemonData as PokemonData) {
    // Find the base form
    const baseForm = species.forms.find((form) => form.form === 'base')

    if (baseForm?.types.includes(type)) {
      ids.push(species.id)
    }
  }

  return ids
}

/**
 * Get the species ID for a given form ID
 */
export function getSpeciesIdForForm(formId: string | number): number | null {
  const targetId = formId.toString()
  for (const species of pokemonData as PokemonData) {
    const form = species.forms.find((f) => f.id === targetId)
    if (form) return species.id
  }
  return null
}

export default pokemonData
