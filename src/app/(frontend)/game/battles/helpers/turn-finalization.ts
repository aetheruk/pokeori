import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redis } from '@/utilities/redis'
import { revalidatePath } from 'next/cache'
import type { BattleState } from '@/utilities/battle/types'
import type { User } from '@/payload-types'
import { processTurnEnd } from '@/utilities/battle/turn-logic'
import {
  clearPokemonSecondaryStatuses,
  clearSourceLinkedTrapSecondaryStatuses,
  processSecondaryStatusesForSwitch,
} from '@/utilities/battle/secondary-statuses'
import { battles } from '@/data/battles'
import { DYNAMAX_UNLOCK_TURNS } from '@/data/powers'
import { handleWin } from './win-handler'
import { BATTLE_TTL } from './state-management'
import { trimBattleHistory } from '@/utilities/battle/history'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import { isActivityEligibleForReplay } from '@/utilities/activity-replay'
import { applyHeldItemIfTriggered } from '@/utilities/battle/held-items'
import { persistConsumedHeldItems } from './held-items'
import { incrementUserActivityResult } from '@/utilities/user-state'
import {
  hasAvailableReplacement,
  resetPlayerPowerStateForReplacement,
} from '@/utilities/battle/switching'
import { applyTrainerBattleLossPayout } from './loss-payout'
import { formatPokemonFaintedMessage } from '@/utilities/battle/messages'
import { advanceBattleTypeChangeDuration, advanceTeraDuration, resetBattleTypeChange } from '@/utilities/battle/tera'
import { chooseEnemyReplacementIndex } from '@/utilities/battle/enemy-ai'
import { decrementFaintedPokemonFriendship } from '@/utilities/battle/friendship'
import { clearDynamaxState } from '@/utilities/battle/dynamax'
import { createBattleTurnTimer } from './timing'
import { persistPokemonBattleKOs, recordPokemonKO } from './pokemon-ko-credit'
import { processBattleAbilitySuppressionForState } from '@/utilities/battle/abilities'

function getBattleConfigForState(state: BattleState) {
  return (
    state.dynamicBattleConfig ?? battles.find((b) => b.id === state.battleId)
  )
}

function advancePowerStateForTurn(state: BattleState) {
  if (!state.powers) return

  state.powers.turnsPlayedThisBattle =
    (state.powers.turnsPlayedThisBattle ?? 0) + 1

  if (
    state.powers.turnsPlayedThisBattle >= DYNAMAX_UNLOCK_TURNS &&
    !state.powers.dynamaxAvailable
  ) {
    state.powers.dynamaxAvailable = true
  }

  const playerMon = state.playerTeam[state.activePlayerIndex]
  const enemyMon = state.enemyTeam[state.activeEnemyIndex]
  if (!playerMon) return

  if (
    playerMon.isDynamaxed &&
    typeof playerMon.dynamaxTurnsRemaining === 'number'
  ) {
    playerMon.dynamaxTurnsRemaining -= 1
    state.powers.dynamaxTurnsRemaining = Math.max(
      0,
      playerMon.dynamaxTurnsRemaining,
    )

    if (playerMon.dynamaxTurnsRemaining <= 0) {
      state.powers.dynamaxActive = false
      state.powers.dynamaxTurnsRemaining = 0
      clearDynamaxState(playerMon)
    }
  }

  advanceTeraDuration(playerMon, state.turn)
  advanceTeraDuration(enemyMon, state.turn)
  advanceBattleTypeChangeDuration(playerMon)
  advanceBattleTypeChangeDuration(enemyMon)
}

export async function finalizeTurn(
  state: BattleState,
  userId: string,
  user: User,
) {
  const timer = createBattleTurnTimer('finalizeTurn', {
    battleId: state.battleId,
    turn: state.turn,
    status: state.status,
  })

  // Process End of Turn Effects (Burn damage etc)
  const endTurnMessages = processTurnEnd(state)
  if (endTurnMessages.length > 0) {
    // Append to latest history entry
    if (state.history.length > 0) {
      state.history[0].message += `\n${endTurnMessages.join('\n')}`
    }
  }

  const { playerTeam, enemyTeam, activePlayerIndex, activeEnemyIndex } = state
  const playerMon = playerTeam[activePlayerIndex]
  const enemyMon = enemyTeam[activeEnemyIndex]
  const playerName = state.playerName
  const enemyName = state.enemyName

  if (state.history.length === 0) {
    state.history.unshift({
      turn: state.turn,
      playerStance: 'tech',
      enemyStance: 'tech',
      result: 'tie',
      damageDealt: 0,
      damageTaken: 0,
      message: 'Turn resolved.',
    })
  }

  const heldItemMessages = [
    applyHeldItemIfTriggered(playerMon, 'hp').message,
    applyHeldItemIfTriggered(enemyMon, 'hp').message,
  ].filter(Boolean)
  if (heldItemMessages.length > 0) {
    state.history[0].message += `\n${heldItemMessages.join('\n')}`
  }

  advancePowerStateForTurn(state)

  // Check Deaths
  if (playerMon.currentHp === 0) {
    recordPokemonKO(state, 'player')
    const payload = await timer.time('getPayload:faintedPlayer', () =>
      getPayload({ config: configPromise }),
    )
    await timer.time('decrementFriendship:player', () =>
      decrementFaintedPokemonFriendship({
        payload,
        pokemon: playerMon,
        userId: user.id,
      }),
    )

    state.moveHistory ??= {}
    state.moveHistory.lastFainted ??= {}
    state.moveHistory.lastFainted.player = {
      turn: state.turn,
      pokemonId: playerMon.id,
    }
    state.history[0].message += `\n${formatPokemonFaintedMessage(playerName, playerMon.name)}`

    if (hasAvailableReplacement(playerTeam, activePlayerIndex)) {
      state.pendingPlayerSwitch = true
      state.pendingPlayerSwitchReason = 'fainted'
      resetPlayerPowerStateForReplacement(state)
      state.history[0].message += `\nChoose your next Pokemon!`
    } else {
      state.status = 'lost'
      state.pendingPlayerSwitch = false
      state.pendingPlayerSwitchReason = undefined
      state.history[0].message += `\nYou were defeated by ${enemyName}...`
      // Update Loss Stats
      if (!state.chronicle) {
        await timer.time('incrementLossStats', () =>
          incrementUserActivityResult(payload as any, user.id, 'battleResults', state.battleId, {
            losses: 1,
          }),
        )
      }

      const expeditionResult = await timer.time(
        'recordExpeditionLoss',
        () =>
          recordExpeditionActivityResult(
            user.id,
            'battle',
            state.battleId,
            false,
          ),
      )
      if (expeditionResult.expedition) {
        state.expeditionProgress = expeditionResult.expedition
      }

      const battleConfig = getBattleConfigForState(state)
      if (battleConfig) {
        const amountLost = await timer.time(
          'applyTrainerBattleLossPayout',
          () =>
            applyTrainerBattleLossPayout(
              state,
              user,
              battleConfig,
            ),
        )
        if (amountLost > 0) {
          state.history[0].message += `\nYou paid ${amountLost} Pokedollars.`
        }
      }

      await timer.time('persistPokemonBattleKOs', () =>
        persistPokemonBattleKOs(state),
      )
    }
  }

  if (enemyMon.currentHp === 0 && state.status !== 'lost') {
    recordPokemonKO(state, 'enemy')
    state.moveHistory ??= {}
    state.moveHistory.lastFainted ??= {}
    state.moveHistory.lastFainted.enemy = {
      turn: state.turn,
      pokemonId: enemyMon.id,
    }
    state.history[0].message += `\n${formatPokemonFaintedMessage(enemyName, enemyMon.name, {
      isWildBattle: state.isWildBattle,
    })}`

    const nextEnemyIndex = chooseEnemyReplacementIndex({
      state,
      playerMon,
      currentEnemyIndex: activeEnemyIndex,
    })
    if (nextEnemyIndex !== -1) {
      clearSourceLinkedTrapSecondaryStatuses({
        state,
        sourceSide: 'enemy',
        sourcePokemon: enemyMon,
      })
      clearPokemonSecondaryStatuses(enemyMon)
      resetBattleTypeChange(enemyMon)
      state.enemyMoveLock = undefined
      state.activeEnemyIndex = nextEnemyIndex
      enemyTeam[nextEnemyIndex].activeTurnStarted = state.turn + 1
      state.history[0].message += `\n${enemyName} sent out ${enemyTeam[nextEnemyIndex].name}!`
      const suppressionMessages = processBattleAbilitySuppressionForState(state)
      if (suppressionMessages.length) {
        state.history[0].message += `\n${suppressionMessages.join('\n')}`
      }
      const switchMessages = processSecondaryStatusesForSwitch(state, 'enemy')
      if (switchMessages.length) {
        state.history[0].message += `\n${switchMessages.join('\n')}`
      }
    } else {
      state.status = 'won'
      state.pendingPlayerSwitch = false
      state.pendingPlayerSwitchReason = undefined
      state.history[0].message += `\nYou defeated ${enemyName}!`

      const battleConfig = getBattleConfigForState(state)
      if (user && battleConfig) {
        await timer.time('handleWin', () => handleWin(state, user, battleConfig))
      }
    }
  }

  state.history = trimBattleHistory(state.history)
  state.turn += 1
  if (state.status !== 'ongoing') {
    const battleConfig = getBattleConfigForState(state)
    const payload = await timer.time('getPayload:replayEligibility', () =>
      getPayload({ config: configPromise }),
    )
    const replayUser = (await timer.time('loadReplayUser', () =>
      payload.findByID({
        collection: 'users',
        id: user.id,
      }),
    )) as User
    state.isEligibleForReplay =
      battleConfig && !state.dynamicBattleConfig && !state.chronicle
        ? await timer.time('isActivityEligibleForReplay', () =>
            isActivityEligibleForReplay(replayUser, battleConfig, 'battle'),
          )
        : false
  }
  await timer.time('persistConsumedHeldItems', () => persistConsumedHeldItems(state))
  await timer.time('redisSetBattleState', () =>
    redis.set(`battle:${user.id}`, state, { ex: BATTLE_TTL }),
  )
  if (state.status !== 'ongoing') {
    await timer.time('revalidateEncounterPath', () => {
      revalidatePath('/game/battles/encounter')
    })
  }
  timer.done({
    finalStatus: state.status,
    nextTurn: state.turn,
  })
}
