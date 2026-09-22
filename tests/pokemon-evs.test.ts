import { describe, expect, test } from 'bun:test'
import pokemonData from '@/data/pokemon-data'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import {
  addPokemonEvs,
  POKEMON_EV_CAPS,
  POKEMON_EV_STATS,
} from '@/utilities/pokemon/evs'

describe('Pokemon effort values', () => {
  test('imports mainline source EV yields for generated Pokemon forms', () => {
    expect(getPokemonForm('19')?.evYield).toEqual({
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 1,
    })
    expect(getPokemonForm('25')?.evYield.speed).toBe(2)

    for (const species of pokemonData) {
      for (const form of species.forms) {
        for (const stat of POKEMON_EV_STATS) {
          expect(form.evYield[stat]).toBeGreaterThanOrEqual(0)
          expect(Number.isInteger(form.evYield[stat])).toBe(true)
        }
      }
    }
  })

  test('awards EVs up to 252 per stat and 510 total', () => {
    const result = addPokemonEvs(
      { hp: 252, attack: 252, defense: 0 },
      { hp: 5, attack: 5, defense: 10 },
    )

    expect(result.evs.hp).toBe(252)
    expect(result.evs.attack).toBe(252)
    expect(result.evs.defense).toBe(6)
    expect(result.awarded.defense).toBe(6)
    expect(result.evs.hp).toBeLessThanOrEqual(POKEMON_EV_CAPS.perStat)
    expect(result.evs.attack).toBeLessThanOrEqual(POKEMON_EV_CAPS.perStat)
    expect(Object.values(result.evs).reduce((sum, value) => sum + value, 0)).toBe(
      POKEMON_EV_CAPS.total,
    )
  })
})
