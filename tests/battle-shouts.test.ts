import { describe, expect, test } from 'bun:test'
import { clearPokemonSecondaryStatuses } from '@/utilities/battle/secondary-statuses'
import {
  BATTLE_SHOUT_MESSAGES,
  advanceShoutStatBoostForTurn,
  applyShoutStatBoost,
  clearShoutStatBoost,
  getBattleShoutMessage,
  removeShoutBoostFromStatStages,
} from '@/utilities/battle/shout-effects'
import { makeBattlePokemon } from './helpers/battle-fixtures'

describe('Battle Shout stat effects', () => {
  test('uses the five authored encouragement messages', () => {
    expect(BATTLE_SHOUT_MESSAGES).toHaveLength(5)
    expect(getBattleShoutMessage('Pikachu', () => 0)).toBe(
      'Hey Pikachu, you can do this!',
    )
    expect(getBattleShoutMessage('Pikachu', () => 0.999)).toBe(
      "Together, Pikachu, we'll turn this battle around!",
    )
  })

  test('raises the five core battle stats without touching crit, accuracy, or evasion', () => {
    const pokemon = makeBattlePokemon({
      statStages: {
        attack: 0,
        defense: -1,
        specialAttack: 6,
        specialDefense: 0,
        speed: 0,
        crit: 1,
        accuracy: -1,
        evasion: 2,
      },
    })

    const result = applyShoutStatBoost(pokemon, 4)

    expect(result.applied).toBe(true)
    expect(pokemon.statStages).toEqual({
      attack: 1,
      defense: 0,
      specialAttack: 6,
      specialDefense: 1,
      speed: 1,
      crit: 1,
      accuracy: -1,
      evasion: 2,
    })
    expect(pokemon.shoutBoost).toEqual({
      turnsRemaining: 3,
      activatedTurn: 4,
      appliedStages: {
        attack: 1,
        defense: 1,
        specialDefense: 1,
        speed: 1,
      },
    })
  })

  test('expires after three subsequent turns and preserves unrelated stages', () => {
    const pokemon = makeBattlePokemon({
      statStages: {
        attack: 2,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
        crit: 0,
        accuracy: 0,
        evasion: 0,
      },
    })

    applyShoutStatBoost(pokemon, 1)
    pokemon.statStages!.attack += 1

    expect(advanceShoutStatBoostForTurn(pokemon, 1)).toBeUndefined()
    expect(pokemon.shoutBoost?.turnsRemaining).toBe(3)
    expect(advanceShoutStatBoostForTurn(pokemon, 2)).toBeUndefined()
    expect(advanceShoutStatBoostForTurn(pokemon, 3)).toBeUndefined()
    expect(pokemon.shoutBoost?.turnsRemaining).toBe(1)
    expect(advanceShoutStatBoostForTurn(pokemon, 4)).toContain('faded')

    expect(pokemon.shoutBoost).toBeUndefined()
    expect(pokemon.statStages?.attack).toBe(3)
    expect(pokemon.statStages?.defense).toBe(0)
    expect(pokemon.statStages?.speed).toBe(0)
  })

  test('clears only Shout-owned stages when the Pokemon switches or faints', () => {
    const pokemon = makeBattlePokemon({
      statStages: {
        attack: 2,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
        crit: 0,
        accuracy: 0,
        evasion: 0,
      },
    })

    applyShoutStatBoost(pokemon, 1)
    pokemon.statStages!.attack += 1
    clearPokemonSecondaryStatuses(pokemon)

    expect(pokemon.shoutBoost).toBeUndefined()
    expect(pokemon.statStages?.attack).toBe(3)
    expect(clearShoutStatBoost(pokemon)).toBe(false)
  })

  test('does not pass Shout-owned stages through a stat-passing switch', () => {
    const pokemon = makeBattlePokemon()
    applyShoutStatBoost(pokemon, 1)

    const passed = removeShoutBoostFromStatStages(pokemon, {
      attack: 1,
      defense: 1,
      specialAttack: 1,
      specialDefense: 1,
      speed: 1,
      crit: 0,
      accuracy: 0,
      evasion: 0,
    })

    expect(passed).toEqual({
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      crit: 0,
      accuracy: 0,
      evasion: 0,
    })
  })
})
