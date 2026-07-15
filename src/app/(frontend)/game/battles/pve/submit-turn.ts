import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BattleState, BattleStance } from '@/utilities/battle/types'
import { finalizeTurn } from '../helpers/turn-finalization'
import { processEnemyAttackOnly } from './enemy-attack'
import {
  canGigantamax,
  createInitialPowersState,
  getGigantamaxForm,
} from '@/data/powers'
import type { User } from '@/payload-types'
import {
  isValidBattleStance,
  parseBattlePowerCommand,
  validateCommonPowerRequirements,
} from '@/utilities/battle/action-validation'
import { getDisabledStanceMessage } from '@/utilities/battle/stance-disable'
import { getUserInventoryMap } from '@/utilities/user-state'
import { getSkillLevel } from '@/utilities/skills/unlocks'
import { processBattleAbilityTeraActivation } from '@/utilities/battle/abilities'
import { applyBattleFormChange } from '@/utilities/battle/stats-calc'
import { clearZMoveCharge } from '@/utilities/battle/z-move'
import { createBattleTurnTimer } from '../helpers/timing'

export async function submitPveTurn(
  user: User,
  state: BattleState,
  playerStance: BattleStance,
  attackType?: string,
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  waiting?: boolean
}> {
  const timer = createBattleTurnTimer('submitPveTurn', {
    battleId: state.battleId,
    turn: state.turn,
    hasAttackType: Boolean(attackType),
    isPower: attackType?.startsWith('power:') ?? false,
  })

  // Validate stance input
  if (!isValidBattleStance(playerStance)) {
    return { success: false, error: 'Invalid stance' }
  }

  // Validate state has required data
  if (!state.playerTeam?.length || !state.enemyTeam?.length) {
    return { success: false, error: 'Invalid battle state' }
  }

  if (!state.powers) {
    state.powers = createInitialPowersState()
  }

  const playerMon = state.playerTeam[state.activePlayerIndex]
  let userInventoryPromise: Promise<Record<string, number>> | undefined
  const getPlayerInventory = () => {
    if (state.chronicle) {
      return Promise.resolve(state.chronicleInventory || {})
    }

    userInventoryPromise ??= timer.time('loadInventory', async () => {
      const payload = await getPayload({ config: configPromise })
      return getUserInventoryMap(payload as any, user.id)
    })
    return userInventoryPromise
  }
  const disabledStanceError = getDisabledStanceMessage(playerMon, playerStance)
  if (disabledStanceError) {
    return { success: false, error: disabledStanceError }
  }

  // Dimensional Shift: Space Lock Check
  if (state.powers?.dimensionalShift?.activeEffect?.type === 'space') {
    if (
      state.history.length > 0 &&
      state.history[0].playerStance === playerStance
    ) {
      return {
        success: false,
        error:
          'Space Lock Active: You cannot use the same stance twice in a row!',
      }
    }
  }

  // --- Power Activation ---
  if (attackType?.startsWith('power:')) {
    const powerCommand = parseBattlePowerCommand(attackType, playerMon)
    const userInventory = await getPlayerInventory()
    const requirementError = validateCommonPowerRequirements({
      command: powerCommand,
      inventory: userInventory,
      pokemon: playerMon,
      powers: state.powers,
      trainerLevel: getSkillLevel(user.skills, 'battling'),
    })
    if (requirementError) return { success: false, error: requirementError }

    if (powerCommand.kind !== 'z-move') {
      clearZMoveCharge(playerMon)
    }

    // Dimensional Shift
    if (powerCommand.kind === 'dimensional-shift') {
      const { useDimensionalShift } = await import('../powers/dimensional')
      const result = await useDimensionalShift(
        state,
        user.id,
        powerCommand.shiftType,
      )
      if (!result.success) return result

      if (powerCommand.shiftType === 'time') {
        // Time shift skips enemy action, but still finalizes the turn lifecycle.
        await finalizeTurn(state, user.id, user)
      } else {
        // Space/Chaos: Enemy attacks
        const activeEnemy = state.enemyTeam[state.activeEnemyIndex]
        await processEnemyAttackOnly(
          state,
          playerMon,
          activeEnemy,
          user,
          undefined,
          playerStance,
          { playerInventory: userInventory },
        )
      }

      return { success: true, state }
    }

    // Mega Evolution
    if (powerCommand.kind === 'mega') {
      const { activateMegaEvolution } = await import('../powers/mega')
      if (activateMegaEvolution(playerMon, powerCommand.megaFormId, state)) {
        state.powers.megaUsesRemaining -= 1
        state.powers.megaEvolved = true
        state.powers.megaTurnsRemaining = 0

        const activeEnemy = state.enemyTeam[state.activeEnemyIndex]
        await processEnemyAttackOnly(
          state,
          playerMon,
          activeEnemy,
          user,
          `${playerMon.name}'s Mega Evolution activated!`,
          undefined,
          { playerInventory: userInventory },
        )
        return { success: true, state }
      }

      return { success: false, error: 'Mega Evolution failed' }
    }

    // Dynamax
    if (powerCommand.kind === 'dynamax') {
      let formId = powerCommand.formId

      if (!formId && canGigantamax(playerMon.formId)) {
        formId = getGigantamaxForm(playerMon.formId)
      }

      const { activateDynamax } = await import('../powers/dynamax')
      if (activateDynamax(playerMon, formId, state)) {
        state.powers.dynamaxUsesRemaining -= 1
        state.powers.dynamaxActive = true
        state.powers.dynamaxTurnsRemaining =
          playerMon.dynamaxTurnsRemaining ?? state.powers.dynamaxTurnsRemaining

        const activeEnemy = state.enemyTeam[state.activeEnemyIndex]
        await processEnemyAttackOnly(
          state,
          playerMon,
          activeEnemy,
          user,
          `${playerMon.name}'s Dynamax activated!`,
          undefined,
          { playerInventory: userInventory },
        )
        return { success: true, state }
      }

      return { success: false, error: 'Dynamax activation failed' }
    }

    // Tera
    if (powerCommand.kind === 'tera') {
      const { activateTera } = await import('../powers/tera')
      if (activateTera(playerMon, state.turn)) {
        state.powers.teraUsesRemaining -= 1
        const teraAbility = processBattleAbilityTeraActivation({
          state,
          pokemon: playerMon,
        })
        applyBattleFormChange(playerMon, teraAbility.formId)

        const activeEnemy = state.enemyTeam[state.activeEnemyIndex]
        const teraTypeLabel = `${playerMon.teraType?.toUpperCase()} type`
        const prefixMessages = [
          `${playerMon.name} terastallized into ${teraTypeLabel}!`,
          ...teraAbility.messages,
        ]
        await processEnemyAttackOnly(
          state,
          playerMon,
          activeEnemy,
          user,
          prefixMessages.join('\n'),
          undefined,
          { playerInventory: userInventory },
        )
        return { success: true, state }
      }

      return { success: false, error: 'Terastallization failed' }
    }

    // Z-Move (Stance only)
    if (powerCommand.kind === 'z-move') {
      const { activateZMove } = await import('../powers/z-move')
      if (!activateZMove(playerMon)) {
        return { success: false, error: 'Z-Move is already prepared' }
      }

      state.powers.zMoveUsesRemaining -= 1
      state.powers.zMoveUsed = state.powers.zMoveUsesRemaining <= 0

      const activeEnemy = state.enemyTeam[state.activeEnemyIndex]
      await processEnemyAttackOnly(
        state,
        playerMon,
        activeEnemy,
        user,
        `${playerMon.name} prepares to launch a Z-Move!`,
        playerStance,
        { playerInventory: userInventory },
      )
      return { success: true, state }
    }
  }

  return {
    success: false,
    error: 'Basic attacks must be submitted through the battle move action',
    state,
  }
}
