import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BattleState } from '@/utilities/battle/types'
import type { User } from '@/payload-types'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { incrementDailyTaskProgress } from '@/utilities/tasks/daily-progress'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import { incrementUserActivityResult } from '@/utilities/user-state'
import { buildBattleWinRewards } from './win-rewards'
import { persistHeldItemBattleWinEffects } from './held-items'
import { persistPokemonBattleKOs } from './pokemon-ko-credit'

export async function handleWin(
  state: BattleState,
  user: User,
  battleConfig: any,
) {
  const payload = await getPayload({ config: configPromise })

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
    requirementContext: {
      category: battleConfig.category,
      subCategory: battleConfig.subCategory,
      weather: state.weather?.weather,
    },
  })
  state.rewards = summary

  // Explicit Daily Battle Tracking
  await incrementDailyTaskProgress(user.id, 'daily_battle', 1, {
    isTrainer: !battleConfig.isWildBattle,
  })
}
