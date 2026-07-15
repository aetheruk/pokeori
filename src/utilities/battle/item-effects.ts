import type { BattlePokemon, StatStages } from '@/utilities/battle/types'
import { DEFAULT_STAT_STAGES } from '@/utilities/battle/stats-calc'
import type { BattleEffect } from '@/data/items'

export interface BattleItemEffectResult {
  applied: boolean
  message: string
}

const STAT_NAMES: Record<string, string> = {
  attack: 'Attack',
  defense: 'Defense',
  specialAttack: 'Sp. Atk',
  specialDefense: 'Sp. Def',
  speed: 'Speed',
  crit: 'Critical Hit ratio',
}

function formatMessages(messages: string[]): string {
  return messages.filter(Boolean).join('\n')
}

function clearMatchingStatus(
  pokemon: BattlePokemon,
  clearStatus: NonNullable<BattleEffect['clearStatus']>,
): BattleItemEffectResult {
  if (!pokemon.status)
    return { applied: false, message: `${pokemon.name} is already healthy!` }

  const currentStatus = pokemon.status.id
  const statusMatches =
    clearStatus === 'all' ||
    (Array.isArray(clearStatus)
      ? clearStatus.includes(currentStatus)
      : clearStatus === currentStatus)

  if (!statusMatches)
    return { applied: false, message: "It won't have any effect." }

  pokemon.status = undefined
  return {
    applied: true,
    message: `${pokemon.name} was cured of ${currentStatus}!`,
  }
}

export function applyBattleItemEffect(params: {
  pokemon: BattlePokemon
  battleEffect: BattleEffect
}): BattleItemEffectResult {
  const { pokemon, battleEffect } = params
  const messages: string[] = []
  let applied = false

  if (pokemon.status?.id === 'vanished') {
    pokemon.status = undefined
    messages.push(`${pokemon.name} returned to the battle!`)
    applied = true
  }

  if (battleEffect.type === 'heal') {
    if (battleEffect.healFull) {
      const healedAmount = pokemon.maxHp - pokemon.currentHp
      if (healedAmount > 0) {
        pokemon.currentHp = pokemon.maxHp
        messages.push(`${pokemon.name} was fully healed! (+${healedAmount} HP)`)
        applied = true
      }
    }

    if (battleEffect.healAmount) {
      const actualHeal = Math.min(
        battleEffect.healAmount,
        pokemon.maxHp - pokemon.currentHp,
      )
      if (actualHeal > 0) {
        pokemon.currentHp = Math.min(
          pokemon.maxHp,
          pokemon.currentHp + battleEffect.healAmount,
        )
        messages.push(`${pokemon.name} was healed for ${actualHeal} HP!`)
        applied = true
      }
    }

    if (battleEffect.clearStatus) {
      const statusResult = clearMatchingStatus(
        pokemon,
        battleEffect.clearStatus,
      )
      if (statusResult.applied) {
        messages.push(statusResult.message)
        applied = true
      } else if (!applied) {
        return statusResult
      }
    }

    if (applied) return { applied: true, message: formatMessages(messages) }

    if (battleEffect.healFull || battleEffect.healAmount) {
      return {
        applied: false,
        message: `${pokemon.name} is already at full HP.`,
      }
    }
  }

  if (battleEffect.type === 'buff') {
    pokemon.statStages ??= { ...DEFAULT_STAT_STAGES }
    if (battleEffect.buffStat && battleEffect.buffStages) {
      const statKey = battleEffect.buffStat as keyof StatStages
      const currentStage = pokemon.statStages[statKey] || 0
      const maxStage = statKey === 'crit' ? 3 : 6
      const newStage = Math.min(
        maxStage,
        currentStage + battleEffect.buffStages,
      )
      if (newStage === currentStage) {
        if (applied) return { applied: true, message: formatMessages(messages) }
        return {
          applied: false,
          message: `${pokemon.name}'s ${STAT_NAMES[battleEffect.buffStat]} won't go any higher.`,
        }
      }

      pokemon.statStages[statKey] = newStage
      messages.push(
        `${pokemon.name}'s ${STAT_NAMES[battleEffect.buffStat]} rose!`,
      )
      return { applied: true, message: formatMessages(messages) }
    }
  }

  if (battleEffect.type === 'tera' && battleEffect.teraType) {
    pokemon.teraTypeOverride = battleEffect.teraType
    messages.push(
      `${pokemon.name}'s next attack will be ${
        battleEffect.teraType.charAt(0).toUpperCase() +
        battleEffect.teraType.slice(1)
      } type!`,
    )
    return {
      applied: true,
      message: formatMessages(messages),
    }
  }

  if (battleEffect.type === 'reveal-stance') {
    messages.push('The enemy stance was revealed!')
    return { applied: true, message: formatMessages(messages) }
  }

  if (battleEffect.clearStatus) {
    const statusResult = clearMatchingStatus(pokemon, battleEffect.clearStatus)
    if (statusResult.applied) {
      messages.push(statusResult.message)
      return { applied: true, message: formatMessages(messages) }
    }
    if (applied) return { applied: true, message: formatMessages(messages) }
    return statusResult
  }

  return {
    applied,
    message: formatMessages(messages) || "It won't have any effect.",
  }
}
