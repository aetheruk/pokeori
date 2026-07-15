import { items, type Item, type PokemonStatType } from '@/data/items'

export type HeldItemDefinition = Item & {
  heldConfig: NonNullable<Item['heldConfig']>
}

export function isHeldItemDefinition(item: Item | undefined): item is HeldItemDefinition {
  return !!item?.heldConfig
}

export function getHeldItemDefinition(
  itemId: string | null | undefined,
): HeldItemDefinition | null {
  if (!itemId) return null
  const item = items.find((entry) => entry.id === itemId)
  return isHeldItemDefinition(item) ? item : null
}

export function getHeldItemOptions(inventory: Record<string, number>): HeldItemDefinition[] {
  return items.filter(
    (item): item is HeldItemDefinition =>
      isHeldItemDefinition(item) && (inventory[item.id] || 0) > 0,
  )
}

export const HELD_ITEM_STAT_LABELS: Record<PokemonStatType, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  specialAttack: 'Sp. Atk',
  specialDefense: 'Sp. Def',
  speed: 'Speed',
}

export function getHeldItemTrainingEffect(itemId: string | null | undefined):
  | {
      item: HeldItemDefinition
      stat: PokemonStatType
      statPenaltyPercent: number
      evAmount: number
    }
  | null {
  const item = getHeldItemDefinition(itemId)
  const effect = item?.heldConfig.effect
  if (!item || effect?.type !== 'ev-training' || !effect.trainingStat) {
    return null
  }

  return {
    item,
    stat: effect.trainingStat,
    statPenaltyPercent: effect.statPenaltyPercent ?? 0,
    evAmount: effect.evAmount ?? 1,
  }
}

export function applyHeldItemStatModifiers<T extends Record<PokemonStatType, number>>(
  stats: T,
  itemId: string | null | undefined,
): T {
  const trainingEffect = getHeldItemTrainingEffect(itemId)
  if (!trainingEffect || trainingEffect.statPenaltyPercent <= 0) return stats

  const multiplier = Math.max(0, 1 - trainingEffect.statPenaltyPercent / 100)
  return {
    ...stats,
    [trainingEffect.stat]: Math.max(
      1,
      Math.floor((stats[trainingEffect.stat] || 0) * multiplier),
    ),
  }
}

export function formatHeldItemTrigger(item: HeldItemDefinition): string {
  const trigger = item.heldConfig.trigger
  const effect = item.heldConfig.effect

  const trainingEffect = getHeldItemTrainingEffect(item.id)
  if (trainingEffect) {
    const statName = HELD_ITEM_STAT_LABELS[trainingEffect.stat]
    return `Lowers ${statName} by ${trainingEffect.statPenaltyPercent}% in battle; grants ${trainingEffect.evAmount} ${statName} EV on wins`
  }

  if (trigger.type === 'hp-at-or-below') {
    return `Heals your pokemon when injured`
  }

  if (trigger.type === 'status') {
    if (trigger.status === 'all') return 'Heals any status'
    const statuses = Array.isArray(trigger.status) ? trigger.status : [trigger.status]
    return `Immediately heals ${statuses.join(', ')}`
  }

  if (item.heldConfig.effect.type === 'damage-block') {
    return `Blocks up to ${item.heldConfig.effect.blockAmount || 0} damage once`
  }

  if (item.id.endsWith('-memory') && effect.type === 'type-damage-boost' && effect.pokemonType) {
    const label =
      effect.pokemonType.charAt(0).toUpperCase() +
      effect.pokemonType.slice(1)
    return `Changes Multi-Attack and Silvally form to ${label}`
  }

  if (item.id.endsWith('-drive') && effect.type === 'type-damage-boost' && effect.pokemonType) {
    const label =
      effect.pokemonType.charAt(0).toUpperCase() +
      effect.pokemonType.slice(1)
    return `Changes Techno Blast and Genesect form to ${label}`
  }

  if (item.id.endsWith('-plate') && effect.type === 'type-damage-boost' && effect.pokemonType) {
    const label =
      effect.pokemonType.charAt(0).toUpperCase() +
      effect.pokemonType.slice(1)
    return `Changes Judgment and Arceus form to ${label}`
  }

  if (effect.type === 'type-damage-boost' && effect.pokemonType) {
    const percent = Math.round(((effect.damageMultiplier || 1) - 1) * 100)
    const sign = percent >= 0 ? '+' : ''
    const label =
      effect.pokemonType.charAt(0).toUpperCase() +
      effect.pokemonType.slice(1)
    return `${sign}${percent}% ${label} Damage`
  }

  if (effect.type === 'attack-status-chance' && effect.attackType &&
      typeof effect.statusChance === 'number' &&
      effect.statusId) {
    const label =
      effect.attackType.charAt(0).toUpperCase() +
      effect.attackType.slice(1)
    return `${effect.statusChance}% chance to ${effect.statusId} on ${label} moves`
  }

  if (effect.type === 'item-charge' && effect.chargeOn === 'damage-during-time') {
    return `Gains ${effect.chargeAmount || 1}% charge from damage during its active time`
  }

  if (effect.type === 'item-charge' && effect.attackType) {
    const label =
      effect.attackType.charAt(0).toUpperCase() +
      effect.attackType.slice(1)
    return `Gains ${effect.chargeAmount || 1}% charge when hit by ${label} attacks`
  }

  return 'Permanent effect'
}
