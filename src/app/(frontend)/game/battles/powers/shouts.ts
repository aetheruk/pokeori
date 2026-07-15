/**
 * Shouts power system.
 * Allows manipulating enemy AI stance selection with 80% success rate.
 * PVE only.
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
 * Use a Shout to influence enemy stance selection.
 * 80% chance to force enemy into a favorable stance.
 * Only works in PVE battles.
 *
 * @param stance - Player's chosen stance for the turn
 */
export async function useShout(
  stance: BattleStance,
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
    if (!state) return { success: false, error: 'No active battle' }

    if (state.isPvp)
      return { success: false, error: 'Shouts cannot be used in PVP' }
    if (needsPlayerReplacement(state)) {
      return {
        success: false,
        error: 'Choose your next Pokemon before using a Shout',
        state,
      }
    }

    // Check for Book of Shouts
    const payload = await getPayload({ config: configPromise })
    const [userDoc, userInventory] = await Promise.all([
      payload.findByID({ collection: 'users', id: user.id }),
      getUserInventoryMap(payload as any, user.id),
    ])

    if (!userInventory['book-of-shouts']) {
      return { success: false, error: 'You do not own the Book of Shouts' }
    }
    const skillRequirementError = validateBattlePowerSkillRequirement(
      'shout',
      getSkillLevel(userDoc.skills, 'battling'),
    )
    if (skillRequirementError)
      return { success: false, error: skillRequirementError }

    if (!state.powers) {
      return { success: false, error: 'Power state error' }
    }

    if (state.powers.shoutUsesRemaining <= 0) {
      return { success: false, error: 'No Shout uses remaining' }
    }

    // Stance manipulation logic
    // Win: Enemy uses weak stance (Player wins)
    // Loss: Enemy uses strong stance (Player loses)
    const winStanceMap: Record<BattleStance, BattleStance> = {
      power: 'tech',
      speed: 'power',
      tech: 'speed',
    }

    const lossStanceMap: Record<BattleStance, BattleStance> = {
      power: 'speed',
      speed: 'tech',
      tech: 'power',
    }

    const roll = Math.random()
    const isWin = roll < 0.8 // 80% success rate

    const forcedEnemyStance = isWin
      ? winStanceMap[stance]
      : lossStanceMap[stance]

    // Decrement usage
    state.powers.shoutUsesRemaining -= 1

    const powerUsage =
      (userDoc.powerUsage as Record<string, number> | undefined) || {}

    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        powerUsage: {
          ...powerUsage,
          shoutUses: (powerUsage.shoutUses || 0) + 1,
        },
      },
    })

    const playerMon = state.playerTeam[state.activePlayerIndex]
    if (playerMon.isShadow) {
      return { success: false, error: 'Shadow Pokemon cannot use Powers!' }
    }

    const selectedPowerError = validateSelectedPokemonPower({
      selectedPokemonPower: playerMon.selectedPokemonPower,
      requiredPower: 'shout',
      pokemonName: playerMon.name,
    })
    if (selectedPowerError) {
      return { success: false, error: selectedPowerError }
    }

    const enemyMon = state.enemyTeam[state.activeEnemyIndex]
    const playerName = state.playerName || 'Player'
    const enemyName = state.enemyName || 'Enemy'

    // Build shout message
    const stanceAdjective =
      stance === 'power'
        ? 'Powerful'
        : stance === 'speed'
          ? 'Speedy'
          : 'Technical'
    const shoutLog = `${playerName} issues a ${stanceAdjective} Command to ${playerMon.name}!`

    let reactionLog = ''
    if (isWin) {
      reactionLog = `${enemyName} is overwhelmed by the shout!`
    } else {
      reactionLog = `${enemyMon.name} sees through the shout!`
    }

    // Calculate battle resolution
    const { calculateDamage, resolveStance, handleShieldInteraction } =
      await import('@/utilities/battle/battle-logic')

    const resolution = resolveStance(stance, forcedEnemyStance)

    // Player attack
    const playerDmgResult = calculateDamage(
      playerMon,
      enemyMon,
      stance,
      resolution.damageMultiplier,
      undefined,
      60,
	      undefined,
	      undefined,
	      state.weather?.weather,
	      undefined,
	      { currentTurn: state.turn },
	    )
    let playerDamage = playerDmgResult.damage
    if (playerMon.status?.id === 'victory') playerMon.status = undefined

    // Enemy shield check
    const enemyShieldResult = handleShieldInteraction(
      enemyMon,
      playerDmgResult.isSuperEffective,
      resolution.result === 'win',
    )
    if (enemyShieldResult.damageMultiplier === 0) playerDamage = 0

    // Enemy attack
    const enemyMultiplier = resolution.result === 'win' ? 0.5 : 2.0
    const enemyDmgResult = calculateDamage(
      enemyMon,
      playerMon,
      forcedEnemyStance,
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
    if (enemyMon.status?.id === 'victory') enemyMon.status = undefined

    // Player shield check
    const playerShieldResult = handleShieldInteraction(
      playerMon,
      enemyDmgResult.isSuperEffective,
      resolution.result === 'loss',
    )
    if (playerShieldResult.damageMultiplier === 0) enemyDamage = 0

    // Apply damage
    const playerEndure = applyPokemonResearchEndure(enemyMon, playerDamage)
    const enemyEndure = applyPokemonResearchEndure(playerMon, enemyDamage)
    playerDamage = playerEndure.damage
    enemyDamage = enemyEndure.damage
    enemyMon.currentHp = Math.max(0, enemyMon.currentHp - playerDamage)
    playerMon.currentHp = Math.max(0, playerMon.currentHp - enemyDamage)

    // Build combat message
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
    let message = `${shoutLog}\n${reactionLog}`

    message += `\n${playerName}: ${playerMon.name} uses a ${stanceAdjective} ${cap(playerDmgResult.usedType)} Attack dealing ${playerDamage} damage.`
    if (playerDmgResult.isRadiantBoost)
      message += `\n${playerMon.name}'s aura burns bright.`
    if (playerDmgResult.weatherMessage)
      message += `\n${playerDmgResult.weatherMessage}`
    if (enemyShieldResult.message) message += enemyShieldResult.message

    if (enemyMon.currentHp > 0) {
      message += `\n${enemyName}: ${enemyMon.name} uses a ${cap(forcedEnemyStance)} Attack dealing ${enemyDamage} damage.`
      if (enemyDmgResult.isRadiantBoost)
        message += `\n${enemyMon.name}'s aura burns bright.`
      if (enemyDmgResult.weatherMessage)
        message += `\n${enemyDmgResult.weatherMessage}`
      if (playerShieldResult.message) message += playerShieldResult.message
    }
    if (playerEndure.message) message += `\n${playerEndure.message}`
    if (enemyEndure.message) message += `\n${enemyEndure.message}`

    // Update history
    state.history.unshift({
      turn: state.turn,
      playerStance: stance,
      enemyStance: forcedEnemyStance,
      result: resolution.result,
      damageDealt: playerDamage,
      damageTaken: enemyDamage,
      playerAttackType: playerDmgResult.usedType,
      enemyAttackType: enemyDmgResult.usedType,
      message,
    })

    await finalizeTurn(state, user.id, user)

    return { success: true, state, message }
  })
}
