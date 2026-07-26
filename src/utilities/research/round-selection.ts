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
