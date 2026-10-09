import {
  getTypeLureSpawnChancePercent,
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

/** Adds a lure's percentage-point bonus to its type's total spawn share. */
export function applyTypeLureSpawnBoost<T extends WeightedPokemonEncounter>(
  entries: T[],
  itemId: string,
): (T & { chance: number })[] {
  const targetType = getTypeLureType(itemId)
  if (!targetType || entries.length === 0) {
    return entries.map((entry) => ({ ...entry, chance: entry.chance ?? 1 }))
  }

  const weightedEntries = entries.map((entry) => ({
    entry,
    chance: Math.max(0, entry.chance ?? 1),
    matches: getEntryTypes(entry).some(
      (type) => type.toLowerCase() === targetType,
    ),
  }))
  const totalChance = weightedEntries.reduce(
    (total, entry) => total + entry.chance,
    0,
  )
  const targetChance = weightedEntries.reduce(
    (total, entry) => total + (entry.matches ? entry.chance : 0),
    0,
  )

  if (totalChance <= 0 || targetChance <= 0) {
    return weightedEntries.map(({ entry, chance }) => ({ ...entry, chance }))
  }

  const currentShare = targetChance / totalChance
  const boostedShare = Math.min(
    1,
    currentShare + getTypeLureSpawnChancePercent(itemId) / 100,
  )
  const matchingScale = boostedShare / currentShare
  const otherShare = 1 - currentShare
  const otherScale = otherShare > 0 ? (1 - boostedShare) / otherShare : 0

  return weightedEntries.map(({ entry, chance, matches }) => ({
    ...entry,
    chance: chance * (matches ? matchingScale : otherScale),
  }))
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
