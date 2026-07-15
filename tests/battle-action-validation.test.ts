import { describe, expect, test } from 'bun:test'
import {
  isValidBattleStance,
  parseBattlePowerCommand,
  validateCommonPowerRequirements,
} from '@/utilities/battle/action-validation'
import { createInitialPowersState } from '@/data/powers'
import type { BattlePokemon } from '@/utilities/battle/types'

const pokemon: BattlePokemon = {
  id: 'test-pokemon',
  user: 'user-1' as any,
  originalTrainer: 'user-1',
  speciesId: 6,
  formId: '6',
  level: 50,
  name: 'Charizard',
  types: ['Fire', 'Flying'],
  stats: {
    hp: 150,
    attack: 100,
    defense: 90,
    specialAttack: 120,
    specialDefense: 90,
    speed: 100,
  },
  currentHp: 150,
  maxHp: 150,
  status: undefined,
  updatedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
}

describe('battle action validation', () => {
  test('validates battle stances', () => {
    expect(isValidBattleStance('power')).toBe(true)
    expect(isValidBattleStance('speed')).toBe(true)
    expect(isValidBattleStance('tech')).toBe(true)
    expect(isValidBattleStance('invalid')).toBe(false)
  })

  test('parses and validates mega targets against the active Pokemon', () => {
    expect(parseBattlePowerCommand('power:mega:10034', pokemon)).toMatchObject({
      kind: 'mega',
      megaFormId: '10034',
      requiredStone: 'charizardite-x',
    })

    expect(parseBattlePowerCommand('power:mega:10033', pokemon)).toMatchObject({
      kind: 'unknown',
      error: 'Invalid Mega Evolution target',
    })
  })

  test('requires inventory and remaining power uses for battle powers', () => {
    const command = parseBattlePowerCommand('power:mega:10034', pokemon)
    const powers = createInitialPowersState({ megaEvolutionsPerBattle: 1 })

    expect(
      validateCommonPowerRequirements({
        command,
        inventory: { 'mega-bracelet': 1 },
        pokemon: { ...pokemon, selectedPokemonPower: 'mega' },
        powers,
        trainerLevel: 100,
      }),
    ).toBe('You do not have the required Mega Stone')

    expect(
      validateCommonPowerRequirements({
        command,
        inventory: { 'mega-bracelet': 1, 'charizardite-x': 1 },
        pokemon: { ...pokemon, selectedPokemonPower: 'mega' },
        powers,
        trainerLevel: 100,
      }),
    ).toBeNull()
  })

  test('requires trainer level for battle powers', () => {
    const command = parseBattlePowerCommand('power:mega:10034', pokemon)
    const powers = createInitialPowersState({ megaEvolutionsPerBattle: 1 })

    expect(
      validateCommonPowerRequirements({
        command,
        inventory: { 'mega-bracelet': 1, 'charizardite-x': 1 },
        pokemon: { ...pokemon, selectedPokemonPower: 'mega' },
        powers,
        trainerLevel: 74,
      }),
    ).toBe('Trainer Level 75 required to use this power')
  })

  test('requires the matching selected Pokemon Power', () => {
    const command = parseBattlePowerCommand('power:mega:10034', pokemon)
    const powers = createInitialPowersState({ megaEvolutionsPerBattle: 1 })

    expect(
      validateCommonPowerRequirements({
        command,
        inventory: { 'mega-bracelet': 1, 'charizardite-x': 1 },
        pokemon: { ...pokemon, selectedPokemonPower: 'tera' },
        powers,
        trainerLevel: 100,
      }),
    ).toBe('Charizard must have Mega Evolution selected to use this power')
  })

  test('validates Tera Orb commands against stored Pokemon Tera type', () => {
    const command = parseBattlePowerCommand('power:tera', pokemon)
    const powers = createInitialPowersState()

    expect(command).toEqual({ kind: 'tera' })
    expect(
      validateCommonPowerRequirements({
        command,
        inventory: { 'tera-orb': 1 },
        pokemon: { ...pokemon, selectedPokemonPower: 'tera' },
        powers,
        trainerLevel: 100,
      }),
    ).toBe('This Pokemon has no Tera type')

    expect(
      validateCommonPowerRequirements({
        command,
        inventory: { 'tera-orb': 1 },
        pokemon: {
          ...pokemon,
          selectedPokemonPower: 'tera',
          teraType: 'fire',
        },
        powers,
        trainerLevel: 100,
      }),
    ).toBeNull()
  })

  test('validates Z-Ring commands without Z-Crystals', () => {
    const command = parseBattlePowerCommand('power:z-move', pokemon)
    const powers = createInitialPowersState()

    expect(command).toEqual({ kind: 'z-move' })
    expect(
      validateCommonPowerRequirements({
        command,
        inventory: { 'z-ring': 1 },
        pokemon: { ...pokemon, selectedPokemonPower: 'z-move' },
        powers,
        trainerLevel: 100,
      }),
    ).toBeNull()
  })

  test('rejects invalid tera and z-move payloads', () => {
    expect(
      parseBattlePowerCommand('power:tera:not-a-shard', pokemon),
    ).toMatchObject({
      kind: 'unknown',
      error: 'Invalid Tera Orb command',
    })
    expect(
      parseBattlePowerCommand('power:z-move:power:z-crystal-speed', pokemon),
    ).toMatchObject({
      kind: 'unknown',
      error: 'Invalid Z-Move selection',
    })
  })
})
