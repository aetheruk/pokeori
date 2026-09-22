export const DEFAULT_PVP_RATING = 1000
export const PVP_RATING_K_FACTOR = 32

export interface PvpRankingData {
  rating?: number | null
  wins?: number | null
  losses?: number | null
  draws?: number | null
  lastBattleAt?: string | null
}

export interface PvpRatingChange {
  before: number
  after: number
  change: number
}

export type PvpMatchResult = 'win' | 'loss' | 'draw'

function finiteNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

export function getPvpRating(rankings: PvpRankingData | null | undefined): number {
  return Math.max(
    0,
    Math.round(finiteNumber(rankings?.rating, DEFAULT_PVP_RATING)),
  )
}

export function getPvpRecord(rankings: PvpRankingData | null | undefined) {
  return {
    rating: getPvpRating(rankings),
    wins: Math.max(0, Math.floor(finiteNumber(rankings?.wins, 0))),
    losses: Math.max(0, Math.floor(finiteNumber(rankings?.losses, 0))),
    draws: Math.max(0, Math.floor(finiteNumber(rankings?.draws, 0))),
    lastBattleAt:
      typeof rankings?.lastBattleAt === 'string'
        ? rankings.lastBattleAt
        : undefined,
  }
}

function expectedScore(rating: number, opponentRating: number): number {
  return 1 / (1 + 10 ** ((opponentRating - rating) / 400))
}

function scoreForResult(result: PvpMatchResult): number {
  if (result === 'win') return 1
  if (result === 'loss') return 0
  return 0.5
}

/**
 * Calculate a zero-sum Elo update for a two-player match.
 * A draw is represented by half a point for each player.
 */
export function calculatePvpRatingChanges(
  playerRating: number,
  opponentRating: number,
  result: PvpMatchResult,
): { player: PvpRatingChange; opponent: PvpRatingChange } {
  const beforePlayer = getPvpRating({ rating: playerRating })
  const beforeOpponent = getPvpRating({ rating: opponentRating })
  const playerDelta = Math.round(
    PVP_RATING_K_FACTOR *
      (scoreForResult(result) - expectedScore(beforePlayer, beforeOpponent)),
  )
  const opponentDelta = playerDelta === 0 ? 0 : -playerDelta

  const playerChange: PvpRatingChange = {
    before: beforePlayer,
    after: Math.max(0, beforePlayer + playerDelta),
    change: playerDelta,
  }
  const opponentChange: PvpRatingChange = {
    before: beforeOpponent,
    after: Math.max(0, beforeOpponent + opponentDelta),
    change: opponentDelta,
  }

  return { player: playerChange, opponent: opponentChange }
}

export function applyPvpRatingResult(
  rankings: PvpRankingData | null | undefined,
  change: PvpRatingChange,
  result: PvpMatchResult,
  playedAt: string,
) {
  const record = getPvpRecord(rankings)
  return {
    rating: change.after,
    wins: record.wins + (result === 'win' ? 1 : 0),
    losses: record.losses + (result === 'loss' ? 1 : 0),
    draws: record.draws + (result === 'draw' ? 1 : 0),
    lastBattleAt: playedAt,
  }
}
