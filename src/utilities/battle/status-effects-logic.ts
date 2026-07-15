import type { BattlePokemon, StatStages } from './types'
import { StatusEffectId, type MoveSelfDamageConfig } from '@/data/moves/types'
import { STATUS_EFFECTS } from '@/data/moves/entries/status-effects'
import { applyHeldItemIfTriggered } from './held-items'
import { getHeldItemDefinition } from '@/utilities/pokemon/held-items'
import type { WeatherType } from '@/data/weather'
import type { TerrainType } from '@/data/terrain'
import { blocksStatusByWeather } from './weather-effects'
import {
  blocksBattleStatusByAbility,
  getBattleAbilityStatusCounterStep,
  bypassesBattleStatusApplicationByAbility,
} from './abilities'
import { blocksStatusByTerrain } from './terrain-effects'

// --- Status Effects Logic ---

export { STATUS_EFFECTS }

export function canApplyStatus(
  pokemon: BattlePokemon,
  statusId: StatusEffectId,
  weather?: WeatherType,
  options?: {
    force?: boolean
    terrain?: TerrainType
    sourcePokemon?: BattlePokemon
  },
): boolean {
  if (pokemon.status && !options?.force) return false // Already has a status (non-volatile)
  if (blocksStatusByWeather(statusId, weather)) return false
  if (
    !options?.force &&
    blocksStatusByTerrain({
      pokemon,
      statusId,
      terrain: options?.terrain,
    })
  ) {
    return false
  }
  if (
    !options?.force &&
    blocksBattleStatusByAbility(pokemon, statusId, weather)
  ) {
    return false
  }

  // Check Type Immunity
  const config = STATUS_EFFECTS[statusId]
  if (config?.immuneTypes) {
    if (
      options?.sourcePokemon &&
        bypassesBattleStatusApplicationByAbility({
          sourcePokemon: options.sourcePokemon,
          statusId,
        })
      ) {
      return true
    }

    const pokemonTypes = pokemon.types.map((t) => t.toLowerCase())
    if (config.immuneTypes.some((t) => pokemonTypes.includes(t.toLowerCase())))
      return false
  }
  return true
}

export function applyStatus(
  pokemon: BattlePokemon,
  statusId: StatusEffectId,
  weather?: WeatherType,
  options?: {
    force?: boolean
    terrain?: TerrainType
    sourcePokemon?: BattlePokemon
  },
): { applied: boolean; message: string } {
  if (!canApplyStatus(pokemon, statusId, weather, options))
    return { applied: false, message: '' }

  const config = STATUS_EFFECTS[statusId]
  if (!config) return { applied: false, message: '' }

  pokemon.status = {
    id: statusId,
    counter: 0,
  }

  if (statusId === 'sleep') {
    pokemon.status.counter = Math.floor(Math.random() * 3) + 2 // 2-4 turns
  } else if (statusId === 'confusion') {
    pokemon.status.counter = Math.floor(Math.random() * 4) + 2 // 2-5 turns
  } else if (statusId === 'bad-poison') {
    pokemon.status.counter = 1
  }

  let message = `${pokemon.name} was inflicted with ${config.name}! [icon:status:${statusId}]`
  const heldItemResult = applyHeldItemIfTriggered(pokemon, 'status')
  if (heldItemResult.applied) {
    message += `\n${heldItemResult.message}`
  }

  return { applied: true, message }
}

export interface MoveSelfDamageResult {
  applied: boolean
  damage: number
  message: string
}

export interface MoveAbsorbHealingResult {
  applied: boolean
  healing: number
  message: string
}

function normalizeSelfDamageChance(chance: number | undefined): number {
  if (chance === undefined) return 100
  return Math.max(0, Math.min(100, chance))
}

export function applyMoveSelfDamage(
  pokemon: BattlePokemon,
  selfDamage: MoveSelfDamageConfig | undefined,
  random: () => number = Math.random,
): MoveSelfDamageResult {
  if (!selfDamage) {
    return { applied: false, damage: 0, message: '' }
  }

  const chance = normalizeSelfDamageChance(selfDamage.chance)
  if (random() * 100 >= chance) {
    return { applied: false, damage: 0, message: '' }
  }

  const fraction = selfDamage.fraction ?? 1
  if (!Number.isFinite(fraction) || fraction <= 0) {
    return { applied: false, damage: 0, message: '' }
  }

  const damage = Math.max(1, Math.ceil(pokemon.maxHp / fraction))
  pokemon.currentHp = Math.max(0, pokemon.currentHp - damage)

  return {
    applied: true,
    damage,
    message: `${pokemon.name} hurt itself! [icon:damage:${damage}]`,
  }
}

export function applyMoveAbsorbHealing(
  pokemon: BattlePokemon,
  damageDealt: number,
  absorbPercent: number | undefined,
): MoveAbsorbHealingResult {
  if (
    absorbPercent === undefined ||
    !Number.isFinite(absorbPercent) ||
    absorbPercent <= 0 ||
    damageDealt <= 0 ||
    pokemon.currentHp <= 0 ||
    pokemon.currentHp >= pokemon.maxHp
  ) {
    return { applied: false, healing: 0, message: '' }
  }

  const healing = Math.max(1, Math.floor((damageDealt * absorbPercent) / 100))
  const oldHp = pokemon.currentHp
  pokemon.currentHp = Math.min(pokemon.maxHp, pokemon.currentHp + healing)
  const actualHealing = pokemon.currentHp - oldHp

  if (actualHealing <= 0) {
    return { applied: false, healing: 0, message: '' }
  }

  return {
    applied: true,
    healing: actualHealing,
    message: `${pokemon.name} absorbed energy! [icon:heal:${actualHealing}]`,
  }
}

export function resolveBeforeMoveStatus(pokemon: BattlePokemon): {
  canMove: boolean
  message: string
  selfDamage: number
} {
  if (!pokemon.status || pokemon.currentHp <= 0) {
    return { canMove: true, message: '', selfDamage: 0 }
  }

  const heldItemResult = applyHeldItemIfTriggered(pokemon, 'status')
  if (heldItemResult.applied) {
    return { canMove: true, message: heldItemResult.message, selfDamage: 0 }
  }

  if (!pokemon.status) {
    return { canMove: true, message: '', selfDamage: 0 }
  }

  const statusId = pokemon.status.id

  if (statusId === 'paralysis' && Math.random() < 0.25) {
    return {
      canMove: false,
      message: `${pokemon.name} is paralyzed! It can't move!`,
      selfDamage: 0,
    }
  }

  if (statusId === 'sleep') {
    pokemon.status.counter -= getBattleAbilityStatusCounterStep(pokemon, 'sleep')
    if (pokemon.status.counter <= 0) {
      pokemon.status = undefined
      return {
        canMove: true,
        message: `${pokemon.name} woke up!`,
        selfDamage: 0,
      }
    }

    return {
      canMove: false,
      message: `${pokemon.name} is fast asleep.`,
      selfDamage: 0,
    }
  }

  if (statusId === 'freeze') {
    if (Math.random() < 0.2) {
      pokemon.status = undefined
      return {
        canMove: true,
        message: `${pokemon.name} thawed out!`,
        selfDamage: 0,
      }
    }

    return {
      canMove: false,
      message: `${pokemon.name} is frozen solid!`,
      selfDamage: 0,
    }
  }

  if (statusId === 'confusion') {
    pokemon.status.counter -= 1
    if (pokemon.status.counter <= 0) {
      pokemon.status = undefined
      return {
        canMove: true,
        message: `${pokemon.name} snapped out of confusion!`,
        selfDamage: 0,
      }
    }

    if (Math.random() < 0.33) {
      const selfDamage = Math.max(1, Math.ceil(pokemon.maxHp / 8))
      pokemon.currentHp = Math.max(0, pokemon.currentHp - selfDamage)
      return {
        canMove: false,
        message: `${pokemon.name} hurt itself in its confusion! [icon:damage:${selfDamage}]`,
        selfDamage,
      }
    }
  }

  return { canMove: true, message: '', selfDamage: 0 }
}

export function handleShieldInteraction(
  defender: BattlePokemon,
  isSuperEffective: boolean,
  attackerWonStance: boolean,
): { damageMultiplier: number; message: string } {
  if (!defender.status) return { damageMultiplier: 1, message: '' }

  const id = defender.status.id
  // Check if it is a shield
  if (!id.includes('shield')) return { damageMultiplier: 1, message: '' }

  let shouldDowngrade = false
  const name = STATUS_EFFECTS[id].name

  if (id.startsWith('t-shield')) {
    if (isSuperEffective) shouldDowngrade = true
  } else if (id.startsWith('s-shield')) {
    if (attackerWonStance) shouldDowngrade = true
  } else {
    // Normal Shield
    shouldDowngrade = true
  }

  if (shouldDowngrade) {
    if (id.endsWith('-ex')) {
      defender.status.id = id.replace('-ex', '-plus') as StatusEffectId
      return {
        damageMultiplier: 0,
        message: `
${name} blocked the damage and weakened!`,
      }
    } else if (id.endsWith('-plus')) {
      const baseId = id.replace('-plus', '') as StatusEffectId
      defender.status.id = baseId
      return {
        damageMultiplier: 0,
        message: `
${name} blocked the damage and weakened!`,
      }
    } else {
      // Base Shield -> Remove
      defender.status = undefined
      return {
        damageMultiplier: 0,
        message: `
${name} blocked the damage and broke!`,
      }
    }
  } else {
    return {
      damageMultiplier: 0,
      message: `
${name} blocked the damage completely!`,
    }
  }
}

export function resolveStatusEffects(pokemon: BattlePokemon): {
  damage: number
  message: string
  cleared: boolean
} {
  if (!pokemon.status) return { damage: 0, message: '', cleared: false }

  const statusId = pokemon.status.id as StatusEffectId
  const config = STATUS_EFFECTS[statusId] || STATUS_EFFECTS[pokemon.status.id]
  if (!config) return { damage: 0, message: '', cleared: false }

  let damage = 0
  let message = ''
  let cleared = false

  // Damage Logic
  if (config.damagePerTurn) {
    damage = Math.floor(pokemon.maxHp * config.damagePerTurn)
    if (damage < 1) damage = 1
    message = `${pokemon.name} is hurt by [icon:status:${statusId}][icon:damage:${damage}]`
  }

  // Healing Logic
  if (config.healingPerTurn) {
    const healAmount = Math.floor(pokemon.maxHp * config.healingPerTurn)
    const oldHp = pokemon.currentHp
    pokemon.currentHp = Math.min(pokemon.maxHp, pokemon.currentHp + healAmount)
    const actualHeal = pokemon.currentHp - oldHp
    if (actualHeal > 0) {
      message = `${pokemon.name} restored HP from [icon:status:${statusId}][icon:heal:${actualHeal}]`
    }
  }

  // Counter / Turn Logic
  if (pokemon.status.id === 'sleep') {
    pokemon.status.counter -= getBattleAbilityStatusCounterStep(pokemon, 'sleep')
    if (pokemon.status.counter <= 0) {
      pokemon.status = undefined // Wake up
      cleared = true
      message = `${pokemon.name} woke up!`
    } else {
      message = `${pokemon.name} is fast asleep. [icon:status:sleep]`
    }
  }

  return { damage, message, cleared }
}

export function attemptHeldAttackStatus(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  attackType: string | undefined,
  random: () => number = Math.random,
): { applied: boolean; message: string } {
  if (!attackType) return { applied: false, message: '' }
  if (
    attacker.currentHp <= 0 ||
    (attacker.pokemonResearchLevel !== undefined &&
      attacker.pokemonResearchLevel < 1)
  ) {
    return { applied: false, message: '' }
  }

  const itemId = attacker.heldItem?.id || attacker.heldItemId || null
  const item = getHeldItemDefinition(itemId)
  const effect = item?.heldConfig.effect

  if (
    !item ||
    effect?.type !== 'attack-status-chance' ||
    !effect.statusId ||
    effect.attackType?.toLowerCase() !== attackType.toLowerCase()
  ) {
    return { applied: false, message: '' }
  }

  if (random() * 100 >= (effect.statusChance ?? 100)) {
    return { applied: false, message: '' }
  }

  const result = applyStatus(defender, effect.statusId as StatusEffectId, undefined, {
    sourcePokemon: attacker,
  })
  if (!result.applied) return result

  return {
    applied: true,
    message: `${attacker.name}'s ${item.name} spread poison!\n${result.message}`,
  }
}
