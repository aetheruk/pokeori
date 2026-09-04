export type PokedexDiscoveryFilter = 'all' | 'seen' | 'caught' | 'undiscovered'

export type PokedexDiscoveryProgress = {
  seen?: boolean | null
  caught?: boolean | null
}

export type PokedexDiscoveryAccess = {
  identity: boolean
  type: boolean
  measurements: boolean
  stats: boolean
  research: boolean
  variants: boolean
}

export function getPokedexDiscoveryAccess(
  progress?: PokedexDiscoveryProgress,
): PokedexDiscoveryAccess {
  const hasSeen = Boolean(progress?.seen || progress?.caught)
  const hasCaught = Boolean(progress?.caught)
  return {
    identity: hasSeen,
    type: hasSeen,
    measurements: hasCaught,
    stats: hasCaught,
    research: hasCaught,
    variants: hasCaught,
  }
}

export function matchesPokedexDiscoveryFilters({
  speciesId,
  name,
  types,
  progress,
  discoveryFilter,
  selectedType,
  searchQuery,
}: {
  speciesId: number
  name: string
  types: string[]
  progress?: PokedexDiscoveryProgress
  discoveryFilter: PokedexDiscoveryFilter
  selectedType: string
  searchQuery: string
}): boolean {
  const access = getPokedexDiscoveryAccess(progress)

  if (discoveryFilter === 'seen' && !access.identity) return false
  if (discoveryFilter === 'caught' && !progress?.caught) return false
  if (discoveryFilter === 'undiscovered' && access.identity) return false

  if (
    selectedType !== 'all' &&
    (!access.type || !types.includes(selectedType))
  ) {
    return false
  }

  const query = searchQuery.toLowerCase().trim().replace(/^#/, '')
  if (!query) return true
  if (/^\d+$/.test(query)) return speciesId.toString() === query
  return access.identity && name.toLowerCase().includes(query)
}
