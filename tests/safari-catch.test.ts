import { describe, expect, test } from 'bun:test'
import { locations } from '@/data/locations'
import {
  SAFARI_BASE_FLEE_RATE,
  getSafariFleeChance,
  resolveSafariAction,
  SAFARI_ENCOUNTER_TTL_SECONDS,
} from '@/utilities/pokemon/safari-catch'
import { getCatchStageValue } from '@/utilities/pokemon/catch-balance'

describe('Safari catch actions', () => {
  test('provides an isolated Safari visual test location', () => {
    const location = locations.find((entry) => entry.id === 'test-safari-catching')

    expect(location).toMatchObject({
      category: 'Kanto',
      subCategory: 'Test',
      encounterMode: 'safari',
      background: '/backgrounds/safari-reserve.avif',
      requirements: [],
    })
    expect(location?.expeditionOnly).toBeUndefined()
    expect(location?.encounters).toEqual([
      { speciesId: 128, formId: '128', chance: 100 },
    ])
    expect(SAFARI_ENCOUNTER_TTL_SECONDS).toBe(30 * 60)
    expect(SAFARI_BASE_FLEE_RATE).toBe(14)
  })

  test('Berry uses one normal correct-answer increase and lowers flee by 1-3%', () => {
    const rolls = [0, 0.99]
    const result = resolveSafariAction({
      action: 'feed',
      currentStage: 0,
      baseCaptureRate: 45,
      currentCatchRate: 45,
      baseFleeRate: 14,
      random: () => rolls.shift() || 0,
    })

    expect(result.stage).toBe(1)
    expect(result.catchRate).toBe(45 + getCatchStageValue(45))
    expect(result.fleeChance).toBe(13)
    expect(result.fled).toBe(false)
  })

  test('Tamato Berry uses five normal correct-answer increases and raises flee by 10%', () => {
    const result = resolveSafariAction({
      action: 'tamato',
      currentStage: 0,
      baseCaptureRate: 45,
      currentCatchRate: 45,
      baseFleeRate: 14,
      random: () => 0.99,
    })

    expect(result.stage).toBe(5)
    expect(result.catchRate).toBe(45 + getCatchStageValue(45) * 5)
    expect(result.fleeChance).toBe(24)
    expect(result.fled).toBe(false)
  })

  test('flee chance stays between 10% and 50%', () => {
    const feed = resolveSafariAction({
      action: 'feed',
      currentStage: 0,
      baseCaptureRate: 30,
      currentCatchRate: 30,
      baseFleeRate: 10,
      random: () => 0.99,
    })
    const rock = resolveSafariAction({
      action: 'tamato',
      currentStage: 0,
      baseCaptureRate: 30,
      currentCatchRate: 30,
      baseFleeRate: 50,
      random: () => 0.99,
    })

    expect(feed.fleeChance).toBe(10)
    expect(rock.fleeChance).toBe(50)
    expect(getSafariFleeChance({ baseFleeRate: 5 })).toBe(10)
    expect(getSafariFleeChance({ baseFleeRate: 90 })).toBe(50)
  })

  test('repeated actions add their normal answer equivalents', () => {
    const first = resolveSafariAction({
      action: 'tamato',
      currentStage: 0,
      baseCaptureRate: 100,
      currentCatchRate: 100,
      baseFleeRate: 14,
      random: () => 0.99,
    })
    const second = resolveSafariAction({
      action: 'feed',
      currentStage: first.stage,
      baseCaptureRate: 100,
      currentCatchRate: first.catchRate,
      baseFleeRate: first.fleeChance,
      random: () => 0.99,
    })

    expect(first.catchRate).toBe(100 + getCatchStageValue(100) * 5)
    expect(second.catchRate).toBe(
      first.catchRate + getCatchStageValue(100),
    )
    expect(second.fleeChance).toBe(21)
  })
})
