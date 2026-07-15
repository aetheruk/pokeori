/**
 * Circadian Power system.
 * Time-of-day based special moves with unique effects.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BattleState, BattleStance } from '@/utilities/battle/types'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { finalizeTurn } from '../helpers/turn-finalization'
import { validateSelectedPokemonPower } from '@/utilities/pokemon/pokemon-powers'
import { needsPlayerReplacement } from '@/utilities/battle/switching'
import {
  getSkillLevel,
  validateBattlePowerSkillRequirement,
} from '@/utilities/skills/unlocks'
import { applyPokemonResearchEndure } from '@/utilities/battle/research-survival'
import { getUserInventoryMap } from '@/utilities/user-state'
import { runBattleActionWithGuard } from '../helpers/action-guard'

/**
 * Use Circadian Power based on current time of day.
 * Dawn: Veil status
 * Day: Burn enemy
 * Dusk: Poison enemy
 * Night: Heal + Regen
 *
 * @param battleId - ID of the current battle
 */
export async function useCircadian(
  battleId: string,
  clientActionId?: string,
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  message?: string
}> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  return runBattleActionWithGuard(user.id, clientActionId, async () => {
    const state = await getActiveBattleState(user)
    if (!state || state.battleId !== battleId) {
      return { success: false, error: 'Battle not found' }
    }

    if (state.status !== 'ongoing')
      return { success: false, error: 'Battle has ended' }
    if (needsPlayerReplacement(state)) {
      return {
        success: false,
        error: 'Choose your next Pokemon before using Circadian Power',
        state,
      }
    }

    const payload = await getPayload({ config: configPromise })
    const checkKeyItem = await getUserInventoryMap(payload as any, user.id)
    if ((checkKeyItem['circadian-stone'] || 0) <= 0) {
      return { success: false, error: 'You do not have a Circadian Stone' }
    }
    const skillRequirementError = validateBattlePowerSkillRequirement(
      'circadian',
      getSkillLevel(user.skills, 'battling'),
    )
    if (skillRequirementError)
      return { success: false, error: skillRequirementError }

    const turnsPlayed = state.powers?.turnsPlayedThisBattle ?? 0
    if (turnsPlayed < 3) {
      return {
        success: false,
        error: 'Circadian Power requires 3 turns to charge',
      }
    }

    if ((state.powers?.circadianUsesRemaining ?? 0) <= 0) {
      return { success: false, error: 'No Circadian uses remaining' }
    }

    const activeIndex = state.activePlayerIndex
    const playerMon = state.playerTeam[activeIndex]

    if (playerMon?.isShadow) {
      return { success: false, error: 'Shadow Pokemon cannot use Powers!' }
    }

    const selectedPowerError = validateSelectedPokemonPower({
      selectedPokemonPower: playerMon?.selectedPokemonPower,
      requiredPower: 'circadian',
      pokemonName: playerMon?.name,
    })
    if (selectedPowerError) {
      return { success: false, error: selectedPowerError }
    }

    const enemyMon = state.enemyTeam[state.activeEnemyIndex]

    if (!playerMon || playerMon.currentHp <= 0) {
      return { success: false, error: 'Active Pokemon is fainted' }
    }

    // Determine time phase
    const now = new Date()
    const hour = now.getHours()
    let phase: 'dawn' | 'day' | 'dusk' | 'night' = 'night'
    if (hour >= 6 && hour < 12) phase = 'dawn'
    else if (hour >= 12 && hour < 18) phase = 'day'
    else if (hour >= 18 && hour < 24) phase = 'dusk'

    const {
      calculateDamage,
      calculateAiStance,
      applyStatus,
      handleShieldInteraction,
      formatTypeEffectivenessMessage,
    } = await import('@/utilities/battle/battle-logic')

    let playerMoveName = ''
    let playerStance: BattleStance = 'power'
    let playerDamage = 0
    let isAttack = true
    let log = ''

    // Apply phase-specific effects
    if (phase === 'dawn') {
      playerMoveName = "Dawn's Blessing"
      playerStance = 'power'
      log = `${playerMon.name} used ${playerMoveName}!`
      const { applied } = applyStatus(playerMon, 'veil', state.weather?.weather, {
        terrain: state.terrain?.terrain,
      })
      if (applied) log += ` It became veiled!`
    } else if (phase === 'day') {
      playerMoveName = 'Blinding Sun'
      playerStance = 'tech'
      log = `${playerMon.name} unleashed ${playerMoveName}!`
      const { applied } = applyStatus(enemyMon, 'burn', state.weather?.weather, {
        terrain: state.terrain?.terrain,
      })
      if (applied) log += ` ${enemyMon.name} was burned!`
    } else if (phase === 'dusk') {
      playerMoveName = 'Dusk Shadow'
      playerStance = 'speed'
      log = `${playerMon.name} uses ${playerMoveName}!`
      const { applied } = applyStatus(
        enemyMon,
        'poison',
        state.weather?.weather,
        { terrain: state.terrain?.terrain },
      )
      if (applied) log += ` ${enemyMon.name} was poisoned!`
    } else {
      // Night - healing move
      playerMoveName = 'Moonlight Healing'
      playerStance = 'tech'
      isAttack = false
      log = `${playerMon.name} used ${playerMoveName}!`
      const heal = Math.floor(playerMon.maxHp * 0.5)
      const oldHp = playerMon.currentHp
      playerMon.currentHp = Math.min(
        playerMon.maxHp,
        playerMon.currentHp + heal,
      )
      if (playerMon.currentHp > oldHp) log += ` It restored health!`
      const { applied } = applyStatus(
        playerMon,
        'regen',
        state.weather?.weather,
        { terrain: state.terrain?.terrain },
      )
      if (applied) log += ` Regeneration started!`
    }

    const enemyStance = calculateAiStance(enemyMon, playerMon)

    // Calculate damage if it's an attack
    let result: 'win' | 'loss' | 'tie' = 'tie'
    let playerAttackTypeForLog: string | undefined
    if (isAttack) {
      const dmgResult = calculateDamage(
        playerMon,
        enemyMon,
        playerStance,
        1.5,
        undefined,
        undefined,
	        undefined,
	        undefined,
	        state.weather?.weather,
	        undefined,
	        { currentTurn: state.turn },
	      )
      playerDamage = dmgResult.damage
      playerAttackTypeForLog = dmgResult.usedType

      // Determine stance matchup
      if (
        (playerStance === 'power' && enemyStance === 'tech') ||
        (playerStance === 'tech' && enemyStance === 'speed') ||
        (playerStance === 'speed' && enemyStance === 'power')
      ) {
        result = 'win'
      } else if (playerStance === enemyStance) {
        result = 'tie'
      } else {
        result = 'loss'
      }

      // Shield check
      const shield = handleShieldInteraction(
        enemyMon,
        dmgResult.isSuperEffective,
        result === 'win',
      )
      if (shield.damageMultiplier === 0) {
        playerDamage = 0
        log += shield.message
      } else {
        const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
        log += `\n${state.playerName}: ${playerMon.name} uses a ${cap(playerStance)} ${cap(dmgResult.usedType)} Attack dealing ${playerDamage} damage!`
        if (dmgResult.isRadiantBoost)
          log += `\n${playerMon.name}'s aura burns bright.`
        if (dmgResult.weatherMessage) log += `\n${dmgResult.weatherMessage}`
        if (dmgResult.isCrit) log += ' (Critical Hit!)'
        log += formatTypeEffectivenessMessage(dmgResult)
      }
    }

    // Enemy counter-attack
    const enemyMultiplier =
      result === 'win' ? 0.5 : result === 'loss' ? 2.0 : 1.0
    const enemyDmgResult = calculateDamage(
      enemyMon,
      playerMon,
      enemyStance,
      enemyMultiplier,
      undefined,
      undefined,
	      undefined,
	      undefined,
	      state.weather?.weather,
	      undefined,
	      { currentTurn: state.turn },
	    )
    let enemyDamage = enemyDmgResult.damage

    // Player shield check
    const playerShield = handleShieldInteraction(
      playerMon,
      enemyDmgResult.isSuperEffective,
      result === 'loss',
    )
    if (playerShield.damageMultiplier === 0) {
      enemyDamage = 0
      log += playerShield.message
    } else {
      const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
      log += `\n${state.enemyName}: ${enemyMon.name} uses a ${cap(enemyStance)} ${cap(enemyDmgResult.usedType)} Attack dealing ${enemyDamage} damage!`
      if (enemyDmgResult.isRadiantBoost)
        log += `\n${enemyMon.name}'s aura burns bright.`
      if (enemyDmgResult.weatherMessage)
        log += `\n${enemyDmgResult.weatherMessage}`
      log += formatTypeEffectivenessMessage(enemyDmgResult)
    }

    // Apply damage
    const playerEndure = applyPokemonResearchEndure(enemyMon, playerDamage)
    const enemyEndure = applyPokemonResearchEndure(playerMon, enemyDamage)
    playerDamage = playerEndure.damage
    enemyDamage = enemyEndure.damage
    enemyMon.currentHp = Math.max(0, enemyMon.currentHp - playerDamage)
    playerMon.currentHp = Math.max(0, playerMon.currentHp - enemyDamage)
    if (playerEndure.message) log += `\n${playerEndure.message}`
    if (enemyEndure.message) log += `\n${enemyEndure.message}`

    // Decrement usage
    if (state.powers) {
      state.powers.circadianUsesRemaining =
        (state.powers.circadianUsesRemaining ?? 0) - 1
    }

    // Update history
    state.history.unshift({
      turn: state.turn,
      playerStance: playerStance,
      enemyStance: enemyStance,
      result,
      damageDealt: playerDamage,
      damageTaken: enemyDamage,
      playerAttackType: playerAttackTypeForLog,
      enemyAttackType: enemyDmgResult.usedType,
      message: log,
    })

    // Track usage
    const powerUsage =
      ((user as any).powerUsage as Record<string, number> | undefined) || {}
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        powerUsage: {
          ...powerUsage,
          circadianUses: (powerUsage.circadianUses || 0) + 1,
        },
      },
    })

    await finalizeTurn(state, user.id, user)

    return { success: true, state, message: log }
  })
}
