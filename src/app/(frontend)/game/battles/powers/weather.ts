/**
 * Weather Control power system.
 * Lets a selected Pokemon overwrite battle-local weather until another battle weather override occurs.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { WEATHER_LABELS, isWeatherType, type WeatherType } from '@/data/weather'
import {
  POWER_KEY_ITEMS,
  WEATHER_POWER_ITEM_IDS,
  createInitialPowersState,
} from '@/data/powers'
import type { BattleState } from '@/utilities/battle/types'
import { processBattleAbilityWeatherTypeChangesForState } from '@/utilities/battle/abilities'
import { validateSelectedPokemonPower } from '@/utilities/pokemon/pokemon-powers'
import {
  getSkillLevel,
  validateBattlePowerSkillRequirement,
} from '@/utilities/skills/unlocks'
import { needsPlayerReplacement } from '@/utilities/battle/switching'
import { getUserInventoryMap } from '@/utilities/user-state'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { processEnemyAttackOnly } from '../pve/enemy-attack'
import { runBattleActionWithGuard } from '../helpers/action-guard'

function applyWeatherOverride(
  state: BattleState,
  weather: WeatherType,
  overriddenBy: string,
) {
  const previousWeather = state.weather?.weather || 'clear'

  state.weather = {
    slot: state.weather?.slot || 1,
    label: WEATHER_LABELS[weather],
    updatedAt: state.weather?.updatedAt,
    expiresAt: state.weather?.expiresAt,
    subCategory: state.weather?.subCategory,
    source: 'power',
    originalWeather: state.weather?.originalWeather || previousWeather,
    overriddenAtTurn: state.turn,
    overriddenBy,
    weather,
  }
}

export async function useWeatherPower(
  battleId: string,
  weather: string,
  clientActionId?: string,
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  message?: string
}> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  return runBattleActionWithGuard(user.id, clientActionId, async () => {
    if (!isWeatherType(weather)) {
      return { success: false, error: 'Invalid weather type' }
    }

    const state = await getActiveBattleState(user)
    if (!state || state.battleId !== battleId) {
      return { success: false, error: 'Battle not found' }
    }

    if (state.isPvp) {
      return {
        success: false,
        error: 'Weather Control is not available in PVP battles yet',
      }
    }

    if (state.status !== 'ongoing')
      return { success: false, error: 'Battle has ended' }
    if (needsPlayerReplacement(state)) {
      return {
        success: false,
        error: 'Choose your next Pokemon before using Weather Control',
        state,
      }
    }

    const activeIndex = state.activePlayerIndex
    const playerMon = state.playerTeam[activeIndex]
    const enemyMon = state.enemyTeam[state.activeEnemyIndex]

    if (!playerMon || playerMon.currentHp <= 0) {
      return { success: false, error: 'Active Pokemon is fainted' }
    }
    if (!enemyMon || enemyMon.currentHp <= 0) {
      return { success: false, error: 'No active enemy Pokemon' }
    }
    if (playerMon.isShadow) {
      return { success: false, error: 'Shadow Pokemon cannot use Powers!' }
    }

    const selectedPowerError = validateSelectedPokemonPower({
      selectedPokemonPower: playerMon.selectedPokemonPower,
      requiredPower: 'weather',
      pokemonName: playerMon.name,
    })
    if (selectedPowerError) return { success: false, error: selectedPowerError }

    const payload = await getPayload({ config: configPromise })
    const inventory = await getUserInventoryMap(payload as any, user.id)

    if ((inventory[POWER_KEY_ITEMS.weather] || 0) <= 0) {
      return { success: false, error: 'You do not have a Weather Orb' }
    }

    const weatherItemId = WEATHER_POWER_ITEM_IDS[weather]
    if ((inventory[weatherItemId] || 0) <= 0) {
      return {
        success: false,
        error: `You do not have the ${WEATHER_LABELS[weather]} Weather Core`,
      }
    }

    const skillRequirementError = validateBattlePowerSkillRequirement(
      'weather',
      getSkillLevel(user.skills, 'battling'),
    )
    if (skillRequirementError)
      return { success: false, error: skillRequirementError }

    if (!state.powers) state.powers = createInitialPowersState()
    if ((state.powers.weatherUsesRemaining ?? 0) <= 0) {
      return { success: false, error: 'No Weather Control uses remaining' }
    }

    applyWeatherOverride(state, weather, playerMon.name)
    state.powers.weatherUsesRemaining -= 1

    const weatherLabel = WEATHER_LABELS[weather]
    const forecastMessages = processBattleAbilityWeatherTypeChangesForState(state)
    const message = [
      `${playerMon.name} used Weather Control! ${weatherLabel} covers the battlefield.`,
      ...forecastMessages,
    ].join('\n')

    const powerUsage =
      ((user as any).powerUsage as Record<string, number> | undefined) || {}
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        powerUsage: {
          ...powerUsage,
          weatherUses: (powerUsage.weatherUses || 0) + 1,
        },
      },
    })

    await processEnemyAttackOnly(
      state,
      playerMon,
      enemyMon,
      user,
      message,
      'tech',
    )

    return { success: true, state, message }
  })
}
