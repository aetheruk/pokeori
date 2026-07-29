import { describe, expect, test } from 'bun:test'
import {
  getPwaNavigationEdge,
  shouldBlockPwaNavigationSwipe,
} from '@/components/pwa-edge-navigation-guard'

describe('PWA edge navigation guard', () => {
  test('tracks only touches that begin in a viewport edge zone', () => {
    expect(getPwaNavigationEdge(0, 390)).toBe('left')
    expect(getPwaNavigationEdge(36, 390)).toBe('left')
    expect(getPwaNavigationEdge(354, 390)).toBe('right')
    expect(getPwaNavigationEdge(390, 390)).toBe('right')
    expect(getPwaNavigationEdge(195, 390)).toBeNull()
  })

  test('blocks outward horizontal history gestures from either edge', () => {
    expect(
      shouldBlockPwaNavigationSwipe(
        'left',
        { x: 10, y: 100 },
        { x: 34, y: 103 },
      ),
    ).toBe(true)
    expect(
      shouldBlockPwaNavigationSwipe(
        'right',
        { x: 380, y: 100 },
        { x: 352, y: 98 },
      ),
    ).toBe(true)
  })

  test('preserves inward, vertical, and tap-sized movement', () => {
    expect(
      shouldBlockPwaNavigationSwipe(
        'left',
        { x: 10, y: 100 },
        { x: 2, y: 100 },
      ),
    ).toBe(false)
    expect(
      shouldBlockPwaNavigationSwipe(
        'right',
        { x: 380, y: 100 },
        { x: 388, y: 100 },
      ),
    ).toBe(false)
    expect(
      shouldBlockPwaNavigationSwipe(
        'left',
        { x: 10, y: 100 },
        { x: 15, y: 130 },
      ),
    ).toBe(false)
    expect(
      shouldBlockPwaNavigationSwipe(
        'left',
        { x: 10, y: 100 },
        { x: 13, y: 101 },
      ),
    ).toBe(false)
  })
})
