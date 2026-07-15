import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import { calculateStats } from '@/utilities/battle/stats-calc'
import {
  getHeldItemDefinition,
  getHeldItemTrainingEffect,
} from '@/utilities/pokemon/held-items'
import { getUserInventoryMap, setUserInventoryMap } from '@/utilities/user-state'

const EV_CAP = 255

function getPersistentPokemonId(pokemon: BattlePokemon): string | null {
  if (!pokemon.id || pokemon.id.startsWith('enemy-')) return null
  if (pokemon.id.startsWith('chronicle:')) return null
  if (!pokemon.user || pokemon.user === 'enemy') return null
  return pokemon.id
}

function getRuntimeHeldItemId(pokemon: BattlePokemon): string | null {
  return pokemon.heldItem?.id || pokemon.heldItemId || null
}

function shouldConsumeHeldItemOnWin(
  item: NonNullable<ReturnType<typeof getHeldItemDefinition>>,
  random: () => number,
): boolean {
  if (!item.heldConfig.consumeOnUse) return false
  if (item.heldConfig.consumeTrigger !== 'battle-win') return false
  return random() * 100 < (item.heldConfig.consumeChance ?? 100)
}

function markHeldItemConsumed(
  pokemon: BattlePokemon,
  item: { id: string; name: string },
) {
  pokemon.consumedHeldItems ??= []
  pokemon.consumedHeldItems.push({
    itemId: item.id,
    name: item.name,
    persistent: pokemon.heldItemBattleOnly ? false : undefined,
  })
  pokemon.heldItem = undefined
  pokemon.heldItemId = null
  pokemon.heldItemBattleOnly = undefined
  pokemon.itemCharge = 0
}

export interface HeldItemBattleWinEffect {
  pokemonId: string
  itemId: string
  itemName: string
  stat: 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed'
  amount: number
  consumed: boolean
}

interface ConsumedHeldItemRecord {
  pokemonId: string
  ownerId: string
  itemId: string
  persistent?: boolean
  forceClear?: boolean
}

export function resolveConsumedHeldItemPersistence(
  consumedItems: ConsumedHeldItemRecord[],
  inventoriesByOwner: Record<string, Record<string, number>>,
): {
  inventoriesByOwner: Record<string, Record<string, number>>
  heldItemIdsByPokemon: Record<string, string | null>
} {
  const latestConsumedByPokemon = new Map<string, ConsumedHeldItemRecord>()
  for (const consumedItem of consumedItems) {
    if (consumedItem.persistent === false) continue
    latestConsumedByPokemon.set(consumedItem.pokemonId, consumedItem)
  }

  const nextInventoriesByOwner = Object.fromEntries(
    Object.entries(inventoriesByOwner).map(([ownerId, inventory]) => [
      ownerId,
      { ...inventory },
    ]),
  )
  const heldItemIdsByPokemon: Record<string, string | null> = {}

  for (const consumedItem of latestConsumedByPokemon.values()) {
    const inventory = nextInventoriesByOwner[consumedItem.ownerId] ?? {}
    nextInventoriesByOwner[consumedItem.ownerId] = inventory

    if (consumedItem.forceClear) {
      heldItemIdsByPokemon[consumedItem.pokemonId] = null
      continue
    }

    const quantity = inventory[consumedItem.itemId] || 0
    if (quantity > 0) {
      const nextQuantity = quantity - 1
      if (nextQuantity > 0) {
        inventory[consumedItem.itemId] = nextQuantity
      } else {
        delete inventory[consumedItem.itemId]
      }
      heldItemIdsByPokemon[consumedItem.pokemonId] = consumedItem.itemId
    } else {
      heldItemIdsByPokemon[consumedItem.pokemonId] = null
    }
  }

  return { inventoriesByOwner: nextInventoriesByOwner, heldItemIdsByPokemon }
}

export function collectHeldItemBattleWinEffects(
  team: BattlePokemon[],
  random: () => number = Math.random,
): HeldItemBattleWinEffect[] {
  const effects: HeldItemBattleWinEffect[] = []

  for (const pokemon of team) {
    const pokemonId = getPersistentPokemonId(pokemon)
    if (!pokemonId) continue

    const trainingEffect = getHeldItemTrainingEffect(getRuntimeHeldItemId(pokemon))
    if (!trainingEffect) continue

    const currentEv = pokemon.evs?.[trainingEffect.stat] ?? 0
    if (currentEv >= EV_CAP) continue

    const amount = Math.min(trainingEffect.evAmount, EV_CAP - currentEv)
    if (amount <= 0) continue

    const consumed = shouldConsumeHeldItemOnWin(trainingEffect.item, random)
    if (consumed) markHeldItemConsumed(pokemon, trainingEffect.item)

    effects.push({
      pokemonId,
      itemId: trainingEffect.item.id,
      itemName: trainingEffect.item.name,
      stat: trainingEffect.stat,
      amount,
      consumed,
    })
  }

  return effects
}

export async function persistHeldItemBattleWinEffects(
  team: BattlePokemon[],
  random: () => number = Math.random,
): Promise<HeldItemBattleWinEffect[]> {
  const effects = collectHeldItemBattleWinEffects(team, random)
  if (effects.length === 0) return effects

  const payload = await getPayload({ config: configPromise })
  await Promise.all(
    effects.map(async (effect) => {
      const pokemon = await payload.findByID({
        collection: 'pokemon',
        id: effect.pokemonId,
        depth: 0,
      })

      const currentEv = pokemon.evs?.[effect.stat] ?? 0
      const nextEv = Math.min(EV_CAP, currentEv + effect.amount)
      if (nextEv === currentEv) return

      const updatedEvs = {
        ...pokemon.evs,
        [effect.stat]: nextEv,
      }
      const stats = calculateStats({
        ...pokemon,
        evs: updatedEvs,
        stats: undefined,
      })

      await payload.update({
        collection: 'pokemon',
        id: effect.pokemonId,
        data: {
          evs: updatedEvs,
          stats,
        },
        depth: 0,
      })
    }),
  )

  return effects
}

export async function persistConsumedHeldItems(
  state: BattleState,
): Promise<void> {
  if (state.chronicle) return
  if (state.status === 'ongoing') return

  const consumedItems: ConsumedHeldItemRecord[] = []
  const chargeUpdatesByPokemon: Record<string, number> = {}
  const allPokemon = [...(state.playerTeam || []), ...(state.enemyTeam || [])]

  for (const pokemon of allPokemon) {
    const pokemonId = getPersistentPokemonId(pokemon)
    const ownerId =
      typeof pokemon.user === 'object'
        ? (pokemon.user as any).id
        : pokemon.user
    if (pokemonId && typeof pokemon.itemCharge === 'number') {
      chargeUpdatesByPokemon[pokemonId] = Math.max(0, Math.min(100, pokemon.itemCharge || 0))
    }
    if (!pokemon.consumedHeldItems?.length) continue
    const consumedItem = [...pokemon.consumedHeldItems]
      .reverse()
      .find((item) => item.persistent !== false)
    if (
      pokemonId &&
      typeof ownerId === 'string' &&
      ownerId !== 'enemy' &&
      consumedItem?.itemId
    ) {
      consumedItems.push({
        pokemonId,
        ownerId,
        itemId: consumedItem.itemId,
        forceClear: consumedItem.forceClear,
      })
    }
    pokemon.consumedHeldItems = []
  }

  const chargeRewards = state.heldItemChargeRewards || []
  if (
    consumedItems.length === 0 &&
    chargeRewards.length === 0 &&
    Object.keys(chargeUpdatesByPokemon).length === 0
  ) {
    return
  }

  const payload = await getPayload({ config: configPromise })
  const ownerIds = [
    ...new Set([
      ...consumedItems.map((item) => item.ownerId),
      ...chargeRewards.map((reward) => reward.ownerId),
    ]),
  ]
  const inventoriesByOwner = Object.fromEntries(
    await Promise.all(
      ownerIds.map(async (ownerId) => [
        ownerId,
        await getUserInventoryMap(payload as any, ownerId),
      ]),
    ),
  )
  const resolved = resolveConsumedHeldItemPersistence(
    consumedItems,
    inventoriesByOwner,
  )

  for (const reward of chargeRewards) {
    const inventory = resolved.inventoriesByOwner[reward.ownerId] ?? {}
    resolved.inventoriesByOwner[reward.ownerId] = inventory
    inventory[reward.itemId] = (inventory[reward.itemId] || 0) + Math.max(1, reward.quantity || 1)
  }

  await Promise.all(
    ownerIds.map((ownerId) =>
      setUserInventoryMap(payload as any, ownerId, resolved.inventoriesByOwner[ownerId] || {}),
    ),
  )
  const pokemonUpdates = new Map<string, { heldItemId?: string | null; itemCharge?: number }>()
  for (const [pokemonId, itemCharge] of Object.entries(chargeUpdatesByPokemon)) {
    pokemonUpdates.set(pokemonId, { itemCharge })
  }
  for (const [pokemonId, heldItemId] of Object.entries(resolved.heldItemIdsByPokemon)) {
    pokemonUpdates.set(pokemonId, {
      ...(pokemonUpdates.get(pokemonId) || {}),
      heldItemId,
      itemCharge: heldItemId ? pokemonUpdates.get(pokemonId)?.itemCharge ?? 0 : 0,
    })
  }
  await Promise.all(
    [...pokemonUpdates.entries()].map(([pokemonId, data]) =>
      payload.update({
        collection: 'pokemon',
        id: pokemonId,
        data,
        depth: 0,
      }),
    ),
  )
  state.heldItemChargeRewards = []
}
