import { BattleState, BattlePokemon, BattleStance } from './types'
import { STATUS_EFFECTS } from '@/data/moves'
import { tickDisabledStance } from './stance-disable'
import { applyHeldItemIfTriggered, restoreConsumedBerryByAbility } from './held-items'
import { processEndTurnWeatherDamage } from './weather-effects'
import { processSecondaryStatusesForTurnEnd } from './secondary-statuses'
import { processDelayedMoveDamage } from './move-effects'
import { processTerrainTurnEffects } from './terrain-effects'
import {
  getBattleAbilityStatusTurnHeal,
  getBattleAbilityStatusTurnHealMessage,
  getBattleAbilityStatusTurnDamage,
  getBattleAbilityStatusTurnDamageMessage,
  getBattleIndirectDamageBlockMessage,
  processBattleAbilityEntryCopiesForState,
  processBattleAbilityTurnEndEffects,
  processBattleAbilityWeatherTurnEffects,
  processBattleAbilityWeatherTypeChangesForState,
} from './abilities'
import { processBattleRarityTurnEnd } from './rarity-effects'

export function processTurnEnd(state: BattleState): string[] {
  const messages = processEndTurnStatusDamage(state)
  messages.push(...processEndTurnWeatherDamageForState(state))
  messages.push(...processSecondaryStatusesForTurnEnd(state))
  messages.push(...processDelayedMoveDamage(state))
  messages.push(...processTerrainTurnEffects(state))
  const { playerTeam, enemyTeam, activePlayerIndex, activeEnemyIndex } = state
  const playerMon = playerTeam[activePlayerIndex]
  const enemyMon = enemyTeam[activeEnemyIndex]

  const playerStanceMessage = tickDisabledStance(playerMon, state.turn)
  if (playerStanceMessage) messages.push(playerStanceMessage)

  const enemyStanceMessage = tickDisabledStance(enemyMon, state.turn)
  if (enemyStanceMessage) messages.push(enemyStanceMessage)

  const playerBerryRestore = restoreConsumedBerryByAbility(
    playerMon,
    state.weather?.weather,
  )
  if (playerBerryRestore.applied) messages.push(playerBerryRestore.message)

  const enemyBerryRestore = restoreConsumedBerryByAbility(
    enemyMon,
    state.weather?.weather,
  )
  if (enemyBerryRestore.applied) messages.push(enemyBerryRestore.message)

  messages.push(
    ...processBattleAbilityTurnEndEffects({
      playerMon,
      enemyMon,
      playerName: state.playerName,
      enemyName: state.enemyName,
    }),
  )
  messages.push(...processBattleRarityTurnEnd(playerMon))
  messages.push(...processBattleRarityTurnEnd(enemyMon))

  return messages
}

export function processEndTurnWeatherDamageForState(state: BattleState): string[] {
  const { playerTeam, enemyTeam, activePlayerIndex, activeEnemyIndex } = state
  const playerMon = playerTeam[activePlayerIndex]
  const enemyMon = enemyTeam[activeEnemyIndex]

  const messages = processBattleAbilityEntryCopiesForState(state)
  messages.push(...processBattleAbilityWeatherTypeChangesForState(state))
  messages.push(...processEndTurnWeatherDamage({
    playerMon,
    enemyMon,
    playerName: state.playerName,
    enemyName: state.enemyName,
    weather: state.weather?.weather,
  }))
  messages.push(
    ...processBattleAbilityWeatherTurnEffects({
      playerMon,
      enemyMon,
      playerName: state.playerName,
      enemyName: state.enemyName,
      weather: state.weather?.weather,
    }),
  )

  return messages
}

export function processEndTurnStatusDamage(state: BattleState): string[] {
  const messages: string[] = []
  const { playerTeam, enemyTeam, activePlayerIndex, activeEnemyIndex } = state
  const playerMon = playerTeam[activePlayerIndex]
  const enemyMon = enemyTeam[activeEnemyIndex]

  const processStatus = (mon: BattlePokemon, ownerName: string) => {
    if (!mon.status || mon.currentHp <= 0) return

    const heldItemResult = applyHeldItemIfTriggered(mon, 'status')
    if (heldItemResult.applied) {
      messages.push(heldItemResult.message)
      return
    }

    const effect = STATUS_EFFECTS[mon.status.id]
    if (!effect) return

    if (effect.healingPerTurn) {
      if (mon.currentHp < mon.maxHp) {
        const healing = Math.max(1, Math.floor(mon.maxHp * effect.healingPerTurn))
        const oldHp = mon.currentHp
        mon.currentHp = Math.min(mon.maxHp, mon.currentHp + healing)
        const actualHealing = mon.currentHp - oldHp
        if (actualHealing > 0) {
          messages.push(
            `${mon.name} restored ${actualHealing} HP from ${effect.name}. [icon:heal:${actualHealing}]`,
          )
        }
      }
      return
    }

    const sourceMon = mon === playerMon ? enemyMon : playerMon
    const statusTurnDamagePercent = sourceMon
      ? getBattleAbilityStatusTurnDamage({
          pokemon: sourceMon,
          statusId: mon.status.id,
        })
      : 0
    if (statusTurnDamagePercent > 0) {
      const sourceDamage = Math.max(
        1,
        Math.floor((mon.maxHp * statusTurnDamagePercent) / 100),
      )
      const blockMessage = getBattleIndirectDamageBlockMessage(mon, mon.status.id)
      if (blockMessage) {
        messages.push(blockMessage)
        return
      }

      mon.currentHp = Math.max(0, mon.currentHp - sourceDamage)
      messages.push(
        getBattleAbilityStatusTurnDamageMessage({
          pokemon: mon,
          sourcePokemon: sourceMon,
          ownerName,
          damage: sourceDamage,
        }),
      )
      if (mon.status.id === 'bad-poison') {
        mon.status.counter = Math.max(1, mon.status.counter || 1) + 1
      }
      return
    }

    // Damage
    if (effect.damagePerTurn) {
      const stage =
        mon.status.id === 'bad-poison'
          ? Math.max(1, mon.status.counter || 1)
          : 1
      let damage = Math.ceil(mon.maxHp * effect.damagePerTurn * stage)

      // Ensure at least 1 damage if afflicted
      damage = Math.max(1, damage)

      const healPercent = getBattleAbilityStatusTurnHeal({
        pokemon: mon,
        statusId: mon.status.id,
      })
      if (healPercent > 0) {
        if (mon.currentHp < mon.maxHp) {
          const healing = Math.max(1, Math.floor((mon.maxHp * healPercent) / 100))
          const oldHp = mon.currentHp
          mon.currentHp = Math.min(mon.maxHp, mon.currentHp + healing)
          const actualHealing = mon.currentHp - oldHp
          if (actualHealing > 0) {
            messages.push(
              getBattleAbilityStatusTurnHealMessage({
                pokemon: mon,
                ownerName,
                healing: actualHealing,
              }),
            )
          }
        }
        if (mon.status.id === 'bad-poison') {
          mon.status.counter = stage + 1
        }
        return
      }

      const blockMessage = getBattleIndirectDamageBlockMessage(
        mon,
        mon.status.id,
      )
      if (blockMessage) {
        messages.push(blockMessage)
        if (mon.status.id === 'bad-poison') {
          mon.status.counter = stage + 1
        }
        return
      }

      mon.currentHp = Math.max(0, mon.currentHp - damage)
      messages.push(
        `${ownerName}'s ${mon.name} is hurt by [icon:status:${mon.status.id}][icon:damage:${damage}]`,
      )

      if (mon.status.id === 'bad-poison') {
        mon.status.counter = stage + 1
      }
    }

    // Status Recovery Checks (e.g. Sleep wake up)
    if (mon.status.id === 'sleep') {
      // "35% chance to wake up on a turn"
      // This usually happens at start of turn ("attack goes through"),
      // but prompt says "if woken status is removed".
      // If I do it here, it's end of turn. The prompt implies wakeup check is BEFORE attack.
      // "Sleep: Unable to attack with 35% chance to wake up on a turn if woken status is removed and attack goes through as normal."
      // So Sleep logic must be in submitTurn/submitMove, NOT here.
    }
  }

  processStatus(playerMon, state.playerName)
  processStatus(enemyMon, state.enemyName)

  return messages
}

export function checkStatusImmunity(
  pokemon: BattlePokemon,
  statusId: string,
): boolean {
  const effect = STATUS_EFFECTS[statusId]
  if (!effect || !pokemon.types) return false

  if (effect.immuneTypes) {
    for (const type of pokemon.types) {
      if (effect.immuneTypes.includes(type as any)) return true
    }
  }

  // Veil check
  if (pokemon.status?.id === 'veil') return true

  // Apply: Check existing status (Cannot apply if already has status, usually)
  // "Veil: User is unable to be affected by status conditions"
  // Standard rule: Can't have 2 status conditions.
  if (pokemon.status) return true // Immune if already has status

  return false
}
