import 'server-only'
import type { BattleState } from '@/utilities/battle/types'
import { battles } from '@/data/battles'
import { createEconomyRequestId, runEconomyAction } from '@/utilities/economy/transactions'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { incrementUserActivityResult, registerUserSketchedMove } from '@/utilities/user-state'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/server'
import { persistConsumedHeldItems, persistHeldItemBattleWinEffects } from '../helpers/held-items'
import { persistPokemonBattleKOs } from '../helpers/pokemon-ko-credit'
import { getSharedBattleUserIds } from './state-utils'
import {
  applyPvpRatingResult,
  calculatePvpRatingChanges,
  getPvpRecord,
  type PvpMatchResult,
} from '@/utilities/battle/pvp-rating'

/** Both players' durable effects and the canonical terminal state commit once,
 * including when surrender races a decisive turn or Redis publication fails. */
export async function settlePvpOutcome(state: BattleState): Promise<BattleState> {
  if (state.status === 'ongoing') return state
  const {p1Id, p2Id} = getSharedBattleUserIds(state)
  if (!p1Id || !p2Id || p1Id === p2Id) throw new Error('Invalid PVP participants')
  return runEconomyAction({userId: p1Id, action: 'settle-pvp-outcome',
    requestId: createEconomyRequestId(`pvp-outcome:${state.economyActionId || state.pvpBattleId || state.battleId}`),
  }, async ({payload, req}) => {
    const next = structuredClone(state)
    const winnerId = next.status === 'won' ? p1Id : next.status === 'lost' ? p2Id : undefined
    const config = battles.find((battle) => battle.id === next.battleId)

    if (config?.pvp_type === 'ranked') {
      const p1 = await payload.findByID({
        collection: 'users',
        id: p1Id,
        depth: 0,
        req,
      })
      const p2 = await payload.findByID({
        collection: 'users',
        id: p2Id,
        depth: 0,
        req,
      })
      const p1Record = getPvpRecord((p1 as any)?.rankings?.pvp)
      const p2Record = getPvpRecord((p2 as any)?.rankings?.pvp)
      const result: PvpMatchResult = winnerId
        ? winnerId === p1Id
          ? 'win'
          : 'loss'
        : 'draw'
      const changes = calculatePvpRatingChanges(
        p1Record.rating,
        p2Record.rating,
        result,
      )
      const playedAt = new Date().toISOString()

      await payload.update({
        collection: 'users',
        id: p1Id,
        data: {
          rankings: {
            ...((p1 as any)?.rankings || {}),
            pvp: applyPvpRatingResult(
              p1Record,
              changes.player,
              result,
              playedAt,
            ),
          },
        },
        req,
      })
      await payload.update({
        collection: 'users',
        id: p2Id,
        data: {
          rankings: {
            ...((p2 as any)?.rankings || {}),
            pvp: applyPvpRatingResult(
              p2Record,
              changes.opponent,
              result === 'draw' ? 'draw' : result === 'win' ? 'loss' : 'win',
              playedAt,
            ),
          },
        },
        req,
      })

      next.pvpRatingChanges = {
        [p1Id]: changes.player,
        [p2Id]: changes.opponent,
      }
      next.pvpRatingChange = changes.player
    }

    for (const userId of [p1Id, p2Id]) {
      const won = userId === winnerId
      // Preserve draw semantics: no win/loss, but consumed items and KOs persist.
      if (winnerId) {
        await incrementUserActivityResult(payload, userId, 'battleResults', next.battleId, won ? {wins: 1} : {losses: 1}, {req})
        await recordExpeditionActivityResult(userId, 'battle', next.battleId, won, {payload, req, revalidatePaths: false})
      }
    }
    if (winnerId) {
      for (const move of next.pendingSketchedMoves || []) {
        if (move.userId !== winnerId) continue
        const result = await registerUserSketchedMove(payload, winnerId, move.id, {req})
        if (result.isNew && next.history[0]) next.history[0].message += `\nThe MoveDex recorded ${move.name}.`
      }
      if (config?.rewards?.length) await grantRewards(winnerId, config.rewards, {payload, req})
      await persistHeldItemBattleWinEffects(next.status === 'won' ? next.playerTeam : next.enemyTeam, Math.random, payload)
    }
    next.pendingSketchedMoves = undefined
    await persistPokemonBattleKOs(next, payload)
    await persistConsumedHeldItems(next, payload)
    return next
  })
}
