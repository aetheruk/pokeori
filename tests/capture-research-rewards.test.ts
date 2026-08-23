import { describe, expect, test } from 'bun:test'
import {
  buildCaptureEscapeRopeReward,
  buildCaptureCrystalReward,
  buildCaptureRepelRewards,
  buildCaptureResearchXpRewards,
  CATCH_ESCAPE_ROPE_DROP_CHANCE,
  CATCH_CRYSTAL_RESEARCH_BONUS,
  CATCH_COMPANION_RESEARCH_XP_REWARD,
  CATCH_REPEL_DROP_CHANCE,
  CATCH_REPEL_UNLOCK_LEVEL,
  CATCH_RESEARCH_XP_REWARD,
  getCaptureCrystalRewardAmount,
} from '@/utilities/research/capture-research-rewards'

describe('capture research XP rewards', () => {
  test('grants 3 XP to the caught Pokemon and 2 XP to the partner', () => {
    expect(buildCaptureResearchXpRewards('25', '1')).toEqual([
      {
        type: 'pokemon_research_xp',
        targetId: '25',
        quantity: CATCH_RESEARCH_XP_REWARD,
        dropChance: 100,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '1',
        quantity: CATCH_COMPANION_RESEARCH_XP_REWARD,
        dropChance: 100,
        isCompanion: true,
      },
    ])
  })

  test('still grants caught Pokemon XP when there is no partner', () => {
    expect(buildCaptureResearchXpRewards('25')).toEqual([
      {
        type: 'pokemon_research_xp',
        targetId: '25',
        quantity: CATCH_RESEARCH_XP_REWARD,
        dropChance: 100,
      },
    ])
  })

  test('grants crystals equal to the caught Pokemon level', () => {
    expect(getCaptureCrystalRewardAmount(15, 0)).toBe(15)
    expect(buildCaptureCrystalReward(15, 0)).toEqual({
      type: 'currency',
      targetId: 'crystals',
      quantity: 15,
      dropChance: 100,
    })
  })

  test('keeps the research level 3 crystal bonus on top of caught level', () => {
    expect(getCaptureCrystalRewardAmount(15, 2)).toBe(15)
    expect(getCaptureCrystalRewardAmount(15, 3)).toBe(
      15 + CATCH_CRYSTAL_RESEARCH_BONUS,
    )
  })

  test('adds the global catch Escape Rope roll', () => {
    expect(buildCaptureEscapeRopeReward()).toEqual({
      type: 'item',
      targetId: 'escape-rope',
      quantity: 1,
      dropChance: CATCH_ESCAPE_ROPE_DROP_CHANCE,
    })
  })

  test('adds the global catch Repel roll at Explorer level 20', () => {
    expect(buildCaptureRepelRewards(CATCH_REPEL_UNLOCK_LEVEL - 1)).toEqual([])
    expect(buildCaptureRepelRewards(CATCH_REPEL_UNLOCK_LEVEL)).toEqual([
      {
        type: 'item',
        targetId: 'repel',
        quantity: 1,
        dropChance: CATCH_REPEL_DROP_CHANCE,
      },
    ])
  })
})
