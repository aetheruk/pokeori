import type { BattleState, BattlePokemon } from './types'
import { clearDynamaxState } from './dynamax'
import { resetBattleTypeChange } from './tera'
import {
  applyBattleAbilitySwitchOutEffects,
  clearBattleAbilityBeforeAttackTypeChange,
  clearBattleAbilitySelfMoveLock,
  getBattleAbilityLowHpSelfSwitchMessage,
  getBattleAbilitySwitchOutFormChange,
  processBattleAbilitySuppressionForState,
  processBattleAbilityTerrainSet,
  processBattleAbilityWeatherSet,
  restoreBattleAbilityMutationOnSwitchOut,
} from './abilities'
import { applyBattleFormChange } from './stats-calc'
import {
  clearPokemonSecondaryStatuses,
  clearSourceLinkedTrapSecondaryStatuses,
  processSecondaryStatusesForSwitch,
} from './secondary-statuses'

export function hasAvailableReplacement(
  team: BattlePokemon[],
  activeIndex: number,
): boolean {
  return team.some(
    (pokemon, index) => index !== activeIndex && pokemon.currentHp > 0,
  )
}

export function needsPlayerReplacement(state: BattleState): boolean {
  if (state.status !== 'ongoing') return false
  if (
    state.pendingPlayerSwitchReason === 'lead' ||
    state.pendingPlayerSwitchReason === 'move'
  )
    return false

  const activePokemon = state.playerTeam[state.activePlayerIndex]
  if (!activePokemon || activePokemon.currentHp > 0) return false

  return hasAvailableReplacement(state.playerTeam, state.activePlayerIndex)
}

export function needsPlayerLeadSelection(state: BattleState): boolean {
  return (
    state.status === 'ongoing' &&
    state.pendingPlayerSwitch === true &&
    state.pendingPlayerSwitchReason === 'lead' &&
    state.playerTeam.some((pokemon) => pokemon.currentHp > 0)
  )
}

export function needsPlayerMoveSwitch(state: BattleState): boolean {
  return (
    state.status === 'ongoing' &&
    state.pendingPlayerSwitch === true &&
    state.pendingPlayerSwitchReason === 'move' &&
    hasAvailableReplacement(state.playerTeam, state.activePlayerIndex)
  )
}

export function resetPlayerPowerStateForReplacement(state: BattleState): void {
  if (state.powers) {
    state.powers.megaEvolved = false
    state.powers.megaTurnsRemaining = 0
    state.powers.dynamaxActive = false
    state.powers.dynamaxTurnsRemaining = 0
  }

  state.zMoveStance = undefined

  const activePokemon = state.playerTeam[state.activePlayerIndex]
  if (!activePokemon) return

  activePokemon.isMega = false
  activePokemon.megaTurnsRemaining = undefined
  clearDynamaxState(activePokemon)
  activePokemon.teraTypeOverride = undefined
  activePokemon.teraTurnsRemaining = undefined
  activePokemon.teraActivatedTurn = undefined
  activePokemon.teraUsed = undefined
  activePokemon.zMoveReady = undefined
  resetBattleTypeChange(activePokemon)
  if (activePokemon.originalFormId) {
    activePokemon.formId = activePokemon.originalFormId
  }
  activePokemon.originalFormId = undefined
}

export function processBattleAbilitySwitchOut(
  pokemon: BattlePokemon | undefined,
): string[] {
  if (!pokemon) return []
  clearBattleAbilityBeforeAttackTypeChange(pokemon)
  clearBattleAbilitySelfMoveLock(pokemon)
  const messages = applyBattleAbilitySwitchOutEffects(pokemon)
  const result = getBattleAbilitySwitchOutFormChange(pokemon)
  if (applyBattleFormChange(pokemon, result.formId)) {
    messages.push(...result.messages)
  }
  messages.push(...restoreBattleAbilityMutationOnSwitchOut(pokemon))
  return messages
}

export function processBattleAbilityLowHpSelfSwitch(params: {
  state: BattleState
  side: 'player' | 'enemy'
  pokemon: BattlePokemon
  previousHp: number
  damage: number
  playerMode?: 'pending' | 'auto'
}): { switched: boolean; messages: string[] } {
  const triggerMessage = getBattleAbilityLowHpSelfSwitchMessage({
    pokemon: params.pokemon,
    previousHp: params.previousHp,
    damage: params.damage,
  })
  if (!triggerMessage) return { switched: false, messages: [] }

  const team = params.side === 'player' ? params.state.playerTeam : params.state.enemyTeam
  const activeIndex =
    params.side === 'player'
      ? params.state.activePlayerIndex
      : params.state.activeEnemyIndex
  const replacementIndex = team.findIndex(
    (candidate, index) => index !== activeIndex && candidate.currentHp > 0,
  )
  if (replacementIndex === -1) return { switched: false, messages: [] }

  if (params.side === 'player' && params.playerMode !== 'auto') {
    params.state.pendingPlayerSwitch = true
    params.state.pendingPlayerSwitchReason = 'move'
    return {
      switched: true,
      messages: [
        triggerMessage,
        `Choose a Pokemon to switch in for ${params.pokemon.name}.`,
      ],
    }
  }

  const outgoing = team[activeIndex]
  const replacement = team[replacementIndex]
  clearSourceLinkedTrapSecondaryStatuses({
    state: params.state,
    sourceSide: params.side,
    sourcePokemon: outgoing,
  })
  clearPokemonSecondaryStatuses(outgoing)
  resetBattleTypeChange(outgoing)
  const switchOutMessages = processBattleAbilitySwitchOut(outgoing)
  if (params.side === 'player') {
    params.state.activePlayerIndex = replacementIndex
  } else {
    params.state.activeEnemyIndex = replacementIndex
  }
  replacement.activeTurnStarted = params.state.turn + 1
  const switchMessages = processSecondaryStatusesForSwitch(params.state, params.side)
  const suppressionMessages = processBattleAbilitySuppressionForState(params.state)
  const weatherMessages = processBattleAbilityWeatherSet({
    state: params.state,
    pokemon: replacement,
    ownerName:
      params.side === 'player' ? params.state.playerName : params.state.enemyName,
  })
  const terrainMessages = processBattleAbilityTerrainSet({
    state: params.state,
    pokemon: replacement,
    ownerName:
      params.side === 'player' ? params.state.playerName : params.state.enemyName,
  })

  return {
    switched: true,
    messages: [
      triggerMessage,
      ...switchOutMessages,
      `${outgoing.name} went back, and ${replacement.name} took its place.`,
      ...switchMessages,
      ...suppressionMessages,
      ...weatherMessages,
      ...terrainMessages,
    ],
  }
}
