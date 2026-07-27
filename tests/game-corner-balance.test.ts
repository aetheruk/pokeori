import { describe, expect, test } from 'bun:test'
import { celadonGameCornermatch3gamesEntries } from '@/data/games/match3/entries/celadon-game-corner'
import { celadonGameCornerPachinkoEntries } from '@/data/games/pachinko/entries/celadon-game-corner'
import { celadonGameCornerPrizeWheelEntries } from '@/data/games/prize-wheel/entries/celadon-game-corner'
import { celadonGameCornerSlotEntries } from '@/data/games/slots/entries/celadon-game-corner'
import { scratchCards } from '@/data/scratchcards'
import { celadonGameCornerTasks } from '@/data/tasks/entries/celadon-game-corner'

describe('Celadon Game Corner balance and presentation', () => {
  test('uses the authored standard-game token costs', () => {
    expect(celadonGameCornerPrizeWheelEntries[0].settings.cost?.amount).toBe(10)
    expect(celadonGameCornerSlotEntries[0].settings.cost.amount).toBe(5)
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
    ).toEqual([25, 75, 250, 500])

    expect(celadonGameCornerPrizeWheelEntries[1].settings.cost?.amount).toBe(50)
    expect(
      celadonGameCornerPrizeWheelEntries[1].settings.slots
        .slice(1, 7)
        .map((slot) => slot.rewards[0]?.quantity),
    ).toEqual([50, 100, 125, 200, 300, 500])

    expect(celadonGameCornerPachinkoEntries[1].settings.cost?.amount).toBe(50)
    expect(
      celadonGameCornerPachinkoEntries[1].settings.board.buckets.map(
        (bucket) => bucket.rewards[0]?.quantity,
      ),
    ).toEqual([25, 250, 25])

    expect(celadonGameCornermatch3gamesEntries[1].criteria?.[0]?.count).toBe(50)
    expect(celadonGameCornermatch3gamesEntries[1].rewards?.[0]?.quantity).toBe(
      250,
    )
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

  test('Rocket Scratch Cards have a 75% hit rate and 92-token expected value', () => {
    const card = scratchCards['rocket-scratch']
    expect(
      card.rewards.reduce((total, outcome) => total + outcome.chance, 0),
    ).toBe(100)

    const winningChance = card.rewards.reduce(
      (total, outcome) =>
        total + ((outcome.reward?.length || 0) > 0 ? outcome.chance : 0),
      0,
    )
    expect(winningChance).toBe(75)

    const tokenExchangeValue: Record<string, number> = {
      stardust: 250,
      nugget: 1000,
    }
    const expectedValue = card.rewards.reduce((total, outcome) => {
      const outcomeValue = (outcome.reward || []).reduce((value, reward) => {
        const quantity =
          typeof reward.quantity === 'number' ? reward.quantity : 0
        if (reward.type === 'currency' && reward.targetId === 'fun-tokens') {
          return value + quantity
        }
        if (reward.type === 'item' && reward.targetId) {
          return value + (tokenExchangeValue[reward.targetId] || 0) * quantity
        }
        return value
      }, 0)

      return total + (outcome.chance / 100) * outcomeValue
    }, 0)

    expect(expectedValue).toBe(92)
  })
})
