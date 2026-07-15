import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BattleState, BattleStance } from '@/utilities/battle/types'
import { queuePvpMoveAndResolveTurn } from './turn-sync'
import type { User } from '@/payload-types'
import {
  isValidBattleStance,
  parseBattlePowerCommand,
  validateCommonPowerRequirements,
} from '@/utilities/battle/action-validation'
import { getSkillLevel } from '@/utilities/skills/unlocks'
import { getDisabledStanceMessage } from '@/utilities/battle/stance-disable'
import { getUserInventoryMap } from '@/utilities/user-state'

export async function submitPvpTurn(
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
  if (!state.pvpBattleId) return { success: false, error: 'Not a PVP battle' }
  if (!isValidBattleStance(playerStance))
    return { success: false, error: 'Invalid stance' }
  if (state.status !== 'ongoing')
    return { success: false, error: 'Battle has ended' }
  if (!state.playerTeam?.length || !state.enemyTeam?.length) {
    return { success: false, error: 'Invalid battle state' }
  }
  if (!state.powers) return { success: false, error: 'Invalid power state' }
  if (!attackType?.startsWith('power:')) {
    return {
      success: false,
      error: 'Basic attacks must be submitted through the battle move action',
      state,
    }
  }

  // Capture Pending Powers (Mega, Dynamax, Tera, Z-Move)
  const playerMon = state.playerTeam[state.activePlayerIndex]
  const disabledStanceError = getDisabledStanceMessage(playerMon, playerStance)
  if (disabledStanceError) return { success: false, error: disabledStanceError }

  if (state.powers.dimensionalShift.activeEffect?.type === 'space') {
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

  const pendingPowers = {
    mega: playerMon.isMega, // Capture if locally activated
    dynamax: playerMon.isDynamaxed,
    dynamaxTurnsRemaining: playerMon.dynamaxTurnsRemaining,
    tera: false,
    zMove: !!playerMon.zMoveReady,
    zMoveCharge: false,
    megaFormId: playerMon.isMega ? playerMon.formId : undefined,
    dynamaxFormId: playerMon.isDynamaxed ? playerMon.formId : undefined,
  }

  let normalizedAttackType: string | undefined = attackType

  if (attackType?.startsWith('power:')) {
    const powerCommand = parseBattlePowerCommand(attackType, playerMon)
    const payload = await getPayload({ config: configPromise })
    const inventory = await getUserInventoryMap(payload as any, user.id)
    const requirementError = validateCommonPowerRequirements({
      command: powerCommand,
      inventory,
      pokemon: playerMon,
      powers: state.powers,
      trainerLevel: getSkillLevel(user.skills, 'battling'),
    })
    if (requirementError) return { success: false, error: requirementError }

    normalizedAttackType = undefined

    if (powerCommand.kind === 'dimensional-shift') {
      normalizedAttackType = attackType
    } else if (powerCommand.kind === 'mega') {
      pendingPowers.mega = true
      pendingPowers.megaFormId = powerCommand.megaFormId
    } else if (powerCommand.kind === 'dynamax') {
      pendingPowers.dynamax = true
      if (powerCommand.formId) pendingPowers.dynamaxFormId = powerCommand.formId
    } else if (powerCommand.kind === 'tera') {
      pendingPowers.tera = true
    } else if (powerCommand.kind === 'z-move') {
      pendingPowers.zMove = false
      pendingPowers.zMoveCharge = true
      normalizedAttackType = 'power:z-move'
    }
  }

  const syncResult = await queuePvpMoveAndResolveTurn({
    viewerId: user.id,
    battleState: state,
    move: {
      stance: playerStance,
      attackType: normalizedAttackType,
      powers: pendingPowers,
    },
  })

  if (syncResult.waiting) {
    return { success: true, state: syncResult.state, waiting: true }
  }

  if (syncResult.state.status !== 'ongoing') {
    revalidatePath('/game/battles/encounter')
  }
  return { success: true, state: syncResult.state }
}
