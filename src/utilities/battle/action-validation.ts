import type { BattlePokemon, BattleStance } from '@/utilities/battle/types'
import {
  POWER_KEY_ITEMS,
  canGigantamax,
  getGigantamaxForm,
  getMegaEvolutions,
  getMegaStoneForEvolution,
} from '@/data/powers'
import {
  getPokemonPowerForCommand,
  validateSelectedPokemonPower,
} from '@/utilities/pokemon/pokemon-powers'
import { validateBattlePowerSkillRequirement } from '@/utilities/skills/unlocks'

export const VALID_BATTLE_STANCES: BattleStance[] = ['power', 'speed', 'tech']

export type BattlePowerCommand =
  | { kind: 'none' }
  | { kind: 'dimensional-shift'; shiftType: 'time' | 'space' | 'chaos' }
  | { kind: 'mega'; megaFormId: string; requiredStone: string }
  | { kind: 'dynamax'; formId?: string }
  | { kind: 'tera' }
  | { kind: 'z-move' }
  | { kind: 'unknown'; error: string }

export function isValidBattleStance(value: unknown): value is BattleStance {
  return (
    typeof value === 'string' &&
    VALID_BATTLE_STANCES.includes(value as BattleStance)
  )
}

export function parseBattlePowerCommand(
  attackType: string | undefined,
  activePokemon?: BattlePokemon,
): BattlePowerCommand {
  if (!attackType?.startsWith('power:')) return { kind: 'none' }

  const parts = attackType.split(':')

  if (parts[1] === 'dimensional-shift') {
    const shiftType = parts[2]
    if (
      parts.length === 3 &&
      (shiftType === 'time' || shiftType === 'space' || shiftType === 'chaos')
    ) {
      return { kind: 'dimensional-shift', shiftType }
    }
    return { kind: 'unknown', error: 'Invalid Dimensional Shift type' }
  }

  if (parts[1] === 'mega') {
    const megaFormId = parts[2]
    if (!megaFormId || parts.length !== 3) {
      return { kind: 'unknown', error: 'Invalid Mega Evolution target' }
    }

    if (activePokemon) {
      const validMega = getMegaEvolutions(activePokemon.formId).some(
        (entry) => entry.megaFormId === megaFormId,
      )
      if (!validMega)
        return { kind: 'unknown', error: 'Invalid Mega Evolution target' }
    }

    const requiredStone = getMegaStoneForEvolution(megaFormId)
    if (!requiredStone)
      return { kind: 'unknown', error: 'Mega Evolution is missing item data' }

    return { kind: 'mega', megaFormId, requiredStone }
  }

  if (parts[1] === 'dynamax') {
    const requestedFormId = parts[2]
    if (parts.length > 3)
      return { kind: 'unknown', error: 'Invalid Dynamax selection' }

    if (requestedFormId && activePokemon) {
      const expectedFormId = canGigantamax(activePokemon.formId)
        ? getGigantamaxForm(activePokemon.formId)
        : undefined
      if (requestedFormId !== expectedFormId) {
        return { kind: 'unknown', error: 'Invalid Gigantamax target' }
      }
    }
    return { kind: 'dynamax', formId: requestedFormId }
  }

  if (parts[1] === 'tera') {
    if (parts.length !== 2) {
      return { kind: 'unknown', error: 'Invalid Tera Orb command' }
    }

    return { kind: 'tera' }
  }

  if (parts[1] === 'z-move') {
    if (parts.length !== 2) {
      return { kind: 'unknown', error: 'Invalid Z-Move selection' }
    }

    return { kind: 'z-move' }
  }

  return { kind: 'unknown', error: 'Invalid battle power' }
}

export function hasInventoryItem(
  inventory: Record<string, number>,
  itemId: string,
): boolean {
  return (inventory[itemId] || 0) > 0
}

export function validateCommonPowerRequirements(params: {
  command: BattlePowerCommand
  inventory: Record<string, number>
  pokemon: BattlePokemon
  powers: NonNullable<import('@/utilities/battle/types').BattleState['powers']>
  trainerLevel?: number
}): string | null {
  const { command, inventory, pokemon, powers, trainerLevel = 1 } = params

  if (command.kind === 'none') return null
  if (command.kind === 'unknown') return command.error

  if (pokemon.isShadow) return 'Shadow Pokemon cannot use Powers!'

  const requiredPower = getPokemonPowerForCommand(command)
  if (requiredPower) {
    if (
      pokemon.pokemonResearchLevel !== undefined &&
      pokemon.pokemonResearchLevel < 3
    ) {
      return 'Research Level 3 required for this species to use Pokemon Powers'
    }

    const skillRequirementError = validateBattlePowerSkillRequirement(
      requiredPower,
      trainerLevel,
    )
    if (skillRequirementError) return skillRequirementError

    const selectedPowerError = validateSelectedPokemonPower({
      selectedPokemonPower: pokemon.selectedPokemonPower,
      requiredPower,
      pokemonName: pokemon.name,
    })
    if (selectedPowerError) return selectedPowerError
  }

  if (command.kind === 'mega') {
    if (!hasInventoryItem(inventory, POWER_KEY_ITEMS.mega))
      return 'Mega Bracelet is required'
    if (powers.megaUsesRemaining <= 0) return 'No Mega Evolution uses remaining'
    if (powers.megaEvolved || pokemon.isMega)
      return 'Mega Evolution is already active'
    if (!hasInventoryItem(inventory, command.requiredStone)) {
      return 'You do not have the required Mega Stone'
    }
  }

  if (command.kind === 'dynamax') {
    if (!hasInventoryItem(inventory, POWER_KEY_ITEMS.dynamax))
      return 'Dynamax Band is required'
    if (!powers.dynamaxAvailable) return 'Dynamax is not unlocked yet'
    if (powers.dynamaxUsesRemaining <= 0) return 'No Dynamax uses remaining'
    if (powers.dynamaxActive || pokemon.isDynamaxed)
      return 'Dynamax is already active'
  }

  if (command.kind === 'tera') {
    if (!hasInventoryItem(inventory, POWER_KEY_ITEMS.tera))
      return 'Tera Orb is required'
    if (powers.teraUsesRemaining <= 0)
      return 'No Terastallization uses remaining'
    if (!pokemon.teraType) return 'This Pokemon has no Tera type'
    if (pokemon.teraUsed) return 'This Pokemon has already terastallized'
  }

  if (command.kind === 'z-move') {
    if (!hasInventoryItem(inventory, POWER_KEY_ITEMS.zMove))
      return 'Z-Ring is required'
    if (powers.zMoveUsesRemaining <= 0 || powers.zMoveUsed)
      return 'No Z-Move uses remaining'
    if (pokemon.zMoveReady) return 'Z-Move is already prepared'
  }

  return null
}
