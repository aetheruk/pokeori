import { Z_MOVE_DAMAGE_MULTIPLIER } from '@/utilities/battle/z-move'
import {
  calculateDamage,
  handleShieldInteraction,
  resolveStance,
} from '@/utilities/battle/battle-logic'
import type { BattlePokemon, BattleStance, PowersState, StanceResult } from '@/utilities/battle/types'
import { applyDimensionalChargeForResult, type BattleTurnResult } from './pvp-turn'
import { applyPokemonResearchEndure } from '@/utilities/battle/research-survival'
import {
  applyHeldAttackBreak,
  applyHeldDamageBlock,
  applyHeldItemChargeOnHit,
} from '@/utilities/battle/held-items'
import { attemptHeldAttackStatus } from '@/utilities/battle/status-effects-logic'
import type { WeatherType } from '@/data/weather'
import { BASE_BATTLE_POWER } from '@/utilities/battle/constants'
import {
  applySecondaryStatusDamageModifiers,
  getSecondaryStatusTypeImmunityBypassAttackTypes,
  processSecondaryStatusFaintEffects,
} from '@/utilities/battle/secondary-statuses'
import type { BattleState } from '@/utilities/battle/types'
import {
  applyNextDamageModifier,
  recordBattleDamage,
} from '@/utilities/battle/move-effects'
import {
  applyBattleAbilityAfterKoStatStages,
  applyBattleAbilityBeforeAttackTypeChange,
  applyBattleAbilityDamageModifiers,
  getBattleAbilityExtraHitDamageMultiplier,
  applyBattleAbilityOnDamagedStatStages,
  getBattleAbilityAfterKoFormChange,
  getBattleAbilityBeforeAttackFormChange,
  getBattleAbilityHpThresholdFormChange,
  processBattleAbilityEntryCopiesForState,
  processBattleAbilityWeatherTypeChangesForState,
} from '@/utilities/battle/abilities'
import { applyBattleFormChange } from '@/utilities/battle/stats-calc'
import { processBattleAbilityLowHpSelfSwitch } from '@/utilities/battle/switching'
import { applyRepeatedHitDamage } from '@/utilities/battle/multi-hit'

export interface PveTurnMultipliers {
  resolution: StanceResult
  playerDamageMultiplier: number
  enemyDamageMultiplier: number
}

export interface PveDamageExchange {
  playerDamage: number
  enemyDamage: number
  shieldMessages: string
  playerDamageResult: ReturnType<typeof calculateDamage>
  enemyDamageResult: ReturnType<typeof calculateDamage>
}

export interface PveEnemyOnlyAttack {
  enemyDamage: number
  shieldMessage: string
  enemyDamageResult: ReturnType<typeof calculateDamage>
}

export function applyPveExtraHit(params: {
  state?: BattleState
  attacker: BattlePokemon | undefined
  defender: BattlePokemon
  defenderSide: 'player' | 'enemy'
  move?: Parameters<typeof getBattleAbilityExtraHitDamageMultiplier>[1]
  baseDamage: number
  firstDamage: number
  attackStance?: BattleStance
  attackType?: string
  typeEffectiveness?: number
  typeImmunityBypassAttackTypes?: string[] | true
  criticalHit?: boolean
  random?: () => number
}): { damage: number; messages: string[] } {
  const {
    state,
    attacker,
    defender,
    defenderSide,
    move,
    baseDamage,
    firstDamage,
    attackStance,
    attackType,
    typeEffectiveness,
    typeImmunityBypassAttackTypes,
    criticalHit = false,
    random,
  } = params
  if (!attacker || firstDamage <= 0 || defender.currentHp <= 0) {
    return { damage: 0, messages: [] }
  }

  const extraHitMultiplier = getBattleAbilityExtraHitDamageMultiplier(attacker, move)
  if (extraHitMultiplier <= 0) return { damage: 0, messages: [] }

  const messages: string[] = []
  const extraBaseDamage = Math.max(1, Math.floor(baseDamage * extraHitMultiplier))
  const abilityResult = applyBattleAbilityDamageModifiers({
    attacker,
    defender,
    damage: extraBaseDamage,
    attackStance,
    attackType,
    typeEffectiveness,
    typeImmunityBypassAttackTypes,
  })
  messages.push(...abilityResult.messages)
  applyBattleFormChange(defender, abilityResult.formChangeId)
  const blockResult = applyHeldDamageBlock(defender, abilityResult.damage, random)
  if (blockResult.message) messages.push(blockResult.message)
  const endureResult = applyPokemonResearchEndure(defender, blockResult.damage)
  const previousHp = defender.currentHp
  defender.currentHp = Math.max(0, defender.currentHp - endureResult.damage)
  if (endureResult.damage > 0) {
    messages.push(
      `${attacker.name}'s Parental Bond struck again! [icon:damage:${endureResult.damage}]`,
    )
  }
  if (endureResult.message) messages.push(endureResult.message)
  messages.push(
    ...applyBattleAbilityOnDamagedStatStages({
      defender,
      attacker,
      damage: endureResult.damage,
      previousHp,
      attackStance,
      attackType,
      criticalHit,
      weather: state?.weather?.weather,
      state,
      defenderSide,
      random,
    }),
  )

  return { damage: endureResult.damage, messages }
}

export function resolvePveTurnMultipliers(params: {
  playerStance: BattleStance
  enemyStance: BattleStance
  enemySwapped?: boolean
  isZMove?: boolean
  isEnemyZMove?: boolean
}): PveTurnMultipliers {
  const {
    playerStance,
    enemyStance,
    enemySwapped = false,
    isZMove = false,
    isEnemyZMove = false,
  } = params

  if (enemySwapped) {
    return {
      resolution: { result: 'win', damageMultiplier: 1.0 },
      playerDamageMultiplier: isZMove ? Z_MOVE_DAMAGE_MULTIPLIER : 1.0,
      enemyDamageMultiplier: 0.0,
    }
  }

  const resolution = resolveStance(playerStance, enemyStance)
  const enemyResolution = resolveStance(enemyStance, playerStance)
  let enemyDamageMultiplier = enemyResolution.damageMultiplier
  if (isEnemyZMove) enemyDamageMultiplier *= Z_MOVE_DAMAGE_MULTIPLIER

  return {
    resolution: isZMove
      ? { result: resolution.result, damageMultiplier: Z_MOVE_DAMAGE_MULTIPLIER }
      : resolution,
    playerDamageMultiplier: isZMove
      ? Z_MOVE_DAMAGE_MULTIPLIER
      : resolution.damageMultiplier,
    enemyDamageMultiplier,
  }
}

export function resolvePveDamageExchange(params: {
  state?: BattleState
  playerMon: BattlePokemon
  enemyMon: BattlePokemon
  playerStance: BattleStance
  enemyStance: BattleStance
  playerDamageMultiplier: number
  enemyDamageMultiplier: number
  attackType?: string
  playerMoveId?: string
  enemyAttackType?: string
  enemyMoveId?: string
  enemyCanMove: boolean
  enemySwapped?: boolean
  basePower?: number
  enemyBasePower?: number
  enemyTypeEffectivenessOverride?: number
  enemyCritChance?: number
  enemyIgnoreDefenderStatStages?: boolean
	  weather?: WeatherType
	  currentTurn?: number
	}): PveDamageExchange {
  const {
    playerMon,
    enemyMon,
    playerStance,
    enemyStance,
    playerDamageMultiplier,
    enemyDamageMultiplier,
    attackType,
    playerMoveId,
    enemyAttackType,
    enemyMoveId,
    enemyCanMove,
    enemySwapped = false,
    basePower = BASE_BATTLE_POWER,
    enemyBasePower,
    enemyTypeEffectivenessOverride,
    enemyCritChance,
    enemyIgnoreDefenderStatStages,
	  weather,
	  currentTurn,
	} = params

  const enemyTypeImmunityBypassAttackTypes =
    getSecondaryStatusTypeImmunityBypassAttackTypes({
      state: params.state,
      defender: enemyMon,
      defenderSide: 'enemy',
    })
  const playerTypeImmunityBypassAttackTypes =
    getSecondaryStatusTypeImmunityBypassAttackTypes({
      state: params.state,
      defender: playerMon,
      defenderSide: 'player',
    })
  const beforeMessages: string[] = []
  if (params.state) {
    beforeMessages.push(...processBattleAbilityEntryCopiesForState(params.state))
    beforeMessages.push(...processBattleAbilityWeatherTypeChangesForState(params.state))
  }
  const playerBeforeAttack = getBattleAbilityBeforeAttackFormChange({
    pokemon: playerMon,
    damage: playerDamageMultiplier * basePower,
  })
  if (applyBattleFormChange(playerMon, playerBeforeAttack.formId)) {
    beforeMessages.push(...playerBeforeAttack.messages)
  }
  beforeMessages.push(
    ...applyBattleAbilityBeforeAttackTypeChange({
      pokemon: playerMon,
      attackType,
      damage: playerDamageMultiplier * basePower,
    }),
  )
  const enemyBeforeAttack = getBattleAbilityBeforeAttackFormChange({
    pokemon: enemyMon,
    damage: enemyCanMove ? enemyDamageMultiplier * (enemyBasePower ?? BASE_BATTLE_POWER) : 0,
  })
  if (applyBattleFormChange(enemyMon, enemyBeforeAttack.formId)) {
    beforeMessages.push(...enemyBeforeAttack.messages)
  }
  beforeMessages.push(
    ...applyBattleAbilityBeforeAttackTypeChange({
      pokemon: enemyMon,
      attackType: enemyAttackType,
      damage: enemyCanMove
        ? enemyDamageMultiplier * (enemyBasePower ?? BASE_BATTLE_POWER)
        : 0,
    }),
  )

  const playerDamageResult = calculateDamage(
    playerMon,
    enemyMon,
    playerStance,
    playerDamageMultiplier,
    attackType,
    basePower,
    undefined,
    undefined,
    weather,
    enemyTypeImmunityBypassAttackTypes,
	    {
	      moveId: playerMoveId,
	      currentTurn,
	      terrain: params.state?.terrain?.terrain,
	    },
	  )
  let playerDamage = playerDamageResult.damage

  const enemyDamageResult = calculateDamage(
    enemyMon,
    playerMon,
    enemyStance,
    enemyDamageMultiplier,
    enemyAttackType,
    enemyBasePower,
    enemyTypeEffectivenessOverride,
    enemyCritChance,
    weather,
    playerTypeImmunityBypassAttackTypes,
	    {
	      ignoreDefenderStatStages: enemyIgnoreDefenderStatStages,
	      moveId: enemyMoveId,
	      currentTurn,
	      terrain: params.state?.terrain?.terrain,
	    },
	  )
  let enemyDamage = enemyCanMove ? enemyDamageResult.damage : 0

  if (!enemyCanMove && !enemySwapped) {
    const neutralPlayerResult = calculateDamage(
      playerMon,
      enemyMon,
      playerStance,
      1.0,
      attackType,
      basePower,
      undefined,
      undefined,
      weather,
      enemyTypeImmunityBypassAttackTypes,
	      {
	        moveId: playerMoveId,
	        currentTurn,
	        terrain: params.state?.terrain?.terrain,
	      },
	    )
    playerDamage = neutralPlayerResult.damage
  }

  let shieldMessages = ''
  if (beforeMessages.length) shieldMessages += beforeMessages.join(' ')
  const enemyShieldResult = handleShieldInteraction(
    enemyMon,
    playerDamageResult.isSuperEffective,
    playerDamageMultiplier > 1,
  )
  if (enemyShieldResult.damageMultiplier === 0) playerDamage = 0
  if (enemyShieldResult.message) shieldMessages += enemyShieldResult.message

  if (enemyCanMove) {
    const playerShieldResult = handleShieldInteraction(
      playerMon,
      enemyDamageResult.isSuperEffective,
      enemyDamageMultiplier > 1,
    )
    if (playerShieldResult.damageMultiplier === 0) enemyDamage = 0
    if (playerShieldResult.message) shieldMessages += playerShieldResult.message
  }

  return {
    playerDamage,
    enemyDamage,
    shieldMessages,
    playerDamageResult,
    enemyDamageResult,
  }
}

export function applyPveDamageExchange(params: {
  state?: BattleState
  playerMon: BattlePokemon
  enemyMon: BattlePokemon
  playerDamage: number
  enemyDamage: number
  playerHitCount?: number
  enemyHitCount?: number
  playerStance?: BattleStance
  enemyStance?: BattleStance
  playerAttackType?: string
  enemyAttackType?: string
  playerTypeEffectiveness?: number
  enemyTypeEffectiveness?: number
  playerCriticalHit?: boolean
  enemyCriticalHit?: boolean
  playerTypeImmunityBypassAttackTypes?: string[] | true
  enemyTypeImmunityBypassAttackTypes?: string[] | true
  enemyCanMove?: boolean
}): { playerDamage: number; enemyDamage: number; messages: string[] } {
  const {
    playerMon,
    enemyMon,
    playerDamage,
    enemyDamage,
    playerHitCount = 1,
    enemyHitCount = 1,
    playerStance,
    enemyStance,
    playerAttackType,
    enemyAttackType,
    playerTypeEffectiveness,
    enemyTypeEffectiveness,
    playerCriticalHit = false,
    enemyCriticalHit = false,
    playerTypeImmunityBypassAttackTypes,
    enemyTypeImmunityBypassAttackTypes,
    enemyCanMove = true,
  } = params
  const enemyReduction = applySecondaryStatusDamageModifiers({
    state: params.state,
    attacker: playerMon,
    defender: enemyMon,
    attackerSide: 'player',
    defenderSide: 'enemy',
    damage: playerDamage,
    attackStance: playerStance,
    attackType: playerAttackType,
  })
  const playerReduction = applySecondaryStatusDamageModifiers({
    state: params.state,
    attacker: enemyMon,
    defender: playerMon,
    attackerSide: 'enemy',
    defenderSide: 'player',
    damage: enemyDamage,
    attackStance: enemyStance,
    attackType: enemyAttackType,
  })
  const playerBoost = applyNextDamageModifier(playerMon, enemyReduction.damage)
  const enemyBoost = applyNextDamageModifier(enemyMon, playerReduction.damage)
  const playerDamageResult = applyRepeatedHitDamage({
    state: params.state,
    attacker: playerMon,
    defender: enemyMon,
    defenderSide: 'enemy',
    baseDamage: playerBoost.damage,
    hitCount: playerHitCount,
    attackStance: playerStance,
    attackType: playerAttackType,
    typeEffectiveness: playerTypeEffectiveness,
    typeImmunityBypassAttackTypes: playerTypeImmunityBypassAttackTypes,
    criticalHit: playerCriticalHit,
  })
  const enemyDamageResult = applyRepeatedHitDamage({
    state: params.state,
    attacker: enemyMon,
    defender: playerMon,
    defenderSide: 'player',
    baseDamage: enemyBoost.damage,
    hitCount: enemyCanMove ? enemyHitCount : 1,
    attackStance: enemyStance,
    attackType: enemyAttackType,
    typeEffectiveness: enemyTypeEffectiveness,
    typeImmunityBypassAttackTypes: enemyTypeImmunityBypassAttackTypes,
    criticalHit: enemyCriticalHit,
    hitCountMessage: enemyCanMove,
  })
  const playerExtraHit = applyPveExtraHit({
    state: params.state,
    attacker: playerMon,
    defender: enemyMon,
    defenderSide: 'enemy',
    baseDamage: playerBoost.damage,
    firstDamage: playerDamageResult.firstHitDamage,
    attackStance: playerStance,
    attackType: playerAttackType,
    typeEffectiveness: playerTypeEffectiveness,
    typeImmunityBypassAttackTypes: playerTypeImmunityBypassAttackTypes,
    criticalHit: playerCriticalHit,
  })
  const enemyExtraHit = enemyCanMove
    ? applyPveExtraHit({
        state: params.state,
        attacker: enemyMon,
        defender: playerMon,
        defenderSide: 'player',
        baseDamage: enemyBoost.damage,
        firstDamage: enemyDamageResult.firstHitDamage,
        attackStance: enemyStance,
        attackType: enemyAttackType,
        typeEffectiveness: enemyTypeEffectiveness,
        typeImmunityBypassAttackTypes: enemyTypeImmunityBypassAttackTypes,
        criticalHit: enemyCriticalHit,
      })
    : { damage: 0, messages: [] }
  const playerTotalDamage = playerDamageResult.damage + playerExtraHit.damage
  const enemyTotalDamage = enemyDamageResult.damage + enemyExtraHit.damage
  const enemyLowHpSwitch = params.state
    ? processBattleAbilityLowHpSelfSwitch({
        state: params.state,
        side: 'enemy',
        pokemon: enemyMon,
        previousHp: playerDamageResult.previousHp,
        damage: playerTotalDamage,
      })
    : { switched: false, messages: [] }
  const playerLowHpSwitch = params.state
    ? processBattleAbilityLowHpSelfSwitch({
        state: params.state,
        side: 'player',
        pokemon: playerMon,
        previousHp: enemyDamageResult.previousHp,
        damage: enemyTotalDamage,
      })
    : { switched: false, messages: [] }
  const enemyHpForm = getBattleAbilityHpThresholdFormChange(enemyMon)
  const playerHpForm = getBattleAbilityHpThresholdFormChange(playerMon)
  const enemyHpFormChanged = applyBattleFormChange(enemyMon, enemyHpForm.formId)
  const playerHpFormChanged = applyBattleFormChange(playerMon, playerHpForm.formId)
  const playerKoForm =
    enemyMon.currentHp <= 0 && playerTotalDamage > 0
      ? getBattleAbilityAfterKoFormChange(playerMon)
      : { messages: [] }
  const playerKoStatStages =
    enemyMon.currentHp <= 0 && playerTotalDamage > 0
      ? applyBattleAbilityAfterKoStatStages(playerMon)
      : []
  const enemyKoForm =
    playerMon.currentHp <= 0 && enemyTotalDamage > 0
      ? getBattleAbilityAfterKoFormChange(enemyMon)
      : { messages: [] }
  const enemyKoStatStages =
    playerMon.currentHp <= 0 && enemyTotalDamage > 0
      ? applyBattleAbilityAfterKoStatStages(enemyMon)
      : []
  const playerKoFormChanged = applyBattleFormChange(playerMon, playerKoForm.formId)
  const enemyKoFormChanged = applyBattleFormChange(enemyMon, enemyKoForm.formId)
  recordBattleDamage({
    state: params.state,
    sourceSide: 'player',
    targetSide: 'enemy',
    sourcePokemon: playerMon,
    targetPokemon: enemyMon,
    damage: playerTotalDamage,
    attackType: playerAttackType,
  })
  recordBattleDamage({
    state: params.state,
    sourceSide: 'enemy',
    targetSide: 'player',
    sourcePokemon: enemyMon,
    targetPokemon: playerMon,
    damage: enemyTotalDamage,
    attackType: enemyAttackType,
  })
  const enemyChargeResult = applyHeldItemChargeOnHit({
    state: params.state,
    pokemon: enemyMon,
    attackType: playerAttackType,
    damage: playerTotalDamage,
  })
  const playerChargeResult = enemyCanMove
    ? applyHeldItemChargeOnHit({
        state: params.state,
        pokemon: playerMon,
        attackType: enemyAttackType,
        damage: enemyTotalDamage,
      })
    : { applied: false, message: '' }
  const playerFaintBondMessages = processSecondaryStatusFaintEffects({
    state: params.state,
    faintedPokemon: enemyMon,
    faintedSide: 'enemy',
    attackerPokemon: playerMon,
    attackerSide: 'player',
    damage: playerTotalDamage,
  })
  const enemyFaintBondMessages = processSecondaryStatusFaintEffects({
    state: params.state,
    faintedPokemon: playerMon,
    faintedSide: 'player',
    attackerPokemon: enemyMon,
    attackerSide: 'enemy',
    damage: enemyTotalDamage,
  })
  const playerHeldStatusResult =
    enemyMon.currentHp > 0
      ? attemptHeldAttackStatus(playerMon, enemyMon, playerAttackType)
      : { applied: false, message: '' }
  const enemyHeldStatusResult =
    enemyCanMove && playerMon.currentHp > 0
      ? attemptHeldAttackStatus(enemyMon, playerMon, enemyAttackType)
      : { applied: false, message: '' }
  const playerBreakResult = applyHeldAttackBreak(playerMon, playerAttackType)
  const enemyBreakResult = enemyCanMove
    ? applyHeldAttackBreak(enemyMon, enemyAttackType)
    : { applied: false, message: '' }

  return {
    playerDamage: playerTotalDamage,
    enemyDamage: enemyTotalDamage,
    messages: [
      ...enemyReduction.messages,
      ...playerReduction.messages,
      playerBoost.message,
      enemyBoost.message,
      ...(enemyHpFormChanged ? enemyHpForm.messages : []),
      ...(playerHpFormChanged ? playerHpForm.messages : []),
      ...playerDamageResult.messages,
      ...enemyDamageResult.messages,
      ...playerExtraHit.messages,
      ...enemyExtraHit.messages,
      ...enemyLowHpSwitch.messages,
      ...playerLowHpSwitch.messages,
      ...(playerKoFormChanged ? playerKoForm.messages : []),
      ...(enemyKoFormChanged ? enemyKoForm.messages : []),
      ...playerKoStatStages,
      ...enemyKoStatStages,
      enemyChargeResult.message,
      playerChargeResult.message,
      ...playerFaintBondMessages,
      ...enemyFaintBondMessages,
      playerHeldStatusResult.message,
      enemyHeldStatusResult.message,
      playerBreakResult.message,
      enemyBreakResult.message,
    ].filter((message): message is string => Boolean(message)),
  }
}

export function resolvePveEnemyOnlyAttack(params: {
  state?: BattleState
  playerMon: BattlePokemon
  enemyMon: BattlePokemon
  enemyStance: BattleStance
  enemyCanMove: boolean
  enemyDamageMultiplier?: number
  enemyAttackType?: string
  enemyMoveId?: string
  enemyBasePower?: number
  enemyTypeEffectivenessOverride?: number
  enemyCritChance?: number
  enemyIgnoreDefenderStatStages?: boolean
	  weather?: WeatherType
	  currentTurn?: number
	}): PveEnemyOnlyAttack {
  const {
    playerMon,
    enemyMon,
    enemyStance,
    enemyCanMove,
    enemyDamageMultiplier = 1.0,
    enemyAttackType,
    enemyMoveId,
    enemyBasePower,
    enemyTypeEffectivenessOverride,
    enemyCritChance,
    enemyIgnoreDefenderStatStages,
	  weather,
	  currentTurn,
	} = params

  const beforeAttack = getBattleAbilityBeforeAttackFormChange({
    pokemon: enemyMon,
    damage: enemyCanMove ? enemyDamageMultiplier * (enemyBasePower ?? BASE_BATTLE_POWER) : 0,
  })
  const beforeFormChanged = applyBattleFormChange(enemyMon, beforeAttack.formId)
  const beforeTypeMessages = applyBattleAbilityBeforeAttackTypeChange({
    pokemon: enemyMon,
    attackType: enemyAttackType,
    damage: enemyCanMove
      ? enemyDamageMultiplier * (enemyBasePower ?? BASE_BATTLE_POWER)
      : 0,
  })
  const enemyDamageResult = calculateDamage(
    enemyMon,
    playerMon,
    enemyStance,
    enemyDamageMultiplier,
    enemyAttackType,
    enemyBasePower,
    enemyTypeEffectivenessOverride,
    enemyCritChance,
    weather,
    getSecondaryStatusTypeImmunityBypassAttackTypes({
      state: params.state,
      defender: playerMon,
      defenderSide: 'player',
    }),
	    {
	      ignoreDefenderStatStages: enemyIgnoreDefenderStatStages,
	      moveId: enemyMoveId,
	      currentTurn,
	      terrain: params.state?.terrain?.terrain,
	    },
	  )
  let enemyDamage = enemyCanMove ? enemyDamageResult.damage : 0
  let shieldMessage = [
    beforeFormChanged ? beforeAttack.messages.join(' ') : '',
    ...beforeTypeMessages,
  ]
    .filter(Boolean)
    .join(' ')

  if (enemyCanMove) {
    const shieldResult = handleShieldInteraction(
      playerMon,
      enemyDamageResult.isSuperEffective,
      enemyDamageMultiplier > 1,
    )
    if (shieldResult.damageMultiplier === 0) enemyDamage = 0
    if (shieldResult.message) {
      shieldMessage = [shieldMessage, shieldResult.message].filter(Boolean).join(' ')
    }
  }

  return { enemyDamage, shieldMessage, enemyDamageResult }
}

export function applyPveEnemyDamage(params: {
  state?: BattleState
  playerMon: BattlePokemon
  enemyDamage: number
  enemyHitCount?: number
  enemyMon?: BattlePokemon
  enemyStance?: BattleStance
  enemyAttackType?: string
  enemyTypeEffectiveness?: number
  enemyTypeImmunityBypassAttackTypes?: string[] | true
  enemyCriticalHit?: boolean
  enemyCanMove?: boolean
  random?: () => number
}): { enemyDamage: number; messages: string[] } {
  const {
    playerMon,
    enemyDamage,
    enemyHitCount = 1,
    enemyMon,
    enemyStance,
    enemyAttackType,
    enemyTypeEffectiveness,
    enemyTypeImmunityBypassAttackTypes,
    enemyCriticalHit = false,
    enemyCanMove = true,
    random,
  } = params
  const reduction = enemyMon
    ? applySecondaryStatusDamageModifiers({
        state: params.state,
        attacker: enemyMon,
        defender: playerMon,
        attackerSide: 'enemy',
        defenderSide: 'player',
        damage: enemyDamage,
        attackStance: enemyStance,
        attackType: enemyAttackType,
      })
    : { damage: enemyDamage, messages: [] }
  const boost = enemyMon
    ? applyNextDamageModifier(enemyMon, reduction.damage)
    : { damage: reduction.damage, message: undefined }
  const enemyDamageResult = applyRepeatedHitDamage({
    state: params.state,
    attacker: enemyMon,
    defender: playerMon,
    defenderSide: 'player',
    baseDamage: boost.damage,
    hitCount: enemyCanMove ? enemyHitCount : 1,
    attackStance: enemyStance,
    attackType: enemyAttackType,
    typeEffectiveness: enemyTypeEffectiveness,
    typeImmunityBypassAttackTypes: enemyTypeImmunityBypassAttackTypes,
    criticalHit: enemyCriticalHit,
    random,
    hitCountMessage: enemyCanMove,
  })
  const extraHit = enemyCanMove
    ? applyPveExtraHit({
        state: params.state,
        attacker: enemyMon,
        defender: playerMon,
        defenderSide: 'player',
        baseDamage: boost.damage,
        firstDamage: enemyDamageResult.firstHitDamage,
        attackStance: enemyStance,
        attackType: enemyAttackType,
        typeEffectiveness: enemyTypeEffectiveness,
        typeImmunityBypassAttackTypes: enemyTypeImmunityBypassAttackTypes,
        criticalHit: enemyCriticalHit,
        random,
      })
    : { damage: 0, messages: [] }
  const totalDamage = enemyDamageResult.damage + extraHit.damage
  const playerLowHpSwitch = params.state
    ? processBattleAbilityLowHpSelfSwitch({
        state: params.state,
        side: 'player',
        pokemon: playerMon,
        previousHp: enemyDamageResult.previousHp,
        damage: totalDamage,
      })
    : { switched: false, messages: [] }
  const hpForm = getBattleAbilityHpThresholdFormChange(playerMon)
  const hpFormChanged = applyBattleFormChange(playerMon, hpForm.formId)
  const koForm =
    playerMon.currentHp <= 0 && totalDamage > 0 && enemyMon
      ? getBattleAbilityAfterKoFormChange(enemyMon)
      : { messages: [] }
  const koStatStages =
    playerMon.currentHp <= 0 && totalDamage > 0 && enemyMon
      ? applyBattleAbilityAfterKoStatStages(enemyMon)
      : []
  const koFormChanged = enemyMon
    ? applyBattleFormChange(enemyMon, koForm.formId)
    : false
  recordBattleDamage({
    state: params.state,
    sourceSide: 'enemy',
    targetSide: 'player',
    sourcePokemon: enemyMon,
    targetPokemon: playerMon,
    damage: totalDamage,
    attackType: enemyAttackType,
  })
  const chargeResult =
    enemyCanMove && enemyMon
      ? applyHeldItemChargeOnHit({
          state: params.state,
          pokemon: playerMon,
          attackType: enemyAttackType,
          damage: totalDamage,
        })
      : { applied: false, message: '' }
  const faintBondMessages = processSecondaryStatusFaintEffects({
    state: params.state,
    faintedPokemon: playerMon,
    faintedSide: 'player',
    attackerPokemon: enemyMon,
    attackerSide: 'enemy',
    damage: totalDamage,
  })
  const heldStatusResult =
    enemyCanMove && enemyMon && playerMon.currentHp > 0
      ? attemptHeldAttackStatus(enemyMon, playerMon, enemyAttackType, random)
      : { applied: false, message: '' }
  const breakResult =
    enemyCanMove && enemyMon
      ? applyHeldAttackBreak(enemyMon, enemyAttackType, random)
      : { applied: false, message: '' }
  return {
    enemyDamage: totalDamage,
    messages: [
      ...reduction.messages,
      boost.message,
      ...(hpFormChanged ? hpForm.messages : []),
      ...enemyDamageResult.messages,
      ...extraHit.messages,
      ...playerLowHpSwitch.messages,
      ...(koFormChanged ? koForm.messages : []),
      ...koStatStages,
      chargeResult.message,
      ...faintBondMessages,
      heldStatusResult.message,
      breakResult.message,
    ].filter((message): message is string => Boolean(message)),
  }
}

export function cleanupPveAttackState(params: {
  playerMon: BattlePokemon
  enemyMon: BattlePokemon
  isZMove: boolean
  isEnemyZMove?: boolean
  enemyUsedAttack?: boolean
  clearZMove: () => void
  clearEnemyZMove?: () => void
  clearRevealedEnemyStance: () => void
}): void {
  const {
    playerMon,
    enemyMon,
    isZMove,
    isEnemyZMove = false,
    enemyUsedAttack = true,
    clearZMove,
    clearEnemyZMove,
    clearRevealedEnemyStance,
  } = params
  if (playerMon.status?.id === 'victory') playerMon.status = undefined
  if (enemyMon.status?.id === 'victory') enemyMon.status = undefined
  if (isZMove) clearZMove()
  if (isEnemyZMove) clearEnemyZMove?.()
  clearRevealedEnemyStance()
}

export function applyPveDimensionalCharge(
  powers: PowersState | undefined,
  result: BattleTurnResult,
): void {
  if (!powers?.dimensionalShift) return
  applyDimensionalChargeForResult(powers, result)
}
