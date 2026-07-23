'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import {
  DAY_CARE_EGG_HATCH_COST_CRYSTALS,
  DAY_CARE_EGG_HATCH_LEVEL,
  DAY_CARE_EGG_RESEARCH_XP,
  getEggHatchOutcome,
  resolveEggRarity,
} from '@/utilities/day-care/eggs'
import { getUser } from './utils'
import { acquireActionLock, getIdempotentResult, releaseActionLock, setIdempotentResult } from '@/utilities/game-integrity'

export async function getEggsForBox() {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'user-eggs' as any,
    where: { and: [{ user: { equals: user.id } }, { status: { equals: 'incubating' } }] },
    sort: '-createdAt',
    pagination: false,
    depth: 0,
  })
  return docs.map((egg: any) => ({
    id: egg.id,
    foundAt: egg.foundAt,
    hatchAt: egg.hatchAt,
    rarity: resolveEggRarity(egg.rarity),
    sourceLocation: egg.sourceLocation,
    sourceBackground: egg.sourceBackground,
  }))
}

export async function hatchEgg(eggId: string) {
  if (!eggId || typeof eggId !== 'string') return { success: false, message: 'Invalid egg.' }
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')
  const resultKey = `day-care:egg-hatch:${user.id}:${eggId}`
  const cached = await getIdempotentResult<any>(resultKey)
  if (cached) return cached
  const lock = await acquireActionLock(`${resultKey}:lock`, 30)
  if (!lock.acquired) return { success: false, message: 'This egg is already hatching.' }
  try {
  const payload = await getPayload({ config })
  const egg = await payload.findByID({ collection: 'user-eggs' as any, id: eggId, depth: 0 }).catch(() => null) as any
  const eggUserId = typeof egg?.user === 'object' ? egg.user?.id : egg?.user
  if (!egg || String(eggUserId) !== String(user.id) || egg.status !== 'incubating') return { success: false, message: 'Egg not found.' }
  if (new Date(egg.hatchAt).getTime() > Date.now()) return { success: false, message: 'This egg is still warming.' }
  const crystals = (user.currency as any)?.crystals || 0
  if (crystals < DAY_CARE_EGG_HATCH_COST_CRYSTALS) return { success: false, message: `You need ${DAY_CARE_EGG_HATCH_COST_CRYSTALS} Crystals to hatch this egg.` }
  const eggRarity = resolveEggRarity(egg.rarity)
  const result = await getEggHatchOutcome(payload as any, user, eggRarity)
  if (!result) return { success: false, message: 'No eligible Pokemon are available for this egg yet.' }

  await payload.update({ collection: 'users', id: user.id, data: { currency: { ...user.currency, crystals: crystals - DAY_CARE_EGG_HATCH_COST_CRYSTALS } } })
  const { summary } = await grantRewards(user.id, [
    { type: 'pokemon', targetId: result.speciesId, quantity: 1, pokemonData: { level: DAY_CARE_EGG_HATCH_LEVEL, formId: result.formId, rarity: result.rarity, background: egg.sourceBackground, obtainedMethod: 'hatched', obtainedRegion: egg.sourceRegion, obtainedLocation: egg.sourceLocation, obtainedSourceId: `egg:${egg.id}` } },
    { type: 'pokemon_research_xp', targetId: result.formId, quantity: DAY_CARE_EGG_RESEARCH_XP },
  ], { source: 'day-care-egg-hatch', skipDropChance: true })
  await payload.update({ collection: 'user-eggs' as any, id: egg.id, data: { status: 'hatched', hatchPoolId: result.poolId } })
  revalidatePath('/game/pokemon')
  const response = { success: true, summary, eggRarity, message: `${summary.pokemon[0]?.name || 'A Pokemon'} hatched from the egg!` }
  await setIdempotentResult(resultKey, response)
  return response
  } finally {
    await releaseActionLock(lock)
  }
}
