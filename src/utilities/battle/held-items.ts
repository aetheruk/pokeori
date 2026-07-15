import type { BattlePokemon, BattleState } from './types'
import { items } from '@/data/items'
import type { HeldItemConfig } from '@/data/items'
import { applyBattleItemEffect } from './item-effects'
import { getHeldItemDefinition } from '@/utilities/pokemon/held-items'
import {
  applyBattleBerryConsumedAbilityEffects,
  getBattleConsumedBerryRestoreChance,
  getBattleBerryEffectMultiplier,
  getBattleBerryTriggerThresholdPercent,
  suppressesBattleHeldItemEffectsByAbility,
} from './abilities'
import type { WeatherType } from '@/data/weather'

export type HeldItemTriggerContext = 'hp' | 'status'

export interface HeldItemUseResult {
  applied: boolean
  message: string
  itemId?: string
}

export interface HeldDamageBlockResult {
  damage: number
  blocked: number
  applied: boolean
  message: string
  itemId?: string
}

function statusMatches(
  currentStatus: string | undefined,
  configuredStatus: string | string[] | 'all',
): boolean {
  if (!currentStatus) return false
  if (configuredStatus === 'all') return true
  if (Array.isArray(configuredStatus))
    return configuredStatus.includes(currentStatus)
  return configuredStatus === currentStatus
}

function getHeldItemId(pokemon: BattlePokemon): string | null {
  return (
    pokemon.heldItem?.id ||
    ((pokemon as any).heldItemId as string | undefined) ||
    null
  )
}

function shouldConsumeHeldItem(
  config: HeldItemConfig,
  random: () => number = Math.random,
): boolean {
  if (!config.consumeOnUse) return false
  const consumeChance = config.consumeChance ?? 100
  return random() * 100 < consumeChance
}

function clearRuntimeHeldItem(pokemon: BattlePokemon) {
  const hadHeldItem = Boolean(getHeldItemId(pokemon))
  pokemon.heldItem = undefined
  pokemon.heldItemId = null
  pokemon.heldItemBattleOnly = undefined
  pokemon.itemCharge = 0
  if (hadHeldItem) {
    pokemon.battleAbilityState ??= {}
    pokemon.battleAbilityState.heldItemLost = true
  }
}

function markHeldItemConsumed(
  pokemon: BattlePokemon,
  item: { id: string; name: string },
  options: { forceClear?: boolean } = {},
) {
  pokemon.consumedHeldItems ??= []
  pokemon.consumedHeldItems.push({
    itemId: item.id,
    name: item.name,
    persistent: pokemon.heldItemBattleOnly ? false : undefined,
    forceClear: options.forceClear || undefined,
  })
}

function attackTypeMatches(
  attackType: string | undefined,
  configuredType: string | undefined,
): boolean {
  if (!configuredType) return true
  if (!attackType) return false
  return attackType.toLowerCase() === configuredType.toLowerCase()
}

export function createRuntimeHeldItem(itemId: string | null | undefined):
  | {
      id: string
      name: string
    }
  | undefined {
  const item = getHeldItemDefinition(itemId)
  return item ? { id: item.id, name: item.name } : undefined
}

function shouldTriggerHeldItem(
  pokemon: BattlePokemon,
  context: HeldItemTriggerContext,
): boolean {
  if (
    pokemon.pokemonResearchLevel !== undefined &&
    pokemon.pokemonResearchLevel < 1
  ) {
    return false
  }

  const item = getHeldItemDefinition(getHeldItemId(pokemon))
  if (!item || pokemon.currentHp <= 0) return false
  if (suppressesBattleHeldItemEffectsByAbility(pokemon)) return false

  const trigger = item.heldConfig.trigger

  if (context === 'hp') {
    if (trigger.type !== 'hp-at-or-below') return false
    const thresholdPercent =
      item.category === 'berry'
        ? getBattleBerryTriggerThresholdPercent(
            pokemon,
            trigger.thresholdPercent,
          )
        : trigger.thresholdPercent
    const thresholdHp = Math.floor(
      pokemon.maxHp * (thresholdPercent / 100),
    )
    return (
      pokemon.currentHp > 0 && pokemon.currentHp <= Math.max(1, thresholdHp)
    )
  }

  if (context === 'status') {
    if (trigger.type !== 'status') return false
    return statusMatches(pokemon.status?.id, trigger.status)
  }

  return false
}

function applyBerryEffectMultiplier(
  pokemon: BattlePokemon,
  item: NonNullable<ReturnType<typeof getHeldItemDefinition>>,
): HeldItemConfig['effect'] {
  const effect = item.heldConfig.effect
  if (item.category !== 'berry' || effect.type !== 'heal' || !effect.healAmount) {
    return effect
  }

  const multiplier = getBattleBerryEffectMultiplier(pokemon)
  if (multiplier === 1) return effect

  return {
    ...effect,
    healAmount: Math.max(1, Math.floor(effect.healAmount * multiplier)),
  }
}

export function applyHeldItemIfTriggered(
  pokemon: BattlePokemon,
  context: HeldItemTriggerContext,
  random: () => number = Math.random,
): HeldItemUseResult {
  const item = getHeldItemDefinition(getHeldItemId(pokemon))
  if (!item || !shouldTriggerHeldItem(pokemon, context)) {
    return { applied: false, message: '' }
  }

  const effectResult = applyBattleItemEffect({
    pokemon,
    battleEffect: applyBerryEffectMultiplier(pokemon, item),
  })

  if (!effectResult.applied) {
    return { applied: false, message: '' }
  }

  if (item.heldConfig.consumeOnUse) {
    if (shouldConsumeHeldItem(item.heldConfig, random)) {
      markHeldItemConsumed(pokemon, item)
    }
    clearRuntimeHeldItem(pokemon)
  }

  const abilityMessages =
    item.category === 'berry' && item.heldConfig.consumeOnUse
      ? applyBattleBerryConsumedAbilityEffects(pokemon)
      : []

  return {
    applied: true,
    itemId: item.id,
    message: [
      `${pokemon.name} used its ${item.name}!`,
      effectResult.message,
      ...abilityMessages,
    ]
      .filter(Boolean)
      .join('\n'),
  }
}

export function applyHeldDamageBlock(
  pokemon: BattlePokemon,
  incomingDamage: number,
  random: () => number = Math.random,
): HeldDamageBlockResult {
  const item = getHeldItemDefinition(getHeldItemId(pokemon))
  if (
    item?.heldConfig.trigger.type !== 'permanent' ||
    item.heldConfig.effect.type !== 'damage-block' ||
    suppressesBattleHeldItemEffectsByAbility(pokemon) ||
    incomingDamage <= 0 ||
    pokemon.currentHp <= 0 ||
    (pokemon.pokemonResearchLevel !== undefined && pokemon.pokemonResearchLevel < 1)
  ) {
    return {
      damage: incomingDamage,
      blocked: 0,
      applied: false,
      message: '',
    }
  }

  const blocked = Math.min(incomingDamage, item.heldConfig.effect.blockAmount || 0)
  if (blocked <= 0) {
    return {
      damage: incomingDamage,
      blocked: 0,
      applied: false,
      message: '',
    }
  }

  const consumed = shouldConsumeHeldItem(item.heldConfig, random)
  if (consumed) markHeldItemConsumed(pokemon, item)
  clearRuntimeHeldItem(pokemon)

  return {
    damage: Math.max(0, incomingDamage - blocked),
    blocked,
    applied: true,
    itemId: item.id,
    message: consumed
      ? `${pokemon.name}'s ${item.name} broke and blocked ${blocked} damage!`
      : `${pokemon.name}'s ${item.name} blocked ${blocked} damage! ${pokemon.name} drops the stone.`,
  }
}

export function getHeldAttackDamageMultiplier(
  pokemon: BattlePokemon,
  attackType?: string,
): number {
  const item = getHeldItemDefinition(getHeldItemId(pokemon))
  const effect = item?.heldConfig.effect
  const boostedAttackType = effect?.attackType ?? effect?.pokemonType

  if (
    !item ||
    suppressesBattleHeldItemEffectsByAbility(pokemon) ||
    effect?.type !== 'type-damage-boost' ||
    pokemon.currentHp <= 0 ||
    (pokemon.pokemonResearchLevel !== undefined && pokemon.pokemonResearchLevel < 1) ||
    !attackTypeMatches(attackType, boostedAttackType)
  ) {
    return 1
  }

  return Math.max(0, effect.damageMultiplier ?? 1)
}

export function applyHeldAttackBreak(
  pokemon: BattlePokemon,
  attackTypeOrRandom?: string | (() => number),
  randomArg?: () => number,
): HeldItemUseResult {
  const attackType =
    typeof attackTypeOrRandom === 'string' ? attackTypeOrRandom : undefined
  const random =
    typeof attackTypeOrRandom === 'function'
      ? attackTypeOrRandom
      : randomArg || Math.random
  const item = getHeldItemDefinition(getHeldItemId(pokemon))
  if (
    !item?.heldConfig.consumeOnUse ||
    item.heldConfig.consumeTrigger !== 'attack' ||
    getHeldAttackDamageMultiplier(pokemon, attackType) <= 1 ||
    pokemon.currentHp <= 0 ||
    (pokemon.pokemonResearchLevel !== undefined && pokemon.pokemonResearchLevel < 1)
  ) {
    return { applied: false, message: '' }
  }

  if (!shouldConsumeHeldItem(item.heldConfig, random)) {
    return { applied: false, message: '' }
  }

  markHeldItemConsumed(pokemon, item)
  clearRuntimeHeldItem(pokemon)

  return {
    applied: true,
    itemId: item.id,
    message: `${pokemon.name}'s ${item.name} broke!`,
  }
}

function getPersistentOwnerId(pokemon: BattlePokemon): string | null {
  if (!pokemon.id || pokemon.id.startsWith('enemy-')) return null
  if (pokemon.id.startsWith('chronicle:')) return null
  if (!pokemon.user || pokemon.user === 'enemy') return null
  return typeof pokemon.user === 'object' ? (pokemon.user as any).id || null : pokemon.user
}

function isHourInWindow(hour: number, window: { startHour: number; endHour: number }): boolean {
  const start = Math.max(0, Math.min(23, Math.floor(window.startHour)))
  const end = Math.max(0, Math.min(24, Math.floor(window.endHour)))
  if (start === end) return true
  if (start < end) return hour >= start && hour < end
  return hour >= start || hour < end
}

function resolveChargeRewardItemId(
  effect: NonNullable<ReturnType<typeof getHeldItemDefinition>>['heldConfig']['effect'],
  now: Date,
): string | undefined {
  const hour = now.getHours()
  const windowReward = effect.rewardWindows?.find((window) =>
    isHourInWindow(hour, window),
  )
  return windowReward?.rewardItemId || effect.rewardItemId
}

export function applyHeldItemChargeOnHit(params: {
  state?: BattleState
  pokemon: BattlePokemon
  attackType?: string
  damage: number
  now?: Date
}): HeldItemUseResult {
  const { state, pokemon, attackType, damage } = params
  const now = params.now || new Date()
  const item = getHeldItemDefinition(getHeldItemId(pokemon))
  const effect = item?.heldConfig.effect
  const hour = now.getHours()
  if (
    item?.heldConfig.trigger.type !== 'permanent' ||
    effect?.type !== 'item-charge' ||
    suppressesBattleHeldItemEffectsByAbility(pokemon) ||
    (effect.chargeOn !== 'hit-by-type' && effect.chargeOn !== 'damage-during-time') ||
    damage <= 0 ||
    (effect.chargeOn === 'hit-by-type' && !attackTypeMatches(attackType, effect.attackType)) ||
    (effect.chargeActiveWindow && !isHourInWindow(hour, effect.chargeActiveWindow)) ||
    (pokemon.pokemonResearchLevel !== undefined && pokemon.pokemonResearchLevel < 1)
  ) {
    return { applied: false, message: '' }
  }

  const maxCharge = Math.max(1, effect.maxCharge ?? 100)
  const nextCharge = Math.min(
    maxCharge,
    Math.max(0, pokemon.itemCharge || 0) + Math.max(1, effect.chargeAmount ?? 1),
  )
  pokemon.itemCharge = nextCharge

  if (nextCharge < maxCharge) {
    return {
      applied: true,
      itemId: item.id,
      message: `${pokemon.name}'s ${item.name} charged to ${nextCharge}%.`,
    }
  }

  const rewardItemId = resolveChargeRewardItemId(effect, now)
  const ownerId = getPersistentOwnerId(pokemon)
  if (ownerId && rewardItemId && pokemon.id) {
    if (state) {
      state.heldItemChargeRewards ??= []
      state.heldItemChargeRewards.push({
        ownerId,
        pokemonId: pokemon.id,
        itemId: rewardItemId,
        quantity: 1,
      })
    }
  }

  if (effect.consumeHeldItem !== false) {
    markHeldItemConsumed(pokemon, item, { forceClear: true })
    clearRuntimeHeldItem(pokemon)
  } else {
    pokemon.itemCharge = 0
  }

  const reward =
    items.find((entry) => entry.id === rewardItemId)?.name ||
    rewardItemId ||
    'item'
  return {
    applied: true,
    itemId: item.id,
    message: `${pokemon.name}'s ${item.name} reached full charge and produced ${reward}!`,
  }
}

export function restoreConsumedBerryByAbility(
  pokemon: BattlePokemon,
  weather?: WeatherType,
  random: () => number = Math.random,
): HeldItemUseResult {
  if (
    getHeldItemId(pokemon) ||
    pokemon.currentHp <= 0 ||
    suppressesBattleHeldItemEffectsByAbility(pokemon)
  ) {
    return { applied: false, message: '' }
  }

  const restoreChance = getBattleConsumedBerryRestoreChance(pokemon, weather)
  if (restoreChance <= 0 || random() * 100 >= restoreChance) {
    return { applied: false, message: '' }
  }

  const consumed = pokemon.consumedHeldItems || []
  for (let index = consumed.length - 1; index >= 0; index -= 1) {
    const consumedItem = consumed[index]
    if (!consumedItem) continue
    const item = getHeldItemDefinition(consumedItem.itemId)
    if (item?.category !== 'berry') continue

    consumed.splice(index, 1)
    pokemon.heldItem = { id: item.id, name: item.name }
    pokemon.heldItemId = item.id
    pokemon.heldItemBattleOnly = consumedItem.persistent === false || undefined
    pokemon.itemCharge = 0
    if (pokemon.battleAbilityState) {
      pokemon.battleAbilityState.heldItemLost = false
    }

    return {
      applied: true,
      itemId: item.id,
      message: `${pokemon.name}'s ability restored its ${item.name}!`,
    }
  }

  return { applied: false, message: '' }
}

export function consumeHeldItemMessages(
  pokemon: BattlePokemon,
  context: HeldItemTriggerContext,
): string[] {
  const result = applyHeldItemIfTriggered(pokemon, context)
  return result.applied ? [result.message] : []
}
