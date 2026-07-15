import type { BattlePokemon, BattleStance } from './types'

export type DisableStanceChoice = BattleStance | 'random'
const BATTLE_STANCES: BattleStance[] = ['power', 'speed', 'tech']

export function isStanceDisabled(pokemon: BattlePokemon | undefined, stance: BattleStance): boolean {
  if (!pokemon?.disabledStance) return false
  return pokemon.disabledStance.stance === stance && pokemon.disabledStance.turnsRemaining > 0
}

export function getDisabledStanceMessage(
  pokemon: BattlePokemon | undefined,
  stance: BattleStance,
): string | null {
  if (!isStanceDisabled(pokemon, stance)) return null
  const label = stance.charAt(0).toUpperCase() + stance.slice(1)
  return `${pokemon?.name || 'This Pokemon'} cannot use ${label} Stance right now`
}

export function applyStanceDisable(params: {
  pokemon: BattlePokemon
  stance: DisableStanceChoice
  turns: number
  currentTurn?: number
  random?: () => number
}): string {
  const { pokemon, turns, currentTurn } = params
  const random = params.random ?? Math.random
  const stance =
    params.stance === 'random'
      ? BATTLE_STANCES[Math.floor(random() * BATTLE_STANCES.length)] ?? 'power'
      : params.stance
  const nextTurns = Math.max(turns, pokemon.disabledStance?.turnsRemaining || 0)
  pokemon.disabledStance = {
    stance,
    turnsRemaining: nextTurns,
    appliedTurn: currentTurn,
  }

  const label = stance.charAt(0).toUpperCase() + stance.slice(1)
  return `${pokemon.name}'s ${label} Stance was disabled for ${turns} turns!`
}

export function tickDisabledStance(pokemon: BattlePokemon | undefined, currentTurn?: number): string {
  if (!pokemon?.disabledStance) return ''
  if (pokemon.disabledStance.appliedTurn === currentTurn) return ''

  pokemon.disabledStance.turnsRemaining -= 1
  if (pokemon.disabledStance.turnsRemaining > 0) return ''

  const label = pokemon.disabledStance.stance.charAt(0).toUpperCase() + pokemon.disabledStance.stance.slice(1)
  pokemon.disabledStance = undefined
  return `${pokemon.name}'s ${label} Stance is available again.`
}
