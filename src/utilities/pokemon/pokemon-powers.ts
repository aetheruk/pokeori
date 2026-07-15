import { items } from '@/data/items'
import {
  POWER_KEY_ITEMS,
  getMegaEvolutions,
} from '@/data/powers'
import type { BattlePowerCommand } from '@/utilities/battle/action-validation'
import { getBattlePowerUnlockLevel } from '@/utilities/skills/unlocks'

export const POKEMON_POWER_IDS = [
  'tera',
  'mega',
  'z-move',
  'dynamax',
  'victory',
  'weather',
  'shout',
  'circadian',
  'dimensional-shift',
] as const

export type PokemonPowerId = (typeof POKEMON_POWER_IDS)[number]

export interface PokemonPowerOption {
  id: PokemonPowerId
  name: string
  description: string
  itemId: string
}

export const POKEMON_POWER_OPTIONS: Record<PokemonPowerId, PokemonPowerOption> =
  {
    tera: {
      id: 'tera',
      name: 'Terastallization',
      description: 'Use a Tera Orb to change into the stored Tera type for three turns.',
      itemId: POWER_KEY_ITEMS.tera,
    },
    mega: {
      id: 'mega',
      name: 'Mega Evolution',
      description: 'Use a compatible Mega Stone to transform for the rest of battle.',
      itemId: POWER_KEY_ITEMS.mega,
    },
    'z-move': {
      id: 'z-move',
      name: 'Z-Move',
      description: 'Prime one stance-specific Z-Move.',
      itemId: POWER_KEY_ITEMS.zMove,
    },
    dynamax: {
      id: 'dynamax',
      name: 'Dynamax',
      description: 'Grow stronger for three turns after charging.',
      itemId: POWER_KEY_ITEMS.dynamax,
    },
    victory: {
      id: 'victory',
      name: 'Victory Power',
      description: 'Swap to a matching backline Pokemon with Victory status.',
      itemId: POWER_KEY_ITEMS.victory,
    },
    weather: {
      id: 'weather',
      name: 'Weather Control',
      description: 'Overwrite the active battle weather with an unlocked weather.',
      itemId: POWER_KEY_ITEMS.weather,
    },
    shout: {
      id: 'shout',
      name: 'Battle Shout',
      description: 'Command the flow of a PVE stance matchup.',
      itemId: 'book-of-shouts',
    },
    circadian: {
      id: 'circadian',
      name: 'Circadian Power',
      description: 'Use a time-of-day battle effect after charging.',
      itemId: 'circadian-stone',
    },
    'dimensional-shift': {
      id: 'dimensional-shift',
      name: 'Dimensional Shift',
      description: 'Spend orb charges on Time, Space, or Chaos effects.',
      itemId: 'griseous-orb',
    },
  }

export function normalizeSelectedPokemonPower(
  value: unknown,
): PokemonPowerId | null {
  return typeof value === 'string' &&
    POKEMON_POWER_IDS.includes(value as PokemonPowerId)
    ? (value as PokemonPowerId)
    : null
}

export function getAvailablePokemonPowerOptions(params: {
  pokemonFormId?: string | null
  inventory?: Record<string, number>
  trainerLevel?: number
}): PokemonPowerOption[] {
  const { pokemonFormId, inventory = {}, trainerLevel = 100 } = params
  const hasItem = (itemId: string) => (inventory[itemId] || 0) > 0
  const hasTrainerLevel = (powerId: PokemonPowerId) =>
    trainerLevel >= getBattlePowerUnlockLevel(powerId)
  const options: PokemonPowerOption[] = []

  if (hasTrainerLevel('tera') && hasItem(POWER_KEY_ITEMS.tera)) {
    options.push(POKEMON_POWER_OPTIONS.tera)
  }

  if (
    hasTrainerLevel('mega') &&
    hasItem(POWER_KEY_ITEMS.mega) &&
    pokemonFormId &&
    getMegaEvolutions(pokemonFormId).some((entry) => hasItem(entry.megaStoneId))
  ) {
    options.push(POKEMON_POWER_OPTIONS.mega)
  }

  if (
    hasTrainerLevel('z-move') &&
    hasItem(POWER_KEY_ITEMS.zMove)
  ) {
    options.push(POKEMON_POWER_OPTIONS['z-move'])
  }

  if (hasTrainerLevel('dynamax') && hasItem(POWER_KEY_ITEMS.dynamax)) {
    options.push(POKEMON_POWER_OPTIONS.dynamax)
  }

  if (
    hasTrainerLevel('victory') &&
    hasItem(POWER_KEY_ITEMS.victory) &&
    items.some((item) => item.id.startsWith('victory-') && hasItem(item.id))
  ) {
    options.push(POKEMON_POWER_OPTIONS.victory)
  }

  if (
    hasTrainerLevel('weather') &&
    hasItem(POWER_KEY_ITEMS.weather) &&
    items.some((item) => item.id.startsWith('weather-core-') && hasItem(item.id))
  ) {
    options.push(POKEMON_POWER_OPTIONS.weather)
  }

  if (hasTrainerLevel('shout') && hasItem('book-of-shouts')) {
    options.push(POKEMON_POWER_OPTIONS.shout)
  }

  if (hasTrainerLevel('circadian') && hasItem('circadian-stone')) {
    options.push(POKEMON_POWER_OPTIONS.circadian)
  }

  if (
    hasTrainerLevel('dimensional-shift') &&
    (hasItem('adamant-orb') ||
      hasItem('lustrous-orb') ||
      hasItem('griseous-orb'))
  ) {
    options.push(POKEMON_POWER_OPTIONS['dimensional-shift'])
  }

  return options
}

export function getPokemonPowerForCommand(
  command: BattlePowerCommand,
): PokemonPowerId | null {
  if (command.kind === 'tera') return 'tera'
  if (command.kind === 'mega') return 'mega'
  if (command.kind === 'z-move') return 'z-move'
  if (command.kind === 'dynamax') return 'dynamax'
  if (command.kind === 'dimensional-shift') return 'dimensional-shift'
  return null
}

export function validateSelectedPokemonPower(params: {
  selectedPokemonPower?: unknown
  requiredPower: PokemonPowerId
  pokemonName?: string
}): string | null {
  const selected = normalizeSelectedPokemonPower(params.selectedPokemonPower)
  if (selected === params.requiredPower) return null

  const pokemonName = params.pokemonName || 'This Pokemon'
  const requiredName = POKEMON_POWER_OPTIONS[params.requiredPower].name
  return `${pokemonName} must have ${requiredName} selected to use this power`
}
