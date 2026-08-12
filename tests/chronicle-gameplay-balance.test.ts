import { describe, expect, test } from 'bun:test'
import { allGames } from '@/data/games'
import { procedureOrderGames } from '@/data/games/procedure-order'
import { validateProcedureOrder } from '@/utilities/research/procedure-order'

interface Point {
  x: number
  y: number
}
const key = ({ x, y }: Point) => `${x},${y}`
const moves = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
]

function shortestGridPath(settings: any): number | null {
  const blocked = new Set(
    [...(settings.walls || []), ...(settings.holes || [])].map(key),
  )
  const queue = [{ ...settings.playerStart, distance: 0 }]
  const visited = new Set([key(settings.playerStart)])
  while (queue.length) {
    const current = queue.shift()!
    if (current.x === settings.exit.x && current.y === settings.exit.y)
      return current.distance
    for (const delta of moves) {
      const next = { x: current.x + delta.x, y: current.y + delta.y }
      const nextKey = key(next)
      if (
        next.x < 0 ||
        next.y < 0 ||
        next.x >= settings.gridSize.cols ||
        next.y >= settings.gridSize.rows ||
        blocked.has(nextKey) ||
        visited.has(nextKey)
      )
        continue
      visited.add(nextKey)
      queue.push({ ...next, distance: current.distance + 1 })
    }
  }
  return null
}

function solveSokoban(settings: any): number | null {
  const size = settings.grid_size
  const barriers = new Set((settings.barriers || []).map(key))
  const holes = new Set((settings.holes || []).map(key))
  const startBoulders = (settings.boulders || []).map(key).sort()
  const queue = [
    { player: settings.playerStart, boulders: startBoulders, distance: 0 },
  ]
  const visited = new Set([
    `${key(settings.playerStart)}|${startBoulders.join(';')}`,
  ])
  while (queue.length) {
    const current = queue.shift()!
    if ([...holes].every((hole) => current.boulders.includes(hole)))
      return current.distance
    const boulders = new Set(current.boulders)
    for (const delta of moves) {
      const next = {
        x: current.player.x + delta.x,
        y: current.player.y + delta.y,
      }
      if (
        next.x < 0 ||
        next.y < 0 ||
        next.x >= size ||
        next.y >= size ||
        barriers.has(key(next))
      )
        continue
      const nextBoulders = [...current.boulders]
      if (boulders.has(key(next))) {
        const pushed = { x: next.x + delta.x, y: next.y + delta.y }
        if (
          pushed.x < 0 ||
          pushed.y < 0 ||
          pushed.x >= size ||
          pushed.y >= size ||
          barriers.has(key(pushed)) ||
          boulders.has(key(pushed))
        )
          continue
        nextBoulders[nextBoulders.indexOf(key(next))] = key(pushed)
        nextBoulders.sort()
      }
      const stateKey = `${key(next)}|${nextBoulders.join(';')}`
      if (visited.has(stateKey)) continue
      visited.add(stateKey)
      queue.push({
        player: next,
        boulders: nextBoulders,
        distance: current.distance + 1,
      })
    }
  }
  return null
}

describe('Chronicle gameplay balance', () => {
  test('procedure puzzles accept their authored safe order and reject reversal', () => {
    for (const game of procedureOrderGames) {
      const ids = game.settings.cards.map((card) => card.id)
      expect(
        validateProcedureOrder({
          encounterId: game.id,
          cardIds: ids,
          configuredCardIds: ids,
        }),
      ).toBe(true)
      expect(
        validateProcedureOrder({
          encounterId: game.id,
          cardIds: [...ids].reverse(),
          configuredCardIds: ids,
        }),
      ).toBe(false)
      expect(game.settings.timeLimit).toBeGreaterThanOrEqual(90)
      expect(game.settings.maxSubmissions).toBe(3)
    }
  })

  test('echo maps have a route within the authored move budget', () => {
    for (const game of allGames.filter(
      (entry) =>
        entry.id.startsWith('chronicle-v2-') &&
        entry.gameType === 'rock-tunnel-echo-map',
    )) {
      const distance = shortestGridPath(game.settings)
      expect(distance, game.id).not.toBeNull()
      expect(distance!, game.id).toBeLessThanOrEqual(
        game.settings.maxMoves ?? 30,
      )
    }
  })

  test('rock-push boards are solvable within the authored move budget', () => {
    for (const game of allGames.filter(
      (entry) =>
        entry.id.startsWith('chronicle-v2-') && entry.gameType === 'rock-push',
    )) {
      const distance = solveSokoban(game.settings)
      expect(distance, game.id).not.toBeNull()
      expect(distance!, game.id).toBeLessThanOrEqual(
        game.settings.maxMoves ?? 40,
      )
    }
  })

  test('Chronicle games use deliberate mid-to-late challenge budgets', () => {
    const chronicleGames = allGames.filter((entry) =>
      entry.id.startsWith('chronicle-v2-'),
    )
    expect(chronicleGames.length).toBeGreaterThanOrEqual(20)
    for (const game of chronicleGames) {
      expect(game.settings.timeLimit ?? 30, game.id).toBeGreaterThanOrEqual(30)
    }
  })
})
