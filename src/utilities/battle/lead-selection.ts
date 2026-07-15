import type { BattlePokemon } from './types'

export function buildWildBattleSelectedTeam(
  team: BattlePokemon[],
  selectedIndex: number,
  maxPokemon: number,
): BattlePokemon[] {
  const selectedPokemon = team[selectedIndex]
  if (!selectedPokemon) return team

  const limit = Math.max(1, Math.min(maxPokemon || team.length, team.length))
  return [
    selectedPokemon,
    ...team.filter((_, index) => index !== selectedIndex),
  ].slice(0, limit)
}
