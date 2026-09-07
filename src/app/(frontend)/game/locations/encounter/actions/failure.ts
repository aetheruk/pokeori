import configPromise from '@payload-config'
import type { User } from '@/payload-types'
import { getPayload } from 'payload'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/server'
import { redis } from '@/utilities/redis'
import { incrementUserActivityResult } from '@/utilities/user-state'
import { getEncounterActivityReference, type EncounterState } from './types'
import { runCaptureSettlement } from './capture-settlement'

export async function failEncounter(
  user: User,
  state: EncounterState,
  activePokemonId?: string,
  transaction?: Pick<import('./capture-settlement').CaptureSettlementContext, 'payload' | 'req' | 'redis'>,
) {
  if (!transaction) {
    const previous = await redis.get<EncounterState>(`encounter:${user.id}`)
    if (previous && previous.startTime !== state.startTime) return undefined
    const result = await runCaptureSettlement(user.id, `failure:${state.locationId}:${state.startTime}`, previous || state, async (context) => ({
      success: true, expeditionProgress: await failEncounter(context.user, state, activePokemonId, context),
    }), 'failure')
    return result.expeditionProgress
  }
  const payload = transaction?.payload || await getPayload({ config: configPromise })
  const encounterId = `encounter:${user.id}`

  await (transaction?.redis || redis).del(encounterId)

  if (activePokemonId) {
    await payload.update({
      collection: 'pokemon',
      id: activePokemonId,
      data: { ability: '' },
    })
  }

  await incrementUserActivityResult(
    payload as any,
    user.id,
    'locationEncounterResults',
    state.locationId,
    { losses: 1 },
  )

  if (state.locationId.startsWith('fishing:')) {
    const gameId = state.locationId.replace('fishing:', '')
    await incrementUserActivityResult(
      payload as any,
      user.id,
      'gameResults',
      gameId,
      { losses: 1 },
    )
  }

  const reference = getEncounterActivityReference(state)
  const expeditionResult =
    state.safari?.scope === 'encounter'
      ? undefined
      : await (async () => {
          const reference = getEncounterActivityReference(state)
          return recordExpeditionActivityResult(
            user.id,
            reference.activityType,
            reference.activityId,
            false,
            { revalidatePaths: false, ...(transaction ? { payload, req: transaction.req } : {}) },
          )
        })()

  if (reference.activityType === 'game') {
    await (transaction?.redis || redis).del(`game:${user.id}`)
  }

  return expeditionResult?.expedition
}
