import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { StanceSelector } from '@/app/(frontend)/game/battles/_components/stance-selector'
import { STANCE_ICON_CONFIG } from '@/components/game/shared/stance-icon'

describe('battle UI stance styling', () => {
  test('keeps the shared stance palette aligned with battle identity', () => {
    expect(STANCE_ICON_CONFIG.speed.tone).toBe('text-game-stance-blue-strong')
    expect(STANCE_ICON_CONFIG.power.tone).toBe('text-game-clay-strong')
    expect(STANCE_ICON_CONFIG.tech.tone).toBe('text-game-moss-strong')
  })

  test('renders accessible stance labels with icon-only visual cards', () => {
    const markup = renderToStaticMarkup(
      <StanceSelector
        onSelect={() => undefined}
        stats={{
          attack: 42,
          defense: 31,
          speed: 55,
          specialAttack: 47,
          specialDefense: 38,
        }}
      />,
    )

    expect(markup).toContain('aria-label="SPEED"')
    expect(markup).toContain('aria-label="POWER"')
    expect(markup).toContain('aria-label="TECH"')
    expect(markup).not.toContain('>SPEED<')
    expect(markup).not.toContain('>POWER<')
    expect(markup).not.toContain('>TECH<')
    expect(markup).toContain('font-black')
    expect(markup).toContain('text-game-stance-blue-strong')
    expect(markup).toContain('text-game-clay-strong')
    expect(markup).toContain('text-game-moss-strong')
  })
})
