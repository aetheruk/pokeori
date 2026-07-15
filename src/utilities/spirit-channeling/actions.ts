'use server'

import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import {
  BOOK_OF_CHANNELING_ITEM_ID,
  getSpiritChannelingActivityId,
  getSpiritChannelingConfigForMemento,
  getSpiritChannelingEnergyClue,
  getSpiritChannelingOffering,
  type SpiritChannelingEnergy,
} from '@/data/spirit-channeling'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import { checkUserAuth } from '@/utilities/auth/server-auth'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { grantRewards, type RewardSummary } from '@/utilities/rewards/reward-logic'
import {
  getUserActivityStatsMap,
  getUserInventoryMap,
  incrementUserActivityResult,
  setUserInventoryMap,
} from '@/utilities/user-state'

const ChannelingOfferingSchema = z.object({
  itemId: z.string().min(1).max(80),
  quantity: z.coerce.number().int().min(1).max(9999),
})

const BeginChannelingSchema = z.object({
  mementoItemId: z.string().min(1).max(80),
  incenseItemId: z.string().min(1).max(80),
  offerings: z.array(ChannelingOfferingSchema).min(1).max(3),
  pokemonId: z.string().min(1).max(80),
  attemptId: z.string().min(8).max(120),
})

type ChannelingOutcome = 'wrong-incense' | 'wrong-offering' | 'weak-pokemon' | 'success'

export interface BeginSpiritChannelingResult {
  success: boolean
  outcome?: ChannelingOutcome
  message?: string
  summary?: RewardSummary
  error?: string
}

type PayloadLike = Awaited<ReturnType<typeof getPayload>>

function hasInventoryItem(inventory: Record<string, number>, itemId: string, quantity = 1): boolean {
  return (inventory[itemId] || 0) >= quantity
}

function aggregateOfferings(offerings: z.infer<typeof ChannelingOfferingSchema>[]) {
  return offerings.reduce<Record<string, number>>((record, offering) => {
    record[offering.itemId] = (record[offering.itemId] || 0) + offering.quantity
    return record
  }, {})
}

function getOfferedEnergy(offerings: Record<string, number>): SpiritChannelingEnergy | null {
  const energy: SpiritChannelingEnergy = {}

  for (const [itemId, quantity] of Object.entries(offerings)) {
    const offering = getSpiritChannelingOffering(itemId)
    if (!offering) return null
    energy[offering.type] = (energy[offering.type] || 0) + offering.energy * quantity
  }

  return energy
}

async function isChannelingCompleted(
  payload: PayloadLike,
  userId: string,
  activityId: string,
): Promise<boolean> {
  const stats = await getUserActivityStatsMap(payload as any, userId, ['researchEncounterResults'])
  return (stats.research?.[activityId]?.wins || 0) > 0
}

async function getOwnedPokemon(payload: PayloadLike, userId: string, pokemonId: string) {
  const result = await payload.find({
    collection: 'pokemon',
    where: {
      and: [
        { id: { equals: pokemonId } },
        { user: { equals: userId } },
        {
          or: [
            { fusedIntoPokemonId: { exists: false } },
            { fusedIntoPokemonId: { equals: null } },
            { fusedIntoPokemonId: { equals: '' } },
          ],
        },
      ],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  } as any)

  return result.docs?.[0] || null
}

function canPokemonChannel(pokemon: any, minLevel: number): boolean {
  if (!pokemon) return false
  const form = getPokemonForm(pokemon.formId)
  const isPsychic = form?.types?.some((type) => type.toLowerCase() === 'psychic')
  return Boolean(isPsychic && Number(pokemon.level || 0) >= minLevel)
}

export async function beginSpiritChanneling(
  rawInput: z.input<typeof BeginChannelingSchema>,
): Promise<BeginSpiritChannelingResult> {
  const parsed = BeginChannelingSchema.safeParse(rawInput)
  if (!parsed.success) return { success: false, error: 'Invalid channeling input' }

  const { user } = await checkUserAuth()
  const rate = await checkActionRateLimit(user.id, 'spirit-channeling', 30, 60)
  if (!rate.allowed) return { success: false, error: 'Too many channeling attempts. Please wait.' }

  const lock = await acquireActionLock(`lock:spirit-channeling:${user.id}`, 10)
  if (!lock.acquired) return { success: false, error: 'Another channeling attempt is in progress' }

  try {
    const idemKey = `spirit-channeling:${user.id}:${parsed.data.attemptId}`
    const cached = await getIdempotentResult<BeginSpiritChannelingResult>(idemKey)
    if (cached) return cached

    const payload = await getPayload({ config: payloadConfig })
    const config = getSpiritChannelingConfigForMemento(parsed.data.mementoItemId)
    if (!config) return { success: false, error: 'This item cannot be channeled' }

    const activityId = getSpiritChannelingActivityId(config)
    const [inventory, completed] = await Promise.all([
      getUserInventoryMap(payload as any, user.id),
      isChannelingCompleted(payload, user.id, activityId),
    ])

    if (!hasInventoryItem(inventory, BOOK_OF_CHANNELING_ITEM_ID)) {
      return { success: false, error: 'You do not know how to perform channeling yet' }
    }
    if (!hasInventoryItem(inventory, config.mementoItemId)) {
      return { success: false, error: 'You do not own this memento' }
    }
    if (completed) {
      return { success: false, error: 'This memento has already answered a channeling' }
    }
    if (!hasInventoryItem(inventory, parsed.data.incenseItemId)) {
      return { success: false, error: 'You do not own this incense' }
    }

    if (parsed.data.incenseItemId !== config.correctIncenseItemId) {
      return {
        success: false,
        outcome: 'wrong-incense',
        message: 'There is no response from your channeling.',
      }
    }

    const aggregatedOfferings = aggregateOfferings(parsed.data.offerings)
    for (const [itemId, quantity] of Object.entries(aggregatedOfferings)) {
      if (!getSpiritChannelingOffering(itemId)) {
        return { success: false, error: 'Invalid offering selected' }
      }
      if (!hasInventoryItem(inventory, itemId, quantity)) {
        return { success: false, error: 'You do not have enough of that offering' }
      }
    }

    const offeredEnergy = getOfferedEnergy(aggregatedOfferings)
    const energyClue = offeredEnergy
      ? getSpiritChannelingEnergyClue(config.requiredEnergy, offeredEnergy)
      : 'The spirits do not understand that offering.'
    if (energyClue) {
      return {
        success: false,
        outcome: 'wrong-offering',
        message: energyClue,
      }
    }

    const pokemon = await getOwnedPokemon(payload, user.id, parsed.data.pokemonId)
    if (!canPokemonChannel(pokemon, config.channelerMinLevel)) {
      return {
        success: false,
        outcome: 'weak-pokemon',
        message: 'Your Pokemon is unable to commune with the spirits.',
      }
    }

    const nextInventory = { ...inventory }
    for (const [itemId, quantity] of Object.entries(aggregatedOfferings)) {
      nextInventory[itemId] = Math.max(0, (nextInventory[itemId] || 0) - quantity)
      if (nextInventory[itemId] <= 0) delete nextInventory[itemId]
    }
    await setUserInventoryMap(payload as any, user.id, nextInventory)

    const { summary } = await grantRewards(user.id, config.rewards, {
      source: activityId,
      skipDropChance: true,
    })
    await incrementUserActivityResult(payload as any, user.id, 'researchEncounterResults', activityId, {
      wins: 1,
      metadata: {
        mementoItemId: config.mementoItemId,
        incenseItemId: parsed.data.incenseItemId,
        pokemonId: parsed.data.pokemonId,
      },
    })

    revalidatePath('/game/spirit-channeling')
    revalidatePath('/game/inventory')
    revalidatePath('/game/explore')

    const result: BeginSpiritChannelingResult = {
      success: true,
      outcome: 'success',
      message: 'The spirit answers your channeling.',
      summary,
    }
    await setIdempotentResult(idemKey, result, 30)
    return result
  } finally {
    await releaseActionLock(lock)
  }
}
