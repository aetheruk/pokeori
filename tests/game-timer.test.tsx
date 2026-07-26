import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { GameTimer } from '@/components/game/shared/game-timer'

describe('GameTimer urgency styling', () => {
  test('uses a danger ring without changing the paper timer fill', () => {
    const markup = renderToStaticMarkup(
      <GameTimer timeLeft={5} totalTime={30} />,
    )

    expect(markup).toContain('text-game-danger')
    expect(markup).toContain('fill="rgba(247,239,223,0.92)"')
    expect(markup).not.toContain('fill="var(--game-danger)"')
    expect(markup).toContain('text-game-ink')
  })

  test('keeps the scene fill and readable text at low time', () => {
    const markup = renderToStaticMarkup(
      <GameTimer timeLeft={5} totalTime={30} tone="scene" />,
    )

    expect(markup).toContain('fill="rgba(23,39,51,0.76)"')
    expect(markup).toContain('text-game-night-ink')
  })
})
