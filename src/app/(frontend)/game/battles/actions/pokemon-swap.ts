import { revalidatePath } from 'next/cache'
import type { BattleState, BattleStance } from '@/utilities/battle/types'
import { getUser } from '../helpers/user'
import { BATTLE_TTL, getActiveBattleState } from '../helpers/state-management'
import { battles } from '@/data/battles'
import { processEnemyAttackOnly } from '../pve/enemy-attack'
import { calculateStats } from '@/utilities/battle/battle-logic'
import { queuePvpMoveAndResolveTurn } from '../pvp/turn-sync'
import { redis } from '@/utilities/redis'
import {
  needsPlayerLeadSelection,
  needsPlayerReplacement,
  needsPlayerMoveSwitch,
  processBattleAbilitySwitchOut,
  resetPlayerPowerStateForReplacement,
} from '@/utilities/battle/switching'
import { markPlayerPokemonInvolved } from '@/utilities/battle/participants'
import { buildWildBattleSelectedTeam } from '@/utilities/battle/lead-selection'
import { clearZMoveCharge } from '@/utilities/battle/z-move'
import {
  clearPokemonSecondaryStatuses,
  clearSourceLinkedTrapSecondaryStatuses,
  getSecondaryStatusSwitchPreventionMessage,
  processSecondaryStatusesForSwitch,
} from '@/utilities/battle/secondary-statuses'
import {
  getBattleAbilitySwitchPreventionMessage,
  processBattleAbilitySuppressionForState,
  processBattleAbilityTerrainSet,
  processBattleAbilityWeatherSet,
} from '@/utilities/battle/abilities'
import { resetBattleTypeChange } from '@/utilities/battle/tera'
import { runBattleActionWithGuard } from '../helpers/action-guard'

export async function swapPokemon(
  newIndex: number,
  clientActionId?: string,
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  message?: string
  waiting?: boolean
}> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  return runBattleActionWithGuard(user.id, clientActionId, async () => {
    const state = await getActiveBattleState(user)
    if (!state) return { success: false, error: 'No active battle' }

    if (state.status !== 'ongoing')
      return { success: false, error: 'Battle has ended' }

    const battleConfig = battles.find((b) => b.id === state.battleId)
    const isLeadSelection = !state.isPvp && needsPlayerLeadSelection(state)
    const isForcedReplacement = !state.isPvp && needsPlayerReplacement(state)
    const isMoveSwitch = !state.isPvp && needsPlayerMoveSwitch(state)

    if (
      state.playerMoveLock &&
      !isLeadSelection &&
      !isForcedReplacement &&
      !isMoveSwitch
    ) {
      return {
        success: false,
        error: 'Finish the current move before switching Pokemon',
        state,
      }
    }

    if (battleConfig?.allowSwapping === false) {
      if (!isLeadSelection && !isForcedReplacement && !isMoveSwitch) {
        return {
          success: false,
          error: 'Swapping is not allowed in this battle',
        }
      }
    }

    if (newIndex < 0 || newIndex >= state.playerTeam.length) {
      return { success: false, error: 'Invalid Pokemon index' }
    }

    if (!isLeadSelection && newIndex === state.activePlayerIndex) {
      return {
        success: false,
        error: `This Pokemon is already active (Index ${newIndex})`,
      }
    }

    const newPokemon = state.playerTeam[newIndex]
    if (newPokemon.currentHp <= 0) {
      return { success: false, error: 'Cannot swap to a fainted Pokemon' }
    }

    const oldPokemon = state.playerTeam[state.activePlayerIndex]

    if (!isLeadSelection && !isForcedReplacement && !isMoveSwitch) {
      const switchPreventionMessage = getSecondaryStatusSwitchPreventionMessage(
        {
          state,
          pokemon: oldPokemon,
          side: 'player',
        },
      )
      if (switchPreventionMessage) {
        return { success: false, error: switchPreventionMessage, state }
      }
      const enemyPokemon = state.enemyTeam[state.activeEnemyIndex]
      const abilitySwitchPreventionMessage =
        enemyPokemon &&
        getBattleAbilitySwitchPreventionMessage({
          trapper: enemyPokemon,
          switchingPokemon: oldPokemon,
        })
      if (abilitySwitchPreventionMessage) {
        return { success: false, error: abilitySwitchPreventionMessage, state }
      }
    }

    if (isLeadSelection) {
      if (state.isWildBattle) {
        state.playerTeam = buildWildBattleSelectedTeam(
          state.playerTeam,
          newIndex,
          battleConfig?.maxPokemon ?? state.config?.maxPokemon ?? 1,
        )
        state.activePlayerIndex = 0
      } else {
        state.activePlayerIndex = newIndex
      }
      const leadPokemon = state.playerTeam[state.activePlayerIndex]
      leadPokemon.activeTurnStarted = state.turn
      markPlayerPokemonInvolved(state, state.activePlayerIndex)
      state.pendingPlayerSwitch = false
      state.pendingPlayerSwitchReason = undefined
      const suppressionMessages = processBattleAbilitySuppressionForState(state)
      const weatherMessages = processBattleAbilityWeatherSet({
        state,
        pokemon: leadPokemon,
        ownerName: state.playerName,
      })
      const terrainMessages = processBattleAbilityTerrainSet({
        state,
        pokemon: leadPokemon,
        ownerName: state.playerName,
      })
      const message = [
        `${state.playerName} sent out ${leadPokemon.name}!`,
        ...suppressionMessages,
        ...weatherMessages,
        ...terrainMessages,
      ].join('\n')
      state.history.unshift({
        turn: state.turn,
        playerStance: 'tech',
        enemyStance: 'tech',
        result: 'tie',
        damageDealt: 0,
        damageTaken: 0,
        message,
      })

      await redis.set(`battle:${user.id}`, state, { ex: BATTLE_TTL })
      if (state.status !== 'ongoing') {
        revalidatePath('/game/battles/encounter')
      }
      return { success: true, state, message }
    }

    if (isForcedReplacement || isMoveSwitch) {
      state.playerMoveLock = undefined
      clearSourceLinkedTrapSecondaryStatuses({
        state,
        sourceSide: 'player',
        sourcePokemon: oldPokemon,
      })
      clearPokemonSecondaryStatuses(oldPokemon)
      resetBattleTypeChange(oldPokemon)
      const abilitySwitchOutMessages = processBattleAbilitySwitchOut(oldPokemon)
      state.activePlayerIndex = newIndex
      newPokemon.activeTurnStarted = state.turn
      markPlayerPokemonInvolved(state, newIndex)
      state.pendingPlayerSwitch = false
      state.pendingPlayerSwitchReason = undefined
      if (isMoveSwitch && state.pendingPlayerSwitchStatStages) {
        newPokemon.statStages = { ...state.pendingPlayerSwitchStatStages }
        state.pendingPlayerSwitchStatStages = undefined
      }
      resetPlayerPowerStateForReplacement(state)

      const switchMessages = processSecondaryStatusesForSwitch(state, 'player')
      const suppressionMessages = processBattleAbilitySuppressionForState(state)
      const weatherMessages = processBattleAbilityWeatherSet({
        state,
        pokemon: newPokemon,
        ownerName: state.playerName,
      })
      const terrainMessages = processBattleAbilityTerrainSet({
        state,
        pokemon: newPokemon,
        ownerName: state.playerName,
      })
      const message = [
        isMoveSwitch
          ? `${oldPokemon.name}, come back! Go, ${newPokemon.name}!`
          : `${state.playerName} sent out ${newPokemon.name}!`,
        ...abilitySwitchOutMessages,
        ...switchMessages,
        ...suppressionMessages,
        ...weatherMessages,
        ...terrainMessages,
      ].join('\n')
      state.history.unshift({
        turn: state.turn,
        playerStance: 'tech',
        enemyStance: 'tech',
        result: 'tie',
        damageDealt: 0,
        damageTaken: 0,
        message,
      })

      await redis.set(`battle:${user.id}`, state, { ex: BATTLE_TTL })
      if (state.status !== 'ongoing') {
        revalidatePath('/game/battles/encounter')
      }
      return { success: true, state, message }
    }

    let vanishMessage = ''
    if (oldPokemon.status?.id === 'vanished') {
      oldPokemon.status = undefined
      vanishMessage = `${oldPokemon.name} returned to the battle!\n`
    }

    if (state.isPvp && state.pvpBattleId) {
      const syncResult = await queuePvpMoveAndResolveTurn({
        viewerId: user.id,
        battleState: state,
        move: {
          stance: 'speed' as BattleStance,
          attackType: `swap:${newIndex}`,
        },
      })

      if (syncResult.waiting) {
        return { success: true, state: syncResult.state, waiting: true }
      }

      if (syncResult.state.status !== 'ongoing') {
        revalidatePath('/game/battles/encounter')
      }
      return { success: true, state: syncResult.state }
    }

    clearZMoveCharge(oldPokemon)
    clearSourceLinkedTrapSecondaryStatuses({
      state,
      sourceSide: 'player',
      sourcePokemon: oldPokemon,
    })
    clearPokemonSecondaryStatuses(oldPokemon)
    resetBattleTypeChange(oldPokemon)
    const abilitySwitchOutMessages = processBattleAbilitySwitchOut(oldPokemon)
    state.activePlayerIndex = newIndex
    newPokemon.activeTurnStarted = state.turn + 1
    markPlayerPokemonInvolved(state, newIndex)
    const switchMessages = processSecondaryStatusesForSwitch(state, 'player')
    const suppressionMessages = processBattleAbilitySuppressionForState(state)
    const weatherMessages = processBattleAbilityWeatherSet({
      state,
      pokemon: newPokemon,
      ownerName: state.playerName,
    })
    const terrainMessages = processBattleAbilityTerrainSet({
      state,
      pokemon: newPokemon,
      ownerName: state.playerName,
    })

    if (state.powers?.dimensionalShift?.activeEffect?.type === 'chaos') {
      state.powers.dimensionalShift.activeEffect = undefined
      oldPokemon.stats = calculateStats(oldPokemon)
      const enemyMon = state.enemyTeam[state.activeEnemyIndex]
      enemyMon.stats = calculateStats(enemyMon)
    }

    const message = [
      `${vanishMessage}${oldPokemon.name}, come back! Go, ${newPokemon.name}!`,
      ...abilitySwitchOutMessages,
      ...switchMessages,
      ...suppressionMessages,
      ...weatherMessages,
      ...terrainMessages,
    ].join('\n')
    const enemyMon = state.enemyTeam[state.activeEnemyIndex]
    await processEnemyAttackOnly(
      state,
      newPokemon,
      enemyMon,
      user,
      message,
      undefined,
      {
        aiDecisionPlayerMon: oldPokemon,
      },
    )

    return { success: true, state, message }
  })
}
