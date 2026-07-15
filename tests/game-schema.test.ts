import { describe, expect, test } from 'bun:test'
import {
  allGames,
  type DiglettTunnelTapGameConfig,
  type MagnemiteCircuitGameConfig,
  type MagnemiteCircuitPosition,
  type MagnemiteCircuitTile,
  type MagnemiteCircuitTileType,
  type PrizeWheelGameConfig,
  type RockTunnelEchoMapGameConfig,
  type VoltorbGridGameConfig,
  type VoltorbGridPosition,
  type VoltorbGridVoltorb,
} from '@/data/games'
import { validateGameItem } from '@/data/games/schemas'

type Direction = 'up' | 'right' | 'down' | 'left'

const directionDeltas: Record<Direction, VoltorbGridPosition> = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
}

const oppositeDirection: Record<Direction, Direction> = {
  up: 'down',
  right: 'left',
  down: 'up',
  left: 'right',
}

const orderedDirections: Direction[] = ['up', 'right', 'down', 'left']

function gridKey(position: { x: number; y: number }) {
  return `${position.x},${position.y}`
}

function isSameGridPosition(a: { x: number; y: number }, b: { x: number; y: number }) {
  return a.x === b.x && a.y === b.y
}

function isInsideGrid(
  position: { x: number; y: number },
  gridSize: { cols: number; rows: number },
) {
  return position.x >= 0 && position.x < gridSize.cols && position.y >= 0 && position.y < gridSize.rows
}

function simulateVoltorbGrid(
  settings: VoltorbGridGameConfig['settings'],
  commands: Array<Direction | 'discharge'>,
) {
  const wallKeys = new Set((settings.walls || []).map(gridKey))
  const initialDebrisKeys = new Set((settings.debris || []).map(gridKey))
  const requiredCleared = Math.min(
    settings.requiredCleared ?? initialDebrisKeys.size,
    initialDebrisKeys.size,
  )
  let player = settings.playerStart
  const debrisKeys = new Set(initialDebrisKeys)
  let voltorbs = settings.voltorbs.map((voltorb, index) => ({
    id: voltorb.id || `voltorb-${index}`,
    x: voltorb.x,
    y: voltorb.y,
    blastRadius: voltorb.blastRadius || 2,
  }))
  let protectedPokemon = (settings.protectedPokemon || []).map((pokemon, index) => ({
    id: pokemon.id || `protected-pokemon-${index}`,
    speciesId: pokemon.speciesId,
    formId: pokemon.formId || String(pokemon.speciesId),
    x: pokemon.x,
    y: pokemon.y,
  }))
  const detonatingVoltorbId = voltorbs[0]?.id
  let moves = 0
  let discharges = 0
  let failed = false
  let reachedExit = false

  const exitOpen = () => initialDebrisKeys.size - debrisKeys.size >= requiredCleared
  const voltorbAt = (position: VoltorbGridPosition) =>
    voltorbs.find((voltorb) => isSameGridPosition(voltorb, position))
  const protectedPokemonAt = (position: VoltorbGridPosition) =>
    protectedPokemon.find((pokemon) => isSameGridPosition(pokemon, position))
  const protectedPokemonKeys = () => new Set(protectedPokemon.map(gridKey))
  const canVoltorbOccupy = (position: VoltorbGridPosition, movingId: string) =>
    isInsideGrid(position, settings.gridSize) &&
    !wallKeys.has(gridKey(position)) &&
    !debrisKeys.has(gridKey(position)) &&
    !protectedPokemonKeys().has(gridKey(position)) &&
    !isSameGridPosition(position, settings.exit) &&
    !voltorbs.some(
      (voltorb) => voltorb.id !== movingId && isSameGridPosition(voltorb, position),
    )
  const canProtectedPokemonOccupy = (position: VoltorbGridPosition, movingId: string) =>
    isInsideGrid(position, settings.gridSize) &&
    !wallKeys.has(gridKey(position)) &&
    !debrisKeys.has(gridKey(position)) &&
    !voltorbs.some((voltorb) => isSameGridPosition(voltorb, position)) &&
    !isSameGridPosition(position, settings.exit) &&
    !protectedPokemon.some(
      (pokemon) => pokemon.id !== movingId && isSameGridPosition(pokemon, position),
    )
  const isPlayerBlocked = (position: VoltorbGridPosition) =>
    !isInsideGrid(position, settings.gridSize) ||
    wallKeys.has(gridKey(position)) ||
    debrisKeys.has(gridKey(position)) ||
    protectedPokemonKeys().has(gridKey(position)) ||
    (!exitOpen() && isSameGridPosition(position, settings.exit))

  const discharge = () => {
    if (settings.maxDischarges && discharges >= settings.maxDischarges) {
      failed = true
      return
    }

    const blast = new Set<string>()
    const destroyed = new Set<string>()
    const triggeredVoltorbIds = new Set<string>()
    let hitProtectedPokemon = false
    const voltorbByPosition = new Map(voltorbs.map((voltorb) => [gridKey(voltorb), voltorb]))
    const firstVoltorb = voltorbs.find((voltorb) => voltorb.id === detonatingVoltorbId)
    const queue = firstVoltorb ? [firstVoltorb] : []

    for (let index = 0; index < queue.length; index += 1) {
      const voltorb = queue[index]
      if (triggeredVoltorbIds.has(voltorb.id)) continue

      triggeredVoltorbIds.add(voltorb.id)
      blast.add(gridKey(voltorb))
      Object.values(directionDeltas).forEach((delta) => {
        for (let step = 1; step <= voltorb.blastRadius; step++) {
          const next = {
            x: voltorb.x + delta.x * step,
            y: voltorb.y + delta.y * step,
          }
          if (!isInsideGrid(next, settings.gridSize)) break

          const key = gridKey(next)
          if (wallKeys.has(key)) break

          blast.add(key)
          if (protectedPokemonKeys().has(key)) {
            hitProtectedPokemon = true
            break
          }

          const chainedVoltorb = voltorbByPosition.get(key)
          if (chainedVoltorb && !triggeredVoltorbIds.has(chainedVoltorb.id)) {
            queue.push(chainedVoltorb)
          }

          if (debrisKeys.has(key)) {
            destroyed.add(key)
            break
          }
        }
      })
    }

    discharges += 1
    destroyed.forEach((key) => debrisKeys.delete(key))
    voltorbs = voltorbs.filter((voltorb) => !triggeredVoltorbIds.has(voltorb.id))

    if (blast.has(gridKey(player))) {
      failed = true
    } else if (hitProtectedPokemon) {
      failed = true
    } else if (settings.maxDischarges && discharges >= settings.maxDischarges && !exitOpen()) {
      failed = true
    }
  }

  for (const command of commands) {
    if (failed || reachedExit) break

    if (command === 'discharge') {
      discharge()
      continue
    }

    const delta = directionDeltas[command]
    const next = { x: player.x + delta.x, y: player.y + delta.y }
    const pushedVoltorb = voltorbAt(next)
    const pushedProtectedPokemon = protectedPokemonAt(next)

    if (pushedVoltorb) {
      const pushedPosition = {
        x: pushedVoltorb.x + delta.x,
        y: pushedVoltorb.y + delta.y,
      }
      if (!canVoltorbOccupy(pushedPosition, pushedVoltorb.id)) {
        failed = true
        break
      }

      moves += 1
      player = next
      voltorbs = voltorbs.map((voltorb) =>
        voltorb.id === pushedVoltorb.id ? { ...voltorb, ...pushedPosition } : voltorb,
      )
    } else if (pushedProtectedPokemon) {
      const pushedPosition = {
        x: pushedProtectedPokemon.x + delta.x,
        y: pushedProtectedPokemon.y + delta.y,
      }
      if (!canProtectedPokemonOccupy(pushedPosition, pushedProtectedPokemon.id)) {
        failed = true
        break
      }

      moves += 1
      player = next
      protectedPokemon = protectedPokemon.map((pokemon) =>
        pokemon.id === pushedProtectedPokemon.id ? { ...pokemon, ...pushedPosition } : pokemon,
      )
    } else {
      if (isPlayerBlocked(next)) {
        failed = true
        break
      }

      moves += 1
      player = next
    }

    if (isSameGridPosition(player, settings.exit) && exitOpen()) {
      reachedExit = true
    } else if (settings.maxMoves && moves >= settings.maxMoves) {
      failed = true
    }
  }

  return {
    cleared: initialDebrisKeys.size - debrisKeys.size,
    discharges,
    failed,
    moves,
    reachedExit,
    protectedPokemon,
    voltorbs,
  }
}

const magnemiteConnections: Record<MagnemiteCircuitTileType, Direction[]> = {
  straight: ['up', 'down'],
  corner: ['up', 'right'],
  tee: ['up', 'right', 'down'],
  cross: ['up', 'right', 'down', 'left'],
}

function getMagnemiteConnections(tile: MagnemiteCircuitTile): Direction[] {
  const rotation = tile.rotation || 0
  return magnemiteConnections[tile.type].map((direction) => {
    const index = orderedDirections.indexOf(direction)
    return orderedDirections[(index + rotation) % orderedDirections.length]
  })
}

function getMagnemitePoweredTiles(
  source: MagnemiteCircuitPosition,
  tiles: MagnemiteCircuitTile[],
) {
  const tilesByKey = new Map(tiles.map((tile) => [gridKey(tile), tile]))
  const powered = new Set<string>()
  const queue = [gridKey(source)]

  while (queue.length > 0) {
    const currentKey = queue.shift()
    if (!currentKey || powered.has(currentKey)) continue

    const tile = tilesByKey.get(currentKey)
    if (!tile) continue

    powered.add(currentKey)
    for (const direction of getMagnemiteConnections(tile)) {
      const delta = directionDeltas[direction]
      const next = { x: tile.x + delta.x, y: tile.y + delta.y }
      const nextTile = tilesByKey.get(gridKey(next))
      if (
        nextTile &&
        getMagnemiteConnections(nextTile).includes(oppositeDirection[direction])
      ) {
        queue.push(gridKey(next))
      }
    }
  }

  return powered
}

function magnemiteCircuitIsSolved(settings: MagnemiteCircuitGameConfig['settings']) {
  const powered = getMagnemitePoweredTiles(settings.source, settings.tiles)
  return settings.targets.every((target) => powered.has(gridKey(target)))
}

function magnemiteCircuitHasSolution(settings: MagnemiteCircuitGameConfig['settings']) {
  const unlockedTiles = settings.tiles.filter((tile) => !tile.locked)
  const combinations = 4 ** unlockedTiles.length

  for (let mask = 0; mask < combinations; mask++) {
    let value = mask
    const rotations = new Map<string, number>()
    unlockedTiles.forEach((tile) => {
      rotations.set(gridKey(tile), value % 4)
      value = Math.floor(value / 4)
    })

    const candidate = settings.tiles.map((tile) =>
      rotations.has(gridKey(tile)) ? { ...tile, rotation: rotations.get(gridKey(tile)) } : tile,
    )
    const powered = getMagnemitePoweredTiles(settings.source, candidate)
    if (settings.targets.every((target) => powered.has(gridKey(target)))) {
      return true
    }
  }

  return false
}

function shortestEchoPathLength(settings: RockTunnelEchoMapGameConfig['settings']) {
  const wallKeys = new Set(settings.walls.map(gridKey))
  const holeKeys = new Set((settings.holes || []).map(gridKey))
  const queue = [{ position: settings.playerStart, distance: 0 }]
  const seen = new Set([gridKey(settings.playerStart)])

  while (queue.length > 0) {
    const current = queue.shift()
    if (!current) break
    if (isSameGridPosition(current.position, settings.exit)) {
      return current.distance
    }

    Object.values(directionDeltas).forEach((delta) => {
      const next = {
        x: current.position.x + delta.x,
        y: current.position.y + delta.y,
      }
      const key = gridKey(next)
      if (
        isInsideGrid(next, settings.gridSize) &&
        !wallKeys.has(key) &&
        !holeKeys.has(key) &&
        !seen.has(key)
      ) {
        seen.add(key)
        queue.push({ position: next, distance: current.distance + 1 })
      }
    })
  }

  return null
}

describe('generated game data schemas', () => {
  test('all game entries have unique ids', () => {
    const ids = allGames.map((game) => game.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('all game entries satisfy the canonical schema', () => {
    const failures = allGames
      .map((game) => ({ game, result: validateGameItem(game) }))
      .filter(({ result }) => !result.success)

    expect(
      failures.map(({ game, result }) => ({
        id: game.id,
        gameType: game.gameType,
        issues: result.error?.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      })),
    ).toEqual([])
  })

  test('unlock replacement references point to existing game entries', () => {
    const ids = new Set(allGames.map((game) => game.id))
    const brokenOverrides = allGames
      .filter((game) => game.overrides && !ids.has(game.overrides))
      .map((game) => ({ id: game.id, overrides: game.overrides }))

    expect(brokenOverrides).toEqual([])
  })

  test('pachinko validation rejects duplicate bucket ids', () => {
    const pachinko = allGames.find((game) => game.gameType === 'pachinko')
    expect(pachinko).toBeDefined()

    const duplicateBucketGame = JSON.parse(JSON.stringify(pachinko))
    duplicateBucketGame.settings.board.buckets[1].id =
      duplicateBucketGame.settings.board.buckets[0].id

    const result = validateGameItem(duplicateBucketGame)
    expect(result.success).toBe(false)
    expect(result.error?.issues.map((issue) => issue.message)).toContain(
      `Duplicate bucket id: ${duplicateBucketGame.settings.board.buckets[0].id}`,
    )
  })

  test('pachinko validation rejects buckets outside the board', () => {
    const pachinko = allGames.find((game) => game.gameType === 'pachinko')
    expect(pachinko).toBeDefined()

    const invalidBucketGame = JSON.parse(JSON.stringify(pachinko))
    invalidBucketGame.settings.board.buckets[0].x = -10

    const result = validateGameItem(invalidBucketGame)
    expect(result.success).toBe(false)
    expect(result.error?.issues.map((issue) => issue.message)).toContain(
      'Bucket must fit inside the pachinko board',
    )
  })

  test('Voltorb Grid has a repeatable Test sub-region puzzle entry', () => {
    const game = allGames.find((entry) => entry.id === 'route-10-voltorb-grid-test')
    const settings = game?.settings as VoltorbGridGameConfig['settings'] | undefined

    expect(game).toBeDefined()
    expect(game?.gameType).toBe('voltorb-grid')
    expect(game?.subCategory).toBe('Test')
    expect(game?.icon).toEqual({ type: 'pokemon', id: '100' })
    expect(settings?.gridSize).toEqual({ cols: 8, rows: 8 })
    expect(settings?.playerStart).toEqual({ x: 1, y: 6 })
    expect(settings?.exit).toEqual({ x: 6, y: 1 })
    expect(settings?.voltorbs.length).toBeGreaterThanOrEqual(1)
    expect(settings?.protectedPokemon).toEqual([{ id: 'watcher', speciesId: 25, x: 0, y: 7 }])
    expect(settings?.requiredCleared).toBe(3)
    expect(settings?.maxDischarges).toBe(1)
    expect(settings?.winRate).toBe(1)
  })

  test('Voltorb Grid validation rejects impossible debris goals and out-of-bounds positions', () => {
    const game = allGames.find((entry) => entry.id === 'route-10-voltorb-grid-test')
    expect(game).toBeDefined()

    const impossibleGoalGame = JSON.parse(JSON.stringify(game))
    impossibleGoalGame.settings.requiredCleared =
      impossibleGoalGame.settings.debris.length + 1

    const impossibleGoalResult = validateGameItem(impossibleGoalGame)
    expect(impossibleGoalResult.success).toBe(false)
    expect(impossibleGoalResult.error?.issues.map((issue) => issue.message)).toContain(
      'requiredCleared cannot exceed authored debris count',
    )

    const outOfBoundsGame = JSON.parse(JSON.stringify(game))
    outOfBoundsGame.settings.voltorbs[0].x = outOfBoundsGame.settings.gridSize.cols

    const outOfBoundsResult = validateGameItem(outOfBoundsGame)
    expect(outOfBoundsResult.success).toBe(false)
    expect(outOfBoundsResult.error?.issues.map((issue) => issue.message)).toContain(
      'Voltorb Grid position must fit inside the board',
    )
  })

  test('Voltorb Grid test puzzle requires pushing and chained Voltorb before discharge is solvable', () => {
    const game = allGames.find((entry) => entry.id === 'route-10-voltorb-grid-test')
    expect(game).toBeDefined()
    const settings = game!.settings as VoltorbGridGameConfig['settings']

    const earlyDischarge = simulateVoltorbGrid(settings, ['discharge'])
    expect(earlyDischarge.failed).toBe(true)
    expect(earlyDischarge.reachedExit).toBe(false)
    expect(earlyDischarge.cleared).toBeLessThan(settings.requiredCleared!)

    const solution = simulateVoltorbGrid(settings, [
      'right',
      'right',
      'down',
      'right',
      'up',
      'up',
      'left',
      'discharge',
      'up',
      'up',
      'right',
      'right',
      'up',
      'right',
      'up',
    ])

    expect(solution.failed).toBe(false)
    expect(solution.reachedExit).toBe(true)
    expect(solution.cleared).toBe(settings.requiredCleared!)
    expect(solution.discharges).toBe(1)
    expect(solution.moves).toBeLessThan(settings.maxMoves!)
    expect(solution.voltorbs).toHaveLength(0)
  })

  test('Voltorb Grid discharges only the first Voltorb until blasts chain into others', () => {
    const settings: VoltorbGridGameConfig['settings'] = {
      gridSize: { cols: 7, rows: 3 },
      playerStart: { x: 3, y: 2 },
      exit: { x: 6, y: 2 },
      debris: [
        { x: 2, y: 0 },
        { x: 6, y: 0 },
      ],
      voltorbs: [
        { id: 'detonator', x: 0, y: 0, blastRadius: 4 },
        { id: 'chained', x: 4, y: 0, blastRadius: 2 },
      ],
      requiredCleared: 2,
      maxDischarges: 1,
    }

    const blockedChain = simulateVoltorbGrid(settings, ['discharge'])
    expect(blockedChain.cleared).toBe(1)
    expect(blockedChain.failed).toBe(true)
    expect(blockedChain.voltorbs.map((voltorb) => voltorb.id)).toEqual(['chained'])

    const linkedChain = simulateVoltorbGrid(
      {
        ...settings,
        debris: [{ x: 6, y: 0 }],
        requiredCleared: 1,
      },
      ['discharge'],
    )
    expect(linkedChain.cleared).toBe(1)
    expect(linkedChain.failed).toBe(false)
    expect(linkedChain.voltorbs).toHaveLength(0)
  })

  test('Voltorb Grid protected Pokemon can be pushed and fail if caught in blasts', () => {
    const settings: VoltorbGridGameConfig['settings'] = {
      gridSize: { cols: 5, rows: 5 },
      playerStart: { x: 0, y: 4 },
      exit: { x: 4, y: 4 },
      debris: [{ x: 4, y: 0 }],
      voltorbs: [{ id: 'detonator', x: 0, y: 0, blastRadius: 4 }],
      protectedPokemon: [{ id: 'watcher', speciesId: 25, x: 2, y: 0 }],
      requiredCleared: 1,
      maxDischarges: 1,
    }

    const caughtInBlast = simulateVoltorbGrid(settings, ['discharge'])
    expect(caughtInBlast.failed).toBe(true)
    expect(caughtInBlast.cleared).toBe(0)
    expect(caughtInBlast.voltorbs).toHaveLength(0)

    const pushedPokemon = simulateVoltorbGrid(
      {
        ...settings,
        protectedPokemon: [{ id: 'watcher', speciesId: 25, x: 1, y: 4 }],
      },
      ['right'],
    )
    expect(pushedPokemon.failed).toBe(false)
    expect(pushedPokemon.moves).toBe(1)
    expect(pushedPokemon.protectedPokemon[0]).toMatchObject({ x: 2, y: 4 })

    const blockedMove = simulateVoltorbGrid(
      {
        ...settings,
        protectedPokemon: [{ id: 'watcher', speciesId: 25, x: 1, y: 4 }],
        debris: [{ x: 2, y: 4 }],
      },
      ['right'],
    )
    expect(blockedMove.failed).toBe(true)
    expect(blockedMove.moves).toBe(0)
  })

  test('Route 10 Voltorb Grid progression layouts are solvable in order', () => {
    const primer = allGames.find((entry) => entry.id === 'route-10-voltorb-primer')
    const relay = allGames.find((entry) => entry.id === 'route-10-voltorb-relay')
    const landslide = allGames.find((entry) => entry.id === 'route-10-voltorb-landslide')

    expect(primer?.gameType).toBe('voltorb-grid')
    expect(relay?.gameType).toBe('voltorb-grid')
    expect(landslide?.gameType).toBe('voltorb-grid')
    expect(relay?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'route-10-voltorb-primer',
      battleStatus: 'win',
      count: 1,
    })
    expect(landslide?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'route-10-voltorb-relay',
      battleStatus: 'win',
      count: 1,
    })

    const primerResult = simulateVoltorbGrid(
      primer!.settings as VoltorbGridGameConfig['settings'],
      ['up', 'right', 'up', 'down', 'discharge', 'up', 'right', 'up'],
    )
    expect(primerResult.failed).toBe(false)
    expect(primerResult.reachedExit).toBe(true)
    expect(primerResult.cleared).toBe(1)
    expect(primerResult.protectedPokemon[0]).toMatchObject({ x: 3, y: 1 })

    const relayResult = simulateVoltorbGrid(
      relay!.settings as VoltorbGridGameConfig['settings'],
      [
        'right',
        'right',
        'up',
        'right',
        'left',
        'down',
        'down',
        'discharge',
        'up',
        'up',
        'up',
        'up',
        'right',
        'up',
        'right',
      ],
    )
    expect(relayResult.failed).toBe(false)
    expect(relayResult.reachedExit).toBe(true)
    expect(relayResult.cleared).toBe(2)
    expect(relayResult.protectedPokemon[0]).toMatchObject({ x: 5, y: 4 })

    const landslideResult = simulateVoltorbGrid(
      landslide!.settings as VoltorbGridGameConfig['settings'],
      [
        'right',
        'right',
        'down',
        'right',
        'up',
        'up',
        'right',
        'up',
        'down',
        'left',
        'left',
        'up',
        'down',
        'discharge',
        'right',
        'up',
        'up',
        'up',
        'right',
        'right',
        'up',
      ],
    )
    expect(landslideResult.failed).toBe(false)
    expect(landslideResult.reachedExit).toBe(true)
    expect(landslideResult.cleared).toBe(3)
    expect(landslideResult.protectedPokemon[0]).toMatchObject({ x: 5, y: 3 })
    expect(landslideResult.protectedPokemon[1]).toMatchObject({ x: 3, y: 3 })
  })

  test('Route 10 Voltorb demolition layouts are solvable in order', () => {
    const demolitionIds = [
      'route-10-voltorb-hairline-crack',
      'route-10-voltorb-fuse-line',
      'route-10-voltorb-split-charge',
      'route-10-voltorb-deep-fault',
      'route-10-voltorb-final-breach',
    ]
    const demolitionGames = demolitionIds.map((id) => allGames.find((entry) => entry.id === id))

    expect(demolitionGames.map((game) => game?.gameType)).toEqual([
      'voltorb-grid',
      'voltorb-grid',
      'voltorb-grid',
      'voltorb-grid',
      'voltorb-grid',
    ])
    expect(demolitionGames[0]?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-10-demolition-crew',
    })
    for (let index = 1; index < demolitionGames.length; index += 1) {
      expect(demolitionGames[index]?.requirements).toContainEqual({
        type: 'research_encounter_result',
        targetId: demolitionIds[index - 1],
        battleStatus: 'win',
        count: 1,
      })
    }
    const demolitionSettings = demolitionGames.map(
      (game) => game!.settings as VoltorbGridGameConfig['settings'],
    )
    expect(demolitionSettings.map((settings) => settings.voltorbs.length)).toEqual([
      3, 4, 5, 6, 7,
    ])
    expect(demolitionSettings.map((settings) => settings.requiredCleared)).toEqual([
      4, 5, 6, 7, 9,
    ])
    expect(demolitionSettings.map((settings) => settings.protectedPokemon?.length)).toEqual([
      2, 3, 2, 3, 3,
    ])

    const discharge = 'discharge' as const
    const solutions: Array<Array<Direction | typeof discharge>> = [
      [
        'up',
        'up',
        'up',
        'right',
        'down',
        'right',
        'down',
        'right',
        'up',
        'right',
        'left',
        'left',
        'left',
        'left',
        'down',
        'right',
        'up',
        'right',
        'right',
        'up',
        'up',
        'up',
        'right',
        'down',
        'right',
        discharge,
        'up',
      ],
      [
        'up',
        'up',
        'up',
        'down',
        'left',
        'down',
        'down',
        'left',
        'left',
        'left',
        'up',
        'up',
        'up',
        'up',
        'right',
        'left',
        'left',
        'up',
        'right',
        'down',
        'down',
        'right',
        'right',
        'left',
        'left',
        'down',
        'down',
        'right',
        'up',
        'down',
        'right',
        'down',
        'right',
        'right',
        discharge,
        'left',
        'left',
        'left',
        'left',
        'up',
        'up',
        'up',
        'up',
        'left',
        'up',
        'left',
        'up',
      ],
      [
        'right',
        'up',
        'up',
        'up',
        'right',
        'right',
        'right',
        'up',
        'left',
        'right',
        'down',
        'down',
        'down',
        'left',
        'up',
        'left',
        'left',
        'left',
        'up',
        'up',
        'up',
        'right',
        'down',
        'left',
        'down',
        'down',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'up',
        'up',
        'right',
        'left',
        'down',
        'down',
        'down',
        'right',
        'up',
        'left',
        'left',
        'left',
        'left',
        'left',
        'left',
        'down',
        'right',
        'down',
        discharge,
        'right',
        'right',
        'right',
        'right',
        'right',
        'up',
        'up',
        'up',
        'up',
        'up',
        'up',
      ],
      [
        'right',
        'right',
        'up',
        'up',
        'up',
        'up',
        'up',
        'up',
        'down',
        'down',
        'right',
        'up',
        'right',
        'right',
        'down',
        'left',
        'down',
        'down',
        'left',
        'up',
        'down',
        'right',
        'right',
        'up',
        'right',
        'right',
        'down',
        'left',
        'down',
        'down',
        'right',
        'up',
        'left',
        'left',
        'left',
        'up',
        'left',
        'left',
        'left',
        'up',
        'up',
        'up',
        'right',
        discharge,
        'up',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'up',
      ],
      [
        'right',
        'right',
        'up',
        'up',
        'up',
        'up',
        'up',
        'up',
        'down',
        'down',
        'right',
        'up',
        'right',
        'right',
        'down',
        'left',
        'down',
        'down',
        'left',
        'up',
        'down',
        'right',
        'right',
        'up',
        'right',
        'right',
        'right',
        'right',
        'left',
        'left',
        'down',
        'right',
        'left',
        'left',
        'down',
        'down',
        'right',
        'up',
        'left',
        'left',
        'left',
        'up',
        'left',
        'left',
        'left',
        'up',
        'up',
        'up',
        'right',
        discharge,
        'up',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'right',
        'up',
      ],
    ]

    demolitionSettings.forEach((settings, index) => {
      const result = simulateVoltorbGrid(settings, solutions[index])

      expect(result.failed).toBe(false)
      expect(result.reachedExit).toBe(true)
      expect(result.cleared).toBe(settings.requiredCleared!)
      expect(result.voltorbs).toHaveLength(0)
    })

    const finalResult = simulateVoltorbGrid(
      demolitionGames[4]!.settings as VoltorbGridGameConfig['settings'],
      solutions[4],
    )
    expect(finalResult.protectedPokemon[0]).toMatchObject({ x: 3, y: 1 })
    expect(finalResult.protectedPokemon[1]).toMatchObject({ x: 7, y: 3 })
    expect(finalResult.protectedPokemon[2]).toMatchObject({ x: 11, y: 5 })
  })

  test('new route-themed puzzle games have Test sub-region entries', () => {
    const diglett = allGames.find((entry) => entry.id === 'diglett-tunnel-tap-test')
    const diglettSettings = diglett?.settings as
      | DiglettTunnelTapGameConfig['settings']
      | undefined
    const magnemite = allGames.find((entry) => entry.id === 'magnemite-circuit-test')
    const magnemiteSettings = magnemite?.settings as
      | MagnemiteCircuitGameConfig['settings']
      | undefined
    const echo = allGames.find((entry) => entry.id === 'rock-tunnel-echo-map-test')
    const echoSettings = echo?.settings as RockTunnelEchoMapGameConfig['settings'] | undefined

    expect(diglett?.gameType).toBe('diglett-tunnel-tap')
    expect(diglett?.subCategory).toBe('Test')
    expect(diglett?.icon).toEqual({ type: 'pokemon', id: '50' })
    expect(diglettSettings?.gridSize).toEqual({ cols: 4, rows: 4 })
    expect(diglettSettings?.targetScore).toBe(14)
    expect(diglettSettings?.winRate).toBe(1)

    expect(magnemite?.gameType).toBe('magnemite-circuit')
    expect(magnemite?.subCategory).toBe('Test')
    expect(magnemite?.icon).toEqual({ type: 'pokemon', id: '81' })
    expect(magnemiteSettings?.source).toEqual({ x: 0, y: 3 })
    expect(magnemiteSettings?.targets).toHaveLength(3)
    expect(magnemiteSettings?.tiles.length).toBeGreaterThanOrEqual(14)
    expect(magnemiteSettings?.winRate).toBe(1)

    expect(echo?.gameType).toBe('rock-tunnel-echo-map')
    expect(echo?.subCategory).toBe('Test')
    expect(echo?.icon).toEqual({ type: 'pokemon', id: '41' })
    expect(echoSettings?.gridSize).toEqual({ cols: 8, rows: 8 })
    expect(echoSettings?.playerStart).toEqual({ x: 1, y: 6 })
    expect(echoSettings?.exit).toEqual({ x: 6, y: 1 })
    expect(echoSettings?.holes?.length).toBeGreaterThanOrEqual(3)
    expect(echoSettings?.winRate).toBe(1)
  })

  test('new route-themed puzzle games have playable Test layouts', () => {
    const diglett = allGames.find((entry) => entry.id === 'diglett-tunnel-tap-test')
    const diglettSettings = diglett?.settings as
      | DiglettTunnelTapGameConfig['settings']
      | undefined
    expect(diglettSettings).toBeDefined()
    const conservativeDiglettSpawns = Math.floor(
      (diglettSettings!.timeLimit * 1000) / diglettSettings!.spawnIntervalMs,
    )
    expect(conservativeDiglettSpawns * (diglettSettings!.diglettScore || 1) * 0.6).toBeGreaterThan(
      diglettSettings!.targetScore,
    )

    const magnemite = allGames.find((entry) => entry.id === 'magnemite-circuit-test')
    const magnemiteSettings = magnemite?.settings as
      | MagnemiteCircuitGameConfig['settings']
      | undefined
    expect(magnemiteSettings).toBeDefined()
    expect(magnemiteCircuitIsSolved(magnemiteSettings!)).toBe(false)
    expect(magnemiteCircuitHasSolution(magnemiteSettings!)).toBe(true)

    const echo = allGames.find((entry) => entry.id === 'rock-tunnel-echo-map-test')
    const echoSettings = echo?.settings as RockTunnelEchoMapGameConfig['settings'] | undefined
    expect(echoSettings).toBeDefined()
    const echoPathLength = shortestEchoPathLength(echoSettings!)
    expect(echoPathLength).not.toBeNull()
    expect(echoPathLength!).toBeLessThanOrEqual(echoSettings!.maxMoves!)
    expect(echoSettings!.holes).toContainEqual({ x: 7, y: 1 })
  })

  test('Magnemite Circuit validation requires source and target tiles', () => {
    const game = allGames.find((entry) => entry.id === 'magnemite-circuit-test')
    expect(game).toBeDefined()

    const missingSourceTileGame = JSON.parse(JSON.stringify(game))
    missingSourceTileGame.settings.tiles = missingSourceTileGame.settings.tiles.filter(
      (tile: { x: number; y: number }) =>
        !(
          tile.x === missingSourceTileGame.settings.source.x &&
          tile.y === missingSourceTileGame.settings.source.y
        ),
    )

    const result = validateGameItem(missingSourceTileGame)
    expect(result.success).toBe(false)
    expect(result.error?.issues.map((issue) => issue.message)).toContain(
      'Magnemite Circuit source must have an authored tile',
    )
  })

  test('Pewter, Cerulean, and Lavender Chansey wheels keep their local material reward mixes', () => {
    const expectedSlots = {
      'chansey-wheel-pewter': {
        'battle-potion': 35,
        'broken-ball-t1': 25,
        'rock-gem': 20,
        'small-stone-t1': 19,
        'moon-stone': 1,
      },
      'chansey-wheel-cerulean': {
        'battle-potion': 35,
        'broken-ball-t1': 25,
        'water-gem': 20,
        'aqua-solvent-t1': 19,
        nugget: 1,
      },
      'chansey-wheel-lavender': {
        'psychic-gem': 23,
        'ghost-gem': 5,
        'mind-thread-t1': 24,
        'spirit-wisp-t1': 24,
      },
    }

    for (const [gameId, expected] of Object.entries(expectedSlots)) {
      const game = allGames.find((entry) => entry.id === gameId) as
        | PrizeWheelGameConfig
        | undefined
      expect(game).toBeDefined()

      const actual = Object.fromEntries(
        game!.settings.slots.map((slot) => {
          const reward = slot.rewards[0]
          if (reward?.type !== 'item' && reward?.type !== 'task_complete') {
            throw new Error(`${gameId}:${slot.id} must reward an item or task completion`)
          }

          return [reward.targetId, slot.percentage]
        }),
      )

      expect(actual).toEqual(expected)
      expect(
        game!.settings.slots.reduce(
          (total, slot) => total + slot.percentage,
          0,
        ),
      ).toBe(100)

      if (gameId === 'chansey-wheel-lavender') {
        const materialQuantities = Object.fromEntries(
          game!.settings.slots.flatMap((slot) =>
            slot.rewards
              .filter((reward) => reward.type === 'item')
              .map((reward) => [reward.targetId, reward.quantity]),
          ),
        )
        const slotPercentages = game!.settings.slots.reduce<Record<string, number>>(
          (totals, slot) => {
            for (const reward of slot.rewards) {
              if (reward.type !== 'item') continue
              const targetId = reward.targetId
              if (!targetId) continue
              totals[targetId] = (totals[targetId] || 0) + slot.percentage
            }
            return totals
          },
          {},
        )
        expect(materialQuantities).toEqual({
          'psychic-gem': 6,
          'ghost-gem': 6,
          'mind-thread-t1': 6,
          'spirit-wisp-t1': 6,
        })
        expect(slotPercentages).toEqual({
          'psychic-gem': 23,
          'ghost-gem': 29,
          'mind-thread-t1': 24,
          'spirit-wisp-t1': 24,
        })
        expect(
          game!.settings.slots.some((slot) =>
            slot.rewards.some((reward) => reward.targetId === 'spell-tag-recipe'),
          ),
        ).toBe(false)
      }
    }
  })

  test('Chansey wheels spend League Tickets at authored progression costs', () => {
    const expectedCosts = {
      'chansey-wheel-viridian': 2,
      'chansey-wheel-pewter': 2,
      'chansey-wheel-cerulean': 2,
      'chansey-wheel-vermilion': 5,
      'chansey-wheel-lavender': 2,
    }

    for (const [gameId, amount] of Object.entries(expectedCosts)) {
      const game = allGames.find((entry) => entry.id === gameId) as
        | PrizeWheelGameConfig
        | undefined

      expect(game).toBeDefined()
      expect(game!.settings.cost).toEqual({
        amount,
        currencyType: 'league-ticket',
      })
      expect(game!.daily).toBeUndefined()
      expect(
        game!.requirements.some(
          (requirement) => requirement.type === 'daily_not_completed',
        ),
      ).toBe(false)
    }
  })
})
