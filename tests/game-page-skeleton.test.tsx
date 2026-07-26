import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  GamePageSkeleton,
  type GamePageSkeletonVariant,
} from '@/components/game/shared/GamePageSkeleton'

describe('management page skeletons', () => {
  const variants: GamePageSkeletonVariant[] = [
    'trainer',
    'explore',
    'pokemon',
    'artisan',
    'collection',
    'inventory',
    'dex',
    'carddex',
    'trainer-panel',
  ]

  test('are labelled and avoid spinner-based loading UI', () => {
    for (const variant of variants) {
      const markup = renderToStaticMarkup(<GamePageSkeleton variant={variant} />)
      expect(markup).toContain('aria-busy="true"')
      expect(markup).not.toContain('animate-spin')
      expect(markup).not.toContain('animate-pulse')
    }
  })
})
