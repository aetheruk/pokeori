export function shouldCandyIncreaseLevel(
  chance: number | undefined,
  random: () => number = Math.random,
): boolean {
  if (chance === undefined || chance >= 100) return true
  if (chance <= 0) return false
  return random() * 100 < chance
}
