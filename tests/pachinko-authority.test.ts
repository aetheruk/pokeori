import { describe, expect, test } from 'bun:test'
import { simulatePachinkoRound } from '@/utilities/research/pachinko-simulation'
import type { PachinkoGameSettings } from '@/data/games/pachinko/types'

const board: PachinkoGameSettings = {
  board: {
    width: 300, height: 400, pegs: [],
    buckets: [{ id: 'prize', x: 150, y: 350, width: 120, height: 40, rewards: [] }],
  },
}

describe('authoritative Pachinko simulation', () => {
  test('recomputes a bucket hit from release physics and gives bounded playback', () => {
    const result = simulatePachinkoRound(board, 50, 0)
    expect(result.outcomeBucketIds).toEqual(['prize'])
    expect(result.playback.phases).toHaveLength(1)
    const positions = result.playback.phases[0].balls[0].positions
    expect(positions[0]).toEqual([150, 20])
    expect(positions.length).toBeGreaterThan(2)
    expect(positions.length).toBeLessThanOrEqual(902)
    expect(positions.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y))).toBe(true)
    expect(simulatePachinkoRound(board, 50, 0)).toEqual(result)
  })

  test('a missed bucket remains a loss', () => {
    expect(simulatePachinkoRound(board, 5, 0).outcomeBucketIds).toEqual([null])
  })

  test('bonus balls are only created after a simulated bonus collision', () => {
    const bonusBoard: PachinkoGameSettings = {
      ...board,
      board: { ...board.board, buckets: [
        { id: 'bonus', kind: 'bonus', x: 150, y: 150, width: 100, height: 40, rewards: [] },
        ...board.board.buckets,
      ] },
    }
    const result = simulatePachinkoRound(bonusBoard, 50, 0)
    expect(result.triggerBucketId).toBe('bonus')
    expect(result.playback.phases.map(({ mode }) => mode)).toEqual(['normal', 'bonus'])
    expect(result.outcomeBucketIds).toHaveLength(5)
    expect(result.outcomeBucketIds).not.toContain('bonus')
    expect(simulatePachinkoRound(bonusBoard, 5, 0).playback.phases).toHaveLength(1)
  })

  test('rejects malformed and out-of-board release inputs', () => {
    for (const arrowPosition of [NaN, Infinity, -1, 101]) {
      expect(() => simulatePachinkoRound(board, arrowPosition, 0)).toThrow()
    }
    expect(() => simulatePachinkoRound(board, 50, 2)).toThrow()
  })
})
