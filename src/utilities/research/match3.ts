import type { Match3GameSettings } from '@/data/games/match3/types'

export type Match3Cell = { crystalId: string; key: number }
export type Match3RoundState = {
  kind: 'match3'
  grid: Match3Cell[][]
  score: number
  revision: number
  nextKey: number
  deadline: number | null
  availableAt: number
}
export type Match3Position = { row: number; col: number }
export type Match3Cascade = { grid: Match3Cell[][]; matched: Array<[number, number]>; score: number }

export function findMatch3Matches(grid: Match3Cell[][]): Array<[number, number]> {
  const matches = new Map<string, [number, number]>()
  const rows = grid.length
  const cols = grid[0]?.length || 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const [dr, dc] of [[0, 1], [1, 0]]) {
        const id = grid[row][col].crystalId
        let count = 1
        while (row + count * dr < rows && col + count * dc < cols &&
          grid[row + count * dr][col + count * dc].crystalId === id) count++
        if (count >= 3) {
          for (let offset = 0; offset < count; offset++) {
            const r = row + offset * dr
            const c = col + offset * dc
            matches.set(`${r},${c}`, [r, c])
          }
        }
      }
    }
  }
  return [...matches.values()]
}

function swap(grid: Match3Cell[][], from: Match3Position, to: Match3Position) {
  const cell = grid[from.row][from.col]
  grid[from.row][from.col] = grid[to.row][to.col]
  grid[to.row][to.col] = cell
}

export function hasMatch3Move(grid: Match3Cell[][]): boolean {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      for (const [dr, dc] of [[0, 1], [1, 0]]) {
        const from = { row, col }
        const to = { row: row + dr, col: col + dc }
        if (!grid[to.row]?.[to.col]) continue
        swap(grid, from, to)
        const matched = findMatch3Matches(grid).length > 0
        swap(grid, from, to)
        if (matched) return true
      }
    }
  }
  return false
}

function randomCell(settings: Match3GameSettings, round: Match3RoundState, random: () => number, excluded: string[] = []): Match3Cell {
  const choices = settings.crystalTypes.filter((crystal) => (crystal.spawnWeight ?? 1) > 0 && !excluded.includes(crystal.id))
  const weight = choices.reduce((sum, crystal) => sum + (crystal.spawnWeight ?? 1), 0)
  if (!choices.length || !Number.isFinite(weight)) throw new Error('Invalid Match 3 crystal configuration')
  let value = random() * weight
  const chosen = choices.find((crystal) => {
    value -= crystal.spawnWeight ?? 1
    return value < 0
  }) || choices[choices.length - 1]
  return { crystalId: chosen.id, key: round.nextKey++ }
}

function freshGrid(settings: Match3GameSettings, round: Match3RoundState, random: () => number) {
  const { rows, cols } = settings.gridSize
  if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 3 || cols < 3 || rows > 16 || cols > 16) {
    throw new Error('Invalid Match 3 board dimensions')
  }
  for (let attempt = 0; attempt < 100; attempt++) {
    const grid: Match3Cell[][] = []
    for (let row = 0; row < rows; row++) {
      grid.push([])
      for (let col = 0; col < cols; col++) {
        const excluded: string[] = []
        if (col >= 2 && grid[row][col - 1].crystalId === grid[row][col - 2].crystalId) excluded.push(grid[row][col - 1].crystalId)
        if (row >= 2 && grid[row - 1][col].crystalId === grid[row - 2][col].crystalId) excluded.push(grid[row - 1][col].crystalId)
        grid[row].push(randomCell(settings, round, random, excluded))
      }
    }
    if (hasMatch3Move(grid)) return grid
  }
  throw new Error('Unable to generate a playable Match 3 board')
}

export function createMatch3Round(settings: Match3GameSettings, deadline: number, random = Math.random): Match3RoundState {
  const round: Match3RoundState = {
    kind: 'match3', grid: [], score: 0, revision: 0, nextKey: 0,
    deadline: settings.endless?.enabled || !settings.timeLimit ? null : deadline, availableAt: 0,
  }
  round.grid = freshGrid(settings, round, random)
  return round
}

export function applyMatch3Move(
  settings: Match3GameSettings,
  current: Match3RoundState,
  from: Match3Position,
  to: Match3Position,
  now: number,
  random = Math.random,
): { accepted: boolean; round: Match3RoundState; cascades: Match3Cascade[] } {
  for (const point of [from, to]) {
    if (!point || !Number.isInteger(point.row) || !Number.isInteger(point.col) || !current.grid[point.row]?.[point.col]) {
      throw new Error('Invalid Match 3 cell')
    }
  }
  if (Math.abs(from.row - to.row) + Math.abs(from.col - to.col) !== 1) throw new Error('Choose adjacent crystals')
  if (now < current.availableAt) throw new Error('The previous move is still resolving')
  if (current.deadline !== null && now > current.deadline) throw new Error('Time is up')
  if (!settings.endless?.enabled && settings.winScore && current.score >= settings.winScore) throw new Error('This board is complete')
  const round = structuredClone(current)
  swap(round.grid, from, to)
  let matches = findMatch3Matches(round.grid)
  const accepted = matches.length > 0
  const cascades: Match3Cascade[] = []
  if (!accepted) swap(round.grid, from, to)
  for (let level = 0; matches.length > 0 && level < 64; level++) {
    const points = matches.reduce((sum, [row, col]) => sum +
      (settings.crystalTypes.find((crystal) => crystal.id === round.grid[row][col].crystalId)?.points ?? settings.pointsPerMatch ?? 10), 0)
    const gained = Math.floor(points * (settings.cascadeMultiplier ?? 1.5) ** level)
    if (!Number.isSafeInteger(gained) || gained < 0 || !Number.isSafeInteger(round.score + gained)) throw new Error('Invalid Match 3 cascade score')
    round.score += gained
    cascades.push({ grid: structuredClone(round.grid), matched: matches, score: round.score })
    const matched = new Set(matches.map(([row, col]) => `${row},${col}`))
    for (let col = 0; col < round.grid[0].length; col++) {
      const remaining = round.grid.flatMap((row, index) => matched.has(`${index},${col}`) ? [] : [row[col]])
      while (remaining.length < round.grid.length) remaining.unshift(randomCell(settings, round, random))
      remaining.forEach((cell, row) => { round.grid[row][col] = cell })
    }
    if (!settings.endless?.enabled && settings.winScore && round.score >= settings.winScore) break
    matches = findMatch3Matches(round.grid)
  }
  if (findMatch3Matches(round.grid).length || !hasMatch3Move(round.grid)) round.grid = freshGrid(settings, round, random)
  const animationMs = accepted ? 200 + cascades.length * 500 : 400
  round.availableAt = now + animationMs
  if (settings.endless?.enabled && accepted) {
    round.deadline = settings.timeLimit ? round.availableAt + settings.timeLimit * 1000 : null
  } else if (round.deadline !== null) round.deadline += animationMs
  round.revision++
  return { accepted, round, cascades }
}
