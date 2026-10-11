import {
  getTypeLureEncounterRollCount,
  getTypeLureType,
} from '@/data/items/types'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'

export interface WeightedPokemonEncounter {
  speciesId: number
  formId?: string
  chance?: number
}

function getEntryTypes(entry: WeightedPokemonEncounter): string[] {
  const form =
    getPokemonForm(entry.formId || String(entry.speciesId)) ||
    getPokemonSpecies(entry.speciesId)
  return form?.types || []
}

/** Prefer the first matching-type draw from a lure's ordinary encounter rolls. */
export function rollLuredEncounter<T extends WeightedPokemonEncounter>(
  entries: T[],
  itemId?: string,
  random: () => number = Math.random,
): T | undefined {
  if (entries.length === 0) return undefined
  const targetType = itemId ? getTypeLureType(itemId) : null
  const rollCount = targetType ? getTypeLureEncounterRollCount(itemId!) : 1
  const weightedEntries = entries.map((entry) => ({
    entry,
    chance: entry.chance ?? 1,
  }))
  let first: T | undefined
  let matching: T | undefined
  for (let roll = 0; roll < rollCount; roll++) {
    const selected = rollWeightedEncounter(weightedEntries, random)?.entry
    if (!selected) continue
    first ??= selected
    if (
      !matching &&
      targetType &&
      getEntryTypes(selected).some((type) => type.toLowerCase() === targetType)
    ) {
      matching = selected
    }
  }
  return matching ?? first
}

export function rollWeightedEncounter<T extends { chance: number }>(
  entries: T[],
  random: () => number = Math.random,
): T | undefined {
  if (entries.length === 0) return undefined
  const totalChance = entries.reduce(
    (total, entry) => total + Math.max(0, entry.chance),
    0,
  )
  if (totalChance <= 0) return entries[0]

  let remaining = random() * totalChance
  for (const entry of entries) {
    remaining -= Math.max(0, entry.chance)
    if (remaining < 0) return entry
  }
  return entries[entries.length - 1]
}

export function getRepelMaximumLevel(
  maximumLevel: number,
  itemId?: string,
): number {
  if (itemId === 'max-repel') return maximumLevel + 10
  if (itemId === 'super-repel') return maximumLevel + 5
  return maximumLevel
}
