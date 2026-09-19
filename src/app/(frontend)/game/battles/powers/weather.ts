/** Weather Power: one special move selected from the active battle weather. */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { WEATHER_LABELS, type WeatherType } from '@/data/weather'
import { POWER_KEY_ITEMS, createInitialPowersState } from '@/data/powers'
import type { BattleState, BattleStance } from '@/utilities/battle/types'
import { validateSelectedPokemonPower } from '@/utilities/pokemon/pokemon-powers'
import { getSkillLevel, validateBattlePowerSkillRequirement } from '@/utilities/skills/unlocks'
import { needsPlayerReplacement } from '@/utilities/battle/switching'
import { getUserInventoryMap } from '@/utilities/user-state'
import { getStanceWinCharges, POWER_STANCE_WIN_COST, spendPowerCharge } from '@/utilities/battle/power-charges'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { finalizeTurn } from '../helpers/turn-finalization'
import { runBattleActionWithGuard } from '../helpers/action-guard'
import { queuePvpMoveAndResolveTurn } from '../pvp/turn-sync'
import { applyPokemonResearchEndure, canApplyPokemonResearchEndure } from '@/utilities/battle/research-survival'

type WeatherPowerEffect = {
  name: string
  stance: BattleStance
  attackType?: string
  healPercent?: number
  status?: 'burn' | 'frostbite' | 'paralysis' | 'poison' | 'regen' | 'veil'
  statusTarget?: 'self' | 'enemy'
}

export const WEATHER_POWER_EFFECTS: Record<WeatherType, WeatherPowerEffect> = {
  clear: { name: 'Clear Skies', stance: 'tech', healPercent: 40, status: 'regen', statusTarget: 'self' },
  'harsh-sunlight': { name: 'Solar Flare', stance: 'power', attackType: 'fire', status: 'burn', statusTarget: 'enemy' },
  'extremely-harsh-sunlight': { name: 'Solar Eruption', stance: 'power', attackType: 'fire', status: 'burn', statusTarget: 'enemy' },
  rain: { name: 'Rain Renewal', stance: 'tech', attackType: 'water', healPercent: 20, status: 'regen', statusTarget: 'self' },
  'heavy-rain': { name: 'Deluge', stance: 'power', attackType: 'water', healPercent: 25, status: 'regen', statusTarget: 'self' },
  thunderstorm: { name: 'Thunderburst', stance: 'speed', attackType: 'electric', status: 'paralysis', statusTarget: 'enemy' },
  sandstorm: { name: 'Sandslash', stance: 'power', attackType: 'rock', status: 'poison', statusTarget: 'enemy' },
  hail: { name: 'Hailfall', stance: 'speed', attackType: 'ice', status: 'frostbite', statusTarget: 'enemy' },
  snow: { name: 'Snowblind', stance: 'tech', attackType: 'ice', status: 'veil', statusTarget: 'self' },
  snowstorm: { name: 'Blizzard Veil', stance: 'speed', attackType: 'ice', status: 'frostbite', statusTarget: 'enemy' },
  fog: { name: 'Misty Veil', stance: 'tech', attackType: 'ghost', status: 'veil', statusTarget: 'self' },
  'strong-winds': { name: 'Gale Force', stance: 'speed', attackType: 'flying', status: 'regen', statusTarget: 'self' },
  'shadowy-aura': { name: 'Umbral Pulse', stance: 'power', attackType: 'dark', status: 'poison', statusTarget: 'enemy' },
}

export async function useWeatherPower(battleId: string, clientActionId?: string): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  message?: string
  waiting?: boolean
}> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  return runBattleActionWithGuard(user.id, clientActionId, async () => {
    const state = await getActiveBattleState(user)
    if (!state || state.battleId !== battleId) return { success: false, error: 'Battle not found' }
    if (state.status !== 'ongoing') return { success: false, error: 'Battle has ended' }
    if (needsPlayerReplacement(state)) return { success: false, error: 'Choose your next Pokemon before using Weather Power', state }

    const playerMon = state.playerTeam[state.activePlayerIndex]
    const enemyMon = state.enemyTeam[state.activeEnemyIndex]
    if (!playerMon || playerMon.currentHp <= 0) return { success: false, error: 'Active Pokemon is fainted' }
    if (!enemyMon || enemyMon.currentHp <= 0) return { success: false, error: 'No active enemy Pokemon' }
    if (playerMon.isShadow) return { success: false, error: 'Shadow Pokemon cannot use Powers!' }

    const selectedPowerError = validateSelectedPokemonPower({ selectedPokemonPower: playerMon.selectedPokemonPower, requiredPower: 'weather', pokemonName: playerMon.name })
    if (selectedPowerError) return { success: false, error: selectedPowerError }

    const payload = await getPayload({ config: configPromise })
    const inventory = await getUserInventoryMap(payload as any, user.id)
    if ((inventory[POWER_KEY_ITEMS.weather] || 0) <= 0) return { success: false, error: 'You do not have a Weather Orb' }
    const skillError = validateBattlePowerSkillRequirement('weather', getSkillLevel(user.skills, 'battling'))
    if (skillError) return { success: false, error: skillError }
    if (!state.powers) state.powers = createInitialPowersState()
    if ((state.powers.weatherUsesRemaining ?? 0) <= 0) return { success: false, error: 'No Weather Power uses remaining' }
    if (getStanceWinCharges(state.powers) < POWER_STANCE_WIN_COST) return { success: false, error: 'Win 3 stance matchups to use a Power' }

    if (state.isPvp) {
      const result = await queuePvpMoveAndResolveTurn({viewerId:user.id,battleState:state,move:{stance:'tech',attackType:'power:weather'}})
      return {success:true,state:result.state,waiting:result.waiting}
    }

    const weather = state.weather?.weather ?? 'clear'
    const effect = WEATHER_POWER_EFFECTS[weather]
    const { calculateDamage, calculateAiStance, applyStatus, handleShieldInteraction, formatTypeEffectivenessMessage } = await import('@/utilities/battle/battle-logic')
    const enemyStance = calculateAiStance(enemyMon, playerMon)
    let log = `${playerMon.name} used ${effect.name} during ${WEATHER_LABELS[weather]}!`
    let playerDamage = 0
    let playerAttackType: string | undefined
    let playerExecutedAttack = false
    let enemyExecutedAttack = false
    let result: 'win' | 'loss' | 'tie' = 'tie'

    if (effect.healPercent) {
      const before = playerMon.currentHp
      playerMon.currentHp = Math.min(playerMon.maxHp, playerMon.currentHp + Math.floor(playerMon.maxHp * effect.healPercent / 100))
      if (playerMon.currentHp > before) log += ` It restored ${playerMon.currentHp - before} HP!`
    }
    if (effect.status) {
      const target = effect.statusTarget === 'enemy' ? enemyMon : playerMon
      const statusResult = applyStatus(target, effect.status, weather, { terrain: state.terrain?.terrain })
      if (statusResult.applied) log += ` ${statusResult.message}`
    }

    if (effect.attackType) {
      const damageResult = calculateDamage(playerMon, enemyMon, effect.stance, weather === 'extremely-harsh-sunlight' || weather === 'heavy-rain' ? 1.75 : 1.5, effect.attackType, undefined, undefined, undefined, weather, undefined, { currentTurn: state.turn })
      playerDamage = damageResult.damage
      playerAttackType = damageResult.usedType
      if ((effect.stance === 'power' && enemyStance === 'tech') || (effect.stance === 'tech' && enemyStance === 'speed') || (effect.stance === 'speed' && enemyStance === 'power')) result = 'win'
      else if (effect.stance === enemyStance) result = 'tie'
      else result = 'loss'
      const shield = handleShieldInteraction(enemyMon, damageResult.isSuperEffective, result === 'win')
      if (shield.damageMultiplier === 0) {
        playerDamage = 0
        log += shield.message
      } else {
        playerExecutedAttack = true
        log += `\n${state.playerName}: ${playerMon.name} used [icon:stance:${effect.stance}] [icon:type:${damageResult.usedType}] ${effect.name}, dealing ${playerDamage} damage!`
        if (damageResult.weatherMessage) log += `\n${damageResult.weatherMessage}`
        if (damageResult.isCrit) log += ' (Critical Hit!)'
        log += formatTypeEffectivenessMessage(damageResult)
      }
    }

    const enemyDamageResult = calculateDamage(enemyMon, playerMon, enemyStance, result === 'win' ? 0.5 : result === 'loss' ? 2 : 1, undefined, undefined, undefined, undefined, weather, undefined, { currentTurn: state.turn })
    let enemyDamage = enemyDamageResult.damage
    const playerShield = handleShieldInteraction(playerMon, enemyDamageResult.isSuperEffective, result === 'loss')
    if (playerShield.damageMultiplier === 0) enemyDamage = 0
    else {
      enemyExecutedAttack = true
      log += `\n${state.enemyName}: ${enemyMon.name} used [icon:stance:${enemyStance}] [icon:type:${enemyDamageResult.usedType}] ${enemyStance} attack, dealing ${enemyDamage} damage!`
    }

    const playerEndure = applyPokemonResearchEndure(enemyMon, playerDamage, Math.random, canApplyPokemonResearchEndure(state, 'enemy'))
    const enemyEndure = applyPokemonResearchEndure(playerMon, enemyDamage, Math.random, canApplyPokemonResearchEndure(state, 'player'))
    playerDamage = playerEndure.damage
    enemyDamage = enemyEndure.damage
    enemyMon.currentHp = Math.max(0, enemyMon.currentHp - playerDamage)
    playerMon.currentHp = Math.max(0, playerMon.currentHp - enemyDamage)
    if (playerEndure.message) log += `\n${playerEndure.message}`
    if (enemyEndure.message) log += `\n${enemyEndure.message}`

    spendPowerCharge(state.powers)
    state.powers.weatherUsesRemaining -= 1
    state.history.unshift({ turn: state.turn, playerExecutedAttack, enemyExecutedAttack, playerStance: effect.stance, enemyStance, result, damageDealt: playerDamage, damageTaken: enemyDamage, playerAttackType, enemyAttackType: enemyDamageResult.usedType, message: log })
    const powerUsage = ((user as any).powerUsage as Record<string, number> | undefined) || {}
    await payload.update({ collection: 'users', id: user.id, data: { powerUsage: { ...powerUsage, weatherUses: (powerUsage.weatherUses || 0) + 1 } } })
    await finalizeTurn(state, user.id, user)
    return { success: true, state, message: log }
  })
}
