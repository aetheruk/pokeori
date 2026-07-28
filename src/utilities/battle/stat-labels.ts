const BATTLE_STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  specialAttack: 'Special Attack',
  specialDefense: 'Special Defense',
  speed: 'Speed',
  accuracy: 'Accuracy',
  evasion: 'Evasion',
  crit: 'Critical-hit chance',
}

export function formatBattleStatName(stat: string): string {
  const authoredLabel = BATTLE_STAT_LABELS[stat]
  if (authoredLabel) return authoredLabel

  const words = stat
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim()
  return words
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
