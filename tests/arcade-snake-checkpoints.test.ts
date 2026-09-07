import { describe, expect, test } from 'bun:test'
import { snakeGames } from '@/data/games/snake'
import { createArcadeRound, stepArcadeSimulation, verifyArcadeCheckpoint, type ArcadeInput, type ArcadeRound } from '@/utilities/research/arcade-authority'
import { normalizeArcadeInput } from '@/utilities/research/arcade-inputs'

const settings = snakeGames.find((game) => game.id === 'onix-snake-test')!.settings
const startedAt = 1_800_000_000_000
function proof(round: ArcadeRound, targetTick: number, inputs: ArcadeInput[]) {
  return {kind: 'arcade', sessionId: round.sessionId, revision: round.revision, targetTick, inputs}
}

describe('authored Onix checkpoint regression', () => {
  test('signed initial heading reproduces the rejection even though local simulation is legal', () => {
    expect(settings.initialHeading).toBe(-90)
    const round = createArcadeRound('snake', settings, startedAt, 42)
    let predicted = round.simulation
    const inputs: ArcadeInput[] = []
    while (predicted.tick < 250 && predicted.status === 'playing') {
      const input: ArcadeInput = {tick: predicted.tick + 1, kind: 'heading', value: predicted.tick === 0 ? settings.initialHeading : predicted.trajectory!.heading + 2}
      inputs.push(input)
      predicted = stepArcadeSimulation('snake', settings, predicted, [input])
    }
    expect(verifyArcadeCheckpoint('snake', settings, round, proof(round, predicted.tick, inputs), startedAt + 10_000).success).toBe(false)
    const corrected = verifyArcadeCheckpoint('snake', settings, round, proof(round, predicted.tick, inputs.map(normalizeArcadeInput)), startedAt + 10_000)
    expect(corrected.success).toBe(true)
  })

  test('continuous legitimate steering crosses six checkpoints and survives response serialization/retry', () => {
    let acknowledged = createArcadeRound('snake', settings, startedAt, 42)
    for (let checkpoint = 0; checkpoint < 6; checkpoint++) {
      let predicted = structuredClone(acknowledged.simulation)
      const inputs: ArcadeInput[] = []
      const targetTick = predicted.tick + 250
      while (predicted.tick < targetTick && predicted.status === 'playing') {
        const input = normalizeArcadeInput({tick: predicted.tick + 1, kind: 'heading', value: predicted.tick === 0 ? settings.initialHeading : predicted.trajectory!.heading + 2})
        inputs.push(input)
        predicted = stepArcadeSimulation('snake', acknowledged.settings, predicted, [input])
      }
      expect(predicted.status).toBe('playing')
      expect(predicted.tick).toBe(targetTick)
      const request = JSON.parse(JSON.stringify(proof(acknowledged, targetTick, inputs)))
      const now = startedAt + 3000 + Math.ceil(targetTick / 60 * 1000)
      const verified = verifyArcadeCheckpoint('snake', settings, acknowledged, request, now)
      expect(verified.success).toBe(true)
      if (!verified.success) throw new Error(verified.error)
      expect(verified.roundData.simulation).toEqual(predicted)
      // A dropped response retries the immutable same request against the saved
      // input state; the endpoint's existing receipt returns this exact result.
      expect(verifyArcadeCheckpoint('snake', settings, acknowledged, request, now)).toEqual(verified)
      acknowledged = JSON.parse(JSON.stringify(verified.roundData))
      expect(acknowledged.revision).toBe(checkpoint + 1)
      expect(verifyArcadeCheckpoint('snake', settings, acknowledged, request, now).success).toBe(false)
    }
    expect(acknowledged.simulation.tick).toBe(1500)
  })

  test('normalization does not make invalid numbers or forged future time authoritative', () => {
    for (const value of [-90, 270, 630]) expect(normalizeArcadeInput({tick: 1, kind: 'heading', value}).value).toBe(270)
    const round = createArcadeRound('snake', settings, startedAt, 42)
    for (const value of [Number.NaN, Infinity, -Infinity]) {
      expect(verifyArcadeCheckpoint('snake', settings, round, proof(round, 1, [normalizeArcadeInput({tick: 1, kind: 'heading', value})]), startedAt + 100).success).toBe(false)
    }
    expect(verifyArcadeCheckpoint('snake', settings, round, proof(round, 250, []), startedAt).success).toBe(false)
  })
})
