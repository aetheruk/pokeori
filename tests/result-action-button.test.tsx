import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { ResultActionButton } from '@/components/game/ResearchResult'
import { Button } from '@/components/ui/button'

describe('result action button', () => {
  test('uses the moss result treatment and preserves action state', () => {
    const markup = renderToStaticMarkup(
      <ResultActionButton disabled aria-busy="true">
        Play Again
      </ResultActionButton>,
    )

    expect(markup).toContain('bg-game-moss')
    expect(markup).toContain('text-game-cream')
    expect(markup).toContain('hover:bg-game-moss-strong')
    expect(markup).toContain('disabled=""')
    expect(markup).toContain('aria-busy="true"')
  })

  test('applies the same treatment to a supplied replay button', () => {
    const markup = renderToStaticMarkup(
      <ResultActionButton asChild>
        <Button
          variant="outline"
          className="w-full bg-game-surface-raised text-game-ink"
        >
          Play Again
        </Button>
      </ResultActionButton>,
    )

    expect(markup).toContain('bg-game-moss')
    expect(markup).toContain('text-game-cream')
    expect(markup).not.toContain('bg-game-surface-raised')
    expect(markup).not.toContain('text-game-ink')
  })
})
