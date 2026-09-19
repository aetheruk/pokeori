import { getPayload } from 'payload'
import { settlePvpOutcome } from './outcome'
import configPromise from '@payload-config'
import { getMove } from '@/data/moves'
import { resolveDoublesTurn, type DoublesAction } from '@/utilities/battle/doubles'
import { applyDoublesPowerAction } from '../actions/doubles-special'
import { recordPokemonKOForPokemon } from '../helpers/pokemon-ko-credit'
import { useDimensionalShift as applyDimensionalShift } from '../powers/dimensional'
import type {
  BattleState,
  BattlePokemon,
  BattleStance,
  BattlePresentationEvent,
  PowersState,
} from '@/utilities/battle/types'
import { trimBattleHistory } from '@/utilities/battle/history'
import { awardStanceWin, getStanceWinCharges, POWER_STANCE_WIN_COST, spendPowerCharge } from '@/utilities/battle/power-charges'
import { ensurePvpPowerStates, getSharedBattleUserIds, normalizeBattleUserId } from './state-utils'
import {
  advancePvpPowerStateForTurn,
  applyDimensionalChargeForResult,
  consumeQueuedMovePowerUses,
  invertBattleResult,
  preparePvpCombatAction,
  resolvePvpCombat,
  resolvePvpFaint,
  resolvePvpSwap,
  type BattleTurnResult,
  type PvpCombatResolution,
} from '@/utilities/battle/engine/pvp-turn'
import {
  processEndTurnStatusDamage,
  processEndTurnWeatherDamageForState,
} from '@/utilities/battle/turn-logic'
import { processSecondaryStatusesForTurnEnd } from '@/utilities/battle/secondary-statuses'
import {
  applyHeldItemIfTriggered,
  restoreConsumedBerryByAbility,
} from '@/utilities/battle/held-items'
import {
  applyBattleAbilityOpposingMoveUseDepletion,
  processBattleAbilityTeraActivation,
  processBattleAbilityTurnEndEffects,
} from '@/utilities/battle/abilities'
import { applyBattleFormChange } from '@/utilities/battle/stats-calc'
import {
  persistConsumedHeldItems,
} from '../helpers/held-items'
import {
  recordPokemonKO,
} from '../helpers/pokemon-ko-credit'
import {
  getUserSketchedMoveIds,
} from '@/utilities/user-state'
import { getEffectiveBattleSpeed } from '@/utilities/battle/battle-logic'
import {
} from '@/utilities/battle/z-move'
import {
  processDelayedMoveDamage,
  getMoveHealAmount,
  recordSuccessfulBasicAttackUse,
  recordSuccessfulMoveUse,
  resolvePendingMoveSwitches,
} from '@/utilities/battle/move-effects'
import { decrementFaintedPokemonFriendship } from '@/utilities/battle/friendship'
import { processBattleRarityTurnEnd } from '@/utilities/battle/rarity-effects'
import {
  beginBattlePresentation,
  finalizeBattlePresentation,
} from '@/utilities/battle/presentation'
import {
  settleDoublesSketchAttempts,
  type DoublesSketchAttempt,
} from '../helpers/doubles-sketch'
import { processTerrainTurnEffects } from '@/utilities/battle/terrain-effects'
import {
  attemptSmeargleSketch,
  getAvailableSketchMoveIds,
  getSketchableOpponentMoveIds,
  SKETCH_MOVE_ID,
} from '@/utilities/pokemon/sketch'

export interface PvpMove {
  actions?: DoublesAction[]
  stance: BattleStance
  attackType?: string
  specialMoveId?: string
  calledByMetronome?: boolean
  skipAction?: boolean
  spectatorMessage?: string
  powers?: {
    mega?: boolean
    megaFormId?: string
    dynamax?: boolean
    dynamaxFormId?: string
    tera?: boolean
    zMoveCharge?: boolean
    zMove?: boolean
  }
}


export async function resolvePvpTurn(
  state: BattleState,
  p1Move: PvpMove,
  p2Move: PvpMove,
  options: {
    persist?: boolean
    random?: () => number
  } = {},
): Promise<BattleState> {
  if (state.format === 'double') {
    if (!p1Move.actions || !p2Move.actions) throw new Error('Both trainers must submit doubles actions')
    ensurePvpPowerStates(state)
    const { p1Id, p2Id } = getSharedBattleUserIds(state)
    const sketchAttempts: DoublesSketchAttempt[] = []
    resolveDoublesTurn(state, p1Move.actions, p2Move.actions, options.random ?? Math.random,
      ({state:next,side,slot,actor,action,emitEvent,random}) => {
        if (action.kind === 'item') throw new Error('Trainer items are not available in PvP.')
        return applyDoublesPowerAction(next,side,actor,action,{slot,emitEvent,random})
      },
      (attempt) => {
        const userId = attempt.side === 'player' ? p1Id : p2Id
        if (!userId) return
        sketchAttempts.push({
          attacker: attempt.actor,
          opponent: attempt.opponent,
          succeeded: attempt.succeeded,
          userId,
        })
      },
    )
    if (sketchAttempts.length > 0) {
      const payload =
        options.persist === false
          ? undefined
          : await getPayload({ config: configPromise })
      const sketchMessages = await settleDoublesSketchAttempts(
        state,
        sketchAttempts,
        payload,
        options.random ?? Math.random,
      )
      if (sketchMessages.length > 0 && state.history[0]) {
        state.history[0].message += `\n${sketchMessages.join('\n')}`
      }
    }
    for(const event of state.presentation?.events??[]) if(event.type==='faint') recordPokemonKOForPokemon(state,event.side,(event.side==='player'?state.playerTeam:state.enemyTeam)[event.pokemonIndex])
    if(options.persist!==false) {
      const faintEvents=(state.presentation?.events??[]).filter((event):event is Extract<BattlePresentationEvent,{type:'faint'}>=>event.type==='faint')
      if(faintEvents.length) {
        const payload=await getPayload({config:configPromise})
        const {p1Id,p2Id}=getSharedBattleUserIds(state)
        await Promise.all(faintEvents.map(event=>decrementFaintedPokemonFriendship({payload,pokemon:(event.side==='player'?state.playerTeam:state.enemyTeam)[event.pokemonIndex],userId:(event.side==='player'?p1Id:p2Id)??undefined,eventId:`${state.economyActionId||state.pvpBattleId||state.battleId}:${state.turn-1}:${event.side}:${event.pokemonIndex}:doubles-faint` })))
      }
    }
    return options.persist === false ? state : settlePvpOutcome(state)
  }
  if (p1Move.attackType === 'power:z-move' || p2Move.attackType === 'power:z-move' || p1Move.powers?.zMoveCharge || p2Move.powers?.zMoveCharge) {
    throw new Error('Arm Z-Move before submitting a turn.')
  }
  beginBattlePresentation(state)
  const shouldPersist = options.persist !== false
  const random = options.random ?? Math.random
  // Helper to apply powers
  const applyPowers = async (
    mon: BattlePokemon,
    pendingPowers: PvpMove['powers'],
    powerState: PowersState,
  ): Promise<string[]> => {
    const messages: string[] = []
    if (!pendingPowers) return messages
    const scopedState = { ...state, powers: powerState }

    // Mega Evolution
    if (
      pendingPowers.mega &&
      !mon.isMega &&
      pendingPowers.megaFormId &&
      powerState.megaUsesRemaining > 0 &&
      getStanceWinCharges(powerState) >= POWER_STANCE_WIN_COST &&
      !powerState.megaEvolved
    ) {
      const { activateMegaEvolution } = await import('../powers/mega')
      if (activateMegaEvolution(mon, pendingPowers.megaFormId, scopedState)) {
        spendPowerCharge(powerState)
        powerState.megaUsesRemaining -= 1
        powerState.megaEvolved = true
      }
    }

    // Dynamax
    if (
      pendingPowers.dynamax &&
      !mon.isDynamaxed &&
      getStanceWinCharges(powerState) >= POWER_STANCE_WIN_COST &&
      powerState.dynamaxUsesRemaining > 0 &&
      !powerState.dynamaxActive
    ) {
      const { activateDynamax } = await import('../powers/dynamax')
      if (activateDynamax(mon, pendingPowers.dynamaxFormId, scopedState)) {
        spendPowerCharge(powerState)
        powerState.dynamaxUsesRemaining -= 1
        powerState.dynamaxActive = true
      }
    }

    // Tera
    if (
      pendingPowers.tera &&
      getStanceWinCharges(powerState) >= POWER_STANCE_WIN_COST &&
      powerState.teraUsesRemaining > 0 &&
      !mon.teraUsed
    ) {
      const { activateTera } = await import('../powers/tera')
      if (activateTera(mon, state.turn)) {
        spendPowerCharge(powerState)
        powerState.teraUsesRemaining -= 1
        const teraAbility = processBattleAbilityTeraActivation({
          state,
          pokemon: mon,
        })
        applyBattleFormChange(mon, teraAbility.formId)
        messages.push(...teraAbility.messages)
      }
    }

    return messages
  }

  // --- Dimensional Shift Logic Part 1: Activation ---
  const p1Id = normalizeBattleUserId((state.playerTeam[0] as any)?.user)
  const p2Id = normalizeBattleUserId((state.enemyTeam[0] as any)?.user)

  if (!p1Id || !p2Id) {
    console.error('PVP resolution aborted: missing player IDs')
    return state
  }

  const pvpPowers = ensurePvpPowerStates(state)
  const p1Powers = pvpPowers[p1Id]
  const p2Powers = pvpPowers[p2Id]
  state.powers = p1Powers

  let p1Skipped = false
  let p2Skipped = false

  const handleDimensionalShiftUsage = async (
    move: PvpMove,
    userId: string,
    isP1: boolean,
  ) => {
    if (move.attackType?.startsWith('power:dimensional-shift:')) {
      const type = move.attackType.split(':')[2] as 'time' | 'space' | 'chaos'
      const powerState = isP1 ? p1Powers : p2Powers
      const res = await applyDimensionalShift(
        { ...state, powers: powerState },
        userId,
        type,
      )
      if (res.success) {
        spendPowerCharge(powerState)
        state.powers = p1Powers
        if (type === 'time') {
          if (isP1) p2Skipped = true
          else p1Skipped = true
        }
        return true
      }
    }
    return false
  }

  let p1UsedPower = await handleDimensionalShiftUsage(p1Move, p1Id, true)
  let p2UsedPower = await handleDimensionalShiftUsage(p2Move, p2Id, false)
  p1UsedPower = p1UsedPower || p1Move.skipAction === true
  p2UsedPower = p2UsedPower || p2Move.skipAction === true

  const p1Swap = resolvePvpSwap({
    state,
    team: state.playerTeam,
    move: p1Move,
    side: 'player',
    playerPowers: p1Powers,
    enemyPowers: p2Powers,
  })
  const p2Swap = resolvePvpSwap({
    state,
    team: state.enemyTeam,
    move: p2Move,
    side: 'enemy',
    playerPowers: p1Powers,
    enemyPowers: p2Powers,
  })

  // Re-fetch Active Mons (in case they changed)
  const p1Mon = state.playerTeam[state.activePlayerIndex]
  const p2Mon = state.enemyTeam[state.activeEnemyIndex]
  if (p1Mon.currentHp <= 0 || p2Mon.currentHp <= 0) {
    // A pre-action effect (for example a Shadow scream in a spectator battle)
    // can knock out its user before combat. Let faint resolution handle it
    // without either side attacking an already-fainted Pokemon.
    p1UsedPower = true
    p2UsedPower = true
  }

  // --- APPLY POWERS (Mega/Gmax) ---
  const p1PowerMessages = await applyPowers(p1Mon, p1Move.powers, p1Powers)
  const p2PowerMessages = await applyPowers(p2Mon, p2Move.powers, p2Powers)
  const queuedSimplePower = (move:PvpMove, side:'player'|'enemy', mon:BattlePokemon) => {
    const powerId = move.attackType?.slice('power:'.length)
    if (powerId !== 'weather' && powerId !== 'shout' && powerId !== 'circadian') return null
    const effects: BattlePresentationEvent[] = []
    const message = applyDoublesPowerAction(state,side,mon,{slot:0,kind:'power',powerId},{slot:0,emitEvent:(event)=>effects.push(event),random})
    return {message,effects}
  }
  const p1SimplePower = queuedSimplePower(p1Move,'player',p1Mon)
  const p2SimplePower = queuedSimplePower(p2Move,'enemy',p2Mon)
  if (p1SimplePower) { p1UsedPower = true; p1PowerMessages.push(p1SimplePower.message) }
  if (p2SimplePower) { p2UsedPower = true; p2PowerMessages.push(p2SimplePower.message) }

  let logMessage = ``
  if (p1Move.spectatorMessage) logMessage += `${p1Move.spectatorMessage}\n`
  if (p2Move.spectatorMessage) logMessage += `${p2Move.spectatorMessage}\n`
  if (p1PowerMessages.length) logMessage += `${p1PowerMessages.join('\n')}\n`
  if (p2PowerMessages.length) logMessage += `${p2PowerMessages.join('\n')}\n`
  if (state.history[0]?.message.includes('Dimensional Shift')) {
    // Already logged
  }

  consumeQueuedMovePowerUses(p1Move, p1Powers, p1Mon)
  consumeQueuedMovePowerUses(p2Move, p2Powers, p2Mon)
  if (p1Move.specialMoveId) {
    const pressureMessages = applyBattleAbilityOpposingMoveUseDepletion({
      state,
      attackerSide: 'player',
      attacker: p1Mon,
      defender: p2Mon,
      move: getMove(p1Move.specialMoveId),
    })
    if (pressureMessages.length)
      logMessage += `\n${pressureMessages.join('\n')}`
  }
  if (p2Move.specialMoveId) {
    const pressureMessages = applyBattleAbilityOpposingMoveUseDepletion({
      state,
      attackerSide: 'enemy',
      attacker: p2Mon,
      defender: p1Mon,
      move: getMove(p2Move.specialMoveId),
    })
    if (pressureMessages.length)
      logMessage += `\n${pressureMessages.join('\n')}`
  }

  if (p1Swap.swapped) {
    logMessage += `${state.playerName} sent out ${p1Swap.name}! `
    if (p1Swap.messages.length) logMessage += `\n${p1Swap.messages.join('\n')}`
  }
  if (p2Swap.swapped) {
    logMessage += `${state.enemyName} sent out ${p2Swap.name}! `
    if (p2Swap.messages.length) logMessage += `\n${p2Swap.messages.join('\n')}`
  }

  const addCombatLog = (message: string) => {
    if (message) logMessage += `\n${message}`
  }

  // --- RESOLVE ATTACKS ---
  let p1Resolution: PvpCombatResolution = {
    didAttack: false,
    dmg: 0,
    result: 'tie',
    message: '',
  }
  let p2Resolution: PvpCombatResolution = {
    didAttack: false,
    dmg: 0,
    result: 'tie',
    message: '',
  }
  if (p1SimplePower) {
    const hit = p1SimplePower.effects.find((event):event is Extract<BattlePresentationEvent,{type:'attack'}> => event.type === 'attack')
    if (hit) { p1Resolution.dmg = hit.damage; p1Resolution.usedType = hit.attackType }
  }
  if (p2SimplePower) {
    const hit = p2SimplePower.effects.find((event):event is Extract<BattlePresentationEvent,{type:'attack'}> => event.type === 'attack')
    if (hit) { p2Resolution.dmg = hit.damage; p2Resolution.usedType = hit.attackType }
  }
  const p1Committed = !p1Swap.swapped && !p1UsedPower && !p1Skipped
  const p2Committed = !p2Swap.swapped && !p2UsedPower && !p2Skipped
  // Eligibility is resolved for both sides before primary HP changes. This
  // prevents software ordering (including an interim 0 HP) from changing
  // whether the second committed action occurs.
  const p1Eligibility = p1Committed
    ? preparePvpCombatAction({
        state,
        attacker: p1Mon,
        attackerSide: 'player',
        move: p1Move,
        currentTurn: state.turn,
        random,
      })
    : undefined
  const p2Eligibility = p2Committed
    ? preparePvpCombatAction({
        state,
        attacker: p2Mon,
        attackerSide: 'enemy',
        move: p2Move,
        currentTurn: state.turn,
        random,
      })
    : undefined

  const applyPrimaryHealingCredit = (
    pokemon: BattlePokemon,
    target: BattlePokemon,
    move: PvpMove,
    eligible: boolean,
  ): number => {
    const authoredMove = move.specialMoveId
      ? getMove(move.specialMoveId)
      : undefined
    if (!eligible || !authoredMove?.heal) return 0
    const amount = getMoveHealAmount({
      move: authoredMove,
      pokemon,
      target,
      weather: state.weather?.weather,
    })
    // Deliberately allow a temporary over-max pool. The authoritative commit
    // clamps after both attacks, so 90 + 40 healing - 50 damage settles at 80.
    pokemon.currentHp += amount
    return amount
  }
  const p1PrimaryHealing = applyPrimaryHealingCredit(
    p1Mon,
    p2Mon,
    p1Move,
    p1Eligibility?.canMove === true,
  )
  const p2PrimaryHealing = applyPrimaryHealingCredit(
    p2Mon,
    p1Mon,
    p2Move,
    p2Eligibility?.canMove === true,
  )

  const resolveP1 = () => {
    p1Resolution = resolvePvpCombat({
      state,
      attacker: p1Mon,
      defender: p2Mon,
      move: p1Move,
      attackerName: state.playerName,
      attackerSide: 'player',
      playerMove: p1Move,
      enemyMove: p2Move,
      currentTurn: state.turn,
      random,
      weather: state.weather?.weather,
      eligibility: p1Eligibility,
      primaryHealingApplied: p1PrimaryHealing,
    })
    addCombatLog(p1Resolution.message)
  }
  const resolveP2 = () => {
    p2Resolution = resolvePvpCombat({
      state,
      attacker: p2Mon,
      defender: p1Mon,
      move: p2Move,
      attackerName: state.enemyName,
      attackerSide: 'enemy',
      playerMove: p1Move,
      enemyMove: p2Move,
      currentTurn: state.turn,
      random,
      weather: state.weather?.weather,
      eligibility: p2Eligibility,
      primaryHealingApplied: p2PrimaryHealing,
    })
    addCombatLog(p2Resolution.message)
  }

  if (
    p1Committed &&
    (!p2Committed ||
      getEffectiveBattleSpeed(p1Mon, state.turn) >=
        getEffectiveBattleSpeed(p2Mon, state.turn))
  ) {
    resolveP1()
    if (p2Committed && !p1Resolution.preventsOpponentDamage) resolveP2()
  } else if (p2Committed) {
    resolveP2()
    if (p1Committed && !p2Resolution.preventsOpponentDamage) resolveP1()
  }

  if (p1PrimaryHealing > 0 && !p1Resolution.didAttack) {
    p1Mon.currentHp -= p1PrimaryHealing
  }
  if (p2PrimaryHealing > 0 && !p2Resolution.didAttack) {
    p2Mon.currentHp -= p2PrimaryHealing
  }
  p1Mon.currentHp = Math.min(p1Mon.maxHp, Math.max(0, p1Mon.currentHp))
  p2Mon.currentHp = Math.min(p2Mon.maxHp, Math.max(0, p2Mon.currentHp))

  let turnResult: BattleTurnResult = 'tie'
  if (p1Resolution.didAttack) {
    turnResult = p1Resolution.result
  } else if (p2Resolution.didAttack) {
    turnResult = invertBattleResult(p2Resolution.result)
  }

  if (p1Resolution.didAttack && p1Resolution.usedType) {
    const specialMove = p1Move.specialMoveId
      ? getMove(p1Move.specialMoveId)
      : undefined
    if (specialMove) {
      recordSuccessfulMoveUse({
        state,
        side: 'player',
        pokemon: p1Mon,
        move: specialMove,
        attackType: p1Resolution.usedType,
      })
    } else {
      recordSuccessfulBasicAttackUse({
        state,
        side: 'player',
        pokemon: p1Mon,
        attackType: p1Resolution.usedType,
      })
    }
  }

  if (p2Resolution.didAttack && p2Resolution.usedType) {
    const specialMove = p2Move.specialMoveId
      ? getMove(p2Move.specialMoveId)
      : undefined
    if (specialMove) {
      recordSuccessfulMoveUse({
        state,
        side: 'enemy',
        pokemon: p2Mon,
        move: specialMove,
        attackType: p2Resolution.usedType,
      })
    } else {
      recordSuccessfulBasicAttackUse({
        state,
        side: 'enemy',
        pokemon: p2Mon,
        attackType: p2Resolution.usedType,
      })
    }
  }

  const sketchFailures = [
    {
      attacker: p1Mon,
      moveId: p1Move.specialMoveId,
      didAttack: p1Resolution.didAttack,
    },
    {
      attacker: p2Mon,
      moveId: p2Move.specialMoveId,
      didAttack: p2Resolution.didAttack,
    },
  ].filter(
    (attempt) => attempt.moveId === SKETCH_MOVE_ID && !attempt.didAttack,
  )
  for (const attempt of sketchFailures) {
    logMessage += `\n${attempt.attacker.name}'s Sketch failed.`
  }

  const sketchAttempts = [
    {
      attacker: p1Mon,
      opponent: p2Mon,
      userId: p1Id,
      moveId: p1Move.specialMoveId,
      didAttack: p1Resolution.didAttack && !!p1Resolution.usedType,
    },
    {
      attacker: p2Mon,
      opponent: p1Mon,
      userId: p2Id,
      moveId: p2Move.specialMoveId,
      didAttack: p2Resolution.didAttack && !!p2Resolution.usedType,
    },
  ].filter(
    (attempt) => attempt.didAttack && attempt.moveId === SKETCH_MOVE_ID,
  )

  if (sketchAttempts.length > 0) {
    const payload = shouldPersist
      ? await getPayload({ config: configPromise })
      : undefined
    const existingByUser = new Map<string, string[]>()

    for (const attempt of sketchAttempts) {
      const existing = existingByUser.get(attempt.userId) ??
        (payload
          ? await getUserSketchedMoveIds(payload as any, attempt.userId)
          : [])
      const pendingForUser = (state.pendingSketchedMoves || [])
        .filter((entry) => entry.userId === attempt.userId)
        .map((entry) => entry.id)
      const knownMoveIds = new Set([...existing, ...pendingForUser])
      existingByUser.set(attempt.userId, [...existing, ...pendingForUser])
      const sketchableOpponentMoveIds = getSketchableOpponentMoveIds(
        attempt.opponent,
      )
      if (sketchableOpponentMoveIds.length === 0) {
        logMessage += `\n${attempt.opponent.name} has no move that can be sketched.`
        continue
      }

      const availableSketchMoveIds = getAvailableSketchMoveIds(
        attempt.opponent,
        [...knownMoveIds],
      )
      if (availableSketchMoveIds.length === 0) {
        logMessage += `\n${attempt.opponent.name} has no new move that can be sketched.`
        continue
      }

      const sketchedMoveId = attemptSmeargleSketch({
        attacker: attempt.attacker,
        opponent: attempt.opponent,
        alreadySketchedMoveIds: [...knownMoveIds],
        random,
      })

      if (!sketchedMoveId) {
        logMessage += `\n${attempt.attacker.name}'s Sketch failed to capture a move.`
      } else {
        const sketchedMove = getMove(sketchedMoveId)
        const sketchedMoveName = sketchedMove?.name || sketchedMoveId
        state.pendingSketchedMoves = [
          ...(state.pendingSketchedMoves || []),
          {
            id: sketchedMoveId,
            name: sketchedMoveName,
            userId: attempt.userId,
            attackerName: attempt.attacker.name,
          },
        ]
        existing.push(sketchedMoveId)
        logMessage += `\n${attempt.attacker.name} sketched ${sketchedMoveName}!`
      }
    }
  }

  const moveSwitchMessages = resolvePendingMoveSwitches(state)
  if (moveSwitchMessages.length > 0) {
    logMessage += `\n${moveSwitchMessages.join('\n')}`
  }

  const heldItemMessages = [
    applyHeldItemIfTriggered(state.playerTeam[state.activePlayerIndex], 'hp')
      .message,
    applyHeldItemIfTriggered(state.enemyTeam[state.activeEnemyIndex], 'hp')
      .message,
  ].filter(Boolean)
  if (heldItemMessages.length > 0) {
    logMessage += `\n${heldItemMessages.join('\n')}`
  }

  const endTurnStatusMessages = processEndTurnStatusDamage(state, 'damage')
  if (endTurnStatusMessages.length > 0) {
    logMessage += `\n${endTurnStatusMessages.join('\n')}`
  }

  const endTurnWeatherMessages = processEndTurnWeatherDamageForState(state)
  if (endTurnWeatherMessages.length > 0) {
    logMessage += `\n${endTurnWeatherMessages.join('\n')}`
  }

  const secondaryStatusMessages = processSecondaryStatusesForTurnEnd(state)
  if (secondaryStatusMessages.length > 0) {
    logMessage += `\n${secondaryStatusMessages.join('\n')}`
  }

  const delayedDamageMessages = processDelayedMoveDamage(state)
  if (delayedDamageMessages.length > 0) {
    logMessage += `\n${delayedDamageMessages.join('\n')}`
  }

  const endTurnHealingMessages = processEndTurnStatusDamage(state, 'healing')
  if (endTurnHealingMessages.length > 0) {
    logMessage += `\n${endTurnHealingMessages.join('\n')}`
  }

  const terrainHealingMessages = processTerrainTurnEffects(state)
  if (terrainHealingMessages.length > 0) {
    logMessage += `\n${terrainHealingMessages.join('\n')}`
  }

  const berryRestoreMessages = [
    restoreConsumedBerryByAbility(
      state.playerTeam[state.activePlayerIndex],
      state.weather?.weather,
    ).message,
    restoreConsumedBerryByAbility(
      state.enemyTeam[state.activeEnemyIndex],
      state.weather?.weather,
    ).message,
  ].filter(Boolean)
  if (berryRestoreMessages.length > 0) {
    logMessage += `\n${berryRestoreMessages.join('\n')}`
  }

  const abilityTurnEndMessages = processBattleAbilityTurnEndEffects({
    playerMon: state.playerTeam[state.activePlayerIndex],
    enemyMon: state.enemyTeam[state.activeEnemyIndex],
    playerName: state.playerName,
    enemyName: state.enemyName,
  })
  if (abilityTurnEndMessages.length > 0) {
    logMessage += `\n${abilityTurnEndMessages.join('\n')}`
  }

  const rarityTurnEndMessages = [
    ...processBattleRarityTurnEnd(state.playerTeam[state.activePlayerIndex]),
    ...processBattleRarityTurnEnd(state.enemyTeam[state.activeEnemyIndex]),
  ]
  if (rarityTurnEndMessages.length > 0) {
    logMessage += `\n${rarityTurnEndMessages.join('\n')}`
  }

  const p1FaintedMon = state.playerTeam[state.activePlayerIndex]
  const p2FaintedMon = state.enemyTeam[state.activeEnemyIndex]
  const faintedFriendshipUpdates: Promise<void>[] = []
  if (
    shouldPersist &&
    (p1FaintedMon?.currentHp === 0 || p2FaintedMon?.currentHp === 0)
  ) {
    const payload = await getPayload({ config: configPromise })
    if (p1FaintedMon?.currentHp === 0) {
      faintedFriendshipUpdates.push(
        decrementFaintedPokemonFriendship({
          payload,
          pokemon: p1FaintedMon,
          userId: p1Id,
          eventId: `${state.economyActionId || state.pvpBattleId || state.battleId}:${state.turn}:${p1FaintedMon.id}`,
        }),
      )
    }
    if (p2FaintedMon?.currentHp === 0) {
      faintedFriendshipUpdates.push(
        decrementFaintedPokemonFriendship({
          payload,
          pokemon: p2FaintedMon,
          userId: p2Id,
          eventId: `${state.economyActionId || state.pvpBattleId || state.battleId}:${state.turn}:${p2FaintedMon.id}`,
        }),
      )
    }
  }
  await Promise.all(faintedFriendshipUpdates)

  if (p1FaintedMon?.currentHp === 0) recordPokemonKO(state, 'player')
  if (p2FaintedMon?.currentHp === 0) recordPokemonKO(state, 'enemy')

  const p1HasReserve = state.playerTeam.some(
    (pokemon, index) =>
      index !== state.activePlayerIndex && pokemon.currentHp > 0,
  )
  const p2HasReserve = state.enemyTeam.some(
    (pokemon, index) =>
      index !== state.activeEnemyIndex && pokemon.currentHp > 0,
  )
  const simultaneousExhaustion =
    p1FaintedMon?.currentHp === 0 &&
    p2FaintedMon?.currentHp === 0 &&
    !p1HasReserve &&
    !p2HasReserve

  if (simultaneousExhaustion) {
    state.status =
      turnResult === 'win'
        ? 'won'
        : turnResult === 'loss'
          ? 'lost'
          : 'draw'
    logMessage += `\n${p1FaintedMon.name} fainted!`
    logMessage += `\n${p2FaintedMon.name} fainted!`
    logMessage +=
      state.status === 'draw'
        ? `\nBoth teams are out of Pokemon. The battle is a draw!`
        : `\nBoth teams are out of Pokemon. ${
            state.status === 'won' ? state.playerName : state.enemyName
          } wins the stance decision!`
  } else {
    const playerFaintMessages = resolvePvpFaint(
      state,
      state.playerTeam,
      'player',
    )
    if (playerFaintMessages.length > 0)
      logMessage += `\n${playerFaintMessages.join('\n')}`
  }
  if (state.status === 'ongoing') {
    const enemyFaintMessages = resolvePvpFaint(state, state.enemyTeam, 'enemy')
    if (enemyFaintMessages.length > 0)
      logMessage += `\n${enemyFaintMessages.join('\n')}`
  }

  // --- LOG ---
  // We append logMessage if not empty
  if (logMessage.trim()) {
    state.history.unshift({
      turn: state.turn,
      playerExecutedAttack: p1Resolution.didAttack || !!p1SimplePower?.effects.some((event) => event.type === 'attack'),
      enemyExecutedAttack: p2Resolution.didAttack || !!p2SimplePower?.effects.some((event) => event.type === 'attack'),
      playerStance: p1Move.stance,
      enemyStance: p2Move.stance,
      result: turnResult,
      damageDealt: p1Resolution.dmg,
      damageTaken: p2Resolution.dmg,
      playerAttackType: p1Resolution.usedType,
      enemyAttackType: p2Resolution.usedType,
      message: logMessage.trim(),
    })
  }

  // --- CHARGES UPDATE ---
  const p2TurnResult = invertBattleResult(turnResult)
  applyDimensionalChargeForResult(p1Powers, turnResult)
  applyDimensionalChargeForResult(p2Powers, p2TurnResult)
  if (p1Resolution.didAttack && turnResult === 'win') awardStanceWin(p1Powers)
  if (p2Resolution.didAttack && p2TurnResult === 'win') awardStanceWin(p2Powers)

  advancePvpPowerStateForTurn(
    state.playerTeam[state.activePlayerIndex],
    p1Powers,
    state.turn,
  )
  advancePvpPowerStateForTurn(
    state.enemyTeam[state.activeEnemyIndex],
    p2Powers,
    state.turn,
  )
  state.pvpPowers = { ...pvpPowers, [p1Id]: p1Powers, [p2Id]: p2Powers }
  state.powers = p1Powers

  state.history = trimBattleHistory(state.history)
  state.turn += 1
  if (shouldPersist && state.status === 'ongoing') {
    await persistConsumedHeldItems(state)
  }
  finalizeBattlePresentation(state)
  if (shouldPersist && state.status !== 'ongoing') return settlePvpOutcome(state)
  return state
}
