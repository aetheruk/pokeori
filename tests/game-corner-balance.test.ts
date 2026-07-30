import { describe, expect, test } from 'bun:test'
import { getGameTypeLabel } from '@/components/game/features/explore/utils'
import { battleBetsGames } from '@/data/games/battle-bets'
import { celadonGameCornermatch3gamesEntries } from '@/data/games/match3/entries/celadon-game-corner'
import { celadonGameCornerPachinkoEntries } from '@/data/games/pachinko/entries/celadon-game-corner'
import { celadonGameCornerPrizeWheelEntries } from '@/data/games/prize-wheel/entries/celadon-game-corner'
import { celadonGameCornerSlotEntries } from '@/data/games/slots/entries/celadon-game-corner'
import { scratchCards } from '@/data/scratchcards'
import { celadonGameCornerShops } from '@/data/shops/entries/celadon-game-corner'
import { celadonGameCornerTasks } from '@/data/tasks/entries/celadon-game-corner'
import {
  getPachinkoBonusFan,
  getPachinkoBucketSensor,
  getPachinkoDropX,
  PACHINKO_DROP_TIMEOUT_MS,
} from '@/utilities/research/pachinko-physics'
import { splitGuaranteedPachinkoCurrencyRewards } from '@/utilities/research/pachinko-rewards'
import { resolvePachinkoRound } from '@/utilities/research/pachinko-round'

function getSlotRtp(game: (typeof celadonGameCornerSlotEntries)[number]) {
  const totalWeight = game.settings.paytable.reduce(
    (total, line) => total + line.weight,
    0,
  )
  const winRate = Number(game.settings.winRate) / 100
  const expectedReturn = game.settings.paytable.reduce((total, line) => {
    const quantity = Number(line.rewards[0]?.quantity || 0)
    return total + winRate * (line.weight / totalWeight) * quantity
  }, 0)

  return expectedReturn / game.settings.cost.amount
}

function getPrizeWheelRtp(
  game: (typeof celadonGameCornerPrizeWheelEntries)[number],
) {
  const expectedReturn = game.settings.slots.reduce((total, slot) => {
    const reward = slot.rewards[0]
    if (!reward) return total

    const quantity = Number(reward.quantity || 0)
    const value =
      reward.type === 'currency' && reward.targetId === 'fun-tokens'
        ? quantity
        : reward.type === 'item' && reward.targetId === 'rocket-scratch'
          ? quantity * 100
          : 0

    return total + (slot.percentage / 100) * value
  }, 0)

  return expectedReturn / Number(game.settings.cost?.amount || 1)
}

describe('Celadon Game Corner balance and presentation', () => {
  test('uses the authored standard-game token costs', () => {
    expect(celadonGameCornerPrizeWheelEntries[0].settings.cost?.amount).toBe(25)
    expect(celadonGameCornerSlotEntries[0].settings.cost.amount).toBe(5)
    expect(celadonGameCornerPachinkoEntries[0].settings.cost?.amount).toBe(5)
  })

  test('uses the revised Stardust and Nugget Prize Exchange prices', () => {
    const prizeExchange = celadonGameCornerShops.find(
      (shop) => shop.id === 'celadon-game-corner-prize-exchange',
    )

    expect(
      prizeExchange?.items.find((item) => item.id === 'game-corner-stardust')
        ?.cost[0]?.amount,
    ).toBe(600)
    expect(
      prizeExchange?.items.find((item) => item.id === 'game-corner-stardust')
        ?.stock,
    ).toBe(25)
    expect(
      prizeExchange?.items.find((item) => item.id === 'game-corner-nugget')
        ?.cost[0]?.amount,
    ).toBe(2500)
    expect(
      prizeExchange?.items.find((item) => item.id === 'game-corner-nugget')
        ?.stock,
    ).toBe(10)
  })

  test('awards Porygon in a Poké Ball with the Silph Co. background', () => {
    const prizeExchange = celadonGameCornerShops.find(
      (shop) => shop.id === 'celadon-game-corner-prize-exchange',
    )
    const porygonReward = prizeExchange?.items.find(
      (item) => item.id === 'game-corner-porygon',
    )?.rewards[0]

    expect(porygonReward?.pokemonData?.ballType).toBe('poke-ball')
    expect(porygonReward?.pokemonData?.background).toBe(
      '/backgrounds/silph.avif',
    )
  })

  test('unlocks High Roller at 1,000 tokens and scales the fixed-payout games by five', () => {
    const highRoller = celadonGameCornerTasks.find(
      (task) => task.id === 'high-roller',
    )
    const tokenRequirement = highRoller?.requirements.find(
      (requirement) =>
        requirement.type === 'currency_owned' &&
        requirement.targetId === 'fun-tokens',
    )
    expect(tokenRequirement?.count).toBe(1000)

    expect(celadonGameCornerSlotEntries[1].settings.cost.amount).toBe(25)
    expect(
      celadonGameCornerSlotEntries[1].settings.paytable.map(
        (line) => line.rewards[0]?.quantity,
      ),
    ).toEqual([25, 75, 250, 500, 5500])

    expect(celadonGameCornerPrizeWheelEntries[1].settings.cost?.amount).toBe(
      125,
    )

    expect(celadonGameCornerPachinkoEntries[1].settings.cost?.amount).toBe(25)
    expect(
      celadonGameCornerPachinkoEntries[1].settings.board.buckets
        .filter((bucket) => bucket.kind !== 'bonus')
        .map((bucket) => bucket.rewards[0]?.quantity),
    ).toEqual([75, 250, 75])
    expect(
      celadonGameCornerPachinkoEntries[0].settings.board.buckets
        .filter((bucket) => bucket.kind !== 'bonus')
        .map((bucket) => bucket.label),
    ).toEqual(['Prize', 'Jackpot', 'Prize'])
    expect(
      celadonGameCornerPachinkoEntries[1].settings.board.buckets
        .filter((bucket) => bucket.kind !== 'bonus')
        .map((bucket) => bucket.label),
    ).toEqual(['Prize', 'Jackpot', 'Prize'])

    expect(celadonGameCornermatch3gamesEntries[1].criteria?.[0]?.count).toBe(50)
    expect(celadonGameCornermatch3gamesEntries[1].rewards?.[0]?.quantity).toBe(
      250,
    )
    expect(celadonGameCornermatch3gamesEntries[0].settings.winScore).toBe(1000)
    expect(celadonGameCornermatch3gamesEntries[1].settings.winScore).toBe(1400)
  })

  test('settles Pachinko token prizes at their authored gross value', () => {
    const [standard, highStakes] = celadonGameCornerPachinkoEntries
    const standardLeft = standard.settings.board.buckets[0]
    const highStakesLeft = highStakes.settings.board.buckets[0]

    const standardSettlement = splitGuaranteedPachinkoCurrencyRewards(
      standardLeft.rewards,
      standard.settings.cost!.currencyType,
    )
    const highStakesSettlement = splitGuaranteedPachinkoCurrencyRewards(
      highStakesLeft.rewards,
      highStakes.settings.cost!.currencyType,
    )

    expect(standardSettlement.guaranteedCurrencyPayout).toBe(15)
    expect(highStakesSettlement.guaranteedCurrencyPayout).toBe(75)
    expect(standardSettlement.deferredRewards).toEqual([])
    expect(highStakesSettlement.deferredRewards).toEqual([])

    expect(
      100 -
        standard.settings.cost!.amount +
        standardSettlement.guaranteedCurrencyPayout,
    ).toBe(110)
    expect(
      100 -
        highStakes.settings.cost!.amount +
        highStakesSettlement.guaranteedCurrencyPayout,
    ).toBe(150)
  })

  test('uses the rare-jackpot High Stakes Prize Wheel payout table', () => {
    const highStakesWheel = celadonGameCornerPrizeWheelEntries[1]
    const outcomes = Object.fromEntries(
      highStakesWheel.settings.slots.map((slot) => [
        slot.id,
        {
          percentage: slot.percentage,
          quantity: slot.rewards[0]?.quantity || 0,
          targetId: slot.rewards[0]?.targetId || null,
        },
      ]),
    )

    expect(
      highStakesWheel.settings.slots.reduce(
        (total, slot) => total + slot.percentage,
        0,
      ),
    ).toBe(100)
    expect(outcomes).toEqual({
      nothing: { percentage: 66.49, quantity: 0, targetId: null },
      'one-twenty-five': {
        percentage: 18,
        quantity: 125,
        targetId: 'fun-tokens',
      },
      'five-hundred': {
        percentage: 10,
        quantity: 500,
        targetId: 'fun-tokens',
      },
      'one-thousand': {
        percentage: 5,
        quantity: 1000,
        targetId: 'fun-tokens',
      },
      'scratch-card': {
        percentage: 0.5,
        quantity: 5,
        targetId: 'rocket-scratch',
      },
      'ultra-jackpot': {
        percentage: 0.01,
        quantity: 250000,
        targetId: 'fun-tokens',
      },
    })
  })

  test('scales the standard Prize Wheel token stakes and prizes by five', () => {
    const standardWheel = celadonGameCornerPrizeWheelEntries[0]
    const outcomes = Object.fromEntries(
      standardWheel.settings.slots.map((slot) => [
        slot.id,
        {
          percentage: slot.percentage,
          quantity: slot.rewards[0]?.quantity || 0,
          targetId: slot.rewards[0]?.targetId || null,
        },
      ]),
    )

    expect(
      standardWheel.settings.slots.reduce(
        (total, slot) => total + slot.percentage,
        0,
      ),
    ).toBe(100)
    expect(outcomes).toEqual({
      nothing: { percentage: 66.49, quantity: 0, targetId: null },
      'twenty-five': {
        percentage: 18,
        quantity: 25,
        targetId: 'fun-tokens',
      },
      'one-hundred': {
        percentage: 10,
        quantity: 100,
        targetId: 'fun-tokens',
      },
      'two-hundred': {
        percentage: 5,
        quantity: 200,
        targetId: 'fun-tokens',
      },
      'scratch-card': {
        percentage: 0.5,
        quantity: 1,
        targetId: 'rocket-scratch',
      },
      'ultra-jackpot': {
        percentage: 0.01,
        quantity: 50000,
        targetId: 'fun-tokens',
      },
    })
  })

  test('keeps Slots and Prize Wheel long-run RTP near 120%', () => {
    expect(getSlotRtp(celadonGameCornerSlotEntries[0])).toBeCloseTo(1.198, 10)
    expect(getSlotRtp(celadonGameCornerSlotEntries[1])).toBeCloseTo(1.198, 10)
    expect(getPrizeWheelRtp(celadonGameCornerPrizeWheelEntries[0])).toBeCloseTo(
      1.2,
      10,
    )
    expect(getPrizeWheelRtp(celadonGameCornerPrizeWheelEntries[1])).toBeCloseTo(
      1.2,
      10,
    )
  })

  test('awards an exact 1-in-1,000 Rocket Slots jackpot', () => {
    for (const [game, expectedPrize] of [
      [celadonGameCornerSlotEntries[0], 1100],
      [celadonGameCornerSlotEntries[1], 5500],
    ] as const) {
      const jackpot = game.settings.paytable.find(
        (line) => line.icons[0] === 'jackpot',
      )
      const totalWeight = game.settings.paytable.reduce(
        (total, line) => total + line.weight,
        0,
      )
      const winRate = Number(game.settings.winRate) / 100
      const jackpotOdds = winRate * ((jackpot?.weight || 0) / totalWeight)

      expect(jackpot?.rewards[0]?.quantity).toBe(expectedPrize)
      expect(jackpotOdds).toBe(1 / 1000)
    }
  })

  test('uses viewport-independent Pachinko drop and capture geometry', () => {
    const game = celadonGameCornerPachinkoEntries[0]
    const ballRadius = game.settings.ballRadius || 8
    const jackpot = game.settings.board.buckets.find(
      (bucket) => bucket.id === 'fifty',
    )

    const leftBucket = game.settings.board.buckets.find(
      (bucket) => bucket.id === 'fifteen-left',
    )
    const rightBucket = game.settings.board.buckets.find(
      (bucket) => bucket.id === 'fifteen-right',
    )

    expect(leftBucket).toMatchObject({ x: 70, width: 90 })
    expect(jackpot?.width).toBe(32)
    expect(rightBucket).toMatchObject({ x: 530, width: 90 })
    expect(
      getPachinkoDropX({
        arrowPosition: 0,
        boardWidth: game.settings.board.width,
        ballRadius,
      }),
    ).toBe(14)
    expect(
      getPachinkoDropX({
        arrowPosition: 100,
        boardWidth: game.settings.board.width,
        ballRadius,
      }),
    ).toBe(586)
    expect(jackpot && getPachinkoBucketSensor(jackpot, ballRadius)).toEqual({
      x: 300,
      y: 773,
      width: 10,
      height: 2,
    })
    expect(PACHINKO_DROP_TIMEOUT_MS).toBe(30_000)
  })

  test('resolves one paid Pachinko round into five bonus outcomes', () => {
    const buckets = celadonGameCornerPachinkoEntries[0].settings.board.buckets
    const resolved = resolvePachinkoRound(buckets, {
      roundId: 'round-1',
      triggerBucketId: 'bonus-left',
      outcomeBucketIds: ['fifteen-left', null, 'fifty', 'fifteen-left', null],
    })

    expect(resolved).toEqual({
      valid: true,
      isBonus: true,
      hitBuckets: [
        expect.objectContaining({ id: 'fifteen-left' }),
        expect.objectContaining({ id: 'fifty' }),
        expect.objectContaining({ id: 'fifteen-left' }),
      ],
      hitCounts: {
        'fifteen-left': 2,
        fifty: 1,
      },
    })
    if (resolved.valid) {
      expect(
        splitGuaranteedPachinkoCurrencyRewards(
          resolved.hitBuckets.flatMap((bucket) => bucket.rewards),
          'fun-tokens',
        ).guaranteedCurrencyPayout,
      ).toBe(80)
    }

    expect(
      resolvePachinkoRound(buckets, {
        roundId: 'round-2',
        triggerBucketId: 'bonus-left',
        outcomeBucketIds: ['fifty'],
      }),
    ).toEqual({
      valid: false,
      error: 'Bonus drops must resolve 5 balls',
    })
    expect(
      resolvePachinkoRound(buckets, {
        roundId: 'round-3',
        outcomeBucketIds: ['bonus-right'],
      }),
    ).toEqual({
      valid: false,
      error: 'Invalid outcome bucket',
    })
  })

  test('fans all five Pachinko bonus balls within the board walls', () => {
    expect(
      getPachinkoBonusFan({
        dropX: 300,
        boardWidth: 600,
        ballRadius: 8,
      }),
    ).toEqual([
      { x: 284, xVelocity: -2.4 },
      { x: 292, xVelocity: -1.2 },
      { x: 300, xVelocity: 0 },
      { x: 308, xVelocity: 1.2 },
      { x: 316, xVelocity: 2.4 },
    ])
    expect(
      getPachinkoBonusFan({
        dropX: 14,
        boardWidth: 600,
        ballRadius: 8,
      }).map((ball) => ball.x),
    ).toEqual([14, 14, 14, 22, 30])
  })

  test('uses Voltorb and Electrode for the Pachinko jackpots', () => {
    const [standard, highStakes] = celadonGameCornerPachinkoEntries

    expect(
      standard.settings.board.buckets.find(
        (bucket) => bucket.kind === 'jackpot',
      )?.icon,
    ).toEqual({ type: 'pokemon', id: '100' })
    expect(
      highStakes.settings.board.buckets.find(
        (bucket) => bucket.kind === 'jackpot',
      )?.icon,
    ).toEqual({ type: 'pokemon', id: '101' })
  })

  test('shows named slot prizes and distinguishable wheel segments', () => {
    const standardSlots = celadonGameCornerSlotEntries[0]
    expect(
      standardSlots.settings.paytable.every((line) =>
        line.rewards[0]?.label?.includes('Fun Tokens'),
      ),
    ).toBe(true)

    const standardWheel = celadonGameCornerPrizeWheelEntries[0]
    const wheelIcons = standardWheel.settings.slots.map((slot) =>
      JSON.stringify(slot.icon),
    )
    expect(new Set(wheelIcons).size).toBe(wheelIcons.length)
  })

  test('uses a different Explore icon for each standard game type', () => {
    const icons = [
      celadonGameCornerSlotEntries[0].icon,
      celadonGameCornerPrizeWheelEntries[0].icon,
      celadonGameCornerPachinkoEntries[0].icon,
      celadonGameCornermatch3gamesEntries[0].icon,
    ].map((icon) => JSON.stringify(icon))

    expect(new Set(icons).size).toBe(icons.length)
  })

  test('labels Battle Bets as a distinct Explore game type', () => {
    expect(
      getGameTypeLabel({
        id: battleBetsGames[0].id,
        type: 'game',
        originalData: { ...battleBetsGames[0], gameType: 'battle-bets' },
      } as any),
    ).toBe('BATTLE BETS')
  })

  test('starts Battle Bets for free and leaves the stake to the game flow', () => {
    const battleBetsTask = celadonGameCornerTasks.find(
      (task) => task.id === 'battle-bets',
    )

    expect(battleBetsTask?.criteria).toEqual([])
    expect(battleBetsGames[0].settings).not.toHaveProperty('buyIn')
  })

  test('Rocket Scratch Cards use the revised token prizes and rare cosmetics', () => {
    const card = scratchCards['rocket-scratch']
    expect(
      card.rewards.reduce((total, outcome) => total + outcome.chance, 0),
    ).toBe(100)

    expect(card.rewards.every((outcome) => outcome.reward?.length)).toBe(true)
    expect(card.rewards).toContainEqual(
      expect.objectContaining({
        chance: 25,
        reward: [
          expect.objectContaining({
            type: 'item',
            targetId: 'rocket-ball',
            quantity: 3,
          }),
        ],
      }),
    )
    expect(card.rewards).toContainEqual(
      expect.objectContaining({
        chance: 1,
        reward: [
          expect.objectContaining({ type: 'icon', targetId: 'gambler' }),
        ],
      }),
    )
    expect(card.rewards).toContainEqual(
      expect.objectContaining({
        chance: 1,
        reward: [
          expect.objectContaining({ type: 'title', targetId: 'gambler' }),
        ],
      }),
    )
    expect(card.rewards).toContainEqual(
      expect.objectContaining({
        chance: 1,
        reward: [
          expect.objectContaining({
            type: 'banner',
            targetId: 'celadon-game-corner',
          }),
        ],
      }),
    )
    expect(
      card.rewards.some((outcome) =>
        outcome.reward?.some((reward) => reward.targetId === 'stardust'),
      ),
    ).toBe(false)

    const expectedTokenValue = card.rewards.reduce((total, outcome) => {
      const outcomeValue = (outcome.reward || []).reduce((value, reward) => {
        const quantity =
          typeof reward.quantity === 'number' ? reward.quantity : 0
        if (reward.type === 'currency' && reward.targetId === 'fun-tokens') {
          return value + quantity
        }
        return value
      }, 0)

      return total + (outcome.chance / 100) * outcomeValue
    }, 0)

    expect(expectedTokenValue).toBe(67.5)
  })
})
