import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BattleState } from '@/utilities/battle/types'
import type { User } from '@/payload-types'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { incrementDailyTaskProgress } from '@/utilities/tasks/daily-progress'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import {
  incrementUserActivityResult,
  registerUserSketchedMove,
} from '@/utilities/user-state'
import { logger } from '@/utilities/logger'
import { buildBattleWinRewards } from './win-rewards'
import { persistHeldItemBattleWinEffects } from './held-items'
import { persistPokemonBattleKOs } from './pokemon-ko-credit'

async function settlePendingSketchedMoves(
  state: BattleState,
  userId: string,
  payload: any,
): Promise<{ id: string; name: string }[]> {
  const pendingMoves = state.pendingSketchedMoves || []
  if (pendingMoves.length === 0) return []

  const newlyUnlocked: { id: string; name: string }[] = []
  const remainingMoves: BattleState['pendingSketchedMoves'] = []

  for (const pendingMove of pendingMoves) {
    if (pendingMove.userId !== userId) {
      remainingMoves.push(pendingMove)
      continue
    }

    try {
      const registration = await registerUserSketchedMove(
        payload,
        userId,
        pendingMove.id,
      )
      if (registration.isNew) {
        newlyUnlocked.push({ id: pendingMove.id, name: pendingMove.name })
      }
    } catch (error) {
      remainingMoves.push(pendingMove)
      logger.error('Failed to persist Smeargle Sketch unlock', error)
    }
  }

  state.pendingSketchedMoves =
    remainingMoves.length > 0 ? remainingMoves : undefined
  return newlyUnlocked
}

export async function handleWin(
  state: BattleState,
  user: User,
  battleConfig: any,
) {
  const payload = await getPayload({ config: configPromise })

  const newlySketchedMoves = await settlePendingSketchedMoves(
    state,
    user.id,
    payload as any,
  )
  if (newlySketchedMoves.length > 0) {
    state.sketchedMoves = [
      ...(state.sketchedMoves || []),
      ...newlySketchedMoves,
    ]
    const moveMessages = newlySketchedMoves.map(
      (move) => `The MoveDex recorded ${move.name}.`,
    )
    if (state.history[0]) {
      state.history[0].message += `\n${moveMessages.join('\n')}`
    }
  }

  if (!state.chronicle) {
    await incrementUserActivityResult(payload as any, user.id, 'battleResults', state.battleId, {
      wins: 1,
    })
  }

  const expeditionResult = await recordExpeditionActivityResult(
    user.id,
    'battle',
    state.battleId,
    true,
    { revalidatePaths: false },
  )
  if (expeditionResult.expedition) {
    state.expeditionProgress = expeditionResult.expedition
  }

  if (!state.chronicle) {
    await persistPokemonBattleKOs(state)
    await persistHeldItemBattleWinEffects(state.playerTeam)
  }

  if (state.chronicle || battleConfig.disableRewards) {
    if (state.chronicle) return
    await incrementDailyTaskProgress(user.id, 'daily_battle', 1, {
      isTrainer: !battleConfig.isWildBattle,
    })
    return
  }

  const rewardsToGrant = buildBattleWinRewards(state, user, battleConfig)
  const { summary } = await grantRewards(user.id, rewardsToGrant, {
    idempotencyKey: `battle-win:${state.economyActionId || state.battleId}:${user.id}`,
    requirementContext: {
      category: battleConfig.category,
      subCategory: battleConfig.subCategory,
      weather: state.weather?.weather,
    },
  })
  if (state.sketchedMoves?.length) {
    summary.sketchedMoves = state.sketchedMoves
  }
  state.rewards = summary

  // Explicit Daily Battle Tracking
  await incrementDailyTaskProgress(user.id, 'daily_battle', 1, {
    isTrainer: !battleConfig.isWildBattle,
  })
}
