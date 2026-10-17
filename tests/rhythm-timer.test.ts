import { expect, test } from 'bun:test'
import { ceruleanCityrhythmEntries } from '@/data/games/rhythm/entries/cerulean-city'
import {
  createArcadeRound, getArcadeSessionSettings, normalizeArcadeRound,
  stepArcadeSimulation, verifyArcadeCheckpoint,
} from '@/utilities/research/arcade-authority'

for (const encounter of ceruleanCityrhythmEntries) {
  test(`${encounter.id} finishes at its deadline with an authoritative score`, () => {
    const settings = getArcadeSessionSettings('rhythm', encounter.settings, encounter.settings.timeLimit)
    expect(settings.timeLimit).toBe(encounter.settings.timeLimit)
    const startedAt = 100000
    let round = createArcadeRound('rhythm', settings, startedAt, 42)
    let local = round.simulation
    let inputs: Array<{ tick: number; kind: 'rhythm'; value: number }> = []
    const finalTick = settings.timeLimit * 60
    while (local.tick < finalTick) {
      const nextTick = local.tick + 1
      const hit = local.rhythmIcons.some((icon) => Math.abs(icon.x + settings.speed / 60 + 32 - 255) <= 8)
      const tickInputs = hit ? [{ tick: nextTick, kind: 'rhythm' as const, value: 0 }] : []
      inputs.push(...tickInputs)
      local = stepArcadeSimulation('rhythm', settings, local, tickInputs)
      if (local.tick % 300 === 0 || local.tick === finalTick) {
        const verified = verifyArcadeCheckpoint('rhythm', settings, round, {
          kind: 'arcade', sessionId: round.sessionId, revision: round.revision,
          targetTick: local.tick, inputs,
        }, startedAt + local.tick * 1000 / 60)
        expect(verified.success).toBe(true)
        if (!verified.success) throw new Error(verified.error)
        expect(verified.score).toBe(local.score)
        round = verified.roundData
        inputs = []
      }
      if (local.tick < finalTick) expect(local.status).toBe('playing')
    }
    expect(local.status).not.toBe('playing')
    expect(local.score).toBeGreaterThanOrEqual(settings.endless.milestones[0].score)
    expect(stepArcadeSimulation('rhythm', settings, local)).toBe(local)
  })
}

test('rhythm preserves ability-adjusted durations and repairs saved runs without resetting progress', () => {
  const settings = ceruleanCityrhythmEntries[0].settings
  expect(getArcadeSessionSettings('rhythm', settings, 25).timeLimit).toBe(25)
  const saved = createArcadeRound('rhythm', { ...settings, timeLimit: undefined }, 1000, 42)
  saved.simulation.tick = 1200
  saved.simulation.score = 400
  const repaired = normalizeArcadeRound('rhythm', settings, saved)
  expect(repaired.sessionId).toBe(saved.sessionId)
  expect(repaired.simulation).toBe(saved.simulation)
  expect(saved.settings.timeLimit).toBeUndefined()
  expect(repaired.settings.timeLimit).toBe(20)
  const verified = verifyArcadeCheckpoint('rhythm', settings, saved, {
    kind: 'arcade', sessionId: saved.sessionId, revision: 0, targetTick: 1201, inputs: [],
  }, 22000)
  expect(verified.success).toBe(true)
  if (verified.success) expect(verified.roundData.simulation.status).not.toBe('playing')
  const adjusted = createArcadeRound('rhythm', getArcadeSessionSettings('rhythm', settings, 25), 1000, 42)
  expect(normalizeArcadeRound('rhythm', settings, adjusted)).toBe(adjusted)
})

test('survival endless games retain their untimed sessions', () => {
  for (const game of ['run', 'flap', 'surf', 'snake', 'brick-breaker'] as const) {
    expect(getArcadeSessionSettings(game, { timeLimit: 20, endless: { enabled: true } }, 25).timeLimit).toBeUndefined()
  }
})
