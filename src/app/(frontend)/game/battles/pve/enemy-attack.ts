import {
  resolveBeforeMoveStatus,
  applyStatus,
  formatTypeEffectivenessMessage,
} from '@/utilities/battle/battle-logic'
import { getMove, type MoveConfig } from '@/data/moves'
import type {
  BattleState,
  BattlePokemon,
  BattleStance,
} from '@/utilities/battle/types'
import { finalizeTurn } from '../helpers/turn-finalization'
import type { User } from '@/payload-types'
import {
  applyPveEnemyDamage,
  resolvePveEnemyOnlyAttack,
} from '@/utilities/battle/engine/pve-turn'
import {
  applyTrainerBattleItemById,
  getTrainerItemZMoveMultiplier,
} from '@/utilities/battle/trainer-items'
import {
  clearPokemonSecondaryStatuses,
  clearSourceLinkedTrapSecondaryStatuses,
  getSecondaryStatusStatusPreventionMessage,
  processBeforeMoveSecondaryStatuses,
} from '@/utilities/battle/secondary-statuses'
import {
  consumePreparedEnemyStance,
  maybePrepareEnemyAttack,
} from '@/utilities/battle/telegraph'
import {
  applyBattleAbilityOpposingMoveUseDepletion,
  getBattleAbilityMoveBlockMessage,
  processBattleAbilitySuppressionForState,
  processBattleAbilityTerrainSet,
  processBattleAbilityWeatherSet,
  resolveBattleAbilityBeforeMove,
} from '@/utilities/battle/abilities'
import { getTerrainMoveBlockMessage } from '@/utilities/battle/terrain-effects'
import {
  applyEnemyAiMoveEffects,
  buildEnemyAiMoveChoice,
  chooseEnemyBattleAction,
  resolveEnemyAiMoveAccuracy,
  type EnemyAiMoveChoice,
} from '@/utilities/battle/enemy-ai'
import {
  consumePokemonMoveUse,
  getPokemonMoveUsesRemaining,
} from '@/utilities/battle/move-uses'
import {
  recordSuccessfulBasicAttackUse,
  recordFailedMoveUse,
  recordSuccessfulMoveUse,
  applyContinuousEndEffects,
  checkMoveBattleCondition,
  getEffectiveStanceAccuracy,
  queueDelayedMoveDamage,
  tickMoveLock,
} from '@/utilities/battle/move-effects'
import { resolveMoveContest } from '@/utilities/battle/move-contest'
import { createBattleTurnTimer } from '../helpers/timing'
import { normalizeResolvedBattleAction } from '@/utilities/battle/engine/battle-action'

function rollEnemyContinuousTurnCount(
  continuous: MoveConfig['continuous'] | undefined,
): number {
  if (!continuous) return 0
  const min = Math.max(1, Math.floor(continuous.min))
  const max = Math.max(min, Math.floor(continuous.max))
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function isEffectOnlyEnemyMove(move: MoveConfig): boolean {
  return (
    move.target === 'self' ||
    (move.damage <= 0 && !move.damageRule && !move.delayedDamage) ||
    Boolean(move.heal)
  )
}

function buildLockedEnemyMoveChoice(params: {
  state: BattleState
  activeEnemy: BattlePokemon
  playerMon: BattlePokemon
  moveId: string
}): EnemyAiMoveChoice | undefined {
  const move = getMove(params.moveId)
  if (!move) return undefined
  return buildEnemyAiMoveChoice({
    move,
    self: params.activeEnemy,
    opponent: params.playerMon,
    score: 0,
    stance: move.stance === 'random' ? 'speed' : move.stance,
    attackType: params.activeEnemy.types?.[0]?.toLowerCase() || 'normal',
    effectOnly: isEffectOnlyEnemyMove(move),
    random: Math.random,
    state: params.state,
    weather: params.state.weather?.weather,
  })
}

export async function processEnemyAttackOnly(
  state: BattleState,
  playerMon: BattlePokemon,
  enemyMon: BattlePokemon,
  user: User,
  prefixMessage?: string,
  playerStanceOverride?: BattleStance,
  options: {
    aiDecisionPlayerMon?: BattlePokemon
    playerInventory?: Record<string, number>
  } = {},
) {
  const timer = createBattleTurnTimer('processEnemyAttackOnly', {
    battleId: state.battleId,
    turn: state.turn,
    hasPrefixMessage: Boolean(prefixMessage),
    hasPlayerStanceOverride: Boolean(playerStanceOverride),
  })
  let activeEnemy = enemyMon
  const aiDecisionPlayerMon = options.aiDecisionPlayerMon ?? playerMon
  const enemyName = state.enemyName || 'Enemy'
  const activeEnemyMoveLock = state.enemyMoveLock
  if (activeEnemyMoveLock?.type === 'recharge') {
    activeEnemyMoveLock.remainingTurns = Math.max(
      0,
      activeEnemyMoveLock.remainingTurns - 1,
    )
    if (activeEnemyMoveLock.remainingTurns <= 0) {
      state.enemyMoveLock = undefined
    }

    const playerStance =
      playerStanceOverride ?? state.history[0]?.playerStance ?? 'tech'
    const message = `${prefixMessage ? `${prefixMessage}\n` : ''}${enemyName}'s ${
      activeEnemy.name
    } is recharging after ${activeEnemyMoveLock.moveName || 'its move'}.`

    state.history.unshift({
      turn: state.turn,
      playerStance,
      enemyStance: 'tech',
      result: 'win',
      damageDealt: 0,
      damageTaken: 0,
      message,
    })

    await timer.time('finalizeTurn', () => finalizeTurn(state, user.id, user))
    timer.done({
      status: state.status,
      nextTurn: state.turn,
      enemyAction: 'recharge',
    })
    return
  }

  let enemySwapped = false
  let enemySwapMsg = ''
  let trainerItemResult: ReturnType<typeof applyTrainerBattleItemById> = {
    used: false,
  }
  let enemyAiMove: EnemyAiMoveChoice | undefined
  let enemyStance: BattleStance = 'tech'
  let enemyChargeMsg = ''
  let enemyLockedMoveAction = false

  if (activeEnemyMoveLock?.type === 'charge' && activeEnemyMoveLock.remainingTurns > 0) {
    activeEnemyMoveLock.remainingTurns = Math.max(0, activeEnemyMoveLock.remainingTurns - 1)
    enemyChargeMsg = `${enemyName}'s ${activeEnemy.name} continues charging a move.`
    enemyStance = 'tech'
  } else if (activeEnemyMoveLock?.type === 'charge') {
    enemyAiMove = buildLockedEnemyMoveChoice({
      state,
      activeEnemy,
      playerMon,
      moveId: activeEnemyMoveLock.moveId,
    })
    if (enemyAiMove) {
      enemyStance = enemyAiMove.stance
      enemyLockedMoveAction = true
    }
    state.enemyMoveLock = undefined
  } else if (activeEnemyMoveLock?.type === 'continuous') {
    enemyAiMove = buildLockedEnemyMoveChoice({
      state,
      activeEnemy,
      playerMon,
      moveId: activeEnemyMoveLock.moveId,
    })
    if (enemyAiMove) {
      enemyStance = enemyAiMove.stance
      enemyLockedMoveAction = true
    } else {
      state.enemyMoveLock = undefined
    }
  } else {
    const enemyAction = chooseEnemyBattleAction({
      state,
      enemyMon: activeEnemy,
      playerMon: aiDecisionPlayerMon,
      playerStance: playerStanceOverride,
      canUseItems: true,
      canSwitch: true,
      consumeMoveUse: false,
    })

    if (enemyAction.kind === 'switch') {
      const oldEnemyName = activeEnemy.name
      clearSourceLinkedTrapSecondaryStatuses({
        state,
        sourceSide: 'enemy',
        sourcePokemon: activeEnemy,
      })
      clearPokemonSecondaryStatuses(activeEnemy)
      state.enemyMoveLock = undefined
      state.activeEnemyIndex = enemyAction.newIndex
      activeEnemy = state.enemyTeam[enemyAction.newIndex]
      activeEnemy.activeTurnStarted = state.turn + 1
      enemySwapped = true
      const suppressionMessages = processBattleAbilitySuppressionForState(state)
      const weatherMessages = processBattleAbilityWeatherSet({
        state,
        pokemon: activeEnemy,
        ownerName: state.enemyName,
      })
      const terrainMessages = processBattleAbilityTerrainSet({
        state,
        pokemon: activeEnemy,
        ownerName: state.enemyName,
      })
      enemySwapMsg = [
        `\n${state.enemyName || 'Enemy'} withdrew ${oldEnemyName} and sent out ${activeEnemy.name}!`,
        ...suppressionMessages,
        ...weatherMessages,
        ...terrainMessages,
      ].join('\n')
    } else if (enemyAction.kind === 'item') {
      trainerItemResult = applyTrainerBattleItemById(state, enemyAction.itemId)
      enemyStance = consumePreparedEnemyStance(state, activeEnemy) || 'tech'
    } else if (enemyAction.kind === 'move') {
      enemyAiMove = enemyAction.move
      enemyStance = enemyAiMove.stance
    } else {
      enemyStance =
        consumePreparedEnemyStance(state, activeEnemy) || enemyAction.stance
    }
  }
  let enemyBattleAction = normalizeResolvedBattleAction({
    stance: enemyStance,
    moveChoice: enemyAiMove,
    isLockedMoveAction: enemyLockedMoveAction,
  })

  const isEnemyZMove = Boolean(trainerItemResult.zMoveStance)
  let enemyDamageMultiplier = getTrainerItemZMoveMultiplier(trainerItemResult)

  // Enemy Status Checks
  let enemyCanMove =
    !enemySwapped &&
    !trainerItemResult.skipsEnemyAction &&
    !enemyChargeMsg
  let enemyStatusMsg = ''

  if (enemyCanMove) {
    const enemyStatusCheck = resolveBeforeMoveStatus(activeEnemy)
    const enemyAbilityCheck = enemyStatusCheck.canMove
      ? resolveBattleAbilityBeforeMove(activeEnemy, state.turn)
      : { canMove: true, message: '' }
    const enemySecondaryStatusCheck =
      enemyStatusCheck.canMove && enemyAbilityCheck.canMove
      ? processBeforeMoveSecondaryStatuses({
          state,
          pokemon: activeEnemy,
          side: 'enemy',
          move: enemyBattleAction.move,
          attackType: enemyBattleAction.attackType,
        })
      : { canMove: true, message: '' }
    const enemyMoveCheck = !enemyStatusCheck.canMove
      ? enemyStatusCheck
      : !enemyAbilityCheck.canMove
        ? enemyAbilityCheck
        : enemySecondaryStatusCheck
    if (!enemyMoveCheck.canMove) {
      enemyCanMove = false
      enemyStatusMsg = `\n${enemyMoveCheck.message}`
    } else if (enemyStatusCheck.message) {
      enemyStatusMsg = `\n${enemyStatusCheck.message}`
    } else if (enemyAbilityCheck.message) {
      enemyStatusMsg = `\n${enemyAbilityCheck.message}`
    } else if (enemySecondaryStatusCheck.message) {
      enemyStatusMsg = `\n${enemySecondaryStatusCheck.message}`
    }
  }

  if (
    enemyCanMove &&
    enemyAiMove &&
    !enemyLockedMoveAction &&
    typeof enemyAiMove.move.charged === 'number' &&
    enemyAiMove.move.charged > 0
  ) {
    const requiresVanishCharge =
      enemyAiMove.move.status?.id === 'vanished' &&
      (enemyAiMove.move.status.target ?? enemyAiMove.move.target) === 'self'
    let vanishChargeMessage = ''
    if (requiresVanishCharge) {
      const prevention = getSecondaryStatusStatusPreventionMessage({
        state,
        pokemon: activeEnemy,
        side: 'enemy',
        statusId: 'vanished',
      })
      const result = prevention
        ? { applied: false, message: prevention }
        : applyStatus(activeEnemy, 'vanished', state.weather?.weather)

      if (!result.applied) {
        enemyChargeMsg =
          result.message ||
          `${enemyName}'s ${activeEnemy.name} could not vanish.`
        enemyCanMove = false
        enemyAiMove = undefined
      } else {
        vanishChargeMessage = result.message
      }
    }

    if (enemyCanMove && enemyAiMove) {
      const chargedTurns = enemyAiMove.move.charged ?? 0
      consumePokemonMoveUse(activeEnemy, {
        moveUsesRemaining: state.enemyMoveUsesRemaining ?? 0,
      })
	      state.enemyMoveUsesRemaining = getPokemonMoveUsesRemaining(
	        activeEnemy,
	        state.enemyMoveUsesRemaining,
	      )
	      const pressureMessages = applyBattleAbilityOpposingMoveUseDepletion({
	        state,
	        attackerSide: 'enemy',
	        attacker: activeEnemy,
	        defender: playerMon,
	        move: enemyAiMove.move,
	      })
	      const remainingTurns = Math.max(0, Math.floor(chargedTurns) - 1)
      state.enemyMoveLock = {
        type: 'charge',
        moveId: enemyAiMove.move.id,
        moveName: enemyAiMove.move.name,
        selectedType: enemyAiMove.attackType,
        remainingTurns,
      }
      enemyChargeMsg = [
	        `${enemyName}'s ${activeEnemy.name} begins charging a move.`,
	        vanishChargeMessage,
	        ...pressureMessages,
	      ]
        .filter(Boolean)
        .join('\n')
      enemyCanMove = false
      enemyAiMove = undefined
    }
  }

  if (enemyCanMove && enemyAiMove && !enemyLockedMoveAction) {
    consumePokemonMoveUse(activeEnemy, {
      moveUsesRemaining: state.enemyMoveUsesRemaining ?? 0,
    })
	    state.enemyMoveUsesRemaining = getPokemonMoveUsesRemaining(
	      activeEnemy,
	      state.enemyMoveUsesRemaining,
	    )
	    const pressureMessages = applyBattleAbilityOpposingMoveUseDepletion({
	      state,
	      attackerSide: 'enemy',
	      attacker: activeEnemy,
	      defender: playerMon,
	      move: enemyAiMove.move,
	    })
	    if (pressureMessages.length) {
	      enemyStatusMsg += `\n${pressureMessages.join('\n')}`
	    }
	  } else if (!enemyCanMove) {
    enemyAiMove = undefined
  }
  enemyBattleAction = normalizeResolvedBattleAction({
    stance: enemyStance,
    moveChoice: enemyAiMove,
    isLockedMoveAction: enemyLockedMoveAction,
  })

  let { enemyDamage, shieldMessage, enemyDamageResult } =
    resolvePveEnemyOnlyAttack({
      state,
      playerMon,
      enemyMon: activeEnemy,
      enemyStance: enemyBattleAction.stance,
      enemyCanMove,
      enemyDamageMultiplier,
      weather: state.weather?.weather,
      currentTurn: state.turn,
    })

  let enemyMoveMissed = false
  let enemyMoveFailed = false
  let enemyContestMessage = ''
  let enemyDelayedDamageMessage = ''
  if (enemyCanMove && !enemyBattleAction.isBasicAttack && enemyAiMove) {
    const enemyBattleConditionFailed =
      checkMoveBattleCondition({
        move: enemyBattleAction.move,
        state,
        side: 'enemy',
        attacker: activeEnemy,
        defender: playerMon,
      }) || ''
    if (enemyBattleConditionFailed) {
      enemyMoveFailed = true
      enemyContestMessage = enemyBattleConditionFailed
    } else {
      const enemyContest = resolveMoveContest({
        move: enemyBattleAction.move,
        attacker: activeEnemy,
        defender: playerMon,
        attackType: enemyBattleAction.attackType,
        terrain: state.terrain?.terrain,
        random: Math.random,
      })
      enemyMoveFailed = enemyContest.failMove
      enemyContestMessage = enemyContest.message
      if (enemyContest.configured) {
        enemyDamageMultiplier = enemyContest.damageMultiplier ?? 1.0
      }
      const enemyAbilityMoveBlockMessage =
        !enemyMoveFailed
          ? getBattleAbilityMoveBlockMessage(playerMon, enemyBattleAction.move, enemyMon) ||
            getTerrainMoveBlockMessage({
              terrain: state.terrain?.terrain,
              move: enemyBattleAction.move,
              defender: playerMon,
            })
          : undefined
      if (enemyAbilityMoveBlockMessage) {
        enemyMoveFailed = true
        enemyContestMessage = enemyAbilityMoveBlockMessage
      }
    }
    if (enemyMoveFailed) {
      recordFailedMoveUse({
        state,
        side: 'enemy',
        pokemon: activeEnemy,
        move: enemyBattleAction.move,
      })
    }
    if (!enemyMoveFailed) {
      const accuracy = resolveEnemyAiMoveAccuracy({
        state,
        enemyMon: activeEnemy,
        defender: playerMon,
        enemyAiMove,
        weather: state.weather?.weather,
      }).missed
      enemyMoveMissed = accuracy
    }
    if (enemyMoveMissed || enemyMoveFailed || enemyBattleAction.effectOnly) {
      enemyDamage = 0
      shieldMessage = ''
    } else {
      const aiMoveAttack = resolvePveEnemyOnlyAttack({
        state,
        playerMon,
        enemyMon: activeEnemy,
        enemyStance: enemyBattleAction.stance,
        enemyCanMove,
        enemyDamageMultiplier,
        enemyAttackType: enemyBattleAction.attackType,
        enemyMoveId: enemyBattleAction.move.id,
        enemyBasePower: enemyBattleAction.basePower,
        enemyTypeEffectivenessOverride: enemyBattleAction.typeEffectivenessOverride,
        enemyCritChance: enemyBattleAction.critChance,
        enemyIgnoreDefenderStatStages: enemyBattleAction.ignoreDefenderStatStages,
        weather: state.weather?.weather,
        currentTurn: state.turn,
      })
      enemyDamage = aiMoveAttack.enemyDamage
      shieldMessage = aiMoveAttack.shieldMessage
      enemyDamageResult = aiMoveAttack.enemyDamageResult
      if (enemyBattleAction.fixedDamage !== undefined) {
        enemyDamage = enemyBattleAction.fixedDamage
        enemyDamageResult = {
          ...enemyDamageResult,
          damage: enemyBattleAction.fixedDamage,
        }
      }
      if (enemyBattleAction.move.delayedDamage) {
        enemyDelayedDamageMessage =
          queueDelayedMoveDamage({
            state,
            move: enemyBattleAction.move,
            sourceSide: 'enemy',
            targetSide: 'player',
            attacker: activeEnemy,
            damage: enemyDamage,
            attackType: enemyDamageResult.usedType,
          }) || ''
        enemyDamage = 0
      }
    }
  } else if (enemyCanMove) {
    const stanceAccuracy = getEffectiveStanceAccuracy({
      attacker: activeEnemy,
      defender: playerMon,
      state,
      attackerSide: 'enemy',
      weather: state.weather?.weather,
      stance: enemyStance,
    })
    enemyMoveMissed = stanceAccuracy < 100 && Math.random() * 100 > stanceAccuracy
  }
  let enemyAiEffectMessages: string[] = []

  if (activeEnemy.status?.id === 'victory') {
    activeEnemy.status = undefined
  }
  const appliedDamage = enemyMoveMissed
    ? { enemyDamage: 0, messages: [] }
    : applyPveEnemyDamage({
        state,
        playerMon,
        enemyDamage,
        enemyHitCount: enemyBattleAction.hitCount,
        enemyMon: activeEnemy,
        enemyStance: enemyBattleAction.stance,
        enemyAttackType: enemyDamageResult.usedType,
        enemyTypeEffectiveness: enemyDamageResult.typeEffectiveness,
        enemyCriticalHit: enemyDamageResult.isCrit,
        enemyCanMove:
          enemyCanMove && !enemyMoveFailed && !enemyBattleAction.effectOnly,
      })
  enemyDamage = appliedDamage.enemyDamage
  if (
    !enemyBattleAction.isBasicAttack &&
    !enemyMoveMissed &&
    !enemyMoveFailed &&
    (enemyBattleAction.effectOnly || playerMon.currentHp > 0)
  ) {
    enemyAiEffectMessages = applyEnemyAiMoveEffects({
      move: enemyBattleAction.move,
      self: activeEnemy,
      opponent: playerMon,
      state,
      damageDealt: enemyDamage,
      weather: state.weather?.weather,
    })
  }

  // Start with prefix message if provided
  let message = prefixMessage || ''
  message += enemySwapMsg
  if (trainerItemResult.message) {
    message += `${message ? '\n' : ''}${trainerItemResult.message}`
  }
  const enemyAttackTypeForLog = enemyCanMove && !enemyMoveMissed
    ? enemyDamageResult.usedType
    : undefined
  if (enemyChargeMsg) {
    message += `${message ? '\n' : ''}${enemyChargeMsg}`
  }
    if (enemyCanMove) {
    const displayStance = enemyBattleAction.stance
    const displayType = enemyBattleAction.attackType ?? enemyDamageResult.usedType
    const moveName = enemyBattleAction.move.name

    if (enemyBattleAction.calledByMetronome) {
      message += `${message ? '\n' : ''}${activeEnemy.name}'s Metronome called ${moveName}!`
    }
    message += `${message ? '\n' : ''}${enemyName}: ${activeEnemy.name} uses a [icon:stance:${displayStance}] [icon:type:${displayType}] ${moveName}`
    if (enemyMoveMissed) {
      message += ' missed!'
    } else if (enemyMoveFailed && !enemyBattleAction.isBasicAttack) {
      message += '.'
      if (enemyContestMessage) message += `\n${enemyContestMessage}`
    } else if (enemyBattleAction.effectOnly) {
      message += '.'
      if (enemyAiEffectMessages.length) {
        message += `\n${enemyAiEffectMessages.join('\n')}`
      }
    } else {
      message += ` dealing ${enemyDamage} damage.`
      if (isEnemyZMove) message += ' (Z-MOVE!)'
      if (enemyDamageResult.isCrit) message += ' (Critical Hit!)'
      if (enemyDamageResult.isRadiantBoost)
        message += `\n${activeEnemy.name}'s aura burns bright.`
      if (enemyDamageResult.weatherMessage)
        message += `\n${enemyDamageResult.weatherMessage}`
      message += formatTypeEffectivenessMessage(enemyDamageResult)
      if (enemyDelayedDamageMessage) message += `\n${enemyDelayedDamageMessage}`
      if (enemyAiEffectMessages.length) {
        message += `\n${enemyAiEffectMessages.join('\n')}`
      }
    }
  }
  if (shieldMessage) message += shieldMessage
  if (enemyStatusMsg) message += enemyStatusMsg
  if (appliedDamage.messages.length > 0) {
    message += `\n${appliedDamage.messages.join('\n')}`
  }

  const telegraphMessage = maybePrepareEnemyAttack({
    state,
    playerMon,
    enemyMon: activeEnemy,
    chance: state.config?.enemyAttackTelegraphChance,
  })
  if (telegraphMessage) message += `\n${telegraphMessage}`

  if (isEnemyZMove) state.enemyZMoveStance = undefined

  const playerStance =
    playerStanceOverride ?? state.history[0]?.playerStance ?? 'tech'

  state.history.unshift({
    turn: state.turn,
    playerStance,
    enemyStance: enemyBattleAction.stance,
    result: enemyCanMove && !enemyMoveMissed && !enemyMoveFailed ? 'loss' : 'win',
    damageDealt: 0,
    damageTaken: enemyDamage,
    enemyAttackType: enemyAttackTypeForLog,
    message,
  })

  if (enemyCanMove && !enemyMoveMissed && !enemyMoveFailed && enemyAttackTypeForLog) {
    if (!enemyBattleAction.isBasicAttack && !enemyBattleAction.effectOnly) {
      tickMoveLock(activeEnemy, enemyBattleAction.move.id)
      recordSuccessfulMoveUse({
        state,
        side: 'enemy',
        pokemon: activeEnemy,
        move: enemyBattleAction.move,
        attackType: enemyAttackTypeForLog,
      })
      const enemyMoveSucceeded =
        enemyDamage > 0 || Boolean(enemyBattleAction.move.delayedDamage)
      if (state.enemyMoveLock?.type === 'continuous' && state.enemyMoveLock.moveId === enemyBattleAction.move.id) {
        if (enemyMoveSucceeded) {
          state.enemyMoveLock.repeatUses = Math.max(1, state.enemyMoveLock.repeatUses ?? 1) + 1
          state.enemyMoveLock.remainingTurns = Math.max(0, state.enemyMoveLock.remainingTurns - 1)
          if (state.enemyMoveLock.remainingTurns <= 0) {
            const continuousEndMessages = applyContinuousEndEffects({
              move: enemyBattleAction.move,
              attacker: activeEnemy,
              defender: playerMon,
              weather: state.weather?.weather,
              terrain: state.terrain?.terrain,
            })
            if (continuousEndMessages.length) {
              message += `\n${continuousEndMessages.join('\n')}`
              state.history[0].message = message
            }
            state.enemyMoveLock = undefined
          }
        } else {
          state.enemyMoveLock = undefined
        }
      } else if (!enemyLockedMoveAction && enemyBattleAction.move.continuous && enemyMoveSucceeded) {
        const totalTurns = rollEnemyContinuousTurnCount(enemyBattleAction.move.continuous)
        if (totalTurns > 1) {
          state.enemyMoveLock = {
            type: 'continuous',
            moveId: enemyBattleAction.move.id,
            moveName: enemyBattleAction.move.name,
            selectedType: enemyAttackTypeForLog,
            remainingTurns: totalTurns - 1,
            repeatUses: 1,
            continuous: enemyBattleAction.move.continuous,
          }
        }
      } else if (!enemyLockedMoveAction && enemyBattleAction.move.recharge && enemyBattleAction.move.recharge > 0 && enemyMoveSucceeded) {
        state.enemyMoveLock = {
          type: 'recharge',
          moveId: enemyBattleAction.move.id,
          moveName: enemyBattleAction.move.name,
          selectedType: enemyAttackTypeForLog,
          remainingTurns: Math.max(1, Math.floor(enemyBattleAction.move.recharge)),
        }
        message += `\n${activeEnemy.name} must recharge!`
        state.history[0].message = message
      }
    } else if (enemyBattleAction.isBasicAttack) {
      recordSuccessfulBasicAttackUse({
        state,
        side: 'enemy',
        pokemon: activeEnemy,
        attackType: enemyAttackTypeForLog,
      })
    }
  }

  await timer.time('finalizeTurn', () => finalizeTurn(state, user.id, user))
  timer.done({
    status: state.status,
    nextTurn: state.turn,
    enemyAction: enemyAiMove
      ? 'move'
      : enemySwapped
        ? 'switch'
        : trainerItemResult.used
          ? 'item'
          : 'stance',
  })
}
