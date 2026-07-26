import { describe, expect, test } from 'bun:test'
import {
  applyPokemonResearchEndure,
  canApplyPokemonResearchEndure,
} from '@/utilities/battle/research-survival'
import { makeBattlePokemon } from './helpers/battle-fixtures'

describe('Pokemon research battle effects', () => {
  test('level 4 research can let a Pokemon endure a knockout blow', () => {
    const pokemon = makeBattlePokemon({
      name: 'Pikachu',
      currentHp: 40,
      pokemonResearchLevel: 4,
    })

    const result = applyPokemonResearchEndure(pokemon, 60, () => 0.01, true)

    expect(result.damage).toBe(39)
    expect(result.message).toBe(
      'You and Pikachu feel connected. Pikachu survives a powerful blow.',
    )
  })

  test('research endurance does not trigger below level 4 or from 1 HP', () => {
    expect(
      applyPokemonResearchEndure(
        makeBattlePokemon({ currentHp: 40, pokemonResearchLevel: 3 }),
        60,
        () => 0,
        true,
      ).damage,
    ).toBe(60)
    expect(
      applyPokemonResearchEndure(
        makeBattlePokemon({ currentHp: 1, pokemonResearchLevel: 4 }),
        60,
        () => 0,
        true,
      ).damage,
    ).toBe(60)
  })

  test('research endurance is player-side only in PvE and remains available to both PvP sides', () => {
    const pveState = { isPvp: false }
    const pvpState = { isPvp: true }
    const enemy = makeBattlePokemon({ currentHp: 40, pokemonResearchLevel: 4 })

    expect(canApplyPokemonResearchEndure(pveState, 'enemy')).toBe(false)
    expect(
      applyPokemonResearchEndure(
        enemy,
        60,
        () => 0,
        canApplyPokemonResearchEndure(pveState, 'enemy'),
      ),
    ).toMatchObject({ damage: 60, message: '' })
    expect(canApplyPokemonResearchEndure(pveState, 'player')).toBe(true)
    expect(canApplyPokemonResearchEndure(pvpState, 'player')).toBe(true)
    expect(canApplyPokemonResearchEndure(pvpState, 'enemy')).toBe(true)
  })
})
