import { describe, expect, test } from 'bun:test'
import { applyMatch3Move, createMatch3Round, findMatch3Matches, hasMatch3Move, type Match3Position } from '@/utilities/research/match3'
import type { Match3GameSettings } from '@/data/games/match3/types'

const settings: Match3GameSettings = {
  gridSize: { rows: 6, cols: 6 }, timeLimit: 60, pointsPerMatch: 10, cascadeMultiplier: 1.5,
  crystalTypes: ['red', 'green', 'blue', 'yellow', 'purple'].map((id) => ({ id, color: id, icon: { type: 'item', id: 'potion' } })),
}
function seededRandom(seed: number) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32 }
}
function findMove(grid: ReturnType<typeof createMatch3Round>['grid'], wanted: boolean): [Match3Position, Match3Position] {
  for (let row = 0; row < grid.length; row++) for (let col = 0; col < grid[row].length - 1; col++) {
    const candidate = structuredClone(grid)
    ;[candidate[row][col], candidate[row][col + 1]] = [candidate[row][col + 1], candidate[row][col]]
    if ((findMatch3Matches(candidate).length > 0) === wanted) return [{ row, col }, { row, col: col + 1 }]
  }
  throw new Error('Test board lacks expected swap')
}

describe('server-authoritative Match 3', () => {
  test('initial boards have no free matches, have a legal move, and stable unique cell IDs', () => {
    const round = createMatch3Round(settings, 61_000, seededRandom(1))
    expect(findMatch3Matches(round.grid)).toEqual([])
    expect(hasMatch3Move(round.grid)).toBe(true)
    expect(new Set(round.grid.flat().map(({ key }) => key)).size).toBe(36)
    expect(round.score).toBe(0)
  })
  test('derives score and cascade playback from legal swaps without modifying the source snapshot', () => {
    const round = createMatch3Round(settings, 61_000, seededRandom(1))
    const snapshot = structuredClone(round)
    const [from, to] = findMove(round.grid, true)
    const result = applyMatch3Move(settings, round, from, to, 1000, seededRandom(42))
    expect(result.accepted).toBe(true)
    expect(result.round.score).toBeGreaterThanOrEqual(30)
    expect(result.round.score).toBe(result.cascades.at(-1)!.score)
    expect(result.round.revision).toBe(1)
    expect(result.round.deadline).toBe(61_000 + 200 + result.cascades.length * 500)
    expect(findMatch3Matches(result.round.grid)).toEqual([])
    expect(round).toEqual(snapshot)
    expect(() => applyMatch3Move(settings, result.round, from, to, 1001)).toThrow('still resolving')
  })
  test('invalid swaps cannot grant points or move the board', () => {
    const round = createMatch3Round(settings, 61_000, seededRandom(1))
    const [from, to] = findMove(round.grid, false)
    const result = applyMatch3Move(settings, round, from, to, 1000)
    expect(result.accepted).toBe(false)
    expect(result.round.score).toBe(0)
    expect(result.round.grid).toEqual(round.grid)
    expect(result.cascades).toEqual([])
    expect(() => applyMatch3Move(settings, round, from, { row: 5, col: 5 }, 1000)).toThrow('adjacent')
    expect(() => applyMatch3Move(settings, round, from, { row: -1, col: 0 }, 1000)).toThrow('Invalid')
  })
  test('rejects expired boards and starts endless turn deadlines only after a scoring move', () => {
    const round = createMatch3Round(settings, 61_000, seededRandom(1))
    const [from, to] = findMove(round.grid, true)
    expect(() => applyMatch3Move(settings, round, from, to, 62_000)).toThrow('Time is up')
    const endless = { ...settings, endless: { enabled: true, milestones: [] } }
    const endlessRound = createMatch3Round(endless, 61_000, seededRandom(1))
    expect(endlessRound.deadline).toBeNull()
    const result = applyMatch3Move(endless, endlessRound, from, to, 120_000, seededRandom(42))
    expect(result.round.deadline).toBe(result.round.availableAt + 60_000)
  })
})
