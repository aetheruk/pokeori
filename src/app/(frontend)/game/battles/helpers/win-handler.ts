import 'server-only'
import type { Payload, PayloadRequest } from 'payload'
import { createEconomyRequestId, runEconomyAction } from '@/utilities/economy/transactions'
import type { BattleState } from '@/utilities/battle/types'
import type { User } from '@/payload-types'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { incrementDailyTaskProgress } from '@/utilities/tasks/daily-progress'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/server'
import {
  incrementUserActivityResult,
  registerUserSketchedMove,
} from '@/utilities/user-state'
import { buildBattleWinRewards } from './win-rewards'
import { persistConsumedHeldItems, persistHeldItemBattleWinEffects } from './held-items'
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

    const registration = await registerUserSketchedMove(
      payload,
      userId,
      pendingMove.id,
    )
    if (registration.isNew) {
      newlyUnlocked.push({ id: pendingMove.id, name: pendingMove.name })
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
  const settled = await runEconomyAction(
    {
      userId: user.id,
      action: 'settle-battle-outcome',
      requestId: createEconomyRequestId(`battle-outcome:${state.economyActionId || state.battleId}:${user.id}`),
    },
    async ({ payload, req }) => {
      // Retry from the original state: failed transaction attempts must not
      // retain in-memory flags that skip rolled-back Pokemon effects.
      const nextState = structuredClone(state)
      const freshUser = await payload.findByID({ collection: 'users', id: user.id, req })
      await settleBattleWin(nextState, freshUser, battleConfig, payload, req)
      await persistConsumedHeldItems(nextState, payload)
      return nextState
    },
  )
  Object.assign(state, settled)
}

async function settleBattleWin(
  state: BattleState,
  user: User,
  battleConfig: any,
  payload: Payload,
  req: PayloadRequest,
) {

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
    { payload, req, revalidatePaths: false },
  )
  if (expeditionResult.expedition) {
    state.expeditionProgress = expeditionResult.expedition
  }

  if (!state.chronicle) {
    await persistPokemonBattleKOs(state, payload)
    await persistHeldItemBattleWinEffects(state.playerTeam, Math.random, payload)
  }

  if (state.chronicle || battleConfig.disableRewards) {
    if (state.chronicle) return
    await incrementDailyTaskProgress(user.id, 'daily_battle', 1, {
      sourceId: state.battleId,
      isTrainer: !battleConfig.isWildBattle,
    }, { payload, req })
    return
  }

  const rewardsToGrant = buildBattleWinRewards(state, user, battleConfig)
  const { summary } = await grantRewards(user.id, rewardsToGrant, {
    payload,
    req,
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
    sourceId: state.battleId,
    isTrainer: !battleConfig.isWildBattle,
  }, { payload, req })
}
