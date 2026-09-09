import 'server-only'
import type { User } from '@/payload-types'
import type { BattleConfig } from '@/data/types'
import type { BattleState } from '@/utilities/battle/types'
import { createEconomyRequestId, runEconomyAction } from '@/utilities/economy/transactions'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/server'
import { incrementUserActivityResult } from '@/utilities/user-state'
import { persistConsumedHeldItems } from './held-items'
import { applyTrainerBattleLossPayout } from './loss-payout'
import { persistPokemonBattleKOs } from './pokemon-ko-credit'
import { recordEventActivityProgress } from '@/utilities/events/participation'

export async function handleBattleLoss(state: BattleState, user: User, battleConfig?: BattleConfig, applyPayout = true) {
  const settled = await runEconomyAction({ userId: user.id, action: 'settle-battle-outcome',
    requestId: createEconomyRequestId(`battle-outcome:${state.economyActionId || state.battleId}:${user.id}`),
  }, async ({ payload, req }) => {
    const nextState = structuredClone(state)
    if (!nextState.chronicle) await incrementUserActivityResult(payload, user.id, 'battleResults', nextState.battleId, { losses: 1 })
    const expedition = await recordExpeditionActivityResult(user.id, 'battle', nextState.battleId, false, { payload, req, revalidatePaths: false })
    if (expedition.expedition) nextState.expeditionProgress = expedition.expedition
    if (battleConfig && applyPayout) {
      const paid = await applyTrainerBattleLossPayout(nextState, user, battleConfig, payload)
      if (paid > 0 && nextState.history[0]) nextState.history[0].message += `\nYou paid ${paid} Pokedollars.`
    }
    await persistPokemonBattleKOs(nextState, payload)
    await persistConsumedHeldItems(nextState, payload)
    if (!nextState.chronicle) await recordEventActivityProgress(payload, user, { kind: 'battle_loss', sourceId: nextState.battleId, isTrainer: !battleConfig?.isWildBattle }, req)
    return nextState
  })
  Object.assign(state, settled)
}
