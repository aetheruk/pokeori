import { describe, expect, test } from 'bun:test'
import { allGames } from '@/data/games'
import { getRequiredResearchWins } from '@/utilities/research/required-wins'

describe('research required wins', () => {
  test('treats TCG Battle as a single resolved battle', () => {
    const tcgBattles = allGames.filter((game) => game.gameType === 'tcg-battle')

    expect(tcgBattles.length).toBeGreaterThan(0)
    for (const battle of tcgBattles) {
      expect(getRequiredResearchWins(battle)).toBe(1)
    }
  })

  test('preserves special completion rules for other research game families', () => {
    const prizeWheel = allGames.find((game) => game.gameType === 'prize-wheel')
    const match3 = allGames.find((game) => game.gameType === 'match3' && typeof game.settings.winScore === 'number')
    const fieldObservation = allGames.find((game) => game.gameType === 'field-observation')

    expect(prizeWheel && getRequiredResearchWins(prizeWheel)).toBe(0)
    expect(match3 && getRequiredResearchWins(match3)).toBe(1)
    expect(fieldObservation && getRequiredResearchWins(fieldObservation)).toBe(1)
  })
})
