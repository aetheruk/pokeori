import { DYNAMAX_UNLOCK_TURNS } from '@/data/powers'
import { getMove, resolveMoveDamageMultiplier } from '@/data/moves'
import type { WeatherType } from '@/data/weather'
import {
  calculateDamage,
  calculateStats,
  clampStatStage,
  DEFAULT_STAT_STAGES,
  resolveStance,
  resolveMoveContest,
  formatTypeEffectivenessMessage,
} from '@/utilities/battle/battle-logic'
import { shouldFailMoveFromStance } from '@/utilities/battle/move-contest'
import {
  applyStatus,
  attemptHeldAttackStatus,
  resolveBeforeMoveStatus,
  applyMoveAbsorbHealing,
  applyMoveSelfDamage,
} from '@/utilities/battle/status-effects-logic'
import type {
  BattlePokemon,
  BattleStance,
  BattleState,
  PowersState,
} from '@/utilities/battle/types'
import {
  applyStanceDisable,
  tickDisabledStance,
} from '@/utilities/battle/stance-disable'
import {
  applyHeldAttackBreak,
  applyHeldDamageBlock,
  applyHeldItemChargeOnHit,
  applyHeldItemIfTriggered,
} from '@/utilities/battle/held-items'
import { applyPokemonResearchEndure } from '@/utilities/battle/research-survival'
import {
  advanceBattleTypeChangeDuration,
  advanceTeraDuration,
  getEffectiveBattleTypes,
  resetBattleTypeChange,
} from '@/utilities/battle/tera'
import { clearDynamaxState } from '@/utilities/battle/dynamax'
import {
  applyBattleRarityEntryEffects,
  processBattleRarityAttackAttempt,
} from '@/utilities/battle/rarity-effects'
import { BASE_BATTLE_POWER } from '@/utilities/battle/constants'
import {
  Z_MOVE_DAMAGE_MULTIPLIER,
  clearZMoveCharge,
  consumeZMoveCharge,
} from '@/utilities/battle/z-move'
import {
  getSecondaryStatusSwitchPreventionMessage,
  processBeforeMoveSecondaryStatuses,
} from '@/utilities/battle/secondary-statuses'
import type { MoveConfig } from '@/data/moves'
import {
  applySecondaryStatusDamageModifiers,
  applySecondaryStatusesFromMove,
  clearPokemonSecondaryStatuses,
  clearSourceLinkedTrapSecondaryStatuses,
  getSecondaryStatusStatusPreventionMessage,
  getSecondaryStatusTypeImmunityBypassAttackTypes,
  processSecondaryStatusFaintEffects,
  processSecondaryStatusesForSwitch,
} from '@/utilities/battle/secondary-statuses'
import { resolveHiddenPower } from '@/utilities/battle/hidden-power'
import { consumePokemonMoveUse } from '@/utilities/battle/move-uses'
import {
  applyMoveRuntimeEffects,
  getEffectiveStanceAccuracy,
  applyNextDamageModifier,
  checkMoveBattleCondition,
  getEffectiveMoveAccuracy,
  getConditionalDamageMultiplier,
  getMoveHealAmount,
  queueDelayedMoveDamage,
  recordBattleDamage,
  recordFailedMoveUse,
  recordStatLoweredThisTurn,
  recordSwitchingOutThisTurn,
  resolveDamageRuleDamage,
} from '@/utilities/battle/move-effects'
import {
  applyBattleAbilityAfterKoStatStages,
  applyBattleAbilityBeforeAttackTypeChange,
  applyBattleAbilityStatStageDropTriggers,
  applyBattleAbilityDamageModifiers,
  applyBattleAbilityOnDamagedStatStages,
  applyBattleAbilityOpponentStatStageBoostCopy,
  applyBattleAbilityStatStageDropReflection,
  applyBattleAbilityStatusReflection,
  blocksBattleMentalEffectByAbility,
  blocksBattleStatStageDropByAbility,
  getBattleAbilityAfterKoFormChange,
  getBattleAbilityBeforeAttackFormChange,
  getBattleAbilityExtraHitDamageMultiplier,
  getBattleAbilityHpThresholdFormChange,
  getBattleAbilityAddedEffectMoveDamageMultiplier,
  getBattleAbilityMoveBlockMessage,
  getBattleAbilitySecondaryEffectChance,
  getBattleAbilityRecoilMoveDamageMultiplier,
  getBattleAbilitySwitchPreventionMessage,
  getBattleSecondaryEffectBlockMessage,
  getBattleMentalEffectBlockMessage,
  getBattleRecoilDamageBlockMessage,
  getBattleStatStageDropBlockMessage,
  processBattleAbilityTerrainSet,
  processBattleAbilityWeatherSet,
  processBattleAbilityEntryCopiesForState,
  processBattleAbilityWeatherTypeChangesForState,
  processBattleAbilitySuppressionForState,
  resolveBattleAbilityBeforeMove,
  suppressesBattleMoveAddedEffectsByAbility,
  suppressesBattleCounterPreventionByAbility,
  usesBattleAbilityMaxMultiHitDamage,
} from '@/utilities/battle/abilities'
import { applyBattleFormChange } from '@/utilities/battle/stats-calc'
import {
  processBattleAbilityLowHpSelfSwitch,
  processBattleAbilitySwitchOut,
} from '@/utilities/battle/switching'
import { getTerrainMoveBlockMessage } from '@/utilities/battle/terrain-effects'
import { applyRepeatedHitDamage } from '@/utilities/battle/multi-hit'

type MoveSecondaryStatus = NonNullable<MoveConfig['secondaryStatuses']>[number]

function isPreDamageDefensiveSecondaryStatus(
  status: MoveSecondaryStatus,
): boolean {
  return (
    (status.target === 'self-pokemon' || status.target === 'self-side') &&
    status.effects.some((effect) => effect.type === 'damage-reduction')
  )
}

function splitSecondaryStatusesForDamageTiming(move?: MoveConfig): {
  preDamage: MoveSecondaryStatus[]
  postDamage: MoveSecondaryStatus[]
} {
  const statuses = move?.secondaryStatuses || []
  return {
    preDamage: statuses.filter(isPreDamageDefensiveSecondaryStatus),
    postDamage: statuses.filter(
      (status) => !isPreDamageDefensiveSecondaryStatus(status),
    ),
  }
}

function applyMoveRandomStatuses(params: {
  move: Pick<MoveConfig, 'randomStatuses'>
  attacker: BattlePokemon
  defender: BattlePokemon
  random: () => number
  weather?: WeatherType
  state?: BattleState
  terrain?: BattleState['terrain']
  chanceMultiplier?: number
}): string[] {
  const { move, attacker, defender, random } = params
  const randomStatuses = move.randomStatuses
  if (!randomStatuses?.options.length) return []

  const chance = randomStatuses.chance * (params.chanceMultiplier ?? 1)
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
      : (chosen.target ?? 'enemy')

  const target = chosenTarget === 'self' ? attacker : defender
  const result = applyStatus(target, chosen.id, params.weather, {
    terrain: params.terrain?.terrain,
    sourcePokemon: attacker,
  })
  if (!result.applied) return []
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

export type BattleTurnResult = 'win' | 'loss' | 'tie'

export interface PvpQueuedMovePowerFlags {
  zMove?: boolean
  zMoveCharge?: boolean
}

export interface PvpQueuedMoveForPowerUse {
  stance?: BattleStance
  attackType?: string
  specialMoveId?: string
  calledByMetronome?: boolean
  powers?: PvpQueuedMovePowerFlags
}

export interface PvpSwapResolution {
  swapped: boolean
  name: string
  messages: string[]
}

export interface PvpCombatResolution {
  didAttack: boolean
  dmg: number
  result: BattleTurnResult
  message: string
  usedType?: string
  preventsOpponentDamage?: boolean
}

export function invertBattleResult(result: BattleTurnResult): BattleTurnResult {
  if (result === 'win') return 'loss'
  if (result === 'loss') return 'win'
  return 'tie'
}

export function consumeQueuedMovePowerUses(
  move: PvpQueuedMoveForPowerUse,
  powerState: PowersState,
  pokemon?: BattlePokemon,
): { specialMoveConsumed: boolean; zMoveConsumed: boolean } {
  let specialMoveConsumed = false
  const zMoveConsumed = false

  if (move.specialMoveId) {
    specialMoveConsumed = pokemon
      ? consumePokemonMoveUse(pokemon, powerState)
      : powerState.moveUsesRemaining > 0
    if (!pokemon && specialMoveConsumed) {
      powerState.moveUsesRemaining -= 1
    }
  }

  return { specialMoveConsumed, zMoveConsumed }
}

export function applyDimensionalChargeForResult(
  powerState: PowersState,
  result: BattleTurnResult,
): void {
  if (result === 'win') powerState.dimensionalShift.charges.wins += 1
  else if (result === 'loss') powerState.dimensionalShift.charges.losses += 1
  else powerState.dimensionalShift.charges.draws += 1
}

export function advancePvpPowerStateForTurn(
  mon: BattlePokemon,
  powerState: PowersState,
  currentTurn?: number,
): void {
  powerState.turnsPlayedThisBattle = (powerState.turnsPlayedThisBattle ?? 0) + 1

  if (
    powerState.turnsPlayedThisBattle >= DYNAMAX_UNLOCK_TURNS &&
    !powerState.dynamaxAvailable
  ) {
    powerState.dynamaxAvailable = true
  }

  if (mon.isDynamaxed && typeof mon.dynamaxTurnsRemaining === 'number') {
    mon.dynamaxTurnsRemaining -= 1
    powerState.dynamaxTurnsRemaining = Math.max(0, mon.dynamaxTurnsRemaining)

    if (mon.dynamaxTurnsRemaining <= 0) {
      powerState.dynamaxActive = false
      powerState.dynamaxTurnsRemaining = 0
      clearDynamaxState(mon)
    }
  }

  advanceTeraDuration(mon, currentTurn)
  advanceBattleTypeChangeDuration(mon)
  tickDisabledStance(mon, currentTurn)
}

export function resolvePvpSwap(params: {
  state: BattleState
  team: BattlePokemon[]
  move: Pick<PvpQueuedMoveForPowerUse, 'attackType'>
  side: 'player' | 'enemy'
  playerPowers: PowersState
  enemyPowers: PowersState
}): PvpSwapResolution {
  const { state, team, move, side, playerPowers, enemyPowers } = params

  if (
    !move.attackType?.startsWith('swap:') &&
    !move.attackType?.startsWith('victory-swap:')
  ) {
    return { swapped: false, name: '', messages: [] }
  }

  const newIndex = Number.parseInt(move.attackType.split(':')[1], 10)
  if (Number.isNaN(newIndex) || !team[newIndex])
    return { swapped: false, name: '', messages: [] }

  const oldIndex = side === 'player' ? state.activePlayerIndex : state.activeEnemyIndex
  const oldMon = team[oldIndex]
  if (
    move.attackType.startsWith('swap:') &&
    oldMon &&
    getSecondaryStatusSwitchPreventionMessage({ state, pokemon: oldMon, side })
  ) {
    return {
      swapped: false,
      name: '',
      messages: [
        getSecondaryStatusSwitchPreventionMessage({
          state,
          pokemon: oldMon,
          side,
        })!,
      ],
    }
  }
  const opposingTeam = side === 'player' ? state.enemyTeam : state.playerTeam
  const opposingIndex =
    side === 'player' ? state.activeEnemyIndex : state.activePlayerIndex
  const opposingMon = opposingTeam[opposingIndex]
  const abilitySwitchPreventionMessage =
    move.attackType.startsWith('swap:') &&
    oldMon &&
    opposingMon &&
    getBattleAbilitySwitchPreventionMessage({
      trapper: opposingMon,
      switchingPokemon: oldMon,
    })
  if (abilitySwitchPreventionMessage) {
    return {
      swapped: false,
      name: '',
      messages: [abilitySwitchPreventionMessage],
    }
  }
  if (oldMon?.status?.id === 'vanished') {
    oldMon.status = undefined
  }
  if (oldMon) {
    recordSwitchingOutThisTurn({ state, side, pokemon: oldMon })
  }

  const chaosActive =
    playerPowers.dimensionalShift.activeEffect?.type === 'chaos' ||
    enemyPowers.dimensionalShift.activeEffect?.type === 'chaos'

  if (chaosActive) {
    playerPowers.dimensionalShift.activeEffect = undefined
    enemyPowers.dimensionalShift.activeEffect = undefined

    const oldIndex =
      side === 'player' ? state.activePlayerIndex : state.activeEnemyIndex
    const oldMon = team[oldIndex]
    if (oldMon) oldMon.stats = calculateStats(oldMon)

    const otherTeam = side === 'player' ? state.enemyTeam : state.playerTeam
    const chaosOpposingMon = otherTeam[opposingIndex]
    if (chaosOpposingMon) chaosOpposingMon.stats = calculateStats(chaosOpposingMon)
  }

  clearSourceLinkedTrapSecondaryStatuses({
    state,
    sourceSide: side,
    sourcePokemon: team[oldIndex],
  })
  clearPokemonSecondaryStatuses(team[oldIndex])
  resetBattleTypeChange(team[oldIndex])
  const abilitySwitchOutMessages = processBattleAbilitySwitchOut(team[oldIndex])
  if (side === 'player') state.activePlayerIndex = newIndex
  else state.activeEnemyIndex = newIndex
  team[newIndex].activeTurnStarted = state.turn + 1

  if (move.attackType.startsWith('victory-swap:')) {
    team[newIndex].status = { id: 'victory', counter: 0 }
  }
  const suppressionMessages = processBattleAbilitySuppressionForState(state)
  const messages = [
    ...abilitySwitchOutMessages,
    ...processSecondaryStatusesForSwitch(state, side),
    ...suppressionMessages,
    ...processBattleAbilityWeatherSet({
      state,
      pokemon: team[newIndex],
      ownerName: side === 'player' ? state.playerName : state.enemyName,
    }),
    ...processBattleAbilityTerrainSet({
      state,
      pokemon: team[newIndex],
      ownerName: side === 'player' ? state.playerName : state.enemyName,
    }),
  ]

  return { swapped: true, name: team[newIndex].name, messages }
}

export function resolvePvpCombat(params: {
  state?: BattleState
  attacker: BattlePokemon
  defender: BattlePokemon
  move: PvpQueuedMoveForPowerUse
  attackerName: string
  attackerSide: 'player' | 'enemy'
  playerMove: PvpQueuedMoveForPowerUse
  enemyMove: PvpQueuedMoveForPowerUse
  skipped?: boolean
  currentTurn?: number
  random?: () => number
  weather?: WeatherType
}): PvpCombatResolution {
  const {
    state,
    attacker,
    defender,
    move,
    attackerName,
    attackerSide,
    playerMove,
    enemyMove,
    skipped,
    currentTurn,
    random,
    weather,
  } = params
  const chanceRandom = random ?? Math.random

  if (skipped) {
    if (move.powers?.zMove) clearZMoveCharge(attacker)
    return { didAttack: false, dmg: 0, result: 'tie', message: '' }
  }

  const specialMove = move.specialMoveId
    ? getMove(move.specialMoveId)
    : undefined
  const hiddenPower = specialMove?.id === 'hidden-power' ? resolveHiddenPower(attacker) : undefined
  const beforeMoveStatus = resolveBeforeMoveStatus(attacker)
  const beforeMoveAbility = beforeMoveStatus.canMove
    ? resolveBattleAbilityBeforeMove(attacker, currentTurn)
    : { canMove: true, message: '' }
  const beforeMoveSecondaryStatus =
    beforeMoveStatus.canMove && beforeMoveAbility.canMove
    ? processBeforeMoveSecondaryStatuses({
        state,
        pokemon: attacker,
        side: attackerSide,
        move: specialMove,
        attackType: hiddenPower?.attackType || move.attackType || specialMove?.forcedType,
        random: chanceRandom,
      })
    : { canMove: true, message: '' }
  const beforeMoveCheck = !beforeMoveStatus.canMove
    ? beforeMoveStatus
    : !beforeMoveAbility.canMove
      ? beforeMoveAbility
      : beforeMoveSecondaryStatus
  if (!beforeMoveCheck.canMove) {
    if (move.powers?.zMove) clearZMoveCharge(attacker)
    return {
      didAttack: false,
      dmg: 0,
      result: 'tie',
      message: beforeMoveCheck.message,
    }
  }

  const moveStance = move.stance ?? 'speed'
  const playerStance = playerMove.stance ?? 'speed'
  const enemyStance = enemyMove.stance ?? 'speed'
  const contest = resolveMoveContest({
    move: specialMove,
    attacker,
    defender,
    attackType: hiddenPower?.attackType || move.attackType || specialMove?.forcedType,
    terrain: state?.terrain?.terrain,
    random: chanceRandom,
  })
  const outcome = contest.configured
    ? {
        result: contest.result,
        damageMultiplier: contest.damageMultiplier ?? 1.0,
      }
    : attackerSide === 'player'
      ? resolveStance(playerStance, enemyStance)
      : resolveStance(enemyStance, playerStance)

  const moveFailedFromStance = shouldFailMoveFromStance({
    failOnStance: specialMove?.failOnStance,
    result: outcome.result,
  })
  const battleConditionFailed = specialMove
    ? checkMoveBattleCondition({
        move: specialMove,
        state,
        side: attackerSide,
        attacker,
        defender,
      })
    : undefined
  let moveFailed = Boolean(battleConditionFailed) || contest.failMove || moveFailedFromStance
  const accuracy = specialMove
    ? getEffectiveMoveAccuracy({
        move: specialMove,
        state,
        attacker,
        defender,
        attackerSide,
        weather,
      })
    : getEffectiveStanceAccuracy({
        attacker,
        defender,
        state,
        attackerSide,
        weather,
        stance: moveStance,
      })
  const moveMissed = accuracy < 100 && chanceRandom() * 100 > accuracy
  if (moveMissed) {
    moveFailed = true
  }
  const abilityMoveBlockMessage = !moveFailed
    ? getBattleAbilityMoveBlockMessage(defender, specialMove, attacker) ||
      getTerrainMoveBlockMessage({
        terrain: state?.terrain?.terrain,
        move: specialMove,
        defender,
      })
    : undefined
  if (abilityMoveBlockMessage) {
    moveFailed = true
  }
  if (moveFailed && specialMove && state) {
    recordFailedMoveUse({
      state,
      side: attackerSide,
      pokemon: attacker,
      move: specialMove,
    })
  }

  const isZMove = !!move.powers?.zMove && !!attacker.zMoveReady
  const multiplier = isZMove
    ? Z_MOVE_DAMAGE_MULTIPLIER
    : outcome.damageMultiplier
  const addedEffectMoveDamageMultiplier = specialMove
    ? getBattleAbilityAddedEffectMoveDamageMultiplier(attacker, specialMove)
    : 1
  const suppressesAddedEffects =
    specialMove &&
    suppressesBattleMoveAddedEffectsByAbility(attacker, specialMove)
  const secondaryEffectChanceMultiplier = specialMove
    ? getBattleAbilitySecondaryEffectChance(attacker, specialMove, 100) / 100
    : 1
  const resolvedMoveDamage =
    specialMove && !hiddenPower && !specialMove.delayedDamage
      ? resolveMoveDamageMultiplier(
          specialMove,
          getEffectiveBattleTypes(defender),
          chanceRandom,
          weather,
          { forceMaxDamageRange: usesBattleAbilityMaxMultiHitDamage(attacker, specialMove) },
        )
      : undefined
  const movePower = specialMove
    ? specialMove.damage === 0 && !specialMove.delayedDamage
      ? 0
      : Math.max(
          1,
          Math.round(
            BASE_BATTLE_POWER *
              (hiddenPower?.damageMultiplier ??
                specialMove.delayedDamage?.damage ??
                resolvedMoveDamage?.damageMultiplier ??
                specialMove.damage),
          ),
        )
    : BASE_BATTLE_POWER
  const moveHitCount =
    specialMove && !hiddenPower && !specialMove.delayedDamage
      ? (resolvedMoveDamage?.hitCount ?? 1)
      : 1
  const typeEffectivenessOverride = specialMove?.ignoreTypeEffectiveness
    ? 1
    : undefined
  const defenderSide = attackerSide === 'player' ? 'enemy' : 'player'
  const recoilMoveDamageMultiplier = specialMove
    ? getBattleAbilityRecoilMoveDamageMultiplier(attacker, specialMove)
    : 1
  const entryMessages = state ? processBattleAbilityEntryCopiesForState(state) : []
  const weatherTypeMessages = state
    ? processBattleAbilityWeatherTypeChangesForState(state)
    : []
  const beforeAttack = getBattleAbilityBeforeAttackFormChange({
    pokemon: attacker,
    damage: moveFailed
      ? 0
      : multiplier *
        recoilMoveDamageMultiplier *
        addedEffectMoveDamageMultiplier *
        movePower,
  })
  const beforeAttackFormChanged = applyBattleFormChange(attacker, beforeAttack.formId)
  const beforeAttackTypeMessages = applyBattleAbilityBeforeAttackTypeChange({
    pokemon: attacker,
    attackType: hiddenPower?.attackType || move.attackType,
    damage: moveFailed
      ? 0
      : multiplier *
        recoilMoveDamageMultiplier *
        addedEffectMoveDamageMultiplier *
        movePower,
  })
  const damageResult =
    moveFailed || (specialMove?.damage === 0 && !specialMove?.damageRule && !specialMove?.delayedDamage)
      ? {
          damage: 0,
          typeEffectiveness: 1,
          isSuperEffective: false,
          isNotVeryEffective: false,
          isImmune: false,
          usedType:
            hiddenPower?.attackType ||
            move.attackType ||
            specialMove?.forcedType ||
            attacker.types?.[0] ||
            'normal',
          isCrit: false,
          isRadiantBoost: false,
          weatherMultiplier: 1,
          weatherMessage: '',
          terrainMultiplier: 1,
        }
      : calculateDamage(
          attacker,
          defender,
          moveStance,
          multiplier * recoilMoveDamageMultiplier * addedEffectMoveDamageMultiplier,
          hiddenPower?.attackType || move.attackType,
          movePower,
          typeEffectivenessOverride,
          specialMove?.critChance,
          weather,
          getSecondaryStatusTypeImmunityBypassAttackTypes({
            state,
            defender,
            defenderSide,
          }),
      {
        ignoreDefenderStatStages: specialMove?.ignoreDefenderStatStages,
        damageStatSource: specialMove?.damageStatSource,
        moveId: specialMove?.id,
        currentTurn,
        terrain: state?.terrain?.terrain,
      },
    )

  const damageRule = !moveFailed && specialMove?.damageRule
    ? resolveDamageRuleDamage({
        rule: specialMove.damageRule,
        attacker,
        defender,
        state,
        side: attackerSide,
        attackerTeam: state
          ? attackerSide === 'player'
            ? state.playerTeam
            : state.enemyTeam
          : undefined,
        applyAverage: true,
      })
    : {}
  if (damageRule.failed) {
    moveFailed = true
    if (specialMove && state) {
      recordFailedMoveUse({
        state,
        side: attackerSide,
        pokemon: attacker,
        move: specialMove,
      })
    }
  }
  const timedSecondaryStatuses =
    splitSecondaryStatusesForDamageTiming(specialMove)
  const preDamageSecondaryMessages =
    !moveFailed && timedSecondaryStatuses.preDamage.length
      ? applySecondaryStatusesFromMove({
          move: { secondaryStatuses: timedSecondaryStatuses.preDamage },
          state,
          attacker,
          defender,
          sourceSide: attackerSide,
          random: chanceRandom,
          chanceMultiplier: secondaryEffectChanceMultiplier,
        })
      : []
  const reductionResult = applySecondaryStatusDamageModifiers({
    state,
    attacker,
    defender,
    attackerSide,
    defenderSide,
    damage: damageRule.failed
      ? 0
      : damageRule.damage ?? Math.floor(
          damageResult.damage *
            (specialMove
              ? getConditionalDamageMultiplier({
                  move: specialMove,
                  attacker,
                  defender,
                  state,
                  side: attackerSide,
                  attackType: damageResult.usedType,
                  weather,
                })
              : 1),
        ),
    attackStance: moveStance,
    attackType: damageResult.usedType,
  })
  const nextDamage = applyNextDamageModifier(attacker, reductionResult.damage)
  const typeImmunityBypassAttackTypes = getSecondaryStatusTypeImmunityBypassAttackTypes({
    state,
    defender,
    defenderSide,
  })
  const delayedAbilityResult = specialMove?.delayedDamage
    ? applyBattleAbilityDamageModifiers({
        attacker,
        defender,
        damage: nextDamage.damage,
        attackStance: moveStance,
        attackType: damageResult.usedType,
        typeEffectiveness: damageResult.typeEffectiveness,
        typeImmunityBypassAttackTypes,
      })
    : undefined
  if (delayedAbilityResult) {
    applyBattleFormChange(defender, delayedAbilityResult.formChangeId)
  }
  const delayedDamageMessage =
    !moveFailed && specialMove?.delayedDamage
      ? queueDelayedMoveDamage({
          state,
          move: specialMove,
          sourceSide: attackerSide,
          targetSide: defenderSide,
          attacker,
          damage: delayedAbilityResult?.damage ?? nextDamage.damage,
          attackType: damageResult.usedType,
        })
      : undefined
  const repeatedHitResult = delayedDamageMessage
    ? {
        damage: 0,
        messages: delayedAbilityResult?.messages ?? [],
        previousHp: defender.currentHp,
        firstHitDamage: 0,
        attemptedHits: 0,
      }
    : applyRepeatedHitDamage({
        state,
        attacker,
        defender,
        defenderSide,
        baseDamage: nextDamage.damage,
        hitCount: moveHitCount,
        attackStance: moveStance,
        attackType: damageResult.usedType,
        typeEffectiveness: damageResult.typeEffectiveness,
        typeImmunityBypassAttackTypes,
        criticalHit: damageResult.isCrit,
        random,
      })
  const defenderPreviousHp = repeatedHitResult.previousHp
  let totalDamage = repeatedHitResult.damage
  const extraHitMessages: string[] = []
  const extraHitMultiplier = getBattleAbilityExtraHitDamageMultiplier(
    attacker,
    specialMove,
  )
  if (
    !delayedDamageMessage &&
    extraHitMultiplier > 0 &&
    repeatedHitResult.firstHitDamage > 0 &&
    defender.currentHp > 0
  ) {
    const extraBaseDamage = Math.max(1, Math.floor(nextDamage.damage * extraHitMultiplier))
    const extraAbilityResult = applyBattleAbilityDamageModifiers({
      attacker,
      defender,
      damage: extraBaseDamage,
      attackStance: moveStance,
      attackType: damageResult.usedType,
      typeEffectiveness: damageResult.typeEffectiveness,
      typeImmunityBypassAttackTypes: getSecondaryStatusTypeImmunityBypassAttackTypes({
        state,
        defender,
        defenderSide,
      }),
    })
    if (extraAbilityResult.messages.length) {
      extraHitMessages.push(...extraAbilityResult.messages)
    }
    applyBattleFormChange(defender, extraAbilityResult.formChangeId)
    const extraBlockResult = applyHeldDamageBlock(
      defender,
      extraAbilityResult.damage,
      random,
    )
    if (extraBlockResult.message) extraHitMessages.push(extraBlockResult.message)
    const extraEndureResult = applyPokemonResearchEndure(
      defender,
      extraBlockResult.damage,
    )
    const extraPreviousHp = defender.currentHp
    defender.currentHp = Math.max(0, defender.currentHp - extraEndureResult.damage)
    if (extraEndureResult.damage > 0) {
      totalDamage += extraEndureResult.damage
      extraHitMessages.push(
        `${attacker.name}'s Parental Bond struck again! [icon:damage:${extraEndureResult.damage}]`,
      )
    }
    if (extraEndureResult.message) extraHitMessages.push(extraEndureResult.message)
    extraHitMessages.push(
      ...applyBattleAbilityOnDamagedStatStages({
        defender,
        attacker,
        damage: extraEndureResult.damage,
        previousHp: extraPreviousHp,
        attackStance: moveStance,
        attackType: damageResult.usedType,
        criticalHit: damageResult.isCrit,
        weather: state?.weather?.weather,
        state,
        defenderSide,
        random,
      }),
    )
  }
  const defenderLowHpSwitch = state
    ? processBattleAbilityLowHpSelfSwitch({
        state,
        side: defenderSide,
        pokemon: defender,
        previousHp: defenderPreviousHp,
        damage: totalDamage,
        playerMode: 'auto',
      })
    : { switched: false, messages: [] }
  const defenderHpForm = getBattleAbilityHpThresholdFormChange(defender)
  const defenderHpFormChanged = applyBattleFormChange(defender, defenderHpForm.formId)
  const attackerKoForm =
    defender.currentHp <= 0 && totalDamage > 0
      ? getBattleAbilityAfterKoFormChange(attacker)
      : { messages: [] }
  const attackerKoStatStages =
    defender.currentHp <= 0 && totalDamage > 0
      ? applyBattleAbilityAfterKoStatStages(attacker)
      : []
  const attackerKoFormChanged = applyBattleFormChange(attacker, attackerKoForm.formId)
  recordBattleDamage({
    state,
    sourceSide: attackerSide,
    targetSide: defenderSide,
    sourcePokemon: attacker,
    targetPokemon: defender,
    move: specialMove,
    damage: totalDamage,
    attackType: damageResult.usedType,
  })
  const chargeResult = applyHeldItemChargeOnHit({
    state,
    pokemon: defender,
    attackType: damageResult.usedType,
    damage: totalDamage,
  })
  const faintBondMessages = processSecondaryStatusFaintEffects({
    state,
    faintedPokemon: defender,
    faintedSide: defenderSide,
    attackerPokemon: attacker,
    attackerSide,
    damage: totalDamage,
  })

  let effectMessage = ''
  if (preDamageSecondaryMessages.length) {
    effectMessage += ` ${preDamageSecondaryMessages.join(' ')}`
  }
  if (entryMessages.length || weatherTypeMessages.length) {
    effectMessage += ` ${[...entryMessages, ...weatherTypeMessages].join(' ')}`
  }
  if (beforeAttackFormChanged) {
    effectMessage += ` ${beforeAttack.messages.join(' ')}`
  }
  if (beforeAttackTypeMessages.length) {
    effectMessage += ` ${beforeAttackTypeMessages.join(' ')}`
  }
  if (defenderHpFormChanged) {
    effectMessage += ` ${defenderHpForm.messages.join(' ')}`
  }
  if (repeatedHitResult.messages.length) {
    effectMessage += ` ${repeatedHitResult.messages.join(' ')}`
  }
  if (extraHitMessages.length) {
    effectMessage += ` ${extraHitMessages.join(' ')}`
  }
  if (defenderLowHpSwitch.messages.length) {
    effectMessage += ` ${defenderLowHpSwitch.messages.join(' ')}`
  }
  if (attackerKoFormChanged) {
    effectMessage += ` ${attackerKoForm.messages.join(' ')}`
  }
  if (attackerKoStatStages.length) {
    effectMessage += ` ${attackerKoStatStages.join(' ')}`
  }
  if (reductionResult.messages.length) {
    effectMessage += ` ${reductionResult.messages.join(' ')}`
  }
  if (nextDamage.message) {
    effectMessage += ` ${nextDamage.message}`
  }
  if (chargeResult.message) {
    effectMessage += ` ${chargeResult.message}`
  }
  if (delayedDamageMessage) {
    effectMessage += ` ${delayedDamageMessage}`
  }
  if (battleConditionFailed) {
    effectMessage += ` ${battleConditionFailed}`
  }
  if (abilityMoveBlockMessage) {
    effectMessage += ` ${abilityMoveBlockMessage}`
  }
  if (damageRule.failed) {
    effectMessage += ` ${damageRule.failed}`
  }
  if (faintBondMessages.length) {
    effectMessage += ` ${faintBondMessages.join(' ')}`
  }
  if (!moveFailed && specialMove?.absorb) {
    const absorbResult = applyMoveAbsorbHealing(
      attacker,
      totalDamage,
      specialMove.absorb,
    )
    if (absorbResult.applied) {
      effectMessage += ` ${absorbResult.message}`
    }
  }
  const heldStatusResult =
    defender.currentHp > 0
      ? attemptHeldAttackStatus(attacker, defender, damageResult.usedType, random)
      : { applied: false, message: '' }
  if (heldStatusResult.applied) {
    effectMessage += ` ${heldStatusResult.message}`
  }

  const attackBreakResult = applyHeldAttackBreak(
    attacker,
    damageResult.usedType,
    random,
  )
  if (attackBreakResult.applied) {
    effectMessage += ` ${attackBreakResult.message}`
  }

  const heldItemResult = applyHeldItemIfTriggered(defender, 'hp')
  if (heldItemResult.applied) {
    effectMessage += ` ${heldItemResult.message}`
  }

  if (beforeMoveStatus.message) {
    effectMessage += ` ${beforeMoveStatus.message}`
  }
  if (beforeMoveAbility.message) {
    effectMessage += ` ${beforeMoveAbility.message}`
  }

  if (!moveFailed && specialMove?.heal) {
    const healAmount = getMoveHealAmount({
      move: specialMove,
      pokemon: attacker,
      weather,
    })
    attacker.currentHp = Math.min(
      attacker.maxHp,
      attacker.currentHp + healAmount,
    )
    effectMessage += ` ${attacker.name} healed ${healAmount} HP!`
  }

  if (!moveFailed && specialMove?.buffs) {
    for (const buff of specialMove.buffs) {
      const chance = buff.chance ?? 100
      if (chanceRandom() * 100 >= chance) {
        continue
      }

      const target = (buff.target ?? 'self') === 'self' ? attacker : defender
      const targetSide = (buff.target ?? 'self') === 'self' ? attackerSide : defenderSide
      const opposingPokemon = target === attacker ? defender : attacker
      const opposingSide = target === attacker ? defenderSide : attackerSide
      if (buff.stages < 0) {
        const reflection = applyBattleAbilityStatStageDropReflection({
          pokemon: target,
          opponent: opposingPokemon,
          stat: buff.stat,
          stages: buff.stages,
          source: target === attacker ? 'self' : 'opponent',
          sourcePokemon: attacker,
        })
        if (reflection.reflected) {
          effectMessage += ` ${reflection.messages.join(' ')}`
          if (reflection.changed) {
            recordStatLoweredThisTurn({
              state,
              side: opposingSide,
              pokemon: opposingPokemon,
            })
          }
          continue
        }
      }
      if (
        buff.stages < 0 &&
        blocksBattleStatStageDropByAbility({
          pokemon: target,
          stat: buff.stat,
          source: target === attacker ? 'self' : 'opponent',
          sourcePokemon: attacker,
        })
      ) {
        effectMessage += ` ${getBattleStatStageDropBlockMessage(target)}`
        continue
      }
      if (!target.statStages) {
        target.statStages = { ...DEFAULT_STAT_STAGES }
      }
      const statKey = buff.stat
      target.statStages[statKey] = clampStatStage(
        target.statStages[statKey] + buff.stages,
        statKey,
      )
      if (buff.stages < 0) {
        recordStatLoweredThisTurn({ state, side: targetSide, pokemon: target })
        const triggerMessages = applyBattleAbilityStatStageDropTriggers({
          pokemon: target,
          source: target === attacker ? 'self' : 'opponent',
        })
        if (triggerMessages.length) {
          effectMessage += ` ${triggerMessages.join(' ')}`
        }
      }
      const direction = buff.stages >= 0 ? 'rose' : 'fell'
      effectMessage += ` ${target.name}'s ${statKey} ${direction}!`
      if (buff.stages > 0) {
        const copyMessages = applyBattleAbilityOpponentStatStageBoostCopy({
          pokemon: opposingPokemon,
          boostedPokemon: target,
          stat: statKey,
          stages: buff.stages,
        })
        if (copyMessages.length) {
          effectMessage += ` ${copyMessages.join(' ')}`
        }
      }
    }
  }

  const secondaryEffectBlockMessage =
    !moveFailed && specialMove
      ? getBattleSecondaryEffectBlockMessage({
          defender,
          move: specialMove,
          damageDealt: totalDamage,
        })
      : undefined
  if (secondaryEffectBlockMessage) effectMessage += ` ${secondaryEffectBlockMessage}`
  const skipTargetAddedEffects = Boolean(
    secondaryEffectBlockMessage || suppressesAddedEffects,
  )

  if (!moveFailed && specialMove?.debuffs) {
    for (const debuff of specialMove.debuffs) {
      const chance = getBattleAbilitySecondaryEffectChance(
        attacker,
        specialMove,
        debuff.chance,
      )
      if (chanceRandom() * 100 >= chance) {
        continue
      }

      const target = (debuff.target ?? 'enemy') === 'enemy' ? defender : attacker
      if (skipTargetAddedEffects && target === defender) continue
      const targetSide = (debuff.target ?? 'enemy') === 'enemy' ? defenderSide : attackerSide
      const opposingPokemon = target === attacker ? defender : attacker
      const opposingSide = target === attacker ? defenderSide : attackerSide
      if (debuff.stages < 0) {
        const reflection = applyBattleAbilityStatStageDropReflection({
          pokemon: target,
          opponent: opposingPokemon,
          stat: debuff.stat,
          stages: debuff.stages,
          source: target === attacker ? 'self' : 'opponent',
          sourcePokemon: attacker,
        })
        if (reflection.reflected) {
          effectMessage += ` ${reflection.messages.join(' ')}`
          if (reflection.changed) {
            recordStatLoweredThisTurn({
              state,
              side: opposingSide,
              pokemon: opposingPokemon,
            })
          }
          continue
        }
      }
      if (
        debuff.stages < 0 &&
        blocksBattleStatStageDropByAbility({
          pokemon: target,
          stat: debuff.stat,
          source: target === attacker ? 'self' : 'opponent',
          sourcePokemon: attacker,
        })
      ) {
        effectMessage += ` ${getBattleStatStageDropBlockMessage(target)}`
        continue
      }
      if (!target.statStages) {
        target.statStages = { ...DEFAULT_STAT_STAGES }
      }
      const statKey = debuff.stat
      target.statStages[statKey] = clampStatStage(
        target.statStages[statKey] + debuff.stages,
        statKey,
      )
      if (debuff.stages < 0) {
        recordStatLoweredThisTurn({ state, side: targetSide, pokemon: target })
        const triggerMessages = applyBattleAbilityStatStageDropTriggers({
          pokemon: target,
          source: target === attacker ? 'self' : 'opponent',
        })
        if (triggerMessages.length) {
          effectMessage += ` ${triggerMessages.join(' ')}`
        }
      }
      const direction = debuff.stages >= 0 ? 'rose' : 'fell'
      effectMessage += ` ${target.name}'s ${statKey} ${direction}!`
      if (debuff.stages > 0) {
        const copyMessages = applyBattleAbilityOpponentStatStageBoostCopy({
          pokemon: opposingPokemon,
          boostedPokemon: target,
          stat: statKey,
          stages: debuff.stages,
        })
        if (copyMessages.length) {
          effectMessage += ` ${copyMessages.join(' ')}`
        }
      }
    }
  }

  if (!moveFailed && specialMove?.status) {
    const accuracy = getEffectiveMoveAccuracy({
      move: specialMove,
      state,
      attacker,
      defender,
      attackerSide,
      weather,
    })
    if (
      Math.random() * 100 < accuracy &&
      Math.random() * 100 <
        getBattleAbilitySecondaryEffectChance(
          attacker,
          specialMove,
          specialMove.status.chance,
        )
    ) {
      const statusTarget =
        specialMove.status.target ??
        specialMove.target ??
        'enemy'
      const statusTargetPokemon = statusTarget === 'self' ? attacker : defender
      if (!skipTargetAddedEffects || statusTargetPokemon !== defender) {
        const statusTargetSide = statusTarget === 'self' ? attackerSide : defenderSide
        const prevention = getSecondaryStatusStatusPreventionMessage({
          state,
          pokemon: statusTargetPokemon,
          side: statusTargetSide,
          statusId: specialMove.status.id,
        })
        const statusResult = prevention
          ? { applied: false, message: prevention }
          : applyStatus(
              statusTargetPokemon,
              specialMove.status.id,
              weather,
              {
                force: specialMove.status.forceStatus,
                terrain: state?.terrain?.terrain,
                sourcePokemon: attacker,
              },
            )
        if (statusResult.message) {
          effectMessage += ` ${statusResult.message}`
        }
        if (statusResult.applied) {
          const reflectionMessages = applyBattleAbilityStatusReflection({
            pokemon: statusTargetPokemon,
            source: attacker,
            statusId: specialMove.status.id,
            weather,
            state,
          })
          if (reflectionMessages.length) {
            effectMessage += ` ${reflectionMessages.join(' ')}`
          }
        }
      }
    }
  }

  if (!moveFailed && specialMove?.additionalStatuses) {
    const accuracy = getEffectiveMoveAccuracy({
      move: specialMove,
      state,
      attacker,
      defender,
      attackerSide,
      weather,
    })
    for (const status of specialMove.additionalStatuses) {
      if (
        Math.random() * 100 < accuracy &&
        Math.random() * 100 <
          getBattleAbilitySecondaryEffectChance(attacker, specialMove, status.chance)
      ) {
        const statusTarget =
          status.target ?? (specialMove.target === 'self' ? 'self' : 'enemy')
        const statusTargetPokemon = statusTarget === 'self' ? attacker : defender
        if (skipTargetAddedEffects && statusTargetPokemon === defender) continue
        const statusTargetSide = statusTarget === 'self' ? attackerSide : defenderSide
        const prevention = getSecondaryStatusStatusPreventionMessage({
          state,
          pokemon: statusTargetPokemon,
          side: statusTargetSide,
          statusId: status.id,
        })
        const statusResult = prevention
          ? { applied: false, message: prevention }
          : applyStatus(
              statusTargetPokemon,
              status.id,
              weather,
              {
                terrain: state?.terrain?.terrain,
                sourcePokemon: attacker,
              },
            )
        if (statusResult.message) {
          effectMessage += ` ${statusResult.message}`
        }
        if (statusResult.applied) {
          const reflectionMessages = applyBattleAbilityStatusReflection({
            pokemon: statusTargetPokemon,
            source: attacker,
            statusId: status.id,
            weather,
            state,
          })
          if (reflectionMessages.length) {
            effectMessage += ` ${reflectionMessages.join(' ')}`
          }
        }
      }
    }
  }

  if (!moveFailed && specialMove?.randomStatuses && !skipTargetAddedEffects) {
    const randomStatusMessages = applyMoveRandomStatuses({
      move: specialMove,
      attacker,
      defender: defender,
      random: chanceRandom,
      weather,
      state,
      terrain: state?.terrain,
      chanceMultiplier: secondaryEffectChanceMultiplier,
    })
    if (randomStatusMessages.length) {
      effectMessage += ` ${randomStatusMessages.join(' ')}`
    }
  }

  if (!moveFailed && timedSecondaryStatuses.postDamage.length && !skipTargetAddedEffects) {
    const secondaryMessages = applySecondaryStatusesFromMove({
      move: { secondaryStatuses: timedSecondaryStatuses.postDamage },
      state,
      attacker,
      defender,
      sourceSide: attackerSide,
      random: chanceRandom,
      chanceMultiplier: secondaryEffectChanceMultiplier,
    })
    if (secondaryMessages.length) {
      effectMessage += ` ${secondaryMessages.join(' ')}`
    }
  }

  if (!moveFailed && specialMove?.selfDamage) {
    const recoilBlockMessage = getBattleRecoilDamageBlockMessage(
      attacker,
      specialMove,
    )
    if (recoilBlockMessage) {
      effectMessage += ` ${recoilBlockMessage}`
    } else {
      const selfDamageResult = applyMoveSelfDamage(
        attacker,
        specialMove.selfDamage,
        chanceRandom,
      )
      if (selfDamageResult.applied) {
        effectMessage += ` ${selfDamageResult.message}`
      }
    }
  }

  if (!moveFailed && specialMove?.disableStance) {
    const accuracy = getEffectiveMoveAccuracy({
      move: specialMove,
      state,
      attacker,
      defender,
      attackerSide,
      weather,
    })
    if (Math.random() * 100 < accuracy) {
      if (!skipTargetAddedEffects) {
        effectMessage += blocksBattleMentalEffectByAbility(defender, 'disable')
          ? ` ${getBattleMentalEffectBlockMessage(defender, specialMove.name)}`
          : ` ${applyStanceDisable({
              pokemon: defender,
              stance: specialMove.disableStance.stance,
              turns: specialMove.disableStance.turns,
              currentTurn,
            })}`
      }
    } else {
      effectMessage += ` ${specialMove.name} failed!`
    }
  }

  if (!moveFailed && specialMove && state) {
    const runtimeEffects = applyMoveRuntimeEffects({
      move: specialMove,
      state,
      side: attackerSide,
      attacker,
      defender,
      damageDealt: totalDamage,
    })
    if (runtimeEffects.failed) effectMessage += ` ${runtimeEffects.failed}`
    if (runtimeEffects.failed) {
      recordFailedMoveUse({
        state,
        side: attackerSide,
        pokemon: attacker,
        move: specialMove,
      })
    }
    if (runtimeEffects.messages.length) {
      effectMessage += ` ${runtimeEffects.messages.join(' ')}`
    }
  }

  const label = moveStance.charAt(0).toUpperCase() + moveStance.slice(1)
  const attackLabel = specialMove?.name || `${label} Attack`
  const metronomeMessage =
    move.calledByMetronome && specialMove
      ? `${attacker.name}'s Metronome called ${specialMove.name}! `
      : ''
  if (contest.message && !moveMissed) {
    effectMessage += ` ${contest.message}`
  }
  const radiantMessage = damageResult.isRadiantBoost
    ? `\n${attacker.name}'s aura burns bright.`
    : ''
  if (attacker.status?.id === 'vanished') {
    attacker.status = undefined
    effectMessage += `\n${attacker.name} resurfaced!`
  }
  if (!moveFailed) {
    const rarityMessages = processBattleRarityAttackAttempt({
      attacker,
      defender,
      random,
    })
    if (rarityMessages.length) effectMessage += ` ${rarityMessages.join(' ')}`
  }
  const endureMessage = ''
  const weatherMessage = damageResult.weatherMessage
    ? ` ${damageResult.weatherMessage}`
    : ''
  const effectivenessMessage = formatTypeEffectivenessMessage(damageResult)
  if (isZMove) consumeZMoveCharge(attacker)
  const finalDamage = moveMissed ? 0 : totalDamage
  const baseMessage = `${metronomeMessage}${attackerName}: ${attacker.name} uses ${attackLabel}! [icon:stance:${moveStance}] [icon:type:${damageResult.usedType}]`
  return {
    didAttack: !moveFailed,
    dmg: finalDamage,
    result: outcome.result,
    usedType: moveMissed ? undefined : damageResult.usedType,
    message: moveMissed
      ? `${baseMessage} missed!${effectMessage}`
      : `${baseMessage} Dealt ${finalDamage}.${effectivenessMessage}${weatherMessage}${effectMessage}${endureMessage}${radiantMessage}`,
    preventsOpponentDamage:
      !moveFailed &&
      !suppressesBattleCounterPreventionByAbility(attacker) &&
      (contest.preventCounter ||
        defenderLowHpSwitch.switched ||
        (specialMove?.preventCounterOnStanceWin === true &&
          outcome.result === 'win')),
  }
}

export function resolvePvpFaint(
  state: Pick<
    BattleState,
    | 'activePlayerIndex'
    | 'activeEnemyIndex'
    | 'playerName'
    | 'enemyName'
    | 'status'
    | 'turn'
    | 'weather'
  >,
  team: BattlePokemon[],
  side: 'player' | 'enemy',
): string[] {
  const messages: string[] = []
  const activeIndex =
    side === 'player' ? state.activePlayerIndex : state.activeEnemyIndex
  const activeMon = team[activeIndex]

  if (!activeMon || activeMon.currentHp > 0) return messages

  messages.push(`${activeMon.name} fainted!`)

  const nextIndex = team.findIndex(
    (pokemon, index) => index !== activeIndex && pokemon.currentHp > 0,
  )
  if (nextIndex !== -1) {
    if ('playerTeam' in state && 'enemyTeam' in state) {
      clearSourceLinkedTrapSecondaryStatuses({
        state: state as BattleState,
        sourceSide: side,
        sourcePokemon: activeMon,
      })
    }
    clearPokemonSecondaryStatuses(activeMon)
    if (side === 'player') state.activePlayerIndex = nextIndex
    else state.activeEnemyIndex = nextIndex
    team[nextIndex].activeTurnStarted = state.turn + 1
    const rarityMessages = applyBattleRarityEntryEffects(team[nextIndex])
    const suppressionMessages = processBattleAbilitySuppressionForState(
      state as BattleState,
    )

    messages.push(
      `${side === 'player' ? state.playerName : state.enemyName} sent out ${team[nextIndex].name}!`,
    )
    messages.push(
      ...suppressionMessages,
      ...rarityMessages,
      ...processBattleAbilityWeatherSet({
        state: state as BattleState,
        pokemon: team[nextIndex],
        ownerName: side === 'player' ? state.playerName : state.enemyName,
      }),
      ...processBattleAbilityTerrainSet({
        state: state as BattleState,
        pokemon: team[nextIndex],
        ownerName: side === 'player' ? state.playerName : state.enemyName,
      }),
    )
    return messages
  }

  state.status = side === 'player' ? 'lost' : 'won'
  messages.push(
    `${side === 'player' ? state.playerName : state.enemyName} has no more Pokemon! ${
      side === 'player' ? state.enemyName : state.playerName
    } wins!`,
  )

  return messages
}
