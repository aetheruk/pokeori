import { describe, expect, test } from 'bun:test'
import { expeditions } from '@/data/expeditions'
import {
  getLocationCardGroupName,
  isLocationCardMode,
} from '@/components/game/features/explore/grouping'
import type { ExploreItem } from '@/components/game/features/explore/types'

const habitatGroupNames: Record<string, string> = {
  'safari-central-habitat-expedition': 'Central Habitat Survey',
  'safari-east-habitat-expedition': 'Eastern Habitat Survey',
  'safari-west-habitat-expedition': 'Western Habitat Survey',
  'safari-north-habitat-expedition': 'Northern Habitat Survey',
}

const asExploreItem = (expeditionId: string): ExploreItem => {
  const expedition = expeditions.find((entry) => entry.id === expeditionId)
  if (!expedition) throw new Error(`Missing expedition: ${expeditionId}`)

  return {
    ...expedition,
    type: 'expedition',
    originalData: expedition,
  }
}

describe('Explore location-card grouping', () => {
  test('groups each short Safari expedition with its matching habitat card', () => {
    for (const [expeditionId, groupName] of Object.entries(
      habitatGroupNames,
    )) {
      const item = asExploreItem(expeditionId)

      expect(isLocationCardMode(item)).toBe(true)
      expect(getLocationCardGroupName(item)).toBe(groupName)
    }
  })

  test('keeps the Safari Grand Expedition as a standalone expedition', () => {
    const item = asExploreItem('safari-zone-grand-expedition')

    expect(isLocationCardMode(item)).toBe(false)
    expect(getLocationCardGroupName(item)).toBe(
      'Safari Zone Grand Expedition',
    )
  })
})
