import { describe, expect, test } from 'bun:test'
import {
  deriveSafariBaseFleeRate,
  MAX_SAFARI_STAGE,
  MIN_SAFARI_STAGE,
  resolveSafariAction,
} from '@/utilities/pokemon/safari-catch'

describe('Safari catch actions', () => {
  test('Bait slightly improves catch chance and lowers flee risk', () => {
    const result = resolveSafariAction({
      action: 'bait',
      currentStage: 0,
      baseCatchRate: 100,
      baseFleeRate: 20,
      random: () => 0.99,
    })

    expect(result.stage).toBe(-1)
    expect(result.catchRate).toBeGreaterThan(100)
    expect(result.fleeChance).toBeLessThan(20)
    expect(result.fled).toBe(false)
  })

  test('Shout raises catch chance and flee risk', () => {
    const result = resolveSafariAction({
      action: 'shout',
      currentStage: 0,
      baseCatchRate: 100,
      baseFleeRate: 20,
      random: () => 0.99,
    })

    expect(result.stage).toBe(1)
    expect(result.catchRate).toBeGreaterThan(100)
    expect(result.fleeChance).toBeGreaterThan(20)
    expect(result.fled).toBe(false)
  })

  test('stacking stays within the authored stage and percentage bounds', () => {
    const bait = resolveSafariAction({
      action: 'bait',
      currentStage: MIN_SAFARI_STAGE,
      baseCatchRate: 1,
      baseFleeRate: 1,
      random: () => 0.99,
    })
    const shout = resolveSafariAction({
      action: 'shout',
      currentStage: MAX_SAFARI_STAGE,
      baseCatchRate: 255,
      baseFleeRate: 100,
      random: () => 0.99,
    })

    expect(bait.stage).toBe(MIN_SAFARI_STAGE)
    expect(bait.catchRate).toBeGreaterThanOrEqual(1)
    expect(bait.fleeChance).toBeGreaterThanOrEqual(1)
    expect(shout.stage).toBe(MAX_SAFARI_STAGE)
    expect(shout.catchRate).toBeLessThanOrEqual(255)
    expect(shout.fleeChance).toBeLessThanOrEqual(90)
  })

  test('flee pressure is species-based and actions remain unlimited at the cap', () => {
    expect(
      deriveSafariBaseFleeRate({ captureRate: 190, locationFleeRate: 10 }),
    ).toBeLessThan(
      deriveSafariBaseFleeRate({ captureRate: 45, locationFleeRate: 10 }),
    )

    let stage = MAX_SAFARI_STAGE
    for (let index = 0; index < 20; index += 1) {
      const result = resolveSafariAction({
        action: 'shout',
        currentStage: stage,
        baseCatchRate: 100,
        baseFleeRate: 10,
        random: () => 0.99,
      })
      stage = result.stage
    }

    expect(stage).toBe(MAX_SAFARI_STAGE)
  })
})
