import { describe, expect, test } from 'bun:test'
import { verifyCircuitProof, verifyEchoMapProof, verifyVoltorbProof } from '@/utilities/research/puzzle-verification'
import type { MagnemiteCircuitSettings } from '@/data/games/magnemite-circuit/types'
import type { RockTunnelEchoMapSettings } from '@/data/games/rock-tunnel-echo-map/types'
import type { VoltorbGridSettings } from '@/data/games/voltorb-grid/types'

describe('puzzle completion proofs', () => {
  const circuit: MagnemiteCircuitSettings = {
    gridSize: { rows: 1, cols: 3 }, source: { x: 0, y: 0 }, targets: [{ x: 2, y: 0 }], maxRotations: 1,
    tiles: [
      { x: 0, y: 0, type: 'straight', rotation: 1, locked: true },
      { x: 1, y: 0, type: 'straight', rotation: 0 },
      { x: 2, y: 0, type: 'straight', rotation: 1, locked: true },
    ],
  }
  const echo: RockTunnelEchoMapSettings = {
    variant: 'echo-map', gridSize: { rows: 4, cols: 3 }, playerStart: { x: 0, y: 1 }, exit: { x: 2, y: 1 },
    walls: [{ x: 1, y: 1 }], holes: [{ x: 1, y: 2 }], maxMoves: 6,
  }

  test('a circuit needs connected ports, respects locked tiles and rotation budget', () => {
    expect(verifyCircuitProof(circuit, { kind: 'magnemite-circuit', moves: ['1,0'] })).toBe(true)
    expect(verifyCircuitProof(circuit, { kind: 'magnemite-circuit', moves: [] })).toBe(false)
    expect(verifyCircuitProof(circuit, { kind: 'magnemite-circuit', moves: ['0,0'] })).toBe(false)
    expect(verifyCircuitProof(circuit, { kind: 'magnemite-circuit', moves: ['1,0', '1,0'] })).toBe(false)
    expect(verifyCircuitProof(circuit, { kind: 'magnemite-circuit', moves: ['999,999'] })).toBe(false)
    expect(verifyCircuitProof(circuit, true)).toBe(false)
  })
  test('echo route must reach the exit without crossing walls, holes or bounds', () => {
    const valid = ['down', 'down', 'right', 'right', 'up', 'up']
    expect(verifyEchoMapProof(echo, { kind: 'echo-map', moves: valid })).toBe(true)
    for (const moves of [[], ['right', 'right'], ['down', 'right'], ['up'], [...valid, 'left']]) {
      expect(verifyEchoMapProof(echo, { kind: 'echo-map', moves })).toBe(false)
    }
    expect(verifyEchoMapProof(echo, { kind: 'echo-map', moves: ['down'].concat(Array(4096).fill('up')) })).toBe(false)
    expect(verifyEchoMapProof(echo, { kind: 'other', moves: valid })).toBe(false)
  })
  test('Voltorb blasts must open the exit without hurting the player or protected Pokemon', () => {
    const voltorb: VoltorbGridSettings = {
      variant: 'voltorb', gridSize: { cols: 5, rows: 5 }, playerStart: { x: 0, y: 4 }, exit: { x: 4, y: 4 },
      voltorbs: [{ id: 'first', x: 2, y: 2, blastRadius: 1 }], debris: [{ x: 2, y: 3 }],
      requiredCleared: 1, maxMoves: 4, maxDischarges: 1,
    }
    const proof = { kind: 'voltorb', moves: ['discharge', 'right', 'right', 'right', 'right'] }
    expect(verifyVoltorbProof(voltorb, proof)).toBe(true)
    expect(verifyVoltorbProof(voltorb, { ...proof, moves: proof.moves.slice(1) })).toBe(false)
    expect(verifyVoltorbProof({ ...voltorb, protectedPokemon: [{ speciesId: 25, x: 2, y: 1 }] }, proof)).toBe(false)
    expect(verifyVoltorbProof({ ...voltorb, playerStart: { x: 2, y: 1 } }, proof)).toBe(false)
    expect(verifyVoltorbProof({ ...voltorb, maxMoves: 3 }, proof)).toBe(false)
    expect(verifyVoltorbProof(voltorb, { ...proof, moves: ['discharge', ...proof.moves] })).toBe(false)
    expect(verifyVoltorbProof(voltorb, true)).toBe(false)
  })
})
