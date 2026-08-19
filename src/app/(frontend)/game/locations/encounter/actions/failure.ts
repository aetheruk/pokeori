import configPromise from '@payload-config'
import type { User } from '@/payload-types'
import { getPayload } from 'payload'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import { redis } from '@/utilities/redis'
import { incrementUserActivityResult } from '@/utilities/user-state'
import type { EncounterState } from './types'

export async function failEncounter(
  user: User,
  state: EncounterState,
  activePokemonId?: string,
) {
  const payload = await getPayload({ config: configPromise })
  const encounterId = `encounter:${user.id}`

  await redis.del(encounterId)

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

  const expeditionResult = await recordExpeditionActivityResult(
    user.id,
    'location',
    state.locationId,
    false,
  )

  return expeditionResult.expedition
}
