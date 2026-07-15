import type { BattlePokemon, BattleState } from './types'

export function markPlayerPokemonInvolved(
  state: BattleState,
  index = state.activePlayerIndex,
): void {
  if (index < 0 || !state.playerTeam[index]) return

  const participants = state.playerParticipantIndexes || []
  if (participants.includes(index)) return

  state.playerParticipantIndexes = [...participants, index]
}

export function getInvolvedPlayerPokemon(state: BattleState): BattlePokemon[] {
  const participantIndexes = state.playerParticipantIndexes || []

  if (participantIndexes.length > 0) {
    return participantIndexes
      .map((index) => state.playerTeam[index])
      .filter((pokemon): pokemon is BattlePokemon => !!pokemon)
  }

  const fallbackIndexes = new Set<number>()
  if (state.playerTeam[state.activePlayerIndex]) {
    fallbackIndexes.add(state.activePlayerIndex)
  }

  state.playerTeam.forEach((pokemon, index) => {
    if (pokemon.currentHp < pokemon.maxHp) {
      fallbackIndexes.add(index)
    }
  })

  return [...fallbackIndexes]
    .map((index) => state.playerTeam[index])
    .filter((pokemon): pokemon is BattlePokemon => !!pokemon)
}
