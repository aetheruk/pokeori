import { expect, test } from 'bun:test'
import { applyDiglettTap, createDiglettRound } from '@/utilities/research/diglett-authority'

const settings = { gridSize: { rows: 3, cols: 3 }, targetScore: 5, timeLimit: 30, spawnIntervalMs: 1000, visibleMs: 600, maxLives: 3 }
test('Diglett rewards only a visible, correct hole once and cannot tap future spawns', () => {
  const round = createDiglettRound(settings, 1000, () => 0.1)
  expect(() => applyDiglettTap(settings, round, 0, 0, 2499)).toThrow('underground')
  expect(() => applyDiglettTap(settings, round, 0, 1, 2500)).toThrow('empty')
  const result = applyDiglettTap(settings, round, 0, 0, 2500)
  expect(result.round.score).toBe(1)
  expect(round.score).toBe(0)
  expect(() => applyDiglettTap(settings, result.round, 0, 0, 2501)).toThrow('empty')
  expect(() => applyDiglettTap(settings, round, 1, 0, 2500)).toThrow('underground')
  expect(() => applyDiglettTap(settings, round, 0, 0, 3501)).toThrow('underground')
})
test('Diglett hazards consume a life and exhausted sessions reject new score', () => {
  const round = createDiglettRound(settings, 1000, () => 0.9)
  const result = applyDiglettTap(settings, { ...round, lives: 1 }, 0, 8, 2500)
  expect(result.round.lives).toBe(0)
  expect(result.round.score).toBe(0)
  expect(result.gameOver).toBe(true)
  expect(() => applyDiglettTap(settings, result.round, 1, 8, 3500)).toThrow('complete')
  expect(() => applyDiglettTap(settings, round, 0, 8, round.deadline + 401)).toThrow('Time is up')
})
