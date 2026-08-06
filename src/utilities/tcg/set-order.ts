export interface TcgSetReleaseInfo {
  name: string
  series: string
  releaseDate: string | null
}

function releaseTimestamp(releaseDate: string | null): number {
  if (!releaseDate) return Number.POSITIVE_INFINITY
  const timestamp = Date.parse(releaseDate.replaceAll('/', '-'))
  return Number.isFinite(timestamp) ? timestamp : Number.POSITIVE_INFINITY
}

export function compareTcgSetReleaseDates(
  left: TcgSetReleaseInfo,
  right: TcgSetReleaseInfo,
): number {
  const dateDelta =
    releaseTimestamp(left.releaseDate) - releaseTimestamp(right.releaseDate)
  return dateDelta !== 0 ? dateDelta : left.name.localeCompare(right.name)
}

export function sortTcgSetsByReleaseDate<T extends TcgSetReleaseInfo>(
  sets: T[],
): T[] {
  return [...sets].sort(compareTcgSetReleaseDates)
}

export function getTcgSeriesInReleaseOrder<T extends TcgSetReleaseInfo>(
  sets: T[],
): string[] {
  const firstSetBySeries = new Map<string, T>()
  for (const set of sets) {
    const firstSet = firstSetBySeries.get(set.series)
    if (!firstSet || compareTcgSetReleaseDates(set, firstSet) < 0) {
      firstSetBySeries.set(set.series, set)
    }
  }

  return sortTcgSetsByReleaseDate(Array.from(firstSetBySeries.values())).map(
    (set) => set.series,
  )
}
