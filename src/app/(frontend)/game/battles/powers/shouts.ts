/**
 * Battle Shout power system.
 * Raises the active Pokemon's five core battle stats for three turns.
 * PVE only.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BattleState } from '@/utilities/battle/types'
import { SHOUT_DURATION } from '@/data/powers'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { validateSelectedPokemonPower } from '@/utilities/pokemon/pokemon-powers'
import { getStanceWinCharges, POWER_STANCE_WIN_COST, spendPowerCharge } from '@/utilities/battle/power-charges'
import { needsPlayerReplacement } from '@/utilities/battle/switching'
import {
  getSkillLevel,
  validateBattlePowerSkillRequirement,
} from '@/utilities/skills/unlocks'
import { getUserInventoryMap } from '@/utilities/user-state'
import { runBattleActionWithGuard } from '../helpers/action-guard'
import { queuePvpMoveAndResolveTurn } from '../pvp/turn-sync'
import {
  applyShoutStatBoost,
  getBattleShoutMessage,
} from '@/utilities/battle/shout-effects'

/**
 * Activate Battle Shout. The activation consumes the player's action and the
 * enemy receives a normal response, matching the other transformation powers.
 */
export async function useShout(
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

    if (state.status !== 'ongoing') {
      return { success: false, error: 'Battle has ended' }
    }
    if (needsPlayerReplacement(state)) {
      return {
        success: false,
        error: 'Choose your next Pokemon before using a Shout',
        state,
      }
    }

    const playerMon = state.playerTeam[state.activePlayerIndex]
    const enemyMon = state.enemyTeam[state.activeEnemyIndex]
    if (!playerMon || playerMon.currentHp <= 0) {
      return { success: false, error: 'Active Pokemon is fainted' }
    }
    if (!enemyMon || enemyMon.currentHp <= 0) {
      return { success: false, error: 'No active enemy Pokemon' }
    }
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
    if (playerMon.shoutBoost) {
      return { success: false, error: 'Battle Shout is already active' }
    }

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
    if (skillRequirementError) {
      return { success: false, error: skillRequirementError }
    }
    if (!state.powers) {
      return { success: false, error: 'Power state error' }
    }
    if (state.powers.shoutUsesRemaining <= 0) {
      return { success: false, error: 'No Shout uses remaining' }
    }
    if (getStanceWinCharges(state.powers) < POWER_STANCE_WIN_COST) return { success: false, error: 'Win 3 stance matchups to use a Power' }

    if (state.isPvp) {
      const result = await queuePvpMoveAndResolveTurn({viewerId:user.id,battleState:state,move:{stance:'tech',attackType:'power:shout'}})
      return {success:true,state:result.state,waiting:result.waiting}
    }

    const boost = applyShoutStatBoost(playerMon, state.turn)
    if (!boost.applied) return { success: false, error: boost.message, state }

    spendPowerCharge(state.powers)
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

    const encouragement = getBattleShoutMessage(playerMon.name)
    const message = `${playerMon.name} unleashes a Battle Shout! ${encouragement} ${boost.message} The effect lasts for ${SHOUT_DURATION} turns.`
    const { processEnemyAttackOnly } = await import('../pve/enemy-attack')
    await processEnemyAttackOnly(
      state,
      playerMon,
      enemyMon,
      user,
      message,
      undefined,
      { playerInventory: userInventory },
    )

    return { success: true, state, message }
  })
}
