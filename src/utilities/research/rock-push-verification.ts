import type { RockPushGameConfig, RockPushScreenConfig } from '@/data/games/rock-push/types'
import { getGridObjectDefinition, gridObjects, isGridBoundaryWall } from '@/data/games/grid-tiles'
import { getRockPushPrizeId, getRockPushScopedPrizeId } from './rock-push'
import { readPuzzleTranscript } from './puzzle-verification'

type Settings = RockPushGameConfig['settings']
type Position = { x: number; y: number }
type Cell = 'empty' | 'wall' | 'hole' | 'ice'
type Screen = { config: RockPushScreenConfig; grid: Cell[][]; rocks: Array<Position & { id: number }>; solved: number }
const equal = (a: Position, b: Position) => a.x === b.x && a.y === b.y
const deltas: Record<string, Position> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } }

export function getRockPushProofScreens(settings: Settings): RockPushScreenConfig[] {
  return settings.screens?.length ? settings.screens : [{ ...settings, id: 'main' }]
}

export function getRockPushObjectProofTargets(settings: Settings) {
  return getRockPushProofScreens(settings).flatMap((screen) => (screen.objects || []).flatMap((object, index) => {
    const definition = getGridObjectDefinition(gridObjects, object.objectId)
    if (!definition || !object.interaction || definition.interaction !== object.interaction.type) return []
    return [{ key: `${screen.id}:${object.id || `${object.objectId}-${index}`}`, ...object.interaction }]
  }))
}

/** Replays authored movement, ice, holes, teleporters and prizes from the initial board. */
export function verifyRockPushProof(settings: Settings, proof: unknown, verifiedObjects: Record<string, number> = {}): { solved: boolean; prizeIds: string[] } {
  const fail = { solved: false, prizeIds: [] }
  const moves = readPuzzleTranscript(proof, 'rock-push')
  if (!moves || (settings.maxMoves && moves.length > settings.maxMoves)) return fail
  const configurations = getRockPushProofScreens(settings)
  const screens = new Map<string, Screen>()
  let totalHoles = 0
  for (const config of configurations) {
    const size = config.grid_size || settings.grid_size || 8
    if (!Number.isInteger(size) || size < 3 || size > 32) return fail
    const grid: Cell[][] = Array.from({ length: size }, (_, y) => Array.from({ length: size }, (_, x) =>
      isGridBoundaryWall(config.tilePaletteId || settings.tilePaletteId, x, y, size) ? 'wall' : 'empty'))
    for (const barrier of config.barriers || []) if (grid[barrier.y]?.[barrier.x]) grid[barrier.y][barrier.x] = 'wall'
    for (const ice of config.ice || []) if (grid[ice.y]?.[ice.x] === 'empty') grid[ice.y][ice.x] = 'ice'
    for (const hole of config.holes || []) if (grid[hole.y]?.[hole.x] && grid[hole.y][hole.x] !== 'wall') grid[hole.y][hole.x] = 'hole'
    totalHoles += (config.holes || []).length
    screens.set(config.id, { config, grid, rocks: (config.boulders || []).map((rock, id) => ({ ...rock, id })), solved: 0 })
  }
  let active = screens.get(settings.startScreen || '') || screens.get(configurations[0]?.id)
  if (!active) return fail
  let player = { ...settings.playerStart }
  let solved = false
  const collected = new Set<string>()
  const clearedObjects = new Set<string>()
  const usedObjectWins = new Map<string, number>()
  const hasAuthoredScreens = Boolean(settings.screens?.length)
  const winTile = (screen: Screen, position: Position) => (screen.config.winTiles || []).some((tile) => equal(tile, position))
  const wallGoal = (screen: Screen, position: Position) => position.y === 0 && winTile(screen, position)
  const blocked = (screen: Screen, position: Position, rock: boolean, ignoredRock?: number) => {
    const cell = screen.grid[position.y]?.[position.x]
    return !cell || (cell === 'wall' && (rock || !wallGoal(screen, position))) ||
      (rock ? wallGoal(screen, position) : cell === 'hole') ||
      screen.rocks.some((entry) => entry.id !== ignoredRock && equal(entry, position))
  }
  const collect = (screen: Screen, path: Position[]) => {
    for (const position of path) {
      const index = (screen.config.prizes || []).findIndex((prize, index) => {
        const id = hasAuthoredScreens ? getRockPushScopedPrizeId(prize, index, screen.config.id) : getRockPushPrizeId(prize, index)
        return !collected.has(id) && equal(prize, position)
      })
      if (index < 0) continue
      const prize = screen.config.prizes![index]
      collected.add(hasAuthoredScreens ? getRockPushScopedPrizeId(prize, index, screen.config.id) : getRockPushPrizeId(prize, index))
    }
  }
  const interaction = (screen: Screen, position: Position): 'none' | 'clear' | 'win' | 'unverified' => {
    for (const [index, object] of (screen.config.objects || []).entries()) {
      const definition = getGridObjectDefinition(gridObjects, object.objectId)
      if (!definition || !object.interaction || definition.interaction !== object.interaction.type) continue
      const id = `${screen.config.id}:${object.id || `${object.objectId}-${index}`}`
      if (clearedObjects.has(id) || position.x < object.x || position.y < object.y ||
          position.x >= object.x + definition.size.cols || position.y >= object.y + definition.size.rows) continue
      const targetKey = `${object.interaction.type}:${object.interaction.targetId}`
      const usedWins = usedObjectWins.get(targetKey) || 0
      if ((verifiedObjects[id] || 0) <= usedWins) return 'unverified'
      usedObjectWins.set(targetKey, usedWins + 1)
      clearedObjects.add(id)
      return object.interaction.victory
    }
    return 'none'
  }
  for (const move of moves) {
    if (solved) return fail
    const delta = deltas[move]
    if (!delta) return fail
    const next = { x: player.x + delta.x, y: player.y + delta.y }
    const nextCell = active.grid[next.y]?.[next.x]
    if (!nextCell || (nextCell === 'wall' && !wallGoal(active, next)) || nextCell === 'hole') return fail
    const rock = active.rocks.find((entry) => equal(entry, next))
    let filledHole = false
    if (rock) {
      let target = { x: rock.x + delta.x, y: rock.y + delta.y }
      if (blocked(active, target, true, rock.id)) return fail
      while (active.grid[target.y][target.x] === 'ice') {
        const nextTarget = { x: target.x + delta.x, y: target.y + delta.y }
        if (blocked(active, nextTarget, true, rock.id)) break
        target = nextTarget
      }
      Object.assign(rock, target)
      filledHole = active.grid[target.y][target.x] === 'hole'
    }
    const path = [next]
    player = next
    while (active.grid[player.y][player.x] === 'ice') {
      const target = { x: player.x + delta.x, y: player.y + delta.y }
      if (blocked(active, target, false)) break
      path.push(target)
      player = target
    }
    collect(active, path)
    const object = interaction(active, player)
    if (object === 'unverified') return fail
    if (object === 'win') { solved = true; continue }
    if (object === 'clear') continue
    if (path.some((position) => winTile(active!, position))) { solved = true; continue }
    if (rock && filledHole) {
      active.grid[rock.y][rock.x] = 'empty'
      active.rocks = active.rocks.filter((entry) => entry !== rock)
      active.solved++
      solved = totalHoles > 0 && [...screens.values()].reduce((sum, screen) => sum + screen.solved, 0) >= totalHoles
      continue
    }
    const teleporter = (active.config.teleporters || []).find((entry) => equal(entry, player))
    if (!teleporter) continue
    const destination = screens.get(teleporter.target.screen || active.config.id)
    if (!destination) continue
    const target = { x: teleporter.target.x, y: teleporter.target.y }
    const cell = destination.grid[target.y]?.[target.x]
    if (!cell || cell === 'wall' || cell === 'hole' || destination.rocks.some((entry) => equal(entry, target))) continue
    active = destination
    player = target
    collect(active, [player])
    if (winTile(active, player)) { solved = true; continue }
    const targetObject = interaction(active, player)
    if (targetObject === 'unverified') return fail
    if (targetObject === 'win') solved = true
  }
  return { solved, prizeIds: [...collected] }
}
