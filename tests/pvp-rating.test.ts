import { describe, expect, test } from 'bun:test'
import {
  DEFAULT_PVP_RATING,
  PVP_RATING_K_FACTOR,
  applyPvpRatingResult,
  calculatePvpRatingChanges,
  getPvpRecord,
} from '@/utilities/battle/pvp-rating'

describe('ranked PvP rating', () => {
  test('defaults new and incomplete records to 1000 with an empty record', () => {
    expect(getPvpRecord(undefined)).toEqual({
      rating: DEFAULT_PVP_RATING,
      wins: 0,
      losses: 0,
      draws: 0,
      lastBattleAt: undefined,
    })
  })

  test('uses a zero-sum Elo update for a same-rated decisive match', () => {
    const changes = calculatePvpRatingChanges(1000, 1000, 'win')

    expect(changes.player.change).toBe(PVP_RATING_K_FACTOR / 2)
    expect(changes.player.after).toBe(1016)
    expect(changes.opponent).toEqual({
      before: 1000,
      after: 984,
      change: -16,
    })
  })

  test('awards no rating change for a same-rated draw', () => {
    expect(calculatePvpRatingChanges(1000, 1000, 'draw')).toEqual({
      player: { before: 1000, after: 1000, change: 0 },
      opponent: { before: 1000, after: 1000, change: 0 },
    })
  })

  test('keeps the match record separate from skill experience', () => {
    const result = applyPvpRatingResult(
      { rating: 1200, wins: 2, losses: 1, draws: 3 },
      { before: 1200, after: 1210, change: 10 },
      'win',
      '2026-09-22T10:00:00.000Z',
    )

    expect(result).toEqual({
      rating: 1210,
      wins: 3,
      losses: 1,
      draws: 3,
      lastBattleAt: '2026-09-22T10:00:00.000Z',
    })
  })
})
