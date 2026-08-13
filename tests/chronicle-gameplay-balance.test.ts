import { describe, expect, test } from 'bun:test'
import { allGames } from '@/data/games'
import type { MagnemiteCircuitGameConfig } from '@/data/games'
import type { MagnemiteCircuitTile } from '@/data/games/magnemite-circuit'
import type { VoltorbGridGameConfig } from '@/data/games/voltorb-grid'
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
  // The rock-push client always walls the outer ring of the grid, and the
  // player cannot walk onto a hole cell. Mirrors isBlockedCellForPlayer and
  // the border walls authored in buildScreenRuntimeState.
  const isBorder = (position: Point) =>
    position.x <= 0 ||
    position.y <= 0 ||
    position.x >= size - 1 ||
    position.y >= size - 1
  const blockedForRock = (position: Point) =>
    isBorder(position) || barriers.has(key(position))
  const blockedForPlayer = (position: Point) =>
    blockedForRock(position) || holes.has(key(position))
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
        blockedForPlayer(next)
      )
        continue
      const nextBoulders = [...current.boulders]
      if (boulders.has(key(next))) {
        const pushed = { x: next.x + delta.x, y: next.y + delta.y }
        if (
          blockedForRock(pushed) ||
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

type GridDirection = 'up' | 'right' | 'down' | 'left'

const gridMoves: Record<GridDirection, Point> = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
}

interface RuntimeVoltorb {
  id: string
  x: number
  y: number
  blastRadius: number
}

interface RuntimeProtectedPokemon {
  id: string
  x: number
  y: number
}

function samePosition(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y
}

function insideGrid(position: Point, gridSize: { cols: number; rows: number }) {
  return (
    position.x >= 0 &&
    position.x < gridSize.cols &&
    position.y >= 0 &&
    position.y < gridSize.rows
  )
}

function solveVoltorbGrid(settings: VoltorbGridGameConfig['settings']): number | null {
  const { cols, rows } = settings.gridSize
  const wallKeys = new Set((settings.walls || []).map(key))
  const initialDebris = new Set((settings.debris || []).map(key))
  const required = Math.min(
    settings.requiredCleared ?? initialDebris.size,
    initialDebris.size,
  )
  const maxMoves = settings.maxMoves ?? 99
  const maxDischarges = settings.maxDischarges ?? 1
  const exit = settings.exit
  const detonator = settings.voltorbs[0].id || 'voltorb-0'

  interface State {
    player: Point
    volts: RuntimeVoltorb[]
    prot: RuntimeProtectedPokemon[]
    debris: Set<string>
    moves: number
    discharges: number
  }

  const initialState: State = {
    player: settings.playerStart,
    volts: settings.voltorbs.map((voltorb, index) => ({
      id: voltorb.id || `voltorb-${index}`,
      x: voltorb.x,
      y: voltorb.y,
      blastRadius: voltorb.blastRadius || 2,
    })),
    prot: (settings.protectedPokemon || []).map((pokemon, index) => ({
      id: pokemon.id || `protected-${index}`,
      x: pokemon.x,
      y: pokemon.y,
    })),
    debris: new Set(initialDebris),
    moves: 0,
    discharges: 0,
  }

  const stateKey = (state: State) =>
    `${key(state.player)}|${state.volts
      .map((voltorb) => key(voltorb))
      .join(';')}|${state.prot
      .map((pokemon) => key(pokemon))
      .join(';')}|${[...state.debris].sort().join(';')}|${state.moves}|${
      state.discharges
    }`
  const voltorbAt = (state: State, position: Point) =>
    state.volts.find((voltorb) => samePosition(voltorb, position))
  const protectedAt = (state: State, position: Point) =>
    state.prot.find((pokemon) => samePosition(pokemon, position))
  const canVoltorbOccupy = (
    state: State,
    position: Point,
    movingId: string,
  ) =>
    insideGrid(position, settings.gridSize) &&
    !wallKeys.has(key(position)) &&
    !state.debris.has(key(position)) &&
    !protectedAt(state, position) &&
    !samePosition(position, exit) &&
    !state.volts.some(
      (voltorb) => voltorb.id !== movingId && samePosition(voltorb, position),
    )
  const canProtectedOccupy = (
    state: State,
    position: Point,
    movingId: string,
  ) =>
    insideGrid(position, settings.gridSize) &&
    !wallKeys.has(key(position)) &&
    !state.debris.has(key(position)) &&
    !voltorbAt(state, position) &&
    !samePosition(position, exit) &&
    !state.prot.some(
      (pokemon) => pokemon.id !== movingId && samePosition(pokemon, position),
    )
  const isPlayerBlocked = (state: State, position: Point) =>
    !insideGrid(position, settings.gridSize) ||
    wallKeys.has(key(position)) ||
    state.debris.has(key(position)) ||
    !!protectedAt(state, position) ||
    (initialDebris.size - state.debris.size < required &&
      samePosition(position, exit))
  const exitOpen = (state: State) =>
    initialDebris.size - state.debris.size >= required

  const discharge = (state: State): State | 'fail' => {
    if (maxDischarges && state.discharges >= maxDischarges) return 'fail'

    const blast = new Set<string>()
    const destroyed = new Set<string>()
    const triggered = new Set<string>()
    let hitProtected = false
    const voltorbByPosition = new Map(
      state.volts.map((voltorb) => [key(voltorb), voltorb]),
    )
    const firstVoltorb = state.volts.find(
      (voltorb) => voltorb.id === detonator,
    )
    const queue = firstVoltorb ? [firstVoltorb] : []

    for (let index = 0; index < queue.length; index += 1) {
      const voltorb = queue[index]
      if (triggered.has(voltorb.id)) continue

      triggered.add(voltorb.id)
      blast.add(key(voltorb))
      for (const delta of Object.values(gridMoves)) {
        for (let step = 1; step <= voltorb.blastRadius; step += 1) {
          const next = {
            x: voltorb.x + delta.x * step,
            y: voltorb.y + delta.y * step,
          }
          if (!insideGrid(next, settings.gridSize)) break
          if (wallKeys.has(key(next))) break

          blast.add(key(next))
          if (protectedAt(state, next)) {
            hitProtected = true
            break
          }
          const chained = voltorbByPosition.get(key(next))
          if (chained && !triggered.has(chained.id)) {
            queue.push(chained)
          }
          if (state.debris.has(key(next))) {
            destroyed.add(key(next))
            break
          }
        }
      }
    }

    const next: State = {
      ...state,
      debris: new Set([...state.debris].filter((item) => !destroyed.has(item))),
      volts: state.volts.filter((voltorb) => !triggered.has(voltorb.id)),
      discharges: state.discharges + 1,
    }
    if (blast.has(key(state.player)) || hitProtected) return 'fail'
    if (
      maxDischarges &&
      next.discharges >= maxDischarges &&
      !exitOpen(next)
    ) {
      return 'fail'
    }
    return next
  }

  const nextStates = (state: State): Array<State | 'WIN'> => {
    const results: Array<State | 'WIN'> = []
    for (const delta of Object.values(gridMoves)) {
      const next = {
        x: state.player.x + delta.x,
        y: state.player.y + delta.y,
      }
      const pushedVoltorb = voltorbAt(state, next)
      const pushedProtected = protectedAt(state, next)

      if (pushedVoltorb) {
        const pushedPosition = {
          x: pushedVoltorb.x + delta.x,
          y: pushedVoltorb.y + delta.y,
        }
        if (!canVoltorbOccupy(state, pushedPosition, pushedVoltorb.id)) {
          continue
        }
        results.push({
          ...state,
          player: next,
          volts: state.volts.map((voltorb) =>
            voltorb.id === pushedVoltorb.id
              ? { ...voltorb, ...pushedPosition }
              : voltorb,
          ),
          moves: state.moves + 1,
        })
      } else if (pushedProtected) {
        const pushedPosition = {
          x: pushedProtected.x + delta.x,
          y: pushedProtected.y + delta.y,
        }
        if (!canProtectedOccupy(state, pushedPosition, pushedProtected.id)) {
          continue
        }
        results.push({
          ...state,
          player: next,
          prot: state.prot.map((pokemon) =>
            pokemon.id === pushedProtected.id
              ? { ...pokemon, ...pushedPosition }
              : pokemon,
          ),
          moves: state.moves + 1,
        })
      } else {
        if (isPlayerBlocked(state, next)) continue
        if (samePosition(next, exit) && exitOpen(state)) {
          results.push('WIN')
          continue
        }
        if (maxMoves && state.moves + 1 >= maxMoves) continue
        results.push({ ...state, player: next, moves: state.moves + 1 })
      }
    }

    const discharged = discharge(state)
    if (discharged !== 'fail') results.push(discharged)
    return results
  }

  const seen = new Set<string>([stateKey(initialState)])
  const queue: Array<{ state: State; depth: number }> = [
    { state: initialState, depth: 0 },
  ]
  let best: number | null = null

  while (queue.length) {
    const { state, depth } = queue.shift()!
    if (best !== null && depth >= best) continue
    for (const result of nextStates(state)) {
      if (result === 'WIN') {
        best = best === null ? depth + 1 : Math.min(best, depth + 1)
        continue
      }
      if (maxMoves && result.moves >= maxMoves) continue
      const stateKeyResult = stateKey(result)
      if (seen.has(stateKeyResult)) continue
      seen.add(stateKeyResult)
      queue.push({ state: result, depth: depth + 1 })
    }
  }

  return best
}

const magnemiteConnections: Record<string, GridDirection[]> = {
  straight: ['up', 'down'],
  corner: ['up', 'right'],
  tee: ['up', 'right', 'down'],
  cross: ['up', 'right', 'down', 'left'],
}

function getMagnemiteConnections(tile: MagnemiteCircuitTile): GridDirection[] {
  const rotation = tile.rotation || 0
  return magnemiteConnections[tile.type].map((direction) => {
    const index = orderedDirections.indexOf(direction)
    return orderedDirections[(index + rotation) % orderedDirections.length]
  })
}

const orderedDirections: GridDirection[] = ['up', 'right', 'down', 'left']
const oppositeDirection: Record<GridDirection, GridDirection> = {
  up: 'down',
  right: 'left',
  down: 'up',
  left: 'right',
}

function getMagnemitePoweredTiles(
  settings: MagnemiteCircuitGameConfig['settings'],
  tiles: MagnemiteCircuitTile[],
) {
  const tilesByKey = new Map(tiles.map((tile) => [key(tile), tile]))
  const powered = new Set<string>()
  const queue = [key(settings.source)]

  while (queue.length) {
    const currentKey = queue.shift()!
    if (powered.has(currentKey)) continue
    const tile = tilesByKey.get(currentKey)
    if (!tile) continue

    powered.add(currentKey)
    for (const direction of getMagnemiteConnections(tile)) {
      const delta = gridMoves[direction]
      const next = { x: tile.x + delta.x, y: tile.y + delta.y }
      const nextTile = tilesByKey.get(key(next))
      if (
        nextTile &&
        getMagnemiteConnections(nextTile).includes(
          oppositeDirection[direction],
        )
      ) {
        queue.push(key(next))
      }
    }
  }

  return powered
}

function magnemiteCircuitSolved(
  settings: MagnemiteCircuitGameConfig['settings'],
  tiles: MagnemiteCircuitTile[],
) {
  const powered = getMagnemitePoweredTiles(settings, tiles)
  return settings.targets.every((target) => powered.has(key(target)))
}

function magnemiteMinClicks(
  settings: MagnemiteCircuitGameConfig['settings'],
): number | null {
  const tilesByKey = new Map(settings.tiles.map((tile) => [key(tile), tile]))
  const isLocked = (position: Point) => tilesByKey.get(key(position))?.locked

  // Shared corridor: unlocked tiles reachable from the source before any
  // locked junction tile. Every target depends on these rotations.
  const sharedUnlocked: MagnemiteCircuitTile[] = []
  {
    const queue = [settings.source]
    const visited = new Set<string>([key(settings.source)])
    while (queue.length) {
      const current = queue.shift()!
      for (const delta of Object.values(gridMoves)) {
        const next = { x: current.x + delta.x, y: current.y + delta.y }
        const nextKey = key(next)
        if (visited.has(nextKey)) continue
        const tile = tilesByKey.get(nextKey)
        if (!tile || tile.locked) continue
        visited.add(nextKey)
        sharedUnlocked.push(tile)
        queue.push(next)
      }
    }
  }

  // Per-target corridors: unlocked tiles reachable from each target before
  // the locked junction. These are disjoint from the shared corridor.
  const branchTiles: MagnemiteCircuitTile[][] = settings.targets.map(
    (target) => {
      const tiles: MagnemiteCircuitTile[] = []
      const queue = [target]
      const visited = new Set<string>([key(target)])
      while (queue.length) {
        const current = queue.shift()!
        for (const delta of Object.values(gridMoves)) {
          const next = { x: current.x + delta.x, y: current.y + delta.y }
          const nextKey = key(next)
          if (visited.has(nextKey)) continue
          const tile = tilesByKey.get(nextKey)
          if (!tile || tile.locked) continue
          visited.add(nextKey)
          tiles.push(tile)
          queue.push(next)
        }
      }
      return tiles
    },
  )

  const startRotation = (tile: MagnemiteCircuitTile) => tile.rotation || 0
  const clickCost = (tile: MagnemiteCircuitTile, rotation: number) =>
    (rotation - startRotation(tile) + 4) % 4

  const minForAssignment = (
    tiles: MagnemiteCircuitTile[],
    fixed: Map<string, number>,
    target: Point,
  ): number | null => {
    const unlocked = tiles.filter((tile) => !tile.locked)
    let best: number | null = null
    const combinations = 4 ** unlocked.length
    for (let mask = 0; mask < combinations; mask += 1) {
      let value = mask
      const rotations = new Map(fixed)
      unlocked.forEach((tile) => {
        rotations.set(key(tile), value % 4)
        value = Math.floor(value / 4)
      })
      const candidate = settings.tiles.map((tile) =>
        rotations.has(key(tile))
          ? { ...tile, rotation: rotations.get(key(tile)) }
          : tile,
      )
      if (!getMagnemitePoweredTiles(settings, candidate).has(key(target))) {
        continue
      }
      const clicks = unlocked.reduce(
        (sum, tile) => sum + clickCost(tile, rotations.get(key(tile))!),
        0,
      )
      if (best === null || clicks < best) best = clicks
    }
    return best
  }

  let bestTotal: number | null = null
  const sharedCombinations = 4 ** sharedUnlocked.length
  for (let mask = 0; mask < sharedCombinations; mask += 1) {
    let value = mask
    const sharedRotations = new Map<string, number>()
    sharedUnlocked.forEach((tile) => {
      sharedRotations.set(key(tile), value % 4)
      value = Math.floor(value / 4)
    })

    let total = sharedUnlocked.reduce(
      (sum, tile) => sum + clickCost(tile, sharedRotations.get(key(tile))!),
      0,
    )
    let feasible = true
    for (let index = 0; index < branchTiles.length; index += 1) {
      const branchMin = minForAssignment(
        branchTiles[index],
        sharedRotations,
        settings.targets[index],
      )
      if (branchMin === null) {
        feasible = false
        break
      }
      total += branchMin
    }
    if (feasible && (bestTotal === null || total < bestTotal)) bestTotal = total
  }

  return bestTotal
}

describe('Chronicle gameplay balance', () => {
  test('procedure-order UI keeps its controls reachable in a fixed viewport', async () => {
    const source = await Bun.file(
      'src/app/(frontend)/game/research/encounter/procedure-order.tsx',
    ).text()

    expect(source).toContain('h-dvh min-h-0 overflow-hidden')
    expect(source).toContain('min-h-0 flex-1 space-y-2 overflow-y-auto')
    expect(source).toContain('shrink-0 border-t border-game-border')
    expect(source).toContain('absolute right-4 top-4 z-30')
    expect(source).toContain('aria-label="How to play"')
    expect(source).not.toContain('min-h-dvh w-full max-w-5xl')
  })

  test('every Chronicle activity result returns to its newly active step', async () => {
    const [
      resultSource,
      battleSource,
      encounterSource,
      exploreSource,
      expeditionSource,
      taskActionSource,
    ] =
      await Promise.all([
        Bun.file(
          'src/components/game/shared/RewardResultOverlay.tsx',
        ).text(),
        Bun.file(
          'src/app/(frontend)/game/battles/_components/battle-interface.tsx',
        ).text(),
        Bun.file(
          'src/app/(frontend)/game/locations/encounter/_components/encounter-results.tsx',
        ).text(),
        Bun.file('src/components/game/features/explore/index.tsx').text(),
        Bun.file(
          'src/components/game/features/explore/ExpeditionModal.tsx',
        ).text(),
        Bun.file('src/utilities/tasks/actions.ts').text(),
      ])

    expect(resultSource).toContain(
      'markExpeditionReturn(expeditionProgress?.expeditionId)',
    )
    expect(battleSource).toContain(
      'markExpeditionReturn(expeditionProgress?.expeditionId)',
    )
    expect(encounterSource).toContain(
      'markExpeditionReturn(expeditionProgress?.expeditionId)',
    )
    expect(exploreSource).toContain(
      'void actions.reopenExpeditionPanel(expeditionId)',
    )
    expect(expeditionSource).toContain(
      "currentStepRef.current?.scrollIntoView({",
    )
    expect(expeditionSource).toContain(
      "data-expedition-current-step={isCurrent ? 'true' : undefined}",
    )
    expect(taskActionSource).toContain(
      'expeditionProgress: expeditionResult.expedition',
    )
  })

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

  test('the Surge Voltorb Grid is solvable and requires a real blast setup', () => {
    const game = allGames.find(
      (entry) => entry.id === 'chronicle-v2-surge-cross-the-substation',
    ) as VoltorbGridGameConfig | undefined
    expect(game).toBeDefined()

    const settings = game!.settings
    expect(settings.maxDischarges).toBe(1)
    expect(settings.requiredCleared).toBeLessThanOrEqual(
      settings.debris?.length ?? 0,
    )

    const minimum = solveVoltorbGrid(settings)
    expect(minimum, 'the chronicle Voltorb Grid must be winnable').not.toBeNull()
    expect(minimum!, game!.id).toBeGreaterThanOrEqual(12)
    expect(minimum!, game!.id).toBeLessThanOrEqual(settings.maxMoves ?? 30)
  })

  test('the Surge circuit puzzle needs deliberate rewiring within its budget', () => {
    const game = allGames.find(
      (entry) => entry.id === 'chronicle-v2-surge-restore-the-east-grid',
    ) as MagnemiteCircuitGameConfig | undefined
    expect(game).toBeDefined()

    const settings = game!.settings
    expect(magnemiteCircuitSolved(settings, settings.tiles)).toBe(false)
    expect(
      settings.targets.filter((target) =>
        getMagnemitePoweredTiles(settings, settings.tiles).has(key(target)),
      ).length,
    ).toBe(0)

    const minimum = magnemiteMinClicks(settings)
    expect(minimum, 'the chronicle circuit must have a solution').not.toBeNull()
    expect(minimum!, game!.id).toBeGreaterThanOrEqual(8)
    expect(minimum!, game!.id).toBeLessThanOrEqual(settings.maxRotations ?? 18)
    expect(settings.maxRotations! - minimum!, game!.id).toBeLessThanOrEqual(6)
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
