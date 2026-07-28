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
      prizeExchange?.items.find((item) => item.id === 'game-corner-nugget')
        ?.cost[0]?.amount,
    ).toBe(2500)
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

  test('unlocks High Roller at 1,000 tokens and scales paired games by five', () => {
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
    ).toEqual([25, 75, 250, 500, 10000])

    expect(celadonGameCornerPrizeWheelEntries[1].settings.cost?.amount).toBe(
      125,
    )
    expect(
      celadonGameCornerPrizeWheelEntries[1].settings.slots
        .slice(1, 7)
        .map((slot) => slot.rewards[0]?.quantity),
    ).toEqual([50, 100, 125, 200, 300, 500])

    expect(celadonGameCornerPachinkoEntries[1].settings.cost?.amount).toBe(25)
    expect(
      celadonGameCornerPachinkoEntries[1].settings.board.buckets.map(
        (bucket) => bucket.rewards[0]?.quantity,
      ),
    ).toEqual([25, 250, 25])

    expect(celadonGameCornermatch3gamesEntries[1].criteria?.[0]?.count).toBe(50)
    expect(celadonGameCornermatch3gamesEntries[1].rewards?.[0]?.quantity).toBe(
      250,
    )
    expect(celadonGameCornermatch3gamesEntries[0].settings.winScore).toBe(1000)
    expect(celadonGameCornermatch3gamesEntries[1].settings.winScore).toBe(1400)
  })

  test('awards an exact 1-in-250 Rocket Slots jackpot', () => {
    for (const [game, expectedPrize] of [
      [celadonGameCornerSlotEntries[0], 1000],
      [celadonGameCornerSlotEntries[1], 10000],
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
      expect(jackpotOdds).toBe(1 / 250)
    }
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
