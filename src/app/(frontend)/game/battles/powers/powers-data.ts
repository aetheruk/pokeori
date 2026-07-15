/**
 * Battle powers data retrieval.
 * Queries available battle powers based on user inventory and active Pokemon.
 */

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import type { PokemonPowerId } from '@/utilities/pokemon/pokemon-powers'
import { normalizeSelectedPokemonPower } from '@/utilities/pokemon/pokemon-powers'
import { WEATHER_LABELS, WEATHER_TYPES, type WeatherType } from '@/data/weather'
import {
  getSkillLevel,
  validateBattlePowerSkillRequirement,
} from '@/utilities/skills/unlocks'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { getUserInventoryMap } from '@/utilities/user-state'

/**
 * Mega Stone data for available Mega Evolutions
 */
export interface MegaStoneData {
  itemId: string
  name: string
  megaFormId: string
  megaFormName: string
}

/**
 * Victory Power data for available Victory items
 */
export interface VictoryPowerData {
  itemId: string
  name: string
  type: string
}

export interface WeatherPowerData {
  itemId: string
  weather: WeatherType
  label: string
}

/**
 * Complete battle powers available to the player
 */
export interface BattlePowersData {
  selectedPokemonPower: PokemonPowerId | null
  hasTera: boolean
  hasMega: boolean
  hasZRing: boolean
  hasDynamax: boolean
  teraType?: string
  megaStones: MegaStoneData[]
  canGigantamax: boolean
  gigantamaxFormId?: string
  hasVictory: boolean
  victoryPowers: VictoryPowerData[]
  hasWeather: boolean
  weatherPowers: WeatherPowerData[]
  hasShouts: boolean
  hasCircadian: boolean
  dimensionalShift: {
    time: boolean
    space: boolean
    chaos: boolean
  }
}

/**
 * Get all available battle powers for the active Pokemon.
 * Checks user inventory for required items and validates power availability.
 *
 * @param activeFormId - Form ID of the active Pokemon
 * @returns Available battle powers data
 */
export async function getBattlePowers(
  activeFormId: string,
): Promise<{ success: boolean; data: BattlePowersData }> {
  const emptyData: BattlePowersData = {
    selectedPokemonPower: null,
    hasTera: false,
    hasMega: false,
    hasZRing: false,
    hasDynamax: false,
    teraType: undefined,
    megaStones: [],
    canGigantamax: false,
    hasVictory: false,
    victoryPowers: [],
    hasWeather: false,
    weatherPowers: [],
    hasShouts: false,
    hasCircadian: false,
    dimensionalShift: { time: false, space: false, chaos: false },
  }

  const user = await getUser()
  if (!user) return { success: false, data: emptyData }

  const state = await getActiveBattleState(user)
  if (!state) return { success: false, data: emptyData }

  const { items } = await import('@/data/items')
  const {
    POWER_KEY_ITEMS,
    WEATHER_POWER_ITEM_IDS,
    getMegaEvolutions,
    canGigantamax,
    getGigantamaxForm,
  } = await import('@/data/powers')

  const payload = await getPayload({ config: configPromise })
  const userInventory = await getUserInventoryMap(payload as any, user.id)
  const hasKeyItem = (itemId: string) => (userInventory[itemId] || 0) > 0
  const trainerLevel = getSkillLevel(user.skills, 'battling')
  const hasPowerLevel = (powerId: PokemonPowerId) =>
    validateBattlePowerSkillRequirement(powerId, trainerLevel) === null

  const playerTeam = state.playerTeam || []
  const activeMonIndex = state.activePlayerIndex ?? -1
  const activeMon = playerTeam[activeMonIndex]
  const selectedPokemonPower = normalizeSelectedPokemonPower(
    activeMon?.selectedPokemonPower,
  )

  if (
    activeMon?.pokemonResearchLevel !== undefined &&
    activeMon.pokemonResearchLevel < 3
  ) {
    return { success: true, data: emptyData }
  }

  // Check for key items
  const hasTera = hasPowerLevel('tera') && hasKeyItem(POWER_KEY_ITEMS.tera)
  const hasMega = hasPowerLevel('mega') && hasKeyItem(POWER_KEY_ITEMS.mega)
  const hasZRing = hasPowerLevel('z-move') && hasKeyItem(POWER_KEY_ITEMS.zMove)
  const hasDynamax =
    hasPowerLevel('dynamax') && hasKeyItem(POWER_KEY_ITEMS.dynamax)
  const hasVictory =
    hasPowerLevel('victory') && hasKeyItem(POWER_KEY_ITEMS.victory)
  const hasWeather =
    hasPowerLevel('weather') && hasKeyItem(POWER_KEY_ITEMS.weather) && !state.isPvp
  const hasShouts = hasPowerLevel('shout') && hasKeyItem('book-of-shouts')
  const hasCircadian =
    hasPowerLevel('circadian') && hasKeyItem('circadian-stone')

  // Dimensional Shift orbs
  const hasDimensionalShift = hasPowerLevel('dimensional-shift')
  const hasTime = hasDimensionalShift && hasKeyItem('adamant-orb')
  const hasSpace = hasDimensionalShift && hasKeyItem('lustrous-orb')
  const hasChaos = hasDimensionalShift && hasKeyItem('griseous-orb')

  // Get Mega Stones for active Pokemon
  const megaStones: MegaStoneData[] = []
  if (hasMega) {
    const megaEvolutions = getMegaEvolutions(activeFormId)
    for (const mega of megaEvolutions) {
      const qty = userInventory[mega.megaStoneId] || 0
      if (qty > 0) {
        const megaFormData = getPokemonForm(mega.megaFormId)
        const isPrimal =
          mega.megaStoneId === 'blue-orb' || mega.megaStoneId === 'red-orb'
        const megaFormName =
          megaFormData?.name ||
          (isPrimal
            ? mega.megaStoneName
            : `Mega ${mega.megaStoneName.replace(/ite$/, '')}`)
        megaStones.push({
          itemId: mega.megaStoneId,
          name: mega.megaStoneName,
          megaFormId: mega.megaFormId,
          megaFormName,
        })
      }
    }
  }

  // Get Victory Powers (require valid backline Pokemon)
  const victoryPowers: VictoryPowerData[] = []
  if (hasVictory) {
    const victoryItems = items.filter(
      (i) => i.id.startsWith('victory-') && i.category === 'battle',
    )
    for (const vItem of victoryItems) {
      if ((userInventory[vItem.id] || 0) > 0) {
        const type = vItem.id.replace('victory-', '')
        const validTarget = playerTeam.some((p, index) => {
          if (index === activeMonIndex) return false
          if (p.currentHp <= 0) return false
          return p.types.some((t) => t.toLowerCase() === type.toLowerCase())
        })
        if (validTarget) {
          victoryPowers.push({
            itemId: vItem.id,
            name: vItem.name,
            type,
          })
        }
      }
    }
  }

  const weatherPowers: WeatherPowerData[] = []
  if (hasWeather) {
    for (const weather of WEATHER_TYPES) {
      const itemId = WEATHER_POWER_ITEM_IDS[weather]
      if (!hasKeyItem(itemId)) continue
      weatherPowers.push({
        itemId,
        weather,
        label: WEATHER_LABELS[weather],
      })
    }
  }

  // Check Gigantamax capability
  const canGmax = canGigantamax(activeFormId)
  const gmaxFormId = canGmax ? getGigantamaxForm(activeFormId) : undefined

  const data: BattlePowersData = {
    selectedPokemonPower,
    hasTera: selectedPokemonPower === 'tera' && hasTera && !!activeMon?.teraType,
    hasMega: selectedPokemonPower === 'mega' && hasMega,
    hasZRing: selectedPokemonPower === 'z-move' && hasZRing,
    hasDynamax: selectedPokemonPower === 'dynamax' && hasDynamax,
    teraType: selectedPokemonPower === 'tera' ? activeMon?.teraType || undefined : undefined,
    megaStones: selectedPokemonPower === 'mega' ? megaStones : [],
    canGigantamax: selectedPokemonPower === 'dynamax' && canGmax,
    gigantamaxFormId:
      selectedPokemonPower === 'dynamax' ? gmaxFormId : undefined,
    hasVictory: selectedPokemonPower === 'victory' && hasVictory,
    victoryPowers: selectedPokemonPower === 'victory' ? victoryPowers : [],
    hasWeather: selectedPokemonPower === 'weather' && hasWeather,
    weatherPowers: selectedPokemonPower === 'weather' ? weatherPowers : [],
    hasShouts: selectedPokemonPower === 'shout' && hasShouts,
    hasCircadian: selectedPokemonPower === 'circadian' && hasCircadian,
    dimensionalShift: {
      time: selectedPokemonPower === 'dimensional-shift' && hasTime,
      space: selectedPokemonPower === 'dimensional-shift' && hasSpace,
      chaos: selectedPokemonPower === 'dimensional-shift' && hasChaos,
    },
  }

  return { success: true, data }
}
