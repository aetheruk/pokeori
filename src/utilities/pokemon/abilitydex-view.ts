import type { AbilityDexEntry } from './abilitydex'

export type AbilityDexView = 'known' | 'all'

export type DisplayAbility = {
  entry: AbilityDexEntry
  isKnown: boolean
}

export function getAbilityDexDisplayEntries({
  entries,
  registeredAbilityIds,
  view,
  query,
}: {
  entries: readonly AbilityDexEntry[]
  registeredAbilityIds: ReadonlySet<string>
  view: AbilityDexView
  query: string
}): DisplayAbility[] {
  const normalizedQuery = query.trim().toLocaleLowerCase()

  return entries
    .map((entry) => ({
      entry,
      isKnown: registeredAbilityIds.has(entry.abilityId),
    }))
    .filter((ability) => view === 'all' || ability.isKnown)
    .filter(
      (ability) =>
        !normalizedQuery ||
        (ability.isKnown &&
          ability.entry.ability.name
            .toLocaleLowerCase()
            .includes(normalizedQuery)),
    )
    .sort((left, right) => {
      if (left.isKnown !== right.isKnown) return left.isKnown ? -1 : 1

      if (left.isKnown) {
        const nameDifference = left.entry.ability.name.localeCompare(
          right.entry.ability.name,
        )
        if (nameDifference !== 0) return nameDifference
      }

      return left.entry.abilityId.localeCompare(right.entry.abilityId)
    })
}
