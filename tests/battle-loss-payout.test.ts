import { describe, expect, test } from 'bun:test'
import { buildTrainerBattleLossPayout } from '@/app/(frontend)/game/battles/helpers/loss-payout'

describe('trainer battle loss payout', () => {
  test('charges half of configured trainer reward money', () => {
    expect(
      buildTrainerBattleLossPayout({
        rewards: [
          {
            type: 'currency',
            targetId: 'pokedollars',
            quantity: 120,
            dropChance: 100,
          },
        ],
      }),
    ).toBe(60)
  })

  test('ignores non-trainer battle reward sources', () => {
    const rewards = [
      {
        type: 'currency' as const,
        targetId: 'pokedollars',
        quantity: 120,
        dropChance: 100,
      },
    ]

    expect(buildTrainerBattleLossPayout({ rewards, isWildBattle: true })).toBe(0)
    expect(buildTrainerBattleLossPayout({ rewards, pvp: true })).toBe(0)
    expect(buildTrainerBattleLossPayout({ rewards, disableRewards: true })).toBe(0)
  })

  test('ignores non-Pokedollar rewards', () => {
    expect(
      buildTrainerBattleLossPayout({
        rewards: [
          {
            type: 'currency',
            targetId: 'battle-points',
            quantity: 20,
            dropChance: 100,
          },
          {
            type: 'item',
            targetId: 'poke-ball',
            quantity: 1,
            dropChance: 100,
          },
        ],
      }),
    ).toBe(0)
  })
})
