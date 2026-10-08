'use server'

import { redis } from '@/utilities/redis'
import type { BattleState } from '@/utilities/battle/types'
import {
  acquireActionLock,
  checkActionRateLimit,
  releaseActionLock,
} from '@/utilities/game-integrity'
import { getUser } from '../helpers/user'
import {
  BATTLE_TTL,
  getBattleConfigForState,
} from '../helpers/state-management'
import { runBattleActionWithGuard } from '../helpers/action-guard'
import { buildBattleCaptureEncounter } from '../helpers/alpha-capture'
import {
  getEncounterRedisTtlSeconds,
  type EncounterState,
} from '../../locations/encounter/actions/types'
import { getEncounterMechanicsLockKey } from '../../locations/encounter/actions/lock'

export async function attemptBattleCapture() {
  const user = await getUser({ fresh: true })
  if (!user) return { success: false, error: 'Not authenticated' }
  const rate = await checkActionRateLimit(
    user.id,
    'battle-capture-start',
    30,
    60,
  )
  if (!rate.allowed)
    return { success: false, error: 'Please wait before trying again.' }

  return runBattleActionWithGuard(user.id, undefined, async () => {
    const startLock = await acquireActionLock(
      `lock:encounter:start:${user.id}`,
      20,
    )
    if (!startLock.acquired)
      return { success: false, error: 'Another encounter is starting.' }
    try {
      const mechanicsLock = await acquireActionLock(
        getEncounterMechanicsLockKey(user.id),
        20,
      )
      if (!mechanicsLock.acquired)
        return {
          success: false,
          error: 'Another encounter action is being processed.',
        }
      try {
        const battleKey = `battle:${user.id}`
        const encounterKey = `encounter:${user.id}`
        const battle = await redis.get<BattleState>(battleKey)
        const active = await redis.get<EncounterState>(encounterKey)
        if (!battle)
          return { success: false, error: 'Battle results have expired.' }
        const battleIdentity = battle.economyActionId || battle.battleId
        const activeCaptureIdentity =
          active?.battleCaptureId || active?.alphaBattleId
        if (
          (battle.battleCaptureStartedAt || battle.alphaCaptureStartedAt) &&
          activeCaptureIdentity === battleIdentity
        ) {
          return { success: true }
        }
        if (
          active &&
          (active.encounterMode === 'safari' || Date.now() < active.expiry)
        ) {
          return {
            success: false,
            error: 'Finish your current capture encounter first.',
          }
        }
        const config = getBattleConfigForState(battle)
        const encounter =
          config &&
          buildBattleCaptureEncounter(battle, config, user.id, Date.now())
        if (!encounter)
          return {
            success: false,
            error: 'This Alpha capture attempt is no longer available.',
          }

        const saved = await redis.setManyIfValue(battleKey, battle, [
          {
            key: encounterKey,
            value: encounter,
            ttlSeconds: getEncounterRedisTtlSeconds(encounter),
          },
          {
            key: battleKey,
            value: {
              ...battle,
              battleCaptureStartedAt: encounter.startTime,
              ...(encounter.alphaPokemon
                ? { alphaCaptureStartedAt: encounter.startTime }
                : {}),
            },
            ttlSeconds: BATTLE_TTL,
          },
        ])
        return saved
          ? { success: true }
          : {
              success: false,
              error: 'Battle state changed. Please reopen the results.',
            }
      } finally {
        await releaseActionLock(mechanicsLock)
      }
    } finally {
      await releaseActionLock(startLock)
    }
  })
}
