import { describe, expect, test } from 'bun:test'
import { createArcadeRound, stepArcadeSimulation, verifyArcadeCheckpoint, type ArcadeGameType, type ArcadeInput, type ArcadeRound } from '@/utilities/research/arcade-authority'

const now = 1_800_000_000_000
const run = {speed: 120, groundObstacle: {width: 30, height: 40, spawnRate: {min: 1000, max: 1000}}, parallaxLayers: [{speed: 0.5}], timeLimit: 60, winScore: 10}
const flap = {speed: 100, gravity: 0.01, flapForce: 0.1, terminalVelocity: 1, wallFrequency: {min: 0, max: 0}, wallGap: {min: 200, max: 200}, enemyFrequency: {min: 1000, max: 1000}, parallaxLayers: [], winScore: 10}
const surf = {speed: 100, steeringSpeed: 100, difficulty: 1, obstacleFrequency: {min: 5, max: 5}, obstacles: [], winScore: 10}

function proof(round: ArcadeRound, targetTick: number, inputs: ArcadeInput[] = []) {
  return {kind: 'arcade' as const, sessionId: round.sessionId, revision: round.revision, targetTick, inputs}
}

describe('deterministic arcade authority', () => {
  test('mining derives target hits, damage and swing failure from inputs', () => {
    const settings = { targetSize: {min: 100, max: 100}, speed: {min: 1, max: 1}, itemHp: 20, perfectDamage: 10, okDamage: 5, maxSwings: 3, timeLimit: 30 }
    const round = createArcadeRound('mining', settings, now, 5)
    const inputs: ArcadeInput[] = [{tick: 1, kind: 'mine'}, {tick: 2, kind: 'mine'}]
    const result = verifyArcadeCheckpoint('mining', settings, round, proof(round, 2, inputs), now + 100)
    expect(result.success).toBe(true)
    if (result.success) { expect(result.won).toBe(true); expect(result.score).toBe(20); expect(result.roundData.simulation.swings).toBe(2) }
    const missSettings = {...settings, targetSize: {min: 0, max: 0}, maxSwings: 1}
    const missRound = createArcadeRound('mining', missSettings, now, 5)
    const miss = verifyArcadeCheckpoint('mining', missSettings, missRound, proof(missRound, 1, inputs.slice(0, 1)), now + 100)
    expect(miss.success && miss.won).toBe(false)
    expect(miss.success && miss.roundData.simulation.status).toBe('lost')
    expect(verifyArcadeCheckpoint('mining', settings, round, proof(round, 3, inputs), now + 100).success).toBe(false)
    expect(round.simulation.hp).toBe(20)
  })

  test('rhythm scores seeded icons at their real position and rejects invented controls', () => {
    const settings = {speed: 300, spawnRate: {min: 1, max: 1}, icons: [{id: 'a'}], winScore: 30, timeLimit: 30}
    const round = createArcadeRound('rhythm', settings, now, 12)
    const inputs: ArcadeInput[] = [{tick: 105, kind: 'rhythm', value: 0}]
    const result = verifyArcadeCheckpoint('rhythm', settings, round, proof(round, 105, inputs), now + 2000)
    expect(result.success).toBe(true)
    if (result.success) { expect(result.won).toBe(true); expect(result.score).toBe(30); expect(result.roundData.simulation.lastHit?.type).toBe('PERFECT') }
    const miss = verifyArcadeCheckpoint('rhythm', settings, round, proof(round, 1, [{tick: 1, kind: 'rhythm', value: 0}]), now + 100)
    expect(miss.success && miss.score).toBe(-15)
    for (const value of [-1, 1, 0.5, NaN]) expect(verifyArcadeCheckpoint('rhythm', settings, round, proof(round, 1, [{tick: 1, kind: 'rhythm', value}]), now + 100).success).toBe(false)
    expect(round.simulation.rhythmIcons).toEqual([])
  })

  for (const [kind, settings] of [['run', run], ['flap', flap], ['surf', surf]] as const) {
    test(`${kind}: browser and server derive the same real win at sixty ticks`, () => {
      const round = createArcadeRound(kind, settings, now, 42)
      let predicted = round.simulation
      for (let tick = 1; tick <= 60; tick++) predicted = stepArcadeSimulation(kind, settings, predicted)
      const verified = verifyArcadeCheckpoint(kind, settings, round, proof(round, 60), now + 1000)
      expect(verified.success).toBe(true)
      if (!verified.success) return
      expect(verified.roundData.simulation).toEqual(predicted)
      expect(verified.score).toBe(10)
      expect(verified.won).toBe(true)
      expect(round.simulation.tick).toBe(0)
    })
  }

  test('checkpoints cannot invent scores, rewards, state, identities or elapsed time', () => {
    const round = createArcadeRound('run', {...run, winScore: 1000}, now, 42)
    expect(verifyArcadeCheckpoint('run', run, round, {...proof(round, 60), sessionId: 'another-player'}, now + 1000).success).toBe(false)
    expect(verifyArcadeCheckpoint('run', run, round, {...proof(round, 60), revision: 1}, now + 1000).success).toBe(false)
    expect(verifyArcadeCheckpoint('run', run, round, proof(round, 60), now).success).toBe(false)
    expect(verifyArcadeCheckpoint('run', run, round, proof(round, 601), now + 60_000).success).toBe(false)
    const verified = verifyArcadeCheckpoint('run', {...run, speed: 999999}, round, {...proof(round, 60), score: 999999, collectedRewards: {forged: 999999}, simulation: {status: 'won'}}, now + 1000)
    expect(verified.success).toBe(true)
    if (!verified.success) return
    expect(verified.score).toBe(10)
    expect(verified.won).toBe(false)
    expect(verified.collectedRewards).toEqual({})
    expect(verified.roundData.simulation.distance).toBe(120)
  })

  test('survival is replayed: a transcript claiming ticks past a collision is rejected', () => {
    const settings = {...run, speed: 600, winScore: 1000, groundObstacle: {width: 80, height: 100, spawnRate: {min: 1, max: 1}}}
    const round = createArcadeRound('run', settings, now, 7)
    expect(verifyArcadeCheckpoint('run', settings, round, proof(round, 120), now + 2000).success).toBe(false)
    let actual = round.simulation
    while (actual.status === 'playing') actual = stepArcadeSimulation('run', settings, actual)
    const verified = verifyArcadeCheckpoint('run', settings, round, proof(round, actual.tick), now + 2000)
    expect(verified.success).toBe(true)
    if (verified.success) expect(verified.won).toBe(false)
  })

  test('fixed-step jump, boost and steering inputs are bounded and replay identically across chunks', () => {
    const settings = {...run, winScore: 1000}
    const round = createArcadeRound('run', settings, now, 42)
    const inputs: ArcadeInput[] = [{tick: 1, kind: 'jump'}, {tick: 10, kind: 'jump'}, {tick: 30, kind: 'boost'}]
    const first = verifyArcadeCheckpoint('run', settings, round, proof(round, 30, inputs), now + 1000)
    expect(first.success).toBe(true)
    if (!first.success) return
    const second = verifyArcadeCheckpoint('run', settings, first.roundData, proof(first.roundData, 60), now + 1000)
    const whole = verifyArcadeCheckpoint('run', settings, round, proof(round, 60, inputs), now + 1000)
    expect(second.success).toBe(true)
    expect(whole.success).toBe(true)
    if (second.success && whole.success) expect(second.roundData.simulation).toEqual(whole.roundData.simulation)
    for (const bad of [
      [{tick: 1, kind: 'steer', value: 0.5}],
      [{tick: 1, kind: 'jump'}, {tick: 1, kind: 'jump'}],
      [{tick: 2, kind: 'jump'}, {tick: 1, kind: 'jump'}],
      [{tick: 0, kind: 'jump'}],
      [{tick: 61, kind: 'jump'}],
    ]) expect(verifyArcadeCheckpoint('run', settings, round, proof(round, 60, bad as ArcadeInput[]), now + 1000).success).toBe(false)
    const surfRound = createArcadeRound('surf', surf, now, 1)
    expect(verifyArcadeCheckpoint('surf', surf, surfRound, proof(surfRound, 60, [{tick: 1, kind: 'steer', value: 10}]), now + 1000).success).toBe(false)
    expect(verifyArcadeCheckpoint('surf', surf, surfRound, proof(surfRound, 60, [{tick: 1, kind: 'steer', value: Number.NaN}]), now + 1000).success).toBe(false)
  })

  test('seed fixes obstacles and collectible choices; submitted reward counts have no authority', () => {
    const settings = {...run, winScore: 1000, speed: 30, groundObstacle: {width: 30, height: 40, spawnRate: {min: 20, max: 50}}, endless: {enabled: true, repeatingRewards: [{random: true, everyScore: 1, rewards: [{type: 'item', targetId: 'potion', quantity: 1}]}]}}
    const round = createArcadeRound('run', settings, now, 123)
    const a = verifyArcadeCheckpoint('run', settings, round, proof(round, 100), now + 2000)
    const b = verifyArcadeCheckpoint('run', settings, round, proof(round, 100), now + 2000)
    expect(a).toEqual(b)
    expect(a.success).toBe(true)
    if (a.success) {
      expect(a.roundData.simulation.obstacles.length).toBeGreaterThan(0)
      expect(a.roundData.simulation.collectibles.length).toBeGreaterThan(0)
      expect(a.collectedRewards).toEqual({})
    }
  })

  test('flap keeps stable identities for moving walls and enemies', () => {
    const settings = {
      ...flap,
      wallFrequency: { min: 1, max: 1 },
      wallGap: { min: 400, max: 400 },
      enemyFrequency: { min: 1, max: 1 },
      winScore: 1000,
    }
    const round = createArcadeRound('flap', settings, now, 42)
    const first = stepArcadeSimulation('flap', settings, round.simulation)
    const firstWallId = first.walls[0]?.id
    const firstEnemyId = first.enemies[0]?.id
    const second = stepArcadeSimulation('flap', settings, first)

    expect(firstWallId).toBeNumber()
    expect(firstEnemyId).toBeNumber()
    expect(firstWallId).not.toBe(firstEnemyId)
    expect(second.walls[0]?.id).toBe(firstWallId)
    expect(second.enemies[0]?.id).toBe(firstEnemyId)

    const legacy = {
      ...round.simulation,
      nextId: 7,
      nextWall: 1000,
      nextEnemy: 1000,
      walls: [
        {
          x: 500,
          gapY: 300,
          gapSize: 400,
          width: 60,
          passed: false,
        },
      ],
      enemies: [{ x: 500, y: 100, size: 50 }],
    }
    const resumed = stepArcadeSimulation('flap', settings, legacy)
    expect(resumed.walls[0]?.id).toBe(7)
    expect(resumed.enemies[0]?.id).toBe(8)
  })
})
