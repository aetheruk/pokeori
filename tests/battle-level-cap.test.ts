import { describe, expect, test } from 'bun:test'

import {
  getBattleLevelCap,
  resolveBattleLevelCap,
  TRAINER_BATTLE_LEVEL_ADVANTAGE,
  WILD_BATTLE_LEVEL_ADVANTAGE,
} from '@/utilities/battle/level-cap'
import { battles } from '@/data/battles'
import { BATTLE_LEVEL_CAP_OVERRIDES } from '@/data/battles/level-cap-overrides'

describe('battle level caps', () => {
  test('ordinary trainer battles give a five-level advantage', () => {
    expect(
      resolveBattleLevelCap({
        enemyLevels: [12, 15, 14],
        isWildBattle: false,
      }),
    ).toBe(15 + TRAINER_BATTLE_LEVEL_ADVANTAGE)
  })

  test('ordinary wild battles give a ten-level advantage', () => {
    expect(
      getBattleLevelCap(
        { isWildBattle: true },
        [5, 8],
      ),
    ).toBe(8 + WILD_BATTLE_LEVEL_ADVANTAGE)
  })

  test('the badge cap bounds a derived battle cap', () => {
    expect(
      resolveBattleLevelCap({
        enemyLevels: [30],
        isWildBattle: true,
        badgeLevelCap: 35,
      }),
    ).toBe(35)
    expect(
      resolveBattleLevelCap({
        enemyLevels: [30],
        isWildBattle: true,
        badgeLevelCap: 40,
      }),
    ).toBe(40)
  })

  test('an authored override wins over the shared rule and remains badge bounded', () => {
    expect(
      resolveBattleLevelCap({
        authoredLevelCap: 30,
        enemyLevels: [10],
        isWildBattle: false,
        badgeLevelCap: 20,
      }),
    ).toBe(20)
    expect(
      resolveBattleLevelCap({
        authoredLevelCap: 15,
        enemyLevels: [30],
        isWildBattle: false,
        badgeLevelCap: 20,
      }),
    ).toBe(15)
  })

  test('every fixed override targets an authored battle', () => {
    const battleIds = new Set(battles.map((battle) => battle.id))
    expect(
      Object.keys(BATTLE_LEVEL_CAP_OVERRIDES).every((battleId) =>
        battleIds.has(battleId),
      ),
    ).toBe(true)
  })
})
