/**
 * Move Usage Handler
 * Handles using special moves during battle with advanced effects like
 * buffs, heals, status effects, and accuracy checks.
 */

'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type {
  BattleState,
  BattleStance,
  BattlePokemon,
} from '@/utilities/battle/types'
import {
  calculateDamage,
  resolveStance,
  handleShieldInteraction,
  applyStatus,
  attemptHeldAttackStatus,
  resolveBeforeMoveStatus,
  DEFAULT_STAT_STAGES,
  resolveMoveContest,
  shouldFailMoveFromStance,
  formatTypeEffectivenessMessage,
  BASE_BATTLE_POWER,
} from '@/utilities/battle/battle-logic'
import {
  applyMoveAbsorbHealing,
  applyMoveSelfDamage,
} from '@/utilities/battle/status-effects-logic'
import { logger } from '@/utilities/logger'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { finalizeTurn } from '../helpers/turn-finalization'
import { processEnemyAttackOnly } from '../pve/enemy-attack'
import { queuePvpMoveAndResolveTurn } from '../pvp/turn-sync'
import { applyPveExtraHit } from '@/utilities/battle/engine/pve-turn'
import { applyRepeatedHitDamage } from '@/utilities/battle/multi-hit'
import { getBattleMoveOptions } from '@/utilities/pokemon/pokemon-moves'
import {
  getResearcherMoveSlotCount,
  getSkillLevel,
} from '@/utilities/skills/unlocks'
import {
  applyStanceDisable,
  getDisabledStanceMessage,
} from '@/utilities/battle/stance-disable'
import { getUserInventoryMap } from '@/utilities/user-state'
import {
  needsPlayerLeadSelection,
  needsPlayerReplacement,
  processBattleAbilityLowHpSelfSwitch,
} from '@/utilities/battle/switching'
import {
  applyHeldAttackBreak,
  applyHeldItemChargeOnHit,
} from '@/utilities/battle/held-items'
import {
  applyShadowScreamDamage,
  shouldShadowScream,
} from '@/utilities/battle/shadow-pokemon'
import type { MoveConfig } from '@/data/moves'
import {
  applyEnemyAiMoveEffects,
  chooseEnemyBattleAction,
  type EnemyAiMoveChoice,
  resolveEnemyAiMoveAccuracy,
  shouldInterruptEnemyAiMove,
} from '@/utilities/battle/enemy-ai'
import {
  applyTrainerBattleItemById,
  getTrainerItemZMoveMultiplier,
} from '@/utilities/battle/trainer-items'
import { processBeforeMoveSecondaryStatuses } from '@/utilities/battle/secondary-statuses'
import { getEffectiveBattleTypes } from '@/utilities/battle/tera'
import type { WeatherType } from '@/data/weather'
import { clampStatStage } from '@/utilities/battle/stats-calc'
import {
  applySecondaryStatusDamageModifiers,
  applySecondaryStatusesFromMove,
  clearPokemonSecondaryStatuses,
  clearSourceLinkedTrapSecondaryStatuses,
  getSecondaryStatusStatusPreventionMessage,
  getSecondaryStatusTypeImmunityBypassAttackTypes,
  processSecondaryStatusFaintEffects,
} from '@/utilities/battle/secondary-statuses'
import {
  applyBattleAbilityOpponentStatStageBoostCopy,
  applyBattleAbilityStatStageDropReflection,
  applyBattleAbilityStatusReflection,
  blocksBattleInterruptByAbility,
	  blocksBattleStatStageDropByAbility,
	  applyBattleAbilityOpposingMoveUseDepletion,
	  getBattleStatStageDropBlockMessage,
	  resolveBattleAbilityBeforeMove,
	} from '@/utilities/battle/abilities'
import { resolveHiddenPower } from '@/utilities/battle/hidden-power'
import {
  consumePokemonMoveUse,
  getPokemonMoveUsesRemaining,
} from '@/utilities/battle/move-uses'
import {
  applyMoveRuntimeEffects,
  applyNextDamageModifier,
  applyContinuousEndEffects,
  checkMoveBattleCondition,
  getEffectiveMoveAccuracy,
  getConditionalDamageMultiplier,
  getMoveLockMessage,
  getMoveHealAmount,
  getRepeatDamageMultiplier,
  queueDelayedMoveDamage,
  recordBattleDamage,
  recordFailedMoveUse,
  recordSuccessfulBasicAttackUse,
  recordStatLoweredThisTurn,
  recordSuccessfulMoveUse,
  recordSwitchingOutThisTurn,
  resolveCalledMove,
  resolveDamageRuleDamage,
  resolveDynamicMoveType,
  tickMoveLock,
} from '@/utilities/battle/move-effects'
import { createBattleTurnTimer } from '../helpers/timing'
import { runBattleActionWithGuard } from '../helpers/action-guard'
import {
  applyBattleAbilityAfterKoStatStages,
  applyBattleAbilityBeforeAttackTypeChange,
  applyBattleAbilityStatStageDropTriggers,
  applyBattleAbilityDamageModifiers,
  getBattleAbilityAddedEffectMoveDamageMultiplier,
  getBattleAbilityRecoilMoveDamageMultiplier,
  getBattleAbilitySecondaryEffectChance,
  getBattleAbilityAfterKoFormChange,
  getBattleAbilityBeforeAttackFormChange,
  getBattleAbilityHpThresholdFormChange,
  getBattleAbilityMoveBlockMessage,
  getBattleAbilityMoveInterruptChance,
  getBattleSecondaryEffectBlockMessage,
  getBattleRecoilDamageBlockMessage,
  processBattleAbilityTerrainSet,
  processBattleAbilityWeatherSet,
  processBattleAbilityEntryCopiesForState,
  processBattleAbilityWeatherTypeChangesForState,
  suppressesBattleMoveAddedEffectsByAbility,
  suppressesBattleCounterPreventionByAbility,
  usesBattleAbilityMaxMultiHitDamage,
} from '@/utilities/battle/abilities'
import { applyBattleFormChange } from '@/utilities/battle/stats-calc'
import { getTerrainMoveBlockMessage } from '@/utilities/battle/terrain-effects'
import {
  clearZMoveCharge,
  consumeZMoveCharge,
  Z_MOVE_DAMAGE_MULTIPLIER,
} from '@/utilities/battle/z-move'
import {
  createBasicAttackMove,
  getBasicAttackMoveId,
  normalizeBattleAction,
  normalizeResolvedBattleAction,
  parseBasicAttackMoveId,
} from '@/utilities/battle/engine/battle-action'

type MoveSecondaryStatus = NonNullable<MoveConfig['secondaryStatuses']>[number]

function appendBattleLogLine(message: string, line: string): string {
  const trimmedLine = line.trim()
  if (!trimmedLine) return message
  if (!message) return trimmedLine
  return `${message}${message.endsWith('\n') ? '' : '\n'}${trimmedLine}`
}

function isPreDamageDefensiveSecondaryStatus(
  status: MoveSecondaryStatus,
): boolean {
  return (
    (status.target === 'self-pokemon' || status.target === 'self-side') &&
    status.effects.some((effect) => effect.type === 'damage-reduction')
  )
}

function splitSecondaryStatusesForDamageTiming(move: MoveConfig): {
  preDamage: MoveSecondaryStatus[]
  postDamage: MoveSecondaryStatus[]
} {
  const statuses = move.secondaryStatuses || []
  return {
    preDamage: statuses.filter(isPreDamageDefensiveSecondaryStatus),
    postDamage: statuses.filter(
      (status) => !isPreDamageDefensiveSecondaryStatus(status),
    ),
  }
}

function applyRandomMoveStatuses(params: {
  move: Pick<MoveConfig, 'randomStatuses' | 'target'>
  attacker: BattlePokemon
  defender: BattlePokemon
  state?: BattleState
  attackerSide?: 'player' | 'enemy'
  random?: () => number
  weather?: WeatherType
  terrain?: BattleState['terrain']
  chanceMultiplier?: number
}): string[] {
  const { move, attacker, defender } = params
  const random = params.random ?? Math.random
  const attackerSide = params.attackerSide ?? 'player'
  const defenderSide = attackerSide === 'player' ? 'enemy' : 'player'
  const randomStatuses = move.randomStatuses
  if (!randomStatuses?.options.length) return []

  const chance = (randomStatuses.chance ?? 0) * (params.chanceMultiplier ?? 1)
  if (random() * 100 >= Math.max(0, Math.min(100, chance))) return []

  const totalChance = randomStatuses.options.reduce(
    (sum, option) => sum + (option.chance ?? 1),
    0,
  )
  if (totalChance <= 0) return []

  let threshold = random() * totalChance
  const chosen = randomStatuses.options.find((option) => {
    threshold -= option.chance ?? 1
    return threshold <= 0
  })
  if (!chosen) return []

  const chosenTarget =
    chosen.target === 'random'
      ? random() < 0.5
        ? 'self'
        : 'enemy'
      : (chosen.target ?? (move.target === 'self' ? 'self' : 'enemy'))
  const target = chosenTarget === 'self' ? attacker : defender
  const prevention = getSecondaryStatusStatusPreventionMessage({
    state: params.state,
    pokemon: target,
    side: chosenTarget === 'self' ? attackerSide : defenderSide,
    statusId: chosen.id,
  })

  const result = prevention
    ? { applied: false, message: prevention }
    : applyStatus(target, chosen.id, params.weather, {
        terrain: params.terrain?.terrain,
      })
  if (!result.applied) return result.message ? [result.message] : []
  return [
    result.message,
    ...applyBattleAbilityStatusReflection({
      pokemon: target,
      source: attacker,
      statusId: chosen.id,
      weather: params.weather,
      state: params.state,
    }),
  ]
}

function rollContinuousTurnCount(
  continuous: MoveConfig['continuous'] | undefined,
): number {
  if (!continuous) return 0

  const min = Math.max(1, Math.floor(continuous.min))
  const max = Math.max(min, Math.floor(continuous.max))
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function clearPlayerMoveLockIfActive(state: BattleState, moveId: string) {
  if (state.playerMoveLock?.moveId === moveId) {
    state.playerMoveLock = undefined
  }
}

export async function useBasicAttack(
  stance: BattleStance,
  selectedType?: string,
  clientActionId?: string,
) {
  return useMove(getBasicAttackMoveId(stance), selectedType, clientActionId)
}

/**
 * Use a special move from the move catalog.
 * Moves can have special effects like buffs, heals, and status conditions.
 * Limited uses per battle based on power configuration.
 *
 * @param moveId - ID of the move to use
 */
export async function useMove(
  moveId: string,
  selectedType?: string,
  clientActionId?: string,
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  waiting?: boolean
}> {
  const timer = createBattleTurnTimer('useMove', {
    moveId,
    hasSelectedType: Boolean(selectedType),
  })
  const user = await timer.time('fetchUser', getUser)
  if (!user) return { success: false, error: 'Not authenticated' }

  return runBattleActionWithGuard(user.id, clientActionId, async () => {
    const state = await timer.time('fetchState', () =>
      getActiveBattleState(user),
    )
    if (!state) return { success: false, error: 'No active battle' }
    if (state.status !== 'ongoing')
      return { success: false, error: 'Battle has ended', state }
    if (needsPlayerLeadSelection(state)) {
      return {
        success: false,
        error: 'Choose which Pokemon to send out first',
        state,
      }
    }
    if (needsPlayerReplacement(state)) {
      return {
        success: false,
        error: 'Choose your next Pokemon before using a move',
        state,
      }
    }

    // Validate move usage limit
    if (!state.powers)
      state.powers = (await import('@/data/powers')).createInitialPowersState()

    const {
      getMove,
      getMoveDamageMultiplier,
      resolveMoveDamageMultiplier,
      getRandomMoveStance,
      getRandomMoveType,
    } = await import('@/data/moves')
    const basicAttackStance = parseBasicAttackMoveId(moveId)
    const isBasicAttack = basicAttackStance !== undefined
    let move = basicAttackStance
      ? createBasicAttackMove(basicAttackStance)
      : getMove(moveId)
    if (!move) return { success: false, error: 'Invalid move' }
    const assignedMove = move

    const activeMoveLock = state.playerMoveLock
    const isLockedMoveAction = activeMoveLock?.moveId === move.id
    let battleAction = normalizeBattleAction({
      move,
      isBasicAttack,
      isLockedMoveAction,
    })
    if (activeMoveLock && !isLockedMoveAction) {
      return {
        success: false,
        error: 'Finish the current move before choosing another move',
        state,
      }
    }

    const playerMon = state.playerTeam[state.activePlayerIndex]
    let enemyMon = state.enemyTeam[state.activeEnemyIndex]
    const consumesMoveUse = battleAction.consumesMoveUse
    if (
      consumesMoveUse &&
      getPokemonMoveUsesRemaining(playerMon, state.powers.moveUsesRemaining) <=
        0
    ) {
      return {
        success: false,
        error: 'No move uses remaining for this Pokemon',
      }
    }

    const moveTargetsSelf =
      assignedMove.target === 'self' || assignedMove.status?.target === 'self'
    if (assignedMove.id === 'rest' && playerMon.status && moveTargetsSelf) {
      return {
        success: false,
        error: `${assignedMove.name} cannot be used while ${playerMon.name} has a status condition`,
      }
    }

    if (
      !isBasicAttack &&
      !state.chronicle &&
      playerMon.pokemonResearchLevel !== undefined &&
      playerMon.pokemonResearchLevel < 1
    ) {
      return {
        success: false,
        error:
          'Research Level 1 required for this species to use assigned battle moves',
      }
    }

    const userInventory = state.chronicle
      ? state.chronicleInventory || {}
      : await timer.time('loadInventory', async () =>
          getUserInventoryMap(
            (await getPayload({ config: configPromise })) as any,
            user.id,
          ),
        )
    const researcherLevel = getSkillLevel(user.skills, 'researching')
    const assignedMoves = getBattleMoveOptions({
      assignedMoves: playerMon.assignedMoves ?? [],
      pokemonTypes: playerMon.types || [],
      pokemonFormId: playerMon.formId,
      pokemonLevel: playerMon.level,
      inventory: userInventory,
      maxAssignedMoves: state.chronicle
        ? undefined
        : getResearcherMoveSlotCount(researcherLevel),
      allowUnavailableAssignedMoves: !!state.chronicle,
      pokemon: playerMon,
      opponents: state.enemyTeam,
      profile: state.ai?.profile,
    })

    if (
      !isBasicAttack &&
      !assignedMoves.some(
        (assignedOption) => assignedOption.id === assignedMove.id,
      )
    ) {
      return {
        success: false,
        error: 'Move is not available for this Pokemon in this battle',
      }
    }

    if (activeMoveLock?.type === 'recharge' && isLockedMoveAction) {
      activeMoveLock.remainingTurns = Math.max(
        0,
        activeMoveLock.remainingTurns - 1,
      )
      if (activeMoveLock.remainingTurns <= 0) {
        clearPlayerMoveLockIfActive(state, move.id)
      }

      await processEnemyAttackOnly(
        state,
        playerMon,
        enemyMon,
        user,
        `${state.playerName}'s ${playerMon.name} is recharging after ${activeMoveLock.moveName || move.name}.`,
        undefined,
        { playerInventory: userInventory },
      )

      return { success: true, state }
    }

    const calledMoveResult = isBasicAttack
      ? { move, message: '', failed: '' }
      : resolveCalledMove({
          move,
          state,
          side: 'player',
          attacker: playerMon,
          random: Math.random,
        })
    move = calledMoveResult.move
    battleAction = normalizeBattleAction({
      move,
      isBasicAttack,
      isLockedMoveAction,
    })
    const calledMoveMessage = calledMoveResult.message || ''
    const calledMoveFailedMessage = calledMoveResult.failed || ''

    const lockedSelectedType = isLockedMoveAction
      ? activeMoveLock?.selectedType
      : undefined
    const normalizedSelectedType = (
      lockedSelectedType || selectedType
    )?.toLowerCase()
    const selectedTypeIsValid = normalizedSelectedType
      ? (playerMon.types || []).some(
          (type) => type.toLowerCase() === normalizedSelectedType,
        )
      : false
    const fallbackType = playerMon.types?.[0]?.toLowerCase() || 'normal'
    const resolvedMoveStance: BattleStance =
      move.stance === 'random' ? getRandomMoveStance() : move.stance
    const disabledStanceError = getDisabledStanceMessage(
      playerMon,
      resolvedMoveStance,
    )
    if (disabledStanceError) {
      return { success: false, error: disabledStanceError }
    }
    const moveLockError = getMoveLockMessage(playerMon, move.id)
    if (moveLockError) {
      return { success: false, error: moveLockError }
    }

    const selectedAttackType =
      selectedTypeIsValid && normalizedSelectedType
        ? normalizedSelectedType
        : fallbackType
    const hiddenPower =
      move.id === 'hidden-power' ? resolveHiddenPower(playerMon) : undefined
    const baseResolvedMoveType =
      hiddenPower?.attackType ??
      (move.forcedType === 'random'
        ? getRandomMoveType()
        : move.forcedType || selectedAttackType)
    const resolvedMoveType = resolveDynamicMoveType({
      move,
      attacker: playerMon,
      defender: enemyMon,
      weather: state.weather?.weather,
      fallbackType: baseResolvedMoveType,
    })
    const battleConditionFailedMessage =
      checkMoveBattleCondition({
        move,
        state,
        side: 'player',
        attacker: playerMon,
        defender: enemyMon,
      }) || ''

    // --- PVP LOGIC ---
    if (state.isPvp) {
      if (move.charged || move.recharge || move.continuous) {
        return {
          success: false,
          error:
            'Charged, recharge, and continuous moves are not available in PVP yet',
          state,
        }
      }

      const playerMon = state.playerTeam[state.activePlayerIndex]

      const pendingPowers = {
        mega: playerMon.isMega,
        dynamax: playerMon.isDynamaxed,
        dynamaxTurnsRemaining: playerMon.dynamaxTurnsRemaining,
        tera: false,
        zMove: isBasicAttack && !!playerMon.zMoveReady,
        zMoveCharge: false,
        megaFormId: playerMon.isMega ? playerMon.formId : undefined,
        dynamaxFormId: playerMon.isDynamaxed ? playerMon.formId : undefined,
      }

      const syncResult = await queuePvpMoveAndResolveTurn({
        viewerId: user.id,
        battleState: state,
        move: {
          stance: resolvedMoveStance,
          attackType: resolvedMoveType,
          specialMoveId: battleAction.specialMoveId,
          calledByMetronome: Boolean(calledMoveMessage),
          powers: pendingPowers,
        },
      })

      if (syncResult.waiting) {
        logger.debug(`useMove: Waiting for opponent action`)
        return { success: true, state: syncResult.state, waiting: true }
      }

      logger.debug(`useMove: Turn resolved`)
      return { success: true, state: syncResult.state }
    }

    // --- PVE LOGIC ---
    const isZMove = isBasicAttack ? consumeZMoveCharge(playerMon) : false
    if (isZMove) {
      move = { ...move, damage: Z_MOVE_DAMAGE_MULTIPLIER }
    } else if (!isBasicAttack) {
      clearZMoveCharge(playerMon)
    }

    if (shouldShadowScream(playerMon)) {
      const screamDamage = applyShadowScreamDamage(playerMon)
      const screamMessage = `${state.playerName}'s ${playerMon.name} screams out in pain! [icon:damage:${screamDamage}]`

      if (playerMon.currentHp > 0) {
        await processEnemyAttackOnly(
          state,
          playerMon,
          enemyMon,
          user,
          screamMessage,
          resolvedMoveStance,
          { playerInventory: userInventory },
        )
      } else {
        state.history.unshift({
          turn: state.turn,
          playerStance: resolvedMoveStance,
          enemyStance: 'tech',
          result: 'loss',
          damageDealt: 0,
          damageTaken: 0,
          message: screamMessage,
        })
        await finalizeTurn(state, user.id, user)
      }

      return { success: true, state }
    }

    const playerStatusCheck = resolveBeforeMoveStatus(playerMon)
    const playerAbilityCheck = playerStatusCheck.canMove
      ? resolveBattleAbilityBeforeMove(playerMon, state.turn)
      : { canMove: true, message: '' }
    const playerSecondaryStatusCheck =
      playerStatusCheck.canMove && playerAbilityCheck.canMove
      ? processBeforeMoveSecondaryStatuses({
          state,
          pokemon: playerMon,
          side: 'player',
          move,
          attackType: resolvedMoveType,
        })
      : { canMove: true, message: '' }
    const playerMoveCheck = !playerStatusCheck.canMove
      ? playerStatusCheck
      : !playerAbilityCheck.canMove
        ? playerAbilityCheck
        : playerSecondaryStatusCheck
    const playerStatusMsg = playerStatusCheck.canMove
      ? playerStatusCheck.message ||
        playerAbilityCheck.message ||
        playerSecondaryStatusCheck.message
      : ''
    if (!playerMoveCheck.canMove) {
      if (activeMoveLock?.type === 'continuous') {
        clearPlayerMoveLockIfActive(state, move.id)
      }
      state.history.unshift({
        turn: state.turn,
        playerStance: resolvedMoveStance,
        enemyStance: 'tech',
        result: 'loss',
        damageDealt: 0,
        damageTaken: 0,
        message: playerMoveCheck.message,
      })
      if (playerMon.currentHp > 0) {
        await processEnemyAttackOnly(
          state,
          playerMon,
          enemyMon,
          user,
          undefined,
          undefined,
          { playerInventory: userInventory },
        )
      } else {
        await finalizeTurn(state, user.id, user)
      }
      return { success: true, state }
    }

    if (
      !isLockedMoveAction &&
      typeof move.charged === 'number' &&
      move.charged > 0
    ) {
      const requiresVanishCharge =
        move.status?.id === 'vanished' &&
        (move.status.target ?? move.target) === 'self'
      let vanishChargeMessage = ''
      if (requiresVanishCharge) {
        const prevention = getSecondaryStatusStatusPreventionMessage({
          state,
          pokemon: playerMon,
          side: 'player',
          statusId: 'vanished',
        })
        const result = prevention
          ? { applied: false, message: prevention }
          : applyStatus(playerMon, 'vanished', state.weather?.weather)

        if (!result.applied) {
          await processEnemyAttackOnly(
            state,
            playerMon,
            enemyMon,
            user,
            result.message ||
              `${state.playerName}'s ${playerMon.name} could not vanish.`,
            undefined,
            { playerInventory: userInventory },
          )

          return { success: true, state }
        }

        vanishChargeMessage = result.message
      }

	      consumePokemonMoveUse(playerMon, state.powers)
	      const pressureMessages = applyBattleAbilityOpposingMoveUseDepletion({
	        state,
	        attackerSide: 'player',
	        attacker: playerMon,
	        defender: enemyMon,
	        move,
	      })
	      const remainingTurns = Math.max(0, Math.floor(move.charged) - 1)
      state.playerMoveLock = {
        type: 'charge',
        moveId: move.id,
        moveName: move.name,
        selectedType: selectedAttackType,
        remainingTurns,
      }

      await processEnemyAttackOnly(
        state,
        playerMon,
        enemyMon,
        user,
        [
	          `${state.playerName}'s ${playerMon.name} begins charging a move.`,
	          vanishChargeMessage,
	          ...pressureMessages,
	        ]
          .filter(Boolean)
          .join('\n'),
        undefined,
        { playerInventory: userInventory },
      )

      return { success: true, state }
    }

    if (
      activeMoveLock?.type === 'charge' &&
      activeMoveLock.remainingTurns > 0
    ) {
      activeMoveLock.remainingTurns = Math.max(
        0,
        activeMoveLock.remainingTurns - 1,
      )
      await processEnemyAttackOnly(
        state,
        playerMon,
        enemyMon,
        user,
        `${state.playerName}'s ${playerMon.name} continues charging a move.`,
        undefined,
        { playerInventory: userInventory },
      )

      return { success: true, state }
    }

    if (activeMoveLock?.type === 'charge') {
      clearPlayerMoveLockIfActive(state, move.id)
    }

	    let playerMoveUseDepletionMessages: string[] = []
	    if (consumesMoveUse) {
	      consumePokemonMoveUse(playerMon, state.powers)
	      playerMoveUseDepletionMessages =
	        applyBattleAbilityOpposingMoveUseDepletion({
	          state,
	          attackerSide: 'player',
	          attacker: playerMon,
	          defender: enemyMon,
	          move,
	        })
	    }

    let enemySwapped = false
    let enemySwapMsg = ''
    let enemyRechargeMsg = ''
    let trainerItemResult: ReturnType<typeof applyTrainerBattleItemById> = {
      used: false,
    }
    let enemyAiMove: EnemyAiMoveChoice | undefined
    let enemyStance: BattleStance = 'tech'

    const activeEnemyMoveLock = state.enemyMoveLock
    if (activeEnemyMoveLock?.type === 'recharge') {
      activeEnemyMoveLock.remainingTurns = Math.max(
        0,
        activeEnemyMoveLock.remainingTurns - 1,
      )
      if (activeEnemyMoveLock.remainingTurns <= 0) {
        state.enemyMoveLock = undefined
      }
      enemyRechargeMsg = `${state.enemyName || 'Enemy'}'s ${enemyMon.name} is recharging after ${
        activeEnemyMoveLock.moveName || 'its move'
      }.`
    } else {
      const enemyAction = chooseEnemyBattleAction({
        state,
        enemyMon,
        playerMon,
        playerStance: resolvedMoveStance,
        opponentUsedMove: !isBasicAttack,
        canUseItems: true,
        canSwitch: true,
        consumeMoveUse: false,
      })

      if (enemyAction.kind === 'switch') {
        const oldEnemyName = enemyMon.name
        recordSwitchingOutThisTurn({ state, side: 'enemy', pokemon: enemyMon })
        clearSourceLinkedTrapSecondaryStatuses({
          state,
          sourceSide: 'enemy',
          sourcePokemon: enemyMon,
        })
        clearPokemonSecondaryStatuses(enemyMon)
        state.enemyMoveLock = undefined
        state.activeEnemyIndex = enemyAction.newIndex
        enemyMon = state.enemyTeam[enemyAction.newIndex]
        enemyMon.activeTurnStarted = state.turn + 1
        enemySwapped = true
        const weatherMessages = processBattleAbilityWeatherSet({
          state,
          pokemon: enemyMon,
          ownerName: state.enemyName,
        })
        const terrainMessages = processBattleAbilityTerrainSet({
          state,
          pokemon: enemyMon,
          ownerName: state.enemyName,
        })
        enemySwapMsg = [
          `${state.enemyName || 'Enemy'} withdrew ${oldEnemyName} and sent out ${enemyMon.name}!`,
          ...weatherMessages,
          ...terrainMessages,
        ].join('\n')
      } else if (enemyAction.kind === 'item') {
        trainerItemResult = applyTrainerBattleItemById(
          state,
          enemyAction.itemId,
        )
        enemyStance = 'tech'
      } else if (enemyAction.kind === 'move') {
        enemyAiMove = enemyAction.move
        enemyStance = enemyAiMove.stance
      } else {
        enemyStance = enemyAction.stance
      }
    }

    const resolution = resolveStance(resolvedMoveStance, enemyStance)
    const contest = resolveMoveContest({
      move,
      attacker: playerMon,
      defender: enemyMon,
      attackType: resolvedMoveType,
      terrain: state.terrain?.terrain,
      random: Math.random,
    })
    const stanceOutcome = contest.configured
      ? contest.result
      : resolution.result
    const moveFailedFromStance = shouldFailMoveFromStance({
      failOnStance: move.failOnStance,
      result: stanceOutcome,
    })
    const enemyBattleConditionFailedMessage =
      enemyAiMove &&
      !enemySwapped &&
      !enemyRechargeMsg &&
      !trainerItemResult.skipsEnemyAction
        ? checkMoveBattleCondition({
            move: enemyAiMove.move,
            state,
            side: 'enemy',
            attacker: enemyMon,
            defender: playerMon,
          }) || ''
        : ''
    const enemyContest =
      enemyAiMove && !enemyBattleConditionFailedMessage
        ? resolveMoveContest({
            move: enemyAiMove.move,
            attacker: enemyMon,
            defender: playerMon,
            attackType: enemyAiMove.attackType,
            terrain: state.terrain?.terrain,
            random: Math.random,
          })
        : undefined
    const enemyMoveFailedFromContest = Boolean(
      enemyBattleConditionFailedMessage || enemyContest?.failMove,
    )
    const playerMovePreventedByEnemyPriority = Boolean(
      enemyAiMove &&
        enemyContest?.preventCounter &&
        !suppressesBattleCounterPreventionByAbility(enemyMon) &&
        !enemyMoveFailedFromContest &&
        !enemySwapped &&
        !enemyRechargeMsg &&
        !trainerItemResult.skipsEnemyAction,
    )
    let enemyBattleAction = normalizeResolvedBattleAction({
      stance: enemyStance,
      moveChoice: enemyAiMove,
    })
    let moveFailed =
      Boolean(calledMoveFailedMessage || battleConditionFailedMessage) ||
      contest.failMove ||
      moveFailedFromStance ||
      playerMovePreventedByEnemyPriority
    const abilityMoveBlockMessage = !moveFailed
      ? getBattleAbilityMoveBlockMessage(enemyMon, move, playerMon) ||
        getTerrainMoveBlockMessage({
          terrain: state.terrain?.terrain,
          move,
          defender: enemyMon,
        })
      : undefined
    if (abilityMoveBlockMessage) {
      moveFailed = true
    }
    if (moveFailed && !isBasicAttack) {
      recordFailedMoveUse({
        state,
        side: 'player',
        pokemon: playerMon,
        move,
      })
    }
    const moveDamageMultiplier = contest.configured
      ? (contest.damageMultiplier ?? 1.0)
      : resolution.damageMultiplier

    const wasVanishedBeforeMove = playerMon.status?.id === 'vanished'
    const isContinuousMoveTurn =
      move.continuous !== undefined || activeMoveLock?.type === 'continuous'
    const repeatDamageMultiplier = getRepeatDamageMultiplier({
      move,
      previousUses:
        activeMoveLock?.type === 'continuous' &&
        activeMoveLock.moveId === move.id
          ? (activeMoveLock.repeatUses ?? 1)
          : 0,
    })
    const recoilMoveDamageMultiplier = getBattleAbilityRecoilMoveDamageMultiplier(
      playerMon,
      move,
    )
    const addedEffectMoveDamageMultiplier =
      getBattleAbilityAddedEffectMoveDamageMultiplier(playerMon, move)
    const suppressesAddedEffects =
      suppressesBattleMoveAddedEffectsByAbility(playerMon, move)
    const secondaryEffectChanceMultiplier =
      getBattleAbilitySecondaryEffectChance(playerMon, move, 100) / 100

    // Apply buffs
	    let message = playerStatusMsg
	    if (playerMoveUseDepletionMessages.length) {
	      message += `${message ? '\n' : ''}${playerMoveUseDepletionMessages.join('\n')}`
	    }
    if (calledMoveMessage) {
      message += `${message ? '\n' : ''}${calledMoveMessage}`
    }
    if (calledMoveFailedMessage) {
      message += `${message ? '\n' : ''}${calledMoveFailedMessage}`
    }
    if (enemySwapMsg) {
      message += `${message ? '\n' : ''}${enemySwapMsg}`
    }
    if (enemyRechargeMsg) {
      message += `${message ? '\n' : ''}${enemyRechargeMsg}`
    }
    if (trainerItemResult.message) {
      message += `${message ? '\n' : ''}${trainerItemResult.message}`
    }
    if (message) {
      message += '\n'
    }
    if (battleConditionFailedMessage) {
      message += `${battleConditionFailedMessage}\n`
    }
    if (abilityMoveBlockMessage) {
      message += `${abilityMoveBlockMessage}\n`
    }
    if (!moveFailed && move.buffs) {
      for (const buff of move.buffs) {
        const chance = buff.chance ?? 100
        if (Math.random() * 100 >= chance) {
          continue
        }

        const targetMon =
          (buff.target ?? 'self') === 'self' ? playerMon : enemyMon
        const targetSide =
          (buff.target ?? 'self') === 'self' ? 'player' : 'enemy'
        const opposingMon = targetMon === playerMon ? enemyMon : playerMon
        const opposingSide = targetMon === playerMon ? 'enemy' : 'player'
        if (buff.stages < 0) {
          const reflection = applyBattleAbilityStatStageDropReflection({
            pokemon: targetMon,
            opponent: opposingMon,
            stat: buff.stat,
            stages: buff.stages,
            source: targetMon === playerMon ? 'self' : 'opponent',
            sourcePokemon: playerMon,
          })
          if (reflection.reflected) {
            message += `${reflection.messages.join(' ')} `
            if (reflection.changed) {
              recordStatLoweredThisTurn({
                state,
                side: opposingSide,
                pokemon: opposingMon,
              })
            }
            continue
          }
        }
        if (
          buff.stages < 0 &&
          blocksBattleStatStageDropByAbility({
            pokemon: targetMon,
            stat: buff.stat,
            source: targetMon === playerMon ? 'self' : 'opponent',
            sourcePokemon: playerMon,
          })
        ) {
          message += `${getBattleStatStageDropBlockMessage(targetMon)} `
          continue
        }
        if (!targetMon.statStages) {
          targetMon.statStages = { ...DEFAULT_STAT_STAGES }
        }
        const statKey = buff.stat
        targetMon.statStages[statKey] = clampStatStage(
          targetMon.statStages[statKey] + buff.stages
        )
        if (buff.stages < 0) {
          recordStatLoweredThisTurn({
            state,
            side: targetSide,
            pokemon: targetMon,
          })
          const triggerMessages = applyBattleAbilityStatStageDropTriggers({
            pokemon: targetMon,
            source: targetMon === playerMon ? 'self' : 'opponent',
          })
          if (triggerMessages.length) {
            message += `${triggerMessages.join(' ')} `
          }
        }
        const direction = buff.stages >= 0 ? 'rose' : 'fell'
        message += `${targetMon.name}'s ${statKey} ${direction}! `
        if (buff.stages > 0) {
          const copyMessages = applyBattleAbilityOpponentStatStageBoostCopy({
            pokemon: opposingMon,
            boostedPokemon: targetMon,
            stat: statKey,
            stages: buff.stages,
          })
          if (copyMessages.length) {
            message += `${copyMessages.join(' ')} `
          }
        }
      }
    }

    // Apply healing
    if (!moveFailed && move.heal) {
      const healAmount = getMoveHealAmount({
        move,
        pokemon: playerMon,
        weather: state.weather?.weather,
      })
      playerMon.currentHp = Math.min(
        playerMon.maxHp,
        playerMon.currentHp + healAmount,
      )
      message += `${playerMon.name} healed ${healAmount} HP! `
    }

    // Accuracy check
    const accuracy = getEffectiveMoveAccuracy({
      move,
      state,
      attacker: playerMon,
      defender: enemyMon,
      attackerSide: 'player',
      weather: state.weather?.weather,
      consumeNextAccuracyBypass: true,
    })
    let moveMissed = false
    let playerDamage = 0
    let playerAttackTypeForLog: string | undefined

    if (accuracy < 100 && Math.random() * 100 > accuracy) {
      moveMissed = true
      if (!isBasicAttack) {
        recordFailedMoveUse({
          state,
          side: 'player',
          pokemon: playerMon,
          move,
        })
      }
      const failureMessage =
        move.damage === 0 ? 'attack failed!' : 'attack missed!'
      message += `\n${playerMon.name}'s ${failureMessage}`
    } else {
      // Damage calculation
      let typeEffectivenessMsg = ''
      if (moveFailed) {
        const moveType = resolvedMoveType.toLowerCase()
        const playerName = state.playerName || 'Player'
        playerAttackTypeForLog = moveType
        message = appendBattleLogLine(
          message,
          `${playerName}: ${playerMon.name} uses [icon:stance:${resolvedMoveStance}] [icon:type:${moveType}] ${move.name}!`,
        )
        if (isZMove) message += ' (Z-MOVE!)'
        if (contest.message) message += ` ${contest.message}`
        if (playerMovePreventedByEnemyPriority) {
          message += ` ${playerMon.name}'s move was cut off!`
        }
      } else if (
        !move.heal &&
        (move.damage > 0 || move.damageRule || move.delayedDamage)
      ) {
        // Move damage is a multiplier against the standard base power.
        const resolvedMoveDamage =
          !hiddenPower && !move.delayedDamage
            ? resolveMoveDamageMultiplier(
                move,
                getEffectiveBattleTypes(enemyMon),
                Math.random,
                state.weather?.weather,
                { forceMaxDamageRange: usesBattleAbilityMaxMultiHitDamage(playerMon, move) },
              )
            : undefined
        const moveDamage =
          move.delayedDamage?.damage ??
          hiddenPower?.damageMultiplier ??
          resolvedMoveDamage?.damageMultiplier ??
          getMoveDamageMultiplier(
            move,
            getEffectiveBattleTypes(enemyMon),
            Math.random,
            state.weather?.weather,
            { forceMaxDamageRange: usesBattleAbilityMaxMultiHitDamage(playerMon, move) },
          )
        const moveHitCount =
          !hiddenPower && !move.delayedDamage ? (resolvedMoveDamage?.hitCount ?? 1) : 1
        const basePower = Math.max(
          1,
          Math.round(BASE_BATTLE_POWER * moveDamage),
        )

        const moveAttackType = resolvedMoveType
        const typeEffectivenessOverride = move.ignoreTypeEffectiveness
          ? 1
          : undefined
        const playerEntryMessages = processBattleAbilityEntryCopiesForState(state)
        const playerForecastMessages =
          processBattleAbilityWeatherTypeChangesForState(state)
        if (playerEntryMessages.length || playerForecastMessages.length) {
          message += `\n${[...playerEntryMessages, ...playerForecastMessages].join('\n')}`
        }
        const playerBeforeAttack = getBattleAbilityBeforeAttackFormChange({
          pokemon: playerMon,
          damage:
            moveDamageMultiplier *
            repeatDamageMultiplier *
            recoilMoveDamageMultiplier *
            addedEffectMoveDamageMultiplier *
            basePower,
        })
        if (applyBattleFormChange(playerMon, playerBeforeAttack.formId)) {
          message += `\n${playerBeforeAttack.messages.join('\n')}`
        }
        const playerBeforeAttackTypeMessages =
          applyBattleAbilityBeforeAttackTypeChange({
            pokemon: playerMon,
            attackType: moveAttackType,
            damage:
              moveDamageMultiplier *
              repeatDamageMultiplier *
              recoilMoveDamageMultiplier *
              addedEffectMoveDamageMultiplier *
              basePower,
          })
        if (playerBeforeAttackTypeMessages.length) {
          message += `\n${playerBeforeAttackTypeMessages.join('\n')}`
        }

        const result = calculateDamage(
          playerMon,
          enemyMon,
          resolvedMoveStance,
          moveDamageMultiplier *
            repeatDamageMultiplier *
            recoilMoveDamageMultiplier *
            addedEffectMoveDamageMultiplier,
          moveAttackType,
          basePower,
          typeEffectivenessOverride,
          move.critChance,
          state.weather?.weather,
          getSecondaryStatusTypeImmunityBypassAttackTypes({
            state,
            defender: enemyMon,
            defenderSide: 'enemy',
          }),
          {
            ignoreDefenderStatStages: move.ignoreDefenderStatStages,
            damageStatSource: move.damageStatSource,
            moveId: move.id,
            currentTurn: state.turn,
            terrain: state.terrain?.terrain,
          },
        )

        const shieldResult = handleShieldInteraction(
          enemyMon,
          result.isSuperEffective,
          contest.configured
            ? contest.result === 'win'
            : resolution.result === 'win',
        )
        const damageMultiplier = shieldResult.damageMultiplier
        if (shieldResult.message) message += ` ${shieldResult.message}`

        const damageRule = resolveDamageRuleDamage({
          rule: move.damageRule,
          attacker: playerMon,
          defender: enemyMon,
          state,
          side: 'player',
          attackerTeam: state.playerTeam,
          applyAverage: true,
        })
        playerDamage = damageRule.failed
          ? 0
          : (damageRule.damage ??
            Math.floor(
              result.damage *
                damageMultiplier *
                getConditionalDamageMultiplier({
                  move,
                  attacker: playerMon,
                  defender: enemyMon,
                  state,
                  side: 'player',
                  attackType: result.usedType,
                  weather: state.weather?.weather,
                }),
            ))
        if (damageRule.failed) {
          moveFailed = true
          recordFailedMoveUse({
            state,
            side: 'player',
            pokemon: playerMon,
            move,
          })
          message += `\n${damageRule.failed}`
        }
        const secondaryReduction = applySecondaryStatusDamageModifiers({
          state,
          attacker: playerMon,
          defender: enemyMon,
          attackerSide: 'player',
          defenderSide: 'enemy',
          damage: playerDamage,
          attackStance: resolvedMoveStance,
          attackType: result.usedType,
        })
        playerDamage = secondaryReduction.damage
        const nextDamage = applyNextDamageModifier(playerMon, playerDamage)
        playerDamage = nextDamage.damage
        if (nextDamage.message) message += `\n${nextDamage.message}`
        if (secondaryReduction.messages.length) {
          message += `\n${secondaryReduction.messages.join('\n')}`
        }
        const playerTypeImmunityBypassAttackTypes =
          getSecondaryStatusTypeImmunityBypassAttackTypes({
            state,
            defender: enemyMon,
            defenderSide: 'enemy',
          })
        const delayedAbilityResult = move.delayedDamage
          ? applyBattleAbilityDamageModifiers({
              attacker: playerMon,
              defender: enemyMon,
              damage: playerDamage,
              attackStance: resolvedMoveStance,
              attackType: result.usedType,
              typeEffectiveness: result.typeEffectiveness,
              typeImmunityBypassAttackTypes: playerTypeImmunityBypassAttackTypes,
            })
          : undefined
        if (delayedAbilityResult) {
          playerDamage = delayedAbilityResult.damage
          if (delayedAbilityResult.messages.length) {
            message += `\n${delayedAbilityResult.messages.join('\n')}`
          }
          applyBattleFormChange(enemyMon, delayedAbilityResult.formChangeId)
        }
        if (move.delayedDamage) {
          const delayedMessage = queueDelayedMoveDamage({
            state,
            move,
            sourceSide: 'player',
            targetSide: 'enemy',
            attacker: playerMon,
            damage: playerDamage,
            attackType: result.usedType,
          })
          if (delayedMessage) message += `\n${delayedMessage}`
          playerDamage = 0
        } else {
          const playerBaseDamage = playerDamage
          const playerRepeatedHitResult = applyRepeatedHitDamage({
            state,
            attacker: playerMon,
            defender: enemyMon,
            defenderSide: 'enemy',
            baseDamage: playerDamage,
            hitCount: moveHitCount,
            attackStance: resolvedMoveStance,
            attackType: result.usedType,
            typeEffectiveness: result.typeEffectiveness,
            typeImmunityBypassAttackTypes: playerTypeImmunityBypassAttackTypes,
            criticalHit: result.isCrit,
          })
          playerDamage = playerRepeatedHitResult.damage
          if (playerRepeatedHitResult.messages.length) {
            message += `\n${playerRepeatedHitResult.messages.join('\n')}`
          }
          const playerExtraHit = applyPveExtraHit({
            state,
            attacker: playerMon,
            defender: enemyMon,
            defenderSide: 'enemy',
            move,
            baseDamage: playerBaseDamage,
            firstDamage: playerRepeatedHitResult.firstHitDamage,
            attackStance: resolvedMoveStance,
            attackType: result.usedType,
            typeEffectiveness: result.typeEffectiveness,
            typeImmunityBypassAttackTypes: playerTypeImmunityBypassAttackTypes,
            criticalHit: result.isCrit,
          })
          playerDamage += playerExtraHit.damage
          if (playerExtraHit.messages.length) {
            message += `\n${playerExtraHit.messages.join('\n')}`
          }
          const enemyLowHpSwitch = processBattleAbilityLowHpSelfSwitch({
            state,
            side: 'enemy',
            pokemon: enemyMon,
            previousHp: playerRepeatedHitResult.previousHp,
            damage: playerDamage,
          })
          if (enemyLowHpSwitch.messages.length) {
            message += `\n${enemyLowHpSwitch.messages.join('\n')}`
          }
          const enemyHpForm = getBattleAbilityHpThresholdFormChange(enemyMon)
          if (applyBattleFormChange(enemyMon, enemyHpForm.formId)) {
            message += `\n${enemyHpForm.messages.join('\n')}`
          }
          const playerKoForm =
            enemyMon.currentHp <= 0 && playerDamage > 0
              ? getBattleAbilityAfterKoFormChange(playerMon)
              : { messages: [] }
          const playerKoStatStages =
            enemyMon.currentHp <= 0 && playerDamage > 0
              ? applyBattleAbilityAfterKoStatStages(playerMon)
              : []
          if (applyBattleFormChange(playerMon, playerKoForm.formId)) {
            message += `\n${playerKoForm.messages.join('\n')}`
          }
          if (playerKoStatStages.length) {
            message += `\n${playerKoStatStages.join('\n')}`
          }
          recordBattleDamage({
            state,
            sourceSide: 'player',
            targetSide: 'enemy',
            sourcePokemon: playerMon,
            targetPokemon: enemyMon,
            move,
            damage: playerDamage,
            attackType: result.usedType,
          })
          const chargeResult = applyHeldItemChargeOnHit({
            state,
            pokemon: enemyMon,
            attackType: result.usedType,
            damage: playerDamage,
          })
          if (chargeResult.message) message += `\n${chargeResult.message}`
          const faintBondMessages = processSecondaryStatusFaintEffects({
            state,
            faintedPokemon: enemyMon,
            faintedSide: 'enemy',
            attackerPokemon: playerMon,
            attackerSide: 'player',
            damage: playerDamage,
          })
          if (faintBondMessages.length)
            message += `\n${faintBondMessages.join('\n')}`
          const absorbResult = applyMoveAbsorbHealing(
            playerMon,
            playerDamage,
            move.absorb,
          )
          if (absorbResult.applied) message += `\n${absorbResult.message}`
          if (enemyMon.currentHp > 0) {
            const heldStatusResult = attemptHeldAttackStatus(
              playerMon,
              enemyMon,
              result.usedType,
            )
            if (heldStatusResult.applied)
              message += `\n${heldStatusResult.message}`
          }
          const heldBreakResult = applyHeldAttackBreak(
            playerMon,
            result.usedType,
          )
          if (heldBreakResult.applied) message += `\n${heldBreakResult.message}`
        }

        typeEffectivenessMsg = formatTypeEffectivenessMessage(result)

        const moveType = moveAttackType
          ? moveAttackType.toLowerCase()
          : 'normal'
        const playerName = state.playerName || 'Player'
        playerAttackTypeForLog = moveType
        message = appendBattleLogLine(
          message,
          `${playerName}: ${playerMon.name} uses [icon:stance:${resolvedMoveStance}] [icon:type:${moveType}] ${move.name}!${typeEffectivenessMsg}`,
        )
        if (isZMove) message += ' (Z-MOVE!)'
        if (contest.message) message += ` ${contest.message}`
        if (result.isRadiantBoost)
          message += `\n${playerMon.name}'s aura burns bright.`
        if (result.weatherMessage) message += `\n${result.weatherMessage}`
      } else if (!message) {
        const moveType = resolvedMoveType.toLowerCase()
        const playerName = state.playerName || 'Player'
        playerAttackTypeForLog = moveType
        message = appendBattleLogLine(
          message,
          `${playerName}: ${playerMon.name} uses [icon:stance:${resolvedMoveStance}] [icon:type:${moveType}] ${move.name}!`,
        )
        if (isZMove) message += ' (Z-MOVE!)'
      }

      const secondaryEffectBlockMessage = !moveFailed
        ? getBattleSecondaryEffectBlockMessage({
            defender: enemyMon,
            move,
            damageDealt: playerDamage,
          })
        : undefined
      if (secondaryEffectBlockMessage) message += ` ${secondaryEffectBlockMessage}`
      const skipTargetAddedEffects = Boolean(
        secondaryEffectBlockMessage || suppressesAddedEffects,
      )

      if (!moveFailed && move.debuffs) {
        for (const debuff of move.debuffs) {
          const chance = getBattleAbilitySecondaryEffectChance(
            playerMon,
            move,
            debuff.chance,
          )
          if (Math.random() * 100 >= chance) {
            continue
          }

          const targetMon =
            (debuff.target ?? 'enemy') === 'enemy' ? enemyMon : playerMon
          if (skipTargetAddedEffects && targetMon === enemyMon) continue
          const targetSide =
            (debuff.target ?? 'enemy') === 'enemy' ? 'enemy' : 'player'
          const opposingMon = targetMon === playerMon ? enemyMon : playerMon
          const opposingSide = targetMon === playerMon ? 'enemy' : 'player'
          if (debuff.stages < 0) {
            const reflection = applyBattleAbilityStatStageDropReflection({
              pokemon: targetMon,
              opponent: opposingMon,
              stat: debuff.stat,
              stages: debuff.stages,
              source: targetMon === playerMon ? 'self' : 'opponent',
              sourcePokemon: playerMon,
            })
            if (reflection.reflected) {
              message += `${reflection.messages.join(' ')} `
              if (reflection.changed) {
                recordStatLoweredThisTurn({
                  state,
                  side: opposingSide,
                  pokemon: opposingMon,
                })
              }
              continue
            }
          }
          if (
            debuff.stages < 0 &&
            blocksBattleStatStageDropByAbility({
              pokemon: targetMon,
              stat: debuff.stat,
              source: targetMon === playerMon ? 'self' : 'opponent',
              sourcePokemon: playerMon,
            })
          ) {
            message += `${getBattleStatStageDropBlockMessage(targetMon)} `
            continue
          }
          if (!targetMon.statStages) {
            targetMon.statStages = { ...DEFAULT_STAT_STAGES }
        }
        const statKey = debuff.stat
        targetMon.statStages[statKey] = clampStatStage(
          targetMon.statStages[statKey] + debuff.stages
        )
        if (debuff.stages < 0) {
          recordStatLoweredThisTurn({
            state,
            side: targetSide,
              pokemon: targetMon,
            })
            const triggerMessages = applyBattleAbilityStatStageDropTriggers({
              pokemon: targetMon,
              source: targetMon === playerMon ? 'self' : 'opponent',
            })
            if (triggerMessages.length) {
              message += ` ${triggerMessages.join(' ')}`
            }
          }
          const direction = debuff.stages >= 0 ? 'rose' : 'fell'
          message += ` ${targetMon.name}'s ${statKey} ${direction}!`
          if (debuff.stages > 0) {
            const copyMessages = applyBattleAbilityOpponentStatStageBoostCopy({
              pokemon: opposingMon,
              boostedPokemon: targetMon,
              stat: statKey,
              stages: debuff.stages,
            })
            if (copyMessages.length) {
              message += ` ${copyMessages.join(' ')}`
            }
          }
        }
      }

      // Apply status effect
      if (!moveFailed && move.status) {
        const chance = getBattleAbilitySecondaryEffectChance(
          playerMon,
          move,
          move.status.chance,
        )
        if (Math.random() * 100 < chance) {
          const target = move.status.target ?? move.target ?? 'enemy'
          const targetMon = target === 'self' ? playerMon : enemyMon
          if (!skipTargetAddedEffects || targetMon !== enemyMon) {
            const prevention = getSecondaryStatusStatusPreventionMessage({
              state,
              pokemon: targetMon,
              side: target === 'self' ? 'player' : 'enemy',
              statusId: move.status.id,
            })
            const result = prevention
              ? { applied: false, message: prevention }
              : applyStatus(targetMon, move.status.id, state.weather?.weather, {
                  force: move.status.forceStatus,
                  terrain: state.terrain?.terrain,
                })
            logger.debug(
              `applyStatus: ${move.status.id} -> applied: ${result.applied}, message: ${result.message}`,
            )
            if (result.message) {
              message += ` ${result.message}`
            }
            if (result.applied) {
              const reflectionMessages = applyBattleAbilityStatusReflection({
                pokemon: targetMon,
                source: playerMon,
                statusId: move.status.id,
                weather: state.weather?.weather,
                state,
              })
              if (reflectionMessages.length) {
                message += ` ${reflectionMessages.join(' ')}`
              }
            }
          }
        } else {
          logger.debug(
            `applyStatus: ${move.status.id} -> rolled fail (chance: ${chance})`,
          )
        }
      }

      if (!moveFailed && move.additionalStatuses) {
        for (const status of move.additionalStatuses) {
          const chance = getBattleAbilitySecondaryEffectChance(
            playerMon,
            move,
            status.chance,
          )
          if (Math.random() * 100 >= chance) {
            logger.debug(
              `applyStatus: ${status.id} -> rolled fail (chance: ${chance})`,
            )
            continue
          }

          const target =
            status.target ?? (move.target === 'self' ? 'self' : 'enemy')
          const targetMon = target === 'self' ? playerMon : enemyMon
          if (skipTargetAddedEffects && targetMon === enemyMon) continue
          const prevention = getSecondaryStatusStatusPreventionMessage({
            state,
            pokemon: targetMon,
            side: target === 'self' ? 'player' : 'enemy',
            statusId: status.id,
          })
          const result = prevention
            ? { applied: false, message: prevention }
            : applyStatus(targetMon, status.id, state.weather?.weather, {
                terrain: state.terrain?.terrain,
              })
          logger.debug(
            `applyStatus: ${status.id} -> applied: ${result.applied}, message: ${result.message}`,
          )
          if (result.message) {
            message += ` ${result.message}`
          }
          if (result.applied) {
            const reflectionMessages = applyBattleAbilityStatusReflection({
              pokemon: targetMon,
              source: playerMon,
              statusId: status.id,
              weather: state.weather?.weather,
              state,
            })
            if (reflectionMessages.length) {
              message += ` ${reflectionMessages.join(' ')}`
            }
          }
        }
      }

      if (!moveFailed && move.randomStatuses && !skipTargetAddedEffects) {
        const randomStatusMessages = applyRandomMoveStatuses({
          move,
          attacker: playerMon,
          defender: enemyMon,
          state,
          attackerSide: 'player',
          weather: state.weather?.weather,
          terrain: state.terrain,
          chanceMultiplier: secondaryEffectChanceMultiplier,
        })
        if (randomStatusMessages.length) {
          message += ` ${randomStatusMessages.join(' ')}`
        }
      }

      const postDamageSecondaryStatuses = splitSecondaryStatusesForDamageTiming(move).postDamage
      if (!moveFailed && postDamageSecondaryStatuses.length && !skipTargetAddedEffects) {
        const secondaryMessages = applySecondaryStatusesFromMove({
          move: { secondaryStatuses: postDamageSecondaryStatuses },
          state,
          attacker: playerMon,
          defender: enemyMon,
          sourceSide: 'player',
          chanceMultiplier: secondaryEffectChanceMultiplier,
        })
        if (secondaryMessages.length) {
          message += ` ${secondaryMessages.join(' ')}`
        }
      }

      if (!moveFailed && move.selfDamage) {
        const recoilBlockMessage = getBattleRecoilDamageBlockMessage(
          playerMon,
          move,
        )
        if (recoilBlockMessage) {
          message += ` ${recoilBlockMessage}`
        } else {
          const selfDamageResult = applyMoveSelfDamage(playerMon, move.selfDamage)
          if (selfDamageResult.applied) {
            message += ` ${selfDamageResult.message}`
          }
        }
      }

      if (!moveFailed && move.disableStance) {
        const targetMon = move.target === 'self' ? playerMon : enemyMon
        if (!skipTargetAddedEffects || targetMon !== enemyMon) {
          message += ` ${applyStanceDisable({
            pokemon: targetMon,
            stance: move.disableStance.stance,
            turns: move.disableStance.turns,
            currentTurn: state.turn,
          })}`
        }
      }

      if (!moveFailed) {
        const runtimeEffects = applyMoveRuntimeEffects({
          move,
          state,
          side: 'player',
          attacker: playerMon,
          defender: enemyMon,
          damageDealt: playerDamage,
        })
        if (runtimeEffects.failed) message += ` ${runtimeEffects.failed}`
        if (runtimeEffects.failed) {
          recordFailedMoveUse({
            state,
            side: 'player',
            pokemon: playerMon,
            move,
          })
        }
        if (runtimeEffects.messages.length) {
          message += ` ${runtimeEffects.messages.join(' ')}`
        }
      }
    }

    // Vanished removal
    if (wasVanishedBeforeMove && playerMon.status?.id === 'vanished') {
      playerMon.status = undefined
      message += `\n${playerMon.name} resurfaced!`
    }

    // Enemy retaliation
    let enemyDamage = 0
    let enemyAttackTypeForLog: string | undefined
    let enemyStanceForLog = enemyStance
    let continuousInterrupted = false
    let enemyMoveInterrupted = false
    let enemyMoveMissed = false
    let enemyMoveFailed = false
    const preventEnemyCounter =
      !moveMissed &&
      !moveFailed &&
      !suppressesBattleCounterPreventionByAbility(playerMon) &&
      (contest.preventCounter ||
        (move.preventCounterOnStanceWin && resolution.result === 'win'))
    let enemyCanMove =
      !preventEnemyCounter &&
      !enemySwapped &&
      !enemyRechargeMsg &&
      !trainerItemResult.skipsEnemyAction
    let enemyStatusMsg = ''

    logger.debug(
      `Enemy Check: Status=${enemyMon.status?.id}, Counter=${enemyMon.status?.counter}`,
    )
    if (enemyCanMove) {
      const enemyStatusCheck = resolveBeforeMoveStatus(enemyMon)
      const enemyAbilityCheck = enemyStatusCheck.canMove
        ? resolveBattleAbilityBeforeMove(enemyMon, state.turn)
        : { canMove: true, message: '' }
      const enemySecondaryStatusCheck =
        enemyStatusCheck.canMove && enemyAbilityCheck.canMove
        ? processBeforeMoveSecondaryStatuses({
            state,
            pokemon: enemyMon,
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

    if (enemyCanMove && !enemyBattleAction.isBasicAttack) {
      consumePokemonMoveUse(enemyMon, {
        moveUsesRemaining: state.enemyMoveUsesRemaining ?? 0,
      })
      state.enemyMoveUsesRemaining = getPokemonMoveUsesRemaining(
        enemyMon,
        state.enemyMoveUsesRemaining,
      )
    } else if (!enemyCanMove) {
      enemyAiMove = undefined
      enemyBattleAction = normalizeResolvedBattleAction({
        stance: enemyStance,
      })
    }

    if (enemyCanMove) {
      let enemyMultiplier = 1.0
      if (!enemyBattleAction.isBasicAttack && enemyContest?.configured) {
        enemyMultiplier = enemyContest.damageMultiplier ?? 1.0
      } else if (!contest.configured) {
        if (resolution.result === 'win') enemyMultiplier = 0.5
        if (resolution.result === 'loss') enemyMultiplier = 2.0
      }
      enemyMultiplier *= getTrainerItemZMoveMultiplier(trainerItemResult)

      if (enemyBattleAction.isBasicAttack) {
        const enemyEntryMessages = processBattleAbilityEntryCopiesForState(state)
        const enemyForecastMessages =
          processBattleAbilityWeatherTypeChangesForState(state)
        if (enemyEntryMessages.length || enemyForecastMessages.length) {
          message += `\n${[...enemyEntryMessages, ...enemyForecastMessages].join('\n')}`
        }
        const enemyBeforeAttack = getBattleAbilityBeforeAttackFormChange({
          pokemon: enemyMon,
          damage: enemyMultiplier * BASE_BATTLE_POWER,
        })
        if (applyBattleFormChange(enemyMon, enemyBeforeAttack.formId)) {
          message += `\n${enemyBeforeAttack.messages.join('\n')}`
        }
        const enemyBeforeAttackTypeMessages =
          applyBattleAbilityBeforeAttackTypeChange({
            pokemon: enemyMon,
            damage: enemyMultiplier * BASE_BATTLE_POWER,
          })
        if (enemyBeforeAttackTypeMessages.length) {
          message += `\n${enemyBeforeAttackTypeMessages.join('\n')}`
        }
      }

      let enemyDamageResult = calculateDamage(
        enemyMon,
        playerMon,
        enemyBattleAction.stance,
        enemyMultiplier,
        undefined,
        undefined,
        undefined,
        undefined,
        state.weather?.weather,
	        getSecondaryStatusTypeImmunityBypassAttackTypes({
	          state,
	          defender: playerMon,
	          defenderSide: 'player',
	        }),
	        { currentTurn: state.turn, terrain: state.terrain?.terrain },
	      )

      let enemyAiEffectMessages: string[] = []
      enemyMoveMissed = false
      enemyMoveFailed = enemyMoveFailedFromContest
      const enemyAbilityMoveBlockMessage =
        !enemyMoveFailed && !enemyBattleAction.isBasicAttack
          ? getBattleAbilityMoveBlockMessage(playerMon, enemyBattleAction.move, enemyMon) ||
            getTerrainMoveBlockMessage({
              terrain: state.terrain?.terrain,
              move: enemyBattleAction.move,
              defender: playerMon,
            })
          : undefined
      if (enemyAbilityMoveBlockMessage) {
        enemyMoveFailed = true
      }
      const enemyContestMessage =
        enemyBattleConditionFailedMessage ||
        enemyAbilityMoveBlockMessage ||
        enemyContest?.message ||
        ''
      if (enemyMoveFailed && !enemyBattleAction.isBasicAttack) {
        recordFailedMoveUse({
          state,
          side: 'enemy',
          pokemon: enemyMon,
          move: enemyBattleAction.move,
        })
      }
      enemyMoveInterrupted = shouldInterruptEnemyAiMove({
        move,
        attacker: playerMon,
        enemyAiMove,
        target: enemyMon,
        moveMissed,
        moveFailed: moveFailed || enemyMoveFailed,
      })
      const enemyInterruptedContinuousMove =
        isContinuousMoveTurn &&
        Boolean(
          enemyAiMove &&
            getBattleAbilityMoveInterruptChance(
              enemyMon,
              enemyAiMove.move,
              enemyAiMove.move.interruptEnemyMove,
            ) > 0 &&
            !moveMissed &&
            !moveFailed &&
            !blocksBattleInterruptByAbility(playerMon) &&
            Math.random() * 100 <
              getBattleAbilityMoveInterruptChance(
                enemyMon,
                enemyAiMove.move,
                enemyAiMove.move.interruptEnemyMove,
              ),
        )

      if (!enemyBattleAction.isBasicAttack && enemyAiMove) {
        enemyStanceForLog = enemyBattleAction.stance
        enemyMoveMissed =
          !enemyMoveInterrupted &&
          !enemyMoveFailed &&
          resolveEnemyAiMoveAccuracy({
            state,
            enemyMon,
            defender: playerMon,
            enemyAiMove,
            weather: state.weather?.weather,
          }).missed
        if (
          enemyMoveInterrupted ||
          enemyMoveMissed ||
          enemyMoveFailed ||
            enemyBattleAction.effectOnly
        ) {
          enemyDamageResult = {
            ...enemyDamageResult,
            damage: 0,
            usedType: enemyBattleAction.attackType ?? enemyDamageResult.usedType,
            isCrit: false,
            isRadiantBoost: false,
            weatherMessage: '',
            terrainMultiplier: 1,
          }
        } else {
          const enemyEntryMessages = processBattleAbilityEntryCopiesForState(state)
          const enemyForecastMessages =
            processBattleAbilityWeatherTypeChangesForState(state)
          if (enemyEntryMessages.length || enemyForecastMessages.length) {
            message += `\n${[...enemyEntryMessages, ...enemyForecastMessages].join('\n')}`
          }
          const enemyBeforeAttack = getBattleAbilityBeforeAttackFormChange({
            pokemon: enemyMon,
            damage: enemyMultiplier * (enemyBattleAction.basePower ?? BASE_BATTLE_POWER),
          })
          if (applyBattleFormChange(enemyMon, enemyBeforeAttack.formId)) {
            message += `\n${enemyBeforeAttack.messages.join('\n')}`
          }
          const enemyBeforeAttackTypeMessages =
            applyBattleAbilityBeforeAttackTypeChange({
              pokemon: enemyMon,
              attackType: enemyBattleAction.attackType,
              damage:
                enemyMultiplier *
                (enemyBattleAction.basePower ?? BASE_BATTLE_POWER),
            })
          if (enemyBeforeAttackTypeMessages.length) {
            message += `\n${enemyBeforeAttackTypeMessages.join('\n')}`
          }
          enemyDamageResult = calculateDamage(
            enemyMon,
            playerMon,
            enemyBattleAction.stance,
            enemyMultiplier,
            enemyBattleAction.attackType,
            enemyBattleAction.basePower,
            enemyBattleAction.typeEffectivenessOverride,
            enemyBattleAction.critChance,
            state.weather?.weather,
            getSecondaryStatusTypeImmunityBypassAttackTypes({
              state,
              defender: playerMon,
              defenderSide: 'player',
            }),
	            {
	              ignoreDefenderStatStages: enemyBattleAction.ignoreDefenderStatStages,
	              damageStatSource: enemyBattleAction.damageStatSource,
	              moveId: enemyBattleAction.specialMoveId,
	              currentTurn: state.turn,
	              terrain: state.terrain?.terrain,
	            },
          )
          if (enemyBattleAction.fixedDamage !== undefined) {
            enemyDamageResult = {
              ...enemyDamageResult,
              damage: enemyBattleAction.fixedDamage,
            }
          }
        }
      }

      enemyDamage =
        enemyMoveInterrupted ||
        enemyMoveMissed ||
        enemyMoveFailed ||
        enemyBattleAction.effectOnly
          ? 0
          : enemyDamageResult.damage
      const playerTimedSecondaryStatuses =
        splitSecondaryStatusesForDamageTiming(move)
      if (!moveFailed && playerTimedSecondaryStatuses.preDamage.length > 0) {
        const preDamageSecondaryMessages = applySecondaryStatusesFromMove({
          move: { secondaryStatuses: playerTimedSecondaryStatuses.preDamage },
          state,
          attacker: playerMon,
          defender: enemyMon,
          sourceSide: 'player',
          chanceMultiplier: secondaryEffectChanceMultiplier,
        })
        if (preDamageSecondaryMessages.length) {
          message += `\n${preDamageSecondaryMessages.join(' ')}`
        }
      }
      const enemySecondaryReduction = applySecondaryStatusDamageModifiers({
        state,
        attacker: enemyMon,
        defender: playerMon,
        attackerSide: 'enemy',
        defenderSide: 'player',
        damage: enemyDamage,
        attackStance: enemyBattleAction.stance,
        attackType: enemyDamageResult.usedType,
      })
      enemyDamage = enemySecondaryReduction.damage
      const enemyNextDamage = applyNextDamageModifier(enemyMon, enemyDamage)
      enemyDamage = enemyNextDamage.damage
      if (enemyNextDamage.message) message += `\n${enemyNextDamage.message}`
      if (enemySecondaryReduction.messages.length) {
        message += `\n${enemySecondaryReduction.messages.join('\n')}`
      }
      const enemyTypeImmunityBypassAttackTypes =
        getSecondaryStatusTypeImmunityBypassAttackTypes({
          state,
          defender: playerMon,
          defenderSide: 'player',
        })
      const enemyBaseDamage = enemyDamage
      const enemyRepeatedHitResult =
        enemyMoveInterrupted || enemyMoveMissed || enemyMoveFailed
          ? {
              damage: enemyDamage,
              messages: [],
              previousHp: playerMon.currentHp,
              firstHitDamage: 0,
              attemptedHits: 0,
            }
          : applyRepeatedHitDamage({
              state,
              attacker: enemyMon,
              defender: playerMon,
              defenderSide: 'player',
              baseDamage: enemyDamage,
              hitCount: enemyBattleAction.hitCount,
              attackStance: enemyBattleAction.stance,
              attackType: enemyDamageResult.usedType,
              typeEffectiveness: enemyDamageResult.typeEffectiveness,
              typeImmunityBypassAttackTypes: enemyTypeImmunityBypassAttackTypes,
              criticalHit: enemyDamageResult.isCrit,
            })
      enemyDamage = enemyRepeatedHitResult.damage
      if (enemyRepeatedHitResult.messages.length) {
        message += `\n${enemyRepeatedHitResult.messages.join('\n')}`
      }
      if (!enemyMoveInterrupted && !enemyMoveMissed && !enemyMoveFailed) {
        const enemyExtraHit = applyPveExtraHit({
          state,
          attacker: enemyMon,
          defender: playerMon,
          defenderSide: 'player',
          move: enemyBattleAction.isBasicAttack ? undefined : enemyBattleAction.move,
          baseDamage: enemyBaseDamage,
          firstDamage: enemyRepeatedHitResult.firstHitDamage,
          attackStance: enemyBattleAction.stance,
          attackType: enemyDamageResult.usedType,
          typeEffectiveness: enemyDamageResult.typeEffectiveness,
          typeImmunityBypassAttackTypes: enemyTypeImmunityBypassAttackTypes,
          criticalHit: enemyDamageResult.isCrit,
        })
        enemyDamage += enemyExtraHit.damage
        if (enemyExtraHit.messages.length) {
          message += `\n${enemyExtraHit.messages.join('\n')}`
        }
        const playerLowHpSwitch = processBattleAbilityLowHpSelfSwitch({
          state,
          side: 'player',
          pokemon: playerMon,
          previousHp: enemyRepeatedHitResult.previousHp,
          damage: enemyDamage,
        })
        if (playerLowHpSwitch.messages.length) {
          message += `\n${playerLowHpSwitch.messages.join('\n')}`
        }
        const playerHpForm = getBattleAbilityHpThresholdFormChange(playerMon)
        if (applyBattleFormChange(playerMon, playerHpForm.formId)) {
          message += `\n${playerHpForm.messages.join('\n')}`
        }
        const enemyKoForm =
          playerMon.currentHp <= 0 && enemyDamage > 0
            ? getBattleAbilityAfterKoFormChange(enemyMon)
            : { messages: [] }
        const enemyKoStatStages =
          playerMon.currentHp <= 0 && enemyDamage > 0
            ? applyBattleAbilityAfterKoStatStages(enemyMon)
            : []
        if (applyBattleFormChange(enemyMon, enemyKoForm.formId)) {
          message += `\n${enemyKoForm.messages.join('\n')}`
        }
        if (enemyKoStatStages.length) {
          message += `\n${enemyKoStatStages.join('\n')}`
        }
        recordBattleDamage({
          state,
          sourceSide: 'enemy',
          targetSide: 'player',
          sourcePokemon: enemyMon,
          targetPokemon: playerMon,
          move: enemyBattleAction.isBasicAttack ? undefined : enemyBattleAction.move,
          damage: enemyDamage,
          attackType: enemyDamageResult.usedType,
        })
        const chargeResult = applyHeldItemChargeOnHit({
          state,
          pokemon: playerMon,
          attackType: enemyDamageResult.usedType,
          damage: enemyDamage,
        })
        if (chargeResult.message) message += `\n${chargeResult.message}`
        const faintBondMessages = processSecondaryStatusFaintEffects({
          state,
          faintedPokemon: playerMon,
          faintedSide: 'player',
          attackerPokemon: enemyMon,
          attackerSide: 'enemy',
          damage: enemyDamage,
        })
        if (faintBondMessages.length)
          message += `\n${faintBondMessages.join('\n')}`
      }
      if (
        !enemyBattleAction.isBasicAttack &&
        !enemyMoveInterrupted &&
        !enemyMoveMissed &&
        !enemyMoveFailed
      ) {
        enemyAiEffectMessages = applyEnemyAiMoveEffects({
          move: enemyBattleAction.move,
          self: enemyMon,
          opponent: playerMon,
          state,
          damageDealt: enemyDamage,
          weather: state.weather?.weather,
        })
      }
      if (
        !enemyMoveInterrupted &&
        !enemyMoveMissed &&
        !enemyMoveFailed &&
        !enemyBattleAction.effectOnly
      ) {
        if (playerMon.currentHp > 0) {
          const heldStatusResult = attemptHeldAttackStatus(
            enemyMon,
            playerMon,
            enemyDamageResult.usedType,
          )
          if (heldStatusResult.applied)
            message += `\n${heldStatusResult.message}`
        }
        const heldBreakResult = applyHeldAttackBreak(
          enemyMon,
          enemyDamageResult.usedType,
        )
        if (heldBreakResult.applied) message += `\n${heldBreakResult.message}`
      }

      const enemyName = state.enemyName || 'Enemy'
      const enemyMoveType = enemyDamageResult.usedType
      enemyAttackTypeForLog = enemyMoveMissed ? undefined : enemyMoveType
      const enemyDisplayStance = enemyBattleAction.stance
      const enemyMoveName = enemyBattleAction.move.name
      if (enemyBattleAction.calledByMetronome) {
        message += `\n${enemyMon.name}'s Metronome called ${enemyMoveName}!`
      }
      message += `\n${enemyName}: ${enemyMon.name} uses a [icon:stance:${enemyDisplayStance}] [icon:type:${enemyMoveType}] ${enemyMoveName}.`

      if (enemyMoveInterrupted && !enemyBattleAction.isBasicAttack) {
        message += ` ${enemyBattleAction.move.name} failed!`
      } else if (enemyMoveFailed && !enemyBattleAction.isBasicAttack) {
        if (enemyContestMessage) message += `\n${enemyContestMessage}`
      } else if (enemyMoveMissed && !enemyBattleAction.isBasicAttack) {
        message += ` ${enemyBattleAction.move.name} missed!`
      } else if (enemyBattleAction.effectOnly) {
        if (enemyAiEffectMessages.length) {
          message += `\n${enemyAiEffectMessages.join('\n')}`
        }
      } else {
        if (enemyDamageResult.isCrit) message += ' (Critical Hit!)'
        if (enemyDamageResult.isRadiantBoost)
          message += `\n${enemyMon.name}'s aura burns bright.`
        if (enemyDamageResult.weatherMessage)
          message += `\n${enemyDamageResult.weatherMessage}`
        message += formatTypeEffectivenessMessage(enemyDamageResult)
        if (enemyAiEffectMessages.length) {
          message += `\n${enemyAiEffectMessages.join('\n')}`
        }
      }

      if (enemyInterruptedContinuousMove) {
        continuousInterrupted = true
        clearPlayerMoveLockIfActive(state, move.id)
        message += `\n${playerMon.name}'s continuing move was interrupted!`
      }
    }

    if (enemyStatusMsg) {
      message += enemyStatusMsg
    }

    const moveSucceeded = !moveMissed && !moveFailed && !continuousInterrupted
    if (activeMoveLock?.type === 'continuous') {
      if (moveSucceeded && state.playerMoveLock?.moveId === move.id) {
        activeMoveLock.repeatUses =
          Math.max(1, activeMoveLock.repeatUses ?? 1) + 1
        activeMoveLock.remainingTurns = Math.max(
          0,
          activeMoveLock.remainingTurns - 1,
        )
        if (activeMoveLock.remainingTurns <= 0) {
          const continuousEndMessages = applyContinuousEndEffects({
            move,
            attacker: playerMon,
            defender: enemyMon,
            weather: state.weather?.weather,
            terrain: state.terrain?.terrain,
          })
          if (continuousEndMessages.length) {
            message += `\n${continuousEndMessages.join('\n')}`
          }
          clearPlayerMoveLockIfActive(state, move.id)
        }
      } else if (!moveSucceeded) {
        clearPlayerMoveLockIfActive(state, move.id)
      }
    } else if (move.continuous && moveSucceeded) {
      const totalTurns = rollContinuousTurnCount(move.continuous)
      if (totalTurns > 1) {
        state.playerMoveLock = {
          type: 'continuous',
          moveId: move.id,
          moveName: move.name,
          selectedType: selectedAttackType,
          remainingTurns: totalTurns - 1,
          continuous: move.continuous,
          repeatUses: 1,
        }
      }
    } else if (
      !isLockedMoveAction &&
      move.recharge &&
      move.recharge > 0 &&
      moveSucceeded
    ) {
      message += `\n${playerMon.name} must recharge!`
      state.playerMoveLock = {
        type: 'recharge',
        moveId: move.id,
        moveName: move.name,
        selectedType: selectedAttackType,
        remainingTurns: Math.max(1, Math.floor(move.recharge)),
      }
    }

    state.history.unshift({
      turn: state.turn,
      playerStance: resolvedMoveStance,
      enemyStance: enemyStanceForLog,
      result: contest.configured
        ? contest.result
        : !enemyCanMove
          ? 'win'
          : resolution.result,
      damageDealt: playerDamage,
      damageTaken: enemyDamage,
      playerAttackType: playerAttackTypeForLog,
      enemyAttackType: enemyAttackTypeForLog,
      message,
    })

    if (moveSucceeded && playerAttackTypeForLog) {
      if (isBasicAttack) {
        recordSuccessfulBasicAttackUse({
          state,
          side: 'player',
          pokemon: playerMon,
          attackType: playerAttackTypeForLog,
        })
      } else {
        tickMoveLock(playerMon, move.id)
        recordSuccessfulMoveUse({
          state,
          side: 'player',
          pokemon: playerMon,
          move,
          attackType: playerAttackTypeForLog,
        })
      }
    }
    if (
      enemyCanMove &&
      !enemyBattleAction.isBasicAttack &&
      !enemyMoveInterrupted &&
      !enemyMoveMissed &&
      !enemyMoveFailed
    ) {
      tickMoveLock(enemyMon, enemyBattleAction.move.id)
      recordSuccessfulMoveUse({
        state,
        side: 'enemy',
        pokemon: enemyMon,
        move: enemyBattleAction.move,
        attackType: enemyAttackTypeForLog,
      })
      if (enemyBattleAction.move.recharge && enemyBattleAction.move.recharge > 0) {
        state.enemyMoveLock = {
          type: 'recharge',
          moveId: enemyBattleAction.move.id,
          moveName: enemyBattleAction.move.name,
          selectedType: enemyAttackTypeForLog,
          remainingTurns: Math.max(1, Math.floor(enemyBattleAction.move.recharge)),
        }
        state.history[0].message += `\n${enemyMon.name} must recharge!`
      }
    } else if (
      enemyCanMove &&
      enemyBattleAction.isBasicAttack &&
      !enemyMoveInterrupted &&
      !enemyMoveMissed &&
      !enemyMoveFailed &&
      enemyAttackTypeForLog
    ) {
      recordSuccessfulBasicAttackUse({
        state,
        side: 'enemy',
        pokemon: enemyMon,
        attackType: enemyAttackTypeForLog,
      })
    }

    await timer.time('finalizeTurn', () => finalizeTurn(state, user.id, user))
    timer.done({
      status: state.status,
      nextTurn: state.turn,
    })
    return { success: true, state }
  })
}
