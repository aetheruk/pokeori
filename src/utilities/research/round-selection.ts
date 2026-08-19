export function getRandomPokemonFromPool(
  pool: number[],
  previousId?: number,
  random: () => number = Math.random,
): number {
  if (!pool.length) return 1

  const eligiblePool =
    previousId !== undefined && pool.length > 1
      ? pool.filter((id) => id !== previousId)
      : pool

  return eligiblePool[Math.floor(random() * eligiblePool.length)]
}

export function getRandomItemFromPool(
  pool: string[],
  previousId?: string,
  random: () => number = Math.random,
): string {
  if (!pool.length) return 'potion'

  const eligiblePool =
    previousId !== undefined && pool.length > 1
      ? pool.filter((id) => id !== previousId)
      : pool

  return eligiblePool[Math.floor(random() * eligiblePool.length)]
}

export function buildIdentifyOptions<T extends number | string>(
  target: T,
  pool: T[],
  optionCount = 4,
  random: () => number = Math.random,
): T[] {
  const candidates = [...new Set(pool)].filter((value) => value !== target)
  const requestedCount = Number.isFinite(optionCount)
    ? Math.max(2, Math.floor(optionCount))
    : 4
  const resolvedCount = Math.min(requestedCount, candidates.length + 1)
  const selected: T[] = [target]

  while (selected.length < resolvedCount && candidates.length > 0) {
    const index = Math.floor(random() * candidates.length)
    selected.push(candidates.splice(index, 1)[0]!)
  }

  for (let index = selected.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[selected[index], selected[swapIndex]] = [
      selected[swapIndex]!,
      selected[index]!,
    ]
  }

  return selected
}
