import { describe, expect, test } from 'bun:test'
import { applyPokemonResearchEndure } from '@/utilities/battle/research-survival'
import { makeBattlePokemon } from './helpers/battle-fixtures'

describe('Pokemon research battle effects', () => {
  test('level 4 research can let a Pokemon endure a knockout blow', () => {
    const pokemon = makeBattlePokemon({
      name: 'Pikachu',
      currentHp: 40,
      pokemonResearchLevel: 4,
    })

    const result = applyPokemonResearchEndure(pokemon, 60, () => 0.01)

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
      ).damage,
    ).toBe(60)
    expect(
      applyPokemonResearchEndure(
        makeBattlePokemon({ currentHp: 1, pokemonResearchLevel: 4 }),
        60,
        () => 0,
      ).damage,
    ).toBe(60)
  })
})
