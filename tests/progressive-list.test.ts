import { describe, expect, test } from 'bun:test'
import { getVisibleItems } from '@/utilities/ui/progressive-list'

describe('getVisibleItems', () => {
  test('returns only the requested leading batch', () => {
    expect(getVisibleItems([1, 2, 3, 4], 2)).toEqual([1, 2])
  })

  test('handles negative visible counts as an empty batch', () => {
    expect(getVisibleItems([1, 2, 3], -1)).toEqual([])
  })
})
