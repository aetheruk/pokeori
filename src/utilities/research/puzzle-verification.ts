import type { MagnemiteCircuitSettings, MagnemiteCircuitTileType } from '@/data/games/magnemite-circuit/types'
import type { RockTunnelEchoMapSettings } from '@/data/games/rock-tunnel-echo-map/types'
import type { VoltorbGridSettings } from '@/data/games/voltorb-grid/types'

const directions = ['up', 'right', 'down', 'left'] as const
const deltas = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }]
const connections: Record<MagnemiteCircuitTileType, number[]> = {
  straight: [0, 2], corner: [0, 1], tee: [0, 1, 2], cross: [0, 1, 2, 3],
}
const key = ({ x, y }: { x: number; y: number }) => `${x},${y}`

export function readPuzzleTranscript(proof: unknown, kind: string): string[] | null {
  if (!proof || typeof proof !== 'object' || !('kind' in proof) || proof.kind !== kind || !('moves' in proof)) return null
  const moves = proof.moves
  if (!Array.isArray(moves) || moves.length > 4096 || moves.some((move) => typeof move !== 'string' || move.length > 32)) return null
  return moves
}

export function verifyCircuitProof(settings: MagnemiteCircuitSettings, proof: unknown): boolean {
  const moves = readPuzzleTranscript(proof, 'magnemite-circuit')
  if (!moves || (settings.maxRotations && moves.length > settings.maxRotations)) return false
  const tiles = new Map(settings.tiles.map((tile) => [key(tile), { ...tile }]))
  for (const move of moves) {
    const tile = tiles.get(move)
    if (!tile || tile.locked) return false
    tile.rotation = ((tile.rotation || 0) + 1) % 4
  }
  const powered = new Set<string>()
  const pending = [key(settings.source)]
  for (let index = 0; index < pending.length; index++) {
    const id = pending[index]
    if (powered.has(id)) continue
    const tile = tiles.get(id)
    if (!tile) continue
    powered.add(id)
    for (const connection of connections[tile.type]) {
      const direction = (connection + (tile.rotation || 0)) % 4
      const delta = deltas[direction]
      const nextId = key({ x: tile.x + delta.x, y: tile.y + delta.y })
      const next = tiles.get(nextId)
      if (next && connections[next.type].some((port) => (port + (next.rotation || 0)) % 4 === (direction + 2) % 4)) pending.push(nextId)
    }
  }
  return settings.targets.length > 0 && settings.targets.every((target) => powered.has(key(target)))
}

export function verifyEchoMapProof(settings: RockTunnelEchoMapSettings, proof: unknown): boolean {
  const moves = readPuzzleTranscript(proof, 'echo-map')
  if (!moves || (settings.maxMoves && moves.length > settings.maxMoves)) return false
  let position = { ...settings.playerStart }
  const walls = new Set(settings.walls.filter(({ y }) => y > 0).map(key))
  const holes = new Set((settings.holes || []).filter(({ y }) => y > 0).map(key))
  for (const move of moves) {
    const index = directions.indexOf(move as typeof directions[number])
    if (index < 0 || key(position) === key(settings.exit)) return false
    position = { x: position.x + deltas[index].x, y: position.y + deltas[index].y }
    if (position.x < 0 || position.y < 0 || position.x >= settings.gridSize.cols || position.y >= settings.gridSize.rows ||
        walls.has(key(position)) || holes.has(key(position))) return false
  }
  return key(position) === key(settings.exit)
}

export function verifyVoltorbProof(settings: VoltorbGridSettings, proof: unknown): boolean {
  const actions = readPuzzleTranscript(proof, 'voltorb')
  if (!actions) return false
  const inside = (point: { x: number; y: number }) => point.x >= 0 && point.y >= 0 && point.x < settings.gridSize.cols && point.y < settings.gridSize.rows
  const walls = new Set((settings.walls || []).filter(({ y }) => y > 0).map(key))
  const debris = new Set((settings.debris || []).filter(({ y }) => y > 0).map(key))
  const initialDebris = debris.size
  const required = Math.min(settings.requiredCleared ?? initialDebris, initialDebris)
  let voltorbs = settings.voltorbs.filter(({ y }) => y > 0).map((voltorb, index) => ({
    ...voltorb, id: voltorb.id || `voltorb-${index}`, blastRadius: voltorb.blastRadius || 2,
  }))
  const detonatorId = voltorbs[0]?.id
  const protectedPokemon = (settings.protectedPokemon || []).filter(({ y }) => y > 0).map((pokemon) => ({ ...pokemon }))
  let player = { ...settings.playerStart }
  let moves = 0
  let discharges = 0
  const exitOpen = () => initialDebris - debris.size >= required
  for (const action of actions) {
    if (key(player) === key(settings.exit) && exitOpen()) return false
    if (settings.maxMoves && moves >= settings.maxMoves) return false
    if (action === 'discharge') {
      if (settings.maxDischarges && discharges >= settings.maxDischarges) return false
      discharges++
      const first = voltorbs.find((voltorb) => voltorb.id === detonatorId)
      const queue = first ? [first] : []
      const triggered = new Set<string>()
      const destroyed = new Set<string>()
      for (let index = 0; index < queue.length; index++) {
        const voltorb = queue[index]
        if (triggered.has(voltorb.id)) continue
        triggered.add(voltorb.id)
        if (key(voltorb) === key(player)) return false
        for (const delta of deltas) {
          for (let step = 1; step <= voltorb.blastRadius; step++) {
            const next = { x: voltorb.x + delta.x * step, y: voltorb.y + delta.y * step }
            const id = key(next)
            if (!inside(next) || walls.has(id)) break
            if (id === key(player) || protectedPokemon.some((pokemon) => key(pokemon) === id)) return false
            const chained = voltorbs.find((other) => key(other) === id)
            if (chained && !triggered.has(chained.id)) queue.push(chained)
            if (debris.has(id)) { destroyed.add(id); break }
          }
        }
      }
      for (const id of destroyed) debris.delete(id)
      voltorbs = voltorbs.filter((voltorb) => !triggered.has(voltorb.id))
      if (settings.maxDischarges && discharges >= settings.maxDischarges && !exitOpen()) return false
      continue
    }
    const direction = directions.indexOf(action as typeof directions[number])
    if (direction < 0) return false
    const delta = deltas[direction]
    const next = { x: player.x + delta.x, y: player.y + delta.y }
    const nextId = key(next)
    const pushed = voltorbs.find((voltorb) => key(voltorb) === nextId) || protectedPokemon.find((pokemon) => key(pokemon) === nextId)
    if (pushed) {
      const destination = { x: next.x + delta.x, y: next.y + delta.y }
      const id = key(destination)
      if (!inside(destination) || walls.has(id) || debris.has(id) || id === key(settings.exit) ||
          voltorbs.some((voltorb) => key(voltorb) === id) || protectedPokemon.some((pokemon) => key(pokemon) === id)) return false
      Object.assign(pushed, destination)
    } else if (!inside(next) || walls.has(nextId) || debris.has(nextId) || (!exitOpen() && nextId === key(settings.exit))) return false
    player = next
    moves++
  }
  return key(player) === key(settings.exit) && exitOpen()
}
