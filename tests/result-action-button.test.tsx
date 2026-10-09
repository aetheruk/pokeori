import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { ResultActionButton } from '@/components/game/ResearchResult'
import { Button } from '@/components/ui/button'

describe('result action button', () => {
  test('uses the charcoal result treatment and preserves action state', () => {
    const markup = renderToStaticMarkup(
      <ResultActionButton disabled aria-busy="true">
        Play Again
      </ResultActionButton>,
    )

    expect(markup).toContain('bg-game-charcoal')
    expect(markup).toContain('text-game-cream')
    expect(markup).toContain('hover:bg-game-charcoal-strong')
    expect(markup).toContain('disabled=""')
    expect(markup).toContain('aria-busy="true"')
  })

  test('applies the charcoal treatment to a supplied replay button', () => {
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

    expect(markup).toContain('bg-game-charcoal')
    expect(markup).toContain('text-game-cream')
    expect(markup).toContain('hover:bg-game-charcoal-strong')
    expect(markup).not.toContain('text-game-ink')
  })
})
