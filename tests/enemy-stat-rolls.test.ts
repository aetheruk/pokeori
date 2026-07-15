import { describe, expect, test } from 'bun:test'
import type { BattleEnemy } from '@/data/types'
import {
  resolveEnemyBattleEvs,
  resolveEnemyBattleIvs,
} from '@/utilities/battle/enemy-stat-rolls'

function enemy(overrides: Partial<BattleEnemy> = {}): BattleEnemy {
  return {
    speciesId: 1,
    level: 5,
    ...overrides,
  }
}

function randomSequence(values: number[]): () => number {
  let index = 0
  return () => values[index++] ?? values.at(-1) ?? 0
}

describe('enemy battle stat rolling', () => {
  test('wild Pokemon roll unset IVs once and keep manual IV overrides', () => {
    const ivs = resolveEnemyBattleIvs({
      enemy: enemy({ ivs: { hp: 31 } }),
      level: 45,
      isWildBattle: true,
      random: randomSequence([0, 0.5, 0.99, 0.25, 0.75]),
    })

    expect(ivs).toEqual({
      hp: 31,
      attack: 0,
      defense: 16,
      specialAttack: 31,
      specialDefense: 8,
      speed: 24,
    })
  })

  test('trainer IVs take the best of one, two, or three rolls by level', () => {
    const low = resolveEnemyBattleIvs({
      enemy: enemy(),
      level: 29,
      random: randomSequence([0.1, 0.2, 0.3, 0.4, 0.5, 0.6]),
    })
    const mid = resolveEnemyBattleIvs({
      enemy: enemy(),
      level: 30,
      random: randomSequence([
        0.1, 0.9,
        0.8, 0.2,
        0.3, 0.4,
        0.5, 0.6,
        0.7, 0.1,
        0, 0.99,
      ]),
    })
    const high = resolveEnemyBattleIvs({
      enemy: enemy(),
      level: 50,
      random: randomSequence([
        0.1, 0.2, 0.9,
        0.4, 0.8, 0.1,
        0.3, 0.4, 0.5,
        0.6, 0.7, 0.2,
        0.5, 0.1, 0.9,
        0, 0.1, 0.99,
      ]),
    })

    expect(low.hp).toBe(3)
    expect(low.speed).toBe(19)
    expect(mid.hp).toBe(28)
    expect(mid.speed).toBe(31)
    expect(high.hp).toBe(28)
    expect(high.speed).toBe(31)
  })

  test('wild EVs are zero through 40 and 1-100 above level 40', () => {
    const low = resolveEnemyBattleEvs({
      enemy: enemy({ evs: { attack: 12 } }),
      level: 39,
      isWildBattle: true,
      random: () => 0.99,
    })
    const high = resolveEnemyBattleEvs({
      enemy: enemy(),
      level: 41,
      isWildBattle: true,
      random: randomSequence([0, 0.5, 0.99, 0.25, 0.75, 0.01]),
    })

    expect(low).toEqual({
      hp: 0,
      attack: 12,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    })
    expect(high).toEqual({
      hp: 1,
      attack: 51,
      defense: 100,
      specialAttack: 26,
      specialDefense: 76,
      speed: 2,
    })
  })

  test('trainer EV ranges step up at levels 20, 50, and 70', () => {
    const low = resolveEnemyBattleEvs({
      enemy: enemy(),
      level: 19,
      random: () => 0.99,
    })
    const mid = resolveEnemyBattleEvs({
      enemy: enemy(),
      level: 20,
      random: () => 0.999,
    })
    const strong = resolveEnemyBattleEvs({
      enemy: enemy(),
      level: 50,
      random: () => 0,
    })
    const elite = resolveEnemyBattleEvs({
      enemy: enemy({ evs: { speed: 252 } }),
      level: 70,
      random: () => 0,
    })

    expect(low.hp).toBe(70)
    expect(mid.hp).toBe(150)
    expect(strong.hp).toBe(50)
    expect(elite.hp).toBe(100)
    expect(elite.speed).toBe(252)
  })
})
