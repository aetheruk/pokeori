import type { BattlePokemon } from './types'

export function getKnownBattleMoveIds(pokemon: BattlePokemon): string[] {
  const assignedMoveIds = (pokemon.assignedMoves || [])
    .map((entry) => (typeof entry === 'string' ? entry : entry?.moveId))
    .filter((id): id is string => typeof id === 'string' && id.length > 0)
  if (assignedMoveIds.length) return assignedMoveIds
  if (pokemon.aiMoveLoadout?.length) return pokemon.aiMoveLoadout
  return pokemon.aiMoves || []
}

export function rememberOriginalTransform(pokemon: BattlePokemon): void {
  pokemon.battleAbilityState ??= {}
  pokemon.battleAbilityState.originalTransform ??= {
    name: pokemon.name,
    formId: pokemon.formId,
    types: [...pokemon.types],
    stats: { ...pokemon.stats },
    statStages: pokemon.statStages ? { ...pokemon.statStages } : undefined,
    assignedMoves: pokemon.assignedMoves ? [...pokemon.assignedMoves] : undefined,
  }
}

export function applyBattleTransform(
  pokemon: BattlePokemon,
  defender: BattlePokemon,
  options?: { copyAbility?: boolean },
): void {
  pokemon.originalFormId ??= pokemon.formId
  rememberOriginalTransform(pokemon)
  pokemon.formId = defender.formId
  pokemon.name = defender.name
  pokemon.types = [...defender.types]
  pokemon.stats = { ...defender.stats }
  pokemon.statStages = defender.statStages
    ? { ...defender.statStages }
    : undefined
  pokemon.assignedMoves = getKnownBattleMoveIds(defender).map((moveId) => ({
    moveId,
  }))
  if (options?.copyAbility && defender.ability) {
    pokemon.ability = defender.ability
  }
}

export function restoreOriginalTransform(pokemon: BattlePokemon): string[] {
  const originalTransform = pokemon.battleAbilityState?.originalTransform
  if (!originalTransform) return []
  pokemon.name = originalTransform.name
  pokemon.formId = originalTransform.formId
  pokemon.types = [...originalTransform.types]
  pokemon.stats = { ...originalTransform.stats }
  pokemon.statStages = originalTransform.statStages
    ? { ...originalTransform.statStages }
    : undefined
  pokemon.assignedMoves = originalTransform.assignedMoves
    ? [...originalTransform.assignedMoves]
    : undefined
  if (pokemon.battleAbilityState) {
    pokemon.battleAbilityState.originalTransform = undefined
  }
  return [`${pokemon.name}'s transformation wore off.`]
}
